"use client";

import React, { useEffect, useState, useMemo, memo } from "react";
import {
  Mail, Phone, Plus, Play, ArrowRight, MoreHorizontal, Briefcase,
} from "lucide-react";

// --- 1. MEMOIZED ROW COMPONENT ---
const TableRow = memo(({ p, isSelected, onSelect }) => {
  return (
    <tr className={`group transition-colors h-[40px] ${isSelected ? "bg-blue-50" : "hover:bg-gray-50"}`}>
      {/* Checkbox Column */}
      <td className={`sticky left-0 z-20 px-3 py-2 border-b border-gray-100 ${isSelected ? "bg-blue-50" : "bg-white group-hover:bg-gray-50"}`}>
        <input 
          type="checkbox" 
          className="rounded border-gray-300 cursor-pointer" 
          checked={isSelected} 
          onChange={() => onSelect(p._id)} 
        />
      </td>

      {/* Name Column */}
      <td className={`sticky left-[40px] z-20 px-3 py-2 border-r border-gray-200 border-b border-gray-100 ${isSelected ? "bg-blue-50" : "bg-white group-hover:bg-gray-50"}`}>
        <div className="flex items-center gap-2 overflow-hidden max-w-[200px]">
          {p.image ? (
            <img src={p.image} alt={p.name} className="w-6 h-6 rounded-full object-cover border border-gray-200 shrink-0" />
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

      <td className="px-3 py-2 border-b border-gray-100 truncate max-w-[180px]" title={p.title}>
        {p.title}
      </td>

      <td className="px-3 py-2 border-b border-gray-100">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><Plus size={14} /></button>
          <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><MoreHorizontal size={14} /></button>
        </div>
      </td>

      <td className="px-3 py-2 border-b border-gray-100 font-medium text-gray-800 truncate max-w-[180px]" title={p.company}>
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
          {p.linkedin !== "-" && <Briefcase size={14} className="hover:text-blue-600 cursor-pointer" />}
          {p.website !== "-" && <ArrowRight size={14} className="hover:text-blue-600 cursor-pointer" />}
        </div>
      </td>

      <td className="px-3 py-2 border-b border-gray-100 text-gray-600 truncate max-w-[180px]" title={p.location}>
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

// --- MAIN TABLE COMPONENT ---

export default function PeopleTable({ filters, setTotalCount }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchPeople();
  }, [page]);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [page]);

  const fetchPeople = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/leads");
      const data = await res.json();

      const list = Array.isArray(data)
        ? data.map((p) => {
             const fields = p.fields || {};
             const firstName = p.firstName || fields["First Name"] || "";
             const lastName = p.lastName || fields["Last Name"] || "";
             const fullName = `${firstName} ${lastName}`.trim() || "-";
             
             let location = "-";
             if (p.city || p.country) {
                location = [p.city, p.country].filter(Boolean).join(", ");
             } else if (fields["Company City"]) {
                location = fields["Company City"];
             }

             const industries = p.industry ? [p.industry] : (fields.Industry ? [fields.Industry] : ["-"]);
             const employees = p.employees || fields["# Employees"] || "-";

             return {
               _id: p._id,
               name: fullName,
               title: p.title || fields.Title || "-",
               company: p.company || fields.Company || "-",
               location: location,
               email: p.email || fields.Email || "-",
               phone: p.phone || fields["Company Phone"] || "-",
               employees: employees,
               industries: industries,
               image: p.profileImagePath || null,
               linkedin: p.linkedin || fields["Person Linkedin Url"] || "-",
               website: p.website || fields.Website || "-",
               status: p.leadStatus
             };
          })
        : [];

      setPeople(list);
      setTotal(list.length);
      
    } catch (err) {
      console.error("API Error:", err);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  };

  // --- FILTER LOGIC (With Employee Fix) ---
  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      // 1. Text Search
      const matches = (text, filterText) => {
        if (!filterText) return true;
        return String(text || "").toLowerCase().includes(filterText.toLowerCase());
      };

      // 2. Email Status
      const matchesStatus = (status, filterArray) => {
        if (!filterArray || filterArray.length === 0) return true;
        return filterArray.includes(status || "Unverified");
      };

      // 3. Employee Count (Range Logic)
      const matchesEmployees = (empCount, filterArray) => {
        if (!filterArray || filterArray.length === 0) return true;
        
        const count = parseInt(empCount, 10);
        if (isNaN(count)) return false; 

        return filterArray.some(range => {
           if (range === "500+" || range === "1000+") {
               const min = parseInt(range, 10);
               return count >= min;
           }
           const [min, max] = range.split('-').map(Number);
           return count >= min && count <= max;
        });
      };

      return (
        matches(person.title, filters?.jobTitle) &&
        matches(person.company, filters?.company) &&
        matches(person.location, filters?.location) &&
        matchesStatus(person.status, filters?.emailStatus) && 
        matchesEmployees(person.employees, filters?.employees) &&
        (filters?.industry 
          ? person.industries.some(ind => matches(ind, filters.industry)) 
          : true)
      );
    });
  }, [people, filters]);

  useEffect(() => {
    if (setTotalCount) {
      setTotalCount(filteredPeople.length);
    }
  }, [filteredPeople.length, setTotalCount]);

  // --- HANDLERS ---
  const handleSelectOne = (id) => {
    setSelectedIds(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) newSelected.delete(id);
      else newSelected.add(id);
      return newSelected;
    });
  };
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const visibleIds = filteredPeople.map((p) => p._id);
      setSelectedIds(new Set(visibleIds));
    } else {
      setSelectedIds(new Set());
    }
  };
  
  const isAllSelected = filteredPeople.length > 0 && filteredPeople.every((p) => selectedIds.has(p._id));
  
  if (loading) {
    return <div className="p-10 text-center text-sm text-gray-500">Loading leads...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 overflow-auto overscroll-none border-b border-gray-200">
        <table className="w-max table-fixed border-collapse">
          {/* Header */}
          <thead className="sticky top-0 z-30 bg-white shadow-sm text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
            <tr>
              <th className="sticky left-0 z-40 bg-white px-3 py-2 w-[40px] border-b border-gray-200">
                <input type="checkbox" className="rounded border-gray-300 cursor-pointer" checked={isAllSelected} onChange={handleSelectAll} />
              </th>
              <th className="sticky left-[40px] z-40 bg-white px-3 py-2 w-[220px] text-left shadow-[4px_0_5px_-2px_rgba(0,0,0,0.05)] border-r border-gray-200 border-b border-gray-200">Name</th>
              <th className="px-3 py-2 w-[180px] text-left border-b border-gray-200 bg-white">Job Title</th>
              <th className="px-3 py-2 w-[100px] text-left border-b border-gray-200 bg-white">Actions</th>
              <th className="px-3 py-2 w-[180px] text-left border-b border-gray-200 bg-white">Company</th>
              <th className="px-3 py-2 w-[200px] text-left border-b border-gray-200 bg-white">Emails</th>
              <th className="px-3 py-2 w-[160px] text-left border-b border-gray-200 bg-white">Phones</th>
              <th className="px-3 py-2 w-[100px] text-left border-b border-gray-200 bg-white">Links</th>
              <th className="px-3 py-2 w-[180px] text-left border-b border-gray-200 bg-white">Location</th>
              <th className="px-3 py-2 w-[100px] text-left border-b border-gray-200 bg-white">Employees</th>
              <th className="px-3 py-2 w-[180px] text-left border-b border-gray-200 bg-white">Industries</th>
            </tr>
          </thead>
          
          {/* Body: FIX - Changed text-s to text-sm */}
          <tbody className="text-sm text-gray-700">
            {filteredPeople.length > 0 ? (
              filteredPeople.map((p) => (
                <TableRow 
                  key={p._id} 
                  p={p} 
                  isSelected={selectedIds.has(p._id)} 
                  onSelect={handleSelectOne} 
                />
              ))
            ) : (
              <tr><td colSpan="11" className="px-6 py-10 text-center text-gray-500">No people found matching your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer: FIX - Changed text-s to text-sm */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 text-sm text-gray-600 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>Showing {filteredPeople.length} result(s)</span>
            {selectedIds.size > 0 && (<span className="text-blue-600 font-medium">{selectedIds.size} selected</span>)}
          </div>
          <div className="flex gap-2">
            <button className="border px-2 py-1 rounded hover:bg-gray-50 disabled:opacity-50" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Prev</button>
            <button className="border px-2 py-1 rounded hover:bg-gray-50 disabled:opacity-50" onClick={() => setPage((p) => p + 1)} disabled={page * limit >= total}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}