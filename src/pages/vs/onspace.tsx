import { ComparisonPage } from '../../components/ComparisonPage'

export default function OnspaceComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="onspace"
        competitorName="Onspace"
        pageTitle="Operit AI vs Onspace: Workspace Comparison 2026"
        lastUpdated="April 22, 2026"
        verdict="Onspace is an AI‑powered workspace for team collaboration. Operit AI is built for power users who need a full terminal, local AI inference, and deep Android automation—all without cloud dependency."
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