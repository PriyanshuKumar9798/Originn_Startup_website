import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Shield,
  CheckCircle2,
  Rocket,
  Lock,
  Upload,
  ShoppingCart,
  BarChart3,
  Sparkles,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const quickBenefits = [
  { icon: Shield, text: "RBI-Regulated Escrow" },
  { icon: Rocket, text: "Milestone Funding" },
  { icon: BarChart3, text: "Investor Access" },
  { icon: CheckCircle2, text: "Zero Platform Fee" },
];

const processSteps = [
  { icon: Shield, title: "Get Verified", desc: "AI-human vetting ensures quality" },
  { icon: Sparkles, title: "Build Profile", desc: "Create your showcase page" },
  { icon: ShoppingCart, title: "Launch Campaign", desc: "Validate with pre-orders" },
  { icon: Lock, title: "Secure Funding", desc: "Escrow-protected payments" },
];

const API_URL = "https://firstfound-platform-backend.vercel.app/startup/apply";

interface FormData {
  companyName: string;
  aboutStartup: string;
  productDescription: string;
  founderName: string;
  founderEmail: string;
  password: string;
  confirmPassword: string;
  companyWebsite: string;
  pitchDeckFile?: File | null;
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
    productDescription: "",
    founderName: "",
    founderEmail: "",
    password: "",
    confirmPassword: "",
    companyWebsite: "",
    pitchDeckFile: null,
    instituteName: "",
    teamMembers: 0,
    stage: "idea",
    address: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      setSubmitted(true);
      setError("");

      setFormData({
        companyName: "",
        aboutStartup: "",
        productDescription: "",
        founderName: "",
        founderEmail: "",
        password: "",
        confirmPassword: "",
        companyWebsite: "",
        pitchDeckFile: null,
        instituteName: "",
        teamMembers: 0,
        stage: "idea",
        address: "",
      });

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
    <>
      <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-secondary flex items-center">
        <div className="container mx-auto px-4 py-8 md:py-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* ===== Left Section ===== */}
          <div className="text-white space-y-6">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm">
              <span className="text-accent text-sm font-semibold">
                India's Premier Startup Launch Platform
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Register Your Startup
            </h1>

            <p className="text-lg sm:text-xl text-primary-foreground/80 leading-relaxed">
              Join a curated ecosystem of India's most promising ventures. Get verified, showcase your innovation, and access milestone-based funding.
            </p>

            {/* Quick Benefits */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {quickBenefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:block space-y-3 pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Your Journey Starts Here
              </h3>
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-0.5">{step.title}</div>
                      <div className="text-xs text-primary-foreground/70">{step.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== Registration Card ===== */}
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
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="Company Name"
                  />
                </div>

                {/* About Startup */}
                <div className="space-y-2">
                  <Label htmlFor="aboutStartup">About Startup *</Label>
                  <textarea
                    id="aboutStartup"
                    name="aboutStartup"
                    value={formData.aboutStartup}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2"
                    placeholder="Brief about your startup"
                  />
                </div>

                {/* Product Description */}
                <div className="space-y-2">
                  <Label htmlFor="productDescription">Product Description *</Label>
                  <textarea
                    id="productDescription"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2"
                    placeholder="Describe your main product or service"
                  />
                </div>

                {/* Founder Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="founderName">Founder Name *</Label>
                    <Input
                      id="founderName"
                      name="founderName"
                      value={formData.founderName}
                      onChange={handleChange}
                      required
                      placeholder="Founder Name"
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
                      required
                      placeholder="founder@email.com"
                    />
                  </div>
                </div>

                {/* Passwords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 relative">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input
                    id="companyWebsite"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://technova.com"
                  />
                </div>

                <div className="space-y-2">
                <Label htmlFor="pitchDeckFile">
                  Upload Pitch Deck (PDF or PPT)
                </Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    id="pitchDeckFile"
                    name="pitchDeckFile"
                    onChange={handleChange}
                    accept=".pdf,.ppt,.pptx"
                    className="flex-1"
                  />
                  <Upload className="text-accent w-5 h-5" />
                </div>
                {formData.pitchDeckFile && (
                  <p className="text-sm text-green-600 font-medium">
                    File selected: {formData.pitchDeckFile.name}
                  </p>
                )}
              </div>

                {/* Institute + Team */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instituteName">Institute Name</Label>
                    <Input
                      id="instituteName"
                      name="instituteName"
                      value={formData.instituteName}
                      onChange={handleChange}
                      placeholder="National Institute of Technology Delhi"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamMembers">Team Members</Label>
                    <Input
                      type="number"
                      id="teamMembers"
                      name="teamMembers"
                      value={formData.teamMembers}
                      onChange={handleChange}
                      placeholder="5"
                    />
                  </div>
                </div>

                {/* Stage */}
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
                    <option value="idea">Idea</option>
                    <option value="prototype">Prototype</option>
                    <option value="revenue">Revenue</option>
                  </select>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2"
                    placeholder="Jaipur, Rajasthan"
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

      {/* ===== Why Register Section ===== */}
      <div className="bg-gradient-to-b from-primary to-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Why Register on Originn?
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Verified Trust",
                  desc: "Every pre-order protected by RBI-regulated digital escrow",
                },
                {
                  icon: Rocket,
                  title: "Structured Funding",
                  desc: "Milestone-based capital release as you hit production goals",
                },
                {
                  icon: BarChart3,
                  title: "Investor Access",
                  desc: "Successful campaigns unlock our exclusive investor network",
                },
                {
                  icon: Sparkles,
                  title: "Zero Platform Fee",
                  desc: "Launch and validate your product without any upfront costs",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-primary-foreground/80">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
