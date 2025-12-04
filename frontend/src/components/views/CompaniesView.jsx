import { useState } from 'react'
import { Search, ChevronDown, Filter, Sparkles, ArrowRight } from 'lucide-react'

export default function CompaniesView() {
  const [selectedFilters, setSelectedFilters] = useState({
    lists: false,
    persona: false,
    emailStatus: false,
    jobTitles: false,
    peopleLocations: false,
    company: false,
    companyLocations: false,
    location: false,
    employees: false,
    industry: false,
    marketSegments: false,
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Companies</h1>
          <div className="flex gap-4">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium">
              Default view
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium">
              Hide Filters
            </button>
            <div className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm cursor-pointer">
              <Search size={16} />
              <span>Search Companies</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2">
            <Sparkles size={16} />
            Research with AI
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Import
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <span className="text-lg">234.2M</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total</span>
                <span className="text-gray-900 font-medium">234.2M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Not New</span>
                <span className="text-gray-900 font-medium">234.2M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Saved</span>
                <span className="text-gray-900 font-medium">0</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 space-y-2">
              {Object.entries(selectedFilters).map(([key, value]) => (
                <button
                  key={key}
                  className="w-full flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded text-sm"
                >
                  <span className="flex items-center gap-2">
                    <ChevronDown size={14} />
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  </span>
                </button>
              ))}
            </div>

            <button className="w-full text-left text-sm text-gray-600 hover:text-gray-900 py-2">
              Clear all
            </button>
            <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-medium">
              More Filters
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                <Sparkles size={40} className="text-blue-500" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Use Globentix to find the right prospects</h2>
            <p className="text-gray-600 mb-6">
              <span className="font-medium">Example: Who are the leading Nurses in Los Angeles?</span>
            </p>

            <div className="max-w-2xl mx-auto mb-8 space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <h3 className="font-semibold text-gray-900 mb-3">Quick filters</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Locations
                  </button>
                  <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Email Status
                  </button>
                  <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Verified
                  </button>
                  <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Unverified
                  </button>
                  <button className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                    Unavailable
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-left mb-3">
                  <h4 className="font-semibold text-gray-900">Unlock advanced filters:</h4>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="px-2 py-1 bg-white rounded text-xs font-medium">Revenue</span>
                    <span className="px-2 py-1 bg-white rounded text-xs font-medium">Funding</span>
                    <span className="px-2 py-1 bg-white rounded text-xs font-medium">Company Lookalikes</span>
                  </div>
                </div>
                <button className="w-full px-4 py-2 mt-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 font-semibold text-sm">
                  View plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
