"use client"

import dynamic from "next/dynamic"
import { HeroEnterpriseCards } from "@/components/brilliance/HeroEnterpriseCards"
import TransferredSoftreeHero from "@/components/homepage/TransferredSoftreeHero"
import { useEffect, useRef, useState, type ReactNode } from "react"


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


const ServicesStackedSlidesLazy = dynamic(
  () =>
    import("@/components/homepage/ServicesStackedSlides").then((m) => ({
      default: m.ServicesStackedSlides,
    })),
  { loading: () => <div className="min-h-[420vh] w-full bg-black" aria-hidden /> }
)

const ProductPreviewLazy = dynamic(
  () =>
    import("@/components/brilliance/ProductPreview").then((m) => ({
      default: m.ProductPreview,
    })),
  { loading: () => <div className="min-h-[100vh] w-full bg-black" aria-hidden /> }
)

const FeaturesSectionLazy = dynamic(
  () =>
    import("@/components/optimus/landing/features-section").then((m) => ({
      default: m.FeaturesSection,
    })),
  { loading: () => <div className="min-h-[90vh] w-full bg-white" aria-hidden /> }
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

const ForDevelopersSectionLazy = dynamic(
  () =>
    import("@/components/homepage/ForDevelopersSection").then((m) => ({
      default: m.ForDevelopersSection,
    })),
  { loading: () => <div className="min-h-[90vh] w-full bg-[#070707]" aria-hidden /> }
)

const HorizontalCodePathSectionLazy = dynamic(
  () =>
    import("@/components/homepage/HorizontalCodePathSection").then((m) => ({
      default: m.HorizontalCodePathSection,
    })),
  { loading: () => <div className="min-h-[100dvh] w-full bg-[#080a0d]" aria-hidden /> }
)

const SoftreeBlogSectionLazy = dynamic(
  () =>
    import("@/components/homepage/SoftreeBlogSection").then((m) => ({
      default: m.SoftreeBlogSection,
    })),
  { loading: () => <div className="min-h-[60vh] w-full bg-white" aria-hidden /> }
)

const LightAIAgentsLazy = dynamic(
  () => import("@/components/homepage-light/LightAIAgents"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#f8f4ea]" aria-hidden /> }
)

const SoftreeServicesHeroLazy = dynamic(
  () => import("@/components/homepage-light/SoftreeServicesHero"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#F8F9FC]" aria-hidden /> }
)

const LightAboutMergedLazy = dynamic(
  () => import("@/components/homepage-light/LightAboutMerged"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#F8F9FC]" aria-hidden /> }
)

const CoreFeaturesLazy = dynamic(
  () => import("@/components/homepage-light/CoreFeatures"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#050505]" aria-hidden /> }
)

const LightFAQExactLazy = dynamic(
  () => import("@/components/homepage-light/LightFAQExact"),
  { loading: () => <div className="min-h-[60vh] w-full bg-[#050505]" aria-hidden /> }
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

const GlobalTestimonialsSectionLazy = dynamic(
  () => import("@/components/homepage/GlobalTestimonialsSection"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#f2f2f2]" aria-hidden /> }
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

function EnterpriseCardsBand() {
  return (
    <section className="w-full bg-[#050505] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto w-full max-w-[1440px] rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(161,196,255,0.12),transparent_32%),rgba(10,10,12,0.94)] backdrop-blur-xl">
        <div className="px-2 py-4 md:px-6 md:py-8">
          <HeroEnterpriseCards />
        </div>
      </div>
    </section>
  )
}

function HomepageContent() {
  return (
    <div className="w-full min-h-screen relative bg-[#000000] flex flex-col justify-start items-stretch" style={{ overflowX: "clip" }}>
      <div className="relative flex flex-col justify-start items-stretch w-full mt-0">

        {/* 01a — HERO (video) */}
        <TransferredSoftreeHero />

        {/* 01b — SERVICES HERO (exact from /light) */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#F8F9FC]">
          <SoftreeServicesHeroLazy />
        </DeferUntilInView>

        {/* 01c — ABOUT US (exact from /light) */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#F8F9FC]">
          <LightAboutMergedLazy />
        </DeferUntilInView>

        {/* 01c — ENTERPRISE CARDS (moved up to sit below hero) */}
        <EnterpriseCardsBand />

        {/* 04b — SERVICES STACKED SLIDES */}
        <DeferUntilInView placeholderClassName="min-h-[420vh] bg-black">
          <ServicesStackedSlidesLazy />
        </DeferUntilInView>

        {/* 06b — CORE FEATURES (from /light) */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#050505]">
          <CoreFeaturesLazy />
        </DeferUntilInView>

        {/* 07 — SOCIAL PROOF: TESTIMONIALS (moved up from position 17) */}
        <DeferUntilInView placeholderClassName="min-h-[70vh] bg-black">
          <TestimonialsSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#f2f2f2]">
          <GlobalTestimonialsSectionLazy />
        </DeferUntilInView>

        {/* 08 — INDUSTRIES WE SERVE */}
        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-[#050505]">
          <SoftreeIndustriesSectionLazy />
        </DeferUntilInView>

        {/* 11 — SECURITY & COMPLIANCE */}
        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-neutral-950">
          <SecuritySectionLazy />
        </DeferUntilInView>

        {/* 13 — FOR ENTERPRISE TEAMS */}
        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-[#070707]">
          <ForDevelopersSectionLazy />
        </DeferUntilInView>

        {/* 13a — HORIZONTAL CODE PATH (scroll-driven pinned horizontal scroll) */}
        <DeferUntilInView placeholderClassName="min-h-[100dvh] bg-[#080a0d]">
          <HorizontalCodePathSectionLazy />
        </DeferUntilInView>

        {/* 14 — AI AGENTS SHOWCASE */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#f8f4ea]">
          <LightAIAgentsLazy />
        </DeferUntilInView>

        {/* 15 — INSIGHTS */}
        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-white">
          <SoftreeBlogSectionLazy />
        </DeferUntilInView>

        {/* 16a — FAQ EXACT (from /light) */}
        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-[#050505]">
          <LightFAQExactLazy />
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
  return <HomepageContent />
}




