import { ComparisonPage } from "../../components/ComparisonPage";

export default function CopilotComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="copilot"
        competitorName="Microsoft Copilot"
        pageTitle="twent AI vs Microsoft Copilot: Full Comparison (2026)"
        lastUpdated="April 27, 2026"
        verdict="Microsoft Copilot is great for Microsoft users who want GPT-4 + DALL-E image generation. twent AI is great for anyone who needs to get things done on their Android device. Choose Copilot for creativity, choose twent for device automation."
        metaKeywords="copilot app android, microsoft copilot android, copilot ai mobile, copilot vs chatgpt, best ai assistant android, microsoft ai android"
        metaDescription="Complete comparison of twent AI vs Microsoft Copilot for Android. Learn which AI assistant is better for device automation, task execution, and productivity."
        features={[
          {
            name: "Runs tasks on your phone",
            twent: true,
            competitor: false,
          },
          {
            name: "Claude Code + tools",
            twent: true,
            competitor: false,
          },
          {
            name: "UI automation",
            twent: true,
            competitor: false,
          },
          {
            name: "Skills + workflows",
            twent: true,
            competitor: false,
          },
          {
            name: "Floating overlay mode",
            twent: true,
            competitor: false,
          },
          {
            name: "Local AI models (GGUF)",
            twent: true,
            competitor: false,
          },
          {
            name: "Privacy-first architecture",
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
            name: "Free forever",
            twent: true,
            competitor: false,
          },
          {
            name: "GPT-4o access",
            twent: false,
            competitor: true,
          },
          {
            name: "Copilot Voice",
            twent: false,
            competitor: true,
          },
          {
            name: "Image generation (DALL-E 3)",
            twent: false,
            competitor: true,
          },
        ]}
      />
    </div>
  );
}