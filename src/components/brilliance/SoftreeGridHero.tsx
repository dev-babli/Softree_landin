"use client"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import Link from "next/link"

function useCanvas(draw: (c: CanvasRenderingContext2D, w: number, h: number, t: number) => void) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const ctx = el.getContext("2d"); if (!ctx) return
    let raf = 0, t = 0, w = 0, h = 0
    const ro = new ResizeObserver(() => {
      const dpr = devicePixelRatio || 1
      w = el.offsetWidth; h = el.offsetHeight
      el.width = w * dpr; el.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    })
    ro.observe(el)
    const tick = () => { t++; ctx.clearRect(0, 0, w, h); if (w && h) draw(ctx, w, h, t); raf = requestAnimationFrame(tick) }
    tick()
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [draw])
  return ref
}

// Card 1: Neural network with orange traveling pulses
function drawNeural(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const N = [[.12,.25],[.12,.5],[.12,.75],[.38,.15],[.38,.38],[.38,.62],[.38,.85],[.62,.25],[.62,.5],[.62,.75],[.85,.38],[.85,.62]]
    .map(([x,y])=>({x:x*w,y:y*h}))
  const E = [[0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[2,6],[3,7],[3,8],[4,7],[4,8],[4,9],[5,8],[5,9],[6,9],[7,10],[8,10],[8,11],[9,11]]
  E.forEach(([a,b],i) => {
    const {x:ax,y:ay}=N[a], {x:bx,y:by}=N[b]
    ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by)
    ctx.strokeStyle="rgba(255,107,0,0.12)"; ctx.lineWidth=1; ctx.stroke()
    const p=((t*0.4+i*17)%100)/100
    ctx.beginPath(); ctx.arc(ax+(bx-ax)*p, ay+(by-ay)*p, 2.5, 0, Math.PI*2)
    ctx.fillStyle=`rgba(255,140,0,0.9)`; ctx.fill()
  })
  N.forEach((n,i) => {
    const pulse=(Math.sin(t*0.05+i*0.8)+1)/2
    ctx.beginPath(); ctx.arc(n.x,n.y,3+pulse*1.5,0,Math.PI*2)
    ctx.fillStyle=`rgba(255,107,0,${0.5+pulse*0.4})`; ctx.fill()
    ctx.beginPath(); ctx.arc(n.x,n.y,7+pulse*5,0,Math.PI*2)
    ctx.strokeStyle=`rgba(255,107,0,${0.08*pulse})`; ctx.lineWidth=1; ctx.stroke()
  })
}

// Card 2: Microsoft tiles with orbital particles
function drawMS(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx=w/2, cy=h/2, s=Math.min(w,h)*0.18
  const tiles=[{c:"#f25022",x:cx-s-2,y:cy-s-2},{c:"#7fba00",x:cx+2,y:cy-s-2},{c:"#00a4ef",x:cx-s-2,y:cy+2},{c:"#ffb900",x:cx+2,y:cy+2}]
  tiles.forEach(({c,x,y},i)=>{
    const pulse=(Math.sin(t*0.035+i*Math.PI/2)+1)/2
    ctx.fillStyle=c+(Math.round(40+pulse*60).toString(16).padStart(2,"0"))
    ctx.fillRect(x,y,s,s)
    ctx.strokeStyle=c+"99"; ctx.lineWidth=1; ctx.strokeRect(x,y,s,s)
    for(let p=0;p<4;p++){
      const prog=((t*0.25+i*25+p*25)%100)/100
      const tx=x+s/2, ty=y+s/2
      ctx.beginPath(); ctx.arc(cx+(tx-cx)*prog, cy+(ty-cy)*prog, 1.5, 0, Math.PI*2)
      ctx.fillStyle=c; ctx.fill()
    }
  })
}

// Card 3: Scrolling perspective grid (3D city grid from above)
function drawGrid3D(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const horizon=h*0.35, cols=8, speed=t*0.6
  ctx.strokeStyle="rgba(255,107,0,0.18)"; ctx.lineWidth=1
  for(let c=0;c<=cols;c++){
    const x=w*(c/cols)
    ctx.beginPath(); ctx.moveTo(x,horizon); ctx.lineTo(w/2+(x-w/2)*4,h*1.1); ctx.stroke()
  }
  for(let r=0;r<10;r++){
    const p=(r/10+((speed*0.002)%0.1)*10)%1
    const y=horizon+p*(h*1.1-horizon)
    const xl=w/2-p*w/2*4, xr=w/2+p*w/2*4
    if(xl>xr) return
    const alpha=p*0.4
    ctx.beginPath(); ctx.moveTo(Math.max(0,xl),y); ctx.lineTo(Math.min(w,xr),y)
    ctx.strokeStyle=`rgba(255,107,0,${alpha})`; ctx.stroke()
    if(p>0.7){
      for(let c=0;c<=cols;c++){
        const ix=xl+(xr-xl)*(c/cols)
        const glow=(Math.sin(t*0.04+c*0.9+r*0.5)+1)/2
        ctx.beginPath(); ctx.arc(ix,y,1.5+glow*2,0,Math.PI*2)
        ctx.fillStyle=`rgba(255,140,0,${0.3+glow*0.5})`; ctx.fill()
      }
    }
  }
}

