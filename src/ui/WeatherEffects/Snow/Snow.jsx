import { useEffect, useRef } from 'react'
import './Snow.css'

export default function Snow() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let W = 0
    let H = 0
    let flakes = []

    function initScene() {
      const dpr = window.devicePixelRatio || 1

      const cssW = window.innerWidth
      const cssH = window.innerHeight

      canvas.width = cssW * dpr
      canvas.height = cssH * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      W = cssW
      H = cssH

      flakes = []
      const COUNT = Math.floor(W * 0.07)

      for (let i = 0; i < COUNT; i++) {
        flakes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 1 + Math.random() * 1.2,
          speed: 0.35 + Math.random() * 0.9,
          drift: 0.15 + Math.random() * 0.25,
          phase: Math.random() * 360,
          alpha: 0.35 + Math.random() * 0.2,
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      for (let f of flakes) {
        const wobble = Math.sin((f.phase += 0.0035)) * f.drift

        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${f.alpha})`
        ctx.arc(f.x + wobble, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()

        f.y += f.speed

        if (f.y > H + 12) {
          f.y = -5
          f.x = Math.random() * W
        }
      }

      requestAnimationFrame(draw)
    }

    initScene()
    draw()

    window.addEventListener('resize', initScene)
    return () => window.removeEventListener('resize', initScene)
  }, [])

  return <canvas ref={canvasRef} className="snow-canvas" />
}
