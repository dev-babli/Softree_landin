"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Check, Sparkles, ArrowLeft } from "lucide-react"

type StepKey = "challenge" | "stack" | "timeline" | "contact" | "done"

const CHALLENGES = [
  { id: "ai", label: "AI agent / automation", emoji: "✨" },
  { id: "portal", label: "Internal portal / dashboard", emoji: "🛠" },
  { id: "ms", label: "Microsoft / SharePoint stack", emoji: "🧩" },
  { id: "data", label: "Data / Power BI / Fabric", emoji: "📊" },
  { id: "mobile", label: "Mobile or web product", emoji: "📱" },
  { id: "other", label: "Something else", emoji: "💬" },
]

const STACKS = [
  { id: "ms", label: "Microsoft 365 + Azure" },
  { id: "node", label: "Node / Next.js" },
  { id: "ai", label: "OpenAI / Anthropic" },
  { id: "mixed", label: "Mixed / unsure" },
]

const TIMELINES = [
  { id: "asap", label: "Yesterday — kick off this week", spark: "🔥" },
  { id: "month", label: "Within a month", spark: "⚡" },
  { id: "quarter", label: "This quarter", spark: "📅" },
  { id: "explore", label: "Just exploring options", spark: "👀" },
]

export function ConversionLeadFunnel() {
  const [step, setStep] = useState<StepKey>("challenge")
  const [challenge, setChallenge] = useState<string>("")
  const [stack, setStack] = useState<string>("")
  const [timeline, setTimeline] = useState<string>("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")

  const order: StepKey[] = ["challenge", "stack", "timeline", "contact", "done"]
  const stepIndex = order.indexOf(step)
  const progress = ((stepIndex + 1) / order.length) * 100

  const goNext = (next: StepKey) => setStep(next)
  const goBack = () => {
    const i = order.indexOf(step)
    if (i > 0) setStep(order[i - 1])
  }

  const submit = () => {
    if (!name || !email) return
    setStep("done")
  }

  return (
    <section
      id="funnel"
      className="relative w-full overflow-hidden bg-[#0a0a1a] py-24 text-white lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(24,82,255,0.18),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(255,88,18,0.14),transparent_30%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-start gap-12 px-4 lg:grid-cols-[0.95fr_1.1fr] lg:gap-16 lg:px-10">
        {/* LEFT — pitch */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 backdrop-blur-md">
            <Sparkles className="size-3.5 text-[#FF5812]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
              60-second scoping
            </span>
          </div>
          <h2 className="text-[clamp(34px,5vw,60px)] font-medium leading-[0.98] tracking-[-0.05em]">
            Tell us where you’re stuck.
            <br />
            <span className="text-white/55">We’ll reply with a plan in 24 hours.</span>
          </h2>
          <p className="mt-6 max-w-[480px] text-[15px] leading-[1.55] text-white/65">
            No long forms. Four short answers and we route you to the right senior team — not a
            BDR. You leave with an outcome roadmap, even if we never work together.
          </p>

          <ul className="mt-10 grid gap-3 text-[14px]">
            {[
              "Senior strategist on every reply",
              "Outcome scope, not generic decks",
              "Discovery is free + non-binding",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-[#1852FF]">
                  <Check className="size-3.5" />
                </span>
                <span className="text-white/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — funnel card */}
        <div
          className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[linear-gradient(165deg,rgba(30,40,60,0.92),rgba(20,30,50,0.95))] p-7 shadow-[0_40px_90px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-9"
          style={{ borderTopColor: "rgba(255,255,255,0.4)" }}
        >
          {/* Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-white text-[#0a0a1a]">
                <span className="text-[12px] font-semibold tabular-nums">
                  {Math.min(stepIndex + 1, 4)}/4
                </span>
              </span>
              <p className="text-[13px] font-semibold tracking-[-0.02em] text-white">
                {step === "challenge" && "What are you building?"}
                {step === "stack" && "Where does it live?"}
                {step === "timeline" && "When do you want to start?"}
                {step === "contact" && "Who should we reply to?"}
                {step === "done" && "Got it — talk soon."}
              </p>
            </div>
            {step !== "done" && stepIndex > 0 ? (
              <button
                onClick={goBack}
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium text-white/75 hover:bg-white/10"
              >
                <ArrowLeft className="size-3" /> Back
              </button>
            ) : null}
          </div>

          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-gradient-to-r from-[#FF5812] via-[#FF8E53] to-[#1852FF]"
            />
          </div>

          {/* Steps */}
          <div className="mt-8 min-h-[280px]">
            <AnimatePresence mode="wait">
              {step === "challenge" && (
                <motion.div
                  key="challenge"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                >
                  {CHALLENGES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setChallenge(c.id)
                        setTimeout(() => goNext("stack"), 220)
                      }}
                      className={`group flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 ${
                        challenge === c.id
                          ? "border-[#FF5812] bg-[#FF5812]/15"
                          : "border-white/10 bg-white/[0.04] hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{c.emoji}</span>
                        <span className="text-[14px] font-medium tracking-[-0.02em]">{c.label}</span>
                      </span>
                      <span className="text-white/40 transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === "stack" && (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                >
                  {STACKS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setStack(s.id)
                        setTimeout(() => goNext("timeline"), 220)
                      }}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 ${
                        stack === s.id
                          ? "border-[#1852FF] bg-[#1852FF]/15"
                          : "border-white/10 bg-white/[0.04] hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <span className="text-[14px] font-medium tracking-[-0.02em]">{s.label}</span>
                      <span className="text-white/40">→</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === "timeline" && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 gap-2"
                >
                  {TIMELINES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTimeline(t.id)
                        setTimeout(() => goNext("contact"), 220)
                      }}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 ${
                        timeline === t.id
                          ? "border-[#FF5812] bg-[#FF5812]/15"
                          : "border-white/10 bg-white/[0.04] hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{t.spark}</span>
                        <span className="text-[14px] font-medium tracking-[-0.02em]">{t.label}</span>
                      </span>
                      <span className="text-white/40">→</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === "contact" && (
                <motion.form
                  key="contact"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onSubmit={(e) => {
                    e.preventDefault()
                    submit()
                  }}
                  className="grid gap-3"
                >
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[14px] text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work email"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[14px] text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company (optional)"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[14px] text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-[#0a0a1a] shadow-[0_18px_44px_rgba(255,255,255,0.18)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Get my outcome roadmap
                    <ArrowUpRight className="size-4" />
                  </button>
                  <p className="mt-1 text-center text-[11px] text-white/45">
                    No spam. Reply within 24 hours from a senior strategist.
                  </p>
                </motion.form>
              )}

              {step === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-[#FF5812] to-[#1852FF] shadow-[0_18px_44px_rgba(24,82,255,0.45)]">
                    <Check className="size-7" />
                  </span>
                  <h3 className="mt-6 text-[22px] font-semibold tracking-[-0.03em]">
                    Got it — talk soon, {name || "friend"}.
                  </h3>
                  <p className="mt-2 max-w-sm text-[14px] text-white/65">
                    A senior strategist is reviewing your brief. You’ll hear back within 24 hours
                    with an outcome roadmap and proposed next step.
                  </p>
                  <button
                    onClick={() => {
                      setStep("challenge")
                      setChallenge("")
                      setStack("")
                      setTimeline("")
                      setName("")
                      setEmail("")
                      setCompany("")
                    }}
                    className="mt-6 inline-flex items-center gap-1 text-[12px] font-medium uppercase tracking-[0.16em] text-white/55 hover:text-white"
                  >
                    Start another <ArrowUpRight className="size-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConversionLeadFunnel
