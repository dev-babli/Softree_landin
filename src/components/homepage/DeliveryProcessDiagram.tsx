"use client";

import { motion } from "framer-motion";
import { Search, Pencil, Code2, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── Data ───────────────────────────────────────────────────────────────────────

interface Step {
  num: string;
  Icon: LucideIcon;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  { num: "01", Icon: Search, title: "Discover", desc: "Understand your business, challenges, and goals." },
  { num: "02", Icon: Pencil, title: "Design", desc: "Plan the right solution with a clear roadmap and architecture." },
  { num: "03", Icon: Code2, title: "Build", desc: "Build, integrate, and validate with agility and precision." },
  { num: "04", Icon: TrendingUp, title: "Scale", desc: "Optimize, support, and scale for long-term success." },
];

// ── Animation variants ────────────────────────────────────────────────────────

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.45 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};

// ── SVG geometry ──────────────────────────────────────────────────────────────
// viewBox="0 0 100 100" + preserveAspectRatio="none" → x/y = % of wrapper dims.
// Wrapper has pt-9 pb-9 clearance around the card grid for the connector paths.
// Card centres x sit at quarter-points of a 4-column equal grid.

const CX = [12.5, 37.5, 62.5, 87.5] as const;
const BY = 6;   // bus y  — inside the top clearance band
const CT = 12;  // card top y
const CM = 51;  // card vertical midpoint (for mid-dashes)
const CB = 88;  // card bottom y
const UY = 94;  // bottom-U apex y

const D_BUS = `M ${CX[0]} ${CT} L ${CX[0]} ${BY} L ${CX[3]} ${BY} L ${CX[3]} ${CT}`;
const D_DROP2 = `M ${CX[1]} ${BY} L ${CX[1]} ${CT}`;
const D_DROP3 = `M ${CX[2]} ${BY} L ${CX[2]} ${CT}`;
const D_U = [
  `M ${CX[1]} ${CB}`,
  `L ${CX[1]} ${UY}`,
  `Q ${CX[1]} ${UY + 4} ${CX[1] + 4} ${UY + 4}`,
  `L ${CX[2] - 4} ${UY + 4}`,
  `Q ${CX[2]} ${UY + 4} ${CX[2]} ${UY}`,
  `L ${CX[2]} ${CB}`,
].join(" ");

const D_MIDS = [
  `M ${CX[0] + 7.5} ${CM} L ${CX[1] - 7.5} ${CM}`,
  `M ${CX[1] + 7.5} ${CM} L ${CX[2] - 7.5} ${CM}`,
  `M ${CX[2] + 7.5} ${CM} L ${CX[3] - 7.5} ${CM}`,
];

function pathTx(delay: number, dur = 1.1) {
  return {
    pathLength: { duration: dur, ease: "easeInOut" as const, delay },
    opacity: { duration: 0.28, delay },
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export function DeliveryProcessDiagram() {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background: "transparent",
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      {/* Ambient warm wash */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full px-5 pt-5 pb-4">

        {/* Card grid + SVG connector wrapper */}
        <div className="relative flex-1 pt-9 pb-9 min-h-0">

          {/* SVG connector overlay */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          >
            {/* ── Draw paths ── */}

            {/* Top horizontal bus */}
            <motion.path
              d={D_BUS}
              fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="0.7"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={pathTx(0.4, 1.15)}
            />

            {/* Drop to card 2 */}
            <motion.path
              d={D_DROP2}
              fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="0.7"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={pathTx(1.25, 0.42)}
            />

            {/* Drop to card 3 */}
            <motion.path
              d={D_DROP3}
              fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="0.7"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={pathTx(1.45, 0.42)}
            />

            {/* Bottom U curve */}
            <motion.path
              d={D_U}
              fill="none" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="0.7"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={pathTx(1.78, 0.88)}
            />

            {/* Dashed mid-connectors */}
            {D_MIDS.map((d, i) => (
              <motion.path
                key={`mid-${i}`}
                d={d}
                fill="none" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="0.6"
                strokeDasharray="2 1.8"
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.58 + i * 0.13 }}
              />
            ))}

            {/* ── Nodes ── */}

            {/* Card 1 & 4 bus ends (smaller) */}
            {([CX[0], CX[3]] as const).map((cx, i) => (
              <motion.circle
                key={`te-${i}`}
                cx={cx} cy={BY} r="1.05"
                fill="#FFFFFF" fillOpacity="0.55"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: i === 0 ? 0.55 : 0.8 }}
              />
            ))}

            {/* Card 2 & 3 junction dots (larger, prominent) */}
            {([CX[1], CX[2]] as const).map((cx, i) => (
              <motion.circle
                key={`tj-${i}`}
                cx={cx} cy={BY} r="1.45"
                fill="#FFFFFF" fillOpacity="0.9"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 1.28 + i * 0.2 }}
              />
            ))}

            {/* Soft pulsing halos on card 2 & 3 junction dots */}
            {([CX[1], CX[2]] as const).map((cx, i) => (
              <motion.circle
                key={`pulse-${i}`}
                cx={cx} cy={BY} r="2.6"
                fill="none" stroke="#FFFFFF" strokeWidth="0.55" strokeOpacity="0.28"
                vectorEffect="non-scaling-stroke"
                animate={{ scale: [1, 1.65, 1], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.65 }}
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            ))}

            {/* Bottom U open circles */}
            {([CX[1], CX[2]] as const).map((cx, i) => (
              <motion.circle
                key={`bu-${i}`}
                cx={cx} cy={UY} r="1.2"
                fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.58"
                vectorEffect="non-scaling-stroke"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 20, delay: 1.92 + i * 0.13 }}
              />
            ))}

            {/* Mid-dash centre dots */}
            {D_MIDS.map((_, i) => (
              <motion.circle
                key={`md-${i}`}
                cx={(CX[i] + CX[i + 1]) / 2}
                cy={CM} r="0.88"
                fill="#FFFFFF" fillOpacity="0.42"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 280, damping: 20, delay: 1.62 + i * 0.13 }}
              />
            ))}
          </svg>

          {/* ── Process cards ── */}
          <motion.div
            className="relative z-10 grid grid-cols-4 gap-2.5 h-full"
            variants={cardContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            {STEPS.map(step => (
              <motion.div
                key={step.num}
                className="flex flex-col gap-2 rounded-xl p-3 cursor-default select-none"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                }}
                variants={cardItem}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(255,255,255,0.5)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
              >
                <span className="text-white font-black text-[0.6rem] tracking-wider opacity-60">
                  {step.num}
                </span>

                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <step.Icon
                    className="w-3.5 h-3.5 text-white"
                    aria-hidden
                    strokeWidth={1.75}
                  />
                </div>

                <strong className="text-white font-bold text-[0.7rem] leading-tight">
                  {step.title}
                </strong>

                <p className="text-[0.6rem] leading-relaxed m-0 text-white/70">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Caption row */}
        <div className="flex items-center justify-between flex-shrink-0 mt-1">
          <span className="text-white font-black text-base leading-none opacity-80">02</span>
          <span
            className="font-bold uppercase text-white/50"
            style={{ fontSize: "0.52rem", letterSpacing: "0.26em" }}
          >
            Structured Delivery Approach
          </span>
        </div>

      </div>
    </div>
  );
}

export default DeliveryProcessDiagram;
