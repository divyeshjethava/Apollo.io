import React from 'react';
// Import icons from lucide-react (adjust if your icons are different)
import { RefreshCw, Users, Timer, DatabaseZap ,Cloud , Network , Sparkle } from 'lucide-react';


export default function CrmBody() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Top Section: Title, Description, and Connect Buttons */}
      <div className="text-center mb-16">
        {/* Icon and Sparkles */}
        <div className="flex justify-center items-center relative mb-6">
          <div className="w-24 h-24 bg-purple-600 rounded-lg flex items-center justify-center relative">
            <RefreshCw size={48} className="text-white" />
          </div>
          {/* Top-right sparkle */}
          <Sparkle className='text-amber-400 absolute top-0 right-1/2 translate-x-17 -translate-y-5 w-7 h-7 rounded-full animate-pulse'/>

          {/* Bottom-left sparkle */}
          <Sparkle className='text-amber-400 absolute bottom-0 left-1/2 -translate-x-17 translate-y-5 w-7 h-7 rounded-full animate-pulse'/>
          
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Enrich existing records across your CRM systems
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-lg">
          Boost your CRM effectiveness with dynamic enrichment, effortlessly
          updating contact and account details to keep your data consistently
          synchronized.
        </p>

        {/* Connect Buttons */}
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2">
            <Network />
            Connect HubSpot
          </button>
          <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2">
             <Cloud/>
            Connect Salesforce
          </button>
        </div>
      </div>

      {/* Key Benefits Section */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-gray-900 mb-12 text-center">Key benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefit 1: Enhance customer connections */}
          <div className="text-center p-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Users size={32} className="text-blue-600" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2 text-lg">Enhance customer connections</h4>
            <p className="text-sm text-gray-600">
              Boost your business growth by enriching CRM fields
              with accurate data, ensuring seamless
              integration of leads into your sales strategy
            </p>
          </div>

          {/* Benefit 2: Save time & streamline workflows */}
          <div className="text-center p-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Timer size={32} className="text-purple-600" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2 text-lg">Save time & streamline workflows</h4>
            <p className="text-sm text-gray-600">
              Save time and increase productivity by simplifying
              your workflow, focusing on sales, and efficiently
              managing tasks
            </p>
          </div>

          {/* Benefit 3: Ensure data consistency */}
          <div className="text-center p-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <DatabaseZap size={32} className="text-red-600" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2 text-lg">Ensure data consistency</h4>
            <p className="text-sm text-gray-600">
              Experience consistent, accurate data across
              platforms, reducing manual entry and errors for
              up-to-date records
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Learn more</button>
        </div>
      </div>
    </div>
  );
}