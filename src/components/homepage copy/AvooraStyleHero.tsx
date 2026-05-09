"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

/* ────────────── Animated rotating text ────────────── */
function TextCycle() {
  const words = ["Scale", "Impact", "Velocity", "Intelligence", "Results"]
  const [i, setI] = useState(0)
  const [anim, setAnim] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setAnim(true)
      setTimeout(() => {
        setI((p) => (p + 1) % words.length)
        setAnim(false)
      }, 280)
    }, 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="relative inline-block min-w-[140px] text-[#FF5812]">
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={
          anim
            ? { opacity: 0, y: -20, filter: "blur(8px)" }
            : { opacity: 1, y: 0, filter: "blur(0px)" }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="inline-block"
      >
        {words[i]}
      </motion.span>
      <motion.span
        className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-current"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ originX: 0 }}
      />
    </span>
  )
}

/* ────────────── Marquee with Softree client logos ────────────── */
function BrandMarquee() {
  const brands = [
    "/images/kfc-logo1.svg",
    "/images/kpmg-logo-1.svg",
    "/images/dominose-logo.svg",
    "/images/bcg-logo-1.svg",
    "/images/google-logo-1.svg",
    "/images/americana-logo1.svg",
    "/images/inventiv-ai.svg",
    "/images/appi-blue-wht-logo.svg",
  ]

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
      <motion.div
        className="flex items-center gap-14"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 32, ease: "linear" } }}
      >
        {[...brands, ...brands].map((src, i) => (
          <div
            key={i}
            className="relative h-10 w-32 flex-shrink-0 opacity-60 transition-opacity hover:opacity-100"
          >
            <img
              src={src}
              alt="Client logo"
              className="h-full w-full object-contain [filter:brightness(0)_invert(1)]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ────────────── Animated CTA ────────────── */
function AnimatedButton({ href = "/contact", label = "BOOK A CALL" }: { href?: string; label?: string }) {
  const [hover, setHover] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-sm"
    >
      <div className="relative h-5 overflow-hidden">
        <motion.span
          className="block text-sm font-medium text-white"
          animate={{ y: hover ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {label}
        </motion.span>
        <motion.span
          className="absolute left-0 top-full block text-sm font-medium text-white"
          animate={{ y: hover ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {label}
        </motion.span>
      </div>
      <ArrowUpRight className="h-4 w-4 text-[#FF5812] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  )
}

/* ────────────── Service card ────────────── */
function ServiceCard({
  number,
  title,
  image,
  href = "#",
}: {
  number: string
  title: string
  image: string
  href?: string
}) {
  const [hover, setHover] = useState(false)
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/0 ring-1 ring-white/10">
        <motion.img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          animate={{ scale: hover ? 1.08 : 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end gap-1 p-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-full rounded-lg bg-black/40 backdrop-blur-sm"
              initial={{ height: 0 }}
              animate={{ height: hover ? 12 + i * 4 : 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 text-white/80">
        <span className="text-xs font-medium text-white/50">({number})</span>
        <span className="text-sm font-medium transition-colors group-hover:text-white">{title}</span>
      </div>
    </Link>
  )
}

/* ────────────── Social icon ────────────── */
function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
    >
      {children}
    </a>
  )
}

export default function AvooraStyleHero() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    { number: "01", title: "AI & Automation", image: "/images/ai.png", href: "/services/ai-intelligence" },
    { number: "02", title: "Web Development", image: "/images/web.png", href: "/services/digital-workspace" },
    { number: "03", title: "Mobile Apps", image: "/images/mobile.png", href: "/services/mobile-apps" },
    { number: "04", title: "Data & Analytics", image: "/images/data.png", href: "/services/data-analytics" },
    { number: "05", title: "Power Platform", image: "/images/power.png", href: "/services/business-applications" },
  ]

  const avatars = [
    "/images/testimonial-avatar-1.jpg",
    "/images/testimonial-avatar-2.jpg",
    "/images/testimonial-avatar-3.jpg",
    "/images/professional-man-avatar-with-beard-and-glasses-loo.jpg",
    "/images/professional-woman-avatar-with-short-brown-hair-an.jpg",
  ]

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <motion.div
        className="flex w-full items-start justify-between px-6 py-6 lg:px-12"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white lg:text-5xl">
            Softree<span className="align-super text-sm">®</span>
          </h1>
          <h1 className="text-3xl font-bold tracking-tight text-white lg:text-5xl">_Technology</h1>
        </div>

        {/* Profile card + CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2 pr-4 backdrop-blur-sm">
            <Image
              src="/images/professional-man-avatar-with-beard-and-glasses-loo.jpg"
              alt="Sarthak, Founder"
              width={48}
              height={48}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div>
              <div className="text-sm font-medium text-white">Sarthak Sharma</div>
              <div className="text-xs text-white/60">Founder & CEO</div>
            </div>
          </div>
          <AnimatedButton />
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="mb-6 -mt-4 w-full px-6 lg:px-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* Hero content card */}
      <div className="relative w-full px-6 pb-8 lg:px-12">
        <motion.div
          className="relative w-full overflow-hidden rounded-3xl"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Background video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              poster="/images/hero-main.png"
            >
              <source src="/Hero/hero.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1226]/70 via-[#122436]/50 to-[#FF5812]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex min-h-[600px] flex-col justify-between p-6 lg:min-h-[700px] lg:p-12">
            <div className="flex flex-col justify-between gap-8 lg:flex-row">
              {/* Left */}
              <div className="flex flex-col gap-6">
                {/* Avatars */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {avatars.map((a, i) => (
                      <motion.div
                        key={i}
                        className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#0a0a0a]"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      >
                        <img src={a} alt="" className="h-full w-full object-cover" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-xs text-white/70">
                    <div className="font-semibold text-white">200+ enterprise teams</div>
                    <div>ship faster with Softree</div>
                  </div>
                </div>

                {/* Headline */}
                <motion.div
                  className="max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-semibold leading-tight text-white lg:text-4xl xl:text-[42px]">
                    We engineer AI, Web &amp; Data products for <TextCycle />
                  </h2>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70 lg:text-base">
                    Softree is a full-stack product studio — building agentic AI systems, premium web
                    platforms and Microsoft-grade business applications for global enterprises.
                  </p>
                </motion.div>
              </div>

              {/* Right — socials */}
              <div className="flex flex-col items-end gap-6">
                <div className="hidden flex-col gap-2 lg:flex">
                  <SocialIcon href="https://instagram.com" label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 23 23" fill="currentColor">
                      <path d="M16.6957 0H5.56522C2.49322 0 0 2.49322 0 5.56522V16.6957C0 19.7677 2.49322 22.2609 5.56522 22.2609H16.6957C19.7677 22.2609 22.2609 19.7677 22.2609 16.6957V5.56522C22.2609 2.49322 19.7677 0 16.6957 0ZM11.1304 16.6957C8.05844 16.6957 5.56522 14.2024 5.56522 11.1304C5.56522 8.05844 8.05844 5.56522 11.1304 5.56522C14.2024 5.56522 16.6957 8.05844 16.6957 11.1304C16.6957 14.2024 14.2024 16.6957 11.1304 16.6957ZM17.0852 6.2553C16.473 6.2553 15.9722 5.75444 15.9722 5.14226C15.9722 4.53009 16.473 4.02922 17.0852 4.02922C17.6974 4.02922 18.1983 4.53009 18.1983 5.14226C18.1983 5.75444 17.6974 6.2553 17.0852 6.2553Z" />
                      <path d="M11.1301 14.4703C12.9743 14.4703 14.4693 12.9753 14.4693 11.1311C14.4693 9.28697 12.9743 7.79199 11.1301 7.79199C9.286 7.79199 7.79102 9.28697 7.79102 11.1311C7.79102 12.9753 9.286 14.4703 11.1301 14.4703Z" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon href="https://linkedin.com" label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 23 23" fill="currentColor">
                      <path d="M22.2611 22.261V14.108C22.2611 10.101 21.3985 7.04016 16.7237 7.04016C14.4698 7.04016 12.9672 8.26451 12.355 9.4332H12.2993V7.4019H7.875V22.261H12.4941V14.8871C12.4941 12.9393 12.8559 11.0749 15.2489 11.0749C17.6141 11.0749 17.6419 13.2732 17.6419 14.9984V22.2332H22.2611V22.261Z" />
                      <path d="M0.361328 7.40149H4.98045V22.2606H0.361328V7.40149Z" />
                      <path d="M2.6713 0C1.19652 0 0 1.19652 0 2.6713C0 4.14608 1.19652 5.37043 2.6713 5.37043C4.14608 5.37043 5.3426 4.14608 5.3426 2.6713C5.3426 1.19652 4.14608 0 2.6713 0Z" />
                    </svg>
                  </SocialIcon>
                  <SocialIcon href="https://x.com" label="X">
                    <svg width="18" height="18" viewBox="0 0 23 23" fill="currentColor">
                      <path d="M13.2036 9.42559L21.3125 -0.000366211H19.391L12.35 8.18406L6.72639 -0.000366211H0.240234L8.74423 12.3759L0.240234 22.2605H2.1619L9.59734 13.6175L15.5363 22.2605H22.0224L13.2031 9.42559H13.2036ZM10.5716 12.485L9.70999 11.2526L2.8543 1.44623H5.80586L11.3385 9.36026L12.2001 10.5927L19.3919 20.8797H16.4403L10.5716 12.4854V12.485Z" />
                    </svg>
                  </SocialIcon>
                </div>
              </div>
            </div>

            {/* Services grid */}
            <motion.div
              className="mt-auto pt-12"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="mb-4 flex items-end justify-between">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                  What we build
                </div>
                <Link
                  href="/services"
                  className="hidden items-center gap-1 text-xs font-medium text-white/70 hover:text-white lg:flex"
                >
                  All services <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                {services.map((s, i) => (
                  <motion.div
                    key={s.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                  >
                    <ServiceCard {...s} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile CTA block */}
        <div className="mt-6 flex flex-col gap-4 lg:hidden">
          <p className="text-sm text-white/60">
            We help enterprises ship AI-native, conversion-ready digital products — end to end.
          </p>
          <AnimatedButton />
        </div>
      </div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <BrandMarquee />
      </motion.div>
    </section>
  )
}
