# Jamcraft Portfolio Website

## Project Overview

Jamcraft is a modern single-page portfolio website for James Herr (MrSeveral), a full-stack engineer and game developer. The site is one scrolling page that showcases his profile, projects (including game jam submissions), podcast guest appearances, workshops, and speaking engagements, with social links in the hero and footer.

## Claude Instructions

- Always end responses in three smile emoji
- Always write tests for new code
- Always ensure CLAUDE.md is up to date

## Technology Stack

- **Frontend:** React 19.0.0
- **Language:** TypeScript 5.7.2
- **Build Tool:** Vite 6.4.1
- **UI Library:** Mantine 7.16.3 (`@mantine/core` + `@mantine/hooks`)
- **Icons:** Tabler Icons 3.30.0
- **Testing:** Vitest 4.0.7 + React Testing Library 16.3.0
- **Styling:** CSS Modules + Mantine CSS + PostCSS
- **Hosting/CI/CD:** AWS Amplify (`amplify.yml`: npm ci → test → build → deploy `build/`)
- **Legacy Infrastructure:** Terraform configs for S3/CloudFront/Route53/ACM exist in `terraform/` but Amplify is the live pipeline

There is no client-side router — navigation is in-page hash anchors (`#home`, `#projects`, `#podcasts`, `#workshops`, `#speaking`, `#contact`) with smooth scrolling and a scroll-spy header.

## Quick Development Guide

### Prerequisites

- Node.js 20+ (LTS) and npm
- Git

### Setup

```powershell
cd jamcraft-app
npm install
```

### Available Scripts

```powershell
npm run dev              # Start dev server (Vite with hot-reload)
npm run build            # Production build (TypeScript + Vite)
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm test                 # Run tests in watch mode
npm run test:ui          # Open Vitest UI in browser
npm run test:coverage    # Generate coverage report
```

## Key Features

- **Single-Page Layout:** One scrolling page with anchor navigation and scroll-spy
- **Responsive Design:** Mobile-first with Mantine components
- **Dark Theme:** Pure black (`#000000`) background with a muted steel-blue (`#8aa9c7`) accent; Mantine theme wired to design tokens (`src/theme/mantine-theme.ts`, `autoContrast` enabled)
- **Minimalist Cards:** Compact cards (72px thumbnail + title + one line via `components/ui/CompactCard.tsx`) laid out in responsive 2-column grids (1 column on mobile)
- **Accessibility:** Reduced motion support, ARIA labels, focus management
- **Security:** URL validation, XSS prevention (blocks javascript: protocol), noopener/noreferrer on external links
- **Testing:** Comprehensive test coverage (86 tests, 16 test files)
- **CI/CD:** Automated testing and deployment via AWS Amplify

## Page Sections

The app is a single page composed of sections (registered in `src/config/sections.ts`):

1. **Home / Hero** (`#home`) — Full-height hero with profile, bio, social links, CTA (owned by `portfolio/`)
2. **Projects** (`#projects`) — Portfolio projects (with NSFW blur/reveal) + game jam submissions sub-group (owned by `portfolio-projects/`)
3. **Podcasts** (`#podcasts`) — Podcast guest appearances as cards linking out (owned by `podcasts/`)
4. **Workshops** (`#workshops`) — Workshops run/co-run by James as cards linking out (owned by `workshops/`)
5. **Speaking** (`#speaking`) — Conference talks and panel appearances as cards linking out (owned by `speaking/`)
6. **Contact** (`#contact`) — Footer with social links (in `components/layout/Footer.tsx`)

Legacy multi-page URLs (`/projects`, `/about`, `/testimonials`) are redirected on load to section anchors by `resolveLegacyPath` in `src/config/sections.ts`.

## Project Structure (Screaming Architecture)

