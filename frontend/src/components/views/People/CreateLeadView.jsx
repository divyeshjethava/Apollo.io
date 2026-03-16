import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const DROPDOWN_OPTIONS = {
  leadSource: [
    "Advertisement",
    "Employee Referral",
    "External Referral",
    "Partner",
    "Trade Show",
    "Web",
    "Word of mouth",
  ],
  industry: [
    "Technology",
    "Telecommunications",
    "Consulting",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Healthcare",
    "Government Administration",
  ],
  countries: ["India", "USA", "UK", "Australia"],
};

const STATE_MAPPING = {
  India: [
    "Delhi",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "West Bengal",
    "Telangana",
  ],
  USA: ["California", "New York", "Texas", "Florida", "Washington"],
  UK: ["England", "Scotland", "Wales"],
  Australia: ["New South Wales", "Victoria", "Queensland"],
};

export default function CreateLeadView() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ownerName, setOwnerName] = useState("Current User");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setOwnerName(user.name || "Current User");
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    seniority: "",
    email: "",
    phone: "",
    // mobile: "",
    linkedin: "",
    facebook: "",
    twitter: "",

    company: "",
    website: "",
    companyPhone: "",
    companyLinkedin: "",
    industry: "None",
    employees: "",
    revenue: "",

    houseNo: "",
    street: "",
    city: "",
    state: "None",
    country: "None",
    pincode: "",

    description: "",
  });

  const availableStates = STATE_MAPPING[formData.country] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;

    setFormData((prev) => ({
      ...prev,
      country,
      state: "None",
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      form.append("owner", ownerName);

      if (selectedFile) {
        form.append("leadImage", selectedFile);
      }

      const res = await fetch("http://localhost:4000/api/leads", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        alert("Lead Created Successfully");
        navigate(-1);
      } else {
        alert("Error creating lead");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f5f7fb]">
      {/* Top Bar */}

      <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <h1 className="text-xl font-semibold text-gray-800">Create Lead</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded text-sm"
          >
            Save
          </button>
        </div>
      </div>

      {/* Form */}

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1100px] mx-auto space-y-6">
          {/* Image */}

          <Section title="Lead Image">
            <div
              onClick={() => fileInputRef.current.click()}
              className="w-24 h-24 border-2 border-dashed flex items-center justify-center rounded cursor-pointer"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                "Upload"
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </Section>

          {/* Lead Info */}

          <Section title="Lead Information">
            <Input label="Lead Owner" value={ownerName} readOnly />

            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            <Input
              label="Seniority"
              name="seniority"
              value={formData.seniority}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            {/* <Input
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            /> */}
          </Section>

          {/* Company */}

          <Section title="Company Information">
            <Input
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />

            <Input
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />

            <Input
              label="Company Phone"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleChange}
            />

            <Input
              label="Company LinkedIn"
              name="companyLinkedin"
              value={formData.companyLinkedin}
              onChange={handleChange}
            />

            <Select
              label="Industry"
              name="industry"
              value={formData.industry}
              options={DROPDOWN_OPTIONS.industry}
              onChange={handleChange}
            />

            <Input
              label="Employees"
              name="employees"
              value={formData.employees}
              onChange={handleChange}
            />

            <Input
              label="Annual Revenue"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
            />
          </Section>

          {/* Address */}

          <Section title="Address Information">
            <Input
              label="House No"
              name="houseNo"
              value={formData.houseNo}
              onChange={handleChange}
            />

            <Input
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />

            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

            <Select
              label="Country"
              name="country"
              value={formData.country}
              options={DROPDOWN_OPTIONS.countries}
              onChange={handleCountryChange}
            />

            <Select
              label="State"
              name="state"
              value={formData.state}
              options={availableStates}
              onChange={handleChange}
            />

            <Input
              label="Zip Code"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </Section>

          {/* Social */}

          <Section title="Social Profiles">
            <Input
              label="LinkedIn"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
            />

            <Input
              label="Facebook"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
            />

            <Input
              label="Twitter"
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
            />
          </Section>

          {/* Description */}

          <Section title="Description">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-3"
            />
          </Section>
        </div>
      </div>
    </div>
  );
}

/* SECTION */

const Section = ({ title, children }) => (
  <div className="bg-white border rounded-lg shadow-sm p-6">
    <h2 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-6">
      {title}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
      {children}
    </div>
  </div>
);

/* INPUT */

const Input = ({ label, name, value, onChange, readOnly }) => (
  <div className="flex flex-col">
    <label className="text-xs font-semibold text-gray-500 mb-1">{label}</label>

    <input
      name={name}
      value={value || ""}
      onChange={onChange}
      readOnly={readOnly}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

/* SELECT */

const Select = ({ label, name, options = [], value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-xs font-semibold text-gray-500 mb-1">{label}</label>

    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
    >
      <option value="None">-- None --</option>

      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
