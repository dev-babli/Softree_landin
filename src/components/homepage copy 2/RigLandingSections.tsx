"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// ─── Design tokens ─────────────────────────────────────────────────────────────
const RED = "#ED462D"
const PAPER = "#F0EDE6"
const GREEN = "#22c55e"
const CARD_BG = "rgba(10,10,10,0.95)"
const MONO = "'Chivo Mono', 'Geist Mono', monospace"

// ─── Shared ────────────────────────────────────────────────────────────────────

function SectionDivider() {
  return <div style={{ width: "100%", height: "1px", background: "rgba(240,237,230,0.06)" }} />
}

function Badge({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        fontFamily: MONO,
        fontSize: "0.6rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        border: "1px solid rgba(240,237,230,0.15)",
        padding: "0.35rem 0.7rem",
        color: "rgba(240,237,230,0.55)",
        marginBottom: "1.5rem",
      }}
    >
      {icon}
      {children}
    </div>
  )
}

// ─── Problem Section ──────────────────────────────────────────────────────────

function ProblemSection() {
  return (
    <section className="bg-[#0a0a0a] py-20">
      <div className="container">
        <div style={{ border: "1px solid rgba(240,237,230,0.1)" }}>
          {/* Top: badge + headline */}
          <div style={{ padding: "2.5rem 2.5rem 2rem" }}>
            <Badge
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M 11 11 L 13 11 L 13 13 L 11 13 Z M 15 7 L 17 7 L 17 9 L 15 9 Z M 7 7 L 9 7 L 9 9 L 7 9 Z M 7 15 L 9 15 L 9 17 L 7 17 Z M 15 15 L 17 15 L 17 17 L 15 17 Z M 5 17 L 7 17 L 7 19 L 5 19 Z M 5 5 L 7 5 L 7 7 L 5 7 Z M 9 13 L 11 13 L 11 15 L 9 15 Z M 13 13 L 15 13 L 15 15 L 13 15 Z M 13 9 L 15 9 L 15 11 L 13 11 Z M 9 9 L 11 9 L 11 11 L 9 11 Z M 17 5 L 19 5 L 19 7 L 17 7 Z M 17 17 L 19 17 L 19 19 L 17 19 Z"
                    fill={RED}
                  />
                </svg>
              }
            >
              The problem
            </Badge>
            <h2
              style={{
                fontSize: "clamp(2rem,4vw,3.5rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: PAPER,
                maxWidth: "700px",
              }}
            >
              You don&apos;t own your AI.
              <br />
              And you&apos;re being watched.
            </h2>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(240,237,230,0.08)" }} />

          {/* Grid: eye | 2×2 cards */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "clamp(180px,25%,280px) 1fr 1fr",
              gridTemplateRows: "auto auto",
            }}
          >
            {/* Surveillance eye — spans both rows */}
            <div
              style={{
                gridRow: "1 / 3",
                borderRight: "1px solid rgba(240,237,230,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
              }}
            >
              <SurveillanceEye />
            </div>

            <ProblemCard number="001" label="Data extraction" title="They train on your code.">
              Every prompt. Every file. Every fix.
              <br />
              It flows through infrastructure you don&apos;t control — improving systems they want to use to replace you.
            </ProblemCard>

            <ProblemCard number="002" label="Artificial scarcity" title="They meter your ambition." borderLeft>
              Slowdowns, overages, caps.
              <br />
              Right when you&apos;re deep in a sprint, the meter decides you&apos;ve had enough.
            </ProblemCard>

            <ProblemCard number="003" label="Silent downgrades" title="They change the model." borderTop>
              They silently downgrade to cheaper models during peak load. Full price, degraded experience.
            </ProblemCard>

            <ProblemCard number="004" label="Cloud dependency" title="They control your flow." borderLeft borderTop>
              Every completion makes a round trip across the internet.
              <br />
              Thousands of tiny interruptions, every single day.
            </ProblemCard>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProblemCard({
  number,
  label,
  title,
  children,
  borderLeft,
  borderTop,
}: {
  number: string
  label: string
  title: string
  children: React.ReactNode
  borderLeft?: boolean
  borderTop?: boolean
}) {
  return (
    <div
      style={{
        padding: "2rem",
        borderLeft: borderLeft ? "1px solid rgba(240,237,230,0.06)" : undefined,
        borderTop: borderTop ? "1px solid rgba(240,237,230,0.06)" : undefined,
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(240,237,230,0.3)",
          }}
        >
          {label}
        </span>
        <span style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(240,237,230,0.2)" }}>
          {number}
        </span>
      </div>
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 900,
          lineHeight: 1.2,
          color: PAPER,
          marginBottom: "0.75rem",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "rgba(240,237,230,0.5)" }}>{children}</p>
    </div>
  )
}

