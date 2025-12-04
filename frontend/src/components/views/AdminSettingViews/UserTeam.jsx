import { useState, useEffect } from "react";
import { 
  Search, 
  UserPlus, 
  Download, 
  Plus, 
  MoreHorizontal, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle
} from "lucide-react";

export default function UserTeam() {
  const [activeTab, setActiveTab] = useState("current");
  const [searchTerm, setSearchTerm] = useState("");
  
  // ------------------------------------------------------------------
  // BACKEND INTEGRATION NOTE:
  // This is where you will fetch your users from the database.
  // For now, it is initialized as an empty array as requested.
  // ------------------------------------------------------------------
  const [users, setUsers] = useState([]);

  /* // Example of how you might fetch data later:
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  */

  return (
    <div className="p-6 min-h-screen bg-white relative">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#fadd4b] hover:bg-[#eaca44] text-black px-4 py-2 rounded-md font-medium text-sm transition-colors">
            <UserPlus size={18} />
            New user
          </button>
          <button className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md font-medium text-sm transition-colors">
            Export to CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
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
      <div className="bg-[#102b44] rounded-lg p-4 mb-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          {/* Simple Icon Placeholder */}
          <div className="w-12 h-12 bg-blue-100/10 rounded-md flex items-center justify-center text-white text-2xl">
            👥
          </div>
          <div>
            <h3 className="text-white font-semibold text-base">Invite your team & sell more with Apollo</h3>
            <p className="text-blue-100 text-sm">Invite teammates and get more deals done—faster.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#fadd4b] hover:bg-[#eaca44] text-black px-4 py-2 rounded-md font-medium text-sm transition-colors">
          <UserPlus size={18} />
          Add Teammates
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex justify-between items-center mb-4">
        {/* Search */}
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Sort Dropdown */}
        <button className="flex items-center gap-2 text-gray-600 text-sm font-medium hover:text-gray-900">
          <span className="text-gray-400">↓≡</span> Created Date
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Table Section */}
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 w-10">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Users</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Permission Profile</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Credits</th>
              <th className="p-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            
            {/* BACKEND INTEGRATION:
                Here we check if users exist. If empty, we show the placeholder row.
            */}
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-12 text-center text-gray-500 italic">
                  Users not created yet.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 group">
                  <td className="p-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        {user.initials}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full border border-gray-200 flex w-fit items-center gap-1">
                      ✎ {user.credits}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-4 border border-gray-200 rounded-md p-2 bg-white w-fit">
        <button className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50">
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center px-2">
           <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded">1</button>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-500 ml-1">
         1 - 1 of 1
      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-50">
        <HelpCircle size={24} />
      </button>
    </div>
  );
}

// Helper Component for Tabs
function TabButton({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
        active 
          ? "border-black text-black" 
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}