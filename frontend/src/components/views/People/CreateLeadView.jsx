import { useNavigate } from "react-router-dom";

export default function CreateLeadView() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#f5f7fb] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Create Lead</h1>
          <span className="text-sm text-blue-600 cursor-pointer">
            Edit Page Layout
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-1.5 border rounded text-sm bg-white"
          >
            Cancel
          </button>
          <button className="px-4 py-1.5 border rounded text-sm bg-white">
            Save and New
          </button>
          <button className="px-4 py-1.5 rounded text-sm bg-blue-600 text-white">
            Save
          </button>
        </div>
      </div>

      {/* Form Body */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded shadow-sm p-6">
          {/* Lead Image */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Lead Image
            </h2>
            <div className="w-20 h-20 rounded-full border flex items-center justify-center text-gray-400">
              👤
            </div>
          </div>

          {/* Lead Information */}
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Lead Information
          </h2>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4">
            <Input label="Lead Owner" defaultValue="" />
            <Input label="Company" required />

            <div className="flex gap-2">
              <Select label="First Name" options={["None", "Mr", "Ms"]} />
              <Input label="Last Name" required />
            </div>

            <Input label="Title" />
            <Input label="Email" />

            <Input label="Phone" />
            <Input label="Fax" />

            <Input label="Mobile" />
            <Input label="Website" />

            <Select label="Lead Source" />
            <Select label="Lead Status" />

            <Select label="Industry" />
            <Input label="No. of Employees" />

            <Input label="Annual Revenue" prefix="Rs." />
            <Select label="Rating" />
          </div>

          {/* Extra Info */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-6">
            <Checkbox label="Email Opt Out" />
            <Input label="Skype ID" />

            <Input label="Secondary Email" />
            <Input label="Twitter" prefix="@" />
          </div>

          {/* Address Information */}
          <h2 className="text-sm font-semibold text-gray-700 mt-10 mb-4">
            Address Information
          </h2>

          <div className="grid grid-cols-2 gap-x-10 gap-y-4">
            <Select label="Country / Region" />
            <Input label="Flat / House No. / Building / Apartment Name" />

            <Input label="Street Address" />
            <Input label="City" />

            <Select label="State / Province" />
            <Input label="Zip / Postal Code" />

            <Input label="Latitude" />
            <Input label="Longitude" />
          </div>

          {/* Description */}
          <h2 className="text-sm font-semibold text-gray-700 mt-10 mb-4">
            Description Information
          </h2>

          <textarea
            className="w-full border rounded px-3 py-2 text-sm"
            rows={4}
            placeholder="Description"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Reusable UI ---------- */

const Input = ({ label, required, prefix, defaultValue }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex items-center border rounded px-2">
      {prefix && <span className="text-gray-400 mr-1">{prefix}</span>}
      <input
        defaultValue={defaultValue}
        className="w-full py-1.5 outline-none text-sm"
      />
    </div>
  </div>
);

const Select = ({ label, options = ["None"] }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600 mb-1">{label}</label>
    <select className="border rounded px-2 py-1.5 text-sm">
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const Checkbox = ({ label }) => (
  <div className="flex items-center gap-2 mt-6">
    <input type="checkbox" />
    <label className="text-sm text-gray-600">{label}</label>
  </div>
);
