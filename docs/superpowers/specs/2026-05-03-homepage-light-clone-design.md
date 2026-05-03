# Homepage Light Clone — Design Spec
**Date:** 2026-05-03  
**Status:** Approved  

---

## Goal

Create a new `/homepage-light` page that renders the full Softree homepage in the warm light theme (Mistral/Mastercard design system). All 23 currently-live dark homepage components are cloned into `src/components/homepage-light-clone/`, re-themed for light, with `CubeScrollGallery` dropped. All GSAP scroll mechanics are preserved.

---

## Route

| Item | Value |
|------|-------|
| New route | `/homepage-light` |
| Page file | `src/app/homepage-light/page.tsx` |
| Components folder | `src/components/homepage-light-clone/` |
| Nav | Reuse `LightNav` from `src/components/homepage-light/LightNav.tsx` (no clone) |
| Tokens | `src/components/homepage-light-clone/tokens.ts` re-exports from `src/components/homepage-light/tokens.ts` |

---

## Component Map

Each file in `homepage-light-clone/` is a light-themed clone of the corresponding dark source:

| New file | Source component | Source path |
|---|---|---|
| `LCHero.tsx` | `TransferredSoftreeHero` | `homepage/` |
| `LCVirtualOffice.tsx` | `VirtualOfficeSection` | `brilliance/` |
| `LCGlobalShowcase.tsx` | `SoftreeGlobalShowcase` | `homepage/` |
| `LCMirrorOps.tsx` | `MirrorContentOpsSection` | `homepage/` |
| `LCServicePicker.tsx` | `SoftreeServicePicker` | `homepage/` |
| `LCHowItWorks.tsx` | `HowItWorksSection` | `optimus/landing/` |
| `LCStackedSlides.tsx` | `ServicesStackedSlides` | `homepage/` |
| `LCPinnedShowcase.tsx` | `PinnedShowcaseSection` | `homepage/` |
| `LCWhySoftree.tsx` | `WhySoftreeSection` | `homepage/` |
| `LCEnterpriseCards.tsx` | `HeroEnterpriseCards` | `brilliance/` |
| `LCTestimonials.tsx` | `TestimonialsSection` | `brilliance/` |
| `LCIndustries.tsx` | `SoftreeIndustriesSection` | `homepage/` |
| `LCSecurity.tsx` | `SecuritySection` | `optimus/landing/` |
| `LCMidCTA.tsx` | `SoftreeMidCTA` | `homepage/` |
| `LCForDevelopers.tsx` | `ForDevelopersSection` | `homepage/` |
| `LCCodePath.tsx` | `HorizontalCodePathSection` | `homepage/` |
| `LCVerticalCodePath.tsx` | `VerticalCodePathSection` | `homepage/` |
| `LCStackTabs.tsx` | `SoftreeStackTabs` | `homepage/` |
| `LCComposio.tsx` | `SoftreeComposioSection` | `homepage/` |
| `LCBlog.tsx` | `SoftreeBlogSection` | `homepage/` |
| `LCFAQ.tsx` | `FAQSection` | `brilliance/` |
| `LCCTA.tsx` | `SoftreeCTASection` | `shared/` |
| `LCFooter.tsx` | `TogetherFooter` | `homepage/` |

**Dropped:** `CubeScrollGallery` — removed entirely, no clone created.

---

## Light Theme Color Mapping

Applied consistently across all 23 clones:

| Dark value | Light replacement | Token |
|---|---|---|
| `#000`, `#050505`, `bg-black` | `#F3F0EE` | `color.canvas` |
| `#0a0a0a`, `#080808`, `bg-neutral-950` | `#FCFBFA` | `color.lifted` |
| `text-white`, `#ffffff` body text | `#141413` | `color.ink` |
| `text-white/60`, muted text | `#696969` | `color.slate` |
| `white/10` borders | `#D1CDC7` | `color.dustTaupe` |
| Blue/purple glow accents | Flame `#fb6424` / Amber `#ffa110` | `color.flame` / `color.sunshine` |
| Dark glassmorphism cards | Golden shadow cards + `#FCFBFA` bg | `shadow.golden` |
| Dark grain overlay | Warm grain on cream via `Grainient` | Grainient component |
| White pill CTAs on dark | Ink-black pill CTAs on light | `InkPill` from primitives |
| Dark syntax code blocks | Ink-on-ivory syntax, amber highlights | Inline |

`ServicesStackedSlides` slide tones remapped:
- `"light"` → cream surface
- `"dark"` → lifted + ink
- `"ember"` → flame gradient
- `"violet"` → gold gradient

---

## Page Structure & Conversion Order

Sections ordered for discovery → proof → action conversion flow:

```
01. LCHero               — Hook + primary CTA above fold (+ secondary "See our work")
02. LCVirtualOffice      — Team credibility signal
03. LCStackedSlides      — Scroll through 5 service phases
04. LCServicePicker      — Interactive self-segmentation
05. LCHowItWorks         — Process reassurance
06. LCGlobalShowcase     — Global scale proof
07. LCMirrorOps          — Capabilities depth grid
08. LCWhySoftree         — Differentiation
09. LCEnterpriseCards    — Enterprise trust signals
10. LCTestimonials       — Client social proof
11. LCIndustries         — "Is this for me?" relevance
12. LCPinnedShowcase     — Delivery process assurance
13. LCForDevelopers      — Technical credibility
14. LCCodePath           — Tech depth (horizontal pinned scroll)
15. LCVerticalCodePath   — Tech depth continuation
16. LCMidCTA             — Mid-page lead capture
17. LCStackTabs          — Tech stack transparency
18. LCComposio           — Integration ecosystem
19. LCSecurity           — Risk removal / compliance
20. LCBlog               — Thought leadership / authority
21. LCFAQ                — Objection handling
22. LCCTA                — Close: book a call / start project (flame gradient bg)
23. LCFooter             — Navigation out
```

---

## Conversion Optimizations Applied During Re-theme

1. **Hero** — add secondary CTA ("See our work" → scrolls to LCStackedSlides)
2. **LCCTA** — use flame gradient background (`color.flame` → `color.mistral`) for energy, not neutral dark
3. **LCMidCTA** — elevated to position 16, after all social proof sections have landed
4. **LCNav** — reused from existing `LightNav` (floating pill style, already conversion-optimized)

---

## What Is NOT Changed

- All GSAP `ScrollTrigger` logic, pinning, scrub values, and timeline sequences — preserved exactly
- All lazy-loading `DeferUntilInView` wrappers — preserved in the new page
- All animation entrance timings — preserved
- All copy/text content — preserved (only visual layer changes)
- All asset paths (`/hero/`, `/gif_assetsforservices/`, etc.) — preserved

---

## Out of Scope

- Modifying any existing dark homepage component files
- Converting components in `homepage/` that are NOT currently used in `Homepage.tsx`
- Dark/light mode toggle — this is a standalone light page, not a theme switch
