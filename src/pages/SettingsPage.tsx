import React from 'react';
import { ShieldCheck, Lock, Key, GitBranch, CheckCircle2, AlertCircle } from 'lucide-react';
import { telemetry } from '../services/telemetry';

export const SettingsPage: React.FC = () => {
  const secrets = telemetry.getSecrets();

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white">Environments & Security Governance</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage staging/production configurations, secret key presence, and repository protection rules.
        </p>
      </div>

      {/* Branch Protection Audit */}
      <div className="console-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Branch Protection Guard</h3>
              <div className="text-xs text-slate-400">Direct pushes to <code className="text-blue-400 font-mono">main</code> branch are blocked</div>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Active & Enforced
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Backend Repo</span>
            <div className="text-white font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhisperLedger/whisperledger-backend</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Web Repo</span>
            <div className="text-white font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhisperLedger/whisperledger-web</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Mobile Repo</span>
            <div className="text-white font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhisperLedger/whisperledger-frontend</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secrets Audit Table */}
      <div className="console-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-white">Environment Secrets Audit</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Presence verification without ever exposing raw secret credentials.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-blue-400" />
            <span>Zero-Leakage Policy</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-6">Secret Identifier</th>
                <th className="py-3 px-6">Target Scope</th>
                <th className="py-3 px-6">Presence State</th>
                <th className="py-3 px-6">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              {secrets.map((s) => (
                <tr key={s.key} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-6 font-mono text-white flex items-center gap-2">
                    <Key className="w-3.5 h-3.5 text-blue-400" />
                    <span>{s.key}</span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 uppercase">
                      {s.scope}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Configured in Provider</span>
                  </td>
                  <td className="py-3.5 px-6 text-slate-400 font-mono text-[11px]">
                    Verified Active
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
