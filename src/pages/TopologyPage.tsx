import React from 'react';
import { TopologyMap } from '../components/TopologyMap';
import { telemetry } from '../services/telemetry';

export const TopologyPage: React.FC = () => {
  const services = telemetry.getServices();

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-extrabold text-white">Infrastructure Architecture Map</h1>
        <p className="text-xs text-slate-400 mt-1">
          Visual topology of active microservices, clients, network edges, and persistent databases.
        </p>
      </div>

      <TopologyMap services={services} />
    </div>
  );
};
