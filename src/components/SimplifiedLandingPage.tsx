import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useInView } from "../hooks/useInView";
import { PlayStoreCta } from "./PlayStoreCta";
import { DLink } from "./ui/drawably";

// Grain overlay for editorial print feel
function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03] dark:opacity-[0.05]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}

export function SimplifiedLandingPage({ dark = false }: { dark?: boolean }) {
  const [heroRef, heroInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [ctaRef, _ctaInView] = useInView();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <GrainOverlay />
      <Nav dark={dark} />

      <main>
        <section ref={heroRef} className="relative pt-24 pb-16 md:pt-36 md:pb-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1
              className={`font-display text-5xl md:text-7xl font-bold tracking-tighter transition-all duration-700 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Terminal power for Android
            </h1>
            <p
              className={`mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto transition-all duration-700 delay-100 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Twent brings real shell automation, local AI, and desktop apps
              to your phone. No cloud session required.
            </p>

            <div
              className={`mt-10 flex flex-col items-center justify-center gap-3 transition-all duration-700 delay-200 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <PlayStoreCta size="h-11" />
              <DLink
                href="/docs"
                color="orange"
                className="d-btn-lg"
              >
                View Docs
              </DLink>
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="py-16 md:py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
              Built for real work, not demos
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Local terminal",
                  desc: "Run apt install, tmux, cron, and FFmpeg on-device.",
                },
                {
                  title: "Desktop apps",
                  desc: "Launch apps and automate workflows with local AI.",
                },
                {
                  title: "Privacy-first",
                  desc: "Workflows run on your device, not someone else's cloud.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-6 border border-zinc-200 dark:border-zinc-800 transition-all duration-700 ${
                    featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <h3 className="font-display text-xl mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="py-16 md:py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl mb-4">Ready to try it?</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              Get Twent and use your phone like a real workstation.
            </p>
            <PlayStoreCta size="h-11" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
