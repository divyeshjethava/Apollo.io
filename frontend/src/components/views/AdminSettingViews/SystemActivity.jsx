import { useState } from "react";
import { Search, HelpCircle, Sparkles } from "lucide-react";

export default function SystemActivity() {
  const [mainTab, setMainTab] = useState("Email");
  const [subTab, setSubTab] = useState("Manual");

  const mainTabs = [
    "Email",
    "Job change",
    "Mobile number",
    "Enrichment Requests",
    "AI word usage history"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6 relative">
      {/* Main Tabs Header */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          {mainTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setMainTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                mainTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex-1 flex flex-col">
        
        {/* Sub Tabs (Manual / Automated) */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setSubTab("Manual")}
              className={`py-4 text-sm font-medium transition-colors ${
                subTab === "Manual"
                  ? "text-blue-600 border-b-2 border-blue-600 -mb-px"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => setSubTab("Automated")}
              className={`py-4 text-sm font-medium transition-colors ${
                subTab === "Automated"
                  ? "text-blue-600 border-b-2 border-blue-600 -mb-px"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Automated
            </button>
          </div>
        </div>

        {/* Empty State Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
          {/* Custom Icon Construction to match image */}
          <div className="relative mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
               <Search size={32} className="text-blue-500" />
            </div>
            {/* The Red '0' Badge */}
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              0
            </div>
            {/* Sparkle decorative elements */}
            <Sparkles size={16} className="absolute -top-2 -left-2 text-gray-400" />
          </div>

          <h2 className="text-gray-900 font-semibold text-lg mb-2">
            No manual enrichment jobs completed yet!
          </h2>
          <p className="text-gray-500 text-sm max-w-md leading-relaxed">
            Track your manual enrichment progress here. <br />
            Once jobs are completed, their details and credit usage will be displayed.
          </p>
        </div>

      </div>

      {/* Floating Help Button */}
      <button className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-50">
        <HelpCircle size={24} />
      </button>
    </div>
  );
}