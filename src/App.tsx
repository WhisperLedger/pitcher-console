import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { DeployModal } from './components/DeployModal';
import { MissionControl } from './pages/MissionControl';
import { DeploymentsPage } from './pages/DeploymentsPage';
import { TopologyPage } from './pages/TopologyPage';
import { UsagePage } from './pages/UsagePage';
import { SettingsPage } from './pages/SettingsPage';
import { MigrationWizard } from './pages/MigrationWizard';
import { telemetry } from './services/telemetry';

export const App: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [environment, setEnvironment] = useState<'staging' | 'production'>('staging');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const handleEnvironmentChange = (env: 'staging' | 'production') => {
    setEnvironment(env);
    telemetry.setEnvironment(env);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#070b14] text-slate-100 flex selection:bg-blue-600 selection:text-white">
        <Sidebar
          isOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
          <Topbar
            onOpenMobile={() => setIsMobileSidebarOpen(true)}
            environment={environment}
            onEnvironmentChange={handleEnvironmentChange}
            onOpenDeployModal={() => setIsDeployModalOpen(true)}
          />

          <main className="flex-1 pb-16">
            <Routes>
              <Route path="/" element={<MissionControl onOpenDeployModal={() => setIsDeployModalOpen(true)} />} />
              <Route path="/deployments" element={<DeploymentsPage />} />
              <Route path="/topology" element={<TopologyPage />} />
              <Route path="/usage" element={<UsagePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/migration" element={<MigrationWizard />} />
            </Routes>
          </main>
        </div>

        <DeployModal
          isOpen={isDeployModalOpen}
          onClose={() => setIsDeployModalOpen(false)}
          onSuccess={() => {}}
        />
      </div>
    </Router>
  );
};
