import { ComparisonPage } from '../../components/ComparisonPage'

export default function GeminiComparisonPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <ComparisonPage
        competitorSlug="gemini"
        competitorName="Gemini"
        pageTitle="Operit AI vs Gemini App: Feature Comparison 2026"
        lastUpdated="April 22, 2026"
        verdict="Gemini offers deep Google integration and voice capabilities, but it's limited to cloud usage and doesn't support local inference or Android system automation. Operit AI gives you full control on your device with a built-in terminal and offline operation."
        features={[
          { name: 'Built-in Ubuntu 24 Terminal', operit: true, competitor: false },
          { name: 'Local GGUF model inference', operit: true, competitor: false },
          { name: 'MCP / Skill plugin ecosystem', operit: true, competitor: false },
          { name: 'Android UI automation', operit: true, competitor: false },
          { name: 'Persistent memory system', operit: true, competitor: false },
          { name: 'Voice wake word', operit: true, competitor: true },
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