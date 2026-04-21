"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

// ─── Rolling digit ────────────────────────────────────────────────────────────
function RollingDigit({
  final: finalDigit,
  between,
  dir = "from-below",
  delay = 0,
  triggered,
}: {
  final: string
  between: string[]
  dir?: "from-below" | "from-above"
  delay?: number
  triggered: boolean
}) {
  const n = between.length + 1
  const pct = (n - 1) * 100
  const startY = dir === "from-below" ? `${pct}%` : "0%"
  const endY = dir === "from-below" ? "0%" : `-${pct}%`
  const items = [...between, finalDigit]

  return (
    <span
      className="rolling-number relative inline-flex items-center overflow-hidden"
      style={{ verticalAlign: "baseline" }}
    >
      <span className="opacity-0">{finalDigit}</span>
      <span
        className={`absolute inset-0 flex items-center will-change-transform ${
          dir === "from-below" ? "flex-col-reverse" : "flex-col"
        }`}
        style={{
          transform: triggered ? `translateY(${endY})` : `translateY(${startY})`,
          transition: triggered
            ? `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
            : "none",
        }}
      >
        {items.map((d, i) => (
          <span key={i} style={{ height: "1em", lineHeight: 1, display: "flex", alignItems: "center" }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

// ─── SVG Canvas Replacements ──────────────────────────────────────────────────
function SmallAgenticCanvas({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/10 backdrop-blur-sm overflow-hidden border border-[#2d5a2d]">
      <svg className="absolute w-[150%] h-[150%] opacity-20" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 4">
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="50" r="25" fill="none" stroke={color} strokeWidth="1">
          <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="15s" repeatCount="indefinite" />
        </circle>
      </svg>
      {/* Central pulsing node */}
      <div className="relative z-10 w-4 h-4 rounded-full" style={{ backgroundColor: color }}>
        <div className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ backgroundColor: color }}></div>
      </div>
    </div>
  )
}

function MainHeroCanvas() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
      <svg className="w-full h-full max-w-[800px]" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <g stroke="#2d5a2d" strokeWidth="1" fill="none">
          {/* Volumetric grid effect */}
          <path d="M 0,300 Q 500,600 1000,300 M 0,250 Q 500,500 1000,250 M 0,350 Q 500,700 1000,350" opacity="0.3" />
          <path d="M 200,0 L 200,600 M 400,0 L 400,600 M 600,0 L 600,600 M 800,0 L 800,600" opacity="0.1" />
          
          <circle cx="500" cy="300" r="150" strokeDasharray="10 10">
            <animateTransform attributeName="transform" type="rotate" from="0 500 300" to="360 500 300" dur="60s" repeatCount="indefinite" />
          </circle>
          <circle cx="500" cy="300" r="250" strokeDasharray="2 8" opacity="0.5">
             <animateTransform attributeName="transform" type="rotate" from="360 500 300" to="0 500 300" dur="100s" repeatCount="indefinite" />
          </circle>
        </g>
        <circle cx="500" cy="300" r="4" fill="#5cb85c" className="animate-pulse" />
      </svg>
    </div>
  )
}

function StickyScenePersona() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#17201b] rounded-2xl overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none">
        <rect x="50" y="50" width="300" height="200" rx="12" fill="#1e2c22" stroke="#2d5a2d" strokeWidth="1"/>
        {/* User Persona wireframe */}
        <circle cx="200" cy="110" r="30" fill="#5cb85c" opacity="0.2"/>
        <path d="M 150,200 Q 200,150 250,200 Z" fill="#5cb85c" opacity="0.2"/>
        <text x="200" y="240" fill="#cfd7c7" fontSize="14" textAnchor="middle" fontWeight="bold">Active Persona Configured</text>
        <circle cx="100" cy="80" r="3" fill="#cfd7c7"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite"/></circle>
        <circle cx="300" cy="180" r="3" fill="#cfd7c7"><animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite"/></circle>
      </svg>
    </div>
  )
}

function StickySceneScoring() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#17201b] rounded-2xl overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none">
        {/* Radar chart wireframe */}
        <polygon points="200,50 320,100 300,220 100,220 80,100" stroke="#2d5a2d" strokeWidth="1" fill="#1e2c22" />
        <polygon points="200,90 280,120 260,190 140,190 120,120" stroke="#5cb85c" strokeWidth="2" fill="#5cb85c" opacity="0.2" />
        <line x1="200" y1="150" x2="200" y2="50" stroke="#2d5a2d" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="150" x2="320" y2="100" stroke="#2d5a2d" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="150" x2="300" y2="220" stroke="#2d5a2d" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="150" x2="100" y2="220" stroke="#2d5a2d" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="200" y1="150" x2="80" y2="100" stroke="#2d5a2d" strokeWidth="1" strokeDasharray="4 4" />
        <text x="200" y="260" fill="#cfd7c7" fontSize="14" textAnchor="middle" fontWeight="bold">Custom Dimensions Rated</text>
      </svg>
    </div>
  )
}

function StickySceneOverlays() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#17201b] rounded-2xl overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none">
        {/* UI mockups floating */}
        <rect x="60" y="40" width="200" height="150" rx="8" fill="#1e2c22" stroke="#2d5a2d" strokeWidth="1"/>
        <rect x="140" y="90" width="200" height="160" rx="8" fill="#17201b" stroke="#5cb85c" strokeWidth="1" opacity="0.9"/>
        <circle cx="160" cy="110" r="5" fill="#FF7759" />
        <circle cx="180" cy="110" r="5" fill="#a67cff" />
        <circle cx="200" cy="110" r="5" fill="#5cb85c" />
        <rect x="160" y="140" width="160" height="8" rx="4" fill="#cfd7c7" opacity="0.2"/>
        <rect x="160" y="160" width="120" height="8" rx="4" fill="#cfd7c7" opacity="0.2"/>
        <rect x="160" y="180" width="140" height="8" rx="4" fill="#cfd7c7" opacity="0.2"/>
        <text x="200" y="275" fill="#cfd7c7" fontSize="14" textAnchor="middle" fontWeight="bold">Overlay Integrations Mocked</text>
      </svg>
    </div>
  )
}


// ─── Main Component ───────────────────────────────────────────────────────────
export default function PerformanceSection() {
  const [triggered, setTriggered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Sticky scroll spy logic
  const [activeDot, setActiveDot] = useState(0)
  const step0Ref = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLDivElement>(null)
  const step2Ref = useRef<HTMLDivElement>(null)

  // Trigger main stat rolling numbers
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Setup spies for sticky interaction
  useEffect(() => {
    const ob = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target === step0Ref.current) setActiveDot(0)
            if (entry.target === step1Ref.current) setActiveDot(1)
            if (entry.target === step2Ref.current) setActiveDot(2)
        }
      })
    }, { rootMargin: "-45% 0px -45% 0px" })

    if (step0Ref.current) ob.observe(step0Ref.current)
    if (step1Ref.current) ob.observe(step1Ref.current)
    if (step2Ref.current) ob.observe(step2Ref.current)

    return () => ob.disconnect()
  }, [])


  return (
    <section ref={sectionRef} data-sanity="id=perf" className="w-full">
      {/* =======================================================================
          CLUSTER 1: Hero & Absolute Floaters
          ======================================================================= */}
      <div className="transition-colors duration-800 bg-[#112817] text-white">
        <div className="relative overflow-hidden py-32 md:py-48">
          <MainHeroCanvas />
          
          <div className="relative mx-auto px-6 lg:px-12 max-w-[1440px]">
            <h3 className="text-[clamp(2.5rem,5.5vw,4.25rem)] mx-auto w-full max-w-[847px] text-center font-medium leading-[1.05] tracking-[-0.02em]">
              <span className="relative z-10 inline-block">Performance </span>{" "}
              <span className="inline-block translate-y-1 align-middle mr-2">
                <svg width="77" height="72" viewBox="0 0 77 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block" style={{ width: "1em", height: "auto" }}>
                  <path opacity="0.6" d="M18.6729 41.6514L5.36572 49.1829C4.11136 49.8928 3.33594 51.2227 3.33594 52.664V63.3357C3.33594 65.5449 5.1268 67.3357 7.33594 67.3357H69.999C72.2082 67.3357 73.999 65.5449 73.999 63.3357V13.276C73.999 9.87263 70.0192 8.02409 67.4186 10.2196L60.4305 16.1193L35.6746 38.4773C35.0674 39.0257 34.3066 39.3747 33.4949 39.4772L20.1418 41.1641C19.6251 41.2294 19.1261 41.3949 18.6729 41.6514Z" fill="url(#paint0_linear_perf)"></path>
                  <defs>
                    <linearGradient id="paint0_linear_perf" x1="38.6675" y1="4.66406" x2="38.6675" y2="67.3357" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#09CF58"></stop>
                      <stop offset="1" stopColor="#09CF58" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="inline">you can measure, outcomes that matter to you.</span>
            </h3>
          </div>

          <div className="absolute inset-0 mx-auto max-w-[1440px] pointer-events-none">
            {/* Left Top graphic */}
            <div className="absolute top-12 left-6 aspect-[325/236] w-full max-w-[55%] sm:max-w-[32%] md:top-34 md:left-[15%] md:max-w-[22.5%] opacity-70">
                <SmallAgenticCanvas color="#5cb85c" />
            </div>

            {/* Right Side Stacked Stats */}
            <div className="absolute top-[25%] right-[5%] hidden w-full max-w-[40%] flex-col gap-3 sm:top-[20%] sm:right-[15%] md:flex md:max-w-[28%] z-10">
              
              {/* Protocol Compliance */}
              <div className="flex min-h-[35px] max-w-max items-center gap-5 rounded-full border border-[#2d5a2d] bg-[#112817]/90 px-4 py-1.5 whitespace-nowrap backdrop-blur-md">
                <div className="text-xs font-medium tracking-wide">Protocol Compliance</div>
                <div className="flex items-center gap-3">
                  <div className="flex text-sm font-semibold tracking-tight text-white leading-none">
                    <RollingDigit final="9" between={["1","5","4"]} dir="from-below" triggered={triggered} />
                    <RollingDigit final="6" between={["9","1","3"]} dir="from-above" delay={60} triggered={triggered} />
                    <span className="opacity-80">%</span>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <div key={i} className={`relative size-2 rounded-full bg-[#5cb85c]`}>
                        {i === 4 && <div className="absolute inset-[2px] rounded-full bg-[#112817]"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Situation Assessment */}
              <div className="flex min-h-[35px] max-w-max translate-x-12 items-center gap-5 rounded-full border border-[#2d5a2d] bg-[#112817]/90 px-4 py-1.5 whitespace-nowrap backdrop-blur-md">
                <div className="text-xs font-medium tracking-wide">Situation Assessment</div>
                <div className="flex items-center gap-3">
                  <div className="flex text-sm font-semibold tracking-tight text-white leading-none">
                    <RollingDigit final="9" between={["3","4","7"]} dir="from-below" delay={40} triggered={triggered} />
                    <RollingDigit final="2" between={["1","7","6"]} dir="from-above" delay={100} triggered={triggered} />
                    <span className="opacity-80">%</span>
                  </div>
                  <div className="flex items-center gap-[2px]">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <div key={i} className={`relative size-2 rounded-full bg-[#5cb85c]`}>
                        {i === 4 && <div className="absolute inset-[2px] rounded-full bg-[#112817]"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Left Huge Stats Box */}
            <div className="absolute bottom-[10%] left-6 hidden w-full max-w-[36%] flex-col gap-3 sm:left-[8%] sm:max-w-[25%] md:flex lg:bottom-[20%]">
              <div className="max-w-[223px] rounded-xl border border-[#2d5a2d] bg-[#112817]/80 p-5 backdrop-blur-md">
                <div className="flex text-[22px] font-semibold leading-none tracking-tight">
                  <RollingDigit final="3" between={["2","0","6"]} dir="from-below" delay={0} triggered={triggered} />
                  <RollingDigit final="8" between={["4","3","6"]} dir="from-above" delay={40} triggered={triggered} />
                  <span className="mr-0.5 pb-2 text-white/50">,</span>
                  <RollingDigit final="5" between={["2","8","1"]} dir="from-below" delay={80} triggered={triggered} />
                  <RollingDigit final="6" between={["0","6","4"]} dir="from-above" delay={120} triggered={triggered} />
                  <RollingDigit final="4" between={["7","1","3"]} dir="from-below" delay={160} triggered={triggered} />
                </div>
                <div className="mt-3 text-xs font-medium text-[#cfd7c7] opacity-80 uppercase tracking-wider">Messages Exchanged</div>
              </div>
              
              <div className="max-w-[223px] translate-x-12 rounded-xl border border-[#2d5a2d] bg-[#112817]/80 p-5 backdrop-blur-md">
                <div className="flex text-[22px] font-semibold leading-none tracking-tight">
                  <RollingDigit final="4" between={["5","8","3"]} dir="from-below" delay={100} triggered={triggered} />
                  <RollingDigit final="0" between={["3","5","1"]} dir="from-above" delay={140} triggered={triggered} />
                  <RollingDigit final="6" between={["3","4","6"]} dir="from-below" delay={180} triggered={triggered} />
                </div>
                <div className="mt-3 text-xs font-medium text-[#cfd7c7] opacity-80 uppercase tracking-wider">Active Team Members</div>
              </div>
            </div>

            {/* Bottom Middle/Right extra canvases offset */}
            <div className="absolute bottom-[20%] left-[39%] hidden aspect-[309/169] w-[21.5%] sm:block lg:bottom-[10%] opacity-40">
                <SmallAgenticCanvas color="#a67cff" />
            </div>
            <div className="absolute right-[10%] bottom-[7%] aspect-[309/166] w-full max-w-[60%] sm:max-w-[21.5%] lg:bottom-[30.5%] z-5">
                 <SmallAgenticCanvas color="#FF7759" />
            </div>
          </div>
        </div>

        {/* =======================================================================
            CLUSTER 2: Measurable Results Grid 
            ======================================================================= */}
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pb-24 md:pb-36 z-20 relative">
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight">Measurable results from Day One</h3>
          
          <div className="mt-10 flex flex-wrap gap-8 md:gap-12 md:mt-16">
            
            {/* Stat 1 */}
            <div className="relative flex flex-[1_1_100%] flex-col gap-4 pl-8 sm:flex-1 lg:flex-row lg:items-end xl:gap-8 border-l border-[#cfd7c7]/20">
              <div className="absolute top-0 -left-[5px] size-2.5 rounded-full bg-[#5cb85c]"></div>
              <div className="flex font-semibold leading-none tracking-tight text-[clamp(3.5rem,7vw,4.5rem)] text-white">
                <RollingDigit final="9" between={["9","3","6"]} dir="from-below" delay={0} triggered={triggered} />
                <RollingDigit final="3" between={["0","4","1"]} dir="from-above" delay={50} triggered={triggered} />
                <span className="mb-2 inline-flex items-center text-4xl opacity-80">%</span>
              </div>
              <div className="text-lg opacity-70 max-w-[200px] leading-tight pb-2">communication skills improvement</div>
            </div>

            {/* Stat 2 */}
            <div className="relative flex flex-[1_1_100%] flex-col gap-4 pl-8 sm:flex-1 lg:flex-row lg:items-end xl:gap-8 border-l border-[#cfd7c7]/20">
              <div className="absolute top-0 -left-[5px] size-2.5 rounded-full bg-[#a67cff]"></div>
              <div className="flex font-semibold leading-none tracking-tight text-[clamp(3.5rem,7vw,4.5rem)] text-white">
                <RollingDigit final="8" between={["8","5","4"]} dir="from-below" delay={100} triggered={triggered} />
                <RollingDigit final="4" between={["8","7","6"]} dir="from-above" delay={150} triggered={triggered} />
                <span className="mb-2 inline-flex items-center text-4xl opacity-80">%</span>
              </div>
              <div className="text-lg opacity-70 max-w-[200px] leading-tight pb-2">increase in team confidence</div>
            </div>

            {/* Stat 3 */}
            <div className="relative flex flex-[1_1_100%] flex-col gap-4 pl-8 sm:flex-1 lg:flex-row lg:items-end xl:gap-8 border-l border-[#cfd7c7]/20">
              <div className="absolute top-0 -left-[5px] size-2.5 rounded-full bg-[#FF7759]"></div>
              <div className="flex font-semibold leading-none tracking-tight text-[clamp(3.5rem,7vw,4.5rem)] text-white">
                <RollingDigit final="5" between={["2","4","1"]} dir="from-below" delay={200} triggered={triggered} />
                <RollingDigit final="9" between={["5","3","7"]} dir="from-above" delay={250} triggered={triggered} />
                <span className="mb-2 inline-flex items-center text-4xl opacity-80">%</span>
              </div>
              <div className="text-lg opacity-70 max-w-[200px] leading-tight pb-2">faster onboarding</div>
            </div>

          </div>
        </div>
      </div>


      {/* =======================================================================
          CLUSTER 3: Sticky-Scroll "Prepare: AI Training Simulations"
          ======================================================================= */}
      <div className="py-20 md:py-36 bg-[#f7f6f2] text-[#0d1a0d]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          
          <div className="mx-auto mb-16 w-full max-w-[650px] text-center md:mb-24">
            <h2 className="inline-flex items-center gap-3">
              <span className="size-2 rounded-full bg-[#112817]"></span>
              <span className="text-sm font-semibold tracking-widest uppercase opacity-80">Prepare: AI Training Simulations</span>
            </h2>
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight mt-6 leading-[1.1]">
              Give your agents realistic practice before they take a single live call.
            </h3>
            
            <Link href="/products/prepare" className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#112817] text-[#5cb85c] hover:bg-[#2d5a2d] hover:text-[#dcf5a3] transition-all py-3 px-6 text-sm font-semibold group duration-300 transform active:scale-95 shadow-md">
              <span className="relative z-10">See Simulations in Action</span>
              <svg className="transform transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>

          <div className="relative">
            <div className="relative flex w-full flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
              
              {/* Left Side: Scrollable text blocks */}
              <div className="relative flex-1 lg:max-w-[450px]">
                
                {/* Sticky Progress Dots */}
                <div className="sticky z-10 mb-8 hidden lg:mb-12 lg:block" style={{ top: "40vh" }}>
                  <div className="bg-[#e9ebe1] relative inline-flex h-8 items-center gap-2 rounded-full px-4 shadow-sm border border-[#cfd7c7]">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="relative size-2.5 overflow-hidden rounded-full cursor-pointer transition-transform duration-300 hover:scale-125">
                        <div className="absolute inset-0 rounded-full border border-[#cfd7c7] bg-[#f7f6f2]"></div>
                        <div className={`absolute inset-0 rounded-full bg-[#112817] transition-transform duration-500 ${activeDot === i ? "scale-100" : "scale-0"}`}></div>
                        <div className={`absolute inset-[2.5px] rounded-full bg-white transition-transform duration-500 delay-100 ${activeDot === i ? "scale-100" : "scale-0"}`}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Blocks */}
                <div className="space-y-24 lg:space-y-[40vh] pb-[20vh] relative z-20">
                  
                  {/* Step 0 */}
                  <div ref={step0Ref} className="scroll-mt-[45vh] lg:max-w-[411px] transition-opacity duration-500" style={{ opacity: activeDot === 0 ? 1 : 0.3 }}>
                    <div className="bg-[#e9ebe1] relative mb-8 aspect-[737/450] w-full overflow-hidden rounded-xl lg:hidden">
                       <StickyScenePersona />
                    </div>
                    <h5 className="text-[28px] font-semibold tracking-tight text-[#112817]">Configurable personas</h5>
                    <p className="text-xl mt-4 opacity-80 text-[#1a3020] leading-relaxed">
                      Build or upload your own scenarios in seconds with a single prompt.
                    </p>
                  </div>

                  {/* Step 1 */}
                  <div ref={step1Ref} className="scroll-mt-[45vh] lg:max-w-[411px] transition-opacity duration-500" style={{ opacity: activeDot === 1 ? 1 : 0.3 }}>
                    <div className="bg-[#e9ebe1] relative mb-8 aspect-[737/450] w-full overflow-hidden rounded-xl lg:hidden">
                      <StickySceneScoring />
                    </div>
                    <h5 className="text-[28px] font-semibold tracking-tight text-[#112817]">Custom scoring dimensions</h5>
                    <p className="text-xl mt-4 opacity-80 text-[#1a3020] leading-relaxed">
                      Mirror your organization&apos;s evaluation criteria perfectly.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div ref={step2Ref} className="scroll-mt-[45vh] lg:max-w-[411px] transition-opacity duration-500" style={{ opacity: activeDot === 2 ? 1 : 0.3 }}>
                    <div className="bg-[#e9ebe1] relative mb-8 aspect-[737/450] w-full overflow-hidden rounded-xl lg:hidden">
                       <StickySceneOverlays />
                    </div>
                    <h5 className="text-[28px] font-semibold tracking-tight text-[#112817]">Software overlays</h5>
                    <p className="text-xl mt-4 opacity-80 text-[#1a3020] leading-relaxed">
                      Simulate tools like CRMs or EMRs simultaneously with the conversation.
                    </p>
                  </div>

                </div>
              </div>

              {/* Right Side: Sticky Interactive Canvas Display */}
              <div className="hidden max-w-[737px] flex-1 lg:block relative h-full">
                <div className="sticky z-0 shadow-2xl rounded-2xl overflow-hidden" style={{ top: "max(20vh, 120px)" }}>
                  <div className="relative aspect-[737/450] w-full overflow-hidden bg-[#1e2c22] border border-[#2d5a2d]/30">
                    
                    {/* Layer 0 */}
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeDot === 0 ? "opacity-100 z-10" : "opacity-0 z-0 delay-200"}`}>
                         <StickyScenePersona />
                    </div>

                    {/* Layer 1 */}
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeDot === 1 ? "opacity-100 z-10" : "opacity-0 z-0 delay-200"}`}>
                        <StickySceneScoring />
                    </div>

                    {/* Layer 2 */}
                    <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeDot === 2 ? "opacity-100 z-10" : "opacity-0 z-0 delay-200"}`}>
                        <StickySceneOverlays />
                    </div>
                    
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
