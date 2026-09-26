import React, { useEffect, useState, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const [isPointerDevice, setIsPointerDevice] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const dotRef = useRef(null)
  const ringRef = useRef(null)

  // Position references for smooth spring animation
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const animFrameId = useRef(null)

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsPointerDevice(mediaQuery.matches)

    const handleMediaChange = (e) => setIsPointerDevice(e.matches)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])

  useEffect(() => {
    if (!isPointerDevice) return

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)

      // Direct dot transform for 1:1 instant response
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const handleMouseDown = () => setIsMouseDown(true)
    const handleMouseUp = () => setIsMouseDown(false)

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Event delegation for interactive element hover detection
    const handleOver = (e) => {
      const target = e.target
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.panel-link') ||
        target.closest('.panel-thumbnail-btn') ||
        target.closest('.experience-toggle-btn') ||
        target.closest('.contact-link')

      setIsHovered(!!isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    window.addEventListener('mouseover', handleOver, { passive: true })

    // Smooth lerp loop for the trailing ring
    const render = () => {
      const lerpFactor = 0.18 // Smooth responsiveness
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }

      animFrameId.current = requestAnimationFrame(render)
    }

    animFrameId.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleOver)
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [isPointerDevice, isVisible])

  if (!isPointerDevice) return null

  return (
    <div className={`custom-cursor-container ${isVisible ? 'visible' : 'hidden'}`}>
      {/* Outer Spring Ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovered ? 'hovered' : ''} ${
          isMouseDown ? 'active' : ''
        }`}
      />
      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovered ? 'hovered' : ''} ${
          isMouseDown ? 'active' : ''
        }`}
      />
    </div>
  )
}
