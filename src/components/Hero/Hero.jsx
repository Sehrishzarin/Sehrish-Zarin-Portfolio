import React, { useState, useEffect } from 'react'
import './Hero.css'

export default function Hero() {
  const [localTime, setLocalTime] = useState('')

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
      setLocalTime(`${timeStr} PKT`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
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

      {/* Main Content Block */}
      <div className="hero-body">
        <div className="hero-content">
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
                  stroke="var(--accent, #8ba888)"
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
          <p className="hero-location">
            Islamabad, Pakistan · {localTime}
          </p>

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
                  stroke="var(--accent, #8ba888)"
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
