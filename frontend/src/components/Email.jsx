// src/components/MailPage.jsx
import React from "react";

export default function MailPage() {
  return (
    <div className="p-6 bg-white rounded shadow w-full h-full overflow-auto">
      <h1 className="text-2xl font-semibold mb-4">Inbox</h1>
      <div className="space-y-3">
        <div className="border p-3 rounded-md hover:bg-gray-100">
          <h3 className="font-semibold">Email Integration Coming Soon</h3>
          <p className="text-sm text-gray-500">Your inbox will appear here.</p>
        </div>
      </div>
    </div>
  );
}
