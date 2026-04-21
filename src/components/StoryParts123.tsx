import { useInView } from "../hooks/useInView";

import {
  TerminalAnimationRoot,
  TerminalAnimationContainer,
  TerminalAnimationWindow,
  TerminalAnimationContent,
  TerminalAnimationCommandBar,
  TerminalAnimationOutput,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  type TabContent,
} from "./ui/terminal-animation";
import type { ReactNode } from "react";

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

function SectionLabel({ children, color = "blue" }: { children: ReactNode; color?: "blue" | "orange" }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className={`w-8 h-px ${color === "orange" ? "bg-orange-500" : "bg-blue-500"}`} />
      <span className={`text-xs font-secondary uppercase tracking-[0.2em] ${color === "orange" ? "text-orange-500" : "text-blue-500"}`}>
        {children}
      </span>
      <div className={`w-8 h-px ${color === "orange" ? "bg-orange-500" : "bg-blue-500"}`} />
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-6 text-center">
      {children}
    </h2>
  );
}

function SectionDesc({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-12 text-center mx-auto">
      {children}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════
   PART 1: What
   ═══════════════════════════════════════════════════════════ */
export function Part1What() {
  return (
    <SectionWrapper id="what">
      <SectionLabel>01 / What</SectionLabel>
      <SectionTitle>
        Your phone is the most powerful computer you own.
        <br />
        <span className="text-orange-500">Your AI should use it.</span>
      </SectionTitle>

      {/* Old AI comparison */}
      <div className="mb-10 p-6 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <p className="font-retro text-zinc-500 text-lg leading-relaxed mb-3">
          Old chatbots could only talk. They answered questions, wrote poems, and
          hallucinated facts. But they couldn&apos;t open an app, fill a form, or
          run a single command.
        </p>
        <p className="font-retro text-zinc-400 dark:text-zinc-600 text-base">
          They were search engines with personality. Nothing more.
        </p>
        <div className="mt-4 w-16 h-px bg-orange-500" />
        <p className="mt-4 font-display text-blue-500 text-xl">
          Twent is different. Twent acts.
        </p>
      </div>

      {/* Loss Aversion Framing (Principle 7) */}
      <div className="mb-10 p-6 border border-orange-500/20 bg-orange-500/5">
        <p className="font-retro text-zinc-700 dark:text-zinc-300 text-base leading-relaxed mb-2">
          Right now, your AI assistant answers questions but <strong className="text-orange-500">can&apos;t open an app, fill a form, or run a command</strong>. You&apos;re spending hours doing things your phone should handle in seconds.
        </p>
        <p className="font-retro text-zinc-500 text-sm">
          Every minute you spend manually switching apps, copying data between screens, and running routine tasks — that&apos;s time your AI is wasting by being useless.
        </p>
      </div>

      <SectionDesc>
        Twent turns your Android device into an agentic operating system.
        It doesn&apos;t just chat — it reads your screen, taps buttons, runs
        shell commands, manages files, and connects to every app on your phone.
        One long-press or voice command, and it gets to work.
      </SectionDesc>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            step: "01",
            title: "Activate",
            desc: "Long-press power, say a wake word, or open the app. The overlay agent appears instantly.",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ),
            accent: "blue" as const,
          },
          {
            step: "02",
            title: "Describe",
            desc: "Tell it what you need in plain language. 'Check my unread emails' or 'Build me a workflow.'",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            ),
            accent: "orange" as const,
          },
          {
            step: "03",
            title: "Watch it work",
            desc: "The agent sees your screen, navigates apps, fills forms, runs commands — all autonomously.",
            icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ),
            accent: "blue" as const,
          },
        ].map((item) => (
          <div
            key={item.step}
            className="group p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 flex items-center justify-center ${item.accent === "orange" ? "bg-orange-500/10 text-orange-500" : "bg-blue-500/10 text-blue-500"} group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 transition-colors`}>
                {item.icon}
              </div>
              <span className="text-xs font-secondary text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">Step {item.step}</span>
            </div>
            <h3 className="text-lg font-display text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════
   PART 2: For Developers — with terminal animation
   ═══════════════════════════════════════════════════════════ */
const twentTabs: TabContent[] = [
  {
    label: "claude",
    command: "claude code 'refactor auth module'",
    lines: [
      { text: "", delay: 80 },
      { text: "  ⠋ Analyzing 23 files...", color: "text-zinc-500", delay: 400 },
      { text: "  ⠙ Refactoring auth.ts...", color: "text-zinc-500", delay: 300 },
      { text: "  ⠹ Writing tests...", color: "text-zinc-500", delay: 300 },
      { text: "", delay: 80 },
      { text: "  ✓ Done. 4 files changed.", color: "text-orange-500", delay: 200 },
      { text: "    auth.ts — refactored session handling", color: "text-zinc-400", delay: 100 },
      { text: "    auth.test.ts — added 12 new tests", color: "text-zinc-400", delay: 100 },
      { text: "    middleware.ts — updated guards", color: "text-zinc-400", delay: 100 },
    ],
  },
];

export function Part2ForDevs() {
  const clis = [
    { name: "Claude Code", desc: "Anthropic's coding agent", icon: <img src="/claudecode-color.svg" alt="Claude Code" className="w-7 h-7" /> },
    { name: "OpenAI Codex", desc: "OpenAI's terminal agent", icon: <img src="/codex-color.svg" alt="OpenAI Codex" className="w-7 h-7" /> },
    { name: "OpenCode", desc: "Coding agent CLI", icon: <img src="/opencode.svg" alt="OpenCode" className="w-7 h-7" /> },
    { name: "Hermes Agent", desc: "Nous Research's agent CLI", icon: <img src="/nousresearch.svg" alt="Hermes Agent" className="w-7 h-7" /> },
  ];

  return (
    <SectionWrapper id="developers">
      <SectionLabel color="orange">02 / For Developers</SectionLabel>
      <SectionTitle>
        Run the world&apos;s best agent CLIs
        <br />
        <span className="text-blue-500">from your phone.</span>
      </SectionTitle>
      <SectionDesc>
        Twent ships a full Ubuntu 24 terminal. Install and run Claude Code,
        OpenAI Codex, OpenCode, Hermes Agent, or any CLI tool — right from your Android
        device. No laptop required.
      </SectionDesc>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CLI cards */}
        <div className="space-y-4">
          {clis.map((cli) => (
            <div
              key={cli.name}
              className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all group"
            >
              <div className="shrink-0 flex items-center justify-center w-8 h-8">
                {cli.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                  {cli.name}
                </div>
                <div className="text-xs text-zinc-500">{cli.desc}</div>
              </div>
            </div>
          ))}

          <div className="p-4 border border-dashed border-zinc-300 dark:border-zinc-700 text-center">
            <span className="text-sm text-zinc-500">
              + any npm/pip/apt package you can install
            </span>
          </div>
        </div>

        {/* Terminal animation */}
        <TerminalAnimationRoot tabs={twentTabs} defaultActiveTab={0} alwaysDark>
          <TerminalAnimationContainer>
            <TerminalAnimationWindow>
              <TerminalAnimationContent>
                <TerminalAnimationCommandBar className="font-mono text-sm text-zinc-100" />
                <TerminalAnimationOutput className="mt-2 space-y-0.5 font-mono text-sm" />
              </TerminalAnimationContent>
              <TerminalAnimationTabList className="flex gap-1 px-6 pb-4">
                {twentTabs.map((tab, index) => (
                  <TerminalAnimationTabTrigger
                    key={tab.label}
                    index={index}
                    className="px-3 py-1 text-xs font-mono text-zinc-500 hover:text-zinc-300 data-[state=active]:text-orange-500 data-[state=active]:bg-zinc-900 transition-colors cursor-pointer border-0 bg-transparent"
                  >
                    {tab.label}
                  </TerminalAnimationTabTrigger>
                ))}
              </TerminalAnimationTabList>
            </TerminalAnimationWindow>
          </TerminalAnimationContainer>
        </TerminalAnimationRoot>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <a
          href="/ai-agent-for-developers"
          className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200"
        >
          Learn More About Twent for Developers
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </SectionWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════
   PART 3: For Everyone
   ═══════════════════════════════════════════════════════════ */
export function Part3ForEveryone() {
  const features = [
    {
      title: "Basic Mode",
      desc: "No terminal, no code. Just talk to your AI and it handles the rest. Perfect for non-technical users.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <line x1="12" y1="2" x2="12" y2="6"/>
          <line x1="12" y1="18" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="6" y2="12"/>
          <line x1="18" y1="12" x2="22" y2="12"/>
        </svg>
      ),
      playful: true,
    },
    {
      title: "Voice Activation",
      desc: "Say the wake word and Twent listens. Natural conversation with TTS/STT support.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
          <path d="M7 10a5 5 0 0 0 10 0" opacity="0.3"/>
        </svg>
      ),
      playful: false,
    },
    {
      title: "One-Tap Automations",
      desc: "Pre-built workflows for common tasks. 'Good morning' routine, email summaries, social media checks.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" opacity="0.15"/>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      playful: false,
    },
    {
      title: "Smart Memory",
      desc: "Twent remembers your preferences, habits, and context across sessions. It learns how you work.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
          <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3 6s-3 3.5-3 5"/>
          <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 6s3 3.5 3 5"/>
          <path d="M9 14h6"/>
          <path d="M10 18h4"/>
          <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
          <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
          <line x1="9" y1="9" x2="12" y2="6"/>
          <line x1="15" y1="9" x2="12" y2="6"/>
          <line x1="9" y1="9" x2="15" y2="9"/>
          <path d="M12 20v2"/>
        </svg>
      ),
      playful: false,
    },
  ];

  return (
    <SectionWrapper id="basic-mode">
      <SectionLabel>03 / For Everyone</SectionLabel>
      <SectionTitle>
        Power users get a terminal.
        <br />
        <span className="text-orange-500">Everyone else gets magic.</span>
      </SectionTitle>
      <SectionDesc>
        Not a developer? No problem. Twent&apos;s Basic Mode strips away the
        complexity. Talk to it like a person. It handles the technical stuff
        behind the scenes.
      </SectionDesc>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className={`p-6 border transition-colors group ${
              f.playful
                ? "bg-zinc-100 dark:bg-zinc-900 border-orange-500/30 hover:border-orange-500/50"
                : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700"
            }`}
          >
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3
              className={`text-lg mb-2 group-hover:text-blue-500 transition-colors ${
                f.playful ? "font-playful text-2xl text-zinc-900 dark:text-zinc-100" : "font-display text-zinc-900 dark:text-zinc-100"
              }`}
            >
              {f.title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
