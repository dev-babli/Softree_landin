"use client"

/**
 * LCStackTabs — light clone of SoftreeStackTabs.
 * Source already uses a near-white #fcfcfc background; we re-skin to cream canvas
 * and switch tab fills to warm amber tones.
 */

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { color } from "./tokens"

const TABS = [
  {
    id: "digital_engineering",
    title: "Digital Engineering",
    fill: color.flame,
    items: [
      { id: "custom_software", icon: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69dd2821c9afb5d3a0b18a86_icon-dark_cloud.svg", title: "Custom Software", desc: "Full-cycle development for enterprise applications. Built for scalability, high performance, and rapid deployment.", link: "/services/digital-engineering", image: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69a81de10b00730fd519bee7_homepage-Serverless%20Inference.avif" },
      { id: "modernization", icon: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69dd2822bd43cb1f65fe8fb5_icon-dark_stack.svg", title: "Cloud Modernization", desc: "Migrate legacy systems to robust cloud architectures. Enhance security, reduce technical debt, and lower operating costs.", link: "/services/cloud-modernization", image: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69a4ddeb07912b16e2a56db9_homepage-Batch%20Inference.avif" },
      { id: "web_mobile", icon: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/699df3b776c13071fe1c4564_megakernel-black.svg", title: "Web & Mobile Platforms", desc: "High-performance responsive frontends and native mobile experiences designed for peak user engagement.", link: "/services/web-mobile", image: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69a4dde4b3ff1de50e86a713_homepage-Dedicated%20Model%20Inference.avif" },
    ],
  },
  {
    id: "microsoft",
    title: "Microsoft Ecosystem",
    fill: color.sunshine,
    items: [
      { id: "power_platform", icon: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69dd282119ca80ff7892995a_icon-dark_clusters.svg", title: "Power Platform", desc: "Rapid low-code automation and custom business apps. Empower your teams to digitize workflows instantly.", link: "/services/power-platform", image: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69a4dde679af0e495c4c58dc_homepage-Accelerated%20Compute.avif" },
      { id: "sharepoint", icon: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69dd282253d88127466705de_icon-dark_sandbox.svg", title: "SharePoint & Teams", desc: "Modern workplace collaboration solutions tailored to your compliance requirements and organizational structure.", link: "/services/sharepoint", image: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69a4dde797dc94948db8a087_homepage-Sandbox.avif" },
      { id: "azure", icon: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69dd28211c608d7834bbbee3_icon-dark_folder.svg", title: "Azure Cloud Infrastructure", desc: "Scalable compute, managed storage, and advanced enterprise integrations built natively on Microsoft Azure.", link: "/services/azure", image: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69a4ddec9c4d979bb19ac677_homepage-Managed%20Storage.avif" },
    ],
  },
  {
    id: "data_ai",
    title: "Data & AI",
    fill: color.mistral,
    items: [
      { id: "automation", icon: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69dd282151803013404915a5_icon-dark_fine-tuning.svg", title: "Intelligent Automation", desc: "Deploy smart agents and machine learning models to automate complex decision-making and eliminate manual bottlenecks.", link: "/services/ai-automation", image: "https://cdn.prod.website-files.com/69654e88dce9154b5f1206dd/69a4ddebec57cf61ac402e4f_homepage-Fine-Tuning.avif" },
    ],
  },
]

const flatMap = TABS.flatMap((tab, tabIdx) => tab.items.map((item, itemIdx) => ({ tabIdx, itemIdx, ...item })))

export function LCStackTabs() {
  const [globalIndex, setGlobalIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const t = setInterval(() => setGlobalIndex((p) => (p + 1) % flatMap.length), 6500)
    return () => clearInterval(t)
  }, [isPaused])

  const activeTabIdx = flatMap[globalIndex].tabIdx
  const activeItemIdx = flatMap[globalIndex].itemIdx
  const activeTab = TABS[activeTabIdx]

  return (
    <section className="relative w-full py-24 z-10 overflow-hidden" style={{ background: color.canvas, color: color.ink }}>
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-4 lg:px-6">
        <div className="mb-14 lg:mb-20">
          <h2 className="text-4xl lg:text-[48px] font-medium leading-tight tracking-tight" style={{ color: color.ink }}>Full-stack delivery</h2>
          <p className="text-lg lg:text-xl mt-4 max-w-2xl" style={{ color: color.slate }}>
            Powering every step of your digital transformation<br className="hidden md:block" /> — from strategy to massive scale.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <ul role="tablist" className="flex overflow-x-auto no-scrollbar gap-2 lg:gap-4 pb-4 shrink-0" style={{ borderBottom: `1px solid ${color.dustTaupe}` }}>
            {TABS.map((tab, idx) => {
              const isActive = activeTabIdx === idx
              return (
                <li
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  className="relative px-6 py-3 rounded-sm cursor-pointer transition-all shrink-0 font-medium text-lg lg:text-xl overflow-hidden"
                  style={{
                    background: isActive ? color.lifted : "transparent",
                    color: isActive ? color.ink : color.slate,
                  }}
                  onClick={() => {
                    setIsPaused(true)
                    const i = flatMap.findIndex((v) => v.tabIdx === idx)
                    if (i !== -1) setGlobalIndex(i)
                  }}
                >
                  <span className="relative z-10">{tab.title}</span>
                  {isActive && (
                    <motion.div
                      className="absolute top-0 bottom-0 left-0 right-0 opacity-20 origin-left z-0"
                      style={{ background: tab.fill }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6.5, ease: "linear" }}
                      key={`progress-tab-${globalIndex}`}
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-20 min-h-[600px] mt-6">
            <div className="flex flex-col gap-2 relative">
              {activeTab.items.map((item, iIdx) => {
                const isInnerActive = activeItemIdx === iIdx
                return (
                  <div
                    key={item.id}
                    className="pb-4 last:border-b-0 cursor-pointer"
                    style={{ borderBottom: `1px solid ${color.dustTaupe}` }}
                    onClick={() => {
                      setIsPaused(true)
                      const t = flatMap.findIndex((v) => v.tabIdx === activeTabIdx && v.itemIdx === iIdx)
                      if (t !== -1) setGlobalIndex(t)
                    }}
                  >
                    <div className="flex items-center justify-between py-4 group">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-sm transition-colors" style={{ background: isInnerActive ? color.ghostCream : "transparent" }}>
                          <img src={item.icon} alt="" className="w-6 h-6 opacity-80" />
                        </div>
                        <p className="text-xl font-medium transition-colors" style={{ color: isInnerActive ? color.ink : color.slate }}>{item.title}</p>
                      </div>
                      <motion.div animate={{ rotate: isInnerActive ? 180 : 0 }} style={{ color: color.slate }}>
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>
                    <AnimatePresence initial={false}>
                      {isInnerActive && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden">
                          <div className="pt-2 pb-6 pl-[56px] pr-4">
                            <p className="text-[17px] mb-6 leading-relaxed" style={{ color: color.slate }}>{item.desc}</p>
                            <a href={item.link} className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium transition-all" style={{ background: color.ink, color: color.lifted, border: `1px solid ${color.ink}` }}>
                              Learn more
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] rounded-sm overflow-hidden flex items-center justify-center isolate" style={{ background: color.ghostCream }}>
              <AnimatePresence mode="popLayout">
                {activeTab.items.map((item, iIdx) => {
                  if (activeItemIdx !== iIdx) return null
                  return (
                    <motion.div key={item.id} className="absolute inset-0 z-10 h-full w-full" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-sm" draggable={false} />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LCStackTabs
