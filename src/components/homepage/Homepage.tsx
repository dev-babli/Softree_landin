"use client"

import dynamic from "next/dynamic"
import { motion, useScroll, useSpring } from "framer-motion"
import { TransferredSoftreeHeroToolkit } from "@/components/homepage/TransferredSoftreeHeroToolkit"
import { useEffect, useRef, useState, type ReactNode } from "react"

/* ─────────────────────────────────────────────────────────────────────
 *  Homepage  ·  Cinematic flow, production-ready
 *
 *  Chrome (page-level):
 *    • Skip-to-content link  — accessibility
 *    • <main> landmark        — accessibility / SEO
 *    • Scroll progress bar    — fixed top, springs with scroll
 *    • Back-to-top button     — appears after 1200px scroll
 *
 *  Section loading:
 *    • Hero is eager (above the fold).
 *    • Every other section is `next/dynamic` + `DeferUntilInView`
 *      so we only fetch + mount when within ~320px of the viewport.
 *    • `placeholderClassName` MUST match each section's actual root
 *      background to avoid layout-shift / colour FOUC.
 * ───────────────────────────────────────────────────────────────────── */

/* ── Skip-to-content (visually hidden until focus) ─────────────────── */
function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#0a0a1a] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1852FF]/40"
    >
      Skip to content
    </a>
  )
}

/* ── Page-level scroll progress bar ────────────────────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.4,
  })
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #1852FF 0%, #6E9CFF 50%, #1852FF 100%)",
        boxShadow: "0 0 12px rgba(24,82,255,0.45)",
      }}
    />
  )
}

/* ── Back-to-top, appears after 1200px ────────────────────────────── */
function BackToTopButton() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1200)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group fixed bottom-6 right-6 z-[55] flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a1a] text-white shadow-[0_18px_50px_-12px_rgba(10,10,26,0.5),0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1852FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1852FF]/50 sm:bottom-8 sm:right-8"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={
        show
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.9, pointerEvents: "none" }
      }
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path
          d="M7 11V3M7 3L3 7M7 3L11 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  )
}

/* ── Defer-until-in-view wrapper ───────────────────────────────────── */
/*
 * CLS-critical design:
 *   1. placeholderClassName MUST reserve the FULL height the section will
 *      occupy after mount — including any GSAP pin-spacer. If a section
 *      uses `pin: true` with default pinSpacing, GSAP inserts an extra
 *      spacer = (end - start) above the section. The placeholder must
 *      account for this or everything below shifts (= CLS).
 *   2. rootMargin is 4000px so sections mount ~4 full viewports ahead of
 *      the user. This gives GSAP time to create pin-spacers BEFORE the
 *      section approaches the viewport.
 *   3. After mount, a ResizeObserver locks the height to the maximum
 *      measured value, absorbing any ScrollTrigger.refresh() jitter.
 */
function DeferUntilInView({
  children,
  placeholderClassName = "min-h-[50vh] bg-black",
}: {
  children: ReactNode
  placeholderClassName?: string
}) {
  const [shouldMount, setShouldMount] = useState(false)
  const [lockedHeight, setLockedHeight] = useState<number | null>(null)
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
      // 4000px gives GSAP pin-spacers time to settle before viewport
      { root: null, rootMargin: "4000px 0px 4000px 0px", threshold: 0 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldMount) return
    const el = ref.current
    if (!el) return

    const measure = () => {
      const h = el.getBoundingClientRect().height
      if (h > 0) setLockedHeight((prev) => (prev && prev > h ? prev : h))
    }

    // Wait 1.2s so GSAP ScrollTrigger has time to insert pin-spacers
    // before we lock. 600ms was too short for complex pinned sections.
    const settleTimer = window.setTimeout(measure, 1200)
    const ro = new ResizeObserver(measure)
    ro.observe(el)

    return () => {
      window.clearTimeout(settleTimer)
      ro.disconnect()
    }
  }, [shouldMount])

  return (
    <div
      ref={ref}
      className={shouldMount ? "w-full" : `w-full ${placeholderClassName}`}
      style={lockedHeight ? { minHeight: lockedHeight } : undefined}
    >
      {shouldMount ? children : null}
    </div>
  )
}

/* ── Lazy section imports (only sections actually rendered below) ──── */

