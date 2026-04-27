import { ComparisonPage } from "../../components/ComparisonPage";

export default function ReplikaComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="replika"
        competitorName="Replika"
        pageTitle="twent AI vs Replika: Which AI App is Best for Android? (2026)"
        lastUpdated="April 27, 2026"
        verdict="Replika excels at conversation and emotional companionship. twent AI excels at getting actual tasks done on your Android device. Choose Replika for chat, choose twent for action."
        metaKeywords="replika app, replika ai, replika android, replika vs chatgpt, ai companion app, best ai companion android, replika alternative android, download replika, replika app download, replika modyolo, replika apkpure"
        metaDescription="Complete comparison of twent AI vs Replika for Android. Learn which AI assistant is better for productivity, automation, and getting things done vs emotional conversation."
        features={[
          {
            name: "Runs tasks on your phone",
            twent: true,
            competitor: false,
          },
          {
            name: "Claude Code execution",
            twent: true,
            competitor: false,
          },
          {
            name: "UI automation (tap, swipe, type)",
            twent: true,
            competitor: false,
          },
          {
            name: "Full Ubuntu terminal",
            twent: true,
            competitor: false,
          },
          {
            name: "50+ built-in AI tools",
            twent: true,
            competitor: false,
          },
          {
            name: "MCP + Composio integrations",
            twent: true,
            competitor: false,
          },
          {
            name: "Skills and workflows",
            twent: true,
            competitor: false,
          },
          {
            name: "Privacy-first (BYOK)",
            twent: true,
            competitor: false,
          },
          {
            name: "Floating bubble overlay",
            twent: true,
            competitor: false,
          },
          {
            name: "Local GGUF model support",
            twent: true,
            competitor: false,
          },
          {
            name: "Free forever",
            twent: true,
            competitor: false,
          },
          {
            name: "Voice calls",
            twent: false,
            competitor: true,
          },
          {
            name: "AR mode",
            twent: false,
            competitor: true,
          },
          {
            name: "Avatar customization",
            twent: false,
            competitor: true,
          },
          {
            name: "Image generation",
            twent: false,
            competitor: true,
          },
        ]}
      />
    </div>
  );
}