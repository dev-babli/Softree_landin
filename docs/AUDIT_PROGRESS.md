# Softree Homepage — Audit Implementation Progress

**Last updated:** 2026-05-09

This document tracks what's been implemented from the comprehensive audit, and what's flagged for follow-up.

---

## ✅ Implemented

### Site-wide SEO/AEO infrastructure
- **`public/robots.txt`** — explicit allow for AI crawlers (GPTBot, Claude-Web, PerplexityBot, Google-Extended, ClaudeBot, OAI-SearchBot), block dev/preview routes, sitemap reference
- **`public/llms.txt`** — emerging 2026 standard, plain-text site description for LLM crawlers
- **`src/app/sitemap.ts`** — Next.js MetadataRoute sitemap with 15 routes and proper priorities
- **`src/app/not-found.tsx`** — branded 404 page (cream bg, Emil-grade buttons with `:active` scale)
- **`src/app/error.tsx`** — branded error boundary with reset action
- **`src/app/loading.tsx`** — branded loading state
- **`src/app/layout.tsx`**:
  - `metadataBase` fixed (`softree.com` → `softree.in`)
  - `og:image` + Twitter `images` added (NB: actual `/og-image.png` asset still needs to be created in `public/`)
  - **Organization JSON-LD** for AI search and Google Knowledge Panel
  - **WebSite JSON-LD** with SearchAction for Google sitelinks search box
  - Body bg fixed (`#141414` dark → `#F3F0EE` cream — matches homepage, no FOUC)
  - **Dev tooling gated** to `process.env.NODE_ENV === "development"` (`VisualEditsMessenger`, `ErrorReporter`, `route-messenger`, `orchids-browser-logs` no longer ship in production)

### Component fixes

| # | Component | What changed |
|---|---|---|
| 1 | `SoftreeCohereNav` | 9 broken `/case-studies/*` links → real `/services/*` routes; CTA pill upgraded to brand orange (`#FF6B00`) with Emil-grade `active:scale-[0.97]`; CTA copy `Start a project` → `Book a 15-min call →` |
| 2 | `TransferredSoftreeHeroToolkit` | Visible-immediately entrance (`opacity: 0` → `0.3`, `y: 60` → `12` — no LCP empty gap); scarcity line `Available for 2 new projects · Q2 2026` with orange dot under H1; CTA copy `Get Started Free` → `Book a 15-min call`; CTA href `/services` → `/contact` |
| 3 | `SoftreeServicesHero` | Generic `We Build Digital Solutions` → specific `From idea to live product in 12 weeks`; cycling word delay 2.6s → 3.4s (gives reading time) |
| 4 | `LightAboutMerged` | Animated numbers start at 60% of target instead of 0 (no subliminal "0 clients" flash); CTA copy `READ MORE` → `See our case studies` |
| 5 | `LightStackedSlides` | Each phase now has an `output` field with specific deliverable + timing (e.g., `Output: signed scope + fixed price · within 5 business days`), rendered as a tabular-num pill above outcomes |
| 6 | `CoreFeatures` | Hyperbolic `Master the Market with Softree` → specific `What we ship to production`; side card opacity `0.55` → `0.7` and blur `5px` → `3px` (readable) |
| 7 | `LightServicesStickyList` | Generic `Branding · Development · Websites · Design` → buyer-job names `Ship a Web App · Build Power Platform Automations · Modernize SharePoint · Stand up Data + BI`; added `price` field per service (`From ₹X · 6-week MVP`) rendered as orange tabular-num pill |
| 8 | `LightFAQExact` | Template `Arooth` FAQs → real Softree objection-handling FAQs (5 questions: what we build, timeline, fixed-price guarantee, IP ownership, security/compliance); each answer 30-50 words for AEO extraction; **FAQPage JSON-LD** added with `dateModified` for AI freshness signal |
| 9 | `LightContactSection` | Phone: required → optional (was killing 30-40% of submits); Message: optional → required + actionable placeholder; CTA copy `Submit` → `Send & book a 15-min call`; honeypot `website` field added for spam protection |
| 10 | `LightHowWeWork` | Generic agency copy → Softree-specific (mentions fixed scope, weekly demos, 47-day median, code in your repo); each step gets `Avg duration` pill (5 days, 1 week, 2 weeks, 6–8 weeks) for B2B predictability |
| 11 | `SoftreeFooter` | Service links updated to deep-link to actual `/services/*` routes (was generic `/services` everywhere); broken `/case-studies` → `/services` |

