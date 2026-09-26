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

  return (
    <section id="capabilities" className="capabilities-section">
      <div
        ref={sectionRef}
        className={`capabilities-container ${isRevealed ? 'reveal' : ''}`}
      >
        {/* Left Column: Eyebrow + Intro Sentence (~40% width) */}
        <div className="capabilities-left">
          <p className="capabilities-eyebrow">Capabilities</p>
          <h2 className="capabilities-intro">
            Here&apos;s where I&apos;m most useful, whether you&apos;re hiring or building something together.
          </h2>
        </div>

        {/* Right Column: List of items + Closing link (~60% width) */}
        <div className="capabilities-right">
          <ul className="capabilities-list">
            {capabilitiesData.map((item, idx) => (
              <li
                key={item.id}
                className="capabilities-item"
                style={{ transitionDelay: `${idx * 60 + 100}ms` }}
              >
                <h3 className="capabilities-item-title">{item.title}</h3>
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
