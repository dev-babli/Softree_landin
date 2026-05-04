"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"

// Letter SVG URLs from Webflow
const letters = {
  v: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/692090a0dce81b6c2e6d25a7_V.svg",
  i: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/692090a090ec532a71755ced_I-1.svg",
  s: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/692090a01adbcc362b61bb48_S.svg",
  n: "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/692090a05c4b8bbb901ff9ce_N.svg"
}

const bannerBg = "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/69393d89707a466887665505_Banner-Image.jpg"
const arrowSvg = "https://cdn.prod.website-files.com/68dbb9a72b91c794d0cdd10c/69108960e3284bb1a2e481a4_Button-Arrow.svg"

export default function LightVisionBanner() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative w-full bg-[#0a0a0a] overflow-hidden">
      {/* Main Banner Area with Letters */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerBg}
            alt="Banner Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>

        {/* Letters Row - V I S I [O] N */}
        <div className="relative z-10 flex items-center justify-center gap-2 md:gap-4 lg:gap-6">
          {/* V - slides from left */}
          <motion.div
            className="relative w-16 h-20 md:w-24 md:h-32 lg:w-32 lg:h-40"
            initial={{ x: "-15vw", opacity: 0, width: 0 }}
            animate={{ x: 0, opacity: 1, width: "auto" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image src={letters.v} alt="V" fill className="object-contain" />
          </motion.div>

          {/* I */}
          <motion.div
            className="relative w-8 h-20 md:w-12 md:h-32 lg:w-16 lg:h-40"
            initial={{ x: "-15vw", opacity: 0, width: 0 }}
            animate={{ x: 0, opacity: 1, width: "auto" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image src={letters.i} alt="I" fill className="object-contain" />
          </motion.div>

          {/* S */}
          <motion.div
            className="relative w-16 h-20 md:w-24 md:h-32 lg:w-32 lg:h-40"
            initial={{ x: "-15vw", opacity: 0, width: 0 }}
            animate={{ x: 0, opacity: 1, width: "auto" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image src={letters.s} alt="S" fill className="object-contain" />
          </motion.div>

          {/* I */}
          <motion.div
            className="relative w-8 h-20 md:w-12 md:h-32 lg:w-16 lg:h-40"
            initial={{ x: "-15vw", opacity: 0, width: 0 }}
            animate={{ x: 0, opacity: 1, width: "auto" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image src={letters.i} alt="I" fill className="object-contain" />
          </motion.div>

          {/* Center Circle/O - scales in */}
          <motion.div
            className="relative w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full border-2 border-white/20 flex items-center justify-center"
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* After Banner Content Inside Circle */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              <Image
                src={bannerBg}
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>

            {/* Content Inside Circle */}
            <motion.div
              className="relative z-10 text-center px-4 md:px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-white text-sm md:text-lg lg:text-xl font-bold leading-tight mb-2">
                Crafting Modern<br />
                <span className="text-[#FF5812]">Vision</span> For the<br />
                Ambitious Brands
              </h2>
              <p className="text-white/70 text-[10px] md:text-xs mb-3 hidden md:block">
                We blend creativity with strategy to build digital experiences.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs font-medium hover:bg-[#FF5812] hover:text-white transition-colors"
              >
                <span>Get Started</span>
                <Image src={arrowSvg} alt="" width={12} height={12} className="w-3 h-3" />
              </Link>
            </motion.div>
          </motion.div>

          {/* N - slides from right */}
          <motion.div
            className="relative w-16 h-20 md:w-24 md:h-32 lg:w-32 lg:h-40"
            initial={{ x: "15vw", opacity: 0, width: 0 }}
            animate={{ x: 0, opacity: 1, width: "auto" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image src={letters.n} alt="N" fill className="object-contain" />
          </motion.div>
        </div>

        {/* Bottom Content */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 z-20 px-6 md:px-12"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/70 text-sm md:text-base max-w-md text-center md:text-left">
              At Softree, we blend creativity with strategy to build digital experiences that move brands forward. From crafting standout websites.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-[#E8F4FF] text-[#0a0a0a] px-6 py-3 rounded-full font-medium hover:bg-white transition-colors"
            >
              <span>Get Started Now</span>
              <div className="relative w-4 h-4 overflow-hidden">
                <Image
                  src={arrowSvg}
                  alt=""
                  width={16}
                  height={16}
                  className="absolute transition-transform group-hover:translate-x-6 group-hover:-translate-y-6"
                />
                <Image
                  src={arrowSvg}
                  alt=""
                  width={16}
                  height={16}
                  className="absolute -translate-x-6 translate-y-6 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                />
              </div>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scrolling Ticker */}
      <div className="relative z-20 bg-[#0a0a0a] py-4 overflow-hidden border-t border-white/10">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, -33.33 + "%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center px-4">
              <span className="text-white/40 text-lg md:text-xl">
                <span className="italic">Real Results *</span>{" "}
                <span className="text-white">Modern</span>{" "}
                <span className="text-[#FF5812]">Design</span>{" "}
                <span className="italic">*</span>{" "}
                <span className="font-bold">Real</span>{" "}
                <span className="text-[#FF5812]">Results</span>
                {" "}*{" "}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
