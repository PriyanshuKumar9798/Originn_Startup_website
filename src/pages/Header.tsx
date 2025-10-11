import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, User, LogOut, LayoutDashboard, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ORIGINN_MAIN_PAGE_URL="https://www.originn.co.in/"

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-[#192a51] via-[#1e3a5f] to-[#192a51] text-white shadow-lg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo / Title */}
          <div
            className="flex items-center flex-shrink-0 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <h4 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:text-orange-400 transition-colors duration-300">
              Originn Startup Portal
            </h4>
          </div>

          {/* Right side - Button and User Menu */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Visit Button - Hidden on mobile */}
            <div className="hidden lg:block">
              <Button
                variant="outline"
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 
                           text-white border-0 font-semibold shadow-lg hover:shadow-xl
                           hover:shadow-orange-500/50 transition-all duration-300 
                           hover:scale-105 group px-6"
                onClick={() => window.open(ORIGINN_MAIN_PAGE_URL, "_blank")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Visit Originn.co.in
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>

            {currentUser ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden lg:block relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-3 py-2 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-sm">
                      {currentUser.name}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl z-20 overflow-hidden border border-gray-100">
                        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                              <User className="w-6 h-6 text-blue-500" />
                            </div>
                            <div className="text-white">
                              <p className="font-semibold">{currentUser.name}</p>
                              <p className="text-sm opacity-90">
                                {currentUser.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => {
                              navigate("/dashboard");
                              setUserMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 rounded-md text-gray-700 transition-colors"
                          >
                            <LayoutDashboard className="w-5 h-5 text-blue-500" />
                            <span className="font-medium">Dashboard</span>
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-md text-red-600 transition-colors"
                          >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : null}

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-2 space-y-2 pb-4">
            {currentUser && (
              <div className="bg-white/10 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{currentUser.name}</p>
                    <p className="text-xs opacity-80">{currentUser.email}</p>
                  </div>
                </div>
              </div>
            )}

            <a
              href="https://originn-venture-launchpad.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                className="w-full text-left text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
              >
                Launch Your Startup
              </Button>
            </a>

            {currentUser ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full text-left text-primary-foreground hover:bg-primary-foreground/10 font-semibold flex items-center gap-2"
                  onClick={() => {
                    navigate("/dashboard");
                    setMenuOpen(false);
                  }}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
                <Button
                  variant="default"
                  className="w-full bg-red-500 text-white hover:bg-red-600 font-semibold flex items-center gap-2"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : null}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;