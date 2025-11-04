# Jamcraft Portfolio Website

## Project Overview

Jamcraft is a modern personal portfolio and community hub website for James Herr (MrSeveral), a full-stack engineer and game developer. The site serves as a central hub connecting to various platforms including Discord, Twitch, Itch.io, and social profiles.

## Technology Stack

- **Frontend Framework:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 6.4.1
- **UI Library:** Mantine 7.16.3
- **Router:** React Router DOM 7.9.5
- **Icons:** Tabler Icons React 3.35.0
- **Styling:** CSS Modules + Mantine CSS + PostCSS


## Development

### Prerequisites

- Node.js (with npm)
- Git

### Setup

```bash
cd jamcraft-app
npm install
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production (outputs to /build)
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Development Server

The development server runs on Vite with Hot Module Replacement (HMR). Start it with:

```bash
npm run dev
```

## Features

- **Responsive Design:** Mobile-first approach with Mantine breakpoints
- **Dark Theme:** Default dark mode styling
- **Navigation:** Responsive header with hamburger menu on mobile
- **Platform Integration:** Links to Discord, Twitch, Itch.io, and social profiles
- **Animations:** CSS animations for logo and card interactions
- **Accessibility:** Built with Mantine's accessible components

## Pages

1. **Home (/)** - Landing page with Jamcraft logo and platform cards
2. **About (/about)** - Profile information and social links
3. **404 Not Found** - Catch-all route for invalid URLs with link back to home

## External Links

The application integrates with multiple platforms:

- Discord community server
- Twitch streaming channel
- Itch.io game portfolio
- LinkedIn profile
- GitHub repositories
- YouTube channel
- Steam profile
- Bluesky social

## Project Structure

```
JamcraftApp/
├── .claude/
│   └── CLAUDE.md                    # Developer documentation
│
├── jamcraft-app/                    # Main application directory
│   ├── public/
│   │   ├── assets/                  # Static assets (images, icons, logos)
│   │   └── index.html               # Entry HTML with SEO meta tags
│   │
│   ├── src/
│   │   ├── community-hub/           # 🏢 DOMAIN: Community & Gaming Channels
│   │   │   ├── entities/
│   │   │   │   └── CommunityChannel.ts      # Domain entity
│   │   │   ├── use-cases/
│   │   │   │   └── GetCommunityChannels.ts  # Business logic
│   │   │   ├── data/
│   │   │   │   └── channels-data.ts         # Channel configurations
│   │   │   └── ui/
│   │   │       ├── components/
│   │   │       │   └── CommunityChannelCard.tsx  # Channel card component
│   │   │       └── hooks/
│   │   │           └── useCommunityChannels.ts   # React integration
│   │   │
│   │   ├── social-presence/         # 🌐 DOMAIN: Social Media & External Links
│   │   │   ├── entities/
│   │   │   │   └── SocialLink.ts            # Domain entity
│   │   │   ├── use-cases/
│   │   │   │   ├── GetSocialLinks.ts        # Business logic
│   │   │   │   └── NavigateToExternalLink.ts # Navigation use case
│   │   │   ├── services/
│   │   │   │   └── BrowserNavigationService.ts  # Infrastructure service
│   │   │   ├── data/
│   │   │   │   └── social-links-data.ts     # Social link configurations
│   │   │   └── ui/
│   │   │       ├── components/
│   │   │       │   └── SocialLinkIcon.tsx   # Social icon component
│   │   │       └── hooks/
│   │   │           └── useSocialLinks.ts    # React integration
│   │   │
│   │   ├── portfolio/               # 👤 DOMAIN: Personal Profile & Bio
│   │   │   ├── entities/
│   │   │   │   └── Profile.ts               # Domain entity
│   │   │   ├── use-cases/
│   │   │   │   └── GetProfile.ts            # Business logic
│   │   │   ├── data/
│   │   │   │   └── profile-data.ts          # Profile data
│   │   │   └── ui/
│   │   │       ├── components/
│   │   │       │   ├── ProfileHeader.tsx    # Header component
│   │   │       │   ├── ProfileBio.tsx       # Bio component
│   │   │       │   └── ProfileImage.tsx     # Image component
│   │   │       └── hooks/
│   │   │           └── useProfile.ts        # React integration
│   │   │
│   │   ├── components/              # Shared/Legacy UI Components
│   │   │   ├── Cards/
│   │   │   │   └── BaseCard.tsx             # Generic card component
│   │   │   ├── ErrorBoundary.tsx            # Error handling
│   │   │   ├── Home.tsx                     # Home page
│   │   │   ├── About.tsx                    # About page
│   │   │   └── NotFound.tsx                 # 404 page
│   │   │
│   │   ├── App.tsx                  # Root application component
│   │   ├── App.css                  # Global app styles
│   │   ├── index.css                # Global base styles
│   │   ├── main.tsx                 # Application entry point
│   │   └── vite-env.d.ts           # Vite type definitions
│   │
│   ├── eslint.config.js             # ESLint configuration
│   ├── tsconfig.json                # Root TypeScript config
│   ├── tsconfig.app.json            # App TypeScript config
│   ├── tsconfig.node.json           # Node TypeScript config
│   ├── vite.config.ts               # Vite build configuration
│   ├── postcss.config.cjs           # PostCSS configuration
│   ├── package.json                 # Dependencies and scripts
│   └── package-lock.json            # Locked dependency versions
│
└── README.md                        # Human-readable project overview
```

### Architecture Principles

**Clean Architecture Implementation:**
- **Entities Layer:** Pure domain objects with no framework dependencies
- **Use Cases Layer:** Business logic that orchestrates entities
- **Infrastructure Layer:** External services (BrowserNavigationService)
- **UI Layer:** React components, hooks, and framework code

**Screaming Architecture:**
- Top-level folders represent business domains, not technical layers
- Folder structure immediately reveals what the application does
- Domain modules are self-contained with flat structure (no excessive nesting)
- Each domain has: entities/ use-cases/ data/ ui/ (and sometimes services/)

**Key Design Decisions:**
- **Flat Structure:** Removed unnecessary `core/` folders to reduce drilling
- **Data-Driven:** Generic components consume domain entities
- **Dependency Inversion:** Use cases depend on abstractions (NavigationService interface)
- **Single Responsibility:** Each component/class has one clear purpose
- **Testability:** Business logic separated from React for easy testing

## Build Output

Production builds are output to the `/build` directory:

```bash
npm run build
```

The build process:
1. TypeScript compilation with strict type checking
2. Vite bundling and optimization
3. Asset optimization and minification

## Code Style

- **TypeScript:** Strict mode enabled with comprehensive linting rules
- **ESLint:** Configured for React and TypeScript best practices
- **No Unused Variables:** Enforced at build time
- **Modern JSX:** Uses React 17+ automatic JSX runtime

## Assets

All visual assets are stored in [public/assets/](jamcraft-app/public/assets/):

- Background images (PNG/WebP)
- Logo files
- Brand icons (LinkedIn, GitHub, YouTube, Steam, etc.)
- Profile images
- Platform-specific assets

## TypeScript Configuration

The project uses a multi-configuration setup:

- [tsconfig.json](jamcraft-app/tsconfig.json) - Root configuration with references
- [tsconfig.app.json](jamcraft-app/tsconfig.app.json) - App-specific config (ES2020, ESNext modules)
- [tsconfig.node.json](jamcraft-app/tsconfig.node.json) - Node/build tooling config

## Styling Approach

- **CSS Modules:** Scoped component styles
- **Mantine CSS:** Pre-built component styles
- **PostCSS:** CSS processing with Mantine preset
- **Global Styles:** [index.css](jamcraft-app/src/index.css) and [App.css](jamcraft-app/src/App.css)

## Architecture Notes

- **Component-Based:** Modular React components with clear responsibilities
- **Configuration Separation:** External links and routes centralized in config files
- **Type Safety:** Full TypeScript coverage with strict mode
- **Modern React:** Uses React 19 features and hooks
- **Routing:** Client-side routing with React Router DOM v7

## Development Guidelines

### Screaming Architecture Reminders

**The folder structure should SCREAM what the application does, not how it's built.**

When adding new features:
1. **Ask: "What business domain does this belong to?"** Not "What technical layer is this?"
2. **Keep it flat:** Avoid deep folder nesting. Two levels is ideal, three is max.
3. **Domain-first:** Create top-level folders for business domains (e.g., `user-authentication/`, `payment-processing/`)
4. **Self-contained modules:** Each domain should have its own entities, use cases, data, and UI
5. **Readable at a glance:** A developer should understand the application's purpose by reading folder names

### Clean Code Principles

**Every file, class, and function should have ONE clear responsibility.**

- **Entities:** Pure data structures with no framework dependencies
- **Use Cases:** Single business operation (GetProfile, NavigateToExternalLink)
- **Services:** Infrastructure concerns abstracted behind interfaces
- **Components:** Presentational UI with minimal logic
- **Hooks:** React integration layer that calls use cases

**When in doubt:**
- Can I test this without React? (If no, extract business logic)
- Does this file name clearly state its purpose? (If no, rename it)
- Would a new developer understand what this does? (If no, refactor it)
- Am I repeating myself? (If yes, extract it)

**Red flags to watch for:**
- Files over 200 lines (break them up)
- Functions over 30 lines (extract helper functions)
- More than 3 levels of folder nesting (flatten it)
- Generic names like "utils", "helpers", "common" (be specific about domain)
- Framework code mixed with business logic (separate them)
