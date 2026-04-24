import { ComparisonPage } from '../../components/ComparisonPage'

export default function ManusComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="manus"
        competitorName="Manus"
        pageTitle="Operit AI vs Manus: AI Agent Comparison 2026"
        lastUpdated="April 22, 2026"
        verdict="Manus is an autonomous AI agent capable of executing complex development tasks. Operit AI combines that level of autonomy with a full Android terminal, local model support, and deep system integration—all on your device."
        features={[
          { name: 'Built-in Ubuntu 24 Terminal', operit: true, competitor: false },
          { name: 'Local GGUF model inference', operit: true, competitor: false },
          { name: 'MCP / Skill plugin ecosystem', operit: true, competitor: false },
          { name: 'Android UI automation', operit: true, competitor: false },
          { name: 'Persistent memory system', operit: true, competitor: false },
          { name: 'Voice wake word', operit: true, competitor: false },
          { name: 'Floating bubble overlay', operit: true, competitor: false },
          { name: 'Character cards / personas', operit: true, competitor: false },
          { name: 'Parallel tool execution', operit: true, competitor: false },
          { name: 'ADB / Root integration', operit: true, competitor: false },
          { name: 'Offline operation', operit: true, competitor: false },
          { name: 'File system access', operit: true, competitor: true },
          { name: 'Free tier available', operit: true, competitor: true },
          { name: 'Open source', operit: true, competitor: false }
        ]}
      />
    </div>
  )
}