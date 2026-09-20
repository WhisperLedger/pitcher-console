import React from 'react';
import { PieChart, ShieldCheck, AlertCircle, HardDrive, Cpu, Cloud, Zap } from 'lucide-react';
import { telemetry } from '../services/telemetry';

export const UsagePage: React.FC = () => {
  const usage = telemetry.getUsage();

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Usage & Free-Tier Cost Telemetry</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time tracking against verified provider limits to ensure 100% zero-cost operation.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm">
          <span>Current Spend: ₹0.00</span>
        </div>
      </div>

      {/* Quota Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {usage.map((m) => (
          <div key={m.resource} className="console-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400">{m.provider}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                  Free Tier
                </span>
              </div>

              <h3 className="font-bold text-sm text-white mt-2">{m.resource}</h3>
              <div className="text-xs text-slate-400 font-medium">{m.service}</div>

              <div className="mt-4 flex items-baseline justify-between text-xs">
                <span className="font-bold text-lg text-white font-mono">{m.used}</span>
                <span className="text-slate-400 font-mono">/ {m.limit} {m.unit}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-900 rounded-full h-2 mt-2 overflow-hidden border border-slate-800">
                <div 
                  className={`h-full rounded-full ${
                    m.percentage > 80 
                      ? 'bg-rose-500' 
                      : m.percentage > 50 
                      ? 'bg-amber-500' 
                      : 'bg-blue-600'
                  }`}
                  style={{ width: `${m.percentage}%` }}
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{m.percentage}% consumed</span>
              <span className="text-emerald-400">Safe margin</span>
            </div>
          </div>
        ))}
      </div>

      {/* Budget & Threshold Advisory */}
      <div className="console-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-white">Free-Tier Cost Advisory & Safeguards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-bold text-white block">Render Web Services</span>
            <p className="text-slate-400 leading-relaxed">
              Provides 750 free instance-hours per month. WhisperLedger Go API spins down after 15 minutes of inactivity and restarts in &lt;1.5s on incoming traffic.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="font-bold text-white block">Neon Serverless PostgreSQL</span>
            <p className="text-slate-400 leading-relaxed">
              Includes 100 Compute Unit hours and 0.5 GB storage. The Go backend's connection pool is capped at 10 max connections to stay well within resource limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
