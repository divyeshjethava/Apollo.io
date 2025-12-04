import {
  ChevronsLeft,
  Home,
  Users,
  FileText,
  Database,
  BarChart3,
  Zap,
  Calendar,
  MessageSquare,
  ShoppingCart,
  Sparkles,
  Search,
} from "lucide-react";
import logo from "../assets/logo.jpg";
import AdminSettings from "./views/AdminSetting";

export default function Sidebar({
  isOpen,
  setIsOpen,
  currentView,
  setCurrentView,
}) {
  const projectItems = [
    { icon: Users, label: "People", id: "people" },
    { icon: FileText, label: "Companies", id: "companies" },
    { icon: Database, label: "Lists", id: "lists" },
    {
      icon: BarChart3,
      label: "Data enrichment",
      id: "data-enrichment",
    },
  ];

  const engageItems = [
    { icon: FileText, label: "Sequences", id: "sequence" },
    { icon: MessageSquare, label: "Emails", id: "emails" },
    { icon: ShoppingCart, label: "Calls", id: "calls" },
  ];

  const dealItems = [
    { icon: Calendar, label: "Meetings", id: "meetings" },
    { icon: MessageSquare, label: "Conversations", id: "conversations" },
    { icon: ShoppingCart, label: "Deals", id: "deals" },
  ];

  const toolsItems = [
    { icon: Zap, label: "Tasks", id: "tasks" },
    { icon: Zap, label: "Workflows", id: "workflows"},
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-56" : "w-15"
      } bg-white border-r border-gray-200 transition-all duration-400 overflow-hidden flex flex-col`}
    >
      {/* Header */}
      <div 
        className={`h-16 border-b border-gray-200 flex items-center shrink-0 ${
          isOpen ? "px-4 justify-between" : "justify-center"
        }`}
      >
        {/* 1. LOGO AND TEXT GROUP */}
        {/* Only render this div if the sidebar is OPEN */}
        {isOpen && (
          <div className="flex items-center gap-2 animate-in fade-in duration-300">
            <img src={logo} alt="Logo" className="w-8 h-8 object-cover rounded" />
            <span className="font-semibold text-gray-900 select-none whitespace-nowrap">
              Globentix
            </span>
          </div>
        )}

        {/* 2. TOGGLE BUTTON */}
        {/* Always visible, but its position changes based on the parent div's 'justify' class */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ChevronsLeft
            size={20}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Search */}
      {isOpen && (
        <div className="p-4 border-b border-gray-200">
          <button className="flex items-center gap-2 w-full px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm">
            <Search size={16} /> Search
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 ">
        {/* Home */}
        <div className="px-2 mb-6">
          <button
            onClick={() => setCurrentView("home")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm ${
              currentView === "home"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home size={18} />
            {isOpen && "Home"}
          </button>

          {/* Title */}
          {isOpen && (
            <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-600 uppercase">
              Prospect & Enrich
            </div>
          )}

          {/* Prospect Items */}
          <div className="space-y-1">
            {projectItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-start gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  currentView === item.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={18} />
                {isOpen && <span>{item.label}</span>}
                {item.highlight && (
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Engage Section */}
        <div className="px-2 mb-6">
          {isOpen && (
            <div className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase">
              Engage
            </div>
          )}

          <div className="space-y-1">
            {engageItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  currentView === item.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={18} />
                {isOpen && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Deals */}
        <div className="px-2 mb-6">
          {isOpen && (
            <div className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase">
              Win Deals
            </div>
          )}

          <div className="space-y-1">
            {dealItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  currentView === item.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={18} />
                {isOpen && <span >{item.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="px-2 mb-6">
          {isOpen && (
            <div className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase">
              Tools & Automations
            </div>
          )}

          <div className="space-y-1">
            {toolsItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                  currentView === item.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={18} />
                {isOpen && <span>{item.label}</span>}
                {item.badge && (
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom */}
        {isOpen && (
          <div className="px-2">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 mb-2">
              <Sparkles size={16} />
              Upgrade
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-1 rounded text-sm text-gray-700 hover:bg-gray-100 text-left">
              Live webinar now! <ChevronsLeft size={14} />
            </button>
          </div>
        )}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="p-3 border-t border-gray-200 space-y-2 text-xs">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            Deliverability suite
          </button>
          {/* <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
            Admin Settings
          </button> */}

          <AdminSettings isOpen={true} />


        </div>
      )}
    </aside>
  );
}
