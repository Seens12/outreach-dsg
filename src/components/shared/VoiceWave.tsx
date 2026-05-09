'use client'

import { useRef, useEffect } from 'react'

/**
 * Canvas-based voice wave animation that fills the full container width.
 * Bars are distributed edge-to-edge — no centering with side margins.
 */
export function VoiceWave({ analyser, isActive }: { analyser: AnalyserNode | null; isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number>(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Measure container and set canvas size
    const measure = () => {
      const rect = container.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      sizeRef.current = { w: rect.width, h: rect.height }
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Observe container size changes
    const ro = new ResizeObserver(() => measure())
    ro.observe(container)

    // Initial measure with a small delay to ensure layout is settled
    const t0 = setTimeout(measure, 10)
    const t1 = setTimeout(measure, 100)

    const barWidth = 2.5
    const gap = 3.5
    const maxBarHeight = 20

    let time = 0

    const draw = () => {
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) {
        time++
        animFrameRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, w, h)

      // Dynamic bar count based on container width
      const barCount = Math.max(8, Math.floor((w + gap) / (barWidth + gap)))
      const centerY = h / 2
      const centerX = barCount / 2

      let dataArray: Uint8Array | null = null
      let hasRealData = false

      if (analyser && isActive) {
        dataArray = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(dataArray)
        for (let i = 0; i < Math.min(20, dataArray.length); i++) {
          if (dataArray[i] > 5) {
            hasRealData = true
            break
          }
        }
      }

      // Spread bars from edge to edge
      const startX = 0

      for (let i = 0; i < barCount; i++) {
        const x = startX + i * (barWidth + gap)
        let barHeight: number

        if (hasRealData && dataArray) {
          const dataIndex = Math.floor((i / barCount) * (dataArray.length * 0.6))
          const value = dataArray[dataIndex] || 0
          barHeight = Math.max(3, (value / 255) * maxBarHeight)
        } else {
          const wave = Math.sin((time * 0.04) + (i * 0.3)) * 0.5 + 0.5
          const wave2 = Math.sin((time * 0.025) + (i * 0.15)) * 0.3 + 0.5
          barHeight = Math.max(3, (wave * 0.6 + wave2 * 0.4) * maxBarHeight * 0.6)
        }

        const distanceFromCenter = Math.abs(i - centerX) / centerX
        const alpha = 0.3 + (1 - distanceFromCenter) * 0.5
        ctx.fillStyle = `rgba(13, 13, 13, ${alpha})`

        const halfBar = barHeight / 2
        const radius = Math.min(1.5, halfBar)
        ctx.beginPath()
        ctx.roundRect(x, centerY - halfBar, barWidth, barHeight, radius)
        ctx.fill()
      }

      time++
      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      clearTimeout(t0)
      clearTimeout(t1)
      ro.disconnect()
    }
  }, [analyser, isActive])

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
