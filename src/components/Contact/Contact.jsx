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
          observer.disconnect()
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
        {/* Eyebrow */}
        <p className="contact-eyebrow">Contact</p>

        {/* Statement Line */}
        <h2 className="contact-statement">
          Open to freelance work and full-time roles. Reach out.
        </h2>

        {/* Plain Text Links */}
        <div className="contact-links">
          <a
            href="mailto:zarinsehrish@gmail.com"
            className="contact-link"
          >
            zarinsehrish@gmail.com
          </a>

          <a
            href="https://www.linkedin.com/in/sehrish-zarin/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            linkedin.com/in/sehrish-zarin
          </a>

          <a
            href="https://github.com/sehrishzarin"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            github.com/sehrishzarin
          </a>
        </div>

        {/* Dynamic Closing Line */}
        <p className="contact-closing">
          Sehrish Zarin, {currentYear}, Islamabad.
        </p>
      </div>
    </section>
  )
}