```
JamcraftApp/
├── amplify.yml                 # CI/CD: test → build → deploy (AWS Amplify)
├── .claude/
│   └── CLAUDE.md               # This file
├── terraform/                  # Legacy IaC (not the live pipeline)
└── jamcraft-app/               # Application source
    ├── public/assets/          # Static assets (images, logos, podcast artwork)
    ├── src/
    │   ├── portfolio/          # DOMAIN: Profile & hero
    │   │   ├── entities/Profile.ts
    │   │   ├── use-cases/GetProfile.ts
    │   │   ├── data/profile-data.ts
    │   │   ├── ui/...          # ProfileImage, ProfileHeader, ProfileBio
    │   │   └── HeroSection.tsx             # #home section
    │   │
    │   ├── portfolio-projects/ # DOMAIN: Project showcase
    │   │   ├── entities/PortfolioProject.ts
    │   │   ├── use-cases/GetPortfolioProjects.ts
    │   │   ├── data/portfolio-projects-data.ts
    │   │   ├── ui/...          # PortfolioProjectCard (NSFW blur/reveal)
    │   │   └── ProjectsSection.tsx         # #projects section
    │   │
    │   ├── game-jam-submissions/ # DOMAIN: Game jam entries (rendered in ProjectsSection)
    │   │   ├── entities/GameJamSubmission.ts
    │   │   ├── use-cases/GetGameJamSubmissions.ts (+ test)
    │   │   ├── data/game-jam-submissions-data.ts
    │   │   └── ui/...          # GameJamCard
    │   │
    │   ├── podcasts/           # DOMAIN: Podcast guest appearances
    │   │   ├── entities/PodcastEpisode.ts
    │   │   ├── use-cases/GetPodcastEpisodes.ts (+ test)
    │   │   ├── data/podcast-episodes-data.ts
    │   │   ├── ui/components/PodcastEpisodeCard.tsx (+ test)
    │   │   ├── ui/hooks/usePodcastEpisodes.ts
    │   │   └── PodcastsSection.tsx         # #podcasts section
    │   │
    │   ├── workshops/          # DOMAIN: Workshops
    │   │   ├── entities/Workshop.ts
    │   │   ├── use-cases/GetWorkshops.ts (+ test)
    │   │   ├── data/workshops-data.ts
    │   │   ├── ui/components/WorkshopCard.tsx (+ test)
    │   │   ├── ui/hooks/useWorkshops.ts
    │   │   └── WorkshopsSection.tsx        # #workshops section
    │   │
    │   ├── speaking/            # DOMAIN: Conference talks & panel appearances
    │   │   ├── entities/SpeakingEngagement.ts
    │   │   ├── use-cases/GetSpeakingEngagements.ts (+ test)
    │   │   ├── data/speaking-engagements-data.ts
    │   │   ├── ui/components/SpeakingEngagementCard.tsx (+ test)
    │   │   ├── ui/hooks/useSpeakingEngagements.ts
    │   │   └── SpeakingSection.tsx          # #speaking section
    │   │
    │   ├── social-presence/    # DOMAIN: Social media integration
    │   │   ├── entities/SocialLink.ts
    │   │   ├── use-cases/NavigateToExternalLink.ts (+ test)
    │   │   ├── services/BrowserNavigationService.ts (+ test)
    │   │   ├── data/social-links-data.ts
    │   │   └── ui/...          # SocialLinkIcon
    │   │
    │   ├── components/         # Shared UI infrastructure
    │   │   ├── layout/         # Header (scroll-spy nav), NavAnchor, Footer
    │   │   ├── ui/             # Card, CompactCard (+ test), PageHeader, Section, LoadingSpinner, FocusRing
    │   │   └── ErrorBoundary.tsx (+ test)
    │   │
    │   ├── hooks/              # Shared custom hooks
    │   │   ├── useReducedMotion.ts (+ test)
    │   │   └── useActiveSection.ts (+ test)   # scroll-position scroll-spy
    │   │
    │   ├── theme/              # Design tokens + mantine-theme.ts (Mantine theme object)
    │   ├── config/             # sections.ts (section registry + legacy redirects), routes.ts (EXTERNAL_LINKS)
    │   │
    │   ├── test/               # Test infrastructure
    │   │   ├── setup.ts        # Vitest setup (mocks, global config)
    │   │   └── helpers/test-utils.tsx  # Custom render with MantineProvider
    │   │
    │   ├── App.tsx             # Root: providers, AppShell, section composition, legacy redirect
    │   ├── App.css             # Global styles, keyframes, reduced-motion overrides
    │   └── main.tsx            # Entry point
    │
    ├── vitest.config.ts        # Test configuration (happy-dom)
    ├── vite.config.ts          # Build configuration (output: build/)
    ├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
    └── package.json
```

