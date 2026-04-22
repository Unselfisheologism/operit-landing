import { ComparisonPage } from '../../components/ComparisonPage'

export default function AnythingllmComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
      competitorSlug="anything-llm" competitorName="Anything LLM"
      pageTitle="Operit AI vs Anything LLM: Comparison 2026"

      lastUpdated="April 22, 2026"
      verdict="Anything LLM is the best open source RAG system for desktops/servers. Operit AI is built for Android, includes full terminal, automation, MCP plugins and device integration in addition to all the RAG capabilities of Anything LLM."
      features={[{name: 'Local Model Support', operit: true, competitor: true}, {name: 'RAG Knowledge Base', operit: true, competitor: true}, {name: 'Open Source', operit: true, competitor: true}, {name: 'Native Android App', operit: true, competitor: false}, {name: 'Full Ubuntu Terminal', operit: true, competitor: false}, {name: 'Android System Automation', operit: true, competitor: false}, {name: 'MCP Plugins', operit: true, competitor: false}, {name: 'Persistent Memory', operit: true, competitor: true}, {name: 'Offline Operation', operit: true, competitor: true}, {name: 'Floating Overlay', operit: true, competitor: false }]}
    />
    </div>
  )
}
