import { ComparisonPage } from "../../components/ComparisonPage";

export default function OpenclawComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="openclaw"
        competitorName="OpenClaw AI"
        pageTitle="twent AI vs OpenClaw AI: Comparison 2026"
        lastUpdated="April 22, 2026"
        verdict="OpenClaw is an excellent desktop AI assistant that runs on Mac/Windows. twent AI is the only one of the two that runs natively on Android, has full terminal access and device level automation. Both are fully open source."
        features={[
          { name: "Open Source", twent: true, competitor: true },
          { name: "24/7 Persistent Runtime", twent: true, competitor: true },
          { name: "Native Android Support", twent: true, competitor: false },
          { name: "Ubuntu Terminal Emulation", twent: true, competitor: false },
          { name: "MCP Protocol Support", twent: true, competitor: true },
          { name: "Local Model Execution", twent: true, competitor: true },
          { name: "Device Level Automation", twent: true, competitor: false },
          { name: "Floating Overlay", twent: true, competitor: false },
          { name: "Background Cron Jobs", twent: true, competitor: true },
          { name: "Self Hostable", twent: true, competitor: true },
        ]}
      />
    </div>
  );
}
