import { ComparisonPage } from "../../components/ComparisonPage";

export default function ClaudeComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="claude"
        competitorName="Claude"
        pageTitle="twent AI vs Claude Mobile: Which Is Better For Android?"
        lastUpdated="April 22, 2026"
        verdict="Claude is a powerful AI assistant with strong reasoning, but it's cloud-only and lacks Android integration. twent AI brings a full terminal, local model support, and deep Android automation to your device."
        metaKeywords="ai assistant for android, best ai app for android, personal assistant ai, ai apps for android, ai android, android ai assistant, best ai android"
        features={[
          {
            name: "Built-in Ubuntu 24 Terminal",
            twent: true,
            competitor: false,
          },
          {
            name: "Local GGUF model inference",
            twent: true,
            competitor: false,
          },
          {
            name: "MCP / Skill plugin ecosystem",
            twent: true,
            competitor: false,
          },
          { name: "Android UI automation", twent: true, competitor: false },
          { name: "Persistent memory system", twent: true, competitor: true },
          { name: "Voice wake word", twent: true, competitor: true },
          { name: "Floating bubble overlay", twent: true, competitor: false },
          {
            name: "Character cards / personas",
            twent: true,
            competitor: false,
          },
          { name: "Parallel tool execution", twent: true, competitor: false },
          { name: "ADB / Root integration", twent: true, competitor: false },
          { name: "Offline operation", twent: true, competitor: false },
          { name: "File system access", twent: true, competitor: true },
          { name: "Free tier available", twent: true, competitor: true },
          { name: "Open source", twent: true, competitor: false },
        ]}
      />
    </div>
  );
}