const LightCreativeImpactLazy = dynamic(
  () => import("@/components/homepage-light/LightCreativeImpact"),
  { loading: () => <div className="min-h-[90vh] w-full bg-[#F3F0EE]" aria-hidden /> }
)

const FeaturesShowcaseLazy = dynamic(
  () => import("@/components/features/FeaturesShowcase"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#F3F0EE]" aria-hidden /> }
)

const ServicesStackedSlidesLazy = dynamic(
  () =>
    import("@/components/homepage/ServicesStackedSlides").then((m) => ({
      default: m.ServicesStackedSlides,
    })),
  // 4 panels × h-screen + intro header. pinSpacing: false so margin-bottom
  // handles the spacing. Reserve ~440vh.
  { loading: () => <div className="min-h-[440vh] w-full bg-black" aria-hidden /> }
)


const LightEngagementModelsLazy = dynamic(
  () => import("@/components/homepage-light/LightEngagementModels"),
  { loading: () => <div className="min-h-[80vh] w-full bg-white" aria-hidden /> }
)

const AvooraHeroLazy = dynamic(
  () => import("@/components/homepage-light/AvooraHero"),
  { loading: () => <div className="min-h-[100vh] w-full bg-white" aria-hidden /> }
)


const LightServicesStickyListLazy = dynamic(
  () => import("@/components/homepage-light/LightServicesStickyList"),
  // 4 sticky cards × 100vh each + header ≈ 420vh total scroll
  { loading: () => <div className="min-h-[420vh] w-full bg-white" aria-hidden /> }
)

const LightIndustriesCarouselLazy = dynamic(
  () => import("@/components/homepage-light/LightIndustriesCarousel"),
  { loading: () => <div className="min-h-[60vh] w-full bg-white" aria-hidden /> }
)

const LightHorizontalCodePathLazy = dynamic(
  () => import("@/components/homepage-light/LightHorizontalCodePath"),
  // Section is 100dvh + GSAP pin-spacer (~scrollWidth - viewportWidth ≈ 200-300vh).
  // pin: true with default pinSpacing: true adds the spacer. Reserve 350vh.
  { loading: () => <div className="min-h-[350vh] w-full bg-[#0a0a1a]" aria-hidden /> }
)

const SoftreeProjectShowcaseLazy = dynamic(
  () => import("@/components/homepage/SoftreeProjectShowcase"),
  { loading: () => <div className="min-h-[500vh] w-full bg-[#050505]" aria-hidden /> }
)

const LightAIAgentsLazy = dynamic(
  () => import("@/components/homepage-light/LightAIAgents"),
  { loading: () => <div className="min-h-[80vh] w-full bg-[#0a0a1a]" aria-hidden /> }
)

const SoftreeClientStoriesLazy = dynamic(
  () => import("@/components/homepage/SoftreeClientStories"),
  { loading: () => <div className="min-h-[110vh] w-full bg-[#07070b]" aria-hidden /> }
)

const SoftreeBlogSectionLazy = dynamic(
  () =>
    import("@/components/homepage/SoftreeBlogSection").then((m) => ({
      default: m.SoftreeBlogSection,
    })),
  { loading: () => <div className="min-h-[60vh] w-full bg-white" aria-hidden /> }
)

const LightFAQExactLazy = dynamic(
  () => import("@/components/homepage-light/LightFAQExact"),
  { loading: () => <div className="min-h-[60vh] w-full bg-white" aria-hidden /> }
)

const LightContactSectionLazy = dynamic(
  () => import("@/components/homepage-light/LightContactSection"),
  { loading: () => <div className="min-h-[100vh] w-full bg-[#f6f4f0]" aria-hidden /> }
)

const SoftreeFooterLazy = dynamic(
  () =>
    import("@/components/homepage/TogetherFooter").then((m) => ({
      default: m.TogetherFooter,
    })),
  { loading: () => <div className="min-h-[40vh] w-full bg-[#fbfbfb]" aria-hidden /> }
)

/* ── Page composition ──────────────────────────────────────────────── */

function HomepageContent() {
  return (
    <>
      <SkipToContent />
      <ScrollProgressBar />

      <main
        id="main-content"
        className="relative flex min-h-screen w-full flex-col items-stretch justify-start bg-[#f6f6f6]"
        style={{ overflowX: "clip" }}
      >
        <div className="relative mt-0 flex w-full flex-col items-stretch justify-start">
          {/* 01 — HERO  ·  eager, always above the fold */}
          <TransferredSoftreeHeroToolkit />

          {/* 02 — WHY SOFTREE (creative impact reskin) */}
          <DeferUntilInView placeholderClassName="min-h-[90vh] bg-[#F3F0EE]">
            <LightCreativeImpactLazy />
          </DeferUntilInView>

          {/* 03 — SERVICES SHOWCASE */}
          <DeferUntilInView placeholderClassName="min-h-[100vh] bg-[#F3F0EE]">
            <FeaturesShowcaseLazy />
          </DeferUntilInView>

          {/* 04 — SERVICES STACKED SLIDES (old ServicesStackedSlides)
           *  4 panels × h-screen + intro header. pinSpacing: false so
           *  margin-bottom handles spacing. Reserve ~440vh.
           */}
          <DeferUntilInView placeholderClassName="min-h-[440vh] bg-black">
            <ServicesStackedSlidesLazy />
          </DeferUntilInView>


          {/* 06B — ENGAGEMENT MODELS (accordion) */}
          <DeferUntilInView placeholderClassName="min-h-[80vh] bg-white">
            <LightEngagementModelsLazy />
          </DeferUntilInView>

          {/* 07 — CTA (Avoora hero) */}
          <DeferUntilInView placeholderClassName="min-h-[100vh] bg-white">
            <AvooraHeroLazy />
          </DeferUntilInView>


          {/* 09 — SERVICES STICKY LIST */}
          <DeferUntilInView placeholderClassName="min-h-[420vh] bg-white">
            <LightServicesStickyListLazy />
          </DeferUntilInView>

          {/* 10 — INDUSTRIES CAROUSEL */}
          <DeferUntilInView placeholderClassName="min-h-[60vh] bg-white">
            <LightIndustriesCarouselLazy />
          </DeferUntilInView>

          {/* 11 — OUR WORK (Project Showcase — sticky hero + scroll-stacked cards) */}
          <DeferUntilInView placeholderClassName="min-h-[400vh] bg-[#050505]">
            <SoftreeProjectShowcaseLazy />
          </DeferUntilInView>

          {/* 11 — HORIZONTAL CODE PATH (dark mode)
           *  Section = 100dvh pinned. GSAP pin: true + default pinSpacing
           *  creates spacer ≈ track.scrollWidth - viewportWidth.
           *  Total height ≈ 100vh + 260vh = 360vh. Reserve 350vh.
           */}
          <DeferUntilInView placeholderClassName="min-h-[350vh] bg-[#0a0a1a]">
            <LightHorizontalCodePathLazy />
          </DeferUntilInView>

          {/* 12 — AI AGENTS SHOWCASE */}
          <DeferUntilInView placeholderClassName="min-h-[80vh] bg-[#0a0a1a]">
            <LightAIAgentsLazy />
          </DeferUntilInView>

          {/* 13 - CLIENT STORIES */}
          <DeferUntilInView placeholderClassName="min-h-[110vh] bg-[#07070b]">
            <SoftreeClientStoriesLazy />
          </DeferUntilInView>

          {/* 13 — INSIGHTS / BLOG */}
          <DeferUntilInView placeholderClassName="min-h-[60vh] bg-white">
            <SoftreeBlogSectionLazy />
          </DeferUntilInView>

          {/* 14 — FAQ */}
          <DeferUntilInView placeholderClassName="min-h-[60vh] bg-white">
            <LightFAQExactLazy />
          </DeferUntilInView>

          {/* 15 — CONTACT (Get In Touch with Grainient bg) */}
          <DeferUntilInView placeholderClassName="min-h-[100vh] bg-[#f6f4f0]">
            <LightContactSectionLazy />
          </DeferUntilInView>

          {/* 16 — FOOTER */}
          <DeferUntilInView placeholderClassName="min-h-[40vh] bg-[#fbfbfb]">
            <SoftreeFooterLazy />
          </DeferUntilInView>
        </div>
      </main>

      <BackToTopButton />
    </>
  )
}

export default function Homepage() {
  return <HomepageContent />
}