function SurveillanceEye() {
  return (
    <svg viewBox="0 0 480 480" fill="none" style={{ width: "100%", maxWidth: "260px" }}>
      <g opacity={0.22}>
        <circle cx={240} cy={240} r={220} stroke={PAPER} strokeWidth={0.5} />
        <circle cx={240} cy={240} r={180} stroke={PAPER} strokeWidth={0.5} />
        <circle cx={240} cy={240} r={140} stroke={PAPER} strokeWidth={0.5} />
        <circle cx={240} cy={240} r={100} stroke={PAPER} strokeWidth={0.5} />
        <circle cx={240} cy={240} r={60} stroke={PAPER} strokeWidth={0.5} />
        <line x1={240} y1={0} x2={240} y2={480} stroke={PAPER} strokeWidth={0.3} />
        <line x1={0} y1={240} x2={480} y2={240} stroke={PAPER} strokeWidth={0.3} />
        <line x1={70} y1={70} x2={410} y2={410} stroke={PAPER} strokeWidth={0.3} />
        <line x1={410} y1={70} x2={70} y2={410} stroke={PAPER} strokeWidth={0.3} />
        {/* Eye outline */}
        <path
          d="M120 240 C120 240 180 170 240 170 C300 170 360 240 360 240 C360 240 300 310 240 310 C180 310 120 240 120 240Z"
          stroke={PAPER}
          strokeWidth={1}
          fill="none"
        />
        <circle cx={240} cy={240} r={35} stroke={PAPER} strokeWidth={1} fill="none" />
        {/* Tick marks */}
        <g stroke={PAPER} strokeWidth={0.4}>
          <line x1={240} y1={20} x2={240} y2={35} />
          <line x1={295} y1={27} x2={289} y2={41} />
          <line x1={343} y1={55} x2={332} y2={66} />
          <line x1={460} y1={240} x2={445} y2={240} />
          <line x1={343} y1={425} x2={332} y2={414} />
          <line x1={295} y1={453} x2={289} y2={439} />
          <line x1={240} y1={460} x2={240} y2={445} />
          <line x1={185} y1={453} x2={191} y2={439} />
          <line x1={137} y1={425} x2={148} y2={414} />
          <line x1={20} y1={240} x2={35} y2={240} />
          <line x1={137} y1={55} x2={148} y2={66} />
          <line x1={185} y1={27} x2={191} y2={41} />
        </g>
        {/* Corner brackets */}
        <g stroke={PAPER} strokeWidth={0.6}>
          <polyline points="40,70 40,40 70,40" fill="none" />
          <polyline points="410,40 440,40 440,70" fill="none" />
          <polyline points="440,410 440,440 410,440" fill="none" />
          <polyline points="70,440 40,440 40,410" fill="none" />
        </g>
        {/* Sight lines */}
        <g stroke={PAPER} strokeWidth={0.25} strokeDasharray="3,6">
          <line x1={240} y1={205} x2={110} y2={90} />
          <line x1={240} y1={205} x2={370} y2={90} />
          <line x1={240} y1={275} x2={110} y2={390} />
          <line x1={240} y1={275} x2={370} y2={390} />
          <line x1={205} y1={240} x2={60} y2={180} />
          <line x1={275} y1={240} x2={420} y2={180} />
          <line x1={205} y1={240} x2={60} y2={300} />
          <line x1={275} y1={240} x2={420} y2={300} />
        </g>
        {/* Sight dots */}
        <g fill={PAPER} opacity={0.5}>
          <circle cx={110} cy={90} r={3} />
          <circle cx={370} cy={90} r={3} />
          <circle cx={110} cy={390} r={3} />
          <circle cx={370} cy={390} r={3} />
          <circle cx={60} cy={180} r={2.5} />
          <circle cx={420} cy={180} r={2.5} />
          <circle cx={60} cy={300} r={2.5} />
          <circle cx={420} cy={300} r={2.5} />
        </g>
        <path d="M240 240 L240 60 A180 180 0 0 1 380 145 Z" fill={PAPER} opacity={0.04} />
        <text x={240} y={478} textAnchor="middle" fill={PAPER} opacity={0.6} fontFamily={MONO} fontSize={5} letterSpacing="0.2em">
          MONITORING ACTIVE
        </text>
        <text
          x={456}
          y={244}
          textAnchor="start"
          fill={PAPER}
          opacity={0.4}
          fontFamily={MONO}
          fontSize={4}
          letterSpacing="0.15em"
          transform="rotate(90, 465, 240)"
        >
          TELEMETRY
        </text>
      </g>
      {/* Pupil — outside low-opacity group */}
      <circle cx={241} cy={256} r={14} fill={RED} />
    </svg>
  )
}

// ─── Introducing Rig Section ──────────────────────────────────────────────────

