import { type RefObject, useEffect, useState } from "react"

interface Dimensions {
  width: number
  height: number
}

export function useDimensions(
  ref: RefObject<HTMLElement | SVGElement | null>
): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const updateDimensions = () => {
      // getBoundingClientRect works for both HTMLElement and SVGElement
      // (offsetWidth/offsetHeight are HTMLElement-only and return undefined
      // on SVG refs like the elastic-line container).
      const rect = el.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
    }

    // Defer the initial measure one frame so it doesn't force a layout
    // immediately after React's commit (the classic forced-reflow pattern).
    const raf = requestAnimationFrame(updateDimensions)

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      // ResizeObserver callbacks fire after layout has settled — reads here
      // never force a synchronous reflow.
      ro = new ResizeObserver(updateDimensions)
      ro.observe(el)
    }
    window.addEventListener("resize", updateDimensions)

    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      window.removeEventListener("resize", updateDimensions)
    }
  }, [ref])

  return dimensions
}
