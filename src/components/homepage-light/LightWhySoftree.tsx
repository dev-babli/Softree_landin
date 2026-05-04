"use client"

/**
 * LightWhySoftree — Sticky tabbed capability cards for the /light page.
 *
 * Adapted from WhySoftreeSection with light-theme tokens.
 * Four tabs (AI / Web / Microsoft / Data) rendered as sticky stacked cards
 * that scale down as you scroll. Each has an image slideshow + bullet points.
 */

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { color } from "./tokens"

/* ─── DATA ─── */

interface TabItem {
  id: number
  label: string
  heading: string
  description: string
  bullets: string[]
  images: string[]
}

const TABS: TabItem[] = [
  {
    id: 1, label: "AI",
    heading: "AI that works for your business",
    description: "We embed intelligence directly into your operations — targeted AI that automates real, complex work and delivers measurable ROI.",
    bullets: ["Custom AI models trained on your domain data", "Intelligent document processing & extraction", "AI agents integrated into Power Automate, ERP, CRM"],
    images: ["/whysoftree/ai.webp"],
  },
  {
    id: 2, label: "Web & Apps",
    heading: "Modern apps, built to last",
    description: "High-performance web and mobile applications built with the latest frameworks. From concept to production in weeks.",
    bullets: ["Next.js, React 19, React Native — modern stack", "Cloud-native deployments on Azure & Vercel", "99.9% uptime SLA, Lighthouse 98+"],
    images: ["/whysoftree/web.webp", "/whysoftree/web dev.webp"],
  },
  {
    id: 3, label: "Microsoft",
    heading: "Microsoft, fully delivered",
    description: "From SharePoint intranets to Power Platform automation — we architect and deliver Microsoft 365 solutions purpose-built for enterprise workflows.",
    bullets: ["SharePoint Online, SPFx, Teams integration", "Power Platform: Apps, Automate, BI — end-to-end", "Azure AD SSO, MFA, RBAC built-in"],
    images: ["/whysoftree/microsoft.webp", "/whysoftree/Micorosft.webp"],
  },
  {
    id: 4, label: "Data",
    heading: "Delivery you can measure",
    description: "Enterprise-grade security, compliance, and data practices built into every engagement. Raw data into decisions, decisions into results.",
    bullets: ["SOC 2 & ISO 27001 aligned processes", "Power BI dashboards, Azure Synapse, real-time reporting", "200+ projects delivered · 98% satisfaction"],
    images: ["/whysoftree/data.webp"],
  },
]

/* ─── STICKY CARD ─── */

function StickyCard({ tab, i, total, setCardRef, progress }: {
  tab: TabItem; i: number; total: number
  setCardRef: (el: HTMLDivElement | null, i: number) => void
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const targetScale = Math.max(0.88, 1 - (total - i - 1) * 0.035)
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])

  return (
    <>
      <div className="pointer-events-none h-0" />
      <div ref={(el) => setCardRef(el, i)} className="lg:sticky" style={{ top: 96, zIndex: i + 1 }}>
        <motion.div style={{ scale }} className="origin-top">
          <div
            className="flex flex-col border lg:min-h-[420px] lg:flex-row lg:items-start"
            style={{
              borderColor: color.dustTaupe,
              background: color.lifted,
              gap: 0,
            }}
          >
            {/* Visual panel */}
            <div className="relative h-[280px] w-full overflow-hidden sm:h-[340px] md:h-[400px] lg:h-auto lg:w-[55%] lg:shrink-0 lg:self-stretch xl:w-[580px]">
              <img
                src={i % 2 === 0 ? "/whysoftree/image.png" : "/whysoftree/image copy.png"}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden
              />
              <div className="absolute inset-0 z-10 flex items-center justify-center p-6 md:p-10">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={tab.images[0]}
                    src={tab.images[0]}
                    alt={tab.label}
                    className="h-auto w-full max-w-[420px] rounded-lg object-contain"
                    style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </AnimatePresence>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)" }}
              />
            </div>

            {/* Text content */}
            <div className="flex w-full min-w-0 flex-1 flex-col px-4 pb-5 pt-4 sm:px-5 lg:px-0 lg:pb-8 lg:pl-8 lg:pr-8 lg:pt-8">
              <div className="flex flex-col gap-3">
                <div className="flex size-7 items-center justify-center rounded-sm font-mono text-sm" style={{ background: color.dustTaupe, color: color.slate }}>
                  {String(tab.id).padStart(2, "0")}
                </div>
                <h3 className="text-[22px] leading-[1.2] sm:text-[26px] lg:text-[28px]" style={{ color: color.ink }}>
                  {tab.heading}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed sm:text-[15px]" style={{ color: color.slate }}>
                {tab.description}
              </p>
              <div className="relative mt-5 flex flex-col gap-3 sm:mt-6 lg:mt-8">
                <div className="absolute bottom-0 left-0 top-0 w-px rounded-full" style={{ background: color.dustTaupe }} />
                {tab.bullets.map((bullet, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <div className="relative z-10 mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: color.flame }} />
                    <p className="text-[13px] leading-[1.3] sm:text-sm" style={{ color: color.charcoal }}>
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

/* ─── MAIN ─── */

export default function LightWhySoftree() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  })

  const [activeTab, setActiveTab] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(TABS.length - 1, Math.max(0, Math.floor(v * TABS.length)))
    setActiveTab(idx)
  })

  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardRefs.current[i] = el
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full" style={{ background: color.canvas }}>
      <div className="relative mx-auto w-full max-w-[1320px] px-4 lg:px-10">
        {/* Header */}
        <div className="mb-12 pt-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ background: color.lifted, borderColor: color.dustTaupe }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: color.flame }} />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: color.slate }}>Why Softree</span>
          </div>
          <h2 className="max-w-[640px] text-3xl font-medium leading-[1.05] tracking-tight md:text-[48px]" style={{ color: color.ink }}>
            One partner for every capability.
          </h2>
        </div>

        {/* Tabs nav */}
        <div className="mb-8 flex gap-2 overflow-x-auto">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => {
                const el = cardRefs.current[i]
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200"
              style={{
                background: activeTab === i ? color.ink : color.lifted,
                color: activeTab === i ? color.canvas : color.slate,
                border: `1.5px solid ${activeTab === i ? color.ink : color.dustTaupe}`,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable sticky stack */}
      <div ref={scrollRef} style={{ height: `${TABS.length * 110}vh` }}>
        <div className="sticky top-0 mx-auto w-full max-w-[1320px] px-4 pb-24 lg:px-10">
          {TABS.map((tab, i) => (
            <StickyCard key={tab.id} tab={tab} i={i} total={TABS.length} setCardRef={setCardRef} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
