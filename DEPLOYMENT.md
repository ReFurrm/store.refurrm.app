# Deployment Guide

This app is a static Vite build. You can deploy it to any static host or CDN. Common targets include Vercel, Netlify, Cloudflare Pages, and S3 + CloudFront.

## Prerequisites

- Node.js 18+ recommended
- Environment variables configured for your hosting platform

## Environment Variables

Set these in your host or CI environment:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If you add other integrations (analytics, payments, etc.), document their variables here.

## Build Command

```bash
npm install
npm run build
```

The output is in `dist/`.

## Local Production Preview

```bash
npm run preview
```

## Static Hosting

### Vercel

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Add environment variables in Project Settings

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Add environment variables in Site Settings

### Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`

### S3 + CloudFront

- Build locally and upload `dist/` to your bucket
- Configure CloudFront to serve `index.html`

## SPA Routing (Important)

This is a single-page app. Configure your host to rewrite all routes to `/index.html`.

- Vercel: handled automatically
- Netlify: add `_redirects` with `/* /index.html 200`
- Cloudflare Pages: configure SPA fallback
- S3/CloudFront: set error document to `index.html`

## Post-Deploy Checks

- Load `/` and core routes (`/login`, `/signup`, `/dashboard`)
- Verify Supabase auth flows
- Confirm protected routes redirect correctly

## CI Example (GitHub Actions)

```yaml
name: build
on:
  push:
    branches: [ main ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
```

