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

const VirtualOfficeSectionLazy = dynamic(
  () =>
    import("@/components/brilliance/VirtualOfficeSection").then((m) => ({
      default: m.VirtualOfficeSection,
    })),
  { loading: () => <div className="min-h-[85vh] w-full bg-black" aria-hidden /> }
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
        {/* --- DARK THEME: PRODUCT & HERO SHOWCASE --- */}
        <TrueHulyHero />

        <DeferUntilInView placeholderClassName="min-h-[300vh] bg-[#0a0a0a]">
          <RigLandingSectionsLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[85vh] bg-black">
          <VirtualOfficeSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-black">
          <ProductPreviewLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-[#0a0a0a]">
          <div className="w-full">
            <FeatureProgressSectionLazy />
          </div>
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[620px] bg-[#0e0e0e]">
          <IntroDiagram />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-neutral-950">
          <HowItWorksSectionLazy />
        </DeferUntilInView>

        {/* --- AGENTIC AI METRICS & PERFORMANCE --- */}
        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-[#f5f2ec]">
          <StatShowcaseSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[150vh] bg-[#112817]">
          <PerformanceSectionLazy />
        </DeferUntilInView>

        {/* --- LIGHT THEME: FEATURES & ENTERPRISE --- */}
        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-white">
          <FeaturesSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-white">
          <InfrastructureSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-white">
          <SoftreeIndustriesSectionLazy />
        </DeferUntilInView>

        {/* --- DARK THEME: DEEP DIVE & DEVELOPERS --- */}
        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-[#1a1a1a]">
          <WhySoftreeSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-neutral-950">
          <MetricsSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-neutral-950">
          <IntegrationsSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-neutral-950">
          <SecuritySectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-neutral-950">
          <DevelopersSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-[#070707]">
          <ForDevelopersSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-[#070707]">
          <SoftreeMidCTALazy />
        </DeferUntilInView>

        {/* --- LIGHT THEME: ECOSYSTEM & BLOG --- */}
        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-[#fcfcfc]">
          <SoftreeStackTabsLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-white">
          <SoftreeBlogSectionLazy />
        </DeferUntilInView>

        {/* --- DARK THEME: TRUST & FINAL CTAS --- */}
        <DeferUntilInView placeholderClassName="min-h-[70vh] bg-neutral-950">
          <OptimusTestimonialsSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[70vh] bg-black">
          <TestimonialsSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-black">
          <FAQSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[50vh] bg-neutral-950">
          <SoftreeCTASectionLazy />
        </DeferUntilInView>

        {/* --- FOOTER --- */}
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
