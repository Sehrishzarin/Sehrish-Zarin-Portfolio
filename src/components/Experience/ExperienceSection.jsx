import React, { useState } from 'react'
import Experience from './Experience'
import ExperienceTimeline from './ExperienceTimeline'
import './ExperienceSection.css'

export default function ExperienceSection() {
  const [activeView, setActiveView] = useState('list')

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        {/* Header Row: Eyebrow + View Toggle */}
        <div className="experience-header-row">
          <p className="experience-eyebrow timestamp-motif">
            <span className="status-dot" aria-hidden="true" />
            <span>Experience</span>
            <span className="timestamp-mono">[ 2023–present ]</span>
          </p>

          <div className="experience-header-controls">
            {/* Annotation note pointing right towards Timeline option */}
            <div className="experience-annotation">
              <span className="experience-annotation-note">try this</span>
              <svg
                className="experience-arrow-svg"
                width="38"
                height="20"
                viewBox="0 0 38 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 14C14 18 24 14 34 8M34 8L28 7M34 8L31 14"
                  stroke="var(--accent, #e07a5f)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Outline Toggle Pill */}
            <div className="experience-toggle-pill">
              <button
                type="button"
                className={`experience-toggle-btn ${activeView === 'list' ? 'active' : ''}`}
                onClick={() => setActiveView('list')}
              >
                List
              </button>
              <button
                type="button"
                className={`experience-toggle-btn ${activeView === 'timeline' ? 'active' : ''}`}
                onClick={() => setActiveView('timeline')}
              >
                Timeline
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic View Content */}
        {activeView === 'list' ? <Experience /> : <ExperienceTimeline />}
      </div>
    </section>
  )
}
