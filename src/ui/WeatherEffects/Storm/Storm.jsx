import { useEffect, useRef } from 'react'
import './Storm.css'

export default function Storm() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let W = 0
    let H = 0
    let drops = []
    let streaks = []
    let flashAlpha = 0

    function initScene() {
      const dpr = window.devicePixelRatio || 1

      const cssW = window.innerWidth
      const cssH = window.innerHeight

      canvas.width = cssW * dpr
      canvas.height = cssH * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      W = cssW
      H = cssH

      drops = []
      streaks = []

      const COUNT = Math.floor(W * 0.28)

      for (let i = 0; i < COUNT; i++) {
        drops.push({
          x: Math.random() * W,
          y: Math.random() * H,
          len: 12 + Math.random() * 20,
          speed: 8 + Math.random() * 10,
          wind: 1.8 + Math.random() * 1.6,
        })
      }

      for (let i = 0; i < 8; i++) {
        streaks.push({
          x: Math.random() * W,
          y: Math.random() * H,
          len: 55 + Math.random() * 70,
          speed: 15 + Math.random() * 20,
          wind: 2 + Math.random() * 1.6,
          opacity: 0.18 + Math.random() * 0.18,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      if (Math.random() < 0.0015) {
        flashAlpha = 1
      }
      if (flashAlpha > 0) {
        ctx.fillStyle = `rgba(255,255,255,${flashAlpha * 0.8})`
        ctx.fillRect(0, 0, W, H)
        flashAlpha -= 0.02
      }

      ctx.lineCap = 'round'
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(255,255,255,0.42)'

      for (let d of drops) {
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x + d.wind * 0.8, d.y + d.len)
        ctx.stroke()

        d.x += d.wind
        d.y += d.speed

        if (d.y > H || d.x > W) {
          d.x = Math.random() * W - 50
          d.y = -25
        }
      }

      for (let s of streaks) {
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`
        ctx.lineWidth = 1.2

        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x + s.wind * 1.4, s.y + s.len)
        ctx.stroke()

        s.x += s.wind
        s.y += s.speed

        if (s.y > H) {
          s.x = Math.random() * W
          s.y = -100
        }
      }

      requestAnimationFrame(draw)
    }

    initScene()
    draw()

    window.addEventListener('resize', initScene)
    return () => window.removeEventListener('resize', initScene)
  }, [])

  return <canvas ref={canvasRef} className="storm-canvas" />
}
