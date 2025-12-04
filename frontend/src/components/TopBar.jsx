import {
  ChevronDown,
  Search,
  Settings,
  Bell,
  ChevronsRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export default function TopBar({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Sidebar toggle + logo */}
      <div className="flex">
        {/* <div
          className="flex items-center gap-2 cursor-pointer select-none p-1 hover:bg-gray-100 rounded transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <ChevronsRight
            size={20}
            className={`${
              sidebarOpen ? "hidden" : "rotate-0"
            } transition-transform`}
          />
        </div> */}

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
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
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
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  D
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild>
                <Link to="/login">Login</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
