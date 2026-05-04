# Task Brief: 2b

**Title:** Features Bento Grid section
**PRD:** fizens-clone
**Priority:** must
**Complexity:** 5/10
**Model:** opus
**Wave:** 2

---

## Objective

Build the fizens features bento grid section — an asymmetric CSS Grid layout with 6 feature cards (2 large + 4 small) under the heading "Explore Our Standout Features". This is the most visually complex section and must match the fizens reference precisely.

---

## Context

**Parent Feature:** Fizens Clone — pixel-perfect standalone clone of https://fizens.framer.ai/

This task is part of **Wave 2** — runs in parallel with 1b (Navbar) and 2a (Hero). It is the highest-complexity wave-2 task due to the asymmetric bento grid layout. Uses CSS Grid, NOT a flex layout or grid library.

---

## Research Context

### Patterns to Follow

- **Bento grid pattern from fizens:** Uses CSS Grid with `grid-template-columns` and `grid-template-rows` to place cards spanning multiple columns/rows. Large cards span 2 columns or 2 rows.
- **Card style from fizens:** `border: 1px solid var(--fizens-blue-light-border); border-radius: 16px; background: var(--fizens-blue-faint) or white; padding: 24px–32px`.
- **Pill badge** same as hero: `id="features"` section, pill badge "Key Features" above H2.

### Recommended Approach

- Desktop grid: 3 columns. Card 1 = spans col 1-2, row 1. Card 2 = col 3, rows 1-2. Cards 3-5 = individual cells. Card 6 = spans col 1-2, row 3. (Match fizens visual exactly.)
- Tablet (768px): 2 columns, all cards single-span.
- Mobile (375px): 1 column, all cards stacked.
- Each card: icon (SVG or emoji placeholder), bold title, gray description text.

---

## Requirements

1. Section `id="features"`.
2. Pill badge: "Key Features" with icon.
3. H2: "Explore Our Standout Features" — Poppins bold.
4. Subtext below H2.
5. Bento grid with 6 feature cards. Content for each:
   - Card 1 (large): "Smart Analytics" — track spending patterns
   - Card 2 (tall): "Instant Transfers" — send money in seconds
   - Card 3: "Budget Planner" — set goals & stick to them
   - Card 4: "Bill Reminders" — never miss a payment
   - Card 5: "Multi-Currency" — manage global accounts
   - Card 6 (wide): "Bank-Grade Security" — 256-bit encryption
6. Each card has: icon (SVG or `<span>` emoji), title (Poppins semibold), description (Geist, gray).
7. Cards have subtle hover: `box-shadow: 0 4px 16px rgba(0,64,193,0.08); transform: translateY(-2px)` transition on hover.

---

## Success Criteria

- [ ] Pill badge + H2 heading + subtext present
- [ ] 6 feature cards render in asymmetric bento grid at 1440px
- [ ] Card 1 spans 2 columns (wide card)
- [ ] Card 2 spans 2 rows (tall card)
- [ ] Card 6 spans 2 columns (wide card at bottom)
- [ ] Grid collapses to 2-col at 768px, 1-col at 375px
- [ ] Card styling: border, border-radius, background match fizens reference
- [ ] Hover effect works on cards
- [ ] No TypeScript errors

---

## Files to Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/app/fizens/FeaturesBento.tsx` | create | Bento grid section component |
| `src/app/fizens/page.tsx` | modify | Import and render `<FeaturesBento />` after hero |

---

## Implementation Guidance

### CSS Grid layout

```css
.fizens-bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 16px;
}

.fizens-bento-card-wide { grid-column: span 2; }
.fizens-bento-card-tall { grid-row: span 2; }

@media (max-width: 768px) {
  .fizens-bento-grid { grid-template-columns: repeat(2, 1fr); }
  .fizens-bento-card-wide, .fizens-bento-card-tall {
    grid-column: span 1;
    grid-row: span 1;
  }
}
@media (max-width: 480px) {
  .fizens-bento-grid { grid-template-columns: 1fr; }
}
```

### Card arrangement in JSX

```tsx
<div className="fizens-bento-grid">
  <div className="fizens-bento-card fizens-bento-card-wide">...</div> {/* Card 1 */}
  <div className="fizens-bento-card fizens-bento-card-tall">...</div> {/* Card 2 */}
  <div className="fizens-bento-card">...</div> {/* Card 3 */}
  <div className="fizens-bento-card">...</div> {/* Card 4 */}
  <div className="fizens-bento-card">...</div> {/* Card 5 */}
  <div className="fizens-bento-card fizens-bento-card-wide">...</div> {/* Card 6 */}
</div>
```

### Edge Cases

- At 768px, the tall and wide cards lose their span — verify no overlap or empty grid cells.
- Use `min-height: 160px` on cards so short content cards don't collapse.
- Icons: use Unicode emoji (💳 🔄 📊 🔔 🌍 🔒) as placeholders if no SVG assets.

---

## Boundaries

### Files You MUST NOT Touch

- `src/app/layout.tsx`, `src/app/globals.css`, `node_modules/**`, `.next/**`

---

## Dependencies

### Upstream Tasks

| Task | What It Provides | Verify Before Starting |
|------|------------------|------------------------|
| 1a | Route, `fizens.css` CSS variables | `src/app/fizens/fizens.css` exists |

### Downstream Impact

Task 5a adds staggered card entrance animations to this section. Ensure each `.fizens-bento-card` is individually targetable (has its own element, not nested inside a single wrapper that hides children).

---

## Commit Guidelines

```
feat(fizens): add features bento grid section with asymmetric CSS grid layout

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Validation Checklist

- [ ] All success criteria met
- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit` passes
- [ ] Bento grid renders correctly at 1440px, 768px, 375px
- [ ] No horizontal overflow at any breakpoint

---

*Generated by KARIMO Brief Writer*
*PRD: fizens-clone | Task: 2b | Wave: 2*
