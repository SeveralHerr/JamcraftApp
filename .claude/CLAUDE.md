# Jamcraft Portfolio Website

## Project Overview

Jamcraft is a modern personal portfolio and community hub website for James Herr (MrSeveral), a full-stack engineer and game developer. The site serves as a central hub connecting to various platforms including Discord, Twitch, Itch.io, and social profiles.

## Claude Instructions

- Always end responses in three smile emoji
- Always write tests for new code
- Always ensure CLAUDE.md is up to date

## Technology Stack

- **Frontend:** React 19.0.0
- **Language:** TypeScript 5.7.2
- **Build Tool:** Vite 6.4.1
- **UI Library:** Mantine 7.16.3
- **Router:** React Router DOM 7.9.5
- **Icons:** Tabler Icons 3.30.0
- **Testing:** Vitest 4.0.7 + React Testing Library 16.3.0
- **Styling:** CSS Modules + Mantine CSS + PostCSS
- **Infrastructure:** AWS (S3, CloudFront, Route53, ACM) via Terraform
- **CI/CD:** GitHub Actions

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

- **Responsive Design:** Mobile-first with Mantine components
- **Dark Theme:** Default dark mode with custom color palette
- **Accessibility:** Reduced motion support, ARIA labels, focus management
- **Security:** URL validation, XSS prevention (blocks javascript: protocol)
- **Testing:** Comprehensive test coverage (23 tests, 5 test files)
- **CI/CD:** Automated testing and deployment to AWS

## Pages

1. **Home** (`/`) - Community hub with platform links (Discord, Twitch, Itch.io)
2. **Projects** (`/projects`) - Portfolio project showcase with NSFW filtering
3. **Testimonials** (`/testimonials`) - Professional testimonials carousel
4. **About** (`/about`) - Profile information and social links
5. **404** (catch-all) - Error page for invalid routes

## Project Structure (Screaming Architecture)

