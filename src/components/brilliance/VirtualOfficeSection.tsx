"use client"

import React from 'react';
import { cn } from "@/lib/utils";

export function VirtualOfficeSection() {
  return (
    <section className="relative w-full wf-surface py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden font-sans border-t wf-border">
      
      {/* Top Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mb-12 md:mb-20 z-20 px-4">
        <h2 className="text-[44px] md:text-[60px] font-[800] wf-text-primary leading-[1.05] tracking-[-0.03em] mb-6">
          Work together.<br />
          Like in the office.
        </h2>
        <p className="text-[17px] md:text-[19px] wf-text-muted font-medium leading-[1.6] max-w-[540px]">
          Create customized virtual office spaces for any department or event<br className="hidden md:block"/>
          with high quality audio and video conferencing.
        </p>
      </div>

      {/* Main Video Container */}
      <div className="relative w-full max-w-[1400px] aspect-[4/3] md:aspect-[21/9] flex flex-col items-center justify-center mb-24 md:mb-32 z-10 px-4 md:px-0">
        
        {/* Background Waves Video */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden mix-blend-multiply">
            <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-[120%] md:w-[100%] h-[120%] md:h-[120%] object-cover opacity-90 mix-blend-multiply scale-110"
            >
            <source src="/huly_assets/waves.mp4" type="video/mp4" />
            </video>
        </div>

        {/* Foreground Trust Video */}
        <div className="relative z-20 w-[95%] md:w-[65%] max-w-[900px] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1),0_0_0_6px_rgba(255,255,255,0.6)] border border-white/50 bg-white transform translate-y-4 md:translate-y-8">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover scale-[1.01]"
          >
            <source src="/huly_assets/trust video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Bottom Features Area */}
      <div className="w-full max-w-[1000px] flex flex-col items-start px-6 md:px-12 z-20">
        <p className="text-[18px] md:text-[21px] font-[600] text-[#111] leading-[1.4] max-w-[650px] mb-14 tracking-tight">
          Collaborating with remote teams is easy in your virtual office
          environment. Enjoy real-time communication within your
          workspace without additional software hassle.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-10 w-full">
          
          {/* Feature 1 */}
          <div className="flex flex-col gap-4">
             <div className="w-12 h-12 flex items-center justify-start text-[#3b82f6] mb-1">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                  <path d="M3 3H11V11H3V3Z" fill="#60a5fa" fillOpacity="0.4"/>
                  <path d="M13 3H21V11H13V3Z" fill="#3b82f6"/>
                  <path d="M3 13H11V21H3V13Z" fill="#3b82f6"/>
                  <path d="M13 13H21V21H13V13Z" fill="#60a5fa" fillOpacity="0.4"/>
                </svg>
             </div>
             <h3 className="text-[19px] font-[700] text-[#111] leading-[1.2] tracking-tight">Customize<br/>workspace</h3>
             <p className="text-[15px] text-[#666] font-medium leading-[1.6]">
               Create your own offices and<br className="hidden md:block"/> meeting rooms to suit your<br className="hidden md:block"/> team's needs.
             </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col gap-4">
             <div className="w-12 h-12 flex items-center justify-start text-[#60a5fa] mb-1">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                   <rect x="2" y="6" width="14" height="12" rx="3" fill="#60a5fa" fillOpacity="0.4"/>
                   <path d="M17 10.5L22 7.5V16.5L17 13.5V10.5Z" fill="#3b82f6"/>
                </svg>
             </div>
             <h3 className="text-[19px] font-[700] text-[#111] leading-[1.2] tracking-tight">Audio and<br/>video calls</h3>
             <p className="text-[15px] text-[#666] font-medium leading-[1.6]">
               Collaborate efficiently and<br className="hidden md:block"/> seamlessly with high quality<br className="hidden md:block"/> virtual conferencing.
             </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col gap-4">
             <div className="w-12 h-12 flex items-center justify-start text-[#0ea5e9] mb-1 pl-1">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                  <path d="M10 12C12.21 12 14 10.21 14 8C14 5.79 12.21 4 10 4C7.79 4 6 5.79 6 8C6 10.21 7.79 12 10 12Z" fill="#3b82f6"/>
                  <path d="M10 14C7.33 14 2 15.34 2 18V20H18V18C18 15.34 12.67 14 10 14Z" fill="#60a5fa" fillOpacity="0.4"/>
                  <path d="M19 8V12M17 10H21" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
             </div>
             <h3 className="text-[19px] font-[700] text-[#111] leading-[1.2] tracking-tight">Invite<br/>guests</h3>
             <p className="text-[15px] text-[#666] font-medium leading-[1.6]">
               Meet with guests without ever<br className="hidden md:block"/> needing to leave your<br className="hidden md:block"/> workspace.
             </p>
          </div>

        </div>
      </div>
    </section>
  );
}
