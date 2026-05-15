import { ComparisonPage } from "../../components/ComparisonPage";

export default function SiriBixbyComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="siri-bixby"
        competitorName="Siri & Bixby"
        pageTitle="twent AI vs Siri & Bixby — Native Voice Assistants vs Real AI Agent (2026)"
        lastUpdated="May 15, 2026"
        verdict="Siri and Bixby are built-in voice assistants with deep OS integration but limited capabilities. twent AI is a full AI agent OS that connects to any API, runs code, and automates your entire phone. Siri and Bixby control system settings; Twent does everything else."
        metaKeywords="siri android, bixby alternative, samsung bixby, virtual assistant comparison, ai phone assistant, siri vs twent, bixby vs twent, best android assistant 2026"
        metaDescription="Complete comparison of twent AI vs Siri and Bixby. Native assistants excel at hardware control and always-listening voice commands. Twent runs Claude Code, automates UI, connects to MCP servers, and gives you a full Ubuntu terminal on your Android phone."
        faq={[
          {
            question: "Can Siri or Bixby run code on my phone?",
            answer: "No. Siri and Bixby are voice-first assistants limited to system controls, app launching, and simple queries. Neither can run Python, execute terminal commands, or run Claude Code. Twent includes a full Ubuntu terminal with Node.js, Python, Go, Rust, and Git.",
          },
          {
            question: "Can I install Twent alongside Siri or Bixby?",
            answer: "Yes. Siri is exclusive to Apple devices (iOS, macOS) and Bixby is exclusive to Samsung Android devices. Twent runs on any Android phone regardless of manufacturer and can be used alongside the built-in assistant — it floats as a bubble overlay.",
          },
          {
            question: "Which is better for automation — Siri or Twent?",
            answer: "Twent is dramatically more capable. Siri and Bixby can toggle settings and launch apps via voice. Twent can tap any UI element, fill forms, scrape web pages, run Claude Code agents, connect to MCP servers, and chain complex multi-step workflows.",
          },
          {
            question: "Do Siri or Bixby support custom plugins or skills?",
            answer: "No. Siri has Shortcuts (predefined automations) and Bixby has Modes & Routines, but neither supports an open plugin ecosystem. Twent has a full MCP/Skills marketplace where anyone can create and share custom capabilities.",
          },
          {
            question: "Are Siri or Bixby private?",
            answer: "Both send voice data to Apple and Samsung servers for processing. Twent offers a BYOK (Bring Your Own Key) model and supports local GGUF models that run fully offline with zero telemetry.",
          },
        ]}
        features={[
          {
            name: "Deep OS integration",
            twent: false,
            competitor: true,
          },
          {
            name: "Hardware button activation",
            twent: false,
            competitor: true,
          },
          {
            name: "Always listening voice mode",
            twent: true,
            competitor: true,
          },
          {
            name: "App-specific contexts",
            twent: false,
            competitor: true,
          },
          {
            name: "Full Ubuntu terminal",
            twent: true,
            competitor: false,
          },
          {
            name: "Claude Code execution",
            twent: true,
            competitor: false,
          },
          {
            name: "Android UI automation (tap, swipe, type)",
            twent: true,
            competitor: false,
          },
          {
            name: "Custom skills and workflows",
            twent: true,
            competitor: false,
          },
          {
            name: "MCP server & Composio support",
            twent: true,
            competitor: false,
          },
          {
            name: "Floating overlay mode",
            twent: true,
            competitor: false,
          },
          {
            name: "Connect to any API or tool",
            twent: true,
            competitor: false,
          },
          {
            name: "BYOK privacy model",
            twent: true,
            competitor: false,
          },
          {
            name: "Local GGUF offline models",
            twent: true,
            competitor: false,
          },
          {
            name: "Open ecosystem (not locked)",
            twent: true,
            competitor: false,
          },
          {
            name: "Cross-platform (Android, manufacturer agnostic)",
            twent: true,
            competitor: false,
          },
        ]}
      />
    </div>
  );
}
