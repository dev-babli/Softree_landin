"use client"

import { motion, useReducedMotion } from "framer-motion"
import { HeroCard } from "./types"

/* ─────────────────────────────────────────────────────────────────────
 * Tuned to match the reference video frame-by-frame:
 *  – Silver titanium phone body (not dark)
 *  – Dynamic Island notch
 *  – 4 cards: vivid purple, neon lime, bright cyan, dark metallic
 *  – Pure black stage, strong left-top lighting
 *  – 4s conveyor loop: cards glide diagonally over the phone surface
 * ───────────────────────────────────────────────────────────────────── */

const DEFAULT_CARDS: HeroCard[] = [
  {
    id: "purple",
    label: "Revolut",
    gradient: "linear-gradient(130deg,#4f46e5 0%,#7c3aed 25%,#a855f7 55%,#d946ef 80%,#ec4899 100%)",
    glowColor: "rgba(124,58,237,0.5)",
    shadowColor: "rgba(76,29,149,0.6)",
    textColor: "#fff",
    startX: -280, startY: 40,
    midX: 20, midY: 70,
    endX: 320, endY: 100,
    startScale: 0.94, midScale: 1.04, endScale: 0.98,
    startOpacity: 0.9, midOpacity: 1, endOpacity: 0.85,
    zIndex: 5,
  },
  {
    id: "green",
    label: "Revolut",
    gradient: "linear-gradient(130deg,#bef264 0%,#a3e635 25%,#84cc16 55%,#65a30d 80%,#4d7c0f 100%)",
    glowColor: "rgba(132,204,22,0.5)",
    shadowColor: "rgba(101,163,13,0.55)",
    textColor: "rgba(15,25,5,0.95)",
    startX: 60, startY: -80,
    midX: 300, midY: -120,
    endX: 540, endY: -160,
    startScale: 1, midScale: 0.98, endScale: 0.9,
    startOpacity: 1, midOpacity: 0.9, endOpacity: 0.55,
    zIndex: 4,
  },
  {
    id: "cyan",
    label: "Revolut",
    gradient: "linear-gradient(130deg,#67e8f9 0%,#22d3ee 25%,#06b6d4 55%,#0891b2 80%,#0e7490 100%)",
    glowColor: "rgba(6,182,212,0.4)",
    shadowColor: "rgba(8,145,178,0.5)",
    textColor: "#fff",
    startX: 340, startY: -200,
    midX: 560, midY: -240,
    endX: 780, endY: -280,
    startScale: 0.96, midScale: 0.9, endScale: 0.84,
    startOpacity: 0.85, midOpacity: 0.7, endOpacity: 0.45,
    zIndex: 3,
  },
  {
    id: "black",
    label: "Revolut",
    gradient: "linear-gradient(130deg,#3f3f46 0%,#27272a 25%,#18181b 50%,#27272a 75%,#52525b 100%)",
    glowColor: "rgba(63,63,70,0.3)",
    shadowColor: "rgba(0,0,0,0.65)",
    textColor: "rgba(255,255,255,0.9)",
    startX: -480, startY: 80,
    midX: -240, midY: 55,
    endX: 0, endY: 30,
    startScale: 0.86, midScale: 0.9, endScale: 0.94,
    startOpacity: 0.55, midOpacity: 0.7, endOpacity: 0.85,
    zIndex: 2,
  },
]

export default function FintechPhoneCardsHero({
  cards = DEFAULT_CARDS,
  animate = true,
  className,
}: {
  cards?: HeroCard[]
  animate?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  const shouldAnimate = animate && !reduce

  return (
    <div
      className={`relative isolate w-full overflow-hidden bg-black ${className ?? ""}`}
      style={{ aspectRatio: "16 / 10" }}
    >
      {/* subtle film grain */}
      <GrainOverlay />

      {/* 3D stage */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1600px", perspectiveOrigin: "50% 55%" }}
      >
        {/* angled phone group */}
        <div
          className="relative"
          style={{
            width: "min(380px, 28vw)",
            height: "min(780px, 58vw)",
            transformStyle: "preserve-3d",
            transform: "rotateX(62deg) rotateZ(-22deg)",
          }}
        >
          <PhoneBody />
          <PhoneScreen />
          <DynamicIsland />
          <SideButtons />
          <BottomUIDots />
          <CardReflections cards={cards} shouldAnimate={shouldAnimate} />
          <Cards cards={cards} shouldAnimate={shouldAnimate} />
          <PhoneGloss />
        </div>
      </div>
    </div>
  )
}

/* ── PHONE BODY — silver titanium frame with strong left-top highlight ── */
function PhoneBody() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        borderRadius: 48,
        background:
          "linear-gradient(165deg,#e4e4e7 0%,#d4d4d8 6%,#a1a1aa 14%,#71717a 28%,#52525b 45%,#3f3f46 60%,#52525b 78%,#a1a1aa 92%,#e4e4e7 100%)",
        boxShadow: [
          "inset 0 1.5px 0 rgba(255,255,255,0.55)",
          "inset 0 -1px 0 rgba(0,0,0,0.35)",
          "inset 1.5px 0 0 rgba(255,255,255,0.35)",
          "inset -1.5px 0 0 rgba(255,255,255,0.2)",
          "0 50px 100px -30px rgba(0,0,0,0.85)",
          "0 15px 40px -15px rgba(0,0,0,0.6)",
        ].join(","),
        transform: "translateZ(0px)",
      }}
    >
      {/* strong left-top rim highlight */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: 48,
          background:
            "linear-gradient(165deg,rgba(255,255,255,0.35) 0%,rgba(255,255,255,0.12) 12%,transparent 28%,transparent 72%,rgba(255,255,255,0.06) 88%,rgba(255,255,255,0.2) 100%)",
          mixBlendMode: "screen",
        }}
      />
      {/* bottom-right shadow rim */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: 48,
          background:
            "linear-gradient(165deg,transparent 0%,transparent 60%,rgba(0,0,0,0.15) 85%,rgba(0,0,0,0.3) 100%)",
        }}
      />
    </div>
  )
}

