import React, { useRef } from "react";
import OneToOneCall from "../../components/video/OneToOneCall";
import { Link } from "react-router-dom";

export default function VideoCallPage() {
  const callRef = useRef<{ toggleMic: () => void; toggleCam: () => void } | null>(null);
  return (
    <main className="min-h-screen py-16 px-6 bg-gradient-to-b from-blue-50 via-green-50 to-teal-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">1:1 Session with Therapist</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => callRef.current?.toggleMic()} className="px-3 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold">Mic On/Off</button>
            <button onClick={() => callRef.current?.toggleCam()} className="px-3 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold">Camera On/Off</button>
            <Link to="/support" className="text-emerald-700 hover:underline ml-2">← Back</Link>
          </div>
        </div>
        <p className="text-slate-600 mb-6">Create a call and share the Call ID, or join an existing session with a Call ID shared by your therapist.</p>
        <OneToOneCall ref={callRef} />
      </div>
    </main>
  );
}
