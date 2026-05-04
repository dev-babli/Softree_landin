"use client"

/**
 * LCWhySoftree — light clone of WhySoftreeSection.
 * Sticky-card scroll-stack with framer-motion useScroll preserved.
 * Re-themed cards: cream surface + golden shadow + ink/slate text + flame CTA.
 */

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { color, shadow } from "./tokens"

interface TabItem {
  id: number
  label: string
  heading: string
  description: string
  bullets: string[]
  images: string[]
  cta: { label: string; href: string }
}

const TABS: TabItem[] = [
  { id: 1, label: "AI", heading: "AI that works for your business",
    description: "We embed intelligence directly into your operations — not generic chatbots, but targeted AI that automates real, complex work and delivers measurable ROI.",
    bullets: [
      "Custom AI models trained on your domain data",
      "Intelligent document processing, classification & extraction",
      "AI agents integrated into Power Automate, ERP, and CRM workflows",
    ],
    images: ["/whysoftree/ai.webp"], cta: { label: "Explore AI Solutions", href: "/contact?service=ai" } },
  { id: 2, label: "WEB & APPS", heading: "Modern apps, built to last",
    description: "High-performance web and mobile applications built with the latest frameworks. From concept to production in weeks — no legacy debt, no compromises.",
    bullets: [
      "Next.js, React 19, React Native — modern stack from day one",
      "Cloud-native deployments on Azure and Vercel with CI/CD",
      "99.9% uptime SLA, Lighthouse 98+, P95 under 200ms",
    ],
    images: ["/whysoftree/web.webp", "/whysoftree/web dev.webp"], cta: { label: "See Web Projects", href: "/contact?service=web" } },
  { id: 3, label: "MICROSOFT", heading: "Microsoft, fully delivered",
    description: "From SharePoint intranets to Power Platform automation — we architect and deliver Microsoft 365 solutions purpose-built for your enterprise workflows.",
    bullets: [
      "SharePoint Online, SPFx webparts, and Teams integration",
      "Power Platform: Apps, Automate, BI — end-to-end",
      "Azure AD SSO, MFA, RBAC, and enterprise security built-in",
    ],
    images: ["/whysoftree/microsoft.webp", "/whysoftree/Micorosft.webp"], cta: { label: "Explore Microsoft Services", href: "/contact?service=microsoft" } },
  { id: 4, label: "DATA", heading: "Delivery you can measure",
    description: "Enterprise-grade security, compliance, and data practices built into every engagement. We turn your raw data into decisions — and your decisions into results.",
    bullets: [
      "SOC 2 and ISO 27001 aligned delivery processes",
      "Power BI dashboards, Azure Synapse, and real-time reporting",
      "200+ projects delivered globally · 98% client satisfaction",
    ],
    images: ["/whysoftree/data.webp"], cta: { label: "Explore Data Services", href: "/contact?service=data" } },
]

function DecorativeStripe() {
  const colors = [color.lifted, color.cream, color.ghostCream, color.lifted, color.gold]
  return (
    <div className="flex h-[14px] w-full">
      {colors.map((c, j) => (<div key={j} className="h-full flex-1" style={{ background: c, border: `1px solid ${color.dustTaupe}` }} />))}
    </div>
  )
}

interface CardProps {
  tab: TabItem
  i: number
  total: number
  setCardRef: (el: HTMLDivElement | null, i: number) => void
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
}

