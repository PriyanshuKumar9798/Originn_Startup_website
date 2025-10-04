import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  productName: string;
  description: string;
  category: string;
  fund: string;
  ticketSize: string;
  perks: string;
  mrsp: string;
  deliveryDate: string;
  milestones: string[];
  fundUtilization: string;
  pitchDeck: File | null;
  securityDocs: File | null;
  gst: string;
  pan: string;
  kyc: File | null;
  keyCert: File | null;
  video: File | null;
  teamDetails: string;
  problemSolved: string;
}

const CampaignBuilder: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    description: "",
    category: "",
    fund: "",
    ticketSize: "",
    perks: "",
    mrsp: "",
    deliveryDate: "",
    milestones: [""],
    fundUtilization: "",
    pitchDeck: null,
    securityDocs: null,
    gst: "",
    pan: "",
    kyc: null,
    keyCert: null,
    video: null,
    teamDetails: "",
    problemSolved: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, files } = target;
    
    setFormData({
      ...formData,
      [name]: type === "file" && files ? files[0] : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Campaign Data:", formData);
    alert("Campaign submitted successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#192a51] mb-8 text-center">
        Create Your Campaign
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* ===== Basic Info ===== */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-[#192a51] mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              >
                <option value="">Select Category</option>
                <option value="tech">Technology</option>
                <option value="food">Food</option>
                <option value="fashion">Fashion</option>
                <option value="health">Health</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              rows={4}
              required
            />
          </div>
        </section>

        {/* ===== Funding Details ===== */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-[#192a51] mb-4">
            Funding Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Fund Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="fund"
                value={formData.fund}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Ticket Size (₹)
              </label>
              <input
                type="number"
                name="ticketSize"
                value={formData.ticketSize}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                No. of Perks
              </label>
              <input
                type="number"
                name="perks"
                value={formData.perks}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                MRSP (₹)
              </label>
              <input
                type="number"
                name="mrsp"
                value={formData.mrsp}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </section>

        {/* ===== Compliance & KYC ===== */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-[#192a51] mb-4">
            Compliance & KYC
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                GST Number
              </label>
              <input
                type="text"
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                PAN Number
              </label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Upload KYC Documents
              </label>
              <input
                type="file"
                name="kyc"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Security / Registration Docs
              </label>
              <input
                type="file"
                name="securityDocs"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </section>

        {/* ===== Media ===== */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-[#192a51] mb-4">
            Media
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Pitch Deck (PDF)
              </label>
              <input
                type="file"
                name="pitchDeck"
                accept=".pdf"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Short Video
              </label>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
        </section>

        {/* ===== Team & Problem Statement ===== */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-[#192a51] mb-4">
            Team & Vision
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Team Details
              </label>
              <textarea
                name="teamDetails"
                value={formData.teamDetails}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                What specific problem are you solving?
              </label>
              <textarea
                name="problemSolved"
                value={formData.problemSolved}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                rows={4}
              />
            </div>
          </div>
        </section>

        {/* ===== Submit ===== */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#192a51] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#0f1d38] transition shadow-lg w-full sm:w-auto font-semibold text-lg"
          >
            Submit Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignBuilder;