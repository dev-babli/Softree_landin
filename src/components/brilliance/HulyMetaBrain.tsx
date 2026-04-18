"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  CheckSquare, 
  Link as LinkIcon, 
  Mic, 
  Plus, 
  Calendar, 
  MessageSquare, 
  FolderKanban,
  User,
  MoreHorizontal,
  ChevronRight,
  Send
} from "lucide-react";

/**
 * MergedShape - THE FINAL PIXEL-PERFECT ARCHITECTURE
 * Using a more transparent glass (0.75) and better blur (3xl) to avoid "all black" issues.
 */
const MergedShape = ({ fill = "rgba(18, 18, 22, 0.75)", children, style: containerStyle, ...props }: any) => (
  <div
    style={{
      position: 'relative',
      width: 1070,
      height: 370,
      ...containerStyle,
    }}
    {...props}
  >
      {/* 1. THE VOLUMETRIC LIGHT BRIDGE (MESH GLOW) */}
      <div className="absolute left-[100px] top-[120px] w-[300px] h-[300px] pointer-events-none z-0">
        {/* Deep Core */}
        <div className="absolute inset-0 bg-blue-600/40 blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
        {/* Horizontal Ray */}
        <div className="absolute inset-x-[-100%] top-1/2 -translate-y-1/2 h-[60px] bg-sky-500/20 blur-[60px]" />
        {/* Intersection Flare */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-400/30 blur-[40px] rounded-full" />
      </div>

      {/* 2. DYNAMIC CONTENT LAYER (Z-INDEX 20+ to stay above glow) */}
      <div className="absolute inset-0 z-30 pointer-events-none md:pointer-events-auto">
        {children}
      </div>

      {/* 3. GLASS SHAPES (PIXEL-PERFECT COORDINATES) */}
      
      {/* Shape 1 (Bottom Left) */}
      <div className="backdrop-blur-3xl" style={{ position: 'absolute', left: 0, top: 180, width: 200, height: 190, backgroundColor: fill, borderRadius: '32px 0px 32px 32px', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)' }} />
      
      {/* Shape 2 (Top Left) */}
      <div className="backdrop-blur-3xl" style={{ position: 'absolute', left: 190, top: 0, width: 200, height: 180, backgroundColor: fill, borderRadius: '32px 32px 32px 0px', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)' }} />
      
      {/* Shape 3 (Center Bottom) */}
      <div className="backdrop-blur-3xl" style={{ position: 'absolute', left: 220, top: 200, width: 410, height: 170, backgroundColor: fill, borderRadius: '32px 32px 32px 32px', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)' }} />
      
      {/* Shape 4 (Center Top) */}
      <div className="backdrop-blur-3xl" style={{ position: 'absolute', left: 410, top: 0, width: 210, height: 180, backgroundColor: fill, borderRadius: '32px 32px 32px 32px', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)' }} />
      
      {/* Shape 5 (Circle) */}
      <div className="backdrop-blur-3xl" style={{ position: 'absolute', left: 660, top: 0, width: 180, height: 180, backgroundColor: fill, borderRadius: '100px', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)' }} />
      
      {/* Shape 6 (Top Right) */}
      <div className="backdrop-blur-3xl" style={{ position: 'absolute', left: 860, top: 0, width: 210, height: 180, backgroundColor: fill, borderRadius: '32px 32px 32px 32px', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)' }} />
      
      {/* Shape 7 (Bottom Right) */}
      <div className="backdrop-blur-3xl" style={{ position: 'absolute', left: 650, top: 200, width: 330, height: 170, backgroundColor: fill, borderRadius: '32px 32px 32px 32px', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)' }} />

      {/* BRIDGE CONNECTORS */}
      <svg style={{ position: 'absolute', left: 158, top: 148, width: 32, height: 32, pointerEvents: 'none', zIndex: 35 }} viewBox="-32 0 32 32">
        <path d="M 0 0 C 0 23.872 -5.76 32 -32 32 H 0 Z" fill={fill} />
      </svg>
      <svg style={{ position: 'absolute', left: 200, top: 180, width: 32, height: 32, pointerEvents: 'none', zIndex: 35 }} viewBox="0 -32 32 32">
        <path d="M 0 0 C 0 -23.872 5.76 -32 32 -32 H 0 Z" fill={fill} />
      </svg>
  </div>
);

export function HulyMetaBrain() {
  return (
    <>
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes micPulse {
        0%, 100% { transform: scale(1); opacity: 0.2; }
        50% { transform: scale(1.2); opacity: 0.4; }
      }
      .animate-mic-pulse { animation: micPulse 2.5s ease-in-out infinite; }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(1deg); }
      }
      .animate-float-ui { animation: float 5s ease-in-out infinite; }

      @keyframes orbit-long {
        from { transform: rotate(0deg) translateX(85px) rotate(0deg); }
        to { transform: rotate(360deg) translateX(85px) rotate(-360deg); }
      }
      .animate-orbit-avatar { animation: orbit-long 30s linear infinite; }

      .glass-card-inner {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(20px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05);
      }
    `}} />
    <section className="w-full py-32 px-6 bg-white flex flex-col items-center overflow-hidden">
      {/* Header - PIXEL-PERFECT SYNC */}
      <div className="max-w-[900px] text-center mb-28">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[64px] md:text-[96px] font-bold text-black mb-8 leading-[0.85] tracking-[-0.05em] uppercase"
        >
          Huly MetaBrain
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-18 md:text-24 text-zinc-500 max-w-[750px] mx-auto font-medium tracking-[-0.02em] leading-[1.35]"
        >
          Connect every element of your workflow to build a dynamic knowledge base.<br className="hidden md:block" />
          Soon, Huly AI will turn it into a powerful asset — a <span className="text-black font-semibold italic">second brain</span> for your team.
        </motion.p>
      </div>

      {/* THE COMPONENT STRETCH */}
      <div className="w-full flex justify-center scale-[0.7] md:scale-[0.8] lg:scale-[1] origin-center transition-all duration-700">
        <MergedShape>
            {/* 1. TAKE NOTES (Bottom Left) */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 370 }} className="z-10 pointer-events-none flex items-center justify-center">
                <img src="/huly_assets/tasks-notes.69743ddd.png" className="w-full h-full object-contain mix-blend-lighten" alt="" />
            </div>
            
            <div style={{ position: 'absolute', left: 0, top: 180, width: 230, height: 190 }} className="p-8 flex flex-col gap-1.5 pointer-events-auto z-20">
                <div className="text-zinc-500 mb-[-4px] transform -translate-x-1">
                  <span className="text-[20px] leading-none">¶</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[17px] tracking-tight leading-none">Take notes.</span>
                  <span className="text-zinc-400 font-medium text-[13px] leading-[1.3] mt-1.5">Create documents to keep track of team resources |</span>
                </div>
            </div>

            {/* 2. CREATE TASKS (Top Left) */}
            <div style={{ position: 'absolute', left: 190, top: 0, width: 200, height: 180 }} className="p-8 flex flex-col gap-1.5 pointer-events-auto z-20">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[17px] tracking-tight leading-none">Create tasks.</span>
                  <span className="text-zinc-400 font-medium text-[13px] leading-[1.3] mt-1.5">Schedule your personal events and todos.</span>
                </div>
            </div>

            {/* 3. SYNC HUB (Center Bottom) */}
            <div style={{ position: 'absolute', left: 220, top: 200, width: 410, height: 170 }} className="flex items-center justify-center pointer-events-auto overflow-hidden rounded-[32px] z-20">
                <img src="/huly_assets/teammates-mobile.8dc948be.jpg" className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/40 via-transparent to-transparent p-8 flex flex-col justify-start">
                  <div className="flex flex-col gap-1.5 max-w-[280px]">
                    <span className="text-white font-bold text-[17px] tracking-tight leading-none">Sync in real time.</span>
                    <span className="text-zinc-400 font-medium text-[13px] leading-[1.3] mt-1.5">Connect with your team instantly to monitor progress and track updates.</span>
                  </div>
                </div>
            </div>

            {/* 4. PLAN WORK (Center Top) */}
            <div style={{ position: 'absolute', left: 410, top: 0, width: 210, height: 180 }} className="flex items-center justify-center pointer-events-auto overflow-hidden rounded-[32px] z-20">
                <img src="/huly_assets/plan-work.26bcf442.jpg" className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/60 via-transparent to-transparent p-8 flex flex-col justify-start">
                   <div className="flex flex-col">
                      <span className="text-white font-bold text-[17px] tracking-tight leading-none">Plan your work.</span>
                      <span className="text-zinc-400 font-medium text-[13px] leading-[1.3] mt-1.5 whitespace-nowrap overflow-hidden">Visualize your workday...</span>
                   </div>
                </div>
            </div>

            {/* 5. THE 08 MARCH DATE (Circle) */}
            <div style={{ position: 'absolute', left: 660, top: 0, width: 180, height: 180 }} className="flex items-center justify-center pointer-events-auto overflow-hidden rounded-full z-20 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                <img src="/huly_assets/calendar.74569b09.png" className="w-full h-full object-cover" alt="" />
            </div>

            {/* 6. CHAT TEAM (Top Right) */}
            <div style={{ position: 'absolute', left: 860, top: 0, width: 210, height: 180 }} className="flex items-center justify-center pointer-events-auto overflow-hidden rounded-[32px] z-20">
                <img src="/huly_assets/collab.aa5fcd89.jpg" className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/60 via-transparent to-transparent p-8 flex flex-col justify-start">
                   <div className="flex flex-col">
                      <span className="text-white font-bold text-[17px] tracking-tight leading-none">Chat with team.</span>
                      <span className="text-zinc-400 font-medium text-[13px] leading-[1.3] mt-1.5">Send DM and group chats.</span>
                   </div>
                </div>
            </div>

            {/* 7. MANAGE PROJECTS (Bottom Right) */}
            <div style={{ position: 'absolute', left: 650, top: 200, width: 330, height: 170 }} className="flex items-center justify-center pointer-events-auto overflow-hidden rounded-[32px] z-20 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                <img src="/huly_assets/pm.57044e5b.jpg" className="w-[124%] h-full object-cover translate-x-12 translate-y-2 scale-110" alt="" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/40 via-transparent to-transparent p-8 flex flex-col justify-start">
                   <div className="flex flex-col max-w-[240px]">
                      <span className="text-white font-bold text-[17px] tracking-tight leading-none">Manage projects.</span>
                      <span className="text-zinc-400 font-medium text-[13px] leading-[1.3] mt-1.5">Customize your workspace to fit the needs of your teams.</span>
                   </div>
                </div>
            </div>
        </MergedShape>
      </div>

      {/* FOOTER HINT */}
      <div className="mt-20 md:hidden text-zinc-400 text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
        Swipe to Explore
      </div>
    </section>
    </>
  );
}

export default HulyMetaBrain;
