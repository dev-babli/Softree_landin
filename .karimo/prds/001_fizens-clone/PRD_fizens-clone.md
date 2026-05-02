---
feature_name: "Fizens Clone"
feature_slug: "fizens-clone"
owner: "dev-babli"
status: "ready"
created_date: "2026-05-02"
target_date: ""
phase: "Phase 1"
scope_type: "new-feature"
github_project: ""
links:
  - "https://fizens.framer.ai/"
  - "src/app/fizens/fizens.html"
checkpoint_refs: []
cross_feature_blockers: []
---

## 1. Executive Summary

**One-liner:** A standalone pixel-perfect Next.js clone of fizens.framer.ai at the `/fizens` route, including all 12 sections with Lenis smooth-scroll and per-section reveal animations.

**What's changing:** No `/fizens` route exists today. After this ships, `softree.com/fizens` renders a full 12-section finance SaaS marketing page that visually matches the fizens Framer template with equivalent scroll animations.

**Who it's for:** SOFTREE portfolio/demo viewers — stakeholders and prospects who visit the fizens route to see frontend capability.

**Why now:** Demonstrates pixel-perfect implementation skill and serves as a live frontend showcase in the SOFTREE project.

**Done looks like:** Opening `/fizens` in a browser shows the exact fizens design — navbar, hero, bento grid, features, benefit, statistics, how it works, pricing, blog, FAQ, CTA, and footer — all responsive on desktop and mobile, with smooth Lenis scroll and section entrance animations matching the reference.

**Primary risk:** The fizens bento grid and statistics counter animations are the most complex pieces — risk of visual drift from reference if not carefully matched to the HTML source.

---

## 2. Problem & Context

**Problem statement:** SOFTREE has no standalone showcase page demonstrating pixel-perfect frontend cloning from a Framer reference design.

**Supporting data / evidence:** Reference HTML available at `src/app/fizens/fizens.html` (2MB Framer export). Live reference: https://fizens.framer.ai/

**What happens if we don't build this:** No frontend showcase page; portfolio gap.

**Strategic fit:** Demonstrates frontend fidelity to prospects and validates the team's ability to translate Framer/no-code designs into production Next.js code.

---

## 3. Goals, Non-Goals & Success Metrics

### Goals

1. All 12 fizens sections implemented as React components at `/fizens`
2. Lenis smooth scroll + per-section CSS transform/opacity reveal animations matching the fizens reference
3. Fully responsive — desktop (1440px) and mobile (375px) layouts

### Non-Goals

- SOFTREE branding replacement (original fizens copy kept as-is)
- Backend/data integration (all content is static)
- CMS or editable content
- Blog articles that link anywhere
- App store download buttons that function

### Success Metrics

| Metric | Baseline | Target | How Measured |
| ------ | -------- | ------ | ------------ |
| Sections implemented | 0/12 | 12/12 | Visual QA against reference |
| Scroll animations | None | Per-section reveals | Manual browser test |
| Mobile responsive | N/A | No layout breaks at 375px | Browser DevTools |
| Build passes | N/A | `npm run build` exits 0 | CI / local |

---

## 4. Requirements

### Must Have (blocks launch)

| ID | Requirement | Acceptance Criteria |
| -- | ----------- | ------------------- |
| R1 | `/fizens` route renders without errors | `npm run build` succeeds; page loads in browser |
| R2 | All 12 sections present and visually match reference | Side-by-side QA passes — layout, colors, typography |
| R3 | Lenis smooth scroll initialized on `/fizens` only | Scroll feels smooth; does not affect other routes |
| R4 | Per-section entrance animations (opacity + translate-y) | Sections animate in on scroll, matching fizens timing |
| R5 | Desktop responsive (1440px) | No layout breaks, matches reference width |
| R6 | Mobile responsive (375px) | All sections readable, no overflow, stacked layouts |

### Should Have (important, not blocking)

| ID | Requirement | Acceptance Criteria |
| -- | ----------- | ------------------- |
| R7 | Statistics section uses animated counter (count-up on enter viewport) | Numbers animate from 0 to final value on scroll |
| R8 | FAQ uses accordion interaction (open/close) | Click expands answer; only one open at a time |
| R9 | Navbar sticky on scroll | Navbar stays at top; background appears on scroll |

### Could Have (nice to have, cut first)

| ID | Requirement | Acceptance Criteria |
| -- | ----------- | ------------------- |
| R10 | Pricing card hover effects | Cards lift/highlight on hover |
| R11 | Blog card hover effects | Cards scale slightly on hover |

---

## 5. UX & Interaction Notes

**Design references:**
- Live: https://fizens.framer.ai/
- HTML export: `src/app/fizens/fizens.html`

**Color palette:**
- `#0040c1` — Primary brand blue (buttons, logo, accents)
- `#2970ff` — Secondary bright blue (highlights)
- `#d1e0ff` — Light blue borders
- `#eff4ff` — Light blue section backgrounds
- `#171717` — Primary text
- `#6b7280` — Secondary/caption text
- `#ffffff` — White backgrounds

**Typography:**
- Geist (primary UI font — already on Google Fonts)
- Poppins (headings)
- Inter (body text fallback)

**Animation pattern (per section):**
```css
/* Initial state */
opacity: 0;
transform: translateY(32px);

/* Triggered on scroll enter */
opacity: 1;
transform: none;
transition: opacity 0.6s ease, transform 0.6s ease;
```
Use Lenis for smooth scroll, GSAP ScrollTrigger or IntersectionObserver for triggers.

**Section layout summary:**
1. **Navbar** — sticky, logo left, nav center, CTA right, mobile hamburger
2. **Hero** — centered headline + subtext, two CTA buttons, dashboard preview image below
3. **Features Bento** — pill badge label, H2 heading, asymmetric bento grid (2 large + 4 small cards)
4. **More Features** — 3-column feature icon cards with descriptions
5. **Benefit** — 2-col layout: left text/bullets, right illustration/mockup
6. **Statistics** — 4 stat counters with labels on dark/gradient background
7. **How It Works** — numbered steps, 3-4 steps with icons
8. **Pricing** — 3-tier cards (Free/Pro/Enterprise), feature checkmarks
9. **Blog** — 3 article cards with category, title, date, excerpt
10. **FAQ** — accordion with 6-8 Q&A pairs
11. **CTA Card** — full-width card with gradient bg, headline, two buttons
12. **Footer** — logo, nav columns, social icons, legal line

**Responsive:**
- Breakpoints: 375px (mobile), 768px (tablet), 1280px+ (desktop)
- Bento grid collapses to single column on mobile
- Pricing cards stack vertically on mobile
- Navbar collapses to hamburger on mobile (≤768px)

**Accessibility:**
- FAQ accordion keyboard navigable
- All images have alt text
- Color contrast meets WCAG AA for text

---

## 6. Dependencies & Risks

### Cross-Feature Blockers

_None — this is a standalone route._

### External Blockers

| Blocker | Status | Fallback |
| ------- | ------ | -------- |
| fizens.html reference file | Ready (on disk) | Live URL fallback |

### Internal Dependencies

- `lenis` v1.3.23 — already installed
- `gsap` v3.15.0 — already installed
- `src/components/ui/accordion.tsx` — reuse for FAQ section
- Next.js App Router — `src/app/fizens/` route structure

### Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
| ---- | ---------- | ------ | ---------- |
| Bento grid pixel drift from reference | Med | Med | Reference fizens.html inline styles directly |
| Lenis conflicts with existing scroll on other routes | Low | High | Scope Lenis init to fizens layout.tsx only |
| Image assets not available | Med | Low | Use placeholder gradients/SVGs where Framer images fail to load |

---

## 7. Rollout Plan

**Phase/level:** Phase 1 — new standalone route, no changes to existing pages.

**Deployment strategy:** Direct merge to main. Route is additive only — zero risk to existing routes.

**Rollback plan:** Delete `src/app/fizens/` directory. No other files affected.

**Monitoring:** Manual visual QA on `/fizens` after deploy.

---

## 8. Milestones & Release Criteria

| Milestone | What's True When Done | Target Date |
| --------- | --------------------- | ----------- |
| Foundation | `/fizens` route builds and renders blank page | Task 1a |
| Sections complete | All 12 sections render with correct static content | Tasks 1b–4a |
| Animations | Lenis + per-section reveals working | Task 5a |
| Ship-ready | Responsive, build passes, visual QA done | Task 5b |

