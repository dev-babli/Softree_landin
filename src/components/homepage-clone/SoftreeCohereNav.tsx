"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

gsap.registerPlugin(useGSAP)

/* ═══════════════════════════════════════════════════════════════════════
   COHERE-STYLE MEGA-MENU NAVIGATION — EXACT 1:1 CLONE
   ═══════════════════════════════════════════════════════════════════════
   Architecture (reverse-engineered from original Cohere Next.js app):
   
   1. Each <li class="group/listItem"> has a dropdown panel inside it
   2. Dropdowns use `absolute left-1/2 -translate-x-1/2` from the <nav>
      (since <li> has no `relative`, positioning is relative to <nav>)
   3. CSS `group-hover/listItem:pointer-events-auto` enables interaction
   4. JavaScript (React state) controls opacity/translate classes
   5. The hover bridge has `pointer-event-auto` (TYPO = no-op class),
      meaning it inherits pointer-events from parent dropdown
   6. A fixed backdrop-blur div at z-[99] shows behind dropdowns
   
   This means:
   - mouseenter on <li> → JS sets activeMenu
   - mouseleave on <li> → JS schedules close with 150ms delay
   - mouseenter on dropdown → cancels close
   - mouseleave on dropdown → schedules close
   ═══════════════════════════════════════════════════════════════════════ */

type MenuKey = "services" | "industries" | "research" | "resources" | "company" | null
type DesktopMenuKey = Exclude<MenuKey, null>

/* ── Image URLs (Cohere Sanity CDN — preserved exactly) ──────── */
const SRCSET = {
  workplace: {
    srcSet: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/cff6f2e06a77c8723d28e42433a1ba082ef40f2d-568x200.webp?auto=format&fit=max&q=90&w=142 142w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/cff6f2e06a77c8723d28e42433a1ba082ef40f2d-568x200.webp?auto=format&fit=max&q=90&w=284 284w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/cff6f2e06a77c8723d28e42433a1ba082ef40f2d-568x200.webp?auto=format&fit=max&q=90&w=426 426w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/cff6f2e06a77c8723d28e42433a1ba082ef40f2d-568x200.webp?auto=format&fit=max&q=90&w=568 568w",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/cff6f2e06a77c8723d28e42433a1ba082ef40f2d-568x200.webp?auto=format&fit=max&q=90&w=284",
  },
  generative: {
    srcSet: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/7a6847b6b18232d047c6774ce002f5de649e5f65-568x200.webp?auto=format&fit=max&q=90&w=142 142w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/7a6847b6b18232d047c6774ce002f5de649e5f65-568x200.webp?auto=format&fit=max&q=90&w=284 284w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/7a6847b6b18232d047c6774ce002f5de649e5f65-568x200.webp?auto=format&fit=max&q=90&w=426 426w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/7a6847b6b18232d047c6774ce002f5de649e5f65-568x200.webp?auto=format&fit=max&q=90&w=568 568w",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/7a6847b6b18232d047c6774ce002f5de649e5f65-568x200.webp?auto=format&fit=max&q=90&w=284",
  },
  retrieval: {
    srcSet: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/56eebe2418cc4ef32114faedafd4dec1e10426d9-568x200.webp?auto=format&fit=max&q=90&w=142 142w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/56eebe2418cc4ef32114faedafd4dec1e10426d9-568x200.webp?auto=format&fit=max&q=90&w=284 284w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/56eebe2418cc4ef32114faedafd4dec1e10426d9-568x200.webp?auto=format&fit=max&q=90&w=426 426w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/56eebe2418cc4ef32114faedafd4dec1e10426d9-568x200.webp?auto=format&fit=max&q=90&w=568 568w",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/56eebe2418cc4ef32114faedafd4dec1e10426d9-568x200.webp?auto=format&fit=max&q=90&w=284",
  },
  modelVault: {
    srcSet: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/576565d3fd7ed8946389af7b03c5d38a0b652b4e-576x576.png?auto=format&fit=max&q=100&w=144 144w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/576565d3fd7ed8946389af7b03c5d38a0b652b4e-576x576.png?auto=format&fit=max&q=100&w=288 288w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/576565d3fd7ed8946389af7b03c5d38a0b652b4e-576x576.png?auto=format&fit=max&q=100&w=432 432w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/576565d3fd7ed8946389af7b03c5d38a0b652b4e-576x576.png?auto=format&fit=max&q=100&w=576 576w",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/576565d3fd7ed8946389af7b03c5d38a0b652b4e-576x576.png?auto=format&fit=max&q=100&w=288",
  },
  cohereLabs: {
    srcSet: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/c0c46b9c5008a6c82db0cf1c2acf23bf7dab0044-576x576.png?auto=format&fit=max&q=100&w=144 144w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/c0c46b9c5008a6c82db0cf1c2acf23bf7dab0044-576x576.png?auto=format&fit=max&q=100&w=288 288w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/c0c46b9c5008a6c82db0cf1c2acf23bf7dab0044-576x576.png?auto=format&fit=max&q=100&w=432 432w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/c0c46b9c5008a6c82db0cf1c2acf23bf7dab0044-576x576.png?auto=format&fit=max&q=100&w=576 576w",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/c0c46b9c5008a6c82db0cf1c2acf23bf7dab0044-576x576.png?auto=format&fit=max&q=100&w=288",
  },
  customerStories: {
    srcSet: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/59fde454e2ea82b26d068438e4344a7e8e090ac5-576x576.png?auto=format&fit=max&q=100&w=144 144w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/59fde454e2ea82b26d068438e4344a7e8e090ac5-576x576.png?auto=format&fit=max&q=100&w=288 288w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/59fde454e2ea82b26d068438e4344a7e8e090ac5-576x576.png?auto=format&fit=max&q=100&w=432 432w, https://cdn.sanity.io/images/rjtqmwfu/web3-prod/59fde454e2ea82b26d068438e4344a7e8e090ac5-576x576.png?auto=format&fit=max&q=100&w=576 576w",
    src: "https://cdn.sanity.io/images/rjtqmwfu/web3-prod/59fde454e2ea82b26d068438e4344a7e8e090ac5-576x576.png?auto=format&fit=max&q=100&w=288",
  },
}

