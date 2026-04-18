import React, { useState, useEffect } from 'react';

/**
 * HulyHero - A premium, self-contained hero section reverse-engineered from Huly.io.
 * 
 * Features:
 * - Fixed glassmorphic navigation with scroll-aware styling.
 * - Above-the-fold hero content with staggered reveal animations.
 * - Atmospheric background with a deep purple radial spotlight.
 * - Animated glow border on the primary CTA using Houdini CSS (@property).
 * - Floating CSS-only UI mockup of a project management dashboard.
 */

const HulyHero = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="huly-hero-container">
      {/* 1. Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

        :root {
          --bg-base: #0A0A0D;
          --surface-1: rgba(18, 18, 18, 0.8);
          --wireframe: rgba(255, 255, 255, 0.08);
          --accent-purple: #7C5CFC;
          --accent-teal: #3ECFB2;
          --text-primary: rgba(255, 255, 255, 1.0);
          --text-secondary: rgba(255, 255, 255, 0.60);
          --text-tertiary: rgba(255, 255, 255, 0.35);
          --font-inter: 'Inter', sans-serif;
        }

        /* Houdini CSS for Primary CTA Glow */
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes border-spin {
          to { --angle: 360deg; }
        }

        @keyframes fadeUp {
          from { 
            opacity: 0; 
            transform: translateY(24px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }

        .huly-hero-container {
          background-color: var(--bg-base);
          min-height: 100vh;
          font-family: var(--font-inter);
          color: var(--text-primary);
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        /* Atmospheric Background Layers */
        .hero-spotlight {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 80vh;
          background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124, 92, 252, 0.22), transparent);
          z-index: 1;
          pointer-events: none;
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          z-index: 2;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          pointer-events: none;
        }

        /* Navigation */
        .huly-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 16px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          background: transparent;
          transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
        }

        .huly-nav.scrolled {
          background: rgba(18, 18, 18, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--wireframe);
          padding: 12px 40px;
        }

        .huly-nav-logo {
          color: var(--accent-purple);
          font-weight: 700;
          font-size: 22px;
          letter-spacing: -0.01em;
          text-decoration: none;
        }

        .huly-nav-links {
          display: flex;
          gap: 32px;
        }

        .huly-nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          transition: color 200ms ease;
        }

        .huly-nav-link:hover {
          color: var(--text-primary);
        }

        .huly-nav-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .btn-signin {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 400;
          cursor: pointer;
          transition: color 200ms ease;
        }

        .btn-signin:hover {
          color: var(--text-primary);
        }

        /* Buttons */
        .btn-cta {
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          padding: 10px 24px;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
          border: none;
        }

        .btn-primary {
          background: var(--accent-purple);
          color: #FFFFFF;
          position: relative;
          z-index: 5;
        }

        .btn-primary:hover {
          box-shadow: 0 0 24px rgba(124, 92, 252, 0.5), 0 0 48px rgba(124, 92, 252, 0.2);
          transform: translateY(-1px);
        }

        /* Hero Content */
        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1120px;
          margin: 0 auto;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 140px;
          text-align: center;
          box-sizing: border-box;
        }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(124, 92, 252, 0.08);
          border: 1px solid rgba(124, 92, 252, 0.4);
          color: var(--accent-purple);
          border-radius: 9999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 32px;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.1s;
          opacity: 0;
        }

        .hero-headline {
          font-size: clamp(48px, 6vw, 68px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.05;
          max-width: 760px;
          margin-bottom: 24px;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.25s;
          opacity: 0;
        }

        .hero-subheadline {
          font-size: 18px;
          line-height: 1.65;
          color: var(--text-secondary);
          max-width: 560px;
          margin-bottom: 40px;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }

        .hero-cta-group {
          display: flex;
          gap: 12px;
          align-items: center;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.55s;
          opacity: 0;
        }

        .cta-primary {
          padding: 14px 32px;
          font-size: 15px;
          background: var(--accent-purple);
          color: #fff;
          border-radius: 9999px;
          border: none;
          font-weight: 500;
          cursor: pointer;
          position: relative;
          transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-primary:hover {
          box-shadow: 0 0 24px rgba(124, 92, 252, 0.5), 0 0 48px rgba(124, 92, 252, 0.2);
          transform: translateY(-1px);
        }

        .cta-secondary {
          background: transparent;
          color: rgba(255, 255, 255, 0.70);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 400;
          cursor: pointer;
          transition: all 300ms ease;
        }

        .cta-secondary:hover {
          border-color: rgba(255, 255, 255, 0.30);
          color: #FFFFFF;
        }

        /* Floating Mockup */
        .hero-mockup-container {
          width: 100%;
          max-width: 900px;
          margin-top: 80px;
          padding: 0 20px;
          box-sizing: border-box;
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.75s;
          opacity: 0;
        }

        .hero-mockup {
          background: rgba(14, 14, 18, 0.95);
          border: 1px solid var(--wireframe);
          border-bottom: none;
          border-radius: 16px 16px 0 0;
          height: 380px;
          width: 100%;
          position: relative;
          box-shadow: 
            0 -20px 80px rgba(124, 92, 252, 0.15), 
            0 0 0 1px rgba(255, 255, 255, 0.05);
          display: flex;
          overflow: hidden;
          animation: float 6s ease-in-out infinite;
        }

        /* Mock UI Internals */
        .mock-sidebar {
          width: 200px;
          border-right: 1px solid var(--wireframe);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(255, 255, 255, 0.01);
        }

        .mock-nav-item {
          height: 8px;
          background: var(--wireframe);
          border-radius: 4px;
          width: 80%;
        }

        .mock-nav-item.active {
          background: rgba(124, 92, 252, 0.3);
          width: 90%;
        }

        .mock-main {
          flex: 1;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .mock-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mock-title {
          height: 12px;
          width: 140px;
          background: var(--text-secondary);
          border-radius: 6px;
          opacity: 0.2;
        }

        .mock-avatars {
          display: flex;
          gap: -8px;
        }

        .mock-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--wireframe);
          border: 2px solid #0A0A0D;
        }

        .mock-board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          flex: 1;
        }

        .mock-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mock-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--wireframe);
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mock-tag {
          width: 40px;
          height: 6px;
          border-radius: 3px;
        }

        .tag-purple { background: var(--accent-purple); opacity: 0.5; }
        .tag-teal { background: var(--accent-teal); opacity: 0.5; }

        .mock-line {
          height: 6px;
          background: var(--wireframe);
          border-radius: 3px;
        }

        @media (max-width: 768px) {
          .huly-nav-links { display: none; }
          .huly-nav { padding: 16px 20px; }
          .hero-headline { font-size: 40px; }
          .hero-content { padding-top: 100px; }
          .mock-sidebar { display: none; }
        }

        @media (max-width: 480px) {
          .cta-secondary { display: none; }
        }
      `}</style>

      {/* 2. Content Layers */}
      <div className="hero-spotlight" />
      <div className="hero-noise" />

      {/* 3. Navigation Bar */}
      <nav className={`huly-nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="huly-nav-logo">Huly</a>
        
        <div className="huly-nav-links">
          {['Features', 'Pricing', 'Community', 'Resources'].map((item) => (
            <a key={item} href="#" className="huly-nav-link">{item}</a>
          ))}
        </div>

        <div className="huly-nav-actions">
          <button className="btn-signin">Sign In</button>
          <button className="btn-cta btn-primary" style={{ padding: '8px 20px' }}>Get Started</button>
        </div>
      </nav>

      {/* 4. Hero Content Block */}
      <main className="hero-content">
        <div className="hero-badge">
          <span>✦</span>
          <span>Open Source · 100% Free</span>
        </div>

        <h1 className="hero-headline">
          Everything App<br />for your teams.
        </h1>

        <p className="hero-subheadline">
          Replace Linear, Jira, Slack, and Notion with a single,<br />
          unified workspace your whole team will love.
        </p>

        <div className="hero-cta-group">
          <button className="cta-primary">Try It Free</button>
          <button className="cta-secondary">See how it works &rarr;</button>
        </div>

        {/* 5. Hero UI Mockup */}
        <div className="hero-mockup-container">
          <div className="hero-mockup">
            <aside className="mock-sidebar">
              <div className="mock-nav-item active" />
              <div className="mock-nav-item" />
              <div className="mock-nav-item" />
              <div className="mock-nav-item" style={{ marginTop: 'auto' }} />
            </aside>
            <section className="mock-main">
              <header className="mock-header">
                <div className="mock-title" />
                <div className="mock-avatars">
                  <div className="mock-avatar" />
                  <div className="mock-avatar" />
                  <div className="mock-avatar" />
                </div>
              </header>
              <div className="mock-board">
                {[1, 2, 3].map((col) => (
                  <div key={col} className="mock-column">
                    {[1, 2].map((card) => (
                      <div key={card} className="mock-card">
                        <div className={`mock-tag ${card % 2 === 0 ? 'tag-purple' : 'tag-teal'}`} />
                        <div className="mock-line" style={{ width: '100%' }} />
                        <div className="mock-line" style={{ width: '70%' }} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HulyHero;
