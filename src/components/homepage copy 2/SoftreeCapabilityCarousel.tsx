"use client"

import { useEffect, useRef, type CSSProperties } from "react"
import type { Swiper as SwiperInstance } from "swiper"

type SwiperWithTouchData = SwiperInstance & {
  touchEventsData?: {
    touchStartTime?: number
  }
}

type Slide = {
  key: string
  image: string
  collection: string
  title: string
  price: string
  cardBackground: string
  pageBackground: string
}

const SLIDES: Slide[] = [
  {
    key: "agentic-ai",
    image: "/whysoftree/ai.webp",
    collection: "AI Intelligence",
    title: "Agentic AI",
    price: "Automation, copilots, and governed workflows",
    cardBackground: "linear-gradient(163deg, rgba(239, 242, 255, 1) 0%, rgba(202, 212, 255, 1) 100%)",
    pageBackground:
      "linear-gradient(163deg, rgba(239, 242, 255, 1) 0%, rgba(202, 212, 255, 1) 100%)",
  },
  {
    key: "m365",
    image: "/whysoftree/microsoft.webp",
    collection: "Digital Workplace",
    title: "M365 + SharePoint",
    price: "Portals, governance, and collaboration systems",
    cardBackground: "linear-gradient(163deg, rgba(241, 251, 255, 1) 0%, rgba(190, 229, 241, 1) 100%)",
    pageBackground:
      "linear-gradient(163deg, rgba(241, 251, 255, 1) 0%, rgba(190, 229, 241, 1) 100%)",
  },
  {
    key: "power-platform",
    image: "/whysoftree/web.webp",
    collection: "Business Applications",
    title: "Power Platform",
    price: "Apps, approvals, and low-code operations",
    cardBackground: "linear-gradient(163deg, rgba(245, 239, 255, 1) 0%, rgba(224, 204, 252, 1) 100%)",
    pageBackground:
      "linear-gradient(163deg, rgba(245, 239, 255, 1) 0%, rgba(224, 204, 252, 1) 100%)",
  },
  {
    key: "web-apps",
    image: "/whysoftree/web dev.webp",
    collection: "Product Engineering",
    title: "Web Apps",
    price: "Modern product builds for client and ops teams",
    cardBackground: "linear-gradient(163deg, rgba(255, 247, 239, 1) 0%, rgba(255, 215, 189, 1) 100%)",
    pageBackground:
      "linear-gradient(163deg, rgba(255, 247, 239, 1) 0%, rgba(255, 215, 189, 1) 100%)",
  },
  {
    key: "mobile-apps",
    image: "/team-collaboration-interface-with-shared-workspace.jpg",
    collection: "App Delivery",
    title: "Mobile Apps",
    price: "Field-ready experiences for teams on the move",
    cardBackground: "linear-gradient(163deg, rgba(240, 252, 247, 1) 0%, rgba(198, 236, 216, 1) 100%)",
    pageBackground:
      "linear-gradient(163deg, rgba(240, 252, 247, 1) 0%, rgba(198, 236, 216, 1) 100%)",
  },
  {
    key: "power-bi",
    image: "/analytics-dashboard-with-charts-graphs-and-data-vi.jpg",
    collection: "Data Analytics",
    title: "Power BI",
    price: "Dashboards, KPI visibility, and decision support",
    cardBackground: "linear-gradient(163deg, rgba(252, 247, 235, 1) 0%, rgba(247, 223, 170, 1) 100%)",
    pageBackground:
      "linear-gradient(163deg, rgba(252, 247, 235, 1) 0%, rgba(247, 223, 170, 1) 100%)",
  },
]

