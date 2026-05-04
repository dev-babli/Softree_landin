"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

function useSectionInView() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return { ref, inView }
}

const DOT_BG = {
  backgroundImage:
    "radial-gradient(circle, rgba(0,60,180,0.14) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
}

const AI_NODES = [
  { cx: 300, cy: 118, r: 22, key: "hub" },
  { cx: 148, cy: 200, r: 13, key: "n1" },
  { cx: 300, cy: 248, r: 13, key: "n2" },
  { cx: 452, cy: 200, r: 13, key: "n3" },
  { cx: 195, cy: 305, r: 9,  key: "n4" },
  { cx: 405, cy: 305, r: 9,  key: "n5" },
]
const AI_EDGES = [
  [300,118,148,200],[300,118,452,200],[300,118,300,248],
  [148,200,195,305],[452,200,405,305],[300,248,195,305],[300,248,405,305],
]

function AIVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden" style={DOT_BG}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div style={{ width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, rgba(251,100,36,0.15) 0%, transparent 68%)" }} />
      </div>

      <svg viewBox="0 0 600 390" className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="ai-node-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b"/>
            <feComposite in="SourceGraphic" in2="b" operator="over"/>
          </filter>
        </defs>

        {AI_EDGES.map(([x1,y1,x2,y2],i) => (
          <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(15,50,160,0.28)" strokeWidth="1.2"
            initial={{ pathLength:0 }} whileInView={{ pathLength:1 }}
            viewport={{ once:true }}
            transition={{ duration:0.8, delay: i*0.08 }}
          />
        ))}

        {AI_EDGES.map(([x1,y1,x2,y2],i) => (
          <circle key={`d${i}`} r="3.5" fill="#1a27d4" style={{ filter:"drop-shadow(0 0 6px #1a27d4)" }}>
            <animateMotion
              path={`M ${x1} ${y1} L ${x2} ${y2}`}
              dur={`${1.6 + i*0.28}s`}
              repeatCount="indefinite"
              begin={`${i*0.55}s`}
            />
          </circle>
        ))}

        {AI_NODES.map((n, i) => (
          <g key={n.key}>
            <motion.circle cx={n.cx} cy={n.cy} r={n.r+10}
              stroke="#1a27d4" strokeWidth="0.8" fill="none"
              animate={{ r:[n.r+8, n.r+22], opacity:[0.5,0] }}
              transition={{ duration:2.4, repeat:Infinity, delay:i*0.45, ease:"easeOut" }}
            />
            <circle cx={n.cx} cy={n.cy} r={n.r}
              fill="rgba(26,40,212,0.22)" stroke="rgba(26,40,212,0.9)" strokeWidth="1.2"
              filter="url(#ai-node-glow)"
            />
            {i === 0 && (
              <text x={n.cx} y={n.cy+5} textAnchor="middle" fill="rgba(15,30,150,0.95)"
                fontSize="11" fontFamily="monospace" fontWeight="800" letterSpacing="1">AI</text>
            )}
          </g>
        ))}

        <motion.circle cx={300} cy={118} r={36}
          stroke="rgba(26,64,200,0.3)" strokeWidth="1" fill="none" strokeDasharray="3 5"
          animate={{ rotate:360 }}
          style={{ transformOrigin:"300px 118px" }}
          transition={{ duration:12, repeat:Infinity, ease:"linear" }}
        />
      </svg>

      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-5">
        {["GPT-4o","Claude 3.5","Gemini 2.0"].map(m => (
          <span key={m} className="font-mono text-[9px] text-[#1a3080]/50 uppercase tracking-widest">{m}</span>
        ))}
      </div>
    </div>
  )
}

const BUILD_STEPS = [
  { label:"lint + typecheck",        ms:"4s",    color:"#0a6e30", delay:0.0 },
  { label:"unit tests · 247 passed", ms:"18s",   color:"#0a6e30", delay:0.35 },
  { label:"next build · 142kB gz",   ms:"24s",   color:"#0a6e30", delay:0.70 },
  { label:"vercel deploy → prod",    ms:"8s",    color:"#1a27d4", delay:1.05 },
  { label:"azure monitor · healthy", ms:"live",  color:"#0a6e30", delay:1.40 },
]

function WebVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-6" style={DOT_BG}>
      <motion.div
        className="w-full max-w-[460px] overflow-hidden border border-[#D1CDC7] shadow-xl"
        initial={{ y:18, opacity:0 }} whileInView={{ y:0, opacity:1 }}
        viewport={{ once:true }} transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
      >
        <div className="flex items-center gap-2 border-b border-[#D1CDC7] bg-[#F3F0EE] px-3 py-2.5">
          <div className="flex gap-1.5">
            {["#ff5f57","#febc2e","#28c840"].map(c=>(
              <div key={c} className="size-2.5 rounded-full" style={{ background:c, opacity:0.9 }} />
            ))}
          </div>
          <div className="mx-auto flex items-center gap-1.5 rounded-sm border border-[#D1CDC7] bg-white/60 px-3 py-[3px]">
            <div className="size-1.5 rounded-full bg-green-600/70" />
            <span className="font-mono text-[9px] text-[#1a3060]/60">app.softree.io · main</span>
          </div>
        </div>

        <div className="bg-[#FCFBFA] px-4 py-3 flex flex-col gap-[7px]">
          {BUILD_STEPS.map((s,i) => (
            <motion.div key={i} className="flex items-center gap-2.5"
              initial={{ opacity:0, x:-8 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.35, delay: s.delay + 0.2 }}
            >
              <motion.span className="shrink-0 font-mono text-[11px]" style={{ color:s.color }}
                initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                viewport={{ once:true }}
                transition={{ delay: s.delay + 0.45 }}
              >✓</motion.span>
              <span className="font-mono text-[11px] text-[#1a2d60]/70 flex-1">{s.label}</span>
              <motion.span className="font-mono text-[9px] text-[#1a2d60]/35 shrink-0"
                initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                viewport={{ once:true }}
                transition={{ delay: s.delay + 0.5 }}
              >{s.ms}</motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex items-center gap-2 border-t border-[#D1CDC7] bg-[#F3F0EE] px-4 py-2.5"
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ delay:1.8 }}
        >
          <div className="size-1.5 rounded-full bg-[#1a27d4] animate-pulse" />
          <span className="font-mono text-[10px] text-[#1a27d4]/80">Lighthouse 98 · P95 180ms · 99.9% uptime SLA</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

const M365 = [
  { label:"SharePoint", color:"#0078d4", angle:-90 },
  { label:"Teams",      color:"#6264a7", angle:-18 },
  { label:"Power BI",   color:"#f2c811", angle:54  },
  { label:"PowerApps",  color:"#742774", angle:126 },
  { label:"Azure AD",   color:"#0089d6", angle:198 },
]
const R = 108, CX = 300, CY = 195

function MicrosoftVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden" style={DOT_BG}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div style={{ width:240,height:240,borderRadius:"50%",background:"radial-gradient(circle,rgba(251,100,36,0.15) 0%,transparent 70%)" }}/>
      </div>
      <svg viewBox="0 0 600 380" className="h-full w-full" fill="none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="ms-glow">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feComposite in="SourceGraphic" in2="b" operator="over"/>
          </filter>
        </defs>

        <motion.circle cx={CX} cy={CY} r={R}
          stroke="rgba(15,50,160,0.2)" strokeWidth="1" strokeDasharray="4 5" fill="none"
          animate={{ rotate:360 }} style={{ transformOrigin:`${CX}px ${CY}px` }}
          transition={{ duration:28, repeat:Infinity, ease:"linear" }}
        />

        {M365.map((p,i) => {
          const rad = p.angle*Math.PI/180
          return (
            <motion.line key={i}
              x1={CX} y1={CY} x2={CX+R*Math.cos(rad)} y2={CY+R*Math.sin(rad)}
              stroke={p.color} strokeOpacity={0.55} strokeWidth="1.2"
              initial={{ pathLength:0 }} whileInView={{ pathLength:1 }}
              viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.12 }}
            />
          )
        })}

        {[["#f25022",-18,-18],["#7fba00",2,-18],["#00a4ef",-18,2],["#ffb900",2,2]].map(([c,dx,dy])=>(
          <rect key={`${dx}${dy}`} x={CX+(dx as number)} y={CY+(dy as number)} width={15} height={15} fill={c as string} rx="1.5" fillOpacity={0.9}/>
        ))}

        <motion.circle cx={CX} cy={CY} r={26}
          stroke="rgba(15,50,160,0.25)" strokeWidth="1" fill="none"
          animate={{ r:[24,42], opacity:[0.4,0] }}
          transition={{ duration:2.5, repeat:Infinity, ease:"easeOut" }}
        />

        {M365.map((p,i) => {
          const rad = p.angle*Math.PI/180
          const px = CX+R*Math.cos(rad), py = CY+R*Math.sin(rad)
          return (
            <motion.g key={i}
              initial={{ opacity:0, scale:0 }}
              whileInView={{ opacity:1, scale:1 }}
              viewport={{ once:true }}
              transition={{ duration:0.4, delay: i*0.14+0.3, type:"spring", stiffness:200 }}
              style={{ transformOrigin:`${px}px ${py}px`, transformBox:"fill-box" }}
            >
              <circle cx={px} cy={py} r={24} fill={p.color} fillOpacity={0.1} stroke={p.color} strokeWidth="0.8" strokeOpacity={0.5} filter="url(#ms-glow)"/>
              <motion.circle cx={px} cy={py} r={28}
                fill="none" stroke={p.color} strokeWidth="0.5"
                animate={{ r:[26,38], opacity:[0.3,0] }}
                transition={{ duration:2.2, repeat:Infinity, delay:i*0.5 }}
              />
              <text x={px} y={py+4} textAnchor="middle" fill="rgba(10,20,100,0.8)" fontSize="7.5" fontFamily="monospace" letterSpacing="0.3">
                {p.label.toUpperCase()}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}

const BARS = [
  { label:"Q1'24", v:0.52, c:"rgba(26,55,180,0.7)" },
  { label:"Q2'24", v:0.68, c:"rgba(26,55,180,0.7)" },
  { label:"Q3'24", v:0.61, c:"rgba(26,55,180,0.7)" },
  { label:"Q4'24", v:0.89, c:"rgba(15,100,220,0.85)" },
  { label:"Q1'25", v:0.95, c:"rgba(15,100,220,0.9)" },
  { label:"Q2'25", v:0.78, c:"rgba(26,55,180,0.7)" },
]

function DataVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-5" style={DOT_BG}>
      <motion.div
        className="w-full max-w-[440px] overflow-hidden border border-[#D1CDC7] shadow-xl"
        initial={{ y:16, opacity:0 }} whileInView={{ y:0, opacity:1 }}
        viewport={{ once:true }} transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
      >
        <div className="flex items-center justify-between border-b border-[#D1CDC7] bg-[#F3F0EE] px-3 py-2.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#141413]/55">Revenue Intelligence</span>
          <motion.div className="flex items-center gap-1.5" animate={{ opacity:[1,0.4,1] }} transition={{ duration:2, repeat:Infinity }}>
            <div className="size-1.5 rounded-full bg-green-600" />
            <span className="font-mono text-[9px] text-[#141413]/45">live · syncing</span>
          </motion.div>
        </div>

        <div className="bg-[#FCFBFA] px-4 pt-4 pb-1">
          <div className="flex items-end gap-2" style={{ height:88 }}>
            {BARS.map((b,i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="relative w-full flex items-end" style={{ height:72 }}>
                  <motion.div className="w-full rounded-t-sm"
                    style={{ background: b.c, minHeight:2 }}
                    initial={{ height:0 }} whileInView={{ height:`${b.v*100}%` }}
                    viewport={{ once:true }}
                    transition={{ duration:0.75, delay:i*0.09, ease:[0.34,1.56,0.64,1] }}
                  />
                </div>
                <span className="font-mono text-[8px] text-[#141413]/45">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-[#D1CDC7] border-t border-[#D1CDC7] bg-[#F3F0EE]">
          {[["98%","Satisfaction"],["200+","Projects"],["Global","Delivery"]].map(([v,l])=>(
            <div key={l} className="flex flex-col items-center py-2.5">
              <span className="font-mono text-[14px] font-bold text-[#141413]/80">{v}</span>
              <span className="font-mono text-[8px] text-[#141413]/45">{l}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const CARDS = [
  {
    id:"01",
    title:"Artificial Intelligence",
    desc:"Custom AI models, intelligent document processing, and agents wired directly into your workflows — measurable ROI, not demos.",
    href:"/services/ai",
    accentRgb:"251,100,36",
    Visual: AIVisual,
  },
  {
    id:"02",
    title:"Web & App Development",
    desc:"Next.js, React Native, and cloud-native pipelines. From concept to production in weeks with Lighthouse 98+ scores and 99.9% uptime.",
    href:"/services/web",
    accentRgb:"251,100,36",
    Visual: WebVisual,
  },
  {
    id:"03",
    title:"Microsoft 365 Services",
    desc:"SharePoint, Power Platform, Teams, and Azure — the complete Microsoft stack architected and delivered end-to-end for your enterprise.",
    href:"/services/microsoft",
    accentRgb:"251,100,36",
    Visual: MicrosoftVisual,
  },
  {
    id:"04",
    title:"Data & Analytics",
    desc:"Power BI dashboards, Azure Synapse pipelines, and real-time reporting that turns your raw data into decisions that compound.",
    href:"/services/data",
    accentRgb:"251,100,36",
    Visual: DataVisual,
  },
]

type CardDef = typeof CARDS[number]
function CardItem({ card, i }: { card: CardDef; i: number }) {
  const [animKey, setAnimKey] = useState(0)
  const { Visual } = card
  return (
    <motion.div
      className="group relative flex flex-col overflow-hidden border-b border-r border-[#D1CDC7] last:border-b-0 odd:border-r md:last:border-b-0"
      initial={{ opacity:0, y:28 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ duration:0.5, delay: i*0.08, ease:[0.22,1,0.36,1] }}
      onHoverStart={() => setAnimKey(k => k + 1)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
        style={{ background:`radial-gradient(ellipse 70% 45% at 50% 0%, rgba(${card.accentRgb},0.09) 0%, transparent 80%)` }}
      />
      <div className="relative overflow-hidden" style={{ height:240, background:"linear-gradient(135deg, #F3F0EE 0%, #e8e3de 55%, #ddd8d2 100%)" }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 z-20"
          style={{ background:"linear-gradient(to bottom, #F3F0EE, transparent)" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 z-20"
          style={{ background:"linear-gradient(to top, #e8e3de, transparent)" }} />
        <Visual key={animKey} />
      </div>
      <div className="h-px bg-[#D1CDC7] group-hover:bg-[#D1CDC7] transition-colors duration-500 z-20 relative" />
      <div className="relative z-10 flex flex-1 flex-col gap-3.5 bg-[#FCFBFA] p-6 group-hover:bg-[#F3F0EE] transition-colors duration-300">
        <span className="font-mono text-[10px] text-[#696969] tracking-widest">{card.id}</span>
        <h3 className="text-[21px] font-medium text-[#141413] leading-[1.15] tracking-[-0.02em]">{card.title}</h3>
        <p className="text-[13px] text-[#696969] leading-[1.6] max-w-[400px]">{card.desc}</p>
        <a
          href={card.href}
          className="mt-2 inline-flex w-fit items-center gap-2 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          style={{ background:"linear-gradient(135deg, #fb6424 0%, #e04e10 58%, #c03a00 100%)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(251,100,36,0.4)" }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none" }}
        >
          <span>Learn more</span>
          <motion.span className="inline-block"
            animate={{ x:[0,3,0] }}
            transition={{ duration:1.8, repeat:Infinity, ease:"easeInOut", delay: i*0.3 }}
          >→</motion.span>
        </a>
      </div>
    </motion.div>
  )
}

export function LCMirrorOps() {
  const { ref, inView } = useSectionInView()

  return (
    <section className="w-full bg-[#F3F0EE]" id="softree-services-showcase">
      <div className="mx-auto w-full max-w-[1240px] px-4 py-20 md:px-6 lg:py-28">

        <motion.div
          ref={ref}
          className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          initial={{ opacity:0, y:22 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.55, ease:[0.22,1,0.36,1] }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 self-start border border-[#D1CDC7] px-2.5 py-1">
              <div className="size-[5px] bg-[#141413]" />
              <span className="font-mono text-[11px] text-[#696969] tracking-[0.12em] uppercase">What We Build</span>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-medium text-[#141413] leading-[0.95] tracking-[-0.04em] max-w-[480px]">
              Four practices.<br/>One trusted partner.
            </h2>
          </div>
          <p className="max-w-[360px] text-[14px] text-[#696969] leading-[1.65]">
            Every service is delivered end-to-end — architecture, build, test, deploy, and ongoing support. Globally.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-[#D1CDC7]">
          {CARDS.map((card, i) => <CardItem key={card.id} card={card} i={i} />)}
        </div>

      </div>
    </section>
  )
}

export default LCMirrorOps
