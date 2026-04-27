import { ComparisonPage } from "../../components/ComparisonPage";

export default function N8nComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="n8n"
        competitorName="n8n"
        pageTitle="twent AI vs n8n: Automation Comparison 2026"
        lastUpdated="April 22, 2026"
verdict="n8n is the industry standard for node based workflow automation. twent AI is an AI native assistant with LLM driven automation, natural language scheduling, full terminal access and runs locally on your Android phone. n8n requires a server, twent runs in your pocket."
        metaKeywords="ai automation, workflow automation, best ai for android, ai android, personal assistant ai, ai assistant for android, best ai app for android"
        features={[
          { name: "Workflow Automation", twent: true, competitor: true },
          { name: "Scheduled Jobs", twent: true, competitor: true },
          { name: "Native Android App", twent: true, competitor: false },
          {
            name: "Natural Language Configuration",
            twent: true,
            competitor: false,
          },
          { name: "Full Terminal Access", twent: true, competitor: false },
          { name: "Local Execution", twent: true, competitor: true },
          { name: "LLM Agent Capabilities", twent: true, competitor: true },
          { name: "Open Source", twent: true, competitor: true },
          { name: "500+ Integrations", twent: false, competitor: true },
          { name: "Visual Node Editor", twent: false, competitor: true },
        ]}
      />
    </div>
  );
}
