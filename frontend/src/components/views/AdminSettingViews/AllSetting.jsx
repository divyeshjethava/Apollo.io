import React, { useState, useEffect } from "react";
import { HelpCircle, Pencil, Plus, Check } from "lucide-react";

// Reuse your existing assets
import hubspotLogo from "../../../assets/hubspot.png";
import salesforceLogo from "../../../assets/salesforce.png";

const AllSetting = () => {
  const [activeTab, setActiveTab] = useState("General");
  
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    password: "", 
    credits: ""
  });

  const [loading, setLoading] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // --- 1. LOAD USER DATA ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    
    setFormData({
      firstName: storedUser.name ? storedUser.name.split(" ")[0] : "",
      lastName: storedUser.name ? storedUser.name.split(" ").slice(1).join(" ") : "",
      title: storedUser.title || "",
      email: storedUser.email || "",
      password: "", // Keep empty initially for security
      credits: storedUser.credits || ""
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- 2. HANDLE SAVE TO BACKEND ---
  const handleSave = async () => {
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    try {
      const response = await fetch("http://localhost:4000/api/auth/profile", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          // Send token if your backend requires auth middleware (optional for this step)
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          id: storedUser.id, // SEND USER ID TO BACKEND
          name: fullName,
          title: formData.title,
          email: formData.email,
          credits: formData.credits,
          // Only send password if user typed something new
          password: formData.password.length > 0 ? formData.password : undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      // Success! Update LocalStorage with new data from Backend
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Lock fields again
      setIsEditingEmail(false);
      setIsEditingPassword(false);
      setFormData(prev => ({...prev, password: ""})); // Clear password field

      alert("Profile updated successfully on the server!");

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [ "General", "Multi-factor authentication", "Custom fields", "Email settings", "Conversations" ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20 relative">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 pt-6 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
          
          {/* SAVE BUTTON */}
          <button 
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-sm transition-colors text-sm disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-gray-800 border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl px-8 py-8 space-y-6">
        
        {/* Account Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Account Info</h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>

            {/* Login Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Login email</label>
              <div className="flex gap-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!isEditingEmail}
                  className={`flex-1 border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    !isEditingEmail ? "bg-[#f3f4f6] cursor-not-allowed" : "bg-white"
                  }`}
                />
                <button 
                  onClick={() => setIsEditingEmail(!isEditingEmail)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 bg-white"
                >
                  {isEditingEmail ? <Check size={14} className="text-green-600" /> : <Pencil size={14} />}
                  {isEditingEmail ? "Done" : "Edit"}
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="flex gap-4">
                <input
                  type={isEditingPassword ? "text" : "password"}
                  name="password"
                  placeholder={isEditingPassword ? "Enter new password" : "••••••••"}
                  value={formData.password}
                  onChange={handleChange}
                  readOnly={!isEditingPassword}
                  className={`flex-1 border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    !isEditingPassword ? "bg-[#f3f4f6] cursor-not-allowed placeholder-transparent" : "bg-white"
                  }`}
                />
                <button 
                  onClick={() => setIsEditingPassword(!isEditingPassword)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 bg-white"
                >
                   {isEditingPassword ? <Check size={14} className="text-green-600" /> : <Pencil size={14} />}
                   {isEditingPassword ? "Done" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CRM Connection */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">CRM connection</h2>
          <div className="flex items-start gap-6">
            <div className="grid grid-cols-2 gap-1 w-20 h-20 flex-shrink-0">
              <div className="bg-white border-2 border-yellow-400 rounded-lg flex items-center justify-center">
                <Plus size={24} className="text-yellow-400" strokeWidth={4} />
              </div>
              <div className="bg-[#ff5c35] rounded-lg flex items-center justify-center p-1">
                <img src={hubspotLogo} alt="Hubspot" className="w-6 h-6 object-contain invert brightness-0" />
              </div>
              <div className="bg-[#008C4F] rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
              <div className="bg-[#00A1E0] rounded-lg flex items-center justify-center p-1">
                <img src={salesforceLogo} alt="Salesforce" className="w-6 h-6 object-contain brightness-0 invert" />
              </div>
            </div>
            <p className="text-gray-600 text-sm pt-1">Your team has not connected a CRM</p>
          </div>
        </div>

        {/* Restrictions */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Restrictions</h2>
          <div className="max-w-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">Credit Limit</label>
            <div className="relative">
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">Leave this field blank if no limit is required</p>
          </div>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 shadow-lg transition-colors z-50">
        <HelpCircle size={24} />
      </button>
    </div>
  );
};

export default AllSetting;