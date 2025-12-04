import { useState } from 'react';
import { BarChart3, Zap, Activity, ArrowRight , Cloud , Network } from 'lucide-react';
import CsvEnrichmentBody from './Data enrichment Views/CsvView'; 
import CrmBody from './Data enrichment Views/CrmBody';
import JobChangeView from './Data enrichment Views/JobChangeView';


function DataHealthBody({ setActiveTab }) {
  // Helper for the buttons inside this component
  const getButtonClass = (tabName) => {
    const baseClass = "bg-transparent transition-colors rounded-lg px-2 py-1";
    // This component doesn't know the 'activeTab', so we just use the hover state
    return "text-gray-600 hover:bg-gray-100";
  };

  return (
    <>
      <div className="text-center mb-12 p-4 space-y-3">
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center">
            <BarChart3 size={64} className="text-blue-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Build your data health center dashboard</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Save contacts on the People page or connect your CRM to unlock powerful insights and track the quality of your data
          <br/>
          <span className="inline-flex items-center gap-1 ml-3 p-5">
            Works with
            <Network/>
            <Cloud/>
          </span>
        </p>
        <div className="flex gap-3 justify-center">
          
          <button
            type="button"
            onClick={() => setActiveTab('crm')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-400 text-sm font-medium cursor-pointer"
          >
            Connect CRM
          </button>

          <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 text-sm font-semibold">
            Save contacts
          </button>
        </div>
        <div className="mt-16">
        <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">Key benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Key Benefit 1 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap size={32} className="text-blue-500" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Discover enrichable data</h4>
            <p className="text-sm text-gray-600">See job changes, missing emails, and CRM fields in one enrichment</p>
          </div>
          {/* Key Benefit 2 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Activity size={32} className="text-blue-500" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Detect and merge duplicates</h4>
            <p className="text-sm text-gray-600">Keep your records clean and streamlined</p>
          </div>
          {/* Key Benefit 3 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart3 size={32} className="text-blue-500" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Track enrichment activities</h4>
            <p className="text-sm text-gray-600">Monitor enrichment job performance and credit usage</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Learn more</button>
        </div>
      </div>
      </div>
    </>
  );
}
// ----------------------------------------------------------------------


export default function DataEnrichmentView() {
  const [activeTab, setActiveTab] = useState('data-health');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'data-health':
        // ------------------------------------------------------------------
        // FIX 3: You MUST pass the 'setActiveTab' function down as a prop
        // ------------------------------------------------------------------
        return <DataHealthBody setActiveTab={setActiveTab} />;
      case 'crm':
        return <CrmBody />;
      case 'csv':
        return <CsvEnrichmentBody />;
      case 'job-alerts':
        return <JobChangeView/>; 
      default:
        return <DataHealthBody setActiveTab={setActiveTab} />;
    }
  };

  // Helper to get the correct button style for the main tabs
  const getButtonClass = (tabName) => {
    const baseClass = "bg-transparent transition-colors rounded-lg px-2 py-1";
    if (activeTab === tabName) {
      return `${baseClass} text-gray-900 font-medium`;
    }
    return `${baseClass} text-gray-600 hover:bg-gray-300 cursor-pointer`;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-2 border-b-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Data enrichment</h1>
          
          {/* This is your main tab navigation */}
          <div className="flex items-center gap-4 text-sm">
            <button
              type="button"
              onClick={() => setActiveTab('data-health')}
              className={getButtonClass('data-health')}
            >
              Data health center
            </button>
            <span className="text-gray-400" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => setActiveTab('crm')}
              className={getButtonClass('crm')}
            >
              CRM
            </button>
            <span className="text-gray-400" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => setActiveTab('csv')}
              className={getButtonClass('csv')}
            >
              CSV
            </button>
            <span className="text-gray-400" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => setActiveTab('job-alerts')}
              className={getButtonClass('job-alerts')}
            >
              Job change alerts
            </button>
          </div>
        </div>

        {/* ... Top right buttons ... */}
      </div>

      {/* This is where the correct body is rendered */}
      {renderTabContent()}
      
    </div>
  )
}