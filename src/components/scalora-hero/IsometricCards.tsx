"use client"

import { motion, type Variants } from "framer-motion"
import { Sparkles, Type } from "lucide-react"

/* ====================================================================
 *  IsometricCards — exact match to Scalora reference image
 *
 *  Row of 5 columns on a softly tilted plane:
 *    1. Scalora CRM   — solid coral (brightest)
 *    2. Scalora CRM   — muted darker, overlaps col 1
 *    3. Scalora Ops   — wide glass card
 *    4. Column of two small square cards:
 *         • AI Writing Tool  (Type icon, top-right)
 *         • AI Sales Agent   (Sparkles icon, top-right)
 *    5. Mentoor       — solid coral, tall
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stage: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.4 } },
}

const colVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
}

/* ── Shared card chrome ─────────────────────────────────────────────── */

type Tone = "solid" | "muted" | "glass"

function Card({
  children,
  tone = "solid",
  className = "",
}: {
  children: React.ReactNode
  tone?: Tone
  className?: string
}) {
  const toneBg: Record<Tone, string> = {
    // Bright solid — top-left highlight, bottom-right deep
    solid:
      "bg-[linear-gradient(150deg,#ff9062_0%,#ef5d2e_45%,#c73d1a_100%)]",
    // Muted / darker sibling card
    muted:
      "bg-[linear-gradient(150deg,#c55e36_0%,#8f3a1b_50%,#5c2310_100%)]",
    // Glass
    glass: "bg-white/[0.05]",
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-xl border ${
        tone === "glass"
          ? "border-white/10"
          : "border-white/20"
      } ${toneBg[tone]} ${className}`}
      style={{
        boxShadow:
          tone === "glass"
            ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 40px -18px rgba(0,0,0,0.55)"
            : "inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.25), 0 22px 40px -18px rgba(0,0,0,0.55)",
        backdropFilter: tone === "glass" ? "blur(14px)" : undefined,
      }}
    >
      {/* Subtle top sheen on coral cards */}
      {tone !== "glass" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
          style={{
            background:
              "linear-gradient(180deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0) 70%)",
          }}
        />
      )}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  )
}

/* ── Icon pill (top-right on mini cards) ────────────────────────────── */

function IconPill({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 text-white ring-1 ring-inset ring-white/25"
      style={{
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
      }}
    >
      {children}
    </div>
  )
}

/* ── Cards ──────────────────────────────────────────────────────────── */

function CrmCard({ tone }: { tone: "solid" | "muted" }) {
  return (
    <Card tone={tone}>
      <div className="flex h-full flex-col justify-between p-5">
        <div />
        <div>
          <div
            className={`text-[20px] font-semibold leading-[1.05] tracking-tight ${
              tone === "muted" ? "text-white/90" : "text-white"
            }`}
          >
            <div>Scalora</div>
            <div>CRM</div>
          </div>
          <div
            className={`mt-3 text-[10px] font-medium uppercase tracking-[0.2em] ${
              tone === "muted" ? "text-white/45" : "text-white/75"
            }`}
          >
            CRM platform
          </div>
        </div>
      </div>
    </Card>
  )
}

function OpsCard() {
  return (
    <Card tone="glass">
      <div className="flex h-full flex-col justify-end p-6">
        <div className="text-[19px] font-semibold leading-[1.1] tracking-tight text-white/90">
          Scalora Ops
        </div>
        <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
          Product 01
        </div>
      </div>
    </Card>
  )
}

function MiniCard({
  icon,
  title,
}: {
  icon: React.ReactNode
  title: string
}) {
  return (
    <Card tone="solid">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex justify-end">
          <IconPill>{icon}</IconPill>
        </div>
        <div className="whitespace-pre-line text-[15px] font-semibold leading-[1.15] tracking-tight text-white">
          {title}
        </div>
      </div>
    </Card>
  )
}

function MentoorCard() {
  return (
    <Card tone="solid">
      <div className="flex h-full flex-col justify-end p-5">
        <div className="text-[18px] font-semibold leading-[1.1] tracking-tight text-white">
          Mentoor
        </div>
      </div>
    </Card>
  )
}

/* ── Stage ──────────────────────────────────────────────────────────── */

export default function IsometricCards() {
  return (
    <div
      className="relative h-[440px] w-full sm:h-[480px] md:h-[520px]"
      style={{ perspective: "2000px" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          // Subtle plane tilt — back on top, a touch toward the viewer on left
          transform: "rotateX(6deg) rotateY(-10deg)",
        }}
        variants={stage}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
      >
        <div
          className="relative flex items-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Col 1 — Scalora CRM solid (brightest, front) */}
          <motion.div
            variants={colVariant}
            className="relative h-[340px] w-[165px]"
            style={{ transform: "translateZ(30px)", zIndex: 5 }}
          >
            <CrmCard tone="solid" />
          </motion.div>

          {/* Col 2 — Scalora CRM muted, peeks behind col 1 */}
          <motion.div
            variants={colVariant}
            className="relative h-[330px] w-[160px]"
            style={{
              transform: "translateZ(10px) translateX(-40px)",
              zIndex: 4,
            }}
          >
            <CrmCard tone="muted" />
          </motion.div>

          {/* Col 3 — Scalora Ops glass (wider) */}
          <motion.div
            variants={colVariant}
            className="relative ml-1 h-[320px] w-[240px]"
            style={{ transform: "translateZ(0px)", zIndex: 3 }}
          >
            <OpsCard />
          </motion.div>

          {/* Col 4 — two stacked squares */}
          <motion.div
            variants={colVariant}
            className="relative ml-3 flex h-[320px] w-[150px] flex-col gap-2.5"
            style={{ transform: "translateZ(15px)", zIndex: 4 }}
          >
            <div className="h-[154px] w-full">
              <MiniCard
                icon={<Type className="h-3.5 w-3.5" strokeWidth={2.4} />}
                title={"AI Writing\nTool"}
              />
            </div>
            <div className="h-[154px] w-full">
              <MiniCard
                icon={<Sparkles className="h-3.5 w-3.5" strokeWidth={2.2} />}
                title={"AI Sales\nAgent"}
              />
            </div>
          </motion.div>

          {/* Col 5 — Mentoor tall */}
          <motion.div
            variants={colVariant}
            className="relative ml-3 h-[320px] w-[150px]"
            style={{ transform: "translateZ(25px)", zIndex: 5 }}
          >
            <MentoorCard />
          </motion.div>
        </div>
      </motion.div>

      {/* Warm floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(255,120,71,0.22) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  )
}
