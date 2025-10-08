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
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  pitchDeckUrl: string;
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
    pitchDeckUrl: "",
    instituteName: "",
    teamMembers: 0,
    stage: "idea",
    address: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

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
        pitchDeckUrl: "",
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
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-secondary flex items-center">
      <div className="container mx-auto px-4 py-8 md:py-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* ===== Left Section ===== */}
        <div className="text-white space-y-10 flex flex-col justify-center lg:justify-start pt-4 lg:pt-0">
          <div className="text-center mb-6 lg:mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-accent shadow-lg inline-block pb-1">
              Originn Startup Portal
            </h2>
            <p className="text-lg text-primary-foreground/80 mt-2">
              Access your launchpad for India's next big innovation.
            </p>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Launch India's Next Big Thing
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/80 leading-relaxed mt-3">
              Originn is a curated ecosystem designed to showcase India's most
              promising ventures.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">₹0</div>
              <div className="text-sm text-primary-foreground/70">
                Platform Fee
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">100%</div>
              <div className="text-sm text-primary-foreground/70">
                Escrow Protected
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">24/7</div>
              <div className="text-sm text-primary-foreground/70">
                Support
              </div>
            </div>
          </div>

          <div className="mt-18 text-center space-y-3">
            <div className="border-l-4 border-white/40 pl-6 py-2">
              <h3 className="text-2xl font-semibold mb-3 text-white">
                A Platform for Discovery
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Originn is a curated ecosystem showcasing India's most promising
                ventures. We engage in direct outreach to identify
                high-potential startups from leading incubators, accelerators,
                university innovation hubs, and design schools. By joining, you
                position your venture within a movement celebrating the "Make in
                India" spirit.
              </p>
            </div>

            <div className="border-l-4 border-success/60 pl-6 py-2">
              <h3 className="text-2xl font-semibold mb-3 text-white">
                De-Risking Pre-Orders
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Our mandatory digital escrow system addresses the biggest hurdle
                in pre-orders: trust. When backers pre-order, funds are held in
                RBI-regulated escrow accounts, not transferred directly to you.
                This immediately mitigates backer fear and builds the confidence
                needed for upfront commitments.
              </p>
            </div>

            <div className="border-l-4 border-accent/60 pl-6 py-2">
              <h3 className="text-2xl font-semibold mb-3 text-white">
                Milestone-Based Funding
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                We work with you to break down your production plan into clear,
                verifiable milestones. Funds are released in pre-agreed tranches
                only after our team verifies milestone completion. This provides
                structured working capital and gives backers radical
                transparency.
              </p>
            </div>

            <div className="border-l-4 border-white/40 pl-6 py-2">
              <h3 className="text-2xl font-semibold mb-3 text-white">
                Bridge to Investors
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                For startups demonstrating significant traction, we offer access
                to a hyper-exclusive network of accredited investors. Your
                verified campaign data becomes powerful evidence of
                product-market fit, transforming investor decisions from
                speculation to evidence-based confidence.
              </p>
            </div>
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
                  placeholder="companyName"
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
                    placeholder="founderName"
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
                    placeholder="founderEmail.com"
                  />
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
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

                {/* Confirm Password */}
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                <Label htmlFor="pitchDeckUrl">Pitch Deck URL</Label>
                <Input
                  id="pitchDeckUrl"
                  name="pitchDeckUrl"
                  value={formData.pitchDeckUrl}
                  onChange={handleChange}
                  placeholder="https://pitchdeck.com/technova"
                />
              </div>

              {/* Institute + Team Members */}
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

              {/* Submit */}
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
