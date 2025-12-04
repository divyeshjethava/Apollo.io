import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Filter } from "lucide-react";
import EmailFilters from "./EmailFilters"; // your existing filters panel

export default function AllEmails() {
  const [open, setOpen] = useState(false); // inbox dropdown
  const [showFilters, setShowFilters] = useState(false); // filters
  const [activeTab, setActiveTab] = useState("all");
  const dropdownRef = useRef(null);

  const viewsList = [
    "Scheduled emails this week",
    "Positive replies",
    "All inboxes",
    "My inbox",
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          {/* ALL INBOXES BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="border px-3 py-2 rounded-md text-sm flex items-center gap-2 bg-white hover:bg-gray-50"
          >
            All inboxes ▼
          </button>

          {/* SHOW / HIDE FILTERS */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="border px-3 py-2 rounded-md text-sm flex items-center gap-2 bg-white hover:bg-gray-50"
          >
            <Filter size={16} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="Search emails"
            className="border px-4 py-2 rounded-md w-64 text-sm bg-white hover:bg-gray-50"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="border px-3 py-2 rounded-md text-sm bg-white hover:bg-gray-50">
            Save as new view
          </button>
          <button className="border px-3 py-2 rounded-md text-sm bg-white hover:bg-gray-50">
            View options
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="absolute left-0 top-20 z-40 animate-fadeIn">
          <EmailFilters visible={showFilters} />
        </div>
      )}

      {/* ALL INBOXES BIG DROPDOWN */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute z-50 top-12 left-0 w-96 bg-white rounded-lg shadow-xl border p-4 animate-fadeIn"
        >
          {/* Search in dropdown */}
          <input
            type="text"
            placeholder="Search views"
            className="border w-full px-3 py-2 rounded-md text-sm mb-4"
          />

          {/* Tabs */}
          <div className="flex gap-6 border-b pb-2 mb-4 text-sm">
            {["all", "your", "starred", "shared"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-1 capitalize ${
                  activeTab === tab
                    ? "font-medium border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab === "all" && "All views"}
                {tab === "your" && "Your views"}
                {tab === "starred" && "Starred"}
                {tab === "shared" && "Shared"}
              </button>
            ))}
          </div>

          {/* ALL VIEWS TAB */}
          {activeTab === "all" && (
            <div className="space-y-2 text-sm">
              {viewsList.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="border w-6 h-6 rounded flex items-center justify-center text-xs bg-gray-50">
                      📄
                    </div>
                    <span>{name}</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                      System
                    </span>
                  </div>
                  <MoreHorizontal size={18} className="text-gray-500" />
                </div>
              ))}

              <button className="mt-3 w-full bg-yellow-300 py-2 rounded-md font-medium hover:bg-yellow-400">
                Create new view
              </button>
            </div>
          )}

          {/* EMPTY STYLES (Your, Starred, Shared) */}
          {["your", "starred", "shared"].includes(activeTab) && (
            <div className="flex flex-col items-center py-6 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png"
                className="w-16 opacity-80 mb-4"
              />

              <h2 className="font-medium">No views list to see yet</h2>
              <p className="text-gray-500 text-sm mt-1 px-4">
                Create a new view and get your data organized. Or, get a quick
                start with a shared or system view.
              </p>

              <button className="mt-4 bg-yellow-300 px-4 py-2 rounded-md font-medium hover:bg-yellow-400">
                Create new view
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Page Empty State */}
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
          className="w-20 opacity-70 mb-4"
        />
        <h2 className="text-lg font-medium">You have no emails</h2>
        <p className="text-gray-500 text-sm mt-1">
          It looks like you haven’t sent any emails yet. Once you start — your
          emails will appear here!
        </p>
      </div>
    </div>
  );
}
