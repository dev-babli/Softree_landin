"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const FRAME_PATH = "/ezgif-5eb76904133277b4-png-split/ezgif-frame-";

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `${FRAME_PATH}${padded}.png`;
}

interface ServiceBlock {
  accent: string;
  accentGlow: string;
  title: string;
  description: string;
}

const SERVICES: ServiceBlock[] = [
  {
    accent: "#00F0FF",
    accentGlow: "0 0 40px rgba(0,240,255,0.35)",
    title: "AI & Automation",
    description:
      "Autonomous agents and intelligent workflows that think, adapt, and execute at scale.",
  },
  {
    accent: "#00F0FF",
    accentGlow: "0 0 40px rgba(0,240,255,0.35)",
    title: "Microsoft 365",
    description:
      "Deep platform integration — SharePoint, Power Apps, Teams — engineered for enterprise velocity.",
  },
  {
    accent: "#A855F7",
    accentGlow: "0 0 40px rgba(168,85,247,0.35)",
    title: "Data Engineering",
    description:
      "Real-time pipelines, lakehouse architectures, and analytics that turn noise into signal.",
  },
  {
    accent: "#A855F7",
    accentGlow: "0 0 40px rgba(168,85,247,0.35)",
    title: "Modern App Dev",
    description:
      "Production-grade web and mobile experiences, from MVP to planet-scale deployment.",
  },
];

