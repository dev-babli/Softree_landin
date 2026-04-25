"use client"

import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Blocks,
  Bot,
  BookOpenText,
  Building2,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Factory,
  Gauge,
  Globe2,
  HeartPulse,
  HelpCircle,
  Landmark,
  Layers3,
  LockKeyhole,
  Network,
  Phone,
  ShoppingCart,
  ServerCog,
  Share2,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react"

const trustSignals = [
  { value: "200+", count: "200", suffix: "+", label: "Projects Shipped", note: "Current site proof signal" },
  { value: "98%", count: "98", suffix: "%", label: "Satisfaction", note: "Delivery confidence marker" },
  { value: "4", count: "4", suffix: "", label: "Global Hubs", note: "Distributed delivery coverage" },
  { value: "24/7", count: "24", suffix: "/7", label: "Support Ready", note: "Post-launch continuity" },
]

const painPoints = [
  {
    title: "Legacy Systems",
    body: "Critical operations sit on aging tools, brittle spreadsheets, and undocumented workflows.",
    icon: ServerCog,
  },
  {
    title: "Disconnected Teams",
    body: "SharePoint, Teams, CRMs, ERP exports, and custom apps do not speak the same operational language.",
    icon: Network,
  },
  {
    title: "Manual Workflows",
    body: "Approvals, reporting, handoffs, and support loops still depend on email chasing.",
    icon: Workflow,
  },
  {
    title: "Low Data Visibility",
    body: "Leaders make decisions from late reports instead of live Power BI and operational signals.",
    icon: BarChart3,
  },
]

const services = [
  {
    title: "Microsoft 365",
    body: "Modern collaboration, governance, Teams enablement, and enterprise workspace rollouts.",
    icon: Blocks,
    accent: "from-cyan-300/24 to-blue-500/12",
  },
  {
    title: "SharePoint",
    body: "Intranets, document systems, portals, SPFx components, metadata, and permission models.",
    icon: Share2,
    accent: "from-sky-300/24 to-cyan-500/12",
  },
  {
    title: "Power Platform",
    body: "Power Apps, Power Automate, Dataverse, approvals, forms, and process automation.",
    icon: Zap,
    accent: "from-violet-300/24 to-fuchsia-500/12",
  },
  {
    title: "Dynamics 365",
    body: "CRM customization, workflow integration, reporting, and business application alignment.",
    icon: Layers3,
    accent: "from-blue-300/24 to-indigo-500/12",
  },
  {
    title: "Power BI",
    body: "Executive dashboards, semantic models, governance, embedded analytics, and KPI systems.",
    icon: BarChart3,
    accent: "from-amber-200/24 to-cyan-500/10",
  },
  {
    title: "Azure & Cloud",
    body: "Secure cloud foundations, APIs, identity, integrations, DevOps, and scalable hosting.",
    icon: Cloud,
    accent: "from-cyan-300/22 to-emerald-400/10",
  },
  {
    title: "Web Applications",
    body: "Next.js, React, portals, dashboards, partner platforms, and custom enterprise software.",
    icon: Code2,
    accent: "from-white/22 to-cyan-400/10",
  },
  {
    title: "Mobile Applications",
    body: "Field apps, mobile workflows, role-based interfaces, and cross-platform delivery.",
    icon: Phone,
    accent: "from-fuchsia-200/20 to-blue-400/10",
  },
  {
    title: "AI, APIs & Automation",
    body: "Agentic workflows, RAG patterns, analytics automation, API orchestration, and AI-assisted operations.",
    icon: Bot,
    accent: "from-cyan-200/24 to-purple-500/14",
  },
]

