"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, type Variants } from "framer-motion"
import Lottie from "lottie-react"

const LOTTIE_URL =
  "https://cdn.prod.website-files.com/68b6ff99deb8a7b82b41a88b/68dcd6833e1b05dd95095d27_eed5223c568804161531e4150b644ec9_data.json"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

const viewport = { once: true, margin: "-100px" } as const

function LottieFromUrl({ url }: { url: string }) {
  const [data, setData] = useState<object | null>(null)
  useEffect(() => {
    let alive = true
    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        if (alive) setData(j)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [url])
  if (!data) return null
  return <Lottie animationData={data} loop autoplay className="h-full w-full" />
}

export default function LightFeaturesV1() {
  return (
    <section className="features-v1 relative w-full bg-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1268px] px-5 md:px-8">
        {/* Section header */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="text-balance text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#0a0a1a] md:text-[52px] lg:text-[64px]"
          >
            Create with ease like never before.
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#0a0a1a]/55 md:text-base"
          >
            Fintech is its potential to promote financial inclusion. In many parts of the world, millions of people lack access to traditional banking services.
          </motion.p>
        </div>

        {/* Main wrap */}
        <div className="flex flex-col gap-5 md:gap-6">
          {/* TOP — Card 01 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="features-v1-card-01 relative overflow-hidden rounded-[32px] border border-[#0a0a1a]/[0.08] bg-[#f4f5f7]"
          >
            <div className="grid grid-cols-1 items-center gap-0 md:grid-cols-2">
              {/* Left */}
              <div className="flex flex-col gap-5 p-8 md:p-12 lg:p-14">
                <div className="label-wrap light-green inline-flex w-fit items-center rounded-full bg-[#d8f3c2] px-3.5 py-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-black">
                    Overview of Interface
                  </span>
                </div>
                <h3 className="text-[26px] font-semibold leading-[1.12] tracking-[-0.02em] text-[#0a0a1a] md:text-[34px] lg:text-[40px]">
                  Designed with an intuitive experience users love.
                </h3>
                <p className="max-w-md text-[15px] leading-relaxed text-[#0a0a1a]/55 md:text-base">
                  An intuitive interface means can quickly understand how to perform talks without the need for extensive training or guidance.
                </p>
              </div>

              {/* Right — image */}
              <div className="relative h-[300px] w-full overflow-hidden md:h-[420px] lg:h-[480px]">
                <Image
                  src="https://cdn.prod.website-files.com/68b6ff99deb8a7b82b41a88b/68bf3f4fcb2729edbec31cd0_Features%20Card%2001.webp"
                  alt="Features Card 01"
                  fill
                  sizes="(max-width: 768px) 100vw, 634px"
                  className="object-cover object-center"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>

          {/* BOTTOM — 2 cards */}
          <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
            {/* Card 02 — Easy Integration (Lottie) */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="features-v1-card-02 relative flex flex-col overflow-hidden rounded-[32px] border border-[#0a0a1a]/[0.08] bg-[#f4f5f7]"
            >
              <div className="relative flex h-[340px] items-center justify-center overflow-hidden md:h-[380px] lg:h-[420px]">
                <LottieFromUrl url={LOTTIE_URL} />
              </div>
              <div className="flex flex-col gap-3 p-8 md:p-10 lg:p-12">
                <h4 className="text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0a0a1a] md:text-[28px]">
                  Easy Integration
                </h4>
                <p className="max-w-sm text-[15px] leading-relaxed text-[#0a0a1a]/55">
                  Integrates with other tools and systems steamlining their worflow.
                </p>
              </div>
            </motion.div>

            {/* Card 03 — Trusted Support Team */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="features-v1-card-02 relative flex flex-col overflow-hidden rounded-[32px] border border-[#0a0a1a]/[0.08] bg-[#f4f5f7]"
            >
              <div className="relative flex h-[340px] items-center justify-center overflow-hidden md:h-[380px] lg:h-[420px]">
                {/* Shadow beneath */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewport}
                  transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-[14%] left-1/2 w-[72%] -translate-x-1/2"
                >
                  <Image
                    src="https://cdn.prod.website-files.com/68b6ff99deb8a7b82b41a88b/68db792a59cdf0fd20f3d302_Shadow.avif"
                    alt=""
                    width={500}
                    height={80}
                    className="h-auto w-full"
                  />
                </motion.div>

                {/* Main image */}
                <div className="relative h-[78%] w-[76%]">
                  <Image
                    src="https://cdn.prod.website-files.com/68b6ff99deb8a7b82b41a88b/68bf3f4f3746318550a6b91f_99e0c53ce72663410403ef302e227598_Features%20Card%2003.avif"
                    alt="Features Card 03"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain"
                  />
                </div>

                {/* Support badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={viewport}
                  transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-6 right-6 md:bottom-8 md:right-8"
                >
                  <Image
                    src="https://cdn.prod.website-files.com/68b6ff99deb8a7b82b41a88b/68db79b3a955a21269830a68_Support.svg"
                    alt="Support"
                    width={120}
                    height={120}
                    className="h-auto w-[88px] md:w-[110px]"
                  />
                </motion.div>
              </div>
              <div className="flex flex-col gap-3 p-8 md:p-10 lg:p-12">
                <h4 className="text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#0a0a1a] md:text-[28px]">
                  Trusted Support Team
                </h4>
                <p className="max-w-sm text-[15px] leading-relaxed text-[#0a0a1a]/55">
                  Recognized for responses and knowledge for quick solutions
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
