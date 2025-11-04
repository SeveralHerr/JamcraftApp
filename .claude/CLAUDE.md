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

## Recent Maintenance (November 2025)

All security vulnerabilities have been resolved and the codebase has been cleaned up:

### Security Updates
- Updated react-router-dom from 7.1.5 to 7.9.5 (HIGH severity fix)
- Updated Vite from 6.1.0 to 6.4.1 (MODERATE severity fixes)
- All npm audit vulnerabilities resolved (0 vulnerabilities)

### Code Quality Improvements
- Created missing ESLint configuration file ([eslint.config.js](jamcraft-app/eslint.config.js))
- Removed unused components (AppHeader.tsx, MinecraftCard.tsx)
- Cleaned up all commented-out code
- Fixed empty inline styles
- Added React Error Boundary component for better error handling
- Added 404 Not Found page with catch-all route

### Accessibility & SEO
- Added comprehensive SEO meta tags (description, Open Graph, Twitter Cards)
- Added ARIA labels to all navigation elements and social media links
- Improved screen reader support

### Build System
- All dependencies updated to latest patch/minor versions
- ESLint now fully functional
- TypeScript compilation passes with strict mode
- Production build successful (322.69 kB JS, 203.53 kB CSS)

## Project Structure

```
JamcraftApp/
├── jamcraft-app/              # Main React application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── About.tsx      # About page with profile info
│   │   │   ├── Home.tsx       # Landing page with cards
│   │   │   ├── NavButton.tsx  # Navigation button component
│   │   │   ├── ErrorBoundary.tsx # Error boundary for error handling
│   │   │   ├── NotFound.tsx   # 404 page component
│   │   │   └── Cards/         # Reusable card components
│   │   ├── config/
│   │   │   └── routes.ts      # Route definitions & external links
│   │   ├── App.tsx            # Main application component
│   │   └── main.tsx           # React DOM entry point
│   ├── public/assets/         # Images and branding assets
│   ├── vite.config.ts         # Vite configuration
│   └── package.json           # Dependencies
└── package.json               # Root dependencies
```

## Key Files

### Components

- [App.tsx](jamcraft-app/src/App.tsx) - Main application component with routing and error boundary
- [Home.tsx](jamcraft-app/src/components/Home.tsx) - Landing page with animated logo and platform cards
- [About.tsx](jamcraft-app/src/components/About.tsx) - Profile page with social links
- [ErrorBoundary.tsx](jamcraft-app/src/components/ErrorBoundary.tsx) - React error boundary for graceful error handling
- [NotFound.tsx](jamcraft-app/src/components/NotFound.tsx) - 404 page for invalid routes
- [Cards/BaseCard.tsx](jamcraft-app/src/components/Cards/BaseCard.tsx) - Reusable card template component

### Configuration

- [routes.ts](jamcraft-app/src/config/routes.ts) - Centralized route and external link definitions
- [vite.config.ts](jamcraft-app/src/vite.config.ts) - Vite build configuration
- [eslint.config.js](jamcraft-app/eslint.config.js) - ESLint configuration for React and TypeScript
- [tsconfig.app.json](jamcraft-app/tsconfig.app.json) - TypeScript configuration
- [postcss.config.js](postcss.config.js) - PostCSS with Mantine preset

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
