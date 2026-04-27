import { ComparisonPage } from "../../components/ComparisonPage";

export default function GeminiComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="gemini"
        competitorName="Gemini"
        pageTitle="twent AI vs Gemini App: Feature Comparison 2026"
        lastUpdated="April 22, 2026"
verdict="Gemini offers deep Google integration and voice capabilities, but it's limited to cloud usage and doesn't support local inference or Android system automation. twent AI gives you full control on your device with a built-in terminal and offline operation."
        metaKeywords="google gemini android, ai assistant for android, best ai app for android, ai android, personal assistant ai, ai apps for android"
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
          { name: "File system access", twent: true, competitor: false },
          { name: "Free tier available", twent: true, competitor: true },
          { name: "Open source", twent: true, competitor: false },
        ]}
      />
    </div>
  );
}
