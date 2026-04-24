import { ComparisonPage } from '../../components/ComparisonPage'

export default function ClaudeComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="claude"
        competitorName="Claude"
        pageTitle="Operit AI vs Claude Mobile: Which Is Better For Android?"
        lastUpdated="April 22, 2026"
        verdict="Claude is a powerful AI assistant with strong reasoning, but it's cloud-only and lacks Android integration. Operit AI brings a full terminal, local model support, and deep Android automation to your device."
        features={[
          { name: 'Built-in Ubuntu 24 Terminal', operit: true, competitor: false },
          { name: 'Local GGUF model inference', operit: true, competitor: false },
          { name: 'MCP / Skill plugin ecosystem', operit: true, competitor: false },
          { name: 'Android UI automation', operit: true, competitor: false },
          { name: 'Persistent memory system', operit: true, competitor: true },
          { name: 'Voice wake word', operit: true, competitor: true },
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