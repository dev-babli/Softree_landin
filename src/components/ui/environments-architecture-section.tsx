"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Cpu, Layers3, PlayCircle, SquareChartGantt } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function EnvironmentsArchitectureSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root.querySelector(".main-container"),
          start: "top 78%",
          once: true,
        },
      });

      tl.fromTo(
        ".gs-line-v",
        { scaleY: 0 },
        { scaleY: 1, duration: 1.3, ease: "expo.inOut", stagger: 0.14 }
      )
        .fromTo(
          ".gs-line-h",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.3, ease: "expo.inOut", stagger: 0.14 },
          "-=1.0"
        )
        .fromTo(
          ".gs-dot",
          { opacity: 0, scale: 0, transformOrigin: "center center" },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 },
          "-=0.7"
        )
        .fromTo(".gs-fade", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.5")
        .fromTo(
          ".gs-reveal",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
          "-=0.55"
        )
        .fromTo(
          ".gs-stagger",
          { x: -15, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          "-=0.45"
        )
        .fromTo(
          ".svg-line",
          { strokeDasharray: 420, strokeDashoffset: 420 },
          { strokeDashoffset: 0, duration: 1.6, ease: "power3.inOut", stagger: 0.08 },
          "-=0.65"
        )
        .fromTo(
          ".svg-poly",
          { opacity: 0 },
          { opacity: 1, duration: 0.85, stagger: 0.12 },
          "-=1.15"
        )
        .fromTo(
          ".svg-dot",
          { scale: 0, transformOrigin: "center center" },
          { scale: 1, duration: 0.35, ease: "back.out(2)", stagger: 0.05 },
          "-=0.75"
        );

      gsap.to(".isometric-geometry", {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-[#F7F5F3] font-sans text-[#37322F] antialiased selection:bg-black/10"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.015) 0, rgba(0, 0, 0, 0.015) 1px, transparent 1px, transparent 8px)",
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-full max-w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.02] blur-[100px]" />

      <main className="main-container relative mx-auto w-full max-w-[1280px] px-4 py-20 sm:px-8 lg:py-32">
        <div className="gs-line-v absolute left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-transparent via-black/10 to-transparent sm:left-8 sm:block" />
        <div className="gs-line-v absolute right-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-transparent via-black/10 to-transparent sm:right-8 sm:block" />
        <div className="gs-line-h absolute left-0 top-12 h-px w-full origin-left bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <div className="gs-line-h absolute bottom-12 left-0 h-px w-full origin-right bg-gradient-to-r from-transparent via-black/10 to-transparent" />
        <div className="gs-line-v absolute bottom-24 left-1/2 top-24 hidden w-px origin-top bg-gradient-to-b from-transparent via-black/[0.08] to-transparent lg:block" />

        <div className="gs-dot absolute left-4 top-12 hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 border border-black/30 bg-[#F7F5F3] sm:left-8 sm:block" />
        <div className="gs-dot absolute right-4 top-12 hidden h-1.5 w-1.5 translate-x-1/2 -translate-y-1/2 border border-black/30 bg-[#F7F5F3] sm:right-8 sm:block" />
        <div className="gs-dot absolute bottom-12 left-4 hidden h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 border border-black/30 bg-[#F7F5F3] sm:left-8 sm:block" />
        <div className="gs-dot absolute bottom-12 right-4 hidden h-1.5 w-1.5 translate-x-1/2 translate-y-1/2 border border-black/30 bg-[#F7F5F3] sm:right-8 sm:block" />

        <div className="gs-fade absolute left-4 top-8 hidden h-4 w-4 border-l border-t border-black/40 sm:left-8 sm:block" />
        <div className="gs-fade absolute right-4 top-8 hidden h-4 w-4 border-r border-t border-black/40 sm:right-8 sm:block" />
        <div className="gs-fade absolute bottom-8 left-4 hidden h-4 w-4 border-b border-l border-black/40 sm:left-8 sm:block" />
        <div className="gs-fade absolute bottom-8 right-4 hidden h-4 w-4 border-b border-r border-black/40 sm:right-8 sm:block" />


        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start pt-16">
          <div className="gs-reveal relative mb-10 w-full border-b border-white/[0.08] pb-10">
            <h1 className="mb-2 text-3xl font-medium tracking-tight text-white md:text-5xl">
              Environments
            </h1>
            <p className="font-mono text-sm font-normal uppercase tracking-wide text-white/40">
              v2.4.0 // Scene Graph Architecture
            </p>
            <div className="absolute bottom-0 left-0 h-2 w-px bg-white/40" />
            <div className="absolute bottom-0 right-0 h-2 w-px bg-white/40" />
          </div>

          <div className="gs-reveal mb-16 w-full">
            <div className="flex items-center justify-start gap-2 overflow-x-auto pb-2 sm:gap-6">
              <button className="group relative flex shrink-0 items-center gap-2 px-4 py-3 text-xs font-normal text-white/50 transition-colors hover:text-white sm:text-sm">
                <Box className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
                WebGL Render
              </button>

              <div className="relative z-10 shrink-0 bg-gradient-to-b from-white/20 to-transparent p-[1px]">
                <button className="relative flex items-center gap-2 bg-[#0a0a0a] px-6 py-3 text-xs font-medium text-white shadow-[inset_0_1px_4px_rgba(255,255,255,0.05)] sm:text-sm">
                  <Layers3 className="h-4 w-4 text-white" />
                  Canvas 2D
                </button>
                <div className="absolute left-0 top-0 h-1.5 w-1.5 border-l border-t border-white" />
                <div className="absolute right-0 top-0 h-1.5 w-1.5 border-r border-t border-white" />
              </div>

              <button className="group relative flex shrink-0 items-center gap-2 px-4 py-3 text-xs font-normal text-white/50 transition-colors hover:text-white sm:text-sm">
                <Cpu className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
                WebGPU Pipeline
              </button>

              <button className="group relative flex shrink-0 items-center gap-2 px-4 py-3 text-xs font-normal text-white/50 transition-colors hover:text-white sm:text-sm">
                <SquareChartGantt className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
                SVG DOM Node
              </button>
            </div>
          </div>

          <div className="relative mx-auto grid min-h-[420px] w-full max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="relative z-10 flex flex-col items-start justify-center lg:pr-12">
              <div className="gs-stagger w-full">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-2 w-2 bg-white/20" />
                  <h3 className="text-xs font-normal uppercase tracking-[0.15em] text-white/60">
                    Rendering Context:
                  </h3>
                  <div className="h-px flex-1 bg-white/[0.05]" />
                </div>
              </div>

              <div className="gs-stagger">
                <h2 className="mb-6 text-3xl font-medium leading-tight tracking-tight text-white lg:text-4xl">
                  Hardware-Accelerated
                  <br />
                  Graphics &amp; Projections
                </h2>
              </div>

              <div className="gs-stagger">
                <p className="mb-10 max-w-md text-sm font-normal leading-relaxed text-white/50">
                  Construct highly performant, lightweight two-dimensional representations of complex spatial data.
                  Our foundational render engine bypasses heavy overhead by compiling geometry directly to primitive
                  draw calls within a strictly 2D flat context.
                </p>
              </div>

              <div className="gs-stagger">
                <div className="group relative inline-flex cursor-pointer bg-gradient-to-b from-white/30 via-white/5 to-transparent p-[1px] shadow-[0_4px_24px_rgba(255,255,255,0.03)] transition-all duration-300 hover:shadow-[0_4px_32px_rgba(255,255,255,0.08)]">
                  <button className="flex items-center gap-3 bg-[#080808] px-8 py-3 text-sm font-normal text-white transition-transform group-hover:bg-[#0c0c0c]">
                    <PlayCircle className="h-5 w-5 opacity-70 group-hover:opacity-100" />
                    Initialize Context
                  </button>
                  <div className="absolute bottom-1 right-1 h-1 w-1 border-b border-r border-white/40" />
                </div>
              </div>
            </div>

            <div className="gs-reveal relative flex h-[400px] w-full items-center justify-center lg:h-full">
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden border border-white/5 bg-[#030303]">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    backgroundPosition: "center center",
                  }}
                />

                <div className="absolute left-0 top-1/2 h-px w-full bg-white/[0.05]" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.05]" />

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 400"
                  preserveAspectRatio="xMidYMid meet"
                  className="relative z-10"
                >
                  <g className="axes" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="200" y1="200" x2="80" y2="270" stroke="rgba(100, 150, 255, 0.4)" className="svg-line" />
                    <line x1="200" y1="200" x2="320" y2="270" stroke="rgba(255, 100, 100, 0.4)" className="svg-line" />
                    <line x1="200" y1="200" x2="200" y2="50" stroke="rgba(100, 255, 100, 0.4)" className="svg-line" />

                    <text x="70" y="285" fill="rgba(255,255,255,0.4)" className="text-xs font-mono">
                      -z
                    </text>
                    <text x="325" y="285" fill="rgba(255,255,255,0.4)" className="text-xs font-mono">
                      +x
                    </text>
                    <text x="200" y="40" fill="rgba(255,255,255,0.4)" className="text-center text-xs font-mono" textAnchor="middle">
                      +y
                    </text>
                  </g>

                  <g className="isometric-geometry" transform="translate(0, 20)">
                    <polygon points="200,320 114,270 200,220 286,270" fill="rgba(255,255,255,0.02)" />
                    <polygon points="114,150 200,200 200,300 114,250" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" className="svg-poly" />
                    <polygon points="200,200 286,150 286,250 200,300" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" className="svg-poly" />
                    <polygon points="200,100 286,150 200,200 114,150" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" className="svg-poly" />

                    <g stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 4" className="svg-line">
                      <line x1="157" y1="125" x2="243" y2="175" />
                      <line x1="243" y1="125" x2="157" y2="175" />
                      <line x1="157" y1="175" x2="157" y2="275" />
                      <line x1="243" y1="175" x2="243" y2="275" />
                    </g>

                    <circle cx="200" cy="100" r="2.5" fill="#fff" className="svg-dot" />
                    <circle cx="114" cy="150" r="2.5" fill="#fff" className="svg-dot" />
                    <circle cx="286" cy="150" r="2.5" fill="#fff" className="svg-dot" />
                    <circle cx="200" cy="200" r="3" fill="#fff" className="svg-dot" />
                    <circle cx="114" cy="250" r="2.5" fill="rgba(255,255,255,0.5)" className="svg-dot" />
                    <circle cx="286" cy="250" r="2.5" fill="rgba(255,255,255,0.5)" className="svg-dot" />
                    <circle cx="200" cy="300" r="2.5" fill="rgba(255,255,255,0.5)" className="svg-dot" />
                  </g>

                  <g transform="translate(260, 80)" className="gs-fade">
                    <rect x="0" y="0" width="90" height="44" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.1)" />
                    <text x="10" y="16" fill="rgba(255,255,255,0.6)" className="text-xs font-mono">
                      POS: [x,y]
                    </text>
                    <text x="10" y="30" fill="rgba(255,255,255,0.9)" className="text-xs font-mono">
                      RND: PASS
                    </text>
                    <line x1="0" y1="20" x2="-20" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                  </g>
                </svg>

                <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-white/40" />
                <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-white/40" />
                <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/40" />
                <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-white/40" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

