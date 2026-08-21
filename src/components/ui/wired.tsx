import { createElement } from "react";
import type { CSSProperties } from "react";
import "wired-elements/lib/wired-spinner.js";

export interface WiredSpinnerProps {
  spinning?: boolean;
  /** Rotation speed in ms per tick (default 1500). */
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Hand-drawn loading spinner (wired-elements). Rendered via createElement so
 * no custom-element JSX typings are needed.
 */
export function WiredSpinner({
  spinning = true,
  duration = 1500,
  className,
  style,
}: WiredSpinnerProps) {
  return createElement("wired-spinner", { spinning, duration, className, style });
}
