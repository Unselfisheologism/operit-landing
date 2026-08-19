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
    <svg viewBox="0 0 2207 208" className="w-full overflow-visible">
      <path
        id="scroll-path"
        d="M0.257812 54.1707C0.257812 54.1707 332.27 258.365 829.258 194.671C1022.55 169.899 1292.6 78.4697 1536.76 21.6707C1804.19 -40.5439 2206.76 54.1714 2206.76 54.1714"
        fill="none"
      />
    </svg>
  ),
  textProps,
  scrollOffsets = ["0%", "-100%"],
  springOptions = { stiffness: 50, damping: 20, restDelta: 0.001 },
}: TextOnPathScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start end", "end start"],
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
