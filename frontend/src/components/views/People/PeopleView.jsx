import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import FilterSidebar from "../../FilterSidebar";
import PeopleTable from "../../PeopleTable";
import { useNavigate } from "react-router-dom";

export default function PeopleView() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">People</h1>

            <div className="mt-3 flex gap-2 items-center">
              <button className="px-3 py-1.5 border rounded text-sm">
                Default view
              </button>

              <button className="px-3 py-1.5 border rounded text-sm">
                Hide Filters
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 border rounded text-sm">
                <Search size={16} />
                Search people
              </div>

              <button
                className="flex items-center gap-2 px-3 py-1.5 border rounded text-sm cursor-pointer"
                onClick={() => navigate("/people/create")}
              >
                Create lead
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded text-sm flex items-center gap-2">
              <Sparkles size={16} />
              Research with AI
            </button>
            <button className="px-4 py-2 border rounded text-sm">Import</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar (fixed width) */}
        <div className="w-[290px] border-r border-gray-200">
          <FilterSidebar />
        </div>

        {/* Table (fluid width) */}
        <div className="flex-1 min-w-0">
          <PeopleTable />
        </div>
      </div>
    </div>
  );
}
