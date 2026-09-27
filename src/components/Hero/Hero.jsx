import React, { useState, useEffect, useRef } from 'react'
import './Hero.css'

const GithubIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export default function Hero() {
  const [localTime, setLocalTime] = useState('')
  const heroContentRef = useRef(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      const timeStr = formatter.format(now)
      setLocalTime(timeStr)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Continuous scroll-linked parallax for Hero content
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (heroContentRef.current) {
            const scrollY = window.scrollY
            if (scrollY <= window.innerHeight) {
              const translateY = scrollY * 0.22
              const opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.85))
              heroContentRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`
              heroContentRef.current.style.opacity = opacity.toString()
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="hero-wrapper">
      {/* Minimal Top Navigation Bar */}
      <nav className="hero-nav" aria-label="Main Navigation">
        <a href="#" className="hero-nav-logo">
          Sehrish Zarin
        </a>
        <ul className="hero-nav-links">
          <li>
            <a href="#work" className="hero-nav-link">
              Work
            </a>
          </li>
          <li>
            <a href="#about" className="hero-nav-link">
              About
            </a>
          </li>
          <li>
            <a href="#experience" className="hero-nav-link">
              Experience
            </a>
          </li>
          <li>
            <a href="#capabilities" className="hero-nav-link">
              Capabilities
            </a>
          </li>
          <li>
            <a href="#contact" className="hero-nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content Block with Scroll Parallax */}
      <div className="hero-body">
        <div className="hero-content" ref={heroContentRef}>
          <p className="hero-eyebrow">
            Software Engineer / Freelancer
          </p>

          <div className="hero-headline-container">
            <h1 className="hero-headline">
              Sehrish Zarin
            </h1>

            <div className="hero-nickname-annotation">
              <svg
                className="hero-nickname-arrow"
                width="32"
                height="20"
                viewBox="0 0 32 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M28 6C20 4 12 8 4 14M4 14L10 12M4 14L6 18"
                  stroke="var(--accent, #C8963E)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hero-nickname-note">or just Zish</span>
            </div>
          </div>

          <p className="hero-subhead">
            Building solid <span className="accent-word">architectures</span> for fast-moving products.
          </p>

          {/* Location + Live Local Time */}
          <div className="hero-location timestamp-motif">
            <span className="status-dot pulsing" aria-hidden="true" />
            <span>Islamabad, PK · {localTime}</span>
          </div>

          {/* Quiet Contact Row + Annotation */}
          <div className="hero-contact-row">
            <div className="hero-contact-links">
              <a href="#contact" className="hero-contact-link">
                Get in touch
              </a>
              <span className="hero-bullet">·</span>
              <a href="mailto:zarinsehrish@gmail.com" className="hero-contact-link">
                zarinsehrish@gmail.com
              </a>
              <span className="hero-bullet">·</span>
              <div className="hero-social-icons">
                <a
                  href="https://github.com/sehrishzarin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                  aria-label="GitHub profile"
                >
                  <GithubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/sehrish-zarin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                  aria-label="LinkedIn profile"
                >
                  <LinkedinIcon />
                </a>
              </div>
            </div>

            <div className="hero-annotation">
              <svg
                className="hero-arrow-svg"
                width="34"
                height="22"
                viewBox="0 0 34 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M30 17C22 21 12 17 6 9M6 9L12 7M6 9L8 14"
                  stroke="var(--accent, #C8963E)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hero-annotation-note">usually reply within a day</span>
            </div>
          </div>

          {/* Stack Line */}
          <div className="hero-stack-row">
            <span className="hero-stack-label">STACK</span>
            <span className="hero-stack-list">
              React · Node.js · Express · MongoDB · Python · FastAPI · Figma
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <span className="scroll-line" />
        <span className="scroll-text">Scroll</span>
      </div>
    </header>
  )
}