function IntroRigSection() {
  return (
    <section className="bg-[#0a0a0a] py-20 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(237,70,45,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="container relative">
        <div className="flex flex-col items-center text-center">
          <Badge
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M 14 11 L 16 11 L 16 13 L 14 13 Z M 18 7 L 20 7 L 20 9 L 18 9 Z M 4 13 L 6 13 L 6 15 L 4 15 Z M 10 15 L 12 15 L 12 17 L 10 17 Z M 8 17 L 10 17 L 10 19 L 8 19 Z M 12 13 L 14 13 L 14 15 L 12 15 Z M 16 9 L 18 9 L 18 11 L 16 11 Z M 6 15 L 8 15 L 8 17 L 6 17 Z"
                  fill={RED}
                />
              </svg>
            }
          >
            Introducing Rig
          </Badge>

          <h2
            style={{
              fontSize: "clamp(2rem,4vw,3.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: PAPER,
              marginBottom: "1rem",
            }}
          >
            Everything local.
            <br />
            Own your AI.
          </h2>
          <p style={{ fontSize: "1.0625rem", color: "rgba(240,237,230,0.55)", maxWidth: "480px", lineHeight: 1.6 }}>
            A complete AI coding agent running entirely on your own hardware. No usage limits. No cloud dependency.
          </p>

          {/* Animated flow diagram */}
          <div className="mt-12 w-full max-w-[600px]">
            <IntroDiagramSVG />
          </div>
        </div>
      </div>
    </section>
  )
}

function IntroDiagramSVG() {
  return (
    <svg viewBox="0 0 560 280" fill="none" style={{ width: "100%" }}>
      <defs>
        <linearGradient id="rig-trail-h1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={GREEN} stopOpacity={0} />
          <stop offset="70%" stopColor={GREEN} stopOpacity={0.3} />
          <stop offset="100%" stopColor={GREEN} stopOpacity={0.6} />
        </linearGradient>
        <linearGradient id="rig-trail-h2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={GREEN} stopOpacity={0} />
          <stop offset="70%" stopColor={GREEN} stopOpacity={0.3} />
          <stop offset="100%" stopColor={GREEN} stopOpacity={0.6} />
        </linearGradient>
        <path id="rig-path-code-rig" d="M130,125 L193,125" />
        <path id="rig-path-rig-resp" d="M353,125 L423,125" />
        <path id="rig-path-cloud-down" d="M273,37 L273,57" />
        <path id="rig-path-rig-telem" d="M273,172 L273,192" />
      </defs>

      {/* Machine boundary */}
      <rect x={5} y={68} width={550} height={112} fill="none" stroke="rgba(240,237,230,0.08)" strokeWidth={1} strokeDasharray="4 4" />
      <rect x={15} y={61} width={96} height={14} fill="#0a0a0a" />
      <text x={20} y={71} fontFamily={MONO} fontSize={6} letterSpacing={2} fill="rgba(240,237,230,0.3)">
        YOUR MACHINE
      </text>

      {/* YOUR CODE box */}
      <rect x={20} y={100} width={110} height={50} fill={CARD_BG} stroke="rgba(240,237,230,0.15)" strokeWidth={1} />
      <text x={75} y={121} textAnchor="middle" dominantBaseline="central" fontFamily={MONO} fontSize={7} letterSpacing={1.5} fill="rgba(240,237,230,0.4)">
        YOUR CODE
      </text>
      <text x={75} y={133} textAnchor="middle" dominantBaseline="central" fontFamily={MONO} fontSize={5.5} letterSpacing={1} fill="rgba(240,237,230,0.25)">
        KEYSTROKES · FILES
      </text>

      {/* Connector: Code → RIG */}
      <line x1={130} y1={125} x2={193} y2={125} stroke="rgba(34,197,94,0.15)" strokeWidth={1} />
      <rect x={-1.5} y={-1.5} width={3} height={3} fill={GREEN}>
        <animateMotion dur="2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
          <mpath href="#rig-path-code-rig" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="2s" repeatCount="indefinite" />
      </rect>
      <line x1={130} y1={125} x2={193} y2={125} stroke="url(#rig-trail-h1)" strokeWidth={2}>
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
      </line>

      {/* RIG core */}
      <rect x={193} y={78} width={160} height={94} fill={CARD_BG} stroke="rgba(240,237,230,0.2)" strokeWidth={1.5} />
      <text x={274.5} y={108} textAnchor="middle" dominantBaseline="central" fontFamily={MONO} fontSize={12} letterSpacing={3} fill={PAPER}>
        RIG
      </text>
      <text x={273} y={124} textAnchor="middle" dominantBaseline="central" fontFamily={MONO} fontSize={5.5} letterSpacing={1.5} fill={GREEN}>
        ✓ LOCAL INFERENCE
      </text>
      <line x1={210} y1={145} x2={336} y2={145} stroke="rgba(240,237,230,0.08)" strokeWidth={0.5} />
      <text x={238} y={160} textAnchor="middle" fontFamily={MONO} fontSize={5} letterSpacing={1} fill="rgba(240,237,230,0.25)">GPU</text>
      <text x={273} y={160} textAnchor="middle" fontFamily={MONO} fontSize={5} letterSpacing={1} fill="rgba(240,237,230,0.25)">INDEX</text>
      <text x={308} y={160} textAnchor="middle" fontFamily={MONO} fontSize={5} letterSpacing={1} fill="rgba(240,237,230,0.25)">MODEL</text>

      {/* Connector: RIG → Response */}
      <line x1={353} y1={125} x2={423} y2={125} stroke="rgba(34,197,94,0.15)" strokeWidth={1} />
      <rect x={-1.5} y={-1.5} width={3} height={3} fill={GREEN}>
        <animateMotion dur="2s" begin="1s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
          <mpath href="#rig-path-rig-resp" />
        </animateMotion>
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="2s" begin="1s" repeatCount="indefinite" />
      </rect>
      <line x1={353} y1={125} x2={423} y2={125} stroke="url(#rig-trail-h2)" strokeWidth={2}>
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" begin="1s" repeatCount="indefinite" />
      </line>

      {/* RESPONSE box */}
      <rect x={423} y={100} width={120} height={50} fill={CARD_BG} stroke="rgba(240,237,230,0.15)" strokeWidth={1} />
      <text x={483} y={121} textAnchor="middle" dominantBaseline="central" fontFamily={MONO} fontSize={7} letterSpacing={1.5} fill="rgba(240,237,230,0.4)">
        RESPONSE
      </text>
      <text x={483} y={133} textAnchor="middle" dominantBaseline="central" fontFamily={MONO} fontSize={5.5} letterSpacing={1} fill={GREEN}>
        &lt;300ms · ON DEVICE
      </text>

      {/* CLOUD — blocked from top */}
      <rect x={213} y={5} width={120} height={32} fill={CARD_BG} stroke="rgba(240,237,230,0.1)" strokeWidth={1} />
      <text x={273} y={21} textAnchor="middle" dominantBaseline="central" fontFamily={MONO} fontSize={7} letterSpacing={1.5} fill="rgba(240,237,230,0.4)">
        CLOUD
      </text>
      <line x1={273} y1={37} x2={273} y2={78} stroke={RED} strokeWidth={0.5} strokeDasharray="3 5" opacity={0.4} />
      <rect x={-1.5} y={-1.5} width={3} height={3} fill={RED}>
        <animateMotion dur="1.5s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
          <mpath href="#rig-path-cloud-down" />
        </animateMotion>
        <animate attributeName="opacity" values="0.8;0.8;0" keyTimes="0;0.6;1" dur="1.5s" repeatCount="indefinite" />
      </rect>
      <line x1={267} y1={51} x2={279} y2={63} stroke={RED} strokeWidth={1.5} />
      <line x1={279} y1={51} x2={267} y2={63} stroke={RED} strokeWidth={1.5} />

      {/* TELEMETRY — blocked from bottom */}
      <rect x={213} y={215} width={120} height={32} fill={CARD_BG} stroke="rgba(240,237,230,0.1)" strokeWidth={1} />
      <text x={273} y={231} textAnchor="middle" dominantBaseline="central" fontFamily={MONO} fontSize={7} letterSpacing={1.5} fill="rgba(240,237,230,0.4)">
        TELEMETRY
      </text>
      <line x1={273} y1={172} x2={273} y2={215} stroke={RED} strokeWidth={0.5} strokeDasharray="3 5" opacity={0.4} />
      <rect x={-1.5} y={-1.5} width={3} height={3} fill={RED}>
        <animateMotion dur="1.5s" begin="0.75s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
          <mpath href="#rig-path-rig-telem" />
        </animateMotion>
        <animate attributeName="opacity" values="0.8;0.8;0" keyTimes="0;0.6;1" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
      </rect>
      <line x1={267} y1={187} x2={279} y2={199} stroke={RED} strokeWidth={1.5} />
      <line x1={279} y1={187} x2={267} y2={199} stroke={RED} strokeWidth={1.5} />
    </svg>
  )
}

// ─── Offline Section ──────────────────────────────────────────────────────────

function SeveredConnector() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.25rem 0" }}>
      <svg width={2} height={16} viewBox="0 0 2 16">
        <line x1={1} y1={0} x2={1} y2={16} stroke={RED} strokeWidth={1} strokeDasharray="2 3" />
      </svg>
      <svg width={16} height={16} viewBox="0 0 16 16" style={{ margin: "2px 0" }}>
        <line x1={3} y1={3} x2={13} y2={13} stroke={RED} strokeWidth={1} />
        <line x1={13} y1={3} x2={3} y2={13} stroke={RED} strokeWidth={1} />
      </svg>
      <div
        style={{
          fontFamily: MONO,
          fontSize: "0.5rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: RED,
          margin: "2px 0",
        }}
      >
        Severed
      </div>
      <svg width={2} height={16} viewBox="0 0 2 16">
        <line x1={1} y1={0} x2={1} y2={16} stroke={RED} strokeWidth={1} strokeDasharray="2 3" />
      </svg>
    </div>
  )
}

function OfflineSection() {
  return (
    <section className="bg-[#0a0a0a]">
      <div className="container">
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ minHeight: "560px" }}
        >
          {/* Visual side */}
          <div style={{ position: "relative", overflow: "hidden", minHeight: "560px" }}>
            {/* Globe */}
            <svg
              viewBox="0 0 320 320"
              fill="none"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "120%",
                maxWidth: "500px",
                opacity: 0.5,
                pointerEvents: "none",
              }}
            >
              <circle cx={160} cy={160} r={140} stroke="rgba(240,237,230,0.1)" strokeWidth={0.8} fill="none" />
              <circle cx={160} cy={160} r={140} stroke="rgba(240,237,230,0.025)" strokeWidth={40} fill="none" />
              <ellipse cx={160} cy={80} rx={110} ry={10} stroke="rgba(240,237,230,0.06)" strokeWidth={0.5} fill="none" />
              <ellipse cx={160} cy={115} rx={130} ry={10} stroke="rgba(240,237,230,0.07)" strokeWidth={0.5} fill="none" />
              <ellipse cx={160} cy={145} rx={138} ry={10} stroke="rgba(240,237,230,0.07)" strokeWidth={0.5} fill="none" />
              <ellipse cx={160} cy={175} rx={138} ry={10} stroke="rgba(240,237,230,0.07)" strokeWidth={0.5} fill="none" />
              <ellipse cx={160} cy={205} rx={130} ry={10} stroke="rgba(240,237,230,0.07)" strokeWidth={0.5} fill="none" />
              <ellipse cx={160} cy={240} rx={110} ry={10} stroke="rgba(240,237,230,0.06)" strokeWidth={0.5} fill="none" />
              <path d="M160 20 Q100 80 95 160 Q100 240 160 300" stroke="rgba(240,237,230,0.1)" strokeWidth={0.8} fill="none" strokeDasharray="6 5" />
              <path d="M160 20 Q60 90 50 160 Q60 230 160 300" stroke="rgba(240,237,230,0.06)" strokeWidth={0.5} fill="none" strokeDasharray="4 6" />
              <path d="M160 20 Q130 80 128 160 Q130 240 160 300" stroke="rgba(240,237,230,0.06)" strokeWidth={0.5} fill="none" strokeDasharray="4 6" />
              <path d="M160 20 Q220 80 225 160 Q220 240 160 300" stroke="rgba(240,237,230,0.1)" strokeWidth={0.8} fill="none" strokeDasharray="6 5" />
              <path d="M160 20 Q260 90 270 160 Q260 230 160 300" stroke="rgba(240,237,230,0.06)" strokeWidth={0.5} fill="none" strokeDasharray="4 6" />
              <path d="M160 20 Q190 80 192 160 Q190 240 160 300" stroke="rgba(240,237,230,0.06)" strokeWidth={0.5} fill="none" strokeDasharray="4 6" />
              <line x1={160} y1={20} x2={160} y2={145} stroke="rgba(240,237,230,0.08)" strokeWidth={0.8} strokeDasharray="4 4" />
              <line x1={160} y1={175} x2={160} y2={300} stroke="rgba(240,237,230,0.08)" strokeWidth={0.8} strokeDasharray="4 4" />
              {/* Wifi-off icon */}
              <g transform="translate(148,148) scale(0.75)">
                <g fill="none" stroke={RED} strokeWidth={4} strokeLinecap="round">
                  <path d="M2 2L22 22" />
                  <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                  <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                  <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
                  <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <circle cx={12} cy={20} r={0.5} fill={RED} />
                </g>
              </g>
            </svg>

            {/* Vertical flow diagram overlay */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(240,237,230,0.4)",
                  padding: "0.75rem 1.5rem",
                  background: CARD_BG,
                  border: "1px solid rgba(240,237,230,0.1)",
                }}
              >
                Cloud servers
              </div>
              <SeveredConnector />
              <div
                style={{
                  fontFamily: MONO,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  padding: "1.25rem 2rem",
                  background: CARD_BG,
                  border: "1px solid rgba(240,237,230,0.2)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "0.8rem", color: PAPER, marginBottom: "0.4rem" }}>Your machine</div>
                <div
                  style={{
                    fontSize: "0.55rem",
                    color: GREEN,
                    opacity: 0.8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.3rem",
                  }}
                >
                  <span>✓</span> Rig model active
                </div>
              </div>
              <SeveredConnector />
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(240,237,230,0.4)",
                  padding: "0.75rem 1.5rem",
                  background: CARD_BG,
                  border: "1px solid rgba(240,237,230,0.1)",
                }}
              >
                Nothing leaves
              </div>
            </div>
          </div>

          {/* Content side */}
          <div
            className="flex flex-col justify-center"
            style={{ padding: "5rem 2rem 5rem clamp(2rem,5vw,4rem)" }}
          >
            <Badge
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M 5 4 L 19 4 L 19 6 L 5 6 Z M 19 15 L 19 6 L 21 6 L 21 17 L 3 17 L 3 6 L 5 6 L 5 15 Z M 3 18 L 21 18 L 21 20 L 3 20 Z" fill={RED} />
                </svg>
              }
            >
              Offline
            </Badge>
            <h2
              style={{
                fontSize: "clamp(1.8rem,3vw,3rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: PAPER,
                marginBottom: "1rem",
              }}
            >
              Work offline
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(240,237,230,0.55)", lineHeight: 1.6, maxWidth: "360px" }}>
              Flights. Spotty Wi-Fi. Network outages. Nothing stops your flow.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Three Column Section ─────────────────────────────────────────────────────

