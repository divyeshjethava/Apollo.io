import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export default function Analytics() {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="text-gray-200 p-4 w-full relative">
      {/* Filters Row */}
      <div className="flex items-center gap-4 mb-6">
        <select className="bg-[#ffffff08] border border-[#ffffff15] px-4 py-2 rounded text-sm text-gray-800">
          <option>Select timeframe</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>

        <button
          type="button"
          onClick={() => setOpenFilter(!openFilter)}
          className="px-4 py-2 bg-[#ffffff08] border border-[#ffffff15] rounded text-sm text-gray-800"
        >
          + Add filter
        </button>
      </div>

      {/* CARD */}
      <div className="bg-[#ffffff08] border border-[#ffffff15] rounded-xl p-6 min-h-[420px] relative">
        <h2 className="text-lg font-semibold mb-6 text-gray-900">
          Highest Performing Sequences
        </h2>

        <div className="space-y-6 opacity-60">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-5 bg-gray-800 rounded"></div>
              <div className="flex-1 h-5 bg-gray-800 rounded"></div>
            </div>
          ))}
        </div>

        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 text-center text-gray-500 text-sm font-medium flex flex-col items-center gap-2">
          <div className="w-7 h-7 border border-gray-600 rounded flex items-center justify-center text-xs">
            ▦
          </div>
          No data yet
        </div>
      </div>

      {/* FILTER DROPDOWN */}
      {openFilter && (
        <div className="absolute top-14 left-0 bg-white text-black w-80 max-h-96 overflow-y-auto rounded-xl shadow-xl border p-3 z-50">
          {/* Search */}
          <div className="flex items-center border rounded-lg px-2 mb-3 bg-gray-100">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search filters"
              className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none"
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">User</p>
          <div className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
            User
          </div>
          <hr className="my-2" />

          <p className="text-xs text-gray-500">Task</p>
          <div className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
            Task Type
          </div>
          <div className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
            Task Status
          </div>
          <hr className="my-2" />

          <p className="text-xs text-gray-500">Sequence</p>
          <div className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
            Sequence
          </div>
          <div className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
            Sequence Step Position
          </div>
          <div className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
            Sequence Label
          </div>
          <hr className="my-2" />

          <p className="text-xs text-gray-500">Website Visits</p>
          <div className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
            Page URL
          </div>
          <div className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
            Domain
          </div>
          <div className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
            Account Prospected
          </div>
          <hr className="my-2" />

          <p className="text-xs text-gray-500">Company</p>
          <div className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
            Company
          </div>
          <div className="px-2 py-2 hover:bg-gray-100 rounded cursor-pointer">
            Company # Employees
          </div>
        </div>
      )}
    </div>
  );
}
