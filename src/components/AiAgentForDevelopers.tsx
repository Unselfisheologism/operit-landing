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

// Animated counter
function AnimatedCounter({
  target,
  visible,
  suffix = "",
}: {
  target: number;
  visible: boolean;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
    return () => clearInterval(timer);
  }, [visible, target]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// Schema markup for SoftwareApplication
function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Twent - AI Agent for Developers",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Android",
    description:
      "Run ANY Agent CLI (Claude Code, OpenAI Codex, Hermes-Agent) on your Android phone. Full Ubuntu terminal with git, npm, docker. SSH, MCP tools, code review, hotfixes — ship code from anywhere.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Claude Code with full tool use on Android",
      "OpenAI Codex CLI integration",
      "Hermes-Agent terminal for developers",
      "Full Ubuntu 24.04 with apt, pip, npm",
      "Git operations: commit, rebase, merge, push",
      "SSH into production servers",
      "MCP tools support (GitHub, Jira, Slack)",
      "1000+ app automations via Composio",
      "Multi-model AI: Claude, GPT-4, Gemini, Llama",
      "BYOK (Bring Your Own Key) privacy",
      "Local AI model support (Ollama)",
      "Code review on mobile",
      "PR creation and merging from phone",
    ],
    screenshot: "https://twent.xyz/developer-hero.png",
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
      { "@type": "ListItem", position: 3, name: "AI Agent for Developers", item: "https://twent.xyz/blog/ai-agent-for-developers" },
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
      className={`p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${delay}s` : "0s" }}
    >
      <div className="w-12 h-12 bg-blue-500/10 flex items-center justify-center mb-4">
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

