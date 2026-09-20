# Pitcher Console — Deployment & Infrastructure Command Center

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev)

**Your products. One control center.**

Pitcher Console is the unified infrastructure command platform for **Pitcher**, engineered to manage microservices, deployments, cloud environments, and cloud migrations from a single, polished pane of glass. **WhisperLedger** is its launch product.

---

## 🎯 The Three Answers Principle

Users can answer three mission-critical questions immediately upon opening the console:
1. **Is everything healthy?** (Live fleet status, 3/3 services healthy, latency, 0 active incidents).
2. **What changed?** (Commit SHA, author, branch, run duration, deployment diffs).
3. **What action do I need to take?** (Emergency incident cards, health probe timeouts, 1-tap rollback).

---

## 🖥 The 5 Core Screens + Signature Workflows

### 1. Mission Control (Screen 1 · Default Overview)
- High-level health matrix showing connected services (Go API, Web Portal, Expo Mobile, PostgreSQL).
- Active incident detection with zero-downtime safety alerts.
- Live telemetry: 12ms API latency, 99.98% uptime, and ₹0 current spend.

### 2. Deployments & Timeline (Screen 2)
- Continuous pipeline audit trail: `Git Commit` → `CI Tests` → `Build` → `Deploy` → `Health Probe`.
- Filterable by microservice (Backend, Web, Mobile).
- **1-Click Rollback Flow** with confirmation safeguards and audit logging.

### 3. Infrastructure Topology Map (Screen 3)
- Interactive visual architecture graph connecting:
  - `Expo Mobile (Android/iOS)` → `Go Chi API Gateway`
  - `Next.js / Vite Web` → `Go Chi API Gateway`
  - `Go REST API` → `Neon Serverless PostgreSQL 16`
- Inspector Drawer revealing memory, ports, runtime diagnostics, and provider links.

### 4. Usage & Free-Tier Costs (Screen 4)
- Provider quota telemetry tracking:
  - **Render Free**: Instance hours used (184 / 750 hrs).
  - **Neon Serverless**: Compute units (18.2 / 100 CU-hrs) & Storage (42.8 / 512 MB).
  - **Cloudflare Edge**: Daily requests (3,420 / 100,000 reqs/day).
  - **GitHub Actions**: Free runner minutes (135 / 2,000 mins).
- Current Monthly Billed Cost: **₹0.00**.

### 5. Environments & Security Governance (Screen 5)
- Staging versus Production environments.
- **Zero-Leakage Secrets Audit**: Shows configuration presence (`DATABASE_URL`, `JWT_SECRET`, `EXPO_TOKEN`, `CLOUDFLARE_API_TOKEN`) without exposing raw credentials.
- **Branch Protection Audit**: Verifies that direct pushes to `main` are blocked across all repositories.

### 6. Signature Workflow: "Move to GCP" Migration Wizard (Screen 6)
- Pre-flight validation verifying container port portability (`0.0.0.0:$PORT`), SQL dialect compliance, and custom domain routing.
- Step-by-step checklist with copyable `gcloud` CLI deployment commands to utilize your $300 Google Cloud credit grant.

---

## 🎨 Professional Design System

- **Surfaces**: Deep navy (`#070b14` / `#0a0f1d`), neutral cards (`#0d1424`).
- **Typography**: Inter for crisp UI hierarchy, JetBrains Mono for commit hashes and telemetry.
- **Accents**: Restrained blue (`#2563eb`) for primary actions.
- **Operational Semantics**: Color is reserved strictly for operational states:
  - 🟢 **Emerald**: Healthy / Verified
  - 🟡 **Amber**: Warning / Rollback
  - 🔴 **Rose**: Critical / Incident

---

## 🛠 Local Setup & Development

### 1. Prerequisites
- Node.js 20+ or 25+
- npm v10+

### 2. Installation
```bash
cd pitcher-console
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Launches at `http://localhost:4000`.

### 4. Build for Production
```bash
npm run build
```
Compiles an optimized bundle in `dist/` in under 2 seconds.

---

## 🐳 Docker Deployment

```bash
docker build -t pitcher-console .
docker run -p 4000:80 pitcher-console
```
