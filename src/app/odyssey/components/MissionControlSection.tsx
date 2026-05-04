"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Simulated telemetry data
const telemetryData = {
  altitude: "408.2",
  velocity: "7.66",
  pressure: "101.3",
  temperature: "-120",
  o2Level: "99.8",
  co2Level: "0.04",
  power: "98.7",
  commSignal: "-65",
};

export default function MissionControlSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [countdown, setCountdown] = useState({ days: 247, hours: 14, minutes: 33, seconds: 12 });
  const [glitchText, setGlitchText] = useState("SYSTEMS NOMINAL");

  useEffect(() => {
    const section = sectionRef.current;
    const dashboard = dashboardRef.current;
    if (!section || !dashboard) return;

    // Dashboard reveal animation
    gsap.fromTo(
      ".dashboard-cell",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: dashboard,
          start: "top 80%",
        },
      }
    );

    // Title reveal
    gsap.fromTo(
      ".mission-title",
      { opacity: 0, y: 40 },
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

    // Glitch effect for status text
    const glitchInterval = setInterval(() => {
      const statuses = ["SYSTEMS NOMINAL", "SIGNAL STRONG", "TRACKING ACTIVE", "ALL CLEAR"];
      setGlitchText(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 3000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      clearInterval(glitchInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="relative min-h-screen bg-black py-32 overflow-hidden"
    >
      {/* Background Video - Control Room */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      <div className="max-w-[1800px] mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="block text-[10px] tracking-[0.4em] text-[#FF0000]/70 uppercase mb-4 hal-glow">
              04 — Mission Control
            </span>
            <h2 className="mission-title odyssey-heading text-[clamp(32px,5vw,64px)] tracking-[0.2em] text-[#F5F5F5]">
              Houston
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <span className="block text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mb-1">
              Next Departure
            </span>
            <div className="instrument-value text-2xl text-[#F5F5F5]">
              <span className="text-[#FF0000]/70">T-</span>
              {formatNumber(countdown.days)}:
              {formatNumber(countdown.hours)}:
              {formatNumber(countdown.minutes)}:
              {formatNumber(countdown.seconds)}
            </div>
          </div>
        </div>

        {/* Mission Dashboard */}
        <div
          ref={dashboardRef}
          className="border border-[#B0BEC5]/10 bg-black/50 backdrop-blur-sm"
        >
          {/* Dashboard Header */}
          <div className="border-b border-[#B0BEC5]/10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
              <span className="text-[10px] tracking-[0.2em] text-[#B0BEC5]/60 uppercase">
                {glitchText}
              </span>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-[9px] tracking-[0.15em] text-[#B0BEC5]/40">
                UTC {new Date().toISOString().split("T")[1].split(":")[0]}:
                {new Date().toISOString().split("T")[1].split(":")[1]}
              </span>
              <span className="text-[9px] tracking-[0.15em] text-[#B0BEC5]/40">
                MISSION ODYSSEY-001
              </span>
            </div>
          </div>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {Object.entries({
              "ALTITUDE": { value: telemetryData.altitude, unit: "km" },
              "VELOCITY": { value: telemetryData.velocity, unit: "km/s" },
              "PRESSURE": { value: telemetryData.pressure, unit: "kPa" },
              "TEMP": { value: telemetryData.temperature, unit: "°C" },
              "O₂ LEVEL": { value: telemetryData.o2Level, unit: "%" },
              "CO₂ LEVEL": { value: telemetryData.co2Level, unit: "%" },
              "POWER": { value: telemetryData.power, unit: "%" },
              "SIGNAL": { value: telemetryData.commSignal, unit: "dBm" },
            }).map(([label, data]) => (
              <div
                key={label}
                className="dashboard-cell p-6 border-b md:border-r border-[#B0BEC5]/10 last:border-r-0"
              >
                <span className="block text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mb-2">
                  {label}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="instrument-value text-xl text-[#F5F5F5]">
                    {data.value}
                  </span>
                  <span className="text-[10px] text-[#B0BEC5]/40">
                    {data.unit}
                  </span>
                </div>
                {/* Mini graph */}
                <div className="mt-3 h-8 flex items-end gap-px">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#1565C0]/30"
                      style={{
                        height: `${Math.random() * 100}%`,
                        opacity: 0.3 + Math.random() * 0.4,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Live Feed Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#B0BEC5]/10">
            <div className="p-4 border-b md:border-r border-[#B0BEC5]/10">
              <span className="block text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mb-2">
                External Cam 01
              </span>
              <div className="aspect-video bg-[#1565C0]/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] tracking-[0.2em] text-[#B0BEC5]/30 uppercase">
                    Signal Acquired
                  </span>
                </div>
                {/* Scan lines */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] animate-pulse" />
              </div>
            </div>
            <div className="p-4 border-b md:border-r border-[#B0BEC5]/10">
              <span className="block text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mb-2">
                External Cam 02
              </span>
              <div className="aspect-video bg-[#1565C0]/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] tracking-[0.2em] text-[#B0BEC5]/30 uppercase">
                    Signal Acquired
                  </span>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] animate-pulse" />
              </div>
            </div>
            <div className="p-4">
              <span className="block text-[9px] tracking-[0.2em] text-[#B0BEC5]/40 uppercase mb-2">
                Telemetry Log
              </span>
              <div className="aspect-video bg-black/50 p-2 overflow-hidden font-mono text-[8px] leading-tight text-[#B0BEC5]/50">
                {[
                  "[14:33:12] TLM: Altitude nominal",
                  "[14:33:10] SYS: Life support stable",
                  "[14:33:08] COM: Uplink confirmed",
                  "[14:33:06] NAV: Trajectory optimal",
                  "[14:33:04] PWR: Solar array 98.7%",
                  "[14:33:02] ENV: Cabin temp -120°C",
                  "[14:33:00] SYS: All systems green",
                  "[14:32:58] COM: Signal strength -65dBm",
                ].map((line, i) => (
                  <div key={i} className="truncate">{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-[11px] leading-relaxed text-[#B0BEC5]/50 max-w-md">
              Every mission is monitored 24/7 by our team of flight controllers.
              Your safety is the product of obsessive precision.
            </p>
          </div>

          <button className="group flex items-center gap-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#F5F5F5]/70 group-hover:text-[#F5F5F5] transition-colors duration-500">
              Begin Your Journey
            </span>
            <div className="w-16 h-16 rounded-full border border-[#F5F5F5]/30 flex items-center justify-center group-hover:border-[#F5F5F5]/60 transition-colors duration-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 text-[#F5F5F5]/70 group-hover:text-[#F5F5F5] transition-colors duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-32 pt-8 border-t border-[#B0BEC5]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] tracking-[0.2em] text-[#B0BEC5]/30 uppercase">
            © 2027 ODYSSEY BEYOND. All rights reserved.
          </p>
          <p className="text-[9px] tracking-[0.2em] text-[#B0BEC5]/30 uppercase">
            Commercial Space Transportation License #CST-2027-001
          </p>
        </div>
      </div>
    </section>
  );
}
