import { AlertTriangle } from "lucide-react";
import { PiNewspaperLight } from "react-icons/pi";

export default function Templates() {
  return (
    <div className="w-full min-h-screen bg-white p-6 relative">
      {/* TOP BAR WITH TABS */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6 text-sm font-medium"></div>

        {/* CREATE TEMPLATE (TOP RIGHT) */}
        <button className="bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded-md font-medium text-sm">
          Create template
        </button>
      </div>

      {/* EMPTY STATE */}
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <PiNewspaperLight size={100} />

        <h2 className="text-xl font-semibold">No Email Templates</h2>
        <p className="text-gray-500 text-sm mt-1 max-w-lg">
          You don't have any Email Templates yet. Learn more here or check out
          our top performing templates here.
        </p>

        <button className="mt-5 bg-yellow-300 hover:bg-yellow-400 px-5 py-2 rounded-md font-medium text-sm">
          Create New Template
        </button>

        <p className="text-gray-500 text-xs mt-3 flex items-center gap-1">
          ✉ Templates can automate your process.
        </p>
      </div>

      {/* Bottom-right help bubble */}
      <button className="w-12 h-12 rounded-full bg-black text-white text-xl flex items-center justify-center shadow-xl fixed bottom-6 right-6">
        ?
      </button>
    </div>
  );
}
