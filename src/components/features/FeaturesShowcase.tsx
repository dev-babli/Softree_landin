"use client";

import React from "react";
import ProductArcSlider from "./ProductArcSlider";
import InfoSection from "./InfoSection";

export default function FeaturesShowcase() {
  return (
    <div className="relative w-full bg-[#F3F0EE] flex flex-col overflow-hidden">
      <div className="relative z-30">
        <ProductArcSlider />
      </div>
      <div className="relative z-10 -mt-8 md:-mt-12">
        <InfoSection />
      </div>
    </div>
  );
}
