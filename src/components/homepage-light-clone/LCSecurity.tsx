"use client"

/**
 * LCSecurity — light clone of optimus/landing/security-section.
 * Re-themed: cream canvas, ink text, warm flame/gold gradient accents.
 */

import { useEffect, useState, useRef } from "react"
import { color } from "./tokens"

const ShieldIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <defs>
      <linearGradient id="lc-shieldGrad" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor={color.flame} />
        <stop offset="1" stopColor={color.sunshine} />
      </linearGradient>
    </defs>
    <path d="M20 4L6 10v11.78c0 8.25 6.45 16 15 18.22 8.55-2.22 15-9.97 15-18.22V10L20 4z" fill="url(#lc-shieldGrad)" fillOpacity="0.18" stroke="url(#lc-shieldGrad)" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M14 20l4.5 4.5L27 15" stroke={color.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const LockIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <defs>
      <linearGradient id="lc-lockGrad" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor={color.sunshine} />
        <stop offset="1" stopColor={color.mistral} />
      </linearGradient>
    </defs>
    <rect x="9" y="17" width="22" height="17" rx="4" fill="url(#lc-lockGrad)" fillOpacity="0.18" stroke="url(#lc-lockGrad)" strokeWidth="2.5" />
    <path d="M13 17v-6a7 7 0 1114 0v6" stroke="url(#lc-lockGrad)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="20" cy="25.5" r="2.5" fill={color.ink} />
  </svg>
)

const EyeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <defs>
      <linearGradient id="lc-eyeGrad" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor={color.flame} />
        <stop offset="1" stopColor={color.yellow} />
      </linearGradient>
    </defs>
    <path d="M3 20s6-11 17-11 17 11 17 11-6 11-17 11S3 20 3 20z" fill="url(#lc-eyeGrad)" fillOpacity="0.15" stroke="url(#lc-eyeGrad)" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="20" cy="20" r="5" fill={color.lifted} stroke="url(#lc-eyeGrad)" strokeWidth="2.5" />
  </svg>
)

const DocIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <defs>
      <linearGradient id="lc-docGrad" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor={color.gold} />
        <stop offset="1" stopColor={color.flame} />
      </linearGradient>
    </defs>
    <path d="M25 5H10a2.5 2.5 0 00-2.5 2.5v25A2.5 2.5 0 0010 35h20a2.5 2.5 0 002.5-2.5V12.5L25 5z" fill="url(#lc-docGrad)" fillOpacity="0.15" stroke="url(#lc-docGrad)" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M25 5v7.5h7.5" stroke="url(#lc-docGrad)" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M15 24h10M15 18h4" stroke={color.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const features = [
  { Icon: ShieldIcon, title: "SOC 2 Type II", description: "Independently audited security controls with continuous monitoring." },
  { Icon: LockIcon, title: "End-to-end encryption", description: "AES-256 encryption for data at rest and TLS 1.3 in transit." },
  { Icon: EyeIcon, title: "Zero-trust architecture", description: "Every request is authenticated and authorized. No exceptions." },
  { Icon: DocIcon, title: "GDPR & HIPAA", description: "Full compliance with data protection and healthcare regulations." },
]

const certifications = ["SOC 2", "ISO 27001", "HIPAA", "GDPR", "CCPA"]

export function LCSecurity() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) o.observe(sectionRef.current)
    return () => o.disconnect()
  }, [])

  return (
    <section id="security" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden" style={{ background: color.canvas, color: color.ink }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="inline-flex items-center gap-3 text-sm font-mono mb-6" style={{ color: color.flame }}>
              <span className="w-8 h-[2px]" style={{ background: `linear-gradient(90deg, ${color.flame}, ${color.sunshine})` }} />
              ENTERPRISE SECURITY
            </span>
            <h2 className="text-4xl lg:text-6xl font-medium tracking-tight mb-8" style={{ color: color.ink }}>
              Trust is
              <br />
              non-negotiable.
            </h2>
            <p className="text-xl leading-relaxed mb-12 max-w-md" style={{ color: color.slate }}>
              Enterprise-grade security isn&apos;t optional. It&apos;s built into every layer of our platform, from infrastructure to application.
            </p>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, index) => (
                <span
                  key={cert}
                  className={`px-4 py-2 text-xs font-mono transition-all duration-500 rounded-sm ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ background: color.lifted, border: `1px solid ${color.dustTaupe}`, color: color.slate, transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 rounded-xl transition-all duration-500 group ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                style={{
                  background: color.lifted,
                  border: `1px solid ${color.dustTaupe}`,
                  boxShadow: "rgba(127, 99, 21, 0.08) 0px 8px 24px",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex flex-col items-start gap-5">
                  <div className="shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <feature.Icon />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2" style={{ color: color.ink }}>{feature.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: color.slate }}>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LCSecurity
