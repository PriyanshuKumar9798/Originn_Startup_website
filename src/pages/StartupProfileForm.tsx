import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Upload, X, Camera, CheckCircle, AlertCircle } from "lucide-react";

interface Member {
  name: string;
  designation: string;
  institution: string; // Will hold selected value or "Custom"
  customInstitution: string; // New field to hold the actual custom text
  photo: string | null;
}

interface FormData {
  companyName: string;
  registrationNo: string;
  website: string;
  category: string;
  customCategory: string;
  productType: string;
  targetMarket: string;
  stage: string;
  customStage: string;
  description: string;
  logo: string | null;
  coverPhoto: string | null;
  linkedin: string;
  instagram: string;
  twitter: string;
  founders: Member[];
  team: Member[];
  institute: {
    name: string;
    description: string;
  };
  stageDescription?: string;
}

const API_BASE = "https://firstfound-platform-backend.vercel.app";

// Dropdown options
const categories = [
  "Custom","AI & Deep Tech", "Healthcare & Life Sciences", "FinTech",
  "SaaS & Enterprise Tech", "Consumer Tech", "Sustainability & Climate Tech",
  "EdTech", "Media & Entertainment", "Logistics & Supply Chain", 
];

const productTypes = ["Physical Product (Hardware)", "SaaS (Software as a Service)", "Digital Product", "Service"];
const targetMarkets = ["B2C", "B2B", "D2C"];
const stages = ["Custom","Idea Stage", "Prototype Stage", "Pre-Revenue Stage", "Early Revenue Stage", "Series A/B/C Stage",];

// Institution list (as provided)
const institutions = [
  "Custom",
  "IIT Madras", "IIT Delhi", "IIT Bombay", "IIT Kanpur", "IIT Kharagpur", "IIT Roorkee", "IIT Guwahati",
  "IIT Hyderabad", "IIT Indore", "IIT (BHU) Varanasi", "IIT ISM Dhanbad", "IIT Gandhinagar", "IIT Ropar",
  "IIT Patna", "IIT Jodhpur", "NIT Tiruchirappalli", "NIT Surathkal", "NIT Rourkela", "NIT Warangal",
  "NIT Calicut", "NIT Nagpur", "NIT Jaipur", "NIT Silchar", "NIT Durgapur", "NIT Kurukshetra", "NIT Allahabad",
  "NIT Jalandhar", "NIT Surat", "NIT Patna", "NIT Delhi", "IIM Ahmedabad", "IIM Bangalore", "IIM Kozhikode",
  "IIM Calcutta", "IIM Lucknow", "IIM Mumbai", "IIM Indore", "IIM Raipur", "IIM Rohtak", "IIM Udaipur",
  "IIM Trichy", "IIM Ranchi", "IIM Kashipur", "IIM Visakhapatnam", "IIM Nagpur", "BITS Pilani", "VIT Vellore",
  "Manipal Institute of Technology", "Thapar Institute of Engineering", "Amrita Vishwa Vidyapeetham",
  "BIT Mesra", "IIIT Hyderabad", "SRM Chennai", "KIIT Bhubaneswar", "Ramaiah Bangalore", "PSG Coimbatore",
  "DA-IICT Gandhinagar", "SASTRA Thanjavur", "BMS Bangalore", "SPCE Mumbai", "LNMIIT Jaipur", "JSS Noida",
  "Galgotias University", "Amity Noida", "LPU Jalandhar", "XLRI Jamshedpur", "SPJIMR Mumbai", "MDI Gurgaon",
  "SIBM Pune", "NMIMS Mumbai", "ISB Hyderabad", "Great Lakes Chennai", "IMT Ghaziabad", "MICA Ahmedabad",
  "GIM Goa", "TAPMI Manipal", "XIMB Bhubaneswar", "KJ Somaiya Mumbai", "FORE Delhi", "LIBA Chennai",
  "WeSchool Mumbai", "IRMA Anand", "BIMTECH Greater Noida", "IBS Hyderabad",
];

const StartupProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    registrationNo: "",
    website: "",
    category: "",
    customCategory: "",
    productType: "",
    targetMarket: "",
    stage: "",
    customStage: "",
    description: "",
    logo: null,
    coverPhoto: null,
    linkedin: "",
    instagram: "",
    twitter: "",
    stageDescription: "",
    // Initialize members with the new customInstitution field
    founders: [{ name: "", designation: "", institution: "", customInstitution: "", photo: null }],
    team: [{ name: "", designation: "", institution: "", customInstitution: "", photo: null }],
    institute: {
      name: "",
      description: "",
    },
  });

  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("currentUserEmail");
    if (userEmail) {
      fetch(`${API_BASE}/featureProducts?user=${userEmail}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            // Merge fetched data, ensuring default custom fields are present if not in fetched data
            setFormData(prev => ({
              ...prev,
              ...data[0],
              customCategory: data[0].customCategory || "",
              customStage: data[0].customStage || "",
              // Initialize customInstitution for each member if necessary
              founders: data[0].founders ? data[0].founders.map((f: Member) => ({ ...f, customInstitution: f.customInstitution || "" })) : prev.founders,
              team: data[0].team ? data[0].team.map((t: Member) => ({ ...t, customInstitution: t.customInstitution || "" })) : prev.team,
            }));
          }
        })
        .catch(err => console.error(err));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: "logo" | "coverPhoto") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (field: "logo" | "coverPhoto") => {
    setFormData(prev => ({ ...prev, [field]: null }));
  };

  const handleDynamicChange = (index: number, field: keyof Member, value: string, type: "founders" | "team") => {
    const updated = [...formData[type]];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, [type]: updated }));
  };

  const handleDynamicFileChange = (index: number, file: File | undefined, type: "founders" | "team") => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleDynamicChange(index, "photo", reader.result as string, type);
      reader.readAsDataURL(file);
    }
  };

  const addDynamicField = (type: "founders" | "team") => {
    setFormData(prev => ({
      ...prev,
      // Include the new customInstitution field for new members
      [type]: [...prev[type], { name: "", designation: "", institution: "", customInstitution: "", photo: null }],
    }));
  };

  const removeDynamicField = (index: number, type: "founders" | "team") => {
    const updated = formData[type].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [type]: updated }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);
    setLoading(true);

    // Finalize data: use custom fields if "Custom" is selected
    const finalizedFounders = formData.founders.map(f => ({
      ...f,
      institution: f.institution === "Custom" ? f.customInstitution : f.institution,
      customInstitution: undefined, // Remove temporary field from payload
    }));

    const finalizedTeam = formData.team.map(t => ({
      ...t,
      institution: t.institution === "Custom" ? t.customInstitution : t.institution,
      customInstitution: undefined, // Remove temporary field from payload
    }));

    const dataToSend = {
      ...formData,
      category: formData.category === "Custom" ? formData.customCategory : formData.category,
      stage: formData.stage === "Custom" ? formData.customStage : formData.stage,
      customCategory: undefined, // Remove temporary field
      customStage: undefined,   // Remove temporary field
      founders: finalizedFounders,
      team: finalizedTeam,
      institute: formData.institute,
    };

    try {
      const userEmail = localStorage.getItem("currentUserEmail");
      if (!userEmail) throw new Error("No logged-in user found");

      const response = await fetch(`${API_BASE}/featureProducts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dataToSend, userEmail }), // Use dataToSend
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to save profile");

      setSubmitStatus("success");
      window.scrollTo(0, 0);
      setTimeout(() => setSubmitStatus(null), 4000);
    } catch (error: any) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
      {/* Cover Photo and Logo Section */}
      <div className="relative w-full h-52 sm:h-64 bg-gradient-to-br from-gray-200 to-gray-300 group">
        {formData.coverPhoto ? (
          <>
            <img src={formData.coverPhoto} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
            <button type="button" onClick={() => removeImage("coverPhoto")} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition opacity-0 group-hover:opacity-100 z-10">
              <X size={20} />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
            <Camera size={48} className="mb-2" />
            <p>Add Cover Photo</p>
          </div>
        )}
        <label className="absolute bottom-4 right-4 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer transition flex items-center gap-2 opacity-0 group-hover:opacity-100">
          <Upload size={18} />
          <span className="text-sm font-medium">Upload</span>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "coverPhoto")} className="hidden"/>
        </label>

        {/* Logo */}
        <div className="absolute -bottom-16 left-8 group/logo">
          <div className="relative">
            {formData.logo ? (
              <>
                <img src={formData.logo} alt="Logo" className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-xl bg-white" />
                <button type="button" onClick={() => removeImage("logo")} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition opacity-0 group-hover/logo:opacity-100">
                  <X size={16} />
                </button>
              </>
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center shadow-xl">
                <Camera size={32} className="text-gray-400" />
              </div>
            )}
            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 cursor-pointer transition">
              <Upload size={16} />
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "logo")} className="hidden"/>
            </label>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 pt-20 space-y-10">
        {/* Success/Error */}
        {submitStatus === 'success' && (
          <div className="flex items-center gap-3 p-4 bg-green-50 text-green-800 border-l-4 border-green-500 rounded-lg">
            <CheckCircle size={24} />
            <div>
              <h4 className="font-bold">Success!</h4>
              <p>Your startup profile has been saved.</p>
            </div>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="flex items-center gap-3 p-4 bg-red-50 text-red-800 border-l-4 border-red-500 rounded-lg">
            <AlertCircle size={24} />
            <div>
              <h4 className="font-bold">Error!</h4>
              <p>Could not save your profile. Please try again.</p>
            </div>
          </div>
        )}

        {/* Company Info Section */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-5">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2"><span className="text-blue-600">🏢</span> Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name <span className="text-red-500">*</span></label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter company name" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Registration No. <span className="text-red-500">*</span></label>
              <input type="text" name="registrationNo" value={formData.registrationNo} onChange={handleChange} placeholder="Registration No." className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
              <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder="https://yourwebsite.com" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              {formData.category === "Custom" && (
                <input type="text" name="customCategory" value={formData.customCategory} onChange={handleChange} placeholder="Enter your custom category" className="mt-2 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              )}
            </div>

            {/* Product Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Type</label>
              <select name="productType" value={formData.productType} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Product Type</option>
                {productTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}
              </select>
            </div>

            {/* Target Market */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Market</label>
              <select name="targetMarket" value={formData.targetMarket} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Target Market</option>
                {targetMarkets.map(tm => <option key={tm} value={tm}>{tm}</option>)}
              </select>
            </div>

            {/* Stage */}
            <div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">Stage</label>
  <select
    name="stage"
    value={formData.stage}
    onChange={handleChange}
    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select Stage</option>
    {stages.map(s => <option key={s} value={s}>{s}</option>)}
  </select>

  {/* Show custom stage input only if "Custom" is selected */}
  {formData.stage === "Custom" && (
    <input
      type="text"
      name="customStage"
      value={formData.customStage}
      onChange={handleChange}
      placeholder="Enter your custom stage"
      className="mt-2 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  )}

  {/* Stage description always visible */}
  <textarea
    name="stageDescription"
    value={formData.stageDescription || ""}
    onChange={e => setFormData(prev => ({ ...prev, stageDescription: e.target.value }))}
    placeholder="Describe your stage"
    rows={3}
    className="mt-2 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
  />
</div>




            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Startup Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tell us about your company..." rows={5} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>

          {/* Institute Info */}
{/* Institute Info */}
<div className="md:col-span-2 space-y-4">
  <label className="block text-sm font-semibold text-gray-700 mb-2">Institute</label>
  
  <select
    value={formData.institute.name}
    onChange={e => setFormData(prev => ({
      ...prev,
      institute: { ...prev.institute, name: e.target.value }
    }))}
    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
  >
    <option value="">Select Institute</option>
    {institutions.map(inst => <option key={inst} value={inst}>{inst}</option>)}
  </select>

  {formData.institute.name === "Custom" && (
    <input
      type="text"
      placeholder="Enter Custom Institute Name"
      value={formData.institute.description} // Or a separate field like `customName` if needed
      onChange={e => setFormData(prev => ({
        ...prev,
        institute: { ...prev.institute, description: e.target.value } // Or `customName`
      }))}
      className="mt-2 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
    />
  )}

  <label className="block text-sm font-semibold text-gray-700 mt-2">Institute Description</label>
  <textarea
    name="instituteDescription"
    value={formData.institute.description}
    onChange={e => setFormData(prev => ({
      ...prev,
      institute: { ...prev.institute, description: e.target.value }
    }))}
    placeholder="Write a brief description about your institute"
    rows={3}
    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
  />
</div>

        </section>


        {/* Social Media Section */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-5">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2"><span className="text-blue-600">🌐</span> Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <label>
              <span className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</span>
              <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/..." className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
            </label>
            <label>
              <span className="block text-sm font-semibold text-gray-700 mb-2">Instagram URL</span>
              <input type="url" name="instagram" value={formData.instagram} onChange={handleChange} placeholder="https://instagram.com/..." className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
            </label>
            <label>
              <span className="block text-sm font-semibold text-gray-700 mb-2">Twitter/X URL</span>
              <input type="url" name="twitter" value={formData.twitter} onChange={handleChange} placeholder="https://twitter.com/..." className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
            </label>
          </div>
        </section>

        {/* Dynamic Founders/Team Sections */}
        {(["founders", "team"] as const).map(section => (
          <section key={section} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="text-blue-600">{section === "founders" ? "👔" : "👥"}</span> {section === "founders" ? "Founders" : "Team"}
            </h3>
            <div className="space-y-4">
              {formData[section].map((person, index) => (
                <div key={index} className="bg-white border border-gray-200 p-5 rounded-lg space-y-3 relative hover:border-blue-300 transition shadow-sm">
                  <h4 className="font-semibold text-gray-700 text-lg">{section === "founders" ? "Founder" : "Member"} {index + 1}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" value={person.name} onChange={e => handleDynamicChange(index, "name", e.target.value, section)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
                    <input type="text" placeholder="Designation" value={person.designation} onChange={e => handleDynamicChange(index, "designation", e.target.value, section)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"/>
                  </div>

                  {/* Institution Select/Custom Input FIX */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Institution</label>
                    <select 
                      value={person.institution} 
                      onChange={e => handleDynamicChange(index, "institution", e.target.value, section)} 
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Institution</option>
                      {institutions.map(inst => <option key={inst} value={inst}>{inst}</option>)}
                    </select>
                    {person.institution === "Custom" && (
                        <input 
                          type="text" 
                          placeholder="Enter Custom Institution Name" 
                          value={person.customInstitution}
                          onChange={e => handleDynamicChange(index, "customInstitution", e.target.value, section)} 
                          className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                  </div>
                  {/* END FIX */}

                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex-1 cursor-pointer">
                      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition text-center text-gray-600 text-sm">
                        <Upload size={16} className="inline mr-2" /> Upload Photo
                      </div>
                      <input type="file" accept="image/*" onChange={e => handleDynamicFileChange(index, e.target.files?.[0], section)} className="hidden" />
                    </label>
                    {person.photo && <img src={person.photo} alt="Member" className="h-16 w-16 object-cover rounded-lg border-2 border-gray-200" />}
                  </div>
                  {formData[section].length > 1 && (
                    <button type="button" onClick={() => removeDynamicField(index, section)} className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm font-medium"><X size={18} /></button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={() => addDynamicField(section)} className="mt-4 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition font-semibold text-sm">+ Add {section === "founders" ? "Founder" : "Team Member"}</button>
          </section>
        ))}

        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-lg text-lg font-semibold">
          {loading ? "Saving..." : "Save Startup Profile"}
        </button>
      </form>
    </div>
  );
};

export default StartupProfileForm;