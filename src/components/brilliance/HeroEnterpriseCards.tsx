import React, { useEffect, useRef, useState } from "react"
import { ArrowRight, Cpu, Layout, Globe, Database } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import BorderGlow from "./BorderGlow"

// --- Professional Noise Utility for AI Canvas ---
const createNoise = () => {
  const p = new Uint8Array(512);
  const permutation = new Uint8Array(256);
  for(let i=0; i<256; i++) permutation[i] = i;
  for(let i=255; i>0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
  }
  for(let i=0; i<512; i++) p[i] = permutation[i & 255];

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t: number, a: number, b: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
    const u = fade(x), v = fade(y), w = fade(z);
    const A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z;
    const B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;

    return lerp(w, lerp(v, lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
                          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))),
                lerp(v, lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
                          lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))));
  };
};

// --- Helper Functions for Spotlight Effect & Parallax ---
function AnimatedCard({ children, glowColor, className }: { children: React.ReactNode, glowColor: string, className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = (mouseX / width) - 0.5
    const yPct = (mouseY / height) - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Spotlight Radial Gradient */}
      <motion.div 
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            ([mx, my]) => `radial-gradient(800px circle at ${((mx as number) + 0.5) * 100}% ${((my as number) + 0.5) * 100}%, ${glowColor}25, transparent 60%)`
          )
        }}
      />
      
      {/* Glass border reflection */}
      <div className="absolute inset-0 z-20 pointer-events-none rounded-[16px] border border-white/10 group-hover:border-white/20 transition-colors duration-700 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      
      <div className="relative z-30 h-full w-full" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

