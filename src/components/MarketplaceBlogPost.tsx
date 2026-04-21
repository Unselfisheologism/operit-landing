import { useEffect, useState } from "react";
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

// Large decorative "01" watermark
function IssueWatermark() {
  return (
    <div className="absolute -right-8 md:right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none">
      <span
        className="font-display text-[20rem] md:text-[28rem] leading-none text-zinc-100 dark:text-zinc-900/[0.4] tracking-tighter"
        style={{ wordSpacing: "-0.2em" }}
      >
        01
      </span>
    </div>
  );
}

// Animated date indicator
function AnimatedDate({ visible }: { visible: boolean }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setDots((d) => (d + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <span className="inline-block w-24 text-left">
      {"·".repeat(dots)}
      {"·".repeat(3 - dots)}
    </span>
  );
}

export function MarketplaceBlogPost({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [heroRef, heroInView] = useInView();
  const [contentRef, contentInView] = useInView();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <GrainOverlay />
      <Nav dark={dark} onToggle={onToggle} />

      <main>
        {/* Hero — editorial masthead */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        >
          <IssueWatermark />

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* Breadcrumb / publication line */}
            <div
              className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="w-8 h-px bg-orange-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-orange-500">
                Product
              </span>
              <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-600">
                April 19, 2026
              </span>
            </div>

            {/* Main title */}
            <div
              className={`transition-all duration-700 delay-100 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tighter mb-6">
                The Twent Marketplace:{" "}
                <span className="text-orange-500">Your Agentic App Store</span>
              </h1>
            </div>

            {/* Subtitle row */}
            <div
              className={`flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-700 delay-200 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                where creators sell anything from mini apps to custom skins, 
                and everyone else gets to level up their agent for free (▀̿Ĺ̯▀̿ ̿)
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                  5 min read
                </span>
                <AnimatedDate visible={heroInView} />
              </div>
            </div>

            {/* Hero Image */}
            <div
              className={`mt-12 transition-all duration-700 delay-300 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="relative overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <img
                  src="/marketplace-hero.png"
                  alt="Twent Marketplace - Your Agentic App Store"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: "500px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>

          {/* Bottom border — thick editorial rule */}
          <div
            className={`max-w-4xl mx-auto px-6 mt-12 transition-all duration-700 delay-300 ${
              heroInView ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="h-px bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800" />
          </div>
        </section>

        {/* Content area */}
        <section ref={contentRef} className="max-w-4xl mx-auto px-6 pb-24">
          <div
            className={`transition-all duration-700 ${
              contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-8">
                ok so here's the thing (￣_,￣ ) we're building something wild with twent. 
                it's not just another ai chat app — it's your personal agentic os for android. 
                and the marketplace? that's where the magic happens.
              </p>

              <h2 className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
                what even is the marketplace?
              </h2>
              
              <p className="text-base leading-relaxed mb-6">
                think of it like an app store, but for your ai agent. except instead of just apps, 
                you get everything from mini apps to prompt templates to workflow automation templates. 
                creators can sell their stuff, or make it free — totally up to them.
              </p>

              <p className="text-base leading-relaxed mb-8">
                here's what you'll find in the marketplace:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    title: "Mini Apps",
                    desc: "full interactive applications that run inside twent. think calculators, games, productivity tools — but ai-native",
                    icon: "📱"
                  },
                  {
                    title: "Prompt Templates",
                    desc: "battle-tested prompts for specific use cases. writing, coding, analysis — you name it",
                    icon: "💬"
                  },
                  {
                    title: "Workflow Automation",
                    desc: "pre-built automation chains. connect tools, set triggers, let your agent handle the boring stuff",
                    icon: "⚡"
                  },
                  {
                    title: "Skills",
                    desc: "teach your agent new abilities. reusable instruction sets for specific tasks",
                    icon: "🧠"
                  },
                  {
                    title: "Custom Skins",
                    desc: "cosmetic badges and themes to personalize your agent's look. because aesthetics matter (▀̿Ĺ̯▀̿ ̿)",
                    icon: "🎨"
                  },
                  {
                    title: "MCP Servers",
                    desc: "model context protocol servers that give your agent access to external tools and data sources",
                    icon: "🔌"
                  }
                ].map((item) => (
                  <div key={item.title} className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <h2 className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
                how does pricing work?
              </h2>

              <p className="text-base leading-relaxed mb-6">
                ok this is the cool part. right now while we're pre-revenue? everything is free. 
                we're distributing via website apk, using ai ads through koahlabs.com, 
                and keeping the marketplace closed until we start making money.
              </p>

              <p className="text-base leading-relaxed mb-8">
                once we hit revenue though? that's when things get interesting:
              </p>

              <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
                <h3 className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-4">
                  pre-revenue (now): free everything
                </h3>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>website apk distribution — no play store restrictions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>everything free — no hidden costs, no premium tiers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>ai ads through koahlabs.com — non-intrusive, actually useful</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>no marketplace — we're building it, but it's not live yet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>no cosmetic badges — patience, young padawan</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-6 mb-8">
                <h3 className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-4">
                  post-revenue: still mostly free (▀̿Ĺ̯▀̿ ̿)
                </h3>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>play store distribution — reach more people</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>everything still free — core features never paywalled</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>ai ads still there — but you can remove them with pro</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">★</span>
                    <span>marketplace opens — creators can sell, we take a small commission</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">★</span>
                    <span>pro plan ($20) — no ads, cosmetic badges, early access, no marketplace commissions</span>
                  </li>
                </ul>
              </div>

              <h2 className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
                why this matters
              </h2>

              <p className="text-base leading-relaxed mb-6">
                look, most app stores are controlled by big corporations who take huge cuts 
                and make up random rules. we're doing it differently. the marketplace is 
                built for creators, by creators.
              </p>

              <p className="text-base leading-relaxed mb-6">
                want to sell your custom workflow automation? go for it. 
                made a killer prompt template? share it with the world. 
                built a mini app that does something cool? sell it or give it away free.
              </p>

              <p className="text-base leading-relaxed mb-8">
                and if you're on the pro plan ($20 once, not monthly — because subscriptions are evil), 
                you get zero commissions on your sales. that's right, keep 100% of what you make.
              </p>

              <h2 className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
                what's next?
              </h2>

              <p className="text-base leading-relaxed mb-6">
                right now we're focused on building the core experience and getting the 
                marketplace infrastructure ready. we're using ai ads to keep things free 
                while we're pre-revenue, and honestly? they're pretty good. koahlabs.com 
                does contextual ai ads that actually add value instead of being annoying.
              </p>

              <p className="text-base leading-relaxed mb-8">
                once we start generating revenue, we'll flip the switch on the marketplace 
                and let creators loose. play store distribution will help us reach more people, 
                and the pro plan will give power users everything they need without any recurring costs.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6">
                <h3 className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-4">
                  tldr for the impatient (￣_,￣ )
                </h3>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>• marketplace = agentic app store for twent</li>
                  <li>• sell/buy mini apps, prompts, workflows, skills, skins</li>
                  <li>• pre-revenue: everything free, no marketplace yet</li>
                  <li>• post-revenue: still free, marketplace with commissions</li>
                  <li>• pro ($20 once): no ads, badges, early access, no commissions</li>
                  <li>• creators keep 100% with pro plan</li>
                  <li>• coming to play store when we hit revenue</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