/* ── Inline SVG Icons ──────────────────────────────────────────── */
function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/* ── Animated service icons — animations play on parent hover via group ── */
const NAV_ICON_STYLES = `
  @keyframes nav-spin { to { transform: rotate(360deg); } }
  @keyframes nav-pulse { 0%,100%{opacity:1;} 50%{opacity:.4;} }
  @keyframes nav-bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-3px);} }
  @keyframes nav-scan { 0%{stroke-dashoffset:56;} 100%{stroke-dashoffset:0;} }
  @keyframes nav-float { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-2px) rotate(3deg);} }
  .group\/image-list:hover .nav-icon-spin { animation: nav-spin 1.2s linear infinite; transform-origin: center; transform-box: fill-box; }
  .group\/image-list:hover .nav-icon-pulse { animation: nav-pulse 1s ease-in-out infinite; }
  .group\/image-list:hover .nav-icon-bounce { animation: nav-bounce .7s ease-in-out infinite; }
  .group\/image-list:hover .nav-icon-scan { stroke-dasharray:56; stroke-dashoffset:56; animation: nav-scan .8s ease forwards; }
  .group\/image-list:hover .nav-icon-float { animation: nav-float 1.2s ease-in-out infinite; }
`

function NavIconStyles() {
  return <style dangerouslySetInnerHTML={{ __html: NAV_ICON_STYLES }} />
}

/* AI Intelligence — animated brain/circuit icon */
function IconAI({ color = "#A855F7" }: { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path className="nav-icon-float" d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V12" />
      <circle cx="12" cy="16" r="4" className="nav-icon-pulse" />
      <path d="M8 6a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5" />
      <path d="M16 6a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5" />
    </svg>
  )
}