function StickyCard({ tab, i, total, setCardRef, progress }: CardProps) {
  const targetScale = Math.max(0.85, 1 - (total - i - 1) * 0.04)
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])
  return (
    <>
      <div className="pointer-events-none h-0" />
      <div ref={(el) => setCardRef(el, i)} className="lg:sticky" style={{ top: 96, zIndex: i + 1 }}>
        <motion.div style={{ scale }} className="origin-top">
          <div className="flex flex-col lg:min-h-[400px] lg:flex-row lg:items-start lg:gap-[24px] lg:py-0 lg:pr-[30px] lg:pl-0 xl:gap-[30px] xl:pr-[40px]"
            style={{ border: `1px solid ${color.dustTaupe}`, background: color.lifted, boxShadow: shadow.golden }}>
            <div className="relative h-[280px] w-full overflow-hidden sm:h-[340px] md:h-[400px] lg:h-auto lg:w-[55%] lg:shrink-0 lg:self-stretch xl:w-[580px]">
              <img src={i % 2 === 0 ? "/whysoftree/image.png" : "/whysoftree/image copy.png"} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden />
              <div className="absolute inset-0 z-10 flex items-center justify-center p-6 md:p-10">
                <AnimatePresence mode="sync">
                  <motion.img key={tab.images[0]} src={tab.images[0]} alt={tab.label}
                    className="w-full max-w-[420px] h-auto object-contain rounded-lg"
                    style={{ boxShadow: "0 20px 60px rgba(127,99,21,0.25)" }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} />
                </AnimatePresence>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-28 z-20 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${color.canvas} 0%, transparent 100%)`, opacity: 0.55 }} />
              <div className="absolute bottom-5 left-5 z-30">
                <a href={tab.cta.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs font-bold tracking-tight hover:opacity-90 transition-opacity rounded-full"
                  style={{ background: `linear-gradient(135deg, ${color.gold} 0%, ${color.flame} 50%, ${color.mistral} 100%)`, color: color.ink }}>
                  {tab.cta.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex w-full min-w-0 flex-1 flex-col px-4 pt-4 pb-5 sm:px-5 lg:px-0 lg:pt-[30px] lg:pb-[30px]">
              <div className="flex flex-col gap-3">
                <div className="flex size-7 items-center justify-center rounded-[2px] font-mono text-sm" style={{ background: color.ghostCream, color: color.slate }}>
                  {String(tab.id).padStart(2, "0")}
                </div>
                <h3 className="text-[22px] leading-[1.2] sm:text-[26px] lg:text-[28px]" style={{ color: color.ink }}>{tab.heading}</h3>
              </div>
              <p className="mt-3 text-[13px] leading-[1.4] sm:text-sm sm:leading-[1.2] lg:mt-4" style={{ color: color.slate }}>{tab.description}</p>
              <div className="relative mt-5 flex flex-col gap-4 sm:mt-6 lg:mt-10">
                <div className="absolute top-0 bottom-0 left-0 w-[3px] rounded-[37px]" style={{ background: color.dustTaupe }} />
                {tab.bullets.map((bullet, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <div className="relative z-10 mt-[2px] h-[14px] w-[3px] shrink-0 rounded-[37px]" style={{ background: color.flame }} />
                    <p className="text-[13px] leading-[1.3] sm:text-sm sm:leading-[1.2] lg:w-[215px]" style={{ color: color.ink }}>{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DecorativeStripe />
        </motion.div>
      </div>
    </>
  )
}

export function LCWhySoftree() {
  const [activeTab, setActiveTab] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: cardsContainerRef, offset: ["start start", "end start"] })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(Math.floor(latest * TABS.length), TABS.length - 1)
    setActiveTab(idx)
  })

  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => { cardRefs.current[i] = el }, [])
  const handleTabClick = useCallback((i: number) => { setActiveTab(i); cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" }) }, [])

  return (
    <section style={{ background: color.canvas }}>
      <div className="mx-auto w-full max-w-[1240px] px-4 pt-10 pb-10 md:px-6 md:pt-[86px] md:pb-[72px] lg:px-6 xl:px-0">
        <div className="flex flex-col gap-4 py-4 sm:gap-6 sm:py-0">
          <div className="flex items-center gap-2 self-start px-2 py-1" style={{ border: `1px solid ${color.ink}` }}>
            <div className="size-[5.82px]" style={{ background: color.ink }} />
            <span className="font-mono text-sm leading-normal tracking-[-0.28px]" style={{ color: color.ink }}>WHY SOFTREE</span>
          </div>
          <h2 className="max-w-[540px] text-3xl leading-none md:text-4xl lg:text-[48px]" style={{ color: color.ink }}>
            One partner.<br />Every technology challenge.
          </h2>
          <p className="max-w-[480px] text-[15px] leading-[1.6] mt-1" style={{ color: color.slate }}>
            AI, modern apps, Microsoft 365, and data analytics — we deliver across the full stack so you can focus on your business.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10 md:mt-[79px] lg:flex-row lg:gap-[30px] xl:gap-[58px]">
          <div className="hidden gap-2 overflow-x-auto pb-1 sm:flex lg:hidden">
            {TABS.map((tab, i) => (
              <button key={tab.id} onClick={() => handleTabClick(i)} type="button"
                className="flex shrink-0 items-center gap-2 px-3 py-2 text-left transition-all duration-300"
                style={{ border: `1px solid ${activeTab === i ? color.flame : color.dustTaupe}`, background: activeTab === i ? color.cream : color.lifted }}>
                <span className="flex size-[20px] items-center justify-center rounded-[2px] font-mono text-xs tracking-[-0.98px]"
                  style={{ background: activeTab === i ? color.flame : color.ghostCream, color: activeTab === i ? color.lifted : color.slate }}>
                  {String(tab.id).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs leading-normal tracking-[-0.28px]" style={{ color: color.ink }}>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden lg:block lg:w-[226px] lg:shrink-0">
            <div className="lg:sticky" style={{ top: 96 }}>
              <div className="relative">
                <div className="absolute inset-0 hidden lg:block" style={{ border: `1px solid ${color.dustTaupe}` }} />
                <div className="relative flex overflow-x-auto lg:flex-col">
                  {TABS.map((tab, i) => (
                    <button key={tab.id} onClick={() => handleTabClick(i)} type="button"
                      className="flex min-w-[160px] shrink-0 items-center gap-[14px] p-[10px] text-left transition-all duration-300 lg:w-full lg:min-w-0"
                      style={{ border: `1px solid ${activeTab === i ? color.flame : color.dustTaupe}`, background: activeTab === i ? color.cream : color.lifted }}>
                      <span className="flex size-[23px] items-center justify-center rounded-[2px] p-0.5 font-mono text-sm tracking-[-0.98px] transition-colors duration-300"
                        style={{ background: activeTab === i ? color.flame : color.ghostCream, color: activeTab === i ? color.lifted : color.slate }}>
                        {String(tab.id).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-sm leading-normal tracking-[-0.28px]" style={{ color: color.ink }}>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div ref={cardsContainerRef} className="flex-1 pb-[60vh]">
            {TABS.map((tab, i) => (<StickyCard key={tab.id} tab={tab} i={i} total={TABS.length} setCardRef={setCardRef} progress={scrollYProgress} />))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LCWhySoftree
