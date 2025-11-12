import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidthOpen = '16rem';
  const sidebarWidthClosed = '4rem';

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Primary Application Sidebar (e.g., General Navigation) */}
      {/* This component needs to handle its own fixed/absolute positioning */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area (Dynamically Sized) */}
      <div
        className={`
          transition-all duration-300 flex flex-col h-screen overflow-y-auto overflow-x-hidden
          ${isSidebarOpen 
            ? `w-[calc(100%-${sidebarWidthOpen})] ml-64` 
            : `w-[calc(100%-${sidebarWidthClosed})] ml-16`
          }
        `}
      >

        {/* 1. Scrollable Content Area - Removed padding and gray background. */}
        <main className="flex-1 text-sm">
          <div className="bg-white min-h-full w-full">
            {/* The content from your nested route will render here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}