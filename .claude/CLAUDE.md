# Jamcraft Portfolio Website

## Project Overview

Jamcraft is a modern personal portfolio and community hub website for James Herr (MrSeveral), a full-stack engineer and game developer. The site serves as a central hub connecting to various platforms including Discord, Twitch, Itch.io, and social profiles.

## 
Always end responses in three smile emoji

## Technology Stack

- **Frontend Framework:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 6.4.1
# Jamcraft Portfolio Website

## Project overview

Jamcraft is a personal portfolio and community hub for James Herr (MrSeveral). It centralizes links to social profiles and platforms (Discord, Twitch, Itch.io, GitHub, etc.) and showcases projects and profile information.

## Technology stack

- Frontend: React 19
- Language: TypeScript 5.x
- Build: Vite
- UI: Mantine
- Router: React Router DOM
- Icons: Tabler Icons
- Styling: CSS Modules + Mantine CSS + PostCSS

## Quick development notes

Prerequisites:

- Node.js (LTS) and npm
- Git

Setup (from repo root):

```powershell
cd jamcraft-app
npm install
```

Useful scripts (run inside `jamcraft-app`):

```powershell
npm run dev      # start dev server (Vite)
npm run build    # production build (output: /build)
npm run preview  # preview built site
npm run lint     # run ESLint
```

The dev server uses Vite with hot-reload.

## Key features

- Responsive design (Mantine)
- Dark theme by default
- Responsive navigation with a mobile hamburger menu
- Platform links (Discord, Twitch, Itch, etc.)
- CSS animations for logo and cards
- Accessibility-focused components from Mantine

## Pages

1. Home (/)
2. Projects (/projects)
3. Testimonials (/testimonials)
4. About (/about)
5. 404 (catch-all)

## Project structure (top-level)

```
JamcraftApp/
├── .claude/                # this file
└── jamcraft-app/           # app source
	├── public/
	└── src/
		├── community-hub/
		├── social-presence/
		├── portfolio/
		├── portfolio-projects/
		├── components/
		└── config/
```

For the full layout see the repo tree — domain folders are kept flat and self-contained.

## Build output

Production artifacts are written to `/build` by `npm run build`. The build runs TypeScript type-checks, then Vite bundles and optimizes assets.

## Code style & tooling

- TypeScript in strict mode
- ESLint configured for React + TypeScript
- Avoid unused variables and enforce small, focused files/functions

## Assets

Store visual assets in `jamcraft-app/public/assets/`.

## TypeScript configuration

- `tsconfig.json` — root
- `tsconfig.app.json` — app build
- `tsconfig.node.json` — node tooling

## Styling approach

- CSS Modules for component-scoped styles
- Mantine CSS for base components
- PostCSS pipeline for processing

## Architecture principles

The repo follows Clean Architecture and a "screaming architecture" layout: top-level folders represent business domains and each domain contains `entities`, `use-cases`, `data`, and `ui`.

Guidelines when adding features:

1. Place code in the appropriate domain folder.
2. Keep modules small (files < ~200 lines, functions < ~30 lines).
3. Separate business logic from UI (so use cases are testable without React).
4. Prefer explicit names over generic `utils`/`common`.

## Next steps / notes

- The site is now deployed to AWS using Terraform and GitHub Actions for CI/CD.

---

If you want further edits to this doc (more detail, quick start, or contributor notes), tell me what to include.