export function AiAgentForDevelopers({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  const [heroRef, heroInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [useCasesRef, useCasesInView] = useInView();
  const [comparisonRef, comparisonInView] = useInView();
  const [faqRef, faqInView] = useInView();
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
              <span className="w-8 h-px bg-blue-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500">
                For Developers
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
                AI Agent for Developers:{" "}
                <span className="text-blue-500">
                  Ship Code From Anywhere
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
                Run <strong>Claude Code</strong> with full tool use directly on your
                Android. SSH into production, run <strong>git rebase -i</strong>,
                review PRs, push hotfixes — your entire dev workflow in your pocket.
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
                { label: "AI Models", value: 10, suffix: "+" },
                { label: "App Integrations", value: 1000, suffix: "+" },
                { label: "Terminal Tools", value: 50, suffix: "+" },
                { label: "Free to Start", value: 0, suffix: "" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-4 border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="font-display text-3xl text-blue-500 mb-1">
                    <AnimatedCounter
                      target={stat.value}
                      visible={heroInView}
                      suffix={stat.suffix}
                    />
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
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
              >
                Ship Code from Anywhere
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
                View Documentation
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
                src="/developer-hero.png"
                alt="Twent AI Agent for Developers - Claude Code and Codex on Android"
                className="w-full h-auto object-cover"
                style={{ maxHeight: "600px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-mono">
                  Claude Code running on Android via Twent — full terminal
                  access, Git integration, AI pair programming anywhere
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6">
              The Problem: Getting Paged at 2am With No Laptop
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              You wrote the code. You're on-call. But you're not at your desk. Your
              phone can't SSH into production, run git rebase -i, or review a PR from the train.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  problem: "On-Call at 2am",
                  desc: "PagerDuty wakes you up. Production is down. You can see the error but can't git log from your phone to find the bad commit.",
                },
                {
                  problem: "Code Review on the Train",
                  desc: "PR sits waiting while you commute. Can't pull up the diff, run git diff --stat, or comment from your phone.",
                },
                {
                  problem: "Hotfix from a Cafe",
                  desc: "You spot a bug at a coffee shop. Can write the fix but can't git add, git commit, git push from Android.",
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
                Real Terminal. Real Git. Real Code.
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Not a web terminal emulator. Full Ubuntu with real git, SSH, docker, npm —
                everything you need to ship from anywhere.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
                title="Claude Code with Tool Use"
                description="Full tool use: run git operations (rebase -i, merge, commit), execute shell commands, edit files, browse git history — anywhere."
                visible={featuresInView}
                delay={0.1}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                }
                title="Full Ubuntu 24.04 Terminal"
                description="Real Ubuntu with apt, pip, npm, docker, build-essential. Run make, cargo, go build — same commands as your laptop."
                visible={featuresInView}
                delay={0.2}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                }
                title="Git & GitHub CLI"
                description="git commit, push, pull, rebase -i, merge, cherry-pick. gh pr view, gh pr comment, gh pr merge — all from your phone."
                visible={featuresInView}
                delay={0.3}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
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
                title="SSH Into Production"
                description="SSH and SCP to any server. Check logs,restart services, run kubectl exec — fix production issues from your phone."
                visible={featuresInView}
                delay={0.4}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
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
                title="MCP Tools Support"
                description="Model Context Protocol tools: GitHub, Jira, Slack, Notion, Linear. Automate PR reviews, sync issues, post standups."
                visible={featuresInView}
                delay={0.5}
              />
              <FeatureCard
                icon={
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                }
                title="Privacy-First BYOK"
                description="Bring Your Own API keys. Your keys never touch our servers. Run Ollama locally for completely offline coding."
                visible={featuresInView}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section
          ref={useCasesRef}
          className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Real Developer Scenarios
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Specific actions you can actually do from your phone.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Open a PR, Ask Claude to Explain the Diff, Approve and Merge",
                  desc: "gh pr view 123, paste to Claude Code, ask for review, comment, approve, merge — all from your phone on the train.",
                  icon: "🚂",
                },
                {
                  title: "SSH Into Production, Check Logs, Push a Fix",
                  desc: "ssh prod-server 'tail -f /var/log/app.log', identify the bug, vim fix.ts, git add -A && git commit -m \"fix: ...\" && git push.",
                  icon: "🐛",
                },
                {
                  title: "git rebase -i From the Commuter Train",
                  desc: "git rebase -i HEAD~5, squash fixups, force push — clean git history without opening your laptop.",
                  icon: "🚇",
                },
                {
                  title: "Run kubectl exec and Debug in Production",
                  desc: "kubectl exec -it pod-name — sh, ps aux, curl localhost:8080/health — debug production issues from the couch.",
                  icon: "☕",
                },
                {
                  title: "Automate Your Morning Standup",
                  desc: "gh pr list --state merged --since yesterday, gh issue assign |, generate standup, post to Slack — zero manual work.",
                  icon: "🤖",
                },
              ].map((useCase, i) => (
                <div
                  key={i}
                  className={`p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 ${
                    useCasesInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: useCasesInView
                      ? `${0.1 + i * 0.1}s`
                      : "0s",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{useCase.icon}</span>
                    <div>
                      <p className="font-display text-xl text-zinc-900 dark:text-zinc-100 mb-2">
                        {useCase.title}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {useCase.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section ref={comparisonRef} className="py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Why Twent is Different
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Only Twent has AI agent integration with full Linux terminal and git.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-4 px-4 font-display text-zinc-900 dark:text-zinc-100">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 font-display text-blue-500">
                      Twent
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      ChatGPT Mobile
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      Termux
                    </th>
                    <th className="text-center py-4 px-4 font-display text-zinc-500">
                      Claude/Cursor Mobile
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Claude Code CLI", "✓", "✗", "✗", "✗"],
                    ["Full Ubuntu Terminal", "✓", "✗", "✓", "✗"],
                    ["Git Tool Use (rebase, merge)", "✓", "✗", "✓", "✗"],
                    ["SSH into Servers", "✓", "✗", "✓", "✗"],
                    ["MCP Tools Integration", "✓", "✗", "✗", "✗"],
                    [
                      "Multi-Model Support",
                      "✓",
                      "GPT Only",
                      "✗",
                      "Claude Only",
                    ],
                    ["Privacy (BYOK)", "✓", "✗", "✓", "✗"],
                    ["Free Tier", "✓", "Limited", "✓", "Paid Only"],
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

            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong className="text-blue-500">
                  Twent is the only Android app
                </strong>{" "}
                that runs Claude Code CLI with full tool use, real Ubuntu, git
                operations, SSH, and MCP tools. Everything else is either a chat
                wrapper or a basic terminal without AI agent integration.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          ref={faqRef}
          className="py-20 md:py-28 px-6 bg-zinc-50 dark:bg-zinc-900/50"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
                Developer FAQ
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Common questions from developers.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Can I run full Claude Code on Twent?",
                  a: "Yes. Twent runs the full Claude Code CLI with Execute Tool, Read Tool, Write Tool, Bash Tool, and Edit Tool — exactly as you'd use on desktop.",
                },
                {
                  q: "Does it support MCP tools?",
                  a: "Yes. Twent supports Model Context Protocol tools including GitHub, Jira, Slack, Linear, Notion, and 1000+ Composio integrations.",
                },
                {
                  q: "How does BYOK (Bring Your Own Key) work?",
                  a: "You add your own OpenAI/Anthropic API keys directly in the app. They never leave your device. Optionally run Ollama locally for complete offline privacy.",
                },
                {
                  q: "Can I SSH into production servers?",
                  a: "Yes. Full SSH and SCP support. ssh user@server, then run any commands. Also supports kubectl exec for Kubernetes debugging.",
                },
                {
                  q: "Does it work offline?",
                  a: "Yes. With local Ollama models, you can code completely offline. Internet only needed for cloud API calls if you use external keys.",
                },
                {
                  q: "Can I run git rebase -i on mobile?",
                  a: "Yes. Full git operations: rebase -i, merge, cherry-pick, bisect — all work exactly like on desktop. Combined with gh CLI for PR workflow.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className={`p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 ${
                    faqInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: faqInView ? `${0.1 + i * 0.08}s` : "0s",
                  }}
                >
                  <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {faq.a}
                  </p>
                </div>
              ))}
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
              Ready to Ship Code from Anywhere?
            </h2>
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who've ditched their laptops for quick
              fixes. On-call at 2am? SSH in and fix it. Code review on the train? Merge
              it from your phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://pub-84df04198c6b46f19ce9ed18d378ff7e.r2.dev/app-release.apk"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
              >
                Ship Code from Anywhere
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
                className="inline-flex items-center justify-center px-8 py-4 border border-zinc-700 hover:border-zinc-600 text-white font-medium transition-colors duration-200"
              >
                Read the Docs
              </a>
            </div>
            <p className="mt-6 text-sm text-zinc-500">
              Free forever. No subscriptions. No ads in the core experience.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}