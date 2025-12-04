import { AlertTriangle } from "lucide-react";

export default function Meetings() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800">Meetings</h1>
      {/* Main Section */}
      <div className="grid grid-cols-2 gap-12">
        {/* Left Calendar Preview */}
        <div className="border p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Select date</h2>

          <div className="w-full h-80 bg-purple-100 rounded-xl flex items-center justify-center">
            <p className="text-gray-600 italic">Calendar Preview</p>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Time zone: (GMT-05:00) America/New_York
          </p>
        </div>

        {/* Right Text Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4">
            Simplify scheduling and run more effective meetings
          </h1>

          <p className="text-gray-700 mb-6">Works with conferencing apps:</p>

          <div className="flex gap-3 mb-6 text-3xl">
            <span>
              <img src="https://img.icons8.com/color/48/zoom.png" width="50" />
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

          <ul className="space-y-3 text-gray-600">
            <li>
              ✔ Let customers easily book meetings through your booking link
            </li>
            <li>✔ Get AI-powered insights to prep for upcoming meetings</li>
            <li>✔ Link meetings to contacts and accounts</li>
          </ul>

          <button className="mt-6 px-5 py-2 bg-yellow-400 rounded font-semibold hover:bg-yellow-500">
            Connect calendar
          </button>
        </div>
      </div>
    </div>
  );
}
