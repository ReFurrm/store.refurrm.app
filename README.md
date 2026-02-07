# Refurrm Creator Studio (Vite + React + TypeScript)

A Vite-powered React app for the Refurrm Creator Studio experience. This repository contains the client application and UI flows for creator onboarding, storefront, dashboard, and admin tools.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the app:

- Default Vite dev server: http://localhost:5173
- The Vite settings say: “listen on all network addresses” and “use port 8080.” So if you use those settings, the app runs on port 8080 instead of 5173.

## Scripts

- `npm run dev` Start Vite dev server
- `npm run build` Build for production
- `npm run build:dev` Build in development mode
- `npm run preview` Preview the production build locally
- `npm run lint` Run ESLint
- `npm run test` Run Vitest

## Tech Stack

- Vite 7
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Supabase client
- shadcn/ui (Radix UI primitives)

## Project Structure

- `src/` Application source
- `src/pages/` Route-level pages
- `src/components/` Feature components
- `src/components/ui/` UI primitives
- `src/contexts/` App/auth context providers
- `src/lib/` Helpers and API clients
- `public/` Static assets

## Environment Variables

Create a `.env` file in the project root with the following:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If you add additional integrations, document them here.

## Routing

Routes are defined in `src/App.tsx`. Pages should live in `src/pages` and be lazy-loaded into the router.

## Linting & Tests

- Lint before pushing changes:

```bash
npm run lint
```

- Run unit tests (if present):

```bash
npm run test
```

## Build Output

Production builds are written to `dist/`.

## Troubleshooting

- `vite.config.ts` uses `mode` for sourcemaps and terser options.
- If you see errors related to duplicate imports or invalid JSON in `package.json`, verify the file is valid JSON and there are no duplicate dependency entries.

## Contributing

- Keep components small and composable.
- Prefer `@/` alias imports from `src`.
- Avoid introducing secrets into the repo.
