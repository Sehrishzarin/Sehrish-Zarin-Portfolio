import React, { useState, useEffect, useRef } from 'react'
import { experiencesByYear } from './experienceData'
import './Experience.css'

function YearGroup({ group }) {
  const [isRevealed, setIsRevealed] = useState(false)
  const groupRef = useRef(null)

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

    if (groupRef.current) {
      observer.observe(groupRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={groupRef}
      className={`experience-year-group ${isRevealed ? 'reveal' : ''}`}
    >
      <div className="experience-year-header">
        <h3 className="experience-year-label">{group.year}</h3>
        <div className="experience-year-divider" />
      </div>

      <div className="experience-year-entries">
        {group.entries.map((item) => (
          <div key={item.id} className="experience-row">
            <div className="experience-date-col">
              <span className="experience-date">{item.date}</span>
            </div>

            <div className="experience-content">
              <h4 className="experience-heading">
                <span className="experience-title">{item.title}</span>
                <span className="experience-separator">—</span>
                <span className="experience-company">{item.company}</span>
              </h4>

              <p className="experience-context">{item.context}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <div className="experience-groups-container">
      {experiencesByYear.map((group) => (
        <YearGroup key={group.year} group={group} />
      ))}
    </div>
  )
}