const storySteps = [
  {
    eyebrow: "01 / Audit",
    title: "Map the scattered stack",
    body: "We identify systems, owners, data movement, manual loops, and the business risk hiding in daily workarounds.",
  },
  {
    eyebrow: "02 / Modernize",
    title: "Stabilize the Microsoft cloud layer",
    body: "SharePoint, Teams, Microsoft 365, Azure, and security foundations become the operating base.",
  },
  {
    eyebrow: "03 / Build",
    title: "Create the application layer",
    body: "We ship portals, apps, dashboards, integrations, Power Apps, and APIs that match real user workflows.",
  },
  {
    eyebrow: "04 / Automate",
    title: "Remove handoff drag",
    body: "Approvals, alerts, document routing, reporting, and AI-assisted tasks move through traceable automation.",
  },
  {
    eyebrow: "05 / Optimize",
    title: "Operate with live intelligence",
    body: "Power BI, governance, support, and iteration loops keep the system measurable after launch.",
  },
]

const proofCards = [
  {
    quote: "The strongest proof is operational clarity: stakeholders know what is being built, why it matters, and how it will be supported.",
    role: "Enterprise Operations Lead",
  },
  {
    quote: "Softree's positioning should reduce risk for the buyer: Microsoft depth, app engineering, automation, and analytics in one delivery partner.",
    role: "Digital Transformation Sponsor",
  },
  {
    quote: "For technical buyers, the message needs to show architecture confidence without losing the business outcome. This clone is built around that balance.",
    role: "Technology Decision Maker",
  },
]

const process = [
  ["Discover", "Stakeholders, systems, risks, scope, success metrics."],
  ["Design", "UX flows, architecture, governance, data movement."],
  ["Build", "Apps, automation, portals, dashboards, and integrations."],
  ["Integrate", "Microsoft 365, Azure, APIs, identity, and data sources."],
  ["Optimize", "Analytics, adoption, performance, security, and iteration."],
  ["Support", "Release care, documentation, enablement, and roadmap support."],
]

const industries: Array<[string, string, LucideIcon]> = [
  ["Healthcare", "Patient operations, internal portals, compliance-aware workflows.", HeartPulse],
  ["Manufacturing", "Field apps, reporting, approvals, and connected plant visibility.", Factory],
  ["Finance", "Secure dashboards, governed data, role-based workflows, and audit trails.", Landmark],
  ["Retail", "Operations portals, inventory workflows, support tooling, and analytics.", ShoppingCart],
  ["Professional Services", "Client portals, delivery dashboards, knowledge systems, and automation.", Building2],
]

const capabilityRows = [
  ["Assess", "System maps, stakeholder interviews, process friction, data maturity."],
  ["Architect", "Microsoft 365, Azure, identity, APIs, security, and application boundaries."],
  ["Ship", "SharePoint portals, Power Apps, web apps, automations, BI dashboards."],
  ["Scale", "Adoption, governance, support playbooks, analytics, and roadmap iteration."],
]

