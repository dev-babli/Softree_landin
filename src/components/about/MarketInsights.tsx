"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BarChart3, ChartColumnBig, Sparkles } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { cn } from "@/lib/utils";

type InsightTab = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  dashboardTitle: string;
  image: string;
  accent: string;
  icon: typeof Sparkles;
};

const tabs: InsightTab[] = [
  {
    id: "guidance",
    kicker: "Expert guidance",
    title: "Expert guidance for traders",
    description:
      "Our support team assists with dashboard setup, AI alerts, and portfolio strategy calibration with real human expertise.",
    dashboardTitle: "Lesson Hour Tracking",
    image:
      "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b36fc5fae44707de1e26d3_Frame%202147226620.png",
    accent: "from-cyan-400/30 via-sky-400/16 to-transparent",
    icon: Sparkles,
  },
  {
    id: "data",
    kicker: "Real-time data",
    title: "Real-time data you can trust",
    description:
      "Receive live market visibility, rapid trend detection, and portfolio monitoring that stays responsive under volatility.",
    dashboardTitle: "Global Market Routes",
    image:
      "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b36fc5fae44707de1e26ce_Group.png",
    accent: "from-blue-400/28 via-indigo-400/16 to-transparent",
    icon: ChartColumnBig,
  },
  {
    id: "management",
    kicker: "Smarter management",
    title: "Smarter management, clearer decisions",
    description:
      "Turn signals into action with cleaner prioritization, sharper scenario modelling, and focused execution views.",
    dashboardTitle: "Decision Intelligence Board",
    image:
      "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b36fc5fae44707de1e26d5_Frame%2048095561.png",
    accent: "from-fuchsia-400/24 via-cyan-400/16 to-transparent",
    icon: BarChart3,
  },
];

const panelMotion = {
  initial: { opacity: 0, y: 18, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -18, scale: 0.985 },
};

export default function MarketInsights() {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section className="relative overflow-hidden bg-[#050816] px-6 py-24 text-white sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.12),transparent_28%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/70 backdrop-blur">
            Market Insights
          </div>
          <AnimatedText
            as="h2"
            text="Real-Time Analysis for Modern Traders"
            mode="chars"
            className="text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
          />
          <AnimatedText
            as="p"
            text="Get instant signals, trend updates, and decision-ready insights through a polished AI interface designed to feel alive."
            delay={0.2}
            className="mx-auto mt-6 max-w-2xl text-balance text-base leading-8 text-white/58 sm:text-lg"
          />
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.25fr]">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -24 }}
            whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const activeState = tab.id === active.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "group relative w-full overflow-hidden rounded-[26px] border px-6 py-6 text-left transition-colors duration-300",
                    activeState
                      ? "border-sky-300/25 bg-white/[0.06] shadow-[0_24px_80px_rgba(2,132,199,0.16)]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/16 hover:bg-white/[0.04]",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-500",
                      tab.accent,
                      activeState && "opacity-100",
                    )}
                  />
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-sky-200">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-xs uppercase tracking-[0.24em] text-white/42">
                            {tab.kicker}
                          </div>
                          <div className="mt-1 text-xl font-semibold tracking-[-0.03em] text-white">
                            {tab.title}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight
                        className={cn(
                          "h-5 w-5 shrink-0 transition-transform duration-300",
                          activeState ? "translate-x-0 text-white" : "translate-x-[-4px] text-white/30 group-hover:translate-x-0",
                        )}
                      />
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        height: activeState ? "auto" : 0,
                        opacity: activeState ? 1 : 0,
                      }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[54ch] pt-1 text-sm leading-7 text-white/58">
                        {tab.description}
                      </p>
                    </motion.div>
                  </div>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 24 }}
            whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[560px] overflow-hidden rounded-[32px] border border-white/10 bg-[#0a1120] p-5 shadow-[0_30px_120px_rgba(2,6,23,0.52)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reducedMotion ? false : panelMotion.initial}
                animate={reducedMotion ? {} : panelMotion.animate}
                exit={reducedMotion ? {} : panelMotion.exit}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full"
              >
                <div className="absolute left-5 top-5 z-10 w-[calc(100%-2.5rem)] rounded-[26px] border border-white/10 bg-black/25 px-5 py-4 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.22em] text-white/45">
                        Dashboard
                      </div>
                      <div className="mt-2 text-lg font-medium text-white">{active.dashboardTitle}</div>
                    </div>
                    <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                      Live signal
                    </div>
                  </div>
                </div>

                <div className="relative flex h-full min-h-[520px] items-end overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,#0e1728,#080d18)] pt-24">
                  <div className={cn("absolute inset-0 bg-gradient-to-br", active.accent)} />

                  <motion.div
                    initial={reducedMotion ? false : { x: active.id === "management" ? 80 : -80, rotate: active.id === "management" ? 10 : -10 }}
                    animate={reducedMotion ? {} : { x: 0, rotate: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                    className="absolute inset-x-10 bottom-8 top-28"
                  >
                    <Image
                      src={active.image}
                      alt={active.title}
                      fill
                      className={cn(
                        "object-contain drop-shadow-[0_40px_90px_rgba(8,15,30,0.72)]",
                        active.id === "data" && "object-cover opacity-90",
                      )}
                    />
                  </motion.div>

                  <div className="pointer-events-none absolute inset-x-10 bottom-6 z-10 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-white/10 bg-black/30 p-4 backdrop-blur-md">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/42">Response time</div>
                      <div className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">24ms</div>
                      <div className="mt-2 text-sm text-white/55">Optimized for fast-moving market events.</div>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-black/30 p-4 backdrop-blur-md">
                      <div className="text-[11px] uppercase tracking-[0.22em] text-white/42">Confidence window</div>
                      <div className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">94%</div>
                      <div className="mt-2 text-sm text-white/55">Adaptive scoring layered over live analysis.</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
