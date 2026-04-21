import { useInView } from "../hooks/useInView";

export function FinalCTA() {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-24 sm:py-32 px-6 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
      {/* Plotter SVG pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url(/plotter-light.svg)", backgroundSize: "500px", backgroundRepeat: "repeat" }} />
      <div className="absolute inset-0 hidden dark:block opacity-[0.04]" style={{ backgroundImage: "url(/plotter-dark.svg)", backgroundSize: "500px", backgroundRepeat: "repeat" }} />

      <div ref={ref} className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Social proof before final CTA — Principle 4: cascade ends here */}
        <div className="mb-10 max-w-2xl mx-auto">
          <blockquote className="text-base text-zinc-600 dark:text-zinc-400 italic leading-relaxed mb-3">
            &ldquo;I automated my entire morning routine — weather, emails, calendar summary — saving 45 min/day. That&apos;s 22 hours a month I got back.&rdquo;
          </blockquote>
          <div className="text-sm font-display text-zinc-900 dark:text-zinc-100">Productivity Enthusiast</div>
          <div className="text-xs text-orange-500">Early Adopter</div>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-6 text-center">
          The best AI isn&apos;t the one that knows the most.
          <br />
          <span className="text-orange-500">It&apos;s the one that does the most.</span>
        </h2>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Twent gives your AI hands, eyes, and a brain. 50+ tools. A full terminal. 1000+ app connections.
        </p>

        {/* Single primary CTA — Principle 9: choice reduction */}
        <div className="flex justify-center">
          <a href="https://github.com/AAswordman/Operit/releases/latest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-12 py-5 bg-blue-600 text-white font-secondary text-xl uppercase tracking-wider hover:bg-blue-500 transition-colors">
            Download Twent
          </a>
        </div>
      </div>
    </section>
  );
}
