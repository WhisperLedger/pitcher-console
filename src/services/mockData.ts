export interface ServiceStatus {
  id: string;
  name: string;
  category: 'backend' | 'web' | 'mobile' | 'database';
  provider: string;
  status: 'healthy' | 'warning' | 'critical' | 'deploying';
  version: string;
  latencyMs: number;
  uptime: string;
  endpoint: string;
  lastDeployed: string;
  details: Record<string, string>;
}

export interface DeploymentRecord {
  id: string;
  serviceId: string;
  serviceName: string;
  version: string;
  commitSha: string;
  commitMessage: string;
  author: string;
  branch: string;
  environment: 'staging' | 'production';
  status: 'success' | 'failed' | 'in_progress' | 'rolled_back';
  durationSeconds: number;
  timestamp: string;
  healthCheckStatus: 'passed' | 'failed' | 'pending';
}

export interface UsageMetric {
  provider: string;
  service: string;
  resource: string;
  used: number;
  limit: number;
  unit: string;
  percentage: number;
  isFreeTier: boolean;
}

export interface SecretAuditItem {
  key: string;
  scope: 'backend' | 'web' | 'mobile';
  status: 'configured' | 'missing' | 'expired';
  lastUpdated: string;
}

export const INITIAL_SERVICES: ServiceStatus[] = [
  {
    id: 'backend-api',
    name: 'Go REST API Gateway',
    category: 'backend',
    provider: 'Render Free',
    status: 'healthy',
    version: 'v1.0.0 (Go 1.24)',
    latencyMs: 12,
    uptime: '99.98%',
    endpoint: 'https://whisperledger-api.onrender.com/healthz',
    lastDeployed: '12 mins ago',
    details: {
      'Runtime': 'Golang 1.24 + Chi v5',
      'Port': '10000 (0.0.0.0 binding)',
      'Health Probe': 'HTTP 200 OK (/healthz)',
      'Memory': '68 MB / 512 MB',
    },
  },
  {
    id: 'web-portal',
    name: 'Next.js & Vite Web Console',
    category: 'web',
    provider: 'Cloudflare / Nginx',
    status: 'healthy',
    version: 'v1.0.0',
    latencyMs: 18,
    uptime: '100%',
    endpoint: 'https://whisperledger-web.pages.dev',
    lastDeployed: '18 mins ago',
    details: {
      'Architecture': 'React 18 + Vite + Tailwind',
      'Routing': 'Client SPA + Admin Portal',
      'Edge Cache': 'Global Edge Active',
      'Build Target': 'Static / OpenNext container',
    },
  },
  {
    id: 'mobile-app',
    name: 'Expo Native Mobile App',
    category: 'mobile',
    provider: 'Expo EAS Build',
    status: 'healthy',
    version: 'v1.0.0 (Build 1)',
    latencyMs: 0,
    uptime: '100%',
    endpoint: 'android/outputs/apk/app-release.apk',
    lastDeployed: '2 hours ago',
    details: {
      'Framework': 'React Native 0.74 (Expo 51)',
      'Native SMS': 'Kotlin BroadcastReceiver Hook',
      'Biometrics': 'Hardware Keystore Locked',
      'Artifact Size': '79.7 MB APK (Standalone)',
    },
  },
  {
    id: 'postgres-db',
    name: 'Serverless PostgreSQL Node',
    category: 'database',
    provider: 'Neon Serverless',
    status: 'healthy',
    version: 'PostgreSQL 16',
    latencyMs: 8,
    uptime: '99.99%',
    endpoint: 'ep-cool-fog-123456-pooler.neon.tech',
    lastDeployed: '2 hours ago',
    details: {
      'Schema Version': '000001_init (Up-to-date)',
      'Connection Pool': 'pgxpool (Max 10, Min 2)',
      'Compute Units': '18.2 / 100 CU-hrs used',
      'Storage Consumed': '42.8 MB / 512 MB',
    },
  },
];

