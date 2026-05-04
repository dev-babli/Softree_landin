"use client"

/**
 * LightBlog — A warm blog section using the /light page design language.
 *
 * Adapted from SoftreeBlogSection. Three editorial cards with a subtle
 * SVG corner morph on hover, cream backgrounds, and ink-on-warm tones.
 */

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { color, radius } from "./tokens"

const cardVariants = {
  unhovered: { y: 0 },
  hovered: { y: -4 },
}

const pathVariants = {
  unhovered: {
    d: "M670 0H0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 106.721 536.529 99.9469L570.988 31.0531C574.377 24.2789 581.301 20 588.875 20H650C661.046 20 670 11.0457 670 0Z",
  },
  hovered: {
    d: "M670 0H0V91C0 102.046 8.9543 111 20 111H300C333.33 111 366.66 111 400 111L500 111C533.33 111 566.66 111 600 111H650C661.046 111 670 102.046 670 91Z",
  },
}

const POSTS = [
  {
    image: "/whysoftree/ai.webp",
    date: "Mar 17, 2026",
    title: "Softree advances enterprise AI capabilities with global partners",
  },
  {
    image: "/whysoftree/microsoft.webp",
    date: "Dec 11, 2025",
    title: "Introducing Softree OS: Our most powerful integrated suite yet",
  },
  {
    image: "/whysoftree/data.webp",
    date: "Nov 27, 2025",
    title: "Softree expands strategic tools to provide full-scale automation",
  },
]

export default function LightBlog() {
  return (
    <section className="relative w-full py-20 md:py-28" style={{ background: color.canvas }}>
      <div className="relative mx-auto w-full max-w-[1320px] px-4 lg:px-10">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ background: color.lifted, borderColor: color.dustTaupe }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: color.flame }} />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: color.slate }}>Insights</span>
            </div>
            <h2 className="text-3xl font-medium leading-[1.05] tracking-tight md:text-[42px]" style={{ color: color.ink, fontFamily: color.ink ? undefined : "inherit" }}>
              From the Softree Team
            </h2>
          </motion.div>

          <motion.a
            href="/blog"
            className="group inline-flex items-center gap-1.5 font-medium"
            style={{ color: color.ink, fontSize: 15 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            See more on the blog
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <motion.a
              key={i}
              href="/blog"
              className="group/card relative flex flex-col overflow-hidden"
              style={{ borderRadius: radius.consent }}
              initial="unhovered"
              whileHover="hovered"
              variants={cardVariants}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                className="flex flex-1 flex-col p-5 pb-0"
                style={{
                  background: color.lifted,
                  borderTopLeftRadius: radius.consent,
                  borderTopRightRadius: radius.consent,
                }}
              >
                <motion.img
                  alt={post.title}
                  loading="lazy"
                  width={670}
                  height={208}
                  className="mb-5 w-full rounded object-cover"
                  style={{ height: 168 }}
                  src={post.image}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.23, 1, 0.32, 1] }}
                />
                <motion.p
                  className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider"
                  style={{ color: color.slate }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + 0.1 * i, ease: [0.23, 1, 0.32, 1] }}
                >
                  Softree Team — {post.date}
                </motion.p>
                <motion.h3
                  className="mb-12 text-lg font-medium leading-snug md:text-xl"
                  style={{ color: color.ink }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + 0.1 * i, ease: [0.23, 1, 0.32, 1] }}
                >
                  {post.title}
                </motion.h3>
              </div>

              {/* SVG corner morph */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 670 111" preserveAspectRatio="none" className="-mt-px w-full shrink-0">
                <motion.path
                  className="w-full"
                  fill={color.lifted}
                  variants={pathVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </svg>

              {/* Read more row */}
              <div className="flex items-center justify-between px-5 pb-5" style={{ background: color.lifted, borderBottomLeftRadius: radius.consent, borderBottomRightRadius: radius.consent }}>
                <span className="text-sm font-medium" style={{ color: color.ink }}>Read more</span>
                <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover/card:translate-x-0 group-hover/card:opacity-100" style={{ color: color.ink, transform: "translateX(-4px)" }} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
