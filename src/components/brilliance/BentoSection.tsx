"use client";

import React, { memo } from "react";
import { Badge } from "./BrillianceComponents";
import MagicBento from "@/components/ui/MagicBento";

export const BentoSection = memo(() => {
  return (
    <div className="w-full border-b wf-border flex flex-col justify-center items-center relative overflow-hidden wf-surface">
      {/* Header Section */}
      <div className="self-stretch px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1440px] lg:w-[1440px] py-8 sm:py-12 md:py-16 border-b wf-border flex justify-center items-center gap-6">
        <div className="w-full max-w-[616px] lg:w-[616px] px-4 sm:px-6 py-4 sm:py-5 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-3 sm:gap-4 shadow-none">
          <Badge
            icon={
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                <rect x="7" y="1" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                <rect x="1" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
                <rect x="7" y="7" width="4" height="4" stroke="#37322F" strokeWidth="1" fill="none" />
              </svg>
            }
            text="Bento grid"
          />
          <h2 className="w-full max-w-[598.06px] lg:w-[598.06px] text-center flex justify-center flex-col wf-text-primary text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Built for absolute clarity and focused work
          </h2>
          <p className="self-stretch text-center wf-text-muted text-sm sm:text-base font-normal leading-6 sm:leading-7 font-sans">
            Stay focused with tools that organize, connect
            <br />
            and turn information into confident decisions.
          </p>
        </div>
      </div>

      {/* Bento Grid Content */}
      <div className="self-stretch flex justify-center items-start">
        <DecorativePattern side="left" />
        <div className="flex-1 flex justify-center items-center border-l border-r border-[rgba(55,50,47,0.12)] py-12">
           <MagicBento 
              textAutoHide={true}
              enableStars
              enableSpotlight
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect
              spotlightRadius={800}
              particleCount={12}
              glowColor="255, 107, 0"
              disableAnimations={false}
            />
        </div>
        <DecorativePattern side="right" />
      </div>
    </div>
  );
});

BentoSection.displayName = "BentoSection";

const DecorativePattern = memo(({ side }: { side: "left" | "right" }) => (
  <div className="w-4 sm:w-6 md:w-8 lg:w-12 self-stretch relative overflow-hidden">
    <div className={`w-[120px] sm:w-[140px] md:w-[162px] ${side === "left" ? "left-[-40px] sm:left-[-50px] md:left-[-58px]" : "right-[-40px] sm:right-[-50px] md:right-[-58px]"} top-[-120px] absolute flex flex-col justify-start items-start opacity-20`}>
      {Array.from({ length: 200 }).map((_, i) => (
        <div key={i} className="self-stretch h-3 sm:h-4 rotate-[-45deg] origin-top-left outline outline-[0.5px] outline-[rgba(3,7,18,0.08)] outline-offset-[-0.25px]" />
      ))}
    </div>
  </div>
));
