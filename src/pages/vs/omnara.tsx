import { ComparisonPage } from "../../components/ComparisonPage";

export default function OmnaraComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="omnara"
        competitorName="Omnara"
        pageTitle="twent AI vs Omnara: AI Agent Orchestration Comparison 2026"
        lastUpdated="April 22, 2026"
        verdict="Omnara is a powerful cross‑platform orchestration platform for coding agents, focusing on desktop and cloud workflows. twent AI is an Android‑first AI assistant with a full terminal, local models, and deep device integration. twent keeps your data on‑device and offers advanced automation without relying on cloud sessions."
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
          { name: "Android UI automation", twent: true, competitor: false },
          { name: "MCP / Skill plugins", twent: true, competitor: false },
          {
            name: "Cross-platform support (desktop, web, mobile, watch)",
            twent: false,
            competitor: true,
          },
          {
            name: "Parallel agent orchestration",
            twent: true,
            competitor: true,
          },
          { name: "Voice interaction", twent: true, competitor: true },
          { name: "Cloud session continuity", twent: false, competitor: true },
          { name: "Git integration", twent: false, competitor: true },
          { name: "Open source", twent: true, competitor: false },
          { name: "Free tier available", twent: true, competitor: true },
          { name: "Floating bubble overlay", twent: true, competitor: false },
          { name: "File system access", twent: true, competitor: true },
          { name: "ADB / Root integration", twent: true, competitor: false },
        ]}
      />
    </div>
  );
}
