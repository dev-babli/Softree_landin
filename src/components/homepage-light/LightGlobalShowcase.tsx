"use client"

/**
 * LightGlobalShowcase — Enterprise stats + capability pillars for /light page.
 *
 * Adapted from SoftreeGlobalShowcase with light-theme tokens.
 * Stats strip + 4 pillar cards + CTA row, all on cream canvas.
 */

import { motion } from "framer-motion"
import { ArrowRight, Shield, Layers, Brain, Globe } from "lucide-react"
import { color, shadow, BLOCK_GRADIENT } from "./tokens"

const STATS = [
  { value: "200+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4", label: "Global delivery hubs" },
]

const PILLARS = [
  {
    tag: "01",
    title: "Enterprise-First\nEngineering",
    body: "Every engagement is architected for scale, security, and longevity — not just the MVP. We build what your enterprise can actually run.",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    tag: "02",
    title: "Microsoft Stack\nSpecialists",
    body: "SharePoint, Power Platform, Azure, Teams, Fabric — deep expertise across the full Microsoft ecosystem, not just surface integrations.",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    tag: "03",
    title: "AI-Native\nDelivery",
    body: "From GPT-4o to Claude — we design, train, and deploy AI agents, RAG pipelines, and document intelligence into production workflows.",
    icon: <Brain className="h-5 w-5" />,
  },
  {
    tag: "04",
    title: "Global Delivery,\nZero Handoffs",
    body: "Unified teams across UK, US, India, Middle East. One PM, one process, one quality bar — no fragmented offshore chaos.",
    icon: <Globe className="h-5 w-5" />,
  },
]

export default function LightGlobalShowcase() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: color.canvas }}>
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: BLOCK_GRADIENT }} />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[600px]"
        style={{ background: "radial-gradient(ellipse at 80% 0%, rgba(251,100,36,0.08) 0%, transparent 70%)" }}
      />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[400px]"
        style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(255,161,16,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 py-24 lg:px-10">
        {/* Tag */}
        <div className="mb-8 flex items-center gap-2">
          <div className="size-[6px] rounded-full" style={{ background: color.flame }} />
          <span className="font-mono text-sm tracking-tight" style={{ color: color.slate }}>YOUR TRUSTED GLOBAL PARTNER</span>
        </div>

        {/* Headline */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[580px] text-3xl font-medium leading-[1.05] tracking-tight md:text-[48px]" style={{ color: color.ink }}>
            Built for enterprises.<br />
            <span style={{ background: BLOCK_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Delivered globally.
            </span>
          </h2>
          <p className="max-w-[420px] text-base leading-relaxed" style={{ color: color.slate }}>
            Softree is a technology delivery partner trusted by enterprise teams across the UK, Middle East, and Asia — turning strategy into production-grade software.
          </p>
        </div>

        {/* Stats strip */}
        <motion.div
          className="mb-1 grid grid-cols-2 border md:grid-cols-4"
          style={{ borderColor: color.dustTaupe }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center px-4 py-8"
              style={{
                borderRight: i < STATS.length - 1 ? `1px solid ${color.dustTaupe}` : "none",
              }}
            >
              <span className="mb-1 font-mono text-3xl font-bold md:text-4xl"
                style={{ color: color.ink }}>
                {s.value}
              </span>
              <span className="text-center font-mono text-[10px] uppercase tracking-widest" style={{ color: color.slate }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Track bars */}
        <div className="hidden lg:flex h-7 w-full">
          {[191, 138, 245, 109, 191, 119, 181].map((w, i) => (
            <div key={i} className="h-full shrink-0 border-b border-l border-r" style={{ width: `${w}px`, background: color.lifted, borderColor: color.dustTaupe }} />
          ))}
          <div className="h-full min-w-0 flex-1 border-b border-r" style={{ background: color.lifted, borderColor: color.dustTaupe }} />
        </div>

        {/* 4 Pillar grid */}
        <div className="flex flex-col lg:flex-row">
          {PILLARS.map((p, i) => (
            <motion.div
              key={i}
              className="group relative flex flex-1 flex-col gap-4 border p-6 transition-colors duration-300 md:p-8"
              style={{
                borderColor: color.dustTaupe,
                background: color.lifted,
                marginLeft: i > 0 ? "-1px" : undefined,
                marginTop: i > 0 ? "-1px" : undefined,
                boxShadow: shadow.golden,
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Top accent on hover */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: BLOCK_GRADIENT }}
              />

              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border p-2" style={{ borderColor: color.dustTaupe, color: color.flame }}>
                  {p.icon}
                </div>
                <span className="font-mono text-[10px] tracking-widest" style={{ color: color.slate }}>{p.tag}</span>
              </div>

              <h3 className="whitespace-pre-line text-lg font-semibold leading-snug" style={{ color: color.ink }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: color.slate }}>{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom track bars */}
        <div className="hidden lg:flex h-7 w-full">
          {[124, 259, 124, 191, 191, 124, 88].map((w, i) => (
            <div key={i} className="h-full shrink-0 border-b border-l border-r" style={{ width: `${w}px`, background: color.lifted, borderColor: color.dustTaupe }} />
          ))}
          <div className="h-full min-w-0 flex-1 border-b border-r" style={{ background: color.lifted, borderColor: color.dustTaupe }} />
        </div>

        {/* CTA row */}
        <motion.div
          className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
        >
          <a href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-bold tracking-tight transition-opacity hover:opacity-90"
            style={{ background: color.ink, color: color.canvas, borderRadius: 20 }}>
            Book a discovery call
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/services"
            className="inline-flex items-center border px-6 py-3 font-mono text-sm transition-all hover:bg-black/[0.02]"
            style={{ borderColor: color.dustTaupe, color: color.ink, borderRadius: 20 }}>
            View our services
          </a>
        </motion.div>
      </div>
    </section>
  )
}
