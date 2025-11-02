import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { db } from "../../firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";

const servers: RTCConfiguration = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }], iceCandidatePoolSize: 10 };

function OneToOneCall(_props: {}, ref: React.Ref<{ toggleMic: () => void; toggleCam: () => void }>) {
  // Replace state-held PC with a ref and recreate when closed
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);
  const [callId, setCallId] = useState("");
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [inCall, setInCall] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);

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

  useEffect(() => {
    async function setupMedia() {
      const pc = ensurePeer();
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      if (localRef.current) {
        localRef.current.srcObject = stream;
        await localRef.current.play().catch(() => {});
      }
      // Remove prior senders before adding tracks (prevents duplicates after re-init)
      pc.getSenders().forEach((s) => { try { pc.removeTrack(s); } catch {} });
      stream.getTracks().forEach((t) => pc.addTrack(t, stream));
    }
    setupMedia();
    return () => {
      // Do not recreate on unmount; just stop tracks
      try {
        pcRef.current?.getSenders().forEach((s) => s.track?.stop());
        pcRef.current?.close();
      } catch {}
    };
  }, []);

  async function createCall() {
    const pc = ensurePeer();
    const callDoc = doc(collection(db, "calls"));
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    setCreatedId(callDoc.id);

    pc.onicecandidate = async (event) => {
      if (event.candidate) await addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = { sdp: offerDescription.sdp, type: offerDescription.type, createdAt: Date.now() } as const;
    await setDoc(callDoc, { offer });

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      const answer = data?.answer;
      if (pc.signalingState !== "closed" && !pc.currentRemoteDescription && answer) {
        const answerDescription = new RTCSessionDescription(answer);
        pc.setRemoteDescription(answerDescription);
        setInCall(true);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          if (pc.signalingState !== "closed") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        }
      });
    });
  }

  async function joinCall() {
    const pc = ensurePeer();
    const callDoc = doc(db, "calls", callId);
    const callData = (await getDoc(callDoc)).data();
    if (!callData?.offer) return alert("Invalid Call ID");

    pc.onicecandidate = async (event) => {
      if (event.candidate) await addDoc(collection(callDoc, "answerCandidates"), event.candidate.toJSON());
    };

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);
    await setDoc(callDoc, { answer: { type: answerDescription.type, sdp: answerDescription.sdp, createdAt: Date.now() } }, { merge: true });

    onSnapshot(collection(callDoc, "offerCandidates"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
        }
      });
    });

    setInCall(true);
  }

  async function hangup() {
    try { pcRef.current?.getSenders().forEach((s) => s.track?.stop()); pcRef.current?.close(); } catch {}
    pcRef.current = null;
    if (createdId) {
      const callDoc = doc(db, "calls", createdId);
      try { await deleteDoc(callDoc); } catch {}
    }
    setInCall(false);
    setCreatedId(null);
    setCallId("");
  }

  function toggleMic() {
    const stream = localStreamRef.current;
    if (!stream) return;
    const enabled = !micOn;
    stream.getAudioTracks().forEach((t) => (t.enabled = enabled));
    setMicOn(enabled);
  }

  function toggleCam() {
    const stream = localStreamRef.current;
    if (!stream) return;
    const enabled = !camOn;
    stream.getVideoTracks().forEach((t) => (t.enabled = enabled));
    setCamOn(enabled);
  }

  // expose controls to parent
  useImperativeHandle(ref, () => ({ toggleMic, toggleCam }), [micOn, camOn]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white">
        <div className="flex flex-col md:flex-row gap-4">
          <video ref={localRef} muted playsInline className="w-full md:w-1/2 rounded-2xl bg-black/80 aspect-video" />
          <video ref={remoteRef} playsInline className="w-full md:w-1/2 rounded-2xl bg-black/80 aspect-video" />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!inCall && (
            <>
              <button onClick={createCall} className="px-4 py-2 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700">Create Call</button>
              {createdId && (
                <span className="text-sm text-slate-700">Share Call ID: <code className="font-mono bg-slate-100 px-2 py-1 rounded">{createdId}</code></span>
              )}
              <input value={callId} onChange={(e) => setCallId(e.target.value)} placeholder="Enter Call ID to join" className="px-3 py-2 border rounded-full" />
              <button onClick={joinCall} className="px-4 py-2 rounded-full text-white font-semibold bg-emerald-600 hover:bg-emerald-700">Join Call</button>
            </>
          )}
          {inCall && (
            <>
              <button onClick={toggleMic} className="px-4 py-2 rounded-full bg-slate-200 hover:bg-slate-300 font-semibold">{micOn ? "Mute" : "Unmute"}</button>
              <button onClick={toggleCam} className="px-4 py-2 rounded-full bg-slate-200 hover:bg-slate-300 font-semibold">{camOn ? "Camera Off" : "Camera On"}</button>
              <button onClick={hangup} className="px-4 py-2 rounded-full text-white font-semibold bg-red-600 hover:bg-red-700">End Call</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(OneToOneCall);
