import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";

export default function PersonPage() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const f = data.fields || {};

        setPerson({
          name: `${f["First Name"] || ""} ${f["Last Name"] || ""}`,
          title: f["Title"],
          company: f["Company"],
          email: f["Email"],
          phone: f["Phone"],
          location: f["Location"],
          industry: f["Industry"],
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!person) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        <Link to="/people" className="text-blue-600  font-medium">
          People
        </Link>
        {" > "}
        <span className="text-gray-700">{person.name}</span>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="font-semibold mb-3 text-gray-800">
            Contact Information
          </h3>

          <p className="text-sm font-medium text-gray-800">{person.name}</p>

          <p className="text-sm text-gray-600">{person.title}</p>

          <p className="text-sm text-gray-500 mb-3">{person.company}</p>

          {person.email && (
            <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
              <Mail size={14} />
              {person.email}
            </div>
          )}

          {person.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-700 mt-2">
              <Phone size={14} />
              {person.phone}
            </div>
          )}
        </div>

        {/* Company Insights */}
        <div className="col-span-2 border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="font-semibold mb-3 text-gray-800">Company Insights</h3>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Company:</strong> {person.company || "N/A"}
            </p>

            <p>
              <strong>Industry:</strong> {person.industry || "N/A"}
            </p>

            <p>
              <strong>Location:</strong> {person.location || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Company About */}
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h3 className="font-semibold mb-3 text-gray-800">About Company</h3>

        <p className="text-sm text-gray-600">
          Company information will appear here. You can load this from your
          backend later.
        </p>
      </div>

      {/* Similar People */}
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h3 className="font-semibold mb-3 text-gray-800">Similar People</h3>

        <p className="text-sm text-gray-600">
          Similar contacts will appear here.
        </p>
      </div>
    </div>
  );
}