function SectionLabel({ children, tone = "dark" }: { children: string; tone?: "dark" | "light" }) {
  return (
    <div
      className={`mb-5 inline-flex items-center gap-2 rounded-[4px] border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] ${
        tone === "light"
          ? "border-[#d6d9fc] bg-white text-[#533afd]"
          : "border-white/[0.12] bg-white/[0.06] text-cyan-200"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </div>
  )
}

function SectionHeader({
  eyebrow,
  title,
  body,
  tone = "dark",
}: {
  eyebrow: string
  title: string
  body: string
  tone?: "dark" | "light"
}) {
  return (
    <div data-clone-reveal className="mx-auto max-w-3xl text-center">
      <SectionLabel tone={tone}>{eyebrow}</SectionLabel>
      <h2
        className={`text-balance text-4xl font-semibold leading-[1.02] tracking-normal md:text-6xl ${
          tone === "light" ? "text-[#061b31]" : "text-white"
        }`}
      >
        {title}
      </h2>
      <p className={`mx-auto mt-5 max-w-2xl text-base leading-7 md:text-lg ${tone === "light" ? "text-[#64748d]" : "text-white/68"}`}>
        {body}
      </p>
    </div>
  )
}

export function ScrollProgressClone() {
  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-[120] hidden h-36 w-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/[0.12] lg:block" aria-hidden="true">
      <div data-scroll-progress className="h-full w-full origin-top rounded-full bg-gradient-to-b from-cyan-200 via-blue-400 to-violet-400" />
    </div>
  )
}

export function TrustStripClone() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#03060b] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <div data-clone-reveal className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Trust Bridge</SectionLabel>
            <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-tight text-white md:text-5xl">
              Proof before the pitch.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/62 md:text-base">
            The cloned experience brings credibility forward early, so visitors understand Softree as a delivery partner before they are asked to convert.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((signal) => (
            <div
              key={signal.label}
              data-clone-reveal
              data-depth-card
              className="rounded-[8px] border border-white/[0.11] bg-white/[0.055] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl [transform-style:preserve-3d]"
            >
              <div className="font-mono text-4xl font-semibold tabular-nums text-white">
                <span data-count={signal.count} data-suffix={signal.suffix}>
                  0
                </span>
              </div>
              <div className="mt-3 text-sm font-semibold text-cyan-100">{signal.label}</div>
              <p className="mt-2 text-xs leading-5 text-white/48">{signal.note}</p>
            </div>
          ))}
        </div>

        <div data-clone-reveal className="mt-8 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/42">
          {["Microsoft 365", "SharePoint", "Power Platform", "Dynamics 365", "Power BI", "Azure", "AI Automation"].map((item) => (
            <span key={item} className="rounded-[4px] border border-white/[0.1] bg-black/30 px-3 py-2">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProblemTransformationClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7fbff] px-4 py-24 text-[#061b31] sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(83,58,253,0.10),transparent_32%),linear-gradient(235deg,rgba(0,229,255,0.11),transparent_36%)]" aria-hidden="true" />
      <div data-light-sweep className="absolute inset-y-0 left-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-2xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          tone="light"
          eyebrow="Problem To Transformation"
          title="Most digital friction is not a design problem. It is an operating-system problem."
          body="Businesses struggle when their tools, data, processes, and teams evolve separately. The cloned homepage reframes Softree as the partner that connects those layers into measurable digital operations."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-4">
          {painPoints.map((item) => (
            <div
              key={item.title}
              data-clone-reveal
              data-depth-card
              className="rounded-[8px] border border-[#e5edf5] bg-white/88 p-6 shadow-[rgba(50,50,93,0.18)_0px_30px_45px_-30px,rgba(0,0,0,0.08)_0px_18px_36px_-18px] backdrop-blur-xl [transform-style:preserve-3d]"
            >
              <item.icon className="h-7 w-7 text-[#533afd]" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold text-[#061b31]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#64748d]">{item.body}</p>
            </div>
          ))}
        </div>

        <div data-clone-reveal className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <SectionLabel tone="light">Softree Positioning</SectionLabel>
              <h3 className="text-balance text-3xl font-semibold leading-tight text-[#061b31] md:text-5xl">
                From disconnected tools to connected execution.
              </h3>
            </div>
            <p className="text-base leading-7 text-[#64748d]">
              We modernize the Microsoft layer, engineer custom apps, automate workflows, integrate APIs, and turn operational data into decision-ready dashboards.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {["Modern workplace", "Workflow automation", "Custom apps", "Live analytics"].map((item, index) => (
              <div key={item} className="rounded-[7px] border border-[#e5edf5] bg-[#f8fbff] p-5">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#64748d]">0{index + 1}</span>
                  <CheckCircle2 className="h-5 w-5 text-[#15be53]" aria-hidden="true" />
                </div>
                <p className="text-lg font-semibold text-[#061b31]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function GlobalDeliveryClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#060910] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,229,255,0.12),transparent_30%),linear-gradient(315deg,rgba(83,58,253,0.15),transparent_38%)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div data-clone-reveal>
          <SectionLabel>Global Delivery</SectionLabel>
          <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-normal text-white md:text-6xl">
            Senior engineering attention with a delivery model buyers can trust.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/66">
            The story shifts from spectacle to credibility: Softree can plan,
            build, integrate, and support production systems across time zones,
            stakeholders, and complex enterprise environments.
          </p>
        </div>

        <div data-clone-reveal className="grid gap-4 md:grid-cols-2">
          {[
            ["Discovery clarity", "Scope, constraints, users, systems, and measurable outcomes."],
            ["Microsoft depth", "A practical command of M365, SharePoint, Power Platform, Dynamics, Azure, and BI."],
            ["Product engineering", "Modern React, Next.js, API, mobile, and portal delivery."],
            ["Long-term support", "Documentation, governance, optimization, and operational continuity."],
          ].map(([title, body]) => (
            <div
              key={title}
              data-depth-card
              className="rounded-[8px] border border-white/[0.1] bg-white/[0.055] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl [transform-style:preserve-3d]"
            >
              <Globe2 className="h-6 w-6 text-cyan-100" aria-hidden="true" />
              <h3 className="mt-8 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesStoryClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#03060b] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,229,255,0.15),transparent_30%),linear-gradient(245deg,rgba(139,92,246,0.15),transparent_38%)]" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:54px_54px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Service Pillars"
          title="A full-stack IT services story, not a menu of isolated skills."
          body="Each service card is written as a business outcome first, then backed by technical credibility. That is what turns service browsing into buyer confidence."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              data-clone-reveal
              data-depth-card
              className="group relative min-h-[260px] overflow-hidden rounded-[8px] border border-white/[0.1] bg-white/[0.055] p-6 shadow-[0_26px_86px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-xl [transform-style:preserve-3d]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-8 flex items-start justify-between">
                  <div className="rounded-[7px] border border-white/[0.12] bg-black/30 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                    <service.icon className="h-6 w-6 text-cyan-100" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-xs text-white/34">SERVICE</span>
                </div>
                <h3 className="text-2xl font-semibold leading-tight text-white">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/62">{service.body}</p>
                <div className="mt-auto pt-8 text-sm font-semibold text-cyan-100">
                  Build the capability <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CapabilityRevealClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7fbff] px-4 py-24 text-[#061b31] sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(83,58,253,0.10),transparent_32%),linear-gradient(300deg,rgba(0,229,255,0.10),transparent_36%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          tone="light"
          eyebrow="Capability Story"
          title="Every service becomes one connected delivery system."
          body="Instead of throwing technologies at visitors, the cloned component tells how Softree moves from assessment to architecture, build, integration, and scale."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div data-clone-reveal className="sticky top-24 hidden rounded-[8px] border border-[#d6d9fc] bg-white/86 p-6 shadow-[rgba(50,50,93,0.22)_0px_30px_70px_-34px] backdrop-blur-xl lg:block">
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#533afd]">Operating model</div>
            <p className="mt-5 text-2xl font-semibold leading-tight text-[#061b31]">
              Strategy, Microsoft cloud, custom software, automation, analytics, and support work as one system.
            </p>
          </div>

          <div className="space-y-4">
            {capabilityRows.map(([title, body], index) => (
              <div
                key={title}
                data-clone-reveal
                data-depth-card
                className="rounded-[8px] border border-[#e5edf5] bg-white/88 p-6 shadow-[rgba(50,50,93,0.18)_0px_30px_45px_-30px,rgba(0,0,0,0.08)_0px_18px_36px_-18px] backdrop-blur-xl [transform-style:preserve-3d]"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#061b31] font-mono text-sm text-cyan-100">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-[#061b31]">{title}</h3>
                    <p className="mt-3 text-base leading-7 text-[#64748d]">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function OperationsStoryClone() {
  return (
    <section data-operation-story className="relative isolate min-h-screen overflow-hidden bg-[#080b13] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(0,229,255,0.13),transparent_34%),linear-gradient(180deg,#080b13_0%,#10152a_52%,#f7fbff_100%)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <div data-clone-reveal>
            <SectionLabel>GSAP Pinned Narrative</SectionLabel>
            <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-normal text-white md:text-6xl">
              From scattered systems to connected digital operations.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/66">
              This section is the cinematic core: a pinned chapter sequence that converts complex IT delivery into an understandable transformation.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {storySteps.map((step) => (
              <div
                key={step.title}
                data-operation-step
                className="rounded-[8px] border border-white/[0.1] bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl"
              >
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-200">{step.eyebrow}</div>
                <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/58">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-clone-reveal className="relative min-h-[620px] overflow-hidden rounded-[8px] border border-white/[0.11] bg-black/[0.36] p-5 shadow-[0_38px_110px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,229,255,0.14),transparent_42%),linear-gradient(315deg,rgba(139,92,246,0.12),transparent_44%)]" aria-hidden="true" />
          <div className="relative h-full min-h-[580px]">
            {storySteps.map((step, index) => {
              const positions = [
                "left-[8%] top-[12%]",
                "right-[10%] top-[18%]",
                "left-[16%] top-[44%]",
                "right-[14%] top-[52%]",
                "left-1/2 top-[77%] -translate-x-1/2",
              ]
              const Icon = [Database, Cloud, Code2, Workflow, Gauge][index]
              return (
                <div
                  key={step.title}
                  data-operation-node
                  className={`absolute ${positions[index]} w-48 rounded-[8px] border border-cyan-100/20 bg-white/[0.08] p-4 text-white shadow-[0_18px_60px_rgba(0,229,255,0.14),inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-xl`}
                >
                  <Icon className="mb-5 h-6 w-6 text-cyan-100" aria-hidden="true" />
                  <div className="font-mono text-[11px] text-white/44">{step.eyebrow}</div>
                  <div className="mt-2 text-sm font-semibold leading-5">{step.title}</div>
                </div>
              )
            })}

            {["left-[28%] top-[25%] w-[42%]", "left-[27%] top-[46%] w-[30%]", "left-[49%] top-[57%] w-[28%]", "left-[38%] top-[75%] w-[24%]"].map((line, index) => (
              <div
                key={line}
                data-operation-line
                className={`absolute ${line} h-px origin-left bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-300 shadow-[0_0_18px_rgba(0,229,255,0.5)]`}
                style={{ rotate: index === 0 ? "9deg" : index === 1 ? "-20deg" : index === 2 ? "19deg" : "-10deg" }}
                aria-hidden="true"
              />
            ))}

            <div className="absolute bottom-5 left-5 right-5 rounded-[8px] border border-white/[0.1] bg-black/40 p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/44">Connected operations graph</span>
                <span className="rounded-[4px] bg-cyan-200 px-2 py-1 text-xs font-semibold text-[#061b31]">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ProofGlassClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7fbff] px-4 py-24 text-[#061b31] sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(230deg,rgba(83,58,253,0.11),transparent_34%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          tone="light"
          eyebrow="Proof And Risk Reduction"
          title="Enterprise buyers need evidence before momentum."
          body="The cloned proof section uses metrics, buyer-role quotes, outcome snapshots, and delivery confidence without overclaiming beyond the available homepage material."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {proofCards.map((card) => (
            <figure
              key={card.role}
              data-clone-reveal
              data-depth-card
              className="rounded-[8px] border border-[#e5edf5] bg-white/86 p-6 shadow-[rgba(50,50,93,0.2)_0px_30px_45px_-30px,rgba(0,0,0,0.08)_0px_18px_36px_-18px] backdrop-blur-xl [transform-style:preserve-3d]"
            >
              <Sparkles className="h-6 w-6 text-[#533afd]" aria-hidden="true" />
              <blockquote className="mt-6 text-lg font-medium leading-8 text-[#061b31]">"{card.quote}"</blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-[#64748d]">{card.role}</figcaption>
            </figure>
          ))}
        </div>

        <div data-clone-reveal className="mt-10 grid gap-4 text-white lg:grid-cols-4">
          {[
            ["Delivery", "Scoped releases, visible milestones, and accountable ownership."],
            ["Security", "Role-based access, Microsoft identity, governance, and supportable architecture."],
            ["Adoption", "Interfaces shaped around actual teams, not abstract feature lists."],
            ["Scale", "Cloud-ready foundations for future apps, data, automation, and AI."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-[8px] border border-[#d6d9fc] bg-[#061b31] p-5 shadow-[rgba(50,50,93,0.24)_0px_24px_55px_-32px]">
              <ShieldCheck className="h-5 w-5 text-cyan-200" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/62">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function IndustriesClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7fbff] px-4 py-24 text-[#061b31] sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,229,255,0.10),transparent_34%),linear-gradient(315deg,rgba(83,58,253,0.10),transparent_36%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          tone="light"
          eyebrow="Industries"
          title="Built for teams where workflow, data, and adoption matter."
          body="The cloned industry section connects Softree's services to real operational environments instead of presenting a generic sector list."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {industries.map(([title, body, Icon]) => (
            <div
              key={title as string}
              data-clone-reveal
              data-depth-card
              className="rounded-[8px] border border-[#e5edf5] bg-white/88 p-5 shadow-[rgba(50,50,93,0.16)_0px_26px_44px_-32px,rgba(0,0,0,0.08)_0px_16px_34px_-22px] backdrop-blur-xl [transform-style:preserve-3d]"
            >
              <Icon className="h-6 w-6 text-[#533afd]" aria-hidden="true" />
              <h3 className="mt-7 text-xl font-semibold text-[#061b31]">{title as string}</h3>
              <p className="mt-3 text-sm leading-6 text-[#64748d]">{body as string}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SecurityComplianceClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050814] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,229,255,0.13),transparent_32%),linear-gradient(315deg,rgba(139,92,246,0.12),transparent_40%)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div data-clone-reveal>
          <SectionLabel>Security And Governance</SectionLabel>
          <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-normal text-white md:text-6xl">
            Premium design, serious enterprise controls.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/66">
            Motion and visual polish cannot hide weak architecture. The cloned
            story makes security, permissioning, documentation, and support part
            of the value proposition.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Identity", "Microsoft identity, roles, access groups, and least-privilege thinking."],
            ["Governance", "Documentation, ownership, release care, and admin-friendly handoff."],
            ["Data", "Model clarity, data visibility, permission-aware dashboards, and lifecycle planning."],
            ["Reliability", "Monitoring, maintainable architecture, performance, and support continuity."],
          ].map(([title, body]) => (
            <div
              key={title}
              data-clone-reveal
              data-depth-card
              className="rounded-[8px] border border-white/[0.1] bg-white/[0.06] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.13)] backdrop-blur-xl [transform-style:preserve-3d]"
            >
              <ShieldCheck className="h-6 w-6 text-cyan-100" aria-hidden="true" />
              <h3 className="mt-7 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/58">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TechnologyEcosystemClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#04060c] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:52px_52px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Technology Ecosystem"
          title="The stack reads like a credible delivery map."
          body="Awwwards-style polish still needs technical substance. This section makes the Microsoft, cloud, analytics, app, API, and AI ecosystem feel connected."
        />

        <div data-clone-reveal className="mt-14 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {[
            "Microsoft 365",
            "SharePoint",
            "Power Platform",
            "Dynamics 365",
            "Power BI",
            "Azure",
            "Next.js",
            "React",
            "APIs",
            "Mobile Apps",
            "AI Agents",
            "Automation",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[8px] border border-white/[0.1] bg-white/[0.055] px-4 py-5 text-center text-sm font-semibold text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function InsightsFAQClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7fbff] px-4 py-24 text-[#061b31] sm:px-6 lg:px-8">
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div data-clone-reveal>
          <SectionLabel tone="light">Buyer Questions</SectionLabel>
          <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-normal text-[#061b31] md:text-6xl">
            Answer objections before the contact form.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#64748d]">
            A high-converting homepage lowers uncertainty. These cloned FAQ and
            insight cards make the sales path feel informed and low-risk.
          </p>
        </div>

        <div className="space-y-3">
          {[
            ["Can Softree handle strategy and build?", "Yes. The page positions Softree across discovery, architecture, engineering, integration, analytics, and support."],
            ["Is this only Microsoft consulting?", "No. Microsoft depth is the foundation, but custom web apps, mobile apps, APIs, AI, automation, and BI complete the delivery story."],
            ["What makes the clone different?", "It tells a buyer journey: problem, transformation, services, pinned operations story, proof, process, and CTA."],
          ].map(([title, body]) => (
            <div
              key={title}
              data-clone-reveal
              className="rounded-[8px] border border-[#e5edf5] bg-white/88 p-6 shadow-[rgba(50,50,93,0.14)_0px_24px_44px_-30px] backdrop-blur-xl"
            >
              <div className="flex gap-4">
                <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-[#533afd]" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-semibold text-[#061b31]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#64748d]">{body}</p>
                </div>
              </div>
            </div>
          ))}

          <div data-clone-reveal className="rounded-[8px] border border-[#d6d9fc] bg-[#061b31] p-6 text-white shadow-[rgba(50,50,93,0.2)_0px_28px_60px_-32px]">
            <BookOpenText className="h-6 w-6 text-cyan-100" aria-hidden="true" />
            <h3 className="mt-5 text-2xl font-semibold">Insight-led selling</h3>
            <p className="mt-3 text-sm leading-6 text-white/62">
              The clone is structured to earn trust through explanation, not hype.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function MidCTAClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050814] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 border-y border-white/[0.1] py-12 md:flex-row md:items-center md:justify-between">
        <div data-clone-reveal>
          <div className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-100/70">Mid-story conversion</div>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight text-white md:text-5xl">
            Know the workflow you need to fix? Start with a focused consultation.
          </h2>
        </div>
        <Link
          data-clone-reveal
          href="/contact"
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-[6px] bg-white px-5 text-sm font-semibold text-[#061b31] transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-[0.98]"
        >
          Talk to Softree
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export function ProcessClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#04060c] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,229,255,0.13),transparent_32%),linear-gradient(315deg,rgba(139,92,246,0.14),transparent_38%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Delivery Process"
          title="A sales story is only credible when the delivery model is clear."
          body="The process section answers the buyer's next question: what happens after the call?"
        />

        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          {process.map(([title, body], index) => (
            <div
              key={title}
              data-clone-reveal
              className="relative rounded-[8px] border border-white/[0.1] bg-white/[0.055] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl"
            >
              <div className="font-mono text-xs text-cyan-200">0{index + 1}</div>
              <h3 className="mt-8 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/56">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StorytellingCTAClone() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7fbff] px-4 py-24 text-[#061b31] sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,229,255,0.12),transparent_34%),linear-gradient(180deg,#f7fbff_0%,#ffffff_100%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div data-clone-reveal className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
            <div>
              <SectionLabel tone="light">Final Conversion</SectionLabel>
              <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.02] text-[#061b31] md:text-6xl">
                Turn the next messy workflow into a modern digital system.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#64748d] md:text-lg">
                Bring the business problem. Softree can help shape the architecture, user experience, Microsoft cloud layer, automation plan, and delivery roadmap.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] bg-[#533afd] px-5 text-sm font-semibold text-white transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#4434d4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#533afd]/40 active:scale-[0.98]"
                >
                  Book a Consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/case-studies/web"
                  className="inline-flex min-h-12 items-center justify-center rounded-[6px] border border-[#b9b9f9] bg-white px-5 text-sm font-semibold text-[#533afd] transition-[transform,background-color,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#f4f6ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#533afd]/35 active:scale-[0.98]"
                >
                  View Case Studies
                </Link>
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden rounded-[8px] border border-[#d6d9fc] bg-[#061b31] p-6 text-white shadow-[rgba(50,50,93,0.24)_0px_30px_70px_-30px,rgba(0,0,0,0.08)_0px_20px_40px_-22px] md:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(0,229,255,0.20),transparent_38%),linear-gradient(315deg,rgba(139,92,246,0.22),transparent_42%)]" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="rounded-[8px] border border-white/[0.12] bg-white/[0.07] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-white/45">Readiness Check</span>
                    <LockKeyhole className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                  </div>
                  {["Operational bottleneck", "Systems to connect", "Workflow owners", "Success metric"].map((item) => (
                    <div key={item} className="flex items-center gap-3 border-t border-white/[0.08] py-3 text-sm text-white/72">
                      <CheckCircle2 className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[8px] border border-white/[0.12] bg-black/28 p-5 backdrop-blur-xl">
                  <Globe2 className="h-6 w-6 text-cyan-200" aria-hidden="true" />
                  <p className="mt-5 text-2xl font-semibold leading-tight">Global delivery, local accountability, production-ready systems.</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}
