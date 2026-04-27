import { ComparisonPage } from "../../components/ComparisonPage";

export default function ManusComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="manus"
        competitorName="Manus"
        pageTitle="twent AI vs Manus: AI Agent Comparison 2026"
        lastUpdated="April 22, 2026"
        verdict="Manus is an autonomous AI agent capable of executing complex development tasks. twent AI combines that level of autonomy with a full Android terminal, local model support, and deep system integration—all on your device."
        metaKeywords="ai agent, autonomous ai, ai assistant for android, best ai app for android, personal assistant ai, ai android"
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
          { name: "Persistent memory system", twent: true, competitor: false },
          { name: "Voice wake word", twent: true, competitor: false },
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
