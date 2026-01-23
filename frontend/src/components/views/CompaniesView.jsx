import { useState } from "react";
import { Search } from "lucide-react";
import FilterSidebar from "../FilterSidebar";
import CompaniesTable from "../CompaniesTable";   
import { useNavigate } from "react-router-dom";

export default function CompaniesView() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    jobTitle: "",
    company: "",
    location: "",
    industry: "",
    emailStatus: [],
    employees: [],
  });

  // State to store total count passed from Table
  const [totalCount, setTotalCount] = useState(0);

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex-none">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Companies</h1>
            <div className="mt-3 flex gap-2 items-center">
              <button className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50">
                Default view
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 border rounded text-sm bg-white">
                <Search size={16} className="text-gray-400" />
                <span className="text-gray-500">Search companies</span>
              </div>
              
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded text-sm hover:bg-gray-50">
                Import
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* Sidebar (Same as People View) */}
        <FilterSidebar 
            filters={filters} 
            onFilterChange={setFilters} 
            totalCount={totalCount}
        />

        {/* Table (Swapped Logic) */}
        <div className="flex-1 min-w-0">
          <CompaniesTable filters={filters} setTotalCount={setTotalCount} />
        </div>
      </div>
    </div>
  );
}