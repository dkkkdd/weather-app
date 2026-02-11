import { useEffect, useRef } from 'react'
import './Rain.css'

export function Rain({ lightning = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let W = 0
    let H = 0
    let rainDrops = []
    let streaks = []

    function initScene() {
      const dpr = window.devicePixelRatio || 1

      const cssWidth = window.innerWidth
      const cssHeight = window.innerHeight

      canvas.width = cssWidth * dpr
      canvas.height = cssHeight * dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      W = cssWidth
      H = cssHeight

      rainDrops = []
      const COUNT = Math.floor(W * 0.18)

      for (let i = 0; i < COUNT; i++) {
        rainDrops.push({
          x: Math.random() * W,
          y: Math.random() * H,
          len: 14 + Math.random() * 18,
          speed: 6 + Math.random() * 10,
          wind: 0.8 + Math.random() * 0.9,
        })
      }

      streaks = []
      for (let i = 0; i < 6; i++) {
        streaks.push({
          x: Math.random() * W,
          y: Math.random() * H,
          len: 50 + Math.random() * 70,
          speed: 14 + Math.random() * 16,
          wind: 1.2 + Math.random() * 1,
          opacity: 0.18 + Math.random() * 0.15,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      ctx.lineCap = 'round'
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(255,255,255,0.32)'

      for (let d of rainDrops) {
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x + d.wind, d.y + d.len)
        ctx.stroke()

        d.x += d.wind
        d.y += d.speed

        if (d.y > H || d.x > W) {
          d.x = Math.random() * W
          d.y = -20
        }
      }

      for (let s of streaks) {
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`
        ctx.lineWidth = 1.1

        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x + s.wind * 2, s.y + s.len)
        ctx.stroke()

        s.x += s.wind
        s.y += s.speed

        if (s.y > H) {
          s.x = Math.random() * W
          s.y = -80
        }
      }

      requestAnimationFrame(draw)
    }

    initScene()
    draw()

    window.addEventListener('resize', initScene)
    return () => {
      window.removeEventListener('resize', initScene)
    }
  }, [lightning])

  return <canvas ref={canvasRef} className="ultra-rain-canvas" />
}
export default function RainWithClouds() {
  return (
    <div className="weather-layer">
      <div className="cloud-layer layer1" />

      <Rain />
    </div>
  )
}
