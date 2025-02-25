// components/AnimatedBackground.tsx
"use client"

import { useEffect, useRef } from "react"

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create a non-null alias for the context
    const nonNullCtx: CanvasRenderingContext2D = ctx

    let animationFrameId: number

    const resizeCanvas = () => {
      const currentCanvas = canvasRef.current
      if (!currentCanvas) return
      currentCanvas.width = window.innerWidth
      currentCanvas.height = window.innerHeight
    }

    resizeCanvas()

    const circles: Circle[] = []
    const colors = ["#FF6600", "#003366", "#FFA500", "#0066CC"]

    class Circle {
      x: number
      y: number
      radius: number
      dx: number
      dy: number
      color: string

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x
        this.y = y
        this.radius = radius
        this.dx = (Math.random() - 0.5) * 2
        this.dy = (Math.random() - 0.5) * 2
        this.color = color
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
      }

      update(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy
        }

        this.x += this.dx
        this.y += this.dy

        this.draw(ctx)
      }
    }

    for (let i = 0; i < 15; i++) {
      const radius = Math.random() * 100 + 50
      const x = Math.random() * (canvas.width - radius * 2) + radius
      const y = Math.random() * (canvas.height - radius * 2) + radius
      const color = colors[Math.floor(Math.random() * colors.length)]
      circles.push(new Circle(x, y, radius, color))
    }

    function animate() {
      const currentCanvas = canvasRef.current
      if (!currentCanvas) return

      animationFrameId = requestAnimationFrame(animate)
      nonNullCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height)

      circles.forEach((circle) => {
        circle.update(nonNullCtx, currentCanvas)
      })
    }

    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full opacity-20"
      style={{ filter: "blur(50px)" }}
    />
  )
}

export default AnimatedBackground
