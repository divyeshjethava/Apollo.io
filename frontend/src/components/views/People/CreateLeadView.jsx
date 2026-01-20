import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// --- 1. Static Data for Dropdowns ---
const DROPDOWN_OPTIONS = {
  leadSource: [
    "Advertisement", "Employee Referral", "External Referral", "Partner",
    "Trade Show", "Web", "Word of mouth",
  ],
  leadStatus: [
    "Attempted to Contact", "Contacted", "Future Lead", "Junk Lead",
    "Lost Lead", "Not Contacted", "Pre-Qualified",
  ],
  industry: [
    "Technology", "Telecommunications", "Consulting", "Finance",
    "Education", "Manufacturing", "Retail", "Healthcare",
  ],
  rating: ["Acquired", "Active", "Market Failed", "Project Cancelled", "Shut Down"],
  countries: ["India", "USA", "UK", "Australia"],
  salutation: ["Mr.", "Ms.", "Mrs.", "Dr.", "Prof."], // Moved here for consistency
};

// --- 2. Location Logic ---
const STATE_MAPPING = {
  India: ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "West Bengal", "Telangana"],
  USA: ["California", "New York", "Texas", "Florida", "Washington"],
  UK: ["England", "Scotland", "Wales", "Northern Ireland"],
  Australia: ["New South Wales", "Victoria", "Queensland"],
};

// --- 3. Simulated API ---
const checkPincode = async (pincode) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const database = {
    "110001": { city: "New Delhi", state: "Delhi", country: "India" },
    "400001": { city: "Mumbai", state: "Maharashtra", country: "India" },
    "560001": { city: "Bengaluru", state: "Karnataka", country: "India" },
    "600001": { city: "Chennai", state: "Tamil Nadu", country: "India" },
    "10001": { city: "New York", state: "New York", country: "USA" },
    "90001": { city: "Los Angeles", state: "California", country: "USA" },
  };
  return database[pincode] || null;
};

