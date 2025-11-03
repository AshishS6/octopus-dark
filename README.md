# Octopus Media - Creative Digital Agency

A modern, immersive website featuring an underwater ocean theme with interactive animations and engaging user experience.

## Features

- 🌊 **Immersive Underwater Experience**: Scroll-based depth system that transitions from surface to deep ocean
- 🐙 **Animated Octopus Cursor**: Custom cursor with spring physics and hover states
- 🎨 **Layered Ocean Backgrounds**: Parallax layers with particles, fish, corals, and bioluminescence
- 📊 **Depth Meter**: Visual indicator showing current scroll depth
- 🎭 **Smooth Animations**: Optimized 60 FPS animations with Framer Motion
- 📱 **Responsive Design**: Mobile-friendly with touch device detection
- ♿ **Accessibility**: Reduced motion support and keyboard navigation

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Plus Jakarta Sans (headings) + Inter (body)

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- pnpm (recommended) or npm

### Installation

```sh
# Install dependencies
pnpm install
# or
npm install
```

### Development

```sh
# Start development server
pnpm dev
# or
npm run dev
```

The app will be available at `http://localhost:8080`

### Build

```sh
# Build for production
pnpm build
# or
npm run build
```

### Preview Production Build

```sh
# Preview production build
pnpm preview
# or
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── layers/         # Ocean background layers (Surface, Mid, Deep)
│   ├── ui/             # shadcn/ui components
│   └── ...
├── context/            # React context providers (DepthProvider)
├── pages/              # Page components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## Key Components

- **OctopusCursor**: Custom animated cursor with spring physics
- **BackgroundController**: Manages ocean layers and particle system
- **DepthProvider**: Provides scroll-based depth tracking
- **OceanSurface/MidOcean/DeepOcean**: Layered background components
- **Particles**: Canvas-based particle system for bubbles and plankton

## Performance Optimizations

- Code splitting with manual chunks
- Lazy loading for below-the-fold components
- Optimized canvas rendering (60 FPS)
- GPU-accelerated animations
- Reduced particle count on low-end devices

## Deployment

Build the project and deploy the `dist` folder to your hosting provider:

```sh
pnpm build
```

The production build will be in the `dist` directory.

## License

Copyright © 2024 Octopus Media. All rights reserved.
