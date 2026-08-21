import { type RefObject, useEffect, useState } from "react"

export const useMousePosition = (
  containerRef?: RefObject<HTMLElement | SVGElement | null>
) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Reading getBoundingClientRect() on every mousemove forces a synchronous
    // reflow whenever styles are dirty. Cache the rect and refresh it only on
    // resize; also coalesce setState to one update per animation frame.
    let cachedRect: { left: number; top: number } | null = null
    const refreshRect = () => {
      cachedRect = containerRef?.current?.getBoundingClientRect() ?? null
    }
    refreshRect()

    let rafId = 0
    const updatePosition = (x: number, y: number) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        if (containerRef && containerRef.current) {
          if (!cachedRect) cachedRect = containerRef.current.getBoundingClientRect()
          setPosition({ x: x - cachedRect.left, y: y - cachedRect.top })
        } else {
          setPosition({ x, y })
        }
      })
    }

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY)
    }

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0]
      updatePosition(touch.clientX, touch.clientY)
    }

    // Listen for both mouse and touch events
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("resize", refreshRect)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("resize", refreshRect)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [containerRef])

  return position
}