export default function CreateLeadView() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // State
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    mobile: "",
    website: "",
    title: "",
    fax: "",
    
    // Dropdowns (Initialize with "None" or empty string consistently)
    salutation: "None", // FIXED: Added this so dropdown starts at "None"
    leadSource: "None",
    leadStatus: "None",
    industry: "None",
    rating: "None",
    
    revenue: "",
    employees: "",
    country: "None",
    state: "None",
    city: "",
    pincode: "",
    street: "",
    houseNo: "",
    description: ""
  });

  const availableStates = STATE_MAPPING[formData.country] || [];

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setFormData((prev) => ({
      ...prev,
      country: newCountry,
      state: "None",
    }));
  };

  const handlePincodeChange = async (e) => {
    const code = e.target.value;
    setFormData((prev) => ({ ...prev, pincode: code }));
    if (code.length >= 5) {
      setLoading(true);
      const data = await checkPincode(code);
      setLoading(false);
      if (data) {
        setFormData((prev) => ({
          ...prev,
          city: data.city,
          state: data.state,
          country: data.country,
        }));
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
      });
      if (selectedFile) {
        dataToSend.append("leadImage", selectedFile);
      }

      const response = await fetch("http://localhost:4000/api/leads", {
        method: "POST",
        body: dataToSend,
      });

      if (response.ok) {
        alert("Lead created successfully!");
        navigate(-1);
      } else {
        alert("Error creating lead");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    // FIXED: Changed h-screen to h-full so it fits in parent container
    // Removed fixed background color to blend with parent, or keep if parent has transparent bg
    <div className="h-full flex flex-col bg-[#f5f7fb]">
      
      {/* Top Bar */}
      <div className="flex-none flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm z-10">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Create Lead</h1>
          <span className="text-xs font-medium text-blue-600 cursor-pointer hover:underline">
            Edit Page Layout
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button className="px-6 py-2 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>

      {/* Form Body - Scrollable Area */}
      <div className="flex-1 bg-white overflow-y-auto custom-scrollbar">
        <div className="bg-white p-8 max-w-6xl mx-auto">
          
          {/* Image Upload */}
          <div className="mb-10 flex items-center gap-6">
            <div className="relative group">
              <h2 className="text-xs font-bold uppercase text-gray-500 mb-2 tracking-wider">Lead Image</h2>
              <div 
                onClick={() => fileInputRef.current.click()}
                className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition relative overflow-hidden bg-gray-50"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <span className="text-3xl text-gray-400">👤</span>
                    <p className="text-[10px] text-gray-500 mt-1 font-medium">Upload</p>
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          {/* Lead Info */}
          <h2 className="text-sm font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">Lead Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
            <Input label="Lead Owner" value="Current User" readOnly />
            <Input label="Company" name="company" value={formData.company} onChange={handleChange} required />
            
            <div className="flex gap-3">
              {/* FIXED: Salutation dropdown now correctly bound to state */}
              <Select
                label="Salutation"
                name="salutation"
                options={DROPDOWN_OPTIONS.salutation}
                value={formData.salutation}
                onChange={handleChange}
                width="w-28"
              />
              <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} className="flex-1" />
            </div>

            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            <Input label="Title" name="title" value={formData.title} onChange={handleChange} />
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <Input label="Fax" name="fax" value={formData.fax} onChange={handleChange} />
            <Input label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
            <Input label="Website" name="website" value={formData.website} onChange={handleChange} />
            
            <Select label="Lead Source" name="leadSource" options={DROPDOWN_OPTIONS.leadSource} value={formData.leadSource} onChange={handleChange} />
            <Select label="Lead Status" name="leadStatus" options={DROPDOWN_OPTIONS.leadStatus} value={formData.leadStatus} onChange={handleChange} />
            <Select label="Industry" name="industry" options={DROPDOWN_OPTIONS.industry} value={formData.industry} onChange={handleChange} />
            
            <Input label="No. of Employees" name="employees" type="number" value={formData.employees} onChange={handleChange} />
            <Input label="Annual Revenue" name="revenue" type="number" prefix="Rs." value={formData.revenue} onChange={handleChange} />
            <Select label="Rating" name="rating" options={DROPDOWN_OPTIONS.rating} value={formData.rating} onChange={handleChange} />
          </div>

          {/* Address Info */}
          <h2 className="text-sm font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">Address Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
            <Select label="Country" name="country" options={DROPDOWN_OPTIONS.countries} value={formData.country} onChange={handleCountryChange} />
            <Input label="Flat / House No." name="houseNo" value={formData.houseNo} onChange={handleChange} />
            
            <div className="relative">
              <Input label="Zip Code" name="pincode" value={formData.pincode} onChange={handlePincodeChange} placeholder="e.g. 110001" />
              {loading && <span className="absolute right-0 top-0 text-xs text-blue-600 font-medium animate-pulse mt-1">Fetching...</span>}
            </div>

            <Input label="City" name="city" value={formData.city} onChange={handleChange} />
            <Select label="State" name="state" options={availableStates} value={formData.state} onChange={handleChange} disabled={availableStates.length === 0} />
            <Input label="Street Address" name="street" value={formData.street} onChange={handleChange} />
          </div>

          {/* Description */}
          <h2 className="text-sm font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">Description</h2>
          <textarea
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:border-blue-500 outline-none resize-y min-h-[120px]"
            rows={4}
            placeholder="Additional details..."
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

// --- Reusable Components (FIXED Select Logic) ---

const Input = ({ label, required, prefix, type = "text", name, value, onChange, readOnly, placeholder, className = "" }) => (
  <div className={`flex flex-col ${className}`}>
    <label className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className={`flex items-center border rounded px-3 transition-colors ${readOnly ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"}`}>
      {prefix && <span className="text-gray-500 text-sm mr-2 font-medium border-r pr-2">{prefix}</span>}
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full py-2 outline-none text-sm text-gray-800 placeholder-gray-400 ${readOnly ? "bg-transparent text-gray-500 cursor-default" : ""}`}
      />
    </div>
  </div>
);

const Select = ({ label, options = [], name, value, onChange, width = "w-full", disabled = false }) => (
  <div className={`flex flex-col ${width}`}>
    <label className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <select
        name={name}
        value={value || "None"} // Ensures controlled input doesn't break
        onChange={onChange}
        disabled={disabled}
        className={`w-full border rounded px-3 py-2 text-sm outline-none appearance-none transition-all ${
          disabled ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white border-gray-300 text-gray-700 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        }`}
      >
        {/* The Default "None" Option */}
        <option value="None">-- None --</option>
        
        {/* Map other options */}
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      
      {!disabled && (
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  </div>
);