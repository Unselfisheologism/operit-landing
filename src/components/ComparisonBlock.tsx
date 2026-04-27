import { useState } from "react";
import { useInView } from "../hooks/useInView";

// Enhanced competitor data — "vs" keywords with SEO metrics
// Search volume: Google Keyword Planner exact match (12mo avg)
// CPC: AdWords estimated cost per click (indicator of commercial intent)
// Difficulty: SEO competition (low/medium/high)
// Intent: searcher stage (research, comparison, decision)
const comparisons = [
  {
    id: "vs-replika",
    competitor: "Replika",
    keyword: "replika app",
    altKeywords: ["replika vs chatgpt", "replika ai companion"],
    searchVolume: "880/mo",
    cpc: "$2.40",
    difficulty: "low",
    intent: "comparison",
    twentBetter: [
      "Actually runs tasks and opens apps",
      "Claude Code and 50+ built-in tools",
      "Full Ubuntu terminal",
      "UI automation (tap, swipe, type)",
      "MCP + Composio integrations",
      "Skills and workflows",
      "Privacy-first with BYOK",
    ],
    replikaBetter: [
      "Companionship and roleplay",
      "Emotional support focus",
      "Avatar system",
    ],
    verdict: "Replika excels at conversation. Twent excels at action.",
    pageUrl: "/twent-vs-replika",
  },
  {
    id: "vs-chatgpt",
    competitor: "ChatGPT",
    keyword: "chatgpt on android",
    altKeywords: ["chatgpt app android", "chat gpt mobile"],
    searchVolume: "110/mo",
    cpc: "$3.20",
    difficulty: "medium",
    intent: "decision",
    twentBetter: [
      "Actually does things on your phone",
      "Claude Code execution",
      "UI automation",
      "Local AI model support",
      "Overlay floating assistant",
      "Skills + workflows marketplace",
    ],
    chatgptBetter: [
      "Broader model access (o1, o3)",
      "Larger context window",
      "More polished web search",
      "Image generation (DALL-E)",
    ],
    verdict: "ChatGPT is a better chatbot. Twent is a better AI agent.",
    pageUrl: null,
  },
  {
    id: "vs-native-assistants",
    competitor: "Siri / Bixby",
    keyword: "android phone ai",
    altKeywords: ["siri android alternative", "bixby vs google assistant"],
    searchVolume: "210/mo",
    cpc: "$1.80",
    difficulty: "low",
    intent: "research",
    twentBetter: [
      "Connects to any API or tool",
      "Claude Code execution",
      "Custom skills and workflows",
      "MCP server support",
      "Floating overlay mode",
      "Open — not locked to ecosystem",
      "BYOK privacy model",
    ],
    nativeBetter: [
      "Deep OS integration",
      "Hardware button activation",
      "Always listening",
      "App-specific contexts",
    ],
    verdict: "Siri/Bixby automate the OS. Twent automates everything.",
    pageUrl: null,
  },
  {
    id: "vs-google-ai-test-kitchen",
    competitor: "Google AI Test Kitchen",
    keyword: "google ai test kitchen",
    altKeywords: ["google test kitchen app", "google gemini android"],
    searchVolume: "260/mo",
    cpc: "$0.90",
    difficulty: "low",
    intent: "research",
    twentBetter: [
      "Full-featured AI assistant OS",
      "Actually runs on your phone",
      "Claude Code + tools",
      "Persistent memory",
      "Skills and mini-apps",
      "Marketplace for sharing",
    ],
    googleBetter: [
      "Access to cutting-edge Google AI",
      "Short experiments",
      "Whisper integration",
    ],
    verdict: "Test Kitchen shows demos. Twent runs production.",
    pageUrl: null,
  },
  {
    id: "vs-copilot",
    competitor: "Microsoft Copilot",
    keyword: "copilot app android",
    altKeywords: ["microsoft copilot android", "copilot ai mobile"],
    searchVolume: "320/mo",
    cpc: "$2.10",
    difficulty: "medium",
    intent: "comparison",
    twentBetter: [
      "Actually executes tasks on device",
      "Claude Code + tool calling",
      "UI automation and macros",
      "Floating overlay assistant",
      "Local model support",
      "Privacy-first architecture",
    ],
    copilotBetter: [
      "GPT-4o access",
      "Deep Microsoft 365 integration",
      "Copilot Voice feature",
      "Image generator (DALL-E 3)",
    ],
    verdict: "Copilot is great for Microsoft users. Twent is great for getting things done.",
    pageUrl: "/twent-vs-copilot",
  },
  {
    id: "vs-claude",
    competitor: "Claude (Anthropic)",
    keyword: "claude ai android",
    altKeywords: ["claude app for android", "claude mobile"],
    searchVolume: "170/mo",
    cpc: "$4.50",
    difficulty: "medium",
    intent: "decision",
    twentBetter: [
      "Actually runs tasks on your phone",
      "UI automation (tap, type, swipe)",
      "Floating overlay mode",
      "Skills + workflows",
      "Composio + MCP integrations",
      "Terminal access",
    ],
    claudeBetter: [
      "Claude's advanced reasoning (sonnet/opus)",
      "Larger context (200K)",
      "Computer use capability",
      "More refined outputs",
    ],
    verdict: "Claude on web is elite for reasoning. Twent is elite for action.",
    pageUrl: null,
  },
  {
    id: "vs-pi",
    competitor: "Pi (Inflection)",
    keyword: "pi ai chatbot",
    altKeywords: ["pi ai android app", "inflection pi mobile"],
    searchVolume: "140/mo",
    cpc: "$1.50",
    difficulty: "low",
    intent: "research",
    twentBetter: [
      "Actually automates workflows",
      "Claude Code tools",
      "UI task automation",
      "Skills marketplace",
      "Floating overlay",
      "MCP + Composio",
    ],
    piBetter: [
      "VoicedConversations",
      "Empathetic personality",
      "Mini-apps (Chef, Coach, others)",
      "Voice mode",
    ],
    verdict: "Pi is great for talking. Twent is great for doing.",
    pageUrl: null,
  },
  {
    id: "vs-gemini",
    competitor: "Gemini (Google)",
    keyword: "gemini app android",
    altKeywords: ["google gemini mobile", "gemini pro android"],
    searchVolume: "390/mo",
    cpc: "$2.80",
    difficulty: "high",
    intent: "decision",
    twentBetter: [
      "Runs actual tasks on your phone",
      "UI automation and macros",
      "Skills + custom workflows",
      "Floating overlay",
      "Local model deployment",
      "Privacy BYOK model",
    ],
    geminiBetter: [
      "Google's Ultra models",
      "Deep search integration",
      "Gmail/Docs/Sheets integration",
      "Workspace business suite",
      "Image generation (Imagen)",
    ],
    verdict: "Gemini lives in Google apps. Twent lives on your device.",
    pageUrl: "/twent-vs-gemini",
  },
];

