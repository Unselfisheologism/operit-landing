
"use client"

import { createContext, useContext, useRef, type HTMLAttributes, type PropsWithChildren } from "react"
import { motion, useScroll, useTransform, type MotionValue, type UseScrollOptions } from "motion/react"

function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

interface StackingCardsProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  scrollOptions?: UseScrollOptions
  scaleMultiplier?: number
  totalCards: number
}

interface StackingCardItemProps extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {
  index: number
  topPosition?: string
}

export default function StackingCards({
  children,
  className,
  scrollOptions,
  scaleMultiplier,
  totalCards,
  ...props
}: StackingCardsProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    ...scrollOptions,
    target: targetRef,
  })

  return (
    <StackingCardsContext.Provider value={{ progress: scrollYProgress, scaleMultiplier, totalCards }}>
      <div className={cn("relative", className)} ref={targetRef} {...props}>
        {children}
      </div>
    </StackingCardsContext.Provider>
  )
}

const StackingCardItem = ({ index, topPosition, className, children, ...props }: StackingCardItemProps) => {
  const { progress, scaleMultiplier, totalCards = 0 } = useStackingCardsContext()
  const scaleTo = 1 - (totalCards - index) * (scaleMultiplier ?? 0.03)
  const rangeStart = index === 0 ? 0 : index * (1 / totalCards)
  const scale = useTransform(progress, [rangeStart, 1], [1, scaleTo])

  return (
    <div className={cn("h-screen sticky top-0 w-full overflow-hidden", className)} {...props}>
      <motion.div className="absolute inset-0" style={{ scale }}>
        {children}
      </motion.div>
    </div>
  )
}

const StackingCardsContext = createContext<{
  progress: MotionValue<number>
  scaleMultiplier?: number
  totalCards?: number
} | null>(null)

export const useStackingCardsContext = () => {
  const context = useContext(StackingCardsContext)
  if (!context) throw new Error("StackingCardItem must be used within StackingCards")
  return context
}

export { StackingCardItem }
