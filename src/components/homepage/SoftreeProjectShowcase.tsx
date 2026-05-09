"use client"

import { useEffect, useRef, useState } from "react"

type Project = {
  id: string
  href: string
  navLabel: string
  title: string
  category: string
  src: string
  srcSet: string
}

const firstProjectImage = {
  src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
  srcSet: "",
}

const projects: Project[] = [
  {
    id: "1",
    href: "/projects/modern-tech-product-showcase",
    navLabel: "App UX",
    title: "Modern Tech Product Showcase",
    category: "App UX",
    src: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop",
    srcSet: "",
  },
  {
    id: "2",
    href: "/projects/mobile-app-ui-concept",
    navLabel: "FinTech Platform",
    title: "Enterprise FinTech UI Architecture",
    category: "Data Visualization",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    srcSet: "",
  },
  {
    id: "3",
    href: "/projects/minimalist-home-decor-styling",
    navLabel: "AI Agent UI",
    title: "Intelligent Agent Orchestration",
    category: "Platform Engineering",
    src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop",
    srcSet: "",
  },
  {
    id: "4",
    href: "/projects/outdoor-portrait-photography",
    navLabel: "Cloud Ecosystem",
    title: "Distributed Cloud Ecosystem Dashboard",
    category: "Infrastructure",
    src: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop",
    srcSet: "",
  },
]

function ProjectImage({
  src,
  srcSet,
  className = "",
}: {
  src: string
  srcSet: string
  className?: string
}) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes="100vw"
      loading="lazy"
      alt="Project Image"
      className={`home-project-image ${className}`.trim()}
    />
  )
}

function ProjectArrow() {
  return (
    <span className="project-arrow-wrap" aria-hidden="true">
      <span className="project-arrow-icon-wrap">
        <img
          src="https://cdn.prod.website-files.com/68a6c9db9103d7287f313b30/68a80db800c37b624fd4af76_button-arrow.svg"
          loading="lazy"
          alt=""
          className="small-icon"
        />
      </span>
    </span>
  )
}