interface ComparisonCardProps {
  comp: (typeof comparisons)[number];
  index: number;
}

function ComparisonCard({ comp, index }: ComparisonCardProps) {
  const [ref, inView] = useInView();
  const [expanded, setExpanded] = useState(false);

  const difficultyColor = {
    low: "text-green-600 bg-green-50",
    medium: "text-yellow-600 bg-yellow-50",
    high: "text-red-600 bg-red-50",
  }[comp.difficulty];

  return (
    <div
      ref={ref}
      className={`border border-zinc-200 dark:border-zinc-800 transition-all duration-500 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      id={comp.id}
    >
      {/* Header — clickable */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-900 rounded flex items-center justify-center font-display text-sm text-zinc-900 dark:text-zinc-100">
            vs
          </div>
          <div>
            <h3 className="font-display text-base text-zinc-900 dark:text-zinc-100">
              Twent vs {comp.competitor}
            </h3>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs font-mono text-zinc-500">
                {comp.keyword}
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-xs text-zinc-400">
                {comp.searchVolume}
              </span>
              <span className="text-xs text-zinc-400">
                CPC: {comp.cpc}
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${difficultyColor}`}>
                {comp.difficulty}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {comp.pageUrl && (
            <a
              href={comp.pageUrl}
              className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 mr-2"
              onClick={(e) => e.stopPropagation()}
            >
              Full comparison →
            </a>
          )}
          <span
            className={`text-zinc-400 text-lg transition-transform ${
              expanded ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[800px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-5">
          {/* Verdict */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 p-4 mb-6">
            <p className="text-sm text-blue-700 dark:text-blue-400 italic">
              {comp.verdict}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Twent column */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Twent ✓
                </span>
              </div>
              <ul className="space-y-1.5">
                {comp.twentBetter.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-500 mt-0.5">✓</span>
                    <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Competitor column */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-zinc-400" />
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  {comp.competitor} ✓
                </span>
              </div>
              <ul className="space-y-1.5">
                {(comp as unknown as Record<string, string[]>)[`${comp.id.split("-")[1]}Better`]?.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-zinc-400 mt-0.5">✓</span>
                    <span className="text-zinc-500 dark:text-zinc-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SEO metadata for reference */}
          <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-400">
              Intent: {comp.intent} • Alt keywords: {comp.altKeywords?.join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComparisonBlock() {
  const [ref, inView] = useInView();

  return (
    <section
      id="comparisons"
      className="py-20 md:py-28 px-6"
    >
      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-purple-500" />
          <span className="text-xs font-secondary text-purple-500 uppercase tracking-[0.2em]">
            How We Stack Up
          </span>
        </div>

        {/* Heading */}
        <div className="mb-2">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
            Twent vs the rest.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
            See how Twent compares to the apps people search for most.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="mt-10 space-y-2">
          {comparisons.map((comp, i) => (
            <ComparisonCard key={comp.id} comp={comp} index={i} />
          ))}
        </div>

        {/* Note */}
        <p className="mt-6 text-xs text-zinc-500 text-center">
          Search volumes from Google Keyword Planner (exact match, last 12 months avg)
        </p>
      </div>
    </section>
  );
}