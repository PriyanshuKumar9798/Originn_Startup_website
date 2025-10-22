import React, { useState } from "react";
import {
  Home,
  Building2,
  User,
  ShoppingBag,
  Megaphone,
  Briefcase,
  Video,
  Users,
  ChevronDown,
  ChevronsRight,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  selected: string;
  setSelected: (selected: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selected, setSelected }) => {
  const [open, setOpen] = useState(true);

  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
        open ? 'w-64' : 'w-16'
      } border-gray-200 bg-white p-2 shadow-sm`}
    >
      <TitleSection open={open} />

      <div className="space-y-1 mb-8">
        <Option
          Icon={Home}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={Building2}
          title="Startup"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={User}
          title="Profile"
          selected={selected}
          setSelected={setSelected}
          open={open}
        />
        <Option
          Icon={ShoppingBag}
          title="Pre-order"
          selected={selected}
          setSelected={setSelected}
          open={open}
          badge="Coming Soon"
        />
        <Option
          Icon={Megaphone}
          title="Campaign Builder"
          selected={selected}
          setSelected={setSelected}
          open={open}
          badge="Coming Soon"
        />
        <Option
          Icon={Briefcase}
          title="Jobs"
          selected={selected}
          setSelected={setSelected}
          open={open}
          badge="Coming Soon"
        />
        <Option
          Icon={Video}
          title="BTS"
          selected={selected}
          setSelected={setSelected}
          open={open}
          badge="Coming Soon"
        />
        <Option
          Icon={Users}
          title="Collaborate"
          selected={selected}
          setSelected={setSelected}
          open={open}
          badge="Coming Soon"
        />
      </div>

      {open && (
        <div className="border-t border-gray-200 pt-4 space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
            Account
          </div>
          <Option
            Icon={HelpCircle}
            title="Help & Support"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={Settings}
            title="Settings"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={User}
            title="Profile"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
          <Option
            Icon={LogOut}
            title="Logout"
            selected={selected}
            setSelected={setSelected}
            open={open}
          />
        </div>
      )}

      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
  );
};

interface OptionProps {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  selected: string;
  setSelected: (selected: string) => void;
  open: boolean;
  notifs?: number;
  badge?: string;
}

const Option: React.FC<OptionProps> = ({ Icon, title, selected, setSelected, open, notifs, badge }) => {
  const isSelected = selected === title;
  
  return (
    <button
      onClick={() => setSelected(title)}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 cursor-pointer ${
        isSelected 
          ? "bg-blue-50 text-blue-700 shadow-sm border-l-2 border-blue-500" 
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      
      {open && (
        <div className="flex-1 flex items-center justify-between pr-3">
          <span
            className={`text-sm font-medium transition-opacity duration-200 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {title}
          </span>
          
          <div className="flex items-center gap-2">
            {notifs && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white font-medium">
                {notifs}
              </span>
            )}
            
            {badge && (
              <span className="flex items-center justify-center px-2 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-medium">
                {badge}
              </span>
            )}
          </div>
        </div>
      )}
    </button>
  );
};

interface TitleSectionProps {
  open: boolean;
}

const TitleSection: React.FC<TitleSectionProps> = ({ open }) => {
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50">
        <div className="flex items-center gap-3">
          <Logo />
          {open && (
            <div className={`transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-gray-900">
                    Originn
                  </span>
                  <span className="block text-xs text-gray-500">
                    Startup Platform
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {open && (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-blue-600 shadow-sm">
      <div className="text-white font-black text-lg">Og</div>
    </div>
  );
};

interface ToggleCloseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ToggleClose: React.FC<ToggleCloseProps> = ({ open, setOpen }) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-200 transition-colors hover:bg-gray-50 cursor-pointer"
    >
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight
            className={`h-4 w-4 transition-transform duration-300 text-gray-500 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
        {open && (
          <span
            className={`text-sm font-medium text-gray-600 transition-opacity duration-200 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Hide
          </span>
        )}
      </div>
    </button>
  );
};
