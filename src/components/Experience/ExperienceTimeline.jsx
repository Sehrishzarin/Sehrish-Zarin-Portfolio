import React, { useRef, useState, useEffect } from 'react'
import { flatExperiences } from './experienceData'
import './ExperienceTimeline.css'

const MONTH_MAP = {
  jan: 1, january: 1,
  feb: 2, february: 2,
  mar: 3, march: 3,
  apr: 4, april: 4,
  may: 5,
  jun: 6, june: 6,
  jul: 7, july: 7,
  aug: 8, august: 8,
  sep: 9, sept: 9, september: 9,
  oct: 10, october: 10,
  nov: 11, november: 11,
  dec: 12, december: 12
}

export function parseEntryDates(entry) {
  if (entry.startYear && entry.startMonth && entry.endYear && entry.endMonth) {
    return {
      startYear: Number(entry.startYear),
      startMonth: Number(entry.startMonth),
      endYear: Number(entry.endYear),
      endMonth: Number(entry.endMonth)
    }
  }

  const dateStr = entry.date || ''
  const years = (dateStr.match(/\b(20\d\d)\b/g) || []).map(Number)
  const monthMatches = (dateStr.match(/\b[A-Za-z]{3,9}\b/g) || [])
    .map(m => m.toLowerCase())
    .filter(m => MONTH_MAP[m] !== undefined)
    .map(m => MONTH_MAP[m])

  const endYear = years[years.length - 1] || new Date().getFullYear()
  const startYear = years[0] || endYear
  const startMonth = monthMatches[0] || 1
  const endMonth = monthMatches[monthMatches.length - 1] || startMonth

  return { startYear, startMonth, endYear, endMonth }
}

export default function ExperienceTimeline() {
  const containerRef = useRef(null)
  const isMouseDownRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  const originYear = 2024
  const pixelsPerMonth = 55
  const paddingLeft = 60

  const getMonthIndex = (year, month) => (year - originYear) * 12 + (month - 1)

  // Now marker computation
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // 1-indexed
  const currentDate = now.getDate()
  const nowMonthIndex =
    (currentYear - originYear) * 12 + (currentMonth - 1) + currentDate / 30
  const nowLeftPx = paddingLeft + nowMonthIndex * pixelsPerMonth

  // Sort entries chronologically by start date
  const sortedEntries = [...flatExperiences].sort((a, b) => {
    const datesA = parseEntryDates(a)
    const datesB = parseEntryDates(b)
    const startA = getMonthIndex(datesA.startYear, datesA.startMonth)
    const startB = getMonthIndex(datesB.startYear, datesB.startMonth)
    return startA - startB
  })

  // Lane placement & coordinate calculations
  const laneEndPositions = []
  const placedEntries = sortedEntries.map((entry) => {
    const dates = parseEntryDates(entry)
    const startIdx = getMonthIndex(dates.startYear, dates.startMonth)
    const endIdx = getMonthIndex(dates.endYear, dates.endMonth)

    const leftPx = paddingLeft + startIdx * pixelsPerMonth
    const widthPx = entry.isOngoing
      ? Math.max(nowLeftPx - leftPx, 140)
      : Math.max((endIdx - startIdx) * pixelsPerMonth, 120)

    let laneIndex = 0
    while (
      laneEndPositions[laneIndex] !== undefined &&
      laneEndPositions[laneIndex] > leftPx + 2
    ) {
      laneIndex++
    }
    laneEndPositions[laneIndex] = leftPx + widthPx

    return {
      ...entry,
      dates,
      startIdx,
      endIdx,
      leftPx,
      widthPx,
      laneIndex
    }
  })

  // Year Ticks: Earliest year (2024) to currentYear + 1 (2027)
  const endAxisYear = currentYear + 1
  const years = []
  for (let y = originYear; y <= endAxisYear; y++) {
    years.push(y)
  }

  // Canvas Width to fit all years and now marker comfortably
  const totalMonths = (endAxisYear - originYear + 1) * 12
  const totalCanvasWidth = paddingLeft * 2 + totalMonths * pixelsPerMonth

  // Log debug metrics to console
  useEffect(() => {
    console.log('=== EXPERIENCE TIMELINE DEBUG LOGS ===')
    console.log('Origin Year:', originYear, '| Pixels/Month:', pixelsPerMonth)
    console.log('Year Ticks Generated:', years)
    console.log('NOW Marker:', {
      date: now.toISOString().split('T')[0],
      nowMonthIndex,
      nowLeftPx
    })
    console.log('Placed Entries Position Audit:')
    placedEntries.forEach((e) => {
      console.log(
        `- [${e.title} @ ${e.company}]: dates=(${e.dates.startYear}-${e.dates.startMonth} to ${e.dates.endYear}-${e.dates.endMonth}), isOngoing=${Boolean(e.isOngoing)}, startIdx=${e.startIdx}, leftPx=${e.leftPx}px, widthPx=${e.widthPx}px, lane=${e.laneIndex}`
      )
    })
    console.log('=======================================')
  }, [])

  // Initial scroll position: Start at 0 so 2024 and full timeline is visible
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0
    }
  }, [])

  // Mouse Drag-to-Scroll Handlers
  const handleMouseDown = (e) => {
    isMouseDownRef.current = true
    startXRef.current = e.pageX - containerRef.current.offsetLeft
    scrollLeftRef.current = containerRef.current.scrollLeft
    setIsDragging(true)
  }

  const handleMouseMove = (e) => {
    if (!isMouseDownRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startXRef.current) * 1.5
    containerRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUpOrLeave = () => {
    isMouseDownRef.current = false
    setIsDragging(false)
  }

  return (
    <div className="experience-timeline-view">
      <div
        ref={containerRef}
        className={`experience-timeline-scroll-container ${
          isDragging ? 'dragging' : ''
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        <div
          className="experience-timeline-canvas"
          style={{ width: `${totalCanvasWidth}px` }}
        >
          {/* Vertical Year Grid Lines */}
          {years.map((year) => {
            const janLeft =
              paddingLeft + (year - originYear) * 12 * pixelsPerMonth
            return (
              <div
                key={year}
                className="timeline-year-grid-line"
                style={{ left: `${janLeft}px` }}
              />
            )
          })}

          {/* Vertical "NOW" Marker Line */}
          <div
            className="timeline-now-line"
            style={{ left: `${nowLeftPx}px` }}
          >
            <span className="timeline-now-label">now</span>
          </div>

          {/* Timeline Entry Bars */}
          <div className="timeline-bars-container">
            {placedEntries.map((item) => {
              const topPx = 20 + item.laneIndex * 70
              return (
                <div
                  key={item.id}
                  className={`timeline-entry-bar ${item.isOngoing ? 'ongoing' : ''}`}
                  style={{
                    left: `${item.leftPx}px`,
                    width: `${item.widthPx}px`,
                    top: `${topPx}px`
                  }}
                >
                  <span className="timeline-entry-title">{item.title}</span>
                  <span className="timeline-entry-company">
                    {item.company}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Year Axis along the bottom */}
          <div className="timeline-year-axis">
            {years.map((year) => {
              const janLeft =
                paddingLeft + (year - originYear) * 12 * pixelsPerMonth
              return (
                <div
                  key={year}
                  className="timeline-year-tick"
                  style={{ left: `${janLeft}px` }}
                >
                  <span className="timeline-year-label">{year}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Hint Text */}
      <p className="experience-timeline-hint">
        Drag sideways, everything since 2024 is in here.
      </p>
    </div>
  )
}
