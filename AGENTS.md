# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

A browser-based password-to-hash converter. Users enter a password or any text and get SHA-1, SHA-256, SHA-384, and SHA-512 hex digests generated client-side via the Web Crypto API. Built with TanStack Start and deployed on Netlify.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Crypto | Web Crypto API (browser-native, no third-party library) |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Calculator.tsx      # Legacy template component (unused)
│   │   └── PasswordHasher.tsx  # Main feature: password → hash UI
│   ├── routes/
│   │   ├── __root.tsx          # Root HTML shell, head metadata
│   │   └── index.tsx           # Home route — renders PasswordHasher
│   ├── router.tsx              # TanStack Router setup
│   └── styles.css              # Tailwind import + base font styles
├── netlify.toml                # Netlify build config
├── vite.config.ts              # Vite + TanStack Start + Tailwind plugins
├── tsconfig.json               # TypeScript strict config, @/* alias
└── package.json
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes live in `src/routes/`:
- `__root.tsx` — root layout wrapping all pages
- `index.tsx` — route for `/`
- `api.*.ts` — server API endpoints

### PasswordHasher Component

`src/components/PasswordHasher.tsx` — the core feature.

- Uses `crypto.subtle.digest()` (Web Crypto API, available in all modern browsers and Netlify Edge).
- State: `password`, `showPassword`, `hashes` (keyed by algorithm), `loading`, `copied`.
- All hashing is async and done sequentially per algorithm inside `handleGenerate`.
- No external crypto library — keeps the bundle small and avoids supply-chain risk.

### Why Web Crypto API?

The Web Crypto API is available natively in all modern browsers and in the Netlify Edge runtime. Using it avoids adding a crypto library dependency while still providing secure, standards-compliant hashing.

### Security Note

SHA hashes alone are unsuitable for storing passwords in a production system. The UI includes a warning directing users toward proper KDFs (bcrypt, Argon2, scrypt). The tool is intended for educational or developer-utility purposes.

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify, Tailwind |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command (`vite build`), publish dir (`dist/client`) |

## Development Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run preview  # Preview production build
```

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Routes: kebab-case files

### Styling
- Tailwind CSS utility classes
- `cn()` helper for conditional class merging when needed
- CSS variables for theme tokens in `styles.css`

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias
- Type-only imports with `type` keyword
