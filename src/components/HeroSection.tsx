import { HeroToast } from "./HeroToast";
import { PlayStoreBadge } from "./PlayStoreBadge";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden bg-zinc-950">
      {/* Plotter SVG pattern background */}
      <div
        className="absolute inset-0 opacity-[0.06] hidden dark:block"
        style={{
          backgroundImage: "url(/plotter-dark.svg)",
          backgroundSize: "600px",
          backgroundRepeat: "repeat",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-0"
        style={{
          backgroundImage: "url(/plotter-light.svg)",
          backgroundSize: "600px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 max-w-4xl text-center">
        <HeroToast />

        {/* Main headline — Loss Aversion Framing (Principle 7) */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08] mb-6 animate-fade-in-up animate-delay-100 text-zinc-100">
          <span className="text-zinc-100">
            Twent: Your AI agent can chat all day.
          </span>
          <br />
          <span className="text-orange-500">
            But it can&apos;t do a single thing on your phone.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed animate-fade-in-up animate-delay-200 text-center mx-auto">
          Twent is a personal agentic OS that lives in your pocket. It sees your
          screen, taps buttons, runs terminals, connects 1000+ apps, and
          automates entire workflows — activated by a long-press or your voice.
        </p>

        {/* CTA Buttons — Choice Reduction (Principle 9): 1 primary, 1 secondary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
          {/* PRIMARY CTA — only one visually dominant button */}
          <a
            href="https://play.google.com/apps/testing/com.twent"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 bg-black text-white font-secondary font-medium text-lg uppercase tracking-wider hover:bg-zinc-800 transition-colors"
          >
            <PlayStoreBadge iconClassName="w-5 h-5" />
            Get it from Play Store
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-600 animate-fade-in-up animate-delay-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-orange-500" />
            Android 8.0+
          </span>
          <span>BYOK — Your Keys, Your Privacy</span>
          <span>Local AI Support</span>
        </div>
      </div>
    </section>
  );
}
