import React, { useState } from 'react';
import { Rocket, Filter, Search, RefreshCw, Plus } from 'lucide-react';
import { DeploymentTimeline } from '../components/DeploymentTimeline';
import { DeployModal } from '../components/DeployModal';
import { telemetry } from '../services/telemetry';

export const DeploymentsPage: React.FC = () => {
  const [filterService, setFilterService] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deployments, setDeployments] = useState(telemetry.getDeployments());
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const handleRollback = (id: string) => {
    telemetry.triggerRollback(id);
    setDeployments([...telemetry.getDeployments()]);
  };

  const handleDeploySuccess = () => {
    setDeployments([...telemetry.getDeployments()]);
  };

  const filtered = deployments.filter((d) => {
    const matchesService = filterService === 'all' || d.serviceId === filterService;
    const matchesSearch = 
      d.commitMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.commitSha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.version.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesService && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Deployments & Release Pipeline</h1>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end audit trail: Git commit → CI automated tests → Build artifact → Deploy → Health verification.
          </p>
        </div>

        <button
          onClick={() => setIsDeployModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Deployment</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'backend-api', label: 'Go Backend' },
            { id: 'web-portal', label: 'Web Portal' },
            { id: 'mobile-app', label: 'Expo Mobile' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterService(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterService === tab.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search commits, SHAs, versions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Timeline List */}
      <DeploymentTimeline 
        deployments={filtered} 
        onRollback={handleRollback} 
      />

      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onSuccess={handleDeploySuccess}
      />
    </div>
  );
};