export default function SoftreeCanvasHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const rafIdRef = useRef<number>(0);

  const drawFrame = useCallback((index: number) => {
    const ctx = contextRef.current;
    const img = imagesRef.current[index];
    const canvas = canvasRef.current;
    if (!ctx || !img || !canvas || !img.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;

    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      drawH = canvas.height;
      drawW = drawH * imgRatio;
      drawX = (canvas.width - drawW) / 2;
      drawY = 0;
    } else {
      drawW = canvas.width;
      drawH = drawW / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawH) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;
    contextRef.current = ctx;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    setCanvasSize();

    let loaded = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const loadBatch = (startIdx: number, endIdx: number): Promise<void[]> => {
      const promises: Promise<void>[] = [];
      for (let i = startIdx; i < endIdx && i < TOTAL_FRAMES; i++) {
        promises.push(
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = getFrameSrc(i + 1);
            img.onload = () => {
              images[i] = img;
              loaded++;
              setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
              resolve();
            };
            img.onerror = () => {
              loaded++;
              setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
              resolve();
            };
          })
        );
      }
      return Promise.all(promises);
    };

    const preloadImages = async () => {
      await loadBatch(0, 30);
      imagesRef.current = images;
      drawFrame(0);

      await loadBatch(30, 90);
      await loadBatch(90, 160);
      await loadBatch(160, TOTAL_FRAMES);

      imagesRef.current = images;
      setIsLoaded(true);
    };

    preloadImages();

    const handleResize = () => {
      setCanvasSize();
      drawFrame(frameIndexRef.current.value);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  useEffect(() => {
    if (!isLoaded || !sectionRef.current) return;

    const section = sectionRef.current;

    const scrollDist = window.innerHeight * 5;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${scrollDist}`,
      pin: true,
      scrub: 1.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        const frameIdx = Math.round(progress * (TOTAL_FRAMES - 1));
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => drawFrame(frameIdx));
        frameIndexRef.current.value = frameIdx;

        if (headlineRef.current) {
          const headlineFade = Math.max(0, 1 - progress * 8);
          const headlineY = Math.min(0, -(progress * 8) * 60);
          headlineRef.current.style.opacity = String(headlineFade);
          headlineRef.current.style.transform = `translateY(${headlineY}px)`;
        }

        if (subtitleRef.current) {
          const subtitleFade = Math.max(0, 1 - progress * 10);
          subtitleRef.current.style.opacity = String(subtitleFade);
        }

        if (scrollHintRef.current) {
          const hintFade = Math.max(0, 1 - progress * 20);
          scrollHintRef.current.style.opacity = String(hintFade);
        }

        const serviceZones = [
          { fadeIn: 0.08, peak: 0.15, fadeOut: 0.25 },
          { fadeIn: 0.25, peak: 0.35, fadeOut: 0.45 },
          { fadeIn: 0.45, peak: 0.55, fadeOut: 0.65 },
          { fadeIn: 0.65, peak: 0.80, fadeOut: 1.0 },
        ];

        serviceRefs.current.forEach((el, i) => {
          if (!el) return;
          const zone = serviceZones[i];

          let opacity = 0;
          let translateY = 80;
          let blur = 8;

          if (progress < zone.fadeIn) {
            opacity = 0;
            translateY = 80;
            blur = 8;
          } else if (progress < zone.peak) {
            const t = (progress - zone.fadeIn) / (zone.peak - zone.fadeIn);
            opacity = t;
            translateY = 80 * (1 - t);
            blur = 8 * (1 - t);
          } else if (progress < zone.fadeOut) {
            opacity = 1;
            translateY = 0;
            blur = 0;
          } else if (i < SERVICES.length - 1) {
            const t = Math.min(1, (progress - zone.fadeOut) / 0.08);
            opacity = 1 - t;
            translateY = -50 * t;
            blur = 4 * t;
          } else {
            opacity = 1;
            translateY = 0;
            blur = 0;
          }

          el.style.opacity = String(opacity);
          el.style.transform = `translateY(${translateY}px)`;
          el.style.filter = `blur(${blur}px)`;
        });
      },
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
    };
  }, [isLoaded, drawFrame]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, transparent 100%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          zIndex: 2,
          height: "30%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
        }}
      />

      <div
        className="relative flex flex-col justify-center h-full px-8 sm:px-12 md:px-16 lg:px-20 xl:px-28"
        style={{ zIndex: 3 }}
      >
        <div className="max-w-xl">
          <div ref={headlineRef} className="mb-16">
            <p
              className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}
            >
              Softree Technology
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight"
              style={{ color: "#ffffff", fontFamily: "Inter, sans-serif" }}
            >
              Building the
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00F0FF, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                digital future
              </span>
            </h1>
            <p
              ref={subtitleRef}
              className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, sans-serif" }}
            >
              Enterprise-grade software, agentic AI, and data platforms — from
              seed to scale.
            </p>
          </div>

          <div className="relative min-h-[180px]">
            {SERVICES.map((service, i) => (
              <div
                key={service.title}
                ref={(el) => {
                  serviceRefs.current[i] = el;
                }}
                className="absolute top-0 left-0 w-full"
                style={{ opacity: 0 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: service.accent,
                      boxShadow: service.accentGlow,
                    }}
                  />
                  <span
                    className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase"
                    style={{ color: service.accent, fontFamily: "Inter, sans-serif" }}
                  >
                    {`0${i + 1}`}
                  </span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3"
                  style={{ color: "#ffffff", fontFamily: "Inter, sans-serif" }}
                >
                  {service.title}
                </h2>

                <p
                  className="text-sm sm:text-base leading-relaxed max-w-sm"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Inter, sans-serif" }}
                >
                  {service.description}
                </p>

                <div
                  className="mt-5 h-[1px] w-16"
                  style={{
                    background: `linear-gradient(to right, ${service.accent}, transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isLoaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 10, backgroundColor: "#000000" }}
        >
          <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${loadProgress}%`,
                background: "linear-gradient(90deg, #00F0FF, #A855F7)",
              }}
            />
          </div>
          <p
            className="mt-4 text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}
          >
            Loading {loadProgress}%
          </p>
        </div>
      )}

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 3 }}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span
            className="text-[10px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Inter, sans-serif" }}
          >
            Scroll
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            <rect
              x="1"
              y="1"
              width="14"
              height="22"
              rx="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="8" cy="8" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}
