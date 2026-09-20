import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Activity, RefreshCw, Send, ShieldAlert, Bot, Sparkles } from 'lucide-react';
import { telemetry } from '../services/telemetry';

interface TopbarProps {
  onOpenMobile: () => void;
  environment: 'staging' | 'production';
  onEnvironmentChange: (env: 'staging' | 'production') => void;
  onOpenDeployModal: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ 
  onOpenMobile, 
  environment, 
  onEnvironmentChange,
  onOpenDeployModal,
}) => {
  return (
    <header className="h-16 px-4 sm:px-8 border-b border-slate-800/80 bg-[#070b14]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="text-slate-200 font-semibold">Pitcher</span>
          <span>/</span>
          <span className="text-slate-200 font-semibold">WhisperLedger</span>
          <span>/</span>
          <span className="text-blue-400 font-mono uppercase">{environment}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Health status badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">3/3 Services Healthy</span>
          <span className="sm:hidden">Healthy</span>
        </div>

        {/* Environment Toggle */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => onEnvironmentChange('staging')}
            className={`px-3 py-1 rounded-lg transition-all ${
              environment === 'staging'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Staging
          </button>
          <button
            onClick={() => {
              if (window.confirm("Switch to Production Environment? Sensitive deployment actions require authorization.")) {
                onEnvironmentChange('production');
              }
            }}
            className={`px-3 py-1 rounded-lg transition-all ${
              environment === 'production'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Production
          </button>
        </div>

        {/* Copilot Quick Launch Button */}
        <Link
          to="/copilot"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 text-xs font-semibold transition-all"
        >
          <Bot className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">MCP Copilot</span>
        </Link>

        {/* Primary Deploy Button */}
        <button
          onClick={onOpenDeployModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Deploy Once</span>
          <span className="sm:hidden">Deploy</span>
        </button>
      </div>
    </header>
  );
};
