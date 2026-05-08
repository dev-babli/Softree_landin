"use client"

import { useEffect, useRef, useState } from "react"

/* ====================================================================
 *  LIGHT GROW SECTION — "Made for Growth, Loved by Traders"
 *  Light theme: pale blue canvas, white cards, navy ink, electric blue accent.
 *    - Row 1: [Countries 45+] · [Texture image-only] · [Signal Accuracy 90%]
 *    - Row 2: [Wide animated card]
 * ==================================================================== */

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ── Slot-machine digit roller ── */
function DigitRoller({
  digits,
  active,
  delay = 0,
  duration = 1.6,
}: {
  digits: number[]
  active: boolean
  delay?: number
  duration?: number
}) {
  const ROW = 1.05
  return (
    <span
      className="relative inline-block overflow-hidden align-baseline"
      style={{ height: `${ROW}em`, lineHeight: `${ROW}em` }}
    >
      <span
        className="block"
        style={{
          transform: active
            ? `translateY(-${(digits.length - 1) * ROW}em)`
            : "translateY(0)",
          transition: `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        }}
      >
        {digits.map((d, i) => (
          <span key={i} className="block" style={{ height: `${ROW}em` }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

function StatRoller({
  upper,
  lower,
  suffix,
  active,
}: {
  upper: number[]
  lower: number[]
  suffix: string
  active: boolean
}) {
  return (
    <div className="flex items-baseline gap-[0.05em] text-[clamp(56px,7vw,88px)] font-bold leading-none tracking-tight text-[#0a0a1a]">
      <DigitRoller digits={upper} active={active} delay={0.15} duration={1.7} />
      <DigitRoller digits={lower} active={active} delay={0.35} duration={1.9} />
      <span className="text-[#1852FF]">{suffix}</span>
    </div>
  )
}

/* ── Decorative blue dot-grid texture (image-only card) ── */
function GrowTexture() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F8F9FC]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(24,82,255,0.18), transparent 60%), radial-gradient(circle at 75% 70%, rgba(92,157,255,0.20), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(10,10,26,0.18) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(circle at 50% 55%, black 35%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 55%, black 35%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, #C8E0FF 0%, rgba(24,82,255,0.22) 40%, transparent 70%)",
          filter: "blur(22px)",
          animation: "lg-breathe 4.2s ease-in-out infinite",
        }}
      />
      {[42, 56, 72].map((s, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${s}%`,
            height: `${s}%`,
            border: "1px solid rgba(10,10,26,0.06)",
          }}
        />
      ))}
    </div>
  )
}

/* ── Wide row 2 animated waveform ── */
function GrowPulse() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F8F9FC]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 25% 50%, rgba(24,82,255,0.16), transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(92,157,255,0.16), transparent 60%)",
        }}
      />

      <svg
        viewBox="0 0 800 320"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="lg-pulse-stroke" x1="0" x2="1">
            <stop offset="0%" stopColor="#5C9DFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#1852FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#5C9DFF" stopOpacity="0" />
          </linearGradient>
          <filter id="lg-pulse-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="220"
            cy="170"
            r="40"
            fill="none"
            stroke="rgba(24,82,255,0.45)"
            strokeWidth="1"
            style={{
              transformOrigin: "220px 170px",
              animation: `lg-ring-pulse 3.6s ease-out ${i * 1.2}s infinite`,
            }}
          />
        ))}

        <path
          d="M 0 180 Q 110 80, 220 170 T 440 170 T 660 170 T 820 170"
          stroke="url(#lg-pulse-stroke)"
          strokeWidth="2.5"
          fill="none"
          filter="url(#lg-pulse-glow)"
        />
        <path
          d="M 0 180 Q 110 80, 220 170 T 440 170 T 660 170 T 820 170"
          stroke="url(#lg-pulse-stroke)"
          strokeWidth="1.5"
          fill="none"
        />

        <circle cx="220" cy="170" r="20" fill="rgba(24,82,255,0.35)" filter="url(#lg-pulse-glow)" />
        <circle cx="220" cy="170" r="6" fill="#1852FF" />
        <circle cx="220" cy="170" r="2.5" fill="#ffffff" />
      </svg>
    </div>
  )
}

/* ── Card wrapper with reveal ── */
function GrowCard({
  children,
  index,
  visible,
  className = "",
}: {
  children: React.ReactNode
  index: number
  visible: boolean
  className?: string
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-[#0a0a1a]/8 bg-white ${className} ${visible ? "lg-card-in" : "lg-card-hidden"}`}
      style={{
        boxShadow: "0 1px 0 rgba(10,10,26,0.04), 0 24px 48px -24px rgba(10,10,26,0.10)",
        animationDelay: `${index * 0.12}s`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-6 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(24,82,255,0.22) 0%, transparent 70%)",
          filter: "blur(22px)",
        }}
      />
      {children}
    </div>
  )
}

