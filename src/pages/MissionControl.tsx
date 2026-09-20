import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, RefreshCw, Activity, ArrowUpRight, 
  Rocket, Server, Globe, Smartphone, Database, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { ServiceCard } from '../components/ServiceCard';
import { IncidentModal } from '../components/IncidentModal';
import { telemetry } from '../services/telemetry';

interface MissionControlProps {
  onOpenDeployModal: () => void;
}

export const MissionControl: React.FC<MissionControlProps> = ({ onOpenDeployModal }) => {
  const services = telemetry.getServices();
  const deployments = telemetry.getDeployments().slice(0, 3);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [simulatedIncidentActive, setSimulatedIncidentActive] = useState(false);

  const handleRollback = () => {
    telemetry.triggerRollback(deployments[0]?.id || 'dep-105');
    setSimulatedIncidentActive(false);
  };

  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Hero Status Banner */}
      <div className="console-card rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              WhisperLedger Fleet Health
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              All 3 connected microservices and PostgreSQL storage nodes are actively reporting healthy status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setSimulatedIncidentActive(true);
                setShowIncidentModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Failed Release</span>
            </button>

            <button
              onClick={onOpenDeployModal}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Deploy Once</span>
            </button>
          </div>
        </div>

        {/* 3 Core KPI Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Connected Services</span>
            <div className="text-2xl font-extrabold text-white mt-1">3/3 Healthy</div>
            <div className="text-[11px] text-emerald-400 mt-1">Backend · Web · Mobile</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Incidents</span>
            <div className="text-2xl font-extrabold text-slate-200 mt-1">
              {simulatedIncidentActive ? '1 Action Needed' : '0 Incidents'}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {simulatedIncidentActive ? 'Backend probe timeout' : 'Zero outages in past 30 days'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Monthly Cost</span>
            <div className="text-2xl font-extrabold text-white mt-1">₹0</div>
            <div className="text-[11px] text-blue-400 mt-1">100% within free allowances</div>
          </div>
        </div>
      </div>

      {/* Simulated incident alert banner */}
      {simulatedIncidentActive && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-rose-300">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <strong className="text-white block">Incident Detected:</strong>
              Backend release v1.0.2 timed out on health probe. Traffic automatically retained on previous safe version.
            </div>
          </div>
          <button
            onClick={() => setShowIncidentModal(true)}
            className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shrink-0"
          >
            Review & Rollback
          </button>
        </div>
      )}

      {/* Services Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Active Infrastructure Nodes
          </h2>
          <span className="text-xs text-slate-400">Updated 10s ago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Recent Deployments Preview */}
      <section className="console-card rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-sm text-white">Recent Releases</h3>
            <p className="text-xs text-slate-400 mt-0.5">Continuous verification through GitHub Actions.</p>
          </div>
          <a href="/deployments" className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold">
            <span>View All Deployments</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="divide-y divide-slate-800/60 mt-2">
          {deployments.map((dep) => (
            <div key={dep.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{dep.serviceName}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-400">
                      {dep.version}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] line-clamp-1 mt-0.5 max-w-md">
                    {dep.commitMessage}
                  </div>
                </div>
              </div>

              <div className="text-right text-slate-400 text-[11px] shrink-0 font-mono">
                <div>{dep.timestamp}</div>
                <div className="text-emerald-400">Health Verified</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <IncidentModal
        isOpen={showIncidentModal}
        onClose={() => setShowIncidentModal(false)}
        onRollback={handleRollback}
      />
    </div>
  );
};
