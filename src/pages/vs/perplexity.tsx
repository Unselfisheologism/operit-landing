import { ComparisonPage } from '../../components/ComparisonPage'

export default function PerplexityComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="perplexity"
        competitorName="Perplexity"
        pageTitle="Operit AI vs Perplexity Mobile: Full Comparison (2026)"
        lastUpdated="April 22, 2026"
        verdict="Perplexity excels at web-powered answers, yet it's a cloud service without offline mode or Android integration. Operit AI works entirely on your device, keeping your data private and your automation local."
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
          { name: 'File system access', operit: true, competitor: false },
          { name: 'Free tier available', operit: true, competitor: true },
          { name: 'Open source', operit: true, competitor: false }
        ]}
      />
    </div>
  )
}