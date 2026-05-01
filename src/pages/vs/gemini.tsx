import { ComparisonPage } from "../../components/ComparisonPage";

export default function GeminiComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="gemini"
        competitorName="Google Gemini"
        pageTitle="twent AI vs Google Gemini: Full Comparison (2026)"
        lastUpdated="April 27, 2026"
        verdict="Gemini lives inside Google apps (with paid Workspace). twent AI lives on your device. Choose Gemini for Workspace users who need Gmail/Docs integration, choose twent for device automation and privacy."
        metaKeywords="google gemini, gemini ultra mobile, google ai assistant, multimodal android app, workspace ai tool"
        metaDescription="Complete comparison of twent AI vs Google Gemini for Android. Learn which AI assistant is better for device automation, privacy, and getting things done."
        faq={[
          {
            question: "Can Google Gemini automate my Android phone?",
            answer: "No, Gemini lives inside Google apps but cannot interact with Android UI elements, tap buttons, or automate tasks. Twent is specifically designed for Android automation.",
          },
          {
            question: "Does Gemini work offline?",
            answer: "No, Gemini requires constant internet. Twent runs local GGUF models fully offline while still offering cloud API options when needed.",
          },
          {
            question: "Is Gemini free to use?",
            answer: "Gemini is free in basic Google apps but advanced Ultra models require a $20+/month Workspace subscription. Twent has a free tier with Ubuntu + basic AI, then $9.99/month for all features.",
          },
          {
            question: "Which is better for privacy?",
            answer: "Twent. Zero telemetry - your data never leaves your device with local models. Gemini sends everything to Google's servers with their privacy policies.",
          },
        ]}
        features={[
          {
            name: "Runs tasks on device",
            twent: true,
            competitor: false,
          },
          {
            name: "UI automation",
            twent: true,
            competitor: false,
          },
          {
            name: "Skills + custom workflows",
            twent: true,
            competitor: false,
          },
          {
            name: "Floating overlay",
            twent: true,
            competitor: false,
          },
          {
            name: "Local model deployment",
            twent: true,
            competitor: false,
          },
          {
            name: "Privacy BYOK model",
            twent: true,
            competitor: false,
          },
          {
            name: "Claude Code tools",
            twent: true,
            competitor: false,
          },
          {
            name: "Full Ubuntu terminal",
            twent: true,
            competitor: false,
          },
          {
            name: "MCP ecosystem",
            twent: true,
            competitor: false,
          },
          {
            name: "Offline operation",
            twent: true,
            competitor: false,
          },
          {
            name: "Free tier",
            twent: true,
            competitor: true,
          },
          {
            name: "Google Ultra models",
            twent: false,
            competitor: true,
          },
          {
            name: "Deep search integration",
            twent: false,
            competitor: true,
          },
          {
            name: "Gmail/Docs integration",
            twent: false,
            competitor: true,
          },
        ]}
      />
    </div>
  );
}