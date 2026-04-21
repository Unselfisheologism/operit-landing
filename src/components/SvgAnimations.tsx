import { useEffect, useRef } from "react";

/** Animated circuit/node network SVG background */
export function CircuitNetwork({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Connection lines */}
      <g stroke="url(#lineGrad)" strokeWidth="1">
        <line x1="100" y1="200" x2="300" y2="100">
          <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="300" y1="100" x2="500" y2="150">
          <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </line>
        <line x1="500" y1="150" x2="700" y2="200">
          <animate attributeName="stroke-opacity" values="0.1;0.4;0.1" dur="3s" begin="1s" repeatCount="indefinite" />
        </line>
        <line x1="300" y1="100" x2="350" y2="280">
          <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur="4s" begin="0.3s" repeatCount="indefinite" />
        </line>
        <line x1="500" y1="150" x2="450" y2="320">
          <animate attributeName="stroke-opacity" values="0.1;0.3;0.1" dur="4s" begin="0.8s" repeatCount="indefinite" />
        </line>
        <line x1="200" y1="300" x2="350" y2="280">
          <animate attributeName="stroke-opacity" values="0.1;0.35;0.1" dur="3.5s" begin="0.2s" repeatCount="indefinite" />
        </line>
        <line x1="350" y1="280" x2="600" y2="300">
          <animate attributeName="stroke-opacity" values="0.1;0.35;0.1" dur="3.5s" begin="0.7s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Nodes */}
      {[
        { cx: 100, cy: 200, r: 4 },
        { cx: 300, cy: 100, r: 6 },
        { cx: 500, cy: 150, r: 5 },
        { cx: 700, cy: 200, r: 4 },
        { cx: 350, cy: 280, r: 5 },
        { cx: 450, cy: 320, r: 4 },
        { cx: 200, cy: 300, r: 3 },
        { cx: 600, cy: 300, r: 4 },
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.cx} cy={node.cy} r={node.r * 4} fill="url(#nodeGlow)">
            <animate attributeName="r" values={`${node.r * 3};${node.r * 5};${node.r * 3}`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={node.cx} cy={node.cy} r={node.r} fill="#3b82f6">
            <animate attributeName="opacity" values="0.5;1;0.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Data flow particles */}
      <circle r="2" fill="#60a5fa">
        <animateMotion dur="4s" repeatCount="indefinite" path="M100,200 L300,100 L500,150 L700,200" />
        <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle r="2" fill="#f97316">
        <animateMotion dur="5s" repeatCount="indefinite" path="M200,300 L350,280 L500,150 L300,100" />
        <animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/** Animated phone outline with pulse rings */
export function PhonePulse({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={60 - i * 8}
          y={40 - i * 8}
          width={80 + i * 16}
          height={320 + i * 16}
          rx={12 + i * 2}
          stroke="#3b82f6"
          strokeWidth="1"
          fill="none"
        >
          <animate
            attributeName="opacity"
            values="0.3;0;0.3"
            dur="3s"
            begin={`${i * 1}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-width"
            values="1;0.5;1"
            dur="3s"
            begin={`${i * 1}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}

      {/* Phone body */}
      <rect
        x="60"
        y="40"
        width="80"
        height="320"
        rx="12"
        stroke="#3f3f46"
        strokeWidth="2"
        fill="rgba(9,9,11,0.8)"
      />

      {/* Screen content - animated lines */}
      <g>
        {[
          { y: 80, w: 50 },
          { y: 100, w: 40 },
          { y: 120, w: 55 },
          { y: 145, w: 35 },
          { y: 165, w: 48 },
          { y: 190, w: 42 },
        ].map((line, i) => (
          <rect
            key={i}
            x="75"
            y={line.y}
            width={line.w}
            height="6"
            rx="0"
            fill="#3b82f6"
            opacity="0.2"
          >
            <animate
              attributeName="width"
              values={`${line.w};${line.w - 10};${line.w}`}
              dur={`${2 + i * 0.2}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.15;0.3;0.15"
              dur={`${2 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>

      {/* Floating overlay indicator */}
      <circle cx="140" cy="100" r="8" fill="#f97316" opacity="0.8">
        <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="140" cy="100" r="14" stroke="#f97316" strokeWidth="1" fill="none">
        <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Home button indicator */}
      <line x1="90" y1="340" x2="110" y2="340" stroke="#52525b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Animated terminal with typing effect */
export function TerminalAnimation({ className }: { className?: string }) {
  const lines = [
    "$ twent agent run --mode overlay",
    "⠋ Loading agent skills...",
    "✓ 48 tools loaded",
    "✓ MCP servers connected (3)",
    "✓ Accessibility service active",
    "$ agent.execute('open gmail, check unread')",
    "→ Tapping element [3] 'Compose'",
    "→ Type text: 'Meeting notes attached'",
    "✓ Task complete in 4.2s",
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 500 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <title>Terminal animation showing Twent agent commands</title>
      {/* Terminal window */}
      <rect x="0" y="0" width="500" height="280" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
      {/* Title bar */}
      <rect x="0" y="0" width="500" height="32" rx="8" fill="#27272a" />
      <rect x="0" y="24" width="500" height="8" fill="#27272a" />
      <circle cx="16" cy="16" r="5" fill="#ef4444" opacity="0.8" />
      <circle cx="32" cy="16" r="5" fill="#f97316" opacity="0.8" />
      <circle cx="48" cy="16" r="5" fill="#22c55e" opacity="0.8" />
      <text x="250" y="20" textAnchor="middle" fill="#71717a" fontSize="11" fontFamily="monospace">
        twent@android:~
      </text>

      {/* Terminal lines with staggered fade-in */}
      {lines.map((line, i) => (
        <text
          key={i}
          x="16"
          y={52 + i * 26}
          fill={line.startsWith("$") ? "#60a5fa" : line.startsWith("✓") ? "#22c55e" : line.startsWith("→") ? "#f97316" : "#a1a1aa"}
          fontSize="13"
          fontFamily="monospace"
        >
          {line.split("").map((char, j) => (
            <tspan key={j}>
              {char}
              <animate
                attributeName="opacity"
                values="0;0;1"
                dur="0.01s"
                begin={`${i * 0.8 + j * 0.02}s`}
                fill="freeze"
              />
            </tspan>
          ))}
        </text>
      ))}

      {/* Blinking cursor */}
      <rect x="16" y={52 + lines.length * 26 - 12} width="8" height="16" fill="#3b82f6">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

/** Floating particle field background */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        o: Math.random() * 0.3 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${p.o})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
