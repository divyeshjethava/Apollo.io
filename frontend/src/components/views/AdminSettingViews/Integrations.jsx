import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

// Import your assets
import zoom from "../../../assets/zoom.png";
import meet from "../../../assets/meet.png";
import teams from "../../../assets/teams.png";
import hubspot from "../../../assets/hubspot.png";
import slack from "../../../assets/slack.png";
import salesforce from "../../../assets/salesforce.png";

const Integrations = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Updated Data with 'icon' property mapping
  const integrationsData = [
    {
      id: 1,
      name: "Zoom",
      icon: zoom, // Mapped to import
      category: null,
      description:
        "Connect your company's Zoom account to Globintix Conversations to get insights and analytics from video call meetings.",
      buttonText: "Connect",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Google Meet",
      icon: meet, // Mapped to import
      category: null,
      description:
        "Connect your company's Google Meet account to Globintix Conversations to get insights and analytics from video call meetings.",
      buttonText: "Connect",
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Microsoft Teams",
      icon: teams, // Mapped to import
      category: null,
      description:
        "Connect your company's Microsoft Teams account to Globintix Conversations to get insights and analytics from video call meetings.",
      buttonText: "Connect",
      color: "bg-indigo-600",
    },
    {
      id: 4,
      name: "Salesforce",
      icon: salesforce, // Mapped to import
      category: "CRM",
      description:
        "Find ideal prospects, enrich your records, clean up stale contacts, and bi-directionally sync all activities.",
      buttonText: "Connect",
      color: "bg-blue-400",
    },
    {
      id: 5,
      name: "HubSpot",
      icon: hubspot, // Mapped to import
      category: "CRM",
      description:
        "Our bi-directional sync and database of 200M+ business contacts makes Hubspot great at outbound & inbound.",
      buttonText: "Connect",
      color: "bg-orange-500",
    },
    {
      id: 6,
      name: "Pipedrive",
      // No icon imported yet, will use fallback
      category: "CRM",
      tags: ["NEW"],
      description:
        "Our bi-directional sync and database of 200M+ business contacts makes Pipedrive great at outbound & inbound.",
      buttonText: "Connect",
      color: "bg-green-600",
    },
    {
      id: 7,
      name: "ServiceNow",
      // No icon imported yet, will use fallback
      category: "Workflow",
      description: "Create and manage ServiceNow tickets and incidents",
      buttonText: "Connect",
      color: "bg-emerald-800",
    },
    {
      id: 8,
      name: "Trello",
      // No icon imported yet, will use fallback
      category: "Workflow",
      description: "Create and manage Trello boards, lists, and cards",
      buttonText: "Connect",
      color: "bg-blue-600",
    },
    {
      id: 9,
      name: "Zendesk",
      // No icon imported yet, will use fallback
      category: "Workflow",
      description: "Create and manage Zendesk tickets and users",
      buttonText: "Connect",
      color: "bg-green-800",
    },
    {
      id: 10,
      name: "Greenhouse",
      // No icon imported yet, will use fallback
      category: "ATS",
      description: "Deploy Apollo prospects directly to a Greenhouse.",
      buttonText: "Upgrade Plan",
      color: "bg-green-400",
    },
    {
      id: 11,
      name: "SendGrid",
      // No icon imported yet, will use fallback
      category: "Email",
      description:
        "Connect with Sendgrid to more safely send high volumes of emails.",
      buttonText: "Upgrade Plan",
      color: "bg-blue-400",
    },
    {
      id: 12,
      name: "Zapier",
      // No icon imported yet, will use fallback
      category: "Automation",
      description:
        "Avoid repetitive tasks and create automations between Globintix and over 2,000 web apps.",
      buttonText: "Connect",
      color: "bg-orange-600",
    },
  ];

  const filteredData = integrationsData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 relative pb-20">
      {/* --- Main Header --- */}
      <div className="px-8 pt-6 mb-6">
        <h1 className="text-xl font-bold mb-4">Integrations</h1>

        {/* Controls: Dropdown & Search */}
        <div className="flex gap-4">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 hover:border-gray-400 text-gray-700 py-2.5 pl-4 pr-10 rounded shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer min-w-[160px]">
              <option>All Categories</option>
              <option>ATS</option>
              <option>Automation</option>
              <option>Communication</option>
              <option>CRM</option>
              <option>Data Source & Validation</option>
              <option>Developer Tools</option>
              <option>Email</option>
              <option>Sales Engagement</option>
              <option>Model Provider</option>
              <option>Workflow</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-3 text-gray-500 pointer-events-none"
            />
          </div>

          <div className="relative flex-1 max-w-xl">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 hover:border-gray-400 py-2.5 pl-10 pr-4 rounded shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* --- Integration List Section --- */}
      <div className="bg-white">
        {/* Section Header (Collapsible) */}
        <div
          className="px-8 py-3 bg-white border-t border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-800">
              Available{" "}
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs ml-1">
                {integrationsData.length}
              </span>
            </h2>
          </div>
          {isExpanded ? (
            <ChevronUp size={16} className="text-gray-500" />
          ) : (
            <ChevronDown size={16} className="text-gray-500" />
          )}
        </div>

        {/* Table Header Columns */}
        {isExpanded && (
          <div className="px-8 py-3 flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <span>Application</span>
            <span>Action</span>
          </div>
        )}

        {/* List Items */}
        {isExpanded && (
          <div className="divide-y divide-gray-100">
            {filteredData.map((integration) => (
              <div
                key={integration.id}
                className="px-8 py-6 flex items-start gap-4 hover:bg-gray-50 transition-colors"
              >
                {/* Brand Icon Component - Updated to accept 'icon' prop */}
                <BrandIcon
                  name={integration.name}
                  color={integration.color}
                  icon={integration.icon}
                />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {integration.name}
                    </h3>

                    {/* Category Badge */}
                    {integration.category && (
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-blue-100">
                        {integration.category}
                      </span>
                    )}

                    {/* New Badge */}
                    {integration.tags && integration.tags.includes("NEW") && (
                      <span className="bg-green-50 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-green-100">
                        NEW
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                    {integration.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0 ml-4 pt-1">
                  <button className="bg-blue-400 hover:bg-blue-500 text-gray-900 text-sm font-medium py-2 px-5 rounded shadow-sm transition-colors min-w-[100px]">
                    {integration.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Floating Help Button --- */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 shadow-lg transition-colors z-50">
        <HelpCircle size={24} />
      </button>
    </div>
  );
};

// Updated BrandIcon Component to handle Images
const BrandIcon = ({ name, color, icon }) => {
  // 1. If an image icon exists, render it
  if (icon) {
    return (
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-white rounded-lg border border-gray-100 p-1">
        <img
          src={icon}
          alt={`${name} logo`}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // 2. Fallback: If no image, use the colored square with initials
  const initials = name.substring(0, 1);
  return (
    <div
      className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm flex-shrink-0`}
    >
      {initials}
    </div>
  );
};

export default Integrations;
