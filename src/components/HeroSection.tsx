import { HeroToast } from "./HeroToast";
import { PlayStoreCta } from "./PlayStoreCta";

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

        {/* Main headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08] mb-6 animate-fade-in-up animate-delay-100 text-zinc-100">
          <span className="text-zinc-100">
            Your AI assistant can chat all day.
          </span>
          <br />
          <span className="text-orange-500">
            Twent actually does things on your phone.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed animate-fade-in-up animate-delay-200 text-center mx-auto">
          Twent is a free AI app for Android. It can write code, make slide decks,
          videos, images, and websites, automate apps, and run terminal tasks — all
          from your phone.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
          {/* PRIMARY CTA — only one visually dominant button */}
          <PlayStoreCta size="h-11" />
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-600 animate-fade-in-up animate-delay-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-orange-500" />
            Android 8.0+
          </span>
          <span>BYOK — Your Keys, Your Privacy</span>
          <span>Local AI Support</span>
          <span>100% Free</span>
        </div>
      </div>
    </section>
  );
}
