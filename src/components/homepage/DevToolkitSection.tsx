"use client"

import CurvedLoop from "./CurvedLoop"
import StaggeredReveal from "./StaggeredReveal"
import RadialCardCarousel, { type RadialCard } from "./RadialCardCarousel"

const TOOLKIT_CARDS: RadialCard[] = [
  {
    title: "AI Agents",
    description: "Deploy sophisticated multi-agent architectures that automate your most complex workflows.",
    tagPrefix: "Part of the",
    tagSuffix: "Membership",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-vault.avif",
    variant: "light",
    href: "/services/ai-agents",
    cta: "Discover",
  },
  {
    title: "Enterprise Dashboards",
    description: "High-performance data visualization and analytics tools built for scale.",
    tagPrefix: "Built for",
    tagSuffix: "Enterprise",
    image: "https://osmo.b-cdn.net/website/bandwidth/page-transition-course-thumb-1440x900.avif",
    video: "https://osmo.b-cdn.net/website/page-transition-course/page-transition-course-thumb-720x450.mp4",
    variant: "electric",
    href: "/services/enterprise-dashboards",
    cta: "Explore",
  },
  {
    title: "High-End UX/UI",
    description: "Cinematic, pixel-perfect visual design that separates you from the competition.",
    tagPrefix: "Part of the",
    tagSuffix: "Membership",
    image: "https://osmo.b-cdn.net/website/bandwidth/button-pack-product-card-2160x2808.avif",
    variant: "dark",
    href: "/services/ux-ui",
    cta: "Discover",
  },
  {
    title: "Team Collaboration",
    description: "Seamless real-time shared workspaces for distributed engineering teams.",
    tagPrefix: "Part of the",
    tagSuffix: "membership",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-easings.avif",
    variant: "disabled",
  },
  {
    title: "Icons",
    description: "A uniform library of clean, scalable SVG icons you can copy or download in seconds.",
    tagPrefix: "Part of the",
    tagSuffix: "Membership",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-icons.avif",
    variant: "black",
    href: "/services/infrastructure",
    cta: "Scale Now",
  },
  {
    title: "Next.js Architectures",
    description: "React server components, edge caching, and optimized data fetching pipelines.",
    tagPrefix: "Part of the",
    tagSuffix: "Membership",
    image: "https://osmo.b-cdn.net/website/bandwidth/product-card-community.avif",
    variant: "purple",
    href: "/services/architecture",
    cta: "View Docs",
  },
]

export default function DevToolkitSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 pt-24 md:pt-32 lg:pt-40">
        <div className="flex w-full flex-col items-center gap-3 text-center">
          <StaggeredReveal
            as="h1"
            text="AI Scale"
            splitBy="word"
            stagger={0.08}
            className="justify-center text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[0.92] tracking-[-0.04em]"
          />

          <div className="my-2 flex items-center justify-center" aria-hidden>
            <svg
              viewBox="0 0 187 187"
              className="h-[clamp(2.5rem,5.5vw,4.5rem)] w-[clamp(2.5rem,5.5vw,4.5rem)] text-white"
              fill="none"
            >
              <path
                d="M126.049 76.7471L167.276 35.5197L150.805 19.0486L109.577 60.276C107.82 62.0398 104.808 60.7915 104.808 58.3009V0H81.517V70.3375C81.517 76.511 76.511 81.517 70.3375 81.517H0V104.808H58.3009C60.7915 104.808 62.0398 107.82 60.276 109.577L19.0548 150.805L35.5259 167.276L76.7533 126.049C78.5109 124.291 81.5232 125.533 81.5232 128.024V186.324H104.814V115.987C104.814 109.813 109.82 104.808 115.993 104.808H186.331V81.517H128.03C125.539 81.517 124.291 78.5047 126.055 76.7471H126.049Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <StaggeredReveal
            as="h2"
            text="Built to Last"
            splitBy="word"
            stagger={0.08}
            delay={0.15}
            className="justify-center text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[0.92] tracking-[-0.04em] italic text-white/85"
          />
        </div>

        <p className="mt-10 max-w-[58ch] text-center text-[clamp(1rem,1.4vw,1.25rem)] leading-relaxed text-white/70 md:mt-14">
          A growing arsenal of{" "}
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-0.5 align-middle text-white">
            AI Agents
          </span>
          {", "}
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-0.5 align-middle text-white">
            Next.js
          </span>{" "}
          architectures, and{" "}
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-0.5 align-middle text-white">
            enterprise
          </span>{" "}
          components — so you can scale faster without sacrificing polish.
        </p>
      </div>

      <div className="relative z-10 mt-20 md:mt-24">
        <div className="relative h-[78vh] min-h-[640px] w-full">
          <RadialCardCarousel
            cards={TOOLKIT_CARDS}
            step={20}
            duration={75}
            direction="ccw"
            className="absolute inset-0"
          />

          <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-20 translate-y-1/4">
            <div className="opacity-90 mix-blend-screen">
              <CurvedLoop
                marqueeText="Explore  ✦  The  ✦  Toolkit  ✦  Built  ✦  To  ✦  Flex  ✦ "
                speed={1.4}
                curveAmount={120}
                direction="left"
                interactive
                className="text-[5rem] tracking-tight"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
