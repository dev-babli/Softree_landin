"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

/* ====================================================================
 *  SERVICES — sticky list with hover image reveal
 *    • Sticky "Services" title on the left
 *    • 4 service rows stacked on the right
 *    • Hover a row → image reveals with a red overlay wipe from bottom
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Service = {
  n: string
  title: string
  href: string
  desc: string
  tags: string[]
  img: string
  price: string
}

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Ship a Web App",
    href: "/services/digital-workspace/web-app-development",
    desc: "Production-grade web apps in Next.js, React, and TypeScript. Senior engineers, fixed scope, weekly demos. From discovery to launch in 12 weeks.",
    tags: ["Next.js", "React", "TypeScript", "Production"],
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
    price: "From ₹12L · 12-week MVP",
  },
  {
    n: "02",
    title: "Build Power Platform Automations",
    href: "/services/business-applications/power-apps",
    desc: "Power Apps, Power Automate, and Power BI built by Microsoft Gold Partners. Enterprise governance, security review, ALM pipelines included.",
    tags: ["Power Apps", "Power Automate", "Power BI", "Microsoft"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    price: "From ₹8L · 6-week MVP",
  },
  {
    n: "03",
    title: "Modernize SharePoint",
    href: "/services/digital-workspace/sharepoint",
    desc: "SharePoint intranets and SPFx web parts that don\u2019t feel like SharePoint. Migration, custom branding, and Microsoft 365 integrations.",
    tags: ["SharePoint", "SPFx", "M365", "Migration"],
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
    price: "From ₹6L · 4–8 week engagements",
  },
  {
    n: "04",
    title: "Stand up Data + BI",
    href: "/services/data-analytics/microsoft-fabric",
    desc: "Microsoft Fabric, Power BI dashboards, and data engineering pipelines that surface revenue signals \u2014 not 60-page decks.",
    tags: ["Microsoft Fabric", "Power BI", "Data Engineering", "Analytics"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    price: "From ₹10L · 8-week pilot",
  },
]

/* ====================================================================
 *  ServiceCard — one full-bleed sticky card in the stack
 *    • Pins to top while the next card scrolls up over it (overlap effect)
 *    • Subtle scale + fade as it gets covered (stack feel)
 *    • Image overlay wipes down on enter, mimicking the .image-overlay.red
 * ==================================================================== */
function ServiceCard({
  s,
  index,
  total,
}: {
  s: Service
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const isLast = index === total - 1
  // Cover effect — card recedes (scale + slight darken) as next slides over.
  // Front-loaded curve so the recede feels firm, not slushy.
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.97, isLast ? 1 : 0.92],
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [1, 0.92, isLast ? 1 : 0.55],
  )
  const y = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : -16])

  // Image reveal — wider scroll range = smoother wipe, no abrupt snap
  const overlayRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: enterProgress } = useScroll({
    target: overlayRef,
    offset: ["start 0.98", "start 0.35"],
  })
  const overlayHeight = useTransform(enterProgress, [0, 1], ["100%", "0%"])

  // Progressive sticky top — each card sits a hair lower than the previous,
  // so the stack is physically visible (not all pinned at the same y).
  const stickyOffset = `${index * 14}px`

  return (
    <div
      ref={ref}
      className="sticky w-full"
      style={{ top: stickyOffset }}
    >
      <motion.article
        style={{
          scale,
          opacity,
          y,
          boxShadow: isLast
            ? "none"
            : "0 -28px 56px -36px rgba(17,17,17,0.22)",
        }}
        className="relative w-full bg-white"
      >
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
          {/* hairline divider above each card */}
          <div className="h-px w-full bg-[#111]/12" />

          <div
            ref={overlayRef}
            className="grid min-h-[100svh] grid-cols-1 items-center gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
          >
            {/* LEFT — copy block */}
            <div className="flex flex-col">
              <a
                href={s.href}
                className="group/title inline-flex items-baseline gap-3"
              >
                <h3
                  className="font-semibold text-[#0E0E0F] transition-colors duration-500 group-hover/title:text-[#0E0E0F]/70"
                  style={{
                    fontSize: "clamp(48px, 7.4vw, 108px)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {s.title}
                </h3>
                <span
                  className="flex items-baseline font-medium text-[#0E0E0F]/55"
                  style={{
                    fontSize: "clamp(16px, 1.4vw, 22px)",
                    letterSpacing: "-0.01em",
                    transform: "translateY(-0.35em)",
                  }}
                >
                  <span>{"{"}</span>
                  <span>0</span>
                  <span>{s.n.slice(1)}</span>
                  <span>{"}"}</span>
                </span>
              </a>

              <p className="mt-6 max-w-[480px] text-[15px] leading-[1.55] text-[#0E0E0F]/70 md:text-[16px]">
                {s.desc}
              </p>

              {/* Pricing/timeline transparency — buyers self-qualify */}
              <div
                className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-[#0E0E0F]/15 bg-white/70 px-3.5 py-1.5 backdrop-blur-md"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]"
                />
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[#0E0E0F]/85">
                  {s.price}
                </span>
              </div>

              {/* Tags pinned to bottom-left of the column */}
              <div className="mt-auto flex flex-wrap gap-2.5 pt-16">
                {s.tags.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.06 }}
                    className="rounded-full border border-[#0E0E0F]/22 px-4 py-1.5 text-[12px] font-medium tracking-wide text-[#0E0E0F]/85"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* RIGHT — image with red overlay wipe */}
            <a
              href={s.href}
              className="relative block w-full overflow-hidden"
              style={{
                aspectRatio: "4 / 3",
                maxHeight: "min(60svh, 520px)",
              }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: EASE }}
              >
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index < 2}
                />
              </motion.div>
              <motion.div
                style={{ height: overlayHeight }}
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-[#FF3B1F]"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

/* ====================================================================
 *  LightServicesStickyList
 *    • "Services" heading, then 4 sticky-stacked service cards
 * ==================================================================== */
export default function LightServicesStickyList() {
  return (
    <section className="relative w-full bg-white">
      {/* Heading band */}
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-10 pt-24 md:px-10 md:pb-14 md:pt-32">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-semibold text-[#0E0E0F]"
          style={{
            fontSize: "clamp(56px, 9vw, 132px)",
            lineHeight: 0.92,
            letterSpacing: "-0.045em",
          }}
        >
          Services
        </motion.h2>
      </div>

      {/* Sticky stack track */}
      <div className="relative">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.n} s={s} index={i} total={SERVICES.length} />
        ))}
      </div>

      {/* Closing hairline */}
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="h-px w-full bg-[#111]/12" />
      </div>
    </section>
  )
}