// Card 4: Live animated charts
function drawCharts(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // Area chart
  const pts=40, chartH=h*0.45, chartY=h*0.15
  ctx.beginPath(); ctx.moveTo(0,chartY+chartH)
  for(let i=0;i<=pts;i++){
    const x=w*(i/pts)
    const y=chartY+chartH*0.5-chartH*0.4*Math.sin(i*0.3+t*0.04)-chartH*0.2*Math.sin(i*0.7+t*0.07)
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)
  }
  ctx.lineTo(w,chartY+chartH); ctx.lineTo(0,chartY+chartH); ctx.closePath()
  const grad=ctx.createLinearGradient(0,chartY,0,chartY+chartH)
  grad.addColorStop(0,"rgba(161,196,255,0.25)"); grad.addColorStop(1,"rgba(161,196,255,0)")
  ctx.fillStyle=grad; ctx.fill()
  ctx.beginPath()
  for(let i=0;i<=pts;i++){
    const x=w*(i/pts), y=chartY+chartH*0.5-chartH*0.4*Math.sin(i*0.3+t*0.04)-chartH*0.2*Math.sin(i*0.7+t*0.07)
    i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)
  }
  ctx.strokeStyle="rgba(161,196,255,0.7)"; ctx.lineWidth=1.5; ctx.stroke()
  // Bars
  const bars=7, bw=w*0.06, startX=w*0.08
  for(let i=0;i<bars;i++){
    const bh=(0.18+0.4*Math.abs(Math.sin(t*0.035+i*0.9)))*h*0.3
    ctx.fillStyle=`rgba(161,196,255,${0.15+0.12*Math.sin(t*0.05+i)})`
    ctx.fillRect(startX+i*(bw+w*0.032),h*0.92-bh,bw,bh)
    ctx.fillStyle="rgba(161,196,255,0.5)"; ctx.fillRect(startX+i*(bw+w*0.032),h*0.92-bh,bw,2)
  }
}

const ASCII_SOFTREE = [
  " ___  ___  ___ _____ ____  ___ ___ ",
  "/ __\\/ _ \\| __|_   _||  _ \\| __| __|",
  "\\__ \\| | || _|  | |  | |_) | _|| _| ",
  "|___/\\___/|_|   |_|  |___/ |___|___|",
].join("\n")

const CARDS = [
  { accent:"#FF6B00", tag:"01", label:"AGENTIC AI",     title:"AI Agents &\nAutomation",       desc:"Autonomous agents fine-tuned to your data. GPT-4o, Claude, Gemini — RAG to production.", draw:drawNeural },
  { accent:"#A1C4FF", tag:"02", label:"MICROSOFT 365",  title:"Microsoft Cloud\nEcosystem",     desc:"SharePoint, Power Platform, Azure, Teams & Fabric — deep expertise, not surface integrations.", draw:drawMS },
  { accent:"#FF6B00", tag:"03", label:"WEB SYSTEMS",    title:"Enterprise Web\nApplications",   desc:"Cinematic, high-conversion apps with Next.js and React 19. Built for speed and enterprise scale.", draw:drawGrid3D },
  { accent:"#A1C4FF", tag:"04", label:"DATA ANALYTICS", title:"Data &\nBI Engineering",         desc:"Power BI, Azure Synapse & Fabric turn raw data into live dashboards leaders can act on.", draw:drawCharts },
]

