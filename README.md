# Password Hash Generator

An interactive web tool that converts any text or password into cryptographic hash digests using the browser's native **Web Crypto API** — no server required.

## Features

- Generates **SHA-1, SHA-256, SHA-384, and SHA-512** hashes simultaneously
- Toggle password visibility
- One-click copy for each hash
- Security notice reminding users of proper password storage practices

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Crypto | Web Crypto API (browser-native) |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

## Building for Production

```bash
npm run build
```

Output is written to `dist/client/`.
