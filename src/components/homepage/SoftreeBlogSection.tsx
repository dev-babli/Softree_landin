"use client"

/**
 * SoftreeBlogSection — converted into a premium Service Showcase.
 *
 * Signature details (kept from the Cohere-original):
 *  - Same bottom-corner SVG path-morph on hover (the "cut-corner → full-corner" seal).
 *
 * New design system:
 *  - 4 service cards, each with a looping muted video background.
 *  - Scroll-reveal stagger (y + opacity) on the grid.
 *  - Word-by-word slide-up reveal for headline + card titles (masked-overflow).
 *  - Hover: video zooms + brightens, card lifts, arrow slides, path morphs,
 *    soft accent-colored glow appears beneath the card.
 *  - prefers-reduced-motion respected everywhere (framer-motion handles it).
 *  - IntersectionObserver pauses videos when off-screen (perf).
 *
 * Videos:
 *  /public/whysoftree/animate_this_202605032033.mp4
 *  /public/whysoftree/animate_this_202605032038.mp4
 *  /public/whysoftree/large-thumbnail20250421-2314569-wkr5ab.mp4
 *  /public/whysoftree/large-thumbnail20250526-4119631-1hazb8j.mp4
 */

import { motion, useInView } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

/* ─────────── Signature path-morph (kept from the original) ─────────── */
const pathVariants = {
  unhovered: {
    d: "M670 0H0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 106.721 536.529 99.9469L570.988 31.0531C574.377 24.2789 581.301 20 588.875 20H650C661.046 20 670 11.0457 670 0Z",
  },
  hovered: {
    d: "M670 0H0V91C0 102.046 8.9543 111 20 111H300C333.33 111 366.66 111 400 111L500 111C533.33 111 566.66 111 600 111H650C661.046 111 670 102.046 670 91Z",
  },
}

