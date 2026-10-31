# RAJ

Monorepo starter for RAJ's industrial manufacturing and hardware supply website. Phase 1 establishes the application foundations only; product data, quotation workflows, admin authentication, and database models are not implemented.

## Requirements

- Node.js 20.19 or newer
- pnpm 12.11.2 (or Corepack: `corepack enable`)
- PostgreSQL is only needed when database work is introduced in a later phase

## Setup

```bash
pnpm install
Copy-Item apps/web/.env.example apps/web/.env.local
Copy-Item apps/api/.env.example apps/api/.env
pnpm dev
```

The web app runs at http://localhost:3000 and the API at http://localhost:4000. The API health endpoint is http://localhost:4000/health. Environment files are local and ignored by Git; `.env.example` files contain placeholders only.

On macOS or Linux, replace the `Copy-Item` commands with `cp`.

## Workspace commands

- `pnpm dev` builds the shared package and starts the web app and API together.
- `pnpm dev:web` starts only the web app.
- `pnpm dev:api` starts only the API.
- `pnpm lint` runs ESLint in each workspace package.
- `pnpm typecheck` runs TypeScript checks in dependency order.
- `pnpm build` builds all workspace packages in dependency order.
- `pnpm clean` removes generated build output.

## PostgreSQL and Prisma

The API environment template includes a local example `DATABASE_URL`, but Phase 1 does not connect to a database. Reserved Prisma schema and migration directories are under `apps/api/prisma/`. A local PostgreSQL instance and actual credentials will be required when schema and migration work is approved. Do not put database credentials in frontend environment variables.

## Structure

```text
apps/
  api/       NestJS API
  web/       Next.js App Router frontend
packages/
  shared/    Shared TypeScript contracts
```