"use client"

import React from 'react';
import { cn } from "@/lib/utils";
import { Brain, Code2, Globe, Zap, Database, Server, Shield, ArrowRight, Layers, Cpu, Activity, Cloud, Terminal, Sparkles, Bot, Lock, Star } from 'lucide-react';
import { FaMicrosoft } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const RippleGrid = dynamic(() => import('@/components/ui/RippleGrid'), { ssr: false });

/**
 * BentoShowcase v1.0 — Linear-Grade Cinematic Bento Grid
 * Pure CSS animations. Primary + Secondary hover state transitions.
 * Each card: cinematic atmospheric glow, real product UI mockup, layered depth.
 * Strict 60fps: only transform, opacity, filter animated. Zero layout triggers.
 */

/* ─── CSS Keyframes ─── */
const Styles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes smoothFlow { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
    .bento-flow { animation: smoothFlow 1.5s linear infinite; }
    @keyframes bentoBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    .bento-blink { animation: bentoBlink 1s step-end infinite; }
    @keyframes bentoFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    .bento-float { animation: bentoFloat 5s ease-in-out infinite; }
    @keyframes bentoBeam { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }
    .bento-beam { animation: bentoBeam 3s cubic-bezier(0.25,1,0.5,1) infinite; }
    @keyframes bentoShimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
    .bento-shimmer { animation: bentoShimmer 3s linear infinite; }
  `}} />
);

/* ─── Reusable Card Shell ─── */
const Card = ({ title, description, background, primaryForeground, secondaryForeground, className }) => (
  <div className={cn(
    "group relative flex flex-col rounded-[12px] md:rounded-[16px] overflow-hidden bg-[#0a0a0c] border border-white/[0.04]",
    "shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_25px_50px_rgba(0,0,0,0.5)] cursor-default",
    className
  )}>
    {/* Grain */}
    <div className="absolute inset-0 z-[1] mix-blend-overlay opacity-[0.07] pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}} />
    {/* Background */}
    <div className="absolute inset-0 z-0 overflow-hidden">{background}</div>
    {/* Foreground swap */}
    <div className="absolute inset-x-0 top-0 bottom-[90px] md:bottom-[100px] z-10 pointer-events-none">
      <div className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-[8%] group-hover:scale-[0.96] group-hover:opacity-0 group-hover:blur-sm">
        <div className="relative w-full h-full">{primaryForeground}</div>
      </div>
      {secondaryForeground && (
        <div className="absolute inset-0 scale-[1.04] translate-y-[8%] opacity-0 blur-md transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none">
          <div className="relative w-full h-full">{secondaryForeground}</div>
        </div>
      )}
    </div>
    {/* Bottom text */}
    <div className="relative z-20 mt-auto p-5 md:p-7 flex items-end">
      <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent pointer-events-none" />
      <p className="relative z-20 text-[13.5px] md:text-[15px] leading-relaxed text-zinc-500 max-w-[95%] tracking-wide">
        <strong className="text-white font-medium mr-1.5">{title}.</strong>
        {description}
      </p>
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   CARD 1: FRONTEND ENGINEERING
   Warm amber glow — code editor + browser preview
   ═══════════════════════════════════════════════════════════════ */

const FrontendBg = () => (
  <>
    <div className="absolute inset-0 bg-[#050508]" />
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <RippleGrid gridColor="#38bdf8" rippleIntensity={0.03} gridSize={14} gridThickness={20} mouseInteraction={false} opacity={0.3} glowIntensity={0.05} vignetteStrength={3} />
    </div>
    <div className="absolute top-[-35%] left-[25%] w-[200px] h-[500px] bg-amber-500/30 blur-[80px] rotate-[25deg] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-sky-500/25 group-hover:rotate-[-20deg] group-hover:translate-x-16 scale-y-125" />
    <div className="absolute top-[-15%] left-[35%] w-[100px] h-[400px] bg-orange-400/20 blur-[60px] rotate-[25deg] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-indigo-400/20 group-hover:rotate-[-20deg] group-hover:-translate-x-8 scale-y-150" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_top,white_20%,transparent_65%)]" />
  </>
);

const FrontendMain = () => (
  <>
    {/* Code Editor */}
    <div className="absolute top-[8%] left-[5%] w-[56%] h-[75%] bg-[#1a1b2e]/90 backdrop-blur-xl rounded-[10px] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden z-20 transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-rotate-1 group-hover:-translate-y-1">
      <div className="h-8 bg-[#21232a] border-b border-black/50 flex items-center px-3 gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="text-[9px] text-white/25 font-mono ml-3 tracking-wider">GlassCard.tsx</span>
        <div className="ml-auto flex items-center gap-1"><Code2 size={9} className="text-sky-400/40" /><span className="text-[7px] text-sky-400/30 font-mono">TSX</span></div>
      </div>
      <div className="p-4 font-mono text-[9.5px] md:text-[10.5px] text-white/65 flex flex-col gap-[3px] leading-[1.7]">
        <div><span className="text-pink-400">import</span> {'{'} motion {'}'} <span className="text-pink-400">from</span> <span className="text-emerald-300">&apos;framer-motion&apos;</span>;</div>
        <div><span className="text-pink-400">import</span> {'{'} cn {'}'} <span className="text-pink-400">from</span> <span className="text-emerald-300">&apos;@/lib/utils&apos;</span>;</div>
        <div className="h-1.5" />
        <div><span className="text-blue-400 font-semibold">export default function</span> <span className="text-yellow-200">Hero</span>() {'{'}</div>
        <div className="pl-4"><span className="text-pink-400">const</span> <span className="text-sky-300">spring</span> = <span className="text-yellow-200">useSpring</span>({'{'}</div>
        <div className="pl-8"><span className="text-orange-300">stiffness</span>: <span className="text-purple-300">400</span>,</div>
        <div className="pl-8"><span className="text-orange-300">damping</span>: <span className="text-purple-300">30</span>,</div>
        <div className="pl-4">{'}'});</div>
        <div className="h-1" />
        <div className="pl-4"><span className="text-pink-400">return</span> (</div>
        <div className="pl-8"><span className="text-zinc-500">&lt;</span><span className="text-blue-300">motion.div</span></div>
        <div className="pl-12"><span className="text-sky-300">animate</span>=<span className="text-blue-400">{'{'}</span><span className="text-white/80">spring</span><span className="text-blue-400">{'}'}</span></div>
        <div className="pl-12"><span className="text-sky-300">className</span>=<span className="text-emerald-300">&quot;glass-card&quot;</span></div>
        <div className="pl-8"><span className="text-zinc-500">&gt;</span><span className="inline-block w-1.5 h-3 bg-sky-400/80 ml-0.5 translate-y-0.5 bento-blink shadow-[0_0_6px_rgba(56,189,248,0.6)]" /></div>
      </div>
      <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-25deg] pointer-events-none" />
    </div>

    {/* Browser Preview */}
    <div className="absolute top-[16%] right-[5%] w-[42%] h-[62%] bg-[#0d0e1a]/90 backdrop-blur-xl rounded-[10px] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden z-30 transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-1 group-hover:translate-y-1">
      <div className="h-7 bg-white/[0.02] border-b border-white/[0.05] flex items-center px-3 gap-1.5">
        <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-white/10" /><div className="w-1.5 h-1.5 rounded-full bg-white/10" /><div className="w-1.5 h-1.5 rounded-full bg-white/10" /></div>
        <div className="ml-2 flex-1 h-4 rounded bg-white/[0.04] border border-white/[0.04] flex items-center px-2">
          <Globe size={7} className="text-white/15 mr-1" /><span className="text-[7px] font-mono text-white/20">localhost:3000</span>
        </div>
      </div>
      <div className="p-4 flex items-center justify-center h-[calc(100%-28px)]">
        <div className="w-[85%] h-[75%] rounded-xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.4)] p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-md bg-gradient-to-br from-sky-400/30 to-indigo-500/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]" /><div className="flex flex-col gap-0.5"><div className="w-12 h-1.5 rounded bg-white/15" /><div className="w-8 h-1 rounded bg-white/8" /></div></div>
          <div className="flex-1 rounded-lg bg-white/[0.02] border border-white/[0.04] overflow-hidden relative"><div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-indigo-500/5 to-emerald-500/5" /></div>
          <div className="flex gap-1.5"><div className="w-10 h-4 rounded bg-sky-500/15 border border-sky-500/15" /><div className="w-6 h-4 rounded bg-white/[0.03] border border-white/[0.04]" /></div>
        </div>
      </div>
    </div>

    {[{ label: 'React 19', x: '8%', y: '88%' }, { label: '60fps', x: '72%', y: '85%' }].map((p, i) => (
      <div key={i} className="absolute bento-float px-2 py-1 rounded-full bg-sky-500/8 border border-sky-500/10 backdrop-blur-sm z-10" style={{ left: p.x, top: p.y, animationDelay: `${i * 0.8}s` }}>
        <span className="text-[7px] font-mono text-sky-400/50 tracking-wider">{p.label}</span>
      </div>
    ))}
  </>
);

const FrontendHover = () => (
  <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[80%] bg-[#111116]/95 backdrop-blur-xl border border-white/[0.08] rounded-[14px] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_40px_80px_rgba(0,0,0,0.9)] flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-6 group-hover:translate-y-0">
    <div className="absolute top-0 left-0 w-full h-[50px] bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none rounded-t-[14px]" />
    <div className="flex justify-between items-center border-b border-white/8 pb-3">
      <span className="text-white/90 text-sm font-bold tracking-tight">Component Library</span>
      <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400/70" /><div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" /></div>
    </div>
    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-[250ms] translate-y-3 group-hover:translate-y-0">
      <div className="flex-1 bg-white/5 rounded-lg h-10 border border-white/8 flex items-center justify-center text-xs text-white/50 font-medium">Ghost</div>
      <div className="flex-1 bg-sky-500 rounded-lg h-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_20px_rgba(56,189,248,0.3)] flex items-center justify-center text-xs text-white font-bold tracking-wide relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" /><span className="relative z-10">Primary</span>
      </div>
      <div className="flex-1 bg-white/[0.02] rounded-lg h-10 border border-dashed border-white/10 flex items-center justify-center text-xs text-white/30">Outline</div>
    </div>
    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-[400ms] translate-y-3 group-hover:translate-y-0">
      {[1,2,3,4,5].map(i => <div key={i} className="flex-1 h-2 rounded-full" style={{ background: `rgba(56,189,248,${0.15 + i * 0.12})` }} />)}
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   CARD 2: INTELLIGENT SYSTEMS
   Dramatic radial orange glow — AI brain + orbital rings
   ═══════════════════════════════════════════════════════════════ */

const AIBg = () => (
  <>
    <div className="absolute inset-0 bg-[#050508]" />
    <div className="absolute inset-0 opacity-15 pointer-events-none">
      <RippleGrid gridColor="#f97316" rippleIntensity={0.04} gridSize={8} gridThickness={22} mouseInteraction={false} opacity={0.3} glowIntensity={0.08} vignetteStrength={3} />
    </div>
    <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-orange-600/25 blur-[80px] rounded-full pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-violet-600/25 group-hover:scale-[1.3]" />
    <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-amber-400/15 blur-[60px] rounded-full pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-fuchsia-400/15" />
  </>
);

const AIMain = () => (
  <>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full border border-dashed border-orange-500/15 animate-[spin_25s_linear_infinite]">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-orange-400/60 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
      </div>
      <div className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full border border-orange-500/20 animate-[spin_15s_linear_infinite_reverse]">
        <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
      </div>
      <div className="absolute w-20 h-20 rounded-full border border-orange-400/25 animate-pulse" />
      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-600/10 border border-orange-500/25 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)]">
        <Brain className="text-orange-300 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" size={28} />
      </div>
    </div>
    {[{ t: 'context_128k', x: '8%', y: '20%', d: '0s' }, { t: 'rag_pipeline', x: '68%', y: '15%', d: '0.5s' }, { t: 'embedding', x: '12%', y: '72%', d: '1s' }, { t: 'inference', x: '72%', y: '75%', d: '1.5s' }].map((f, i) => (
      <div key={i} className="absolute bento-float opacity-40" style={{ left: f.x, top: f.y, animationDelay: f.d }}>
        <span className="text-[7px] font-mono text-orange-500/40 tracking-wider">{f.t}</span>
      </div>
    ))}
  </>
);

const AIHover = () => (
  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[85%] bg-[#0f1015]/95 backdrop-blur-xl border border-white/[0.08] rounded-[12px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-6 group-hover:translate-y-0">
    <div className="px-4 py-3 border-b border-white/[0.05] flex items-center gap-2">
      <Bot size={14} className="text-orange-400" /><span className="text-[10px] text-white/50 font-mono tracking-wider">AI AGENT</span>
      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
    </div>
    <div className="p-4 flex flex-col gap-3">
      <div className="self-end max-w-[80%] px-3 py-2 rounded-xl rounded-br-sm bg-white/[0.06] border border-white/[0.06] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-[250ms] translate-y-2 group-hover:translate-y-0">
        <span className="text-[10px] text-white/60 leading-relaxed">Analyze Q4 performance data</span>
      </div>
      <div className="self-start max-w-[85%] px-3 py-2.5 rounded-xl rounded-bl-sm bg-orange-500/[0.08] border border-orange-500/15 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-[400ms] translate-y-2 group-hover:translate-y-0">
        <span className="text-[10px] text-orange-200/70 leading-relaxed">Revenue increased 34% QoQ. Customer retention improved to 94.2%.</span>
      </div>
      <div className="self-start flex gap-1 px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-[550ms]">
        <div className="w-1 h-1 rounded-full bg-orange-400/50 animate-pulse" />
        <div className="w-1 h-1 rounded-full bg-orange-400/50 animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-1 h-1 rounded-full bg-orange-400/50 animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   CARD 3: CLOUD & DATA
   Blue atmospheric — glass terminal + floating metrics
   ═══════════════════════════════════════════════════════════════ */

const CloudBg = () => (
  <>
    <div className="absolute inset-0 bg-[#06060a]" />
    <div className="absolute inset-0 opacity-15 pointer-events-none">
      <RippleGrid gridColor="#06b6d4" rippleIntensity={0.025} gridSize={14} gridThickness={22} mouseInteraction={false} opacity={0.35} glowIntensity={0.04} vignetteStrength={2.5} />
    </div>
    <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
    <div className="absolute bottom-[-10%] right-[5%] w-[400px] h-[350px] bg-cyan-600/15 blur-[100px] rounded-full pointer-events-none transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-emerald-600/15 group-hover:scale-110" />
    <div className="absolute top-[5%] left-[15%] w-[300px] h-[300px] bg-indigo-500/10 blur-[90px] rounded-full pointer-events-none transition-all duration-[1000ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-teal-500/10" />
  </>
);

const bars = [
  { r: 'us-east-1', pct: 82, c: 'from-cyan-400 to-teal-500' },
  { r: 'eu-west-2', pct: 67, c: 'from-violet-400 to-indigo-500' },
  { r: 'ap-south-1', pct: 91, c: 'from-emerald-400 to-cyan-500' },
  { r: 'us-west-2', pct: 54, c: 'from-amber-400 to-orange-500' },
];

const CloudMain = () => (
  <>
    <div className="absolute top-[6%] left-[4%] w-[62%] h-[80%] bg-[#0c0d14]/90 backdrop-blur-xl rounded-[10px] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_25px_50px_rgba(0,0,0,0.7)] overflow-hidden z-20">
      <div className="h-7 border-b border-white/[0.04] flex items-center px-3 gap-1.5">
        <div className="w-2 h-2 rounded-full bg-emerald-500/70" /><div className="w-2 h-2 rounded-full bg-white/10" /><div className="w-2 h-2 rounded-full bg-white/10" />
        <span className="text-[7px] text-white/20 font-mono ml-2 tracking-wider">cluster-dashboard</span>
        <div className="ml-auto flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(16,185,129,0.6)] animate-pulse" /><span className="text-[6px] text-emerald-400/50 font-mono tracking-wider">LIVE</span></div>
      </div>
      <div className="p-3.5 md:p-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between mb-0.5"><span className="text-[7px] font-mono text-white/25 uppercase tracking-[0.2em]">Regional Throughput</span><span className="text-[7px] font-mono text-cyan-400/30">req/s</span></div>
        {bars.map((b, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="text-[6.5px] font-mono text-white/20 w-12 shrink-0 tracking-wider">{b.r}</span>
            <div className="flex-1 h-2.5 rounded-full bg-white/[0.03] overflow-hidden relative">
              <div className={`h-full rounded-full bg-gradient-to-r ${b.c}`} style={{ width: `${b.pct}%` }} />
              <div className="absolute inset-0 w-1/4 bento-shimmer bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" style={{ animationDelay: `${i * 0.5 + 2}s` }} />
            </div>
            <span className="text-[7px] font-mono text-white/30 w-6 text-right tabular-nums">{b.pct}k</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-3.5 py-2 border-t border-white/[0.03] flex items-center gap-4 bg-white/[0.01]">
        {['AWS', 'Azure', 'GCP'].map((c, i) => <div key={i} className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-emerald-400/50" /><span className="text-[6px] font-mono text-white/15 tracking-wider">{c}</span></div>)}
      </div>
    </div>
    <div className="absolute top-[14%] right-[5%] w-[30%] flex flex-col gap-3 z-30">
      {[{ l: 'Uptime', v: '99.99%', a: 'text-cyan-400' }, { l: 'P99', v: '< 8ms', a: 'text-emerald-400' }, { l: 'RPS', v: '48.2k', a: 'text-amber-400' }].map((c, i) => (
        <div key={i} className="px-3.5 py-3 rounded-xl border border-white/[0.06] bg-[#0c0d14]/80 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_15px_30px_rgba(0,0,0,0.5)] bento-float" style={{ animationDelay: `${i * 0.6}s` }}>
          <span className="text-[6.5px] font-mono text-white/20 tracking-[0.15em] uppercase block mb-1">{c.l}</span>
          <span className={`text-[14px] font-mono font-bold tracking-tight ${c.a}`}>{c.v}</span>
        </div>
      ))}
    </div>
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
      {[{ y: 25, c: 'rgba(6,182,212,0.25)', d: '0s' }, { y: 42, c: 'rgba(16,185,129,0.25)', d: '0.5s' }, { y: 58, c: 'rgba(245,158,11,0.25)', d: '1s' }].map((l, i) => (
        <path key={i} className="bento-flow" d={`M 62 ${l.y} C 70 ${l.y}, 68 ${l.y - 5}, 72 ${l.y - 5}`} stroke={l.c} fill="none" strokeWidth="1.2" vectorEffect="non-scaling-stroke" strokeDasharray="4 4" style={{ animationDelay: l.d }} />
      ))}
    </svg>
  </>
);

const CloudHover = () => (
  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[85%] bg-[#0c0d14]/95 backdrop-blur-xl border border-white/[0.08] rounded-[14px] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_40px_80px_rgba(0,0,0,0.9)] flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-6 group-hover:translate-y-0">
    <div className="w-14 h-14 rounded-[12px] bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(6,182,212,0.15)]"><Layers size={24} className="text-cyan-400" /></div>
    <span className="text-white font-bold text-sm mb-1 tracking-tight">Multi-Cloud Orchestrator</span>
    <span className="text-cyan-400 text-[8px] uppercase tracking-[0.25em] font-bold mb-5 border border-cyan-500/25 px-2.5 py-0.5 rounded-full bg-cyan-500/8">Distributed</span>
    <div className="w-full flex justify-between gap-3">
      {[{ l: 'Nodes', v: '2,847', c: 'text-cyan-400' }, { l: 'Regions', v: '14', c: 'text-emerald-400' }].map((m, i) => (
        <div key={i} className="flex-1 flex flex-col items-center p-3 bg-black/50 border border-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-3 group-hover:translate-y-0" style={{ transitionDelay: `${300 + i * 150}ms` }}>
          <span className="text-white/30 text-[8px] tracking-widest mb-1 uppercase">{m.l}</span>
          <span className={`font-mono text-xl font-semibold ${m.c}`}>{m.v}</span>
        </div>
      ))}
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   CARD 4: UNIFIED PARTNERS
   Purple/violet glow — stacked testimonials + trust score
   ═══════════════════════════════════════════════════════════════ */

const PartnersBg = () => (
  <>
    <div className="absolute inset-0 bg-[#050508]" />
    <div className="absolute inset-0 opacity-12 pointer-events-none">
      <RippleGrid gridColor="#a78bfa" rippleIntensity={0.025} gridSize={10} gridThickness={22} mouseInteraction={false} opacity={0.25} glowIntensity={0.04} vignetteStrength={3} />
    </div>
    <div className="absolute top-[-20%] left-[20%] w-[180px] h-[500px] bg-violet-500/20 blur-[80px] rotate-[30deg] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-amber-500/20 group-hover:rotate-[-15deg] scale-y-125" />
    <div className="absolute top-[-5%] left-[35%] w-[80px] h-[350px] bg-purple-400/15 blur-[50px] rotate-[30deg] transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-amber-300/12 group-hover:rotate-[-15deg] scale-y-150" />
  </>
);

const quotes = [
  { name: 'Alex Rivera', role: 'CTO, Meridian', text: '"40% latency reduction globally after switching to Softree\'s edge infrastructure."' },
  { name: 'Sarah Chen', role: 'VP Eng, Nexus', text: '"The most cinematic developer experience I\'ve ever had."' },
  { name: 'Marcus Thorne', role: 'Director, Apex', text: '"Agentic AI pipeline handled our RAG deployment with zero manual tuning."' },
];

const PartnersMain = () => (
  <>
    <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '800px' }}>
      {quotes.map((q, i) => (
        <div key={i} className="absolute w-[75%] max-w-[320px] bento-float" style={{ top: `${12 + i * 22}%`, left: `${8 + i * 8}%`, zIndex: 3 - i, animationDelay: `${i * 0.7}s` }}>
          <div className={cn("rounded-[10px] border bg-[#111116]/90 backdrop-blur-xl p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_50px_rgba(0,0,0,0.5)]", i === 0 ? "border-violet-500/15" : "border-white/[0.06]")}>
            <p className="text-[10px] md:text-[11px] text-white/45 leading-relaxed italic mb-3">{q.text}</p>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500/25 to-indigo-500/25 border border-white/[0.08] flex items-center justify-center"><span className="text-[9px] font-bold text-white/50">{q.name[0]}</span></div>
              <div><span className="text-[9px] font-medium text-white/50 block">{q.name}</span><span className="text-[7px] font-mono text-white/20 tracking-wider">{q.role}</span></div>
              <div className="ml-auto flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} size={7} className="text-amber-400/60 fill-amber-400/60" />)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="absolute bottom-[22%] left-[6%] z-10">
      <div className="flex items-baseline gap-1">
        <span className="text-[36px] md:text-[42px] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/30 leading-none">4.9</span>
        <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(i => <Star key={i} size={9} className="text-amber-400 fill-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.4)]" />)}</div>
      </div>
      <span className="text-[7px] font-mono text-white/20 tracking-wider">500+ PROJECTS</span>
    </div>
  </>
);

const PartnersHover = () => (
  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[85%] bg-[#0f1015]/95 backdrop-blur-xl border border-white/[0.08] rounded-[14px] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_40px_80px_rgba(0,0,0,0.9)] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-6 group-hover:translate-y-0">
    <div className="flex items-center justify-between mb-4"><span className="text-white/80 text-sm font-bold tracking-tight">Client Impact</span><span className="text-[8px] text-emerald-400/60 font-mono tracking-wider">VERIFIED</span></div>
    <div className="grid grid-cols-3 gap-3">
      {[{ l: 'Retention', v: '98%', c: 'text-emerald-400' }, { l: 'NPS Score', v: '82', c: 'text-violet-400' }, { l: 'Avg Rating', v: '4.9', c: 'text-amber-400' }].map((m, i) => (
        <div key={i} className="flex flex-col items-center p-3 bg-black/40 border border-white/[0.04] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-3 group-hover:translate-y-0" style={{ transitionDelay: `${250 + i * 120}ms` }}>
          <span className="text-[7px] text-white/25 font-mono tracking-widest mb-1 uppercase">{m.l}</span>
          <span className={`font-mono text-lg font-bold ${m.c}`}>{m.v}</span>
        </div>
      ))}
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   CARD 5: MICROSOFT MODERNIZATION
   Split-screen legacy → azure with central beam
   ═══════════════════════════════════════════════════════════════ */

const MSBg = () => (
  <>
    <div className="absolute inset-0 bg-[#050508]" />
    <div className="absolute inset-0 opacity-15 pointer-events-none">
      <RippleGrid gridColor="#3b82f6" rippleIntensity={0.03} gridSize={10} gridThickness={20} mouseInteraction={false} opacity={0.35} glowIntensity={0.06} vignetteStrength={2.5} />
    </div>
    <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-blue-600/15 blur-[100px] rounded-full pointer-events-none transition-all duration-[1000ms] group-hover:bg-blue-500/20 group-hover:scale-110" />
  </>
);

const legacy = [
  { w: '55%', h: '7px', y: '24%', x: '10%' },
  { w: '40%', h: '5px', y: '36%', x: '15%' },
  { w: '50%', h: '8px', y: '48%', x: '8%' },
  { w: '30%', h: '5px', y: '58%', x: '18%' },
  { w: '45%', h: '6px', y: '68%', x: '10%' },
];

const modern = [
  { label: 'App Service', y: '22%' },
  { label: 'Functions', y: '36%' },
  { label: 'Cosmos DB', y: '50%' },
  { label: 'AI Studio', y: '64%' },
];

const MSMain = () => (
  <>
    {/* Central beam */}
    <div className="absolute left-1/2 top-[8%] bottom-[8%] w-[2px] -translate-x-1/2 z-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/15 to-transparent" />
      <div className="absolute left-0 w-full h-[18%] bento-beam bg-gradient-to-b from-transparent via-blue-400/70 to-transparent" style={{ filter: 'blur(2px)' }} />
      <div className="absolute left-0 w-full h-[10%] bento-beam bg-gradient-to-b from-transparent via-white/40 to-transparent" style={{ filter: 'blur(1px)', animationDelay: '1.5s' }} />
      <div className="absolute inset-0 w-6 -translate-x-[11px] bg-gradient-to-b from-transparent via-blue-500/[0.04] to-transparent" />
    </div>
    {/* Left: Legacy */}
    <div className="absolute left-0 top-0 w-1/2 h-full z-10">
      <div className="absolute top-[12%] left-[10%]"><span className="text-[8px] font-mono text-white/12 tracking-[0.3em] uppercase">Legacy</span></div>
      {legacy.map((b, i) => <div key={i} className="absolute rounded-sm bg-white/[0.035] border border-white/[0.02]" style={{ width: b.w, height: b.h, top: b.y, left: b.x }} />)}
      <div className="absolute bottom-[20%] left-[18%] opacity-[0.12]"><Server size={24} className="text-white" strokeWidth={1} /></div>
    </div>
    {/* Right: Azure */}
    <div className="absolute right-0 top-0 w-1/2 h-full z-10">
      <div className="absolute top-[12%] right-[10%]"><span className="text-[8px] font-mono text-blue-400/40 tracking-[0.3em] uppercase">Azure</span></div>
      {modern.map((s, i) => (
        <div key={i} className="absolute right-[12%] bento-float" style={{ top: s.y, animationDelay: `${i * 0.4}s` }}>
          <div className="px-2.5 py-1.5 rounded-md border border-blue-500/12 bg-blue-500/[0.05] backdrop-blur-sm flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_4px_rgba(59,130,246,0.6)] animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
            <span className="text-[8px] font-mono text-blue-300/50 tracking-wider whitespace-nowrap">{s.label}</span>
          </div>
        </div>
      ))}
    </div>
    {/* Center arrow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"><ArrowRight size={14} className="text-blue-400/25" /></div>
    {/* MS badge */}
    <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] backdrop-blur-md flex items-center justify-center"><FaMicrosoft className="text-white/50" size={14} /></div>
      <div className="flex flex-col"><span className="text-[8px] font-medium text-white/35 tracking-wide">Microsoft Partner</span><span className="text-[6px] font-mono text-blue-400/35 tracking-[0.15em]">Gold Certified</span></div>
    </div>
  </>
);

const MSHover = () => (
  <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[88%] bg-[#0c0d14]/95 backdrop-blur-xl border border-white/[0.08] rounded-[14px] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_40px_80px_rgba(0,0,0,0.9)] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-6 group-hover:translate-y-0">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2"><FaMicrosoft className="text-blue-400" size={14} /><span className="text-white/80 text-sm font-bold tracking-tight">Migration Status</span></div>
      <span className="text-[8px] text-emerald-400/60 font-mono tracking-wider flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />ON TRACK</span>
    </div>
    <div className="flex flex-col gap-2.5">
      {[{ l: 'Data Migration', p: 94, c: 'bg-blue-500' }, { l: 'API Endpoints', p: 87, c: 'bg-violet-500' }, { l: 'Auth & SSO', p: 100, c: 'bg-emerald-500' }, { l: 'Monitoring', p: 72, c: 'bg-amber-500' }].map((item, i) => (
        <div key={i} className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0" style={{ transitionDelay: `${250 + i * 100}ms` }}>
          <div className="flex justify-between mb-1"><span className="text-[8px] text-white/30 font-mono tracking-wider">{item.l}</span><span className="text-[8px] text-white/40 font-mono tabular-nums">{item.p}%</span></div>
          <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden"><div className={`h-full rounded-full ${item.c}`} style={{ width: `${item.p}%` }} /></div>
        </div>
      ))}
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */

export function BentoShowcase() {
  return (
    <>
      <Styles />
      <section className="relative w-full bg-[#05050A] py-20 md:py-32 px-4 md:px-6 flex justify-center z-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-15%] left-[-10%] w-[900px] h-[900px] rounded-full mix-blend-screen" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 60%)' }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] rounded-full mix-blend-screen" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 60%)' }} />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_center,white,transparent_80%)] pointer-events-none" />

        <div className="max-w-[1140px] w-full flex flex-col relative z-10 mx-auto">
          {/* Header */}
          <div className="flex flex-col mb-12 md:mb-20 max-w-5xl px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50 text-[9px] font-black uppercase tracking-[0.3em] mb-6 w-fit">Capabilities & Stack</div>
            <h2 className="text-[40px] md:text-[64px] font-bold text-white tracking-[-0.03em] leading-[1.05] mb-5">
              Engineering the{' '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400 italic font-serif">Widespread</span>{' '}Future.
            </h2>
            <p className="text-[16px] md:text-[20px] text-zinc-500 leading-[1.55] font-medium tracking-tight max-w-3xl">
              We deploy a comprehensive technical arsenal to architect fluid, cinematic ecosystems. From distributed data to neural workflows, we engineer the competitive edge.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            <Card title="Frontend Engineering" description="Pure glass architectures with physically-backed spring mechanics and true 60fps orchestration." className="md:col-span-7 h-[380px] md:h-[460px]" background={<FrontendBg />} primaryForeground={<FrontendMain />} secondaryForeground={<FrontendHover />} />
            <Card title="Intelligent Systems" description="Deep integration of agentic AI models with context-aware RAG pipelines." className="md:col-span-5 h-[380px] md:h-[460px]" background={<AIBg />} primaryForeground={<AIMain />} secondaryForeground={<AIHover />} />
            <Card title="Cloud & Data Architecture" description="Engineering hyper-scalable, distributed node infrastructures across AWS, Azure, and Databricks." className="md:col-span-7 h-[380px] md:h-[440px]" background={<CloudBg />} primaryForeground={<CloudMain />} secondaryForeground={<CloudHover />} />
            <Card title="Unified Partners" description="Trusted by industry leaders to deliver mission-critical digital transformations." className="md:col-span-5 h-[380px] md:h-[440px]" background={<PartnersBg />} primaryForeground={<PartnersMain />} secondaryForeground={<PartnersHover />} />
            <Card title="Microsoft Modernization" description="Accelerating core legacy systems with expert Azure cloud architectures and migrations." className="md:col-span-12 h-[320px] md:h-[380px]" background={<MSBg />} primaryForeground={<MSMain />} secondaryForeground={<MSHover />} />
          </div>
        </div>
      </section>
    </>
  );
}

export default BentoShowcase;
