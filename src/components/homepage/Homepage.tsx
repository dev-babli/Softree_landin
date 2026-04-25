"use client"

import dynamic from "next/dynamic"
import { ReactLenis } from "lenis/react"
import { IntroDiagram } from "@/components/homepage/IntroDiagram"
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  mq.addEventListener("change", onStoreChange)
  return () => mq.removeEventListener("change", onStoreChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function DeferUntilInView({
  children,
  placeholderClassName = "min-h-[50vh] bg-black",
}: {
  children: ReactNode
  placeholderClassName?: string
}) {
  const [shouldMount, setShouldMount] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldMount(true)
            io.disconnect()
            break
          }
        }
      },
      { root: null, rootMargin: "320px 0px 320px 0px", threshold: 0 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full">
      {shouldMount ? children : <div className={`w-full ${placeholderClassName}`} aria-hidden />}
    </div>
  )
}

const RigLandingSectionsLazy = dynamic(
  () =>
    import("@/components/homepage/RigLandingSections").then((m) => ({
      default: m.RigLandingSections,
    })),
  { loading: () => <div className="min-h-[300vh] w-full bg-[#0a0a0a]" aria-hidden /> }
)

const TrueHulyHero = dynamic(() => import("@/components/brilliance/TrueHulyHero"), {
  loading: () => <div className="min-h-screen w-full shrink-0 bg-black" aria-hidden />,
})

const SoftreeGridHeroLazy = dynamic(
  () => import("@/components/brilliance/SoftreeGridHero").then((m) => ({ default: m.SoftreeGridHero })),
  { loading: () => <div className="min-h-screen w-full bg-black" aria-hidden /> }
)

const VirtualOfficeSectionLazy = dynamic(
  () =>
    import("@/components/brilliance/VirtualOfficeSection").then((m) => ({
      default: m.VirtualOfficeSection,
    })),
  { loading: () => <div className="min-h-[85vh] w-full bg-black" aria-hidden /> }
)

const SoftreeGlobalShowcaseLazy = dynamic(
  () =>
    import("@/components/homepage/SoftreeGlobalShowcase").then((m) => ({
      default: m.SoftreeGlobalShowcase,
    })),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#070707]" aria-hidden /> }
)

const MirrorContentOpsSectionLazy = dynamic(
  () =>
    import("@/components/homepage/MirrorContentOpsSection").then((m) => ({
      default: m.MirrorContentOpsSection,
    })),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#080808]" aria-hidden /> }
)

const SoftreeServicePickerLazy = dynamic(
  () =>
    import("@/components/homepage/SoftreeServicePicker").then((m) => ({
      default: m.SoftreeServicePicker,
    })),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#080808]" aria-hidden /> }
)

const ServicesParallaxShowcaseLazy = dynamic(
  () =>
    import("@/components/homepage/ServicesParallaxShowcase").then((m) => ({
      default: m.ServicesParallaxShowcase,
    })),
  { loading: () => <div className="min-h-[500vh] w-full bg-black" aria-hidden /> }
)

const ServicesStackedSlidesLazy = dynamic(
  () =>
    import("@/components/homepage/ServicesStackedSlides").then((m) => ({
      default: m.ServicesStackedSlides,
    })),
  { loading: () => <div className="min-h-[420vh] w-full bg-black" aria-hidden /> }
)

const CubeScrollGalleryLazy = dynamic(
  () =>
    import("@/components/homepage/CubeScrollGallery").then((m) => ({
      default: m.CubeScrollGallery,
    })),
  { loading: () => <div className="min-h-[600vh] w-full bg-black" aria-hidden /> }
)

const ProductPreviewLazy = dynamic(
  () =>
    import("@/components/brilliance/ProductPreview").then((m) => ({
      default: m.ProductPreview,
    })),
  { loading: () => <div className="min-h-[100vh] w-full bg-black" aria-hidden /> }
)

