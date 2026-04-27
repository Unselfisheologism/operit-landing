import { ComparisonPage } from "../../components/ComparisonPage";

export default function SoundhoundComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="soundhound"
        competitorName="SoundHound AI"
        pageTitle="Twent AI vs SoundHound AI: Complete Comparison (2026)"
        lastUpdated="April 27, 2026"
        verdict="SoundHound AI excels at voice AI and music recognition. Twent is the better choice for users who need an AI that works on their device - running terminals, automating apps, connecting to 1000+ integrations via MCP and Composio."
        metaKeywords="soundhound ai, soundhound ai app, soundhound android, soundhound ai for android, soundhound alternative, ai voice assistant android, music recognition android"
        metaDescription="Complete comparison of Twent AI vs SoundHound AI for Android. Learn which AI assistant is better for device automation, productivity, and getting things done on your phone."
        features={[
          {
            name: "Runs on your device",
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
            name: "Skills + custom workflows",
            twent: true,
            competitor: false,
          },
          {
            name: "MCP + Composio integrations",
            twent: true,
            competitor: false,
          },
          {
            name: "Claude Code execution",
            twent: true,
            competitor: false,
          },
          {
            name: "Local GGUF model support",
            twent: true,
            competitor: false,
          },
          {
            name: "Privacy-first BYOK",
            twent: true,
            competitor: false,
          },
          {
            name: "Floating overlay",
            twent: true,
            competitor: false,
          },
          {
            name: "Voice AI (built-in)",
            twent: true,
            competitor: true,
          },
          {
            name: "Music recognition",
            twent: false,
            competitor: true,
          },
          {
            name: "Free tier",
            twent: true,
            competitor: true,
          },
        ]}
      />
    </div>
  );
}