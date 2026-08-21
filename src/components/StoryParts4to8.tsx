import { useInView, useCountUp } from "../hooks/useInView";

import type { ReactNode } from "react";
import { TechTerm } from "./ui/TechTerm";

function SectionWrapper({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const [ref, inView] = useInView();
  return (
    <section
      ref={ref}
      id={id}
      className={`relative py-20 sm:py-28 px-6 ${className}`}
    >
      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

function SectionLabel({
  children,
  color = "blue",
}: {
  children: ReactNode;
  color?: "blue" | "orange";
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 mb-4`}
    >
      <div
        className={`w-8 h-px ${color === "orange" ? "bg-orange-500" : "bg-blue-500"}`}
      />
      <span
        className={`text-xs font-secondary uppercase tracking-[0.2em] ${color === "orange" ? "text-orange-500" : "text-blue-500"}`}
      >
        {children}
      </span>
      <div
        className={`w-8 h-px ${color === "orange" ? "bg-orange-500" : "bg-blue-500"}`}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PART 4: Under the Hood
   ═══════════════════════════════════════════════════════════ */
export function Part4UnderTheHood() {
  const [ref, inView] = useInView();
  const toolCount = useCountUp(50, 1500, inView);
  const appCount = useCountUp(1000, 2000, inView);
  const mcpCount = useCountUp(Infinity, 1500, inView);

  const categories = [
    {
      num: "01",
      name: "UI Automation & Device Control",
      count: "30 tools",
      desc: "Tap, swipe, scroll, type, read screens, install apps, manage permissions — full phone control",
    },
    {
      num: "02",
      name: "Files, Shell & Network",
      count: "23 tools",
      desc: "Filesystem, Ubuntu terminal, HTTP requests, web scraping, downloads — your phone becomes a server",
    },
    {
      num: "03",
      name: "Memory, Workflows & Integrations",
      count: "19 tools",
      desc: "Knowledge graph, automations, scheduling, Composio (1000+ apps) — connect everything",
    },
    {
      num: "04",
      name: "Chat, Voice & Media",
      count: "13 tools",
      desc: "Multi-session chat, TTS/STT, wake words, character cards, FFmpeg — full media pipeline",
    },
  ];

  return (
    <SectionWrapper id="features">
      <SectionLabel>04 / Under the Hood</SectionLabel>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4 text-center">
        Not just a chatbot.
        <br />
        <span className="text-orange-500">Magnitudes greater.</span>
      </h2>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-12">
        Every tool is a building block. Chain them together and your phone
        becomes a programmable agent that can do anything you can do — faster.
      </p>

      <div ref={ref} className="grid grid-cols-3 gap-6 mb-16">
        {[
          {
            value: `${toolCount}+`,
            label: "Built-in Tools",
            color: "text-blue-500",
          },
          {
            value: `${appCount}+`,
            label: "Apps Connectable",
            color: "text-orange-500",
          },
          {
            value: `${mcpCount}+`,
            label: "MCP Servers",
            color: "text-zinc-900 dark:text-zinc-100",
          },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className={`text-3xl sm:text-4xl font-display ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs font-secondary text-zinc-500 mt-1 uppercase tracking-[0.2em]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.num}
            data-sketch-card className="flex items-start gap-4 p-4 bg-zinc-50 dark:bg-zinc-900/50 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all group"
          >
            <span className="text-xs font-mono text-orange-500 mt-0.5 shrink-0 w-6">
              {cat.num}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-display text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 transition-colors">
                  {cat.name}
                </span>
                <span className="text-xs font-mono text-zinc-500 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5">
                  {cat.count}
                </span>
              </div>
              <p className="text-sm text-zinc-500 mt-1">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════
   PART 5: UI Automation
   ═══════════════════════════════════════════════════════════ */
export function Part5UIAutomation() {
  return (
    <section
      id="ui-automation"
      className="relative py-20 sm:py-28 px-6 bg-zinc-100 dark:bg-zinc-900 overflow-hidden"
    >
      {/* Plotter SVG pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url(/plotter-light.svg)",
          backgroundSize: "500px",
          backgroundRepeat: "repeat",
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block opacity-[0.04]"
        style={{
          backgroundImage: "url(/plotter-dark.svg)",
          backgroundSize: "500px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionLabel color="orange">05 / UI Automation</SectionLabel>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4 text-center">
          Your AI can see your screen.
          <br />
          <span className="text-blue-500">Now let it use your phone.</span>
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-16">
          The overlay agent is the crown jewel. Activated by long-press, voice,
          or home button — it reads every element on your screen and interacts
          with them like a human would.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Screen Reading",
              desc: "Parses the full UI hierarchy — every button, text field, list item — and indexes them for precise interaction.",
              accent: "blue" as const,
            },
            {
              title: "Element Targeting",
              desc: "Click by index, text content, or description. No coordinates needed. The agent understands what it sees.",
              accent: "blue" as const,
            },
            {
              title: "Multi-Step Flows",
              desc: "Chain taps, swipes, and inputs into complex sequences. Fill a form, submit it, read the result — all automated.",
              accent: "blue" as const,
            },
            {
              title: "Context Capture",
              desc: "Every action auto-captures current app, activity, and visible elements. The agent always knows where it is.",
              accent: "orange" as const,
            },
            {
              title: "Cross-App Navigation",
              desc: "Open Gmail, compose an email, switch to Files, attach a document, send — across multiple apps in one flow.",
              accent: "orange" as const,
            },
            {
              title: "Overlay Interface",
              desc: "Floating bubble that appears on any screen. Ask the agent to do something while you're in any app.",
              accent: "orange" as const,
            },
          ].map((f) => (
            <div
              key={f.title}
              className={`p-6 bg-white dark:bg-zinc-950 border transition-all hover:border-zinc-400 dark:hover:border-zinc-600 ${
                f.accent === "orange"
                  ? "border-orange-500/30"
                  : "border-blue-500/30"
              }`}
            >
              <div
                className={`w-2 h-2 mb-4 ${f.accent === "orange" ? "bg-orange-500" : "bg-blue-500"}`}
              />
              <h3 className="text-lg font-display text-zinc-900 dark:text-zinc-100 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 text-center">
          <div className="text-xs font-secondary text-orange-500 uppercase tracking-[0.2em] mb-3">
            Accessibility-First Architecture
          </div>
          <p className="text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Unlike screen-scraping approaches, Twent uses Android&apos;s
            Accessibility Service — the same API Google uses for TalkBack. This
            means pixel-perfect element detection, real-time UI tree traversal,
            and reliable interaction across{" "}
            <strong className="text-zinc-900 dark:text-zinc-100">
              every app on your device
            </strong>
            .
          </p>
        </div>
      </div>

      {/* Automation Examples — specific workflows */}
      <div className="mt-16 max-w-6xl mx-auto">
        <h3 className="font-display text-2xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4 text-center">
          Watch it work on
          <br />
          <span className="text-blue-500">your actual apps.</span>
        </h3>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-10 mx-auto text-center">
          These aren&apos;t toy examples. Each prompt below triggers a real multi-app workflow on your device.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Email triage in 30 seconds",
              desc: "Open Gmail, read the first 10 subjects, star urgent ones, archive promotional, draft quick replies to important ones — all while you&apos;re in a meeting.",
              prompt: '"Check my unread emails, star anything from my manager or that mentions deadline, archive newsletters, and draft replies to anything needing a response"',
            },
            {
              title: "Restaurant reservation",
              desc: "Open Google Maps, find restaurants rated 4+ within 2km, check their booking link, fill in the OpenTable form with your saved details, pick a time, confirm.",
              prompt: '"Book a table for 2 at a highly-rated Italian restaurant near me for tonight at 7pm"',
            },
            {
              title: "Expense tracking",
              desc: "Open your banking app, screenshot the transaction, open your expense sheet, create a new row with date, amount, category, and notes.",
              prompt: '"Log my last 5 transactions to my expense sheet with categories: food, transport, groceries, entertainment"',
            },
            {
              title: "Social media post",
              desc: "Draft a tweet about an article, open the link, summarize the key insight, write 3 variations with different hooks, copy to clipboard.",
              prompt: '"Post about this article on Twitter. Hook: shocking stat, body: key insight, hashtag: relevant ones"',
            },
          ].map((ex) => (
            <div key={ex.title} data-sketch-card className="p-6 bg-white dark:bg-zinc-950 hover:border-blue-500/30 transition-colors">
              <h4 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">{ex.title}</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{ex.desc}</p>
              <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 rounded">
                <p className="text-xs font-secondary text-orange-500 uppercase tracking-[0.15em] mb-1">Prompt</p>
                <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">{ex.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <a
          href="/android-automation-power-user"
          className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors duration-200"
        >
          Learn More About Android Automation
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PART 6: Technical Specs
   ═══════════════════════════════════════════════════════════ */
export function Part6DX() {
  return (
    <SectionWrapper id="dx">
      <SectionLabel color="orange">06 / Technical Specs</SectionLabel>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4 text-center">
        A full Linux box.
        <br />
        <span className="text-orange-500">In your pocket.</span>
      </h2>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-12">
        Ubuntu 24.04 with apt, Python 3, Node.js, vim, git, SSH — the works. Run
        agent CLIs, build projects, manage servers, all from your phone.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { label: "OS", value: "Ubuntu 24.04 (chroot)" },
            { label: "Package Manager", value: "apt, pip, npm" },
            { label: "Languages", value: "Python 3, Node.js, Go, Rust" },
            { label: "Editors", value: "vim, nano" },
            { label: "Version Control", value: "git, gh CLI" },
            { label: "Remote Access", value: "SSH client & server" },
            { label: "Sessions", value: "Multiple persistent terminals" },
            { label: "IPC", value: "AIDL for background operation" },
          ].map((spec) => (
            <div
              key={spec.label}
              className="flex items-baseline gap-4 py-2 border-b border-zinc-200 dark:border-zinc-800"
            >
              <span className="text-xs font-secondary text-blue-500 w-32 shrink-0 uppercase tracking-[0.15em]">
                {spec.label}
              </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-200 font-mono">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        <div data-sketch-card className="bg-zinc-50 dark:bg-zinc-900 p-6">
          <h3 className="font-secondary text-sm text-orange-500 uppercase tracking-[0.2em] mb-4">
            Agent CLI Compatibility
          </h3>
          <div className="space-y-3">
            {[
              {
                name: "Claude Code",
                status: "✓ Tested",
                icon: (
                  <img
                    src="/claudecode-color.svg"
                    alt="Claude Code"
                    className="w-5 h-5"
                    loading="lazy"
                  />
                ),
              },
              {
                name: "OpenAI Codex",
                status: "✓ Tested",
                icon: (
                  <img
                    src="/codex-color.svg"
                    alt="OpenAI Codex"
                    className="w-5 h-5"
                    loading="lazy"
                  />
                ),
              },
              {
                name: "OpenCode",
                status: "✓ Tested",
                icon: (
                  <img src="/opencode.svg" alt="OpenCode" className="w-5 h-5" loading="lazy" />
                ),
              },
              {
                name: "Hermes Agent",
                status: "✓ Tested",
                icon: (
                  <img
                    src="/nousresearch.svg"
                    alt="Hermes Agent"
                    className="w-5 h-5"
                    loading="lazy"
                  />
                ),
              },
              {
                name: "Gemini CLI",
                status: "✓ Compatible",
                icon: (
                  <img
                    src="/geminicli-color.svg"
                    alt="Gemini CLI"
                    className="w-5 h-5"
                    loading="lazy"
                  />
                ),
              },
              {
                name: "Qwen Code CLI",
                status: "✓ Compatible",
                icon: (
                  <img
                    src="/qwen-color.svg"
                    alt="Qwen Code CLI"
                    className="w-5 h-5"
                    loading="lazy"
                  />
                ),
              },
              {
                name: "Cursor Agent",
                status: "✓ Compatible",
                icon: (
                  <img src="/cursor.svg" alt="Cursor" className="w-5 h-5" loading="lazy" />
                ),
              },
              {
                name: "Any Python/Node CLI",
                status: "→ Just install it",
                color: "text-zinc-500",
              },
            ].map((cli) => (
              <div
                key={cli.name}
                className="flex items-center justify-between py-1.5"
              >
                <div className="flex items-center gap-2">
                  {cli.icon && <span className="shrink-0">{cli.icon}</span>}
                  <span className="text-sm text-zinc-700 dark:text-zinc-200 font-mono">
                    {cli.name}
                  </span>
                </div>
                <span
                  className={`text-xs font-mono ${cli.color || "text-orange-500"}`}
                >
                  {cli.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real Commands — actual terminal output */}
        <div className="mt-8">
          <h3 className="font-secondary text-sm text-orange-500 uppercase tracking-[0.2em] mb-4">
            Real commands that actually work
          </h3>
          <div className="space-y-2">
            {[
              { label: "Clone and build a React project", cmd: "git clone https://github.com/user/project.git && cd project && npm install && npm run build" },
              { label: "Deploy a Docker container", cmd: "docker build -t myapp . && docker run -d -p 3000:3000 myapp" },
              { label: "Set up a cron job", cmd: "crontab -e\n0 9 * * 1-5 ~/scripts/daily-report.sh" },
              { label: "Run pytest with coverage", cmd: "pip install pytest pytest-cov && pytest --cov=src --cov-report=html" },
              { label: "SSH tunnel for database", cmd: "ssh -L 5432:localhost:5432 user@prod-server" },
              { label: "Start a systemd service", cmd: "sudo systemctl enable myservice && sudo systemctl start myservice" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3 py-2 border-b border-zinc-100 dark:border-zinc-900 last:border-0">
                <span className="text-xs font-mono text-zinc-500 w-48 shrink-0 pt-0.5">{c.label}</span>
                <code className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">{c.cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
