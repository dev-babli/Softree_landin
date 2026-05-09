"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

/* ====================================================================
 *  ENGAGEMENT MODELS
 *  Using the exact visual design of the Our Expertise accordion
 * ==================================================================== */

interface DeliveryModel {
  id: string
  number: string
  title: string
  description: string
  tags: string[]
  image: string
}

const MODELS: DeliveryModel[] = [
  {
    id: "01",
    number: "(01)",
    title: "Dedicated Teams",
    description: "Build a scalable engineering extension aligned with your delivery goals and workflows.",
    tags: ["Agile Delivery", "Scalable Teams", "Long-Term", "Leadership"],
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "02",
    number: "(02)",
    title: "White-Label",
    description: "Operate confidently with a trusted engineering partner delivering under your brand.",
    tags: ["Partner Friendly", "Offshore", "Enterprise", "Confidential"],
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "03",
    number: "(03)",
    title: "Staff Augmentation",
    description: "Quickly extend your capabilities with experienced engineers across modern tech stacks.",
    tags: ["Flexible", "Fast Onboarding", "Certified", "Remote"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
  },
  {
    id: "04",
    number: "(04)",
    title: "Project Delivery",
    description: "Accelerate project execution with outcome-focused engineering and enterprise standards.",
    tags: ["End-to-End", "Architecture", "Quality", "Production"],
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "05",
    number: "(05)",
    title: "Managed Services",
    description: "Ensure continuous optimization and operational stability with proactive support.",
    tags: ["SLA Support", "Monitoring", "Ops", "Security"],
    image: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop",
  },
]

export default function LightEngagementModels() {
  const [expandedId, setExpandedId] = useState<string>("01")

  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="mb-14 flex flex-col md:flex-row md:items-center">
          <h2 className="text-[52px] font-bold tracking-[-0.04em] text-[#111] leading-none">
            Engagement Models
          </h2>
          <div className="my-6 h-[1px] w-full bg-[#EAEAEA] md:mx-8 md:my-0 md:h-[40px] md:w-[1px]"></div>
          <div className="flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 bg-[#FF4500]"></div>
            <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-[#555]">
              MODEL
            </span>
          </div>
        </div>

        {/* Accordion Wrapper */}
        <div className="flex w-full flex-col lg:flex-row bg-[#F9F9F9] border border-[#EAEAEA]">
          {MODELS.map((model) => {
            const isExpanded = expandedId === model.id

            return (
              <motion.div
                key={model.id}
                className="relative flex cursor-pointer flex-col overflow-hidden border-b border-[#EAEAEA] lg:border-b-0 lg:border-r lg:last:border-r-0"
                initial={false}
                animate={{
                  flex: isExpanded ? 4 : 1.3,
                  height: typeof window !== "undefined" && window.innerWidth < 1024 
                    ? (isExpanded ? "auto" : "80px") 
                    : "700px",
                }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                onClick={() => setExpandedId(model.id)}
              >
                {/* --- TOP HEADER LINE (Always Visible) --- */}
                <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-8 pt-8">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[#888]">
                    MODEL
                  </span>
                  <div className="mx-4 flex-1 h-[1px] bg-[#EAEAEA]"></div>
                  <span className="text-[11px] font-medium text-[#888]">
                    {model.number}
                  </span>
                </div>

                {/* --- EXPANDED CONTENT --- */}
                <div
                  className={`relative z-10 flex h-full flex-col px-8 pt-[76px] pb-8 transition-opacity duration-500 ${
                    isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* Image */}
                  <div className="relative mb-8 w-full shrink-0 overflow-hidden rounded-2xl bg-gray-100 shadow-sm" style={{ aspectRatio: '16/9' }}>
                    <Image
                      src={model.image}
                      alt={model.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority={model.id === "01"}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col mt-auto">
                    <h3 className="mb-4 text-[34px] font-bold tracking-tight text-[#111] leading-tight">
                      {model.title}
                    </h3>
                    <p className="mb-7 text-[15px] leading-relaxed text-[#666] max-w-[90%]">
                      {model.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2.5">
                      {model.tags.map((tag) => (
                        <div
                          key={tag}
                          className="rounded-[4px] border border-[#EAEAEA] bg-white px-3.5 py-2 shadow-sm"
                        >
                          <span className="text-[11px] font-medium text-[#666]">
                            {tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* --- COLLAPSED BACKGROUND STATE --- */}
                <div
                  className={`absolute inset-0 z-0 transition-opacity duration-500 ${
                    isExpanded ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {/* Background Image Top */}
                  <div className="absolute top-0 left-0 right-0 h-[50%]">
                    <Image
                      src={model.image}
                      alt=""
                      fill
                      className="object-cover object-top opacity-20 saturate-[1.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F9F9F9]"></div>
                  </div>
                  
                  {/* Vertical Text */}
                  <div className="absolute bottom-12 left-0 right-0 flex justify-center">
                    <h3
                      className="text-[34px] font-bold text-[#555] tracking-tight whitespace-nowrap"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {model.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