export const INITIAL_DEPLOYMENTS: DeploymentRecord[] = [
  {
    id: 'dep-105',
    serviceId: 'backend-api',
    serviceName: 'Go REST API Gateway',
    version: 'v1.0.2',
    commitSha: '8a83110',
    commitMessage: 'feat(backend): complete Golang hexagonal architecture & deployment blueprint',
    author: 'Tanmay Agarwal',
    branch: 'main',
    environment: 'staging',
    status: 'success',
    durationSeconds: 42,
    timestamp: '12 mins ago',
    healthCheckStatus: 'passed',
  },
  {
    id: 'dep-104',
    serviceId: 'web-portal',
    serviceName: 'Next.js & Vite Web Console',
    version: 'v1.0.1',
    commitSha: '229a85d',
    commitMessage: 'feat(web): unified marketing landing page, executive admin console & deployment blueprint',
    author: 'Tanmay Agarwal',
    branch: 'main',
    environment: 'staging',
    status: 'success',
    durationSeconds: 28,
    timestamp: '18 mins ago',
    healthCheckStatus: 'passed',
  },
  {
    id: 'dep-103',
    serviceId: 'mobile-app',
    serviceName: 'Expo Native Mobile App',
    version: 'v1.0.0',
    commitSha: '81d57a9',
    commitMessage: 'feat(mobile): integrate Go backend API client, blueprint deployment & release apk v1.0.0',
    author: 'Tanmay Agarwal',
    branch: 'main',
    environment: 'staging',
    status: 'success',
    durationSeconds: 145,
    timestamp: '2 hours ago',
    healthCheckStatus: 'passed',
  },
  {
    id: 'dep-102',
    serviceId: 'backend-api',
    serviceName: 'Go REST API Gateway',
    version: 'v0.9.8',
    commitSha: 'd4e5f67',
    commitMessage: 'fix(db): adjust connection pool idle timeouts for serverless Neon latency',
    author: 'Tanmay Agarwal',
    branch: 'main',
    environment: 'staging',
    status: 'success',
    durationSeconds: 38,
    timestamp: '4 hours ago',
    healthCheckStatus: 'passed',
  },
];

export const INITIAL_USAGE: UsageMetric[] = [
  {
    provider: 'Render Free',
    service: 'Go REST API',
    resource: 'Web Instance Hours',
    used: 184,
    limit: 750,
    unit: 'hours/mo',
    percentage: 24.5,
    isFreeTier: true,
  },
  {
    provider: 'Neon Free',
    service: 'PostgreSQL DB',
    resource: 'Compute Unit Hours',
    used: 18.2,
    limit: 100,
    unit: 'CU-hrs/mo',
    percentage: 18.2,
    isFreeTier: true,
  },
  {
    provider: 'Neon Free',
    service: 'PostgreSQL DB',
    resource: 'Database Storage',
    used: 42.8,
    limit: 512,
    unit: 'MB',
    percentage: 8.4,
    isFreeTier: true,
  },
  {
    provider: 'Cloudflare',
    service: 'Web Pages / Edge',
    resource: 'Daily Edge Requests',
    used: 3420,
    limit: 100000,
    unit: 'reqs/day',
    percentage: 3.4,
    isFreeTier: true,
  },
  {
    provider: 'GitHub Actions',
    service: 'CI/CD Pipelines',
    resource: 'Automated Runner Minutes',
    used: 135,
    limit: 2000,
    unit: 'mins/mo',
    percentage: 6.8,
    isFreeTier: true,
  },
];

export const INITIAL_SECRETS: SecretAuditItem[] = [
  { key: 'DATABASE_URL', scope: 'backend', status: 'configured', lastUpdated: 'Today' },
  { key: 'JWT_SECRET', scope: 'backend', status: 'configured', lastUpdated: 'Today' },
  { key: 'CORS_ORIGINS', scope: 'backend', status: 'configured', lastUpdated: 'Today' },
  { key: 'CLOUDFLARE_API_TOKEN', scope: 'web', status: 'configured', lastUpdated: 'Today' },
  { key: 'EXPO_TOKEN', scope: 'mobile', status: 'configured', lastUpdated: 'Today' },
  { key: 'NEXT_PUBLIC_API_URL', scope: 'web', status: 'configured', lastUpdated: 'Today' },
];
