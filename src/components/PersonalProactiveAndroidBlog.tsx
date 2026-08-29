import { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useInView } from "../hooks/useInView";
import { BlogPostShell } from "./BlogPostShell";
import { RoughLine } from "./ui/rough";

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

function IssueWatermark() {
  return (
    <div className="absolute -right-8 md:right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none">
      <span
        className="font-display text-[20rem] md:text-[28rem] leading-none text-zinc-100 dark:text-zinc-900/[0.4] tracking-tighter"
        style={{ wordSpacing: "-0.2em" }}
      >
        04
      </span>
    </div>
  );
}

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

const tocItems = [
  { label: "The frustration", href: "#the-frustration" },
  { label: "The gap", href: "#the-gap" },
  { label: "Twent is not another chatbot", href: "#not-another-chatbot" },
  { label: "The agent stack", href: "#agent-stack" },
  { label: "How to start", href: "#how-to-start" },
];

export function PersonalProactiveAndroidBlog({ dark }: { dark: boolean }) {
  const [heroRef, heroInView] = useInView();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <GrainOverlay />
      <Nav dark={dark} />

      <main>
        <section
          ref={heroRef}
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
        >
          <IssueWatermark />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div
              className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <RoughLine color="orange" className="w-8" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-orange-500">
                Product
              </span>
              <RoughLine color="grey" className="w-8" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-600">
                Just now
              </span>
            </div>

            <div
              className={`transition-all duration-700 delay-100 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-100 leading-[1.1] tracking-tighter mb-6">
                Personal, Proactive, Self-Driving Android AI Assistant and Agent App
              </h1>
            </div>

            <div
              className={`flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-700 delay-200 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                A short, honest take on why most AI on Android still feels like a chatbot — and what Twent is building instead.
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                  2 min read
                </span>
                <AnimatedDate visible={heroInView} />
              </div>
            </div>

            <div
              className={`mt-12 transition-all duration-700 delay-300 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div data-sketch-card className="relative">
                <img
                  src="/image.png_202608281938.jpeg"
                  width="1200"
                  height="630"
                  fetchPriority="high"
                  alt="Personal Proactive Self-Driving Android AI Assistant and Agent App"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: "500px" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>

          <div
            className={`max-w-4xl mx-auto px-6 mt-12 transition-all duration-700 delay-300 ${
              heroInView ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="h-px bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800" />
          </div>
        </section>

        <BlogPostShell
          tocItems={tocItems}
        >
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h2 id="the-frustration" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              The frustration
            </h2>

            <p className="text-lg leading-relaxed mb-8">
              When’s the last time you went, <em>“Ahh! this AI thing can’t do sh*t. Keeps talking all the time.”</em>?
            </p>
            <p className="text-base leading-relaxed mb-6">
              I bet it was today. Or yesterday.
            </p>
            <p className="text-base leading-relaxed mb-8">
              If you use AI every day, you probably hate it because of how incapable it is. It listens, it types, and then… it types some more.
            </p>

            <h2 id="the-gap" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              The gap
            </h2>

            <p className="text-base leading-relaxed mb-6">
              On one hand, there are other AI agents — Hermes-agent, Claude Code, Codex, and the likes.
            </p>
            <p className="text-base leading-relaxed mb-6">
              But unless you are highly technical and have a laptop or a VPS or a paid cloud service to run them on, there ain’t no way you can use these agents.
            </p>
            <p className="text-base leading-relaxed mb-8">
              If you’re an Android user, broke, and non-technical, <strong>you’re just doomed — till now.</strong>
            </p>

            <h2 id="not-another-chatbot" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              Twent is not another chatbot
            </h2>

            <div data-sketch-card className="bg-zinc-50 dark:bg-zinc-900/50 p-6 mb-8">
              <p className="text-base leading-relaxed text-zinc-900 dark:text-zinc-100">
                <strong>Twent</strong> is what I made to solve that exact problem.
              </p>
              <p className="text-base leading-relaxed mt-4 text-zinc-900 dark:text-zinc-100">
                No. It is <strong>NOT another AI chatbot</strong> that you merely talk to.
              </p>
              <p className="text-base leading-relaxed mt-4 text-zinc-900 dark:text-zinc-100">
                The age of <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5">prompt -&gt; response -&gt; the end</code> chatbots has ended.
              </p>
            </div>

            <h2 id="agent-stack" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              The agent stack
            </h2>

            <p className="text-base leading-relaxed mb-6">
              Twent is an Android app that is:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { title: "Hyper Pro-Active", desc: "It doesn’t wait for you to prompt it. It anticipates, nudges, and acts." },
                { title: "Persistent Memory", desc: "Memory that evolves as you keep using it — context that actually sticks." },
                { title: "Phone Control", desc: "Control your whole phone through the agent, not just one app or one chat." },
                { title: "Ubuntu Terminal", desc: "An agent with access to an Ubuntu terminal, so it can do real system-level work." },
                { title: "Bot Builder", desc: "Create bots for different tasks — like a daily holiday checker so you don’t have to think about it." },
                { title: "Subagent Swarm", desc: "Delegate subagents. Think of it as a swarm of agents, not a single overworked chatbot." },
              ].map((item) => (
                <div key={item.title} data-sketch-card className="p-5 bg-zinc-50 dark:bg-zinc-900/50">
                  <p className="font-display text-base text-zinc-900 dark:text-zinc-100 mb-1">{item.title}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div data-sketch-card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 mb-8">
              <p className="text-base leading-relaxed text-zinc-900 dark:text-zinc-100">
                “Why use your phone when AI can use it for you?”
              </p>
            </div>

            <h2 id="how-to-start" className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-6 scroll-mt-32">
              How to start
            </h2>

            <p className="text-base leading-relaxed mb-6">Simple.</p>

            <div className="space-y-4 mb-8">
              <div data-sketch-card className="p-5 bg-zinc-50 dark:bg-zinc-900/50">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-orange-500 block mb-2">01</span>
                <p className="text-base text-zinc-900 dark:text-zinc-100">
                  Download from <a href="https://play.google.com/store/apps/details?id=com.twent" className="text-blue-600 dark:text-blue-400 underline">Play Store: Twent</a> or go to <a href="https://twent.xyz" className="text-blue-600 dark:text-blue-400 underline">twent.xyz</a>.
                </p>
              </div>
              <div data-sketch-card className="p-5 bg-zinc-50 dark:bg-zinc-900/50">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-orange-500 block mb-2">02</span>
                <p className="text-base text-zinc-900 dark:text-zinc-100">
                  Grant all permissions. That’s how Twent becomes so powerful.
                </p>
              </div>
              <div data-sketch-card className="p-5 bg-zinc-50 dark:bg-zinc-900/50">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-orange-500 block mb-2">03</span>
                <p className="text-base text-zinc-900 dark:text-zinc-100">
                  Add your AI API provider, API key, and AI model in the Model Settings page.
                </p>
              </div>
              <div data-sketch-card className="p-5 bg-zinc-50 dark:bg-zinc-900/50">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-orange-500 block mb-2">04</span>
                <p className="text-base text-zinc-900 dark:text-zinc-100">
                  Message the AI Agent from the Agent Chat page, or long-press the home/power button for UI automation tasks.
                </p>
              </div>
            </div>

            <div data-sketch-card className="bg-zinc-50 dark:bg-zinc-900/50 p-6 mb-8">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <strong className="text-zinc-900 dark:text-zinc-100">Note:</strong> This post is preserved exactly as published. Asset and video files were not available in the source repository; the images below are referenced from their original hosted URLs. If you want them copied locally and rewritten to local paths, send me the files and I’ll wire them in.
              </p>
            </div>
          </div>
        </BlogPostShell>

        <section className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h2 className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
              Try Twent on Android
            </h2>
            <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 max-w-xl mx-auto">
              Install Twent and turn your phone into a proactive AI assistant.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
