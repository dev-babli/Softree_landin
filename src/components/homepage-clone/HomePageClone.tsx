"use client"

import dynamic from "next/dynamic"
import { ReactLenis } from "lenis/react"
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react"
import { HeroClone } from "@/components/homepage-clone/HeroClone"
import { ScrollProgressClone, StorytellingCTAClone } from "@/components/homepage-clone/HomePageCloneSections"
import { ServicesParallaxShowcase } from "@/components/homepage-clone/ServicesParallaxShowcase"
import { MirrorContentOpsSection } from "@/components/homepage-clone/MirrorContentOpsSection"
import { SoftreeGlobalShowcase } from "@/components/homepage-clone/SoftreeGlobalShowcase"
import { SoftreeServicePicker } from "@/components/homepage-clone/SoftreeServicePicker"
import { ScrollRevealSection } from "@/components/homepage-clone/ScrollRevealSection"
import { PinnedShowcaseSection } from "@/components/homepage-clone/PinnedShowcaseSection"
import { WhySoftreeSection } from "@/components/homepage-clone/WhySoftreeSection"
import { SoftreeIndustriesSection } from "@/components/homepage-clone/SoftreeIndustriesSection"
import { ForDevelopersSection } from "@/components/homepage-clone/ForDevelopersSection"
import { SoftreeStackTabs } from "@/components/homepage-clone/SoftreeStackTabs"
import { SoftreeComposioSection } from "@/components/homepage-clone/SoftreeComposioSection"
import { SoftreeBlogSection } from "@/components/homepage-clone/SoftreeBlogSection"
import { SoftreeMidCTA } from "@/components/homepage-clone/SoftreeMidCTA"
import { useHomePageCloneGsap } from "@/components/homepage-clone/useHomePageCloneGsap"

const TogetherFooterClone = dynamic(
  () =>
    import("@/components/homepage-clone/TogetherFooter").then((module) => ({
      default: module.TogetherFooter,
    })),
  { loading: () => <div className="min-h-[40vh] w-full bg-[#fbfbfb]" aria-hidden /> }
)

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
  placeholderClassName = "min-h-[60vh] bg-black",
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
      { root: null, rootMargin: "360px 0px 360px 0px", threshold: 0 }
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

function HomePageCloneContent() {
  const rootRef = useRef<HTMLElement | null>(null)
  useHomePageCloneGsap(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative min-h-screen w-full overflow-x-clip bg-black font-sans text-white selection:bg-cyan-200 selection:text-[#061b31]"
    >
      <ScrollProgressClone />
      <HeroClone />
      <ServicesParallaxShowcase />
      <MirrorContentOpsSection />
      <SoftreeGlobalShowcase />
      <SoftreeServicePicker />
      <ScrollRevealSection />
      <PinnedShowcaseSection />
      <WhySoftreeSection />
      <SoftreeIndustriesSection />
      <ForDevelopersSection />
      <SoftreeMidCTA />
      <SoftreeStackTabs />
      <SoftreeComposioSection />
      <SoftreeBlogSection />
      <StorytellingCTAClone />
      <DeferUntilInView placeholderClassName="min-h-[40vh] bg-[#fbfbfb]">
        <TogetherFooterClone />
      </DeferUntilInView>
    </main>
  )
}

export default function HomePageClone() {
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
    return <HomePageCloneContent />
  }

  return (
    <ReactLenis root options={lenisOptions}>
      <HomePageCloneContent />
    </ReactLenis>
  )
}
