# Tech Stack

## Overview
This application is built entirely using the Modern web stack: React 19 + Next.js 16 (Turbopack) and TailwindCSS v4.

## Core Runtime & Framework
- Runtime: Node.js (via Next.js/Turbopack)
- Framework: Next.js ^16.1.1
- Core UI Library: React ^19.0.0 and React DOM ^19.0.0
- Language: TypeScript ^5

## UI, Styling & Animation
- Styling Framework: TailwindCSS ^4.0, PostCSS
- Component Library & Primitives: 
  - Radix UI (Accordion, Dialog, Select, Accordion, Dropdown etc.)
  - Headless UI
- UI Motion & Animation:
  - Framer Motion ^12.23 (motion/motion-dom)
  - GSAP ^3.15 + `@gsap/react`
  - Lenis (Smooth Scrolling)
  - Three.js ^0.178, React Three Fiber, Drei (3D objects and globe)
  - TSParticles (Background particles)
- Typography & Icons: Tabler Icons, Lucide React, Heroicons, Tailwind Typography

## Database & ORM
- ORM: Drizzle ORM ^0.44.7 (with `drizzle-kit` for schema mgmt)
- Database Client: `@libsql/client` (Likely SQLite/Turso based)

## Authentication
- `better-auth` ^1.4.10 for auth.

## Utilities & Others
- Data Validation: Zod
- Forms handling: React Hook Form + hookform resolvers
- Toast Notifications: Sonner
- Carousel: Embla Carousel and Swiper
