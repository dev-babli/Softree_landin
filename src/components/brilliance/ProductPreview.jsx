"use client"

import React from 'react';
import { cn } from "@/lib/utils";
import { FaSlack, FaGithub, FaGoogle, FaAws, FaDocker, FaReact, FaNodeJs, FaPython, FaDatabase, FaBolt, FaStripe, FaCloud } from 'react-icons/fa';
import { BrainCircuit, Database, Smartphone, Layout, Workflow, Sparkles, ChartBar, Terminal, Activity, Zap, Server, Globe, Clock, Mail } from 'lucide-react';

const WEB_SLIDES = [
  "/productpreview_images/webslideshow1.webp",
  "/productpreview_images/2.webp",
  "/productpreview_images/still-06607eaae7cc7819ac85a01c693f4722.webp",
  "/productpreview_images/still-8fba34a4fe44b9a978139b2280c6ce47.webp",
  "/productpreview_images/still-d32f64752588b0367e11bbed58868c12.webp",
];

const N8nNode = ({ icon: Icon, title, subtitle, colorClass, x, y, hasIn=true, hasOut=true, className, style, absolute=true }) => (
  <div 
    className={cn(
      absolute ? "absolute" : "relative",
        "w-[140px] md:w-[150px] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[10px] p-2.5 flex items-center gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_20px_40px_rgba(15,23,42,0.18)] z-20 pointer-events-auto",
      className
    )}
    style={absolute ? { left: `${x}%`, top: `${y}%`, ...style } : style}
  >
    {hasIn && <div className="absolute -left-1.5 w-3 h-3 bg-white rounded-full border-[2px] border-slate-300" />}
    <div className={`w-8 h-8 rounded-md shrink-0 flex items-center justify-center bg-slate-100 ${colorClass}`}>
      <Icon size={16} />
    </div>
    <div className="flex flex-col overflow-hidden">
      <span className="text-[11px] text-slate-900 font-semibold truncate leading-tight tracking-wide">{title}</span>
      <span className="text-[9px] text-slate-500 truncate leading-none mt-0.5">{subtitle}</span>
    </div>
    {hasOut && <div className="absolute -right-1.5 w-3 h-3 bg-white rounded-full border-[2px] border-slate-300" />}
  </div>
);

const BentoCard = ({ title, description, background, primaryForeground, secondaryForeground, className }) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-[24px] md:rounded-[32px] overflow-hidden bg-white border border-slate-200 shadow-[0_30px_60px_rgba(2,6,23,0.14),inset_0_1px_1px_rgba(255,255,255,0.95)] cursor-default transition-all duration-500 hover:shadow-[0_40px_80px_rgba(2,6,23,0.2)]",
        className
      )}
    >
      {/* High-end cinematic noise filter */}
      <div className="absolute inset-0 z-0 mix-blend-multiply opacity-[0.05] pointer-events-none" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}} />
      
      {/* Static Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {background}
      </div>

      {/* Animating Foreground Content */}
      <div className="absolute inset-x-0 top-0 bottom-[120px] z-10 pointer-events-none p-6 pt-10">
        
        {/* Primary State - smoothly blurs out on hover */}
        <div className="absolute inset-0 transition-[all,filter] duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-[10%] group-hover:scale-[0.95] group-hover:opacity-0 group-hover:blur-md flex justify-center items-center pointer-events-none">
          <div className="relative w-full h-full max-w-[400px]">
            {primaryForeground}
          </div>
        </div>
        
        {/* Secondary State - Perfectly aligned, drops in cleanly from blur */}
        {secondaryForeground && (
          <div className="absolute inset-0 scale-[1.05] translate-y-[10%] opacity-0 blur-md transition-[all,filter] duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none flex justify-center items-center pointer-events-none">
            <div className="relative w-full h-full max-w-[400px] flex items-center justify-center">
              {secondaryForeground}
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom Text Area */}
      <div className="relative z-20 mt-auto p-6 md:p-8 flex flex-col justify-end pt-24 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none" />
        
        <div className="relative z-20 flex flex-col gap-2">
           <p className="text-[14px] md:text-[15.5px] leading-relaxed text-slate-600 max-w-[90%] tracking-wide">
             <strong className="text-slate-900 font-semibold mr-1.5 border-b border-slate-300 pb-0.5 text-[16px] md:text-[17px]">
               {title}.
             </strong>
             {description}
           </p>
        </div>
      </div>
    </div>
  );
};

