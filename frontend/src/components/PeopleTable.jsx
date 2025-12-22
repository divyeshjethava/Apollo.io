"use client"

import {
  Mail,
  Phone,
  Plus,
  Play,
  ArrowRight,
  MoreHorizontal,
  Briefcase,
} from "lucide-react"

const people = [
  {
    name: "Mike Braham",
    title: "Chief Growth Officer",
    company: "Intempo Health",
    location: "Spotsylvania Courthouse, Virginia",
    employees: "4",
    industries: ["Information Technology & Services"],
    keywords: ["health", "saas"],
  },
  {
    name: "Bill Gates",
    title: "Founder",
    company: "Microsoft",
    location: "Seattle, Washington",
    employees: "228,000",
    industries: ["Business Software"],
    keywords: ["software", "cloud", "+207"],
  },
  {
    name: "Bobby Purnama",
    title: "General Purchase & Customs",
    company: "Hyundai Motor Company",
    location: "West Java, Indonesia",
    employees: "76,000",
    industries: ["Automotive"],
    keywords: ["automotive", "global", "+119"],
  },
  {
    name: "Christian Luedders",
    title: "Product Designer",
    company: "NovaTaste",
    location: "Hamburg, Germany",
    employees: "2,300",
    industries: ["Food & Beverages"],
    keywords: ["+4"],
  },
  {
    name: "Yunming Shao",
    title: "Managing Director",
    company: "The Hina Group",
    location: "China",
    employees: "140",
    industries: ["Investment Banking"],
    keywords: ["+84"],
  },
  {
    name: "Carol Smith",
    title: "Financial Services Client Director",
    company: "EY",
    location: "Bloomington, Illinois",
    employees: "400,000",
    industries: ["+2"],
    keywords: ["advisory", "+219"],
  },
  {
    name: "Larry Fink",
    title: "Chairman and CEO",
    company: "BlackRock",
    location: "New York, New York",
    employees: "23,000",
    industries: ["Financial Services"],
    keywords: ["financial services", "+112"],
  },
  {
    name: "Crawford How",
    title: "Sales Representative",
    company: "Vendella",
    location: "Rangiora, New Zealand",
    employees: "47",
    industries: ["Hospitality"],
    keywords: ["vendella", "+39"],
  },
]

export default function PeopleTable() {
  return (
    // 🔑 MAIN CONTAINER (NO OVERFLOW HERE)
    <div className="flex flex-col h-full bg-white">

      {/* 🔑 SCROLL AREA (TABLE ONLY) */}
      <div className="flex-1 min-h-0 overflow-auto">
        <table className="min-w-[2400px] w-full border-collapse">

          {/* HEADER */}
          <thead className="sticky top-0 bg-white z-20">
            <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
              <th className="sticky left-0 z-30 bg-white px-4 py-3 w-[44px]">
                <input type="checkbox" />
              </th>

              <th className="sticky left-[44px] z-30 bg-white px-4 py-3 min-w-[220px]">
                Name
              </th>

              <th className="px-4 py-3 min-w-[260px]">Job Title</th>
              <th className="px-4 py-3 min-w-[180px]">Qualify Contact</th>
              <th className="px-4 py-3 min-w-[260px]">Company</th>
              <th className="px-4 py-3 min-w-[200px]">Emails</th>
              <th className="px-4 py-3 min-w-[220px]">Phone Numbers</th>
              <th className="px-4 py-3 min-w-[160px]">Actions</th>
              <th className="px-4 py-3 min-w-[120px]">Links</th>
              <th className="px-4 py-3 min-w-[240px]">Location</th>
              <th className="px-4 py-3 min-w-[220px]">
                Company · Number of employees
              </th>
              <th className="px-4 py-3 min-w-[260px]">
                Company · Industries
              </th>
              <th className="px-4 py-3 min-w-[260px]">
                Company · Keywords
              </th>

              <th className="sticky right-0 z-30 bg-white px-4 py-3 min-w-[160px] text-right">
                + Add Column
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {people.map((p, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="sticky left-0 z-20 bg-white px-4 py-3">
                  <input type="checkbox" />
                </td>

                <td className="sticky left-[44px] z-20 bg-white px-4 py-3 font-medium underline cursor-pointer">
                  {p.name}
                </td>

                <td className="px-4 py-3">{p.title}</td>

                <td className="px-4 py-3 text-blue-600 cursor-pointer">
                  ▶ Click to run
                </td>

                <td className="px-4 py-3">{p.company}</td>

                <td className="px-4 py-3">
                  <button className="flex items-center gap-1 border px-3 py-1 rounded text-sm">
                    <Mail size={14} /> Access email
                  </button>
                </td>

                <td className="px-4 py-3">
                  <button className="flex items-center gap-1 border px-3 py-1 rounded text-sm">
                    <Phone size={14} /> Access Mobile
                  </button>
                </td>

                <td className="px-4 py-3 flex items-center gap-2">
                  <Plus size={16} />
                  <Play size={16} />
                  <ArrowRight size={16} />
                  <MoreHorizontal size={16} />
                </td>

                <td className="px-4 py-3">
                  <Briefcase size={18} />
                </td>

                <td className="px-4 py-3">{p.location}</td>

                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                    {p.employees}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {p.industries.map((ind, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 mr-1 bg-gray-100 rounded text-xs"
                    >
                      {ind}
                    </span>
                  ))}
                </td>

                <td className="px-4 py-3">
                  {p.keywords.map((k, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 mr-1 bg-gray-100 rounded text-xs"
                    >
                      {k}
                    </span>
                  ))}
                </td>

                <td className="sticky right-0 z-20 bg-white px-4 py-3 text-right">
                  ⋮
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔒 STICKY FOOTER */}
      <div className="sticky bottom-0 z-40 bg-white border-t border-gray-200 px-4 py-3 text-sm">
        <div className="flex items-center justify-between">
          <span>1 – 8 of 87.5M</span>
          <div className="flex gap-2">
            <button className="border px-3 py-1 rounded hover:bg-gray-50">
              Prev
            </button>
            <button className="border px-3 py-1 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