### Domain Structure Pattern

Each domain follows this structure:

```
domain-name/
├── entities/           # Pure TypeScript interfaces (business models)
├── use-cases/          # Business logic classes (framework-agnostic)
│   └── *.test.ts       # Co-located unit tests
├── services/           # External service adapters (with interfaces)
├── data/               # Data sources (static data, API clients)
├── ui/
│   ├── components/     # React components for this domain
│   └── hooks/          # React hooks for this domain
└── DomainSection.tsx   # Top-level section component (if applicable)
```

## Architecture: Clean Architecture Principles

### The Dependency Rule

**Inner layers NEVER depend on outer layers**

```
UI (React) → Use Cases → Entities
  ↓              ↓          ↓
Components   Business   Interfaces
  ↓            Logic        ↓
Hooks           ↓       Pure TS
                ↓
            Services
```

### Key Principles

- **Framework Independence:** Business logic has NO React imports
- **Testability:** Use cases can be unit tested without React
- **Screaming Architecture:** Folder names describe what the app DOES
- **Separation of Concerns:** Business logic separate from presentation

## Testing Strategy

### Coverage Targets

- **Use Cases:** 100% (pure business logic)
- **Services:** 100% (security-critical)
- **Hooks:** 95%+ (React integration)
- **Components:** 70-85% (complex UI logic)
- **Overall:** 80%+

### Current Test Suite

**86 tests across 16 files:**

1. **sections.test.ts** (9 tests) — Section registry + legacy path redirects
2. **useActiveSection.test.ts** (7 tests) — Scroll-spy (reading line + page-bottom edge cases)
3. **GetPodcastEpisodes.test.ts** (7 tests) — Podcast use-case + seed data integrity
4. **PodcastEpisodeCard.test.tsx** (5 tests) — Rendering + external link security
5. **Header.test.tsx** (3 tests) — Anchor nav, logo, burger accessibility
6. **NavigateToExternalLink.test.ts** (5 tests) — URL validation, XSS prevention
7. **BrowserNavigationService.test.ts** (4 tests) — Security (noopener, noreferrer)
8. **GetGameJamSubmissions.test.ts** (5 tests) — Business logic filtering/sorting
9. **ErrorBoundary.test.tsx** (5 tests) — Error catching and recovery
10. **useReducedMotion.test.ts** (5 tests) — Accessibility (media queries)
11. **CompactCard.test.tsx** (6 tests) — Shared compact card: layout slots + link security
12. **PortfolioProjectCard.test.tsx** (4 tests) — Rendering + NSFW blur/reveal/click-through
13. **GetWorkshops.test.ts** (7 tests) — Workshop use-case + seed data integrity
14. **WorkshopCard.test.tsx** (4 tests) — Rendering + external link security
15. **GetSpeakingEngagements.test.ts** (7 tests) — Speaking use-case + seed data integrity
16. **SpeakingEngagementCard.test.tsx** (3 tests) — Rendering + external link security

### Running Tests

```powershell
npm test                   # Watch mode (interactive)
npm test -- --run          # Single run (CI mode)
npm run test:ui            # Visual UI in browser
npm run test:coverage      # Generate HTML coverage report
```

### Test Organization

- **Co-located:** Tests live next to implementation (`*.test.ts`)
- **Helpers:** Shared utilities in `src/test/helpers/`
- **Setup:** Global mocks in `src/test/setup.ts`

## Build & Deployment

### Production Build

```powershell
npm run build
```

