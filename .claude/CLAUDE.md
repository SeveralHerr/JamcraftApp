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
- **Accessibility:** Reduced motion support, ARIA labels, focus management, skip-to-content link, one `<h1>` per page
- **Security:** https-only URL validation, XSS prevention, noopener/noreferrer on external links, CSP + security headers (`customHttp.yml`)
- **Testing:** 156 tests across 28 files, ~98% line coverage (`npm run test:coverage`)
- **Deep Links:** `/#section` and legacy paths scroll to their section on first load (`resolveSectionFromHash` / `resolveLegacyPath`)
- **Static Data, No Spinners:** Section data hooks compute data on first render (`useState(() => useCase...)`) — no loading state, no layout shift
- **CI/CD:** Automated testing and deployment via AWS Amplify

## Page Sections

The app is a single page composed of sections (registered in `src/config/sections.ts`):

1. **Home / Hero** (`#home`) — Full-height hero with profile, bio, social links, CTA (owned by `portfolio/`)
2. **Projects** (`#projects`) — Portfolio projects (NSFW blur/reveal supported via `isNSFW`) + game jam submissions sub-group (sorted newest `jamYear` first — every entry needs `jamYear`) (owned by `portfolio-projects/`)
3. **Podcasts** (`#podcasts`) — Podcast guest appearances as cards linking out (owned by `podcasts/`)
4. **Workshops** (`#workshops`) — Workshops run/co-run by James as cards linking out (owned by `workshops/`)
5. **Speaking** (`#speaking`) — Conference talks and panel appearances as cards linking out (owned by `speaking/`)
6. **Contact** (`#contact`) — Footer with social links (in `components/layout/Footer.tsx`)

Legacy multi-page URLs (`/projects`, `/about`, `/testimonials`) are redirected on load to section anchors by `resolveLegacyPath` in `src/config/sections.ts`.

## Project Structure (Screaming Architecture)

```
JamcraftApp/
├── amplify.yml                 # CI/CD: test → build → deploy (AWS Amplify)
├── customHttp.yml              # Amplify response security headers (CSP, HSTS, ...)
├── .claude/
│   ├── CLAUDE.md               # This file
│   ├── skills/validate-jamcraft-site/  # Validation-loop recipe + audit.js + header-faithful preview
│   └── mcp/viewport-screenshot/        # Zero-dep MCP: exact-viewport screenshots via headless Chrome CDP (Node 22+)
├── .mcp.json                   # Enables the viewport-screenshot MCP server for this project
└── jamcraft-app/               # Application source
    ├── public/assets/          # Static assets (images, logos, podcast artwork)
    ├── src/
    │   ├── portfolio/          # DOMAIN: Profile & hero
    │   │   ├── entities/Profile.ts
    │   │   ├── use-cases/GetProfile.ts
    │   │   ├── data/profile-data.ts
    │   │   ├── ui/...          # ProfileImage (WebP, reserved size, feathered edges), ProfileHeader, ProfileBio (bio: string[] paragraphs), JamcraftInvite (full logo + Discord)
    │   │   └── HeroSection.tsx             # #home section
    │   │
    │   ├── portfolio-projects/ # DOMAIN: Project showcase
    │   │   ├── entities/PortfolioProject.ts
    │   │   ├── use-cases/GetPortfolioProjects.ts (+ test)
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
    │   │   ├── layout/         # Header (scroll-spy nav, skip link, aria-expanded burger), NavAnchor, Footer (contact + Discord invite)
    │   │   ├── ui/             # Card, CompactCard (+ test, lazy thumbnails), PageHeader (h2 + test), Section, FocusRing
    │   │   └── ErrorBoundary.tsx (+ test)
    │   │
    │   ├── hooks/              # Shared custom hooks
    │   │   ├── useReducedMotion.ts (+ test)
    │   │   └── useActiveSection.ts (+ test)   # scroll-position scroll-spy
    │   │
    │   ├── theme/              # Design tokens + mantine-theme.ts (Mantine theme object)
    │   ├── config/             # sections.ts (section registry, legacy redirects, hash resolver), routes.ts (EXTERNAL_LINKS)
    │   │                       # + cross-cutting tests: data-hooks, data-urls, index-html, security-headers
    │   │
    │   ├── test/               # Test infrastructure
    │   │   ├── setup.ts        # Vitest setup (mocks, global config)
    │   │   └── helpers/test-utils.tsx  # Custom render with MantineProvider
    │   │
    │   ├── App.tsx             # Root: providers, AppShell, section composition, initial section scroll
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

**156 tests across 28 files** (regenerate counts with `npx vitest run --reporter=json`):

| Area | Files (tests) |
|---|---|
| config (cross-cutting) | sections (16), data-hooks (7), security-headers (5), index-html (4), data-urls (2) |
| layout / shared UI | Header (6), Footer (4), CompactCard (7), PageHeader (2), ErrorBoundary (5) |
| hooks | useActiveSection (7), useReducedMotion (5) |
| portfolio | HeroSection (4), JamcraftInvite (4), ProfileBio (3), ProfileImage (3) |
| portfolio-projects | GetPortfolioProjects (10), PortfolioProjectCard (4) |
| game-jam-submissions | GetGameJamSubmissions (7) |
| podcasts | GetPodcastEpisodes (7), PodcastEpisodeCard (5) |
| workshops | GetWorkshops (7), WorkshopCard (4) |
| speaking | GetSpeakingEngagements (11), SpeakingEngagementCard (3) |
| social-presence | NavigateToExternalLink (6), BrowserNavigationService (4), SocialLinkIcon (4) |

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


## Security Features

1. **URL Validation:** `NavigateToExternalLink` only allows `https:`
   - Blocks `http:`, `javascript:`, `data:`, `file:` (XSS + downgrade prevention)
   - `src/config/data-urls.test.ts` sweeps every seed data file: links/images must be `https://` or `/assets/`
