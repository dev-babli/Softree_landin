"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface TabItem {
  id: number;
  label: string;
  eyebrow: string;
  heading: string;
  description: string;
  bullets: string[];
  video: string;
  cta: { label: string; href: string };
}

const TABS: TabItem[] = [
  {
    id: 1,
    label: "AI",
    eyebrow: "Agentic intelligence",
    heading: "AI that works inside your business",
    description: "We build operational AI systems that read, reason, act, and report inside your actual workflows — not generic chatbot wrappers.",
    bullets: [
      "Domain-trained AI agents connected to enterprise tools",
      "Document processing, classification, extraction, and routing",
      "Human-in-the-loop automation for regulated operations",
    ],
    video: "/whysoftree/animate_this_202605032033.mp4",
    cta: { label: "Explore AI Solutions", href: "/services/ai-intelligence" },
  },
  {
    id: 2,
    label: "WEB & APPS",
    eyebrow: "Product engineering",
    heading: "Modern apps, built for speed and scale",
    description: "From high-converting websites to complex SaaS platforms, we ship polished digital products that feel premium and perform under load.",
    bullets: [
      "Next.js, React, React Native, and cloud-native delivery",
      "Conversion-led interfaces with premium motion systems",
      "CI/CD, observability, performance budgets, and clean handoff",
    ],
    video: "/whysoftree/animate_this_202605032038.mp4",
    cta: { label: "See Web Projects", href: "/services/digital-workspace" },
  },
  {
    id: 3,
    label: "MICROSOFT",
    eyebrow: "Enterprise productivity",
    heading: "Microsoft systems delivered end-to-end",
    description: "We design the connective tissue across Microsoft 365, SharePoint, Teams, Power Platform, and Azure so your teams move faster.",
    bullets: [
      "SharePoint intranets, SPFx webparts, and Teams apps",
      "Power Apps, Power Automate, and Power BI workflows",
      "Azure AD, SSO, RBAC, governance, and secure rollout",
    ],
    video: "/whysoftree/large-thumbnail20250421-2314569-wkr5ab.mp4",
    cta: { label: "Explore Microsoft", href: "/services/business-applications" },
  },
  {
    id: 4,
    label: "DATA",
    eyebrow: "Decision infrastructure",
    heading: "Delivery you can measure",
    description: "We turn scattered business data into trusted dashboards, reliable models, and executive-grade reporting systems.",
    bullets: [
      "Power BI dashboards, Azure Synapse, and data pipelines",
      "Realtime analytics with clean governance and access control",
      "Outcome dashboards tied to operational KPIs",
    ],
    video: "/whysoftree/large-thumbnail20250526-4119631-1hazb8j.mp4",
    cta: { label: "Explore Data Services", href: "/services/data-analytics" },
  },
];

