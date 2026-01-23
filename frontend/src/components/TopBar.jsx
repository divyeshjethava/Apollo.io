import {
  Search,
  Settings,
  Bell,
  LogOut, // Added Logout Icon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function TopBar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  // Get user name from local storage to show correct Initial
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    // 1. Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // 2. Redirect to Login
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Sidebar toggle + logo */}
      <div className="flex">
        {!sidebarOpen && (
          <div className="text-lg font-semibold text-gray-900 ml-1">
            Globentix
          </div>
        )}
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Quick search"
            className="bg-transparent border-none outline-none w-48 text-sm"
          />
        </div>


        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/admin/settings")} 
            className="p-1 hover:bg-gray-100 rounded transition-colors" >
              <Settings size={20} className="text-gray-600" />
          </button>

          <button className="p-1 hover:bg-gray-100 rounded transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold select-none">
                  {userInitial}
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}