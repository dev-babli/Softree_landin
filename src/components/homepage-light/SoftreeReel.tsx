"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"

const REEL_VIDEO =
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_mp4.mp4"
const REEL_POSTER =
  "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba%2F69d2095642a31660d0b048ee_Video%202_poster.0000000.jpg"

/* Rotating deco circle made of dashes */
function RotatingCircle() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      aria-hidden
      className="pointer-events-none absolute -right-8 -top-8 h-[clamp(72px,8vw,120px)] w-[clamp(72px,8vw,120px)]"
    >
      <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
        <circle
          cx="60"
          cy="60"
          r="56"
          stroke="#111111"
          strokeWidth="1"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const r = 56
          const rad = (deg * Math.PI) / 180
          const x = 60 + r * Math.cos(rad)
          const y = 60 + r * Math.sin(rad)
          return <circle key={deg} cx={x} cy={y} r="2.5" fill="#111111" />
        })}
      </svg>
    </motion.div>
  )
}

/* Scribble arrow + label */
function ScribbleArrow() {
  return (
    <div className="pointer-events-none absolute -bottom-12 right-4 flex flex-col items-center gap-1 md:-bottom-10 md:right-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="31"
        height="32"
        viewBox="0 0 31 32"
        fill="none"
        className="h-6 w-6 rotate-180 text-[#111111] opacity-70"
      >
        <path
          d="M-1.3266e-06 0.812487L1.24998 0.603613L1.62857 -0.000167918C1.45886 1.95803 4.50712 2.87186 5.21207 4.73215C5.42421 5.2935 4.76822 5.38815 4.56913 5.21191C4.52018 5.16948 4.33088 4.48411 3.92945 4.0631C3.5835 3.7041 2.02674 1.96782 1.63183 2.28114C2.1377 7.34635 3.34526 11.9905 5.93334 16.3998C11.2009 25.3846 20.7308 30.3095 30.9689 31.1385C15.8484 31.7782 2.73822 19.0694 1.29894 4.23934C0.443857 4.58202 1.35768 7.3594 -1.04856e-06 7.17337L-1.32646e-06 0.815748L-1.3266e-06 0.812487Z"
          fill="currentColor"
        />
      </svg>
      <p
        className="font-['Caveat',_cursive] text-[13px] text-[#111111]/70"
        style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
      >
        See what we do!
      </p>
    </div>
  )
}

/* Lightbox modal */
function ReelModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={REEL_VIDEO}
          autoPlay
          controls
          playsInline
          className="h-auto w-full"
        />
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Close reel"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function SoftreeReel() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [open, setOpen] = useState(false)

  return (
    <>
      <section ref={ref} className="relative w-full overflow-hidden bg-white px-6 py-16 md:px-12 md:py-20 lg:px-16">

        {/* Top rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 h-px w-full origin-left bg-[#111111]/10 md:mb-14"
        />

        {/* Editorial heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mx-auto mb-12 max-w-4xl md:mb-16"
        >
          <h2 className="text-[clamp(22px,3.2vw,44px)] font-medium leading-[1.25] tracking-[-0.025em] text-[#111111]">
            Softree is a growing platform of AI, web &amp; Microsoft solutions.
            Get exclusive access to the engineering, design and code behind
            our award-winning work.
          </h2>
        </motion.div>

        {/* Play · Visual · Reel row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="flex cursor-pointer items-center gap-4 sm:gap-8 md:gap-12"
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Play Softree reel"
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
        >
          {/* Left: "Play" */}
          <span className="select-none text-[clamp(52px,10vw,130px)] font-semibold leading-none tracking-[-0.04em] text-[#111111] transition-opacity duration-300 hover:opacity-60">
            Play
          </span>

          {/* Center: video thumbnail */}
          <div className="relative flex-1 overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#111111]">
              <video
                src={REEL_VIDEO}
                poster={REEL_POSTER}
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover opacity-90"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-[clamp(48px,6vw,80px)] w-[clamp(48px,6vw,80px)] items-center justify-center rounded-full bg-white shadow-xl"
                >
                  <svg
                    className="ml-1 h-[clamp(16px,2vw,26px)] w-[clamp(16px,2vw,26px)] text-[#111111]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>

              {/* Bottom-left meta */}
              <div className="absolute bottom-3 left-4 flex items-center gap-3">
                <span className="text-[clamp(11px,1vw,13px)] font-medium text-white/80">
                  Softree in action
                </span>
                <span className="h-3 w-px bg-white/30" />
                <span className="text-[clamp(11px,1vw,13px)] text-white/50">
                  01:12
                </span>
              </div>

              {/* Rotating circle + scribble */}
              <div className="absolute right-4 top-4">
                <RotatingCircle />
                <ScribbleArrow />
              </div>
            </div>

            {/* Horizontal line */}
            <div className="mt-4 h-px w-full bg-[#111111]/10" />
          </div>

          {/* Right: "Reel" */}
          <span className="select-none text-[clamp(52px,10vw,130px)] font-semibold leading-none tracking-[-0.04em] text-[#111111] transition-opacity duration-300 hover:opacity-60">
            Reel
          </span>
        </motion.div>

      </section>

      {/* Lightbox */}
      {open && (
        <ReelModal onClose={() => setOpen(false)} />
      )}
    </>
  )
}
