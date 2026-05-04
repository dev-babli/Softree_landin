"use client"

/**
 * LCMidCTA — light clone of SoftreeMidCTA.
 * Re-themed: lifted cream surface, ink text, ink-pill primary CTA, taupe outline secondary,
 * warm logo ticker (logos in their original brand colors over cream).
 */

import { useEffect, useRef } from "react"
import { color, shadow } from "./tokens"

const LOGOS = [
  { name: "Microsoft",  svg: <svg viewBox="0 0 23 23" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="11" height="11" fill="#f25022"/><rect x="12" y="0" width="11" height="11" fill="#7fba00"/><rect x="0" y="12" width="11" height="11" fill="#00a4ef"/><rect x="12" y="12" width="11" height="11" fill="#ffb900"/></svg> },
  { name: "SharePoint", svg: <svg viewBox="0 0 24 24" height="24" fill="#0078d4" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 3A7.5 7.5 0 0 1 22 10.5c0 3.38-2.24 6.25-5.35 7.18A4.5 4.5 0 0 1 12.5 21h-7A4.5 4.5 0 0 1 2 16.5v-1A4.5 4.5 0 0 1 6.5 11h.05A7.5 7.5 0 0 1 14.5 3z"/></svg> },
  { name: "Azure",      svg: <svg viewBox="0 0 18 14" height="22" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 0L0 11.5h4.9L10 2.1 6.5 0zm4.3 1.8L7.4 14H18L10.8 1.8z" fill="#0089d6"/></svg> },
  { name: "Power BI",   svg: <svg viewBox="0 0 24 24" height="24" fill="#f2c811" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="6" width="4" height="15" rx="1"/><rect x="17" y="2" width="4" height="19" rx="1"/></svg> },
  { name: "Power Apps", svg: <svg viewBox="0 0 24 24" height="24" fill="#742774" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/></svg> },
  { name: "Vercel",     svg: <svg viewBox="0 0 116 100" height="20" fill="#141413" xmlns="http://www.w3.org/2000/svg"><path d="M57.5 0L115 100H0L57.5 0z"/></svg> },
  { name: "OpenAI",     svg: <svg viewBox="0 0 24 24" height="22" fill="#141413" xmlns="http://www.w3.org/2000/svg"><path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073z"/></svg> },
  { name: "GitHub",     svg: <svg viewBox="0 0 24 24" height="22" fill="#141413" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  { name: "Salesforce", svg: <svg viewBox="0 0 67 46" height="22" fill="#00A1E0" xmlns="http://www.w3.org/2000/svg"><path d="M27.9 4.8a13.1 13.1 0 019.5-4.1 13.3 13.3 0 0111.9 7.4 9.7 9.7 0 014-.8 9.8 9.8 0 019.8 9.8 9.8 9.8 0 01-9.8 9.8H8.3a8.3 8.3 0 010-16.6 8.3 8.3 0 013.6.8A13.1 13.1 0 0127.9 4.8z"/></svg> },
]

function LogoTicker() {
  const trackRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let x = 0
    let raf = 0
    const tick = () => {
      x -= 0.6
      const totalW = track.scrollWidth / 2
      if (Math.abs(x) >= totalW) x = 0
      track.style.transform = `translateX(${x}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const set = (
    <div className="flex items-center gap-16 px-8 shrink-0">
      {LOGOS.map((l, i) => (
        <div key={i} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <span>{l.svg}</span>
          <span className="text-[13px] font-semibold tracking-wide whitespace-nowrap" style={{ color: color.slate }}>{l.name}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div
      className="w-screen overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <div ref={trackRef} className="flex will-change-transform py-[14px]">
        {set}{set}{set}
      </div>
    </div>
  )
}

export function LCMidCTA() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: color.lifted, borderTop: `1px solid ${color.dustTaupe}`, borderBottom: `1px solid ${color.dustTaupe}` }}>
      {/* warm radial glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[300px] rounded-full opacity-30"
          style={{
            background: `radial-gradient(ellipse at center, ${color.gold} 0%, ${color.cream} 40%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center gap-0 px-5 pt-20 pb-0 md:gap-10 md:px-4 md:pt-[100px] z-10">
        <div className="flex flex-col items-center gap-5 px-0 pb-6 md:gap-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] tracking-widest uppercase rounded-sm"
            style={{ background: color.canvas, border: `1px solid ${color.dustTaupe}`, color: color.slate }}
          >
            <span className="size-1.5 rounded-full inline-block" style={{ background: color.flame }} />
            Your Trusted Global Technology Delivery Partner
          </div>

          <h2 className="text-4xl leading-[1.05] md:text-5xl lg:text-[58px] lg:leading-[1.0] font-black tracking-tight max-w-[760px]" style={{ color: color.ink }}>
            AI. Apps. Microsoft.
            <span style={{ color: color.slate }}> All delivered.</span>
          </h2>
          <p className="max-w-[520px] text-center text-base leading-[1.6] md:text-lg" style={{ color: color.slate }}>
            From intelligent automation to enterprise Microsoft platforms and modern web apps —
            Softree delivers production-grade technology to teams across the globe.
          </p>
        </div>

        <div className="relative z-10 pb-14 md:pb-10 flex items-center gap-4 flex-wrap justify-center">
          <a
            href="/contact"
            className="relative z-10 inline-block px-7 py-3 font-mono text-sm font-bold leading-normal tracking-[-0.28px] transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] rounded-full"
            style={{ background: color.ink, color: color.lifted, boxShadow: shadow.pill }}
          >
            BOOK A DISCOVERY CALL
          </a>
          <a
            href="/services"
            className="relative z-10 inline-block px-7 py-3 font-mono text-sm font-bold leading-normal tracking-[-0.28px] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] rounded-full"
            style={{ background: color.canvas, color: color.ink, border: `1px solid ${color.dustTaupe}` }}
          >
            EXPLORE SERVICES
          </a>
        </div>

        <hr className="w-full" style={{ borderColor: color.dustTaupe }} />
      </div>

      <div className="relative z-10 w-full mt-0">
        <LogoTicker />
      </div>
    </section>
  )
}

export default LCMidCTA
