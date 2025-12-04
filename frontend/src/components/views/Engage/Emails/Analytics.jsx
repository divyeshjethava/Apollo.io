import { useState, useRef, useEffect } from "react";
import { ChevronDown, MoreHorizontal } from "lucide-react";

export default function Analytics() {
  const [timeframe, setTimeframe] = useState("Select timeframe");
  const [openDropdown, setOpenDropdown] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("None");

  const dropdownRef = useRef(null);
  const filterRef = useRef(null);

  const timeframeOptions = [
    "Today",
    "Yesterday",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "This month",
    "Last month",
    "This year",
    "Custom range",
  ];

  const filterOptions = [
    "Email sent",
    "Email opened",
    "Replied",
    "Bounced",
    "Marked as spam",
    "Delivered",
  ];

  // Close BOTH dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }

      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const stats = [
    { label: "# Emails sent", value: 0, date: "From Nov 17" },
    { label: "# Emails opened (bots included)", value: 0, date: "From Nov 17" },
    { label: "# Emails replied", value: 0, date: "From Nov 17" },
    { label: "% Emails spam blocked", value: "0%", date: "From Nov 17" },
  ];

  return (
    <div className="p-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        {/* Timeframe Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="border px-4 py-2 rounded-md flex items-center gap-2 bg-white w-48 justify-between hover:bg-gray-50"
          >
            {timeframe}
            <ChevronDown
              size={16}
              className={`transition-transform ${
                openDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown && (
            <div className="absolute z-20 mt-2 bg-white border rounded-md shadow-lg w-48 py-1">
              {timeframeOptions.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setTimeframe(option);
                    setOpenDropdown(false);
                  }}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Filter Button */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="border px-4 py-2 rounded-md bg-white hover:bg-gray-50"
          >
            + Add filter
          </button>

          {/* Filter Dropdown */}
          {openFilter && (
            <div className="absolute right-0 mt-2 z-20 bg-white border rounded-md shadow-lg w-52 py-1">
              {filterOptions.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedFilter(option);
                    setOpenFilter(false);
                  }}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Show Selected Filter */}
      {selectedFilter !== "None" && (
        <div className="mt-3 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm">
          Filter: {selectedFilter}
        </div>
      )}

      {/* Email Stats */}
      <div className="grid grid-cols-4 gap-6 mt-6 bg-white p-6 rounded-lg shadow-sm border">
        {stats.map((item, index) => (
          <div key={index} className="border-r last:border-none pr-4">
            <p className="text-sm text-gray-600">{item.label}</p>
            <h2 className="text-3xl font-semibold mt-2">{item.value}</h2>
            <p className="text-xs text-gray-500 mt-1">{item.date}</p>
          </div>
        ))}
      </div>

      {/* Email Funnel */}
      <div className="mt-8 border rounded-lg p-8 bg-white shadow-sm relative">
        <p className="text-lg font-medium mb-4">Email Funnel</p>

        <div className="flex items-center justify-center h-40 text-gray-500">
          <div className="text-center">
            <div className="text-gray-300 text-5xl mb-3">📊</div>
            <p>No data available</p>
          </div>
        </div>

        <MoreHorizontal className="absolute right-4 top-4 cursor-pointer" />
      </div>

      {/* Reps with Most Effective Emails */}
      <div className="mt-8 border rounded-lg p-8 bg-white shadow-sm relative">
        <p className="text-lg font-medium mb-4">
          Reps with Most Effective Emails
        </p>

        <div className="flex items-center justify-center h-40 text-gray-500">
          <div className="text-center w-80">
            <div className="text-gray-300 text-4xl mb-3">📄</div>
            <p className="font-medium">No data yet</p>
            <p className="text-sm text-gray-500 mt-1">
              You'll need to update the combination of metrics, group bys, and
              filters.
            </p>
          </div>
        </div>

        <MoreHorizontal className="absolute right-4 top-4 cursor-pointer" />
      </div>

      {/* Email Activity By Week */}
      <div className="mt-8 border rounded-lg p-8 bg-white shadow-sm relative">
        <p className="text-lg font-medium mb-4">Email Activity By Week</p>

        <div className="flex items-center justify-center h-48 text-gray-400 italic">
          (Chart Placeholder — No data available)
        </div>

        <MoreHorizontal className="absolute right-4 top-4 cursor-pointer" />
      </div>
    </div>
  );
}
