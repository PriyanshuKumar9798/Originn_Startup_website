import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Shield, CheckCircle2, Rocket, Lock, ShoppingCart, BarChart3, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Benefits data remains the same
const benefits = [
  {
    icon: Shield,
    title: "Apply & Get Verified",
    description: "Begin by submitting your application on our portal. Every startup undergoes a rigorous hybrid AI-human vetting process to ensure a high-quality, trusted ecosystem for everyone involved."
  },
  {
    icon: Rocket,
    title: "Build Your Showcase & Get Discovered",
    description: "Once approved, access your dashboard to create a compelling startup profile. After a final review, your page goes live, placing you in front of a dedicated community of early adopters ready to discover India's next big thing."
  },
  {
    icon: ShoppingCart,
    title: "Validate Your Product with Pre-Orders",
    description: "When you're ready to prove demand, apply to launch a pre-order campaign. A successful campaign provides indisputable, tangible proof of product-market fit and secures the working capital for production."
  },
  {
    icon: Lock,
    title: "Milestone-Based Escrow Funding",
    description: "Backer funds are never sent directly to you. They are held in a campaign-specific, RBI-regulated digital escrow account. Funds are only released in tranches after our team verifies you've hit pre-defined production milestones."
  },
  {
    icon: BarChart3,
    title: "Bridge to Professional Investors",
    description: "Your success generates powerful data. We provide professional investors with access to the \"Originn Intelligence\" dashboard, which shows your verified pre-sale revenue, customer analytics, and traction data, turning investor speculation into evidence-based decisions."
  }
];

// Constants for API endpoints
const BACKEND_URL = "https://firstfound-platform-backend.vercel.app/startup/login";

