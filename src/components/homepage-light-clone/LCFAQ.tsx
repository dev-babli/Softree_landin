"use client"

/**
 * LCFAQ — light clone of brilliance/faq-section.
 * Re-themed to cream canvas, ink text, dust-taupe dividers.
 */

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { color } from "./tokens"

interface FAQItem { question: string; answer: string }

const faqData: FAQItem[] = [
  { question: "What does Softree do?", answer: "Softree is an advanced digital engineering and AI delivery partner. We help enterprise teams modernize their legacy systems, implement generative AI solutions, and build resilient cloud infrastructures optimized for global scale." },
  { question: "How do your AI agent implementations work?", answer: "We design and deploy custom autonomous agents that integrate directly into your existing enterprise workflows. Our agents can automate complex operational tasks—from data analysis to customer success—while strictly adhering to your security and compliance protocols." },
  { question: "What technologies do you specialize in?", answer: "We specialize in the Microsoft ecosystem (Azure, .NET, Power Platform), advanced data engineering, and modern web platforms (React, Next.js). Our AI stack leverages state-of-the-art LLMs, custom RAG pipelines, and fine-tuned inference models." },
  { question: "Can you modernize our legacy applications?", answer: "Yes. We specialize in digital transformation, migrating monolithic architectures to scalable microservices, containerizing legacy apps, and refactoring codebases to reduce technical debt and accelerate release cycles." },
  { question: "How do you ensure data security and compliance?", answer: "Security is foundational to our engineering process. We implement zero-trust architectures, end-to-end encryption, and role-based access controls. Our solutions are designed to meet stringent industry standards and enterprise compliance requirements." },
]

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LCFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const toggle = (i: number) => setOpenItems((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]))

  return (
    <section className="relative w-full py-24 md:py-32 z-10" style={{ background: color.canvas, color: color.ink, borderTop: `1px solid ${color.dustTaupe}` }}>
      <div
        className="absolute top-0 inset-x-0 h-[500px] pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${color.cream}66, transparent)` }}
      />
      <div className="relative mx-auto w-full max-w-[1240px] px-4 xl:px-10 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24">
        <div className="w-full lg:flex-1 flex flex-col justify-start items-start gap-4 sticky top-32">
          <motion.h2 className="text-3xl lg:text-[40px] font-medium tracking-tight leading-tight" style={{ color: color.ink }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Frequently Asked Questions
          </motion.h2>
          <motion.p className="text-base lg:text-lg font-normal leading-relaxed max-w-[400px]" style={{ color: color.slate }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            Everything you need to know about partnering with Softree to modernize your enterprise.
          </motion.p>
        </div>

        <div className="w-full lg:flex-[1.2] flex flex-col justify-center items-center">
          <div className="w-full flex flex-col">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(index)
              return (
                <motion.div key={index} className="w-full overflow-hidden" style={{ borderBottom: `1px solid ${color.dustTaupe}` }}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * index }}>
                  <button onClick={() => toggle(index)} className="w-full py-6 lg:py-8 flex justify-between items-center gap-5 text-left group focus:outline-none" aria-expanded={isOpen}>
                    <div className="flex-1 text-base lg:text-xl font-medium leading-relaxed transition-colors duration-300" style={{ color: isOpen ? color.ink : color.slate }}>
                      {item.question}
                    </div>
                    <div className="flex justify-center items-center ml-4 shrink-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{ background: isOpen ? color.ghostCream : "transparent", border: `1px solid ${isOpen ? color.dustTaupe : color.dustTaupe}` }}>
                        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`} />
                      </div>
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                        <div className="pb-8 text-sm lg:text-base font-normal leading-relaxed pr-8 lg:pr-16" style={{ color: color.slate }}>
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LCFAQ