export function ProductPreview() {
  const [webSlideIndex, setWebSlideIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setWebSlideIndex((prev) => (prev + 1) % WEB_SLIDES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  const floatingIcons = [
    { Icon: FaAws, color: "text-orange-400" },
    { Icon: FaReact, color: "text-cyan-400" },
    { Icon: FaSlack, color: "text-rose-500" },
    { Icon: FaGoogle, color: "text-blue-400" },
    { Icon: FaGithub, color: "text-zinc-200" },
    { Icon: FaDocker, color: "text-blue-500" },
    { Icon: FaNodeJs, color: "text-green-500" },
    { Icon: FaPython, color: "text-yellow-500" },
    { Icon: FaDatabase, color: "text-sky-400" }
  ];

  return (
    <>
    <style dangerouslySetInnerHTML={{__html: `
      @keyframes smoothFlow {
        from { stroke-dashoffset: 24; }
        to { stroke-dashoffset: 0; }
      }
      .animate-flow { animation: smoothFlow 1.5s linear infinite; }
      
      @keyframes equalizer {
        0%, 100% { transform: scaleY(0.3); }
        50% { transform: scaleY(1); }
      }
      .animate-eq { transform-origin: bottom; animation: equalizer 2s ease-in-out infinite; }
      
      @keyframes floaty {
        0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate)); }
        50% { transform: translateY(-6px) rotate(calc(var(--tw-rotate) + 2deg)); }
      }
      .animate-float { animation: floaty 6s ease-in-out infinite; }
      
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .animate-blink { animation: blink 1s step-end infinite; }

      @keyframes cinematicZoom {
        0% { transform: scale(1.03); }
        100% { transform: scale(1.12); }
      }
      .animate-cinematic-zoom { animation: cinematicZoom 4.8s ease-out forwards; }
    `}} />
    <section className="relative w-full bg-[#FAFAFC] py-20 px-4 md:px-6 flex justify-center z-20 overflow-hidden">
      
      {/* Ambient backgrounds */}
      <div className="absolute top-[-10%] w-[1200px] h-[600px] bg-gradient-to-b from-sky-200/40 via-purple-100/30 to-transparent blur-[120px] pointer-events-none mix-blend-multiply opacity-50" />
      
      <div className="max-w-[1140px] w-full flex flex-col relative z-10 mx-auto">
        <div className="flex flex-col mb-12 md:mb-16 max-w-[800px] px-2">
          <h2 className="text-[44px] md:text-[64px] font-bold text-zinc-900 tracking-[-0.03em] leading-[1.05] mb-5">
            Unmatched productivity
          </h2>
          <p className="text-[18px] md:text-[21px] text-zinc-600 leading-[1.5] font-medium tracking-tight">
            Softree is an enterprise architecture, engineering, and digital transformation platform providing amazing collaboration opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          
          {/* Card 1: AI & Automation */}
          <BentoCard 
            title="AI & Automation" 
            description="Streamline operations with intelligent workflows and custom automation pipelines."
            className="md:col-span-6 lg:col-span-5 h-[400px] md:h-[460px] group/card1"
            background={
              <>
                <div className="absolute inset-0 bg-[#060608]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_at_top,white_20%,transparent_70%)]" />
                <div className="absolute top-[-30%] left-[30%] w-[160px] h-[500px] bg-blue-600/20 blur-[100px] transform rotate-[25deg] transition-all duration-[1200ms] group-hover:bg-purple-600/30 group-hover:rotate-[-25deg] scale-y-125" />
                <div className="absolute bottom-[10%] right-[10%] w-[200px] h-[200px] bg-indigo-500/10 blur-[80px]" />
              </>
            }
            primaryForeground={
              <>
                <svg className="absolute inset-0 w-full h-[85%] pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path className="animate-flow" d="M 28 20 C 45 20, 35 45, 52 45" stroke="rgba(249,115,22,0.3)" fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="4 4" />
                  <path className="animate-flow" d="M 70 45 C 80 45, 75 25, 85 25" stroke="rgba(249,115,22,0.3)" fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="4 4" />
                  <path className="animate-flow" d="M 70 45 C 80 45, 75 65, 85 65" stroke="rgba(249,115,22,0.3)" fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeDasharray="4 4" />
                </svg>
                {/* Randomly placed but good positions for primary */}
                <N8nNode icon={Globe} title="Webhook" subtitle="Trigger event" colorClass="text-purple-400 bg-purple-500/10" x={0} y={15} hasIn={false} className="animate-float shadow-[inset_0_1px_1px_rgba(168,85,247,0.3)]" />
                <N8nNode icon={BrainCircuit} title="OpenAI Agent" subtitle="Process payload" colorClass="text-emerald-400 bg-emerald-500/10" x={35} y={40} className="animate-float shadow-[inset_0_1px_1px_rgba(16,185,129,0.3)]" style={{ animationDelay: '0.2s' }} />
                <N8nNode icon={Database} title="PostgreSQL" subtitle="Insert record" colorClass="text-blue-400 bg-blue-500/10" x={75} y={20} className="animate-float shadow-[inset_0_1px_1px_rgba(59,130,246,0.3)]" style={{ animationDelay: '0.4s' }} />
                <N8nNode icon={FaSlack} title="Slack" subtitle="Send alert" colorClass="text-pink-400 bg-pink-500/10" x={75} y={60} hasOut={false} className="animate-float shadow-[inset_0_1px_1px_rgba(244,114,182,0.3)]" style={{ animationDelay: '0.6s' }} />
              </>
            }
            secondaryForeground={
              // Perfectly ALIGNED flex column layout instead of messy disconnected boxes
              <div className="flex flex-col gap-5 w-[220px] pointer-events-auto">
                <N8nNode absolute={false} icon={Clock} title="Cron Trigger" subtitle="Every 24h" colorClass="text-yellow-400 bg-yellow-500/10 border-yellow-500/20" hasIn={false} className="w-full shadow-[inset_0_1px_1px_rgba(250,204,21,0.3),0_20px_40px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-[100ms] translate-y-6 group-hover:translate-y-0" />
                
                {/* Connecting Arrow */}
                <div className="h-5 border-l-2 border-dashed border-white/20 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-700 delay-[250ms]" />
                
                <N8nNode absolute={false} icon={Sparkles} title="Generate Report" subtitle="AI Summary Flow" colorClass="text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20" className="w-full shadow-[inset_0_1px_1px_rgba(232,121,249,0.3),0_20px_40px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-[250ms] translate-y-6 group-hover:translate-y-0" />
                
                <div className="h-5 border-l-2 border-dashed border-white/20 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-700 delay-[400ms]" />

                <N8nNode absolute={false} icon={Mail} title="Send Email" subtitle="To stakeholders" colorClass="text-blue-400 bg-blue-500/10 border-blue-500/20" hasOut={false} className="w-full shadow-[inset_0_1px_1px_rgba(96,165,250,0.3),0_20px_40px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-[400ms] translate-y-6 group-hover:translate-y-0" />
              </div>
            }
          />

          {/* Card 2: Modern App Development */}
          <BentoCard 
            title="Modern App Development" 
            description="Build scalable, high-performance web and mobile applications with cutting-edge stacks."
            className="md:col-span-6 lg:col-span-7 h-[400px] md:h-[460px] group/card2"
            background={
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(56,189,248,0.2),transparent_45%),radial-gradient(circle_at_86%_78%,rgba(14,165,233,0.2),transparent_42%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(148,163,184,0.08),rgba(15,23,42,0)_50%)]" />
              </>
            }
            primaryForeground={
               <div className="relative w-full h-[260px] flex items-center justify-center">
                  <div className="absolute left-[5%] right-[5%] top-[8%] bottom-[2%] rounded-[20px] border border-slate-200 shadow-[0_26px_60px_rgba(2,6,23,0.18)] overflow-hidden pointer-events-auto bg-slate-950">
                    {WEB_SLIDES.map((slide, index) => {
                      const isCurrent = index === webSlideIndex;
                      return (
                        <img
                          key={slide}
                          src={slide}
                          alt={`Web showcase ${index + 1}`}
                          className={cn(
                            "absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1200ms] ease-out",
                            isCurrent ? "opacity-100" : "opacity-0"
                          )}
                        />
                      );
                    })}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full bg-black/40 border border-white/20 px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-white/90">
                        <Globe size={12} />
                        Live Production UI
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-rose-400/80" />
                        <div className="w-2 h-2 rounded-full bg-amber-300/80" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
                      </div>
                    </div>
                    <div className="absolute inset-x-4 bottom-4 flex gap-1.5">
                      {WEB_SLIDES.map((_, index) => (
                        <div
                          key={`progress-${index}`}
                          className="h-1 flex-1 rounded-full overflow-hidden bg-white/25"
                        >
                          <div
                            className={cn(
                              "h-full rounded-full bg-white transition-all duration-[2200ms] ease-linear",
                              index === webSlideIndex ? "w-full opacity-100" : "w-0 opacity-60"
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute right-[6%] top-[16%] w-[120px] h-[220px] rounded-[24px] border border-white/40 bg-white/20 backdrop-blur-lg shadow-[0_18px_40px_rgba(2,6,23,0.3)] rotate-[6deg] animate-cinematic-zoom">
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/70" />
                    <div className="absolute inset-x-3 bottom-4 h-14 rounded-[12px] bg-white/25 border border-white/40" />
                  </div>
               </div>
            }
            secondaryForeground={
               // Perfectly Aligned Design System Component that fades in cohesively
               <div className="relative w-full max-w-[360px] bg-[#0c0d12]/95 backdrop-blur-2xl border border-white/[0.1] rounded-[16px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_40px_80px_rgba(0,0,0,0.8)] flex flex-col p-6 pointer-events-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-8 group-hover:translate-y-0">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4 relative z-10">
                     <span className="text-white font-bold tracking-tight text-[14px]">Design System Components</span>
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                     </div>
                  </div>
                  
                  {/* Neatly aligned horizontal buttons */}
                  <div className="flex gap-4 mt-6 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-[250ms] translate-y-4 group-hover:translate-y-0">
                     <div className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-[10px] h-12 flex items-center justify-center text-[12px] text-white/70 font-semibold cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-white/[0.08] transition-colors">
                        Secondary
                     </div>
                     <div className="flex-1 bg-emerald-500 rounded-[10px] h-12 flex items-center justify-center text-[12px] text-white font-bold cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] relative overflow-hidden group/btn">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <span className="relative z-10">Primary Active</span>
                     </div>
                  </div>

                  {/* Clean UI element mock */}
                  <div className="w-full bg-black/60 rounded-[12px] h-16 border border-white/[0.05] p-3 flex items-center justify-between mt-4 relative z-10 shadow-inner opacity-0 group-hover:opacity-100 transition-all duration-700 delay-[400ms] translate-y-4 group-hover:translate-y-0">
                     <div className="flex gap-4 items-center">
                        <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(99,102,241,0.4)]">
                           <Layout size={16} className="text-indigo-400" />
                        </div>
                        <div className="flex flex-col gap-2">
                           <div className="w-20 h-1.5 bg-white/20 rounded-full" />
                           <div className="w-12 h-1.5 bg-white/10 rounded-full" />
                        </div>
                     </div>
                     <div className="w-10 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center px-[3px] shadow-inner">
                        <div className="w-4 h-4 rounded-full bg-emerald-400 translate-x-[16px] shadow-[0_1px_4px_rgba(0,0,0,0.5)] border border-white/20" />
                     </div>
                  </div>
               </div>
            }
          />

          {/* Card 3: Data Engineering */}
          <BentoCard 
            title="Data Engineering" 
            description="Robust data pipelines, intelligent warehousing, and real-time analytics architectures."
            className="md:col-span-6 lg:col-span-7 h-[400px] md:h-[460px] group/card3"
            background={
              <>
                <div className="absolute inset-0 bg-[#060609]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
                <div className="absolute bottom-0 right-[10%] w-[350px] h-[350px] bg-blue-600/20 blur-[100px] rounded-full transition-all duration-[1000ms] group-hover:bg-emerald-600/20" />
              </>
            }
            primaryForeground={
               <div className="relative w-full h-[260px]">
                  {/* Clean data dashboard */}
                  <div className="absolute top-[10%] left-[5%] w-[160px] bg-[#0c0d12]/95 backdrop-blur-xl border border-white/[0.08] rounded-[10px] p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.6)] z-20">
                     <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase mb-3 block">Live Sources</span>
                     <div className="flex flex-col gap-2">
                         {[1, 2, 3].map(i => (
                             <div key={i} className="flex items-center gap-3 bg-white/[0.03] p-2 rounded-md border border-white/[0.05]">
                                 <Database size={11} className="text-blue-500" />
                                 <div className="w-1/2 h-1.5 bg-white/20 rounded-full" />
                             </div>
                         ))}
                     </div>
                  </div>

                  <div className="absolute top-[30%] right-[5%] w-[200px] bg-[#0c0d12]/95 backdrop-blur-xl border border-white/[0.08] rounded-[12px] p-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.6)] z-20">
                     <div className="flex justify-between items-center mb-5">
                       <span className="text-[11px] text-white/90 font-bold tracking-wide">Stream Processing</span>
                       <FaBolt className="text-blue-400" size={10} />
                     </div>
                     <div className="flex items-end gap-[4px] h-[60px]">
                        {[40, 60, 30, 80, 50, 90, 70].map((h,i) => (
                           <div key={i} className="flex-1 bg-blue-500/20 rounded-[2px] animate-eq" style={{ animationDelay: `${i * 0.15}s`, height: `${h}%` }}>
                              <div className="w-full bg-blue-400 h-[2px] rounded-[2px] shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            }
            secondaryForeground={
               // Perfectly ALIGNED predictive model dashboard centered correctly
               <div className="w-full max-w-[340px] bg-[#0c0d12]/95 backdrop-blur-2xl border border-white/[0.1] rounded-[16px] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_40px_80px_rgba(0,0,0,0.9)] flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-8 group-hover:translate-y-0 pointer-events-auto">
                  <div className="w-14 h-14 rounded-[14px] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 shadow-[inset_0_1px_1px_rgba(16,185,129,0.3),0_0_20px_rgba(16,185,129,0.2)]">
                     <BrainCircuit size={28} className="text-emerald-400" />
                  </div>
                  <span className="text-white font-bold text-[16px] mb-1 tracking-tight">Predictive AI Model</span>
                  <span className="text-emerald-400 text-[9px] uppercase tracking-[0.2em] font-bold mb-6 border border-emerald-500/30 px-3 py-1 rounded-full bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]">Production Active</span>
                  
                  <div className="w-full flex justify-between gap-3 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-[300ms] translate-y-4 group-hover:translate-y-0">
                     <div className="flex-1 flex flex-col items-center justify-center py-4 bg-black/60 border border-white/[0.05] rounded-[10px] shadow-inner font-mono">
                        <span className="text-zinc-500 text-[9px] tracking-widest mb-1.5 uppercase font-semibold">Accuracy</span>
                        <span className="text-emerald-400 text-[24px] font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">99.8%</span>
                     </div>
                     <div className="flex-1 flex flex-col items-center justify-center py-4 bg-black/60 border border-white/[0.05] rounded-[10px] shadow-inner font-mono">
                        <span className="text-zinc-500 text-[9px] tracking-widest mb-1.5 uppercase font-semibold">Latency</span>
                        <span className="text-amber-400 text-[24px] font-bold drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]">12ms</span>
                     </div>
                  </div>
               </div>
            }
          />

          {/* Card 4: Global Tech Partner */}
          <BentoCard 
            title="Global Ecosystem" 
            description="Seamlessly integrate with your favorite enterprise tools and cloud platforms."
            className="md:col-span-6 lg:col-span-5 h-[400px] md:h-[460px] group/card4"
            background={
              <>
                <div className="absolute inset-0 bg-[#050507]" />
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/15 blur-[90px] rounded-full transition-all duration-1000 group-hover:bg-indigo-600/30 group-hover:scale-125" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
              </>
            }
            primaryForeground={
              // Disconnected floating state
              <div className="absolute inset-0 z-10 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]">
                 <div className="absolute top-[20%] left-[20%] w-12 h-12 bg-white/[0.04] rounded-xl flex items-center justify-center border border-white/[0.08] animate-float"><FaAws size={24} className="text-zinc-500" /></div>
                 <div className="absolute top-[60%] left-[15%] w-10 h-10 bg-white/[0.04] rounded-xl flex items-center justify-center border border-white/[0.08] animate-float" style={{animationDelay: '1s'}}><FaDocker size={20} className="text-zinc-500" /></div>
                 <div className="absolute top-[30%] right-[20%] w-14 h-14 bg-white/[0.04] rounded-xl flex items-center justify-center border border-white/[0.08] animate-float" style={{animationDelay: '2s'}}><FaReact size={28} className="text-zinc-500" /></div>
                 <div className="absolute top-[65%] right-[25%] w-10 h-10 bg-white/[0.04] rounded-xl flex items-center justify-center border border-white/[0.08] animate-float" style={{animationDelay: '3s'}}><FaNodeJs size={20} className="text-zinc-500" /></div>
                 <div className="absolute top-[40%] left-[45%] w-16 h-16 bg-white/[0.04] rounded-2xl flex items-center justify-center border border-white/[0.08] animate-float" style={{animationDelay: '1.5s'}}><FaGithub size={32} className="text-zinc-500" /></div>
              </div>
            }
            secondaryForeground={
              // Beautifully ALIGNED Grid that resolves from the chaos and injects full color
              <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] p-4 pointer-events-auto">
                 {floatingIcons.map((item, i) => (
                    <div 
                      key={i}
                      className="aspect-square bg-[#0c0d12]/90 backdrop-blur-xl border border-white/[0.1] rounded-[14px] flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_15px_30px_rgba(0,0,0,0.6)] opacity-0 group-hover:opacity-100 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] translate-y-6 group-hover:translate-y-0 group-hover:scale-100 hover:bg-white/[0.05] hover:-translate-y-1 cursor-pointer"
                      style={{ transitionDelay: `${100 + (i * 50)}ms` }}
                    >
                        <item.Icon className={`text-[26px] ${item.color} drop-shadow-[0_0_8px_currentColor]`} />
                    </div>
                 ))}
              </div>
            }
          />

        </div>
      </div>
    </section>
    </>
  );
}

export default ProductPreview;