const WhySoftreeSectionLazy = dynamic(
  () =>
    import("@/components/homepage/WhySoftreeSection").then((m) => ({
      default: m.WhySoftreeSection,
    })),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#1a1a1a]" aria-hidden /> }
)

const FeaturesSectionLazy = dynamic(
  () =>
    import("@/components/optimus/landing/features-section").then((m) => ({
      default: m.FeaturesSection,
    })),
  { loading: () => <div className="min-h-[90vh] w-full bg-white" aria-hidden /> }
)

const HowItWorksSectionLazy = dynamic(
  () =>
    import("@/components/optimus/landing/how-it-works-section").then((m) => ({
      default: m.HowItWorksSection,
    })),
  { loading: () => <div className="min-h-[90vh] w-full bg-neutral-950" aria-hidden /> }
)

const ScrollRevealSectionLazy = dynamic(
  () =>
    import("@/components/homepage/ScrollRevealSection").then((m) => ({
      default: m.ScrollRevealSection,
    })),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#0a0a0a]" aria-hidden /> }
)

const PinnedShowcaseSectionLazy = dynamic(
  () =>
    import("@/components/homepage/PinnedShowcaseSection").then((m) => ({
      default: m.PinnedShowcaseSection,
    })),
  { loading: () => <div className="min-h-[300vh] w-full bg-[#0a0a0a]" aria-hidden /> }
)

const InfrastructureSectionLazy = dynamic(
  async () => {
    const { InfrastructureSection } = await import("@/components/optimus/landing/infrastructure-section")
    function InfrastructureLight() {
      return <InfrastructureSection appearance="light" />
    }
    return { default: InfrastructureLight }
  },
  { loading: () => <div className="min-h-[90vh] w-full bg-white" aria-hidden /> }
)

const MetricsSectionLazy = dynamic(
  () =>
    import("@/components/optimus/landing/metrics-section").then((m) => ({
      default: m.MetricsSection,
    })),
  { loading: () => <div className="min-h-[80vh] w-full bg-neutral-950" aria-hidden /> }
)

const IntegrationsSectionLazy = dynamic(
  () =>
    import("@/components/optimus/landing/integrations-section").then((m) => ({
      default: m.IntegrationsSection,
    })),
  { loading: () => <div className="min-h-[90vh] w-full bg-neutral-950" aria-hidden /> }
)

const SoftreeMidCTALazy = dynamic(
  () =>
    import("@/components/homepage/SoftreeMidCTA").then((m) => ({
      default: m.SoftreeMidCTA,
    })),
  { loading: () => <div className="min-h-[60vh] w-full bg-[#070707]" aria-hidden /> }
)

const ForDevelopersSectionLazy = dynamic(
  () =>
    import("@/components/homepage/ForDevelopersSection").then((m) => ({
      default: m.ForDevelopersSection,
    })),
  { loading: () => <div className="min-h-[90vh] w-full bg-[#070707]" aria-hidden /> }
)

const SoftreeBlogSectionLazy = dynamic(
  () =>
    import("@/components/homepage/SoftreeBlogSection").then((m) => ({
      default: m.SoftreeBlogSection,
    })),
  { loading: () => <div className="min-h-[60vh] w-full bg-white" aria-hidden /> }
)

const SoftreeStackTabsLazy = dynamic(
  () =>
    import("@/components/homepage/SoftreeStackTabs").then((m) => ({
      default: m.SoftreeStackTabs,
    })),
  { loading: () => <div className="min-h-[60vh] w-full bg-[#fcfcfc]" aria-hidden /> }
)

const SoftreeComposioSectionLazy = dynamic(
  () =>
    import("@/components/homepage/SoftreeComposioSection").then((m) => ({
      default: m.SoftreeComposioSection,
    })),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#f6f6f6]" aria-hidden /> }
)


const SoftreeIndustriesSectionLazy = dynamic(
  () =>
    import("@/components/homepage/SoftreeIndustriesSection").then((m) => ({
      default: m.SoftreeIndustriesSection,
    })),
  { loading: () => <div className="min-h-[60vh] w-full bg-white" aria-hidden /> }
)

const SecuritySectionLazy = dynamic(
  () =>
    import("@/components/optimus/landing/security-section").then((m) => ({
      default: m.SecuritySection,
    })),
  { loading: () => <div className="min-h-[90vh] w-full bg-neutral-950" aria-hidden /> }
)

const DevelopersSectionLazy = dynamic(
  () =>
    import("@/components/optimus/landing/developers-section").then((m) => ({
      default: m.DevelopersSection,
    })),
  { loading: () => <div className="min-h-[90vh] w-full bg-neutral-950" aria-hidden /> }
)

const OptimusTestimonialsSectionLazy = dynamic(
  () =>
    import("@/components/optimus/landing/testimonials-section").then((m) => ({
      default: m.TestimonialsSection,
    })),
  { loading: () => <div className="min-h-[70vh] w-full bg-neutral-950" aria-hidden /> }
)

const FeatureProgressSectionLazy = dynamic(
  () =>
    import("@/components/brilliance/FeatureProgressSection").then((m) => ({
      default: m.FeatureProgressSection,
    })),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#0a0a0a]" aria-hidden /> }
)

const TestimonialsSectionLazy = dynamic(
  () => import("@/components/brilliance/testimonials-section"),
  { loading: () => <div className="min-h-[70vh] w-full bg-black" aria-hidden /> }
)

const StatShowcaseSectionLazy = dynamic(
  () => import("@/components/sections/StatShowcaseSection"),
  { loading: () => <div className="min-h-[90vh] w-full bg-[#f5f2ec]" aria-hidden /> }
)

const PerformanceSectionLazy = dynamic(
  () => import("@/components/sections/PerformanceSection"),
  { loading: () => <div className="min-h-[150vh] w-full bg-[#112817]" aria-hidden /> }
)

const FAQSectionLazy = dynamic(() => import("@/components/brilliance/faq-section"), {
  loading: () => <div className="min-h-[60vh] w-full bg-black" aria-hidden />,
})

const SoftreeCTASectionLazy = dynamic(
  async () => {
    const { SoftreeCTASection } = await import("@/components/shared/softree-cta-section")
    function OptimusCTADynamic() {
      return <SoftreeCTASection variant="optimus" appearance="dark" />
    }
    return { default: OptimusCTADynamic }
  },
  { loading: () => <div className="min-h-[50vh] w-full bg-neutral-950" aria-hidden /> }
)

const SoftreeFooterLazy = dynamic(
  () =>
    import("@/components/homepage/TogetherFooter").then((m) => ({
      default: m.TogetherFooter,
    })),
  { loading: () => <div className="min-h-[40vh] w-full bg-[#fbfbfb]" aria-hidden /> }
)

