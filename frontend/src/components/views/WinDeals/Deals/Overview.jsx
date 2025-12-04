import React from "react";
import { Search } from "lucide-react";

const DealsOverview = () => {
  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Deals</h1>

        <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-500 transition">
          Create deal
        </button>
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-4 text-sm text-gray-700 mb-10">
        <button className="hover:bg-gray-100 px-3 py-2 rounded">
          All Pipelines
        </button>
        <button className="hover:bg-gray-100 px-3 py-2 rounded">
          All deals
        </button>
        <button className="hover:bg-gray-100 px-3 py-2 rounded">
          Show Filters
        </button>

        {/* Search bar */}
        <div className="flex items-center border rounded px-3 py-2 w-56 bg-white">
          <Search size={16} />
          <input
            placeholder="Search deals"
            className="outline-none ml-2 text-sm w-full"
          />
        </div>
      </div>

      {/* Trophy Section */}
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          className="w-28 mb-6"
          alt="Trophy Icon"
        />

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Let’s start winning more deals
        </h2>

        <p className="text-center text-gray-600 text-sm mb-6 w-[350px]">
          Create your first deal to start tracking activities, contacts, and
          conversations in one spot.
        </p>

        <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:bg-yellow-500 transition">
          Create deal
        </button>
      </div>
    </div>
  );
};

export default DealsOverview;
