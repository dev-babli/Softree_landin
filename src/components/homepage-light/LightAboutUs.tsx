"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"

// Slot Machine / Odometer Counter Component
function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  delay = 0
}: {
  value: number
  prefix?: string
  suffix?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Format the final display value
  const finalDisplay = `${prefix}${value}${suffix}`
  const chars = finalDisplay.split("")

  return (
    <div ref={ref} className="flex items-center overflow-hidden">
      {chars.map((char, i) => {
        const isDigit = /\d/.test(char)

        if (!isDigit) {
          return (
            <motion.span
              key={i}
              className="text-4xl lg:text-5xl font-bold text-[#141413]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: delay + i * 0.1 }}
            >
              {char}
            </motion.span>
          )
        }

        return (
          <DigitSlot
            key={i}
            finalDigit={parseInt(char)}
            delay={delay + i * 0.1}
            isInView={isInView}
          />
        )
      })}
    </div>
  )
}

// Individual digit slot that scrolls through numbers
function DigitSlot({ finalDigit, delay, isInView }: { finalDigit: number; delay: number; isInView: boolean }) {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div className="relative h-[1em] w-[0.6em] overflow-hidden">
      <motion.div
        className="flex flex-col"
        initial={{ y: "0%" }}
        animate={isInView ? { y: `-${finalDigit * 10}%` } : {}}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94], // Ease out quad
        }}
      >
        {digits.map((digit) => (
          <span
            key={digit}
            className="text-4xl lg:text-5xl font-bold text-[#141413] flex items-center justify-center h-[1em]"
          >
            {digit}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

// Animated Button with text slide
function AnimatedButton({ href = "/about" }: { href?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] rounded-lg overflow-hidden group"
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
          className="absolute top-full left-0 block text-sm font-medium text-white"
          animate={{ y: isHovered ? "-100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          READ MORE
        </motion.span>
      </div>
      <div className="relative w-3 h-3 overflow-hidden">
        <motion.svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          className="absolute"
          animate={{ x: isHovered ? "250%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <path d="M9.61648 5.8006L0.360093 0.0358623C0.250469 -0.0329162 0.105835 0.000195883 0.0370565 0.109843C0.0155525 0.144118 0.00328985 0.183378 0.0014624 0.223799C-0.000365041 0.264221 0.00830504 0.304427 0.0266285 0.340503L2.85674 5.99955L0.0254568 11.6595C-0.0331514 11.7749 0.0128727 11.916 0.128261 11.9746C0.164336 11.9929 0.204543 12.0016 0.244965 11.9998C0.285387 11.998 0.324647 11.9857 0.358921 11.9642L9.61531 6.19944C9.7253 6.13127 9.75924 5.98683 9.69104 5.87681C9.67198 5.84605 9.64606 5.82013 9.61531 5.80107L9.61648 5.8006Z" fill="#FF5812" />
        </motion.svg>
        <motion.svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          className="absolute"
          initial={{ x: "-250%" }}
          animate={{ x: isHovered ? "0%" : "-250%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <path d="M9.61648 5.8006L0.360093 0.0358623C0.250469 -0.0329162 0.105835 0.000195883 0.0370565 0.109843C0.0155525 0.144118 0.00328985 0.183378 0.0014624 0.223799C-0.000365041 0.264221 0.00830504 0.304427 0.0266285 0.340503L2.85674 5.99955L0.0254568 11.6595C-0.0331514 11.7749 0.0128727 11.916 0.128261 11.9746C0.164336 11.9929 0.204543 12.0016 0.244965 11.9998C0.285387 11.998 0.324647 11.9857 0.358921 11.9642L9.61531 6.19944C9.7253 6.13127 9.75924 5.98683 9.69104 5.87681C9.67198 5.84605 9.64606 5.82013 9.61531 5.80107L9.61648 5.8006Z" fill="#FF5812" />
        </motion.svg>
      </div>
    </Link>
  )
}

export default function LightAboutUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  const stats = [
    { value: 74, prefix: "$", suffix: "M", label: "Driving growth with strategy." },
    { value: 95, prefix: "", suffix: "%", label: "Building trusted partnerships." },
    { value: 225, prefix: "+", suffix: "", label: "Delivering industry success." },
    { value: 92, prefix: "", suffix: "%", label: "Turning traffic into growth." },
  ]

  return (
    <section ref={containerRef} id="about-us" className="w-full py-20 lg:py-28 bg-[#F3F0EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Tag & Button */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Tag */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF5812]" />
              <span className="text-xs font-medium tracking-wider text-[#141413]/70 uppercase">About Us</span>
            </div>

            {/* Button */}
            <AnimatedButton />
          </motion.div>

          {/* Right Column - Content */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            {/* Headline */}
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-2xl lg:text-3xl font-semibold text-[#141413] leading-tight">
                We collaborate with forward-thinking brands.
                <br />
                The result - Creative impact that lasts.
              </h2>
            </motion.div>

            {/* Images - Expandable on Hover */}
            <motion.div
              className="flex gap-4 h-[300px] lg:h-[350px]"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* First Image - 40% expands to 60% on hover */}
              <motion.div
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                initial={false}
                animate={{
                  flex: hoveredImage === 0 ? 1.5 : hoveredImage === 1 ? 0.67 : 0.67,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                onMouseEnter={() => setHoveredImage(0)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c613ffb60be7503e4d5329_About%2001.webp"
                  alt="Creative portrait with motion blur effect"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Second Image - 60% expands to 75% on hover */}
              <motion.div
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                initial={false}
                animate={{
                  flex: hoveredImage === 1 ? 1.5 : hoveredImage === 0 ? 0.67 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                onMouseEnter={() => setHoveredImage(1)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src="https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c61401fe1af5d6a6ace000_About%2002.webp"
                  alt="Person in reflective jacket with light streaks"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="mt-16 pt-12 border-t border-[#141413]/10"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`relative ${index < stats.length - 1 ? 'lg:border-r lg:border-[#141413]/10' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="lg:px-8 first:pl-0 p-4 lg:p-0">
                  {/* Animated Number */}
                  <div className="mb-2">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      delay={index * 0.2}
                    />
                  </div>

                  {/* Label with fade in */}
                  <motion.p
                    className="text-sm text-[#141413]/60"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    {stat.label}
                  </motion.p>

                  {/* Animated underline accent */}
                  <motion.div
                    className="h-0.5 bg-[#FF5812] mt-3 origin-left"
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
      </div>
    </section>
  )
}
