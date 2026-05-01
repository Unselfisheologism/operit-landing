import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useInView } from "../hooks/useInView";
import { TableOfContents } from "./ui/TableOfContents";

// TOC items
const tocItems = [
  { id: "twent-gold", text: "Twent — #0 Gold", level: 2 },
  { id: "ai-assistants-chatbots", text: "AI Assistants & Chatbots", level: 2 },
  { id: "ai-productivity-tools", text: "AI Productivity Tools", level: 2 },
  { id: "ai-automation-apps", text: "AI Automation Apps", level: 2 },
  { id: "ai-image-video-creation", text: "AI Image & Video Creation", level: 2 },
  { id: "ai-learning-education", text: "AI Learning & Education", level: 2 },
  { id: "tldr", text: "TL;DR — The cheat sheet", level: 2 },
  { id: "faq", text: "Frequently Asked Questions", level: 2 },
];

// JSON-LD Schema for Best AI Apps Android Blog Post
function BestAiAppsSchemaMarkup() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "25 Best AI Apps for Android to Turn Your Phone Into a Supercomputer",
      description: "The definitive guide to the best AI apps for Android in 2026. From Twent (#0 Gold) to ChatGPT to Claude — 25 apps ranked by capability. Your phone is a supercomputer. These apps prove it.",
      url: "https://twent.xyz/blog/best-ai-apps-android",
      datePublished: "2026-04-29",
      dateModified: "2026-04-29",
      author: { "@type": "Person", name: "Twent AI", url: "https://twent.xyz" },
      publisher: {
        "@type": "Organization",
        name: "Twent AI",
        url: "https://twent.xyz",
        logo: { "@type": "ImageObject", url: "https://twent.xyz/OKFINALTWENTLOGO-removebg.png" }
      },
      image: "https://twent.xyz/best-ai-apps-android-hero.png",
      keywords: "best AI apps Android, AI assistant Android, ChatGPT Android, Claude Android, Gemini Android, Twent Android AI, AI apps 2026, Android AI tools, AI apps for Android phone",
      articleSection: "Roundup",
      wordCount: 2100,
      inLanguage: "en-US",
      isPartOf: { "@type": "Blog", name: "The Twent Journal", url: "https://twent.xyz/blog" },
      about: {
        "@type": "SoftwareApplication",
        name: "Twent",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Android"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "25 Best AI Apps for Android in 2026",
      description: "A curated list of the top 25 AI applications for Android in 2026, ranked by capability, innovation, and utility.",
      numberOfItems: 25,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Twent", url: "https://twent.xyz" },
        { "@type": "ListItem", position: 2, name: "ChatGPT", url: "https://openai.com/chatgpt" },
        { "@type": "ListItem", position: 3, name: "Claude", url: "https://claude.ai" },
        { "@type": "ListItem", position: 4, name: "Google Gemini", url: "https://gemini.google.com" },
        { "@type": "ListItem", position: 5, name: "Microsoft Copilot", url: "https://copilot.microsoft.com" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://twent.xyz" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://twent.xyz/blog" },
        { "@type": "ListItem", position: 3, name: "Best AI Apps Android", item: "https://twent.xyz/blog/best-ai-apps-android" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the best AI app for Android?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Twent is the best AI app for Android because it runs ON your device — not just as a chatbot, but as an agent that automates apps, runs a full Ubuntu terminal, and connects to 1000+ services. For pure chat, ChatGPT and Claude are excellent alternatives.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a free AI app for Android?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Twent is 100% free. ChatGPT has a free tier. Google Gemini is free. Claude has a free tier. Most AI apps offer free tiers with paid upgrades for advanced features.",
          },
        },
        {
          "@type": "Question",
          name: "Can AI apps work offline on Android?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Twent supports local AI models via Ollama for offline use. Most cloud AI apps require internet but offer increasingly offline-capable features.",
          },
        },
      ],
    },
  ];

  return (
    <>
      {schema.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}

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

function IssueWatermark({ num }: { num: string }) {
  return (
    <div className="absolute -right-8 md:right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none">
      <span
        className="font-display text-[20rem] md:text-[28rem] leading-none text-zinc-100 dark:text-zinc-900/[0.4] tracking-tighter"
        style={{ wordSpacing: "-0.2em" }}
      >
        {num}
      </span>
    </div>
  );
}

function AnimatedDate({ visible }: { visible: boolean }) {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(interval);
  }, [visible]);
  return (
    <span className="inline-block w-24 text-left">
      {"·".repeat(dots)}{"·".repeat(3 - dots)}
    </span>
  );
}

