import { useState } from "react";
import Tabs from "./Tabs";
import AllEmails from "./AllEmails";
import Templates from "./Templates";
import Analytics from "./Analytics";

export default function Emails() {
  const [activeTab, setActiveTab] = useState("all");

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <AllEmails />;
      case "templates":
        return <Templates />;
      case "analytics":
        return <Analytics />;
      default:
        return <AllEmails />;
    }
  };

  return (
    <div className="p-6 bg-white text-black h-full overflow-auto">
      {/* Top heading */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Emails</h1>

        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100">
            Manage mailboxes
          </button>
          <button className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100">
            Deliverability stats
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs active={activeTab} setActive={setActiveTab} />

      {/* Content */}
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
}
