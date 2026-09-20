import React from 'react';
import { 
  Server, Globe, Smartphone, Database, CheckCircle2, 
  AlertTriangle, ExternalLink, Activity, Clock
} from 'lucide-react';
import { ServiceStatus } from '../services/mockData';

interface ServiceCardProps {
  service: ServiceStatus;
  onSelect?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'backend':
        return <Server className="w-4 h-4 text-blue-400" />;
      case 'web':
        return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-indigo-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-emerald-400" />;
      default:
        return <Server className="w-4 h-4 text-slate-400" />;
    }
  };

  const isHealthy = service.status === 'healthy';

  return (
    <div 
      onClick={onSelect}
      className="console-card console-card-hover rounded-2xl p-5 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
              {getCategoryIcon(service.category)}
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">{service.name}</h3>
              <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                <span>{service.provider}</span>
                <span>•</span>
                <span className="font-mono">{service.version}</span>
              </div>
            </div>
          </div>

          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            isHealthy 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isHealthy ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className="capitalize">{service.status}</span>
          </div>
        </div>

        {/* Runtime Diagnostics Details */}
        <div className="mt-4 pt-4 border-t border-slate-800/60 grid grid-cols-2 gap-2 text-xs">
          {Object.entries(service.details).slice(0, 4).map(([key, val]) => (
            <div key={key} className="bg-slate-900/60 rounded-lg p-2 border border-slate-800/40">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">{key}</span>
              <span className="font-medium text-slate-200 truncate block mt-0.5">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono">{service.latencyMs}ms</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{service.uptime}</span>
          </span>
        </div>

        <a 
          href={service.endpoint.startsWith('http') ? service.endpoint : '#'}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-slate-400 hover:text-white inline-flex items-center gap-1 text-[11px] font-medium"
        >
          <span>Probe</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