export function SoftreeCapabilityCarousel() {
  const rootRef = useRef<HTMLElement>(null)
  const swiperRef = useRef<HTMLDivElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let swiper: SwiperInstance | null = null
    let mounted = true

    const initSwiper = async () => {
      const root = rootRef.current
      const swiperElement = swiperRef.current
      const prevElement = prevRef.current
      const nextElement = nextRef.current

      if (!root || !swiperElement || !prevElement || !nextElement) {
        return
      }

      const [{ default: Swiper }, { Navigation }] = await Promise.all([
        import("swiper"),
        import("swiper/modules"),
      ])

      if (!mounted) {
        return
      }

      const backgroundWrapper = root.querySelectorAll<HTMLElement>(".co-background")

      swiper = new Swiper(swiperElement, {
        modules: [Navigation],
        loop: false,
        watchSlidesProgress: true,
        speed: 1000,
        grabCursor: true,
        navigation: {
          nextEl: nextElement,
          prevEl: prevElement,
          disabledClass: "swiper-button-disabled",
        },
        on: {
          touchEnd(instance) {
            const touchStartTime = (instance as SwiperWithTouchData).touchEventsData?.touchStartTime
            if (!touchStartTime) {
              return
            }

            const time = Date.now() - touchStartTime
            const distance = Math.abs(instance.touches.diff)
            const velocity = distance / time
            const newSpeed = 1000 - velocity * 800
            instance.params.speed = Math.max(200, Math.min(1000, newSpeed))
          },
          progress(instance) {
            instance.slides.forEach((slide, index) => {
              const slideElement = slide as HTMLElement & { progress?: number }
              const progress = Number(slideElement.progress ?? 0)

              if (progress >= -1 && progress <= 1) {
                const rotateImageMax = 15
                const progressPositive = Math.abs(progress)
                const translateX = progress * -100
                const rotateImage = progressPositive * rotateImageMax - rotateImageMax
                const textMaskY = progressPositive * 50
                const scale = 1 - progressPositive * 0.2
                const opacity = 0.5 - progressPositive * 0.5

                slideElement.querySelector<HTMLElement>(".co-card")!.style.transform = `scale(${scale})`
                slideElement.querySelector<HTMLElement>(
                  ".co-card__shoe-img"
                )!.style.transform = `translate3d(${translateX}px, 0,0) rotate(${rotateImage}deg)`
                slideElement.querySelector<HTMLElement>(
                  ".co-card__shoe-shadow"
                )!.style.transform = `translate3d(${translateX / 2}px, 0,0)`

                if (backgroundWrapper[index]) {
                  backgroundWrapper[index].style.opacity = opacity.toFixed(2)
                }

                const textsMask = slideElement.querySelectorAll<HTMLElement>(".text-mask span")
                textsMask.forEach((text, textIndex) => {
                  text.style.transform = `translate3d(0,${textMaskY * (textIndex + 1)}px,0)`
                })
              }
            })
          },
          setTransition(instance, speed) {
            instance.slides.forEach((slide, index) => {
              const slideElement = slide as HTMLElement
              slideElement.querySelector<HTMLElement>(".co-card")!.style.transition = `${speed}ms`
              slideElement.querySelector<HTMLElement>(".co-card__shoe-img")!.style.transition = `${speed}ms`
              slideElement.querySelector<HTMLElement>(".co-card__shoe-shadow")!.style.transition = `${speed}ms`

              if (backgroundWrapper[index]) {
                backgroundWrapper[index].style.transition = `${speed}ms`
              }

              const textsMask = slideElement.querySelectorAll<HTMLElement>(".text-mask span")
              textsMask.forEach((text) => {
                text.style.transition = `${speed}ms`
              })
            })
          },
          transitionEnd(instance) {
            instance.params.speed = 1000
          },
        },
      })

      requestAnimationFrame(() => {
        swiper?.update()
      })
    }

    void initSwiper()

    return () => {
      mounted = false
      swiper?.destroy(true, true)
    }
  }, [])

  return (
    <section className="softree-capability-carousel" ref={rootRef} aria-labelledby="softree-capability-title">
      <div className="co-backgrounds" aria-hidden="true">
        {SLIDES.map((slide) => (
          <div
            key={slide.key}
            className="co-background"
            style={{ "--co-bg": slide.pageBackground } as CSSProperties}
          />
        ))}
      </div>

      <div className="co-shell">
        <div className="co-intro">
          <div className="co-intro__eyebrow">Softree capability carousel</div>
          <h2 className="co-intro__title" id="softree-capability-title">
            Services shaped as systems, not isolated deliverables.
          </h2>
          <p className="co-intro__copy">
            Swipe through the core Softree capabilities that typically anchor digital workplace,
            automation, analytics, and custom application engagements.
          </p>
        </div>

        <div className="co-carousel-wrap">
          <div className="swiper co-carousel" ref={swiperRef}>
            <div className="swiper-wrapper">
              {SLIDES.map((slide, index) => (
                <div className="swiper-slide co-carousel__slide" key={slide.key}>
                  <div
                    className="co-card"
                    style={{ "--co-card-bg": slide.cardBackground } as CSSProperties}
                  >
                    <div className="co-card__index">{String(index + 1).padStart(2, "0")}</div>
                    <div className="co-card__shoe">
                      <img
                        className="co-card__shoe-img"
                        src={slide.image}
                        alt={slide.title}
                        draggable={false}
                      />
                      <span className="co-card__shoe-shadow" />
                    </div>
                    <div className="co-card__info">
                      <div className="co-card__collection text-mask">
                        <span>{slide.collection}</span>
                      </div>
                      <div className="co-card__title text-mask">
                        <span>{slide.title}</span>
                      </div>
                      <div className="co-card__price text-mask">
                        <span>{slide.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="co-carousel__nav-buttons">
            <button className="co-carousel__nav-button prev" ref={prevRef} type="button" aria-label="Previous service">
              <span>Prev</span>
            </button>
            <button className="co-carousel__nav-button next" ref={nextRef} type="button" aria-label="Next service">
              <span>Next</span>
            </button>
          </div>
        </div>

        <footer className="co-footer">
          <div className="co-footer__links">
            <a href="/contact" className="co-btn">
              Start a project
            </a>
            <a href="/services" className="co-btn co-btn--ghost">
              Explore services
            </a>
            <a href="/case-studies" className="co-btn co-btn--ghost">
              View case studies
            </a>
          </div>
        </footer>
      </div>

      <style>{`
        .softree-capability-carousel {
          --co-accent: 239, 68, 35;
          --co-text: #111111;
          --co-muted: rgba(17, 17, 17, 0.6);
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: #f6f4ef;
          color: var(--co-text);
          font-family: "Montserrat", Arial, sans-serif;
        }

        .softree-capability-carousel *,
        .softree-capability-carousel *::before,
        .softree-capability-carousel *::after {
          box-sizing: border-box;
        }

        .co-backgrounds,
        .co-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .co-background {
          opacity: 0;
          background: var(--co-bg);
          transition: 1000ms;
        }

        .co-shell {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 54px 24px 28px;
        }

        .co-intro {
          width: min(760px, 100%);
          margin: 0 auto 32px;
          text-align: center;
        }

        .co-intro__eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 34px;
          padding: 0 14px;
          border: 1px solid rgba(17, 17, 17, 0.12);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.45);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .co-intro__title {
          margin: 18px 0 12px;
          font-size: clamp(32px, 4vw, 52px);
          line-height: 0.98;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        .co-intro__copy {
          max-width: 620px;
          margin: 0 auto;
          color: var(--co-muted);
          font-size: 16px;
          line-height: 1.65;
        }

        .co-carousel-wrap {
          position: relative;
          z-index: 4;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 520px;
        }

        .co-carousel {
          width: min(560px, 52vw);
          height: 420px;
          margin: 0 auto;
          overflow: visible;
        }

        .co-carousel .swiper-wrapper {
          display: flex;
          width: 100%;
          height: 100%;
        }

        .co-carousel .swiper-slide {
          flex-shrink: 0;
          width: 100%;
          height: 100%;
        }

        .co-carousel__slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .co-card {
          --co-card-bg: linear-gradient(163deg, rgba(255, 255, 255, 1) 0%, rgba(235, 235, 235, 1) 100%);
          position: relative;
          width: 276px;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 28px;
          background: var(--co-card-bg);
          box-shadow:
            0 2px 10px rgba(0, 0, 0, 0.05),
            0 28px 80px rgba(0, 0, 0, 0.12);
        }

        .co-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.65), transparent 28%),
            linear-gradient(180deg, transparent 46%, rgba(255, 255, 255, 0.45) 100%);
          pointer-events: none;
        }

        .co-card__index {
          position: absolute;
          top: 18px;
          right: 20px;
          z-index: 3;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: rgba(17, 17, 17, 0.28);
        }

        .co-card__shoe {
          position: relative;
          width: 114%;
          top: -6px;
        }

        .co-card__shoe-img {
          position: relative;
          z-index: 2;
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: 18px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
          user-select: none;
          -webkit-user-drag: none;
        }

        .co-card__shoe-shadow {
          position: absolute;
          top: 98px;
          left: 0;
          right: 0;
          width: 28px;
          height: 24px;
          margin: 0 auto;
          border-radius: 999px;
          opacity: 0.24;
          background-color: rgba(0, 0, 0, 1);
          box-shadow: 0 0 34px 44px rgba(0, 0, 0, 0.34);
        }

        .co-card__info {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 3;
          padding: 86px 22px 22px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.74) 34%, rgba(255, 255, 255, 0.92) 100%);
        }

        .co-card__collection {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.46;
        }

        .co-card__title {
          margin-top: 6px;
          font-size: 27px;
          line-height: 0.94;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.04em;
        }

        .co-card__price {
          margin-top: 10px;
          color: rgba(17, 17, 17, 0.74);
          font-size: 14px;
          line-height: 1.45;
          font-weight: 500;
        }

        .text-mask {
          overflow: hidden;
        }

        .text-mask span {
          display: inline-flex;
        }

        .co-carousel__nav-buttons {
          width: min(980px, 100%);
          margin-top: 44px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .co-carousel__nav-button {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 170px;
          padding: 10px 0;
          border: 0;
          background: transparent;
          color: var(--co-text);
          font: inherit;
          cursor: pointer;
        }

        .co-carousel__nav-button.prev {
          align-items: flex-end;
        }

        .co-carousel__nav-button.next {
          align-items: flex-start;
        }

        .co-carousel__nav-button::before {
          content: "";
          display: block;
          width: 100%;
          height: 1px;
          background-color: rgba(17, 17, 17, 0.7);
        }

        .co-carousel__nav-button span {
          padding: 12px 0;
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          transition: cubic-bezier(0.22, 0.74, 0.46, 0.97) 0.3s;
        }

        .co-carousel__nav-button.prev:hover:not(.swiper-button-disabled) span {
          transform: translate3d(-10px, 0, 0);
        }

        .co-carousel__nav-button.next:hover:not(.swiper-button-disabled) span {
          transform: translate3d(10px, 0, 0);
        }

        .co-carousel__nav-button.swiper-button-disabled {
          opacity: 0.3;
          cursor: default;
        }

        .co-footer {
          position: relative;
          z-index: 4;
          width: 100%;
          padding-top: 28px;
        }

        .co-footer__links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .co-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 18px;
          border-radius: 999px;
          border: 1px solid rgba(var(--co-accent), 0.22);
          background: rgba(255, 255, 255, 0.6);
          color: var(--co-text);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        }

        .co-btn:hover {
          transform: translateY(-2px);
          border-color: rgba(var(--co-accent), 0.55);
          box-shadow: 0 14px 32px rgba(var(--co-accent), 0.16);
        }

        .co-btn::after {
          content: " ↗";
          font-weight: 500;
        }

        .co-btn--ghost {
          background: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 900px) {
          .co-shell {
            padding-top: 40px;
          }

          .co-carousel {
            width: min(420px, 76vw);
          }

          .co-carousel__nav-buttons {
            width: min(700px, 100%);
          }
        }

        @media (max-width: 640px) {
          .softree-capability-carousel {
            min-height: auto;
          }

          .co-shell {
            min-height: auto;
            padding: 28px 16px 22px;
          }

          .co-intro {
            margin-bottom: 22px;
          }

          .co-intro__title {
            font-size: 34px;
          }

          .co-intro__copy {
            font-size: 14px;
          }

          .co-carousel-wrap {
            min-height: 430px;
          }

          .co-carousel {
            width: min(280px, 82vw);
            height: 390px;
          }

          .co-card {
            width: 250px;
            height: 390px;
            border-radius: 24px;
          }

          .co-card__title {
            font-size: 23px;
          }

          .co-carousel__nav-buttons {
            margin-top: 28px;
          }

          .co-carousel__nav-button {
            width: 120px;
          }

          .co-footer {
            padding-top: 22px;
          }
        }
      `}</style>
    </section>
  )
}

export default SoftreeCapabilityCarousel
