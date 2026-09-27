import React, { useState, useEffect, useRef } from 'react'
import './ProjectPanel.css'

export default function ProjectPanel({
  index,
  timestamp,
  isFeatured = false,
  variant = 'dark',
  title,
  category,
  role,
  description,
  stack,
  facts,
  sourceUrl,
  liveUrl,
  imageSrc,
  images
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (panelRef.current) {
      observer.observe(panelRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Determine if this panel is an even index (02, 04, 06) for mirrored layout
  const isEven = parseInt(index, 10) % 2 === 0

  // Combine images array or single imageSrc
  const allImages = images && images.length > 0 ? images : imageSrc ? [imageSrc] : []
  const currentImage = allImages[activeImageIndex] || null

  const hasImages = allImages.length > 0

  return (
    <div
      ref={panelRef}
      className={`project-panel-wrapper ${isFeatured ? 'featured-wrapper' : ''} ${
        isVisible ? 'panel-visible' : ''
      }`}
    >
      <div className={`project-panel ${variant} ${!hasImages ? 'text-only' : ''}`}>
        <div
          className={`project-panel-inner ${
            hasImages
              ? isFeatured
                ? 'asymmetric-grid-breaker'
                : isEven
                ? 'layout-even'
                : 'layout-odd'
              : 'text-only-inner'
          }`}
        >
          {/* Text Content Column */}
          <div className="panel-text-column">
            <div className="panel-index-row timestamp-motif panel-stagger-1">
              <span className="status-dot" aria-hidden="true" />
              <span className="panel-index">{index}</span>
              {timestamp && <span className="timestamp-mono">[ {timestamp} ]</span>}
            </div>

            <h3 className="panel-title panel-stagger-2">{title}</h3>

            {/* Category & Role Stacked Pair */}
            <div className="panel-meta-pair panel-stagger-3">
              <p className="panel-category">{category}</p>
              {role && <p className="panel-role">{role}</p>}
            </div>

            <p className="panel-description panel-stagger-4">{description}</p>

            {stack && <p className="panel-stack panel-stagger-5">{stack}</p>}

            {facts && <p className="panel-facts panel-stagger-5">{facts}</p>}

            {/* Graceful Link / Offline State */}
            <div className="panel-stagger-6">
              {sourceUrl ? (
                <a
                  href={sourceUrl}
                  className="panel-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source →
                </a>
              ) : liveUrl ? (
                <a
                  href={liveUrl}
                  className="panel-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit site →
                </a>
              ) : (
                <span className="panel-link-offline">
                  Client project — currently offline
                </span>
              )}
            </div>
          </div>

          {/* Screenshot / Multi-Image Column */}
          {hasImages && (
            <div
              className={`panel-image-column panel-stagger-image ${
                isFeatured ? 'asymmetric-image-column' : ''
              }`}
            >
              {isFeatured && (
                <div className="asymmetric-accent-badge">
                  <span className="status-dot pulsing" aria-hidden="true" />
                  <span className="asymmetric-badge-text">Featured Case Study • NCGSA</span>
                </div>
              )}

              <div className="panel-media-container">
                <img
                  src={currentImage}
                  alt={`${title} preview ${activeImageIndex + 1}`}
                  className="panel-image"
                />

                {/* Multi-image thumbnails row if > 1 image */}
                {allImages.length > 1 && (
                  <div className="panel-thumbnails-row">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`panel-thumbnail-btn ${
                          idx === activeImageIndex ? 'active' : ''
                        }`}
                        onClick={() => setActiveImageIndex(idx)}
                        aria-label={`View thumbnail ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="panel-thumbnail-img"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
