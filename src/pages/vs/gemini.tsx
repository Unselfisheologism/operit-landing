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
        metaKeywords="gemini app android, google gemini mobile, gemini pro android, gemini vs chatgpt, google ai android, best google ai app"
        metaDescription="Complete comparison of twent AI vs Google Gemini for Android. Learn which AI assistant is better for device automation, privacy, and getting things done."
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