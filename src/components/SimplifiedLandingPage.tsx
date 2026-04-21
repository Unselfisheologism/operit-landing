import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useInView } from "../hooks/useInView";

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

// Feature card component
function FeatureCard({ 
  title, 
  subtitle, 
  icon, 
  visible, 
  delay 
}: { 
  title: string; 
  subtitle: string; 
  icon: React.ReactNode; 
  visible: boolean; 
  delay: number; 
}) {
  return (
    <div 
      className={`p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${delay}s` : "0s" }}
    >
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-blue-500/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="font-display text-2xl text-zinc-900 dark:text-zinc-100 mb-2">
            {title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SimplifiedLandingPage({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  const [heroRef, heroInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [ctaRef, _ctaInView] = useInView();

  const features = [
    {
      title: "Connected",
      subtitle: "Skills, MCP servers, Composio Integration",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      ),
    },
    {
      title: "Agent Swarm",
      subtitle: "Claude Code, Codex, Hermes-Agent, and more",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      title: "Unforgettable",
      subtitle: "Memory and knowledge that persists",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
    },
    {
      title: "Private",
      subtitle: "Local models, local terminal, BYOK",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      title: "Multipurpose",
      subtitle: "Generate mini-apps, perform UI automation",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <GrainOverlay />
      <Nav dark={dark} onToggle={toggle} />

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-6 text-center">
            {/* Main Headline */}
            <div
              className={`transition-all duration-700 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tighter mb-6">
                Your Personal Agentic OS{" "}
                <span className="text-blue-500">for Android</span>
              </h1>
            </div>

            {/* Subtitle */}
            <div
              className={`transition-all duration-700 delay-200 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
                The AI assistant that connects, remembers, and automates. 
                Run Claude Code, control any app, and keep your data private.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href="https://github.com/user/operit/releases"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
              >
                Download Free APK
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
              <a
                href="/docs"
                className="inline-flex items-center justify-center px-8 py-4 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 font-medium transition-colors duration-200"
              >
                View Docs
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Five things that make Twent different
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Not another chat app. A complete agentic operating system for your Android phone.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, i) => (
                <FeatureCard
                  key={feature.title}
                  title={feature.title}
                  subtitle={feature.subtitle}
                  icon={feature.icon}
                  visible={featuresInView}
                  delay={0.1 + i * 0.1}
                />
              ))}
            </div>

            {/* Learn More Links */}
            <div className="mt-16 text-center">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Want to dive deeper?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/ai-agent-for-developers" className="text-blue-500 hover:text-blue-600 text-sm">
                  For Developers →
                </a>
                <a href="/android-automation-power-user" className="text-blue-500 hover:text-blue-600 text-sm">
                  For Power Users →
                </a>
                <a href="/privacy-first-ai-android" className="text-blue-500 hover:text-blue-600 text-sm">
                  Privacy Details →
                </a>
                <a href="/ai-marketplace-creators" className="text-blue-500 hover:text-blue-600 text-sm">
                  For Creators →
                </a>
                <a href="/details" className="text-zinc-500 hover:text-zinc-600 text-sm">
                  See all features →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-12">
              What people are saying
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Finally, Claude Code on my phone. This changes everything for quick fixes.",
                  author: "Developer"
                },
                {
                  quote: "The UI automation is insane. My phone does things for me now.",
                  author: "Power User"
                },
                {
                  quote: "Privacy-first AI that actually works. No data leaves my device.",
                  author: "Privacy Advocate"
                }
              ].map((testimonial, i) => (
                <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    — {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
              Simple pricing
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">
              Free forever. No subscriptions.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display text-2xl text-zinc-900 dark:text-zinc-100 mb-2">Free</h3>
                <div className="text-4xl font-display text-blue-500 mb-4">$0</div>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2 text-left">
                  <li>✓ All core features</li>
                  <li>✓ Claude Code & Codex</li>
                  <li>✓ UI automation</li>
                  <li>✓ Ubuntu terminal</li>
                  <li>✓ Privacy-first (BYOK)</li>
                </ul>
              </div>

              <div className="p-8 bg-white dark:bg-zinc-900 border border-blue-500 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-mono px-3 py-1">
                  RECOMMENDED
                </div>
                <h3 className="font-display text-2xl text-zinc-900 dark:text-zinc-100 mb-2">Pro</h3>
                <div className="text-4xl font-display text-blue-500 mb-4">$20</div>
                <p className="text-xs text-zinc-500 mb-4">One-time payment</p>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2 text-left">
                  <li>✓ Everything in Free</li>
                  <li>✓ No ads</li>
                  <li>✓ Cosmetic badges</li>
                  <li>✓ Early access to features</li>
                  <li>✓ No marketplace commissions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section ref={ctaRef} className="py-20 md:py-28 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
              Ready to try it?
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              Download Twent and see what your phone can really do.
            </p>
            <a
              href="https://github.com/user/operit/releases"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
            >
              Download Free APK
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}