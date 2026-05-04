"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    id: "earth",
    name: "Earth Orbit",
    subtitle: "The Blue Marble",
    duration: "3-4 Days",
    altitude: "408 km",
    video: "https://assets.mixkit.co/videos/preview/mixkit-earth-seen-from-space-2698-large.mp4",
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80",
  },
  {
    id: "moon",
    name: "Lunar Orbit",
    subtitle: "The Dark Side",
    duration: "7-10 Days",
    altitude: "384,400 km",
    video: "https://assets.mixkit.co/videos/preview/mixkit-full-moon-in-the-dark-sky-1072-large.mp4",
    poster: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=800&q=80",
  },
  {
    id: "station",
    name: "Station Gateway",
    subtitle: "Humanity's Outpost",
    duration: "Extended Stay",
    altitude: "408 km",
    video: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
    poster: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80",
  },
];

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end]);

  return (
    <span ref={ref} className="stat-number instrument-value">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function DestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const panels = panelsRef.current;
    if (!section || !title || !panels) return;

    // Title reveal
    gsap.fromTo(
      title,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      }
    );

    // Panels stagger reveal
    const panelElements = panels.querySelectorAll(".destination-panel");
    gsap.fromTo(
      panelElements,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: panels,
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
      id="destinations"
      className="relative min-h-screen bg-black py-32"
    >
      {/* Section Header */}
      <div className="max-w-[1800px] mx-auto px-8 mb-16">
        <div className="flex items-end justify-between">
          <div>
            <span className="block text-[10px] tracking-[0.4em] text-[#FF0000]/70 uppercase mb-4 hal-glow">
              01 — Destinations
            </span>
            <h2
              ref={titleRef}
              className="odyssey-heading text-[clamp(32px,5vw,64px)] tracking-[0.2em] text-[#F5F5F5]"
            >
              Choose Your Orbit
            </h2>
          </div>
          <p className="hidden md:block max-w-md text-[13px] leading-relaxed text-[#B0BEC5]/60 tracking-wide">
            Three distinct experiences. Each a meditation on silence, scale, and the profound isolation of space.
          </p>
        </div>
      </div>

      {/* Video Panels */}
      <div
        ref={panelsRef}
        className="max-w-[1800px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#B0BEC5]/10"
      >
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="destination-panel relative h-[70vh] bg-black group cursor-pointer overflow-hidden"
          >
            {/* Video Background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-105"
              poster={dest.poster}
            >
              <source src={dest.video} type="video/mp4" />
            </video>

            {/* ENR Overlay */}
            <div className="odyssey-video-overlay" />
            <div className="vignette" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
              {/* Destination Name */}
              <div className="mb-4">
                <span className="block text-[9px] tracking-[0.3em] text-[#B0BEC5]/50 uppercase mb-2">
                  {dest.subtitle}
                </span>
                <h3 className="odyssey-heading text-2xl tracking-[0.15em] text-[#F5F5F5]">
                  {dest.name}
                </h3>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 py-4 border-t border-[#B0BEC5]/10">
                <div>
                  <span className="block text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase">
                    Duration
                  </span>
                  <span className="instrument-readout text-[#F5F5F5]/80">
                    {dest.duration}
                  </span>
                </div>
                <div>
                  <span className="block text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase">
                    Altitude
                  </span>
                  <span className="instrument-readout text-[#F5F5F5]/80">
                    {dest.altitude}
                  </span>
                </div>
              </div>

              {/* Explore Link */}
              <div className="mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#F5F5F5] border-b border-[#F5F5F5]/30 pb-1">
                  Explore Itinerary
                </span>
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-[#B0BEC5]/20 group-hover:border-[#F5F5F5]/40 transition-colors duration-500" />
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div className="max-w-[1800px] mx-auto px-8 mt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-[#B0BEC5]/10">
          <div>
            <CountUp end={408} suffix=" km" />
            <span className="block text-[10px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mt-2">
              Average Altitude
            </span>
          </div>
          <div>
            <CountUp end={27600} suffix=" km/h" />
            <span className="block text-[10px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mt-2">
              Orbital Velocity
            </span>
          </div>
          <div>
            <CountUp end={16} suffix=" / day" />
            <span className="block text-[10px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mt-2">
              Sunrises Witnessed
            </span>
          </div>
          <div>
            <CountUp end={97} suffix="%" />
            <span className="block text-[10px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mt-2">
              Successful Missions
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
