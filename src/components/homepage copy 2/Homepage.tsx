"use client"

import dynamic from "next/dynamic"
import { TransferredSoftreeHeroToolkit } from "@/components/homepage/TransferredSoftreeHeroToolkit"
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


const FeaturesShowcaseLazy = dynamic(
  () => import("@/components/features/FeaturesShowcase"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#f6f6f6]" aria-hidden /> }
)

const LightStackedSlidesLazy = dynamic(
  () => import("@/components/homepage-light/LightStackedSlides"),
  { loading: () => <div className="min-h-[200vh] w-full bg-[#f6f6f6]" aria-hidden /> }
)

const LightTestimonialGridLazy = dynamic(
  () => import("@/components/homepage-light/LightTestimonialGrid"),
  { loading: () => <div className="min-h-[70vh] w-full bg-[#f6f6f6]" aria-hidden /> }
)

const LightIndustriesCarouselLazy = dynamic(
  () => import("@/components/homepage-light/LightIndustriesCarousel"),
  { loading: () => <div className="min-h-[60vh] w-full bg-white" aria-hidden /> }
)

const LightHorizontalCodePathLazy = dynamic(
  () => import("@/components/homepage-light/LightHorizontalCodePath"),
  { loading: () => <div className="min-h-[100dvh] w-full bg-[#f6f6f6]" aria-hidden /> }
)

const LightContactSectionLazy = dynamic(
  () => import("@/components/homepage-light/LightContactSection"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#f6f6f6]" aria-hidden /> }
)

const LightWhyChooseUsLazy = dynamic(
  () => import("@/components/homepage-light/LightWhyChooseUs"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#08081a]" aria-hidden /> }
)

const LightOverviewBentoLazy = dynamic(
  () => import("@/components/homepage-light/LightOverviewBento"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#f6f6f6]" aria-hidden /> }
)

const LightServicesStickyListLazy = dynamic(
  () => import("@/components/homepage-light/LightServicesStickyList"),
  { loading: () => <div className="min-h-[100vh] w-full bg-white" aria-hidden /> }
)

const AvooraHeroLazy = dynamic(
  () => import("@/components/homepage-light/AvooraHero"),
  { loading: () => <div className="min-h-[100vh] w-full bg-white" aria-hidden /> }
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

const LightCreativeImpactLazy = dynamic(
  () => import("@/components/homepage-light/LightCreativeImpact"),
  { loading: () => <div className="min-h-[90vh] w-full bg-[#F3F0EE]" aria-hidden /> }
)

const CoreFeaturesLazy = dynamic(
  () => import("@/components/homepage-light/CoreFeatures"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#050505]" aria-hidden /> }
)

const LightFAQExactLazy = dynamic(
  () => import("@/components/homepage-light/LightFAQExact"),
  { loading: () => <div className="min-h-[60vh] w-full bg-[#050505]" aria-hidden /> }
)

const LightExpertiseAccordionLazy = dynamic(
  () => import("@/components/homepage-light/LightExpertiseAccordion"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#F8F9FC]" aria-hidden /> }
)

const LightHowWeWorkLazy = dynamic(
  () => import("@/components/homepage-light/LightHowWeWork"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#F8F9FC]" aria-hidden /> }
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

const SoftreeFooterLazy = dynamic(
  () =>
    import("@/components/homepage/TogetherFooter").then((m) => ({
      default: m.TogetherFooter,
    })),
  { loading: () => <div className="min-h-[40vh] w-full bg-[#fbfbfb]" aria-hidden /> }
)

function HomepageContent() {
  return (
    <div className="w-full min-h-screen relative bg-[#f6f6f6] flex flex-col justify-start items-stretch" style={{ overflowX: "clip" }}>
      <div className="relative flex flex-col justify-start items-stretch w-full mt-0">

        {/* 01a — HERO (Toolkit hero from /light) */}
        <TransferredSoftreeHeroToolkit />

        {/* 01b — SERVICES HERO (exact from /light) */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#F8F9FC]">
          <SoftreeServicesHeroLazy />
        </DeferUntilInView>

        {/* 01c — ABOUT US (exact from /light) */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#F8F9FC]">
          <LightAboutMergedLazy />
        </DeferUntilInView>

        {/* 01c.1 — CREATIVE IMPACT (cream/orange brand stats) */}
        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-[#F3F0EE]">
          <LightCreativeImpactLazy />
        </DeferUntilInView>

        {/* 01d — FEATURES SHOWCASE (ProductArcSlider + Why Softree + LogoLoop) */}
        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-[#f6f6f6]">
          <FeaturesShowcaseLazy />
        </DeferUntilInView>

        {/* 04b — SERVICES STACKED SLIDES (light variant from /light) */}
        <DeferUntilInView placeholderClassName="min-h-[200vh] bg-[#f6f6f6]">
          <LightStackedSlidesLazy />
        </DeferUntilInView>

        {/* 06b — CORE FEATURES (from /light) */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#f6f6f6]">
          <CoreFeaturesLazy />
        </DeferUntilInView>

        {/* 06c — EXPERTISE ACCORDION (from /light) */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#F8F9FC]">
          <LightExpertiseAccordionLazy />
        </DeferUntilInView>

        {/* 06d — HOW WE WORK (from /light) */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#F8F9FC]">
          <LightHowWeWorkLazy />
        </DeferUntilInView>

        {/* 06d.5 — AVOORA HERO (display block: huge wordmark + gradient stage) */}
        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-white">
          <AvooraHeroLazy />
        </DeferUntilInView>

        {/* 06e — WHY CHOOSE US (Engineered for excellence + AI orb) */}
        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-[#08081a]">
          <LightWhyChooseUsLazy />
        </DeferUntilInView>

        {/* 06f — OVERVIEW BENTO (Built for better development — 4 cards) */}
        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-[#f6f6f6]">
          <LightOverviewBentoLazy />
        </DeferUntilInView>

        {/* 06g — SERVICES STICKY LIST (Branding / Development / Websites / Design) */}
        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-white">
          <LightServicesStickyListLazy />
        </DeferUntilInView>

        {/* 07 — SOCIAL PROOF: TESTIMONIALS (light grid variant) */}
        <DeferUntilInView placeholderClassName="min-h-[70vh] bg-[#f6f6f6]">
          <LightTestimonialGridLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#f2f2f2]">
          <GlobalTestimonialsSectionLazy />
        </DeferUntilInView>

        {/* 08 — INDUSTRIES WE SERVE (light carousel variant) */}
        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-white">
          <LightIndustriesCarouselLazy />
        </DeferUntilInView>

        {/* 13a — HORIZONTAL CODE PATH (light variant) */}
        <DeferUntilInView placeholderClassName="min-h-[100dvh] bg-[#f6f6f6]">
          <LightHorizontalCodePathLazy />
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
        <DeferUntilInView placeholderClassName="min-h-[60vh] bg-[#f6f6f6]">
          <LightFAQExactLazy />
        </DeferUntilInView>

        {/* 17 — CONTACT (Get In Touch form) */}
        <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#f6f6f6]">
          <LightContactSectionLazy />
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




