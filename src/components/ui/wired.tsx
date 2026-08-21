import type { CSSProperties } from "react";

export interface WiredSpinnerProps {
  spinning?: boolean;
  /** Rotation speed in ms per tick (default 1500). */
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Loading spinner.
 *
 * Originally wrapped the `wired-spinner` web component (wired-elements), but
 * that package is incompatible with the installed hachure-fill@0.5.2 (it
 * calls `hf.fillPolygon`, which no longer exists — the spinner threw
 * "fillPolygon is not a function" on every render). roughjs requires
 * hachure-fill ^0.5.2, so the two can't coexist. This CSS ring matches the
 * hand-drawn look closely enough for a transitional loading indicator.
 */
export function WiredSpinner({
  spinning = true,
  className,
  style,
}: WiredSpinnerProps) {
  if (!spinning) return null;
  return (
    <div
      aria-hidden="true"
      className={`animate-spin ${className ?? ""}`}
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: "3px solid rgba(120,120,130,0.25)",
        borderTopColor: "#3b82f6",
        ...style,
      }}
    />
  );
}
