"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Twitter, Dribbble, Instagram, Send } from "lucide-react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/" },
  { name: "Dribbble", icon: Dribbble, href: "https://dribbble.com/" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/" },
]

export default function LightFooterPro() {
  const footerRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // CTA text reveal
    gsap.from(ctaRef.current, {
      y: 60,
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    })

    // Social links stagger
    gsap.from(socialsRef.current?.querySelectorAll("[data-social]") ?? [], {
      y: 40,
      opacity: 0,
      filter: "blur(8px)",
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: socialsRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    })

    // Footer content reveal
    gsap.from(contentRef.current?.querySelectorAll("[data-reveal]") ?? [], {
      y: 40,
      opacity: 0,
      filter: "blur(6px)",
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    })
  }, { scope: footerRef })

  return (
    <footer ref={footerRef} className="relative w-full bg-[#0a0a1a] text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
          {/* CTA Text */}
          <div ref={ctaRef} className="mb-12 text-center">
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-4 transition-opacity hover:opacity-80"
            >
              {/* Arrow Button */}
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/20 md:h-20 md:w-20">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-20 group-hover:translate-y-20">
                  <Image
                    src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/693967d4d6ddac0a17a84ab9_CTA-Arrow.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 invert"
                  />
                </div>
                <div className="absolute inset-0 flex -translate-x-20 -translate-y-20 items-center justify-center transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0">
                  <Image
                    src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/693967d4d6ddac0a17a84ab9_CTA-Arrow.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 invert"
                  />
                </div>
              </div>

              {/* CTA Text */}
              <span className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                Project In{" "}
                <span className="text-[#1852FF]">Mind?</span>
              </span>
            </Link>
          </div>

          {/* Social Links Grid */}
          <div ref={socialsRef} className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-social
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:border-[#1852FF]/50 hover:bg-[#1852FF]/10"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <social.icon className="h-5 w-5 transition-colors group-hover:text-[#1852FF]" />
                  <span className="text-sm font-medium transition-colors group-hover:text-[#1852FF]">
                    {social.name}
                  </span>
                </div>
                {/* Hover bg */}
                <div className="absolute inset-0 translate-y-full bg-[#1852FF]/10 transition-transform duration-500 group-hover:translate-y-0" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div ref={contentRef} className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left - Logo & Newsletter */}
          <div data-reveal>
            {/* Logo */}
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/69429298f40374aa1883affa_Main-Logo.svg"
                alt="Logo"
                width={140}
                height={40}
                className="h-10 w-auto invert"
              />
            </Link>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-white/60">
              We combine strategy, creativity, and technology to help brands grow in the modern
              digital landscape.
            </p>

            {/* Newsletter Form */}
            <form className="mb-4 max-w-md">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#1852FF] focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1852FF] transition-colors hover:bg-[#0a3acc]"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
            <p className="text-xs text-white/40">
              Success! You&apos;ve been added to our newsletter list. 😊
            </p>
          </div>

          {/* Right - Links */}
          <div data-reveal className="grid grid-cols-2 gap-8 md:grid-cols-3">
            {/* Main Pages */}
            <div>
              <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                Main Pages
              </h6>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-white/70 transition-colors hover:text-white">
                  Home
                </Link>
                <Link href="/about-us" className="text-sm text-white/70 transition-colors hover:text-white">
                  About Us
                </Link>
                <Link href="/services" className="text-sm text-white/70 transition-colors hover:text-white">
                  Services
                </Link>
                <Link href="/projects" className="text-sm text-white/70 transition-colors hover:text-white">
                  Projects
                </Link>
                <Link href="/blogs" className="text-sm text-white/70 transition-colors hover:text-white">
                  Blogs
                </Link>
                <Link href="/contact-us" className="text-sm text-white/70 transition-colors hover:text-white">
                  Contact
                </Link>
              </div>
            </div>

            {/* Utility Pages */}
            <div>
              <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                Utility Pages
              </h6>
              <div className="flex flex-col gap-2">
                <Link href="/401" className="text-sm text-white/70 transition-colors hover:text-white">
                  Password Protected
                </Link>
                <Link href="/utility-pages/license" className="text-sm text-white/70 transition-colors hover:text-white">
                  All Licenses
                </Link>
                <Link href="/404" className="text-sm text-white/70 transition-colors hover:text-white">
                  404
                </Link>
                <Link href="/utility-pages/changelog" className="text-sm text-white/70 transition-colors hover:text-white">
                  Changelog
                </Link>
                <Link href="/utility-pages/style-guide" className="text-sm text-white/70 transition-colors hover:text-white">
                  Style Guide
                </Link>
              </div>
            </div>

            {/* Location & Contact */}
            <div>
              <div className="mb-6">
                <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                  Location
                </h6>
                <p className="text-sm text-white/70">
                  4140 Parker Rd. Allentown, New Mexico 31134
                </p>
              </div>
              <div>
                <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
                  Contact
                </h6>
                <a
                  href="mailto:arooth@email.com"
                  className="mb-1 block text-sm text-white/70 transition-colors hover:text-white"
                >
                  arooth@email.com
                </a>
                <a
                  href="tel:(302)555-0107"
                  className="block text-sm text-white/70 transition-colors hover:text-white"
                >
                  (302) 555-0107
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 py-6 md:px-12">
          <p className="text-center text-xs text-white/40">
            © 2024 Copyright -{" "}
            <Link href="/" className="text-white/60 hover:text-white">
              Arooth
            </Link>{" "}
            | Designed by{" "}
            <a
              href="https://amziro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white"
            >
              Amziro
            </a>{" "}
            |{" "}
            <Link href="/utility-pages/license" className="text-white/60 hover:text-white">
              License
            </Link>{" "}
            | Powered by{" "}
            <a
              href="https://webflow.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white"
            >
              Webflow
            </a>
          </p>
        </div>
      </div>

      {/* Background overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(24,82,255,0.03)_0%,_transparent_50%)]" />
    </footer>
  )
}
