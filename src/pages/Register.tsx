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
  pitchDeckLink: string; // Changed from File to link
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
    pitchDeckLink: "",
    teamMembers: 0,
    stage: "Idea",
    address: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Determine API URL based on environment
      const payload = {
        companyName: formData.companyName,
        about: formData.aboutStartup, // map frontend name to backend
        companyWebsite: formData.companyWebsite,
        founderTitle: "Mr", // or add dropdown in form
        founderName: formData.founderName,
        founderMail: formData.founderEmail,
   founderPhone: formData.phone || "N/A",

        instituteName: formData.instituteName || "N/A", // required in schema
        pitchDeckPath: formData.pitchDeckLink,
        teamMembers: formData.teamMembers ? Number(formData.teamMembers) : 0,
        stage: formData.stage,
        address: formData.address || "N/A",
      };

      const response = await fetch(`${API_URL}/api/startups/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      console.log("res", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      setSubmitted(true);
      setError("");

      // Clear form
      setFormData({
        companyName: "",
        aboutStartup: "",
        companyWebsite: "",
        founderName: "",
        founderEmail: "",
        phone: "",
        instituteName: "",
        pitchDeckLink: "",
        teamMembers: 0,
        stage: "Idea",
        address: "",
      });

      // Redirect after success
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

              <div className="space-y-2">
                <Label htmlFor="pitchDeckLink">Pitch Deck Link</Label>
                <Input
                  type="url"
                  id="pitchDeckLink"
                  name="pitchDeckLink"
                  value={formData.pitchDeckLink}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/your-pitch-deck"
                />
              </div>

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
