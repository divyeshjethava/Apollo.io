"use client";

import { useState } from "react";
import { ChevronDown, Lock, X } from "lucide-react";

const formatNumber = (num) => {
  if (!num) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num;
};

export default function FilterSidebar({
  filters,
  onFilterChange,
  totalCount = 0,
}) {
  // Expansion State
  const [expanded, setExpanded] = useState({
    lists: false,
    person: false,
    emailStatus: true,
    jobTitles: true,
    peopleLookalikes: false,
    company: true,
    companyLookalikes: false,
    education: false,
    location: true,
    employees: true,
    industry: true,
    marketSegments: false,
    sic: false,
    aiFilters: false,
    buyingIntent: false,
  });

  const toggle = (key) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

  // --- HANDLERS ---

  // 1. Text Inputs (Job, Company, Location)
  const handleInputChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  // 2. Multi-Select Logic (Email, Employees)
  // If item exists, remove it. If not, add it.

  const handleMultiSelect = (key, value) => {
    const currentArray = Array.isArray(filters[key]) ? filters[key] : [];
    let newArray;

    if (currentArray.includes(value)) {
      newArray = currentArray.filter((item) => item !== value);
    } else {
      newArray = [...currentArray, value];
    }

    onFilterChange({ ...filters, [key]: newArray });
  };

  // Helper to check if a specific value is selected
  const isSelected = (key, value) => {
    return Array.isArray(filters[key]) && filters[key].includes(value);
  };

  return (
    <aside className="w-[290px] flex flex-col h-full bg-white border-r border-gray-200 font-sans">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Stats Header */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex gap-2">
            <StatBox label="Total" value={formatNumber(totalCount)} active />
            <StatBox label="Net New" value={formatNumber(totalCount)} />
            {/* FIXED: Removed default '48', set to 0 */}
            <StatBox label="Saved" value="0" />
          </div>
        </div>

        {/* --- FILTERS --- */}

        {/* 1. Lists */}
        <FilterSection
          title="Lists"
          expanded={expanded.lists}
          onToggle={() => toggle("lists")}
        >
          <div className="text-xs text-gray-500 p-2">No lists available</div>
        </FilterSection>

        {/* 2. Person */}
        <FilterSection
          title="Person"
          expanded={expanded.person}
          onToggle={() => toggle("person")}
        >
          <div className="text-xs text-gray-500 p-2">Select a person</div>
        </FilterSection>

        {/* 3. Email Status (Multi-Select) */}
        <FilterSection
          title="Email Status"
          count={filters.emailStatus?.length || 0}
          expanded={expanded.emailStatus}
          onToggle={() => toggle("emailStatus")}
        >
          <div className="space-y-2">
            <CheckboxOption
              label="Verified"
              checked={isSelected("emailStatus", "Verified")}
              onChange={() => handleMultiSelect("emailStatus", "Verified")}
            />
            <CheckboxOption
              label="Unverified"
              checked={isSelected("emailStatus", "Unverified")}
              onChange={() => handleMultiSelect("emailStatus", "Unverified")}
            />
            <CheckboxOption
              label="User managed"
              checked={isSelected("emailStatus", "User managed")}
              onChange={() => handleMultiSelect("emailStatus", "User managed")}
            />
            <CheckboxOption
              label="Unavailable"
              checked={isSelected("emailStatus", "Unavailable")}
              onChange={() => handleMultiSelect("emailStatus", "Unavailable")}
            />
          </div>
        </FilterSection>

        {/* 4. Job Titles */}
        <FilterSection
          title="Job Titles"
          expanded={expanded.jobTitles}
          onToggle={() => toggle("jobTitles")}
        >
          <input
            placeholder="e.g. Manager, Director"
            className="w-full rounded border border-gray-300 px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
            value={filters?.jobTitle || ""}
            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
          />
        </FilterSection>

        {/* 5. Company */}
        <FilterSection
          title="Company"
          expanded={expanded.company}
          onToggle={() => toggle("company")}
        >
          <input
            placeholder="Enter company names"
            className="w-full rounded border border-gray-300 px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
            value={filters?.company || ""}
            onChange={(e) => handleInputChange("company", e.target.value)}
          />
        </FilterSection>

        {/* 6. Education */}
        <FilterSection
          title="Education"
          badge="Beta"
          badgeColor="green"
          expanded={expanded.education}
          onToggle={() => toggle("education")}
        >
          <input
            placeholder="School name"
            className="w-full rounded border border-gray-300 px-2.5 py-1.5 text-xs"
          />
        </FilterSection>

        {/* 7. Location */}
        <FilterSection
          title="Location"
          expanded={expanded.location}
          onToggle={() => toggle("location")}
        >
          <input
            placeholder="City, State, Country"
            className="w-full rounded border border-gray-300 px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
            value={filters?.location || ""}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </FilterSection>

        {/* 8. # Employees (Multi-Select Tags) */}
        <FilterSection
          title="# Employees"
          count={filters.employees?.length || 0}
          expanded={expanded.employees}
          onToggle={() => toggle("employees")}
        >
          {/* FIXED: No default values. User must click to select. */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {[
              "1-10",
              "11-50",
              "51-100",
              "101-200",
              "201-500",
              "500+",
              "1000+",
            ].map((range) => {
              const active = isSelected("employees", range);
              return (
                <button
                  key={range}
                  onClick={() => handleMultiSelect("employees", range)}
                  className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
                    active
                      ? "bg-blue-100 border-blue-200 text-blue-700"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {range}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* 9. Industry */}
        <FilterSection
          title="Industry & Keywords"
          expanded={expanded.industry}
          onToggle={() => toggle("industry")}
        >
          <input
            placeholder="Search industries"
            className="w-full rounded border border-gray-300 px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
            value={filters?.industry || ""}
            onChange={(e) => handleInputChange("industry", e.target.value)}
          />
        </FilterSection>
      </div>

      {/* Footer */}
      <div className="flex-none bg-white border-t border-gray-200 px-4 py-3 text-xs z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() =>
              onFilterChange({
                jobTitle: "",
                company: "",
                location: "",
                industry: "",
                emailStatus: [],
                employees: [],
              })
            }
            className="text-gray-500 hover:text-gray-900 font-medium px-2 py-1.5 rounded hover:bg-gray-100 transition-colors"
          >
            Clear all
          </button>
          <button className="flex-1 text-xs font-semibold text-gray-700 border border-gray-300 rounded px-3 py-2 hover:bg-gray-50 transition-colors shadow-sm">
            More Filters
          </button>
        </div>
      </div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* REUSABLE COMPONENTS                             */
/* -------------------------------------------------------------------------- */

function FilterSection({
  title,
  count,
  badge,
  badgeColor = "gray",
  locked,
  expanded,
  onToggle,
  children,
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="min-h-10 w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 group transition-colors"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="relative flex items-center justify-center w-4 h-4">
            {locked ? (
              <Lock className="w-3 h-3 text-gray-400" />
            ) : (
              <div
                className={`w-1.5 h-1.5 rounded-full ${expanded ? "bg-blue-600" : "bg-gray-400"}`}
              />
            )}
          </div>
          <span className="text-[13px] text-gray-700 font-normal truncate group-hover:text-gray-900">
            {title}
          </span>

          {count > 0 && (
            <span className="ml-1 flex items-center gap-0.5 bg-white border border-gray-300 rounded-full px-1.5 py-0.5 text-[10px] font-medium text-gray-600 shadow-sm">
              <X className="w-2.5 h-2.5 text-gray-400" /> {count}
            </span>
          )}

          {badge && (
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${badgeColor === "green" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600"}`}
            >
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-4 pt-1 pl-10 space-y-2">{children}</div>
      </div>
    </div>
  );
}

function StatBox({ label, value, active }) {
  return (
    <div
      className={`flex-1 rounded-md px-2 py-1.5 text-center cursor-pointer transition-all border ${active ? "bg-blue-50 border-blue-200 shadow-sm" : "hover:bg-gray-50 border-transparent"}`}
    >
      <p
        className={`text-[11px] font-medium ${active ? "text-blue-600" : "text-gray-500"}`}
      >
        {label}
      </p>
      <p
        className={`text-xs font-bold mt-0.5 ${active ? "text-blue-700" : "text-gray-700"}`}
      >
        {value}
      </p>
    </div>
  );
}

// FIXED: Functional Checkbox that accepts onChange
function CheckboxOption({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group select-none">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
        checked={!!checked}
        onChange={onChange}
      />
      <span className="text-xs text-gray-600 group-hover:text-gray-900">
        {label}
      </span>
    </label>
  );
}
