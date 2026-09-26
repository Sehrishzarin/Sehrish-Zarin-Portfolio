import React, { useState } from 'react'
import './ProjectPanel.css'

export default function ProjectPanel({
  index,
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

  // Determine if this panel is an even index (02, 04, 06) for mirrored layout
  const isEven = parseInt(index, 10) % 2 === 0

  // Combine images array or single imageSrc
  const allImages = images && images.length > 0 ? images : imageSrc ? [imageSrc] : []
  const currentImage = allImages[activeImageIndex] || null

  const hasImages = allImages.length > 0

  return (
    <div className="project-panel-wrapper">
      <div className={`project-panel ${variant} ${!hasImages ? 'text-only' : ''}`}>
        <div
          className={`project-panel-inner ${
            hasImages
              ? isEven
                ? 'layout-even'
                : 'layout-odd'
              : 'text-only-inner'
          }`}
        >
          {/* Text Content Column */}
          <div className="panel-text-column">
            <span className="panel-index">{index}</span>

            <h3 className="panel-title">{title}</h3>

            {/* Category & Role Stacked Pair */}
            <div className="panel-meta-pair">
              <p className="panel-category">{category}</p>
              {role && <p className="panel-role">{role}</p>}
            </div>

            <p className="panel-description">{description}</p>

            {stack && <p className="panel-stack">{stack}</p>}

            {facts && <p className="panel-facts">{facts}</p>}

            {/* Graceful Link / Offline State */}
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

          {/* Screenshot / Multi-Image Column (Only rendered for visual projects) */}
          {hasImages && (
            <div className="panel-image-column">
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
