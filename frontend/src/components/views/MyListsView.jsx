import { useState } from 'react'
import { Plus, Upload, Filter, ListPlus, Building2, X } from 'lucide-react'

export default function MyListsView() {
  const [showNewListModal, setShowNewListModal] = useState(false)
  const [listName, setListName] = useState('')
  const [listTarget, setListTarget] = useState('People')

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My lists</h1>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium">
          New List
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center">
              <ListPlus size={48} className="text-blue-500" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Welcome to your lists</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Lists help you organize your prospects and start targeted campaigns. Pick a template below to get started
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-900">
              <ListPlus size={18} /> Create a people list
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-900">
              <Building2 size={18} /> Create a company list
            </button>
          </div>

          <div className="mt-8">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Learn more about lists</button>
          </div>
        </div>
      </div>

      {showNewListModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">New List</h2>
              <button onClick={() => setShowNewListModal(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Enter list name</label>
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  placeholder="List name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">List target</label>
                <select
                  value={listTarget}
                  onChange={(e) => setListTarget(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>People</option>
                  <option>Companies</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Add record from</label>
                <button className="w-full px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-900">
                  Select filters
                </button>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Filter size={18} className="text-blue-500" />
                <span className="text-sm text-blue-900">CSV</span>
                <button className="flex items-center gap-1 ml-auto text-sm text-blue-600 hover:text-blue-700">
                  <Upload size={14} /> Upload CSV
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowNewListModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-gray-900"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
