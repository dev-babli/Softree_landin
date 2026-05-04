"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, ArrowUpRight, Quote } from "lucide-react"

const OUTCOMES = [
  {
    metric: "64%",
    suffix: "faster reporting",
    body: "We rebuilt the BI stack with a Microsoft Fabric pipeline. The board now opens one dashboard instead of five.",
    client: "CTO · Series-B Fintech",
    accent: "#FF5812",
  },
  {
    metric: "3 wks",
    suffix: "to live pilot",
    body: "From signed proposal to a working AI agent on the operations floor — adopted in the first sprint.",
    client: "Director · Healthcare Ops",
    accent: "#1852FF",
  },
  {
    metric: "$1.4M",
    suffix: "annual savings",
    body: "Replaced manual approvals with a Power Platform flow that finance, legal and compliance all trust.",
    client: "VP Finance · SaaS",
    accent: "#00A3FF",
  },
]

const LOGOS = [
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefb0c5c9128f0dd58b6_Brand%2007.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefb0f49bca3c1742f2f_Brand%2003.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefbf5f22f3b3bf85a8a_Brand%2001.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefb9dd713edf13a284f_Brand%2002.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefbeb9a99a07522dd00_Brand%2004.webp",
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69a2aefb0adf56b97802a9be_Brand%2006.webp",
]

export function ConversionTrustWall() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })

  return (
    <section
      ref={ref}
      id="proof"
      className="relative w-full overflow-hidden bg-[#F4F5F7] py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,88,18,0.08),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(24,82,255,0.10),transparent_30%)]"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 lg:px-10">
        {/* Header */}
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FF5812]/20 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF5812] shadow-[0_8px_24px_rgba(15,15,15,0.05)]">
              <span className="size-1.5 rounded-full bg-[#FF5812]" />
              Proof, not promises
            </div>
            <h2 className="max-w-[680px] text-[clamp(34px,5vw,64px)] font-medium leading-[0.98] tracking-[-0.05em] text-[#0a0a1a]">
              Real teams. Real numbers. Shipped in weeks.
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-[#FF5812] text-[#FF5812]" />
                ))}
              </div>
              <span className="text-[14px] font-semibold tracking-[-0.02em] text-[#0a0a1a]">
                4.9 / 5.0
              </span>
              <span className="text-[12px] text-[#0a0a1a]/55">across 38 senior reviews</span>
            </div>
            <p className="max-w-md text-[14px] leading-[1.55] text-[#0a0a1a]/65">
              Engagements are scoped against measurable business outcomes. We track them publicly
              with the client every single sprint.
            </p>
          </div>
        </div>

        {/* Outcome cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {OUTCOMES.map((o, i) => (
            <motion.article
              key={o.metric}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_18px_50px_rgba(15,15,15,0.06)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,15,15,0.10)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                style={{ background: o.accent + "30" }}
              />

              <div className="relative flex h-full flex-col">
                <Quote className="size-5 text-[#0a0a1a]/15" />

                <div className="mt-6 flex items-baseline gap-2">
                  <span
                    className="text-[clamp(54px,5.4vw,72px)] font-semibold leading-none tracking-[-0.06em]"
                    style={{ color: o.accent }}
                  >
                    {o.metric}
                  </span>
                  <span className="text-[14px] font-medium tracking-[-0.02em] text-[#0a0a1a]/65">
                    {o.suffix}
                  </span>
                </div>

                <p className="mt-5 text-[15px] leading-[1.5] text-[#0a0a1a]/80">{o.body}</p>

                <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-5">
                  <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#0a0a1a]/50">
                    {o.client}
                  </span>
                  <span className="grid size-8 place-items-center rounded-full bg-[#0a0a1a] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Logo strip */}
        <div className="mt-14 rounded-[28px] border border-black/5 bg-white p-6 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0a0a1a]/55">
              Trusted by leadership at
            </p>
            <div className="grid grid-cols-3 gap-x-8 gap-y-5 lg:grid-cols-6 lg:flex-1 lg:justify-items-end">
              {LOGOS.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.06 }}
                  className="grid h-10 place-items-center"
                >
                  <img
                    src={src}
                    alt=""
                    className="h-7 w-auto opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConversionTrustWall
