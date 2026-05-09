"use client";

import { useEffect, useRef } from "react";
import DottedMap from "dotted-map";

type Pt = { x: number; y: number };

interface HubDef {
  id: string;
  lat: number;
  lng: number;
  label: string;
  isEpicenter?: boolean;
}

const HUBS: HubDef[] = [
  { id: "india",         lat:  20.5937, lng:  78.9629,  label: "India",         isEpicenter: true  },
  { id: "europe",        lat:  51.5072, lng:  -0.1276,  label: "London"                            },
  { id: "east-asia",     lat:  35.6762, lng: 139.6503,  label: "Tokyo"                             },
  { id: "africa",        lat: -26.2041, lng:  28.0473,  label: "Johannesburg"                      },
  { id: "australia",     lat: -33.8688, lng: 151.2093,  label: "Sydney"                            },
  { id: "north-america", lat:  37.7749, lng:-122.4194,  label: "San Francisco"                     },
  { id: "south-america", lat: -23.5505, lng: -46.6333,  label: "São Paulo"                         },
];

// All primary routes radiate from India; two secondary cross-routes added
const ROUTE_PAIRS: [string, string][] = [
  ["india", "europe"],
  ["india", "east-asia"],
  ["india", "africa"],
  ["india", "australia"],
  ["india", "north-america"],
  ["india", "south-america"],
  ["europe", "north-america"],   // secondary cross-route
  ["east-asia", "australia"],    // secondary cross-route
];

// Stagger timing
const STAGGER     = 0.38;  // seconds between each arc starting to draw
const ARC_DRAW_DUR = 1.3;  // seconds for one arc to fully draw

function latLngNorm(lat: number, lng: number): Pt {
  return { x: (lng + 180) / 360, y: (90 - lat) / 180 };
}

function qBez(p0: Pt, cp: Pt, p1: Pt, t: number): Pt {
  const m = 1 - t;
  return {
    x: m * m * p0.x + 2 * m * t * cp.x + t * t * p1.x,
    y: m * m * p0.y + 2 * m * t * cp.y + t * t * p1.y,
  };
}

// Draw arc from t=0 to t=progress using line segments
function strokePartialArc(
  ctx: CanvasRenderingContext2D,
  a: Pt, cp: Pt, b: Pt,
  progress: number,
  steps = 72
) {
  if (progress <= 0) return;
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * progress;
    const p = qBez(a, cp, b, t);
    i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
}

// Rounded rect helper (for browsers that may not support ctx.roundRect)
function fillRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Pre-build dots once at module level (only runs client-side via "use client")
const _dm   = new DottedMap({ height: 90, grid: "diagonal" });
const _raw  = _dm.getPoints();
let _mx = 0, _my = 0;
for (const p of _raw) { if (p.x > _mx) _mx = p.x; if (p.y > _my) _my = p.y; }
const NORM_DOTS = _raw.map(p => ({ x: p.x / _mx, y: p.y / _my }));

export function GlobalNetworkMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef<Pt | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const hubNorm = new Map(HUBS.map(h => [h.id, latLngNorm(h.lat, h.lng)]));

    // Build route state
    const routes = ROUTE_PAIRS.map(([aId, bId], i) => {
      const a = hubNorm.get(aId)!;
      const b = hubNorm.get(bId)!;
      const dist = Math.hypot(b.x - a.x, b.y - a.y);
      const cp: Pt = {
        x: (a.x + b.x) / 2,
        y: Math.min(a.y, b.y) - dist * 0.5,
      };
      return {
        aId, bId, a, b, cp,
        drawProgress: 0,          // 0 → 1 as arc draws
        packetT: i / ROUTE_PAIRS.length, // stagger packet start position
        drawDelay: i * STAGGER,
      };
    });

    let raf = 0, t0 = 0;
    let cssW = 0, cssH = 0, dpr = 1;

    function resize() {
      dpr  = window.devicePixelRatio || 1;
      cssW = canvas!.clientWidth;
      cssH = canvas!.clientHeight;
      canvas!.width  = cssW * dpr;
      canvas!.height = cssH * dpr;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse tracking
    function onMove(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      canvas!.style.cursor = "crosshair";
    }
    function onLeave() { mouseRef.current = null; canvas!.style.cursor = "default"; }
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const sc = (p: Pt): Pt => ({ x: p.x * cssW, y: p.y * cssH });

    function draw(ts: number) {
      if (!t0) t0 = ts;
      const elapsed = (ts - t0) / 1000;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, cssW, cssH);

      const dotR   = Math.max(1.4, cssW / 380);
      const mouse  = mouseRef.current;
      const hoverR = Math.max(14, cssW * 0.048); // hover hit radius

      // ── 1. World map dots ──────────────────────────────────────────────
      for (const pt of NORM_DOTS) {
        const cx = pt.x * cssW;
        const cy = pt.y * cssH;
        const g = ctx!.createRadialGradient(cx - dotR * 0.3, cy - dotR * 0.35, dotR * 0.05, cx, cy, dotR);
        g.addColorStop(0,   "rgba(170,170,180,0.96)");
        g.addColorStop(0.5, "rgba(70,70,82,0.88)");
        g.addColorStop(1,   "rgba(22,22,32,0.36)");
        ctx!.beginPath();
        ctx!.arc(cx, cy, dotR, 0, Math.PI * 2);
        ctx!.fillStyle = g;
        ctx!.fill();
      }

      // ── 2. Arcs — animated draw + packets ─────────────────────────────
      for (const r of routes) {
        const drawElapsed = elapsed - r.drawDelay;
        r.drawProgress = drawElapsed < 0
          ? 0
          : Math.min(drawElapsed / ARC_DRAW_DUR, 1);

        if (r.drawProgress <= 0) continue;

        const a  = sc(r.a);
        const b  = sc(r.b);
        const cp = sc(r.cp);

        // Glow halo arc
        ctx!.strokeStyle = "rgba(255,130,30,0.13)";
        ctx!.lineWidth   = 5;
        strokePartialArc(ctx!, a, cp, b, r.drawProgress);

        // Core arc
        ctx!.strokeStyle = "rgba(255,160,55,0.55)";
        ctx!.lineWidth   = 1;
        strokePartialArc(ctx!, a, cp, b, r.drawProgress);

        // Packets only appear once arc is fully drawn
        if (r.drawProgress < 1) continue;

        r.packetT = (r.packetT + 0.0017) % 1;
        const pk = qBez(a, cp, b, r.packetT);

        const gR = Math.max(6, cssW * 0.016);
        const pg = ctx!.createRadialGradient(pk.x, pk.y, 0, pk.x, pk.y, gR);
        pg.addColorStop(0,   "rgba(255,225,100,1)");
        pg.addColorStop(0.3, "rgba(255,120,0,0.65)");
        pg.addColorStop(1,   "rgba(255,80,0,0)");
        ctx!.beginPath();
        ctx!.arc(pk.x, pk.y, gR, 0, Math.PI * 2);
        ctx!.fillStyle = pg;
        ctx!.fill();

        const pkR = Math.max(2, cssW * 0.003);
        ctx!.beginPath();
        ctx!.arc(pk.x, pk.y, pkR, 0, Math.PI * 2);
        ctx!.fillStyle = "#fffce8";
        ctx!.fill();
      }

      // ── 3. Hub nodes ──────────────────────────────────────────────────
      let hoveredHub: HubDef | null = null;
      let hoveredC:   Pt | null     = null;

      for (const hub of HUBS) {
        const np  = hubNorm.get(hub.id)!;
        const c   = sc(np);
        const epi = hub.isEpicenter === true;
        const pulse = (Math.sin(elapsed * (epi ? 2.6 : 2.2) + np.x * 10) + 1) * 0.5;

        // Hover detection
        if (mouse && Math.hypot(c.x - mouse.x, c.y - mouse.y) < hoverR) {
          hoveredHub = hub;
          hoveredC   = c;
        }

        const baseR = epi ? Math.max(18, cssW * 0.038) : Math.max(12, cssW * 0.026);

        // Outer soft pulse ring
        const outerR = baseR * 1.55 + pulse * Math.max(6, cssW * 0.016);
        ctx!.beginPath();
        ctx!.arc(c.x, c.y, outerR, 0, Math.PI * 2);
        ctx!.strokeStyle = epi
          ? `rgba(255,210,0,${0.1 * (1 - pulse * 0.4)})`
          : `rgba(255,96,0,${0.08 * (1 - pulse * 0.4)})`;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();

        // Inner crisp pulse ring
        const innerR = baseR + pulse * Math.max(4, cssW * 0.01);
        ctx!.beginPath();
        ctx!.arc(c.x, c.y, innerR, 0, Math.PI * 2);
        ctx!.strokeStyle = epi
          ? `rgba(255,220,0,${0.38 * (1 - pulse * 0.3)})`
          : `rgba(255,110,0,${0.32 * (1 - pulse * 0.3)})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();

        // Radial glow disc
        const gd = ctx!.createRadialGradient(c.x, c.y, 0, c.x, c.y, baseR);
        if (epi) {
          gd.addColorStop(0,    "rgba(255,220,0,0.95)");
          gd.addColorStop(0.38, "rgba(255,150,0,0.62)");
          gd.addColorStop(1,    "rgba(255,80,0,0)");
        } else {
          gd.addColorStop(0,    "rgba(255,145,0,0.92)");
          gd.addColorStop(0.4,  "rgba(255,80,0,0.55)");
          gd.addColorStop(1,    "rgba(255,60,0,0)");
        }
        ctx!.beginPath();
        ctx!.arc(c.x, c.y, baseR, 0, Math.PI * 2);
        ctx!.fillStyle = gd;
        ctx!.fill();

        // Hub body sphere
        const bodyR = Math.max(3, epi ? cssW * 0.009 : cssW * 0.007);
        ctx!.beginPath();
        ctx!.arc(c.x, c.y, bodyR, 0, Math.PI * 2);
        ctx!.fillStyle = epi ? "#ffd000" : "#ff8800";
        ctx!.fill();

        // Bright centre
        ctx!.beginPath();
        ctx!.arc(c.x, c.y, Math.max(1.5, cssW * 0.003), 0, Math.PI * 2);
        ctx!.fillStyle = "#ffffff";
        ctx!.fill();
      }

      // ── 4. Hover tooltip ──────────────────────────────────────────────
      if (hoveredHub && hoveredC) {
        const epi      = hoveredHub.isEpicenter === true;
        const text     = hoveredHub.label;
        const fontSize = Math.max(11, cssW * 0.017);
        ctx!.font      = `700 ${fontSize}px Outfit, sans-serif`;

        const tw   = ctx!.measureText(text).width;
        const padX = 10, padY = 5;
        const bw   = tw + padX * 2;
        const bh   = fontSize + padY * 2;
        const bx   = hoveredC.x - bw / 2;
        const by   = hoveredC.y - Math.max(20, cssW * 0.05) - bh - 4;

        // Pill background
        fillRoundRect(ctx!, bx, by, bw, bh, 6);
        ctx!.fillStyle = "rgba(7,7,15,0.92)";
        ctx!.fill();
        fillRoundRect(ctx!, bx, by, bw, bh, 6);
        ctx!.strokeStyle = epi ? "rgba(255,210,0,0.55)" : "rgba(255,96,0,0.45)";
        ctx!.lineWidth   = 1;
        ctx!.stroke();

        // Text
        ctx!.fillStyle    = "#f4f3ff";
        ctx!.textAlign    = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(text, hoveredC.x, by + bh / 2);
        ctx!.textAlign    = "left";
        ctx!.textBaseline = "alphabetic";

        // Dashed connector
        const lineTop    = by + bh;
        const lineBottom = hoveredC.y - Math.max(12, cssW * 0.01);
        if (lineBottom > lineTop) {
          ctx!.beginPath();
          ctx!.moveTo(hoveredC.x, lineTop);
          ctx!.lineTo(hoveredC.x, lineBottom);
          ctx!.strokeStyle = epi ? "rgba(255,210,0,0.28)" : "rgba(255,96,0,0.28)";
          ctx!.lineWidth   = 1;
          ctx!.setLineDash([3, 4]);
          ctx!.stroke();
          ctx!.setLineDash([]);
        }
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", background: "transparent" }}
      aria-label="Global delivery network — epicenter India"
    />
  );
}

export default GlobalNetworkMap;
