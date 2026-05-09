"use client"

import CurvedLoop from "@/components/ui/CurvedLoop"

/* ====================================================================
 *  SoftreeCurvedMarquee
 *
 *  A "fade-to-black" poster belt that bridges the light process beats
 *  (LightHowWeWork) into the dark social-proof beats (TestimonialsSection).
 *  Uses the React Bits CurvedLoop with a subdued speed and curve so the
 *  text reads as a confident statement rather than a busy ticker.
 * ==================================================================== */

export default function SoftreeCurvedMarquee() {
  return (
    <section
      aria-label="Softree marquee"
      className="relative isolate w-full overflow-hidden bg-[#0a0a1a] text-white"
    >
      {/* Subtle blue radial spotlight from the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[80%] w-[80%] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(24,82,255,0.16) 0%, rgba(24,82,255,0.05) 35%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Faint dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 25%, rgba(24,82,255,0.55) 50%, rgba(255,255,255,0.18) 75%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1700px] py-16 sm:py-20 md:py-24">
        <CurvedLoop
          marqueeText="Build ✦ Ship ✦ Scale ✦ Designed for Enterprise ✦ "
          speed={1.4}
          curveAmount={260}
          interactive={true}
          direction="left"
          className="fill-white"
        />
      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 25%, rgba(24,82,255,0.55) 50%, rgba(255,255,255,0.18) 75%, transparent 100%)",
        }}
      />

      {/* Drag affordance hint (only visible on first paint) */}
      <p
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/35"
        aria-hidden
      >
        Drag to scrub
      </p>
    </section>
  )
}
