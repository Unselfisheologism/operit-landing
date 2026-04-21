export function VibeImage() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="w-full h-[200px] sm:h-[260px] relative bg-zinc-950">
        {/* Plotter SVG pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "url(/plotter-dark.svg)",
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Abstract floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { x: "10%", y: "20%", w: 60, h: 40, delay: 0 },
            { x: "25%", y: "55%", w: 80, h: 30, delay: 0.5 },
            { x: "45%", y: "15%", w: 50, h: 50, delay: 1 },
            { x: "60%", y: "60%", w: 70, h: 35, delay: 0.3 },
            { x: "78%", y: "25%", w: 55, h: 45, delay: 0.8 },
            { x: "88%", y: "50%", w: 45, h: 60, delay: 1.2 },
          ].map((box, i) => (
            <div
              key={i}
              className="absolute border border-zinc-700/30 bg-zinc-800/10"
              style={{
                left: box.x,
                top: box.y,
                width: box.w,
                height: box.h,
                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${box.delay}s`,
              }}
            />
          ))}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
            <line x1="15%" y1="30%" x2="30%" y2="60%" stroke="rgba(59,130,246,0.25)" strokeWidth="2" />
            <line x1="30%" y1="60%" x2="50%" y2="25%" stroke="rgba(59,130,246,0.2)" strokeWidth="2" />
            <line x1="50%" y1="25%" x2="65%" y2="65%" stroke="rgba(249,115,22,0.18)" strokeWidth="2" />
            <line x1="65%" y1="65%" x2="82%" y2="35%" stroke="rgba(59,130,246,0.2)" strokeWidth="2" />
          </svg>
        </div>

        {/* Center phone silhouette */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-[80px] h-[160px] border-2 border-zinc-600/40 bg-zinc-900/40 relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-zinc-700/40" />
            <div className="absolute inset-4 border border-zinc-700/20 overflow-hidden">
              <div className="w-full h-full bg-blue-500/10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
