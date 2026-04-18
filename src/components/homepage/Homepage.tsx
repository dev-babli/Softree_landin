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

const OptimusFooterLazy = dynamic(
  async () => {
    const { FooterSection } = await import("@/components/optimus/landing/footer-section")
    function FooterDark() {
      return <FooterSection appearance="dark" />
    }
    return { default: FooterDark }
  },
  { loading: () => <div className="min-h-[40vh] w-full bg-neutral-950" aria-hidden /> }
)

function HomepageContent() {
  return (
    <div className="w-full min-h-screen relative bg-[#000000] overflow-x-hidden flex flex-col justify-start items-center">
      <div className="relative flex flex-col justify-start items-center w-full mt-0">
        <TrueHulyHero />

        <DeferUntilInView placeholderClassName="min-h-[280px] bg-black">
          <div className="w-full flex justify-center items-center px-6 py-16 bg-black">
            <IntroDiagram />
          </div>
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[300vh] bg-[#0a0a0a]">
          <RigLandingSectionsLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-black">
          <ProductPreviewLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-white">
          <FeaturesSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-neutral-950">
          <HowItWorksSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[90vh] bg-white">
          <InfrastructureSectionLazy />
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

        <DeferUntilInView placeholderClassName="min-h-[70vh] bg-neutral-950">
          <OptimusTestimonialsSectionLazy />
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[100vh] bg-[#0a0a0a]">
          <div className="w-full">
            <FeatureProgressSectionLazy />
          </div>
        </DeferUntilInView>

        <DeferUntilInView placeholderClassName="min-h-[85vh] bg-black">
          <VirtualOfficeSectionLazy />
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

        <DeferUntilInView placeholderClassName="min-h-[40vh] bg-neutral-950">
          <OptimusFooterLazy />
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
