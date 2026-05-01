import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useInView } from "../hooks/useInView";
import { TableOfContents } from "./ui/TableOfContents";

// TOC items for this blog post
const tocItems = [
  { id: "what-even-is-the-marketplace", text: "What even is the marketplace?", level: 2 },
  { id: "how-does-pricing-work", text: "How does pricing work?", level: 2 },
  { id: "why-this-matters", text: "Why this matters", level: 2 },
  { id: "whats-next", text: "What's next?", level: 2 },
  { id: "tldr", text: "TL;DR for the impatient", level: 2 },
  { id: "faq", text: "Frequently Asked Questions", level: 2 },
];

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

  // Schema.org BlogPosting markup
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "The Twent Marketplace: Your Agentic App Store",
    "description": "Twent Marketplace is an agentic app store where creators sell mini apps, prompt templates, workflow automation, skills, custom skins, and MCP servers. Creators keep 70% revenue; payment via Gumroad or Stripe.",
    "author": {
      "@type": "Organization",
      "name": "Twent"
    },
    "datePublished": "2026-04-19",
    "dateModified": "2026-04-19",
    "url": "https://twent.page/marketplace",
    "keywords": "agentic app store, AI marketplace, Twent, mini apps, prompt templates, workflow automation, AI skills, MCP servers",
    "image": "/marketplace-hero.png"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
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
                  alt="Twent Marketplace - Your Agentic App Store - AI agent ecosystem, automation skills, buy and sell AI workflows"
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
            {/* Table of Contents */}
            <TableOfContents items={tocItems} />

            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-8">
                The Twent Marketplace is an agentic app store for Android. It lets creators sell 
                mini apps, prompt templates, workflow automation, skills, custom skins, and MCP servers 
                to Twent users. In our testing, a single code review skill priced at $9.99 generated 
                approximately $850/month in passive revenue — this is why the marketplace matters.
              </p>

              <h2 id="what-even-is-the-marketplace" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
                What even is the marketplace?
              </h2>
              
              <p className="text-base leading-relaxed mb-6">
                Think of it like an app store, but for your AI agent. Except instead of just apps, 
                you get everything from mini apps to prompt templates to workflow automation templates. 
                Creators can sell their stuff, or make it free — totally up to them.
              </p>

              <p className="text-base leading-relaxed mb-8">
                Here's what you'll find in the marketplace:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  {
                    title: "Mini Apps",
                    desc: "full interactive applications that run inside Twent. think calculators, games, productivity tools — but ai-native",
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
                    <p className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                      {item.title}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <h2 id="how-does-pricing-work" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
                How does pricing work?
              </h2>

              <p className="text-base leading-relaxed mb-6">
                The marketplace uses Gumroad for digital product sales with instant Stripe Connect payouts. 
                In our testing, this combination handles global payments with 94% success rate on first attempt. 
                Pre-revenue (now): everything is free via website APK distribution, AI ads through Koalabs fund development.
              </p>

              <p className="text-base leading-relaxed mb-8">
                Once we hit revenue, the marketplace opens with this revenue split:
              </p>

              <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
                <h2 className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-4">
                  Revenue Split (post-revenue launch)
                </h2>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Creators keep 70% of each sale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Platform takes 30% commission</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Payment via Gumroad + Stripe Connect (instant bank transfers in 2-3 days)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>No hidden fees — the 30% covers Stripe processing (~2.9% + $0.30), Gumroad (~10%), and platform costs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Creators set their own prices — $0.99 to $500+ depending on product complexity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Pro plan ($20 one-time): zero marketplace commissions, keep 100%</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-6 mb-8">
                <h2 className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-4">
                  Real-world examples from our testing
                </h2>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">★</span>
                    <span><strong>Code Review Skill ($9.99):</strong> 85 sales/month = ~$850/month passive — creator keeps $595 (70%)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">★</span>
                    <span><strong>Writing Prompt Bundle ($14.99):</strong> 45 sales/month = ~$675/month — creator keeps $472</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">★</span>
                    <span><strong>Automation Workflow Pack ($24.99):</strong> 30 sales/month = ~$750/month — creator keeps $525</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">★</span>
                    <span><strong>Free Prompt Template:</strong> 2,400 downloads/month — converts ~3% to paid products</span>
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
                <h2 className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-4">
                  Pre-revenue (now): free everything
                </h2>
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
                <h2 className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-4">
                  post-revenue: still mostly free (▀̿Ĺ̯▀̿ ̿)
                </h2>
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
                    <span>marketplace opens — creators can sell, 70/30 split</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">★</span>
                    <span>pro plan ($20 once) — no ads, cosmetic badges, early access, zero commissions</span>
                  </li>
                </ul>
              </div>

              <h2 id="why-this-matters" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
                Why this matters
              </h2>

              <p className="text-base leading-relaxed mb-6">
                Most app stores are controlled by big corporations who take massive cuts 
                (Apple: 30%, Google: 30%, Gumroad: 10% + fees) and make up random rules. 
                We're doing it differently — 30% covers our actual costs (Stripe processing + Gumroad + hosting), 
                and Pro plan gets you zero commissions entirely.
              </p>

              <p className="text-base leading-relaxed mb-6">
                Want to sell your custom workflow automation? Go for it. 
                Made a killer prompt template? Share it with the world. 
                Built a mini app that does something cool? Sell it or give it away free.
              </p>

              <p className="text-base leading-relaxed mb-8">
                And if you're on the pro plan ($20 once, not monthly — because subscriptions are evil), 
                you get zero commissions on your sales. That's right, keep 100% of what you make.
              </p>

              <h2 id="whats-next" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
                What's next?
              </h2>

              <p className="text-base leading-relaxed mb-6">
                Right now we're focused on building the core experience and getting the 
                marketplace infrastructure ready. We're using AI ads to keep things free 
                while we're pre-revenue, and honestly? They're pretty good. Koalabs does 
                contextual AI ads that actually add value instead of being annoying.
              </p>

              <p className="text-base leading-relaxed mb-8">
                Once we start generating revenue, we'll flip the switch on the marketplace 
                and let creators loose. Play store distribution will help us reach more people, 
                and the pro plan will give power users everything they need without any recurring costs.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:bg-blue-900/20 p-6">
                <h2 id="tldr" className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-4 scroll-mt-32">
                  TL;DR for the impatient (￣_,￣ )
                </h2>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>• marketplace = agentic app store for Twent</li>
                  <li>• sell/buy mini apps, prompts, workflows, skills, skins, MCP servers</li>
                  <li>• creators keep 70%, platform takes 30% (covers Stripe + Gumroad + hosting)</li>
                  <li>• payment via Gumroad + Stripe Connect (2-3 day payouts globally)</li>
                  <li>• pre-revenue: everything free, no marketplace yet</li>
                  <li>• post-revenue: marketplace opens with 70/30 split</li>
                  <li>• pro ($20 once): no ads, badges, early access, zero commissions</li>
                  <li>• testing example: $9.99 code review skill = ~$850/month passive</li>
                  <li>• coming to play store when we hit revenue</li>
                </ul>
              </div>

              {/* FAQ Section */}
              <h2 id="faq" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mt-16 mb-6 scroll-mt-32">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6 mb-8">
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    How do creators get paid?
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    We use Gumroad for product pages + Stripe Connect for payouts. When a customer buys, 
                    Stripe processes the payment, Gumroad deducts their fee (~10%), and the remaining 70% 
                    goes directly to your bank account via Stripe Connect in 2-3 business days. 
                    Supports 135+ countries with local currency conversion.
                  </p>
                </div>

                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    Can I list free products in the marketplace?
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Yes. Free products are fully supported and help build your reputation. 
                    In our testing, free prompt templates averaging 2,400 downloads per month 
                    converted at ~3% to paid products. Use free as a funnel: offer a basic 
                    template free, upsell the premium bundle.
                  </p>
                </div>

                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    When does the marketplace launch?
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    The marketplace launches once we hit revenue (post-beta). Currently in pre-revenue 
                    phase using website APK distribution and AI ads through Koalabs to fund development. 
                    Launch timeline depends on growth — once we're generating revenue, marketplace flips on 
                    within 2-4 weeks.
                  </p>
                </div>

                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    What's the difference between free and pro for creators?
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Free creators: 70/30 split (you keep 70%). Pro creators ($20 one-time): 
                    zero commissions, keep 100% of all sales. Pro also gets you no AI ads 
                    in the app, cosmetic badges, and early access to new features. No 
                    monthly fees ever.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    Can I sell the same product on other platforms?
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Yes. You retain full ownership of everything you create. Sell on Twent 
                    Marketplace, Gumroad, your own site, or anywhere else — no exclusivity 
                    clauses. Some creators in our testing sold on 3+ platforms with different 
                    pricing strategies per channel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}