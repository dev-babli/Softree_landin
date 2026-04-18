"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MotionGraphicPlaceholder,
  type MotionGraphicVariant,
} from "@/components/ui/motion-graphic-placeholder";

type ThemePreset = "premium" | "enterprise" | "futuristic";

export interface GlassCardItem {
  id: string;
  title: string;
  description: string;
  metric: string;
  tag: string;
  variant: MotionGraphicVariant;
  theme: ThemePreset;
}

export const glassCardItems: GlassCardItem[] = [
  {
    id: "ai-orchestration",
    title: "AI Orchestration",
    description: "Coordinate copilots, prompts, and workflows with trusted controls.",
    metric: "42% faster execution",
    tag: "AI",
    variant: "ai",
    theme: "futuristic",
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence",
    description: "Turn fragmented signals into clear strategic decisions.",
    metric: "99.2% data confidence",
    tag: "Data",
    variant: "data",
    theme: "enterprise",
  },
  {
    id: "cloud-migration",
    title: "Cloud Migration",
    description: "Modernize platforms with resilient, low-risk migration blueprints.",
    metric: "0 critical downtime",
    tag: "Cloud",
    variant: "services",
    theme: "premium",
  },
  {
    id: "automation-workflows",
    title: "Automation Workflows",
    description: "Automate repetitive operations while keeping humans in control.",
    metric: "3.4x process throughput",
    tag: "Automation",
    variant: "automation",
    theme: "enterprise",
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    description: "Protect infrastructure with proactive threat detection layers.",
    metric: "24/7 active defense",
    tag: "Security",
    variant: "security",
    theme: "futuristic",
  },
  {
    id: "product-engineering",
    title: "Product Engineering",
    description: "Ship high-quality digital products with design-led delivery.",
    metric: "90+ production releases",
    tag: "Build",
    variant: "engineering",
    theme: "premium",
  },
  {
    id: "customer-experience",
    title: "Customer Experience",
    description: "Design delightful journeys that improve conversion and retention.",
    metric: "2.1x engagement uplift",
    tag: "CX",
    variant: "experience",
    theme: "premium",
  },
  {
    id: "m365-solutions",
    title: "Microsoft 365 Solutions",
    description: "Enable collaboration at scale with secure M365 architectures.",
    metric: "5 regions connected",
    tag: "M365",
    variant: "m365",
    theme: "enterprise",
  },
  {
    id: "growth-performance",
    title: "Growth Performance",
    description: "Track growth KPIs with continuous optimization loops.",
    metric: "+31% pipeline growth",
    tag: "Growth",
    variant: "growth",
    theme: "futuristic",
  },
  {
    id: "global-delivery",
    title: "Global Delivery",
    description: "Operate globally with local precision and unified governance.",
    metric: "11 countries supported",
    tag: "Global",
    variant: "delivery",
    theme: "enterprise",
  },
];

const themeClasses: Record<ThemePreset, string> = {
  premium:
    "gm-theme-premium border-white/20 bg-[linear-gradient(170deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.03)_100%)]",
  enterprise:
    "gm-theme-enterprise border-cyan-200/20 bg-[linear-gradient(160deg,rgba(148,163,184,0.14)_0%,rgba(15,23,42,0.2)_50%,rgba(30,41,59,0.22)_100%)]",
  futuristic:
    "gm-theme-futuristic border-violet-200/30 bg-[linear-gradient(155deg,rgba(167,139,250,0.14)_0%,rgba(30,41,59,0.2)_45%,rgba(34,211,238,0.1)_100%)]",
};

export function GlassMotionCard({ item }: { item: GlassCardItem }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-4 shadow-[0_24px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:border before:border-white/10 before:[mask:linear-gradient(to_bottom,white,transparent_70%)]",
        themeClasses[item.theme]
      )}
    >
      <div className="relative h-48 overflow-hidden rounded-xl border border-white/10">
        <MotionGraphicPlaceholder variant={item.variant} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/60" />
        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-slate-900/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-100">
          {item.tag}
        </div>
      </div>

      <div className="relative space-y-3 px-1 pb-1 pt-4">
        <h3 className="text-xl font-semibold tracking-tight text-white">{item.title}</h3>
        <p className="text-sm leading-6 text-slate-300">{item.description}</p>
        <div className="flex items-center justify-between pt-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-200">
            <CheckCircle2 className="size-3.5" />
            {item.metric}
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-200 transition group-hover:text-white"
          >
            Explore
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function GlassMotionCardsGrid({ items = glassCardItems }: { items?: GlassCardItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <GlassMotionCard key={item.id} item={item} />
      ))}
    </div>
  );
}