function HomepageContent() {
  return (
    <div className="w-full min-h-screen relative bg-[#000000] flex flex-col justify-start items-center" style={{ overflowX: "clip" }}>
      <div className="relative flex flex-col justify-start items-center w-full mt-0">

        {/* 01a — HERO (video) */}
        <TrueHulyHero />

        {/* 01a.5 — SERVICES PARALLAX SHOWCASE (dark→light cinematic hook) */}
        <DeferUntilInView placeholderClassName="min-h-[500vh] bg-black">
          <ServicesParallaxShowcaseLazy />
        </DeferUntilInView>

        {/* 01b — GRID HERO (no video — ForDevelopers style reference) */}
        <DeferUntilInView placeholderClassName="min-h-screen bg-black">
          <SoftreeGridHeroLazy />
        </DeferUntilInView>

        {/* 02a — BRAND SHOWCASE (Hero-matched) */}
        <DeferUntilInView placeholderClassName="min-h-[85vh] bg-black">
          <VirtualOfficeSectionLazy />
        </DeferUntilInView>

        {/* 02b — GLOBAL SHOWCASE (Grid style — reference) */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#070707]">
          <SoftreeGlobalShowcaseLazy />
        </DeferUntilInView>

        {/* 03 — WHAT WE DO (Services Grid) */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#080808]">
          <MirrorContentOpsSectionLazy />
        </DeferUntilInView>

        {/* 03b — SERVICE PICKER (GSAP Flip route preview cards) */}
        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-[#080808]">
          <SoftreeServicePickerLazy />
        </DeferUntilInView>

        {/* 03c — SCROLL REVEAL (GSAP scroll-direction animations) */}
        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-[#0a0a0a]">
          <ScrollRevealSectionLazy />
        </DeferUntilInView>

        {/* 04 — HOW WE WORK */}
        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-neutral-950">
          <HowItWorksSectionLazy />
        </DeferUntilInView>

        {/* 04b — SERVICES STACKED SLIDES */}
        <DeferUntilInView placeholderClassName="min-h-[420vh] bg-black">
          <ServicesStackedSlidesLazy />
        </DeferUntilInView>

        {/* 04c — CUBE SCROLL GALLERY */}
        <DeferUntilInView placeholderClassName="min-h-[600vh] bg-black">
          <CubeScrollGalleryLazy />
        </DeferUntilInView>

        {/* 05 — PINNED SHOWCASE (scroll-driven delivery process) */}
        <DeferUntilInView placeholderClassName="min-h-[300vh] bg-[#0a0a0a]">
          <PinnedShowcaseSectionLazy />
        </DeferUntilInView>

        {/* 06 — WHY SOFTREE */}
        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-[#1a1a1a]">
          <WhySoftreeSectionLazy />
        </DeferUntilInView>

        {/* 07 — SOCIAL PROOF: TESTIMONIALS (moved up from position 17) */}
        <DeferUntilInView placeholderClassName="min-h-[70vh] bg-black">
          <TestimonialsSectionLazy />
        </DeferUntilInView>

        {/* 08 — INDUSTRIES WE SERVE */}
        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-white">
          <SoftreeIndustriesSectionLazy />
        </DeferUntilInView>

        {/* 11 — SECURITY & COMPLIANCE */}
        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-neutral-950">
          <SecuritySectionLazy />
        </DeferUntilInView>

        {/* 12 — MID-PAGE LEAD CAPTURE */}
        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-[#070707]">
          <SoftreeMidCTALazy />
        </DeferUntilInView>

        {/* 13 — FOR ENTERPRISE TEAMS */}
        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-[#070707]">
          <ForDevelopersSectionLazy />
        </DeferUntilInView>

        {/* 14 — TECHNOLOGY ECOSYSTEM */}
        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-[#fcfcfc]">
          <SoftreeStackTabsLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#f6f6f6]">
          <SoftreeComposioSectionLazy />
        </DeferUntilInView>

        {/* 15 — INSIGHTS */}
        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-white">
          <SoftreeBlogSectionLazy />
        </DeferUntilInView>

        {/* 16 — FAQ */}
        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-black">
          <FAQSectionLazy />
        </DeferUntilInView>

        {/* 17 — FINAL CTA */}
        <DeferUntilInView placeholderClassName="min-h-[50vh] bg-neutral-950">
          <SoftreeCTASectionLazy />
        </DeferUntilInView>

        {/* 18 — FOOTER */}
        <DeferUntilInView placeholderClassName="min-h-[40vh] bg-[#fbfbfb]">
          <SoftreeFooterLazy />
        </DeferUntilInView>

      </div>
    </div>
  )
}

export default function Homepage() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  )

  const lenisOptions = useMemo(
    () => ({
      autoRaf: true,
      smoothWheel: true,
      lerp: 0.085,
      anchors: true,
    }),
    []
  )

  if (prefersReducedMotion) {
    return <HomepageContent />
  }

  return (
    <ReactLenis root options={lenisOptions}>
      <HomepageContent />
    </ReactLenis>
  )
}
