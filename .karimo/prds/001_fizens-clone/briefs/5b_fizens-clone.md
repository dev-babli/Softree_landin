# Task Brief: 5b

**Title:** Responsive polish + visual QA
**PRD:** fizens-clone
**Priority:** must
**Complexity:** 4/10
**Model:** sonnet
**Wave:** 6

---

## Objective

Final polish pass — verify every section renders correctly at 375px (mobile), 768px (tablet), and 1440px (desktop). Fix any layout breaks, font scaling issues, overflow, or animation timing that drifts from the fizens reference. Run a side-by-side visual comparison against `https://fizens.framer.ai/` and ship.

---

## Context

**Parent Feature:** Fizens Clone — pixel-perfect standalone clone of https://fizens.framer.ai/

This task is **Wave 6** — the last wave before merge. By the time it starts, every section is built (1b–4a) and animated (5a). The only work here is polish and verification.

---

## Research Context

### Patterns to Follow

- **Responsive convention:** Mobile-first media queries in `fizens.css`. Breakpoints: `(min-width: 768px)` for tablet, `(min-width: 1280px)` for desktop.
- **Reference site:** Open https://fizens.framer.ai/ in a second browser window and resize side-by-side with `localhost:3000/fizens`.

### Recommended Approach

- Use Chrome DevTools device toolbar to test 375px, 768px, 1024px, 1280px, 1440px.
- Pay special attention to: bento grid collapse, pricing cards stacking, navbar mobile menu, footer column reflow, hero image scaling, stat counter font size.
- Verify animation timings still feel right at smaller widths — sometimes `top 85%` triggers feel late on mobile; switch to `top 90%` if needed.

---

## Requirements

1. **Mobile (375px) sweep:**
   - No horizontal scroll anywhere.
   - All headings readable (no text overflow).
   - Bento grid: single column.
   - Pricing: cards stacked, recommended tier still visually distinct.
   - Footer: 2×2 columns at small tablet, 1 col at 375px.
   - Navbar: hamburger menu opens overlay; overlay scrolls if content is long.
2. **Tablet (768px) sweep:**
   - Bento: 2-column.
   - Footer: 4 columns or 2×2 (whichever fizens uses).
   - More Features: 2- or 3-column.
3. **Desktop (1440px) sweep:**
   - Matches fizens reference layout for every section.
   - Container max-width is consistent (typically 1280px content).
4. **Animation polish:**
   - Reveal animations don't fire prematurely at the bottom of the page (last section near footer).
   - Stat counters complete count-up cleanly.
5. **Build & lint pass:**
   - `npm run build` exits 0.
   - `npx tsc --noEmit` exits 0.
   - `npm run lint` exits 0 (warnings ok).
6. **Console clean:**
   - No errors in browser console on load.
   - No 404s for assets.
7. **Cross-browser smoke test:**
   - Test at least once in Chrome, then once in another modern browser (Edge or Firefox) for layout/animation parity.

---

## Success Criteria

- [ ] No horizontal scroll at 375px on any section
- [ ] All sections readable and correctly laid out at 375px, 768px, 1280px, 1440px
- [ ] Bento grid collapses 6→3→2→1 across breakpoints
- [ ] Pricing cards stack on mobile with recommended tier still highlighted
- [ ] Navbar mobile menu opens/closes cleanly
- [ ] Footer columns reflow correctly
- [ ] Stat counters complete cleanly
- [ ] No console errors on `/fizens` page load
- [ ] `npm run build`, `npx tsc --noEmit`, `npm run lint` all pass
- [ ] Visual comparison against fizens.framer.ai shows no major divergence

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/app/fizens/fizens.css` | modify | Tweak responsive breakpoints, font scales |
| Any `src/app/fizens/Fizens*.tsx` | modify (if needed) | Fix individual layout issues |

---

## Implementation Guidance

### QA Workflow

1. Run `npm run dev` and open `http://localhost:3000/fizens`.
2. DevTools → Toggle device toolbar → step through 375 → 414 → 768 → 1024 → 1280 → 1440.
3. For each width, scroll top-to-bottom and note issues:
   - layout breaks, horizontal scroll, text overflow, image aspect issues
4. Fix issues in `fizens.css` first (preferred), only edit component TSX if structure is wrong.
5. Re-run `npm run build` and `npx tsc --noEmit` after each batch of fixes.

### Common Mobile Fixes

```css
/* fizens.css */
@media (max-width: 767px) {
  .fizens-hero h1 { font-size: clamp(2rem, 8vw, 3rem); line-height: 1.1; }
  .fizens-bento-grid { grid-template-columns: 1fr; }
  .fizens-pricing-grid { grid-template-columns: 1fr; gap: 16px; }
  .fizens-footer-columns { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .fizens-footer-columns { grid-template-columns: 1fr; }
}
```

### Edge Cases

- Hero dashboard image may need `max-width: 100%; height: auto` or aspect-ratio lock to prevent overflow.
- If reveal animations cause horizontal scroll on mobile, add `overflow-x: hidden` to `.fizens-page` wrapper.
- Test with browser zoom at 125% — many devices ship that way.

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
| 5a   | Animated, fully assembled page |
| 1b–4a | Every section component |

### Downstream Impact

- This is the last wave. Approval here means the PRD ships.

---

## Commit Guidelines

```
fix(fizens): responsive polish across breakpoints + final visual QA

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npm run build` exits 0
- [ ] `npx tsc --noEmit` exits 0
- [ ] `npm run lint` exits 0
- [ ] Visual comparison against fizens.framer.ai is clean
- [ ] No console errors

---

*Generated by KARIMO Brief Writer*
*PRD: fizens-clone | Task: 5b | Wave: 6*
