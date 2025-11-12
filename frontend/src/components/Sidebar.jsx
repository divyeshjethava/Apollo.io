import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import {
  Home,
  Users,
  Building2,
  List,
  Database,
  Send,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Briefcase,
  CheckSquare,
  Workflow,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate(); // ✅ added

  const menuItems = [
    {
      section: "Prospect & Enrich",
      items: [
        { icon: <Users size={18} />, label: "People" },
        { icon: <Building2 size={18} />, label: "Companies" },
        { icon: <List size={18} />, label: "Lists" },
        { icon: <Database size={18} />, label: "Data enrichment" },
      ],
    },
    {
      section: "Engage",
      items: [
        { icon: <Send size={18} />, label: "Sequences" },
        { icon: <Mail size={18} />, label: "Emails" },
        { icon: <Phone size={18} />, label: "Calls" },
      ],
    },
    {
      section: "Win Deals",
      items: [
        { icon: <Calendar size={18} />, label: "Meetings" },
        { icon: <MessageSquare size={18} />, label: "Conversations" },
        { icon: <Briefcase size={18} />, label: "Deals" },
      ],
    },
    {
      section: "Tools & Automations",
      items: [
        { icon: <CheckSquare size={18} />, label: "Tasks" },
        { icon: <Workflow size={18} />, label: "Workflows" },
      ],
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white shadow-md border-r transition-all duration-300 flex flex-col z-50 ${
        isOpen ? "w-64" : "w-17"
      }`}
    >
      {/* Header + Toggle Button */}
      <div className="flex items-center justify-between p-1 border-b">
        {isOpen && (
          <h2 className="font-bold text-lg">
            <img src={logo} alt="Logo" className="w-24 h-24 object-contain" />
          </h2>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-gray-100 rounded-lg"
        >
          {isOpen ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
        </button>
      </div>

      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent p-2">
        <div className="space-y-4">
          <div
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Home size={18} />
            {isOpen && <span>Home</span>}
          </div>

          {menuItems.map((group, index) => (
            <div key={index}>
              {isOpen && (
                <p className="text-xs text-gray-500 uppercase font-semibold mt-3 mb-1">
                  {group.section}
                </p>
              )}
              {group.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (item.label === "People") navigate("people");
                    else if (item.label === "Companies") navigate("/companies");
                    else if (item.label === "Lists") navigate("/lists");
                  }}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  {item.icon}
                  {isOpen && <span>{item.label}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-3">
        <div
          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          <Settings size={18} />
          {isOpen && <span>Settings</span>}
        </div>
      </div>
    </div>
  );
}
