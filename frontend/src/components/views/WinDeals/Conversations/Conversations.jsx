import { Video, CheckCircle2 } from "lucide-react";

export default function Conversations() {
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-800 m-1">Conversations</h1>
      <div className="w-full h-full bg-[#0D1021] text-black flex justify-center">
        <div className="max-w-[1400px] w-full grid grid-cols-2 gap-10 p-12 items-center">
          {/* LEFT SECTION */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img src="" alt="Conversation Preview" className="rounded-xl" />
          </div>

          {/* RIGHT SECTION */}
          <div className="text-white pr-10">
            <h1 className="text-4xl font-bold leading-tight text-white">
              Automatically record, transcribe, and analyze video call meetings
              with Apollo Conversations
            </h1>

            <p className="text-lg text-gray-400 mt-4">
              Works with conferencing apps
            </p>

            {/* Icons */}
            <div className="flex gap-4 items-center mt-3">
              <span>
                <img
                  src="https://img.icons8.com/color/48/zoom.png"
                  width="50"
                />
              </span>

              <span>
                <img
                  src="https://img.icons8.com/color/48/microsoft-teams.png"
                  width="50"
                />
              </span>

              <span>
                <img
                  src="https://img.icons8.com/color/48/google-meet.png"
                  width="50"
                />
              </span>
            </div>

            {/* Feature List */}
            <ul className="mt-8 space-y-5">
              {[
                "Record video and generate transcripts using your web conferencing app",
                "Get actionable insights from AI-generated meeting summaries",
                "Help your team sell more by understanding key conversation metrics",
                "Save time with automated post-meeting follow-up tasks",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-center text-gray-300">
                  <CheckCircle2 className="text-[#00C853]" size={20} />
                  {item}
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex gap-4 mt-10">
              <button className="bg-[#FFE600] text-black font-bold px-6 py-3 rounded-lg hover:scale-105 transition">
                Get started now →
              </button>
              <button className="bg-transparent border border-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                Explore a live demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
