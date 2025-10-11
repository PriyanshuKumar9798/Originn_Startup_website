import React, { useState, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, FileText, User, LogOut, Menu, X, Megaphone } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

interface MenuItem {
  name: string;
  path?: string;
  icon: JSX.Element;
  action?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("authToken");
      localStorage.removeItem("startupId");
      localStorage.removeItem("companyName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUserEmail");
    navigate("/");
  };

  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    { name: "Startup Profile", path: "/profile", icon: <User size={18} /> },
    { name: "Preorder Form", path: "/preorder", icon: <FileText size={18} /> },
    { name: "Campaign Builder", path: "/campaign", icon: <Megaphone size={18} /> }, // Add this line
    { name: "Logout", icon: <LogOut size={18} />, action: handleLogout },
  ];

  return (
    <div className="flex h-screen bg-gray-100" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
      {/* Mobile Header with Hamburger Menu */}
      <header 
        className="md:hidden fixed top-0 left-0 right-0 h-16 text-white flex items-center justify-between px-4 z-50 shadow-lg" 
        style={{ backgroundColor: "#192a51" }}
      >
        <h2 className="text-xl font-bold">Originn Portal</h2>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 text-white flex flex-col p-6 space-y-6 
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
          z-50 shadow-lg
        `}
        style={{ backgroundColor: "#192a51" }}
      >
        {/* Desktop Title */}
        <h2 className="text-2xl font-bold mb-6 text-white hidden md:block">Originn Portal</h2>
        
        {/* Mobile Title */}
        <h2 className="text-2xl font-bold mb-6 text-white md:hidden mt-12">Menu</h2>
        
        <nav className="flex flex-col gap-4 text-base">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (item.action) item.action();
                  else if (item.path) navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-lg transition"
                style={{
                  backgroundColor: isActive ? "#1e40af" : "transparent",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Spacer for mobile header */}
        <div className="h-16 md:hidden"></div>
        
        <main className="p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto bg-gray-100 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;