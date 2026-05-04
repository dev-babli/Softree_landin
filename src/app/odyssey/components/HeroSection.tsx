"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    if (!section || !video || !content) return;

    // Slow zoom effect on video
    gsap.to(video, {
      scale: 1.15,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    // Parallax on scroll
    gsap.to(content, {
      y: -100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "50% top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background - Space Docking Sequence */}
      <div className="absolute inset-0 enr-grade">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1920&q=80"
        >
          {/* Placeholder: In production, use actual space station docking video */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
        </video>
        <div className="odyssey-video-overlay" />
        <div className="vignette" />
        <div className="film-grain" />
        <div className="scan-lines" />
      </div>

      {/* Rotating Spacecraft SVG Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 400 400"
          className="w-[600px] h-[600px] opacity-30"
          style={{ animation: "spin 120s linear infinite" }}
        >
          <defs>
            <linearGradient id="hullGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5F5F5" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#B0BEC5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F5F5F5" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Sleek spacecraft silhouette */}
          <ellipse
            cx="200"
            cy="200"
            rx="180"
            ry="60"
            fill="none"
            stroke="url(#hullGradient)"
            strokeWidth="0.5"
          />
          <ellipse
            cx="200"
            cy="200"
            rx="120"
            ry="40"
            fill="none"
            stroke="url(#hullGradient)"
            strokeWidth="0.3"
            opacity="0.5"
          />
          {/* Sunlight line across hull */}
          <line
            x1="50"
            y1="200"
            x2="350"
            y2="200"
            stroke="#F5F5F5"
            strokeWidth="0.5"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Stars - Static */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 h-full flex flex-col items-center justify-center px-8"
      >
        {/* Main Title */}
        <h1 className="hero-title opacity-0 translate-y-8 text-center">
          <span className="odyssey-heading block text-[clamp(24px,4vw,48px)] tracking-[0.5em] text-[#F5F5F5]">
            ODYSSEY
          </span>
          <span className="odyssey-heading block text-[clamp(24px,4vw,48px)] tracking-[0.5em] text-[#F5F5F5]/40 mt-2">
            BEYOND
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle opacity-0 translate-y-8 mt-12 text-center">
          <span className="block text-[10px] tracking-[0.4em] uppercase text-[#B0BEC5]/60">
            Commercial Orbital Departures
          </span>
          <span className="block text-[10px] tracking-[0.4em] uppercase text-[#FF0000]/80 mt-3 hal-glow">
            — 2027 —
          </span>
        </p>

        {/* CTA - Airlock Button */}
        <div className="hero-cta opacity-0 mt-20">
          <button className="airlock-cta">
            <div className="airlock-cta-inner">
              <span className="airlock-cta-text">Enter</span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-[#B0BEC5]/10">
        <div className="max-w-[1800px] mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase">
              <span className="block">Altitude</span>
              <span className="text-[#F5F5F5]/60 instrument-readout">408 km</span>
            </div>
            <div className="text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase">
              <span className="block">Velocity</span>
              <span className="text-[#F5F5F5]/60 instrument-readout">7.66 km/s</span>
            </div>
          </div>
          <div className="text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase">
            <span className="cursor-blink text-[#FF0000]/60">●</span>
            <span className="ml-2">Systems Nominal</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
