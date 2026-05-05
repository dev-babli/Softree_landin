"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const heroVideo = {
  mp4: "https://cdn.prod.website-files.com/6951de750ecd7c3964b524bc/697894e09e4f4dff082cc608_4954758_Coll_halloween_Dusty_6144x3456%20%281%29_mp4.mp4",
  webm: "https://cdn.prod.website-files.com/6951de750ecd7c3964b524bc/697894e09e4f4dff082cc608_4954758_Coll_halloween_Dusty_6144x3456%20%281%29_webm.webm",
  poster:
    "https://cdn.prod.website-files.com/6951de750ecd7c3964b524bc/697894e09e4f4dff082cc608_4954758_Coll_halloween_Dusty_6144x3456%20%281%29_poster.0000000.jpg",
};

const heroLights = {
  center:
    "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b12671422a5f9268c76fcb_Light.png",
  left: "https://cdn.prod.website-files.com/69b11728ded32396d2900c12/69b12671422a5f9268c76fc5_Light%20Left.png",
};

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          poster={heroVideo.poster}
        >
          <source src={heroVideo.mp4} type="video/mp4" />
          <source src={heroVideo.webm} type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_28%),linear-gradient(180deg,rgba(5,8,22,0.12),rgba(5,8,22,0.92)_68%,#050816)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:88px_88px] opacity-25" />
      </div>

      <Image
        src={heroLights.center}
        alt=""
        width={1440}
        height={900}
        className="pointer-events-none absolute left-1/2 top-[-4%] z-[1] h-auto w-[1100px] max-w-none -translate-x-1/2 opacity-80"
      />
      <Image
        src={heroLights.left}
        alt=""
        width={760}
        height={760}
        className="pointer-events-none absolute left-[-6%] top-[20%] z-[1] h-auto w-[520px] opacity-70 blur-[1px]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050816] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-6 pb-20 pt-32 sm:px-10 lg:px-16">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <div className="relative mb-8 inline-flex items-center rounded-full border border-white/12 bg-white/6 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.32em] text-white/72 backdrop-blur-md">
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_70%)]" />
            <span className="relative z-10">About Us</span>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, rotate: 18, scaleX: 0.72 }}
            whileInView={reducedMotion ? {} : { opacity: 1, rotate: 0, scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 h-px w-56 origin-center bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.95),transparent)] shadow-[0_0_36px_rgba(56,189,248,0.75)]"
          />

          <AnimatedText
            as="h1"
            text="Empowering Your Smart Trading with AI"
            mode="chars"
            delay={0.08}
            className="max-w-5xl text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.04em] text-white sm:text-6xl lg:text-[86px]"
          />

          <AnimatedText
            as="p"
            text="We build intelligence-led trading experiences that combine predictive AI, real-time market signals, and decision systems designed for modern portfolio teams."
            mode="words"
            delay={0.26}
            className="mt-8 max-w-2xl text-balance text-base leading-8 text-white/62 sm:text-lg"
          />
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 50 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.95, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 grid w-full max-w-5xl gap-4 rounded-[28px] border border-white/10 bg-white/[0.045] p-4 shadow-[0_30px_120px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:grid-cols-3"
        >
          {[
            ["2015", "Built on institutional market fundamentals"],
            ["24/7", "Signal infrastructure with continuous monitoring"],
            ["AI-led", "Adaptive analysis tuned for fast decisions"],
          ].map(([value, label], index) => (
            <motion.div
              key={value}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.45 + index * 0.1 }}
              className="rounded-[22px] border border-white/8 bg-black/20 px-5 py-6 text-left"
            >
              <div className="text-3xl font-semibold tracking-[-0.04em] text-white">{value}</div>
              <p className="mt-2 max-w-[18ch] text-sm leading-6 text-white/55">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
