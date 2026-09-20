import React, { useState } from 'react';
import { 
  Server, Globe, Smartphone, Database, ArrowRight, 
  ExternalLink, ShieldCheck, Activity, Cpu, HardDrive
} from 'lucide-react';
import { ServiceStatus } from '../services/mockData';

interface TopologyMapProps {
  services: ServiceStatus[];
}

export const TopologyMap: React.FC<TopologyMapProps> = ({ services }) => {
  const [selectedNode, setSelectedNode] = useState<ServiceStatus>(services[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Topology Canvas */}
      <div className="lg:col-span-8 console-card rounded-2xl p-6 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[440px]">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Live Service Topology</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Interactive map of active connections, edge routing, and data flow.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Network Active</span>
            </div>
          </div>

          {/* Visual Node Graph */}
          <div className="py-12 px-4 flex flex-col md:flex-row items-center justify-between gap-8 relative">
            {/* Column 1: Clients */}
            <div className="flex flex-col gap-6 w-full md:w-56">
              {/* Mobile Node */}
              <div 
                onClick={() => setSelectedNode(services.find(s => s.id === 'mobile-app') || services[0])}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedNode.id === 'mobile-app' 
                    ? 'border-blue-500 bg-blue-950/20 shadow-lg shadow-blue-500/10' 
                    : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Expo Mobile</div>
                    <div className="text-[10px] text-slate-400 font-mono">React Native v1.0.0</div>
                  </div>
                </div>
              </div>

              {/* Web Node */}
              <div 
                onClick={() => setSelectedNode(services.find(s => s.id === 'web-portal') || services[0])}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedNode.id === 'web-portal' 
                    ? 'border-cyan-500 bg-cyan-950/20 shadow-lg shadow-cyan-500/10' 
                    : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Next.js Web</div>
                    <div className="text-[10px] text-slate-400 font-mono">Cloudflare Edge</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Arrows */}
            <div className="hidden md:flex flex-col items-center justify-center gap-12 text-slate-600">
              <ArrowRight className="w-5 h-5 text-blue-400 animate-pulse" />
              <ArrowRight className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>

            {/* Column 2: Go Backend API Gateway */}
            <div className="w-full md:w-64">
              <div 
                onClick={() => setSelectedNode(services.find(s => s.id === 'backend-api') || services[0])}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  selectedNode.id === 'backend-api' 
                    ? 'border-blue-500 bg-blue-950/25 shadow-xl shadow-blue-500/20' 
                    : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase font-bold text-blue-400 tracking-wider">Gateway Hub</div>
                    <div className="text-sm font-extrabold text-white mt-0.5">Go REST API</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">Render Free • Port 10000</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="hidden md:flex items-center justify-center text-slate-600">
              <ArrowRight className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>

            {/* Column 3: PostgreSQL Database */}
            <div className="w-full md:w-56">
              <div 
                onClick={() => setSelectedNode(services.find(s => s.id === 'postgres-db') || services[0])}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedNode.id === 'postgres-db' 
                    ? 'border-emerald-500 bg-emerald-950/20 shadow-lg shadow-emerald-500/10' 
                    : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">PostgreSQL 16</div>
                    <div className="text-[10px] text-slate-400 font-mono">Neon Serverless</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 border-t border-slate-800/80 pt-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Encrypted in transit (TLS 1.3 / SSL pooling)</span>
          </span>
          <span className="text-[11px] text-slate-400">Click any node to inspect runtime</span>
        </div>
      </div>

      {/* Inspector Panel */}
      <div className="lg:col-span-4 console-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h4 className="font-bold text-sm text-white">Node Inspector</h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-400">
              {selectedNode.provider}
            </span>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Service Name</span>
              <div className="text-base font-bold text-white mt-1">{selectedNode.name}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Latency</span>
                <span className="font-mono font-bold text-white text-sm mt-0.5 block">{selectedNode.latencyMs}ms</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Uptime</span>
                <span className="font-mono font-bold text-emerald-400 text-sm mt-0.5 block">{selectedNode.uptime}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-2">
                Configuration Diagnostics
              </span>
              <div className="space-y-2 text-xs">
                {Object.entries(selectedNode.details).map(([k, v]) => (
                  <div key={k} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/60 flex justify-between items-center">
                    <span className="text-slate-400">{k}</span>
                    <span className="font-semibold text-slate-200 font-mono text-[11px]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <a
            href={selectedNode.endpoint.startsWith('http') ? selectedNode.endpoint : '#'}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1.5"
          >
            <span>Open Provider Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