/* ─────────── Word-by-word reveal (no SplitText dep, framer only) ─────────── */
function RevealText({
  text,
  delay = 0,
  className = "",
  stagger = 0.035,
  as: Tag = "span",
}: {
  text: string
  delay?: number
  className?: string
  stagger?: number
  as?: "h2" | "h3" | "p" | "span"
}) {
  const words = text.split(" ")
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.06em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
            {i !== words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* ─────────── Services data ─────────── */
type Service = {
  num: string
  tag: string
  title: string
  desc: string
  video: string
  accent: string
  accentRgb: string
  href: string
}

const SERVICES: Service[] = [
  {
    num: "01",
    tag: "Agentic AI",
    title: "Autonomous AI that actually ships work",
    desc: "Production-grade agents fine-tuned on your data. From retrieval pipelines to multi-agent workflows.",
    video: "/whysoftree/animate_this_202605032033.mp4",
    accent: "#6366F1",
    accentRgb: "99,102,241",
    href: "/services/ai-intelligence",
  },
  {
    num: "02",
    tag: "Web Systems",
    title: "Premium web platforms built to scale",
    desc: "Next.js, React 19 and edge-native stacks engineered for speed, conversions and enterprise reliability.",
    video: "/whysoftree/animate_this_202605032038.mp4",
    accent: "#0EA5E9",
    accentRgb: "14,165,233",
    href: "/services/digital-workspace",
  },
  {
    num: "03",
    tag: "Transformation",
    title: "Legacy into lean, modern architecture",
    desc: "Strategic engineering partners that migrate your monolith into composable, auditable systems.",
    video: "/whysoftree/large-thumbnail20250421-2314569-wkr5ab.mp4",
    accent: "#F59E0B",
    accentRgb: "245,158,11",
    href: "/services/business-applications",
  },
  {
    num: "04",
    tag: "Data Engineering",
    title: "Real-time pipelines, intelligence on tap",
    desc: "Synapse, Fabric and bespoke warehouses — every decision backed by live, governed data.",
    video: "/whysoftree/large-thumbnail20250526-4119631-1hazb8j.mp4",
    accent: "#10B981",
    accentRgb: "16,185,129",
    href: "/services/data-analytics",
  },
]

/* ─────────── Card ─────────── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(cardRef, { margin: "-20% 0px -20% 0px" })

  // Pause videos offscreen (perf)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView) {
      v.play().catch(() => { })
    } else {
      v.pause()
    }
  }, [inView])

  const baseDelay = index * 0.12

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.85, delay: baseDelay, ease: [0.22, 1, 0.36, 1] }}
      className="group/card relative w-full"
    >
      <motion.a
        href={service.href}
        initial="unhovered"
        whileHover="hovered"
        className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#f6f6f6] cursor-pointer"
        style={{
          boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 4px 14px -6px rgba(15,23,42,0.06)",
        }}
      >
        {/* Accent glow aura that fades in on hover (soft colored floor shadow) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-4 -z-10 rounded-[20px] opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ background: `radial-gradient(60% 50% at 50% 60%, rgba(${service.accentRgb},0.35), transparent 70%)` }}
        />

        {/* Content container (non-video region) */}
        <div className="relative flex w-full flex-1 flex-col p-4 pb-0">
          {/* Video thumbnail */}
          <div className="relative mb-5 overflow-hidden rounded-[6px]">
            {/* Aspect preserver */}
            <div className="relative w-full" style={{ aspectRatio: "670 / 376" }}>
              <motion.video
                ref={videoRef}
                src={service.video}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ scale: 1.02, filter: "brightness(0.92) saturate(95%)" }}
                variants={{
                  unhovered: { scale: 1.02, filter: "brightness(0.92) saturate(95%)" },
                  hovered: { scale: 1.08, filter: "brightness(1.05) saturate(115%)" },
                }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
              />
              {/* Vignette overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.28) 100%)",
                }}
                aria-hidden
              />
              {/* Accent corner number badge */}
              <motion.div
                className="absolute left-3 top-3 flex h-8 items-center gap-2 rounded-full bg-white/90 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black backdrop-blur-md"
                variants={{
                  unhovered: { y: 0, opacity: 0.95 },
                  hovered: { y: -2, opacity: 1 },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  boxShadow: `0 2px 10px -4px rgba(${service.accentRgb},0.5)`,
                }}
              >
                <span
                  aria-hidden
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{ background: service.accent }}
                />
                <span>{service.num} · {service.tag}</span>
              </motion.div>
            </div>
          </div>

          {/* Title — word-by-word reveal */}
          <RevealText
            as="h3"
            text={service.title}
            delay={baseDelay + 0.12}
            stagger={0.04}
            className="mb-4 block text-xl lg:text-2xl font-medium font-sans leading-[1.18] tracking-tight"
          />

          {/* Desc — simple fade-up */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.75, delay: baseDelay + 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 max-w-[480px] text-[14px] leading-[1.55] text-[#5e5e5e]"
          >
            {service.desc}
          </motion.p>
        </div>

        {/* Signature path-morph corner (same curve as Cohere-original) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 670 111"
          preserveAspectRatio="none"
          className="-mt-[1px] w-full shrink-0"
          aria-hidden
        >
          <motion.path
            className="w-full"
            fill="#f6f6f6"
            variants={pathVariants}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        {/* Bottom CTA row */}
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-4 md:bottom-4">
          <motion.span
            className="text-[15px] font-medium text-black"
            variants={{
              unhovered: { x: 0 },
              hovered: { x: 4 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ color: "inherit" }}
          >
            Explore service
          </motion.span>
          <motion.span
            className="flex items-center justify-center rounded-full text-black"
            variants={{
              unhovered: { opacity: 0, x: -8, scale: 0.9 },
              hovered: { opacity: 1, x: 0, scale: 1 },
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: service.accent }}
          >
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.8} />
          </motion.span>
        </div>
      </motion.a>
    </motion.div>
  )
}

/* ────────────────────── MAIN ────────────────────── */
export function SoftreeBlogSection() {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-white py-20 md:py-24 lg:py-28 text-black">
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 lg:px-6">
        {/* Header */}
        <div className="mb-12 lg:mb-14 lg:flex lg:items-end lg:justify-between">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="block h-px w-10 bg-black/20" aria-hidden />
              <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-black/60">
                What we build
              </span>
            </motion.div>
            <RevealText
              as="h2"
              text="Services that scale with you."
              className="block max-w-[760px] text-4xl lg:text-[52px] font-medium leading-[1.05] tracking-[-0.02em] font-sans"
              delay={0.1}
              stagger={0.045}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex lg:mt-0"
          >
            <Link
              href="/services"
              className="group/cta flex items-center text-black transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded-sm"
            >
              <span className="text-base lg:text-lg font-medium font-sans">
                All services
              </span>
              <span className="ml-2 flex items-center transition-transform duration-300 ease-out group-hover/cta:translate-x-1.5">
                <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
