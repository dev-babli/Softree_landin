"use client"

/**
 * Homepage (light clone) — composes the 23 LC* components in the
 * spec's discovery → proof → action conversion order.
 *
 * Spec: docs/superpowers/specs/2026-05-03-homepage-light-clone-design.md
 *
 * Notes:
 *  - LightNav is mounted at the page-level (src/app/homepage-light/page.tsx)
 *    not inside this composition.
 *  - CubeScrollGallery is dropped per spec.
 *  - Every section is wrapped in DeferUntilInView with a cream-toned placeholder
 *    so lazy mount placeholders do not flash dark.
 */

import dynamic from "next/dynamic"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { color } from "./tokens"
import { LCHero } from "./LCHero"

function DeferUntilInView({
  children,
  minH = "60vh",
  bg = color.canvas,
}: {
  children: ReactNode
  minH?: string
  bg?: string
}) {
  const [shouldMount, setShouldMount] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setShouldMount(true); io.disconnect(); break }
        }
      },
      { root: null, rootMargin: "320px 0px 320px 0px", threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full">
      {shouldMount ? children : <div className="w-full" style={{ minHeight: minH, background: bg }} aria-hidden />}
    </div>
  )
}

/* ─── Lazy LC sections ─── */
const LCVirtualOfficeLazy = dynamic(() => import("./LCVirtualOffice").then(m => ({ default: (m as any).LCVirtualOffice ?? (m as any).default })), { ssr: false })
const LCStackedSlidesLazy = dynamic(() => import("./LCStackedSlides"), { ssr: false })
const LCServicePickerLazy = dynamic(() => import("./LCServicePicker").then(m => ({ default: (m as any).LCServicePicker ?? (m as any).default })), { ssr: false })
const LCHowItWorksLazy = dynamic(() => import("./LCHowItWorks"), { ssr: false })
const LCGlobalShowcaseLazy = dynamic(() => import("./LCGlobalShowcase").then(m => ({ default: (m as any).LCGlobalShowcase ?? (m as any).default })), { ssr: false })
const LCMirrorOpsLazy = dynamic(() => import("./LCMirrorOps").then(m => ({ default: (m as any).LCMirrorOps ?? (m as any).default })), { ssr: false })
const LCWhySoftreeLazy = dynamic(() => import("./LCWhySoftree"), { ssr: false })
const LCEnterpriseCardsLazy = dynamic(() => import("./LCEnterpriseCards"), { ssr: false })
const LCTestimonialsLazy = dynamic(() => import("./LCTestimonials"), { ssr: false })
const LCFlightPathLazy = dynamic(() => import("./LCFlightPath"), { ssr: false })
const LCIndustriesLazy = dynamic(() => import("./LCIndustries"), { ssr: false })
const LCPinnedShowcaseLazy = dynamic(() => import("./LCPinnedShowcase"), { ssr: false })
const LCForDevelopersLazy = dynamic(() => import("./LCForDevelopers"), { ssr: false })
const LCCodePathLazy = dynamic(() => import("./LCCodePath"), { ssr: false })
const LCVerticalCodePathLazy = dynamic(() => import("./LCVerticalCodePath"), { ssr: false })
const LCMidCTALazy = dynamic(() => import("./LCMidCTA"), { ssr: false })
const LCStackForgeLazy = dynamic(() => import("./LCStackForge"), { ssr: false })
const LCStackTabsLazy = dynamic(() => import("./LCStackTabs"), { ssr: false })
const LCComposioLazy = dynamic(() => import("./LCComposio"), { ssr: false })
const LCSecurityLazy = dynamic(() => import("./LCSecurity"), { ssr: false })
const LCBlogLazy = dynamic(() => import("./LCBlog"), { ssr: false })
const LCFAQLazy = dynamic(() => import("./LCFAQ"), { ssr: false })
const LCCTALazy = dynamic(() => import("./LCCTA"), { ssr: false })
const LCFooterLazy = dynamic(() => import("./LCFooter"), { ssr: false })

