import React, { useState, useEffect, useRef } from 'react'
import './Contact.css'

export default function Contact() {
  const [isRevealed, setIsRevealed] = useState(false)
  const sectionRef = useRef(null)

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

  const currentYear = new Date().getFullYear()

  return (
    <section id="contact" className="contact-section">
      <div
        ref={sectionRef}
        className={`contact-container ${isRevealed ? 'reveal' : ''}`}
      >
        <div className="contact-grid">
          {/* Left Column: Availability CTA Statement + Reintroduced Status Marker */}
          <div className="contact-left">
            <p className="contact-eyebrow timestamp-motif">
              <span className="status-dot" aria-hidden="true" />
              <span>Contact</span>
              <span className="timestamp-mono">[ 07 • LET'S TALK ]</span>
            </p>

            <h2 className="contact-statement">
              Open to freelance projects & full-time engineering roles. Let&apos;s build something real together.
            </h2>

            {/* Reintroduced Status Marker Closing Hero Beat */}
            <div className="contact-status-row">
              <span className="status-dot pulsing" aria-hidden="true" />
              <span className="contact-status-text">Actively replying within a day</span>
            </div>
          </div>

          {/* Right Column: Interactive Contact Links with Ochre Dots & Hover Animations */}
          <div className="contact-right">
            <span className="contact-list-label">Direct Channels</span>

            <div className="contact-links-list">
              <a
                href="mailto:zarinsehrish@gmail.com"
                className="contact-link-item"
              >
                <span className="status-dot link-dot" aria-hidden="true" />
                <span className="contact-link-text">zarinsehrish@gmail.com</span>
                <span className="contact-link-arrow">→</span>
              </a>

              <a
                href="https://www.linkedin.com/in/sehrish-zarin/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
              >
                <span className="status-dot link-dot" aria-hidden="true" />
                <span className="contact-link-text">linkedin.com/in/sehrish-zarin</span>
                <span className="contact-link-arrow">↗</span>
              </a>

              <a
                href="https://github.com/sehrishzarin"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
              >
                <span className="status-dot link-dot" aria-hidden="true" />
                <span className="contact-link-text">github.com/sehrishzarin</span>
                <span className="contact-link-arrow">↗</span>
              </a>
            </div>

            {/* Dynamic Closing Line */}
            <div className="contact-closing-line timestamp-motif">
              <span className="status-dot pulsing" aria-hidden="true" />
              <span>Sehrish Zarin, {currentYear}, Islamabad</span>
              <span className="timestamp-tag">• online & available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
