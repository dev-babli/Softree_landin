"use client";

import { useEffect, useState, useRef } from "react";

// --- Custom Colorful Icons ---
const ShieldIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00f2fe" />
        <stop offset="1" stopColor="#4facfe" />
      </linearGradient>
      <filter id="glowShield" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <path d="M20 4L6 10v11.78c0 8.25 6.45 16 15 18.22 8.55-2.22 15-9.97 15-18.22V10L20 4z" fill="url(#shieldGrad)" fillOpacity="0.2" stroke="url(#shieldGrad)" strokeWidth="2.5" strokeLinejoin="round" filter="url(#glowShield)"/>
    <path d="M14 20l4.5 4.5L27 15" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lockGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f5b99a" />
        <stop offset="1" stopColor="#ff4500" />
      </linearGradient>
      <filter id="glowLock" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect x="9" y="17" width="22" height="17" rx="4" fill="url(#lockGrad)" fillOpacity="0.2" stroke="url(#lockGrad)" strokeWidth="2.5" filter="url(#glowLock)"/>
    <path d="M13 17v-6a7 7 0 1114 0v6" stroke="url(#lockGrad)" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="20" cy="25.5" r="2.5" fill="#fff"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="eyeGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#c471ed" />
        <stop offset="1" stopColor="#12c2e9" />
      </linearGradient>
      <filter id="glowEye" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <path d="M3 20s6-11 17-11 17 11 17 11-6 11-17 11S3 20 3 20z" fill="url(#eyeGrad)" fillOpacity="0.15" stroke="url(#eyeGrad)" strokeWidth="2.5" strokeLinejoin="round" filter="url(#glowEye)"/>
    <circle cx="20" cy="20" r="5" fill="#fff" stroke="url(#eyeGrad)" strokeWidth="2.5"/>
  </svg>
);

const DocIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="docGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0ba360" />
        <stop offset="1" stopColor="#3cba92" />
      </linearGradient>
      <filter id="glowDoc" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <path d="M25 5H10a2.5 2.5 0 00-2.5 2.5v25A2.5 2.5 0 0010 35h20a2.5 2.5 0 002.5-2.5V12.5L25 5z" fill="url(#docGrad)" fillOpacity="0.15" stroke="url(#docGrad)" strokeWidth="2.5" strokeLinejoin="round" filter="url(#glowDoc)"/>
    <path d="M25 5v7.5h7.5" stroke="url(#docGrad)" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M15 24h10M15 18h4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const securityFeatures = [
  {
    Icon: ShieldIcon,
    title: "SOC 2 Type II",
    description: "Independently audited security controls with continuous monitoring.",
  },
  {
    Icon: LockIcon,
    title: "End-to-end encryption",
    description: "AES-256 encryption for data at rest and TLS 1.3 in transit.",
  },
  {
    Icon: EyeIcon,
    title: "Zero-trust architecture",
    description: "Every request is authenticated and authorized. No exceptions.",
  },
  {
    Icon: DocIcon,
    title: "GDPR & HIPAA",
    description: "Full compliance with data protection and healthcare regulations.",
  },
];

const certifications = ["SOC 2", "ISO 27001", "HIPAA", "GDPR", "CCPA"];

export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="security" ref={sectionRef} className="relative py-24 lg:py-32 bg-[#0a0a0a] overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-[#f5b99a] mb-6">
              <span className="w-8 h-[2px] bg-gradient-to-r from-[#f5b99a] to-[#ff4500]" />
              ENTERPRISE SECURITY
            </span>
            <h2 className="text-4xl lg:text-6xl font-medium tracking-tight mb-8 text-white">
              Trust is
              <br />
              non-negotiable.
            </h2>
            <p className="text-xl text-white/60 leading-relaxed mb-12 max-w-md">
              Enterprise-grade security isn&apos;t optional. It&apos;s built into every layer 
              of our platform, from infrastructure to application.
            </p>

            {/* Certifications - Mono Tags */}
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, index) => (
                <span
                  key={cert}
                  className={`px-4 py-2 bg-[#1a1a1a] border border-[#2c2c2c] text-[#a3a3a3] text-xs font-mono transition-all duration-500 rounded-sm ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Glassmorphic Features */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 bg-[#111] border border-[#2c2c2c] rounded-xl hover:bg-[#151515] hover:border-[#3c3c3c] transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-start gap-5">
                  <div className="shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <feature.Icon />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
