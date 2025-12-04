import { Phone, HelpCircle } from "lucide-react";

export default function Calls() {
  return (
    <div className="min-h-screen bg-white relative p-8">
      {/* Top Right — New Call Button */}
      <button className="absolute top-6 right-6 bg-yellow-300 hover:bg-yellow-400 text-black px-5 py-2 rounded-md font-medium">
        New call
      </button>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-10">Calls</h1>

      {/* Main Center Content */}
      <div className="flex flex-col items-center justify-center text-center mt-10">
        {/* Image / Illustration Mock Box */}
        <div className="w-[500px] h-[260px] bg-white border rounded-xl shadow-sm p-6 mb-10">
          <div className="flex justify-between mb-4 opacity-60">
            <div className="flex gap-3">
              <div className="w-4 h-4 rounded-full bg-gray-200" />
              <div className="w-4 h-4 rounded-full bg-gray-200" />
              <div className="w-4 h-4 rounded-full bg-gray-200" />
            </div>
            <div className="w-40 h-6 bg-gray-100 rounded-md" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-blue-500 font-medium">54% YOU</span>
              <span className="text-green-500 font-medium">46% PHILIPS</span>
            </div>

            <div className="h-2 w-full bg-gray-200 rounded-md" />
            <div className="h-2 w-full bg-gray-200 rounded-md" />

            <div className="mt-6 space-y-2">
              <div className="h-3 bg-gray-100 rounded-md w-4/5" />
              <div className="h-3 bg-gray-100 rounded-md w-3/5" />
              <div className="h-3 bg-gray-100 rounded-md w-2/3" />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold mb-3">
            Voice Dialer and Call Tasks
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            Make, answer, record and transcribe calls with Apollo while
            automatically syncing them with your CRM.
          </p>

          {/* Upgrade Button */}
          <button className="mt-6 bg-yellow-300 hover:bg-yellow-400 px-5 py-2 font-medium rounded-md">
            Upgrade to Professional
          </button>

          {/* Recommended Text */}
          <div className="mt-4 text-gray-500 text-sm flex items-center justify-center gap-2">
            <Phone size={14} />
            Recommended for teams that cold call.
          </div>
        </div>
      </div>

      {/* Bottom Right Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
        <HelpCircle size={22} />
      </button>
    </div>
  );
}