**Release criteria:**
- `npm run build` exits 0
- `npx tsc --noEmit` exits 0
- `npm run lint` exits 0
- All 12 sections visible at 1440px and 375px
- Scroll animations trigger correctly
- No console errors on page load

---

## 9. Open Questions

| # | Question | Status | Resolution |
| - | -------- | ------ | ---------- |
| Q1 | Should Geist font be loaded via next/font or CDN? | Resolved | Use `next/font/google` for performance |
| Q2 | Should the bento grid use CSS Grid or a library? | Resolved | CSS Grid (matches fizens native grid) |

---

## 10. Checkpoint Learnings

**Patterns to reinforce:**
- Use `"use client"` only on components that need browser APIs (Lenis, IntersectionObserver)
- Keep layout.tsx minimal; mount Lenis in a client wrapper

**Anti-patterns to avoid:**
- Don't initialize Lenis globally — scope to fizens layout only
- Don't import framer-motion for simple opacity/translate animations — use CSS transitions or GSAP

---

## 11. Agent Boundaries

**Files the agent should reference for patterns:**
- `src/components/ui/accordion.tsx` — reuse for FAQ
- `src/app/about-us/hero.tsx` — reference for section structure pattern
- `src/app/globals.css` — check existing CSS variable conventions

**Files the agent should NOT touch:**
- `src/app/layout.tsx` — root layout, do not modify
- `src/app/globals.css` — do not modify, create fizens-specific styles in `src/app/fizens/fizens.css`
- `package.json` — no new dependencies needed
- Any existing page routes

**Architecture decisions already made:**
- Route: `src/app/fizens/page.tsx` (App Router)
- Lenis scoped to `src/app/fizens/layout.tsx`
- Section components colocated in `src/app/fizens/` (not in shared components)
- No shared component reuse except `accordion.tsx` for FAQ

**Known gotchas:**
- Lenis v1.3.x API: use `new Lenis()` + `raf` loop, not the older `@studio-freight` API
- fizens.html uses Framer-specific class names — don't copy them, build clean semantic HTML

---

## Research Findings

**Reference site:** https://fizens.framer.ai/
**HTML export:** `src/app/fizens/fizens.html`

### Implementation Context

**Design system extracted from fizens.html:**
- Primary font: Geist (400, 700)
- Secondary font: Poppins (headings), Instrument Sans (alt)
- Brand blue: `#0040c1`, Accent blue: `#2970ff`
- Pill badge pattern: rounded-full, border, icon + label text
- CTA buttons: `border-radius: 1000px` (fully rounded pill)
- Section entry animation: `opacity: 0 → 1`, `translateY(32px → 0)`, 0.6s ease
- Lenis autoToggle class on `<html>`: `class="lenis lenis-autoToggle"`

**Reusable internal patterns:**
- `src/components/ui/accordion.tsx` — Radix-based, reuse directly for FAQ

---

## Agent Tasks

> See `./tasks.yaml` for full task definitions.
> See `./execution_plan.yaml` for wave-based execution order.

**Task Summary:**

| ID | Title | Complexity | Priority | Dependencies |
|----|-------|------------|----------|--------------|
| 1a | Route setup, Lenis wrapper, design tokens | 3 | must | — |
| 1b | Navbar component | 3 | must | 1a |
| 2a | Hero section | 4 | must | 1a |
| 2b | Features Bento Grid section | 5 | must | 1a |
| 2c | More Features + Benefit sections | 4 | must | 1a |
| 3a | Statistics + How It Works sections | 4 | must | 1a |
| 3b | Pricing section | 4 | must | 1a |
| 3c | Blog + FAQ sections | 3 | must | 1a |
| 4a | CTA Card + Footer | 3 | must | 1a |
| 5a | Scroll animations (Lenis + GSAP reveals) | 5 | must | 1b,2a,2b,2c,3a,3b,3c,4a |
| 5b | Responsive polish + visual QA | 4 | must | 5a |

**Total:** 11 tasks · 42 complexity points

---

*Generated by [KARIMO v9.9.1](https://github.com/opensesh/KARIMO)*