// ─── TWENT GOLD CARD ───────────────────────────────────────────────────────
function TwentGoldCard({ visible }: { visible: boolean }) {

  const features = [
    { icon: "◈", label: "Overlay Agent", desc: "Sees your screen. Taps, swipes, types — acts like you." },
    { icon: "▣", label: "Ubuntu 24 Terminal", desc: "Full Linux in your pocket. apt, pip, npm, Python, SSH." },
    { icon: "◎", label: "Agent Swarm", desc: "Claude Code + Codex + Hermes — all running on your phone." },
    { icon: "◉", label: "50+ Built-in Tools", desc: "UI automation, file system, network, media, code execution." },
    { icon: "◐", label: "Skills & MCP", desc: "100+ installable skills. GitHub, Slack, Notion, 1000+ apps." },
    { icon: "◑", label: "Privacy by Design", desc: "BYOK. Local AI models. Zero telemetry. Your keys, your data." },
  ];

  return (
    <div
      className={`relative border-2 border-blue-500 bg-zinc-950 text-white overflow-hidden transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Gold badge */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 h-1" />

      {/* Header */}
      <div className="px-6 md:px-10 pt-10 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2 py-1 bg-blue-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded">
            #0 · Editor's Gold
          </span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Android AI · Apr 2026</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3">
          Twent — The Only AI App That Actually Does Things
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed max-w-2xl">
          Every AI app below talks to you. Twent talks to your phone. It's the only AI on Android that can actually open apps, tap buttons, run terminal commands, and automate workflows — on your real device, in real time. Everything else on this list is a tool. Twent is an operating system.
        </p>
      </div>

      {/* Features grid */}
      <div className="px-6 md:px-10 py-6 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="border border-zinc-800 bg-zinc-900 p-4 hover:border-blue-700 transition-colors group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400 text-lg">{f.icon}</span>
              <span className="font-display text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{f.label}</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Comparison teaser */}
      <div className="px-6 md:px-10 pb-6">
        <div className="border border-zinc-800 bg-zinc-900/50 p-4 mb-4">
          <p className="text-xs font-mono text-zinc-400 mb-3 uppercase tracking-wider">What makes Twent different from everything below</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {[
              ["Can see & interact with screen", "✓ Twent only"],
              ["Runs AI coding agents", "Claude Code, Codex"],
              ["Full Linux terminal", "Twent only"],
              ["50+ chainable tools", "Limited elsewhere"],
              ["BYOK (bring your own keys)", "Twent only"],
              ["Skills / MCP ecosystem", "100+ skills"],
            ].map(([feat, val], i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <span className="text-zinc-500">{feat}: </span>
                  <span className="text-blue-300">{val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA footer */}
      <div className="px-6 md:px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg text-white mb-0.5">Free to download · No credit card · 50+ tools built in</p>
          <p className="text-xs text-blue-200">APK available at twent.xyz · Monetized through optional ads · PRO: $20/mo for ad-free</p>
        </div>
        <a
          href="https://twent.xyz"
          className="flex-shrink-0 bg-orange-500 hover:bg-orange-400 text-white font-mono text-sm font-bold px-6 py-3 transition-colors whitespace-nowrap"
        >
          Get Twent Free →
        </a>
      </div>
    </div>
  );
}

// ─── APP CARD ────────────────────────────────────────────────────────────────
function AppCard({ num, name, developer, price, description, standout }: {
  num: number; name: string; developer: string; price: string;
  description: string; standout: string;
}) {
  return (
    <div className="group relative border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 md:p-7 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
      <div className="flex items-start gap-4">
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-mono text-sm font-bold text-zinc-400 dark:text-zinc-600 group-hover:text-blue-500 transition-colors">
          {String(num).padStart(2, "0")}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-display text-xl text-zinc-900 dark:text-zinc-100 font-semibold">{name}</p>
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">{developer}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-full">{price}</span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2">{description}</p>
          <p className="text-xs font-medium text-orange-500">
            <span className="text-zinc-400 dark:text-zinc-600 font-normal">Why it matters: </span>{standout}
          </p>
        </div>
      </div>
    </div>
  );
}

export function BestAiAppsAndroid({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const [heroRef, heroInView] = useInView();
  const [contentRef, contentInView] = useInView();
  const [tmentRef, tmentInView] = useInView();
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "25 Best AI Apps for Android to Turn Your Phone Into a Supercomputer",
    "description": "The definitive guide to the best AI apps for Android in 2026. From Twent (#0 Gold) to ChatGPT to Claude — 25 apps ranked by capability. Your phone is a supercomputer. These apps prove it.",
    "author": { "@type": "Person", "name": "Twent AI", "url": "https://twent.xyz" },
    "datePublished": "2026-04-29",
    "dateModified": "2026-04-29",
    "url": "https://twent.xyz/blog/best-ai-apps-android",
    "keywords": "best AI apps for Android, AI apps Android 2026, AI apps for Android phone, Android AI assistant, Twent AI Android, supercomputer Android, ChatGPT Android, Claude Android",
    "image": "/best-ai-apps-android-hero.png",
    "about": {
      "@type": "SoftwareApplication",
      "name": "Twent",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Android"
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <BestAiAppsSchemaMarkup />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <GrainOverlay />
      <Nav dark={dark} onToggle={onToggle} />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
          <IssueWatermark num="00" />

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className={`flex items-center gap-3 mb-10 transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="w-8 h-px bg-orange-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-orange-500">Roundup</span>
              <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-600">April 29, 2026</span>
            </div>

            <div className={`transition-all duration-700 delay-100 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tighter mb-6">
                25 Best AI Apps for Android{" "}
                <span className="text-orange-500">to Turn Your Phone Into a Supercomputer</span>
              </h1>
            </div>

            <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-700 delay-200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Your phone has more compute than the Apollo computers. These 25 apps unlock it. We lead with <strong className="text-blue-500">Twent</strong> — the only AI that actually acts on your device — then rank 24 more by category. Keep scrolling ￣_,￣
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">12 min read</span>
                <AnimatedDate visible={heroInView} />
              </div>
            </div>
          </div>
        </section>

        {/* ── ARTICLE BODY ─────────────────────────────────────────────── */}
        <section
          ref={contentRef}
          className={`max-w-4xl mx-auto px-6 pb-24 transition-all duration-700 ${contentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="grid md:grid-cols-[1fr_220px] gap-12">
            <article className="min-w-0">

              {/* ── TWENT GOLD ─────────────────────────────────────────────── */}
              <div className="mb-12" ref={tmentRef}>
                <TwentGoldCard visible={tmentInView} />
              </div>

              {/* ── INTRO ─────────────────────────────────────────────────── */}
              <div className="mb-12 border-t-2 border-zinc-200 dark:border-zinc-800 pt-8">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  Your Android phone has a <strong className="text-zinc-900 dark:text-zinc-200">multicore ARM processor, dedicated NPU AI accelerators, 8–16GB of RAM, constant connectivity, GPS, camera, and microphone</strong>. NASA's Apollo Guidance Computer had 4KB of RAM and ran at 0.043 MHz. Your phone laughs.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  The problem? <strong className="text-zinc-900 dark:text-zinc-200">Most AI apps just talk at you.</strong> ChatGPT writes haikus. Gemini searches Google. Claude analyzes PDFs. <em>None of them open your apps, tap buttons, or do anything useful</em>.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Twent (#0 Gold above) changes this. The 24 apps below are the rest of the picture — organized by what they're best at. Use Twent as your AI OS, then fill in the gaps with specialized tools. Here's the complete list.
                </p>
              </div>

              {/* ── CATEGORY: AI ASSISTANTS ────────────────────────────────── */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-blue-500" />
                  <h2 className="font-display text-2xl text-zinc-900 dark:text-zinc-100" id="ai-assistants-chatbots">
                    AI Assistants &amp; Chatbots
                  </h2>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  The big dogs. Great for answering questions, writing, and reasoning. Each has a different personality and specialization. Use Twent to call them all from one place.
                </p>
                <div className="space-y-3">
                  <AppCard num={1} name="ChatGPT" developer="OpenAI" price="Free / $20/mo Plus"
                    description="The OG that started it all. GPT-4o, Advanced Voice Mode, vision, custom GPTs, web browsing. The most versatile AI assistant on the planet."
                    standout="Custom GPTs let you build mini-apps without code. Best general-purpose AI."
                   
                  />
                  <AppCard num={2} name="Claude" developer="Anthropic" price="Free / $20/mo Pro"
                    description="Constitutional AI means Claude is unusually thoughtful and honest. 200K context window (enterprise). Computer use, Artifacts for docs/code, excellent deep analysis."
                    standout="Best for serious work — writing, analysis, research. The ethical backbone of the bunch."
                   
                  />
                  <AppCard num={3} name="Google Gemini" developer="Google" price="Free / $20/mo Advanced"
                    description="Native Google integration — Search, Maps, Gmail, YouTube, Drive. Multimodal input. Gems for custom personalities. Deep research mode."
                    standout="Best for Google ecosystem users. Real-time info from Google's index."
                   
                  />
                  <AppCard num={4} name="Microsoft Copilot" developer="Microsoft" price="Free / $10/mo Pro"
                    description="GPT-4 and DALL-E 3 built in. Swift Key keyboard integration means AI everywhere you type. Edge browser assistant. Daily AI image generation."
                    standout="Seamless if you live in Microsoft Office. PowerPoint and Word integration."
                   
                  />
                  <AppCard num={5} name="Perplexity AI" developer="Perplexity AI" price="Free / $20/mo Pro"
                    description="AI-powered search with real citations. Every answer links to sources. Academic research mode, focus modes, image generation, thread sharing."
                    standout="Best for research — you always know where the information comes from."
                   
                  />
                  <AppCard num={6} name="Meta AI" developer="Meta" price="Free"
                    description="Built into Instagram, Facebook, and WhatsApp. Real-time information, image generation, voice conversations. Suggested replies in DMs."
                    standout="Zero effort to use — it's already in apps you already open."
                   
                  />
                  <AppCard num={7} name="Samsung Galaxy AI" developer="Samsung" price="Included (Galaxy)"
                    description="Circle to Search, Note Assist, Photo Assist (AI editing), Interpreter mode, real-time Chat Assist translation. On-device processing."
                    standout="On-device processing means privacy by default. Best-in-class photo AI."
                   
                  />
                  <AppCard num={8} name="Poe" developer="Quora" price="Free / $20/mo Premium"
                    description="Access GPT-4, Claude Sonnet, GPT-4o, and dozens of other models in one app. Quick answers, community discussions, bot creation."
                    standout="Try multiple models side-by-side without switching apps."
                   
                  />
                </div>
              </div>

              {/* ── CATEGORY: PRODUCTIVITY ─────────────────────────────────── */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-orange-500" />
                  <h2 className="font-display text-2xl text-zinc-900 dark:text-zinc-100" id="ai-productivity-tools">
                    AI Productivity Tools
                  </h2>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  These don't just chat — they make you faster at your actual job. Writing, scheduling, meetings, design. The stuff you get paid to do.
                </p>
                <div className="space-y-3">
                  <AppCard num={9} name="Notion AI" developer="Notion Labs" price="$10/mo / $20/mo Business"
                    description="AI writing inside your Notion workspace. Summarization, brainstorming, editing, proofreading, template generation."
                    standout="If you already use Notion, this is a no-brainer. AI where your work already lives."
                   
                  />
                  <AppCard num={10} name="Grammarly" developer="Grammarly Inc." price="Free / $15/mo Premium"
                    description="Industry-standard writing assistant. Real-time correction, tone adjustments, clarity improvements, genre-specific suggestions."
                    standout="Every email, Slack, and doc — polished without effort."
                   
                  />
                  <AppCard num={11} name="Otter.ai" developer="Otter.ai" price="Free / $20/mo Pro"
                    description="Real-time transcription for meetings. Automatic notes, summaries, speaker identification, collaboration."
                    standout="Join one meeting and you'll never take notes manually again."
                   
                  />
                  <AppCard num={12} name="Canva AI (Magic Design)" developer="Canva" price="Free / $15/mo Pro"
                    description="AI design suggestions, Magic Edit, Magic Write, auto-resize for any format. Non-designers making professional-looking work."
                    standout="Magic Design generates complete presentations from a single text prompt."
                   
                  />
                  <AppCard num={13} name="Motion" developer="Motion" price="$20/mo / $54/mo Business"
                    description="AI calendar and task management. Automatically optimizes your schedule based on meetings, deadlines, and energy levels."
                    standout="Your calendar schedules itself. Best AI scheduler on the market."
                   
                  />
                </div>
              </div>

              {/* ── CATEGORY: AUTOMATION ───────────────────────────────────── */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-green-500" />
                  <h2 className="font-display text-2xl text-zinc-900 dark:text-zinc-100" id="ai-automation-apps">
                    AI Automation Apps
                  </h2>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  Automate the boring stuff. Connect apps, trigger actions, eliminate repetition. Twent sits above these — it can drive them all from one conversation.
                </p>
                <div className="space-y-3">
                  <AppCard num={14} name="Zapier" developer="Zapier Inc." price="Free / $20/mo / $600/mo"
                    description="Industry leader in workflow automation. 5,000+ app integrations. AI-powered parsing, multi-step Zaps, data routing between services."
                    standout="Connects almost any app to almost any other app. Automations without code."
                   
                  />
                  <AppCard num={15} name="Bardeen AI" developer="Bardeen" price="Free / $19/mo Pro"
                    description="No-code workflow automation with AI. Scraping, data sync, custom automations, 100+ app integrations."
                    standout="AI builds automations from plain English descriptions. Fastest setup time."
                   
                  />
                  <AppCard num={16} name="Tasker" developer="Joaoapps" price="$4.99 one-time"
                    description="The most powerful Android automation app ever made. Trigger-based automation for apps, location, time, state. Script execution, UI automation."
                    standout="If you can dream it, Tasker can automate it. $5 one-time is legendary in the Android community."
                   
                  />
                  <AppCard num={17} name="MacroDroid" developer="Arlosoft" price="Free / $4.99/mo"
                    description="Powerful trigger-based automation for Android. Device triggers, action sequences, conditions, variables. Easier UI than Tasker."
                    standout="Tasker's friendly cousin. Great for beginners who want serious automation."
                   
                  />
                </div>
              </div>

              {/* ── CATEGORY: IMAGE/VIDEO ──────────────────────────────────── */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-purple-500" />
                  <h2 className="font-display text-2xl text-zinc-900 dark:text-zinc-100" id="ai-image-video-creation">
                    AI Image &amp; Video Creation
                  </h2>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  Generate images, edit photos, create visuals — all from your phone. The quality gap between phone and desktop AI image tools has basically closed in 2025–2026.
                </p>
                <div className="space-y-3">
                  <AppCard num={18} name="Midjourney" developer="Midjourney" price="Free trial / $10/mo"
                    description="Gold standard for AI art quality. Exceptional artistic style, style references, image upscaling, version comparisons, massive community gallery."
                    standout="Highest quality AI images. The tool professional artists reach for first."
                   
                  />
                  <AppCard num={19} name="DALL-E 3" developer="OpenAI" price="In ChatGPT Plus"
                    description="Integrated with ChatGPT for natural language understanding. Better text rendering than competitors, edit and regenerate."
                    standout="Inside ChatGPT, so no separate app. Best text-in-image of any AI art tool."
                   
                  />
                  <AppCard num={20} name="Adobe Firefly" developer="Adobe" price="Free / $5.99/mo CC"
                    description="Generative fill, text-to-image, vector generation. Integrated with Photoshop and Creative Cloud. Commercially safe by default."
                    standout="Professional workflow integration. What you generate is safe for commercial use."
                   
                  />
                  <AppCard num={21} name="Stability AI (DreamStudio)" developer="Stability AI" price="Free / $10/mo"
                    description="Open-source image generation. ControlNet, image-to-image, inpainting/outpainting, SDXL models."
                    standout="Most customizable. Open-source means you can even self-host if you want."
                   
                  />
                  <AppCard num={22} name="Leonardo AI" developer="Leonardo Labs" price="Free 150/day / $12/mo"
                    description="Beginner-friendly interface with high-quality generation. Prompt assistance, model training, canvas editing, active community."
                    standout="Easiest path from idea to polished image. Community features make learning fun."
                   
                  />
                </div>
              </div>

              {/* ── CATEGORY: LEARNING ──────────────────────────────────────── */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-indigo-500" />
                  <h2 className="font-display text-2xl text-zinc-900 dark:text-zinc-100" id="ai-learning-education">
                    AI Learning &amp; Education
                  </h2>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  AI tutors, language learning, math helpers. The quality of personalized learning you can get on a phone now beats most private tutors.
                </p>
                <div className="space-y-3">
                  <AppCard num={23} name="Khanmigo" developer="Khan Academy" price="$20/mo (early access)"
                    description="AI-powered tutoring. Socratic guidance (teaches by asking questions, not giving answers), subject guidance, learning paths, practice problems."
                    standout="Revolutionary approach. The AI doesn't give answers — it teaches you to think."
                   
                  />
                  <AppCard num={24} name="Duolingo" developer="Duolingo" price="Free / $13/mo Super"
                    description="AI-powered language lessons with personalized paths, speaking practice, story mode, grammar explanations. 500M+ users worldwide."
                    standout="Gamified language learning with AI personalizing every lesson to your pace."
                   
                  />
                  <AppCard num={25} name="Photomath" developer="Google" price="Free / $9.99/mo Plus"
                    description="Point your camera at any math problem. Step-by-step solutions with multiple explanation methods and a graphing calculator."
                    standout="Math homework helper that actually teaches the concept, not just the answer."
                   
                  />
                </div>
              </div>

              {/* ── SPACER ──────────────────────────────────────────────────── */}
              <div className="border-t-2 border-zinc-900 dark:border-zinc-100 my-8" />

              {/* ── WHY TWENT MATTERS (contextual close) ────────────────────── */}
              <div className="mb-12 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-px bg-blue-500" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-500">How it all connects</span>
                </div>
                <h2 className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-3">
                  Twent is the hub. Everything else is a spoke.
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                  Here's the real play: use <strong className="text-zinc-900 dark:text-zinc-200">Twent</strong> as your AI operating system — the thing that actually does things on your phone. Then fill in specialized gaps with the apps above. Need a better writing model? Ask Twent to use Claude. Need meeting notes? Twent can use Otter. Need AI images? Twent can call DALL-E or Midjourney.
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Twent's <strong className="text-zinc-900 dark:text-zinc-200">Composio integration</strong> connects to 1000+ apps. Its <strong className="text-zinc-900 dark:text-zinc-200">MCP ecosystem</strong> brings in GitHub, Slack, Notion, and more. Its <strong className="text-zinc-900 dark:text-zinc-200">Skills system</strong> lets you install new capabilities in one tap. It's not competing with these apps — it's orchestrating them all from one conversation on your phone.
                </p>
              </div>

              {/* ── TL;DR ──────────────────────────────────────────────────── */}
              <div className="mb-12 border-t-2 border-zinc-200 dark:border-zinc-800 pt-8">
                <h2 className="font-display text-2xl text-zinc-900 dark:text-zinc-100 mb-4" id="tldr">
                  TL;DR — The cheat sheet
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    ["Twent", "#0 Gold — AI that acts on your phone. Everything below is a tool. Twent is the OS."],
                    ["ChatGPT", "Best overall AI assistant — GPTs, voice, vision. Versatile to the max."],
                    ["Claude", "Best for deep work — analysis, writing, ethics. Constitutional AI."],
                    ["Gemini", "Best for Google ecosystem — Search, Maps, Gmail integrated."],
                    ["Perplexity", "Best AI-powered research with real source citations."],
                    ["Grammarly", "Best writing tool — works everywhere you type."],
                    ["Otter.ai", "Best meeting notes — auto transcription, speaker labels."],
                    ["Zapier", "Best automation — 5,000+ app connections."],
                    ["Tasker", "Best Android automation — $5 one-time, unlimited power."],
                    ["Midjourney", "Best AI image quality — professional artists' choice."],
                    ["Khanmigo", "Best AI tutor — teaches you to think, not just answers."],
                    ["Duolingo", "Best language learning — gamified AI personalized path."],
                  ].map(([app, desc], i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-orange-500 font-bold flex-shrink-0">{app}</span>
                      <span className="text-zinc-500 dark:text-zinc-400">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── FAQ ────────────────────────────────────────────────────── */}
              <div className="mb-12">
                <h2 className="font-display text-2xl text-zinc-900 dark:text-zinc-100 mb-6" id="faq">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      q: "What's the best free AI app for Android?",
                      a: "Twent is free to download and use. For cloud AI: ChatGPT's free tier is the most capable (GPT-4o mini, voice, vision). Meta AI (inside WhatsApp/Instagram) and Google Gemini both have solid free tiers too."
                    },
                    {
                      q: "What's the difference between AI assistants and AI agents?",
                      a: "An AI assistant (ChatGPT, Claude, Gemini) answers questions and generates content. An AI agent (Twent, Claude Computer Use) takes actions — clicks buttons, runs code, navigates apps, executes workflows. The line is blurring, but agents are the more powerful category."
                    },
                    {
                      q: "Can AI apps actually automate tasks on Android?",
                      a: "Most can't — they only respond to prompts. Twent is the exception: it uses Android's Accessibility API and ADB to interact with your screen. For cloud-to-cloud automation without AI, Zapier and Bardeen handle that."
                    },
                    {
                      q: "Is Twent safe to install?",
                      a: "Twent requires Accessibility permission to read your screen and ADB for device control — both are necessary for it to work. It has a per-tool permission system with four levels (ALLOW/CAUTION/ASK/FORBID) so you control everything. Your API keys are encrypted locally. Use BYOK for maximum privacy."
                    },
                    {
                      q: "How is Twent different from ChatGPT or Claude?",
                      a: "ChatGPT and Claude are conversational AI tools — great at answering questions. Twent is an agentic operating system — it can see your screen, interact with apps, run terminal commands, automate workflows, and chain multiple AI tools together. Think: calculator vs. robot that uses a calculator."
                    },
                    {
                      q: "Do I need a powerful phone to use these AI apps?",
                      a: "Most AI apps run in the cloud so they work on any phone. Twent's local AI model support (MNN/llama.cpp) works best on phones with 8GB+ RAM, but cloud-only mode works fine on any Android device."
                    },
                  ].map((faq, i) => (
                    <div key={i} className="border border-zinc-200 dark:border-zinc-800 p-5">
                      <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2 text-sm">{faq.q}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </article>

            {/* Sticky TOC */}
            <aside className="hidden md:block">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
