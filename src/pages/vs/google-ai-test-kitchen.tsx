import { ComparisonPage } from "../../components/ComparisonPage";

export default function GoogleAiTestKitchenComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="google-ai-test-kitchen"
        competitorName="Google AI Test Kitchen"
        pageTitle="twent AI vs Google AI Test Kitchen — Experimental Demos vs Production Agent (2026)"
        lastUpdated="May 15, 2026"
        verdict="Google AI Test Kitchen is an experimental sandbox for testing early Google AI capabilities — short demos, not a daily driver. twent AI is a full production AI agent OS that runs code, automates tasks, and lives on your Android phone. Test Kitchen shows what might be possible; Twent does what's possible right now."
        metaKeywords="google ai test kitchen, google test kitchen app, google gemini android demo, experimental ai app, google ai sandbox, google lamda, twent vs google ai"
        metaDescription="Complete comparison of twent AI vs Google AI Test Kitchen. Test Kitchen is an experimental demo platform for Google's latest AI research. Twent is a production-ready AI agent with Ubuntu terminal, Claude Code, UI automation, MCP plugins, and privacy-first architecture."
        faq={[
          {
            question: "Is Google AI Test Kitchen still active?",
            answer: "Google AI Test Kitchen was an experimental app that showcased early Google AI research like LaMDA and MusicLM. Google has since shifted focus to Gemini as their main consumer AI product. Twent remains actively developed with regular updates and a growing user community.",
          },
          {
            question: "Can Google AI Test Kitchen automate my Android phone?",
            answer: "No. Test Kitchen was a demo environment for conversational AI experiments — it cannot interact with system UI, run code, or automate tasks. Twent is designed specifically for Android automation with UI tap/swipe/type capabilities.",
          },
          {
            question: "Does Google AI Test Kitchen have a terminal or developer tools?",
            answer: "No. Test Kitchen was purely experimental — no terminal, no code execution, no plugin system. Twent includes a full Ubuntu 24 development environment with Python, Node.js, Go, Rust, Git, and VS Code Server.",
          },
          {
            question: "Is Twent or Google AI Test Kitchen better for privacy?",
            answer: "Twent. Test Kitchen sent all interactions to Google's servers for research purposes. Twent supports local GGUF models that run entirely offline, plus BYOK (Bring Your Own Key) so only you control your data.",
          },
          {
            question: "Can I use Google AI Test Kitchen with MCP servers?",
            answer: "No, Test Kitchen had no plugin or server integration system. Twent supports MCP (Model Context Protocol) servers and Composio integrations, letting you connect to any external tool, API, or data source.",
          },
        ]}
        features={[
          {
            name: "Access to cutting-edge Google AI",
            twent: false,
            competitor: true,
          },
          {
            name: "Short AI experiments / demos",
            twent: false,
            competitor: true,
          },
          {
            name: "Whisper integration (speech)",
            twent: true,
            competitor: true,
          },
          {
            name: "Full-featured AI assistant OS",
            twent: true,
            competitor: false,
          },
          {
            name: "Runs on your phone (production-ready)",
            twent: true,
            competitor: false,
          },
          {
            name: "Claude Code + tool execution",
            twent: true,
            competitor: false,
          },
          {
            name: "Ubuntu terminal environment",
            twent: true,
            competitor: false,
          },
          {
            name: "Persistent memory system",
            twent: true,
            competitor: false,
          },
          {
            name: "Skills and mini-apps marketplace",
            twent: true,
            competitor: false,
          },
          {
            name: "Android UI automation",
            twent: true,
            competitor: false,
          },
          {
            name: "MCP + Composio integrations",
            twent: true,
            competitor: false,
          },
          {
            name: "Floating bubble overlay",
            twent: true,
            competitor: false,
          },
          {
            name: "Local GGUF offline inference",
            twent: true,
            competitor: false,
          },
          {
            name: "Privacy BYOK model",
            twent: true,
            competitor: false,
          },
          {
            name: "Actively developed and updated",
            twent: true,
            competitor: false,
          },
        ]}
      />
    </div>
  );
}
