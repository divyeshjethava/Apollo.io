"use client";

import React, { useEffect, useState, useMemo, memo, useRef } from "react";
import {
  Mail,
  Phone,
  Plus,
  ArrowRight,
  MoreHorizontal,
  Briefcase,
} from "lucide-react";

/* =========================
   MEMOIZED ROW COMPONENT
========================= */
const TableRow = memo(({ p, isSelected, onSelect }) => {
  return (
    <tr
      className={`group transition-colors ${
        isSelected ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
    >
      {/* Checkbox */}
      <td
        className={`sticky left-0 z-20 px-3 py-2 border-b border-gray-100 ${
          isSelected ? "bg-blue-50" : "bg-white group-hover:bg-gray-50"
        }`}
      >
        <input
          type="checkbox"
          className="rounded border-gray-300 cursor-pointer"
          checked={isSelected}
          onChange={() => onSelect(p._id)}
        />
      </td>

      {/* Name */}
      <td
        className={`sticky left-10 z-20 px-3 py-2 border-r border-b border-gray-100 ${
          isSelected ? "bg-blue-50" : "bg-white group-hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-2 overflow-hidden max-w-[200px]">
          {p.image ? (
            <img
              src={p.image}
              alt={p.name}
              className="w-6 h-6 rounded-full object-cover border border-gray-200 shrink-0"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">
              {p.name.charAt(0)}
            </div>
          )}
          <span className="font-medium text-gray-900 truncate" title={p.name}>
            {p.name}
          </span>
        </div>
      </td>

      <td className="px-3 py-2 border-b border-gray-100 truncate max-w-[180px]">
        {p.title}
      </td>

      <td className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-gray-200 rounded text-gray-500">
            <Plus size={14} />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded text-gray-500">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </td>

      <td className="px-3 py-2 border-b border-gray-100 truncate max-w-[180px]">
        {p.company}
      </td>

      <td className="px-3 py-2 border-b border-gray-100">
        {p.email !== "-" && (
          <div className="flex items-center gap-1.5 border border-gray-200 px-2 py-0.5 rounded bg-white w-fit max-w-full">
            <Mail size={12} className="text-gray-400 shrink-0" />
            <span className="truncate max-w-[180px]">{p.email}</span>
          </div>
        )}
      </td>

      <td className="px-3 py-2 border-b border-gray-100">
        {p.phone !== "-" && (
          <div className="flex items-center gap-1.5 border border-gray-200 px-2 py-0.5 rounded bg-white w-fit max-w-full">
            <Phone size={12} className="text-gray-400 shrink-0" />
            <span className="truncate max-w-[140px]">{p.phone}</span>
          </div>
        )}
      </td>

      <td className="px-3 py-2 border-b border-gray-100 text-gray-400">
        <div className="flex gap-2">
          {p.linkedin !== "-" && (
            <Briefcase
              size={14}
              className="hover:text-blue-600 cursor-pointer"
            />
          )}
          {p.website !== "-" && (
            <ArrowRight
              size={14}
              className="hover:text-blue-600 cursor-pointer"
            />
          )}
        </div>
      </td>

      <td className="px-3 py-2 border-b border-gray-100 truncate max-w-[180px]">
        {p.location}
      </td>

      <td className="px-3 py-2 border-b border-gray-100">
        <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-medium text-gray-600">
          {p.employees}
        </span>
      </td>

      <td className="px-3 py-2 border-b border-gray-100 truncate max-w-[180px]">
        {p.industries[0]}
      </td>
    </tr>
  );
});

/* =========================
   MAIN COMPONENT
========================= */

export default function PeopleTable({ filters, setTotalCount }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [total, setTotal] = useState(0);

  const scrollRef = useRef(null);

  // Reset when filters change
  useEffect(() => {
    setPeople([]);
    setSelectedIds(new Set());
    setPage(1);
  }, [filters]);

  useEffect(() => {
    fetchPeople();
  }, [page, filters]);

  const fetchPeople = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        q: filters?.jobTitle || "",
      });

      const res = await fetch(`http://localhost:4000/api/items?${queryParams}`);

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();

      const list = (data.items || []).map((p) => {
        const f = p.fields || {};
        return {
          _id: p._id,
          name:
            `${f["First Name"] || ""} ${f["Last Name"] || ""}`.trim() || "-",
          title: f["Title"] || "-",
          company: f["Company"] || "-",
          location: f["Location"] || "-",
          email: f["Email"] || "-",
          phone: f["Phone"] || "-",
          employees: f["# Employees"] || "-",
          industries: [f["Industry"] || "-"],
          image: null,
          linkedin: f["Person Linkedin Url"] || "-",
          website: f["Website"] || "-",
          status: f["Email Status"] || "Unverified",
        };
      });

      setPeople((prev) => (page === 1 ? list : [...prev, ...list]));
      setTotal(data.total || 0);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Infinite Scroll
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || loading) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
      if (people.length < total) {
        setPage((prev) => prev + 1);
      }
    }
  };

  // Select Handlers
  const handleSelectOne = (id) => {
    setSelectedIds((prev) => {
      const set = new Set(prev);
      set.has(id) ? set.delete(id) : set.add(id);
      return set;
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = people.map((p) => p._id);
      setSelectedIds(new Set(allIds));
    } else {
      setSelectedIds(new Set());
    }
  };

  const isAllSelected =
    people.length > 0 && people.every((p) => selectedIds.has(p._id));

  if (loading && page === 1) {
    return (
      <div className="p-10 text-center text-sm text-gray-500">
        Loading leads...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-auto border-b border-gray-200"
      >
        <table className="w-max table-fixed border-collapse">
          <thead className="sticky top-0 z-30 bg-white shadow-sm text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
            <tr>
              <th className="sticky left-0 z-40 bg-white px-3 py-2 border-b border-gray-200">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-3 py-2 text-left border-b border-gray-200">
                Name
              </th>
              <th className="px-3 py-2 text-left border-b border-gray-200">
                Job Title
              </th>
              <th className="px-3 py-2 text-left border-b border-gray-200">
                Actions
              </th>
              <th className="px-3 py-2 text-left border-b border-gray-200">
                Company
              </th>
              <th className="px-3 py-2 text-left border-b border-gray-200">
                Emails
              </th>
              <th className="px-3 py-2 text-left border-b border-gray-200">
                Phones
              </th>
              <th className="px-3 py-2 text-left border-b border-gray-200">
                Links
              </th>
              <th className="px-3 py-2 text-left border-b border-gray-200">
                Location
              </th>
              <th className="px-3 py-2 text-left border-b border-gray-200">
                Employees
              </th>
              <th className="px-3 py-2 text-left border-b border-gray-200">
                Industries
              </th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {people.map((p) => (
              <TableRow
                key={p._id}
                p={p}
                isSelected={selectedIds.has(p._id)}
                onSelect={handleSelectOne}
              />
            ))}
          </tbody>
        </table>

        {loading && page > 1 && (
          <div className="p-4 text-center text-xs text-gray-400">
            Loading more...
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-2 text-sm text-gray-600">
        Showing {people.length} of {total}
        {selectedIds.size > 0 && (
          <span className="ml-4 text-blue-600 font-medium">
            {selectedIds.size} selected
          </span>
        )}
      </div>
    </div>
  );
}
