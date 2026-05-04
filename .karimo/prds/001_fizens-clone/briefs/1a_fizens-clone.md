# Task Brief: 1a

**Title:** Route setup, Lenis wrapper, design tokens
**PRD:** fizens-clone
**Priority:** must
**Complexity:** 3/10
**Model:** sonnet
**Wave:** 1

---

## Objective

Create the `/fizens` Next.js App Router route with a client-side Lenis smooth-scroll wrapper scoped to this route only, plus a CSS file defining all fizens design tokens. This is the foundation every other task depends on — nothing else can start until this is done.

---

## Context

**Parent Feature:** Fizens Clone — pixel-perfect standalone clone of https://fizens.framer.ai/ at the `/fizens` route in SOFTREE.

This task is part of **Wave 1** — the foundation. All 10 subsequent tasks depend on the route, layout, and design tokens created here. No UI is built in this task — just the scaffold.

---

## Research Context

### Patterns to Follow

- **App Router layout pattern:** Reference `src/app/layout.tsx` for how the root layout wraps children. Create a parallel `src/app/fizens/layout.tsx` that is scoped only to the fizens route.
- **CSS variables convention:** Reference `src/app/globals.css` for how CSS custom properties are declared. Follow the same convention (`--token-name: value`) in `fizens.css`.

### Recommended Approach

- Lenis v1.3.x API: use `new Lenis({ autoRaf: true })` or manually wire `raf` loop. The package is already installed at v1.3.23.
- Import Geist and Poppins via `next/font/google` for performance — do NOT use CDN `<link>` tags.
- Lenis must be initialized in a `"use client"` component and destroyed on unmount to prevent memory leaks and avoid polluting other routes.

### Dependencies

**Library Dependencies:**
- `lenis` v1.3.23 (already installed)

---

## Requirements

1. Create `src/app/fizens/page.tsx` — the page entry point. For now, render a simple placeholder `<main>` that imports and renders all section components (they don't exist yet, so just export an empty page with a `<div className="fizens-page">` wrapper).
2. Create `src/app/fizens/layout.tsx` — exports a React Server Component that wraps children in `<LenisProvider>`. The LenisProvider must be a separate `"use client"` component.
3. Create `src/app/fizens/fizens.css` — contains all fizens design tokens as CSS custom properties, base resets for the fizens page, and imports Geist + Poppins via `@import` or inline `@font-face`.
4. Fonts loaded via `next/font/google`: `Geist` (weights: 400, 700) and `Poppins` (weights: 400, 600, 700). Apply font CSS variables to `.fizens-page` wrapper.

---

## Success Criteria

Complete ALL criteria before marking task done:

- [ ] `src/app/fizens/page.tsx` exists and renders without errors
- [ ] `src/app/fizens/layout.tsx` exists with a `LenisProvider` client component
- [ ] Lenis is initialized on mount and destroyed on unmount (no memory leak)
- [ ] Navigating to `/fizens` in browser works — no 404, no console errors
- [ ] `src/app/fizens/fizens.css` exists with all CSS variables listed below
- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit` passes
- [ ] Lenis does NOT affect scroll behavior on any other route (e.g. `/`, `/about-us`)

**Required CSS variables in fizens.css:**
```css
--fizens-blue-primary: #0040c1;
--fizens-blue-accent: #2970ff;
--fizens-blue-light-border: #d1e0ff;
--fizens-blue-light-bg: #eff4ff;
--fizens-blue-faint: #f5faff;
--fizens-white: #ffffff;
--fizens-off-white: #fafafa;
--fizens-text-dark: #171717;
--fizens-text-black: #0a0a0a;
--fizens-text-gray: #6b7280;
--fizens-text-gray-mid: #9ca3af;
--fizens-font-primary: var(--font-geist), 'Geist', sans-serif;
--fizens-font-heading: var(--font-poppins), 'Poppins', sans-serif;
```

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/app/fizens/page.tsx` | create | Route entry point, imports all section components |
| `src/app/fizens/layout.tsx` | create | Scoped Lenis wrapper for /fizens route |
| `src/app/fizens/fizens.css` | create | Design tokens, base styles for fizens page |

### File Ownership Notes

`src/app/layout.tsx` and `src/app/globals.css` must NOT be modified — create fizens-specific files only.

---

## Implementation Guidance

### LenisProvider pattern

```tsx
// src/app/fizens/layout.tsx
import './fizens.css'
import LenisProvider from './LenisProvider'

export default function FizensLayout({ children }: { children: React.ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>
}
```

```tsx
// inline in layout.tsx or separate LenisProvider.tsx
'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true })
    return () => lenis.destroy()
  }, [])
  return <>{children}</>
}
```

### Font loading pattern

```tsx
import { Geist, Poppins } from 'next/font/google'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', weight: ['400','700'] })
const poppins = Poppins({ subsets: ['latin'], variable: '--font-poppins', weight: ['400','600','700'] })
```

Apply both font variables to the `.fizens-page` root div.

### Edge Cases

- Lenis `autoRaf: true` handles the rAF loop internally — don't add a manual `requestAnimationFrame` loop.
- If `Geist` is not available in `next/font/google`, use `Geist_Mono` or fall back to a system sans-serif.

---

## Boundaries

### Files You MUST NOT Touch

- `node_modules/**`
- `.next/**`
- `package-lock.json`
- `.env*`
- `out/**`
- `src/app/layout.tsx` ← critical, do not touch
- `src/app/globals.css` ← critical, do not touch

### Files Requiring Review

- `package.json` — do not modify (no new deps needed)

---

## Dependencies

### Upstream Tasks

None — this is Wave 1. Can start immediately.

### Downstream Impact

ALL other tasks (1b through 5b) depend on this task. They expect:
- `/fizens` route exists at `src/app/fizens/`
- `fizens.css` importable from `src/app/fizens/fizens.css`
- CSS variables available on `.fizens-page` wrapper

---

## Commit Guidelines

```
feat(fizens): scaffold /fizens route with Lenis wrapper and design tokens

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

Before creating PR:
- [ ] All success criteria met
- [ ] Build passes: `npm run build`
- [ ] Type check passes: `npx tsc --noEmit`
- [ ] No `never_touch` files modified
- [ ] `/fizens` loads in browser without errors
- [ ] Scroll on other routes is unaffected

---

*Generated by KARIMO Brief Writer*
*PRD: fizens-clone | Task: 1a | Wave: 1*
