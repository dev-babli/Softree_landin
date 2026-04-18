"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  SplitFlapText,
  SplitFlapMuteToggle,
  SplitFlapAudioProvider,
} from "@/components/landing/split-flap-text";
import { AnimatedSphere } from "./animated-sphere";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight, Brain, Database, type LucideIcon } from "lucide-react";
import { Button } from "@/components/optimus/ui/button";

type SiLogo = { kind: "si"; slug: string; color?: string };
type LucideLogo = { kind: "lucide"; Icon: LucideIcon };
type StackLogo = SiLogo | LucideLogo;

const HERO_LANYARD_TILES: Array<{
  kicker: string;
  title: string;
  body: string;
  kickerClass: string;
  logos: StackLogo[];
}> = [
  {
    kicker: "01 / AI Tools",
    title: "Agentic Intelligence",
    body: "Next-gen multimodal models & automated agents.",
    kickerClass: "text-emerald-700",
    logos: [
      { kind: "si", slug: "openai", color: "412991" },
      { kind: "si", slug: "anthropic", color: "D4A27F" },
      { kind: "si", slug: "huggingface", color: "FFD21E" },
      { kind: "lucide", Icon: Brain },
    ],
  },
  {
    kicker: "02 / Data",
    title: "Data Engineering",
    body: "Scale pipelines with advanced analytics processing.",
    kickerClass: "text-sky-700",
    logos: [
      { kind: "si", slug: "postgresql", color: "4169E1" },
      { kind: "si", slug: "redis", color: "DC382D" },
      { kind: "si", slug: "apachekafka", color: "ffffff" },
      { kind: "lucide", Icon: Database },
    ],
  },
  {
    kicker: "03 / Engineering",
    title: "Web & Mobile Apps",
    body: "React, Next.js, and high-performance native iOS.",
    kickerClass: "text-orange-400",
    logos: [
      { kind: "si", slug: "nextdotjs", color: "ffffff" },
      { kind: "si", slug: "react", color: "61DAFB" },
      { kind: "si", slug: "typescript", color: "3178C6" },
      { kind: "si", slug: "tailwindcss", color: "06B6D4" },
    ],
  },
  {
    kicker: "04 / Enterprise",
    title: "Microsoft Services",
    body: "Unified workflow via SharePoint & Power Platform.",
    kickerClass: "text-indigo-700",
    logos: [
      { kind: "si", slug: "microsoft", color: "ffffff" },
      { kind: "si", slug: "microsoftazure", color: "0078D4" },
      { kind: "si", slug: "microsoftsharepoint", color: "038387" },
      { kind: "si", slug: "powerbi", color: "F2C811" },
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

const Lanyard = dynamic(() => import("@/components/lanyard/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[220px] w-full items-center justify-center text-[10px] text-neutral-500">
      …
    </div>
  ),
});

function LanyardStackRow({ logos }: { logos: StackLogo[] }) {
  return (
    <div className="mb-1 flex max-w-[10rem] flex-wrap justify-center gap-1 sm:max-w-[11rem] sm:gap-1.5">
      {logos.map((logo, i) => {
        if (logo.kind === "si") {
          const hex = logo.color ?? "ffffff";
          return (
            <Image
              key={`${logo.slug}-${i}`}
              src={`https://cdn.simpleicons.org/${logo.slug}/${hex}`}
              alt=""
              width={20}
              height={20}
              className="h-3.5 w-3.5 shrink-0 object-contain opacity-95 sm:h-[18px] sm:w-[18px]"
              unoptimized
            />
          );
        }
        const Icon = logo.Icon;
        return (
          <Icon
            key={i}
            className="h-3.5 w-3.5 shrink-0 text-neutral-800 sm:h-[18px] sm:w-[18px]"
            strokeWidth={1.75}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

export function SplitFlapHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const revealEl = scrollRevealRef.current;
    if (!section || !revealEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealEl,
        { y: 0, opacity: 1, force3D: true },
        {
          y: -48,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${Math.min(
                Math.max(section.offsetHeight * 0.5, 1),
                typeof window !== "undefined" ? window.innerHeight * 0.85 : 600
              )}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section);

    const refresh = () => {
      ScrollTrigger.refresh();
    };
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-white text-neutral-950"
    >
      {/* Animated sphere background — optimus accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-none">
        <AnimatedSphere />
      </div>

      {/* Subtle grid lines — optimus style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-neutral-950/8"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-neutral-950/8"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      {/* Left vertical label — optimus mono style */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10">
        <span className="origin-left -rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500">
          SOFTREE &mdash; IT &amp; AI
        </span>
      </div>

      {/* Main content: outer shell (no transform) so layout stays stable */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 pl-16 md:pl-28 lg:px-12 lg:py-32">
        {/* Parallax fade only on hero body — stats stay readable */}
        <div ref={scrollRevealRef} className="will-change-transform">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-8">

          {/* Left column: split-flap letters → copy & CTAs */}
          <div className="relative z-20 flex w-full flex-col items-start lg:col-span-10 xl:col-span-9">
            <SplitFlapAudioProvider>
              <div className="relative mb-2">
                <SplitFlapText text="SOFTREE" speed={70} tileTheme="light" />
                <div className="mt-4">
                  <SplitFlapMuteToggle className="!text-neutral-600 hover:!text-neutral-950" />
                </div>
              </div>
            </SplitFlapAudioProvider>

            <h2 className="mb-5 mt-6 font-mono text-[clamp(0.9rem,2vw,1.5rem)] tracking-wide text-neutral-800 lg:mt-8">
              Where Vision Meets Execution
            </h2>

            <p className="mb-6 max-w-xl text-xl leading-relaxed text-neutral-700 lg:mb-7 lg:text-2xl">
              From Agentic AI to enterprise web apps — Softree turns your boldest
              ideas into production-grade software, faster.
            </p>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <Button
                size="lg"
                className="h-14 rounded-full bg-neutral-950 px-8 text-base text-white hover:bg-neutral-800 group"
                onClick={() => (window.location.href = "/contact")}
              >
                Start a project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-neutral-300 px-8 text-base text-neutral-950 hover:bg-neutral-100"
                onClick={() => (window.location.href = "/services")}
              >
                Our services
              </Button>
            </div>
          </div>
        </div>
        </div>

        {/* Stats marquee — optimus style (outside scroll parallax) */}
        <div className="mt-16 overflow-hidden lg:mt-20">
          <div className="flex gap-16 whitespace-nowrap animate-marquee">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16">
                {[
                  { value: "50+", label: "enterprise clients", company: "WORLDWIDE" },
                  { value: "200+", label: "projects delivered", company: "SINCE 2015" },
                  { value: "98%", label: "client retention", company: "SOFTREE" },
                  { value: "10x", label: "faster with AI", company: "AGENTIC AI" },
                ].map((stat) => (
                  <div key={`${stat.company}-${i}`} className="flex items-baseline gap-4">
                    <span className="font-display text-4xl text-neutral-950 lg:text-5xl">{stat.value}</span>
                    <span className="text-sm text-neutral-600">
                      {stat.label}
                      <span className="block font-mono text-xs mt-1">{stat.company}</span>
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corner badge — optimus style */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10">
        <div className="border border-neutral-200 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
          Softree v2025
        </div>
      </div>
    </section>
  );
}

export function LanyardShowcase() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-10 text-center lg:mb-14">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
            Our Expertise
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What We Build
          </h2>
        </div>

        <div className="grid w-full min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {HERO_LANYARD_TILES.map((tile) => (
            <div
              key={tile.kicker}
              className="group relative min-h-0 min-w-0 h-[320px] sm:h-[380px] lg:h-[420px]"
            >
              <div className="h-full w-full">
                <Lanyard
                  embed
                  transparent
                  bare
                  cardIcons={tile.logos
                    .filter((l): l is SiLogo => l.kind === "si")
                    .map((l) => ({ slug: l.slug, color: l.color }))}
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent px-2 pb-4 pt-16 text-center sm:px-3 sm:pb-5 sm:pt-20">
                <div
                  className={`mb-1 font-mono text-[8px] uppercase tracking-widest sm:text-[9px] ${tile.kickerClass.replace("-700", "-400")}`}
                >
                  {tile.kicker}
                </div>
                <h3 className="mb-1.5 max-w-[10rem] text-xs font-bold leading-tight text-white sm:max-w-[12rem] sm:text-sm">
                  {tile.title}
                </h3>
                <LanyardStackRow logos={tile.logos} />
                <p className="mt-1 line-clamp-2 max-w-[10rem] text-[9px] leading-snug text-neutral-400 sm:max-w-[11rem] sm:text-[10px]">
                  {tile.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