function ThreeColSection() {
  return (
    <section className="bg-[#0a0a0a] py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr_1px_1fr]">
          <ThreeColCell
            badgeIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M 22 11 L 22 13 L 20 13 L 20 15 L 18 15 L 18 9 L 20 9 L 20 11 Z M 6 10 L 8 10 L 8 14 L 6 14 Z M 9 10 L 11 10 L 11 14 L 9 14 Z M 12 10 L 14 10 L 14 14 L 12 14 Z M 15 10 L 17 10 L 17 14 L 15 14 Z M 18 7 L 18 9 L 5 9 L 5 15 L 18 15 L 18 17 L 3 17 L 3 7 Z" fill={RED} />
              </svg>
            }
            badgeLabel="Unlimited"
            heading="Remove the meter"
            text="Refactor the whole codebase. Riff on an idea all day. Run agent loops without thinking about cost."
          />
          <div className="hidden md:block" style={{ background: "rgba(240,237,230,0.08)" }} />
          <ThreeColCell
            badgeIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M 10 4 L 14 4 L 14 6 L 10 6 Z M 11 13 L 13 13 L 13 17 L 11 17 Z M 6 10 L 8 10 L 8 6 L 10 6 L 10 10 L 14 10 L 14 6 L 16 6 L 16 10 L 18 10 L 18 12 L 6 12 Z M 6 18 L 18 18 L 18 20 L 6 20 Z M 18 12 L 20 12 L 20 18 L 18 18 Z M 4 12 L 6 12 L 6 18 L 4 18 Z" fill={RED} />
              </svg>
            }
            badgeLabel="Privacy"
            heading="Sever the connection"
            text="Your code, keystrokes, and files never leave your machine. Not anonymized. Not aggregated. Not sent."
          />
          <div className="hidden md:block" style={{ background: "rgba(240,237,230,0.08)" }} />
          <ThreeColCell
            badgeIcon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M 8 4 L 11 4 L 11 3 L 9 3 L 9 1 L 15 1 L 15 3 L 13 3 L 13 4 L 16 4 L 16 6 L 8 6 Z M 8 18 L 16 18 L 16 20 L 8 20 Z M 16 6 L 18 6 L 18 8 L 16 8 Z M 18 8 L 20 8 L 20 16 L 18 16 Z M 4 8 L 6 8 L 6 16 L 4 16 Z M 6 6 L 8 6 L 8 8 L 6 8 Z M 11 8 L 13 8 L 13 11 L 16 11 L 16 13 L 11 13 Z M 6 16 L 8 16 L 8 18 L 6 18 Z M 16 16 L 18 16 L 18 18 L 16 18 Z" fill={RED} />
              </svg>
            }
            badgeLabel="Latency"
            heading="Stop waiting"
            text="No round-trip to a data center. Inference happens on your machine, in single-digit milliseconds."
          />
        </div>
      </div>
    </section>
  )
}

function ThreeColCell({
  badgeIcon,
  badgeLabel,
  heading,
  text,
}: {
  badgeIcon: React.ReactNode
  badgeLabel: string
  heading: string
  text: string
}) {
  return (
    <div style={{ padding: "3rem 2.5rem" }}>
      <Badge icon={badgeIcon}>{badgeLabel}</Badge>
      <h3
        style={{
          fontSize: "1.4rem",
          fontWeight: 900,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: PAPER,
          marginBottom: "0.75rem",
        }}
      >
        {heading}
      </h3>
      <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "rgba(240,237,230,0.5)" }}>{text}</p>
    </div>
  )
}

// ─── How It Works Section ─────────────────────────────────────────────────────

const STEP_DURATION_MS = 6000