/* ── PHONE SCREEN — black glass with card-reflection ambient glow ── */
function PhoneScreen() {
  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        inset: 9,
        borderRadius: 40,
        background: "#050505",
        boxShadow: [
          "inset 0 0 0 1px rgba(255,255,255,0.08)",
          "inset 0 1px 2px rgba(255,255,255,0.04)",
          "inset 0 -1px 3px rgba(0,0,0,0.6)",
        ].join(","),
        transform: "translateZ(0.8px)",
        overflow: "hidden",
      }}
    >
      {/* subtle ambient purple glow from active card */}
      <div
        className="absolute"
        style={{
          left: "20%",
          top: "35%",
          width: "60%",
          height: "40%",
          background:
            "radial-gradient(ellipse at center,rgba(124,58,237,0.04) 0%,transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {/* screen edge bevel */}
      <div
        className="absolute inset-0 rounded-[40px]"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      />
    </div>
  )
}

/* ── DYNAMIC ISLAND ── */
function DynamicIsland() {
  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        top: 18,
        left: "50%",
        transform: "translateX(-50%) translateZ(1.5px)",
        width: 90,
        height: 24,
        borderRadius: 12,
        background: "#000",
        boxShadow:
          "inset 0 0 0 1px rgba(255,255,255,0.08),0 1px 3px rgba(0,0,0,0.3)",
      }}
    />
  )
}

/* ── SIDE BUTTONS ── */
function SideButtons() {
  return (
    <>
      <div
        aria-hidden
        className="absolute"
        style={{
          left: -2.5,
          top: "17%",
          width: 2.5,
          height: 30,
          borderRadius: "0 2px 2px 0",
          background:
            "linear-gradient(180deg,#e4e4e7,#a1a1aa,#71717a)",
          transform: "translateZ(0.4px)",
        }}
      />
      <div
        aria-hidden
        className="absolute"
        style={{
          left: -2.5,
          top: "24%",
          width: 2.5,
          height: 30,
          borderRadius: "0 2px 2px 0",
          background:
            "linear-gradient(180deg,#e4e4e7,#a1a1aa,#71717a)",
          transform: "translateZ(0.4px)",
        }}
      />
      <div
        aria-hidden
        className="absolute"
        style={{
          right: -2.5,
          top: "21%",
          width: 2.5,
          height: 42,
          borderRadius: "2px 0 0 2px",
          background:
            "linear-gradient(180deg,#e4e4e7,#a1a1aa,#71717a)",
          transform: "translateZ(0.4px)",
        }}
      />
    </>
  )
}

/* ── BOTTOM UI DOTS ── */
function BottomUIDots() {
  return (
    <div
      aria-hidden
      className="absolute flex items-center justify-center gap-1.5"
      style={{
        bottom: "3.5%",
        left: 0,
        right: 0,
        transform: "translateZ(1.8px)",
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            width: i === 2 ? 26 : 7,
            height: 7,
            borderRadius: 3.5,
            background:
              i === 2
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.3)",
          }}
        />
      ))}
    </div>
  )
}