Output: `jamcraft-app/build/`

Process:
1. TypeScript type-checking (`tsc -b`)
2. Vite bundling (tree-shaking, minification, code-splitting)

### CI/CD Pipeline (AWS Amplify)

**Workflow:** `amplify.yml` (repo root)

```yaml
1. cd jamcraft-app && npm ci
2. npm test -- --run   ← MUST PASS
3. npm run build
4. Deploy artifacts from jamcraft-app/build/
```

Amplify builds and deploys automatically on push to `main`.

The `terraform/` directory contains an earlier S3/CloudFront/Route53 setup that is not the live pipeline.

## Security Features

1. **URL Validation:** Only `http:` and `https:` protocols allowed
   - Blocks `javascript:`, `data:`, `file:` for XSS prevention
2. **Secure External Links:** All links use `noopener,noreferrer`
3. **No Exposed Secrets:** Deployment via Amplify's managed pipeline

## Code Guidelines

### When Adding Features

1. **Placement:** Code goes in the correct domain folder
2. **Size:** Files < ~200 lines, functions < ~30 lines
3. **Testing:** Write tests alongside implementation
4. **Naming:** Explicit, descriptive names (no generic `utils`)
5. **Separation:** Keep business logic framework-agnostic

### Adding a New Section

1. Create `NewSection.tsx` in the appropriate domain (use `components/ui/Section.tsx` as the wrapper)
2. Register the section id + label in `src/config/sections.ts` (this drives the nav)
3. Render the section in `App.tsx` inside `AppShell.Main` in scroll order
4. Write tests

### Adding a Podcast Episode

Append an object to `src/podcasts/data/podcast-episodes-data.ts` (id, showName, episodeTitle, description, artworkUrl, episodeUrl, publishedYear). Artwork can be a YouTube thumbnail (`https://img.youtube.com/vi/<id>/hqdefault.jpg`) or a local file in `public/assets/`.

### Adding a Workshop

Append an object to `src/workshops/data/workshops-data.ts` (id, title, description, eventUrl, date, year, optional collaborators/format).

### Adding a Speaking Engagement

Append an object to `src/speaking/data/speaking-engagements-data.ts` (id, title, description, eventName, location, eventUrl, date, year, format, optional collaborators).

### Adding a New Domain

1. Create folder: `src/new-domain/`
2. Add structure: `entities/`, `use-cases/`, `data/`, `ui/`
3. Create section: `NewDomainSection.tsx`
4. Register in `config/sections.ts` and render in `App.tsx`
5. Write tests

## Configuration Files

- **tsconfig.json** — Root TypeScript config
- **tsconfig.app.json** — App build (excludes `*.test.ts` files)
- **tsconfig.node.json** — Node tooling
- **vite.config.ts** — Vite bundler
- **vitest.config.ts** — Test runner (happy-dom environment)
- **eslint.config.js** — Linting rules

## Accessibility

- **Reduced Motion:** `useReducedMotion` hook respects system preferences; section/entrance animations are disabled when set
- **ARIA Labels:** All interactive elements labeled; active nav anchor uses `aria-current`
- **Focus Management:** Visible focus rings on all interactive elements
- **Keyboard Navigation:** Full keyboard support
- **Semantic HTML:** `<section>`/`<footer>` landmarks, proper heading hierarchy

## Troubleshooting

### Tests Failing

```powershell
rm -rf node_modules package-lock.json
npm install
npm test -- --run
```

### Build Failing

```powershell
npx tsc --noEmit
npm run lint
```

## Deployment URLs

- **Production:** https://jamcraft.io

## Future Enhancements

- [ ] Add E2E tests with Playwright
- [ ] Pull podcast episodes from an RSS feed instead of static data
- [ ] Visual regression testing (Percy/Chromatic)
- [ ] Performance monitoring (Lighthouse CI)

---

## Resources

- **Repository:** https://github.com/SeveralHerr/JamcraftApp
- **Live Site:** https://jamcraft.io

For questions, see the main README.md or open an issue.
