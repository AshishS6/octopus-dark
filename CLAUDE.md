# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (Vite)
pnpm build        # Production build (TypeScript + Vite)
pnpm build:dev    # Development build
pnpm lint         # ESLint
pnpm preview      # Preview production build
```

## Architecture

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion

**Routing:** React Router v6 with a `MainLayout` shell wrapping all routes. All routes live in `src/App.tsx`. Below-the-fold page sections are lazy-loaded with `React.lazy` + `Suspense`.

**Layout shell (`src/components/MainLayout.tsx`):**
- Wraps every page via `<Outlet />`
- Provides `Navigation`, `Footer`, and `BackgroundController`
- Wraps everything in `DepthProvider` context
- Implements a **Depth Token** system: routes map to `depth-0` through `depth-3`, controlling animation intensity (`depth-0` = max motion on home, `depth-3` = minimal on forms)
- Has a fixed reduced-motion toggle button (bottom-left)

**Home page sections (`src/pages/Index.tsx`):** Hero → SignalMarquee → WhoWeAre → WorkSamples → Services → ClientsMarquee → Team → ContactCTA. Navigation and Footer are provided by MainLayout — do not import them in Index.

**Design system (`src/index.css`):**
- Dark-only theme. All colors are HSL CSS variables.
- Accent color: **electric lime** (`--electric: 74 100% 50%`)
- Custom easing tokens: `--ease-out-expo`, `--ease-in-out-expo`, `--ease-drawer`

**Typography (`tailwind.config.ts`):**
- `font-display` → DM Serif Display (editorial headings)
- `font-heading` → Plus Jakarta Sans
- `font-body` → Inter
- `font-mono` → JetBrains Mono

**Custom Tailwind tokens:** `electric` color, `glow-pulse` / `float` / `marquee` / `line-draw` / `count-up` keyframes and animations.

**Path alias:** `@/` maps to `src/`.

**UI primitives:** Radix UI components wrapped in shadcn/ui style under `src/components/ui/`. Do not modify these directly — extend via composition.

**Animation library:** Framer Motion (`framer-motion` + `motion` packages). Use `framer-motion` for React components.

**Data:** Static site content lives in `src/components/data.ts`.
