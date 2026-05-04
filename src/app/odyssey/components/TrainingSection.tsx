"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const trainingModules = [
  {
    id: "centrifuge",
    number: "01",
    name: "High-G Centrifuge",
    description: "Experience sustained acceleration forces up to 4G in our 15-meter diameter centrifuge. Learn to maintain consciousness and cognitive function under extreme load.",
    duration: "6 sessions",
    video: "https://assets.mixkit.co/videos/preview/mixkit-white-fractal-particle-explosion-2762-large.mp4",
  },
  {
    id: "zerog",
    number: "02",
    name: "Microgravity Simulation",
    description: "24 hours of cumulative weightlessness training in our parabolic flight laboratory. Master movement, tool use, and emergency protocols in zero-G.",
    duration: "4 days",
    video: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-68-large.mp4",
  },
  {
    id: "suit",
    number: "03",
    name: "Pressure Suit Operations",
    description: "Intimate familiarity with your second skin. Donning procedures, life support management, and EVA preparation in simulated vacuum conditions.",
    duration: "12 sessions",
    video: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
  },
  {
    id: "isolation",
    number: "04",
    name: "Isolation Chamber",
    description: "72 hours of solitude in sensory-controlled environment. Psychological resilience assessment for extended orbital missions.",
    duration: "72 hours",
    video: "https://assets.mixkit.co/videos/preview/mixkit-full-moon-in-the-dark-sky-1072-large.mp4",
  },
];

export default function TrainingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    // Title reveal
    gsap.fromTo(
      ".training-title",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      }
    );

    // Cards reveal with Kubrick one-point perspective
    const cardElements = cards.querySelectorAll(".training-card");
    gsap.fromTo(
      cardElements,
      { opacity: 0, z: -200, scale: 0.9 },
      {
        opacity: 1,
        z: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cards,
          start: "top 70%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="training"
      className="relative min-h-screen bg-black py-32 overflow-hidden"
    >
      {/* One-Point Perspective Grid Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background: `
              linear-gradient(90deg, transparent 49.5%, rgba(176, 190, 197, 0.05) 49.5%, rgba(176, 190, 197, 0.05) 50.5%, transparent 50.5%),
              linear-gradient(0deg, transparent 49.5%, rgba(176, 190, 197, 0.05) 49.5%, rgba(176, 190, 197, 0.05) 50.5%, transparent 50.5%)
            `,
            backgroundSize: "100px 100px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "center center",
            opacity: 0.3,
          }}
        />
      </div>

      <div className="max-w-[1800px] mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-24 text-center">
          <span className="block text-[10px] tracking-[0.4em] text-[#FF0000]/70 uppercase mb-4 hal-glow">
            03 — Training Program
          </span>
          <h2 className="training-title odyssey-heading text-[clamp(32px,5vw,64px)] tracking-[0.2em] text-[#F5F5F5]">
            Preparation
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-[13px] leading-relaxed text-[#B0BEC5]/60 tracking-wide">
            Four stages of transformation. From Earth-bound to space-faring. 
            Each module designed with the precision of mission-critical systems.
          </p>
        </div>

        {/* Training Cards - Kubrick Symmetry */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[#B0BEC5]/5"
          style={{ perspective: "1000px" }}
        >
          {trainingModules.map((module, index) => (
            <div
              key={module.id}
              className="training-card relative bg-black group"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Video Background */}
              <div className="absolute inset-0 overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-1000"
                >
                  <source src={module.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-12 md:p-16 min-h-[400px] flex flex-col">
                {/* Module Number */}
                <div className="flex items-center justify-between mb-8">
                  <span className="odyssey-heading text-[80px] md:text-[120px] leading-none text-[#F5F5F5]/5 select-none">
                    {module.number}
                  </span>
                  <div className="text-right">
                    <span className="block text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase">
                      Duration
                    </span>
                    <span className="instrument-readout text-[#F5F5F5]/70">
                      {module.duration}
                    </span>
                  </div>
                </div>

                {/* Module Info */}
                <div className="mt-auto">
                  <h3 className="odyssey-heading text-xl md:text-2xl tracking-[0.15em] text-[#F5F5F5] mb-4">
                    {module.name}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-[#B0BEC5]/60 max-w-md">
                    {module.description}
                  </p>
                </div>

                {/* Symmetry Line */}
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0 ? "right-0" : "left-0"
                  } w-[1px] h-full bg-[#B0BEC5]/10 hidden md:block`}
                />
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#B0BEC5]/20 transition-colors duration-700 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mt-16 flex items-center justify-center gap-4">
          {trainingModules.map((module, index) => (
            <div key={module.id} className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#B0BEC5]/30" />
              {index < trainingModules.length - 1 && (
                <div className="w-16 h-px bg-[#B0BEC5]/10" />
              )}
            </div>
          ))}
        </div>

        {/* Certification Note */}
        <div className="mt-24 text-center">
          <p className="text-[11px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase">
            Upon completion, you will receive
          </p>
          <p className="mt-2 odyssey-heading text-sm tracking-[0.3em] text-[#F5F5F5]/70">
            ODYSSEY CERTIFIED ASTRONAUT STATUS
          </p>
        </div>
      </div>
    </section>
  );
}
