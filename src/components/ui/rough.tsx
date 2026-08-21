/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { annotate } from "rough-notation";
import type { Annotation, AnnotationType } from "rough-notation/lib/model";
import rough from "roughjs";
import { roughCheckmark } from "drawably";

/**
 * Twent rough layer — hand-drawn annotations & doodles in the site palette:
 *   blue = primary (#3b82f6) · orange = secondary (#f97316) · grey = tertiary (#71717a)
 */
export const ROUGH_COLORS = {
  blue: "#3b82f6",
  orange: "#f97316",
  grey: "#71717a",
} as const;

export type RoughColor = keyof typeof ROUGH_COLORS;

export interface RoughAnnotationProps {
  /** Text (or nodes) being annotated — rendered inside a <span>. */
  text: ReactNode;
  /** underline | highlight | circle | box | strike-through */
  type?: AnnotationType;
  color?: RoughColor | string;
  strokeWidth?: number;
  padding?: number | [number, number];
  iterations?: number;
  animate?: boolean;
  /** ms delay before the annotation draws (default 0). */
  delay?: number;
  /** When false the annotation stays hidden; flip to true (e.g. on inView) to draw it. */
  show?: boolean;
  multiline?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Hand-drawn text annotation (rough-notation). Creates the annotation on
 * mount and draws it when `show` becomes true — pass `show={inView}` for
 * scroll-triggered sections or omit it for above-the-fold text.
 */
export function RoughAnnotation({
  text,
  type = "underline",
  color = "orange",
  strokeWidth = 2,
  padding = 3,
  iterations = 2,
  animate = true,
  delay = 0,
  show = true,
  multiline = false,
  className,
  style,
}: RoughAnnotationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const annRef = useRef<Annotation | null>(null);
  const shownRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ann = annotate(el, {
      type,
      color: ROUGH_COLORS[color as RoughColor] ?? color,
      strokeWidth,
      padding,
      iterations,
      animate,
      animationDelay: delay,
      multiline,
    });
    annRef.current = ann;
    shownRef.current = false;
    return () => {
      ann.remove();
      annRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, color, strokeWidth, iterations, animate, multiline, delay]);

  useEffect(() => {
    const ann = annRef.current;
    if (!ann) return;
    if (show && !shownRef.current) {
      ann.show();
      shownRef.current = true;
    } else if (!show && shownRef.current) {
      ann.hide();
      shownRef.current = false;
    }
  }, [show]);

  return (
    <span ref={ref} className={className} style={style}>
      {text}
    </span>
  );
}

export interface RoughCheckProps {
  color?: RoughColor | string;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * Hand-drawn checkmark (drawably's roughCheckmark path, drawn in an effect so
 * each mount gets a fresh seed).
 */
export function RoughCheck({
  color = "orange",
  size = 14,
  strokeWidth = 2.5,
  className,
}: RoughCheckProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const stroke = ROUGH_COLORS[color as RoughColor] ?? color;

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const seed = Math.floor(Math.random() * 1e9);
    el.setAttribute(
      "d",
      roughCheckmark(1.5, 2.5, size - 3, size - 4.5, {
        seed,
        roughness: 1.1,
      }),
    );
  }, [size]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <path
        ref={pathRef}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface RoughEllipseProps {
  /** Rough ellipse drawn inside the svg (rx, ry in viewBox units). */
  rx?: number;
  ry?: number;
  color?: RoughColor | string;
  strokeWidth?: number;
  fill?: string;
  viewBox?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * A rough hand-drawn ellipse via roughjs (e.g. circling a badge, icon, or stat).
 * The svg is empty until the effect draws into it.
 */
export function RoughEllipse({
  rx = 20,
  ry = 20,
  color = "orange",
  strokeWidth = 2,
  fill = "transparent",
  viewBox,
  className,
  style,
}: RoughEllipseProps) {
  const ref = useRef<SVGSVGElement>(null);
  const stroke = ROUGH_COLORS[color as RoughColor] ?? color;
  const vb = viewBox ?? `0 0 ${rx * 2 + 8} ${ry * 2 + 8}`;
  const cx = rx + 4;
  const cy = ry + 4;

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    svg.replaceChildren();
    const rc = rough.svg(svg);
    const drawable = rc.ellipse(cx, cy, rx, ry, {
      stroke,
      strokeWidth,
      roughness: 1.2,
      fill,
      fillStyle: "solid",
    });
    rc.draw(drawable);
  }, [rx, ry, stroke, strokeWidth, fill, cx, cy]);

  return (
    <svg
      ref={ref}
      viewBox={vb}
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    />
  );
}
