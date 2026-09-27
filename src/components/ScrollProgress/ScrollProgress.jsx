import React, { useEffect, useState, useRef } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const thumbRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          if (totalHeight > 0) {
            const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
            setProgress(Math.round(currentProgress))
            if (thumbRef.current) {
              thumbRef.current.style.top = `${currentProgress}%`
            }
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
    <div className="scroll-progress-rail" aria-hidden="true">
      <div className="scroll-progress-line">
        <div ref={thumbRef} className="scroll-progress-thumb" />
      </div>
      <span className="scroll-progress-val">
        {String(progress).padStart(2, '0')}%
      </span>
    </div>
  )
}
