"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

/* 
  Recreated based on target Cohere HTML
  Replaces arbitrary Tailwind animations (e.g. `animate-[fadeInUp_0.8s_forwards]`) 
  with identical Framer Motion behavior to guarantee 100% functionality without requiring 
  tailwind.config tweaks or breaking. 
*/

const cardVariants = {
  unhovered: { y: 0 },
  hovered: { y: -4 },
}

// The SVG morphs from a cut-out corner to a strict rounded rectangle corner seamlessly.
const pathVariants = {
  unhovered: { 
    d: "M670 0H0V91C0 102.046 8.9543 111 20 111H518.641C526.216 111 533.14 106.721 536.529 99.9469L570.988 31.0531C574.377 24.2789 581.301 20 588.875 20H650C661.046 20 670 11.0457 670 0Z" 
  },
  hovered: { 
    d: "M670 0H0V91C0 102.046 8.9543 111 20 111H300C333.33 111 366.66 111 400 111L500 111C533.33 111 566.66 111 600 111H650C661.046 111 670 102.046 670 91Z" 
  }
}

export function SoftreeBlogSection() {
  return (
    <section className="relative w-full bg-white text-black py-24 z-10 overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 lg:px-6">
        
        {/* Header Section */}
        <div className="lg:flex justify-between items-end mb-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="break-words 2xl:max-w-[1880px] md:max-w-[1128px] mb-0 lg:max-w-[555px]">
              <h2 className="text-4xl lg:text-[48px] font-medium leading-tight font-sans tracking-tight">From the Softree Team</h2>
            </div>
          </motion.div>

          <div className="mt-8 lg:mt-0 flex flex-col items-start lg:items-end justify-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
            >
              <a
                className="group flex items-center justify-center max-w-full focus-visible:outline-coral-500 rounded-sm hover:opacity-80 transition-opacity"
                target="_self"
                href="/contact"
              >
                <span className="flex items-center text-black font-medium">
                  <span className="text-base lg:text-lg font-sans">See more on the blog</span>
                  <span className="ml-1 mr-2 flex items-center duration-300 transition-all ease-in-out group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </span>
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex w-full flex-col lg:grid gap-6 items-center justify-center lg:grid-cols-3">
          
          {/* Card 1 */}
          <motion.a
            href="/contact"
            className="group/calloutCard bg-transparent relative flex h-full w-full max-w-[617px] flex-col overflow-hidden rounded-lg lg:rounded-xl"
            target="_self"
            initial="unhovered"
            whileHover="hovered"
            variants={cardVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex w-full flex-1 flex-col justify-between rounded-t-lg p-4 lg:rounded-t-xl text-black bg-[#f9f9f9] pb-0">
              <div>
                <motion.img
                  alt="Softree Team Image 1"
                  loading="lazy"
                  width="670"
                  height="208"
                  className="mb-5 w-full rounded object-cover h-[138px] sm:h-[168px]"
                  src="/whysoftree/ai.webp"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                />
                <motion.p
                  className="text-xs lg:text-sm uppercase font-mono mb-5 text-[#5e5e5e] font-semibold tracking-wider"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  Softree Team - Mar 17, 2026
                </motion.p>
                <motion.h3
                  className="text-xl lg:text-2xl font-medium font-sans mb-12 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                >
                  Softree advances enterprise AI capabilities with global partners
                </motion.h3>
              </div>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 670 111" preserveAspectRatio="none" className="-mt-[1px] w-full shrink-0">
              <motion.path className="w-full" fill="#f9f9f9" variants={pathVariants} transition={{ duration: 0.3, ease: "easeInOut" }} />
            </svg>
            
            <div className="absolute bottom-3 flex w-full items-center justify-between px-4 md:bottom-4">
              <motion.p
                className="text-base lg:text-lg font-medium text-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              >
                Read more
              </motion.p>
              <ArrowRight className="w-5 h-5 text-black opacity-0 -translate-x-2 group-hover/calloutCard:opacity-100 group-hover/calloutCard:translate-x-0 transition-all duration-300 ease-out" />
            </div>
          </motion.a>

          {/* Card 2 */}
          <motion.a
            href="/contact"
            className="group/calloutCard bg-transparent relative flex h-full w-full max-w-[617px] flex-col overflow-hidden rounded-lg lg:rounded-xl"
            target="_self"
            initial="unhovered"
            whileHover="hovered"
            variants={cardVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex w-full flex-1 flex-col justify-between rounded-t-lg p-4 lg:rounded-t-xl text-black bg-[#f9f9f9] pb-0">
              <div>
                <motion.img
                  alt="Softree Team Image 2"
                  loading="lazy"
                  width="670"
                  height="208"
                  className="mb-5 w-full rounded object-cover h-[138px] sm:h-[168px]"
                  src="/whysoftree/microsoft.webp"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                />
                <motion.p
                  className="text-xs lg:text-sm uppercase font-mono mb-5 text-[#5e5e5e] font-semibold tracking-wider"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  Softree Team - Dec 11, 2025
                </motion.p>
                <motion.h3
                  className="text-xl lg:text-2xl font-medium font-sans mb-12 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                >
                  Introducing Softree OS: Our most powerful integrated suite yet
                </motion.h3>
              </div>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 670 111" preserveAspectRatio="none" className="-mt-[1px] w-full shrink-0">
              <motion.path className="w-full" fill="#f9f9f9" variants={pathVariants} transition={{ duration: 0.3, ease: "easeInOut" }} />
            </svg>
            
            <div className="absolute bottom-3 flex w-full items-center justify-between px-4 md:bottom-4">
              <motion.p
                className="text-base lg:text-lg font-medium text-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              >
                Read more
              </motion.p>
              <ArrowRight className="w-5 h-5 text-black opacity-0 -translate-x-2 group-hover/calloutCard:opacity-100 group-hover/calloutCard:translate-x-0 transition-all duration-300 ease-out" />
            </div>
          </motion.a>

          {/* Card 3 */}
          <motion.a
            href="/contact"
            className="group/calloutCard bg-transparent relative flex h-full w-full max-w-[617px] flex-col overflow-hidden rounded-lg lg:rounded-xl"
            target="_self"
            initial="unhovered"
            whileHover="hovered"
            variants={cardVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex w-full flex-1 flex-col justify-between rounded-t-lg p-4 lg:rounded-t-xl text-black bg-[#f9f9f9] pb-0">
              <div>
                <motion.img
                  alt="Softree Team Image 3"
                  loading="lazy"
                  width="670"
                  height="208"
                  className="mb-5 w-full rounded object-cover h-[138px] sm:h-[168px]"
                  src="/whysoftree/data.webp"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                />
                <motion.p
                  className="text-xs lg:text-sm uppercase font-mono mb-5 text-[#5e5e5e] font-semibold tracking-wider"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  Softree Team - Nov 27, 2025
                </motion.p>
                <motion.h3
                  className="text-xl lg:text-2xl font-medium font-sans mb-12 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                >
                  Softree expands strategic tools to provide full-scale automation
                </motion.h3>
              </div>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 670 111" preserveAspectRatio="none" className="-mt-[1px] w-full shrink-0">
              <motion.path className="w-full" fill="#f9f9f9" variants={pathVariants} transition={{ duration: 0.3, ease: "easeInOut" }} />
            </svg>
            
            <div className="absolute bottom-3 flex w-full items-center justify-between px-4 md:bottom-4">
              <motion.p
                className="text-base lg:text-lg font-medium text-black"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
              >
                Read more
              </motion.p>
              <ArrowRight className="w-5 h-5 text-black opacity-0 -translate-x-2 group-hover/calloutCard:opacity-100 group-hover/calloutCard:translate-x-0 transition-all duration-300 ease-out" />
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  )
}