```
JamcraftApp/
├── .github/workflows/
│   └── deploy.yml              # CI/CD: test → build → deploy to AWS
├── .claude/
│   └── CLAUDE.md               # This file
├── terraform/                  # Infrastructure as Code (AWS)
│   ├── main.tf
│   ├── s3.tf
│   ├── cloudfront.tf
│   ├── route53.tf
│   ├── acm.tf
│   └── github-oidc.tf
└── jamcraft-app/               # Application source
    ├── public/assets/          # Static assets (images, logos)
    ├── src/
    │   ├── community-hub/      # DOMAIN: Community features
    │   │   ├── entities/CommunityChannel.ts
    │   │   ├── use-cases/GetCommunityChannels.ts
    │   │   ├── use-cases/GetCommunityChannels.test.ts
    │   │   ├── data/channels-data.ts
    │   │   ├── ui/components/CommunityChannelCard.tsx
    │   │   ├── ui/hooks/useCommunityChannels.ts
    │   │   └── CommunityHubPage.tsx        # Home page
    │   │
    │   ├── social-presence/    # DOMAIN: Social media integration
    │   │   ├── entities/SocialLink.ts
    │   │   ├── use-cases/NavigateToExternalLink.ts
    │   │   ├── use-cases/NavigateToExternalLink.test.ts
    │   │   ├── services/BrowserNavigationService.ts
    │   │   ├── services/BrowserNavigationService.test.ts
    │   │   ├── data/social-links-data.ts
    │   │   └── ui/...
    │   │
    │   ├── portfolio/          # DOMAIN: Profile & bio
    │   │   ├── entities/Profile.ts
    │   │   ├── use-cases/GetProfile.ts
    │   │   ├── data/profile-data.ts
    │   │   ├── ui/...
    │   │   └── AboutPage.tsx               # About page
    │   │
    │   ├── portfolio-projects/ # DOMAIN: Project showcase
    │   │   ├── entities/PortfolioProject.ts
    │   │   ├── use-cases/GetPortfolioProjects.ts
    │   │   ├── data/portfolio-projects-data.ts
    │   │   ├── ui/...
    │   │   └── ProjectsPage.tsx            # Projects page
    │   │
    │   ├── testimonials/       # DOMAIN: Testimonials
    │   │   ├── entities/Testimonial.ts
    │   │   ├── use-cases/GetTestimonials.ts
    │   │   ├── data/testimonials-data.ts
    │   │   ├── ui/...
    │   │   └── TestimonialsPage.tsx        # Testimonials page
    │   │
    │   ├── components/         # Shared UI infrastructure
    │   │   ├── ui/             # Reusable presentational components
    │   │   ├── NavButton.tsx
    │   │   ├── ErrorBoundary.tsx
    │   │   ├── ErrorBoundary.test.tsx
    │   │   └── NotFound.tsx
    │   │
    │   ├── hooks/              # Shared custom hooks
    │   │   ├── useReducedMotion.ts
    │   │   └── useReducedMotion.test.ts
    │   │
    │   ├── theme/              # Design system (colors, spacing, typography)
    │   ├── config/             # App configuration (routes, external links)
    │   │
    │   ├── test/               # Test infrastructure
    │   │   ├── setup.ts        # Vitest setup (mocks, global config)
    │   │   └── helpers/
    │   │       └── test-utils.tsx  # Custom render with providers
    │   │
    │   ├── App.tsx             # Root app component (routing, providers)
    │   ├── App.css             # Global styles
    │   └── main.tsx            # Entry point
    │
    ├── vitest.config.ts        # Test configuration
    ├── vite.config.ts          # Build configuration
    ├── tsconfig.json           # TypeScript root config
    ├── tsconfig.app.json       # TypeScript app config (excludes tests)
    ├── tsconfig.node.json      # TypeScript node tooling config
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
└── DomainPage.tsx      # Top-level page component (if applicable)
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

### Layer Descriptions

1. **Entities (Core):** Pure TypeScript interfaces, zero dependencies
   - Example: `CommunityChannel.ts`, `Profile.ts`
2. **Use Cases (Business Logic):** Framework-agnostic classes
   - Example: `GetCommunityChannels`, `NavigateToExternalLink`
3. **Services:** Adapters for external dependencies
   - Example: `BrowserNavigationService` (wraps `window.open`)
4. **UI (React):** Components and hooks, depends on inner layers
   - Example: `CommunityHubPage.tsx`, `useCommunityChannels`

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

**23 tests across 5 files:**

1. **NavigateToExternalLink.test.ts** (5 tests) - URL validation, XSS prevention
2. **BrowserNavigationService.test.ts** (4 tests) - Security (noopener, noreferrer)
3. **GetCommunityChannels.test.ts** (4 tests) - Business logic filtering
4. **ErrorBoundary.test.tsx** (5 tests) - Error catching and recovery
5. **useReducedMotion.test.ts** (5 tests) - Accessibility (media queries)

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
3. Asset optimization

### CI/CD Pipeline (GitHub Actions)

**Workflow:** `.github/workflows/deploy.yml`

```yaml
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (npm ci)
4. Run tests ← MUST PASS
5. Build application
6. Deploy to S3
7. Invalidate CloudFront cache
```

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

### AWS Infrastructure (Terraform)

**Resources:**
- **S3:** Static website hosting
- **CloudFront:** Global CDN with HTTPS
- **Route53:** DNS management (jamcraft.io)
- **ACM:** SSL/TLS certificates
- **IAM:** GitHub OIDC for secure deployments (no long-lived credentials)

**Infrastructure as Code:**
- All resources defined in `terraform/`
- State stored in S3 with DynamoDB locking
- Managed via Terraform CLI

## Security Features

1. **URL Validation:** Only `http:` and `https:` protocols allowed
   - Blocks `javascript:`, `data:`, `file:` for XSS prevention
2. **Secure External Links:** All links use `noopener,noreferrer`
3. **HTTPS Enforcement:** CloudFront redirects HTTP → HTTPS
4. **Content Security:** S3 bucket policies restrict direct access
5. **No Exposed Secrets:** GitHub OIDC for AWS access

## Code Guidelines

### When Adding Features

1. **Placement:** Code goes in the correct domain folder
2. **Size:** Files < ~200 lines, functions < ~30 lines
3. **Testing:** Write tests alongside implementation
4. **Naming:** Explicit, descriptive names (no generic `utils`)
5. **Separation:** Keep business logic framework-agnostic

### Adding a New Domain

1. Create folder: `src/new-domain/`
2. Add structure: `entities/`, `use-cases/`, `data/`, `ui/`
3. Create page: `NewDomainPage.tsx`
4. Add route in `App.tsx`
5. Update `config/routes.ts`
6. Write tests

### Adding a New Page

1. Create `DomainPage.tsx` in appropriate domain
2. Add route in `App.tsx`
3. Add route constant in `config/routes.ts`
4. Add navigation link in header/navbar

## Configuration Files

- **tsconfig.json** — Root TypeScript config
- **tsconfig.app.json** — App build (excludes `*.test.ts` files)
- **tsconfig.node.json** — Node tooling
- **vite.config.ts** — Vite bundler
- **vitest.config.ts** — Test runner (happy-dom environment)
- **eslint.config.js** — Linting rules

## Accessibility

- **Reduced Motion:** `useReducedMotion` hook respects system preferences
- **ARIA Labels:** All interactive elements labeled
- **Focus Management:** Visible focus rings on all interactive elements
- **Keyboard Navigation:** Full keyboard support
- **Semantic HTML:** Proper heading hierarchy and landmarks

## Troubleshooting

### Tests Failing

```powershell
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm test -- --run
```

### Build Failing

```powershell
# Check TypeScript errors
npx tsc --noEmit

# Check linting
npm run lint
```

### Dev Server Issues

```powershell
# Restart server
npm run dev
```

## Deployment URLs

- **Production:** https://jamcraft.io
- **CloudFront Distribution:** (check AWS console)

## Future Enhancements

- [ ] Add E2E tests with Playwright
- [ ] API integration examples
- [ ] State management (if complex state emerges)
- [ ] Visual regression testing (Percy/Chromatic)
- [ ] Performance monitoring (Lighthouse CI)

---

## Resources

- **Repository:** https://github.com/SeveralHerr/JamcraftApp
- **Live Site:** https://jamcraft.io
- **Terraform Docs:** See `terraform/README.md`

For questions, see the main README.md or open an issue.
