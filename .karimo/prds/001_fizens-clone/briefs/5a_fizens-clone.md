# Task Brief: 5a

**Title:** Scroll animations — Lenis + per-section reveals
**PRD:** fizens-clone
**Priority:** must
**Complexity:** 5/10
**Model:** opus
**Wave:** 5

---

## Objective

Wire scroll-triggered entrance animations across every fizens section: each major block fades in (`opacity 0→1`) and slides up (`translateY 32px→0`) when it enters the viewport, with staggered children where fizens does (bento cards, pricing tiers, blog cards, stat counters). Integrate GSAP `ScrollTrigger` with the existing Lenis instance via `scrollerProxy` so scroll-driven animations feel buttery and stay perfectly in sync.

---

## Context

**Parent Feature:** Fizens Clone — pixel-perfect standalone clone of https://fizens.framer.ai/

This task is **Wave 5** — runs after every section is built (1b, 2a, 2b, 2c, 3a, 3b, 3c, 4a). It is the polish pass that turns a static page into the fizens-feel page.

---

## Research Context

### Patterns to Follow

- **Lenis + GSAP integration:** The official pattern is to register `ScrollTrigger`, set `scrollerProxy(document.body, { ... })` with Lenis values, then bridge `lenis.on('scroll', ScrollTrigger.update)` and drive `gsap.ticker` from Lenis raf. Reference the GSAP skill `gsap-scrolltrigger` and `gsap-plugins`.
- **Reveal pattern:** Use `gsap.from()` inside `useGSAP` (or `useEffect` with cleanup) with `scrollTrigger: { trigger, start: 'top 85%', toggleActions: 'play none none none' }`. Initial CSS state must be `opacity: 0; transform: translateY(32px)` to avoid FOUC before JS hydrates.
- **Stagger pattern:** For card grids, target the children selector and pass `stagger: 0.08`.

### Recommended Approach

- Centralize the Lenis ↔ GSAP bridge inside `LenisProvider` (created in 1a). Expose nothing — the bridge is internal.
- Each section component owns its own `useGSAP` reveal. Sections do NOT import a shared hook to keep them decoupled.
- Use `prefers-reduced-motion`: `gsap.matchMedia()` to disable the slide+fade for users who opt out.

### Dependencies

- `gsap` v3.15.0 (already installed) — core, ScrollTrigger plugin
- `@gsap/react` — check `package.json`. If present, use `useGSAP`. Otherwise, plain `useEffect` + `gsap.context()` cleanup.

---

## Requirements

1. **Lenis ↔ ScrollTrigger bridge** in `LenisProvider`:
   - Register `ScrollTrigger` plugin once.
   - On every Lenis `scroll` event, call `ScrollTrigger.update()`.
   - Add `gsap.ticker.add((time) => lenis.raf(time * 1000))` and `gsap.ticker.lagSmoothing(0)`.
   - Set `ScrollTrigger.scrollerProxy(document.body, { scrollTop, getBoundingClientRect, pinType: 'transform' })` mapped to Lenis.
   - On unmount, remove the ticker callback and kill all ScrollTriggers tagged for fizens.
2. **Per-section reveal** in every section component:
   - Wrap the section root in a ref.
   - Animate the root from `{ opacity: 0, y: 32 }` to `{ opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }`.
   - Trigger on `start: 'top 85%'`, `toggleActions: 'play none none none'` (run once, no reverse).
3. **Staggered children** for these specific sections:
   - **Bento Grid (2b):** card children stagger 0.08
   - **Pricing (3b):** 3 tier cards stagger 0.1
   - **Blog (3c):** 3 article cards stagger 0.1
   - **More Features (2c):** 3 feature cards stagger 0.08
   - **Stats (3a):** 4 counters stagger 0.1 — also kick off the count-up animation here, gated on a single `ScrollTrigger.create({ once: true })`.
4. **Reduced motion:**
   - Inside each `useGSAP` (or equivalent), call `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)` returning a no-op (immediately set final state).
