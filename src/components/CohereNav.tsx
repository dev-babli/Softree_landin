"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"

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

function ProductItem({ href, icon, name, desc, badge }: {
  href: string; icon?: React.ReactNode; name: string; desc: string; badge?: string
}) {
  return (
    <li className="group/image-list relative">
      <Link href={href} className="relative bg-transparent">
        <div className="relative px-2">
          <div tabIndex={-1} className="absolute -left-2 -top-4 h-[calc(100%+32px)] w-[calc(100%+16px)] rounded opacity-0 transition-opacity duration-300 ease-in-out group-hover/image-list:opacity-100 bg-[#e6e6e6]/90" />
          <span className="relative mt-8 flex items-center lg:mt-10">
            <span className="mr-[10px] flex-shrink-0">{icon}</span>
            <div className="flex items-center gap-1">
              <p className="text-base lg:text-lg font-normal">{name}</p>
              {badge && (
                <span className="text-[9px] uppercase font-semibold tracking-wider inline-block w-auto">
                  <span className="flex items-center rounded-[2px] bg-[#F3E3F5] px-1.5 py-px text-black">{badge}</span>
                </span>
              )}
            </div>
          </span>

        </div>
      </Link>
    </li>
  )
}

function LinkItem({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const Tag = external ? "a" : Link
  const extra = external ? { rel: "noopener noreferrer" as const, target: "_blank" as const } : {}
  return (
    <li className="group/link-list relative">
      <Tag href={href} className="relative bg-transparent" {...extra}>
        <div className="relative">
          <div tabIndex={-1} className="absolute -left-2 -top-2 h-[calc(100%+16px)] w-[calc(100%+16px)] rounded opacity-0 transition-opacity duration-300 ease-in-out group-hover/link-list:opacity-100 bg-[#e6e6e6]/90" />
          <p className="text-base lg:text-lg font-normal relative">{label}</p>
        </div>
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
    <Tag href={href} className="group/fullImage relative h-[288px] overflow-hidden rounded-lg lg:w-[288px]" {...extra}>
      <img alt="" className="aspect-square h-[288px] w-full object-cover object-center transition-all duration-300 ease-in-out group-hover/fullImage:scale-[1.2] lg:w-[288px]" width={288} height={288} srcSet={imgSrcSet} src={imgSrc} />
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

function BottomLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group/bottom-row flex items-center gap-x-1.5">
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
    <div className="relative px-6 pt-4">
      <NavIconStyles />
      <Link href="/services" className="group/drawer-title -mb-2 flex items-center gap-x-2 lg:mb-auto">
        <p className="text-xl lg:text-2xl font-normal">Services</p>
        <ArrowRight className="mt-0.5 transition-transform group-hover/drawer-title:translate-x-1" />
      </Link>
      <div className="mb-10 flex gap-x-6 mt-4">
        {/* Col 1 — AI Intelligence */}
        <div className="xl:w-[240px]">
          <div className="relative group/image">
            <div className="relative h-[100px] lg:w-[240px]" tabIndex={-1} aria-hidden="true" />
            <img alt="" className="absolute top-0 h-[100px] w-full rounded-lg object-cover object-center transition-all duration-300 ease-in-out lg:w-[240px]" width={240} height={100} srcSet={SRCSET.generative.srcSet} src={SRCSET.generative.src} />
            <div className="px-4">
              <p className="text-xs font-semibold uppercase tracking-wider relative mb-3 mt-5 text-[#787878]">AI Intelligence</p>
            </div>
          </div>
          <ul className="list-none px-2">
            <ProductItem href="/services/ai-intelligence/agentic-ai" icon={<IconAI />} name="Agentic AI" desc="Autonomous AI agents that act, decide, and complete complex tasks end-to-end" badge="NEW" />
            <ProductItem href="/services/ai-intelligence/generative-ai" icon={<IconAI color="#C084FC" />} name="Generative AI" desc="Custom LLM solutions fine-tuned on your enterprise data and workflows" />
          </ul>
        </div>
        {/* Col 2 — Business Applications */}
        <div className="xl:w-[240px]">
          <div className="relative group/image">
            <div className="relative h-[100px] lg:w-[240px]" tabIndex={-1} aria-hidden="true" />
            <img alt="" className="absolute top-0 h-[100px] w-full rounded-lg object-cover object-center transition-all duration-300 ease-in-out lg:w-[240px]" width={240} height={100} srcSet={SRCSET.workplace.srcSet} src={SRCSET.workplace.src} />
            <div className="px-4">
              <p className="text-xs font-semibold uppercase tracking-wider relative mb-3 mt-5 text-[#787878]">Business Applications</p>
            </div>
          </div>
          <ul className="list-none px-2">
            <ProductItem href="/services/business-applications/mvp" icon={<IconBusiness />} name="MVP Development" desc="Go from idea to market-ready product with rapid, agile MVP delivery" />
            <ProductItem href="/services/business-applications/power-apps" icon={<IconBusiness color="#FB923C" />} name="Power Apps" desc="Low-code Microsoft Power Apps solutions for enterprise-grade automation" />
            <ProductItem href="/services/business-applications/softree-for-startups" icon={<IconBusiness color="#FBBF24" />} name="For Startups" desc="Tailored packages to help startups scale with enterprise-level tech" />
          </ul>
        </div>
        {/* Col 3 — Data Analytics */}
        <div className="xl:w-[240px]">
          <div className="relative group/image">
            <div className="relative h-[100px] lg:w-[240px]" tabIndex={-1} aria-hidden="true" />
            <img alt="" className="absolute top-0 h-[100px] w-full rounded-lg object-cover object-center transition-all duration-300 ease-in-out lg:w-[240px]" width={240} height={100} srcSet={SRCSET.retrieval.srcSet} src={SRCSET.retrieval.src} />
            <div className="px-4">
              <p className="text-xs font-semibold uppercase tracking-wider relative mb-3 mt-5 text-[#787878]">Data & Analytics</p>
            </div>
          </div>
          <ul className="list-none px-2">
            <ProductItem href="/services/data-analytics/microsoft-fabric" icon={<IconData />} name="Microsoft Fabric" desc="Unified analytics platform for data engineering, warehousing, and BI" />
            <ProductItem href="/services/data-analytics/power-bi" icon={<IconData color="#60A5FA" />} name="Power BI" desc="Interactive dashboards and real-time business intelligence reports" />
          </ul>
        </div>
        {/* Col 4 — Digital Workspace */}
        <div className="xl:w-[240px]">
          <div className="relative group/image">
            <div className="relative h-[100px] lg:w-[240px]" tabIndex={-1} aria-hidden="true" />
            <img alt="" className="absolute top-0 h-[100px] w-full rounded-lg object-cover object-center transition-all duration-300 ease-in-out lg:w-[240px]" width={240} height={100} srcSet={SRCSET.modelVault.srcSet} src={SRCSET.modelVault.src} />
            <div className="px-4">
              <p className="text-xs font-semibold uppercase tracking-wider relative mb-3 mt-5 text-[#787878]">Digital Workspace</p>
            </div>
          </div>
          <ul className="list-none px-2">
            <ProductItem href="/services/digital-workspace/web-app-development" icon={<IconWorkspace />} name="Web Apps" desc="Scalable, performant web applications built for enterprise environments" />
            <ProductItem href="/services/digital-workspace/mobile-app-development" icon={<IconWorkspace color="#34D399" />} name="Mobile Apps" desc="Cross-platform iOS and Android apps with native-grade performance" />
            <ProductItem href="/services/digital-workspace/sharepoint" icon={<IconWorkspace color="#6EE7B7" />} name="SharePoint" desc="Intranet portals and document management built on Microsoft SharePoint" />
            <ProductItem href="/services/digital-workspace/spfx-developments" icon={<IconWorkspace color="#A7F3D0" />} name="SPFx" desc="Custom SharePoint Framework web parts and extensions for M365" />
          </ul>
        </div>
      </div>
      <div className="mt-[60px] flex w-full justify-end gap-x-10 border-t border-[#e0e0e0] py-4 pr-1">
        <BottomLink href="/services" label="All Services" />
        <BottomLink href="/contact" label="Get a Quote" />
      </div>
    </div>
  )
}

function IndustriesPanel() {
  return (
    <div className="relative px-6 pt-4">
      <div className="mb-10 flex gap-x-6">
        <div className="lg:w-[267px]">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Industries</p>
          <ul className="flex list-none flex-col gap-y-4">
            <LinkItem href="/solutions/technology" label="Technology" />
            <LinkItem href="/solutions/financial-services" label="Financial Services" />
            <LinkItem href="/solutions/healthcare-and-life-sciences" label="Healthcare and Life Sciences" />
            <LinkItem href="/solutions/manufacturing" label="Manufacturing" />
            <LinkItem href="/solutions/energy-and-utilities" label="Energy and Utilities" />
            <LinkItem href="/solutions/public-sector" label="Public Sector" />
            <LinkItem href="/solutions/telecommunications" label="Telecommunications" />
          </ul>
        </div>
        <FullImageCard href="/solutions/model-vault" imgSrc={SRCSET.modelVault.src} imgSrcSet={SRCSET.modelVault.srcSet} title="Model Vault" desc="Your dedicated, secure model inference platform — managed by Cohere" />
      </div>
      <div className="mt-[60px] flex w-full justify-end gap-x-10 border-t border-[#e0e0e0] py-4 pr-1">
        <BottomLink href="/security" label="Security" />
        <BottomLink href="/private-deployments" label="Private Deployments" />
      </div>
    </div>
  )
}

function ResearchPanel() {
  return (
    <div className="relative px-6 pt-4">
      <div className="mb-10 flex gap-x-6">
        <FullImageCard href="/research" imgSrc={SRCSET.cohereLabs.src} imgSrcSet={SRCSET.cohereLabs.srcSet} title="Cohere Labs" desc="Cohere's research lab that seeks to solve complex ML problems" gradientTo="rgb(21, 36, 85)" />
        <div className="lg:w-[267px]">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Model</p>
          <ul className="flex list-none flex-col gap-y-4">
            <LinkItem href="/research/aya" label="Aya" />
            <li className="relative mt-4"><span className="text-xs font-semibold uppercase tracking-wider text-[#787878]">RESOURCES</span></li>
            <LinkItem href="/research/papers" label="Papers" />
            <LinkItem href="https://www.youtube.com/playlist?list=PLLalUvky4CLJKDaiWCumhsJpHNDhZeVll" label="Videos" external />
            <LinkItem href="/blog?tag=research" label="Blog" />
          </ul>
        </div>
        <div className="lg:w-[267px]">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Initiatives</p>
          <ul className="flex list-none flex-col gap-y-4">
            <LinkItem href="/research/open-science" label="Open Science Community" />
            <LinkItem href="/research/scholars-program" label="Scholars Program" />
            <LinkItem href="/research/grants" label="Catalyst Grant Program" />
            <LinkItem href="/research/lmarena" label="The Leaderboard Illusion" />
            <LinkItem href="/events?eventTypes=research" label="Events" />
          </ul>
        </div>
      </div>
    </div>
  )
}

function ResourcesPanel() {
  return (
    <div className="relative px-6 pt-4">
      <div className="mb-10 flex gap-x-6">
        <div className="lg:w-[267px]">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Resources</p>
          <ul className="flex list-none flex-col gap-y-4">
            <LinkItem href="/blog" label="Blog" />
            <LinkItem href="/developers" label="Developers" />
            <LinkItem href="https://docs.cohere.com/" label="Docs" external />
            <LinkItem href="/llmu" label="LLM University" />
            <LinkItem href="https://docs.cohere.com/page/cookbooks" label="Cookbooks" external />
          </ul>
        </div>
        <div className="lg:w-[267px]">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Community</p>
          <ul className="flex list-none flex-col gap-y-4">
            <LinkItem href="https://discord.com/invite/co-mmunity" label="Discord" external />
            <LinkItem href="/events" label="Events" />
            <LinkItem href="https://events.cohere.com/on-demand/" label="On-Demand Events" external />
          </ul>
        </div>
        <FullImageCard href="/customer-stories" imgSrc={SRCSET.customerStories.src} imgSrcSet={SRCSET.customerStories.srcSet} title="Customer Stories" desc="Explore enterprise AI case studies and success stories" />
      </div>
    </div>
  )
}

function CompanyPanel() {
  return (
    <div className="relative px-6 pt-4">
      <div className="mb-10 flex gap-x-6">
        <div className="lg:w-[267px]">
          <p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Company</p>
          <ul className="flex list-none flex-col gap-y-4">
            <LinkItem href="/about" label="About" />
            <LinkItem href="/careers" label="Careers" />
            <LinkItem href="/newsroom" label="Newsroom" />
            <LinkItem href="/partners" label="Partners" />
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

function MobProducts() {
  return (
    <div className="mt-6 flex flex-col gap-y-7">
      <Link href="/products" className="group/drawer-title -mb-2 flex items-center gap-x-2 lg:mb-auto">
        <p className="text-base lg:text-lg font-normal">Products overview</p>
        <ArrowRight className="mt-0.5 transition-transform group-hover/drawer-title:translate-x-1" />
      </Link>
      <div className="xl:w-[284px]"><div className="relative group/image"><div className="relative h-[100px] lg:w-[284px]" tabIndex={-1} aria-hidden="true" /><img alt="" className="absolute top-0 h-[100px] w-full rounded-lg object-cover object-center lg:w-[284px]" width={284} height={100} srcSet={SRCSET.workplace.srcSet} src={SRCSET.workplace.src} /><div className="px-4"><p className="text-xs font-semibold uppercase tracking-wider relative mb-3 mt-5 text-[#787878]">Workplace Systems</p></div></div><ul className="list-none px-2"><ProductItem href="/north" color="#3B82F6" name="North" desc="An enterprise-ready AI platform that powers modern workplace productivity" /><ProductItem href="/compass" color="#3B82F6" name="Compass" desc="An intelligent search and discovery system to surface business insights" /></ul></div>
      <div className="xl:w-[284px]"><div className="relative group/image"><div className="relative h-[100px] lg:w-[284px]" tabIndex={-1} aria-hidden="true" /><img alt="" className="absolute top-0 h-[100px] w-full rounded-lg object-cover object-center lg:w-[284px]" width={284} height={100} srcSet={SRCSET.generative.srcSet} src={SRCSET.generative.src} /><div className="px-4"><p className="text-xs font-semibold uppercase tracking-wider relative mb-3 mt-5 text-[#787878]">Generative Models</p></div></div><ul className="list-none px-2"><ProductItem href="/command" color="#A855F7" name="Command" desc="A family of high-performance, scalable language models" /><ProductItem href="/transcribe" color="#A855F7" name="Transcribe" desc="A speech recognition model for generating highly accurate audio transcripts" badge="NEW" /><ProductItem href="/research/aya" color="#A855F7" name="Aya" desc="A family of multilingual research models covering 70+ languages" /></ul></div>
      <div className="xl:w-[284px]"><div className="relative group/image"><div className="relative h-[100px] lg:w-[284px]" tabIndex={-1} aria-hidden="true" /><img alt="" className="absolute top-0 h-[100px] w-full rounded-lg object-cover object-center lg:w-[284px]" width={284} height={100} srcSet={SRCSET.retrieval.srcSet} src={SRCSET.retrieval.src} /><div className="px-4"><p className="text-xs font-semibold uppercase tracking-wider relative mb-3 mt-5 text-[#787878]">Advanced Retrieval Models</p></div></div><ul className="list-none px-2"><ProductItem href="/embed" color="#FF7759" name="Embed" desc="A leading multimodal search and retrieval tool" /><ProductItem href="/rerank" color="#FF7759" name="Rerank" desc="A powerful model that provides a semantic boost to search quality" /></ul></div>
      <div className="flex w-full flex-col justify-end gap-y-6 border-t border-[#e0e0e0] pb-2 pl-2 pt-5"><BottomLink href="/customization" label="Customization" /><BottomLink href="/pricing" label="Pricing" /></div>
    </div>
  )
}

function MobSolutions() {
  return (
    <div className="mt-6 flex flex-col gap-y-7">
      <div className="lg:w-[267px]"><p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Industries</p><ul className="flex list-none flex-col gap-y-4"><LinkItem href="/solutions/technology" label="Technology" /><LinkItem href="/solutions/financial-services" label="Financial Services" /><LinkItem href="/solutions/healthcare-and-life-sciences" label="Healthcare and Life Sciences" /><LinkItem href="/solutions/manufacturing" label="Manufacturing" /><LinkItem href="/solutions/energy-and-utilities" label="Energy and Utilities" /><LinkItem href="/solutions/public-sector" label="Public Sector" /><LinkItem href="/solutions/telecommunications" label="Telecommunications" /></ul></div>
      <FullImageCard href="/solutions/model-vault" imgSrc={SRCSET.modelVault.src} imgSrcSet={SRCSET.modelVault.srcSet} title="Model Vault" desc="Your dedicated, secure model inference platform — managed by Cohere" />
      <div className="flex w-full flex-col justify-end gap-y-6 border-t border-[#e0e0e0] pb-2 pl-2 pt-5"><BottomLink href="/security" label="Security" /><BottomLink href="/private-deployments" label="Private Deployments" /></div>
    </div>
  )
}

function MobResearch() {
  return (
    <div className="mt-6 flex flex-col gap-y-7">
      <FullImageCard href="/research" imgSrc={SRCSET.cohereLabs.src} imgSrcSet={SRCSET.cohereLabs.srcSet} title="Cohere Labs" desc="Cohere's research lab that seeks to solve complex ML problems" gradientTo="rgb(21, 36, 85)" />
      <div className="lg:w-[267px]"><p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Model</p><ul className="flex list-none flex-col gap-y-4"><LinkItem href="/research/aya" label="Aya" /><li className="relative mt-4"><span className="text-xs font-semibold uppercase tracking-wider text-[#787878]">RESOURCES</span></li><LinkItem href="/research/papers" label="Papers" /><LinkItem href="https://www.youtube.com/playlist?list=PLLalUvky4CLJKDaiWCumhsJpHNDhZeVll" label="Videos" external /><LinkItem href="/blog?tag=research" label="Blog" /></ul></div>
      <div className="lg:w-[267px]"><p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Initiatives</p><ul className="flex list-none flex-col gap-y-4"><LinkItem href="/research/open-science" label="Open Science Community" /><LinkItem href="/research/scholars-program" label="Scholars Program" /><LinkItem href="/research/grants" label="Catalyst Grant Program" /><LinkItem href="/research/lmarena" label="The Leaderboard Illusion" /><LinkItem href="/events?eventTypes=research" label="Events" /></ul></div>
    </div>
  )
}

function MobResources() {
  return (
    <div className="mt-6 flex flex-col gap-y-7">
      <div className="lg:w-[267px]"><p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Resources</p><ul className="flex list-none flex-col gap-y-4"><LinkItem href="/blog" label="Blog" /><LinkItem href="/developers" label="Developers" /><LinkItem href="https://docs.cohere.com/" label="Docs" external /><LinkItem href="/llmu" label="LLM University" /><LinkItem href="https://docs.cohere.com/page/cookbooks" label="Cookbooks" external /></ul></div>
      <div className="lg:w-[267px]"><p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Community</p><ul className="flex list-none flex-col gap-y-4"><LinkItem href="https://discord.com/invite/co-mmunity" label="Discord" external /><LinkItem href="/events" label="Events" /><LinkItem href="https://events.cohere.com/on-demand/" label="On-Demand Events" external /></ul></div>
      <FullImageCard href="/customer-stories" imgSrc={SRCSET.customerStories.src} imgSrcSet={SRCSET.customerStories.srcSet} title="Customer Stories" desc="Explore enterprise AI case studies and success stories" />
    </div>
  )
}

function MobCompany() {
  return (
    <div className="mt-6 flex flex-col gap-y-7">
      <div className="lg:w-[267px]"><p className="text-xs font-semibold uppercase tracking-wider relative mb-4 text-[#787878]">Company</p><ul className="flex list-none flex-col gap-y-4"><LinkItem href="/about" label="About" /><LinkItem href="/careers" label="Careers" /><LinkItem href="/newsroom" label="Newsroom" /><LinkItem href="/partners" label="Partners" /></ul></div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   NAV ITEM — Desktop (with JS-controlled dropdown)
   ═══════════════════════════════════════════════════════════════════════ */

const MENU_KEYS: DesktopMenuKey[] = ["services", "industries", "research", "resources", "company"]
const MENU_LABELS: Record<DesktopMenuKey, string> = {
  services: "Services",
  industries: "Industries",
  research: "Research",
  resources: "Resources",
  company: "Company",
}

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

export function CohereNav() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isOpen = activeMenu !== null

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const scheduleCloseMenu = useCallback(() => {
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null)
      closeTimerRef.current = null
    }, 150)
  }, [clearCloseTimer])

  /* Toggle menu on click — click same item again to close */
  const toggleMenu = useCallback((key: MenuKey) => {
    setActiveMenu(prev => (prev === key ? null : key))
  }, [])

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
      clearCloseTimer()
    }
  }, [clearCloseTimer])

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
        id="cohere-nav"
        className="z-[999] h-auto transition-all duration-300 ease-in-out py-5 md:py-4 flex w-full items-center justify-between gap-x-10 px-4 md:px-6 min-[919px]:px-10 fixed top-0 translate-y-0 opacity-100 bg-black/10 backdrop-blur-md border-b border-white/10 text-white shadow-none"
      >
        {/* ── Logo ── */}
        <Link href="/" className="mr-auto flex flex-1 justify-start">
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
        <ul className="hidden flex-1 list-none justify-center gap-x-8 lg:flex xl:gap-x-10">
          {MENU_KEYS.map((key) => {
            const isActive = activeMenu === key
            return (
              <li
                key={key}
                className="pointer-events-auto"
                onMouseEnter={() => {
                  clearCloseTimer()
                  setActiveMenu(key)
                }}
                onMouseLeave={scheduleCloseMenu}
              >
                {/* Nav button + gradient underline */}
                <button
                  type="button"
                  className="relative cursor-pointer bg-transparent border-none p-0 outline-none"
                  onClick={() => toggleMenu(key)}
                  aria-expanded={isActive}
                  aria-haspopup="true"
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
                  className={`absolute left-1/2 top-[calc(100%+5px)] -translate-x-1/2 transform transition-all duration-300 ease-in-out rounded-[16px] border border-[#e6e6e6] bg-white text-[#1a1a1a] ${isActive
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
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
        <div className="ml-auto flex flex-1 items-center justify-end gap-x-4 xl:gap-x-6">
          <div className="hidden items-center gap-x-4 sm:flex xl:gap-x-6">
            {/* Sign in */}
            <div className="hidden min-[918px]:inline-block">
              <a href="https://dashboard.cohere.com/welcome/login" rel="noopener noreferrer" target="_blank" className="group/CTA relative whitespace-nowrap">
                <p className="text-sm font-normal">Sign in</p>
                <div className="relative">
                  <div tabIndex={-1} aria-hidden="true" className="absolute mt-0.5 h-[1px] w-0 bg-gradient-to-r transition-[width] duration-300 group-hover/CTA:w-full from-[#FF7759] via-[#8B5CF6] to-[#3B82F6]" />
                </div>
              </a>
            </div>
            {/* Request a demo */}
            <div className="group relative z-10 inline-block">
              <div className="absolute inset-0 -z-10 -m-0.5 rounded-full bg-gradient-to-r from-[#FF7759] to-[#A855F7] opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
              <Link href="/contact-sales" className="relative flex w-fit items-center justify-center whitespace-nowrap transition-all duration-300 cursor-pointer bg-white text-[#1a1a1a] rounded-full py-3 px-4 text-sm font-semibold outline-none focus:outline-none hover:bg-gray-100 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                Request a demo
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
              <MobileSection label="Services"><MobProducts /></MobileSection>
              <MobileSection label="Industries"><MobSolutions /></MobileSection>
              <MobileSection label="Research"><MobResearch /></MobileSection>
              <MobileSection label="Resources"><MobResources /></MobileSection>
              <MobileSection label="Company"><MobCompany /></MobileSection>
            </ul>
          </div>
          <div className="relative mb-4 mt-10 w-full sm:hidden">
            <div className="group relative z-10 inline-block w-full">
              <div className="absolute inset-0 -z-10 -m-0.5 rounded-full bg-gradient-to-r from-[#FF7759] to-[#A855F7] opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
              <Link href="/contact-sales" className="!w-full whitespace-nowrap relative flex w-fit items-center justify-center transition-all duration-300 cursor-pointer bg-[#1a1a1a] text-white rounded-full py-3 px-4 text-sm font-normal outline-none focus:outline-none">
                Request a demo
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center min-[918px]:hidden">
            <a href="https://dashboard.cohere.com/welcome/login" rel="noopener noreferrer" target="_blank" className="group/CTA relative whitespace-nowrap">
              <p className="text-sm font-normal">Sign in</p>
              <div className="relative">
                <div tabIndex={-1} aria-hidden="true" className="absolute mt-0.5 h-[1px] w-0 bg-gradient-to-r transition-[width] duration-300 group-hover/CTA:w-full from-[#FF7759] via-[#8B5CF6] to-[#3B82F6]" />
              </div>
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-[60px] md:h-[56px]" />
    </>
  )
}

export default CohereNav
