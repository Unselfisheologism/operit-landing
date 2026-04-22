import { ComparisonPage } from '../../components/ComparisonPage'

export default function AnythingllmComparisonPage() {
  return (
    <ComparisonPage
      competitorSlug="anything-llm" competitorName="Anything LLM"
      pageTitle="Operit AI vs Anything LLM: Comparison 2026"
      metaDescription="Compare Operit AI vs Anything LLM for Android. RAG, local models, privacy and AI assistant capabilities."
      lastUpdated="April 22, 2026"
      verdict="Anything LLM is the best open source RAG system for desktops/servers. Operit AI is built for Android, includes full terminal, automation, MCP plugins and device integration in addition to all the RAG capabilities of Anything LLM."
      features={[{name: 'Local Model Support', operit: true, competitor: true}, {name: 'RAG Knowledge Base', operit: true, competitor: true}, {name: 'Open Source', operit: true, competitor: true}, {name: 'Native Android App', operit: true, competitor: false}, {name: 'Full Ubuntu Terminal', operit: true, competitor: false}, {name: 'Android System Automation', operit: true, competitor: false}, {name: 'MCP Plugins', operit: true, competitor: false}, {name: 'Persistent Memory', operit: true, competitor: true}, {name: 'Offline Operation', operit: true, competitor: true}, {name: 'Floating Overlay', operit: true, competitor: false }]}
    />
  )
}
