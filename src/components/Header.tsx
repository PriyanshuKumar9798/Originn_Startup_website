import React, { useEffect, useState } from "react";
import { Bell, Moon, Sun, User } from "lucide-react";
import { authStorage } from "../services/auth";

interface HeaderProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, setIsDark }) => {
  const [startupName, setStartupName] = useState<string>("");
  const [startupEmail, setStartupEmail] = useState<string>("");

  useEffect(() => {
    const info = authStorage.getStartup<{ company_name?: string; founder_email?: string }>();
    if (info) {
      setStartupName(info.company_name || "");
      setStartupEmail(info.founder_email || "");
    }
  }, []);

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{startupName || "Dashboard"}</h1>
        <p className="text-gray-600 mt-1">{startupEmail || "Welcome back"}</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </button>
        <button
          onClick={() => setIsDark(!isDark)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
        >
          {isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
        <button className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
          <User className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
