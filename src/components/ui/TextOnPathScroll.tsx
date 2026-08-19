"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type SpringOptions,
} from "motion/react";
import { cn } from "../../lib/utils";

interface TextOnPathScrollProps {
  text?: string;
  className?: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  path?: React.ReactNode;
  textProps?: React.SVGProps<SVGTextElement>;
  scrollOffsets?: [number | string, number | string];
  springOptions?: SpringOptions;
}

export default function TextOnPathScroll({
  text = "why use your phone when ai can use it for you? • ",
  className,
  scrollContainerRef,
  path = (
    <svg viewBox="0 0 8000 208" className="w-full overflow-visible">
      <path
        id="scroll-path"
        d="M0 100C500 200, 1000 0, 1500 100C2000 200, 2500 0, 3000 100C3500 200, 4000 0, 4500 100C5000 200, 5500 0, 6000 100C6500 200, 7000 0, 7500 100C8000 200, 8500 0, 9000 100C9500 200, 10000 0, 10500 100"
        fill="none"
      />
    </svg>
  ),
  textProps,
  scrollOffsets = [2500, -8000],
  springOptions = { stiffness: 50, damping: 20, restDelta: 0.001 },
}: TextOnPathScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, springOptions);

  const startOffset = useTransform(smoothProgress, [0, 1], scrollOffsets);

  const svgElement = path as React.ReactElement<React.SVGProps<SVGSVGElement>>;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {React.cloneElement(svgElement, {
          className: cn(svgElement.props.className, "w-full overflow-visible"),
          children: (
            <>
              {svgElement.props.children}
              <text
                fill="currentColor"
                fontWeight="900"
                className="tracking-tighter text-neutral-900 uppercase dark:text-white"
                fontSize="96"
                {...textProps}
              >
                <motion.textPath href="#scroll-path" startOffset={startOffset}>
                  {text}
                </motion.textPath>
              </text>
            </>
          ),
        })}
      </div>
    </div>
  );
}
