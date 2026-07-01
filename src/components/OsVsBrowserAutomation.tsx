import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useInView } from "../hooks/useInView";
import { TableOfContents } from "./ui/TableOfContents";

// JSON-LD Schema for OS vs Browser Automation Blog Post
function OsVsBrowserSchemaMarkup() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline:
        "Why OS-Level AI Automation Beats Browser-Level Automation Every Time",
      description:
        "AI browsers like Perplexity Comet and ChatGPT Atlas are fundamentally unsafe due to prompt injection, cross-tab data leakage, and aggressive data harvesting. OS-level automation apps like Twent avoid every one of these risks — here's how.",
      url: "https://twent.xyz/blog/os-vs-browser-automation",
      datePublished: "2026-07-01",
      dateModified: "2026-07-01",
      author: {
        "@type": "Person",
        name: "Twent AI",
        url: "https://twent.xyz",
      },
      publisher: {
        "@type": "Organization",
        name: "Twent AI",
        url: "https://twent.xyz",
        logo: {
          "@type": "ImageObject",
          url: "https://twent.xyz/OKFINALTWENTLOGO-removebg.png",
        },
      },
      image: "https://twent.xyz/os-vs-browser-hero.png",
      keywords:
        "OS-level AI automation, browser automation security, prompt injection, AI browser risks, Twent Android, Perplexity Comet security, ChatGPT Atlas security, browser-use.com, aside.com, AI agent safety",
      articleSection: "Engineering",
      wordCount: 1400,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "Blog",
        name: "The Twent Journal",
        url: "https://twent.xyz/blog",
      },
      about: {
        "@type": "SoftwareApplication",
        name: "Twent",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Android",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Twent",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Android",
      url: "https://twent.xyz",
      description:
        "Personal agentic OS for Android — full terminal, local AI models, deep system automation, floating chat overlay, 1000+ integrations. All free, all local, no cloud dependency.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://twent.xyz",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://twent.xyz/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "OS vs Browser Automation",
          item: "https://twent.xyz/blog/os-vs-browser-automation",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is OS-level AI automation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "OS-level AI automation runs at the operating system layer, using native APIs (accessibility services, shell commands, system intents) instead of browser tabs. Apps like Twent tap into Android's accessibility framework to perform actions across any app — no browser needed.",
          },
        },
        {
          "@type": "Question",
          name: "Why are AI browsers considered unsafe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI browsers are unsafe because they are vulnerable to prompt injection attacks hidden in web pages, they can leak data across tabs via agentic capabilities, and they harvest sensitive user data for personalization — all of which can be exploited by attackers.",
          },
        },
        {
          "@type": "Question",
          name: "How does Twent avoid browser automation risks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Twent operates at the OS level as a native Android app. It has no browser DOM to inject into, no tab context to leak across, and no web-based prompt injection surface. Actions are executed through Android's accessibility services and shell commands, which are not susceptible to web-based prompt injection attacks.",
          },
        },
      ],
    },
  ];

  return (
    <>
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

// TOC items
const tocItems = [
  { id: "the-problem", text: "The problem with browser-level automation", level: 2 },
  { id: "prompt-injection", text: "Prompt injection: the web's backdoor", level: 2 },
  { id: "cross-tab-leakage", text: "Cross-tab data leakage", level: 2 },
  { id: "data-harvesting", text: "Data-hungry AI browsers", level: 2 },
  { id: "os-level-different", text: "Why OS-level is fundamentally different", level: 2 },
  { id: "twent-approach", text: "How Twent does it", level: 2 },
  { id: "comparison", text: "Browser vs OS: side by side", level: 2 },
  { id: "tldr", text: "TL;DR", level: 2 },
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

// Large decorative "03" watermark
function IssueWatermark() {
  return (
    <div className="absolute -right-8 md:right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none">
      <span
        className="font-display text-[20rem] md:text-[28rem] leading-none text-zinc-100 dark:text-zinc-900/[0.4] tracking-tighter"
        style={{ wordSpacing: "-0.2em" }}
      >
        03
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

export function OsVsBrowserAutomation({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  const [heroRef, heroInView] = useInView();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <OsVsBrowserSchemaMarkup />
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
                Engineering
              </span>
              <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-600">
                July 1, 2026
              </span>
            </div>

            {/* Main title */}
            <div
              className={`transition-all duration-700 delay-100 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tighter mb-6">
                Why OS-Level AI Automation{" "}
                <span className="text-orange-500">Beats Browser-Level</span>{" "}
                Every Time
              </h1>
            </div>

            {/* Subtitle row */}
            <div
              className={`flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-700 delay-200 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                AI browsers are being hacked through prompt injection, cross-tab
                data leakage, and aggressive data harvesting. OS-level automation
                avoids every single one of these risks — here's the technical
                breakdown.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                  7 min read
                </span>
                <AnimatedDate visible={heroInView} />
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
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div
            className="animate-fadeIn"
          >
            {/* Table of Contents */}
            <TableOfContents items={tocItems} />

            <div className="prose prose-zinc dark:prose-invert max-w-none">
              {/* Opening hook */}
              <p className="text-lg leading-relaxed mb-8">
                AI browsers like Perplexity Comet, ChatGPT Atlas, and
                browser-level automation tools like browser-use.com and aside.com
                promise to automate your browsing. But they all share a critical
                flaw: they operate <strong>inside the browser</strong>, where the
                web content itself is the attack surface. This article breaks down
                why that's a fundamental architectural problem — and why OS-level
                automation sidesteps it entirely.
              </p>

              {/* Section: The Problem */}
              <h2
                id="the-problem"
                className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32"
              >
                The problem with browser-level automation
              </h2>

              <p className="text-base leading-relaxed mb-6">
                Browser-level automation tools — whether they're AI browsers that
                control tabs, or developer tools like browser-use.com and aside.com
                that drive a browser via Playwright or Chrome DevTools Protocol —
                all operate within the same context as the web content they're
                automating. The AI reads the same DOM, the same HTML, the same
                JavaScript that every attacker can modify.
              </p>

              <p className="text-base leading-relaxed mb-6">
                This creates three specific attack vectors that researchers have
                already demonstrated in the wild:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    num: "01",
                    title: "Prompt Injection",
                    desc: "Hidden instructions in web pages that hijack the AI's behavior",
                  },
                  {
                    num: "02",
                    title: "Cross-Tab Leakage",
                    desc: "Agentic AI sees all open tabs — one compromised page leaks everything",
                  },
                  {
                    num: "03",
                    title: "Data Harvesting",
                    desc: "AI browsers memorize your sessions, creating a single point of failure",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
                  >
                    <span className="text-[10px] font-mono text-orange-500 tracking-[0.2em] block mb-2">
                      {item.num}
                    </span>
                    <p className="font-display text-base text-zinc-900 dark:text-zinc-100 mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Section: Prompt Injection */}
              <h2
                id="prompt-injection"
                className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32"
              >
                Prompt injection: the web's backdoor
              </h2>

              <p className="text-base leading-relaxed mb-6">
                Prompt injection is the single biggest threat to AI browsers, and
                it's trivially easy to execute. The core problem: the LLM driving
                your AI browser cannot reliably distinguish between <em>your</em>{" "}
                instructions and <em>web content</em> it's reading. A hacker embeds
                a hidden instruction in a web page, and when the AI processes that
                page, it treats the injected instruction as a legitimate command.
              </p>

              <p className="text-base leading-relaxed mb-6">
                Security researchers have demonstrated this repeatedly:
              </p>

              <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    Brave × Perplexity Comet:
                  </strong>{" "}
                  Researchers at Brave asked Comet to summarize a Reddit thread. A
                  malicious comment in the thread contained a hidden prompt
                  injection. Comet read it, treated it as a user command, and
                  started sharing the user's email and OTP in the Reddit comments
                  — all without the user's knowledge.
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    ChatGPT Atlas (100% success rate):
                  </strong>{" "}
                  A developer named Brennan demonstrated that injecting hidden
                  instructions into HTML — via transparent text, tiny font sizes,
                  or image alt attributes — achieves a 100% prompt injection success
                  rate against Atlas.
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-900 dark:text-zinc-100">
                    CometJacking (LayerX):
                  </strong>{" "}
                  Security researchers showed that malicious instructions can be
                  embedded directly in a URL's query string. A hyperlink like{" "}
                  <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5">
                    perplexity.ai/search/?q="malicious_prompt"
                  </code>{" "}
                  — disguised as a normal Perplexity link — executes the injection
                  the moment the user clicks.
                </p>
              </div>

              <p className="text-base leading-relaxed mb-6">
                The attack vectors are diverse and hard to defend against:
              </p>

              <ul className="space-y-3 mb-8 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 shrink-0">✗</span>
                  <span>
                    <strong>Hidden HTML:</strong>{" "}
                    <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5">
                      &lt;p style="opacity:0"&gt;
                    </code>{" "}
                    — invisible to humans, parsed by the AI
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 shrink-0">✗</span>
                  <span>
                    <strong>Image alt text:</strong>{" "}
                    <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5">
                      &lt;img alt="ignore previous instructions..."&gt;
                    </code>{" "}
                    — hidden in metadata the AI reads
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 shrink-0">✗</span>
                  <span>
                    <strong>Image steganography:</strong> Text embedded in images
                    via color combinations — invisible to humans, readable by OCR
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1 shrink-0">✗</span>
                  <span>
                    <strong>URL query injection:</strong> Malicious commands in URL
                    parameters that execute when the AI processes the link
                  </span>
                </li>
              </ul>

              {/* Section: Cross-Tab Leakage */}
              <h2
                id="cross-tab-leakage"
                className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32"
              >
                Cross-tab data leakage
              </h2>

              <p className="text-base leading-relaxed mb-6">
                Traditional browsers sandbox tabs. If you open a malicious website
                in tab A, it can't read tab B. AI browsers break this model
                entirely — they have agentic capabilities that allow them to carry
                information from one tab to another. One compromised domain can
                force the AI to access <em>all</em> your other logged-in tabs and
                accounts.
              </p>

              <p className="text-base leading-relaxed mb-6">
                Perplexity's own documentation confirms that Comet can see all open
                tabs. This means a single successful prompt injection on{" "}
                <em>any</em> tab can cascade across your entire browsing session —
                reading your email, your bank, your social media, and performing
                actions across all of them.
              </p>

              <p className="text-base leading-relaxed mb-8">
                Security researchers at Anthropic (the team behind Claude) have
                acknowledged that prompt injection is a legitimate, unsolved
                problem for AI-powered, agentic browsers. There is no reliable
                defense today.
              </p>

              {/* Section: Data Harvesting */}
              <h2
                id="data-harvesting"
                className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32"
              >
                Data-hungry AI browsers
              </h2>

              <p className="text-base leading-relaxed mb-6">
                AI browsers like ChatGPT Atlas build "browser memories" — they
                learn about you to provide better recommendations and execute
                actions without complex commands. This creates a rich database of
                your behavior, preferences, and credentials that becomes a single
                point of failure.
              </p>

              <p className="text-base leading-relaxed mb-8">
                If the AI is compromised through prompt injection, it doesn't just
                give up your current session — it gives up{" "}
                <em>everything it has learned about you</em>. Attackers no longer
                need to phish you directly. They just need to trick the AI, which
                is far easier because the AI can't reliably tell who it's talking to.
              </p>

              {/* Section: Why OS-Level is Different */}
              <h2
                id="os-level-different"
                className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32"
              >
                Why OS-level is fundamentally different
              </h2>

              <p className="text-base leading-relaxed mb-6">
                OS-level automation doesn't read the DOM. It doesn't parse HTML.
                It doesn't execute JavaScript from web pages. It doesn't maintain
                browser tabs. It operates at the operating system layer — using
                accessibility services, shell commands, and system intents — where
                the attack surface is entirely different.
              </p>

              <p className="text-base leading-relaxed mb-6">
                Here's why this matters for each of the three risks:
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 p-5">
                  <p className="font-display text-base text-zinc-900 dark:text-zinc-100 mb-2">
                    ✓ Prompt Injection — Eliminated
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    An OS-level agent doesn't read web page HTML as instructions.
                    There is no DOM to inject into, no alt text to hijack, no URL
                    query string to exploit. The AI reads what it needs from
                    system-level APIs — not from untrusted web content.
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 p-5">
                  <p className="font-display text-base text-zinc-900 dark:text-zinc-100 mb-2">
                    ✓ Cross-Tab Leakage — Not Applicable
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    There are no "tabs." The agent interacts with individual apps
                    through Android's accessibility services — each app is
                    sandboxed by the OS. One app cannot read another's data.
                    There's no tab context to leak across.
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 p-5">
                  <p className="font-display text-base text-zinc-900 dark:text-zinc-100 mb-2">
                    ✓ Data Harvesting — Minimized by Design
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    OS-level agents process data locally. They don't build rich
                    browsing profiles because they don't need to — they interact
                    with apps through structured APIs, not by scraping web content.
                    On-device models mean data never leaves the phone.
                  </p>
                </div>
              </div>

              {/* Section: How Twent Does It */}
              <h2
                id="twent-approach"
                className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32"
              >
                How Twent does it
              </h2>

              <p className="text-base leading-relaxed mb-6">
                Twent is an OS-level AI agent for Android. It runs natively on
                your device, uses Android's accessibility services to interact with
                any app, and executes through shell commands and system intents —
                not through a browser.
              </p>

              <p className="text-base leading-relaxed mb-6">
                Key architectural differences from browser-level tools:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    feature: "Execution layer",
                    browser: "Browser DOM / Playwright / CDP",
                    os: "Android Accessibility Services + Shell",
                  },
                  {
                    feature: "AI model",
                    browser: "Cloud API (OpenAI, Anthropic)",
                    os: "Local GGUF/MNN models (on-device)",
                  },
                  {
                    feature: "Data flow",
                    browser: "User → Cloud → Browser → Web",
                    os: "User → Device → App (never leaves phone)",
                  },
                  {
                    feature: "Prompt injection surface",
                    browser: "Every HTML element, URL, image",
                    os: "No web DOM to inject into",
                  },
                  {
                    feature: "Cross-app isolation",
                    browser: "None — AI sees all tabs",
                    os: "OS sandbox — each app is isolated",
                  },
                  {
                    feature: "Internet required",
                    browser: "Always (cloud AI)",
                    os: "Optional (local models work offline)",
                  },
                ].map((row) => (
                  <div
                    key={row.feature}
                    className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
                  >
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-orange-500 mb-2">
                      {row.feature}
                    </p>
                    <div className="flex items-start gap-2 mb-1">
                      <span className="text-red-500 text-xs mt-0.5">✗</span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 line-through">
                        {row.browser}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 text-xs mt-0.5">✓</span>
                      <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                        {row.os}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section: Side by Side */}
              <h2
                id="comparison"
                className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32"
              >
                Browser vs OS: side by side
              </h2>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border border-zinc-200 dark:border-zinc-800">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900/50">
                      <th className="text-left p-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                        Risk
                      </th>
                      <th className="text-left p-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                        Browser (Comet, Atlas, browser-use, aside)
                      </th>
                      <th className="text-left p-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                        OS-Level (Twent)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        risk: "Prompt injection",
                        browser: "High — any web content can inject instructions",
                        os: "None — no web DOM to inject into",
                      },
                      {
                        risk: "Cross-tab leakage",
                        browser: "High — AI sees all open tabs",
                        os: "None — apps sandboxed by OS",
                      },
                      {
                        risk: "Data harvesting",
                        browser: "High — builds browsing profiles in the cloud",
                        os: "None — processes locally, no cloud profile",
                      },
                      {
                        risk: "Antivirus protection",
                        browser: "Useless against prompt injection",
                        os: "Not needed — no web attack surface",
                      },
                      {
                        risk: "Offline capability",
                        browser: "None — requires cloud AI + internet",
                        os: "Full — local GGUF models work offline",
                      },
                      {
                        risk: "Account safety",
                        browser: "Compromised if AI is tricked",
                        os: "Agent interacts via OS APIs, not browser auth",
                      },
                    ].map((row) => (
                      <tr
                        key={row.risk}
                        className="border-b border-zinc-200 dark:border-zinc-800 last:border-b-0"
                      >
                        <td className="p-3 text-zinc-900 dark:text-zinc-100 font-medium">
                          {row.risk}
                        </td>
                        <td className="p-3 text-zinc-500 dark:text-zinc-400">
                          {row.browser}
                        </td>
                        <td className="p-3 text-green-600 dark:text-green-400 font-medium">
                          {row.os}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* TL;DR */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 mb-8">
                <h2
                  id="tldr"
                  className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-4 scroll-mt-32"
                >
                  TL;DR
                </h2>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>
                    • Browser-level AI automation (Comet, Atlas, browser-use,
                    aside.com) is fundamentally unsafe — prompt injection, cross-tab
                    leakage, and data harvesting are unsolved problems
                  </li>
                  <li>
                    • OS-level automation (Twent) operates at the system layer — no
                    browser DOM, no tab context, no web-based attack surface
                  </li>
                  <li>
                    • Prompt injection is impossible when the AI doesn't read HTML
                  </li>
                  <li>
                    • Cross-tab leakage is impossible when apps are sandboxed by the
                    OS
                  </li>
                  <li>
                    • Data stays on-device with local models — no cloud profile to
                    compromise
                  </li>
                  <li>
                    • Twent: free, on-device, works offline, no cloud dependency
                  </li>
                </ul>
              </div>

              {/* FAQ Section */}
              <h2
                id="faq"
                className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mt-16 mb-6 scroll-mt-32"
              >
                Frequently Asked Questions
              </h2>

              <div className="space-y-6 mb-8">
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    Can't prompt injection happen through OS-level APIs too?
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Theoretically, but the attack surface is vastly smaller.
                    Browser-based tools read arbitrary HTML from any website — millions
                    of untrusted sources. OS-level tools interact with structured
                    APIs (accessibility services, shell commands, system intents)
                    where the content is controlled by the OS and installed apps,
                    not by unknown web servers. There's no equivalent of a
                    transparent HTML element or hidden alt text in Android's
                    accessibility layer.
                  </p>
                </div>

                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    Isn't OS-level automation limited to Android only?
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Currently, yes. Android's accessibility services and open app
                    ecosystem make it the best platform for OS-level AI automation.
                    iOS is significantly more restrictive. But the security argument
                    holds regardless — OS-level is architecturally safer than
                    browser-level, even if the feature set is different per platform.
                  </p>
                </div>

                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    What about tools like browser-use.com — they're developer tools,
                    not browsers?
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Correct — browser-use.com and aside.com are developer
                    frameworks that drive a browser programmatically (via Playwright
                    or CDP). They're not AI browsers themselves, but they share the
                    same fundamental limitation: the automation happens inside the
                    browser DOM, where web content can inject malicious instructions.
                    Any LLM-powered agent built on top of these tools inherits the
                    same prompt injection vulnerability as AI browsers.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    Is Twent completely immune to all attacks?
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    No software is completely immune. OS-level automation eliminates
                    the three specific risks discussed in this article (prompt
                    injection via web content, cross-tab leakage, cloud data
                    harvesting). But it introduces different considerations — like
                    the security of the accessibility services layer itself, which
                    is controlled by Android's OS security model. The key difference
                    is that the attack surface is the operating system (which has
                    decades of security hardening), not the open web (which has
                    essentially no defense against prompt injection).
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
