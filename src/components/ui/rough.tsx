/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { annotate } from "rough-notation";
import type { Annotation, AnnotationType } from "rough-notation/lib/model";
import rough from "roughjs";
import { roughCheckmark, roughLine, roughRoundedRect } from "drawably";

/**
 * Twent rough layer — hand-drawn annotations & doodles in the site palette:
 *   blue = primary (#3b82f6) · orange = secondary (#f97316) · grey = tertiary (#71717a)
 */
export const ROUGH_COLORS = {
  blue: "#3b82f6",
  orange: "#f97316",
  grey: "#71717a",
  purple: "#a855f7",
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
    // rc.ellipse() renders AND returns the <g>; append it directly.
    const g = rc.ellipse(cx - rx, cy - ry, rx * 2, ry * 2, {
      stroke,
      strokeWidth,
      roughness: 1.2,
      fill,
      fillStyle: "solid",
    });
    svg.appendChild(g);
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

export interface RoughLineProps {
  color?: RoughColor | string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * A short hand-drawn line — replaces the plain `w-8 h-px` section-label
 * dashes with a rough ink stroke.
 */
export function RoughLine({
  color = "orange",
  strokeWidth = 2,
  width = 32,
  height = 8,
  className,
}: RoughLineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const stroke = ROUGH_COLORS[color as RoughColor] ?? color;

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const seed = Math.floor(Math.random() * 1e9);
    el.setAttribute(
      "d",
      roughLine(2, height / 2, width - 2, height / 2, { seed, roughness: 1.2 }),
    );
  }, [width, height]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ flexShrink: 0, display: "inline-block" }}
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

const SVG_NS = "http://www.w3.org/2000/svg";
const SKETCH_COLORS = {
  blue: "#3b82f6",
  orange: "#f97316",
  grey: "#71717a",
  red: "#ef4444",
} as const;

type SketchColor = keyof typeof SKETCH_COLORS;

/**
 * Global hand-drawn card theming: watches for `[data-sketch-card]` containers
 * and draws a rough rounded-rect outline over each one (drawably's rough
 * path generator, static per mount, redrawn on resize). The container keeps
 * all of its own classes/layout — only its CSS border is suppressed.
 *
 * Mount once at the app root (e.g. in App). Cards can opt into a tint via
 * `data-sketch-color="blue" | "orange" | "grey"` (default grey = tertiary).
 */
export function SketchCardProvider() {
  const colorMapRef = useRef(new WeakMap<Element, { svg: SVGSVGElement; path: SVGPathElement; ro: ResizeObserver | null; w: number; h: number }>());

  useEffect(() => {
    const colorMap = colorMapRef.current;
    let mounted = true;

    const draw = (el: HTMLElement, w?: number, h?: number) => {
      let entry = colorMap.get(el);

      // Without explicit dimensions (first draw / mutation-triggered redraw),
      // defer the measurement one frame: reading offsetWidth/offsetHeight
      // synchronously right after a DOM mutation is what forces reflows.
      if (w === undefined || h === undefined) {
        if (el.dataset.sketchPending === "1") return; // already scheduled
        el.dataset.sketchPending = "1";
        requestAnimationFrame(() => {
          delete el.dataset.sketchPending;
          if (!mounted || !el.isConnected) return;
          draw(
            el,
            Math.max(el.offsetWidth || 120, 24),
            Math.max(el.offsetHeight || 40, 24),
          );
        });
        return;
      }

      if (!entry) {
        const svg = document.createElementNS(SVG_NS, "svg");
        svg.setAttribute("class", "rough-card-overlay");
        const path = document.createElementNS(SVG_NS, "path");
        svg.appendChild(path);
        // Make the card its own containing block so the absolutely-positioned
        // overlay anchors to the card, not to a sticky/transform ancestor or
        // the viewport (which drew giant 1440x900 outlines at 0,0).
        if (getComputedStyle(el).position === "static") {
          el.style.position = "relative";
        }
        el.appendChild(svg);
        let ro: ResizeObserver | null = null;
        if (typeof ResizeObserver !== "undefined") {
          // ResizeObserver fires after layout — reading contentRect here never
          // forces a synchronous reflow (unlike the old offsetWidth reads).
          ro = new ResizeObserver((entries) => {
            if (!mounted || !el.isConnected) return;
            const cr = entries[entries.length - 1]?.contentRect;
            if (cr) {
              draw(el, Math.max(cr.width, 24), Math.max(cr.height, 24));
            }
          });
          ro.observe(el);
        }
        entry = { svg, path, ro, w, h };
        colorMap.set(el, entry);
      }
      entry.w = w;
      entry.h = h;
      const seed = Math.floor(Math.random() * 1e9);
      const color =
        SKETCH_COLORS[(el.dataset.sketchColor as SketchColor) ?? "grey"] ??
        "#71717a";
      entry.path.setAttribute(
        "d",
        roughRoundedRect(6, 6, Math.max(w - 12, 10), Math.max(h - 12, 10), 12, {
          seed,
          roughness: 1.15,
        }),
      );
      entry.path.setAttribute("stroke", color);
      entry.path.setAttribute("stroke-width", "2");
      entry.path.setAttribute("fill", "none");
      entry.path.setAttribute("stroke-linecap", "round");
      entry.path.setAttribute("stroke-linejoin", "round");
    };

    const teardown = (el: Element) => {
      const entry = colorMap.get(el);
      if (!entry) return;
      entry.ro?.disconnect();
      entry.svg.remove();
      colorMap.delete(el);
    };

    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-sketch-card]").forEach((el) => {
        if (!colorMap.has(el) && el.isConnected) draw(el);
      });
    };

    scan(document);
    let mo: MutationObserver | null = null;
    if (typeof MutationObserver !== "undefined") {
      mo = new MutationObserver((records) => {
        for (const rec of records) {
          rec.removedNodes.forEach((n) => {
            if (n instanceof Element) {
              if (n.hasAttribute?.("data-sketch-card")) teardown(n);
              n.querySelectorAll?.("[data-sketch-card]").forEach(teardown);
            }
          });
          rec.addedNodes.forEach((n) => {
            if (n instanceof Element) {
              if (n.hasAttribute?.("data-sketch-card") && n.isConnected) draw(n as HTMLElement);
              scan(n);
            }
          });
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      mounted = false;
      mo?.disconnect();
      [...colorMap.keys()].forEach(teardown);
    };
  }, []);

  return null;
}