export default function Homepage() {
  return (
    <div
      className="w-full min-h-screen relative flex flex-col justify-start items-stretch"
      style={{ overflowX: "clip", background: color.canvas, color: color.ink }}
    >
      <div className="relative flex flex-col justify-start items-stretch w-full mt-0">
        {/* 01 — HERO */}
        <LCHero />

        {/* 02 — VIRTUAL OFFICE / TEAM CREDIBILITY */}
        <DeferUntilInView minH="85vh"><LCVirtualOfficeLazy /></DeferUntilInView>

        {/* 03 — SERVICES STACKED SLIDES */}
        <DeferUntilInView minH="420vh"><LCStackedSlidesLazy /></DeferUntilInView>

        {/* 04 — SERVICE PICKER */}
        <DeferUntilInView minH="100vh"><LCServicePickerLazy /></DeferUntilInView>

        {/* 05 — HOW IT WORKS */}
        <DeferUntilInView minH="90vh"><LCHowItWorksLazy /></DeferUntilInView>

        {/* 06 — GLOBAL SHOWCASE */}
        <DeferUntilInView minH="80vh"><LCGlobalShowcaseLazy /></DeferUntilInView>

        {/* 07 — MIRROR / CAPABILITIES GRID */}
        <DeferUntilInView minH="80vh"><LCMirrorOpsLazy /></DeferUntilInView>

        {/* 08 — WHY SOFTREE */}
        <DeferUntilInView minH="100vh"><LCWhySoftreeLazy /></DeferUntilInView>

        {/* 09 — ENTERPRISE TRUST CARDS */}
        <DeferUntilInView minH="90vh"><LCEnterpriseCardsLazy /></DeferUntilInView>

        {/* 10 — TESTIMONIALS */}
        <DeferUntilInView minH="70vh"><LCTestimonialsLazy /></DeferUntilInView>

        {/* 10.5 — FLIGHT PATH (scroll-driven MotionPath capabilities journey) */}
        <DeferUntilInView minH="250vh"><LCFlightPathLazy /></DeferUntilInView>

        {/* 11 — INDUSTRIES */}
        <DeferUntilInView minH="60vh"><LCIndustriesLazy /></DeferUntilInView>

        {/* 12 — PINNED DELIVERY SHOWCASE */}
        <DeferUntilInView minH="300vh"><LCPinnedShowcaseLazy /></DeferUntilInView>

        {/* 13 — FOR DEVELOPERS */}
        <DeferUntilInView minH="90vh"><LCForDevelopersLazy /></DeferUntilInView>

        {/* 14 — HORIZONTAL CODE PATH */}
        <DeferUntilInView minH="100dvh"><LCCodePathLazy /></DeferUntilInView>

        {/* 15 — VERTICAL CODE PATH */}
        <DeferUntilInView minH="70vh"><LCVerticalCodePathLazy /></DeferUntilInView>

        {/* 15.5 — INTERACTIVE STACK FORGE (gooey drag-to-merge) */}
        <DeferUntilInView minH="100vh"><LCStackForgeLazy /></DeferUntilInView>

        {/* 16 — MID-PAGE LEAD CAPTURE */}
        <DeferUntilInView minH="60vh"><LCMidCTALazy /></DeferUntilInView>

        {/* 17 — STACK TABS */}
        <DeferUntilInView minH="60vh"><LCStackTabsLazy /></DeferUntilInView>

        {/* 18 — COMPOSIO INTEGRATIONS */}
        <DeferUntilInView minH="80vh"><LCComposioLazy /></DeferUntilInView>

        {/* 19 — SECURITY */}
        <DeferUntilInView minH="90vh"><LCSecurityLazy /></DeferUntilInView>

        {/* 20 — BLOG */}
        <DeferUntilInView minH="60vh"><LCBlogLazy /></DeferUntilInView>

        {/* 21 — FAQ */}
        <DeferUntilInView minH="60vh"><LCFAQLazy /></DeferUntilInView>

        {/* 22 — CLOSING CTA (flame gradient) */}
        <DeferUntilInView minH="60vh" bg={color.flame}><LCCTALazy /></DeferUntilInView>

        {/* 23 — FOOTER */}
        <DeferUntilInView minH="40vh"><LCFooterLazy /></DeferUntilInView>
      </div>
    </div>
  )
}
