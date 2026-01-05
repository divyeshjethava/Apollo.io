"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import {
  Mail,
  Phone,
  Plus,
  Play,
  ArrowRight,
  MoreHorizontal,
  Briefcase,
} from "lucide-react";

export default function PeopleTable() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchPeople(page);
  }, [page]);

  const fetchPeople = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/api/items?page=${pageNum}&limit=${limit}`);

      // Map backend data to table-friendly format
      const list = Array.isArray(res.data?.items)
        ? res.data.items.map((p) => ({
            _id: p._id,
            name:
              p.fields?.["First Name"] && p.fields?.["Last Name"]
                ? `${p.fields["First Name"]} ${p.fields["Last Name"]}`
                : "-",
            title: p.fields?.Title || "-",
            company: p.fields?.Company || "-",
            location: p.fields?.["Company City"] || "-",
            employees: p.fields?.["# Employees"] || "-",
            industries: p.fields?.Industry ? [p.fields.Industry] : ["-"],
            keywords: [], // add keywords if exist in your API
            email: p.fields?.Email || "-",
            phone: p.fields?.["Company Phone"] || "-",
            linkedin: p.fields?.["Person Linkedin Url"] || "-",
            website: p.fields?.Website || "-",
          }))
        : [];

      setPeople(list);
      setTotal(res.data?.total ?? 0);
    } catch (err) {
      console.error("API Error:", err);
      setPeople([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const formatTotal = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num;
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-250 bg-white">
      <div className="flex-1 min-h-0 overflow-auto">
        <table className="min-w-[2400px] w-full border-collapse">
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
              <th className="px-4 py-3 min-w-[260px]">Company · Industries</th>
              <th className="px-4 py-3 min-w-[260px]">Company · Keywords</th>
              <th className="fixed right-10 z-50 bg-white px-10 py-4 min-w-[140px] text-right">
                + Add Column
              </th>
            </tr>
          </thead>

          <tbody>
            {people.map((p) => (
              <tr
                key={p._id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
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
                    <Mail size={14} /> {p.email || "-"}
                  </button>
                </td>

                <td className="px-4 py-3">
                  <button className="flex items-center gap-1 border px-3 py-1 rounded text-sm">
                    <Phone size={14} /> {p.phone || "-"}
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
                  {p.keywords.length
                    ? p.keywords.map((k, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 mr-1 bg-gray-100 rounded text-xs"
                        >
                          {k}
                        </span>
                      ))
                    : "-"}
                </td>

                <td className="sticky right-0 z-20 bg-white px-4 py-3 text-right">
                  ⋮
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 z-40 bg-white border-t border-gray-200 px-4 py-3 text-sm">
        <div className="flex items-center justify-between">
          <span>
            {formatTotal((page - 1) * limit + 1)} –{" "}
            {formatTotal(Math.min(page * limit, total))} of{" "}
            {formatTotal(total)}
          </span>

          <div className="flex gap-2">
            <button
              className="border px-3 py-1 rounded hover:bg-gray-50"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <button
              className="border px-3 py-1 rounded hover:bg-gray-50"
              onClick={() => setPage((p) => p + 1)}
              disabled={page * limit >= total}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
