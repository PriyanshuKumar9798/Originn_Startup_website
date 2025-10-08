import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// --- Import all your page components ---
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StartupProfileForm from "./pages/StartupProfileForm";
import Preorder from "./pages/Preorder";
import CampaignBuilder from "./pages/CampaignBuilder";
import Layout from "./pages/Layout";
import Header from "./pages/Header";

const queryClient = new QueryClient();

const ProtectedLayout = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        {/* Elegant divider line after header */}
        <div className="border-b-2 border-gradient-to-r from-transparent via-orange-500 to-transparent">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-75"></div>
        </div>
        
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- Protected Routes --- */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<StartupProfileForm />} />
            <Route path="/preorder" element={<Preorder />} />
            <Route path="/campaign" element={<CampaignBuilder />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;