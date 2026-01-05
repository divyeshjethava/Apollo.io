"use client"

import { useState } from "react"
import {
  ChevronDown,
  Info,
  AlertTriangle,
  Lock
} from "lucide-react"

export default function FilterSidebar() {
  const [expanded, setExpanded] = useState({
    persona: true,
    lists: false,
    emailStatus: true,
    jobTitles: false,
    company: false,
    education: false,
    location: false,
    employees: false,
    industry: false,
    market: false,
  })

  const toggle = (key) =>
    setExpanded((p) => ({ ...p, [key]: !p[key] }))

  return (
    <aside className="flex flex-col h-250 bg-white">
      <div className="w-[290px] h-screen bg-white border-r border-gray-200 overflow-y-auto">

    
      {/* Stats */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-2">
          <StatBox label="Total" value="87.5M" active />
          <StatBox label="Net New" value="87.5M" />
          <StatBox label="Saved" value="0" />
        </div>
      </div>

      <FilterSection title="Persona" expanded={expanded.persona} onToggle={() => toggle("persona")}>
        <div className="rounded border border-gray-200 p-3">
          <p className="text-sm font-medium text-gray-900">Marketing Leaders</p>
          <p className="text-xs text-gray-500">2 persona matches</p>
        </div>

        <button className="mt-3 w-full rounded border border-gray-300 text-sm py-2 hover:bg-gray-50">
          Create persona
        </button>
      </FilterSection>

      <FilterSection title="Lists" expanded={expanded.lists} onToggle={() => toggle("lists")}>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="w-4 h-4" />
          Include lists
        </label>
      </FilterSection>

      <FilterSection
        title="Email Status"
        badge="1"
        expanded={expanded.emailStatus}
        onToggle={() => toggle("emailStatus")}
      >
        <Group title="Safe to send">
          <Checkbox label="Verified" color="text-emerald-600" />
        </Group>

        <Group title="Send with caution">
          <Checkbox label="Unverified" color="text-amber-600" />
          <Checkbox label="User managed" />
        </Group>

        <Group title="Do not send">
          <Checkbox label="Update required" />
          <Checkbox label="Unavailable" color="text-red-600" />
        </Group>
      </FilterSection>

      <FilterSection title="Job Titles" expanded={expanded.jobTitles} onToggle={() => toggle("jobTitles")}>
        <input
          placeholder="Search job titles"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </FilterSection>

      <FilterSection
        title="People Lookalikes"
        locked
        expanded={false}
        onToggle={() => {}}
      />

      <FilterSection title="Company" expanded={expanded.company} onToggle={() => toggle("company")}>
        <input
          placeholder="Enter company names"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </FilterSection>

      <FilterSection
        title="Education"
        badge="Beta"
        badgeColor="green"
        expanded={expanded.education}
        onToggle={() => toggle("education")}
      >
        <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
          <option>Select school</option>
        </select>
      </FilterSection>

      <FilterSection title="Location" expanded={expanded.location} onToggle={() => toggle("location")}>
        <input
          placeholder="City, State, Country"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
      </FilterSection>

      <FilterSection title="# Employees" expanded={expanded.employees} onToggle={() => toggle("employees")}>
        {["1–10", "11–50", "51–200", "201–500", "500+"].map((r) => (
          <Checkbox key={r} label={r} />
        ))}
      </FilterSection>

      <FilterSection title="Industry & Keywords" expanded={expanded.industry} onToggle={() => toggle("industry")}>
        <input
          placeholder="Search industries"
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
        />
        <p className="mt-2 text-xs text-gray-500 flex gap-1">
          <AlertTriangle className="w-3 h-3 mt-0.5" />
          Keywords may slow search
        </p>
      </FilterSection>

      <FilterSection title="Market Segments" expanded={expanded.market} onToggle={() => toggle("market")}>
        {["B2B", "B2C", "SaaS", "Fintech"].map((m) => (
          <Checkbox key={m} label={m} />
        ))}
      </FilterSection>

      
     </div>
      <div className="sticky bottom-0 z-40 bg-white border-t border-gray-200 px-4 py-3 text-sm">
        <div className="flex items-center justify-between p-4 border-t border-gray-200 gap-2">
            {/* Bottom */}
    
        <button className="flex-1 text-sm text-gray-500 hover:text-gray-900">
          Clear all
        </button>
        <button className="flex-1 text-sm text-blue-600 hover:text-blue-700">
          More filters
        </button>
      </div>
        </div>
       
    </aside>
  )
}

/* ---------- Components ---------- */

function FilterSection({
  title,
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
        className="h-12 w-full px-4 flex items-center justify-between hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{title}</span>

          {badge && (
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded ${
                badgeColor === "green"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {badge}
            </span>
          )}

          {locked && <Lock className="w-3 h-3 text-gray-400" />}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          expanded ? "max-h-[1500px]" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-3 text-sm text-gray-700">
          {children}
        </div>
      </div>
    </div>
  )
}

function StatBox({ label, value, active }) {
  return (
    <div
      className={`flex-1 rounded px-3 py-2 ${
        active ? "bg-blue-50" : "bg-gray-50"
      }`}
    >
      <p className="text-[10px] uppercase text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  )
}

function Group({ title, children }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function Checkbox({ label, color = "text-gray-700" }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input type="checkbox" className="w-4 h-4" />
      <span className={color}>{label}</span>
    </label>
  )
}