export default function SoftreeProjectShowcase() {
  const [activeProject, setActiveProject] = useState(projects[0].id)
  const panelRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target instanceof HTMLElement) {
          const nextId = visible.target.dataset.projectId
          if (nextId) setActiveProject(nextId)
        }
      },
      {
        root: null,
        rootMargin: "-28% 0px -38% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    )

    Object.values(panelRefs.current).forEach((panel) => {
      if (panel) observer.observe(panel)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="softree-project-showcase" aria-labelledby="softree-work-title">
      <aside className="home-project-top-area" aria-label="Project navigation">
        <div className="home-project-card">
          <ProjectImage
            src={firstProjectImage.src}
            srcSet={firstProjectImage.srcSet}
            className="first"
          />
          <div className="home-project-sticky-scrim" aria-hidden="true" />
              <div className="home-project-sticky-wrap">
                <h1
                  id="softree-work-title"
                  data-w-id="02742f5c-2626-a081-210c-1a8ccc288f82"
                  className="section-title white"
                >
                  Our Work
                </h1>

                <nav
                  data-w-id="7a2bc888-4aa4-3b6e-5dd1-76114cf2dd9c"
                  className="home-project-sticky-link-area"
                  aria-label="Project shortcuts"
                >
                  {projects.map((project) => (
                    <a
                      key={project.id}
                      href={`#${project.id}`}
                      className={`home-project-sticky-link ${
                        activeProject === project.id ? "is-active" : ""
                      }`}
                    >
                      {project.navLabel}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
      </aside>

      <div className="home-project-scroll-area">
        {projects.map((project, index) => (
          <section
            key={project.id}
            id={project.id}
            data-project-id={project.id}
            ref={(node) => {
              panelRefs.current[project.id] = node
            }}
            className={`home-project-area ${
              index === projects.length - 1 ? "last" : ""
            }`}
          >
            <a href={project.href} className="home-project-card w-inline-block">
              <ProjectImage src={project.src} srcSet={project.srcSet} />
              <div className="home-project-card-area">
                <div className="project-content-wrap">
                  <div className="project-title-row">
                    <div className="project-title-wrap">
                      <h2 className="card-title">{project.title}</h2>
                    </div>
                    <ProjectArrow />
                  </div>
                  <p className="project-text">{project.category}</p>
                </div>
              </div>
            </a>
          </section>
        ))}
      </div>

      <style jsx>{`
        .softree-project-showcase {
          position: relative;
          display: grid;
          width: 100%;
          min-height: 400svh;
          grid-template-columns: minmax(0, 50%) minmax(0, 50%);
          overflow: clip;
          background: #050505;
          color: #fff;
        }

        .w-dyn-list,
        .w-dyn-items,
        .w-dyn-item {
          width: 100%;
          height: 100%;
        }

        .home-project-top-area {
          position: sticky;
          top: 0;
          z-index: 10;
          height: 100svh;
          min-height: 680px;
          align-self: start;
          overflow: hidden;
          background: #080604;
        }

        .home-project-scroll-area {
          position: relative;
          min-width: 0;
          background: #050505;
        }

        .home-project-area {
          position: relative;
          height: 100svh;
          min-height: 680px;
          scroll-margin-top: 0;
          background: #050505;
        }

        .home-project-card {
          position: absolute;
          inset: 0;
          display: block;
          overflow: hidden;
          background: #050505;
          color: inherit;
          text-decoration: none;
        }

        .home-project-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.001);
          transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .home-project-scroll-area .home-project-card:hover .home-project-image,
        .home-project-scroll-area .home-project-card:focus-visible .home-project-image {
          transform: scale(1.045);
        }

        .home-project-top-area .home-project-image {
          filter: blur(1.5px) saturate(0.8) brightness(0.72);
          object-position: 48% center;
          transform: scale(1.035);
        }

        .home-project-sticky-scrim {
          position: absolute;
          inset: 0;
          z-index: 1;
          background:
            linear-gradient(90deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.44) 55%, rgba(0, 0, 0, 0.28)),
            linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.3));
        }

        .home-project-sticky-wrap {
          position: absolute;
          left: clamp(2rem, 5.3vw, 6.2rem);
          top: 50%;
          z-index: 2;
          display: flex;
          max-width: min(42vw, 680px);
          transform: translateY(-50%);
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(4.5rem, 7.5vw, 8rem);
        }

        .section-title.white {
          color: #fff;
          font-size: clamp(5.7rem, 7.5vw, 10.5rem);
          font-weight: 500;
          line-height: 0.88;
          letter-spacing: 0;
          text-shadow: 0 28px 88px rgba(0, 0, 0, 0.58);
          animation: workTitleIn 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .home-project-sticky-link-area {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(0.9rem, 1.15vw, 1.3rem);
          animation: workNavIn 900ms 120ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .home-project-sticky-link {
          display: inline-flex;
          color: rgba(255, 255, 255, 0.34);
          font-size: clamp(2.45rem, 3.15vw, 4.7rem);
          font-weight: 650;
          line-height: 0.98;
          letter-spacing: 0;
          text-decoration: none;
          transition:
            color 280ms ease,
            opacity 280ms ease,
            transform 280ms ease;
        }

        .home-project-sticky-link.is-active,
        .home-project-sticky-link:hover,
        .home-project-sticky-link:focus-visible {
          color: #fff;
          opacity: 1;
          transform: translateX(0.08em);
          outline: none;
        }

        .home-project-card-area {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1.5rem, 4vw, 5rem);
          pointer-events: none;
        }

        .project-content-wrap {
          display: flex;
          width: min(78%, 650px);
          transform: translate3d(0, 0, 0) scale3d(0.5, 0.5, 1);
          transform-origin: center;
          transform-style: preserve-3d;
          opacity: 0;
          flex-direction: column;
          align-items: flex-start;
          transition:
            opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .home-project-card:hover .project-content-wrap,
        .home-project-card:focus-visible .project-content-wrap,
        .home-project-area:target .project-content-wrap {
          transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
          opacity: 1;
        }

        .project-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          max-width: 100%;
        }

        .project-title-wrap {
          background: #fff;
          color: #050505;
          padding: clamp(1.35rem, 1.8vw, 2rem) clamp(1.55rem, 2.2vw, 2.45rem);
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.18);
        }

        .card-title {
          color: #050505;
          font-size: clamp(2rem, 2.45vw, 3.4rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: 0;
          white-space: nowrap;
        }

        .project-text {
          margin-top: clamp(0.8rem, 1vw, 1.15rem);
          color: #fff;
          font-size: clamp(1.45rem, 1.8vw, 2.35rem);
          font-weight: 450;
          line-height: 1;
          letter-spacing: 0;
          text-shadow: 0 10px 35px rgba(0, 0, 0, 0.55);
        }

        .project-arrow-wrap {
          display: grid;
          width: clamp(4rem, 4.6vw, 5.1rem);
          height: clamp(4rem, 4.6vw, 5.1rem);
          flex: 0 0 auto;
          place-items: center;
          background: #fff;
          color: #050505;
          transform: translateY(-52%);
          overflow: hidden;
        }

        .project-arrow-icon-wrap {
          display: grid;
          width: 1.62rem;
          height: 1.62rem;
          place-items: center;
          transform: translate3d(0, 0, 0);
          transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .small-icon {
          display: block;
          width: 100%;
          height: 100%;
        }

        .home-project-card:hover .project-arrow-icon-wrap,
        .home-project-card:focus-visible .project-arrow-icon-wrap {
          transform: translate3d(0.18rem, -0.18rem, 0);
        }

        @keyframes workTitleIn {
          from {
            opacity: 0;
            transform: translate3d(0, 32px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes workNavIn {
          from {
            opacity: 0;
            transform: translate3d(0, 22px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @media (hover: none) {
          .project-content-wrap {
            transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
            opacity: 1;
          }
        }

        @media (max-width: 900px) {
          .softree-project-showcase {
            display: block;
            min-height: auto;
          }

          .home-project-top-area {
            position: relative;
            top: 0;
            height: 52svh;
            min-height: 440px;
          }

          .home-project-scroll-area {
            min-height: auto;
          }

          .home-project-area {
            height: 85svh;
            min-height: 560px;
          }

          .home-project-sticky-wrap {
            left: clamp(1.25rem, 6vw, 2rem);
            right: clamp(1.25rem, 6vw, 2rem);
            top: auto;
            bottom: clamp(2rem, 7vw, 3rem);
            max-width: none;
            transform: none;
            gap: 2.2rem;
          }

          .section-title.white {
            font-size: clamp(4rem, 16vw, 6.5rem);
          }

          .home-project-sticky-link-area {
            gap: 0.65rem;
          }

          .home-project-sticky-link {
            font-size: clamp(1.9rem, 8vw, 3rem);
          }

          .project-content-wrap {
            width: min(90%, 520px);
          }

          .card-title {
            white-space: normal;
          }
        }

        @media (max-width: 560px) {
          .home-project-card-area {
            align-items: flex-end;
            justify-content: flex-start;
            padding: 1rem 1rem 4.5rem;
          }

          .project-content-wrap {
            width: 100%;
          }

          .project-title-wrap {
            padding: 1rem 1.1rem;
          }

          .card-title {
            font-size: clamp(1.55rem, 8vw, 2.3rem);
          }

          .project-arrow-wrap {
            width: 3.5rem;
            height: 3.5rem;
          }

          .project-text {
            font-size: 1.25rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .section-title.white,
          .home-project-sticky-link-area,
          .home-project-image,
          .home-project-sticky-link,
          .project-content-wrap,
          .project-arrow-icon-wrap {
            animation: none !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </section>
  )
}
