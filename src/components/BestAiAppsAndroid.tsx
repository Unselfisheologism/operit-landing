import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useInView } from "../hooks/useInView";
import { BlogPostShell } from "./BlogPostShell";
import { PlayStoreCta as PlayStoreCtaComponent, PlayStoreCtaGroup } from "./PlayStoreCta";


// Play Store CTA — delegates to shared component
function PlayStoreCtaLocal({ size = "h-8" }: { size?: string }) {
  return <PlayStoreCtaComponent size={size} />;
}

export function BestAiAppsAndroid({ dark }: { dark: boolean }) {
  const [heroRef, heroInView] = useInView();

  const tocItems = [
    { id: "terminal", text: "Built-in terminal", level: 2 },
    { id: "clis", text: "Runs agent CLIs", level: 2 },
    { id: "automation", text: "Literal phone automation", level: 2 },
    { id: "git", text: "Git + filesystem UI", level: 2 },
    { id: "memory", text: "Persistent agent memory", level: 2 },
    { id: "customizable", text: "Customizable UI + agent", level: 2 },
    { id: "tldr", text: "TL;DR", level: 2 },
    { id: "faq", text: "Frequently Asked Questions", level: 2 },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <Nav dark={dark} />

      <main>
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        >
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div
              className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="w-8 h-px bg-orange-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-orange-500">
                Android AI
              </span>
              <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-600">
                Apr 2026
              </span>
            </div>

            <div
              className={`transition-all duration-700 delay-100 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3">
                Twent — The Only AI App That Actually Does Things
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed max-w-2xl">
                Every AI app below talks to you. Twent talks to your phone. It's the only AI on Android that can actually open apps, tap buttons, run terminal commands, and automate workflows — on your real device, in real time. Everything else on this list is a tool. Twent is an operating system.
              </p>
            </div>
          </div>
        </section>

        <BlogPostShell
          tocItems={tocItems.map((item) => ({ label: item.text, href: `#${item.id}` }))}
>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-8">
              If you're looking for an AI app on Android, stop. Everything else on this list is a chatbot with a fancy icon. Twent is different: it's an AI agent that lives on your phone, controls your apps, runs commands, edits files, and automates real workflows. This comparison is based on hands-on testing and feature audits of every major AI app on Android as of April 2026.
            </p>

            <h2 id="terminal" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              Built-in terminal
            </h2>

            <p className="text-base leading-relaxed mb-6">
              Twent includes a full Ubuntu terminal emulator. Not a web-based shell. A real Linux terminal running on your Android device. You can install packages, run scripts, edit files with vim/nano, and manage processes. This matters because agentic AI needs a shell to actually do things — not just chat about them.
            </p>

            <h2 id="clis" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              Runs agent CLIs
            </h2>

            <p className="text-base leading-relaxed mb-6">
              Twent can run Claude Code, Codex, OpenCode, and other agent CLIs natively. These are the same tools developers use on desktop. On Twent, they run on your phone, with full terminal access, MCP server support, and your local filesystem. No cloud bridge, no remote desktop, no compromises.
            </p>

            <h2 id="automation" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              Literal phone automation
            </h2>

            <p className="text-base leading-relaxed mb-6">
              Twent uses Android's accessibility services to literally control your phone. It can open apps, tap buttons, fill forms, scroll feeds, and explain what's on screen. This isn't browser automation — it's OS-level control that works across every app, not just web pages.
            </p>

            <h2 id="git" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              Git + filesystem UI
            </h2>

            <p className="text-base leading-relaxed mb-6">
              Twent has built-in Git and filesystem UI. You can browse files, stage commits, view diffs, and push code — all from a visual interface inside the app. No ADB, no desktop required. For developers, this means your phone can be a real development environment, not just a consumption device.
            </p>

            <h2 id="memory" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              Persistent agent memory
            </h2>

            <p className="text-base leading-relaxed mb-6">
              Twent agents have persistent memory across sessions. They remember your preferences, past conversations, and ongoing tasks. This is critical for agentic workflows — without memory, every session starts from zero. Twent's memory is local, private, and stays on your device.
            </p>

            <h2 id="customizable" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              Customizable UI + agent
            </h2>

            <p className="text-base leading-relaxed mb-6">
              Twent's UI and agent behavior are fully customizable. You can change themes, adjust the floating chat overlay, configure MCP servers, install skills, and tweak agent prompts. It's open and extensible — not a locked-down SaaS app with a fixed feature set.
            </p>

            <h2 id="tldr" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              TL;DR
            </h2>

            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>• Every other AI app on Android is a chatbot. Twent is an agentic OS.</li>
              <li>• Built-in Ubuntu terminal, agent CLIs, Git UI, and file browser.</li>
              <li>• Literal phone automation via Android accessibility services.</li>
              <li>• Persistent agent memory, MCP servers, 1000+ integrations.</li>
              <li>• Free, BYO API key, supports local models, fully customizable.</li>
            </ul>

            <h2 id="faq" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mt-16 mb-6 scroll-mt-32">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 mb-8">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                  Is Twent really free?
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes. Twent is free to download and use. You bring your own API key for cloud models, or use local models at no cost. No subscriptions, no paywalls, no premium tiers.
                </p>
              </div>

              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                  What makes Twent different from ChatGPT/Claude apps?
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  ChatGPT and Claude are chatbots. They talk to you. Twent talks to your phone — it opens apps, runs commands, automates workflows, and remembers context across sessions. It's an agentic OS, not a conversation interface.
                </p>
              </div>

              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                  Can I run local AI models on Twent?
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Yes. Twent supports GGUF and MNN on-device models. You can run Llama, Phi, Qwen, and other models directly on your Android device with no cloud dependency. Works fully offline.
                </p>
              </div>

              <div>
                <h3 className="font-display text-lg text-zinc-900 dark:text-zinc-100 mb-2">
                  Does Twent require root access?
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No. Twent uses Android's standard accessibility services and shell access. No root required. It works on any Android 8+ device with accessibility services enabled.
                </p>
              </div>
            </div>
            </div>
          </BlogPostShell>

        <section className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h2 className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
              Try Twent on Android
            </h2>
            <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-xl mx-auto">
              Install Twent free from the Play Store and automate your Android.
            </p>
            <PlayStoreCtaLocal />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