const HOW_STEPS = [
  {
    id: 1,
    num: "Step 01",
    title: "A focused model, trained specifically for coding.",
    body: [
      "Every parameter in the model is dedicated to coding, planning, tool use, and structured edits. The entire training process is focused on engineering work.",
      "By narrowing the domain, we concentrate intelligence where it matters — deeper reasoning, better code, sharper tool use.",
    ],
  },
  {
    id: 2,
    num: "Step 02",
    title: "Full intelligence, compressed to fit your machine.",
    body: [
      "The model is compressed to run efficiently on consumer machines — carefully preserving the reasoning patterns that matter most.",
      "The result is an 8 GB model that fits comfortably in memory on a MacBook. Full reasoning. Local execution. Zero cost per token.",
    ],
  },
  {
    id: 3,
    num: "Step 03",
    title: "A custom runtime, engineered for Apple Silicon.",
    body: [
      "The model runs through a custom inference engine optimized specifically for Apple Silicon. Model, context engine, and tools are designed as a single coordinated system.",
      "That tight integration is what makes local execution fast, reliable, and practical.",
    ],
  },
]

type StepId = 1 | 2 | 3

const HOW_CARD: Record<StepId, { title: string; lines: React.ReactNode }> = {
  1: {
    title: "Training Focus",
    lines: (
      <>
        <span style={{ color: "rgba(240,237,230,0.35)" }}>Parameters dedicated to code</span>
        <br />
        <br />
        <span style={{ color: PAPER }}>Rig</span>
        {"           "}
        <span style={{ color: GREEN }}>████████████████████</span>
        {"  "}
        <span style={{ color: GREEN }}>100%</span>
        <br />
        <span style={{ color: "rgba(240,237,230,0.25)" }}>Most AI models</span>
        {"  "}
        <span style={{ color: "rgba(240,237,230,0.2)" }}>████░░░░░░░░░░░░░░░░</span>
        {"  "}
        <span style={{ color: "rgba(240,237,230,0.2)" }}>~15–20%</span>
        <br />
        <br />
        <span style={{ color: "rgba(240,237,230,0.25)" }}>General-purpose models spread capacity</span>
        <br />
        <span style={{ color: "rgba(240,237,230,0.25)" }}>across chat, translation, creative writing.</span>
        <br />
        <br />
        <span style={{ color: PAPER }}>Rig dedicates every parameter to engineering.</span>
      </>
    ),
  },
  2: {
    title: "Model Size",
    lines: (
      <>
        <span style={{ color: "rgba(240,237,230,0.35)" }}>Model size (memory required)</span>
        <br />
        <br />
        <span style={{ color: "rgba(240,237,230,0.25)" }}>Cloud models</span>
        {"  "}
        <span style={{ color: "rgba(240,237,230,0.2)" }}>████████████████████</span>
        {"  "}
        <span style={{ color: "rgba(240,237,230,0.2)" }}>200+ GB</span>
        <br />
        <span style={{ color: "rgba(240,237,230,0.25)" }}>Open source</span>
        {"   "}
        <span style={{ color: "rgba(240,237,230,0.2)" }}>██████░░░░░░░░░░░░░░</span>
        {"  "}
        <span style={{ color: "rgba(240,237,230,0.2)" }}>28–140 GB</span>
        <br />
        <span style={{ color: PAPER }}>Rig</span>
        {"          "}
        <span style={{ color: GREEN }}>▎</span>
        <span style={{ color: "rgba(240,237,230,0.2)" }}>░░░░░░░░░░░░░░░░░░░</span>
        {"  "}
        <span style={{ color: GREEN }}>8 GB</span>
        <br />
        <br />
        <span style={{ color: "rgba(240,237,230,0.25)" }}>Fits in 16 GB unified memory. Accuracy loss: </span>
        <span style={{ color: GREEN }}>&lt;0.3%</span>
      </>
    ),
  },
  3: {
    title: "Latency",
    lines: (
      <>
        <span style={{ color: "rgba(240,237,230,0.35)" }}>First token latency</span>
        <br />
        <br />
        <span style={{ color: PAPER }}>Rig</span>
        {"          "}
        <span style={{ color: GREEN }}>▎</span>
        <span style={{ color: "rgba(240,237,230,0.2)" }}>░░░░░░░░░░░░░░░░░░░</span>
        {"  "}
        <span style={{ color: GREEN }}>300 ms</span>
        <br />
        <span style={{ color: "rgba(240,237,230,0.25)" }}>Cloud APIs</span>
        {"   "}
        <span style={{ color: "rgba(240,237,230,0.2)" }}>████████████████████</span>
        {"  "}
        <span style={{ color: "rgba(240,237,230,0.2)" }}>400–1,000 ms</span>
        <br />
        <br />
        <span style={{ color: "rgba(240,237,230,0.35)" }}>Cost per 1K tokens</span>
        <br />
        <br />
        <span style={{ color: PAPER }}>Rig</span>
        {"                                 "}
        <span style={{ color: GREEN }}>$0.00</span>
        <br />
        <span style={{ color: "rgba(240,237,230,0.25)" }}>Cloud APIs</span>
        {"   "}
        <span style={{ color: "rgba(240,237,230,0.2)" }}>████████████████████</span>
        {"  "}
        <span style={{ color: "rgba(240,237,230,0.2)" }}>$0.01–0.06</span>
      </>
    ),
  },
}