/* Business Applications — rocket */
function IconBusiness({ color = "#FF7759" }: { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path className="nav-icon-bounce" d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path className="nav-icon-pulse" d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path className="nav-icon-pulse" d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

/* Data Analytics — bar chart with animated fill */
function IconData({ color = "#3B82F6" }: { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" className="nav-icon-bounce" style={{ animationDelay: "0s" }} />
      <line x1="12" y1="20" x2="12" y2="4" className="nav-icon-bounce" style={{ animationDelay: "0.15s" }} />
      <line x1="6" y1="20" x2="6" y2="14" className="nav-icon-bounce" style={{ animationDelay: "0.3s" }} />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  )
}

/* Digital Workspace — monitor with spinning gear */
function IconWorkspace({ color = "#10B981" }: { color?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" /><path d="M12 17v4" />
      <circle cx="12" cy="10" r="2" className="nav-icon-spin" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   REUSABLE SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */

function ProductItem({ href, icon, color = "#A855F7", name, desc, badge }: {
  href: string; icon?: React.ReactNode; color?: string; name: string; desc: string; badge?: string
}) {
  return (
    <li data-nav-reveal className="group/image-list relative">
      <Link
        href={href}
        className="relative block rounded-md px-2.5 py-2.5 transition-colors duration-200 hover:bg-[#eeeeee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40"
      >
        <span className="relative flex min-h-7 items-center gap-2.5">
          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
            {icon ?? <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />}
          </span>
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="truncate text-[15px] font-normal leading-none text-[#1a1a1a] lg:text-base">{name}</span>
            {badge && (
              <span className="inline-flex flex-shrink-0 items-center rounded-[3px] bg-[#F3E3F5] px-1.5 py-px text-[9px] font-semibold uppercase leading-none tracking-wider text-black">
                {badge}
              </span>
            )}
          </span>
        </span>
      </Link>
    </li>
  )
}

function LinkItem({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const Tag = external ? "a" : Link
  const extra = external ? { rel: "noopener noreferrer" as const, target: "_blank" as const } : {}
  return (
    <li data-nav-reveal className="group/link-list relative">
      <Tag
        href={href}
        className="relative block rounded-md px-2.5 py-2 text-[#1a1a1a] transition-colors duration-200 hover:bg-[#eeeeee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/40"
        {...extra}
      >
        <span className="block truncate text-[15px] font-normal leading-snug lg:text-base">{label}</span>
      </Tag>
    </li>
  )
}

function FullImageCard({ href, imgSrc, imgSrcSet, title, desc, gradientTo = "rgb(0, 0, 0)", external }: {
  href: string; imgSrc: string; imgSrcSet: string; title: string; desc: string; gradientTo?: string; external?: boolean
}) {
  const Tag = external ? "a" : Link
  const extra = external ? { rel: "noopener noreferrer" as const, target: "_blank" as const } : {}
  return (
    <Tag data-nav-reveal href={href} className="group/fullImage relative block h-[248px] w-full overflow-hidden rounded-lg sm:h-[288px]" {...extra}>
      <img alt="" className="h-full w-full object-cover object-center transition-all duration-300 ease-in-out group-hover/fullImage:scale-[1.12]" width={288} height={288} srcSet={imgSrcSet} src={imgSrc} />
      <div tabIndex={-1} className="absolute bottom-0 h-[137px] w-full rounded-sm object-cover opacity-100 transition-all duration-500 ease-in-out" style={{ background: `linear-gradient(rgba(243, 227, 245, 0) 3.88%, ${gradientTo} 56.2%)` }} />
      <div className="absolute bottom-4 px-4 text-white">
        <span className="mb-2 flex items-center gap-x-1">
          <p className="text-base lg:text-lg font-normal">{title}</p>
          <ArrowRight className="h-4 w-4 transition-transform group-hover/fullImage:translate-x-1" />
        </span>
        <p className="text-sm font-normal">{desc}</p>
      </div>
    </Tag>
  )
}

function ServiceVisual({ imgSrc, imgSrcSet, label }: { imgSrc: string; imgSrcSet: string; label: string }) {
  return (
    <div
      data-nav-reveal
      className="relative h-[104px] overflow-hidden rounded-xl border border-black/5 bg-[#111] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
    >
      <img
        alt=""
        className="h-full w-full object-cover object-center opacity-95 transition-transform duration-500 ease-out group-hover/image-list:scale-[1.04]"
        width={240}
        height={104}
        srcSet={imgSrcSet}
        src={imgSrc}
      />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase leading-none tracking-[0.12em] text-white/90 backdrop-blur-md">
        {label}
      </span>
    </div>
  )
}

function BottomLink({ href, label }: { href: string; label: string }) {
  return (
    <Link data-nav-reveal href={href} className="group/bottom-row flex items-center gap-x-1.5">
      <p className="text-sm font-normal uppercase">{label}</p>
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/bottom-row:translate-x-1" />
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   DROPDOWN PANELS — Desktop
   ═══════════════════════════════════════════════════════════════════════ */

function ServicesPanel() {
  return (
    <div className="relative w-full bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] px-5 py-5 lg:px-6">
      <NavIconStyles />
      <div className="mb-5 flex items-start justify-between gap-8">
        <Link href="/services" data-nav-reveal className="group/drawer-title flex items-center gap-x-2">
          <p className="text-[26px] font-normal leading-none text-[#151515]">Services</p>
          <ArrowRight className="mt-0.5 h-5 w-5 transition-transform group-hover/drawer-title:translate-x-1" />
        </Link>
        <p data-nav-reveal className="hidden max-w-[430px] text-right text-sm leading-6 text-[#606060] xl:block">
          Strategy, engineering, automation, and AI delivery for teams that need production-grade software without slow handoffs.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-x-5 gap-y-6">
        {/* Col 1 — AI Intelligence */}
        <div className="min-w-0">
          <div className="relative group/image">
            <ServiceVisual imgSrc={SRCSET.generative.src} imgSrcSet={SRCSET.generative.srcSet} label="AI Intelligence" />
          </div>
          <ul className="mt-2 list-none space-y-1">
            <ProductItem href="/services/ai-intelligence/agentic-ai" icon={<IconAI />} name="Agentic AI" desc="Autonomous AI agents that act, decide, and complete complex tasks end-to-end" badge="NEW" />
            <ProductItem href="/services/ai-intelligence/generative-ai" icon={<IconAI color="#C084FC" />} name="Generative AI" desc="Custom LLM solutions fine-tuned on your enterprise data and workflows" />
          </ul>
        </div>
        {/* Col 2 — Business Applications */}
        <div className="min-w-0">
          <div className="relative group/image">
            <ServiceVisual imgSrc={SRCSET.workplace.src} imgSrcSet={SRCSET.workplace.srcSet} label="Business Apps" />
          </div>
          <ul className="mt-2 list-none space-y-1">
            <ProductItem href="/services/business-applications/mvp" icon={<IconBusiness />} name="MVP Development" desc="Go from idea to market-ready product with rapid, agile MVP delivery" />
            <ProductItem href="/services/business-applications/power-apps" icon={<IconBusiness color="#FB923C" />} name="Power Apps" desc="Low-code Microsoft Power Apps solutions for enterprise-grade automation" />
            <ProductItem href="/services/business-applications/softree-for-startups" icon={<IconBusiness color="#FBBF24" />} name="For Startups" desc="Tailored packages to help startups scale with enterprise-level tech" />
          </ul>
        </div>
        {/* Col 3 — Data Analytics */}
        <div className="min-w-0">
          <div className="relative group/image">
            <ServiceVisual imgSrc={SRCSET.retrieval.src} imgSrcSet={SRCSET.retrieval.srcSet} label="Data & Analytics" />
          </div>
          <ul className="mt-2 list-none space-y-1">
            <ProductItem href="/services/data-analytics/microsoft-fabric" icon={<IconData />} name="Microsoft Fabric" desc="Unified analytics platform for data engineering, warehousing, and BI" />
            <ProductItem href="/services/data-analytics/power-bi" icon={<IconData color="#60A5FA" />} name="Power BI" desc="Interactive dashboards and real-time business intelligence reports" />
          </ul>
        </div>
        {/* Col 4 — Digital Workspace */}
        <div className="min-w-0">
          <div className="relative group/image">
            <ServiceVisual imgSrc={SRCSET.modelVault.src} imgSrcSet={SRCSET.modelVault.srcSet} label="Digital Workspace" />
          </div>
          <ul className="mt-2 list-none space-y-1">
            <ProductItem href="/services/digital-workspace/web-app-development" icon={<IconWorkspace />} name="Web Apps" desc="Scalable, performant web applications built for enterprise environments" />
            <ProductItem href="/services/digital-workspace/mobile-app-development" icon={<IconWorkspace color="#34D399" />} name="Mobile Apps" desc="Cross-platform iOS and Android apps with native-grade performance" />
            <ProductItem href="/services/digital-workspace/sharepoint" icon={<IconWorkspace color="#6EE7B7" />} name="SharePoint" desc="Intranet portals and document management built on Microsoft SharePoint" />
            <ProductItem href="/services/digital-workspace/spfx-developments" icon={<IconWorkspace color="#A7F3D0" />} name="SPFx" desc="Custom SharePoint Framework web parts and extensions for M365" />
          </ul>
        </div>
      </div>
      <div className="mt-5 flex w-full justify-end gap-x-10 border-t border-[#e0e0e0] py-4 pr-1">
        <BottomLink href="/services" label="All Services" />
        <BottomLink href="/contact" label="Get a Quote" />
      </div>
    </div>
  )
}

function IndustriesPanel() {
  return (
    <div className="relative w-full px-5 py-5 lg:px-6">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_288px] gap-x-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Selected Work</p>
          <ul className="flex list-none flex-col gap-y-1">
            <LinkItem href="/case-studies/web" label="Web Platforms" />
            <LinkItem href="/case-studies/mobile" label="Mobile Products" />
            <LinkItem href="/case-studies/ai" label="AI Systems" />
            <LinkItem href="/case-studies/power-apps" label="Power Apps" />
            <LinkItem href="/case-studies/sharepoint" label="SharePoint" />
          </ul>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Proof Points</p>
          <ul className="flex list-none flex-col gap-y-1">
            <LinkItem href="/services" label="Enterprise delivery" />
            <LinkItem href="/services" label="Senior engineering squads" />
            <LinkItem href="/services" label="Microsoft ecosystem depth" />
            <LinkItem href="/contact" label="Scope a similar project" />
          </ul>
        </div>
        <FullImageCard href="/case-studies/web" imgSrc={SRCSET.modelVault.src} imgSrcSet={SRCSET.modelVault.srcSet} title="Case Studies" desc="See how Softree turns complex business needs into shipped digital products." />
      </div>
      <div className="mt-5 flex w-full justify-end gap-x-10 border-t border-[#e0e0e0] py-4 pr-1">
        <BottomLink href="/services" label="Explore Services" />
        <BottomLink href="/contact" label="Start A Project" />
      </div>
    </div>
  )
}

function ResearchPanel() {
  return (
    <div className="relative w-full px-5 py-5 lg:px-6">
      <div className="grid grid-cols-[288px_minmax(0,1fr)_minmax(0,1fr)] gap-x-6">
        <FullImageCard href="/together" imgSrc={SRCSET.cohereLabs.src} imgSrcSet={SRCSET.cohereLabs.srcSet} title="Delivery Model" desc="A senior product and engineering team built around the way your organization works." gradientTo="rgb(18, 27, 54)" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Process</p>
          <ul className="flex list-none flex-col gap-y-1">
            <LinkItem href="/services" label="Validate & Plan" />
            <LinkItem href="/services" label="Architect for Scale" />
            <LinkItem href="/services" label="Engineer & Integrate" />
            <LinkItem href="/services" label="Launch & Support" />
          </ul>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Engagements</p>
          <ul className="flex list-none flex-col gap-y-1">
            <LinkItem href="/contact" label="Discovery Sprint" />
            <LinkItem href="/contact" label="Dedicated Team" />
            <LinkItem href="/contact" label="Fixed-Scope Build" />
            <LinkItem href="/together" label="Partner With Us" />
          </ul>
        </div>
      </div>
    </div>
  )
}

function ResourcesPanel() {
  return (
    <div className="relative w-full px-5 py-5 lg:px-6">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_288px] gap-x-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Start Here</p>
          <ul className="flex list-none flex-col gap-y-1">
            <LinkItem href="/services" label="Services Overview" />
            <LinkItem href="/case-studies/web" label="Web Case Study" />
            <LinkItem href="/case-studies/ai" label="AI Case Study" />
            <LinkItem href="/about-us" label="About Softree" />
          </ul>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Popular Services</p>
          <ul className="flex list-none flex-col gap-y-1">
            <LinkItem href="/services/digital-workspace/web-app-development" label="Web App Development" />
            <LinkItem href="/services/ai-intelligence/agentic-ai" label="Agentic AI" />
            <LinkItem href="/services/data-analytics/power-bi" label="Power BI" />
            <LinkItem href="/services/business-applications/power-apps" label="Power Apps" />
          </ul>
        </div>
        <FullImageCard href="/contact" imgSrc={SRCSET.customerStories.src} imgSrcSet={SRCSET.customerStories.srcSet} title="Talk To Softree" desc="Bring a roadmap, a rough idea, or a stuck project. We will help shape the next step." />
      </div>
    </div>
  )
}

function CompanyPanel() {
  return (
    <div className="relative w-full px-5 py-5 lg:px-6">
      <div className="grid grid-cols-2 gap-x-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Company</p>
          <ul className="flex list-none flex-col gap-y-1">
            <LinkItem href="/about-us" label="About Softree" />
            <LinkItem href="/together" label="Together" />
            <LinkItem href="/contact" label="Contact" />
          </ul>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Connect</p>
          <ul className="flex list-none flex-col gap-y-1">
            <LinkItem href="/contact" label="Start a Project" />
            <LinkItem href="/services" label="Explore Services" />
            <LinkItem href="/case-studies/web" label="View Work" />
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   MOBILE ACCORDION (Zero-JS via <details>/<summary>)
   ═══════════════════════════════════════════════════════════════════════ */

function MobileSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="w-full border-b border-[#e0e0e0] py-4">
      <details className="group w-full">
        <summary className="flex w-full cursor-pointer list-none items-center [&::-webkit-details-marker]:hidden">
          <div className="flex-1">
            <div className="flex items-center">
              <div tabIndex={-1} aria-hidden="true" className="mr-[10px] h-[10px] w-0 rounded-full bg-[#FF7759] opacity-0 transition-all group-open:w-[10px] group-open:opacity-100" />
              <p className="text-xl lg:text-2xl font-normal">{label}</p>
            </div>
          </div>
          <ChevronDown className="text-[20px] transition duration-300 ease-in-out -rotate-90 group-open:rotate-0 text-[#A4A4A4]" />
        </summary>
        <div className="mt-5 w-full">{children}</div>
      </details>
    </li>
  )
}

function MobileLinkGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="relative mb-3 text-xs font-semibold uppercase tracking-wider text-[#787878]">{title}</p>
      <ul className="flex list-none flex-col gap-y-1">{children}</ul>
    </div>
  )
}

function MobSoftreeServices() {
  return (
    <div className="mt-6 flex flex-col gap-y-6">
      <Link href="/services" className="group/drawer-title -mb-1 flex items-center gap-x-2">
        <p className="text-base font-normal">Services overview</p>
        <ArrowRight className="mt-0.5 transition-transform group-hover/drawer-title:translate-x-1" />
      </Link>
      <MobileLinkGroup title="AI Intelligence">
        <ProductItem href="/services/ai-intelligence/agentic-ai" icon={<IconAI />} name="Agentic AI" desc="Autonomous AI agents" badge="NEW" />
        <ProductItem href="/services/ai-intelligence/generative-ai" icon={<IconAI color="#C084FC" />} name="Generative AI" desc="LLM solutions" />
      </MobileLinkGroup>
      <MobileLinkGroup title="Business Applications">
        <ProductItem href="/services/business-applications/mvp" icon={<IconBusiness />} name="MVP Development" desc="Rapid product delivery" />
        <ProductItem href="/services/business-applications/power-apps" icon={<IconBusiness color="#FB923C" />} name="Power Apps" desc="Microsoft automation" />
        <ProductItem href="/services/business-applications/softree-for-startups" icon={<IconBusiness color="#FBBF24" />} name="For Startups" desc="Startup delivery packages" />
      </MobileLinkGroup>
      <MobileLinkGroup title="Digital Workspace">
        <ProductItem href="/services/digital-workspace/web-app-development" icon={<IconWorkspace />} name="Web Apps" desc="Enterprise web apps" />
        <ProductItem href="/services/digital-workspace/mobile-app-development" icon={<IconWorkspace color="#34D399" />} name="Mobile Apps" desc="iOS and Android apps" />
        <ProductItem href="/services/digital-workspace/sharepoint" icon={<IconWorkspace color="#6EE7B7" />} name="SharePoint" desc="M365 portals" />
      </MobileLinkGroup>
      <div className="flex w-full flex-col justify-end gap-y-4 border-t border-[#e0e0e0] pb-2 pl-2 pt-5">
        <BottomLink href="/services" label="All Services" />
        <BottomLink href="/contact" label="Get A Quote" />
      </div>
    </div>
  )
}

function MobSoftreeWork() {
  return (
    <div className="mt-6 flex flex-col gap-y-6">
      <MobileLinkGroup title="Selected Work">
        <LinkItem href="/case-studies/web" label="Web Platforms" />
        <LinkItem href="/case-studies/mobile" label="Mobile Products" />
        <LinkItem href="/case-studies/ai" label="AI Systems" />
        <LinkItem href="/case-studies/power-apps" label="Power Apps" />
        <LinkItem href="/case-studies/sharepoint" label="SharePoint" />
      </MobileLinkGroup>
      <div className="flex w-full flex-col justify-end gap-y-4 border-t border-[#e0e0e0] pb-2 pl-2 pt-5">
        <BottomLink href="/services" label="Explore Services" />
        <BottomLink href="/contact" label="Start A Project" />
      </div>
    </div>
  )
}

function MobSoftreeProcess() {
  return (
    <div className="mt-6 flex flex-col gap-y-6">
      <MobileLinkGroup title="Process">
        <LinkItem href="/services" label="Validate & Plan" />
        <LinkItem href="/services" label="Architect for Scale" />
        <LinkItem href="/services" label="Engineer & Integrate" />
        <LinkItem href="/services" label="Launch & Support" />
      </MobileLinkGroup>
      <MobileLinkGroup title="Engagements">
        <LinkItem href="/contact" label="Discovery Sprint" />
        <LinkItem href="/contact" label="Dedicated Team" />
        <LinkItem href="/contact" label="Fixed-Scope Build" />
        <LinkItem href="/together" label="Partner With Us" />
      </MobileLinkGroup>
    </div>
  )
}

function MobSoftreeResources() {
  return (
    <div className="mt-6 flex flex-col gap-y-6">
      <MobileLinkGroup title="Start Here">
        <LinkItem href="/services" label="Services Overview" />
        <LinkItem href="/case-studies/web" label="Web Case Study" />
        <LinkItem href="/case-studies/ai" label="AI Case Study" />
        <LinkItem href="/about-us" label="About Softree" />
      </MobileLinkGroup>
      <MobileLinkGroup title="Popular Services">
        <LinkItem href="/services/digital-workspace/web-app-development" label="Web App Development" />
        <LinkItem href="/services/ai-intelligence/agentic-ai" label="Agentic AI" />
        <LinkItem href="/services/data-analytics/power-bi" label="Power BI" />
        <LinkItem href="/services/business-applications/power-apps" label="Power Apps" />
      </MobileLinkGroup>
    </div>
  )
}

function MobSoftreeCompany() {
  return (
    <div className="mt-6 flex flex-col gap-y-6">
      <MobileLinkGroup title="Company">
        <LinkItem href="/about-us" label="About Softree" />
        <LinkItem href="/together" label="Together" />
        <LinkItem href="/contact" label="Contact" />
      </MobileLinkGroup>
      <MobileLinkGroup title="Connect">
        <LinkItem href="/contact" label="Start a Project" />
        <LinkItem href="/services" label="Explore Services" />
        <LinkItem href="/case-studies/web" label="View Work" />
      </MobileLinkGroup>
    </div>
  )
}

const MENU_KEYS: DesktopMenuKey[] = ["services", "industries", "research", "resources", "company"]
const MENU_LABELS: Record<DesktopMenuKey, string> = {
  services: "Services",
  industries: "Work",
  research: "Process",
  resources: "Resources",
  company: "Company",
}

const DROPDOWN_WIDTHS: Record<DesktopMenuKey, string> = {
  services: "min(calc(100vw - 32px), 1088px)",
  industries: "min(calc(100vw - 32px), 948px)",
  research: "min(calc(100vw - 32px), 948px)",
  resources: "min(calc(100vw - 32px), 948px)",
  company: "min(calc(100vw - 32px), 560px)",
}

const OPEN_DELAY_MS = 120
const CLOSE_DELAY_MS = 320

function DropdownPanel({ menu }: { menu: MenuKey }) {
  switch (menu) {
    case "services": return <ServicesPanel />
    case "industries": return <IndustriesPanel />
    case "research": return <ResearchPanel />
    case "resources": return <ResourcesPanel />
    case "company": return <CompanyPanel />
    default: return null
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN NAV COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */

export function SoftreeCohereNav() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dropdownTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const dropdownRefs = useRef<Record<DesktopMenuKey, HTMLDivElement | null>>({
    services: null,
    industries: null,
    research: null,
    resources: null,
    company: null,
  })

  const isOpen = activeMenu !== null

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const clearOpenTimer = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current)
      openTimerRef.current = null
    }
  }, [])

  const openMenu = useCallback((key: DesktopMenuKey) => {
    clearOpenTimer()
    clearCloseTimer()
    setActiveMenu(key)
  }, [clearCloseTimer, clearOpenTimer])

  const scheduleOpenMenu = useCallback((key: DesktopMenuKey) => {
    clearOpenTimer()
    clearCloseTimer()
    openTimerRef.current = setTimeout(() => {
      setActiveMenu(key)
      openTimerRef.current = null
    }, OPEN_DELAY_MS)
  }, [clearCloseTimer, clearOpenTimer])

  const scheduleCloseMenu = useCallback(() => {
    clearOpenTimer()
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null)
      closeTimerRef.current = null
    }, CLOSE_DELAY_MS)
  }, [clearCloseTimer, clearOpenTimer])

  /* Toggle menu on click — click same item again to close */
  const toggleMenu = useCallback((key: MenuKey) => {
    clearOpenTimer()
    clearCloseTimer()
    setActiveMenu(prev => (prev === key ? null : key))
  }, [clearCloseTimer, clearOpenTimer])

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const panels = MENU_KEYS.map((key) => dropdownRefs.current[key]).filter(Boolean) as HTMLDivElement[]
      const activePanel = activeMenu ? dropdownRefs.current[activeMenu] : null

      dropdownTimelineRef.current?.kill()
      gsap.killTweensOf(panels)

      panels.forEach((panel) => {
        if (panel === activePanel) return

        gsap.to(panel, {
          height: 0,
          autoAlpha: 0,
          xPercent: -50,
          y: prefersReducedMotion ? 0 : -8,
          duration: prefersReducedMotion ? 0 : 0.22,
          ease: "power3.inOut",
          overwrite: "auto",
          onComplete: () => {
            gsap.set(panel, { pointerEvents: "none" })
          },
        })
      })

      if (!activePanel) return

      const query = gsap.utils.selector(activePanel)
      const images = query("img")
      const revealItems = query("[data-nav-reveal]")

      gsap.set(activePanel, {
        pointerEvents: "auto",
        height: 0,
        autoAlpha: 0,
        xPercent: -50,
        y: prefersReducedMotion ? 0 : -8,
      })
      gsap.set(images, { autoAlpha: 0 })
      gsap.set(revealItems, { autoAlpha: 0, y: prefersReducedMotion ? 0 : 8 })

      dropdownTimelineRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(
          activePanel,
          {
            height: "auto",
            autoAlpha: 1,
            y: 0,
            duration: prefersReducedMotion ? 0.01 : 0.9,
          },
          0
        )
        .to(
          revealItems,
          {
            autoAlpha: 1,
            y: 0,
            duration: prefersReducedMotion ? 0.01 : 0.5,
            ease: "power3.out",
            stagger: prefersReducedMotion ? 0 : 0.018,
          },
          prefersReducedMotion ? 0 : 0.16
        )
        .to(
          images,
          {
            autoAlpha: 1,
            duration: prefersReducedMotion ? 0.01 : 0.75,
            ease: "power4.inOut",
            stagger: prefersReducedMotion ? 0 : 0.05,
          },
          prefersReducedMotion ? 0 : 0.22
        )

      return () => {
        dropdownTimelineRef.current?.kill()
        gsap.killTweensOf(panels)
      }
    },
    { scope: navRef, dependencies: [activeMenu], revertOnUpdate: false }
  )

  /* ESC to close + click outside to close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null)
        setMobileOpen(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null)
      }
    }
    window.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
      clearOpenTimer()
      clearCloseTimer()
    }
  }, [clearCloseTimer, clearOpenTimer])

  /* Lock body scroll on mobile menu */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      {/* ═══════ Backdrop Blur (behind dropdown, matching original z-[99]) ═══════ */}
      <div
        tabIndex={-1}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[99] pointer-events-none min-h-[100vh] w-full backdrop-blur-[30px] lg:min-h-[90vh] transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isOpen ? 1 : 0,
          mask: "linear-gradient(black, black, transparent)",
          WebkitMask: "linear-gradient(black, black, transparent)",
        }}
      />

      {/* ═══════ Nav Bar ═══════ */}
      <nav
        ref={navRef}
        role="navigation"
        aria-label="Primary navigation"
        id="softree-cohere-nav"
        className="fixed top-0 z-[999] flex h-16 w-full items-center justify-between gap-x-6 px-4 text-white opacity-100 backdrop-blur-md transition-all duration-300 ease-in-out border-b border-white/10 bg-black/10 shadow-none md:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] min-[919px]:px-10"
      >
        {/* ── Logo ── */}
        <Link href="/" className="flex min-w-0 justify-start">
          <span className="hidden items-center gap-1.5 md:flex">
            <img
              src="/Softree Technology Final Logo Files/Softree Technology Final Logo Files/Softree Technology Final Logo Dark BG/Softree-Technology-Final-Logo-Dark-BG.png"
              alt="Softree Logo"
              className="h-7 w-auto object-contain"
            />
          </span>
          <span className="flex items-center gap-1 md:hidden">
            <img
              src="/Softree Technology Final Logo Files/Softree Technology Final Logo Files/Softree Technology Final Logo Dark BG/Softree-Technology-Final-Logo-Dark-BG.png"
              alt="Softree Logo"
              className="h-6 w-auto object-contain"
            />
          </span>
        </Link>

        {/* ═══════════════════════════════════════════════════════════════
           DESKTOP NAV ITEMS
           Each nav item is a BUTTON that toggles the dropdown on click.
           Click same button again → close. Click different → switch.
           Click outside nav → close. Press ESC → close.
           ═══════════════════════════════════════════════════════════════ */}
        <ul className="hidden list-none items-center justify-center gap-x-8 lg:flex xl:gap-x-10">
          {MENU_KEYS.map((key) => {
            const isActive = activeMenu === key
            return (
              <li
                key={key}
                className="pointer-events-auto"
                onMouseEnter={() => {
                  clearCloseTimer()
                  scheduleOpenMenu(key)
                }}
                onMouseLeave={scheduleCloseMenu}
              >
                {/* Nav button + gradient underline */}
                <button
                  type="button"
                  className="relative cursor-pointer bg-transparent border-none p-0 outline-none"
                  id={`softree-nav-button-${key}`}
                  onClick={() => toggleMenu(key)}
                  onFocus={() => openMenu(key)}
                  aria-expanded={isActive}
                  aria-haspopup="true"
                  aria-controls={`softree-nav-panel-${key}`}
                >
                  <p className="text-sm font-normal">{MENU_LABELS[key]}</p>
                  <div className="relative">
                    <div
                      tabIndex={-1}
                      aria-hidden="true"
                      className="absolute mt-0.5 h-[1px] bg-gradient-to-r transition-[width] duration-300 from-[#FF7759] via-[#8B5CF6] to-[#3B82F6]"
                      style={{ width: isActive ? "100%" : "0%" }}
                    />
                  </div>
                </button>

                {/* Dropdown panel — positioned relative to <nav> (no relative on <li>) */}
                <div
                  id={`softree-nav-panel-${key}`}
                  ref={(node) => {
                    dropdownRefs.current[key] = node
                  }}
                  aria-labelledby={`softree-nav-button-${key}`}
                  className="invisible pointer-events-none absolute left-1/2 top-[calc(100%+8px)] overflow-hidden rounded-[18px] border border-[#e6e6e6] bg-white text-[#1a1a1a] opacity-0 shadow-[0_32px_80px_rgba(0,0,0,0.18)] will-change-[height,transform,opacity]"
                  style={{
                    height: 0,
                    maxWidth: "calc(100vw - 32px)",
                    transform: "translateX(-50%)",
                    width: DROPDOWN_WIDTHS[key],
                  }}
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={scheduleCloseMenu}
                >
                  <DropdownPanel menu={key} />
                </div>
              </li>
            )
          })}
        </ul>

        {/* ── Right Side CTAs ── */}
        <div className="ml-auto flex min-w-0 items-center justify-end gap-x-4 xl:gap-x-6">
          <div className="hidden items-center gap-x-4 sm:flex xl:gap-x-6">
            {/* Sign in */}
            <div className="hidden min-[918px]:inline-block">
              <Link href="/about-us" className="group/CTA relative whitespace-nowrap">
                <p className="text-sm font-normal">About us</p>
                <div className="relative">
                  <div tabIndex={-1} aria-hidden="true" className="absolute mt-0.5 h-[1px] w-0 bg-gradient-to-r transition-[width] duration-300 group-hover/CTA:w-full from-[#FF7759] via-[#8B5CF6] to-[#3B82F6]" />
                </div>
              </Link>
            </div>
            {/* Request a demo */}
            <div className="group relative z-10 inline-block">
              <div className="absolute inset-0 -z-10 -m-0.5 rounded-full bg-gradient-to-r from-[#FF7759] to-[#A855F7] opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
              <Link href="/contact" className="relative flex w-fit items-center justify-center whitespace-nowrap transition-all duration-300 cursor-pointer bg-white text-[#1a1a1a] rounded-full py-3 px-4 text-sm font-semibold outline-none focus:outline-none hover:bg-gray-100 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Start a project
              </Link>
            </div>
          </div>

          {/* Hamburger (mobile) */}
          <button className="flex h-[21px] w-8 items-center justify-center lg:hidden" onClick={() => setMobileOpen(p => !p)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            ) : (
              <svg width="32" height="21" viewBox="0 0 32 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0" width="32" height="2" rx="1" fill="currentColor" />
                <rect y="9.5" width="32" height="2" rx="1" fill="currentColor" />
                <rect y="19" width="32" height="2" rx="1" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
           MOBILE MENU
           ═══════════════════════════════════════════════════════════════ */}
        <div className={`absolute overflow-y-scroll right-4 top-[calc(100%+10px)] px-4 pb-9 pt-5 rounded-[16px] border lg:hidden w-[calc(100%-32px)] sm:max-h-[80vh] sm:w-full sm:max-w-[358px] border-[#e6e6e6] bg-white text-[#1a1a1a] max-h-[90vh] transition-all duration-300 ${mobileOpen ? "block opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-3"
          }`}>
          <div className="relative mb-10 h-full min-[918px]:mb-0">
            <ul className="w-full relative bg-white list-none">
              <MobileSection label="Services"><MobSoftreeServices /></MobileSection>
              <MobileSection label="Work"><MobSoftreeWork /></MobileSection>
              <MobileSection label="Process"><MobSoftreeProcess /></MobileSection>
              <MobileSection label="Resources"><MobSoftreeResources /></MobileSection>
              <MobileSection label="Company"><MobSoftreeCompany /></MobileSection>
            </ul>
          </div>
          <div className="relative mb-4 mt-10 w-full sm:hidden">
            <div className="group relative z-10 inline-block w-full">
              <div className="absolute inset-0 -z-10 -m-0.5 rounded-full bg-gradient-to-r from-[#FF7759] to-[#A855F7] opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
              <Link href="/contact" className="!w-full whitespace-nowrap relative flex w-fit items-center justify-center transition-all duration-300 cursor-pointer bg-[#1a1a1a] text-white rounded-full py-3 px-4 text-sm font-normal outline-none focus:outline-none">
                Start a project
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center min-[918px]:hidden">
            <Link href="/about-us" className="group/CTA relative whitespace-nowrap">
              <p className="text-sm font-normal">About us</p>
              <div className="relative">
                <div tabIndex={-1} aria-hidden="true" className="absolute mt-0.5 h-[1px] w-0 bg-gradient-to-r transition-[width] duration-300 group-hover/CTA:w-full from-[#FF7759] via-[#8B5CF6] to-[#3B82F6]" />
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  )
}

export default SoftreeCohereNav
