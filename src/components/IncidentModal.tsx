import React from 'react';
import { AlertTriangle, RotateCcw, X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface IncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRollback: () => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({ 
  isOpen, 
  onClose, 
  onRollback 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-lg w-full console-card rounded-2xl p-6 border border-rose-500/40 shadow-2xl relative">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-rose-400">
                Deployment Incident
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Backend Release Needs Attention
              </h3>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-5 space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="font-bold text-slate-300 block mb-1">Target Service & Environment:</span>
            <div className="text-slate-400 flex items-center gap-2">
              <span className="text-white font-medium">WhisperLedger</span>
              <span>•</span>
              <span className="text-blue-400 font-mono">Go REST API Gateway</span>
              <span>•</span>
              <span className="text-amber-400 font-semibold uppercase">Staging</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-slate-200 block uppercase text-[11px] tracking-wider">
              What Happened:
            </span>
            <p className="text-slate-400 leading-relaxed">
              The container was deployed to Render but failed the health probe at <code className="text-cyan-400 bg-slate-900 px-1 py-0.5 rounded font-mono">/healthz</code> within the 30-second startup window.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 text-blue-300 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Zero-Downtime Guarantee:</strong> The previous healthy release (v1.0.1) is still actively serving traffic. Users are unaffected while you triage or rollback.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Inspect Logs
          </button>

          <button
            onClick={() => {
              onRollback();
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/20 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Rollback to Previous Safe Release</span>
          </button>
        </div>
      </div>
    </div>
  );
};