---

## ⚠ Flagged for follow-up (require larger scope or external assets)

### High-impact (do these first)

1. **Create `public/og-image.png`** — 1200×630 social preview image. The metadata references it but the file doesn't exist yet. Without it, social shares (Twitter, LinkedIn, WhatsApp, Slack) will show a broken image. **Single biggest brand-visibility quick fix.**

2. **Convert `Homepage.tsx` from `"use client"` to a Server Component with selective `'use client'` per section.** This single change would:
   - Halve LCP
   - Make all 22 sections' content visible to AI/search crawlers in initial HTML
   - Drop ~60-100kb from the initial JS bundle
   - Enable React 19 streaming via Suspense boundaries
   - Estimated effort: ~4 hours

3. **Embed an agentic AI demo in the hero.** A textarea where prospects type their problem and a streamed AI response gives a back-of-envelope scope estimate. For an AI-services agency, this is the single biggest credibility move possible. ~6 hours with OpenAI streaming + a system prompt.

4. **Add a client-logo strip** below the hero buttons. 5 grayscale client logos at 32px height. Audit's #1 ROI change — without proof, every claim is theory. Requires real client logo assets.

### Medium-impact

5. **Kill duplicate sections.** Currently 22 sections, ~5 duplicate (LightAboutMerged + LightCreativeImpact, LightStackedSlides + LightHowWeWork, CoreFeatures + LightOverviewBento + LightExpertiseAccordion, LightTestimonialGrid + GlobalTestimonialsSection). Removing duplicates cuts page length ~40% and bundle ~150kb.

6. **Replace `LightTestimonialGrid` testimonials with real ones** + add company logos and star ratings. Or replace with a Clutch/G2 reviews widget for third-party validation.

7. **Industries → industry-specific landing pages** (`/industries/finance`, `/industries/healthcare`, etc.). Industry-specific landing pages convert 3-5× more from paid traffic and rank for `software development for [industry]` queries.

8. **`LightHorizontalCodePath`**: replace horizontal scroll with vertical timeline. Horizontal scroll fights browser scroll behavior; vertical timeline reads better, especially mobile.

### Low-impact (polish)

9. Promote `LightAIAgents` from position 19 to position 4-5. AI agents is the strongest differentiator for an AI agency; currently buried.

10. Replace 3 blog posts in `SoftreeBlogSection` (now a service showcase) with **lead magnet** (e.g., `Get our 12-page B2B software RFP template`). Higher conversion than blog posts.

11. **Migrate contact form to Server Actions** instead of client-side fetch. Better DX, smaller bundle, progressive enhancement.

12. **Drop AI-fingerprint design choices** site-wide:
    - AI-blue (`#1852FF`, `#6C42F5`) → keep only as ≤5% support color, lead with brand orange `#FF6B00`
    - Inter font → Geist Sans / General Sans / Cabinet Grotesk
    - Lucide icons → Phosphor or custom 2-line iconset
    - Cycling word in hero → drop entirely (Linear, Vercel, Resend all dropped these in 2025)

13. **Convert `LightFAQExact` accordion to native `<details>` elements** — JS-free, indexable by Google by default, accessible without ARIA.

14. **Add View Transitions API** for route changes — `next-view-transitions` package, native-feeling page transitions, baseline 2026.

---

## Current state

- Dev server: healthy on `:3000`
- All implemented changes are tested in development
- No build errors
- Pre-existing lint warnings remain in untouched legacy files (Tailwind v4 shorthand suggestions on `Homepage.tsx`, `SoftreeReel.tsx`, `LogoLoop.tsx` etc.) — non-blocking, don't affect runtime

---

## Skills invoked during this audit

- `design-audit`
- `bencium-aeo` (AEO/JSON-LD/llms.txt patterns)
- `web-design-guidelines`
- `ui-ux-pro-max` (UI/UX rules + anti-patterns)
- `emil-design-eng` (Emil Kowalski animation craft — :active scale, custom easing, transform-origin)
- `redesign-existing-projects` (anti-AI-fingerprint patterns)
- `Agentic UX Design`
- `vercel-react-best-practices`
- `gsap-performance`
