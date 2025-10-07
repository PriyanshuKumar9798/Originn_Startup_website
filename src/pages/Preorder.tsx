import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  productName: string;
  description: string;
  category: string;
  funds: string;
  ticketSize: string;
  milestones: string;
  mrsp: string;
  fundUsage: string;
  teamDetails: string;
  address: string;
  registrationNo: string;
  gst: string;
  pan: string;
  aadhaar: string;
  patentTrademark: string;
}

interface Files {
  images: FileList | null;
  shortVideo: FileList | null;
  pitchDeck: FileList | null;
}

const Preorder: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    description: "",
    category: "",
    funds: "",
    ticketSize: "",
    milestones: "",
    mrsp: "",
    fundUsage: "",
    teamDetails: "",
    address: "",
    registrationNo: "",
    gst: "",
    pan: "",
    aadhaar: "",
    patentTrademark: "",
  });

  const [files, setFiles] = useState<Files>({
    images: null,
    shortVideo: null,
    pitchDeck: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files: selectedFiles } = e.target;
    setFiles({ ...files, [name]: selectedFiles });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Files:", files);
    alert("Preorder Submitted Successfully!");
    // API integration goes here
  };

  return (
    <div 
      className="max-w-4xl mx-auto p-6"
      style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
    >
      <h1 
        className="text-3xl font-extrabold mb-6 text-center"
        style={{ color: "#192a51" }}
      >
        Originn Preorder Form
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-lg rounded-xl p-6"
      >
        {/* Product Info */}
        <div className="space-y-4">
          <h2 
            className="text-xl font-semibold"
            style={{ color: "#192a51" }}
          >
            Product Info
          </h2>
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none transition"
            // style={{ 
            //   focusRingColor: "#192a51",
            // }}
            onFocus={(e) => {
              e.target.style.borderColor = "#192a51";
              e.target.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db";
              e.target.style.boxShadow = "none";
            }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none resize-none transition"
            rows={4}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#192a51";
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none transition"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#192a51";
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Health">Health</option>
            <option value="Food">Food</option>
            <option value="Services">Services</option>
          </select>
          <input
            type="number"
            name="mrsp"
            placeholder="MRSP"
            value={formData.mrsp}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none transition"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#192a51";
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Funding Info */}
        <div className="space-y-4">
          <h2 
            className="text-xl font-semibold"
            style={{ color: "#192a51" }}
          >
            Funding Info
          </h2>
          <input
            type="number"
            name="funds"
            placeholder="Funds Required"
            value={formData.funds}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none transition"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#192a51";
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <input
            type="number"
            name="ticketSize"
            placeholder="Ticket Size of Preorder"
            value={formData.ticketSize}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none transition"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#192a51";
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <textarea
            name="milestones"
            placeholder="Milestones"
            value={formData.milestones}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none resize-none transition"
            rows={3}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#192a51";
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <textarea
            name="fundUsage"
            placeholder="Explain Fund Utilization"
            value={formData.fundUsage}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none resize-none transition"
            rows={3}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#192a51";
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Legal & Team Info */}
        <div className="space-y-4">
          <h2 
            className="text-xl font-semibold"
            style={{ color: "#192a51" }}
          >
            Legal & Team Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="registrationNo"
              placeholder="Registration Number"
              value={formData.registrationNo}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none transition"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#192a51";
                e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <input
              type="text"
              name="gst"
              placeholder="GST Number"
              value={formData.gst}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none transition"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#192a51";
                e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <input
              type="text"
              name="pan"
              placeholder="PAN"
              value={formData.pan}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none transition"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#192a51";
                e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <input
              type="text"
              name="aadhaar"
              placeholder="Aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none transition"
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#192a51";
                e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#d1d5db";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>
          <textarea
            name="teamDetails"
            placeholder="Team Details"
            value={formData.teamDetails}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none resize-none transition"
            rows={3}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#192a51";
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none resize-none transition"
            rows={2}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#192a51";
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <textarea
            name="patentTrademark"
            placeholder="Patent / Trademark"
            value={formData.patentTrademark}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none resize-none transition"
            rows={2}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#192a51";
              e.currentTarget.style.boxShadow = `0 0 0 2px rgba(25, 42, 81, 0.2)`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#d1d5db";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition duration-300"
            style={{ 
              backgroundColor: "#192a51",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0f1d38";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#192a51";
            }}
          >
            Submit Preorder
          </button>
        </div>
      </form>
    </div>
  );
};

export default Preorder;