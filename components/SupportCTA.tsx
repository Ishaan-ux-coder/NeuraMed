import React from "react";
import { Link } from "react-router-dom";

export default function SupportCTA() {
  return (
    <div className="mt-8 rounded-xl border bg-white shadow p-6 flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold">Schedule a 1:1 Session</h3>
        <p className="text-gray-600">Connect privately with a licensed therapist over a secure video call.</p>
      </div>
      <Link to="/support/video-call" className="px-4 py-2 rounded-md bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Start Session</Link>
    </div>
  );
}
