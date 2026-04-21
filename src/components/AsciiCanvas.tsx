import { useEffect, useRef, useCallback } from "react";
import { createAsciiRenderer, createPixelReveal } from "landing-effects";

interface AsciiHeroProps {
  imageSrc: string;
  className?: string;
}

export function AsciiHero({ imageSrc, className }: AsciiHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || cleanupRef.current) return;

    try {
      const cleanup = createAsciiRenderer({
        canvas,
        imageSrc,
        chars: " ░▒▓█",
        fontSize: 8,
        fontFamily: '"JetBrains Mono", monospace',
        brightnessBoost: 2.0,
        posterize: 24,
        parallaxStrength: 6,
        scale: 1.2,
        colorFn: (luminance: number, distFromCenter: number) => {
          const r = Math.round(59 + luminance * 30);
          const g = Math.round(130 + luminance * 40);
          const b = Math.round(246);
          const a = 0.3 + luminance * 0.5 - distFromCenter * 0.2;
          return `rgba(${r},${g},${b},${Math.max(0.1, a)})`;
        },
      });
      cleanupRef.current = cleanup;
    } catch {
      // Fallback: draw a simple gradient
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, "#09090b");
        grad.addColorStop(0.5, "#1e3a5f");
        grad.addColorStop(1, "#09090b");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [imageSrc]);

  useEffect(() => {
    init();
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={400}
      className={className}
      aria-hidden="true"
    />
  );
}

interface PixelRevealProps {
  imageSrc: string;
  className?: string;
}

export function PixelRevealHero({ imageSrc, className }: PixelRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || cleanupRef.current) return;

    try {
      const cleanup = createPixelReveal({
        canvas,
        imageSrc,
        blockSize: 6,
        pixelsPerFrame: 150,
        glitchRegion: 1 / 3,
        delay: 500,
      });
      cleanupRef.current = cleanup;
    } catch {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, "#09090b");
        grad.addColorStop(0.5, "#1a1a2e");
        grad.addColorStop(1, "#09090b");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [imageSrc]);

  useEffect(() => {
    const timer = setTimeout(init, 100);
    return () => {
      clearTimeout(timer);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={400}
      className={className}
      aria-hidden="true"
    />
  );
}
