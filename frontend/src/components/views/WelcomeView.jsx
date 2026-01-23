import { Check, Play, Eye, Target, BarChart, Search } from 'lucide-react'; // 1. Import new icons
import { useState, useEffect } from 'react';

export default function WelcomeView() {
  const [userName, setUserName] = useState("User"); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj.name) setUserName(userObj.name);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const setupTasks = [
    {
      id: 1,
      icon: Check,
      title: 'Set up essentials to work smarter in Globintix',
      completed: false,
    },
    {
      id: 2,
      icon: Play,
      title: 'Start a guided search for leads',
      completed: false,
    },
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Proven GTM Plays to get you started',
      category: 'Outbound',
      icon: Target, // 2. Assign the icon component directly
      color: "text-red-500",
      bg: "bg-red-50"
    },
    {
      id: 2,
      title: 'Tutorial 2',
      category: 'Inbound',
      icon: BarChart,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      id: 3,
      title: 'Tutorial 3',
      category: 'Deal Inspection',
      icon: Search,
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Welcome, {userName} 👋
        </h1>
        <p className="text-gray-600">Explore recommended actions to build on your setup and unlock more value</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Next steps for you</h2>
          <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <Eye size={16} /> Hide completed
          </button>
        </div>

        <div className="space-y-4">
          {setupTasks.map((task) => (
            <div key={task.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 cursor-pointer" />
              <task.icon size={20} className="text-gray-400" />
              <span className="flex-1 text-gray-900 font-medium">{task.title}</span>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors">
                Start
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex gap-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
              Workspace setup
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
              Recommendations
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-6">Explore ready-made Plays and tutorials to build momentum</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all cursor-pointer group">
              
              {/* 3. Render the specific icon with styling */}
              <div className={`mb-4 w-12 h-12 rounded-lg flex items-center justify-center ${tutorial.bg}`}>
                <tutorial.icon size={24} className={tutorial.color} />
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {tutorial.title}
              </h3>
              <p className="text-sm text-gray-500">{tutorial.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}