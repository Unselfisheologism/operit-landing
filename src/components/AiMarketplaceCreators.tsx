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

// Schema markup for BusinessApplication
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BusinessApplication",
    name: "Twent - AI Marketplace for Creators",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android",
    description:
      "Create and sell AI skills, workflows, mini apps, and automation templates on the Twent marketplace. Monetize your expertise. Build once, sell forever.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Sell AI skills and behavior bundles",
      "Sell workflow automation templates",
      "Sell mini apps (HTML/CSS/JS)",
      "Sell prompt templates",
      "Sell custom skins and themes",
      "Sell MCP server configurations",
      "Set your own pricing (free or paid)",
      "Creator dashboard with analytics",
      "Automatic updates to buyers",
      "Community ratings and reviews",
    ],
    screenshot: "https://twent.xyz/marketplace-creators-hero.png",
  };

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}

function BreadcrumbSchema() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://twent.xyz" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://twent.xyz/blog" },
      { "@type": "ListItem", position: 3, name: "AI Marketplace for Creators", item: "https://twent.xyz/blog/marketplace" },
    ],
  };
  return <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>;
}


// Feature card component
function FeatureCard({
  icon,
  title,
  description,
  visible,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${delay}s` : "0s" }}
    >
      <div className="w-12 h-12 bg-purple-500/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-2 font-semibold">
        {title}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// FAQ Item component
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 py-6">
      <h2 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2 font-semibold">
        {question}
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {answer}
      </p>
    </div>
  );
}

export function AiMarketplaceCreators({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  const [heroRef, heroInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [comparisonRef, comparisonInView] = useInView();
  const [ctaRef, _ctaInView] = useInView();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <SchemaMarkup />
      <BreadcrumbSchema />
      <GrainOverlay />
      <Nav dark={dark} onToggle={onToggle} />

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* Breadcrumb */}
            <div
              className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <span className="w-8 h-px bg-purple-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-purple-500">
                For Creators
              </span>
            </div>

            {/* Main Headline */}
            <div
              className={`transition-all duration-700 delay-100 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tighter mb-6">
                AI Marketplace for Creators:{" "}
                <span className="text-purple-500">
                  Build Once, Sell Forever
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div
              className={`transition-all duration-700 delay-200 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed mb-8">
                Stop giving away your expertise for free. Twent's marketplace
                lets you <strong>sell AI skills</strong>,
                <strong>workflow templates</strong>, <strong>mini apps</strong>,
                and <strong>automation packages</strong>. Set your own pricing,
                reach thousands of users, and build a passive income stream.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-700 delay-300 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {[
                { label: "What You Can Sell", value: "6+", suffix: "" },
                { label: "Pricing", value: "You Set", suffix: "" },
                { label: "Commission", value: "0%", suffix: "" },
                { label: "Updates", value: "Automatic", suffix: "" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-4 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="font-display text-3xl text-purple-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href="https://pub-84df04198c6b46f19ce9ed18d378ff7e.r2.dev/app-release.apk"
                className="inline-flex items-center justify-center px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors duration-200"
              >
                Download Free APK
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
              <a
                href="/docs#marketplace"
                className="inline-flex items-center justify-center px-8 py-4 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 font-medium transition-colors duration-200"
              >
                View Marketplace Docs
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`max-w-6xl mx-auto px-6 mt-16 transition-all duration-700 delay-500 ${
              heroInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <img
                src="/marketplace-creators-hero.png"
                alt="Twent AI Marketplace for Creators - Sell skills, workflows, mini apps - AI plugin store, agentic extensions, automation marketplace"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "600px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-mono">
                  Sell AI skills, workflow templates, mini apps, and automation
                  packages to thousands of Twent users
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
              The Problem: Your Expertise Has No Monetization Path
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              You've built amazing AI workflows, automation templates, and
              custom tools. But there's no way to monetize them. GitHub has 0 monetization features, Gumroad has no AI ecosystem, and you've hit a distribution ceiling.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  problem: "No Marketplace",
                  desc: "There's no central place to sell AI skills, workflows, or automation templates. GitHub has 0 monetization — you're stuck giving it away for free.",
                },
                {
                  problem: "Distribution Ceiling",
                  desc: "Even if you build something great, there's no way to reach users who would pay for it. Gumroad has no AI ecosystem to distribute to.",
                },
                {
                  problem: "No Revenue",
                  desc: "Your expertise is valuable, but there's no way to monetize it. You're giving away your work for nothing while hitting a ceiling.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
                  <p className="font-display text-lg text-red-500 mb-2">
                    {item.problem}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-20 md:py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Everything You Need to Monetize Your Expertise
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Twent's marketplace isn't just another app store. It's a
                complete platform for creators to build, sell, and distribute
                AI-powered products.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                }
                title="AI Skills"
                description="Instruction bundles that teach the AI how to do specific tasks. Code review, git ops, PR descriptions — package your expertise and sell it. <a href='/ai-agent-for-developers' className='text-purple-500 hover:underline'>See AI skills in action &rarr;</a>"
                visible={featuresInView}
                delay={0.1}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                }
                title="Workflow Templates"
                description="Pre-built automation chains — morning digest, auto-tweet scheduler, social media auto-poster. Package your automations and sell them."
                visible={featuresInView}
                delay={0.2}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                }
                title="Mini Apps"
                description="HTML/CSS/JS apps running inside Twent — dashboards, calculators, games, productivity tools. Build once, sell to thousands."
                visible={featuresInView}
                delay={0.3}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                }
                title="Prompt Templates"
                description="Battle-tested prompts with variables — sales cold email, SEO meta generator, content repurposer. Your best prompts can generate recurring revenue."
                visible={featuresInView}
                delay={0.4}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                }
                title="Custom Skins"
                description="Sell cosmetic themes and badges. Let users personalize their AI assistant's look. Premium skins can command premium prices."
                visible={featuresInView}
                delay={0.5}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                }
                title="MCP Servers"
                description="Custom tool integrations for niche APIs. Give users access to new tools and data sources. Package your integrations and sell them. <a href='/ai-agent-for-developers' className='text-purple-500 hover:underline'>Build MCP tools for developers &rarr;</a>"
                visible={featuresInView}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                How It Works
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                From upload to getting paid in 4 simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  step: "1",
                  title: "Upload Your Product",
                  desc: "Upload your AI skill, workflow, mini app, prompt template, or MCP server. Use Twent's tools to package something valuable.",
                },
                {
                  step: "2",
                  title: "Set Your Price",
                  desc: "Choose free or paid pricing. Set any price point — from $0 to $500+. You control what you earn.",
                },
                {
                  step: "3",
                  title: "Publish",
                  desc: "Publish to the marketplace with descriptions, screenshots, and documentation. Twent handles hosting and delivery.",
                },
                {
                  step: "4",
                  title: "Get Paid",
                  desc: "Users discover, purchase, and download. You keep 70% (free tier) or 100% (Pro). Automatic updates keep buyers happy.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 ${
                    featuresInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: featuresInView
                      ? `${0.1 + i * 0.1}s`
                      : "0s",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-500/10 flex items-center justify-center shrink-0">
                      <span className="font-display text-purple-500">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <p className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-2">
                        {item.title}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Creator Economics Section */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
              Creator Economics
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">
              Real numbers from our creator community.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  stat: "$2,400",
                  label: "Top Creator Earnings",
                  desc: "Our top creator earned $2,400 in month 3 — selling AI skills and workflow templates.",
                },
                {
                  stat: "50+",
                  label: "Creators Earning $500+/mo",
                  desc: "50 creators crossed $500/month by month 2. Twent's distribution reaches ready buyers.",
                },
                {
                  stat: "70%",
                  label: "Free Tier Commission",
                  desc: "Keep 70% of every sale on the free tier. Upgrade to Pro for 100% — one $20 payment.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${
                    featuresInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: featuresInView
                      ? `${0.2 + i * 0.1}s`
                      : "0s",
                  }}
                >
                  <div className="font-display text-4xl text-purple-500 mb-2">
                    {item.stat}
                  </div>
                  <div className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    {item.label}
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section ref={comparisonRef} className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Twent vs. The Rest
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Not just another app store. A creator-first marketplace.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-4 px-4 font-display text-zinc-900 dark:text-zinc-100">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-display text-purple-500">
                      Twent
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      Gumroad
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      Notion Templates
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      GitHub Sponsors
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["AI Skills Marketplace", "✓", "✗", "✗", "✗"],
                    ["Workflow Templates", "✓", "✗", "Limited", "✗"],
                    ["Mini Apps", "✓", "✗", "✗", "✗"],
                    ["Built-in Distribution", "✓", "✓", "✓", "Limited"],
                    ["Automatic Updates", "✓", "✗", "✗", "✗"],
                    ["Zero Commission (Pro)", "✓", "10%", "✗", "✗"],
                    ["AI Integration", "✓", "✗", "✗", "✗"],
                    ["Community Ratings", "✓", "✓", "✓", "Limited"],
                    ["No Platform Lock-in", "✓", "✓", "✓", "✓"],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-zinc-100 dark:border-zinc-800/50 transition-all duration-500 ${
                        comparisonInView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{
                        transitionDelay: comparisonInView
                          ? `${0.1 + i * 0.05}s`
                          : "0s",
                      }}
                    >
                      <td className="py-4 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {row[0]}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[1] === "✓" ? (
                          <span className="text-green-500 font-bold">✓</span>
                        ) : row[1] === "✗" ? (
                          <span className="text-red-400">✗</span>
                        ) : (
                          <span className="text-yellow-500 text-xs">
                            {row[1]}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[2] === "✓" ? (
                          <span className="text-green-500 font-bold">✓</span>
                        ) : row[2] === "✗" ? (
                          <span className="text-red-400">✗</span>
                        ) : (
                          <span className="text-yellow-500 text-xs">
                            {row[2]}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[3] === "✓" ? (
                          <span className="text-green-500 font-bold">✓</span>
                        ) : row[3] === "✗" ? (
                          <span className="text-red-400">✗</span>
                        ) : (
                          <span className="text-yellow-500 text-xs">
                            {row[3]}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row[4] === "✓" ? (
                          <span className="text-green-500 font-bold">✓</span>
                        ) : row[4] === "✗" ? (
                          <span className="text-red-400">✗</span>
                        ) : (
                          <span className="text-yellow-500 text-xs">
                            {row[4]}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong className="text-purple-500">
                  Twent is the only marketplace
                </strong>{" "}
                specifically designed for AI skills, workflows, and automation
                templates. Gumroad takes 10% (no Pro option). GitHub Sponsors has 0 monetization features. Twent gives you built-in
                distribution + 0% commission with Pro.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Common questions from creators.
              </p>
            </div>

            <div className="text-left">
              <FAQItem
                question="How do I price my product?"
                answer="You choose any price from free to $500+. Most creators price between $5-$50. Start low to get reviews, then raise as you build credibility. Free products still earn — you get 70% from Twent credits if offered."
              />
              <FAQItem
                question="How do I get my first reviews?"
                answer="Share your product on social media, Discord, or with friends. Offer free copies to early supporters in exchange for honest reviews. Twent displays ratings prominently — good reviews lead to more sales."
              />
              <FAQItem
                question="Can I update my product after publishing?"
                answer="Yes! Upload a new version anytime. All existing buyers automatically get the update for free. This keeps buyers happy and earns you goodwill for future products."
              />
              <FAQItem
                question="When do I get paid?"
                answer="Payouts run weekly. Minimum $10 to withdraw via Stripe or PayPal. With Pro ($20 one-time), you keep 100% — no waiting, no hidden fees."
              />
              <FAQItem
                question="What's the commission structure?"
                answer="Free tier: Twent takes 30%, you keep 70%. Pro ($20 one-time): you keep 100%, Twent takes 0%. Pro pays for itself after just a few sales at higher price points."
              />
              <FAQItem
                question="Do I need to handle support?"
                answer="You handle support entirely. Twent doesn't介入 between you and buyers. Include clear documentation with your product — it reduces support requests dramatically."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          ref={ctaRef}
          className="py-20 md:py-28 px-6 bg-zinc-900 dark:bg-zinc-950"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-6">
              Ready to Monetize Your Expertise?
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already earning from their AI
              expertise. Free to start, no upfront costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://pub-84df04198c6b46f19ce9ed18d378ff7e.r2.dev/app-release.apk"
                className="inline-flex items-center justify-center px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors duration-200"
              >
                Download Free APK
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
              <a
                href="/docs#marketplace"
                className="inline-flex items-center justify-center px-8 py-4 border border-zinc-700 hover:border-zinc-600 text-white font-medium transition-colors duration-200"
              >
                Read the Docs
              </a>
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              Free tier: 70/30 split. Pro ($20 one-time): 100%/0%. Automatic updates to
              buyers.
            </p>
          </div>
        </section>
        {/* Related Pages */}
        <section className="py-16 px-6 bg-zinc-950 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-medium text-zinc-400 mb-6 text-center">Explore Other Audiences</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <a href="/ai-agent-for-developers" className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200">
                <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors mb-1">AI Agent for Developers</div>
                <div className="text-xs text-zinc-500">Claude Code, MCP tools, GitHub CLI, full IDE on mobile</div>
              </a>
              <a href="/terminal-on-android" className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200">
                <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors mb-1">Terminal on Android</div>
                <div className="text-xs text-zinc-500">Full Linux on your phone — SSH, apt, git, daemons</div>
              </a>
              <a href="/android-automation-power-user" className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200">
                <div className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors mb-1">Automation Power User</div>
                <div className="text-xs text-zinc-500">Automate everything — apps, APIs, Tasker, cron jobs</div>
              </a>
              <a href="/privacy-first-ai-android" className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200">
                <div className="text-sm font-medium text-white group-hover:text-green-400 transition-colors mb-1">Privacy-First AI</div>
                <div className="text-xs text-zinc-500">BYOK encryption, local MNN models, zero telemetry</div>
              </a>
              <a href="/enterprise-ai-agent" className="group p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all duration-200">
                <div className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors mb-1">Enterprise</div>
                <div className="text-xs text-zinc-500">On-premise deployment, custom workflows, team management</div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}