2. **Secure External Links:** All links use `noopener,noreferrer`
3. **HTTP Security Headers:** `customHttp.yml` (repo root, Amplify monorepo format) sets HSTS, nosniff, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy and a CSP. Asserted by `src/config/security-headers.test.ts`.
   - CSP: `script-src 'self'` (no inline/third-party scripts), `style-src 'unsafe-inline'` (Mantine), `img-src 'self' data: https:`
   - Adding a third-party script, font, iframe or API call requires updating the CSP in `customHttp.yml`
4. **No Exposed Secrets:** Deployment via Amplify's managed pipeline; no source maps in production builds

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

### Adding an itch.io Game

Non-jam games → `src/portfolio-projects/data/portfolio-projects-data.ts` (`platform: 'itch'`, cover from the itch page's `img.itch.zone` 315x250 crop). Jam games (page links to `itch.io/jam/...`) → `src/game-jam-submissions/data/game-jam-submissions-data.ts` with `jamYear`.

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
- **Semantic HTML:** `<main id="main-content">`/`<section>`/`<footer>` landmarks; hero name is the only `<h1>`, section titles `<h2>`, sub-groups `<h3>`
- **Skip Link:** first focusable element jumps to `#main-content`
- **Mobile Nav:** burger exposes `aria-expanded` + `aria-controls="mobile-nav"`

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

# Agent Instructions

Always read @CLAUDE.md

Always reply to me in information dense bullets.
Favor YAGNI.
Favor LEAN and Elimination of LEAN deadly wastes.
Always create the below checklist for every prompt:

## Checklist Manifesto

Always use your checklist or todo list tool to track items. Do not leave it to chance that you will remember later.
Immediately before implementing any prompts set up the following tasks as a checklist.

- Preparatory Unit Test Coverage
- Make it easy to change (which may be hard) (refactoring)
- Make the easy change
- Security Review
- Scout Rule
- Single Loop Learning
- Double Loop Learning
- Validation Loop
- Canary

## Preparatory Unit Test Coverage

Ensure the area that will be changed has approrpriate characterization tests making it safe to refactor.
Ensure characterization tests pass before starting any refactoring.
Prove a new bug test can fail: `git stash push <fixed file>`, run with `--filter`, `git stash pop`.

## Make it easy to change (which may be hard)

Refactor to common computer science grounded design patterns.
The resulting code should be easy to read, limited in file length, appropriately decoupled, and cohesive.

## Make the easy change

Complete the prompt considering YAGNI and DRY concepts in software development.

## Security Review

Evaluate for common OWASP pitfalls.
Run automated audits like pip audit, npm audit and correct package issues.
Evaluate for harder to detect problems with the system such as IDOR vulnerabilities.
Check `git ls-files` for committed build output / secrets (`jamcraft-app/build/` was tracked until 2026-10).
Any new external host (script, font, iframe, API) must be added to the CSP in `customHttp.yml`; validate with the `validate-jamcraft-site` skill's header-faithful preview.

## Scout Rule

Always leave the code better than you found it. Perform one of the following in priority order each time a prompt leads you to this area of the code.

- Evaluate Code Coverage and add more complete tests
- File length gate, reduce the file length of the files when over 500 lines by refactoring
- Mutation testing, use a analysis tool to perform mutant hunting on the modified files. For example Cosmic Ray in Python or Striker in Angular.

## Single Loop Learning

Learn from the tasks you complete:
Always end all of our chats with a list of skills that you used.
Always create new skills in this repo's skills folder that you wish you had before starting the prompt. Actually write the file now.
Always end all of our chats with a list of MCP servers that you used.
Always create new MCP servers that you wish you had before starting the prompt. Actually write the server now. Enable it when complete.

## Double Loop Learning

Learn from the process improvement opportunities:
Always evaluate the the process used here using a lens of Lean Software Development, Agile, Systems Thinking, Safety, Security, and Continuous Improvement.
Always make the changes to the CLAUDE.md with these changes. Update this very list you are reading now.

## Validation Loop

When doing an iteration or feature, take a screenshot and look for 3 things to improve. Do this 10 times.
Use the `validate-jamcraft-site` skill (`.claude/skills/`) and the `viewport-screenshot` MCP (`.mcp.json`) for desktop + 390px mobile shots.
Headless Chrome clamps windows to ~500px wide — a 390px headless shot that looks overflowed is an artifact; confirm with the iframe/MCP method.
Each fix: failing test first → fix → `npm test -- --run` + lint + build → commit.

## Fan-out (subagents)

Give each subagent exclusive file/folder ownership and forbid git commands; the orchestrator commits each concern separately.
Research agents must cite a source per fact and list anything unverified (e.g. a title only seen in search snippets) instead of guessing.
Prefer the Edit tool over regex/slice scripts when moving JSX blocks; a section-level render test (e.g. `HeroSection.test.tsx`) catches dropped elements.
`mcp__racn__commit` fails when a deletion is already staged — fall back to `git commit` with the same RACN prefix (`^ F`, `. t`, ...).

## Canary

Always end all of our chats with "# 🪁" Emoji. It should render as a markdown header so the Emoji will be large.
