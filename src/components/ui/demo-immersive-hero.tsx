"use client";

import Image from "next/image";
import type { HeroComponentProps } from "@/types/demo-page";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 6000;

const gallerySlides = [
  {
    id: 0,
    images: [
      "https://images.unsplash.com/photo-1512914890250-353c97c9e7e2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1526481280695-3c687fd543c0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    id: 1,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1534448184015-62aea6bd6f66?auto=format&fit=crop&w=600&q=80",
    ],
  },
];

export function DemoImmersiveHero({
  headline,
  subheadline,
  primaryCtaText,
  primaryCtaLink,
  // partnerBadgeSrc, // not used in this specific visual
}: HeroComponentProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % gallerySlides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const current = gallerySlides[activeSlide];

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-black text-white">
      {/* Background image (Figma-style mountain hero) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1521292270410-a8c53642e9d0?auto=format&fit=crop&w=1600&q=80"
          alt="Immersive mountain landscape"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/55 to-black/25" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-10 lg:px-8">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          {/* Left column: label + heading + copy + CTA + socials */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col justify-center space-y-8">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="text-xs font-medium tracking-[0.2em] text-emerald-400 uppercase"
              >
                Immersive
              </motion.div>
            </AnimatePresence>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 110, damping: 18 }}
              className="text-balance text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ lineHeight: "var(--tw-leading-tight)" }}
            >
              <span className="block">{headline}</span>
              <span className="mt-1 block text-5xl font-semibold italic sm:text-6xl lg:text-7xl">
                Engagement
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, type: "spring", stiffness: 100, damping: 20 }}
              className="max-w-md text-sm text-gray-200 sm:text-base"
              style={{ lineHeight: "var(--tw-leading-tight)" }}
            >
              {subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, type: "spring", stiffness: 120, damping: 18 }}
              className="flex flex-col gap-6"
            >
              <div>
                <a
                  href={primaryCtaLink}
                  className="liquid-glass-pill-emerald inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-emerald-200 shadow-md shadow-emerald-500/20 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  {primaryCtaText}
                </a>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex flex-wrap gap-6 text-xs text-gray-300"
              >
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
                <a href="#" className="hover:text-white">
                  Youtube
                </a>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column: 3-card gallery slider with subtle transition */}
          <div className="col-span-12 md:col-span-6 lg:col-span-7 flex flex-col justify-end">
            <div className="flex flex-col items-end gap-6">
              <div className="liquid-glass flex gap-4 rounded-3xl bg-black/40 p-4">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex gap-4"
                  >
                    {current.images.map((src, index) => (
                      <div
                        key={src}
                        className="relative h-44 w-32 overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
                      >
                        <Image
                          src={src}
                          alt={`Gallery item ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex w-full items-center justify-between text-xs text-gray-200">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) =>
                        prev === 0 ? gallerySlides.length - 1 : prev - 1,
                      )
                    }
                    className="liquid-glass-pill flex h-8 w-8 items-center justify-center hover:opacity-90"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) => (prev + 1) % gallerySlides.length)
                    }
                    className="liquid-glass-pill flex h-8 w-8 items-center justify-center hover:opacity-90"
                  >
                    →
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-gray-200">
                  <span>{String(activeSlide + 1).padStart(2, "0")}</span>
                  <span className="h-px w-10 bg-white/60" />
                  <span>{String(gallerySlides.length).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

