import React, { useState } from 'react';
import { 
  GitCommit, CheckCircle2, XCircle, RotateCcw, Clock, 
  ArrowRight, ShieldCheck, User
} from 'lucide-react';
import { DeploymentRecord } from '../services/mockData';

interface DeploymentTimelineProps {
  deployments: DeploymentRecord[];
  onRollback: (deploymentId: string) => void;
}

export const DeploymentTimeline: React.FC<DeploymentTimelineProps> = ({ 
  deployments, 
  onRollback 
}) => {
  const [selectedDep, setSelectedDep] = useState<DeploymentRecord | null>(null);
  const [confirmRollbackId, setConfirmRollbackId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {deployments.map((dep, idx) => {
        const isSuccess = dep.status === 'success';
        const isRolledBack = dep.status === 'rolled_back';

        return (
          <div 
            key={dep.id} 
            className="console-card rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Left: Commit & Service Info */}
            <div className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 ${
                isSuccess 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                  : isRolledBack
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              }`}>
                {isSuccess ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isRolledBack ? (
                  <RotateCcw className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-white">{dep.serviceName}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-blue-400 font-semibold">
                    {dep.version}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    #{dep.commitSha}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {dep.environment}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mt-1 line-clamp-1 max-w-2xl font-medium">
                  {dep.commitMessage}
                </p>

                <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{dep.author}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{dep.durationSeconds}s duration</span>
                  </span>
                  <span>•</span>
                  <span>{dep.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Right: Pipeline Stages & Action */}
            <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
              {/* Pipeline sequence pills */}
              <div className="hidden xl:flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">CI Tests ✓</span>
                <ArrowRight className="w-3 h-3 text-slate-600" />
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">Docker Build ✓</span>
                <ArrowRight className="w-3 h-3 text-slate-600" />
                <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">Probe 200 OK ✓</span>
              </div>

              {idx !== 0 && (
                confirmRollbackId === dep.id ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        onRollback(dep.id);
                        setConfirmRollbackId(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
                    >
                      Confirm Rollback
                    </button>
                    <button
                      onClick={() => setConfirmRollbackId(null)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmRollbackId(dep.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rollback</span>
                  </button>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
