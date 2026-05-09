"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Building2,
  Landmark,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Factory,
  Plane,
  Banknote,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Industry = {
  label: string
  tag: string
  desc: string
  image: string
  icon: LucideIcon
  accent: "orange" | "blue"
  href: string
}

const INDUSTRIES: Industry[] = [
  {
    label: "Financial Services",
    tag: "FINTECH",
    desc: "Risk engines, fraud AI, core-banking integrations.",
    image: "/images/business.png",
    icon: Banknote,
    accent: "orange",
    href: "/industries/finance",
  },
  {
    label: "Healthcare",
    tag: "HEALTH",
    desc: "HIPAA-grade portals, clinical data, patient AI copilots.",
    image: "/images/clinic.png",
    icon: HeartPulse,
    accent: "blue",
    href: "/industries/healthcare",
  },
  {
    label: "Education",
    tag: "EDTECH",
    desc: "Adaptive learning, student platforms, research portals.",
    image: "/images/school.png",
    icon: GraduationCap,
    accent: "orange",
    href: "/industries/education",
  },
  {
    label: "Retail & E-commerce",
    tag: "COMMERCE",
    desc: "Headless storefronts, recommendation AI, unified CRM.",
    image: "/images/food.png",
    icon: ShoppingBag,
    accent: "blue",
    href: "/industries/retail",
  },
  {
    label: "Manufacturing",
    tag: "INDUSTRY 4.0",
    desc: "IoT dashboards, predictive maintenance, MES systems.",
    image: "/images/custom.png",
    icon: Factory,
    accent: "orange",
    href: "/industries/manufacturing",
  },
  {
    label: "Government",
    tag: "PUBLIC SECTOR",
    desc: "Citizen portals, secure enclaves, compliance-first delivery.",
    image: "/images/global.png",
    icon: Landmark,
    accent: "blue",
    href: "/industries/government",
  },
  {
    label: "Logistics & Travel",
    tag: "MOBILITY",
    desc: "Route optimisation, fleet AI, real-time tracking.",
    image: "/images/map.png",
    icon: Plane,
    accent: "orange",
    href: "/industries/logistics",
  },
  {
    label: "Real Estate",
    tag: "PROPTECH",
    desc: "Listing platforms, virtual tours, AI valuation models.",
    image: "/images/project.png",
    icon: Building2,
    accent: "blue",
    href: "/industries/real-estate",
  },
]

export function SoftreeIndustriesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth
      setProgress(max > 0 ? el.scrollLeft / max : 0)
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    window.addEventListener("resize", onScroll)
    return () => {
      el.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const scrollBy = (dir: 1 | -1) => {
    if (!ref.current) return
    const first = ref.current.children[0] as HTMLElement
    const step = first ? first.offsetWidth + 20 : 420
    ref.current.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-20 md:py-28">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(1200px circle at 80% 0%, rgba(255,107,0,0.08), transparent 45%), radial-gradient(900px circle at 10% 100%, rgba(161,196,255,0.06), transparent 45%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 px-4 md:mb-16 md:flex-row md:items-end md:justify-between md:px-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-[#FF6B00] to-transparent opacity-60" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF6B00] opacity-80">
                Industries
              </span>
            </div>
            <h2
              className="max-w-[560px] text-3xl font-black leading-[1.02] tracking-tight text-white md:text-5xl lg:text-[52px]"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Powering progress{" "}
              <span className="text-white/40">across industries.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-xl transition-all hover:border-white/25 hover:text-white"
            >
              <ArrowUpRight className="h-4 w-4 -rotate-[135deg]" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-xl transition-all hover:border-white/25 hover:text-white"
            >
              <ArrowUpRight className="h-4 w-4 rotate-45" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={ref}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth px-4 pb-8 md:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon
            const accentHex = ind.accent === "orange" ? "#FF6B00" : "#A1C4FF"
            const active = hovered === i
            return (
              <motion.a
                key={ind.label}
                href={ind.href}
                aria-label={ind.label}
                className="group relative flex h-[440px] w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] border border-white/10 md:h-[500px] md:w-[400px] lg:h-[540px] lg:w-[440px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: `radial-gradient(700px circle at 50% 0%, ${accentHex}22, transparent 50%), rgba(10,10,12,0.94)`,
                }}
              >
                {/* Image */}
                <div className="relative h-[60%] w-full overflow-hidden">
                  <motion.img
                    src={ind.image}
                    alt={ind.label}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover"
                    animate={{ scale: active ? 1.08 : 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/30 to-transparent" />
                  {/* corner glow */}
                  <div
                    className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full opacity-30 blur-[80px]"
                    style={{ background: accentHex }}
                  />
                  {/* tag pill */}
                  <div className="absolute left-5 top-5 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/50 backdrop-blur-xl" style={{ color: accentHex }}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div
                      className="rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-xl"
                      style={{ color: accentHex }}
                    >
                      {ind.tag}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex flex-col gap-2">
                    <h3
                      className="text-xl font-black tracking-tight text-white md:text-2xl"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      {ind.label}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-white/60 md:text-sm">
                      {ind.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-white/80">
                    <span>Explore</span>
                    <motion.span
                      animate={{ x: active ? 4 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="h-4 w-4" style={{ color: accentHex }} />
                    </motion.span>
                  </div>
                </div>

                {/* Border highlight on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[24px] border transition-colors duration-500"
                  style={{
                    borderColor: active ? `${accentHex}66` : "transparent",
                  }}
                />
              </motion.a>
            )
          })}
        </div>

        {/* Progress tracker */}
        <div className="mt-8 flex justify-center px-4">
          <div className="relative h-[3px] w-full max-w-[280px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute inset-y-0 w-[60px] rounded-full"
              style={{
                left: `calc(${progress * 100}% - ${progress * 60}px)`,
                background: "linear-gradient(90deg, #FF6B00, #A1C4FF)",
              }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SoftreeIndustriesSection