function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<StepId>(1)
  const [progressKey, setProgressKey] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = useCallback(() => {
    setActiveStep((s) => ((s === 3 ? 1 : s + 1) as StepId))
    setProgressKey((k) => k + 1)
  }, [])

  useEffect(() => {
    timerRef.current = setTimeout(advance, STEP_DURATION_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeStep, advance])

  const handleStepClick = (step: StepId) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setActiveStep(step)
    setProgressKey((k) => k + 1)
  }

  return (
    <section className="bg-[#0a0a0a] py-20">
      <div className="container">
        {/* Intro */}
        <div style={{ marginBottom: "3.5rem" }}>
          <Badge
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M 10 4 L 16 4 L 16 6 L 10 6 Z M 10 16 L 16 16 L 16 18 L 10 18 Z M 16 6 L 18 6 L 18 8 L 16 8 Z M 18 8 L 20 8 L 20 14 L 18 14 Z M 6 8 L 8 8 L 8 14 L 6 14 Z M 8 6 L 10 6 L 10 8 L 8 8 Z M 8 14 L 10 14 L 10 16 L 8 16 Z M 6 16 L 8 16 L 8 18 L 6 18 Z M 4 18 L 6 18 L 6 20 L 4 20 Z M 16 14 L 18 14 L 18 16 L 16 16 Z" fill={RED} />
              </svg>
            }
          >
            Our Approach
          </Badge>
          <h2
            style={{
              fontSize: "clamp(1.8rem,3vw,3rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: PAPER,
              marginBottom: "0.75rem",
            }}
          >
            Purpose beats scale.
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(240,237,230,0.5)", maxWidth: "480px", lineHeight: 1.6 }}>
            Rig is a closed system — model, context, tools, and inference — engineered together for one job: real coding work.
          </p>
        </div>

        {/* Stepper layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Steps */}
          <div>
            {HOW_STEPS.map((step) => {
              const isActive = activeStep === step.id
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id as StepId)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "1.5rem 0",
                    borderBottom: "1px solid rgba(240,237,230,0.06)",
                    position: "relative",
                  }}
                >
                  {/* Progress track */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "rgba(240,237,230,0.06)",
                    }}
                  >
                    {isActive && (
                      <div
                        key={progressKey}
                        style={{
                          height: "100%",
                          background: RED,
                          transformOrigin: "left center",
                          animation: `howStepFill ${STEP_DURATION_MS}ms linear forwards`,
                        }}
                      />
                    )}
                  </div>

                  <span
                    style={{
                      display: "block",
                      fontFamily: MONO,
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: isActive ? RED : "rgba(240,237,230,0.25)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {step.num}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                      color: isActive ? PAPER : "rgba(240,237,230,0.45)",
                    }}
                  >
                    {step.title}
                  </h3>

                  {isActive && (
                    <div style={{ marginTop: "1rem" }}>
                      {step.body.map((para, i) => (
                        <p
                          key={i}
                          style={{
                            fontSize: "0.875rem",
                            lineHeight: 1.65,
                            color: "rgba(240,237,230,0.5)",
                            marginBottom: i < step.body.length - 1 ? "0.75rem" : 0,
                          }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Illustration panel */}
          <div
            style={{
              position: "relative",
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(237,70,45,0.07) 0%, rgba(10,10,10,1) 70%)",
              border: "1px solid rgba(240,237,230,0.08)",
              minHeight: "380px",
              padding: "1.75rem 2rem",
              overflow: "hidden",
            }}
          >
            {/* Ambient grid texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(240,237,230,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,230,0.025) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(240,237,230,0.3)",
                  marginBottom: "1.25rem",
                }}
              >
                {HOW_CARD[activeStep].title}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: "0.72rem",
                  lineHeight: 1.9,
                  color: "rgba(240,237,230,0.35)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {HOW_CARD[activeStep].lines}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function RigLandingSections() {
  return (
    <div style={{ background: "#0a0a0a", color: PAPER }}>
      <div style={{ paddingBottom: "4rem" }}>
        <SectionDivider />
      </div>
      <ProblemSection />
      <SectionDivider />
      <IntroRigSection />
      <SectionDivider />
      <OfflineSection />
      <SectionDivider />
      <ThreeColSection />
      <SectionDivider />
      <SectionDivider />
      <HowItWorksSection />
    </div>
  )
}
