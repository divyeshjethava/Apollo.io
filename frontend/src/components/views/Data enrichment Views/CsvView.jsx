import { BarChart3 } from 'lucide-react'; // Assuming you get the icon from here

export default function CsvEnrichmentBody() {
  return (
    <div className="text-center mt-20"> {/* Added margin-top for spacing */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-blue-100 rounded-lg flex items-center justify-center">
          {/* This is a placeholder icon, use the real one from your screenshot */}
          <BarChart3 size={64} className="text-blue-500" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">CSV Enrichment</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6">
        Upgrade your plan to begin enriching your records with Globentic information.
      </p>
      <div className="flex gap-3 justify-center">
        <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 text-sm font-semibold">
          Upgrade to Basic
        </button>
      </div>
    </div>
  );
}