/* ── CARD REFLECTIONS — soft blurred shadows on the glass ── */
function CardReflections({
  cards,
  shouldAnimate,
}: {
  cards: HeroCard[]
  shouldAnimate: boolean
}) {
  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        inset: 9,
        borderRadius: 40,
        overflow: "hidden",
        transform: "translateZ(1.2px)",
        pointerEvents: "none",
      }}
    >
      {cards.map((c) => (
        <motion.div
          key={`ref-${c.id}`}
          className="absolute"
          style={{
            width: 200,
            height: 124,
            borderRadius: 14,
            left: "50%",
            top: "48%",
            marginLeft: -100,
            marginTop: -62,
            background: c.shadowColor,
            filter: "blur(18px)",
            opacity: 0.5,
            zIndex: c.zIndex - 1,
          }}
          initial={{
            x: c.startX,
            y: c.startY,
            scale: c.startScale ?? 1,
            opacity: (c.startOpacity ?? 1) * 0.5,
          }}
          animate={
            shouldAnimate
              ? {
                x: [c.startX, c.midX, c.endX, c.startX],
                y: [c.startY, c.midY, c.endY, c.startY],
                scale: [
                  c.startScale ?? 1,
                  c.midScale ?? 1,
                  c.endScale ?? 1,
                  c.startScale ?? 1,
                ],
                opacity: [
                  (c.startOpacity ?? 1) * 0.5,
                  (c.midOpacity ?? 1) * 0.5,
                  (c.endOpacity ?? 1) * 0.5,
                  (c.startOpacity ?? 1) * 0.5,
                ],
              }
              : { x: c.startX, y: c.startY, scale: c.startScale ?? 1 }
          }
          transition={{
            duration: 4,
            ease: [0.45, 0, 0.2, 1],
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  )
}

/* ── FLOATING CARDS ── */
function Cards({
  cards,
  shouldAnimate,
}: {
  cards: HeroCard[]
  shouldAnimate: boolean
}) {
  return (
    <div
      className="absolute"
      style={{
        inset: 9,
        transform: "translateZ(3px)",
        transformStyle: "preserve-3d",
      }}
    >
      {cards.map((c) => (
        <motion.div
          key={c.id}
          className="absolute"
          style={{
            width: 200,
            height: 124,
            borderRadius: 14,
            left: "50%",
            top: "48%",
            marginLeft: -100,
            marginTop: -62,
            background: c.gradient,
            boxShadow: [
              `0 0 35px ${c.glowColor}`,
              "0 10px 28px -8px rgba(0,0,0,0.55)",
              "inset 0 1px 0 rgba(255,255,255,0.3)",
              "inset 0 -1px 0 rgba(0,0,0,0.25)",
            ].join(","),
            zIndex: c.zIndex,
            transformStyle: "preserve-3d",
          }}
          initial={{
            x: c.startX,
            y: c.startY,
            scale: c.startScale ?? 1,
            opacity: c.startOpacity ?? 1,
          }}
          animate={
            shouldAnimate
              ? {
                x: [c.startX, c.midX, c.endX, c.startX],
                y: [c.startY, c.midY, c.endY, c.startY],
                scale: [
                  c.startScale ?? 1,
                  c.midScale ?? 1,
                  c.endScale ?? 1,
                  c.startScale ?? 1,
                ],
                opacity: [
                  c.startOpacity ?? 1,
                  c.midOpacity ?? 1,
                  c.endOpacity ?? 1,
                  c.startOpacity ?? 1,
                ],
              }
              : { x: c.startX, y: c.startY, scale: c.startScale ?? 1 }
          }
          transition={{
            duration: 4,
            ease: [0.45, 0, 0.2, 1],
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {/* top glossy sweep */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[14px]"
            style={{
              background:
                "linear-gradient(125deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.4) 35%,rgba(255,255,255,0) 50%,rgba(255,255,255,0.12) 68%,rgba(255,255,255,0) 85%)",
              mixBlendMode: "screen",
            }}
          />

          {/* inner rim */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[14px]"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.1),inset 0 0 24px rgba(0,0,0,0.18)",
            }}
          />

          {/* label */}
          <div
            className="absolute"
            style={{
              left: "10%",
              top: "14%",
              fontFamily:
                "'Inter','SF Pro Display',system-ui,-apple-system,sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: c.textColor ?? "#fff",
            }}
          >
            {c.label}
          </div>

          {/* chip indicator dot */}
          <div
            aria-hidden
            className="absolute"
            style={{
              right: "9%",
              top: "12%",
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.85)",
              boxShadow:
                "inset 0 0 0 1px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.15)",
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

/* ── PHONE GLOSS — final specular highlight overlay ── */
function PhoneGloss() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[48px]"
      style={{
        background:
          "linear-gradient(165deg,rgba(255,255,255,0.2) 0%,rgba(255,255,255,0.08) 8%,transparent 18%,transparent 60%,rgba(255,255,255,0.03) 82%,rgba(255,255,255,0.14) 100%)",
        mixBlendMode: "screen",
        transform: "translateZ(4px)",
      }}
    />
  )
}

/* ── GRAIN OVERLAY ── */
function GrainOverlay() {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
  const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      style={{ backgroundImage: url, backgroundSize: "200px 200px" }}
    />
  )
}

