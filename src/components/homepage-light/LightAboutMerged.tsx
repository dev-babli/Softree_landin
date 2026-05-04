"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Grainient from "./Grainient"

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  delay = 0,
}: {
  value: number
  prefix?: string
  suffix?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  const display = useTransform(spring, (current) => Math.round(current))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setDisplayValue(v))
    return unsubscribe
  }, [display])

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeout = setTimeout(() => {
        spring.set(value)
        setHasAnimated(true)
      }, delay * 1000)
      return () => clearTimeout(timeout)
    }
  }, [isInView, hasAnimated, spring, value, delay])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

function TextReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function WordReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const words = text.split(" ")

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

function AnimatedButton({ href = "/about-us" }: { href?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-[#1a1a1a] px-5 py-2.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-5 overflow-hidden">
        <motion.span
          className="block text-sm font-medium text-white"
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          READ MORE
        </motion.span>
        <motion.span
          className="absolute left-0 top-full block text-sm font-medium text-white"
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          READ MORE
        </motion.span>
      </div>
      <motion.div
        className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20"
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUpRight className="h-3 w-3 text-white" />
      </motion.div>
    </Link>
  )
}

export default function LightAboutMerged() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  const stats = [
    { value: 74, prefix: "$", suffix: "M", label: "Driving growth with strategy." },
    { value: 95, suffix: "%", label: "Building trusted partnerships." },
    { value: 225, prefix: "+", label: "Delivering industry success." },
    { value: 92, suffix: "%", label: "Turning traffic into growth." },
  ]

  return (
    <section ref={containerRef} id="about-us" className="w-full bg-[#F8F9FC] py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Top Section - Award Count & Content */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left - Award Count */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1852FF]/20 bg-[#eef4ff] px-4 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-2 w-2 rounded-full bg-[#1852FF]" />
              <span className="text-sm font-medium text-[#1852FF]">About Us</span>
            </motion.div>

            {/* Award Count */}
            <div className="relative">
              <motion.span
                className="text-[120px] font-bold leading-none tracking-tighter text-[#0a0a1a] md:text-[160px] lg:text-[180px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatedNumber value={40} delay={0.5} />
                <span className="text-[#1852FF]">+</span>
              </motion.span>

              {/* Arrows */}
              <motion.div
                className="absolute -right-4 top-4 md:-right-8 md:top-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="relative">
                  <div className="absolute -left-16 -top-8 flex items-center gap-2">
                    <span className="text-xs font-medium text-[#0a0a1a]/70">Worldwide</span>
                    <Image
                      src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f33702cc97b2f28589225_Award-Arrow-One.png"
                      alt=""
                      width={60}
                      height={30}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-8 -right-8 flex items-center gap-2">
                    <Image
                      src="https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/691f33700369e38aee50c1d5_Award-Arrow-Two.png"
                      alt=""
                      width={60}
                      height={30}
                      className="h-8 w-auto object-contain"
                    />
                    <span className="text-xs font-medium text-[#0a0a1a]/70">Awards Won</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="flex flex-col justify-center lg:border-l lg:border-[#0a0a1a]/10 lg:pl-16"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <TextReveal delay={0.3}>
              <h3 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-[#0a0a1a] md:text-3xl lg:text-4xl">
                We collaborate with forward-thinking brands.
              </h3>
            </TextReveal>
            <WordReveal
              text="Our team of designers, developers, and thinkers driven by one purpose — to craft digital experiences that matter."
              delay={0.4}
              className="mb-6 text-2xl font-semibold leading-tight text-[#1852FF] md:text-3xl"
            />
            <TextReveal delay={0.6}>
              <p className="mb-8 text-base leading-relaxed text-[#0a0a1a]/70">
                We combine strategy, creativity, and technology to help brands grow in the modern
                digital landscape. Every project we take on is fueled by curiosity, guided by precision.
              </p>
            </TextReveal>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <AnimatedButton />
            </motion.div>
          </motion.div>
        </div>

        {/* Mission / Vision Grainient Cards */}
        <motion.div
          className="mb-16 flex h-[300px] gap-4 lg:h-[400px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Mission */}
          <motion.div
            className="relative cursor-pointer overflow-hidden rounded-2xl"
            initial={false}
            animate={{
              flex: hoveredImage === 0 ? 1.5 : hoveredImage === 1 ? 0.67 : 0.67,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            onMouseEnter={() => setHoveredImage(0)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <Grainient
              color1="#C8E0FF"
              color2="#5C9DFF"
              color3="#E8F2FF"
              timeSpeed={0.2}
              colorBalance={-0.12}
              warpStrength={1.2}
              warpFrequency={4.2}
              warpSpeed={1.35}
              warpAmplitude={44}
              blendAngle={-18}
              blendSoftness={0.08}
              rotationAmount={420}
              noiseScale={2.4}
              grainAmount={0.12}
              grainScale={2.2}
              grainAnimated
              contrast={1.38}
              saturation={1.12}
              zoom={0.86}
              className="absolute inset-0 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.58))]" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white md:p-8 lg:p-10">
              <div className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Mission
              </div>
              <div className="max-w-[520px]">
                <h4 className="text-3xl font-bold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                  Build systems that move businesses forward.
                </h4>
                <p className="mt-4 max-w-[430px] text-sm font-medium leading-relaxed text-white/78 md:text-base">
                  We turn complex operations into intelligent software — combining strategy, design, AI, and engineering into measurable outcomes.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="relative cursor-pointer overflow-hidden rounded-2xl"
            initial={false}
            animate={{
              flex: hoveredImage === 1 ? 1.5 : hoveredImage === 0 ? 0.67 : 1,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            onMouseEnter={() => setHoveredImage(1)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <Grainient
              color1="#C2DDFF"
              color2="#66B2FF"
              color3="#E0EFFF"
              timeSpeed={0.18}
              colorBalance={-0.05}
              warpStrength={1.0}
              warpFrequency={5.6}
              warpSpeed={1.15}
              warpAmplitude={52}
              blendAngle={22}
              blendSoftness={0.06}
              rotationAmount={520}
              noiseScale={2.0}
              grainAmount={0.1}
              grainScale={2.4}
              grainAnimated
              contrast={1.45}
              saturation={1.08}
              centerX={0.08}
              centerY={-0.04}
              zoom={0.9}
              className="absolute inset-0 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_30%),linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.62))]" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white md:p-8 lg:p-10">
              <div className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Vision
              </div>
              <div className="max-w-[560px]">
                <h4 className="text-3xl font-bold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                  Become the enterprise partner for AI-native growth.
                </h4>
                <p className="mt-4 max-w-[450px] text-sm font-medium leading-relaxed text-white/78 md:text-base">
                  Our vision is to help ambitious teams modernize faster, automate smarter, and operate with software that compounds in value.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="border-t border-[#0a0a1a]/10 pt-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`relative ${index < stats.length - 1 ? "lg:border-r lg:border-[#0a0a1a]/10" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="p-4 first:pl-0 lg:px-8 lg:p-0">
                  {/* Animated Number */}
                  <div className="mb-2 text-4xl font-bold text-[#0a0a1a] lg:text-5xl">
                    <AnimatedNumber
                      value={stat.value}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                      delay={0.3 + index * 0.2}
                    />
                  </div>

                  {/* Label with fade in */}
                  <motion.p
                    className="text-sm text-[#0a0a1a]/60"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    {stat.label}
                  </motion.p>

                  {/* Animated underline accent */}
                  <motion.div
                    className="mt-3 h-0.5 origin-left bg-[#1852FF]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Stats Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Our Approach */}
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Grainient
              color1="#C8E0FF"
              color2="#5CA8FF"
              color3="#EFF6FF"
              timeSpeed={0.22}
              colorBalance={-0.08}
              warpStrength={1.4}
              warpFrequency={4.8}
              warpSpeed={1.6}
              warpAmplitude={40}
              blendAngle={12}
              blendSoftness={0.1}
              rotationAmount={380}
              noiseScale={2.6}
              grainAmount={0.14}
              grainScale={1.8}
              grainAnimated
              contrast={1.42}
              saturation={1.15}
              centerY={0.06}
              zoom={0.88}
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.18),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.16),rgba(0,0,0,0.54))]" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white md:p-8">
              <div className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Our Approach
              </div>
              <div>
                <h4 className="text-2xl font-bold leading-[0.95] tracking-[-0.04em] md:text-3xl">
                  Senior teams that ship.
                </h4>
                <p className="mt-3 max-w-[340px] text-sm font-medium leading-relaxed text-white/78">
                  Small senior teams, weekly demos, and a roadmap that changes when the evidence does.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {/* 95% */}
            <motion.div
              className="rounded-2xl bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-2 flex items-baseline">
                <span className="text-5xl font-bold text-[#1852FF] md:text-6xl">
                  <AnimatedNumber value={95} delay={0.5} />
                </span>
                <span className="text-5xl font-bold text-[#1852FF] md:text-6xl">%</span>
              </div>
              <p className="text-sm text-[#0a0a1a]/70">Clients Satisfied and Repeating</p>
            </motion.div>

            {/* 125+ */}
            <motion.div
              className="rounded-2xl bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-2 flex items-baseline">
                <span className="text-5xl font-bold text-[#0a0a1a] md:text-6xl">
                  <AnimatedNumber value={125} delay={0.6} />
                </span>
                <span className="text-5xl font-bold text-[#1852FF] md:text-6xl">+</span>
              </div>
              <p className="text-sm text-[#0a0a1a]/70">Projects Completed In 24 Countries</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
