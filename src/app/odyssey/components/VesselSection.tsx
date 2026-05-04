"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const vesselViews = [
  {
    id: "exterior",
    label: "Exterior",
    description: "360° sweep of the hull in deep space vacuum",
    video: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
  },
  {
    id: "observation",
    label: "Observation Deck",
    description: "Earthrise through panoramic viewport",
    video: "https://assets.mixkit.co/videos/preview/mixkit-earth-seen-from-space-2698-large.mp4",
  },
  {
    id: "interior",
    label: "Zero-G Chamber",
    description: "Water droplets suspended in microgravity",
    video: "https://assets.mixkit.co/videos/preview/mixkit-white-fractal-particle-explosion-2762-large.mp4",
  },
];

export default function VesselSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeView, setActiveView] = useState("exterior");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    // Title animation
    gsap.fromTo(
      ".vessel-title",
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      }
    );

    // Main vessel view parallax
    gsap.fromTo(
      ".vessel-main-view",
      { scale: 1.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const activeVideo = vesselViews.find((v) => v.id === activeView);

  return (
    <section
      ref={sectionRef}
      id="vessel"
      className="relative min-h-screen bg-black py-32 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 perspective-grid opacity-20" />

      <div className="max-w-[1800px] mx-auto px-8">
        {/* Section Header */}
        <div className="mb-16">
          <span className="block text-[10px] tracking-[0.4em] text-[#FF0000]/70 uppercase mb-4 hal-glow">
            02 — The Vessel
          </span>
          <h2 className="vessel-title odyssey-heading text-[clamp(32px,5vw,64px)] tracking-[0.2em] text-[#F5F5F5]">
            Aries IX
          </h2>
          <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-[#B0BEC5]/60 tracking-wide">
            Named for the constellation that guided ancient navigators. 
            Our spacecraft combines titanium hull integrity with panoramic transparency.
          </p>
        </div>

        {/* Main Viewport */}
        <div
          ref={containerRef}
          className="relative aspect-[21/9] mb-8 overflow-hidden border border-[#B0BEC5]/10"
        >
          {/* Video */}
          <div className="vessel-main-view relative w-full h-full">
            <video
              key={activeView}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={activeVideo?.video} type="video/mp4" />
            </video>
            <div className="odyssey-video-overlay" />
            <div className="vignette" />
            <div className="film-grain opacity-30" />
          </div>

          {/* View Label */}
          <div className="absolute top-8 left-8 z-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#B0BEC5]/50">
              Current View
            </span>
            <p className="odyssey-heading text-lg tracking-[0.15em] text-[#F5F5F5] mt-1">
              {activeVideo?.label}
            </p>
          </div>

          {/* Rotation Indicator */}
          <div className="absolute bottom-8 right-8 z-10 flex items-center gap-4">
            <svg
              viewBox="0 0 60 60"
              className="w-12 h-12 animate-spin"
              style={{ animationDuration: "20s" }}
            >
              <circle
                cx="30"
                cy="30"
                r="28"
                fill="none"
                stroke="rgba(176, 190, 197, 0.2)"
                strokeWidth="0.5"
              />
              <circle
                cx="30"
                cy="30"
                r="20"
                fill="none"
                stroke="rgba(245, 245, 245, 0.4)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            </svg>
            <span className="text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase">
              360° Orbit
            </span>
          </div>

          {/* Technical Readout */}
          <div className="absolute bottom-8 left-8 z-10 instrument-panel px-6 py-4">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <span className="block text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase">
                  Hull Temp
                </span>
                <span className="instrument-value text-sm">-120°C</span>
              </div>
              <div>
                <span className="block text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase">
                  Cabin Pressure
                </span>
                <span className="instrument-value text-sm">101.3 kPa</span>
              </div>
              <div>
                <span className="block text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase">
                  Life Support
                </span>
                <span className="text-[#00FF00]/70 text-xs tracking-wider">● Nominal</span>
              </div>
            </div>
          </div>
        </div>

        {/* View Selector */}
        <div className="grid grid-cols-3 gap-[1px] bg-[#B0BEC5]/10">
          {vesselViews.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`relative bg-black p-6 text-left transition-all duration-500 group ${
                activeView === view.id ? "border-t border-[#F5F5F5]/30" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`odyssey-heading text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${
                    activeView === view.id ? "text-[#F5F5F5]" : "text-[#B0BEC5]/50"
                  }`}
                >
                  {view.label}
                </span>
                <span
                  className={`text-[8px] tracking-[0.2em] transition-colors duration-500 ${
                    activeView === view.id ? "text-[#F5F5F5]" : "text-[#B0BEC5]/30"
                  }`}
                >
                  {view.id === activeView ? "●" : "○"}
                </span>
              </div>
              <p
                className={`text-[11px] leading-relaxed transition-colors duration-500 ${
                  activeView === view.id ? "text-[#B0BEC5]/70" : "text-[#B0BEC5]/40"
                }`}
              >
                {view.description}
              </p>
              <div
                className={`absolute bottom-0 left-0 h-[1px] bg-[#F5F5F5]/50 transition-all duration-700 ${
                  activeView === view.id ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Specifications */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-[#B0BEC5]/10">
          <div>
            <span className="instrument-value">28.5 m</span>
            <span className="block text-[10px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mt-2">
              Length
            </span>
          </div>
          <div>
            <span className="instrument-value">6.7 m</span>
            <span className="block text-[10px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mt-2">
              Diameter
            </span>
          </div>
          <div>
            <span className="instrument-value">4</span>
            <span className="block text-[10px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mt-2">
              Crew Capacity
            </span>
          </div>
          <div>
            <span className="instrument-value">180 days</span>
            <span className="block text-[10px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mt-2">
              Mission Duration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