function Card({ c, i }: { c: typeof CARDS[0]; i: number }) {
  const ref = useCanvas(c.draw)
  return (
    <motion.div className={`group relative flex flex-col gap-3 p-5 border-[#2c2c2c] transition-colors duration-300 hover:bg-white/[0.025] overflow-hidden min-h-[180px] ${i%2===0?"border-r":""} ${i<2?"border-b":""}`}
      initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.18+i*0.08}}>
      <canvas ref={ref} className="pointer-events-none absolute inset-0 w-full h-full opacity-40 mix-blend-screen group-hover:opacity-65 transition-opacity duration-700" style={{display:"block"}}/>
      <div className="pointer-events-none absolute top-0 left-0 w-36 h-36 rounded-full blur-[50px] opacity-25 mix-blend-screen"
        style={{background:`radial-gradient(circle,${c.accent} 0%,transparent 70%)`}}/>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{background:`linear-gradient(90deg,transparent 10%,${c.accent} 50%,transparent 90%)`}}/>
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex items-center gap-1.5">
          <div className="size-1.5 rounded-full" style={{background:c.accent}}/>
          <span className="font-mono text-[10px] text-white/35 tracking-widest uppercase">{c.label}</span>
        </div>
        <span className="font-mono text-[10px] text-white/15">{c.tag}</span>
      </div>
      <div className="relative z-10">
        <h3 className="font-mono font-bold text-sm text-white leading-snug whitespace-pre-line mb-1.5">{c.title}</h3>
        <p className="font-mono text-[10px] text-white/28 leading-relaxed">{c.desc}</p>
      </div>
    </motion.div>
  )
}

export function SoftreeGridHero() {
  return (
    <section className="relative w-full bg-[#000000] font-mono" style={{minHeight:"100svh"}}>
      <div className="flex items-center justify-between px-6 md:px-10 h-11 border-b border-[#2c2c2c]">
        <div className="flex items-center gap-2"><div className="size-[5.82px] bg-white"/><span className="text-[11px] text-white/50 tracking-widest uppercase">Softree Technology</span></div>
        <div className="flex items-center gap-2"><div className="size-1.5 rounded-full bg-green-400 animate-pulse"/><span className="text-[10px] text-white/30 hidden sm:block">SYSTEMS OPERATIONAL</span></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#2c2c2c]">
        <div className="flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#2c2c2c] px-6 md:px-12 py-14 md:py-20">
          <motion.div className="flex items-center gap-2 mb-8 self-start border border-[#2c2c2c] px-3 py-1.5" initial={{opacity:0}} animate={{opacity:1}}>
            <div className="size-[5.82px] bg-white"/><span className="text-[11px] text-white tracking-widest uppercase">Enterprise Technology Partner</span>
          </motion.div>
          <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
            <pre className="text-white/85 leading-[1.4] mb-5 overflow-x-auto" style={{fontSize:"clamp(0.4rem,1vw,0.68rem)",whiteSpace:"pre"}}>{ASCII_SOFTREE}</pre>
            <div className="h-px w-full bg-[#2c2c2c] mb-5"/>
            <p className="text-[clamp(0.85rem,1.5vw,1.05rem)] text-white/40 leading-[1.5] max-w-[420px]">
              Where Vision Meets Execution.<br/><span className="text-white/60">Enterprise AI · Microsoft Cloud · Global Delivery.</span>
            </p>
          </motion.div>
          <motion.div className="flex flex-col sm:flex-row gap-3 mt-9" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.25}}>
            <Link href="/contact" className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity" style={{background:"linear-gradient(135deg,#f5b99a 0%,#ff6b35 50%,#ff4500 100%)"}}>
              Start a project <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link href="/services" className="flex items-center justify-center px-6 py-3 text-sm text-white/50 border border-[#2c2c2c] hover:border-white/30 hover:text-white/80 transition-all">Our services</Link>
          </motion.div>
          <motion.div className="flex gap-8 mt-9 pt-7 border-t border-[#2c2c2c]" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}>
            {[["200+","Projects"],["98%","Satisfaction"],["4","Global hubs"]].map(([v,l],i)=>(
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-xl font-black text-white">{v}</span>
                <span className="text-[10px] text-white/25 uppercase tracking-widest">{l}</span>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2">
          {CARDS.map((c,i)=><Card key={i} c={c} i={i}/>)}
        </div>
      </div>
      <div className="hidden lg:flex h-[27px] border-b border-[#2c2c2c]">
        {[191,138,245,109,191,119,181].map((w,i)=><div key={i} className="h-full shrink-0 border-r border-[#2c2c2c]" style={{width:`${w}px`}}/>)}
        <div className="h-full flex-1"/>
      </div>
      <div className="flex items-center gap-6 px-6 md:px-10 h-10">
        <span className="text-[10px] text-white/20 tracking-widest uppercase">Trusted by</span>
        {["NHS","ADNOC","Shell","Tata","HSBC"].map((n,i)=><span key={i} className="text-[11px] text-white/25">{n}</span>)}
      </div>
    </section>
  )
}
