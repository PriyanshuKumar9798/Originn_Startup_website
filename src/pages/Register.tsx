import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, Users, CheckCircle2, Rocket, Lock, Upload } from "lucide-react";

interface FormData {
  companyName: string;
  aboutStartup: string;
  companyWebsite: string;
  founderName: string;
  founderEmail: string;
  phone: string;
  instituteName: string;
  pitchDeck: File | null;
  teamMembers: string;
  stage: string;
  address: string;
}

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    aboutStartup: "",
    companyWebsite: "",
    founderName: "",
    founderEmail: "",
    phone: "",
    instituteName: "",
    pitchDeck: null,
    teamMembers: "",
    stage: "Idea",
    address: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string>("");

  const benefits: Benefit[] = [
    {
      icon: Shield,
      title: "Trust-as-a-Service",
      description: "RBI-regulated digital escrow protects every pre-order, building confidence with your backers."
    },
    {
      icon: TrendingUp,
      title: "Market Validation",
      description: "Generate verified traction data that proves product-market fit to investors and stakeholders."
    },
    {
      icon: Users,
      title: "Early Adopter Community",
      description: "Access enthusiastic customers eager to discover India's next big innovation before anyone else."
    },
    {
      icon: Rocket,
      title: "Milestone-Based Funding",
      description: "Receive working capital in structured tranches as you hit verified production milestones."
    },
    {
      icon: Lock,
      title: "Investor Bridge",
      description: "Successful campaigns unlock access to our exclusive network of accredited investors."
    },
    {
      icon: CheckCircle2,
      title: "Rich Product Showcase",
      description: "Create immersive pages with HD videos, 360° views, and high-res imagery to overcome the touch barrier."
    }
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file for pitch deck
      if (name === "pitchDeck") {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = [
          "application/pdf",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ];
        
        if (file.size > maxSize) {
          setFileError("File size must be less than 10MB");
          return;
        }
        
        if (!allowedTypes.includes(file.type)) {
          setFileError("Only PDF, PPT, and PPTX files are allowed");
          return;
        }
        
        setFileError("");
      }
      
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fileError) {
      alert("Please fix file errors before submitting");
      return;
    }

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formPayload.append(key, value as string | Blob);
      }
    });

    try {
      const response = await fetch(
        "https://backend-new-originn.vercel.app/api/startups/register",
        {
          method: "POST",
          body: formPayload,
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSubmitted(true);
        setFormData({
          companyName: "",
          aboutStartup: "",
          companyWebsite: "",
          founderName: "",
          founderEmail: "",
          phone: "",
          instituteName: "",
          pitchDeck: null,
          teamMembers: "",
          stage: "Idea",
          address: "",
        });
        setFileError("");
        setTimeout(() => setSubmitted(false), 2000);
      } else {
        alert(result.message || "Failed to submit form. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong! Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-secondary flex items-center">
  <div className="container mx-auto px-4 py-8 md:py-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
    {/* Left Hero */}
    <div className="text-white space-y-6 flex flex-col justify-center lg:justify-start pt-4 lg:pt-0">
      <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm">
        <span className="text-accent text-sm font-semibold">India's Premier Startup Launch Platform</span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
        Launch India's Next Big Thing
      </h1>
      <p className="text-lg sm:text-xl text-primary-foreground/80 leading-relaxed">
        Originn is more than a marketplace—it's a curated ecosystem designed to showcase India's most promising ventures.
      </p>
      <div className="grid grid-cols-3 gap-6 pt-4">
        <div>
          <div className="text-3xl font-bold text-accent">₹0</div>
          <div className="text-sm text-primary-foreground/70">Platform Fee</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-success">100%</div>
          <div className="text-sm text-primary-foreground/70">Escrow Protected</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-accent">24/7</div>
          <div className="text-sm text-primary-foreground/70">Support</div>
        </div>
      </div>
    </div>

        {/* Right Card */}
        <Card className="shadow-3xl border-border/50 backdrop-blur-sm bg-card/95">
          <CardHeader>
            <CardTitle className="text-5xl text-center">Register Your Startup</CardTitle>
            <CardDescription className="text-center">
              Fill in the details below to join Originn
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted && (
              <div className="bg-green-100 text-green-800 border border-green-300 px-4 py-2 rounded-lg mb-4 text-center font-medium">
                Form submitted successfully!
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
                <Label htmlFor="pitchDeck">Pitch Deck</Label>
                <div className="relative">
                  <Input
                    type="file"
                    id="pitchDeck"
                    name="pitchDeck"
                    onChange={handleChange}
                    accept=".pdf,.ppt,.pptx"
                    className="cursor-pointer"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Upload className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  PDF, PPT, or PPTX (Max 10MB)
                </p>
                {fileError && (
                  <p className="text-xs text-red-600">{fileError}</p>
                )}
                {formData.pitchDeck && !fileError && (
                  <p className="text-xs text-green-600">
                    ✓ {formData.pitchDeck.name}
                  </p>
                )}
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

              <Button type="submit" className="w-full h-12 text-lg font-semibold bg-accent hover:bg-accent/90 text-white">
                Register Startup
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
    </div>

  );
};

export default Register;