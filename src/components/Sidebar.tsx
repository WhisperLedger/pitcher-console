import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Rocket, Network, PieChart, 
  Settings, Cloud, ChevronDown, ShieldCheck, Box
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const navItems = [
    { to: '/', label: 'Mission Control', icon: LayoutDashboard },
    { to: '/deployments', label: 'Deployments', icon: Rocket, badge: 'Active' },
    { to: '/topology', label: 'Infrastructure Map', icon: Network },
    { to: '/usage', label: 'Usage & Costs', icon: PieChart, badge: '₹0' },
    { to: '/settings', label: 'Environments & Secrets', icon: Settings },
    { to: '/migration', label: 'Move to GCP Wizard', icon: Cloud, highlight: true },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" 
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0a0f1d] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 text-sm">
                P
              </div>
              <div>
                <div className="font-extrabold text-white text-base tracking-tight leading-none">
                  PITCHER
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-blue-400 mt-0.5">
                  Console v1.0
                </div>
              </div>
            </div>
          </div>

          {/* Project Switcher */}
          <div className="px-4 py-4 border-b border-slate-800/60">
            <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 px-2">
              Active Organization Project
            </label>
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white hover:border-slate-600 cursor-pointer transition-colors group">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Box className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold tracking-wide">WhisperLedger</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onCloseMobile}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all
                    ${isActive 
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                    }
                    ${item.highlight ? 'text-cyan-400 hover:text-cyan-300' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer State */}
        <div className="p-4 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="leading-tight">
              <div className="font-bold text-slate-200">Free Tier Active</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Render · Neon · Cloudflare</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
