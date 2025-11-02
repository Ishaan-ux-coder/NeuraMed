import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db, auth } from "../../firebase";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import OneToOneCall from "../../components/video/OneToOneCall";

function useAnon() {
  return useMemo(() => {
    const stored = localStorage.getItem("anon_name");
    if (stored) return stored;
    const anon = "Anon-" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem("anon_name", anon);
    return anon;
  }, []);
}

export default function PeerGroupRoom() {
  const { roomId = "anxiety" } = useParams();
  const room = roomId || "anxiety";
  const anon = useAnon();
  const nameMap: Record<string, string> = {
    anxiety: "Anxiety Peer Group",
    "mindful-living": "Mindful Living Group",
    "stress-management": "Stress Management",
    "young-adults": "Young Adults Wellness",
  };
  const friendlyTitle = nameMap[room] || "Peer Group";

  // Chat state
  const [messages, setMessages] = useState<Array<{ id: string; name: string; text: string; createdAt?: { seconds: number } }>>([]);
  const [input, setInput] = useState("");
  const [authed, setAuthed] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const callRef = useRef<{ toggleMic: () => void; toggleCam: () => void } | null>(null);

  async function ensureAuth() {
    if (auth.currentUser) return;
    try {
      await signInAnonymously(auth);
      await new Promise<void>((resolve) => {
        const unsub = onAuthStateChanged(auth, (u) => {
          if (u) { unsub(); resolve(); }
        });
      });
    } catch (e) {
      console.error("Anonymous sign-in failed", e);
    }
  }

  // Wait for auth, then attach chat listener
  useEffect(() => {
    let unsubChat: undefined | (() => void);
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        try { await signInAnonymously(auth); } catch (e) { console.error(e); }
        return;
      }
      setAuthed(true);
      const q = query(
        collection(db, "peerRooms", room, "messages"),
        orderBy("createdAtMs", "asc")
      );
      const unsub = onSnapshot(q, (snap) => {
        const list: Array<{ id: string; name: string; text: string; createdAt?: { seconds: number } }> = [];
        snap.forEach((d) => list.push({ id: d.id, ...(d.data() as any) }));
        setMessages(list);
        setTimeout(() => {
          if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
        }, 50);
      }, (err) => {
        console.error("Chat subscribe error", err);
      });
      unsubChat = unsub;
    });
    return () => { unsubAuth(); if (unsubChat) unsubChat(); };
  }, [room]);

  async function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    try {
      await ensureAuth();
      await addDoc(collection(db, "peerRooms", room, "messages"), {
        name: anon,
        text,
        createdAt: serverTimestamp(),
        createdAtMs: Date.now(),
      });
    } catch (err) {
      console.error("Failed to send message", err);
      alert("Failed to send message. Please enable Anonymous Sign-in in Firebase Auth and check Firestore rules.");
    }
  }

  return (
    <main className="min-h-screen py-12 px-6 bg-gradient-to-b from-purple-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">{friendlyTitle}</h1>
          <div className="flex items-center gap-3">
            <Link to="/support" className="text-indigo-700 hover:underline">← Back to Support</Link>
            <Link to="/games" className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700">Go to Games</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Panel */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white flex flex-col min-h-[520px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Anonymous Chat</h2>
              <span className="text-sm text-slate-500">You are: <strong>{anon}</strong></span>
            </div>
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

          {/* Video/Call Panel */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-slate-800">One-to-One Video Call</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => callRef.current?.toggleMic()} className="px-3 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold">Mic On/Off</button>
                <button onClick={() => callRef.current?.toggleCam()} className="px-3 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold">Camera On/Off</button>
              </div>
            </div>
            <p className="text-slate-600 mb-3">Create a call and share the Call ID in chat, or join a peer's call with their ID.</p>
            <OneToOneCall ref={callRef} />
          </div>
        </div>
      </div>
    </main>
  );
}
