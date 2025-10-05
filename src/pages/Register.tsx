import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://backend-new-originn.vercel.app";

interface FormData {
  companyName: string;
  aboutStartup: string;
  companyWebsite: string;
  founderName: string;
  founderEmail: string;
  phone: string;
  instituteName: string;
  teamMembers: number;
  stage: string;
  address: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    aboutStartup: "",
    companyWebsite: "",
    founderName: "",
    founderEmail: "",
    phone: "",
    instituteName: "",
    teamMembers: 0,
    stage: "Idea",
    address: "",
  });

  const [pitchDeckImages, setPitchDeckImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setPitchDeckImages(files);

    // Create preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      formPayload.append("companyName", formData.companyName);
      formPayload.append("about", formData.aboutStartup);
      formPayload.append("companyWebsite", formData.companyWebsite);
      formPayload.append("founderTitle", "Mr");
      formPayload.append("founderName", formData.founderName);
      formPayload.append("founderMail", formData.founderEmail);
      formPayload.append("founderPhone", formData.phone || "N/A");
      formPayload.append("instituteName", formData.instituteName || "N/A");
      formPayload.append(
        "teamMembers",
        String(formData.teamMembers || 0)
      );
      formPayload.append("stage", formData.stage);
      formPayload.append("address", formData.address || "N/A");

      // Append images
      pitchDeckImages.forEach((file) => {
        formPayload.append("pitchDeckImages", file);
      });

      const response = await fetch(`${API_URL}/api/startups/register`, {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      setSubmitted(true);
      setError("");

      // Reset form
      setFormData({
        companyName: "",
        aboutStartup: "",
        companyWebsite: "",
        founderName: "",
        founderEmail: "",
        phone: "",
        instituteName: "",
        teamMembers: 0,
        stage: "Idea",
        address: "",
      });
      setPitchDeckImages([]);
      setImagePreviews([]);

      // Redirect
      setTimeout(() => {
        setSubmitted(false);
        navigate("/");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-secondary flex items-center">
      <div className="container mx-auto px-4 py-8 md:py-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Hero */}
        <div className="text-white space-y-6 flex flex-col justify-center lg:justify-start pt-4 lg:pt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Launch India's Next Big Thing
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/80 leading-relaxed">
            Originn is more than a marketplace—it's a curated ecosystem designed
            to showcase India's most promising ventures.
          </p>
        </div>

        {/* Right Card */}
        <Card className="shadow-3xl border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader>
            <CardTitle className="text-5xl text-center">
              Register Your Startup
            </CardTitle>
            <CardDescription className="text-center">
              Fill in the details below to join Originn
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted && (
              <div className="bg-green-100 text-green-800 border border-green-300 px-4 py-2 rounded-lg mb-4 text-center font-medium">
                Registration Successful! Redirecting to Login...
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-800 border border-red-300 px-4 py-2 rounded-lg mb-4 text-center font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your startup name"
                  required
                />
              </div>

              {/* About */}
              <div className="space-y-2">
                <Label htmlFor="aboutStartup">About Startup *</Label>
                <textarea
                  id="aboutStartup"
                  name="aboutStartup"
                  value={formData.aboutStartup}
                  onChange={handleChange}
                  placeholder="Brief description"
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  required
                />
              </div>

              {/* Founder Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="founderName">Founder Name *</Label>
                  <Input
                    type="text"
                    id="founderName"
                    name="founderName"
                    value={formData.founderName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founderEmail">Founder Email *</Label>
                  <Input
                    type="email"
                    id="founderEmail"
                    name="founderEmail"
                    value={formData.founderEmail}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Company Website */}
              <div className="space-y-2">
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input
                  type="url"
                  id="companyWebsite"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://example.com (optional)"
                />
              </div>

              {/* Phone + Institute */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instituteName">Institute Name</Label>
                  <Input
                    type="text"
                    id="instituteName"
                    name="instituteName"
                    value={formData.instituteName}
                    onChange={handleChange}
                    placeholder="Your institute / organization"
                  />
                </div>
              </div>

              {/* Stage + Team Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stage">Stage *</Label>
                  <select
                    id="stage"
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2"
                    required
                  >
                    <option value="Idea">Idea</option>
                    <option value="Prototype">Prototype</option>
                    <option value="Revenue">Revenue</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamMembers">No. of Team Members</Label>
                  <Input
                    type="number"
                    id="teamMembers"
                    name="teamMembers"
                    value={formData.teamMembers}
                    onChange={handleChange}
                    placeholder="Enter number"
                  />
                </div>
              </div>

              {/* Pitch Deck Upload */}
              <div className="space-y-2">
                <Label htmlFor="pitchDeckImages">Pitch Deck (Images)</Label>
                <Input
                  type="file"
                  id="pitchDeckImages"
                  name="pitchDeckImages"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <p className="text-xs text-muted-foreground">
                  Upload one or more images of your pitch deck (JPG, PNG).
                </p>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="border rounded-lg overflow-hidden">
                        <img
                          src={src}
                          alt={`pitch-preview-${i}`}
                          className="w-full h-28 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Startup Address"
                  rows={2}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-accent hover:bg-accent/90 text-white"
              >
                Register Startup
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-accent hover:text-accent-foreground"
                onClick={() => navigate("/")}
              >
                Login
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;

