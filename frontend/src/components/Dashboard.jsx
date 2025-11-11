import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar Section */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Dashboard Area */}
      <div
        className={`flex-1 bg-gray-100 p-6 overflow-auto transition-all duration-300 ${
          isSidebarOpen ? "ml-0" : "ml-[-12rem]"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome</p>

        {/* Example long content */}
        <div className="min-h-[2000px] bg-white mt-4 p-4 rounded shadow">
          Scrollable content here...
        </div>
      </div>
    </div>
  );
}
