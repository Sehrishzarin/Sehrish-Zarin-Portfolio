import React, { useState, useEffect, useRef } from 'react'
import './Capabilities.css'

const capabilitiesData = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description:
      'End-to-end product builds, from database and API design through to the interface people actually use.'
  },
  {
    id: 'devops',
    title: 'DevOps & Architecture',
    description:
      'Setting up systems that stay reliable as a product grows, not just code that works once.'
  },
  {
    id: 'product',
    title: 'Product Building',
    description:
      'Taking a rough idea to something usable, including the decisions in between: what to build first, what to cut, what a user actually needs.'
  },
  {
    id: 'analytics',
    title: 'Research & Analytics',
    description:
      'Using data to inform real decisions rather than treating it as an afterthought.'
  }
]

export default function Capabilities() {
  const [isRevealed, setIsRevealed] = useState(false)
  const sectionRef = useRef(null)
  const introRef = useRef(null)

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

  // Continuous scroll-linked parallax motion (disabled for reduced motion)
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReducedMotion) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current && introRef.current) {
            const rect = sectionRef.current.getBoundingClientRect()
            const viewHeight = window.innerHeight
            const progress = (rect.top - viewHeight / 2) / viewHeight
            const translateY = Math.min(25, Math.max(-25, progress * -35))
            introRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`
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
    <section id="capabilities" className="capabilities-section" ref={sectionRef}>
      <div className={`capabilities-container ${isRevealed ? 'reveal' : ''}`}>
        {/* Left Column: Eyebrow + Intro Sentence with Continuous Parallax */}
        <div className="capabilities-left" ref={introRef}>
          <p className="capabilities-eyebrow timestamp-motif">
            <span className="status-dot" aria-hidden="true" />
            <span>Capabilities</span>
            <span className="timestamp-mono">[ skills • 2026 ]</span>
          </p>
          <h2 className="capabilities-intro">
            Here&apos;s where I&apos;m most useful, whether you&apos;re hiring or building something together.
          </h2>
        </div>

        {/* Right Column: List of items + Closing link */}
        <div className="capabilities-right">
          <ul className="capabilities-list">
            {capabilitiesData.map((item, idx) => (
              <li
                key={item.id}
                className="capabilities-item"
                style={{ transitionDelay: `${idx * 80 + 120}ms` }}
              >
                <div className="capabilities-item-header">
                  <span className="status-dot item-dot" aria-hidden="true" />
                  <h3 className="capabilities-item-title">{item.title}</h3>
                </div>
                <p className="capabilities-item-description">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>

          {/* Closing Line Text Link */}
          <div className="capabilities-closing">
            <a href="#contact" className="capabilities-closing-link">
              Available for freelance projects and full-time roles.{' '}
              <span className="capabilities-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
