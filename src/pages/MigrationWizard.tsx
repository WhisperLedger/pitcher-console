import React, { useState } from 'react';
import { 
  Cloud, ArrowRight, CheckCircle2, Copy, Check, 
  ShieldCheck, AlertTriangle, ExternalLink, Terminal
} from 'lucide-react';

export const MigrationWizard: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: false,
    3: false,
    4: false,
  });

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const gcloudCommands = [
    `# 1. Build and push container to Google Artifact Registry\ngcloud builds submit --tag gcr.io/pitcher-whisperledger/whisperledger-backend:v1.0.0`,
    `# 2. Deploy to Cloud Run with 0 idle cost (min-instances=0)\ngcloud run deploy whisperledger-backend \\\n  --image gcr.io/pitcher-whisperledger/whisperledger-backend:v1.0.0 \\\n  --platform managed \\\n  --region asia-south1 \\\n  --allow-unauthenticated \\\n  --min-instances 0 \\\n  --max-instances 10 \\\n  --port 10000 \\\n  --set-env-vars APP_ENV=production,DATABASE_URL="YOUR_NEON_DB_URL",JWT_SECRET="YOUR_JWT_SECRET"`,
    `# 3. Test Cloud Run health probe\ncurl -i https://whisperledger-backend-uc.a.run.app/healthz`,
    `# 4. Zero-Downtime DNS Cutover (Cloud DNS)\n# Map api.whisperledger.com CNAME to ghs.googlehosted.com`,
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-2">
            <Cloud className="w-3.5 h-3.5" /> Standout Signature Workflow
          </div>
          <h1 className="text-2xl font-extrabold text-white">Move to GCP Guided Migration Wizard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Zero-code cutover path from Render Free to Google Cloud Run utilizing your $300 GCP credit grant.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Cloud Readiness Score</span>
          <span className="text-emerald-400 font-bold text-base mt-0.5 block">100% Portable (0 Code Edits)</span>
        </div>
      </div>

      {/* Pre-flight Validation Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Port Portability</span>
          </div>
          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
            Go API server binds to <code className="text-white font-mono">0.0.0.0:$PORT</code>, executing identically on Render (10000) and Cloud Run (8080/10000).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Standard PostgreSQL</span>
          </div>
          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
            Standard PostgreSQL SQL syntax with zero proprietary vendor coupling. Seamlessly connects to Neon or Cloud SQL.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Stable Domain Shield</span>
          </div>
          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
            Mobile app talks to custom domain. Switching backend infrastructure requires only a DNS update with zero app updates.
          </p>
        </div>
      </div>

      {/* Step by Step Migration Checklist */}
      <div className="console-card rounded-2xl p-6 border border-slate-800 space-y-6">
        <h3 className="font-bold text-base text-white">Interactive Migration Checklist</h3>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={completedSteps[0]}
                  onChange={() => toggleStep(0)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
                <span className="font-bold text-sm text-white">
                  Step 1: Activate Google Cloud $300 Free Trial & Project
                </span>
              </label>
              <span className="text-xs text-emerald-400 font-semibold">Ready</span>
            </div>
            <p className="text-xs text-slate-400 pl-7">
              Create a project in the Google Cloud Console named <code className="text-white">pitcher-whisperledger</code> and enable Cloud Run & Artifact Registry APIs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={completedSteps[1]}
                  onChange={() => toggleStep(1)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
                <span className="font-bold text-sm text-white">
                  Step 2: Build Container Image to Google Artifact Registry
                </span>
              </label>
              <button
                onClick={() => handleCopy(gcloudCommands[0], 0)}
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-mono"
              >
                {copiedIndex === 0 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 0 ? 'Copied' : 'Copy CLI'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-black text-slate-300 font-mono text-xs overflow-x-auto">
              {gcloudCommands[0]}
            </pre>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={completedSteps[2]}
                  onChange={() => toggleStep(2)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
                <span className="font-bold text-sm text-white">
                  Step 3: Deploy to Cloud Run with Min-Instances = 0
                </span>
              </label>
              <button
                onClick={() => handleCopy(gcloudCommands[1], 1)}
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-mono"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 1 ? 'Copied' : 'Copy CLI'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-black text-slate-300 font-mono text-xs overflow-x-auto">
              {gcloudCommands[1]}
            </pre>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={completedSteps[3]}
                  onChange={() => toggleStep(3)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
                <span className="font-bold text-sm text-white">
                  Step 4: Verify Health Probe & Smoke Tests
                </span>
              </label>
              <button
                onClick={() => handleCopy(gcloudCommands[2], 2)}
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-mono"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 2 ? 'Copied' : 'Copy CLI'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-black text-slate-300 font-mono text-xs overflow-x-auto">
              {gcloudCommands[2]}
            </pre>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={completedSteps[4]}
                  onChange={() => toggleStep(4)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
                <span className="font-bold text-sm text-white">
                  Step 5: Zero-Downtime DNS Cutover
                </span>
              </label>
              <button
                onClick={() => handleCopy(gcloudCommands[3], 3)}
                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-mono"
              >
                {copiedIndex === 3 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 3 ? 'Copied' : 'Copy CLI'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-black text-slate-300 font-mono text-xs overflow-x-auto">
              {gcloudCommands[3]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