const Login = () => {
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auth state stored in memory (used momentarily)
  const [authData, setAuthData] = useState({
    token: "",
    isLoggedIn: false,
    startupId: "",
    startupEmail: "",
    companyName: "",
    currentUserEmail: ""
  });

  /**
   * Handles the login submission. On success, stores auth tokens and IDs in localStorage
   * and redirects to the dashboard.
   */
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          founderEmail: email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      // 1. Store auth data in temporary state
      setAuthData({
        token: data.token,
        isLoggedIn: true,
        startupId: data.startup?.id || "",
        startupEmail: data.startup?.founderEmail || "",
        companyName: data.startup?.companyName || "",
        currentUserEmail: data.startup?.founderEmail || ""
      });

      // 2. --- PERSISTENCE FIX: Store necessary data in localStorage ---
      // This allows ProtectedLayout to work and subsequent API calls to be authenticated.
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("startupId", data.startup?.id || "");
      localStorage.setItem("companyName", data.startup?.companyName || "");
      localStorage.setItem("currentUserEmail", data.startup?.founderEmail || "");
      // -----------------------------------------------------------

      setSuccess(true);
      
      // Small delay before navigation
      setTimeout(() => {
        // Redirect to dashboard after successful login
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      // Note: setLoading(false) runs after navigation if successful, or immediately on error/catch
      if (!success) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-secondary">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Section */}
          <div className="text-white space-y-6">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm">
              <span className="text-accent text-sm font-semibold">
                India's Premier Startup Launch Platform
              </span>
            </div>

            <h6 className="text-4xl md:text-5xl lg:text-4xl font-bold leading-tight">
              Launch India's Next Big Thing
            </h6>

            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Originn is a curated ecosystem designed to showcase India's most
              promising ventures. Position your startup within the "Make in
              India" movement and turn your idea into a market-validated
              product.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4">
              <div>
                <div className="text-3xl font-bold text-accent">₹0</div>
                <div className="text-sm text-primary-foreground/70">
                  Platform Fee
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success">100%</div>
                <div className="text-sm text-primary-foreground/70">
                  Escrow Protected
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-sm text-primary-foreground/70">
                  Support
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Card */}
          <div className="space-y-6 max-w-md w-full mx-auto lg:max-w-none">
            <Card className="shadow-2xl border-border/50 backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="text-2xl">Sign In</CardTitle>
                <CardDescription>Access your Originn account</CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs value="login" className="w-full">
                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@startup.com"
                          className="h-11"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            className="h-11 pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground/80 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                      {success && (
                        <p className="text-sm text-green-500 text-center">
                          Login successful! Redirecting...
                        </p>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-11 text-base font-semibold"
                        disabled={loading}
                      >
                        {loading ? "Signing In..." : "Sign In"}
                      </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                      <a href="#" className="text-accent hover:underline">
                        Forgot password?
                      </a>
                    </p>

                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Button
                          variant="link"
                          className="p-0 h-auto text-accent hover:text-accent/80 font-semibold"
                          onClick={() => navigate("/register")}
                        >
                          Register Your Startup
                        </Button>
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="relative py-8 bg-gradient-to-b from-secondary to-primary">
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-white/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-secondary px-6 py-2 text-white/60 text-sm font-semibold tracking-wider">
                GET STARTED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-b from-primary to-secondary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Launch Your Startup On Originn</h2>
          <Button
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-12 text-lg"
            onClick={() => {
              navigate("/register");
              window.scrollTo(0, 0);
            }}
          >
            Register Here
          </Button>
        </div>
      </div>

      {/* Section Divider */}
      <div className="relative py-8 bg-gradient-to-b from-secondary to-primary">
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-white/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-primary px-6 py-2 text-white/60 text-sm font-semibold tracking-wider">
                OUR JOURNEY
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section - Flowing Pathway Design */}
      <div className="bg-gradient-to-b from-primary to-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Startup Journey on Originn.co.in</h2>
            <p className="text-base md:text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              A structured pathway from validation to funding. Follow these steps to launch successfully on our platform.
            </p>
          </div>
          
          <div className="relative space-y-8 md:space-y-12">
            {/* Continuous vertical line connecting all steps */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-white/40 hidden md:block"></div>
            
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`relative flex gap-6 md:gap-8 animate-fade-in ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step Number & Icon */}
                  <div className="relative z-10 flex-shrink-0 flex items-start md:items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/30 border-2 border-white/20">
                      <span className="text-xl font-bold text-white">{index + 1}</span>
                    </div>
                    
                    {/* Desktop: Connecting line */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-px bg-white/40 ${
                      isLeft ? 'left-full ml-2' : 'right-full mr-2'
                    } w-6`}></div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`flex-1 ${isLeft ? 'md:pr-12' : 'md:pl-12 md:text-right'}`}>
                    <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 hover:bg-white/10 transition-colors ${
                      isLeft ? 'md:mr-8' : 'md:ml-8'
                    }`}>
                      <div className={`flex items-center gap-3 mb-3 ${!isLeft && 'md:flex-row-reverse'}`}>
                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white">{benefit.title}</h3>
                      </div>
                      <p className="text-sm md:text-base text-primary-foreground/80 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Desktop: Empty space for alternating layout */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              );
            })}
          </div>
          
          {/* End Point */}
          <div className="flex justify-start md:justify-center mt-12 ml-8 md:ml-0 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-lg shadow-success/30 border-2 border-white/20">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-white">Ready to Launch?</p>
                <p className="text-sm text-primary-foreground/80">Join India's premier startup ecosystem</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="relative py-8 bg-gradient-to-b from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-white/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-primary px-6 py-2 text-white/60 text-sm font-semibold tracking-wider">
                ABOUT US
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-b from-secondary via-primary to-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">About Originn</h2>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                We're building India's most credible platform for startup discovery and validation
              </p>
            </div>

            <div className="space-y-8">
              <div className="border-l-4 border-white/40 pl-6 py-2">
                <h3 className="text-2xl font-semibold mb-3 text-white">A Platform for Discovery</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Originn is a curated ecosystem showcasing India's most promising ventures. We engage in direct outreach 
                  to identify high-potential startups from leading incubators, accelerators, university innovation hubs, 
                  and design schools. By joining, you position your venture within a movement celebrating the "Make in India" spirit.
                </p>
              </div>

              <div className="border-l-4 border-success/60 pl-6 py-2">
                <h3 className="text-2xl font-semibold mb-3 text-white">De-Risking Pre-Orders</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  Our mandatory digital escrow system addresses the biggest hurdle in pre-orders: trust. When backers pre-order, 
                  funds are held in RBI-regulated escrow accounts, not transferred directly to you. This immediately mitigates backer 
                  fear and builds the confidence needed for upfront commitments.
                </p>
              </div>

              <div className="border-l-4 border-accent/60 pl-6 py-2">
                <h3 className="text-2xl font-semibold mb-3 text-white">Milestone-Based Funding</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  We work with you to break down your production plan into clear, verifiable milestones. Funds are released in 
                  pre-agreed tranches only after our team verifies milestone completion. This provides structured working capital 
                  and gives backers radical transparency.
                </p>
              </div>

              <div className="border-l-4 border-white/40 pl-6 py-2">
                <h3 className="text-2xl font-semibold mb-3 text-white">Bridge to Investors</h3>
                <p className="text-primary-foreground/80 leading-relaxed">
                  For startups demonstrating significant traction, we offer access to a hyper-exclusive network of accredited investors. 
                  Your verified campaign data becomes powerful evidence of product-market fit, transforming investor decisions from 
                  speculation to evidence-based confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
