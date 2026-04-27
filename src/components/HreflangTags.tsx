// Hreflang SEO Component
// Renders hreflang tags for multilingual SEO with country-specific targeting
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface HreflangTagsProps {
  currentPath: string;
}

// All SEO variants: each maps to a short URL code + hreflang
const allSeoVariants = [
  { short: 'en', hreflang: 'en-US', locale: 'en_US' },
  { short: 'zh', hreflang: 'zh-CN', locale: 'zh_CN' },
  { short: 'zh-TW', hreflang: 'zh-TW', locale: 'zh_TW' },
  { short: 'hi', hreflang: 'hi-IN', locale: 'hi_IN' },
  { short: 'es', hreflang: 'es-ES', locale: 'es_ES' },
  { short: 'es-419', hreflang: 'es-419', locale: 'es_MX' },
  { short: 'es-AR', hreflang: 'es-AR', locale: 'es_AR' },
  { short: 'es-CO', hreflang: 'es-CO', locale: 'es_CO' },
  { short: 'pt', hreflang: 'pt-PT', locale: 'pt_PT' },
  { short: 'pt-BR', hreflang: 'pt-BR', locale: 'pt_BR' },
  { short: 'fr', hreflang: 'fr-FR', locale: 'fr_FR' },
  { short: 'fr-CA', hreflang: 'fr-CA', locale: 'fr_CA' },
  { short: 'ja', hreflang: 'ja-JP', locale: 'ja_JP' },
  { short: 'ko', hreflang: 'ko-KR', locale: 'ko_KR' },
  { short: 'de', hreflang: 'de-DE', locale: 'de_DE' },
  { short: 'de-AT', hreflang: 'de-AT', locale: 'de_AT' },
  { short: 'de-CH', hreflang: 'de-CH', locale: 'de_CH' },
  { short: 'it', hreflang: 'it-IT', locale: 'it_IT' },
  { short: 'tr', hreflang: 'tr-TR', locale: 'tr_TR' },
  { short: 'id', hreflang: 'id-ID', locale: 'id_ID' },
  { short: 'vi', hreflang: 'vi-VN', locale: 'vi_VN' },
  { short: 'ar', hreflang: 'ar-SA', locale: 'ar_SA' },
  { short: 'ar-AE', hreflang: 'ar-AE', locale: 'ar_AE' },
  { short: 'ar-EG', hreflang: 'ar-EG', locale: 'ar_EG' },
  { short: 'ru', hreflang: 'ru-RU', locale: 'ru_RU' },
  { short: 'pl', hreflang: 'pl-PL', locale: 'pl_PL' },
  { short: 'nl', hreflang: 'nl-NL', locale: 'nl_NL' },
  { short: 'nl-BE', hreflang: 'nl-BE', locale: 'nl_BE' },
];

export function HreflangTags({ currentPath }: HreflangTagsProps) {
  const { i18n } = useTranslation();
  const [tags, setTags] = useState<{ hreflang: string; href: string }[]>([]);

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : 'https://twent.ai';

  useEffect(() => {
    const newTags: { hreflang: string; href: string }[] = [];

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    // x-default: points to the URL without language prefix (English default)
    newTags.push({
      hreflang: 'x-default',
      href: `${baseUrl}${currentPath}`,
    });

    // Add all SEO variants
    allSeoVariants.forEach(variant => {
      const pathParts = currentPath.split('/').filter(Boolean);

      // Detect if URL already has a language prefix
      const firstPart = pathParts[0];
      const supportedShortCodes = allSeoVariants.map(v => v.short);
      const isLangPrefixed = supportedShortCodes.includes(firstPart);

      // Replace or add the short code in URL (not the hreflang)
      if (isLangPrefixed && pathParts.length > 0) {
        pathParts[0] = variant.short;
      } else if (!isLangPrefixed) {
        pathParts.unshift(variant.short);
      }

      const urlPath = '/' + pathParts.join('/');

      newTags.push({
        hreflang: variant.hreflang,
        href: `${baseUrl}${urlPath}`,
      });
    });

    setTags(newTags);
  }, [currentPath, i18n.language]);

  return (
    <>
      {tags.map((tag) => (
        <link
          key={tag.hreflang}
          rel="alternate"
          hrefLang={tag.hreflang}
          href={tag.href}
        />
      ))}
      <link
        rel="canonical"
        href={`${baseUrl}${currentPath}`}
      />
    </>
  );
}

// Get the og:locale for the current language
export function getOgLocale(shortCode: string): string {
  const variant = allSeoVariants.find(v => v.short === shortCode);
  return variant?.locale || 'en_US';
}

// JSON-LD structured data for multilingual content
export function MultilingualSchema({ pagePath, pageTitle, shortCode = 'en' }: { pagePath: string; pageTitle: string; shortCode?: string }) {
  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : 'https://twent.ai';

  const locale = getOgLocale(shortCode);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    url: `${baseUrl}${pagePath}`,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: 'Twent AI',
      url: 'https://twent.ai',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Generate sitemap entries for all languages
export function generateSitemapUrls(baseUrls: string[]) {
  const sitemapUrls: { loc: string; languages: { hreflang: string; href: string }[] }[] = [];

  allSeoVariants.forEach(variant => {
    baseUrls.forEach(basePath => {
      const pathParts = basePath.split('/').filter(Boolean);
      const supportedShortCodes = allSeoVariants.map(v => v.short);
      const isLangPrefixed = supportedShortCodes.includes(pathParts[0]);

      if (isLangPrefixed && pathParts.length > 0) {
        pathParts[0] = variant.short;
      } else if (!isLangPrefixed) {
        pathParts.unshift(variant.short);
      }

      const fullPath = '/' + pathParts.join('/');

      sitemapUrls.push({
        loc: `https://twent.ai${fullPath}`,
        languages: [{
          hreflang: variant.hreflang,
          href: `https://twent.ai${fullPath}`,
        }],
      });
    });
  });

  return sitemapUrls;
}

export default HreflangTags;
