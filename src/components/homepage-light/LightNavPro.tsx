"use client"

/**
 * LightNavPro — Premium floating navbar for the /light page.
 *
 * Design language: warm cream canvas, ink text, flame/sunshine accents,
 * floating pill with backdrop blur, glass dropdowns with mega-menu panels
 * for Services / Work / Process, ink-black primary CTA.
 *
 * Interactions:
 *   - Hover open with 120ms delay (prevents accidental open)
 *   - Leave close with 300ms delay (allows diagonal travel to panel)
 *   - Active underline indicator on hovered/open menu
 *   - ESC closes any open panel
 *   - Mobile: slide-down full-screen sheet with accordion sections
 */

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Brain, Code2, Database, Cloud, Layers, Workflow, Sparkles, Rocket, Menu, X } from "lucide-react"
import { color, shadow } from "./tokens"
import { InkPill } from "./primitives"

type MenuKey = "services" | "work" | "process" | null

const OPEN_DELAY = 120
const CLOSE_DELAY = 280

/* ─── Data ─── */

const SERVICES = [
  {
    group: "AI Intelligence",
    color: color.flame,
    visual: "/whysoftree/ai.webp",
    items: [
      { icon: <Brain className="h-4 w-4" />, name: "Agentic AI", desc: "Autonomous agents that act & decide", badge: "NEW", href: "/services/ai-intelligence/agentic-ai" },
      { icon: <Sparkles className="h-4 w-4" />, name: "Generative AI", desc: "Custom LLMs on your data", href: "/services/ai-intelligence/generative-ai" },
    ],
  },
  {
    group: "Business Apps",
    color: color.mistral,
    visual: "/whysoftree/web.webp",
    items: [
      { icon: <Rocket className="h-4 w-4" />, name: "MVP Development", desc: "Idea to market in weeks", href: "/services/business-applications/mvp" },
      { icon: <Workflow className="h-4 w-4" />, name: "Power Apps", desc: "Microsoft low-code automation", href: "/services/business-applications/power-apps" },
    ],
  },
  {
    group: "Data & Analytics",
    color: color.sunshine,
    visual: "/whysoftree/data.webp",
    items: [
      { icon: <Database className="h-4 w-4" />, name: "Microsoft Fabric", desc: "Unified analytics platform", href: "/services/data-analytics/microsoft-fabric" },
      { icon: <Database className="h-4 w-4" />, name: "Power BI", desc: "Real-time dashboards", href: "/services/data-analytics/power-bi" },
    ],
  },
  {
    group: "Digital Workspace",
    color: color.gold,
    visual: "/whysoftree/microsoft.webp",
    items: [
      { icon: <Code2 className="h-4 w-4" />, name: "Web Apps", desc: "Scalable enterprise web", href: "/services/digital-workspace/web-app-development" },
      { icon: <Code2 className="h-4 w-4" />, name: "Mobile Apps", desc: "iOS & Android, native feel", href: "/services/digital-workspace/mobile-app-development" },
      { icon: <Layers className="h-4 w-4" />, name: "SharePoint & SPFx", desc: "M365 portals & extensions", href: "/services/digital-workspace/sharepoint" },
      { icon: <Cloud className="h-4 w-4" />, name: "Cloud Platform", desc: "Azure-native at scale", href: "/services/digital-workspace/cloud" },
    ],
  },
] as const

const WORK_LINKS = [
  {
    group: "Selected Work", items: [
      { name: "Web Platforms", href: "/case-studies/web" },
      { name: "Mobile Products", href: "/case-studies/mobile" },
      { name: "AI Systems", href: "/case-studies/ai" },
      { name: "Power Apps", href: "/case-studies/power-apps" },
    ]
  },
  {
    group: "Proof Points", items: [
      { name: "Enterprise delivery", href: "/services" },
      { name: "Microsoft depth", href: "/services" },
      { name: "Senior squads", href: "/services" },
      { name: "Scope a project", href: "/contact" },
    ]
  },
] as const

const PROCESS_LINKS = [
  {
    group: "Process", items: [
      { name: "Validate & Plan", href: "/services" },
      { name: "Architect for Scale", href: "/services" },
      { name: "Engineer & Integrate", href: "/services" },
      { name: "Launch & Support", href: "/services" },
    ]
  },
  {
    group: "Engagements", items: [
      { name: "Discovery Sprint", href: "/contact" },
      { name: "Dedicated Team", href: "/contact" },
      { name: "Fixed-Scope Build", href: "/contact" },
      { name: "Partner With Us", href: "/together" },
    ]
  },
] as const