export function HeroEnterpriseCards() {
  const canvas1Ref = useRef<HTMLCanvasElement | null>(null)
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null)
  const canvas3Ref = useRef<HTMLCanvasElement | null>(null)
  const canvas4Ref = useRef<HTMLCanvasElement | null>(null)

  // Service 1: AI & Automation (Semantic: Neural Pulse & Logic Gates)
  useEffect(() => {
    const canvas = canvas1Ref.current; if (!canvas) return
    const ctx = canvas.getContext("2d"); if (!ctx) return
    let width = 0, height = 0, raf = 0, time = 0
    let points: {x: number, y: number, state: number}[] = []
    
    const init = () => {
      width = canvas.offsetWidth; height = canvas.offsetHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr; canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      points = Array.from({ length: 40 }, () => ({
        x: Math.random() * width, y: Math.random() * height, state: Math.random()
      }))
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.01
      
      // Draw synaptic connections
      ctx.lineWidth = 1
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const pulse = (Math.sin(time + p.state * 10) + 1) / 2
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5 + pulse * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 107, 0, ${0.2 + pulse * 0.6})`
        ctx.fill()
        
        // Connect to neighbors
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j]
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 107, 0, ${0.1 * (1 - dist/100) * pulse})`
            ctx.stroke()
            
            // Flowing data signal along line
            if (pulse > 0.8) {
               const signalX = p.x + (p2.x - p.x) * ((time * 2) % 1)
               const signalY = p.y + (p2.y - p.y) * ((time * 2) % 1)
               ctx.beginPath()
               ctx.arc(signalX, signalY, 1, 0, Math.PI * 2)
               ctx.fillStyle = "#FF6B00"
               ctx.fill()
            }
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    init(); draw(); window.addEventListener("resize", init)
    return () => { window.removeEventListener("resize", init); cancelAnimationFrame(raf) }
  }, [])

  // Service 2: Modern App & Web (Semantic: UI Wireframes & Code Brackets)
  useEffect(() => {
    const canvas = canvas2Ref.current; if (!canvas) return
    const ctx = canvas.getContext("2d"); if (!ctx) return
    let width = 0, height = 0, raf = 0, time = 0
    
    const init = () => {
      width = canvas.offsetWidth; height = canvas.offsetHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr; canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.4
      const cx = width / 2, cy = height / 2
      
      // Floating UI Frames
      ctx.strokeStyle = "rgba(161, 196, 255, 0.2)"
      ctx.lineWidth = 1
      for (let i = 0; i < 4; i++) {
        const off = Math.sin(time * 0.05 + i) * 10
        const w = 120 + i * 40, h = 80 + i * 20
        ctx.strokeRect(cx - w/2 + off, cy - h/2 - off, w, h)
        
        // Browser Dots
        ctx.fillStyle = "rgba(161, 196, 255, 0.4)"
        for(let j=0; j<3; j++) {
          ctx.beginPath()
          ctx.arc(cx - w/2 + off + 10 + j*10, cy - h/2 - off + 8, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      
      // Floating Code Brackets "< >"
      ctx.font = "bold 20px monospace"
      ctx.fillStyle = "rgba(161, 196, 255, 0.3)"
      ctx.fillText("< />", cx + 40 + Math.sin(time*0.1)*5, cy - 40)
      ctx.fillText("div", cx - 80 + Math.cos(time*0.08)*5, cy + 50)
      
      raf = requestAnimationFrame(draw)
    }
    init(); draw(); window.addEventListener("resize", init)
    return () => { window.removeEventListener("resize", init); cancelAnimationFrame(raf) }
  }, [])

  // Service 3: Global Tech Partner (Semantic: 3D Connected Globe)
  useEffect(() => {
    const canvas = canvas3Ref.current; if (!canvas) return
    const ctx = canvas.getContext("2d"); if (!ctx) return
    let width = 0, height = 0, raf = 0, time = 0
    
    const init = () => {
      width = canvas.offsetWidth; height = canvas.offsetHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr; canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.005
      const cx = width / 2, cy = height / 2
      const radius = 100
      
      // Draw Globe Lat/Long Wireframe
      ctx.strokeStyle = "rgba(255, 107, 0, 0.15)"
      ctx.lineWidth = 1
      
      // Longitude Lines
      for (let i = 0; i < 8; i++) {
        const angle = time + (i / 8) * Math.PI * 2
        const rx = Math.cos(angle) * radius
        ctx.beginPath()
        ctx.ellipse(cx, cy, Math.abs(rx), radius, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
      
      // Latitude Lines
      for (let i = 1; i < 6; i++) {
        const yOff = -radius + (i / 6) * (radius * 2)
        const r = Math.sqrt(radius * radius - yOff * yOff)
        ctx.beginPath()
        ctx.ellipse(cx, cy + yOff, r, r * 0.2, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
      
      // Connecting Arcs (Strategic Partners)
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255, 107, 0, 0.3)"
      ctx.stroke()
      
      raf = requestAnimationFrame(draw)
    }
    init(); draw(); window.addEventListener("resize", init)
    return () => { window.removeEventListener("resize", init); cancelAnimationFrame(raf) }
  }, [])

  // Service 4: Data Engineering (Semantic: Database Stacks & Charts)
  useEffect(() => {
    const canvas = canvas4Ref.current; if (!canvas) return
    const ctx = canvas.getContext("2d"); if (!ctx) return
    let width = 0, height = 0, raf = 0, time = 0
    
    const init = () => {
      width = canvas.offsetWidth; height = canvas.offsetHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr; canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      time += 0.05
      
      // Draw Database Cylinders
      const drawCylinder = (x: number, y: number, w: number, h: number, color: string) => {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.ellipse(x + w/2, y, w/2, h/4, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillRect(x, y, w, h)
        ctx.beginPath()
        ctx.ellipse(x + w/2, y + h, w/2, h/4, 0, 0, Math.PI * 2)
        ctx.fill()
        // Top cap brighter
        ctx.fillStyle = "rgba(255,255,255,0.1)"
        ctx.beginPath()
        ctx.ellipse(x + w/2, y, w/2, h/4, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      
      // Database Silhouettes
      for (let i = 0; i < 3; i++) {
        const h = 40 + Math.sin(time * 0.5 + i) * 10
        drawCylinder(40 + i*60, height - 80, 40, h, "rgba(161, 196, 255, 0.15)")
      }
      
      // Data Bar Chart
      ctx.fillStyle = "rgba(161, 196, 255, 0.3)"
      for (let i = 0; i < 8; i++) {
        const barH = 50 + Math.sin(time * 0.8 + i) * 30
        ctx.fillRect(width - 150 + i*15, height - 50 - barH, 10, barH)
      }
      
      // Streaming Line Chart
      ctx.beginPath()
      ctx.setLineDash([5, 5])
      ctx.strokeStyle = "rgba(161, 196, 255, 0.2)"
      ctx.moveTo(0, height/2)
      for(let x=0; x < width; x+=20) {
        ctx.lineTo(x, height/2 + Math.sin(x*0.02 + time)*20)
      }
      ctx.stroke()
      ctx.setLineDash([])
      
      raf = requestAnimationFrame(draw)
    }
    init(); draw(); window.addEventListener("resize", init)
    return () => { window.removeEventListener("resize", init); cancelAnimationFrame(raf) }
  }, [])

  const services = [
    {
      title: "AGENTIC AI & AUTOMATION",
      desc: "Deploy autonomous AI agents that handle complex workflows, fine-tuned to your proprietary data for unmatched precision.",
      icon: <Cpu className="h-6 w-6" />,
      canvasRef: canvas1Ref,
      glowColor: "#FF6B00",
      accentColor: "text-[#FF6B00]",
      pill: "ELITE AI",
      bgGradient: "from-[#FF6B00]/20"
    },
    {
      title: "PREMIUM WEB SYSTEMS",
      desc: "Cinematic, high-conversion web applications built with Next.js and React 19, engineered for speed and enterprise reliability.",
      icon: <Layout className="h-6 w-6" />,
      canvasRef: canvas2Ref,
      glowColor: "#A1C4FF",
      accentColor: "text-[#A1C4FF]",
      pill: "NEXT-GEN",
      bgGradient: "from-[#A1C4FF]/20"
    },
    {
      title: "ENTERPRISE TRANSFORMATION",
      desc: "Strategic engineering partners for global digital dominance, migrating legacy complexity into lean, modern architectures.",
      icon: <Globe className="h-6 w-6" />,
      canvasRef: canvas3Ref,
      glowColor: "#FF6B00",
      accentColor: "text-[#FF6B00]",
      pill: "STRATEGIC",
      bgGradient: "from-[#FF6B00]/20"
    },
    {
      title: "DATA SOVEREIGNTY",
      desc: "Robust data engineering pipelines and real-time analytics that turn massive datasets into actionable competitive advantages.",
      icon: <Database className="h-6 w-6" />,
      canvasRef: canvas4Ref,
      glowColor: "#A1C4FF",
      accentColor: "text-[#A1C4FF]",
      pill: "SOVEREIGN",
      bgGradient: "from-[#A1C4FF]/20"
    }
  ]

  return (
    <div className="flex flex-col items-center w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 overflow-visible">
      <style>{`
        .glass-title {
          background: linear-gradient(to right, #ffffff, #a0a0a0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      
      {/* Dynamic Cinematic Header - Tighter Spacing */}
      <div className="w-full max-w-7xl mb-6 relative z-30">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-[1px] w-10 bg-gradient-to-r from-[#FF6B00] to-transparent opacity-60" />
          <span className="text-[10px] font-black tracking-[0.4em] text-[#FF6B00] uppercase opacity-80">
            Enterprise Solutions
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-[1px] drop-shadow-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Core Engineering <span className="text-white/40">Services</span>
        </h2>
      </div>

      {/* 2x2 Grid - Stretched for Cinematic Vista - Consolodated Height */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl flex-1 items-stretch relative z-30 perspective-[2000px]">
        {services.map((service, index) => (
          <AnimatedCard key={index} glowColor={service.glowColor} className="min-h-[220px] md:min-h-[240px]">
            {/* Ambient Corner Glow */}
            <div className={`absolute top-0 left-0 w-80 h-80 bg-gradient-to-br ${service.bgGradient} to-transparent opacity-30 mix-blend-screen rounded-full blur-[100px] pointer-events-none group-hover:opacity-60 transition-opacity duration-1000`} />
            
            {/* The Custom Canvas Animation - Full Bleed */}
            <canvas ref={service.canvasRef} className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen group-hover:opacity-80 transition-opacity duration-1000" />
            
            {/* Content Container - Compact Spacing */}
            <div className="relative z-30 p-6 md:p-8 h-full flex flex-col justify-between" style={{ transform: "translateZ(40px)" }}>
              
              {/* Top Row: Pill & Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="px-4 py-1.5 rounded-full bg-[#0A0A0C]/60 border border-white/10 backdrop-blur-2xl">
                  <span className={`text-[9px] font-black tracking-[0.3em] ${service.accentColor} uppercase`}>
                    {service.pill}
                  </span>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[#0A0A0C]/60 border border-white/10 backdrop-blur-2xl transition-all duration-700 group-hover:scale-110 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] ${service.accentColor}`}>
                  {service.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2 mb-4 flex-1 flex flex-col justify-end">
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tighter" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-white/50 text-[13px] md:text-[14px] font-medium leading-relaxed max-w-[320px] line-clamp-2">
                  {service.desc}
                </p>
              </div>

              {/* Bottom CTA (Hero Style - Exact Match) */}
              <div className="mt-auto">
                <BorderGlow
                  edgeSensitivity={80}
                  glowColor="200 80% 80%"
                  backgroundColor="transparent"
                  borderRadius={50}
                  glowRadius={80}
                  glowIntensity={3}
                  coneSpread={45}
                  animated={false}
                  colors={['#ffffff', '#8498e6', '#38bdf8']}
                  className="transition-all duration-300 ease-out hover:scale-105 active:scale-95 rounded-full w-max"
                >
                  <div className="hyper-glass-pill flex items-center justify-center h-12 px-8 text-[13px] font-black text-white group cursor-pointer tracking-widest uppercase">
                    EXPLORE SOLUTION
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                  </div>
                </BorderGlow>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  )
}
