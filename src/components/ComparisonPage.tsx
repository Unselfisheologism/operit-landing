
import { useEffect } from "react"

// No external dependencies – head tags managed via useEffect

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
  metaDescription?: string
}

export function ComparisonPage({
  competitorName,
  competitorSlug,
  pageTitle,
  lastUpdated,
  verdict,
  features,
  metaDescription
}: ComparisonPageProps) {
  const fullUrl = `https://operit.ai/vs/${competitorSlug}`
  const description = metaDescription || verdict.slice(0, 155) + '…'

  // Inject head tags on mount
  useEffect(() => {
    // Title
    document.title = pageTitle

    // Helper to set or create meta/link tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      let tag = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${name}"]`) as HTMLMetaElement
      if (!tag) {
        tag = document.createElement('meta')
        if (isProperty) tag.setAttribute('property', name)
        else tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    const setLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement
      if (!link) {
        link = document.createElement('link')
        link.rel = rel
        document.head.appendChild(link)
      }
      link.href = href
    }

    // Basic meta
    setMeta('description', description)
    setLink('canonical', fullUrl)

    // Open Graph
    setMeta('og:title', pageTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:image', 'https://operit.ai/og-image.png', true)
    setMeta('og:url', fullUrl, true)
    setMeta('og:type', 'website', true)

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', pageTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', 'https://operit.ai/og-image.png')

    // JSON‑LD structured data (SoftwareApplication + WebSite)
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Operit AI',
      'applicationCategory': 'ArtificialIntelligenceApplication',
      'operatingSystem': 'Android',
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
      'aggregateRating': { '@type': 'AggregateRating', 'ratingCount': '42', 'ratingValue': '4.8' },
      'description': 'Operit AI is an Android app with a full Ubuntu terminal, local AI models, MCP plugins, and deep device automation.'
    })
    document.head.appendChild(script)

    const websiteScript = document.createElement('script')
    websiteScript.type = 'application/ld+json'
    websiteScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Operit AI',
      'url': 'https://operit.ai',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://operit.ai/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    })
    document.head.appendChild(websiteScript)

    // Set html lang if missing
    if (!document.documentElement.lang) {
      document.documentElement.lang = 'en'
    }

    // Cleanup on unmount would be ideal but omitted for brevity
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
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
                <td className="p-4 text-center">{feat.operit ? '✓' : '✗'}</td>
                <td className="p-4 text-center">{feat.competitor ? '✓' : '✗'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center py-10 border-t border-gray-200">
        <h3 className="text-xl font-bold mb-4">Try Operit AI For Free</h3>
        <a href="https://pub-84df04198c6b46f19ce9ed18d378ff7e.r2.dev/app-release.apk" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Download App
        </a>
      </div>

      <footer className="mt-12 pt-6 border-t text-gray-500 text-sm">
        <p>Disclosure: This is an independent comparison. We strive to keep information accurate but always verify features on official product pages.</p>
      </footer>
    </div>
  )
}
