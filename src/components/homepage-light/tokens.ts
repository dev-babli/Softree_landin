/**
 * Light-theme design tokens — a disciplined mix of:
 *  • Mistral AI (warm cream canvas, amber/gold shadows, 82px display,
 *    single weight 400, near-zero radius, block gradient identity)
 *  • Mastercard (warm putty cream, floating pill nav, circular portraits
 *    with white satellite CTAs, ink-black body CTAs at 20px radius,
 *    orbital orange arcs, ink-black footer)
 *
 * Rule-of-thumb:
 *  – Background / canvas  → Mastercard cream (#F3F0EE)
 *  – Display headlines    → Mistral 82px / 400 / -2% tracking
 *  – Body copy            → Mastercard 16px / 450
 *  – Primary CTA          → Ink-black pill (20px)
 *  – Accent spark         → Mistral orange (#fa520f) / amber (#ffa110)
 *  – Section cards        → Mistral golden shadow
 */

export const color = {
  // Canvas (Mastercard)
  canvas: "#F3F0EE",
  lifted: "#FCFBFA",
  white: "#FFFFFF",
  // Warm accents (Mistral)
  ivory: "#fffaeb",
  cream: "#fff0c2",
  gold: "#ffe295",
  sunshine: "#ffa110",
  flame: "#fb6424",
  mistral: "#fa520f",
  yellow: "#ffd900",
  // Ink (Mastercard)
  ink: "#141413",
  charcoal: "#262627",
  slate: "#696969",
  dustTaupe: "#D1CDC7",
  ghostCream: "#E8E2DA",
  // Signal
  signal: "#CF4500",
  signalLight: "#F37338",
  // Brand block
  link: "#3860BE",
} as const

export const shadow = {
  /** Mistral golden-hour elevation — five cascading amber-tinted layers */
  golden:
    "rgba(127, 99, 21, 0.12) -8px 16px 39px, rgba(127, 99, 21, 0.10) -33px 64px 72px, rgba(127, 99, 21, 0.06) -73px 144px 97px, rgba(127, 99, 21, 0.02) -130px 256px 115px, rgba(127, 99, 21, 0.00) -203px 400px 126px",
  /** Mastercard floating-pill lift */
  pill: "rgba(0, 0, 0, 0.04) 0px 4px 24px 0px",
  /** Mastercard elevated card halo */
  halo: "rgba(0, 0, 0, 0.08) 0px 24px 48px 0px",
  /** Mastercard dramatic tile lift */
  drama: "rgba(0, 0, 0, 0.25) 0px 70px 110px 0px",
} as const

export const font = {
  display:
    '"Sofia Sans", "MarkForMC", Arial, ui-sans-serif, system-ui, sans-serif',
  body:
    '"Sofia Sans", "MarkForMC", Arial, ui-sans-serif, system-ui, sans-serif',
} as const

export const radius = {
  none: 0,
  chip: 6,
  button: 20,
  consent: 24,
  stadium: 40,
  pill: 999,
  circle: "9999px",
} as const

/** Mistral block gradient — yellow → amber → orange → flame → mistral */
export const BLOCK_GRADIENT =
  "linear-gradient(90deg,#ffd900 0%,#ffe295 18%,#ffa110 42%,#ff8105 65%,#fb6424 82%,#fa520f 100%)"
