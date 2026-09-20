import { 
  ServiceStatus, DeploymentRecord, UsageMetric, SecretAuditItem,
  INITIAL_SERVICES, INITIAL_DEPLOYMENTS, INITIAL_USAGE, INITIAL_SECRETS 
} from './mockData';

class TelemetryStore {
  private services: ServiceStatus[] = INITIAL_SERVICES;
  private deployments: DeploymentRecord[] = INITIAL_DEPLOYMENTS;
  private usage: UsageMetric[] = INITIAL_USAGE;
  private secrets: SecretAuditItem[] = INITIAL_SECRETS;
  private environment: 'staging' | 'production' = 'staging';
  private currentProject: string = 'WhisperLedger';

  getEnvironment() {
    return this.environment;
  }

  setEnvironment(env: 'staging' | 'production') {
    this.environment = env;
  }

  getProject() {
    return this.currentProject;
  }

  getServices(): ServiceStatus[] {
    return this.services;
  }

  getDeployments(): DeploymentRecord[] {
    return this.deployments.filter(d => d.environment === this.environment);
  }

  getAllDeployments(): DeploymentRecord[] {
    return this.deployments;
  }

  getUsage(): UsageMetric[] {
    return this.usage;
  }

  getSecrets(): SecretAuditItem[] {
    return this.secrets;
  }

  triggerRollback(deploymentId: string): DeploymentRecord | null {
    const target = this.deployments.find(d => d.id === deploymentId);
    if (!target) return null;

    const rollbackRecord: DeploymentRecord = {
      id: `dep-${Date.now().toString().slice(-4)}`,
      serviceId: target.serviceId,
      serviceName: target.serviceName,
      version: `${target.version}-rollback`,
      commitSha: target.commitSha,
      commitMessage: `Rollback to ${target.commitSha}: ${target.commitMessage}`,
      author: 'Tanmay Agarwal',
      branch: target.branch,
      environment: this.environment,
      status: 'rolled_back',
      durationSeconds: 32,
      timestamp: 'Just now',
      healthCheckStatus: 'passed',
    };

    this.deployments.unshift(rollbackRecord);
    return rollbackRecord;
  }

  triggerDeployment(serviceId: string, version: string, commitMsg: string): DeploymentRecord {
    const service = this.services.find(s => s.id === serviceId);
    const newRecord: DeploymentRecord = {
      id: `dep-${Date.now().toString().slice(-4)}`,
      serviceId,
      serviceName: service ? service.name : 'WhisperLedger Service',
      version,
      commitSha: Math.random().toString(16).substring(2, 9),
      commitMessage: commitMsg,
      author: 'Tanmay Agarwal',
      branch: 'main',
      environment: this.environment,
      status: 'success',
      durationSeconds: Math.floor(25 + Math.random() * 30),
      timestamp: 'Just now',
      healthCheckStatus: 'passed',
    };

    this.deployments.unshift(newRecord);
    return newRecord;
  }

  async checkLiveHealth(): Promise<void> {
    // Attempt local or remote health check pings gracefully
    try {
      const res = await fetch('http://localhost:8080/healthz', { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const backend = this.services.find(s => s.id === 'backend-api');
        if (backend) backend.status = 'healthy';
      }
    } catch {
      // Retain previous verified status
    }
  }
}

export const telemetry = new TelemetryStore();
