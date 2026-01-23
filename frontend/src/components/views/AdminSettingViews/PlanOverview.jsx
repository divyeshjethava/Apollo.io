import React, { useState } from 'react';
import { 
  Info, 
  Clock, 
  HelpCircle, 
  BarChart3, 
  Sparkles, 
  MessageSquare, 
  ChevronRight 
} from 'lucide-react';

const PlanOverview = () => {
  const [activeTab, setActiveTab] = useState('Plan Overview');

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      
      {/* --- Top Navigation --- */}
      <div className="border-b border-gray-200 px-6 pt-4 mb-6">
        <div className="flex space-x-6">
          {['Plan Overview', 'Billing', 'License Settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-6">

        {/* --- Card 1: Free Plan Details --- */}
        <div className="bg-gray-50/50 border border-gray-200 rounded-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Free Plan</h2>
              <p className="text-sm text-gray-600 mt-1">
                You are on a <span className="font-semibold">free</span> plan and your credits will refresh on Dec 09, 2025.
              </p>
            </div>
            <button className="bg-[#0199ff] hover:bg-[#0687dd] text-white font-semibold py-2 px-4 rounded text-sm transition-colors">
              Purchase Plan
            </button>
          </div>

          {/* Table Content */}
          <div className="bg-gray-50 rounded-md">
            {/* Table Header */}
            <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider py-2 border-b border-gray-200">
              <span>What's Included</span>
              <span>Price</span>
            </div>

            {/* Row 1: Users */}
            <div className="flex justify-between items-center py-4 border-b border-gray-200 text-sm">
              <span className="font-medium text-gray-700">Users</span>
              <span className="text-gray-600">Free User x 1</span>
              <span className="font-medium">$0/mo</span>
            </div>

            {/* Row 2: Credits */}
            <div className="flex justify-between items-center py-4 border-b border-gray-200 text-sm">
              <span className="font-medium text-gray-700">Credits (In your Plan)</span>
              <span className="text-gray-600">100 Credits / mo</span>
              <span></span> {/* Empty for layout balance */}
            </div>

            {/* Row 3: Add-On Credits */}
            <div className="flex justify-between items-start py-4 border-b border-gray-200 text-sm">
              <span className="font-medium text-gray-700 pt-1">Add-On Credits</span>
              <div className="flex flex-col">
                 <div className="flex items-center gap-1 text-gray-600">
                    <span>5 Bonus Credits</span>
                    <Info size={14} className="text-gray-400 cursor-pointer" />
                 </div>
                 <a href="#" className="text-blue-600 text-xs mt-1 hover:underline">+Add more credits</a>
              </div>
              <span className="text-gray-600">Free</span>
            </div>

            {/* Footer Row: Total */}
            <div className="flex justify-between items-center py-4 text-sm mt-2">
              <span className="font-bold text-gray-800 text-base">Monthly Total</span>
              <span className="font-bold text-gray-900 text-base">$0.00/mo</span>
            </div>
          </div>
        </div>

        {/* --- Card 2: Usage Stats --- */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          
          {/* Card Header */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">Credits usage</h3>
                <span className="text-gray-500 text-sm">| Nov 09, 2025 - Dec 09, 2025</span>
              </div>
              <a href="#" className="text-blue-600 text-sm mt-1 inline-block hover:underline">View historical credit usage</a>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
               <Clock size={14} />
               <span>Estimated Credit Renewal on: Dec 09, 2025 1:30 PM</span>
               <Info size={14} />
            </div>
          </div>

          {/* Usage Section 1: Credits */}
          <UsageSection 
            icon={<BarChart3 size={20} className="text-yellow-700" />}
            iconBg="bg-yellow-100"
            title="Credits usage"
            current={0}
            max={105}
            unit="mo"
            btnText="Buy more"
            description="Credits are the currency used to access emails, mobile numbers and enrichment data."
            linkText="Learn more"
            subText="Your team doesn't allow sharing credits."
          />

          {/* Usage Section 2: AI Words */}
          <UsageSection 
            icon={<Sparkles size={20} className="text-purple-600" />}
            iconBg="bg-purple-100"
            title="AI-generated word usage"
            current={0}
            max={5000}
            unit="AI-generated words / mo"
            btnText="Request Upgrade"
            description="limits plan to 5,000 AI-generated words per billing cycle to prevent abuse. To increase your team's available AI-generated word usage limit, upgrade or add more seats."
            linkText="Fair Use Policy"
            linkPrepend={true}
          />

          {/* Usage Section 3: Conversation */}
          <UsageSection 
            icon={<MessageSquare size={20} className="text-purple-600" />}
            iconBg="bg-purple-100"
            title="Conversation usage"
            current={0}
            max={150}
            unit="minutes / mo"
            btnText="Buy more minutes"
            description="Conversation minutes are used when someone in your team has a meeting recorded and processed in Apollo to present insights."
            subText="Your team doesn't allow sharing minutes credits."
            isLast={true}
          />

        </div>
      </div>

      {/* --- Floating Help Button --- */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 shadow-lg transition-colors z-50">
        <HelpCircle size={24} />
      </button>

    </div>
  );
};

// Reusable Component for the Usage Sections
const UsageSection = ({ 
  icon, iconBg, title, current, max, unit, btnText, description, linkText, subText, linkPrepend, isLast 
}) => {
  return (
    <div className={`p-6 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <div className="flex gap-4">
        {/* Icon Box */}
        <div className={`w-10 h-10 ${iconBg} rounded-md flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>

        <div className="flex-1">
          <h4 className="text-base font-semibold text-gray-800">{title}</h4>
          
          <div className="mt-1 mb-3">
             <span className="text-lg font-bold text-gray-900">{current.toLocaleString()}</span>
             <span className="text-gray-500 text-sm"> of {max.toLocaleString()} {unit}</span>
          </div>

          {/* Progress Bar Area */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
               {/* Width is 0% based on image, but logical calculation would be (current/max)*100 */}
              <div className="h-full bg-gray-400" style={{ width: '0%' }}></div>
            </div>
            <button className="bg-[#0199ff] hover:bg-[#0687dd] text-white text-sm font-medium py-1.5 px-4 rounded whitespace-nowrap transition-colors">
              {btnText}
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl">
            {linkPrepend && linkText && (
               <a href="#" className="text-blue-600 hover:underline mr-1">{linkText}</a>
            )}
            {description}
            {!linkPrepend && linkText && (
               <a href="#" className="text-blue-600 hover:underline ml-1">{linkText}</a>
            )}
          </p>
          {subText && <p className="text-xs text-gray-500 mt-2">{subText}</p>}
        </div>
      </div>
    </div>
  );
};

export default PlanOverview;