5. **No FOUC:** Add base CSS class `.fizens-reveal` with `opacity: 0; transform: translateY(32px)` in `fizens.css` and apply it to every section root. GSAP overrides on mount.

---

## Success Criteria

- [ ] All 12 sections animate in on scroll (opacity + translateY)
- [ ] Lenis smooth scroll feels buttery and is perfectly synced with ScrollTrigger
- [ ] Bento, More Features, Pricing, Blog cards stagger
- [ ] Stat counters count up once when stats section enters viewport
- [ ] No animation runs on page load — only on scroll enter
- [ ] `prefers-reduced-motion: reduce` disables the slide+fade
- [ ] No layout shift / FOUC at top of page
- [ ] Other SOFTREE routes (e.g. `/`, `/about-us`) are completely unaffected
- [ ] `npm run build` and `npx tsc --noEmit` pass

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/app/fizens/LenisProvider.tsx` | modify | Add Lenis ↔ ScrollTrigger bridge |
| `src/app/fizens/fizens.css` | modify | Add `.fizens-reveal` base class |
| `src/app/fizens/FizensHero.tsx` | modify | Add reveal animation |
| `src/app/fizens/FeaturesBento.tsx` | modify | Add reveal + stagger cards |
| `src/app/fizens/MoreFeatures.tsx` | modify | Add reveal + stagger |
| `src/app/fizens/FizensBenefit.tsx` | modify | Add reveal |
| `src/app/fizens/FizensStats.tsx` | modify | Add reveal + count-up trigger |
| `src/app/fizens/FizensHowItWorks.tsx` | modify | Add reveal + step stagger |
| `src/app/fizens/FizensPricing.tsx` | modify | Add reveal + tier stagger |
| `src/app/fizens/FizensBlog.tsx` | modify | Add reveal + card stagger |
| `src/app/fizens/FizensFAQ.tsx` | modify | Add reveal |
| `src/app/fizens/FizensCTA.tsx` | modify | Add reveal |

---

## Implementation Guidance

### Lenis ↔ ScrollTrigger bridge (inside LenisProvider)

```tsx
'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((t) => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return <>{children}</>
}
```

### Per-section reveal (every section)

```tsx
'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react' // or useEffect fallback
import gsap from 'gsap'

export default function FizensHero() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 32,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      })
    })
  }, { scope: ref })
  return <section ref={ref} className="fizens-hero fizens-reveal">{/* ... */}</section>
}
```

### Stat counter count-up (3a)

```tsx
ScrollTrigger.create({
  trigger: statsRef.current,
  start: 'top 80%',
  once: true,
  onEnter: () => {
    counters.forEach((el, i) => {
      const final = Number(el.dataset.value)
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: final, duration: 2, ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate() { el.innerText = Math.round(this.targets()[0].innerText).toLocaleString() },
        delay: i * 0.1,
      })
    })
  },
})
```

### Edge Cases

- If `@gsap/react` is NOT in `package.json`, replace `useGSAP` with `useEffect` + `gsap.context()` and `ctx.revert()` in cleanup.
- Don't call `ScrollTrigger.refresh()` on mount; Lenis bridge handles it.
- For `pinType`: if any section ever pins, use `'transform'` to avoid Lenis conflicts.

---

## Boundaries

### Files You MUST NOT Touch

- `src/app/layout.tsx`, `src/app/globals.css`, `node_modules/**`, `.next/**`
- Any file outside `src/app/fizens/`

---

## Dependencies

### Upstream Tasks

| Task | What It Provides |
|------|------------------|
| 1a   | Lenis wrapper, fizens.css |
| 1b   | Navbar |
| 2a–4a | Every section component this task animates |

### Downstream Impact

- Task 5b consumes the animated page for responsive QA.

---

## Commit Guidelines

```
feat(fizens): wire Lenis + GSAP ScrollTrigger reveals across all sections

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit` passes
- [ ] DevTools "Reduce motion" toggled → no slide animations play
- [ ] Other routes (e.g. `/`) scroll exactly as before

---

*Generated by KARIMO Brief Writer*
*PRD: fizens-clone | Task: 5a | Wave: 5*
