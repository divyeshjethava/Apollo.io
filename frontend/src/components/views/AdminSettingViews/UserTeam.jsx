import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { 
  Search, 
  UserPlus, 
  Download, 
  MoreHorizontal, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Pencil
} from "lucide-react";

export default function UserTeam() {
  const navigate = useNavigate(); // 2. Initialize navigation hook
  const [activeTab, setActiveTab] = useState("current");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  
  // State for tracking which row's action menu is open
  const [openMenuId, setOpenMenuId] = useState(null);
  
  // Ref to close dropdown when clicking outside
  const menuRef = useRef(null);

  // Load Current User Data on Mount
  useEffect(() => {
    // 1. Get logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    
    // 2. Create a mock "Current User" object based on login data
    const currentUser = {
      id: "u1",
      name: storedUser.name || "Prem Gupta", // Fallback if name missing
      email: storedUser.email || "guptaprem.82121@gmail.com",
      initials: (storedUser.name || "PG").substring(0, 2).toUpperCase(),
      role: "Admin",
      credits: "No credit limit",
      isCurrentUser: true // Flag to show "(You)"
    };

    setUsers([currentUser]);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="p-6 min-h-screen bg-white relative font-sans">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-xl font-semibold text-gray-900">Users</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm">
            <UserPlus size={18} />
            New user
          </button>
          <button className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm">
            Export to CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          <TabButton 
            active={activeTab === "current"} 
            onClick={() => setActiveTab("current")}
            label="Current users" 
          />
          <TabButton 
            active={activeTab === "fields"} 
            onClick={() => setActiveTab("fields")}
            label="User fields" 
          />
          <TabButton 
            active={activeTab === "pending"} 
            onClick={() => setActiveTab("pending")}
            label="Pending users" 
          />
        </div>
      </div>

      {/* Blue Promotion Banner */}
      <div className="bg-[#102b44] rounded-lg p-4 mb-6 flex justify-between items-center shadow-sm text-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center text-xl">
            👥
          </div>
          <div>
            <h3 className="font-bold text-[15px]">Invite your team & sell more with Globintix</h3>
            <p className="text-gray-300 text-xs mt-0.5">Invite teammates and get more deals done—faster.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md font-medium text-xs transition-colors">
          <UserPlus size={16} />
          Add Teammates
        </button>
      </div>

      {/* Search & Sort Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm placeholder-gray-500"
          />
        </div>

        <button className="flex items-center gap-1 text-gray-700 text-xs font-semibold hover:bg-gray-50 px-2 py-1 rounded">
          <span className="text-gray-400 text-base leading-none">↓≡</span> Created Date
          <ChevronDown size={14} />
        </button>
      </div>

      {/* --- USERS TABLE --- */}
      <div className="border border-gray-200 rounded-md overflow-visible"> {/* overflow-visible for dropdowns */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-200">
              <th className="p-4 w-10">
                <input type="checkbox" className="rounded border-gray-300 cursor-pointer" />
              </th>
              <th className="p-3 pl-0 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Users</th>
              <th className="p-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Permission Profile</th>
              <th className="p-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Credits</th>
              <th className="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-12 text-center text-gray-500 italic text-sm">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 group relative">
                  
                  {/* Checkbox */}
                  <td className="p-4 w-10 align-middle">
                    <input type="checkbox" className="rounded border-gray-300 cursor-pointer" />
                  </td>

                  {/* User Info Column */}
                  <td className="p-3 pl-0 align-middle">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-[#f0f0f0] border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        {user.initials}
                      </div>
                      
                      {/* Name & Email */}
                      <div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-900 font-medium">
                          {user.name} 
                          {user.isCurrentUser && <span className="text-gray-500 font-normal">(You)</span>}
                        </div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Permission Profile */}
                  <td className="p-3 align-middle">
                    <span className="inline-block px-3 py-1 bg-[#eeeeee] text-gray-700 text-xs font-medium rounded-full">
                      {user.role}
                    </span>
                  </td>

                  {/* Credits */}
                  <td className="p-3 align-middle">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#eeeeee] text-gray-600 text-xs font-medium rounded-full cursor-pointer hover:bg-gray-200">
                      <Pencil size={12} className="text-gray-500" />
                      {user.credits}
                    </span>
                  </td>

                  {/* Actions (3 Dots) */}
                  <td className="p-3 text-right align-middle relative">
                    <button 
                      onClick={() => toggleMenu(user.id)}
                      className={`p-1.5 rounded hover:bg-gray-200 transition-colors ${openMenuId === user.id ? 'bg-gray-200 text-gray-900' : 'text-gray-400'}`}
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {/* --- DROPDOWN MENU --- */}
                    {openMenuId === user.id && (
                      <div 
                        ref={menuRef}
                        className="absolute right-8 top-8 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 text-left"
                      >
                        {/* 3. Navigation Logic Added Here */}
                        <button 
                          onClick={() => navigate("/admin/settings")} 
                          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                        >
                          Edit profile
                        </button>
                        
                        <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left">
                          Force logout
                        </button>
                        <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left">
                          Deactivate
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center mt-4">
        <div className="flex items-center border border-gray-300 rounded bg-white h-8">
            <button className="px-2 h-full border-r border-gray-300 text-gray-400 hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft size={16} />
            </button>
            
            {/* Dropdown for Page Number */}
            <div className="flex items-center px-2 h-full text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
               1 <ChevronDown size={12} className="ml-1" />
            </div>

            <button className="px-2 h-full border-l border-gray-300 text-gray-400 hover:bg-gray-50">
              <ChevronRight size={16} />
            </button>
        </div>
        <span className="ml-3 text-xs text-gray-500">1 - 1 of 1</span>
      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 bg-[#1f2937] text-white p-2.5 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-50">
        <HelpCircle size={22} />
      </button>
    </div>
  );
}

// Helper Component for Tabs
function TabButton({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`pb-3 text-[13px] font-semibold transition-colors border-b-[3px] ${
        active 
          ? "border-black text-black" 
          : "border-transparent text-gray-500 hover:text-gray-800"
      }`}
    >
      {label}
    </button>
  );
}