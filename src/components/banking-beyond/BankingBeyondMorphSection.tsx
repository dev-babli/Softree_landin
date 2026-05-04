"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// =====================================================================
// Asset URLs — taken directly from the inspected Revolut HTML.
// Note (verified by downloading & inspecting each PNG):
//   SKY_LAYER_1 = solid blue sky with clouds (full background).
//   SKY_LAYER_2 = the WOMAN cutout on transparent — NOT a sky layer.
//   The "person visual" URL Revolut also serves is just a transparent
//   "Accounts + badges" overlay; we render those as HTML so we skip it.
// =====================================================================
const SKY_LAYER_1 =
  "https://assets.revolut.com/published-assets-v3/4bcf4f81-c0b1-4bde-82f5-0b4cd2ddd2ef/2f242895-e89a-44d3-9f8a-fb78b32d80c5.png";
const WOMAN_CUTOUT =
  "https://assets.revolut.com/published-assets-v3/c1d9d317-7303-4f79-8756-937632237bb5/2442a1d3-8d03-44b9-a046-db33242f100a.png";
const LEFT_CARD_IMG =
  "https://assets.revolut.com/published-assets-v3/d6d0bfe6-bc41-44db-8dde-dd3665b3c359/00544e46-b5db-4906-b0ed-87b558057f3f.png";
const RIGHT_CARD_IMG =
  "https://assets.revolut.com/published-assets-v3/af2fd3c8-cfef-40f0-a673-4a2c9fa85d69/aab65826-2d49-49f9-803b-061c5c68b842.png";

// =====================================================================
// Tiny presentational pieces
// =====================================================================
function FscsBadge() {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-black px-1.5 py-1 text-white shadow-sm">
      <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-white text-black">
        <svg viewBox="0 0 24 24" className="h-2 w-2 fill-black" aria-hidden="true">
          <path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3Zm-1 14-4-4 1.4-1.4L11 13.2l4.6-4.6L17 10l-6 6Z" />
        </svg>
      </span>
      <span className="whitespace-nowrap text-[6px] font-extrabold leading-[0.95] tracking-[0.04em]">
        FSCS
        <br />
        PROTECTED
      </span>
    </div>
  );
}

function SwitchGuaranteeBadge() {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-black px-1.5 py-1 text-white shadow-sm">
      <span className="whitespace-nowrap text-[5.5px] font-extrabold leading-[0.95] tracking-[0.04em]">
        CURRENT ACCOUNT
        <br />
        SWITCH GUARANTEE
      </span>
      <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-white text-black">
        <svg viewBox="0 0 24 24" className="h-2 w-2 fill-black" aria-hidden="true">
          <path d="M11 21V7l-4 4-1.4-1.4L12 3l6.4 6.6L17 11l-4-4v14h-2Z" />
        </svg>
      </span>
    </div>
  );
}

function CardUiOverlay({ amount, currency = "£" }: { amount: string; currency?: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[8%] z-30 flex flex-col items-center text-center text-white">
      <span className="text-[10px] font-medium leading-none opacity-90">Personal</span>
      <span className="mt-1 text-[26px] font-extrabold leading-none tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
        {currency}
        {amount}
      </span>
      <span className="mt-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-zinc-800 shadow">
        Accounts
      </span>
    </div>
  );
}

// =====================================================================
// Center composite card — the shared element that morphs hero → carousel.
// The card's own internal sky+woman lives in `bb-card-bg` so it can be
// crossfaded against the page-level sky+woman during the morph.
// =====================================================================
const CenterComposite = ({
  innerRef,
  cardBgRef,
}: {
  innerRef: React.MutableRefObject<HTMLDivElement | null>;
  cardBgRef: React.MutableRefObject<HTMLDivElement | null>;
}) => (
  <div
    ref={innerRef}
    className="bb-center pointer-events-none absolute left-1/2 top-1/2 z-40 aspect-[0.74] w-[clamp(155px,14vw,200px)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
    style={{ transformOrigin: "50% 50%" }}
  >
    {/* Card-internal sky + woman (cross-faded against page bg) */}
    <div
      ref={cardBgRef}
      className="bb-card-bg absolute inset-0 overflow-hidden rounded-[28px]"
    >
      <img
        src={SKY_LAYER_1}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        src={WOMAN_CUTOUT}
        alt=""
        className="absolute bottom-0 left-1/2 z-10 h-[120%] w-[155%] -translate-x-1/2 object-cover object-bottom"
        draggable={false}
      />
    </div>

    {/* Frame perimeter — JUST a hairline border, transparent inside */}
    <div className="pointer-events-none absolute inset-0 z-20 rounded-[28px] border border-white/55 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]" />

    {/* UI overlay (Personal / £6,012 / Accounts) */}
    <CardUiOverlay amount="6,012" />

    {/* Bottom badges — sit on the card's bottom edge */}
    <div className="absolute inset-x-2 bottom-2 z-40 flex items-center justify-center gap-1.5">
      <FscsBadge />
      <SwitchGuaranteeBadge />
    </div>
  </div>
);

// Side ghost carousel cards — simple image cards that fade & translate in
const SideCard = ({
  innerRef,
  src,
}: {
  innerRef: React.MutableRefObject<HTMLDivElement | null>;
  src: string;
}) => (
  <div
    ref={innerRef}
    aria-hidden="true"
    className="bb-side-card pointer-events-none absolute left-1/2 top-1/2 z-30 aspect-[0.74] w-[clamp(155px,14vw,200px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] will-change-transform"
  >
    <img
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      draggable={false}
    />
  </div>
);

// =====================================================================
// Main section
// =====================================================================
export default function BankingBeyondMorphSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Background
  const skyRef = useRef<HTMLDivElement | null>(null);

  // Top nav
  const navRef = useRef<HTMLElement | null>(null);

  // Hero copy
  const heroHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const heroParaRef = useRef<HTMLParagraphElement | null>(null);
  const heroCtaRef = useRef<HTMLAnchorElement | null>(null);

  // Cards
  const cardsClusterRef = useRef<HTMLDivElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const centerCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);
  const cardBgRef = useRef<HTMLDivElement | null>(null);

  // White salary panel & content
  const whitePanelRef = useRef<HTMLDivElement | null>(null);
  const salaryHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const salaryParaRef = useRef<HTMLParagraphElement | null>(null);
  const salaryCtaRef = useRef<HTMLAnchorElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 900px)",
          isMobile: "(max-width: 899px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const c = ctx.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };

          // Side card final translate distance (% of own width).
          // Desktop: 110% (card-width + small gap). Mobile: 78% (closer overlap).
          // We add -50 because GSAP's xPercent overrides Tailwind's
          // `-translate-x-1/2`, so we must re-bake the centering.
          const SIDE_OFFSET = c.isDesktop ? 110 : 78;
          const SIDE_HERO_OFFSET = 40;
          const xpInitLeft = -50 - SIDE_HERO_OFFSET;
          const xpInitRight = -50 + SIDE_HERO_OFFSET;
          const xpFinalLeft = -50 - SIDE_OFFSET;
          const xpFinalRight = -50 + SIDE_OFFSET;

          // Hero state for center card (large, pushed slightly right).
          // Carousel base is ~260px wide; hero scale ~1.85 brings it to ~480px wide.
          const heroCenter = c.isDesktop
            ? { scale: 1.85, x: 90, y: 30 }
            : { scale: 1.4, x: 0, y: 20 };

          // The card-cluster Y target in final state — pushes cards below
          // the salary heading/CTA copy that lives above them in the white panel.
          const CLUSTER_FINAL_Y = c.isDesktop ? 110 : 70;

          // ---- Initial states ----
          gsap.set(cardsClusterRef.current, { y: 0 });
          gsap.set(centerCardRef.current, heroCenter);
          // Card's own woman/sky is the SHARED element; visible from the start.
          gsap.set(cardBgRef.current, { opacity: 1 });

          gsap.set(leftCardRef.current, {
            xPercent: xpInitLeft,
            scale: 0.95,
            opacity: 0,
          });
          gsap.set(rightCardRef.current, {
            xPercent: xpInitRight,
            scale: 0.95,
            opacity: 0,
          });

          gsap.set(skyRef.current, {
            scale: 1.05,
            y: 0,
            opacity: 1,
          });

          gsap.set(whitePanelRef.current, {
            yPercent: 100,
            scaleX: 0.72,
            opacity: 0,
            transformOrigin: "50% 100%",
            borderTopLeftRadius: 36,
            borderTopRightRadius: 36,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          });

          gsap.set(salaryHeadingRef.current, { opacity: 0, y: 40 });
          gsap.set(salaryParaRef.current, { opacity: 0, y: 28 });
          gsap.set(salaryCtaRef.current, { opacity: 0, y: 18 });
          gsap.set(dotsRef.current, { opacity: 0, y: 16 });

          // Reduced motion: skip the scrub timeline; jump to final state.
          if (c.reduceMotion) {
            gsap.set(cardsClusterRef.current, { y: CLUSTER_FINAL_Y });
            gsap.set(centerCardRef.current, { scale: 1, x: 0, y: 0 });
            gsap.set(cardBgRef.current, { opacity: 1 });
            gsap.set(leftCardRef.current, {
              xPercent: xpFinalLeft,
              scale: 0.9,
              opacity: 1,
            });
            gsap.set(rightCardRef.current, {
              xPercent: xpFinalRight,
              scale: 0.9,
              opacity: 1,
            });
            gsap.set(skyRef.current, { opacity: 0 });
            gsap.set(navRef.current, { opacity: 0 });
            gsap.set([heroHeadingRef.current, heroParaRef.current, heroCtaRef.current], {
              opacity: 0,
            });
            gsap.set(whitePanelRef.current, {
              yPercent: 0,
              scaleX: 1,
              opacity: 1,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            });
            gsap.set(
              [
                salaryHeadingRef.current,
                salaryParaRef.current,
                salaryCtaRef.current,
                dotsRef.current,
              ],
              { opacity: 1, y: 0 }
            );
            return;
          }

          // ---- Pinned scrubbed timeline ----
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: c.isDesktop ? "+=260%" : "+=200%",
              scrub: 0.8,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Phase 1 (0 → 0.15): Hero hold — empty time-block.
          tl.to({}, { duration: 0.15 });

          // Phase 2 (0.15 → 0.35): pre-assembly
          // Background subtle parallax
          tl.to(
            skyRef.current,
            { scale: 1.0, y: -30, duration: 0.2 },
            0.15
          );
          // Center card morphs toward carousel size & position
          tl.to(
            centerCardRef.current,
            {
              scale: 1,
              x: 0,
              y: 0,
              duration: 0.4,
              ease: "power2.inOut",
            },
            0.15
          );
          // Side cards begin to fade + slide outward
          tl.to(
            leftCardRef.current,
            {
              opacity: 0.6,
              xPercent: -50 - 70,
              duration: 0.2,
            },
            0.2
          );
          tl.to(
            rightCardRef.current,
            {
              opacity: 0.6,
              xPercent: -50 + 70,
              duration: 0.2,
            },
            0.2
          );

          // Phase 3 (0.30 → 0.55): hero copy exit + nav fade + side cards settle
          tl.to(navRef.current, { opacity: 0, duration: 0.18 }, 0.3);
          tl.to(
            heroHeadingRef.current,
            { opacity: 0, y: -20, duration: 0.18 },
            0.3
          );
          tl.to(
            heroParaRef.current,
            { opacity: 0, y: -12, duration: 0.18 },
            0.34
          );
          tl.to(
            heroCtaRef.current,
            { opacity: 0, y: -10, duration: 0.18 },
            0.38
          );

          tl.to(
            leftCardRef.current,
            {
              xPercent: xpFinalLeft,
              scale: 0.9,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            0.32
          );
          tl.to(
            rightCardRef.current,
            {
              xPercent: xpFinalRight,
              scale: 0.9,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            0.32
          );

          // Phase 4 (0.45 → 0.85): white panel rises and widens; bg fades.
          tl.to(
            skyRef.current,
            { scale: 1.0, y: -80, opacity: 0, duration: 0.4 },
            0.45
          );

          // Cluster shifts down so cards sit beneath the salary heading.
          tl.to(
            cardsClusterRef.current,
            {
              y: CLUSTER_FINAL_Y,
              duration: 0.35,
              ease: "power2.inOut",
            },
            0.5
          );

          tl.to(
            whitePanelRef.current,
            {
              yPercent: 20,
              scaleX: 0.86,
              opacity: 1,
              duration: 0.22,
              ease: "power2.out",
            },
            0.5
          );
          tl.to(
            whitePanelRef.current,
            {
              yPercent: 0,
              scaleX: 1,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              duration: 0.22,
              ease: "power2.inOut",
            },
            0.72
          );

          // Phase 5 (0.65 → 0.95): salary copy reveal — staggered.
          tl.to(
            salaryHeadingRef.current,
            { opacity: 1, y: 0, duration: 0.16 },
            0.66
          );
          tl.to(
            salaryParaRef.current,
            { opacity: 1, y: 0, duration: 0.16 },
            0.72
          );
          tl.to(
            salaryCtaRef.current,
            { opacity: 1, y: 0, duration: 0.16 },
            0.78
          );

          // Final: dots fade in.
          tl.to(
            dotsRef.current,
            { opacity: 1, y: 0, duration: 0.12 },
            0.86
          );
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Banking and Beyond — your salary, reimagined"
      className="relative h-screen w-full overflow-hidden bg-[#3e8be8]"
    >
      <div
        ref={stageRef}
        className="relative h-full w-full overflow-hidden"
      >
        {/* ───────── L1: Page sky background (parallax) ───────── */}
        <div
          ref={skyRef}
          className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        >
          <img
            src={SKY_LAYER_1}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* ───────── L2: Top nav ───────── */}
        <nav
          ref={navRef}
          aria-label="Site"
          className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-5 text-white md:px-10 md:py-7"
        >
          <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <svg viewBox="0 0 30 30" className="h-7 w-7 fill-current" aria-hidden="true">
              <path d="M5 4h11.7a7.4 7.4 0 0 1 1.7 14.5L24 26h-5l-5-7H10v7H5V4Zm5 4v7h6.3a3.5 3.5 0 0 0 0-7H10Z" />
            </svg>
            <span>Revolut</span>
          </a>
          <ul className="hidden items-center gap-9 text-sm font-medium md:flex">
            <li>Personal</li>
            <li>Business</li>
            <li>Kids &amp; Teens</li>
            <li>Company</li>
          </ul>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden md:inline">Log in</span>
            <span className="rounded-full bg-white px-4 py-2 font-semibold text-black">Sign up</span>
          </div>
        </nav>

        {/* ───────── L3: Hero copy ───────── */}
        <div className="absolute inset-x-0 top-0 z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-center px-6 md:px-10">
          <div className="max-w-[640px]">
            <h1
              ref={heroHeadingRef}
              className="bb-hero-title font-extrabold leading-[0.95] tracking-[-0.02em] text-white"
              style={{
                fontSize: "clamp(40px, 6vw, 86px)",
                whiteSpace: "nowrap",
              }}
            >
              Banking &amp; Beyond
            </h1>
            <p
              ref={heroParaRef}
              className="mt-6 max-w-[420px] text-base leading-snug text-white/90 md:text-[17px]"
            >
              This is your bank, redefined. Get powerful daily banking and global freedom. Sign up for free in a tap.
            </p>
            <a
              ref={heroCtaRef}
              href="#"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow transition hover:opacity-90"
            >
              Download the app
            </a>
          </div>
        </div>

        {/* ───────── L5: White salary panel (z-20: below cards, above hero) ───────── */}
        <div
          ref={whitePanelRef}
          className="absolute inset-0 z-20 bg-white will-change-transform"
        >
          <div className="mx-auto flex h-full max-w-[1080px] flex-col items-center justify-start px-6 pt-[7vh] text-center md:pt-[10vh]">
            <h2
              ref={salaryHeadingRef}
              className="font-bold tracking-tight text-zinc-900"
              style={{ fontSize: "clamp(32px, 4.5vw, 64px)", lineHeight: 1.05 }}
            >
              Your salary, reimagined
            </h2>
            <p
              ref={salaryParaRef}
              className="mt-5 max-w-[720px] text-base leading-relaxed text-zinc-700 md:text-lg"
            >
              Spend smartly, send quickly, sort your salary automatically, and watch your savings
              grow — all with a Revolut bank account.
            </p>
            <a
              ref={salaryCtaRef}
              href="#"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow"
            >
              Move your salary
            </a>

            {/* Cards live in a sibling layer (z-30/40) so they overlap this panel */}
            <div
              ref={dotsRef}
              className="absolute inset-x-0 bottom-[6vh] z-50 flex items-center justify-center gap-3"
            >
              <span className="h-2 w-7 rounded-full bg-zinc-900" aria-current="true" />
              <span className="h-2 w-2 rounded-full bg-zinc-300" />
              <span className="h-2 w-2 rounded-full bg-zinc-300" />
            </div>
          </div>
        </div>

        {/* ───────── L4: Cards cluster (z-30/40 — above white panel) ───────── */}
        <div
          ref={cardsClusterRef}
          className="pointer-events-none absolute inset-0 z-30 will-change-transform"
        >
          <SideCard innerRef={leftCardRef} src={LEFT_CARD_IMG} />
          <SideCard innerRef={rightCardRef} src={RIGHT_CARD_IMG} />
          <CenterComposite innerRef={centerCardRef} cardBgRef={cardBgRef} />
        </div>
      </div>
    </section>
  );
}
