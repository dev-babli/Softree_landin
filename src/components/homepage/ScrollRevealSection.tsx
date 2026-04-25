"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ─── animation helpers (EXACTLY as original CodePen) ─── */

function animateFrom(elem: Element, direction?: number) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if(elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  (elem as HTMLElement).style.transform = "translate(" + x + "px, " + y + "px)";
  (elem as HTMLElement).style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 1.25, 
    x: 0,
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto"
  });
}

function hide(elem: Element) {
  gsap.set(elem, {autoAlpha: 0});
}

/* ─── component ─── */

export function ScrollRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<Element>(".gs_reveal").forEach(function(elem) {
        hide(elem);
        
        ScrollTrigger.create({
          trigger: elem,
          onEnter: function() { animateFrom(elem) }, 
          onEnterBack: function() { animateFrom(elem, -1) },
          onLeave: function() { hide(elem) }
        });
      });
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className="scroll-reveal-root">
        <div className="content__hero">
          <h1 className="content__heading gs_reveal">Reveal animations based on scroll direction</h1>
        </div>

        <div className="features">

          <div className="features__item features__item--left gs_reveal gs_reveal_fromLeft">
            <div className="features__image">
              <div className="features__card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="features__img" src="https://assets.codepen.io/16327/portrait-image-14.jpg" alt="" />
              </div>
            </div>
            <div className="features__content">
              <h2 className="features__title gs_reveal">Highway Vinyl Nights</h2>
              <p className="features__description gs_reveal">
                The headlights hum along the painted lines<br />
                We twist the dial till static turns to choir<br />
                Your hand keeps time on the wheel and the night leans in<br />
                Every mile is a chorus we have not written yet
              </p>
            </div>
          </div>

          <div className="features__item features__item--right gs_reveal gs_reveal_fromRight">
            <div className="features__image">
              <div className="features__card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="features__img" src="https://assets.codepen.io/16327/portrait-image-4.jpg" alt="" />
              </div>
            </div>
            <div className="features__content">
              <h2 className="features__title gs_reveal">Last Diner on Route 9</h2>
              <p className="features__description gs_reveal">
                The coffee tastes like rainwater and luck<br />
                Neon flickers slow while the jukebox spins a waltz<br />
                We carve our names in steam on the window glass<br />
                Stay till sunrise and the road will wait its turn
              </p>
            </div>
          </div>

          <div className="features__item features__item--left gs_reveal gs_reveal_fromLeft">
            <div className="features__image">
              <div className="features__card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="features__img" src="https://assets.codepen.io/16327/portrait-image-3.jpg" alt="" />
              </div>
            </div>
            <div className="features__content">
              <h2 className="features__title gs_reveal">Stardust Ballroom</h2>
              <p className="features__description gs_reveal">
                Mirror tiles catch every hopeful face<br />
                Records spin thin silver threads through the dark<br />
                We move like planets pulled by quiet drums<br />
                Hold the beat and the night will never close
              </p>
            </div>
          </div>

          <div className="features__item features__item--right gs_reveal gs_reveal_fromRight">
            <div className="features__image">
              <div className="features__card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="features__img" src="https://assets.codepen.io/16327/portrait-image-1.jpg" alt="" />
              </div>
            </div>
            <div className="features__content">
              <h2 className="features__title gs_reveal">Sky Without Borders</h2>
              <p className="features__description gs_reveal">
                Lay your worries down beneath the porchlight glow<br />
                The crickets stitch soft rhythm in the grass<br />
                We trade small dreams and make them loud together<br />
                A sky without borders is waiting past the trees
              </p>
            </div>
          </div>

        </div>
    </div>
  )
}
