'use client';
import { useEffect, useRef } from "react";

const BASE_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg==";

type TrailingCursorProps = {
  particles?: number;
  rate?: number;
  baseImageSrc?: string;
};

type Point = { x: number; y: number };

class Particle {
  position: Point;
  image: HTMLImageElement;

  constructor(x: number, y: number, image: HTMLImageElement) {
    this.position = { x, y };
    this.image = image;
  }

  move(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

function TrailingCursor({
  particles = 15,
  rate = 0.4,
  baseImageSrc = BASE_IMAGE,
}: TrailingCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<Point>({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const cursorsInittedRef = useRef(false);

  useEffect(() => {
    const baseImage = new Image();
    baseImage.src = baseImageSrc;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const targetElement = document.body;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    canvasRef.current = canvas;
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.pointerEvents = "none";
    canvas.style.position = "fixed";
    targetElement.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const onMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;

      if (!cursorsInittedRef.current) {
        cursorsInittedRef.current = true;
        for (let i = 0; i < particles; i++) {
          particlesRef.current.push(
            new Particle(cursorRef.current.x, cursorRef.current.y, baseImage)
          );
        }
      }
    };

    const onWindowResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const updateParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      let x = cursorRef.current.x;
      let y = cursorRef.current.y;
      particlesRef.current.forEach((particle, index) => {
        const nextParticle =
          particlesRef.current[index + 1] || particlesRef.current[0];
        particle.position.x = x;
        particle.position.y = y;
        particle.move(context);
        x += (nextParticle.position.x - particle.position.x) * rate;
        y += (nextParticle.position.y - particle.position.y) * rate;
      });
    };

    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    if (!prefersReducedMotion.matches) {
      targetElement.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onWindowResize);
      loop();
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      targetElement.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
    };
  }, [particles, rate, baseImageSrc]);

  return null;
}

export default TrailingCursor;
