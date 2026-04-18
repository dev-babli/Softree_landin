"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ServiceShowcaseItem } from "@/types/demo-page";
import { ChevronRight } from "lucide-react";

interface FourServicesShowcaseProps {
  services: ServiceShowcaseItem[];
  /** Optional: brand name for ring CTA (e.g. "SOFTREE") */
  brandName?: string;
}

function CircularCtaRing({
  text,
  href = "/contact",
  ringId,
}: {
  text: string;
  href?: string;
  ringId: string;
}) {
  return (
    <Link
      href={href}
      className="group absolute -right-4 top-1/2 z-10 flex h-20 w-20 -translate-y-1/2 flex-shrink-0 items-center justify-center rounded-full shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 md:h-24 md:w-24"
      aria-label={text}
    >
      {/* Black ring with white text; white center */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden
      >
        <defs>
          <path
            id={ringId}
            d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
        </defs>
        <circle cx="50" cy="50" r="48" fill="#171717" />
        <circle cx="50" cy="50" r="38" fill="white" />
        <text className="fill-white text-[4.5px] font-semibold uppercase tracking-[0.15em]">
          <textPath href={`#${ringId}`}>{text.repeat(2)}</textPath>
        </text>
      </svg>
      {/* Inner white circle with black arrow (overlay) */}
      <span className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-900 transition group-hover:bg-neutral-50 md:h-12 md:w-12">
        <ChevronRight className="h-4 w-4 rotate-[-45deg] md:h-5 md:w-5" aria-hidden />
      </span>
    </Link>
  );
}

export function FourServicesShowcase({
  services,
  brandName = "SOFTREE",
}: FourServicesShowcaseProps) {
  return (
    <section className="bg-white text-neutral-900">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 lg:gap-y-20">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="col-span-12 grid grid-cols-12 gap-x-6 gap-y-8 lg:grid-cols-12 lg:items-center"
            >
              {/* Left: copy */}
              <div className="col-span-12 space-y-5 lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800/80 bg-white px-4 py-2 text-xs font-medium text-neutral-800">
                  <span className="text-neutral-600">+</span>
                  {service.badgeText}
                </div>
                <h2
                  className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.25rem]"
                  style={{ lineHeight: "var(--tw-leading-tight)" }}
                >
                  {service.headline}{" "}
                  <span className="font-semibold text-neutral-500">
                    {service.headlineAccentWord}
                  </span>
                </h2>
                <p
                  className="max-w-lg text-base text-neutral-600"
                  style={{ lineHeight: "var(--tw-leading-tight)" }}
                >
                  {service.subheadline}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={service.primaryCtaLink}
                    className="inline-flex items-center justify-center rounded-full border-2 border-neutral-800 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                  >
                    {service.primaryCtaText}
                  </Link>
                  <Link
                    href={service.secondaryCtaLink}
                    className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                  >
                    {service.secondaryCtaText}
                  </Link>
                </div>
              </div>

              {/* Right: visual card + ring */}
              <div className="relative col-span-12 lg:col-span-7">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 p-1 shadow-2xl">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] bg-indigo-950">
                    <Image
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-transparent to-indigo-900/30" />
                  </div>
                </div>
                <CircularCtaRing
                  ringId={`ring-${service.id}`}
                  text={service.ringCtaText || `GET IN TOUCH WITH ${brandName} `}
                  href={service.primaryCtaLink}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
