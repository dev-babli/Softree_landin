"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

/* ─── Step Data ─── */
const steps = [
  {
    number: "01",
    title: "Connect Your Tools",
    description:
      "Integrate with your existing stack in minutes. We support 200+ data sources, APIs, and enterprise platforms out of the box.",
  },
  {
    number: "02",
    title: "Build Your Workflow",
    description:
      "Design powerful automations with our visual builder or write code directly. Validate, transform, and deliver — all orchestrated.",
  },
  {
    number: "03",
    title: "Ship to Production",
    description:
      "Deploy globally with zero configuration. Your solution goes live across 12 regions in under 30 seconds.",
  },
];

/* ═══════════════════════════════════════════════
   ANIMATION 1 — Connect: network constellation
   ═══════════════════════════════════════════════ */
function ConnectAnimation() {
  const nodes = useMemo(
    () => [
      { x: 80, y: 70, label: "CRM", delay: 0 },
      { x: 420, y: 55, label: "ERP", delay: 0.15 },
      { x: 65, y: 280, label: "DB", delay: 0.3 },
      { x: 435, y: 290, label: "API", delay: 0.45 },
      { x: 170, y: 40, label: "S3", delay: 0.1 },
      { x: 340, y: 310, label: "Auth", delay: 0.35 },
    ],
    []
  );
  const hub = { x: 250, y: 175 };

  return (
    <svg viewBox="0 0 500 350" className="w-full h-full" fill="none">
      {/* grid */}
      {[...Array(10)].map((_, i) => (
        <line key={`h${i}`} x1={0} x2={500} y1={i * 35} y2={i * 35} stroke="white" strokeOpacity={0.04} />
      ))}
      {[...Array(11)].map((_, i) => (
        <line key={`v${i}`} x1={i * 50} x2={i * 50} y1={0} y2={350} stroke="white" strokeOpacity={0.04} />
      ))}

      {/* connection lines */}
      {nodes.map((n, i) => (
        <motion.line
          key={`l${i}`}
          x1={hub.x}
          y1={hub.y}
          x2={n.x}
          y2={n.y}
          stroke="url(#lineGrad)"
          strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: n.delay + 0.3 }}
        />
      ))}

      {/* travelling pulses */}
      {nodes.map((n, i) => (
        <motion.circle
          key={`p${i}`}
          r={2.5}
          fill="#3fffdd"
          initial={{ cx: n.x, cy: n.y, opacity: 0 }}
          animate={{
            cx: [n.x, hub.x],
            cy: [n.y, hub.y],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: n.delay + 1,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* outer nodes */}
      {nodes.map((n, i) => (
        <motion.g
          key={`n${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: n.delay }}
        >
          <rect
            x={n.x - 26}
            y={n.y - 14}
            width={52}
            height={28}
            rx={4}
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={0.8}
          />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize={11} fontFamily="monospace">
            {n.label}
          </text>
        </motion.g>
      ))}

      {/* center hub */}
      <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
        <circle cx={hub.x} cy={hub.y} r={32} fill="rgba(0,137,255,0.08)" stroke="rgba(0,137,255,0.4)" strokeWidth={1} />
        <motion.circle
          cx={hub.x}
          cy={hub.y}
          r={32}
          fill="none"
          stroke="rgba(63,255,221,0.3)"
          strokeWidth={1}
          initial={{ r: 32 }}
          animate={{ r: 50, opacity: [0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx={hub.x} cy={hub.y} r={5} fill="#0089ff" />
        <text x={hub.x} y={hub.y + 52} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={9} fontFamily="monospace">
          SOFTREE CORE
        </text>
      </motion.g>

      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,137,255,0.5)" />
          <stop offset="100%" stopColor="rgba(63,255,221,0.5)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   ANIMATION 2 — Build: pipeline flow
   ═══════════════════════════════════════════════ */
function BuildAnimation() {
  const stages = useMemo(
    () => [
      { label: "Validate", x: 60, color: "#f0a46c" },
      { label: "Transform", x: 190, color: "#5b9cf4" },
      { label: "Enrich", x: 320, color: "#3fffdd" },
      { label: "Deliver", x: 440, color: "#a5d6a7" },
    ],
    []
  );
  const y = 175;

  return (
    <svg viewBox="0 0 500 350" className="w-full h-full" fill="none">
      {/* subtle grid */}
      {[...Array(8)].map((_, i) => (
        <line key={`g${i}`} x1={0} x2={500} y1={i * 50} y2={i * 50} stroke="white" strokeOpacity={0.03} />
      ))}

      {/* connector line */}
      <motion.line
        x1={60}
        y1={y}
        x2={440}
        y2={y}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={2}
        strokeDasharray="6 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* arrows between stages */}
      {stages.slice(0, -1).map((s, i) => {
        const nx = stages[i + 1].x;
        const mx = (s.x + nx) / 2;
        return (
          <motion.g
            key={`a${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.2 }}
          >
            <polygon
              points={`${mx - 5},${y - 4} ${mx + 5},${y} ${mx - 5},${y + 4}`}
              fill="rgba(255,255,255,0.2)"
            />
          </motion.g>
        );
      })}

      {/* stage nodes */}
      {stages.map((s, i) => (
        <motion.g
          key={s.label}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
        >
          {/* glow */}
          <circle cx={s.x} cy={y} r={28} fill={s.color} fillOpacity={0.06} />
          {/* ring */}
          <motion.circle
            cx={s.x}
            cy={y}
            r={24}
            fill="rgba(255,255,255,0.03)"
            stroke={s.color}
            strokeWidth={1.2}
            strokeOpacity={0.6}
            animate={{ strokeOpacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
          {/* inner dot */}
          <circle cx={s.x} cy={y} r={4} fill={s.color} fillOpacity={0.9} />
          {/* label */}
          <text x={s.x} y={y + 44} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={11} fontFamily="monospace">
            {s.label}
          </text>
          {/* step number */}
          <text x={s.x} y={y - 36} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={9} fontFamily="monospace">
            {`0${i + 1}`}
          </text>
        </motion.g>
      ))}

      {/* data packets flowing */}
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={`pkt${i}`}
          width={6}
          height={6}
          rx={1}
          fill="#3fffdd"
          fillOpacity={0.8}
          initial={{ x: 50, y: y - 3, opacity: 0 }}
          animate={{
            x: [50, 180, 310, 445],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: 1.5 + i * 1,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   ANIMATION 3 — Ship: global deploy
   ═══════════════════════════════════════════════ */
function ShipAnimation() {
  const regions = useMemo(
    () => [
      { x: 120, y: 100, label: "EU-WEST" },
      { x: 380, y: 90, label: "US-EAST" },
      { x: 250, y: 260, label: "AP-SOUTH" },
      { x: 90, y: 220, label: "EU-NORTH" },
      { x: 410, y: 240, label: "US-WEST" },
      { x: 250, y: 100, label: "ME-CENT" },
    ],
    []
  );

  return (
    <svg viewBox="0 0 500 350" className="w-full h-full" fill="none">
      {/* abstract globe rings */}
      <motion.ellipse
        cx={250}
        cy={175}
        rx={160}
        ry={110}
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={1}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.ellipse
        cx={250}
        cy={175}
        rx={110}
        ry={110}
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={0.8}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
      />
      <motion.ellipse
        cx={250}
        cy={175}
        rx={50}
        ry={110}
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={0.8}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
      {/* equator */}
      <line x1={90} x2={410} y1={175} y2={175} stroke="rgba(255,255,255,0.05)" strokeWidth={0.8} />

      {/* region nodes */}
      {regions.map((r, i) => (
        <motion.g
          key={r.label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.5 + i * 0.15 }}
        >
          {/* pulse ring */}
          <motion.circle
            cx={r.x}
            cy={r.y}
            r={8}
            fill="none"
            stroke="#0089ff"
            strokeWidth={1}
            animate={{ r: [8, 22], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
          {/* dot */}
          <circle cx={r.x} cy={r.y} r={5} fill="#0089ff" fillOpacity={0.9} />
          <circle cx={r.x} cy={r.y} r={2} fill="white" fillOpacity={0.9} />
          {/* label */}
          <text
            x={r.x}
            y={r.y + 20}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize={8}
            fontFamily="monospace"
            letterSpacing="0.05em"
          >
            {r.label}
          </text>
        </motion.g>
      ))}

      {/* connection arcs between regions */}
      {[
        [0, 1],
        [1, 4],
        [0, 3],
        [2, 4],
        [5, 2],
      ].map(([a, b], i) => (
        <motion.path
          key={`arc${i}`}
          d={`M${regions[a].x},${regions[a].y} Q250,${Math.min(regions[a].y, regions[b].y) - 30} ${regions[b].x},${regions[b].y}`}
          stroke="rgba(0,137,255,0.2)"
          strokeWidth={0.8}
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1 + i * 0.2 }}
        />
      ))}

      {/* status text */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <rect x={175} y={295} width={150} height={28} rx={4} fill="rgba(0,137,255,0.08)" stroke="rgba(0,137,255,0.25)" strokeWidth={0.8} />
        <motion.circle cx={192} cy={309} r={3} fill="#34d399" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <text x={205} y={313} fill="rgba(255,255,255,0.6)" fontSize={10} fontFamily="monospace">
          6 regions live
        </text>
      </motion.g>
    </svg>
  );
}

const animations = [ConnectAnimation, BuildAnimation, ShipAnimation];

/* ═══════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════ */
export function HowItWorksSection() {
  const [active, setActive] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % steps.length), 6000);
    return () => clearInterval(id);
  }, []);

  const ActiveViz = animations[active];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="flex w-full justify-center bg-[#070707] px-4 py-24 md:px-6 lg:py-32"
    >
      <div className="w-full max-w-[1240px]">
        {/* ── Tag ── */}
        <div className="flex items-center gap-2 self-start border border-white/20 px-2 py-1 w-fit mb-8">
          <div className="size-[5.82px] bg-white" />
          <span className="font-mono text-sm text-white leading-normal tracking-[-0.28px]">
            PROCESS
          </span>
        </div>

        {/* ── Heading ── */}
        <motion.h2
          className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Three steps.
          <br />
          <span className="text-white/40">Infinite possibilities.</span>
        </motion.h2>

        <a
          className="flex w-fit items-center justify-center bg-white px-2 py-1.5 hover:bg-neutral-200 transition-colors mb-16 lg:mb-20"
          href="/contact"
        >
          <span className="font-mono text-black text-sm leading-normal tracking-[-0.28px]">
            START A PROJECT
          </span>
        </a>

        {/* ── Main Grid ── */}
        <div className="flex flex-col lg:flex-row">
          {/* LEFT — Step cards */}
          <div className="flex flex-col w-full lg:w-[480px] shrink-0">
            {steps.map((step, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={step.number}
                  type="button"
                  onClick={() => setActive(i)}
                  whileHover={{ borderColor: "rgba(255,255,255,0.35)" }}
                  className={`group relative w-full text-left border border-[#2c2c2c] -mt-px p-5 lg:p-6 transition-all duration-500 overflow-hidden ${
                    isActive ? "bg-white/[0.04]" : "bg-transparent hover:bg-white/[0.02]"
                  }`}
                >
                  {/* glass highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="activeGlass"
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,137,255,0.04) 50%, transparent 100%)",
                        backdropFilter: "blur(12px)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10 flex items-start gap-5">
                    {/* number */}
                    <span
                      className={`font-mono text-2xl transition-colors duration-500 ${
                        isActive ? "text-[#0089ff]" : "text-white/20"
                      }`}
                    >
                      {step.number}
                    </span>

                    <div className="flex-1">
                      <h3
                        className={`text-xl lg:text-2xl font-medium mb-2 transition-all duration-300 ${
                          isActive ? "text-white" : "text-white/50"
                        } group-hover:translate-x-1`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm lg:text-base leading-relaxed transition-colors duration-500 ${
                          isActive ? "text-white/70" : "text-white/30"
                        }`}
                      >
                        {step.description}
                      </p>

                      {/* progress bar */}
                      {isActive && (
                        <div className="mt-4 h-px bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#0089ff] to-[#3fffdd]"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 6, ease: "linear" }}
                            key={`progress-${active}`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {/* mini status row */}
            <div className="border border-[#2c2c2c] -mt-px px-5 py-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-white/30">
                Step {active + 1} of {steps.length}
              </span>
            </div>
          </div>

          {/* RIGHT — Animation viewport */}
          <div className="w-full lg:flex-1 lg:-ml-px border border-[#2c2c2c] -mt-px lg:mt-0 min-h-[350px] lg:min-h-[460px] relative overflow-hidden bg-[#0a0a0a]">
            {/* corner decorations */}
            <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-white/10" />
            <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-white/10" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-white/10" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-white/10" />

            {/* top label bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#2c2c2c]">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-white/10" />
                <div className="size-2.5 rounded-full bg-white/10" />
                <div className="size-2.5 rounded-full bg-white/10" />
              </div>
              <span className="font-mono text-[10px] text-white/25 uppercase tracking-wider">
                {steps[active].title}
              </span>
            </div>

            {/* animation area */}
            <div className="absolute inset-0 top-[41px] p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="w-full h-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <ActiveViz />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
