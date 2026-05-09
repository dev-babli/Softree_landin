"use client"

import { useEffect, useRef } from "react"
import Grainient from "@/components/ui/Grainient"

/* ── Scrolling logo ticker ─────────────────────────────────────── */

const LOGOS = [
  { name: "Microsoft",   svg: <svg viewBox="0 0 23 23" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="11" height="11" fill="#f25022"/><rect x="12" y="0" width="11" height="11" fill="#7fba00"/><rect x="0" y="12" width="11" height="11" fill="#00a4ef"/><rect x="12" y="12" width="11" height="11" fill="#ffb900"/></svg> },
  { name: "SharePoint",  svg: <svg viewBox="0 0 24 24" height="24" fill="#0078d4" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 3A7.5 7.5 0 0 1 22 10.5c0 3.38-2.24 6.25-5.35 7.18A4.5 4.5 0 0 1 12.5 21h-7A4.5 4.5 0 0 1 2 16.5v-1A4.5 4.5 0 0 1 6.5 11h.05A7.5 7.5 0 0 1 14.5 3z"/></svg> },
  { name: "Azure",       svg: <svg viewBox="0 0 18 14" height="22" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 0L0 11.5h4.9L10 2.1 6.5 0zm4.3 1.8L7.4 14H18L10.8 1.8z" fill="#0089d6"/></svg> },
  { name: "Power BI",    svg: <svg viewBox="0 0 24 24" height="24" fill="#f2c811" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="6" width="4" height="15" rx="1"/><rect x="17" y="2" width="4" height="19" rx="1"/></svg> },
  { name: "Power Apps",  svg: <svg viewBox="0 0 24 24" height="24" fill="#742774" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"/></svg> },
  { name: "Vercel",      svg: <svg viewBox="0 0 116 100" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M57.5 0L115 100H0L57.5 0z"/></svg> },
  { name: "Next.js",     svg: <svg viewBox="0 0 24 24" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.isti.595 3.56-1.032 6.681-3.461 8.743-7.054.254-.47.266-.543.266-1.192 0-.575-.009-.67-.108-1.036a11.875 11.875 0 00-5.242-2.119c-.659-.096-.854-.108-1.748-.108s-1.088.012-1.748.108a11.92 11.92 0 00-9.695 8.209 11.762 11.762 0 00-.525 2.534c-.04.363-.04 1.935 0 2.299.224 2.047 1.01 3.9 2.224 5.35A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0h-.428z" fillRule="evenodd" clipRule="evenodd"/></svg> },
  { name: "OpenAI",      svg: <svg viewBox="0 0 24 24" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0L4.006 14.15a4.5 4.5 0 01-1.666-6.254zm16.597 3.855l-5.843-3.369 2.02-1.168a.073.073 0 01.071 0l4.816 2.778a4.5 4.5 0 01-.692 8.115v-5.68a.79.79 0 00-.372-.676zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.815-2.772a4.5 4.5 0 016.675 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08L8.704 5.46a.795.795 0 00-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg> },
  { name: "GitHub",      svg: <svg viewBox="0 0 24 24" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
  { name: "Python",      svg: <svg viewBox="0 0 24 24" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.89S0 5.789 0 11.969c0 6.18 3.403 5.961 3.403 5.961h2.032v-2.867s-.109-3.404 3.35-3.404h5.764s3.24.052 3.24-3.13V3.19S18.342 0 11.914 0zM8.708 1.84a1.047 1.047 0 110 2.094 1.047 1.047 0 010-2.094z" fill="#366994"/><path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H12v-.826h8.13S24 18.211 24 12.031c0-6.18-3.403-5.961-3.403-5.961h-2.032v2.867s.109 3.404-3.35 3.404H9.451s-3.24-.052-3.24 3.13V20.81S5.658 24 12.086 24zm3.206-1.84a1.047 1.047 0 110-2.094 1.047 1.047 0 010 2.094z" fill="#ffc331"/></svg> },
  { name: "Salesforce",  svg: <svg viewBox="0 0 67 46" height="22" fill="#00A1E0" xmlns="http://www.w3.org/2000/svg"><path d="M27.9 4.8a13.1 13.1 0 019.5-4.1 13.3 13.3 0 0111.9 7.4 9.7 9.7 0 014-.8 9.8 9.8 0 019.8 9.8 9.8 9.8 0 01-9.8 9.8H8.3a8.3 8.3 0 010-16.6 8.3 8.3 0 013.6.8A13.1 13.1 0 0127.9 4.8z"/></svg> },
]

function LogoTicker() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let x = 0
    let raf = 0
    const speed = 0.6

    const tick = () => {
      x -= speed
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
        <div key={i} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-white [&_svg]:fill-white [&_svg]:opacity-80">{l.svg}</span>
          <span className="text-white/70 text-[13px] font-semibold tracking-wide whitespace-nowrap">{l.name}</span>
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

/* ── Main CTA component ────────────────────────────────────────── */
export function SoftreeMidCTA() {
  return (
    <section className="relative w-full bg-[#0a0a0a] border-y border-[#2c2c2c] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen md:opacity-60">
        <Grainient
          color1="#c8eeff"
          color2="#5ab8f5"
          color3="#1a27d4"
          timeSpeed={0.25}
          colorBalance={0.0}
          warpStrength={1.0}
          warpFrequency={5.0}
          warpSpeed={2.0}
          warpAmplitude={50.0}
          blendAngle={0.0}
          blendSoftness={0.05}
          rotationAmount={500.0}
          noiseScale={2.0}
          grainAmount={0.1}
          grainScale={2.0}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.0}
          saturation={1.0}
          centerX={0.0}
          centerY={0.0}
          zoom={0.9}
        />
      </div>

      {/* Radial glow centre */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[300px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(90,184,245,0.4) 0%, rgba(26,39,212,0.2) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center gap-0 px-5 pt-20 pb-0 md:gap-10 md:px-4 md:pt-[100px] z-10">

        {/* Text block */}
        <div className="flex flex-col items-center gap-5 px-0 pb-6 md:gap-6 text-center">
          {/* Brand tag */}
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#2c2c2c] px-3 py-1.5 font-mono text-[11px] tracking-widest text-[#a3a3a3] uppercase rounded-sm">
            <span className="size-1.5 rounded-full bg-[#ff4500] inline-block" />
            Your Trusted Global Technology Delivery Partner
          </div>

          <div className="flex flex-col items-center gap-3 md:gap-4">
            <h2 className="font-sans text-4xl text-white leading-[1.05] md:text-5xl lg:text-[58px] lg:leading-[1.0] font-black tracking-tight max-w-[760px]">
              AI. Apps. Microsoft.
              <span className="text-white/35"> All delivered.</span>
            </h2>
          </div>
          <p className="max-w-[520px] text-center font-sans text-base text-white/45 leading-[1.6] md:text-lg">
            From intelligent automation to enterprise Microsoft platforms and modern web apps —
            Softree delivers production-grade technology to teams across the globe.
          </p>
        </div>

        {/* CTAs */}
        <div className="relative z-10 pb-14 md:pb-10 flex items-center gap-4 flex-wrap justify-center">
          <a
            href="/contact"
            className="relative z-10 inline-block px-7 py-3 font-mono text-white text-sm font-bold leading-normal tracking-[-0.28px] transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] rounded-sm shadow-[0_0_20px_rgba(255,69,0,0.3)]"
            style={{ background: "linear-gradient(135deg, #f5b99a 0%, #ff6b35 50%, #ff4500 100%)" }}
          >
            BOOK A DISCOVERY CALL
          </a>
          <a
            href="/services"
            className="relative z-10 inline-block border border-[#2c2c2c] bg-[#1a1a1a] px-7 py-3 font-mono text-white text-sm font-bold leading-normal tracking-[-0.28px] transition-all duration-200 hover:border-[#4a4a4a] hover:bg-[#222] hover:scale-[1.03] active:scale-[0.97] rounded-sm"
          >
            EXPLORE SERVICES
          </a>
        </div>

        {/* Divider */}
        <hr className="w-full border-[#2c2c2c]" />
      </div>

      {/* Logo ticker — full width, inverted colours */}
      <div className="relative z-10 w-full mt-0">
        <LogoTicker />
      </div>
    </section>
  )
}
