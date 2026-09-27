import React, { useState, useEffect, useRef } from 'react'
import './About.css'

export default function About() {
  const [isRevealed, setIsRevealed] = useState(false)
  const sectionRef = useRef(null)
  const rightColRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Continuous scroll-linked parallax for the right column (disabled on reduced motion)
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current && rightColRef.current) {
            const rect = sectionRef.current.getBoundingClientRect()
            const viewHeight = window.innerHeight
            const progress = (rect.top - viewHeight / 2) / viewHeight
            const translateY = Math.min(20, Math.max(-20, progress * -30))
            rightColRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className={`about-container ${isRevealed ? 'reveal' : ''}`}>
        <div className="about-grid">
          {/* Left Column: Eyebrow + Statement + Standalone Quote + Work Link */}
          <div className="about-left">
            <p className="about-eyebrow timestamp-motif">
              <span className="status-dot" aria-hidden="true" />
              <span>About</span>
              <span className="timestamp-mono">[ bio • 2026 ]</span>
            </p>

            <p className="about-statement">
              I'm a software engineer and product builder based in Islamabad, working
              across full-stack development, DevOps, and applied research. I like
              taking ideas from a rough concept to something people actually use,
              whether that means architecting a backend, shaping an interface, or
              digging into data to make a better decision.
            </p>

            {/* Standalone Display Quote in Ochre Accent */}
            <div className="about-quote-container">
              <span className="about-quote-mark" aria-hidden="true">“</span>
              <h3 className="about-display-quote">
                Most of what I build starts as a real problem someone on a team was stuck on.
              </h3>
            </div>

            {/* Subtitle Closing Link to Work Section */}
            <div className="about-left-closing">
              <a href="#work" className="about-work-link">
                See the work <span className="about-arrow">↓</span>
              </a>
            </div>
          </div>

          {/* Right Column: Tightened Stat Card + Education & Focus Areas */}
          <div className="about-right" ref={rightColRef}>
            {/* Stat Card */}
            <div className="about-stats-card">
              <div className="about-stats">
                <div className="about-stat-item">
                  <span className="about-stat-number">12+</span>
                  <span className="about-stat-label">Projects delivered</span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-number">2+</span>
                  <span className="about-stat-label">Years building software</span>
                </div>
              </div>
            </div>

            {/* Connected Secondary Block: Education & Focus Areas */}
            <div className="about-secondary">
              <div className="about-education">
                <span className="about-label timestamp-motif">
                  <span className="status-dot" aria-hidden="true" />
                  <span>Education</span>
                </span>
                <span className="about-value">
                  BS Computer Science, Virtual University of Pakistan — Graduated Sept 2026.
                </span>
              </div>

              <div className="about-focus-block">
                <span className="about-label">Focus Areas</span>
                <ul className="about-focus-list">
                  <li className="about-focus-item">
                    <span className="status-dot ochre-bullet" aria-hidden="true" />
                    <span>Full-Stack Development</span>
                  </li>
                  <li className="about-focus-item">
                    <span className="status-dot ochre-bullet" aria-hidden="true" />
                    <span>DevOps & Cloud Architecture</span>
                  </li>
                  <li className="about-focus-item">
                    <span className="status-dot ochre-bullet" aria-hidden="true" />
                    <span>Product Building</span>
                  </li>
                  <li className="about-focus-item">
                    <span className="status-dot ochre-bullet" aria-hidden="true" />
                    <span>Applied Research & Analytics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
