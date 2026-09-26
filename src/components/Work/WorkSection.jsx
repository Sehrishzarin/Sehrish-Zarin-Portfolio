import React, { useState, useEffect, useRef } from 'react'
import ProjectPanel from './ProjectPanel'
import './WorkSection.css'

const panelsData = [
  {
    id: 'planetarium-management',
    index: '01',
    variant: 'light',
    title: 'Planetarium & Observatory Management',
    category: 'Internship Project — National Center of GIS & Space Applications',
    role: 'Full-Stack Development',
    description:
      'A platform bridging visitor bookings with planetarium and observatory administration. Beyond ticketing, it forecasts planetary visibility and nightly weather conditions to help administrators schedule astronomical events and help visitors choose the best dates to attend. Built during an internship with NCGSA; the organization plans to adopt it into active use.',
    stack: 'React · Python · NASA JPL Horizons API · Skyfield',
    facts:
      'Independent research-driven visibility forecasting · Python microservice for weather/observation conditions · centralized inventory and admin controls',
    sourceUrl: '#',
    imageSrc: '/planetarium-mockup.jpg'
  },
  {
    id: 'event-management',
    index: '02',
    variant: 'dark',
    title: 'Event Management System',
    category: 'Internship Project — National Center of GIS & Space Applications',
    role: 'Full-Stack Development',
    description:
      'A platform simplifying event creation and management through a dynamic, React-based form builder. Instead of fixed registration forms, administrators build custom forms per event, publish them, and manage registrations through one centralized system. Built during an internship with NCGSA; the organization plans to adopt it into active use.',
    stack: 'React · MongoDB · Ant Design',
    facts:
      'Custom form builder (no fixed templates) · centralized registration management · built for institute-wide events',
    sourceUrl: '#',
    imageSrc: '/ems-mockup-dark.jpg'
  },
  {
    id: 'velario',
    index: '03',
    variant: 'light',
    title: 'Velario',
    category: 'Freelance — SaaS Platform',
    role: 'Dashboard Development',
    description:
      'A multi-tenant SaaS platform for real estate and asset agencies. Organizations purchase a portal and assign agents by territory to manage listings and build client relationships. Built the client-relationship management dashboard.',
    stack: 'React · Node.js · Express · MongoDB',
    sourceUrl: undefined,
    liveUrl: undefined,
    imageSrc: '/velario-mockup.jpg'
  },
  {
    id: 'accuprice',
    index: '04',
    variant: 'dark',
    title: 'Accuprice',
    category: 'Freelance — UI/UX Design',
    role: 'UI/UX Design',
    description:
      'A pricing tool built for service electricians, with a library of 1,400+ materials and prebuilt assemblies and flat-rate calculations from real costs, syncing to the invoicing or estimating CRM electricians already use. Designed the landing page, the web portal, and the mobile-responsive experience.',
    stack: 'Figma · React',
    liveUrl: 'https://accupricelists.com/',
    imageSrc: '/accuprice-mockup.jpg'
  },
  {
    id: 'seedsense',
    index: '05',
    variant: 'light',
    title: 'Seedsense',
    category: 'Freelance — Backend Development',
    role: 'Backend Development',
    description:
      'A platform for seed companies to track field trials, manage product entries, and get real-time insights in one place. Built the backend in Node.js.',
    stack: 'Node.js',
    liveUrl: 'https://seedsensesoftware.com/'
  },
  {
    id: 'mediguide',
    index: '06',
    variant: 'dark',
    title: 'MediGuide',
    category: 'Hackathon Build → Startup, in progress — Cross-platform Health App',
    role: 'Full-Stack Development',
    description:
      'A cross-platform healthcare app offering AI-assisted symptom triage, smart doctor scheduling by specialty and availability, and one-tap emergency support that shares critical details with responders. Built with a team at a hackathon and now evolving into a startup.',
    stack: 'React · Capacitor',
    facts:
      'Cross-platform (Android via Capacitor) · plain-language symptom triage · instant specialty-matched scheduling',
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
        {/* Eyebrow label sitting above section */}
        <p className="work-eyebrow">Work</p>
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
