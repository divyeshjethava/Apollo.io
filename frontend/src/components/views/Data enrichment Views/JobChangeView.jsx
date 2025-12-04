
export default function JobChangeView(){
    return(
        <div className="text-center mt-20"> {/* Added margin-top for spacing */}
      
      <h2 className="text-2xl font-bold text-gray-900 mb-3">Get Job Change Alerts</h2>
      <p className="text-gray-600 max-w-3xl mx-auto mb-8 text-lg">
        Upgrade your plan to see which saved people in Globintix now work for a new company.
      </p>
      <div className="flex gap-3 justify-center">
        <button className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 text-sm font-semibold">
          Upgrade to Basic
        </button>
      </div>
    </div>
    );
}