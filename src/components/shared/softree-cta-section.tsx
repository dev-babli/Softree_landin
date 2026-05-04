"use client";

import { ArrowRight, Zap, Shield, Globe, Phone, Mail, MessageSquare } from "lucide-react";
import type { DesignSystemAppearance } from "@/components/design-system/types";
import { designSystemSurfaceClass } from "@/components/design-system/DesignSystemScope";
import { cn } from "@/lib/utils";

type CTAVariant = "optimus" | "signal" | "brilliance" | "evasion" | "liquid";

interface SoftreeCTASectionProps {
  variant?: CTAVariant;
  /** Semantic surface when the section uses theme tokens (Optimus branch). */
  appearance?: DesignSystemAppearance;
}

const services = [
  { icon: Zap, label: "Agentic AI", desc: "Autonomous AI agents that act, not just answer." },
  { icon: Shield, label: "Enterprise Apps", desc: "Scalable web & mobile apps built to last." },
  { icon: Globe, label: "Power Platform", desc: "Power BI, Power Apps & SharePoint solutions." },
  { icon: Phone, label: "MVP Development", desc: "Launch in weeks, not months, with confidence." },
];

export function SoftreeCTASection({
  variant = "brilliance",
  appearance = "dark",
}: SoftreeCTASectionProps) {
  // --- OPTIMUS (Homepage CTA — gradient-heavy, aligned to page design language) ---
  if (variant === "optimus") {
    return (
      <section className="relative overflow-hidden bg-[#050505] py-24 md:py-32">
        {/* Ambient gradient mesh */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1400px circle at 15% 20%, rgba(255,107,0,0.22), transparent 50%), radial-gradient(1100px circle at 85% 80%, rgba(161,196,255,0.18), transparent 50%), radial-gradient(800px circle at 50% 120%, rgba(255,88,18,0.18), transparent 45%)",
          }}
        />
        {/* Noise grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1280px] px-4 md:px-8">
          {/* Gradient card frame */}
          <div
            className="relative overflow-hidden rounded-[32px] border border-white/10 backdrop-blur-xl"
            style={{
              background:
                "radial-gradient(900px circle at 0% 0%, rgba(255,107,0,0.18), transparent 45%), radial-gradient(900px circle at 100% 100%, rgba(161,196,255,0.14), transparent 45%), linear-gradient(180deg, rgba(18,18,22,0.95), rgba(8,8,10,0.95))",
            }}
          >
            {/* Gradient border glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[32px] opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,107,0,0.3), transparent 30%, transparent 70%, rgba(161,196,255,0.3))",
                padding: 1,
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Corner orbs */}
            <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#FF6B00] opacity-30 blur-[120px]" />
            <div className="pointer-events-none absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-[#A1C4FF] opacity-30 blur-[120px]" />

            <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:p-20">
              {/* Left: headline + CTA */}
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="h-px w-10 bg-gradient-to-r from-[#FF6B00] to-transparent opacity-80" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF6B00]">
                    Build with Softree
                  </span>
                </div>

                <h2
                  className="text-[42px] font-black leading-[0.95] tracking-tight text-white md:text-[64px] lg:text-[76px]"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Let&apos;s engineer
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(120deg, #FF6B00 0%, #FF5812 40%, #A1C4FF 100%)",
                    }}
                  >
                    the next chapter.
                  </span>
                </h2>

                <p className="max-w-[480px] text-base leading-relaxed text-white/65 md:text-lg">
                  Deploy production-grade software with a partner who ships. From agentic AI
                  to legacy modernization — scoped, scaled, and delivered.
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="/contact"
                    className="group/btn relative inline-flex h-14 items-center gap-2.5 overflow-hidden rounded-full px-8 text-sm font-black uppercase tracking-[0.15em] text-white shadow-[0_20px_50px_-10px_rgba(255,107,0,0.55)] transition-transform hover:scale-[1.02]"
                    style={{
                      background:
                        "linear-gradient(120deg, #FF6B00 0%, #FF4500 60%, #FF5812 100%)",
                    }}
                  >
                    <span className="relative z-10">Initiate Project</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100"
                      style={{
                        background:
                          "linear-gradient(120deg, #FF5812 0%, #FF6B00 100%)",
                      }}
                    />
                  </a>
                  <a
                    href="/showcase"
                    className="inline-flex h-14 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 text-sm font-bold text-white backdrop-blur-xl transition-colors hover:border-white/30 hover:bg-white/[0.08]"
                  >
                    <MessageSquare className="h-4 w-4 text-[#A1C4FF]" />
                    See our work
                  </a>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-5 text-xs text-white/50">
                  <span className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-[#FF6B00]" />
                    hello@softree.tech
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-[#A1C4FF]" />
                    Response under 4h
                  </span>
                </div>
              </div>

              {/* Right: service grid */}
              <div className="grid grid-cols-2 gap-3">
                {services.map(({ icon: Icon, label, desc }, i) => {
                  const isOrange = i % 2 === 0
                  const hex = isOrange ? "#FF6B00" : "#A1C4FF"
                  return (
                    <div
                      key={label}
                      className="group relative flex flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-white/10 p-5 backdrop-blur-xl transition-all hover:border-white/25"
                      style={{
                        background: `radial-gradient(400px circle at 0% 0%, ${hex}1f, transparent 60%), rgba(10,10,12,0.6)`,
                      }}
                    >
                      <div
                        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                        style={{ background: hex }}
                      />
                      <div className="relative flex flex-col gap-4">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0A0A0C]/60 backdrop-blur-xl"
                          style={{ color: hex }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <h3
                          className="text-sm font-black uppercase tracking-[0.12em] text-white"
                          style={{ fontFamily: "Outfit, sans-serif" }}
                        >
                          {label}
                        </h3>
                      </div>
                      <p className="relative text-[12.5px] leading-relaxed text-white/55">
                        {desc}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom marquee */}
            <div className="relative border-t border-white/10 px-8 py-5">
              <div className="flex animate-marquee items-center gap-12 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-12">
                    <span>Softree / Systems Advisory v2026</span>
                    <span className="text-[#FF6B00]">●</span>
                    <span>Agentic AI pipeline active</span>
                    <span className="text-[#A1C4FF]">●</span>
                    <span>Multi-tenant architecture validated</span>
                    <span className="text-[#FF6B00]">●</span>
                    <span>Status: deploying vision → execution</span>
                    <span className="text-[#A1C4FF]">●</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* hide unused props warning for appearance */}
        <span className="hidden">{designSystemSurfaceClass(appearance)}</span>
      </section>
    );
  }

  // --- SIGNAL (Brutalist Monochrome) ---
  if (variant === "signal") {
    return (
      <section className="relative py-40 px-6 bg-black text-white overflow-hidden selection:bg-white selection:text-black">
        {/* Grainy Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grain-y.com/grain.png')]" />

        <div className="max-w-7xl mx-auto border-t-2 border-white pt-24">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            <div className="lg:w-2/3">
              <h2 className="text-[clamp(4rem,15vw,12rem)] font-bold leading-[0.85] tracking-tighter uppercase mb-12 italic">
                WORK
                <br />
                WITH
                <br />
                US.
              </h2>
            </div>
            <div className="lg:w-1/3 pt-10">
              <p className="text-xl font-mono leading-relaxed mb-16 text-zinc-400">
                WE BUILD ENTERPRISE-GRADE AI & PLATFORM SERVICES FOR TEAMS WHO SHIP.
              </p>
              <div className="space-y-4">
                <a href="/contact" className="block w-full border-2 border-white text-center py-6 text-2xl font-bold uppercase hover:bg-white hover:text-black transition-all">
                  PROJECT START →
                </a>
                <a href="/services" className="block w-full text-center py-6 text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
                  OUR CAPABILITIES
                </a>
              </div>
            </div>
          </div>

          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 border-t border-zinc-800">
            {services.map((s, i) => (
              <div key={s.label} className={cn("p-10 border-zinc-800", i > 0 && "border-l")}>
                <h3 className="font-mono text-xs uppercase tracking-widest mb-4 opacity-50">[{i + 1}] {s.label}</h3>
                <p className="text-sm font-mono lowercase opacity-80">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // --- BRILLIANCE (Clean SaaS / Linear-ish) ---
  if (variant === "brilliance") {
    return (
      <section className="relative py-32 px-6 wf-surface overflow-hidden border-t wf-border">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-from)_0%,_transparent_50%)] from-indigo-50/50 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#146ef5] text-xs font-semibold mb-8 border border-blue-100">
            <Zap className="w-3 h-3" />
            Launch phase v2.0
          </div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight wf-text-primary mb-8 max-w-3xl mx-auto">
            Ready to bring your software to life?
          </h2>
          <p className="text-lg wf-text-muted mb-12 max-w-xl mx-auto leading-relaxed">
            Join the forward-thinking enterprises building with Softree. High performance, zero tech debt, scale-ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
            <a href="/contact" className="h-14 px-8 bg-[#146ef5] text-white rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-[#0055d4] wf-shadow wf-btn-motion">
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="/showcase" className="h-14 px-8 bg-white text-[#080808] border wf-border rounded-lg font-semibold inline-flex items-center gap-2 hover:bg-zinc-50 wf-btn-motion">
              View Showcase
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.label} className="text-left p-8 wf-radius border wf-border bg-zinc-50/50 hover:border-blue-200 transition-all">
                <s.icon className="w-6 h-6 text-[#146ef5] mb-4" />
                <h4 className="font-semibold wf-text-primary mb-2">{s.label}</h4>
                <p className="text-sm wf-text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // --- EVASION (Premium Product / Luxury) ---
  if (variant === "evasion") {
    return (
      <section className="relative py-40 px-6 bg-[#0a0a09] text-white">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-amber-900/20 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/2">
              <span className="font-serif italic text-amber-500 text-2xl mb-6 block tracking-tight">The Softree Advantage</span>
              <h2 className="text-5xl md:text-7xl font-display tracking-tight leading-[0.95] mb-8">
                Refined software for the elite enterprise.
              </h2>
              <p className="text-xl text-zinc-400 mb-12 leading-relaxed font-light">
                We believe in the intersection of high-tier engineering and sophisticated design. Launch with a partner that understands excellence.
              </p>
              <a href="/contact" className="inline-flex items-center gap-4 group">
                <span className="h-16 w-16 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowRight className="w-6 h-6" />
                </span>
                <span className="text-xl font-medium tracking-wide">Tell us about your mission</span>
              </a>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 gap-12">
              {services.slice(0, 3).map((s) => (
                <div key={s.label} className="border-b border-zinc-800 pb-12">
                  <div className="flex items-start gap-8">
                    <span className="text-amber-500/40 font-mono text-xs pt-1">0{services.indexOf(s) + 1}</span>
                    <div>
                      <h3 className="text-2xl font-medium mb-3">{s.label}</h3>
                      <p className="text-zinc-500 leading-relaxed font-light">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- LIQUID (Agency / Motion Dark) ---
  if (variant === "liquid") {
    return (
      <section className="relative py-32 px-6 bg-[#030303] text-white overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-x-0 bottom-0 top-1/2 pointer-events-none overflow-hidden h-[500px]">
          <div className="absolute -bottom-24 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute -bottom-24 right-1/4 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center pt-20 pb-32">
          <div className="liquid-glass-pill inline-flex items-center gap-2 px-4 py-1.5 mb-10 mx-auto bg-emerald-500/10 border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-[0.2em] font-semibold">
            Partner with Softree
          </div>
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.85] bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Let&apos;s create
            <br />
            the next big thing.
          </h2>
          <p className="text-xl text-zinc-500 mb-16 max-w-2xl mx-auto leading-relaxed">
            Motion, design, and top-tier code. We help modern brands launch digital products that define categories.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="/contact" className="liquid-glass h-16 md:h-20 px-10 md:px-16 flex items-center justify-center font-bold text-lg md:text-xl hover:scale-105 transition-transform">
              Start Your Journey
              <ArrowRight className="ml-3 w-5 h-5" />
            </a>
            <div className="flex items-center gap-4 px-8 text-zinc-400 font-mono text-xs uppercase tracking-widest border border-white/5 rounded-2xl bg-white/[0.02]">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              Average Response &lt; 4 Hours
            </div>
          </div>
        </div>

        {/* Feature Grid - Liquid Style */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden mb-20 shadow-2xl">
          {services.map(s => (
            <div key={s.label} className="p-10 bg-black/40 backdrop-blur-3xl hover:bg-white/[0.03] transition-colors">
              <s.icon className="w-8 h-8 text-emerald-400 mb-6" />
              <h4 className="font-bold text-lg mb-3">{s.label}</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return null; // Fallback
}

export default SoftreeCTASection;
