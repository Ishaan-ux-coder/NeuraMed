import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db, auth } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

const servers: RTCConfiguration = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }], iceCandidatePoolSize: 10 };

function useAnon() {
  return useMemo(() => {
    const stored = localStorage.getItem("anon_name");
    if (stored) return stored;
    const anon = "Anon-" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem("anon_name", anon);
    return anon;
  }, []);
}

export default function PeerQuickCall() {
  const { roomId = "anxiety" } = useParams();
  const room = roomId || "anxiety";
  const anon = useAnon();

  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);

  const [callId, setCallId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Matching...");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ id: string; name: string; text: string }>>([]);
  const logRef = useRef<HTMLDivElement>(null);

  function ensurePeer(): RTCPeerConnection {
    if (!pcRef.current || pcRef.current.signalingState === "closed") {
      pcRef.current = new RTCPeerConnection(servers);
      const remoteStream = new MediaStream();
      remoteStreamRef.current = remoteStream;
      if (remoteRef.current) remoteRef.current.srcObject = remoteStream;
      pcRef.current.ontrack = (e) => e.streams[0].getTracks().forEach((t) => remoteStream.addTrack(t));
    }
    return pcRef.current;
  }

  async function ensureAuth() {
    if (auth.currentUser) return;
    await signInAnonymously(auth).catch(() => {});
    await new Promise<void>((resolve) => {
      const unsub = onAuthStateChanged(auth, (u) => { if (u) { unsub(); resolve(); } });
    });
  }

  async function setupMediaOnce() {
    if (localStreamRef.current) return; // already set
    const pc = ensurePeer();
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;
    // remove any prior senders
    pc.getSenders().forEach((s) => { try { pc.removeTrack(s); } catch {} });
    stream.getTracks().forEach((t) => pc.addTrack(t, stream));
    if (localRef.current) {
      localRef.current.srcObject = stream;
      await localRef.current.play().catch(() => {});
    }
  }

  useEffect(() => {
    // initial auth + media + matchmaking
    let closed = false;
    (async () => {
      await ensureAuth();
      await setupMediaOnce();
      if (!closed) {
        await tryMatchOrCreate();
      }
    })();
    return () => {
      closed = true;
      try { pcRef.current?.getSenders().forEach((s) => s.track?.stop()); pcRef.current?.close(); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  // Subscribe to in-call chat only after callId is known
  useEffect(() => {
    if (!callId) return;
    const chatCol = collection(db, "peerCalls", callId, "messages");
    const q = query(chatCol, orderBy("createdAtMs", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const list: Array<{ id: string; name: string; text: string }> = [];
      snap.forEach((d) => list.push({ id: d.id, ...(d.data() as any) }));
      setMessages(list);
      setTimeout(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, 30);
    });
    return () => unsub();
  }, [callId]);

  async function tryMatchOrCreate() {
    await ensureAuth();
    // Try to join first waiting ticket
    const queueCol = collection(db, "peerQueue", room, "tickets");
    const q = query(queueCol, orderBy("createdAt", "asc"), limit(1));
    let joined = false;
    await new Promise<void>((resolve) => {
      const unsub = onSnapshot(q, async (snap) => {
        unsub();
        const docs = snap.docs;
        if (docs.length > 0) {
          const ticket = docs[0];
          try {
            await deleteDoc(ticket.ref);
            await joinExistingCall(ticket.id);
            joined = true;
          } catch {
            // ticket taken, fall-through to create
          }
        }
        resolve();
      });
    });
    if (!joined) await createAsInitiator();
  }

  async function createAsInitiator() {
    setStatus("Waiting for a peer...");
    const pc = ensurePeer();
    const callDoc = doc(collection(db, "calls"));
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    pc.onicecandidate = async (event) => { if (event.candidate) await addDoc(offerCandidates, event.candidate.toJSON()); };
    const offerDesc = await pc.createOffer();
    await pc.setLocalDescription(offerDesc);
    await setDoc(callDoc, { offer: { type: offerDesc.type, sdp: offerDesc.sdp }, createdAt: serverTimestamp() });

    // Put ticket in queue using callId as doc id
    await setDoc(doc(db, "peerQueue", room, "tickets", callDoc.id), { createdAt: serverTimestamp() });

    // Listen for answer and ICE
    onSnapshot(callDoc, (snap) => {
      const data = snap.data();
      const answer = data?.answer;
      if (answer && !pc.currentRemoteDescription) {
        pc.setRemoteDescription(new RTCSessionDescription(answer));
        setStatus("Connected");
        setCallId(callDoc.id);
      }
    });
    onSnapshot(answerCandidates, (snap) => {
      snap.docChanges().forEach((c) => { if (c.type === "added") pc.addIceCandidate(new RTCIceCandidate(c.doc.data())); });
    });
  }

  async function joinExistingCall(callIdToJoin: string) {
    setStatus("Connecting...");
    const pc = ensurePeer();
    const callDoc = doc(db, "calls", callIdToJoin);
    const callData = (await getDoc(callDoc)).data();
    if (!callData?.offer) { await createAsInitiator(); return; }

    const offer = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    pc.onicecandidate = async (event) => { if (event.candidate) await addDoc(collection(callDoc, "answerCandidates"), event.candidate.toJSON()); };

    const answerDesc = await pc.createAnswer();
    await pc.setLocalDescription(answerDesc);
    await setDoc(callDoc, { answer: { type: answerDesc.type, sdp: answerDesc.sdp }, answeredAt: serverTimestamp() }, { merge: true });

    // Listen for offer ICE
    onSnapshot(collection(callDoc, "offerCandidates"), (snap) => {
      snap.docChanges().forEach((c) => { if (c.type === "added") pc.addIceCandidate(new RTCIceCandidate(c.doc.data())); });
    });

    setCallId(callIdToJoin);
    setStatus("Connected");
  }

  async function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text || !callId) return;
    setInput("");
    try {
      await ensureAuth();
      await addDoc(collection(db, "peerCalls", callId, "messages"), { name: anon, text, createdAt: serverTimestamp(), createdAtMs: Date.now() });
    } catch (err) {
      console.error("sendMessage failed", err);
    }
  }

  const titleMap: Record<string, string> = {
    anxiety: "Anxiety Peer Group",
    "mindful-living": "Mindful Living Group",
    "stress-management": "Stress Management",
    "young-adults": "Young Adults Wellness",
  };

  return (
    <main className="min-h-screen py-12 px-6 bg-gradient-to-b from-teal-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">{titleMap[room] || "Peer Quick Call"}</h1>
          <div className="flex items-center gap-3">
            <span className="text-slate-600">{status}</span>
            <Link to={`/support/peer/${room}`} className="text-emerald-700 hover:underline">← Back to Group</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white flex flex-col">
            <div className="flex flex-col md:flex-row gap-4">
              <video ref={localRef} muted playsInline className="w-full md:w-1/2 rounded-2xl bg-black/80 aspect-video" />
              <video ref={remoteRef} playsInline className="w-full md:w-1/2 rounded-2xl bg-black/80 aspect-video" />
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={() => { localStreamRef.current?.getAudioTracks().forEach(t => t.enabled = !t.enabled); }} className="px-4 py-2 rounded-full bg-slate-200 hover:bg-slate-300">Mic On/Off</button>
              <button onClick={() => { localStreamRef.current?.getVideoTracks().forEach(t => t.enabled = !t.enabled); }} className="px-4 py-2 rounded-full bg-slate-200 hover:bg-slate-300">Camera On/Off</button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white flex flex-col min-h-[420px]">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">In-Call Chat</h2>
            <div ref={logRef} className="flex-1 overflow-y-auto space-y-3 p-2 rounded-xl bg-slate-50">
              {messages.map((m) => (
                <div key={m.id} className="flex flex-col">
                  <span className="text-xs text-slate-500 mb-0.5">{m.name}</span>
                  <div className="inline-block max-w-[90%] px-3 py-2 rounded-2xl bg-indigo-50 text-slate-800">{m.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="mt-3 flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              <button className="px-5 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Send</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
