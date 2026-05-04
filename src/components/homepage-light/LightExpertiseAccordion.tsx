"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"

interface Service {
  id: string
  number: string
  title: string
  description: string
  image: string
  tags: string[]
}

const services: Service[] = [
  {
    id: "01",
    number: "(01)",
    title: "UI UX Design",
    description: "We design intuitive interfaces that improve usability, guide users, and increase engagement.",
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69cb75713696164fd92134d2_Service%201.webp",
    tags: ["User Research", "UX Flows", "Useability Testing", "Interface Design"]
  },
  {
    id: "02",
    number: "(02)",
    title: "Web Development",
    description: "We build fast responsive websites ensuring scalability performance and experiences across devices.",
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69cb7571119eb75f88c94957_Service%202.webp",
    tags: ["Webflow Builds", "CMS Integration", "Brand Guidelines", "Design Language"]
  },
  {
    id: "03",
    number: "(03)",
    title: "Brand Identity",
    description: "We create brand systems that communicate values build trust and help businesses.",
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69cb7571c06b2da6e09c0b7e_Service%203.webp",
    tags: ["Logo Design", "Visual Identity", "Brand Guidelines", "Design Language"]
  },
  {
    id: "04",
    number: "(04)",
    title: "Growth Ops",
    description: "We optimize websites through testing insights and improvements conversions accessibility speed.",
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69cb7571993b487b77d65301_Service%204.webp",
    tags: ["Speed Optimization", "Technical SEO", "Core WebVitals", "SEO Structure"]
  },
  {
    id: "05",
    number: "(05)",
    title: "Content Strategy",
    description: "We plan content structures that improve engagement consistency and long term brand communication.",
    image: "https://cdn.prod.website-files.com/69a0a45220c8336fe957ccba/69cb7570637acb66a41a328b_Service%205.webp",
    tags: ["Content", "Strategy", "Pixel Perfect Structure", "Content Planning"]
  }
]

function ServiceCard({ 
  service, 
  isExpanded, 
  onHover,
  index 
}: { 
  service: Service
  isExpanded: boolean
  onHover: () => void
  index: number
}) {
  return (
    <motion.div
      className="relative h-[584px] rounded-2xl overflow-hidden cursor-pointer border-r border-[#141413]/10 last:border-r-0"
      initial={false}
      animate={{ 
        width: isExpanded ? "38%" : "15.4%",
        flex: isExpanded ? 2.5 : 1
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={onHover}
      style={{ background: isExpanded ? "#F8F7F5" : "transparent" }}
    >
      {/* Collapsed State - Vertical Text Background */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAFAF8]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top Label */}
            <div className="absolute top-6 left-0 right-0 flex items-center justify-center gap-3 px-4">
              <span className="text-[10px] uppercase tracking-wider text-[#141413]/40">Service</span>
              <div className="flex-1 h-px bg-[#141413]/10" />
              <span className="text-[10px] text-[#141413]/40">{service.number}</span>
            </div>
            
            {/* Vertical Title */}
            <motion.h3 
              className="text-xl font-semibold text-[#141413]/70 whitespace-nowrap"
              style={{ 
                writingMode: "vertical-rl",
                transform: "rotate(180deg)"
              }}
            >
              {service.title}
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded State - Full Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute inset-0 flex flex-col p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Top Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] uppercase tracking-wider text-[#141413]/40">Service</span>
              <div className="flex-1 h-px bg-[#141413]/10" />
              <span className="text-[10px] text-[#141413]/40">{service.number}</span>
            </div>

            {/* Image */}
            <motion.div 
              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <img 
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-[#141413]">{service.title}</h3>
              <p className="text-sm text-[#141413]/60 leading-relaxed">{service.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                {service.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="px-3 py-1.5 text-xs text-[#141413]/70 bg-white border border-[#141413]/10 rounded-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function LightExpertiseAccordion() {
  const [expandedId, setExpandedId] = useState<string>("05") // Last card expanded by default
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="w-full py-20 lg:py-28 bg-[#F3F0EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <motion.h2 
            className="text-3xl lg:text-4xl font-bold text-[#141413]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Expertise
          </motion.h2>
          
          <motion.div 
            className="flex-1 h-px bg-[#141413]/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ originX: 0 }}
          />
          
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#FF5812]" />
            <span className="text-xs font-medium tracking-wider text-[#141413]/70 uppercase">Service</span>
          </motion.div>
        </div>

        {/* Cards Container */}
        <motion.div 
          ref={containerRef}
          className="flex w-full bg-[#FAFAF8] rounded-2xl border border-[#141413]/10 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              isExpanded={expandedId === service.id}
              onHover={() => setExpandedId(service.id)}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
