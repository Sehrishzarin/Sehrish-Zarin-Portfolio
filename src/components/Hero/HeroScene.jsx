import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import './HeroScene.css'

export default function HeroScene() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    // Reduced motion & mobile checks
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    // Dimensions
    const rect = container.getBoundingClientRect()
    const width = Math.max(rect.width || 340, 280)
    const height = Math.max(rect.height || 340, 280)

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 4.5)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Lighting setup for 3D GLB robot model
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xffffff, 3.0)
    mainLight.position.set(5, 8, 5)
    scene.add(mainLight)

    const fillLight = new THREE.DirectionalLight(0x8ba888, 1.5)
    fillLight.position.set(-5, -2, -3)
    scene.add(fillLight)

    let modelMesh = null
    let mixer = null
    const clock = new THREE.Clock()

    // Drag interaction physics state
    let isDragging = false
    let previousPointerX = 0
    let previousPointerY = 0
    let velocityX = 0
    let velocityY = 0

    // Load GLB model from public folder
    const loader = new GLTFLoader()
    loader.load(
      '/pixellabs-robot-character-3317.glb',
      (gltf) => {
        modelMesh = gltf.scene

        // Auto-center geometry box
        const box = new THREE.Box3().setFromObject(modelMesh)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())

        modelMesh.position.x -= center.x
        modelMesh.position.y -= center.y
        modelMesh.position.z -= center.z

        // Normalize scale
        const maxDim = Math.max(size.x, size.y, size.z)
        const targetScale = 2.6 / (maxDim || 1)
        modelMesh.scale.set(targetScale, targetScale, targetScale)

        scene.add(modelMesh)

        // Handle animations if present in GLB
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(modelMesh)
          const action = mixer.clipAction(gltf.animations[0])
          action.play()
        }

        renderer.compile(scene, camera)
      },
      undefined,
      (error) => {
        console.error('[HeroScene] Error loading GLB model:', error)
      }
    )

    // Interactive pointer drag event handlers
    const handlePointerDown = (e) => {
      if (prefersReducedMotion || isMobile) return
      isDragging = true
      previousPointerX = e.clientX
      previousPointerY = e.clientY
      velocityX = 0
      velocityY = 0
      if (canvas) canvas.style.cursor = 'grabbing'
    }

    const handlePointerMove = (e) => {
      if (!isDragging || !modelMesh || prefersReducedMotion || isMobile) return
      const deltaX = e.clientX - previousPointerX
      const deltaY = e.clientY - previousPointerY

      velocityY = deltaX * 0.008
      velocityX = deltaY * 0.008

      modelMesh.rotation.y += velocityY
      modelMesh.rotation.x += velocityX

      // Clamp X tilt so model doesn't flip upside down
      modelMesh.rotation.x = Math.max(-0.6, Math.min(0.6, modelMesh.rotation.x))

      previousPointerX = e.clientX
      previousPointerY = e.clientY
    }

    const handlePointerUp = () => {
      if (isDragging) {
        isDragging = false
        if (canvas) canvas.style.cursor = 'grab'
      }
    }

    canvas.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    // ResizeObserver for dynamic container sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width || container.clientWidth || 340
        const h = entry.contentRect.height || container.clientHeight || 340
        if (w > 0 && h > 0) {
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          renderer.setSize(w, h, false)
        }
      }
    })
    resizeObserver.observe(container)

    // Render loop state
    let isVisible = true
    let animationFrameId = null

    const renderFrame = () => {
      const delta = clock.getDelta()
      if (mixer) mixer.update(delta)

      if (modelMesh && !prefersReducedMotion && !isMobile) {
        if (!isDragging) {
          // Continuous subtle auto-rotation when not dragging
          modelMesh.rotation.y += 0.005

          // Inertia decay after releasing drag
          velocityX *= 0.92
          velocityY *= 0.92
          modelMesh.rotation.x += velocityX
          modelMesh.rotation.y += velocityY

          // Clamp vertical X angle
          modelMesh.rotation.x = Math.max(-0.5, Math.min(0.5, modelMesh.rotation.x))
        }
      }

      renderer.render(scene, camera)
    }

    const animate = () => {
      if (isVisible) {
        renderFrame()
      }
      if (!prefersReducedMotion && !isMobile) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    // Start loop
    if (!prefersReducedMotion && !isMobile) {
      animationFrameId = requestAnimationFrame(animate)
    }

    // IntersectionObserver to pause loop off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          const wasVisible = isVisible
          isVisible = entry.isIntersecting
          if (isVisible && !wasVisible) {
            renderFrame()
          }
        }
      },
      { threshold: 0.01 }
    )
    intersectionObserver.observe(container)

    // Pause animation when tab unfocused
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
      if (isVisible) renderFrame()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Comprehensive cleanup on unmount
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      canvas.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()

      if (modelMesh) {
        modelMesh.traverse((child) => {
          if (child.isMesh) {
            if (child.geometry) child.geometry.dispose()
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(m => m.dispose())
              } else {
                child.material.dispose()
              }
            }
          }
        })
        scene.remove(modelMesh)
      }

      renderer.dispose()
    }
  }, [])

  return (
    <div className="hero-scene-container" ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="hero-scene-canvas" />
    </div>
  )
}
