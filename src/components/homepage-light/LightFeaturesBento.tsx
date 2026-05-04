"use client"

import { useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ───────── Brand ───────── */
const BRAND = "#0040C1"
const BRAND_SOFT = "#D1E0FF"

/* ───────── Framer assets (bento section) ───────── */
const A = {
  // Card 1 — Centralized
  card1Bg: "https://framerusercontent.com/images/AmwXrcpwI566WaiIbAL7PmGMYPQ.png",
  card1Center: "https://framerusercontent.com/images/K1dKqLkgescF2YxTRGcgcziP0.png",
  // Card 2 — Smart Savings (3 stacked)
  card2Bg: "https://framerusercontent.com/images/vqovzzbe2Aal0uT3daXxOyAqy0.png",
  card2Stack1: "https://framerusercontent.com/images/UBWiwgfWh2xmwtaNFXrxv5sfWl8.png",
  card2Stack2: "https://framerusercontent.com/images/3OM0YiWEo9ylwDXqB5flB3LOO0.png",
  card2Stack3: "https://framerusercontent.com/images/c7toDsyiBMfQikFjnKDlZEbJzYk.png",
  // Card 3 — Analytics
  card3Bg: "https://framerusercontent.com/images/L3WMq2rdRHO8rdWDG8h0cMj29Bw.png",
  card3PhoneScreen: "https://framerusercontent.com/images/gxQmZxFYa1dUokFSYyuBGf0Zko.png",
  card3PhoneBase: "https://framerusercontent.com/images/OQeFoCnJIzw1rB9itvFvGGvY.png",
  card3Bento: "https://framerusercontent.com/images/4jj9r0OSqzbOznhxzfxQPGJWyhQ.png",
  // Card 4 — Get the app
  card4Bg: "https://framerusercontent.com/images/b3Iyt6cDu9CxsRz3ZsKERuOSYZ8.png",
  card4Logo: "https://framerusercontent.com/images/jc4HJpos41KVgY76kiPyn8nwGc.svg",
}

/* ───────── Iconography for floating bubbles (Phosphor-style) ───────── */
const ICONS_C1 = [
  // cart
  "M230.14 58.87A8 8 0 0 0 224 56H62.68L56.6 22.57A8 8 0 0 0 48.73 16H24a8 8 0 0 0 0 16h18L67.56 172.29a24 24 0 0 0 5.33 11.27 28 28 0 1 0 44.4 8.44h45.42A27.75 27.75 0 0 0 160 204a28 28 0 1 0 28-28H91.17a8 8 0 0 1-7.87-6.57L80.13 152h116a24 24 0 0 0 23.61-19.71l12.16-66.86A8 8 0 0 0 230.14 58.87ZM104 204a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm96 0a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm4-74.57A8 8 0 0 1 196.1 136H77.22L65.59 72H214.41Z",
  // send
  "M231.87 114l-168-95.89A16 16 0 0 0 40.92 37.34L71.55 128 40.92 218.67A16 16 0 0 0 56 240a16.15 16.15 0 0 0 7.93-2.1l167.92-96.05a16 16 0 0 0 .05-27.89ZM56 224a.56.56 0 0 0 0-.12L85.74 136H144a8 8 0 0 0 0-16H85.74L56.06 32.16A.46.46 0 0 0 56 32l168 95.83Z",
  // card
  "M224 48H32A16 16 0 0 0 16 64V192a16 16 0 0 0 16 16H224a16 16 0 0 0 16-16V64A16 16 0 0 0 224 48Zm0 16V88H32V64Zm0 128H32V104H224v88Zm-16-24a8 8 0 0 1-8 8H168a8 8 0 0 1 0-16h32A8 8 0 0 1 208 168Zm-64 0a8 8 0 0 1-8 8H120a8 8 0 0 1 0-16h16A8 8 0 0 1 144 168Z",
  // trending
  "M232 208a8 8 0 0 1-8 8H32a8 8 0 0 1-8-8V48a8 8 0 0 1 16 0V156.69l50.34-50.35a8 8 0 0 1 11.32 0L128 132.69 180.69 80H160a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8v40a8 8 0 0 1-16 0V91.31l-58.34 58.35a8 8 0 0 1-11.32 0L96 123.31l-56 56V200H224A8 8 0 0 1 232 208Z",
  // globe
  "M128 24h0A104 104 0 1 0 232 128 104.12 104.12 0 0 0 128 24Zm87.62 96H175.79C174 83.49 159.94 57.67 148.41 42.4A88.19 88.19 0 0 1 215.63 120ZM96.23 136h63.54c-2.31 41.61-22.23 67.11-31.77 77-9.55-9.9-29.46-35.4-31.77-77Zm0-16C98.54 78.39 118.46 52.89 128 43c9.55 9.93 29.46 35.43 31.77 77Zm11.36-77.6C96.06 57.67 82 83.49 80.21 120H40.37A88.19 88.19 0 0 1 107.59 42.4ZM40.37 136H80.21c1.82 36.51 15.85 62.33 27.38 77.6A88.19 88.19 0 0 1 40.37 136Zm108 77.6c11.53-15.27 25.56-41.09 27.38-77.6h39.84A88.19 88.19 0 0 1 148.41 213.6Z",
  // lock
  "M208 80H176V56a48 48 0 0 0-96 0V80H48A16 16 0 0 0 32 96V208a16 16 0 0 0 16 16H208a16 16 0 0 0 16-16V96A16 16 0 0 0 208 80ZM96 56a32 32 0 0 1 64 0V80H96ZM208 208H48V96H208V208Zm-68-56a12 12 0 1 1-12-12 12 12 0 0 1 12 12Z",
]

/* Header pill icon (key) */
const KEY_ICON =
  "M248 80a28 28 0 1 0-51.12 15.77l-26.79 33L146 73.4a28 28 0 1 0-36.06 0L85.91 128.74l-26.79-33a28 28 0 1 0-26.6 12L47 194.63A16 16 0 0 0 62.78 208H193.22A16 16 0 0 0 209 194.63l14.47-86.85A28 28 0 0 0 248 80ZM128 40a12 12 0 1 1-12 12A12 12 0 0 1 128 40ZM24 80A12 12 0 1 1 36 92 12 12 0 0 1 24 80ZM193.22 192H62.78L48.86 108.52 81.79 149A8 8 0 0 0 88 152a7.83 7.83 0 0 0 1.08-.07 8 8 0 0 0 6.26-4.74l29.3-67.4a27 27 0 0 0 6.72 0l29.3 67.4a8 8 0 0 0 6.26 4.74A7.83 7.83 0 0 0 168 152a8 8 0 0 0 6.21-3l32.93-40.52ZM220 92a12 12 0 1 1 12-12A12 12 0 0 1 220 92Z"

/* Floating-bubble positions for Card 1 (matches Framer reference layout) */
const BUBBLES = [
  { left: "6%", top: "8%" },
  { left: "34%", top: "-2%" },
  { right: "6%", top: "12%" },
  { left: "2%", bottom: "-4%" },
  { left: "44%", bottom: "-10%" },
  { right: "8%", bottom: "-2%" },
] as const

/* ════════════════════════════════════════════════════════════ */

export default function LightFeaturesBento() {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!rootRef.current) return
      const q = gsap.utils.selector(rootRef)

      /* ── 1. Scroll-reveal of header + cards ── */
      gsap.from(q(".bento-header > *"), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      })

      gsap.from(q(".bento-card"), {
        y: 60,
        opacity: 0,
        scale: 0.97,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: q(".bento-grid"), start: "top 85%" },
      })

      /* ── 2. Card 1: floating bubbles (idle yoyo) ── */
      q(".bento-bubble").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          x: i % 3 === 0 ? 6 : -4,
          duration: 2.4 + (i % 4) * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.15,
        })
      })

      /* ── 3. Card 1: center card subtle drift ── */
      gsap.to(q(".bento-c1-center"), {
        y: -8,
        rotate: -1.5,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      /* ── 4. Card 2: stacked cards bob ── */
      q(".bento-stack").forEach((el, i) => {
        gsap.to(el, {
          y: -6 - i * 2,
          duration: 3 + i * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.4,
        })
      })

      /* ── 5. Card 3: phone group gentle float ── */
      gsap.to(q(".bento-c3-phone"), {
        y: -14,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
      gsap.to(q(".bento-c3-bento"), {
        y: -8,
        duration: 3.4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.6,
      })

      /* ── 6. Card 4: logo slow rotate ── */
      gsap.to(q(".bento-c4-logo"), {
        rotate: 360,
        duration: 32,
        ease: "none",
        repeat: -1,
      })
    },
    { scope: rootRef }
  )

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-white py-[100px] px-[clamp(20px,4vw,64px)]"
    >
      <div className="mx-auto max-w-[1296px]">

        {/* ════════════ HEADER ════════════ */}
        <div className="bento-header mb-14 flex flex-col items-center gap-6">
          {/* Pill */}
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
            style={{ borderColor: BRAND_SOFT }}
          >
            <Phosphor d={KEY_ICON} className="h-4 w-4" />
            <span className="text-[13px] font-medium" style={{ color: BRAND }}>
              Key Features
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-center text-[clamp(40px,5vw,72px)] font-semibold leading-[1.05] tracking-[-0.03em] text-zinc-900">
            Explore Our
            <br />
            <span style={{ color: BRAND }}>Standout Capabilities</span>
          </h2>
        </div>

        {/* ════════════ BENTO GRID ════════════ */}
        <div className="bento-grid flex flex-col gap-6">

          {/* ── ROW 1 — two equal cards ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* CARD 1 */}
            <article
              className="bento-card relative overflow-hidden rounded-[20px] min-h-[480px]"
              style={{
                backgroundImage: `url(${A.card1Bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Graphic area */}
              <div className="relative h-[300px] w-full">
                {/* Floating icon bubbles */}
                {BUBBLES.map((pos, i) => (
                  <div
                    key={i}
                    className="bento-bubble absolute grid h-12 w-12 place-items-center rounded-full bg-white shadow-[0_8px_22px_rgba(0,64,193,0.18)]"
                    style={pos}
                  >
                    <Phosphor d={ICONS_C1[i]} className="h-5 w-5" />
                  </div>
                ))}

                {/* Connecting dashed lines */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 400 300"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <g stroke={BRAND} strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 4">
                    <path d="M40 50 L180 130" />
                    <path d="M150 25 L210 135" />
                    <path d="M360 60 L240 130" />
                    <path d="M30 280 L160 170" />
                    <path d="M180 290 L210 175" />
                    <path d="M360 270 L260 170" />
                  </g>
                </svg>

                {/* Center card — Framer asset */}
                <img
                  src={A.card1Center}
                  alt=""
                  className="bento-c1-center absolute left-1/2 top-1/2 w-[280px] rounded-[18px] shadow-[7px_10px_40px_rgba(0,64,193,0.35)]"
                  style={{ transform: "translate(-50%, -50%) rotate(-3deg)" }}
                />
              </div>

              {/* Content */}
              <div className="p-8 pt-2 lg:p-10 lg:pt-2">
                <h3 className="text-[22px] font-semibold leading-tight text-zinc-900">
                  Expense &amp; Income Tracking
                </h3>
                <p className="mt-2 max-w-[420px] text-[14px] leading-[1.6] text-zinc-500">
                  Record and categorize expense &amp; income automatically or manually.
                </p>
              </div>
            </article>

            {/* CARD 2 */}
            <article
              className="bento-card relative overflow-hidden rounded-[20px] min-h-[480px]"
              style={{
                backgroundImage: `url(${A.card2Bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content */}
              <div className="p-8 lg:p-10">
                <h3 className="text-[22px] font-semibold leading-tight text-zinc-900">
                  Smart Savings Goals
                </h3>
                <p className="mt-2 max-w-[360px] text-[14px] leading-[1.6] text-zinc-500">
                  Set specific savings goals and track progress towards them.
                </p>
              </div>

              {/* Stacked card images */}
              <div className="relative mt-2 h-[260px]">
                <img
                  src={A.card2Stack1}
                  alt=""
                  className="bento-stack absolute left-1/2 top-0 w-[78%] -translate-x-1/2 rounded-[18px] shadow-[0_15px_44px_rgba(0,64,193,0.18)]"
                />
                <img
                  src={A.card2Stack2}
                  alt=""
                  className="bento-stack absolute left-1/2 top-[80px] w-[68%] -translate-x-1/2 rounded-[14px] shadow-[0_15px_44px_rgba(0,64,193,0.22)]"
                />
                <img
                  src={A.card2Stack3}
                  alt=""
                  className="bento-stack absolute left-1/2 top-[160px] w-[58%] -translate-x-1/2 rounded-[12px]"
                />
              </div>
            </article>
          </div>

          {/* ── ROW 2 — 58/42 split ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">

            {/* CARD 3 — Analytics */}
            <article
              className="bento-card relative overflow-hidden rounded-[20px] min-h-[440px]"
              style={{
                backgroundImage: `url(${A.card3Bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content */}
              <div className="relative z-[2] max-w-[280px] p-8 lg:p-10">
                <h3 className="text-[22px] font-semibold leading-tight text-zinc-900">
                  Financial Analytics
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-zinc-500">
                  Generate reports and visualizations to analyze spending habits.
                </p>
              </div>

              {/* Phone + bento card group (rotated 15deg) */}
              <div
                className="absolute right-[-30px] bottom-[-20px] z-[1] origin-bottom-right"
                style={{ transform: "rotate(15deg)" }}
              >
                {/* Phone */}
                <div className="bento-c3-phone relative h-[420px] w-[260px]">
                  <img
                    src={A.card3PhoneBase}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                  <img
                    src={A.card3PhoneScreen}
                    alt=""
                    className="absolute left-1/2 top-1/2 h-[88%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[28px] object-cover"
                  />
                </div>
                {/* Bento card */}
                <img
                  src={A.card3Bento}
                  alt=""
                  className="bento-c3-bento absolute -left-[120px] top-[200px] w-[300px] rounded-[14px] shadow-[0_15px_44px_rgba(0,64,193,0.22)]"
                />
              </div>
            </article>

            {/* CARD 4 — Get the app */}
            <article
              className="bento-card relative overflow-hidden rounded-[20px] min-h-[440px]"
              style={{
                backgroundImage: `url(${A.card4Bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Logo */}
              <img
                src={A.card4Logo}
                alt=""
                className="bento-c4-logo pointer-events-none absolute right-[40px] top-[40px] h-[120px] w-[120px]"
              />

              {/* Content + CTA */}
              <div className="relative z-[2] flex h-full flex-col justify-end p-8 lg:p-10">
                <h3 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
                  Get the app
                </h3>
                <Link
                  href="/contact"
                  className="group mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white px-6 py-3 text-[14px] font-medium transition-transform hover:scale-[1.02]"
                  style={{ color: BRAND }}
                >
                  Get template
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 11L11 3M11 3H5M11 3V9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ══════════════ Phosphor-style icon ══════════════ */
function Phosphor({ d, className = "" }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill={BRAND}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={d} />
    </svg>
  )
}
