import { useState } from "react";
import {
  Filter,
  User,
  Smile,
  Mail,
  PlayCircle,
  Calendar,
  Ban,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function EmailFilters({ visible }) {
  const [openSection, setOpenSection] = useState("status");

  const toggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    { id: "status", title: "Status", icon: <CheckCircle size={16} /> },
    { id: "fromUser", title: "From User", icon: <User size={16} /> },
    { id: "sentiment", title: "Sentiment", icon: <Smile size={16} /> },
    { id: "fromEmail", title: "From Email", icon: <Mail size={16} /> },
    { id: "sequences", title: "Sequences", icon: <PlayCircle size={16} /> },
    { id: "contactLists", title: "Contact Lists", icon: <User size={16} /> },
    { id: "dateRange", title: "Date Range", icon: <Calendar size={16} /> },
    { id: "notSent", title: "Not Sent Reason", icon: <Ban size={16} /> },
    { id: "emailOpened", title: "Email Opened", icon: <Mail size={16} /> },
  ];

  if (!visible) return null;

  return (
    <div className="w-72 bg-white border rounded-md shadow-md p-3 animate-fadeIn">
      {/* STATUS SPECIAL SECTION */}
      <div className="mb-3">
        <div
          className="flex justify-between items-center cursor-pointer px-1"
          onClick={() => toggle("status")}
        >
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle size={16} /> Status
          </div>
          {openSection === "status" ? <ChevronUp /> : <ChevronDown />}
        </div>

        {openSection === "status" && (
          <div className="mt-3 border rounded-md p-3 text-sm">
            <div className="py-2 hover:bg-gray-100 px-2 rounded cursor-pointer flex justify-between">
              <span>Total</span> <span>0</span>
            </div>
            <div className="py-2 hover:bg-gray-100 px-2 rounded cursor-pointer flex justify-between">
              <span>Scheduled</span> <span>0</span>
            </div>
            <div className="py-2 hover:bg-gray-100 px-2 rounded cursor-pointer flex justify-between">
              <span>Delivered</span> <span>0</span>
            </div>
          </div>
        )}
      </div>

      {/* OTHER SECTIONS */}
      {sections.slice(1).map((s) => (
        <div key={s.id} className="border-b last:border-none">
          <div
            className="flex justify-between items-center py-3 cursor-pointer"
            onClick={() => toggle(s.id)}
          >
            <div className="flex items-center gap-2">
              {s.icon} {s.title}
            </div>
            {openSection === s.id ? <ChevronUp /> : <ChevronDown />}
          </div>

          {openSection === s.id && (
            <div className="p-3 text-sm text-gray-500">
              (Empty – add content later)
            </div>
          )}
        </div>
      ))}

      {/* CLEAR BUTTON */}
      <button className="w-full mt-4 py-2 border rounded-md bg-gray-50 hover:bg-gray-100">
        Clear filters
      </button>
    </div>
  );
}
