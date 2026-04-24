import { ComparisonPage } from '../../components/ComparisonPage'

export default function ZapierComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="zapier"
        competitorName="Zapier"
        pageTitle="Operit AI vs Zapier: Automation Comparison 2026"
        lastUpdated="April 22, 2026"
        verdict="Zapier connects thousands of apps with an easy visual builder, but it's a cloud-only service with no native Android automation or local control. Operit AI puts the power of AI and terminal automation directly on your device."
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