function DecorativeStripe({ i }: { i: number }) {
  const patterns = [
    ["rgba(255,107,0,0.42)", "rgba(255,255,255,0.08)", "rgba(161,196,255,0.22)", "rgba(255,255,255,0.04)", "rgba(255,107,0,0.18)"],
    ["rgba(161,196,255,0.24)", "rgba(255,255,255,0.06)", "rgba(255,107,0,0.34)", "rgba(255,255,255,0.04)", "rgba(161,196,255,0.14)"],
    ["rgba(255,255,255,0.05)", "rgba(255,107,0,0.36)", "rgba(255,255,255,0.06)", "rgba(161,196,255,0.24)", "rgba(255,255,255,0.04)"],
    ["rgba(255,107,0,0.22)", "rgba(161,196,255,0.18)", "rgba(255,255,255,0.06)", "rgba(255,107,0,0.34)", "rgba(255,255,255,0.04)"],
  ];
  const colors = patterns[i] ?? patterns[0];
  return (
    <div className="flex h-[10px] w-full overflow-hidden rounded-b-[28px] border-x border-b border-white/10">
      {colors.map((c, j) => (
        <div key={j} className="h-full flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

interface CardProps {
  tab: TabItem;
  i: number;
  total: number;
  setCardRef: (el: HTMLDivElement | null, i: number) => void;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function StickyCard({ tab, i, total, setCardRef, progress }: CardProps) {
  const targetScale = Math.max(0.85, 1 - (total - i - 1) * 0.04);
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const accent = i % 2 === 0 ? "#FF6B00" : "#A1C4FF";

  return (
    <>
      <div className="pointer-events-none h-0" />
      <div ref={(el) => setCardRef(el, i)} className="lg:sticky" style={{ top: 96, zIndex: i + 1 }}>
        <motion.div style={{ scale }} className="origin-top">
          <div
            className="relative flex flex-col overflow-hidden rounded-t-[28px] border border-white/10 backdrop-blur-xl lg:min-h-[460px] lg:flex-row lg:items-stretch"
            style={{
              background: `radial-gradient(900px circle at 0% 0%, ${accent}22, transparent 46%), radial-gradient(700px circle at 100% 100%, rgba(161,196,255,0.12), transparent 44%), rgba(10,10,12,0.94)`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "46px 46px",
              }}
            />
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-35 blur-[90px]" style={{ background: accent }} />

            <div className="relative h-[300px] w-full overflow-hidden sm:h-[380px] md:h-[440px] lg:h-auto lg:w-[56%] lg:shrink-0 lg:self-stretch xl:w-[620px]">
              <motion.video
                key={tab.video}
                src={tab.video}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                initial={{ opacity: 0, scale: 1.04 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.76)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/40 to-transparent" />
              <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.28em] text-white/80 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                {tab.eyebrow}
              </div>
              <div className="absolute bottom-5 left-5 z-30">
                <a
                  href={tab.cta.href}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 font-mono text-[11px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-all hover:border-white/30 hover:bg-white/15"
                >
                  {tab.cta.label}
                  <svg className="transition-transform group-hover:translate-x-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1.5 6h9M7 2.5l3.5 3.5L7 9.5" stroke={accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="relative flex w-full min-w-0 flex-1 flex-col px-5 py-6 sm:px-7 lg:px-10 lg:py-10">
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-[#0A0A0C]/70 font-mono text-sm font-black backdrop-blur-xl" style={{ color: accent }}>
                      {String(tab.id).padStart(2, "0")}
                    </div>
                    <span className="font-mono text-[10px] font-black uppercase tracking-[0.32em] text-white/40">{tab.label}</span>
                  </div>
                  <h3 className="max-w-[520px] text-[26px] font-black leading-[1.05] tracking-tight text-white sm:text-[32px] lg:text-[38px]">
                    {tab.heading}
                  </h3>
                </div>
                <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-white/35 lg:block">
                  {String(tab.id).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </div>
              </div>

              <p className="mt-5 max-w-[540px] text-[14px] leading-[1.7] text-white/62 sm:text-[15px]">{tab.description}</p>

              <div className="relative mt-7 flex flex-col gap-4 lg:mt-10">
                <div className="absolute bottom-0 left-0 top-0 w-px bg-white/12" />
                {tab.bullets.map((bullet, j) => (
                  <div key={j} className="flex items-start gap-4">
                    <div className="relative z-10 mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_20px_currentColor]" style={{ background: accent, color: accent }} />
                    <p className="text-[13px] leading-[1.45] text-white/76 sm:text-sm">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DecorativeStripe i={i} />
        </motion.div>
      </div>
    </>
  );
}

export function WhySoftreeSection() {
  const [activeTab, setActiveTab] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardsContainerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(Math.floor(latest * TABS.length), TABS.length - 1);
    setActiveTab(idx);
  });

  const setCardRef = useCallback((el: HTMLDivElement | null, i: number) => {
    cardRefs.current[i] = el;
  }, []);

  const handleTabClick = useCallback((i: number) => {
    setActiveTab(i);
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#050505]">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: "radial-gradient(1200px circle at 20% 8%, rgba(255,107,0,0.10), transparent 46%), radial-gradient(900px circle at 88% 70%, rgba(161,196,255,0.07), transparent 48%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-20 pt-20 md:px-8 md:pb-28 md:pt-28">
        <div className="flex flex-col gap-4 py-4 sm:gap-6 sm:py-0">
          <div className="flex items-center gap-3 self-start">
            <div className="h-px w-10 bg-gradient-to-r from-[#FF6B00] to-transparent opacity-70" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em] text-[#FF6B00]">Why Softree</span>
          </div>
          <h2 className="max-w-[760px] text-3xl font-black leading-[1.02] tracking-tight text-white md:text-5xl lg:text-[58px]">
            One partner. <span className="text-white/38">Every technology challenge.</span>
          </h2>
          <p className="mt-1 max-w-[560px] text-[15px] leading-[1.7] text-white/55">
            AI, modern apps, Microsoft 365, and data analytics — delivered as one connected system so your business can move faster.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5 md:mt-16 lg:flex-row lg:gap-10 xl:gap-14">
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex lg:hidden">
            {TABS.map((tab, i) => {
              const active = activeTab === i;
              const accent = i % 2 === 0 ? "#FF6B00" : "#A1C4FF";
              return (
                <button key={tab.id} onClick={() => handleTabClick(i)} type="button" className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all duration-300 ${active ? "border-white/20 bg-white/[0.05]" : "border-white/10 bg-white/[0.02]"}`}>
                  <span className="flex size-[22px] items-center justify-center rounded-md font-mono text-xs font-black" style={{ background: active ? accent : "rgba(255,255,255,0.06)", color: active ? "#050505" : "rgba(255,255,255,0.58)" }}>
                    {String(tab.id).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs font-black uppercase tracking-[0.18em] text-white">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:block lg:w-[250px] lg:shrink-0">
            <div className="lg:sticky" style={{ top: 96 }}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-2 backdrop-blur-xl">
                <div className="relative flex flex-col gap-2">
                  {TABS.map((tab, i) => {
                    const active = activeTab === i;
                    const accent = i % 2 === 0 ? "#FF6B00" : "#A1C4FF";
                    return (
                      <button key={tab.id} onClick={() => handleTabClick(i)} type="button" className={`flex min-w-[160px] shrink-0 items-center gap-[14px] rounded-xl border p-[12px] text-left transition-all duration-300 lg:w-full lg:min-w-0 ${active ? "border-white/18" : "border-transparent hover:border-white/10 hover:bg-white/[0.03]"}`} style={active ? { backgroundImage: `radial-gradient(320px circle at 0% 0%, ${accent}24, transparent 60%), linear-gradient(90deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))` } : undefined}>
                        <span className="flex size-[28px] items-center justify-center rounded-lg p-0.5 font-mono text-sm font-black transition-colors duration-300" style={{ background: active ? accent : "rgba(255,255,255,0.06)", color: active ? "#050505" : "rgba(255,255,255,0.56)" }}>
                          {String(tab.id).padStart(2, "0")}
                        </span>
                        <span className="flex flex-col gap-1">
                          <span className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-white">{tab.label}</span>
                          <span className="text-[11px] text-white/42">{tab.eyebrow}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div ref={cardsContainerRef} className="flex-1 pb-[60vh]">
            {TABS.map((tab, i) => (
              <StickyCard key={tab.id} tab={tab} i={i} total={TABS.length} setCardRef={setCardRef} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhySoftreeSection;
