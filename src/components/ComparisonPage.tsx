
// No external dependencies
// Helmet removed for build compatibility

interface Feature {
  name: string
  operit: boolean
  competitor: boolean
}

interface ComparisonPageProps {
  competitorName: string
  competitorSlug: string
  pageTitle: string
  lastUpdated: string
  verdict: string
  features: Feature[]
}

export function ComparisonPage({
  competitorName,
  pageTitle,
  features,
  verdict,
  lastUpdated
}: ComparisonPageProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Helmet removed for build compatibility */}

      <header className="mb-10">
        <h1 className="text-4xl font-display font-bold mb-4">{pageTitle}</h1>
        <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
      </header>

      <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-6 mb-10">
        <h3 className="font-semibold mb-2">Quick Verdict</h3>
        <p className="text-lg">{verdict}</p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Feature Comparison</h2>

      <div className="overflow-x-auto mb-12">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-900">
              <th className="text-left p-4 border-b">Feature</th>
              <th className="text-center p-4 border-b">Operit AI</th>
              <th className="text-center p-4 border-b">{competitorName}</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feat, i) => (
              <tr key={i} className="border-b border-zinc-200 dark:border-zinc-800">
                <td className="p-4">{feat.name}</td>
                <td className="p-4 text-center">{feat.operit ? '✅' : '❌'}</td>
                <td className="p-4 text-center">{feat.competitor ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center py-10 border-t border-gray-200">
        <h3 className="text-xl font-bold mb-4">Try Operit AI For Free</h3>
        <a href="/download" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Download App
        </a>
      </div>

      <footer className="mt-12 pt-6 border-t text-gray-500 text-sm">
        <p>Disclosure: This is an independent comparison. We strive to keep information accurate but always verify features on official product pages.</p>
      </footer>
    </div>
  )
}
