import React, { useState, useEffect, useRef } from 'react'
import './About.css'

export default function About() {
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about-section">
      <div
        ref={sectionRef}
        className={`about-container ${isRevealed ? 'reveal' : ''}`}
      >
        <div className="about-grid">
          {/* Left Column: Eyebrow + Statement */}
          <div className="about-left">
            <p className="about-eyebrow">About</p>
            <p className="about-statement">
              I'm a software engineer and product builder based in Islamabad, working
              across full-stack development, DevOps, and applied research. I like
              taking ideas from a rough concept to something people actually use,
              whether that means architecting a backend, shaping an interface, or
              digging into data to make a better decision. Most of what I build starts
              as a real problem someone on a team was stuck on.
            </p>
          </div>

          {/* Right Column: Currently info + Focus areas */}
          <div className="about-right">
            <div className="about-currently">
              <span className="about-label">Currently</span>
              <span className="about-value">
                BS Computer Science, Virtual University of Pakistan.
              </span>
            </div>

            <div className="about-focus-block">
              <span className="about-label">Focus Areas</span>
              <ul className="about-focus-list">
                <li className="about-focus-item">Full-Stack Development</li>
                <li className="about-focus-item">DevOps & Cloud Architecture</li>
                <li className="about-focus-item">Product Building</li>
                <li className="about-focus-item">Applied Research & Analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
