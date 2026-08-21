/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef } from "react";
import type { ComponentProps } from "react";
import {
  DrawablyButton,
  DrawablyCard,
  DrawablyCheckbox,
  DrawablyDivider,
  DrawablyInput,
  DrawablyRadio,
  DrawablyToggle,
} from "drawably/react";
import { drawablyButton } from "drawably";

/**
 * Twent drawably theme — hand-drawn controls in the site palette:
 *   blue   = primary   (#3b82f6, matches --color-blue-500)
 *   orange = secondary (#f97316, matches --color-orange-500)
 *   grey   = tertiary  (#71717a, matches --color-zinc-500)
 *
 * Blue is the CSS-variable default (see index.css `--drawably-stroke`), so
 * blue controls inherit the theme and adapt to dark mode automatically;
 * orange/grey pass explicit inline values.
 */
export const PALETTE = {
  blue: undefined,
  orange: { stroke: "#f97316", fill: "#f97316" },
  grey: { stroke: "#71717a", fill: "#71717a" },
} as const;

export type PaletteColor = keyof typeof PALETTE;

function paletteProps(color: PaletteColor) {
  return color === "blue" ? {} : PALETTE[color];
}

type ButtonProps = ComponentProps<typeof DrawablyButton> & {
  color?: PaletteColor;
};

export function DButton({ color = "blue", ...rest }: ButtonProps) {
  return <DrawablyButton {...paletteProps(color)} {...rest} />;
}

type InputProps = ComponentProps<typeof DrawablyInput> & {
  color?: PaletteColor;
};

export function DInput({ color = "blue", className = "", ...rest }: InputProps) {
  return (
    <DrawablyInput
      {...paletteProps(color)}
      className={`d-input-block ${className}`.trim()}
      {...rest}
    />
  );
}

type CheckboxProps = ComponentProps<typeof DrawablyCheckbox> & {
  color?: PaletteColor;
};

export function DCheckbox({ color = "blue", ...rest }: CheckboxProps) {
  return <DrawablyCheckbox {...paletteProps(color)} {...rest} />;
}

type RadioProps = ComponentProps<typeof DrawablyRadio> & {
  color?: PaletteColor;
};

export function DRadio({ color = "blue", ...rest }: RadioProps) {
  return <DrawablyRadio {...paletteProps(color)} {...rest} />;
}

type ToggleProps = ComponentProps<typeof DrawablyToggle> & {
  color?: PaletteColor;
};

export function DToggle({ color = "blue", ...rest }: ToggleProps) {
  return <DrawablyToggle {...paletteProps(color)} {...rest} />;
}

type DividerProps = ComponentProps<typeof DrawablyDivider> & {
  color?: PaletteColor;
};

export function DDivider({ color = "grey", ...rest }: DividerProps) {
  return <DrawablyDivider {...paletteProps(color)} {...rest} />;
}

type CardPad = "md" | "none" | "lg" | "xl";

const CARD_PAD_CLASS: Record<CardPad, string> = {
  md: "",
  none: "d-card-flush",
  lg: "d-card-lg",
  xl: "d-card-xl",
};

type CardProps = ComponentProps<typeof DrawablyCard> & {
  color?: PaletteColor;
  pad?: CardPad;
};

export function DCard({
  color = "grey",
  pad = "md",
  className = "",
  ...rest
}: CardProps) {
  return (
    <DrawablyCard
      {...paletteProps(color)}
      className={`${CARD_PAD_CLASS[pad]} ${className}`.trim()}
      {...rest}
    />
  );
}

type DLinkProps = Omit<ComponentProps<"a">, "color"> & {
  color?: PaletteColor;
  variant?: "outline" | "solid" | "scribble";
};

/**
 * Hand-drawn link: attaches the drawably button chrome to a real <a> so
 * anchor CTAs keep native navigation semantics (middle-click, target=_blank).
 */
export function DLink({
  color = "blue",
  variant = "outline",
  className = "",
  children,
  ...rest
}: DLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sketch = drawablyButton(el, { variant, ...paletteProps(color) });
    return () => sketch.destroy();
  }, [variant, color]);

  return (
    <a ref={ref} className={className} {...rest}>
      {children}
    </a>
  );
}
