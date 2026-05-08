"use client"

import { motion, type Variants } from "framer-motion"
import { Sparkles, Type } from "lucide-react"

/* ====================================================================
 *  IsometricCardsv1 — refined Scalora hero stack
 *
 *  Layout (left → right, receding into 3D space):
 *    1. Scalora CRM       — solid coral, brightest, front-most
 *    2. Scalora CRM       — muted coral, peeks behind col 1
 *    3. Scalora Ops       — wide glassmorphic card
 *    4. Mini stack of two squares (AI Writing Tool / AI Sales Agent)
 *    5. Mentoor           — solid coral, tall
 *
 *  Each column lives on its own translateZ plane so the stack reads
 *  isometrically when the parent container tilts via rotateY/rotateX.
 * ==================================================================== */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stage: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.45 } },
}

const colVariant: Variants = {
  hidden: { opacity: 0, y: 56, rotateX: -8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1, ease: EASE },
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
    solid:
      "bg-[linear-gradient(150deg,#ff9062_0%,#ef5d2e_45%,#c73d1a_100%)]",
    muted:
      "bg-[linear-gradient(150deg,#a64a2a_0%,#7a3318_55%,#4a1d0d_100%)]",
    glass: "bg-white/[0.05]",
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-2xl border ${
        tone === "glass" ? "border-white/10" : "border-white/20"
      } ${toneBg[tone]} ${className}`}
      style={{
        boxShadow:
          tone === "glass"
            ? "inset 0 1px 0 rgba(255,255,255,0.10), 0 30px 60px -24px rgba(0,0,0,0.65)"
            : "inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.30), 0 30px 60px -22px rgba(0,0,0,0.65)",
        backdropFilter: tone === "glass" ? "blur(16px)" : undefined,
        WebkitBackdropFilter: tone === "glass" ? "blur(16px)" : undefined,
      }}
    >
      {/* Top sheen — only on coral cards */}
      {tone !== "glass" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
          style={{
            background:
              "linear-gradient(180deg,rgba(255,255,255,0.26) 0%,rgba(255,255,255,0) 70%)",
          }}
        />
      )}
      {/* Inner left highlight on solid */}
      {tone === "solid" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[35%]"
          style={{
            background:
              "linear-gradient(90deg,rgba(255,255,255,0.10) 0%,transparent 100%)",
          }}
        />
      )}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  )
}

/* ── Icon pill ──────────────────────────────────────────────────────── */

function IconPill({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white ring-1 ring-inset ring-white/25"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)" }}
    >
      {children}
    </div>
  )
}

/* ── Card variants ──────────────────────────────────────────────────── */

function CrmCard({ tone }: { tone: "solid" | "muted" }) {
  return (
    <Card tone={tone}>
      <div className="flex h-full flex-col justify-end p-5">
        <div
          className={`text-[22px] font-semibold leading-[1.05] tracking-tight ${
            tone === "muted" ? "text-white/85" : "text-white"
          }`}
        >
          <div>Scalora</div>
          <div>CRM</div>
        </div>
        <div
          className={`mt-3 text-[10px] font-medium uppercase tracking-[0.22em] ${
            tone === "muted" ? "text-white/40" : "text-white/75"
          }`}
        >
          CRM platform
        </div>
      </div>
    </Card>
  )
}

function OpsCard() {
  return (
    <Card tone="glass">
      <div className="flex h-full flex-col justify-end p-6">
        <div className="text-[20px] font-semibold leading-[1.1] tracking-tight text-white/90">
          Scalora Ops
        </div>
        <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
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
        <div className="text-[19px] font-semibold leading-[1.1] tracking-tight text-white">
          Mentoor
        </div>
      </div>
    </Card>
  )
}

/* ── Stage ──────────────────────────────────────────────────────────── */

export default function IsometricCardsv1() {
  return (
    <div
      className="relative h-[460px] w-full sm:h-[500px] md:h-[540px]"
      style={{ perspective: "2200px" }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          /* The reference image reads as: scene rotated ~14° around Y
           * with a tiny X-axis nod, so cards lean slightly forward-right
           * and the receding columns retreat into the back of the scene. */
          transform: "rotateX(8deg) rotateY(-14deg) rotateZ(-2deg)",
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
          {/* Col 1 — Scalora CRM solid (front-most) */}
          <motion.div
            variants={colVariant}
            className="relative h-[340px] w-[170px]"
            style={{
              transform: "translateZ(60px)",
              transformStyle: "preserve-3d",
              zIndex: 6,
            }}
          >
            <CrmCard tone="solid" />
          </motion.div>

          {/* Col 2 — Scalora CRM muted, behind col 1 */}
          <motion.div
            variants={colVariant}
            className="relative h-[330px] w-[160px]"
            style={{
              transform: "translateZ(20px) translateX(-44px)",
              transformStyle: "preserve-3d",
              zIndex: 5,
            }}
          >
            <CrmCard tone="muted" />
          </motion.div>

          {/* Col 3 — Scalora Ops glass (wide) */}
          <motion.div
            variants={colVariant}
            className="relative ml-1 h-[320px] w-[250px]"
            style={{
              transform: "translateZ(0px)",
              transformStyle: "preserve-3d",
              zIndex: 4,
            }}
          >
            <OpsCard />
          </motion.div>

          {/* Col 4 — two stacked mini squares */}
          <motion.div
            variants={colVariant}
            className="relative ml-3 flex h-[320px] w-[154px] flex-col gap-2.5"
            style={{
              transform: "translateZ(30px)",
              transformStyle: "preserve-3d",
              zIndex: 5,
            }}
          >
            <div className="h-[156px] w-full">
              <MiniCard
                icon={<Type className="h-4 w-4" strokeWidth={2.4} />}
                title={"AI Writing\nTool"}
              />
            </div>
            <div className="h-[156px] w-full">
              <MiniCard
                icon={<Sparkles className="h-4 w-4" strokeWidth={2.2} />}
                title={"AI Sales\nAgent"}
              />
            </div>
          </motion.div>

          {/* Col 5 — Mentoor */}
          <motion.div
            variants={colVariant}
            className="relative ml-3 h-[320px] w-[150px]"
            style={{
              transform: "translateZ(48px)",
              transformStyle: "preserve-3d",
              zIndex: 6,
            }}
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
            "radial-gradient(60% 100% at 50% 100%, rgba(255,120,71,0.28) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
    </div>
  )
}