const TOP_LINKS: { label: string; href: string }[] = [
  { label: "Industries", href: "#industries" },
  { label: "Insights", href: "#insights" },
  { label: "About", href: "/about-us" },
]

/* ─── Main Nav ─── */

export default function LightNavPro() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<MenuKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const openTimer = useRef<number | null>(null)
  const closeTimer = useRef<number | null>(null)

  /* Scroll shadow */
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  /* ESC closes */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [])

  /* Lock body scroll on mobile open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const scheduleOpen = (key: MenuKey) => {
    if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null }
    if (openTimer.current) window.clearTimeout(openTimer.current)
    openTimer.current = window.setTimeout(() => setActive(key), OPEN_DELAY)
  }
  const scheduleClose = () => {
    if (openTimer.current) { window.clearTimeout(openTimer.current); openTimer.current = null }
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setActive(null), CLOSE_DELAY)
  }

  const navItem = (key: "services" | "work" | "process", label: string) => {
    const isOpen = active === key
    return (
      <div
        className="relative"
        onMouseEnter={() => scheduleOpen(key)}
        onMouseLeave={scheduleClose}
      >
        <button
          className="relative inline-flex items-center gap-1 py-2 text-[15px] font-medium transition-colors"
          style={{ color: isOpen ? color.flame : color.ink, letterSpacing: "-0.2px" }}
          aria-expanded={isOpen}
        >
          {label}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {isOpen && (
            <motion.span
              layoutId="nav-indicator"
              className="absolute -bottom-px left-0 right-0 h-px"
              style={{ background: color.flame }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />
          )}
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Backdrop blur behind open panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: "rgba(20,20,19,0.18)", backdropFilter: "blur(8px)" }}
            onClick={() => setActive(null)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Floating Nav */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4"
        style={{ paddingTop: scrolled ? 12 : 20, transition: "padding 280ms cubic-bezier(0.23,1,0.32,1)" }}
      >
        <nav
          className="pointer-events-auto relative flex w-full max-w-[1280px] items-center gap-6 px-4 py-2 md:px-6 md:py-2.5"
          style={{
            background: scrolled ? "rgba(252,251,250,0.82)" : "rgba(255,255,255,0.92)",
            backdropFilter: "blur(24px) saturate(1.6)",
            WebkitBackdropFilter: "blur(24px) saturate(1.6)",
            border: `1px solid ${scrolled ? "rgba(20,20,19,0.08)" : "rgba(20,20,19,0.04)"}`,
            borderRadius: 999,
            boxShadow: scrolled
              ? "0 12px 48px rgba(127,99,21,0.14), 0 2px 8px rgba(20,20,19,0.04)"
              : shadow.pill,
            transition: "background 320ms ease, box-shadow 320ms ease, border-color 320ms ease",
          }}
          onMouseLeave={scheduleClose}
        >
          {/* Logo */}
          <Link href="/light" aria-label="Softree home" className="flex shrink-0 items-center" style={{ textDecoration: "none" }}>
            <Image
              src="/brand/softree-logo-light-bg.png"
              alt="Softree Technology"
              width={760}
              height={195}
              priority
              style={{ height: 26, width: "auto", display: "block" }}
            />
          </Link>

          {/* Desktop links */}
          <div className="mx-auto hidden items-center gap-7 lg:flex">
            {navItem("services", "Services")}
            {navItem("work", "Work")}
            {navItem("process", "Process")}
            {TOP_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-2 text-[15px] font-medium transition-colors hover:opacity-70"
                style={{ color: color.ink, letterSpacing: "-0.2px", textDecoration: "none" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-1.5 py-2 text-[15px] font-medium transition-colors hover:opacity-70"
              style={{ color: color.ink, letterSpacing: "-0.2px", textDecoration: "none" }}
            >
              Contact
            </Link>
            <InkPill href="/contact" size="sm" className="hidden md:inline-flex">
              Start a project
              <ArrowRight className="h-3.5 w-3.5" />
            </InkPill>

            {/* Mobile menu button */}
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border transition-colors lg:hidden"
              style={{ borderColor: "rgba(20,20,19,0.12)", background: "transparent", color: color.ink }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {/* Dropdown panels */}
          <AnimatePresence>
            {active === "services" && (
              <DropdownPanel key="services" onMouseEnter={() => { if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null } }} onMouseLeave={scheduleClose} width={1080}>
                <ServicesPanel onClose={() => setActive(null)} />
              </DropdownPanel>
            )}
            {active === "work" && (
              <DropdownPanel key="work" onMouseEnter={() => { if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null } }} onMouseLeave={scheduleClose} width={920}>
                <LinksPanel
                  groups={WORK_LINKS}
                  ctaHref="/case-studies/web"
                  ctaLabel="See all work"
                  featureSrc="/whysoftree/web dev.webp"
                  featureTitle="Case Studies"
                  featureDesc="See how Softree turns complex business needs into shipped digital products."
                  featureHref="/case-studies/web"
                  onClose={() => setActive(null)}
                />
              </DropdownPanel>
            )}
            {active === "process" && (
              <DropdownPanel key="process" onMouseEnter={() => { if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null } }} onMouseLeave={scheduleClose} width={920}>
                <LinksPanel
                  groups={PROCESS_LINKS}
                  ctaHref="/services"
                  ctaLabel="Our approach"
                  featureSrc="/whysoftree/image.png"
                  featureTitle="Delivery Model"
                  featureDesc="A senior product and engineering team built around how your organization works."
                  featureHref="/together"
                  onClose={() => setActive(null)}
                />
              </DropdownPanel>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col lg:hidden"
            style={{ background: color.canvas, paddingTop: 88 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex-1 overflow-y-auto px-6 pb-12">
              <MobileSection label="Services">
                {SERVICES.map((s) => (
                  <div key={s.group} className="mb-6">
                    <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: color.slate }}>{s.group}</p>
                    <ul className="flex flex-col gap-1">
                      {s.items.map((it) => (
                        <li key={it.name}>
                          <Link href={it.href} className="flex items-center gap-3 rounded-md px-2 py-2.5 transition-colors hover:bg-black/[0.04]" style={{ color: color.ink, textDecoration: "none" }} onClick={() => setMobileOpen(false)}>
                            <span style={{ color: s.color }}>{it.icon}</span>
                            <span className="text-[15px] font-medium">{it.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </MobileSection>
              <MobileSection label="Work">
                {WORK_LINKS.map((g) => <MobileLinkGroup key={g.group} group={g.group} items={g.items} onClose={() => setMobileOpen(false)} />)}
              </MobileSection>
              <MobileSection label="Process">
                {PROCESS_LINKS.map((g) => <MobileLinkGroup key={g.group} group={g.group} items={g.items} onClose={() => setMobileOpen(false)} />)}
              </MobileSection>

              {TOP_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="block border-b py-4 text-xl font-medium" style={{ color: color.ink, borderColor: color.dustTaupe, textDecoration: "none" }} onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              ))}

              <div className="mt-8 flex flex-col gap-3">
                <InkPill href="/contact" size="lg">Start a project <ArrowRight className="h-4 w-4" /></InkPill>
                <Link href="/contact" className="text-center text-[15px] font-medium" style={{ color: color.slate, textDecoration: "none" }} onClick={() => setMobileOpen(false)}>
                  Or talk to sales →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}

/* ─── Dropdown shell ─── */

function DropdownPanel({ children, onMouseEnter, onMouseLeave, width }: {
  children: React.ReactNode
  onMouseEnter: () => void
  onMouseLeave: () => void
  width: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      className="absolute left-1/2 top-[calc(100%+10px)] z-50 -translate-x-1/2"
      style={{
        width: `min(calc(100vw - 32px), ${width}px)`,
        background: color.lifted,
        border: `1px solid ${color.dustTaupe}`,
        borderRadius: 20,
        boxShadow: "0 24px 60px rgba(127,99,21,0.18), 0 8px 24px rgba(20,20,19,0.06)",
        overflow: "hidden",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  )
}

/* ─── Services panel (4-col with visuals) ─── */

function ServiceVisual({ src, label, tone }: { src: string; label: string; tone: string }) {
  return (
    <div className="group/visual relative mb-3 h-[88px] overflow-hidden rounded-lg" style={{ border: `1px solid ${color.dustTaupe}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/visual:scale-[1.06]"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,20,19,0.55), transparent 60%)" }} />
      <span
        className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em]"
        style={{ background: "rgba(252,251,250,0.92)", backdropFilter: "blur(8px)", color: color.ink }}
      >
        <span className="h-1 w-1 rounded-full" style={{ background: tone }} />
        {label}
      </span>
    </div>
  )
}

function ServicesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-5 md:p-6">
      <div className="mb-5 flex items-start justify-between gap-8">
        <Link href="/services" onClick={onClose} className="group inline-flex items-center gap-2" style={{ textDecoration: "none" }}>
          <span className="text-2xl font-medium leading-none" style={{ color: color.ink, letterSpacing: "-0.5px" }}>Services</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" style={{ color: color.ink }} />
        </Link>
        <p className="hidden max-w-[360px] text-right text-[13px] leading-relaxed md:block" style={{ color: color.slate }}>
          Strategy, engineering, automation, and AI delivery for teams that need production-grade software.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-4">
        {SERVICES.map((col) => (
          <div key={col.group}>
            <ServiceVisual src={col.visual} label={col.group} tone={col.color} />
            <ul className="flex flex-col gap-0.5">
              {col.items.map((it) => (
                <li key={it.name}>
                  <Link
                    href={it.href}
                    onClick={onClose}
                    className="group flex items-start gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-black/[0.03]"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="mt-0.5 shrink-0" style={{ color: col.color }}>{it.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate text-[14px] font-medium" style={{ color: color.ink }}>{it.name}</span>
                        {"badge" in it && it.badge && (
                          <span
                            className="rounded-sm px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider"
                            style={{ background: color.flame, color: "#fff" }}
                          >
                            {it.badge}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug" style={{ color: color.slate }}>{it.desc}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-end gap-6 border-t pt-4" style={{ borderColor: color.dustTaupe }}>
        <Link href="/services" onClick={onClose} className="group inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-widest" style={{ color: color.ink, textDecoration: "none" }}>
          All services
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
        <Link href="/contact" onClick={onClose} className="group inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-widest" style={{ color: color.flame, textDecoration: "none" }}>
          Get a quote
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}

/* ─── FullImageCard — feature tile on the right of panel ─── */

function FullImageCard({ href, src, title, desc, onClose }: {
  href: string; src: string; title: string; desc: string; onClose: () => void
}) {
  return (
    <Link href={href} onClick={onClose} className="group/fic relative block h-[248px] overflow-hidden rounded-lg" style={{ textDecoration: "none" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover/fic:scale-[1.08]" loading="lazy" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,20,19,0.85) 0%, rgba(20,20,19,0.25) 45%, transparent 70%)" }} />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <span className="mb-1 flex items-center gap-1.5">
          <p className="text-base font-medium">{title}</p>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/fic:translate-x-1" />
        </span>
        <p className="text-[12px] leading-snug opacity-85">{desc}</p>
      </div>
    </Link>
  )
}

/* ─── Generic links + image panel ─── */

function LinksPanel({ groups, ctaHref, ctaLabel, featureSrc, featureTitle, featureDesc, featureHref, onClose }: {
  groups: readonly { group: string; items: readonly { name: string; href: string }[] }[]
  ctaHref: string
  ctaLabel: string
  featureSrc: string
  featureTitle: string
  featureDesc: string
  featureHref: string
  onClose: () => void
}) {
  return (
    <div className="p-5 md:p-6">
      <div className="grid gap-6" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) 248px" }}>
        {groups.map((g) => (
          <div key={g.group}>
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: color.slate }}>{g.group}</p>
            <ul className="flex flex-col gap-0.5">
              {g.items.map((it) => (
                <li key={it.name}>
                  <Link
                    href={it.href}
                    onClick={onClose}
                    className="block rounded-md px-2 py-2 text-[14px] font-medium transition-colors hover:bg-black/[0.03]"
                    style={{ color: color.ink, textDecoration: "none" }}
                  >
                    {it.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <FullImageCard href={featureHref} src={featureSrc} title={featureTitle} desc={featureDesc} onClose={onClose} />
      </div>
      <div className="mt-5 flex items-center justify-end border-t pt-4" style={{ borderColor: color.dustTaupe }}>
        <Link href={ctaHref} onClick={onClose} className="group inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-widest" style={{ color: color.flame, textDecoration: "none" }}>
          {ctaLabel}
          <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}

/* ─── Mobile accordion ─── */

function MobileSection({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b" style={{ borderColor: color.dustTaupe }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4"
        aria-expanded={open}
      >
        <span className="text-xl font-medium" style={{ color: color.ink }}>{label}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms" }}>
          <path d="M4 6L8 10L12 6" stroke={color.slate} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileLinkGroup({ group, items, onClose }: { group: string; items: readonly { name: string; href: string }[]; onClose: () => void }) {
  return (
    <div className="mb-6">
      <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest" style={{ color: color.slate }}>{group}</p>
      <ul className="flex flex-col gap-1">
        {items.map((it) => (
          <li key={it.name}>
            <Link href={it.href} onClick={onClose} className="block rounded-md px-2 py-2.5 text-[15px] font-medium transition-colors hover:bg-black/[0.04]" style={{ color: color.ink, textDecoration: "none" }}>
              {it.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
