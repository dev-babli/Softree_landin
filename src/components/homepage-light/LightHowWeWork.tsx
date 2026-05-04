"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Step 01 & 03: Text top, Image bottom (tall card style)
function TallCard({ step, index }: { step: { step: string; title: string; description: string; image: string; alt: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-xl overflow-hidden border border-[#141413]/5 hover:border-[#FF5812]/20 transition-colors duration-300 h-full flex flex-col"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Text Content - Top */}
      <div className="p-6 pb-4">
        <motion.div
          className="text-xs uppercase tracking-wider text-[#141413]/50 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
        >
          {step.step}
        </motion.div>

        <motion.h3
          className="text-xl font-semibold text-[#141413] mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
        >
          {step.title}
        </motion.h3>

        <motion.p
          className="text-sm text-[#141413]/60 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
        >
          {step.description}
        </motion.p>
      </div>

      {/* Image - Bottom */}
      <motion.div
        className="relative overflow-hidden flex-1 min-h-[200px]"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
      >
        <motion.img
          src={step.image}
          alt={step.alt}
          className="w-full h-full object-cover absolute inset-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  )
}

// Step 02 & 04: Image left, Text right (wide card style)
function WideCard({ step, index }: { step: { step: string; title: string; description: string; image: string; alt: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-xl overflow-hidden border border-[#141413]/5 hover:border-[#FF5812]/20 transition-colors duration-300 h-full"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="grid grid-cols-2 h-full">
        {/* Image - Left */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: index * 0.15 + 0.2 }}
        >
          <motion.img
            src={step.image}
            alt={step.alt}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Text Content - Right */}
        <div className="p-6 flex flex-col justify-center">
          <motion.div
            className="text-xs uppercase tracking-wider text-[#141413]/50 mb-8"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          >
            {step.step}
          </motion.div>

          <motion.h3
            className="text-xl font-semibold text-[#141413] mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
          >
            {step.title}
          </motion.h3>

          <motion.p
            className="text-sm text-[#141413]/60 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
          >
            {step.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

export default function LightHowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })

  const step01 = {
    step: "(STEP - 01)",
    title: "Discover goals",
    description: "We research business needs users competitors scope thoroughly",
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c7b241960b525c3ded9b1a_1%20Step%2001.webp",
    alt: "Transparent blue-tinted glass cube placed on a reflective square pedestal with soft colorful lighting and shadows on the floor."
  }

  const step02 = {
    step: "(STEP - 02)",
    title: "Plan strategy",
    description: "We define structure timelines priorities requirements clearly together",
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c7b24106d9a793f9b3f60a_1%20Step%2002.webp",
    alt: "Transparent glass hand sculpture with fingers slightly curled, showing colorful light reflections."
  }

  const step03 = {
    step: "(STEP - 03)",
    title: "Design solutions",
    description: "We craft intuitive interfaces focused clarity usability consistency",
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c7b2419a45cdc736bf52ee_1%20Step%2003.webp",
    alt: "Hand holding a multi-layered transparent container with different colored liquids and sediments inside, suspended above a surface."
  }

  const step04 = {
    step: "(STEP - 04)",
    title: "Build website",
    description: "We develop responsive fast websites using scalable tools",
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69c7b2425336d64a45850714_1%20Step%2004.webp",
    alt: "Transparent, multicolored glass ring sculpture placed on a marble surface casting a shadow."
  }

  return (
    <section ref={sectionRef} className="w-full py-20 lg:py-28 bg-[#F3F0EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex items-center gap-6 mb-12">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-[#141413]"
            initial={{ opacity: 0, x: -40 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            How We Work
          </motion.h2>

          <motion.div
            className="flex-1 h-px bg-[#141413]/10"
            initial={{ scaleX: 0 }}
            animate={isHeaderInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ originX: 0 }}
          />

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#FF5812]" />
            <span className="text-xs font-medium tracking-wider text-[#141413]/70 uppercase">Working Process</span>
          </motion.div>
        </div>

        {/* Bento Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[300px]">
          {/* Row 1: Step 01 (Tall - text top, image bottom) + Step 02 (Wide - image left, text right) */}
          <TallCard step={step01} index={0} />
          <WideCard step={step02} index={1} />

          {/* Row 2: Step 03 (Tall - text top, image bottom) + Step 04 (Wide - image left, text right) */}
          <TallCard step={step03} index={2} />
          <WideCard step={step04} index={3} />
        </div>
      </div>
    </section>
  )
}
