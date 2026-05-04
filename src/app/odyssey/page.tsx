"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./components/HeroSection";
import DestinationsSection from "./components/DestinationsSection";
import VesselSection from "./components/VesselSection";
import TrainingSection from "./components/TrainingSection";
import MissionControlSection from "./components/MissionControlSection";
import Navigation from "./components/Navigation";

gsap.registerPlugin(ScrollTrigger);

export default function OdysseyBeyond() {
  useEffect(() => {
    // Glacial fade-in for hero text
    gsap.to(".hero-title", {
      opacity: 1,
      y: 0,
      duration: 4,
      ease: "power2.out",
      delay: 1.5,
    });

    gsap.to(".hero-subtitle", {
      opacity: 1,
      y: 0,
      duration: 3,
      ease: "power2.out",
      delay: 2.5,
    });

    gsap.to(".hero-cta", {
      opacity: 1,
      duration: 2,
      ease: "power2.out",
      delay: 4,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative bg-black min-h-screen">
      <Navigation />
      <HeroSection />
      <DestinationsSection />
      <VesselSection />
      <TrainingSection />
      <MissionControlSection />
    </main>
  );
}
