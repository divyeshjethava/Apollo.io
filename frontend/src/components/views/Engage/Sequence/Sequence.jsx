import { useState } from "react";
import Tabs from "../Sequence/Tabs";
import AllSequences from "../Sequence/AllSequences";
import Analytics from "../Sequence/Analytics";
import Diagnostics from "../Sequence/Diagnostics";

export default function Sequence() {
  const [activeTab, setActiveTab] = useState("analytics");

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <AllSequences />;
      case "analytics":
        return <Analytics />;
      case "diagnostics":
        return <Diagnostics />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div className="p-6 bg-white text-black h-full overflow-auto">
      <h1 className="text-2xl font-semibold mb-5">Sequences</h1>

      <Tabs active={activeTab} setActive={setActiveTab} />

      <div className="mt-6">{renderContent()}</div>
    </div>
  );
}
