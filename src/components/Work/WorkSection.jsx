import React, { useState, useEffect, useRef } from 'react'
import ProjectPanel from './ProjectPanel'
import './WorkSection.css'

const panelsData = [
  {
    id: 'planetarium-management',
    index: '01',
    timestamp: '2025 • NCGSA',
    variant: 'light',
    isFeatured: true, // Signature broken-grid layout
    title: 'Planetarium & Observatory Management',
    category: 'Internship Project — National Center of GIS & Space Applications',
    role: 'Full-Stack Development',
    description:
      'Built for the National Center of GIS & Space Applications to handle real telescope visitor bookings. Instead of just selling tickets, I wired it up to NASA JPL data and weather microservices so staff actually know when night skies will be clear before scheduling public viewing nights.',
    stack: 'React · Python · NASA JPL Horizons API · Skyfield',
    facts:
      'Live visibility forecasting · Python weather microservice · Adopted for active institute use',
    sourceUrl: '#',
    imageSrc: '/planetarium-mockup.jpg'
  },
  {
    id: 'event-management',
    index: '02',
    timestamp: '2025 • NCGSA',
    variant: 'dark',
    title: 'Event Management System',
    category: 'Internship Project — National Center of GIS & Space Applications',
    role: 'Full-Stack Development',
    description:
      'NCGSA kept needing completely different registration fields for every workshop and symposium. I built a dynamic form builder so organizers could create and publish custom registration flows on the fly without asking a developer to tweak schema every week.',
    stack: 'React · MongoDB · Ant Design',
    facts:
      'Zero fixed templates · Custom form builder · Centralized registration control',
    sourceUrl: '#',
    imageSrc: '/ems-mockup-dark.jpg'
  },
  {
    id: 'velario',
    index: '03',
    timestamp: '2025 • Client',
    variant: 'light',
    title: 'Velario',
    category: 'Freelance — SaaS Platform',
    role: 'Dashboard Development',
    description:
      'A multi-tenant SaaS for real estate agencies juggling territory agents and thousands of property listings. I built the CRM dashboard where agents actually track leads, so closing deals feels straightforward rather than buried under spreadsheet tabs.',
    stack: 'React · Node.js · Express · MongoDB',
    sourceUrl: undefined,
    liveUrl: undefined,
    imageSrc: '/velario-mockup.jpg'
  },
  {
    id: 'accuprice',
    index: '04',
    timestamp: '2026 • Production',
    variant: 'dark',
    title: 'Accuprice',
    category: 'Freelance — UI/UX Design',
    role: 'UI/UX Design',
    description:
      'Electricians usually lose money guessing job estimates on sticky notes. I designed the web portal and mobile experience around 1,400+ real material costs so contractors can calculate quick, profitable flat-rate quotes right from their truck.',
    stack: 'Figma · React',
    liveUrl: 'https://accupricelists.com/',
    imageSrc: '/accuprice-mockup.jpg'
  },
  {
    id: 'seedsense',
    index: '05',
    timestamp: '2025 • Production',
    variant: 'light',
    title: 'Seedsense',
    category: 'Freelance — Backend Development',
    role: 'Backend Development',
    description:
      'Agricultural trial data is usually scattered across field notebooks and messy CSVs. I architected the Node.js backend to sync field trial records, batch product entries, and serve fast real-time analytics for seed teams out in the field.',
    stack: 'Node.js · Express · MongoDB',
    liveUrl: 'https://seedsensesoftware.com/',
    imageSrc: '/seedsense-mockup.jpg'
  },
  {
    id: 'mediguide',
    index: '06',
    timestamp: '2026 • Startup',
    variant: 'dark',
    title: 'MediGuide',
    category: 'Hackathon Build → Startup, in progress — Cross-platform Health App',
    role: 'Full-Stack Development',
    description:
      'Started as a weekend hackathon project that we are now spinning into a startup. It cuts through healthcare panic with plain-language symptom triage, direct doctor scheduling by specialty, and one-tap emergency dispatch that sends vital info to responders immediately.',
    stack: 'React · Capacitor',
    facts:
      'Android via Capacitor · Plain-language symptom triage · Specialty matching',
    sourceUrl: '#',
    imageSrc: '/mediguide-mockup.jpg'
  }
]

export default function WorkSection() {
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
    
    const updateMediaMatch = () => {
      setIsDesktop(mediaQuery.matches)
    }
    
    updateMediaMatch()
    mediaQuery.addEventListener('change', updateMediaMatch)

    return () => mediaQuery.removeEventListener('change', updateMediaMatch)
  }, [])

  useEffect(() => {
    if (!isDesktop) {
      if (trackRef.current) {
        trackRef.current.style.transform = 'none'
      }
      return
    }

    let ticking = false

    const calculateScrollProgress = () => {
      if (!wrapperRef.current || !trackRef.current) return

      const rect = wrapperRef.current.getBoundingClientRect()
      const scrollableDist = rect.height - window.innerHeight

      if (scrollableDist <= 0) return

      // Progress normalized from 0 to 1
      const rawProgress = -rect.top / scrollableDist
      const progress = Math.min(Math.max(rawProgress, 0), 1)

      // Translate track horizontally across 500vw (5 panel lengths for 6 panels)
      const translateX = -progress * (100 * (panelsData.length - 1))
      trackRef.current.style.transform = `translate3d(${translateX}vw, 0, 0)`
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateScrollProgress()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    calculateScrollProgress()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [isDesktop])

  return (
    <section id="work" className="work-section">
      <div className="work-container">
        {/* Eyebrow label sitting above section with Timestamp Motif */}
        <p className="work-eyebrow timestamp-motif">
          <span className="status-dot" aria-hidden="true" />
          <span>Work</span>
          <span className="timestamp-mono">[ 01–06 • 2024–2026 ]</span>
        </p>
      </div>

      {/* Desktop Pinned Horizontal Drawer / Mobile Stack Outer Wrapper */}
      <div
        className="work-outer-wrapper"
        ref={wrapperRef}
        style={isDesktop ? { height: `${panelsData.length * 100}vh` } : {}}
      >
        <div className="work-sticky-viewport">
          <div
            className="work-drawer-track"
            ref={trackRef}
            style={isDesktop ? { width: `${panelsData.length * 100}vw` } : {}}
          >
            {panelsData.map((panel) => (
              <ProjectPanel
                key={panel.id}
                index={panel.index}
                timestamp={panel.timestamp}
                isFeatured={panel.isFeatured}
                variant={panel.variant}
                title={panel.title}
                category={panel.category}
                role={panel.role}
                description={panel.description}
                stack={panel.stack}
                facts={panel.facts}
                sourceUrl={panel.sourceUrl}
                liveUrl={panel.liveUrl}
                imageSrc={panel.imageSrc}
                images={panel.images}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
