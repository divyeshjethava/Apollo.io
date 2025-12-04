export default function AllSequences() {
  return (
    <div className="w-full h-full bg-[#fafafa] text-gray-700 overflow-auto">
      {/* Main Section */}
      <div className="flex flex-col items-center justify-start py-10 px-4">
        {/* Video Placeholder */}
        <div className="w-full max-w-3xl">
          <div className="rounded-lg overflow-hidden shadow-lg bg-black">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* Headings */}
        <h2 className="text-2xl font-bold text-gray-900 mt-10">
          Create your first sequence
        </h2>

        <p className="text-gray-600 mt-2 text-center max-w-xl">
          Build custom campaigns to automate emails, set more meetings, and
          convert more customers.
        </p>

        {/* Buttons Section */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Purple AI Button */}
          <button className="px-6 py-3 bg-[#7a3ff2] text-white rounded-md text-sm font-medium shadow-md hover:bg-[#692bd4] transition">
            ✨ Create a sequence with AI
          </button>

          {/* Normal Button */}
          <button className="px-6 py-3 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 transition">
            Create sequence
          </button>
        </div>
      </div>
    </div>
  );
}
