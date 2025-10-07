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

      setSuccess(true);

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
        <div className="text-center mb-10 lg:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-accent shadow-lg inline-block pb-1">
            Originn Startup Portal
          </h2>
          <p className="text-lg text-primary-foreground/80 mt-2">
            Access your launchpad for India's next big innovation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Section */}
          <div className="text-white space-y-6">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/30 backdrop-blur-sm">
              <span className="text-accent text-sm font-semibold">
                India's Premier Startup Launch Platform
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Launch India's Next Big Thing
            </h1>

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
            <div className="text-center">
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
            </div>

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
    </div>
  );
};

export default Login;
