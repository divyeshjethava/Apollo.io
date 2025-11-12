// src/pages/Page.jsx or src/Page.jsx

import React from 'react';
import { Search, ChevronDown, Save, Settings, Users, Briefcase, Lock, Zap, HelpCircle } from 'lucide-react';

const SidebarFilter = ({ title, count, isLocked = false, isBeta = false }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer text-sm">
    <div className={`flex items-center ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
      {title}
      {isLocked && <Lock className="w-3 h-3 ml-2 text-gray-400" />}
      {isBeta && <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 ml-2 rounded font-semibold">Beta</span>}
    </div>
    {count && <span className="text-gray-500">{count}</span>}
  </div>
);

const FilterTag = ({ children, isActive = false }) => (
  <span className={`
    px-3 py-1 text-sm rounded-full m-1
    ${isActive
      ? 'bg-blue-100 text-blue-700 font-medium'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }
    cursor-pointer
  `}>
    {children}
  </span>
);

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* --- HEADER --- */}
      <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        
        {/* Left Side: Search and View Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm font-medium cursor-pointer p-2 rounded hover:bg-gray-100">
            Default view <ChevronDown className="w-4 h-4 ml-1" />
          </div>
          <button className="text-sm font-medium p-2 rounded hover:bg-gray-100">
            Hide Filters
          </button>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search people"
              className="pl-9 pr-4 py-2 w-80 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* Right Side: Actions and Imports */}
        <div className="flex items-center space-x-4 text-sm">
          <button className="flex items-center font-medium text-gray-700 hover:text-blue-600">
            ➕ Create workflow
          </button>
          <button className="flex items-center font-medium text-gray-700 hover:text-blue-600">
            <Save className="w-4 h-4 mr-1" /> Save as new search
          </button>
          <button className="flex items-center font-medium text-gray-700 hover:text-blue-600">
            ⬇️ Sort
          </button>
          <button className="flex items-center font-medium text-gray-700 hover:text-blue-600">
            <Settings className="w-4 h-4 mr-1" /> Search settings
          </button>
          <button className="px-3 py-1.5 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100">
            Research with AI
          </button>
          <button className="font-medium text-gray-700 hover:text-blue-600">
            Import ⬇️
          </button>
        </div>
      </header>

      {/* --- MAIN LAYOUT (Sidebar + Content) --- */}
      <div className="flex flex-1">
        
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-between">
          <div className="overflow-y-auto">
            {/* Top Counts */}
            <div className="flex justify-between items-center mb-4 text-xs font-semibold">
              <div className="text-center">
                <div className="text-blue-600">Total</div>
                <div className="text-gray-800">234.1M</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Net New</div>
                <div className="text-gray-800">234.1M</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600">Saved</div>
                <div className="text-gray-800">0</div>
              </div>
            </div>

            {/* Filter List */}
            <div className="space-y-0.5">
              <SidebarFilter title="Lists" />
              <SidebarFilter title="Persona" />
              <SidebarFilter title="Email Status" />
              <SidebarFilter title="Job Titles" />
              <SidebarFilter title="People Lookalikes" isLocked={true} />
              <SidebarFilter title="Company" />
              <SidebarFilter title="Company Lookalikes" isLocked={true} />
              <SidebarFilter title="Location" />
              <SidebarFilter title="# Employees" />
              <SidebarFilter title="Industry & Keywords" />
              <SidebarFilter title="Market Segments" isBeta={true} />
              {/* Add more filters as needed */}
            </div>
          </div>
          
          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-gray-200 flex justify-between text-sm">
            <button className="text-gray-500 hover:text-gray-700">Clear all</button>
            <button className="text-blue-600 hover:text-blue-700">More Filters</button>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 p-8">
          
          {/* AI Prompt Section */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
              Use <span className="text-blue-600">Globentix Technology</span> to find the right prospects
            </h1>
            
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-8">
              <input
                type="text"
                placeholder="Example: abc@mail.com"
                className="w-full text-lg border-0 focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Quick Filters */}
            <div className="mb-10 border-b-gray-300 rounded-lg p-4 bg-white shadow-md">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick filters</h2>
              
              <div className="grid grid-cols-2 gap-10">
                {/* Column 1 */}
                <div>
                  <h3 className="font-medium text-gray-600 mb-2">Locations</h3>
                  <div className="flex flex-wrap mb-4">
                    <FilterTag>United States</FilterTag>
                    <FilterTag>Canada</FilterTag>
                  </div>
                  
                  <h3 className="font-medium text-gray-600 mb-2">Job Titles</h3>
                  <div className="flex flex-wrap">
                    <FilterTag isActive>founder</FilterTag>
                    <FilterTag>sales manager</FilterTag>
                    <FilterTag>marketing director</FilterTag>
                  </div>
                </div>

                {/* Column 2 */}
                <div>
                  <h3 className="font-medium text-gray-600 mb-2">Email Status</h3>
                  <div className="flex flex-wrap mb-4">
                    <FilterTag isActive>Verified</FilterTag>
                    <FilterTag>Unverified</FilterTag>
                    <FilterTag>Unavailable</FilterTag>
                  </div>
                  
                  <h3 className="font-medium text-gray-600 mb-2">Industry</h3>
                  <div className="flex flex-wrap">
                    <FilterTag>information technology & services</FilterTag>
                    <FilterTag>marketing & advertising</FilterTag>
                    <FilterTag>retail</FilterTag>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Filters/Paywall Section */}
            <div className="flex justify-between items-center p-4 bg-white border border-yellow-200 rounded-lg shadow-inner">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Unlock advanced filters:</span>
                <span className="font-semibold text-gray-800">$ Revenue</span>
                <span className="font-semibold text-gray-800">Funding</span>
                <span className="font-semibold text-gray-800">Company Lookalikes</span>
              </div>
              <button className="px-6 py-2 bg-yellow-400 text-gray-800 font-bold rounded-lg shadow hover:bg-yellow-500 transition duration-150">
                View plans
              </button>
            </div>
          </div>
        </main>
      </div>
      
      {/* --- Floating Help Button (Optional) --- */}
      <div className="fixed bottom-6 right-6">
        <button className="p-3 rounded-full shadow-lg hover:bg-gray-800 transition duration-150">
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Page;