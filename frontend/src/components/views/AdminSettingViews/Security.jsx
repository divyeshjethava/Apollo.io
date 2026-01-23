import React, { useState } from "react";
import { HelpCircle, Medal } from "lucide-react";

const Security = () => {
  const [activeTab, setActiveTab] = useState("Multi-factor authentication");

  const tabs = [
    "Multi-factor authentication",
    "IP whitelisting",
    "Password policy",
    "Login controls",
    "Single sign on",
  ];

  return (
    <div className="min-h-screen bg-white font-sans relative">
      {/* --- Navigation Tabs --- */}
      <div className="border-b border-gray-200 px-8 pt-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900 border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <main className="flex flex-col items-center justify-center pt-20 px-4 text-center">
        {/* Image Placeholder */}
        {/* NOTE: Replace src below with the actual image file from your assets */}
        <div className="mb-8 relative">
          <img
            src="/api/placeholder/400/320"
            alt="Security Illustration"
            className="w-80 h-auto object-contain mx-auto"
          />
          {/* If you don't have the image, this div acts as a visual placeholder mimicking the screenshot size */}
          {/* <div className="w-80 h-48 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-6">
              [Insert Security Graphic Here]
           </div> */}
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Multi-factor authentication (MFA)
        </h1>

        {/* Description Text */}
        <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
          Improve your account security and protect your organization’s most
          important data with our multi-factor authentication.
        </p>

        {/* Upgrade Button */}
        <button className="bg-blue-400 hover:bg-blue-500 text-gray-900 font-semibold py-2.5 px-6 rounded shadow-sm mb-8 transition-colors">
          Upgrade to Basic
        </button>

        {/* Footer Note */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Medal size={18} strokeWidth={1.5} />
          <span>Beneficial for all teams seeking enhanced security!</span>
        </div>
      </main>

      {/* --- Floating Help Button --- */}
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 shadow-lg transition-colors">
        <HelpCircle size={24} />
      </button>
    </div>
  );
};

export default Security;
