import { useEffect, useState, useRef } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Pricing } from "./Pricing";

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

// ============================================================
// SCROLLYTELLING: 8-stage pinned viewport storytelling
// ============================================================

const STORIES = [
  {
    tag: "The Problem",
    heading: "Your AI can chat. But it can't do anything.",
    description:
      "Every AI assistant on Android is a fancy chatbot. It can write poems, answer questions, and hallucinate facts. But it can't open an app, tap a button, run a command, or actually do anything useful on your phone.",
    color: "blue" as const,
    visual: () => (
      <div className="space-y-3">
        {[
          "Can write a poem",
          "Can answer trivia",
          "Can't open Settings",
          "Can't run a script",
        ].map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded border ${i < 2 ? "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700" : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30"}`}
          >
            <span className={i < 2 ? "text-green-500" : "text-red-400"}>
              {i < 2 ? "✓" : "✗"}
            </span>
            <span className="text-sm font-mono text-zinc-700 dark:text-zinc-300">
              {item}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    tag: "Skills",
    heading: "Teach your AI to actually do things.",
    description:
      "Skills are behavior bundles that give your AI instant expertise. Install a code review skill and it knows how to analyze diffs. Install a data skill and it can crunch CSVs. One tap, new capability unlocked.",
    color: "blue" as const,
    visual: () => (
      <div className="space-y-3">
        {[
          { name: "code-review", desc: "Analyze PRs, find bugs", icon: "🔍" },
          { name: "data-analysis", desc: "CSV, JSON, statistics", icon: "📊" },
          {
            name: "writing-assistant",
            desc: "Edit, rephrase, translate",
            icon: "✍️",
          },
        ].map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800"
          >
            <div className="w-8 h-8 bg-blue-500/10 rounded flex items-center justify-center text-sm">
              {skill.icon}
            </div>
            <div>
              <div className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                {skill.name}
              </div>
              <div className="text-xs text-zinc-500">{skill.desc}</div>
            </div>
            <div className="ml-auto text-xs text-blue-500 font-mono">
              installed
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    tag: "Integrations",
    heading: "Connect to everything. MCP + Composio.",
    description:
      "Model Context Protocol servers plug your AI into GitHub, Slack, Notion, databases — any tool with an API. Composio adds 1000+ app integrations on top. Your AI doesn't just think, it acts across your entire digital life.",
    color: "blue" as const,
    visual: () => (
      <div className="space-y-3">
        {[
          {
            name: "MCP Server",
            apps: "GitHub, Slack, Notion...",
            color: "blue",
          },
          { name: "Composio", apps: "1000+ app integrations", color: "orange" },
          { name: "Skills", apps: "Reusable AI behaviors", color: "green" },
        ].map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800`}
          >
            <div className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
            <div>
              <div className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                {item.name}
              </div>
              <div className="text-xs text-zinc-500">{item.apps}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    tag: "Agent Swarm",
    heading: "Not one AI. A whole swarm.",
    description:
      "Claude Code for serious refactoring. OpenAI Codex for quick scripts. Hermes for deep research. Each agent has its own superpower, and Twent runs them all — right on your phone, in a real terminal.",
    color: "orange" as const,
    visual: () => (
      <div className="space-y-3">
        <div className="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-zinc-500 font-mono">
              twent terminal
            </span>
          </div>
          <pre className="text-xs text-green-400 font-mono">
            <code>{`$ claude-code "fix the login bug"\nAnalyzing codebase...\nFound 3 issues in auth.ts\nApplying fixes...\n✓ Bug fixed in 2.3s`}</code>
          </pre>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["Claude Code", "Codex", "Hermes"].map((agent) => (
            <div
              key={agent}
              className="p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 text-center"
            >
              <div className="text-xs font-mono text-zinc-900 dark:text-zinc-100">
                {agent}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    tag: "Memory",
    heading: "It remembers everything.",
    description:
      "Every conversation, preference, and piece of context gets stored in a local knowledge graph. Close the app, come back next week — your AI knows exactly where you left off. No re-explaining. No lost context.",
    color: "green" as const,
    visual: () => (
      <div className="space-y-3">
        <div className="p-4 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 mb-2">Memory Graph</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs">
              👤
            </div>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs">
              📄
            </div>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center text-xs">
              💬
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded text-xs">
            <div className="text-zinc-500">Remembers</div>
            <div className="font-mono text-zinc-900 dark:text-zinc-100">
              Your preferences
            </div>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded text-xs">
            <div className="text-zinc-500">Persists</div>
            <div className="font-mono text-zinc-900 dark:text-zinc-100">
              Across sessions
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    tag: "Privacy",
    heading: "Your data never leaves your device.",
    description:
      "Bring your own API keys — encrypted locally, Twent never sees them. Run local AI models offline with MNN. Zero telemetry, zero tracking, zero data collection. Your phone, your AI, your business.",
    color: "purple" as const,
    visual: () => (
      <div className="space-y-3">
        <div className="p-4 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800">
          {[
            "All data stays on your device",
            "API keys encrypted locally",
            "Local AI models (MNN)",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 mb-2 last:mb-0">
              <span className="text-green-500">✓</span>
              <span className="text-sm text-zinc-900 dark:text-zinc-100">
                {item}
              </span>
            </div>
          ))}
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
          <div className="text-xs text-green-600 dark:text-green-400 font-mono">
            Zero telemetry • No data collection • BYOK
          </div>
        </div>
      </div>
    ),
  },
  {
    tag: "Automation",
    heading: "Control any app. Automate anything.",
    description:
      "Your AI can see your screen and interact with any app. Tap buttons, fill forms, navigate menus, extract data. Chain tools into automated pipelines — morning routines, file management, social posting. Your phone works for you.",
    color: "indigo" as const,
    visual: () => (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "👆", label: "UI Automation", desc: "Tap, swipe, type" },
            { icon: "🔗", label: "Pipelines", desc: "Chain tools together" },
            { icon: "📱", label: "Any App", desc: "Works everywhere" },
            { icon: "⚡", label: "On Demand", desc: "Run anytime" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800"
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="text-xs font-mono text-zinc-900 dark:text-zinc-100">
                {item.label}
              </div>
              <div className="text-xs text-zinc-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    tag: "Build",
    heading: "Generate mini-apps. Ship workflows.",
    description:
      "Describe what you need, get a working HTML/CSS/JS app running inside Twent. Dashboards, tools, calculators, games — built in seconds. Package your best automations as reusable workflows and share them with the community.",
    color: "indigo" as const,
    visual: () => (
      <div className="space-y-3">
        <div className="p-4 bg-zinc-950 rounded border border-zinc-800">
          <div className="text-xs text-zinc-400 mb-2 font-mono">
            Generated app:
          </div>
          <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800">
            <div className="text-xs font-mono text-zinc-500 mb-1">todo-app</div>
            <div className="space-y-1">
              {["Buy groceries", "Ship the feature", "Touch grass"].map(
                (item, i) => (
                  <div key={item} className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-3 h-3 border ${i === 2 ? "border-zinc-300 dark:border-zinc-600" : "border-blue-500 bg-blue-500/10"} rounded-sm flex items-center justify-center`}
                    >
                      {i < 2 && (
                        <span className="text-[8px] text-blue-500">✓</span>
                      )}
                    </div>
                    <span
                      className={`text-zinc-700 dark:text-zinc-300 ${i === 2 ? "" : "line-through text-zinc-400"}`}
                    >
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const COLOR_MAP = {
  blue: {
    tag: "text-blue-500",
    bar: "bg-blue-500",
    dot: "bg-blue-500",
    light: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  orange: {
    tag: "text-orange-500",
    bar: "bg-orange-500",
    dot: "bg-orange-500",
    light: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  green: {
    tag: "text-green-500",
    bar: "bg-green-500",
    dot: "bg-green-500",
    light: "bg-green-500/10",
    border: "border-green-500/20",
  },
  purple: {
    tag: "text-purple-500",
    bar: "bg-purple-500",
    dot: "bg-purple-500",
    light: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  indigo: {
    tag: "text-indigo-500",
    bar: "bg-indigo-500",
    dot: "bg-indigo-500",
    light: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
};

function PinnedScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const totalScroll = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / totalScroll));
      const idx = Math.min(
        STORIES.length - 1,
        Math.floor(pct * STORIES.length),
      );
      setActive(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const story = STORIES[active];
  const colors = COLOR_MAP[story.color];
  const Visual = story.visual;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${STORIES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center px-6 pt-24 md:pt-0 overflow-hidden">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text content */}
          <div className="relative">
            <div key={active} className="animate-fadeIn">
              <div
                className={`inline-flex items-center gap-2 mb-4 ${colors.tag}`}
              >
                <span className="font-mono text-sm">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className={`w-8 h-px ${colors.bar}`} />
                <span className="text-xs uppercase tracking-[0.15em] font-secondary">
                  {story.tag}
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4">
                {story.heading}
              </h2>
              <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
                {story.description}
              </p>
            </div>
          </div>

          {/* Right: Visual */}
          <div key={`vis-${active}`} className="animate-fadeIn">
            <div
              className={`p-6 md:p-8 ${colors.light} border ${colors.border} rounded-lg`}
            >
              <Visual />
            </div>
          </div>
        </div>

        {/* Pagination dots — right side */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2">
          {STORIES.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                const container = containerRef.current;
                if (!container) return;
                const totalScroll = container.offsetHeight - window.innerHeight;
                const target =
                  container.offsetTop + (i / STORIES.length) * totalScroll;
                window.scrollTo({ top: target, behavior: "smooth" });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? `${COLOR_MAP[s.color].dot} scale-150`
                  : "bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
              }`}
              title={s.tag}
            />
          ))}
        </div>

        {/* Progress bar — bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400 tabular-nums">
            {String(active + 1).padStart(2, "0")}/
            {String(STORIES.length).padStart(2, "0")}
          </span>
          <div className="w-24 h-px bg-zinc-200 dark:bg-zinc-800 relative">
            <div
              className={`absolute top-0 left-0 h-full ${colors.bar} transition-all duration-300`}
              style={{ width: `${((active + 1) / STORIES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ImmersiveLandingPage({
  dark,
  toggle,
}: {
  dark: boolean;
  toggle: () => void;
}) {
  const [heroRef, setHeroRef] = useState<HTMLElement | null>(null);
  const [heroInView, setHeroInView] = useState(false);

  useEffect(() => {
    if (!heroRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(heroRef);
    return () => observer.disconnect();
  }, [heroRef]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <GrainOverlay />
      <Nav dark={dark} onToggle={toggle} />

      <main>
        {/* Hero Section */}
        <section
          ref={setHeroRef}
          className="relative min-h-screen flex items-center justify-center px-6 pt-24 md:pt-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`transition-all duration-1000 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tighter mb-6">
                Your Personal Agentic OS{" "}
                <span className="text-blue-500">for Android</span>
              </h1>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
                The AI assistant that connects, remembers, and automates. Run
                Claude Code, control any app, and keep your data private.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://pub-84df04198c6b46f19ce9ed18d378ff7e.r2.dev/app-release.apk"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
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
                  href="/docs"
                  className="inline-flex items-center justify-center px-8 py-4 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 font-medium transition-colors duration-200"
                >
                  View Docs
                </a>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div
              className={`mt-24 transition-all duration-1000 delay-700 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-zinc-500 font-mono">
                  Scroll to explore
                </span>
                <div className="w-px h-12 bg-gradient-to-b from-zinc-400 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Pinned Scrollytelling — 8 stories */}
        <PinnedScrollytelling />

        {/* Social Proof */}
        <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-12">
              What people are saying
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Finally, Claude Code on my phone. This changes everything for quick fixes.",
                  author: "Developer",
                },
                {
                  quote:
                    "The UI automation is insane. My phone does things for me now.",
                  author: "Power User",
                },
                {
                  quote:
                    "Privacy-first AI that actually works. No data leaves my device.",
                  author: "Privacy Advocate",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                >
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

        {/* Pricing & FAQ */}
        <Pricing />

        {/* Final CTA */}
        <section className="py-20 md:py-28 px-6 bg-zinc-900 dark:bg-zinc-950">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight mb-6">
              Ready to try it?
            </h2>
            <p className="text-lg text-zinc-400 mb-8">
              Download Twent and see what your phone can really do.
            </p>
            <a
              href="https://github.com/user/twent/releases"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
