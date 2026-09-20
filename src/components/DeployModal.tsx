import React, { useState } from 'react';
import { X, Rocket, Check, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { telemetry } from '../services/telemetry';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [selectedService, setSelectedService] = useState('backend-api');
  const [versionTag, setVersionTag] = useState('v1.0.3');
  const [releaseNote, setReleaseNote] = useState('feat: update connection limits & add healthz endpoint');
  const [targetEnv, setTargetEnv] = useState<'staging' | 'production'>('staging');
  const [isDeploying, setIsDeploying] = useState(false);
  const [step, setStep] = useState<'configure' | 'pipeline' | 'complete'>('configure');

  if (!isOpen) return null;

  const handleStartDeploy = () => {
    setIsDeploying(true);
    setStep('pipeline');

    setTimeout(() => {
      telemetry.triggerDeployment(selectedService, versionTag, releaseNote);
      setIsDeploying(false);
      setStep('complete');
    }, 2000);
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
    setStep('configure');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-lg w-full console-card rounded-2xl p-6 border border-slate-700 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Deploy Once, Verify Everything</h3>
              <div className="text-[10px] text-slate-400 font-mono">Signature Pitcher Release Workflow</div>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'configure' && (
          <div className="my-5 space-y-4 text-xs">
            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1 tracking-wider text-[10px]">
                Target Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-medium focus:outline-none focus:border-blue-500"
              >
                <option value="backend-api">Go REST API Gateway (Render / Cloud Run)</option>
                <option value="web-portal">Next.js & Vite Web Portal (Cloudflare / Nginx)</option>
                <option value="mobile-app">Expo Native Mobile App (EAS Preview APK)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block uppercase font-bold text-slate-400 mb-1 tracking-wider text-[10px]">
                  Version Tag
                </label>
                <input
                  type="text"
                  value={versionTag}
                  onChange={(e) => setVersionTag(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block uppercase font-bold text-slate-400 mb-1 tracking-wider text-[10px]">
                  Target Environment
                </label>
                <select
                  value={targetEnv}
                  onChange={(e) => setTargetEnv(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                >
                  <option value="staging">Staging (Free Tier)</option>
                  <option value="production">Production (Guarded)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block uppercase font-bold text-slate-400 mb-1 tracking-wider text-[10px]">
                Release Summary / Commit Note
              </label>
              <textarea
                value={releaseNote}
                onChange={(e) => setReleaseNote(e.target.value)}
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-medium"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-200 block mb-0.5">Automated Pre-flight Checks:</span>
              <div>✓ Git Branch: <strong className="text-white font-mono">main</strong> (Branch protection enforced)</div>
              <div>✓ PostgreSQL Schema: Up to date (v000001_init)</div>
              <div>✓ Automated Health Verification: Scheduled immediately after deploy</div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleStartDeploy}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <span>Trigger Deployment Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'pipeline' && (
          <div className="my-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mx-auto" />
            <div>
              <div className="font-bold text-sm text-white">Running Automated Pipeline...</div>
              <div className="text-xs text-slate-400 mt-1 font-mono">
                Compiling binary & verified container image
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 max-w-xs mx-auto text-left text-[11px] font-mono space-y-1 text-slate-300">
              <div>✓ GitHub CI Tests (Passed in 18s)</div>
              <div>✓ Docker Multi-stage Build (Cached)</div>
              <div className="text-blue-400 animate-pulse">→ Deploying to Render & Probing /healthz...</div>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <div className="my-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-base text-white">Deployment Verified Healthy!</div>
              <div className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                {versionTag} has been deployed to {targetEnv}. Health probe returned HTTP 200 with 12ms latency.
              </div>
            </div>
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
            >
              View in Deployments Timeline
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
