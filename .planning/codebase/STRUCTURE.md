# Directory Layout and Structure

## Overview
The application organizes everything within the `src/` directory keeping an edge-case clear boundary between UI code, utilities, routes, and hooks.

## Key Directories

```
d:\Softree_Projects\SOFTREE
├── src/
│   ├── app/                # Next.js App Router entry points (pages, layouts)
│   │   ├── about-us/       # About page segment
│   │   ├── case-studies/   # Case Studies segment
│   │   ├── contact/        # Contact Us page
│   │   └── services/       # Services segment
│   ├── components/         # React Components layered structurally
│   │   ├── ui/             # Baseline design primitives (Radix, simple components)
│   │   ├── shared/         # Shared components used across features
│   │   ├── sections/       # Complex layout sections
│   │   ├── brilliance/     # Components for 'Brilliance' project/theme
│   │   ├── optimus/        # Components for 'Optimus' design segment
│   │   ├── landing/        # Core landing page components
│   │   ├── homepage/       # Sub-components specific to home
│   │   └── design-system/  # Token mappings and system configuration wrappers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Non-React utility functions, domain logic
│   │   ├── liquid/         # Internal UI logical packages
│   │   ├── evasion/        # Theme configuration related plugins
│   │   └── utils.ts        # Common tailwind clsx merge utils
│   ├── data/               # Static mock data or structural content maps
│   └── visual-edits/       # Sub-system wrappers or content layer overrides
```

## Naming Conventions
- Top-level directories are `kebab-case` or lowercase descriptors.
- Files inside `components/` mostly use `PascalCase.tsx` except Next.js built-ins (`page.tsx`, `layout.tsx`).
- Utility files use `kebab-case` or generic terms like `utils.ts`.
