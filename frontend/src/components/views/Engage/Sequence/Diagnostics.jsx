export default function Diagnostics() {
  return (
    <div className="flex h-full bg-[#f8f8f8]">
      {/* Left Sidebar */}
      <div className="w-64 border-r bg-white p-4">
        <div className="mt-4">
          <button className="flex items-center gap-2 text-blue-600 font-medium">
            <span>📨</span> Unverified contacts
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Sequences with the Most Unverified Emails
          </h2>

          {/* Dropdown Placeholder */}
          <div className="border rounded-md px-3 py-2 text-gray-600 bg-white cursor-pointer">
            Unverified ▼
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          Select the sequence to see the unverified contacts that can be paused
          or remove the contacts from the sequence
        </p>

        {/* Empty State Box */}
        <div className="border rounded-md bg-white w-full h-[500px] flex items-start p-6">
          <p className="text-gray-500">No Sequences Found</p>
        </div>
      </div>
    </div>
  );
}
