import { ComparisonPage } from '../../components/ComparisonPage'

export default function MakeComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="make"
        competitorName="Make"
        pageTitle="Operit AI vs Make: Automation Comparison 2026"
        lastUpdated="April 22, 2026"
        verdict="Make is a powerful cloud-based workflow automation platform with thousands of integrations. Operit AI runs natively on Android, offering local AI execution, natural language scheduling, and deep system access without relying on cloud infrastructure."
        features={[
          { name: 'Workflow Automation', operit: true, competitor: true },
          { name: 'Scheduled Jobs', operit: true, competitor: true },
          { name: 'Native Android App', operit: true, competitor: false },
          { name: 'Natural Language Configuration', operit: true, competitor: false },
          { name: 'Full Terminal Access', operit: true, competitor: false },
          { name: 'Local Execution', operit: true, competitor: false },
          { name: 'LLM Agent Capabilities', operit: true, competitor: true },
          { name: 'Open Source', operit: true, competitor: false },
          { name: '500+ Integrations', operit: false, competitor: true },
          { name: 'Visual Node Editor', operit: false, competitor: true }
        ]}
      />
    </div>
  )
}