/* ── Stat card layout used by Card 1 & 3 ── */
function StatCard({
  badge,
  upper,
  lower,
  suffix,
  caption,
  active,
}: {
  badge: string
  upper: number[]
  lower: number[]
  suffix: string
  caption: string
  active: boolean
}) {
  return (
    <div className="flex h-full flex-col justify-between p-7">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-3 py-1">
        <div className="h-1.5 w-1.5 rounded-full bg-[#1852FF]" />
        <span className="text-[11px] font-medium tracking-tight text-[#1852FF]">
          {badge}
        </span>
      </div>

      <div>
        <StatRoller upper={upper} lower={lower} suffix={suffix} active={active} />
        <p className="mt-3 text-[13px] leading-[1.55] text-[#0a0a1a]/65">
          {caption}
        </p>
      </div>
    </div>
  )
}

export default function LightGrowSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#F8F9FC]">
      <div ref={ref} className="relative mx-auto w-full max-w-[1240px] px-6 py-20 sm:py-24 md:py-28">
        {/* ── Header ── */}
        <div className={`flex flex-col items-center text-center ${inView ? "lg-fade-in" : "lg-fade-hidden"}`}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-[#1852FF]" />
            <span className="text-sm font-medium text-[#1852FF]">Growing</span>
          </div>
          <h2 className="max-w-[760px] text-[clamp(30px,5vw,56px)] font-bold leading-[1.08] tracking-tight text-[#0a0a1a]">
            Made for Growth, Loved by Traders
          </h2>
          <p className="mt-4 max-w-[560px] text-[14px] leading-[1.6] text-[#0a0a1a]/70 sm:text-[15px]">
            Whether you're a solo investor or part of a big company, we've got your back to trade with confidence.
          </p>
        </div>

        {/* ── Row 1: 3 cards ── */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <GrowCard index={0} visible={inView} className="h-[320px]">
            <StatCard
              badge="Countries"
              upper={[4, 0, 9, 4, 3, 7, 8, 6, 4, 5]}
              lower={[0, 4, 3, 2, 7, 8, 0, 4, 2, 0]}
              suffix="+"
              caption="Global reach and support."
              active={inView}
            />
          </GrowCard>

          <GrowCard index={1} visible={inView} className="h-[320px]">
            <GrowTexture />
          </GrowCard>

          <GrowCard index={2} visible={inView} className="h-[320px]">
            <StatCard
              badge="Signal Accuracy"
              upper={[4, 0, 9, 4, 3, 7, 8, 6, 4, 9]}
              lower={[5, 4, 3, 2, 7, 8, 0, 4, 2, 0]}
              suffix="%"
              caption="AI-powered trading alerts."
              active={inView}
            />
          </GrowCard>
        </div>

        {/* ── Row 2: 1 wide card ── */}
        <div className="mt-5 grid grid-cols-1">
          <GrowCard index={3} visible={inView} className="h-[360px] sm:h-[400px]">
            <div className="absolute inset-0">
              <GrowPulse />
            </div>
            <div className="relative z-10 flex h-full flex-col justify-end p-7 sm:p-9">
              <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-3 py-1">
                <div className="h-1.5 w-1.5 rounded-full bg-[#1852FF]" />
                <span className="text-[11px] font-medium tracking-tight text-[#1852FF]">
                  Live Network
                </span>
              </div>
              <h3 className="max-w-[520px] text-[20px] font-semibold leading-[1.25] text-[#0a0a1a] sm:text-[22px]">
                Real-time market intelligence — synced across every node.
              </h3>
              <p className="mt-2 max-w-[480px] text-[13px] leading-[1.55] text-[#0a0a1a]/65">
                Continuous signal stream so every trader sees the same edge at the same moment.
              </p>
            </div>
          </GrowCard>
        </div>
      </div>

      <style jsx>{`
        :global(.lg-fade-hidden) {
          opacity: 0;
          transform: translateY(20px);
        }
        :global(.lg-fade-in) {
          opacity: 0;
          transform: translateY(20px);
          animation: lg-fade-in 0.9s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
        @keyframes lg-fade-in {
          to { opacity: 1; transform: translateY(0); }
        }

        :global(.lg-card-hidden) {
          opacity: 0;
          transform: translateY(28px) scale(0.98);
          filter: blur(6px);
        }
        :global(.lg-card-in) {
          opacity: 0;
          transform: translateY(28px) scale(0.98);
          filter: blur(6px);
          animation: lg-card-in 0.9s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
        @keyframes lg-card-in {
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @keyframes lg-breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
          50%      { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
        }

        :global(@keyframes lg-ring-pulse) {
          0%   { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(2.8); opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.lg-fade-in),
          :global(.lg-card-in) {
            animation: none !important;
          }
          :global(.lg-fade-hidden),
          :global(.lg-card-hidden) {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </section>
  )
}
