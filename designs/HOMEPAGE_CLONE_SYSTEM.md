# Softree Homepage Clone System

## Research Summary

- Award-style GSAP sites use motion as narrative structure: reveal, pin, scrub, and transition patterns should explain the product story instead of decorating every element.
- Conversion-focused B2B pages need immediate clarity, early proof, problem-to-solution framing, outcome-led service cards, risk reduction, and a single strong consultation path.
- Glassmorphism works when contrast is protected with semi-opaque fills, restrained blur, border highlights, internal gradients, and layered shadows.
- Animation-heavy pages need transform/opacity motion, scoped GSAP cleanup, reduced-motion fallbacks, and limited pinning on mobile.

## Current Homepage Analysis

- Production route: `src/app/page.tsx`.
- Production homepage components: `src/components/homepage/*`.
- Original hero identity is built around `TrueHulyHero`: cinematic video, SOFTREE split-flap identity, glass CTA pills, and enterprise cards.
- The current page already uses Lenis, dynamic imports, deferred mounting, GSAP, dark/light rhythm, Microsoft and AI service positioning, and proof markers such as `200+`, `98%`, and `4` hubs.

## Clone Strategy

- Created `src/components/homepage-clone` by copying the current `src/components/homepage` folder.
- Added a new safe route at `/homepage-clone`.
- Route imports only cloned homepage navigation/shell files and redesigned cloned section components.
- The production route and production homepage component paths are not used by the cloned route.
- Original copied component names are preserved as the route composition layer, then redesigned into a conversion/storytelling role.

## Cloned Component Map

| Copied cloned component | New role |
| --- | --- |
| `HeroClone` | Preserved Softree identity, video atmosphere, service proof, conversion CTAs |
| `ServicesParallaxShowcase` | Trust strip and proof bridge |
| `MirrorContentOpsSection` | Problem-to-transformation section |
| `SoftreeGlobalShowcase` | Global delivery credibility |
| `SoftreeServicePicker` | Service pillars |
| `ScrollRevealSection` | Capability story |
| `PinnedShowcaseSection` | Pinned GSAP operations narrative |
| `WhySoftreeSection` | Proof and risk reduction |
| `SoftreeIndustriesSection` | Industry relevance |
| `ForDevelopersSection` | Security and governance |
| `SoftreeMidCTA` | Mid-story consultation CTA |
| `SoftreeStackTabs` | Technology ecosystem |
| `SoftreeComposioSection` | Delivery process |
| `SoftreeBlogSection` | Buyer questions and insight-led selling |
| `StorytellingCTAClone` | Final conversion section |

## Design System

- Color tokens: void black `#03060b`, enterprise navy `#061b31`, Stripe purple `#533afd`, cyan signal `#00e5ff`, cobalt `#2563eb`, white glass overlays, and limited emerald/amber proof accents.
- Typography: Inter/system sans for conversion clarity, monospace only for metrics, step numbers, and technical labels.
- Spacing: 8px base scale, 24px card padding, 96px section rhythm on desktop, tighter mobile rhythm.
- Radius: 4px for labels/buttons, 6px for CTAs, 8px for panels/cards.
- Glass: rgba surfaces, backdrop blur, border highlights, inset light, cool shadows, and readable contrast.
- Motion: entrance reveal, batched section reveal, pinned operations story, metric counts, progress cue, and card depth hover.
- Reduced motion: no Lenis, no movement choreography, final states rendered immediately.

## Narrative Plan

1. Preserve original hero and add cloned conversion/proof overlays.
2. Trust bridge with proof metrics and Microsoft ecosystem signals.
3. Problem and transformation section.
4. Service pillars across Microsoft, cloud, apps, AI, analytics, and automation.
5. Pinned GSAP transformation story.
6. Proof and buyer-risk reduction.
7. Delivery process.
8. Final consultation CTA.

## Accessibility And Performance

- Semantic sections and heading hierarchy.
- Real links for navigation and CTAs.
- Focus-visible rings on interactive elements.
- Decorative icons marked `aria-hidden`.
- Transform/opacity animation only.
- One pinned sequence, desktop only.
- `prefers-reduced-motion` disables scroll choreography.
- Heavy footer is deferred until near viewport.
