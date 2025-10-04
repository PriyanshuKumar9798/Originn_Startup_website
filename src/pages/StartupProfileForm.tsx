import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Upload, X, Camera, CheckCircle, AlertCircle } from "lucide-react";

interface Member {
  name: string;
  designation: string;
  institution: string;
  photo: string | null;
}

interface FormData {
  companyName: string;
  registrationNo: string;
  website: string;
  category: string;
  industry: string;
  description: string;
  logo: string | null;
  coverPhoto: string | null;
  linkedin: string;
  instagram: string;
  twitter: string;
  founders: Member[];
  team: Member[];
}

const StartupProfileForm = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    registrationNo: "",
    website: "",
    category: "",
    industry: "",
    description: "",
    logo: null,
    coverPhoto: null,
    linkedin: "",
    instagram: "",
    twitter: "",
    founders: [{ name: "", designation: "", institution: "", photo: null }],
    team: [{ name: "", designation: "", institution: "", photo: null }],
  });

  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    const userEmail = localStorage.getItem("currentUserEmail");
    if (userEmail) {
      const userDataString = localStorage.getItem(userEmail);
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setFormData(prev => ({ ...prev, ...userData }));
      }
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: "logo" | "coverPhoto") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (field: "logo" | "coverPhoto") => {
    setFormData((prev) => ({ ...prev, [field]: null }));
  };
  
  const handleDynamicChange = (index: number, field: keyof Member, value: string, type: "founders" | "team") => {
    const updated = [...formData[type]];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, [type]: updated }));
  };

  const handleDynamicFileChange = (index: number, file: File | undefined, type: "founders" | "team") => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleDynamicChange(index, "photo", reader.result as string, type);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDynamicField = (type: "founders" | "team") => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], { name: "", designation: "", institution: "", photo: null }],
    }));
  };

  const removeDynamicField = (index: number, type: "founders" | "team") => {
    const updated = formData[type].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [type]: updated }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);
    const userEmail = localStorage.getItem("currentUserEmail");

    if (!userEmail) {
      alert("Error: No logged-in user found. Please log in again.");
      setSubmitStatus("error");
      return;
    }

    try {
      const existingDataString = localStorage.getItem(userEmail);
      const existingData = existingDataString ? JSON.parse(existingDataString) : {};
      
      const updatedData = { ...existingData, ...formData };
      
      localStorage.setItem(userEmail, JSON.stringify(updatedData));
      
      setSubmitStatus("success");
      window.scrollTo(0, 0);
      setTimeout(() => setSubmitStatus(null), 4000);

    } catch (error) {
      console.error("Failed to save profile:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
      {/* Cover Photo */}
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
        
        {/* Success/Error Message */}
        {submitStatus === 'success' && (
          <div className="flex items-center gap-3 p-4 bg-green-50 text-green-800 border-l-4 border-green-500 rounded-lg">
            <CheckCircle size={24} /> 
            <div>
              <h4 className="font-bold">Success!</h4>
              <p>Your startup profile has been updated.</p>
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

        {/* Company Information Section */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <span className="text-blue-600">🏢</span> Company Information
          </h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="companyName" 
                placeholder="Enter your company name" 
                value={formData.companyName} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Registration No. <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="registrationNo" 
                  placeholder="Registration number" 
                  value={formData.registrationNo} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Website
                </label>
                <input 
                  type="url" 
                  name="website" 
                  placeholder="https://yourwebsite.com" 
                  value={formData.website} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <input 
                  type="text" 
                  name="category" 
                  placeholder="e.g., SaaS, D2C, B2B" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Industry
                </label>
                <input 
                  type="text" 
                  name="industry" 
                  placeholder="e.g., FinTech, EdTech, HealthTech" 
                  value={formData.industry} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Description
              </label>
              <textarea 
                name="description" 
                placeholder="Tell us about your company, mission, and vision..." 
                value={formData.description} 
                onChange={handleChange} 
                rows={5} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-base"
              />
            </div>
          </div>
        </section>
        
        {/* Social Media Section */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <span className="text-blue-600">🌐</span> Social Media
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LinkedIn
              </label>
              <input 
                type="url" 
                name="linkedin" 
                placeholder="LinkedIn profile URL" 
                value={formData.linkedin} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Instagram
              </label>
              <input 
                type="url" 
                name="instagram" 
                placeholder="Instagram profile URL" 
                value={formData.instagram} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Twitter/X
              </label>
              <input 
                type="url" 
                name="twitter" 
                placeholder="Twitter/X profile URL" 
                value={formData.twitter} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
              />
            </div>
          </div>
        </section>

        {/* Dynamic Founder/Team sections */}
        {(["founders", "team"] as const).map((section) => (
          <section key={section} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <span className="text-blue-600">{section === "founders" ? "👔" : "👥"}</span> 
              {section === "founders" ? "Founder Details" : "Team Members"}
            </h3>
            <div className="space-y-4">
              {formData[section].map((person, index) => (
                <div key={index} className="bg-white border border-gray-200 p-5 rounded-lg space-y-3 relative hover:border-blue-300 transition shadow-sm">
                  <h4 className="font-semibold text-gray-700 text-lg">
                    {section === "founders" ? "Founder" : "Member"} {index + 1}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={person.name} 
                      onChange={(e) => handleDynamicChange(index, "name", e.target.value, section)} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
                    />
                    <input 
                      type="text" 
                      placeholder="Designation" 
                      value={person.designation} 
                      onChange={(e) => handleDynamicChange(index, "designation", e.target.value, section)} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Institution / Alma Mater" 
                    value={person.institution} 
                    onChange={(e) => handleDynamicChange(index, "institution", e.target.value, section)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-base"
                  />
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex-1 cursor-pointer">
                      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition text-center text-gray-600 text-sm">
                        <Upload size={16} className="inline mr-2" /> Upload Photo
                      </div>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleDynamicFileChange(index, e.target.files?.[0], section)} 
                        className="hidden"
                      />
                    </label>
                    {person.photo && (
                      <img 
                        src={person.photo} 
                        alt="Member" 
                        className="h-16 w-16 object-cover rounded-lg border-2 border-gray-200" 
                      />
                    )}
                  </div>
                   {formData[section].length > 1 && (
                     <button 
                       type="button" 
                       onClick={() => removeDynamicField(index, section)} 
                       className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm font-medium"
                     >
                       <X size={18}/>
                     </button>
                   )}
                </div>
              ))}
            </div>
            <button 
              type="button" 
              onClick={() => addDynamicField(section)} 
              className="mt-4 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition font-semibold text-sm"
            >
              + Add {section === "founders" ? "Another Founder" : "Team Member"}
            </button>
          </section>
        ))}

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-lg text-lg font-semibold"
        >
          Save Startup Profile
        </button>
      </form>
    </div>
  );
};

export default StartupProfileForm;