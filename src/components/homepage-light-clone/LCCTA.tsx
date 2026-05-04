"use client"

/**
 * LCCTA — light clone of SoftreeCTASection (optimus variant).
 * Spec conversion-optim point #2: uses flame gradient background for energy.
 */

import { ArrowRight, Zap, Shield, Globe, Phone } from "lucide-react"
import { color, BLOCK_GRADIENT } from "./tokens"

const services = [
  { icon: Zap, label: "Agentic AI", desc: "Autonomous AI agents that act, not just answer." },
  { icon: Shield, label: "Enterprise Apps", desc: "Scalable web & mobile apps built to last." },
  { icon: Globe, label: "Power Platform", desc: "Power BI, Power Apps & SharePoint solutions." },
  { icon: Phone, label: "MVP Development", desc: "Launch in weeks, not months, with confidence." },
]

export function LCCTA() {
  return (
    <section
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color.flame} 0%, ${color.sunshine} 50%, ${color.mistral} 100%)`,
        borderTop: `1px solid ${color.dustTaupe}`,
        color: color.ink,
      }}
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={`h${i}`} className="absolute h-px w-full" style={{ background: color.ink, top: `${i * 5}%` }} />
        ))}
        {[...Array(20)].map((_, i) => (
          <div key={`v${i}`} className="absolute w-px h-full" style={{ background: color.ink, left: `${i * 5}%` }} />
        ))}
      </div>

      <div className="relative max-w-[1400px] mx-auto py-20 px-6 lg:px-12" style={{ borderLeft: `1px solid ${color.ink}1A`, borderRight: `1px solid ${color.ink}1A` }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block font-mono text-[10px] uppercase tracking-[0.4em] px-3 py-1 mb-8"
              style={{ color: color.ink, border: `1px solid ${color.ink}33`, background: `${color.lifted}cc` }}>
              SOFTREE // SYSTEMS ADVISORY
            </span>
            <h2 className="text-5xl lg:text-7xl tracking-tight leading-[0.9] mb-8 font-black" style={{ color: color.ink }}>
              Engineering
              <br />
              the future.
            </h2>
            <p className="text-lg max-w-md leading-relaxed mb-12" style={{ color: color.charcoal }}>
              Deploy production-grade enterprise software with confidence. From Agentic AI to legacy modernization.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="/contact" className="h-14 px-8 rounded-full font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                style={{ background: color.ink, color: color.lifted }}>
                Initiate Project
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/services" className="h-14 px-8 rounded-full font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                style={{ background: color.lifted, color: color.ink, border: `1px solid ${color.ink}33` }}>
                Our capabilities
              </a>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: color.charcoal }}>
                Block <span style={{ background: BLOCK_GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>spectrum</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: `${color.ink}14`, border: `1px solid ${color.ink}1A` }}>
            {services.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="p-8 group transition-colors" style={{ background: color.lifted }}>
                <div className="w-10 h-10 flex items-center justify-center mb-6 transition-colors rounded-sm" style={{ border: `1px solid ${color.ink}33`, color: color.ink }}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: color.ink }}>{label}</h3>
                <p className="text-sm leading-relaxed" style={{ color: color.slate }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-10 overflow-hidden" style={{ borderTop: `1px solid ${color.ink}1A` }}>
          <div className="flex gap-16 whitespace-nowrap opacity-50 pointer-events-none animate-marquee">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-16 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: color.ink }}>
                <span>Status: Deploying Vision -&gt; Execution</span>
                <span>Softree IT &amp; Enterprise Solutions v2025</span>
                <span>Agentic AI Pipeline Active</span>
                <span>Multi-Tenant Architecture Validated</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LCCTA
