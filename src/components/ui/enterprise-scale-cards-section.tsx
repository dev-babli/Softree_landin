"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Blocks, Cpu, Link2, Lock, RefreshCw, Shield, ShieldCheck } from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

export function EnterpriseScaleCardsSection() {
  const canvas1Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas3Ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvas1Ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    const init = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: 280 }, () => ({
        x: width / 2 + (Math.random() - 0.5) * 150,
        y: height * 0.38 + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2 - 0.1,
        radius: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.6 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        const dx = p.x - width / 2;
        const dy = p.y - height * 0.38;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = Math.max(0, p.alpha * (1 - dist / 250));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 70, 229, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const canvas = canvas3Ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      color: string;
      offset: number;
      speed: number;
    }> = [];

    const init = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const centerX = width * 1.2;
      const centerY = height * 0.8;
      const baseRadius = width * 0.9;

      particles = Array.from({ length: 1200 }, () => {
        const angle = Math.PI + Math.random() * Math.PI * 0.65;
        const r = baseRadius + (Math.random() - 0.5) * 120 * Math.random();
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        const nx = Math.max(0, Math.min(1, x / width));
        const rCol = Math.round(59 + (6 - 59) * nx);
        const gCol = Math.round(130 + (182 - 130) * nx);
        const bCol = Math.round(246 + (212 - 246) * nx);
        return {
          x,
          y,
          radius: Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.5 + 0.1,
          color: `${rCol}, ${gCol}, ${bCol}`,
          offset: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.02,
        };
      });
    };

    const draw = () => {
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const fx = Math.sin(time * p.speed + p.offset) * 2;
        const fy = Math.cos(time * p.speed + p.offset) * 2;
        const twinkle = Math.sin(time * 3 + p.offset) * 0.5 + 0.5;
        const alpha = p.alpha * (0.5 + twinkle * 0.5);
        ctx.beginPath();
        ctx.arc(p.x + fx, p.y + fy, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-[#F7F5F3] pb-24 pt-24 font-sans text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <h5 className="mb-4 text-sm font-semibold uppercase tracking-wide text-indigo-600">Enterprise Ready</h5>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
            Built for reliability and scale
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            Trust your most critical flows to a platform with five nines of uptime and enterprise-grade security.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="group relative h-[600px] w-full overflow-hidden rounded-3xl shadow-[2px_4px_8px_rgba(0,0,0,0.02),8px_16px_24px_rgba(0,0,0,0.03),64px_96px_128px_rgba(0,0,0,0.12),80px_120px_160px_rgba(99,70,241,0.15),inset_0_1px_1px_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.04)] transition-all duration-700 ease-out hover:-translate-y-4"
            style={{ background: "linear-gradient(145deg, #ffffff 0%, #eef2ff 100%)" }}>
            <canvas ref={canvas1Ref} className="pointer-events-none absolute inset-0 z-0 opacity-60" />
            <div className="relative z-10 flex items-start justify-between p-8 pb-0">
              <h2 className="max-w-[200px] text-2xl font-medium leading-tight tracking-tight text-slate-800">
                Maximize revenue with machine learning
              </h2>
              <BorderGlow borderRadius={12} backgroundColor="#F5F3FF" glowColor="25 100 50">
                <button className="flex items-center justify-center rounded-xl bg-indigo-50 p-2.5 text-indigo-600 transition-colors hover:bg-indigo-100 cursor-pointer">
                  <Cpu className="h-5 w-5" />
                </button>
              </BorderGlow>
            </div>

            <div className="relative z-10 m-6 mt-8 flex h-[32rem] flex-col rounded-3xl bg-white p-8 shadow-[2px_4px_8px_rgba(0,0,0,0.02),8px_16px_24px_rgba(0,0,0,0.03),64px_96px_128px_rgba(0,0,0,0.12),80px_120px_160px_rgba(6,182,212,0.15),inset_0_1px_1px_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.04)]"
              style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0f9ff 100%)" }}>
              <div className="flex flex-grow flex-col justify-end gap-3 pb-6">
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border border-black/5 bg-white p-4 shadow-sm">
                  <p className="text-xs font-light leading-relaxed text-gray-500">
                    How can we reduce false declines for cross-border transactions?
                  </p>
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-black/5 bg-white p-4 shadow-sm">
                  <p className="text-xs font-light leading-relaxed text-gray-500">
                    Our ML models just updated your risk thresholds, recovering 4.2% of revenue.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
                <div className="mb-5 grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-100/50 bg-cyan-50">
                      <ShieldCheck className="h-[18px] w-[18px] text-cyan-500" />
                    </div>
                    <p className="text-[13px] tracking-tight text-gray-900">Radar Fraud</p>
                    <p className="mb-1.5 mt-0.5 text-[10px] uppercase tracking-widest text-gray-400">Protection</p>
                    <p className="text-xl tracking-tight text-cyan-500">99.8%</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-cyan-600/70">Success Rate</p>
                  </div>
                  <div>
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-100/50 bg-cyan-50">
                      <RefreshCw className="h-[18px] w-[18px] text-cyan-500" />
                    </div>
                    <p className="text-[13px] tracking-tight text-gray-900">Smart Retries</p>
                    <p className="mb-1.5 mt-0.5 text-[10px] uppercase tracking-widest text-gray-400">Optimization</p>
                    <p className="text-xl tracking-tight text-cyan-500">+$12.4k</p>
                    <p className="mt-1 text-[10px] uppercase tracking-widest text-cyan-600/70">Recovered</p>
                  </div>
                </div>
                <div className="mb-3 h-px w-full bg-black/5" />
                <BorderGlow borderRadius={12} backgroundColor="white" glowColor="25 100 50">
                  <button className="group/btn flex w-full items-center justify-between rounded-xl bg-white py-2.5 px-4 transition-all duration-300 hover:bg-gray-50 cursor-pointer">
                    <span className="text-xs font-medium uppercase tracking-widest text-cyan-600">View insights</span>
                    <ArrowRight className="h-4 w-4 text-cyan-500 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </BorderGlow>
              </div>
            </div>
          </div>

          <div className="group relative h-[600px] w-full overflow-hidden rounded-3xl shadow-[2px_4px_8px_rgba(0,0,0,0.02),8px_16px_24px_rgba(0,0,0,0.03),64px_96px_128px_rgba(0,0,0,0.12),80px_120px_160px_rgba(20,184,166,0.15),inset_0_1px_1px_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.04)] transition-all duration-700 ease-out hover:-translate-y-4"
            style={{ background: "linear-gradient(145deg, #ffffff 0%, #f0fdfa 100%)" }}>
            <div className="relative z-20 flex items-start justify-between p-8 pb-0">
              <h2 className="max-w-[220px] text-2xl font-medium leading-tight tracking-tight text-slate-800">
                Bank-level security and compliance
              </h2>
              <BorderGlow borderRadius={12} backgroundColor="#F0FDFA" glowColor="25 100 50">
                <button className="flex items-center justify-center rounded-xl bg-teal-50 p-2.5 text-teal-600 transition-colors hover:bg-teal-100 cursor-pointer">
                  <Lock className="h-5 w-5" />
                </button>
              </BorderGlow>
            </div>

            <div className="relative z-10 flex flex-1 items-center justify-center p-8">
              <div className="animate-float absolute h-96 w-64 rounded-[2rem] bg-gradient-to-tr from-teal-400 via-emerald-300 to-cyan-200 opacity-30 blur-3xl" style={{ animationDelay: "-2s" }} />
              <div className="animate-float relative h-[340px] w-56 overflow-hidden rounded-3xl border border-white/40 bg-white shadow-2xl shadow-teal-500/20">
                <div className="absolute inset-0 bg-[linear-gradient(150deg,#0d9488_0%,#14b8a6_25%,#06b6d4_45%,#0ea5e9_70%,#ffffff_95%)] opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
                  <div className="flex justify-end gap-2 pt-4 pr-2">
                    <Shield className="h-10 w-10 text-white/80" />
                  </div>
                  <div className="flex flex-col pb-2">
                    <span className="mb-1 text-sm font-medium tracking-wider text-white/80">PCI DSS LEVEL 1</span>
                    <span className="text-lg font-medium tracking-widest text-white/95">CERTIFIED SECURE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative h-[600px] w-full overflow-hidden rounded-3xl shadow-[2px_4px_8px_rgba(0,0,0,0.02),8px_16px_24px_rgba(0,0,0,0.03),64px_96px_128px_rgba(0,0,0,0.12),80px_120px_160px_rgba(59,130,246,0.15),inset_0_1px_1px_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.04)] transition-all duration-700 ease-out hover:-translate-y-4"
            style={{ background: "linear-gradient(145deg, #ffffff 0%, #eff6ff 100%)" }}>
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl">
              <div className="absolute left-[-10%] top-[-20%] h-[70%] w-[70%] animate-pulse rounded-full bg-blue-400/20 blur-[80px]" style={{ animationDuration: "8s" }} />
              <div className="absolute bottom-[-20%] right-[-10%] h-[60%] w-[60%] animate-pulse rounded-full bg-cyan-400/20 blur-[80px]" style={{ animationDelay: "2s", animationDuration: "10s" }} />
            </div>

            <div className="relative z-20 flex items-start justify-between p-8 pb-0">
              <h2 className="max-w-[280px] text-2xl font-medium leading-tight tracking-tight text-slate-800">
                Seamlessly connect with your entire stack
              </h2>
              <BorderGlow borderRadius={12} backgroundColor="#EFF6FF" glowColor="25 100 50">
                <button className="group/ico flex items-center justify-center rounded-xl bg-blue-50 p-2.5 text-blue-600 shadow-sm transition-all duration-300 hover:scale-110 hover:bg-blue-100 hover:shadow-md cursor-pointer">
                  <Link2 className="h-5 w-5 transition-transform duration-300 group-hover/ico:rotate-12" />
                </button>
              </BorderGlow>
            </div>

            <div className="relative z-0 h-full w-full flex-1 overflow-hidden">
              <canvas ref={canvas3Ref} className="absolute inset-0 h-full w-full" />
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="lineGradEnterprise" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path d="M-50 450 Q 150 150, 450 350" fill="none" stroke="url(#lineGradEnterprise)" strokeWidth="1.5" className="path-line" />
                <circle cx="100" cy="250" r="3" fill="none" stroke="#3b82f6" strokeWidth="1.5">
                  <animate attributeName="r" values="3; 25" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6; 0" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="100" cy="250" r="3" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
                <circle cx="350" cy="300" r="3" fill="none" stroke="#06b6d4" strokeWidth="1.5">
                  <animate attributeName="r" values="3; 25" dur="3s" begin="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6; 0" dur="3s" begin="1s" repeatCount="indefinite" />
                </circle>
                <circle cx="350" cy="300" r="3" fill="white" stroke="#06b6d4" strokeWidth="1.5" />
                <path d="M50 650 Q 100 300, 300 550" fill="none" stroke="url(#lineGradEnterprise)" strokeWidth="1" className="path-line-2" />
                <circle cx="150" cy="400" r="2.5" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
                  <animate attributeName="r" values="2.5; 20" dur="3s" begin="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6; 0" dur="3s" begin="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="400" r="2.5" fill="white" stroke="#8b5cf6" strokeWidth="1.5" />
              </svg>

              <div className="animate-float absolute left-[10%] top-[60%] z-10 flex cursor-default items-center gap-2 rounded-lg border border-slate-100 bg-white/95 px-3 py-1.5 shadow-md backdrop-blur transition-transform hover:scale-105" style={{ animationDuration: "4s" }}>
                <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-500 animate-pulse" style={{ animationDuration: "3s" }}>
                  <Blocks className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-medium text-slate-700">
                  150+ <span className="text-slate-400">Integrations active</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-card-elements {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        @keyframes dash-line-anim {
          to {
            stroke-dashoffset: -1000;
          }
        }

        .animate-float {
          animation: float-card-elements 6s ease-in-out infinite;
        }

        .path-line {
          stroke-dasharray: 200 400;
          stroke-dashoffset: 0;
          animation: dash-line-anim 15s linear infinite;
        }

        .path-line-2 {
          stroke-dasharray: 150 500;
          stroke-dashoffset: 200;
          animation: dash-line-anim 20s linear infinite reverse;
        }
      `}</style>
    </section>
  );
}

