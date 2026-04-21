# Architecture

## Overview
The application follows the React/Next.js App Router architecture pattern with React Server Components (RSC). It leverages global state/context effectively for interactive UI elements.

## Flow & Entry Points
- **Entry Points:** Everything is driven via the Next.js App Router in `src/app`. Global layout (`src/app/layout.tsx`) binds the application.
- **Data Flow:** Uses standard React patterns for client-side component interactions. Complex animations are powered by Framer Motion and Three.js components connected with local and global states.
- **Routing:** Handled entirely by Next.js file-system-based routing. Core sections include Application routes (/services, /about-us, /contact, /case-studies).

## Layers Config
1. **Application Layer (`src/app`)**: Contains route definitions, server-side layouts, and global CSS config.
2. **Component Abstraction Layer (`src/components`)**:
   - UI primitives are mostly abstracted cleanly under `src/components/ui`.
   - Feature modularization handles separate contexts: `homepage`, `landing`, `brilliance`, and `optimus`.
   - Global elements unattached to a specific route live top level (like `navigation.tsx`, `footer.tsx`).
3. **Utility & State Abstractions (`src/lib` & `src/hooks`)**: Used for isolated DOM utilities, formatting tools, custom React hooks, and data definitions.

## Key Design Patterns
- **Glassmorphism & Cinematic Motion:** Uses heavy abstraction on `framer-motion` to execute cinematic web experiences using declarative and composite animations.
- **Design Systems:** A dedicated `design-system` module inside components is used to enforce tokens visually globally.
- **Server/Client Boundary:** Adheres to Next.js strict boundary guidelines separating server-loaded payloads (React Server Components) and interactive logic (`"use client"`).
