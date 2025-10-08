import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  TrendingUp,
  Users,
  CheckCircle2,
  Rocket,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

const ORIGINN_MAIN_PAGE_URL = "https://originn-main-website.vercel.app/";
// ✅ Use your real backend login endpoint here
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

  // ✅ LOGIN HANDLER
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

      // ✅ Store backend response properly
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("startupId", data.startup?.id || "");
      localStorage.setItem("startupEmail", data.startup?.founderEmail || "");
      localStorage.setItem("companyName", data.startup?.companyName || "");
      
      // ✅ Add this line
      localStorage.setItem("currentUserEmail", data.startup?.founderEmail || "");
      
      // ⏳ Small delay before navigation
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Benefit cards (unchanged)
  const benefits = [
    {
      icon: Shield,
      title: "Trust-as-a-Service",
      description:
        "RBI-regulated digital escrow protects every pre-order, building confidence with your backers.",
    },
    {
      icon: TrendingUp,
      title: "Market Validation",
      description:
        "Generate verified traction data that proves product-market fit to investors and stakeholders.",
    },
    {
      icon: Users,
      title: "Early Adopter Community",
      description:
        "Access enthusiastic customers eager to discover India's next big innovation before anyone else.",
    },
    {
      icon: Rocket,
      title: "Milestone-Based Funding",
      description:
        "Receive working capital in structured tranches as you hit verified production milestones.",
    },
    {
      icon: Lock,
      title: "Investor Bridge",
      description:
        "Successful campaigns unlock access to our exclusive network of accredited investors.",
    },
    {
      icon: CheckCircle2,
      title: "Rich Product Showcase",
      description:
        "Create immersive pages with HD videos, 360° views, and high-res imagery to overcome the touch barrier.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-secondary">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Heading */}
        {/* <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-accent shadow-lg inline-block pb-1">
            Originn Startup Portal
          </h2>
          <p className="text-lg text-primary-foreground/80 mt-2">
            Access your launchpad for India's next big innovation.
          </p>
        </div> */}

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
            {/* <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                className="bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm text-accent border-accent/30 hover:bg-accent/20 hover:border-accent/50 font-semibold shadow-lg hover:shadow-accent/20 transition-all duration-300 group"
                onClick={() => window.open(ORIGINN_MAIN_PAGE_URL, "_blank")}
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Go to Originn Main Page
              </Button>
              <p className="text-xs text-primary-foreground/60 mt-2">
                Visit our main website to learn more
              </p>
            </div> */}

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
                        Don’t have an account?{" "}
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
          {/* <p className="text-xl mb-8 text-primary-foreground/90">
            Join India's most promising startups on Originn today
          </p> */}
          <Button
        // size="xl"
        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-12 text-lg"
        onClick={() => navigate("/register")} // navigate to /register
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
      <div className="bg-gradient-to-b from-primary via-secondary to-primary py-16 md:py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Why Choose Originn?</h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              We provide the infrastructure, trust, and community you need to transform your idea into a market-validated product.
            </p>
          </div>
          
          {/* Flowing Pathway */}
          <div className="max-w-5xl mx-auto relative">
            {/* Central Curved Path Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -ml-0.5 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white/40"></div>
            </div>
            
            {/* Benefits Flow */}
            <div className="space-y-16 md:space-y-24">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <div
                    key={index}
                    className={`relative flex items-center gap-8 md:gap-12 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col animate-fade-in`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Content Side */}
                    <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-center`}>
                      <div className={`inline-block ${isLeft ? 'md:ml-auto' : 'md:mr-auto'}`}>
                        <div className="flex items-start gap-4 mb-4">
                          {isLeft && <div className="hidden md:block flex-1"></div>}
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20 ${!isLeft && 'md:order-2'}`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          {!isLeft && <div className="hidden md:block flex-1"></div>}
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{benefit.title}</h3>
                        <p className="text-base md:text-lg text-primary-foreground/80 leading-relaxed max-w-md">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Center Node */}
                    <div className="relative z-20 flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent via-accent to-accent/80 flex items-center justify-center shadow-2xl shadow-accent/50 border-4 border-white/30">
                        <span className="text-2xl font-bold text-white">{index + 1}</span>
                      </div>
                      
                      {/* Connecting Lines to Content */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r ${
                        isLeft 
                          ? 'right-full mr-2 from-white/60 to-transparent' 
                          : 'left-full ml-2 from-transparent to-white/60'
                      } w-8`}></div>
                    </div>
                    
                    {/* Empty Space (for alignment on desktop) */}
                    <div className="flex-1 hidden md:block"></div>
                  </div>
                );
              })}
            </div>
            
            {/* End Point */}
            <div className="flex justify-center mt-16 relative z-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-2xl shadow-success/50 border-4 border-white/30">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white mb-2">Your Success Starts Here</p>
                  <p className="text-primary-foreground/80">Join 100+ innovative startups on Originn</p>
                </div>
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
