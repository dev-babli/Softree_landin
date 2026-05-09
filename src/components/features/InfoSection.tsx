"use client"

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { LogoLoop } from "./LogoLoop";
import { EASE_T } from "@/lib/motion";

const EASE = EASE_T.silk;

const FEATURES = [
  {
    title: "Applied AI Systems",
    body: "We architect production-ready AI that embeds directly into your operations—moving past demos to deliver actual business intelligence.",
  },
  {
    title: "Microsoft Ecosystems",
    body: "Unify SharePoint, Azure, and Power Platform into a seamless digital workplace engineered to scale with your growing enterprise.",
  },
  {
    title: "Global Delivery Pods",
    body: "Dedicated cross-timezone engineering pods shipping code in weekly increments with zero handoff friction.",
  },
];

const HEADLINE = "Ship production-grade software with an engineering partner built for scale.";

const MARQUEE_ITEMS = [
  { node: <span className="text-3xl font-bold tracking-tighter text-[#111]">fintech</span>, title: "Fintech" },
  { node: <span className="text-4xl font-serif tracking-tight text-[#111]">startups</span>, title: "Startups" },
  { node: <span className="text-3xl font-bold tracking-tight text-[#111] flex items-center gap-2"><span className="text-xl">✦</span> Enterprises</span>, title: "Enterprises" },
  { node: <span className="text-2xl font-bold leading-none tracking-tight text-[#111]">AI PLATFORMS /DEPT.</span>, title: "AI Platforms" },
  { node: <span className="text-4xl font-black tracking-tighter text-[#111]">SAAS</span>, title: "SaaS" },
  { node: <span className="text-3xl font-medium tracking-tight text-[#111] italic">healthcare</span>, title: "Healthcare" },
  { node: <span className="text-3xl font-bold tracking-tighter text-[#111]">gov&apos;t</span>, title: "Government" },
  { node: <span className="text-4xl font-black tracking-tighter text-[#111]">retail</span>, title: "Retail" },
]

export default function InfoSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#F3F0EE] pt-32 pb-10 md:pt-40 md:pb-12 lg:pt-48 lg:pb-16 overflow-hidden z-10"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 flex flex-col md:flex-row gap-12 lg:gap-20 items-start">

        {/* Left Column (Badge) */}
        <motion.div
          className="w-full md:w-[35%] lg:w-[25%] shrink-0"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-[#f9f9f9] px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-xs bg-[#FF5812]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#141413]">
              Global Scale
            </span>
          </div>
          <p className="text-[15px] leading-relaxed text-[#141413]/60 max-w-[280px]">
            Softree bridges the gap between vision and execution. We provide the infrastructure, talent, and processes required to build software that defines industries.
          </p>
        </motion.div>

        {/* Right Column (Content) */}
        <div className="w-full md:w-[65%] lg:w-[75%] flex flex-col">
          {/* Word-by-word blur-up reveal */}
          <motion.h2
            className="text-[clamp(28px,4.4vw,58px)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#141413] mb-12 md:mb-16 max-w-[900px]"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
            }}
          >
            {HEADLINE.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                style={{ marginRight: "0.25em" }}
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <div className="flex flex-col w-full">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                className="group/row flex flex-col lg:flex-row border-t border-[#111]/10 py-10 gap-4 lg:gap-16 transition-colors duration-500 hover:border-[#111]/30"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.12, ease: EASE }}
              >
                <div className="w-full lg:w-[40%]">
                  <h3 className="relative text-[18px] md:text-[22px] font-semibold tracking-tight text-[#141413] transition-colors duration-300 group-hover/row:text-[#1852FF]">
                    <span className="relative">
                      {feat.title}
                      <span
                        aria-hidden
                        className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#1852FF] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/row:w-full"
                      />
                    </span>
                  </h3>
                </div>
                <div className="w-full lg:w-[60%]">
                  <p className="text-[15px] md:text-[17px] text-[#141413]/70 leading-relaxed max-w-[500px] transition-colors duration-300 group-hover/row:text-[#141413]">
                    {feat.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Section — LogoLoop */}
      <div className="relative mt-24 w-full">
        <div className="absolute top-0 left-0 right-0 h-px bg-[#111]/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f6f6f6] px-4">
          <div className="px-3 py-1 bg-black/5 rounded-md text-[10px] font-bold tracking-widest text-[#111]/50 uppercase mix-blend-overlay">
            Trusted by global enterprises
          </div>
        </div>

        <div className="pt-24 pb-16 w-full opacity-80 mix-blend-multiply">
          <LogoLoop
            logos={MARQUEE_ITEMS}
            speed={90}
            direction="left"
            gap={64}
            logoHeight={40}
            hoverSpeed={0}
            fadeOut
            fadeOutColor="#f6f6f6"
            ariaLabel="Industries and verticals we serve"
          />
        </div>
      </div>
    </section>
  );
}
