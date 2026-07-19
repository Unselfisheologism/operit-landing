// Hreflang SEO Component
// Renders hreflang tags into document.head for multilingual SEO with country-specific targeting
// Uses direct DOM manipulation (not React children) to ensure tags land in <head>
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// All SEO variants: short URL code → hreflang + og:locale
const allSeoVariants = [
  { short: "en",   hreflang: "en-US", locale: "en_US" },
  { short: "zh",   hreflang: "zh-CN", locale: "zh_CN" },
  { short: "zh-TW",hreflang: "zh-TW", locale: "zh_TW" },
  { short: "hi",   hreflang: "hi-IN", locale: "hi_IN" },
  { short: "es",   hreflang: "es-ES", locale: "es_ES" },
  { short: "es-419",hreflang:"es-419",locale: "es_MX" },
  { short: "es-AR",hreflang: "es-AR", locale: "es_AR" },
  { short: "es-CO",hreflang: "es-CO", locale: "es_CO" },
  { short: "pt",   hreflang: "pt-PT", locale: "pt_PT" },
  { short: "pt-BR",hreflang: "pt-BR", locale: "pt_BR" },
  { short: "fr",   hreflang: "fr-FR", locale: "fr_FR" },
  { short: "fr-CA",hreflang: "fr-CA", locale: "fr_CA" },
  { short: "ja",   hreflang: "ja-JP", locale: "ja_JP" },
  { short: "ko",   hreflang: "ko-KR", locale: "ko_KR" },
  { short: "de",   hreflang: "de-DE", locale: "de_DE" },
  { short: "de-AT",hreflang: "de-AT", locale: "de_AT" },
  { short: "de-CH",hreflang: "de-CH", locale: "de_CH" },
  { short: "it",   hreflang: "it-IT", locale: "it_IT" },
  { short: "tr",   hreflang: "tr-TR", locale: "tr_TR" },
  { short: "id",   hreflang: "id-ID", locale: "id_ID" },
  { short: "vi",   hreflang: "vi-VN", locale: "vi_VN" },
  { short: "ar",   hreflang: "ar-SA", locale: "ar_SA" },
  { short: "ar-AE",hreflang: "ar-AE", locale: "ar_AE" },
  { short: "ar-EG",hreflang: "ar-EG", locale: "ar_EG" },
  { short: "ru",   hreflang: "ru-RU", locale: "ru_RU" },
  { short: "pl",   hreflang: "pl-PL", locale: "pl_PL" },
  { short: "nl",   hreflang: "nl-NL", locale: "nl_NL" },
  { short: "nl-BE",hreflang: "nl-BE", locale: "nl_BE" },
];

export function HreflangTags({ currentPath }: { currentPath: string }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const baseUrl = `${window.location.protocol}//${window.location.host}`;

    // Remove any existing dynamic hreflang links (added by this component)
    document
      .querySelectorAll('link[data-hreflang-dynamic]')
      .forEach((el) => el.remove());

    // Build variant URLs by swapping/prepending language prefix
    const supportedShortCodes = allSeoVariants.map((v) => v.short);
    const pathParts = currentPath.split("/").filter(Boolean);
    const firstPart = pathParts[0];
    const isLangPrefixed = supportedShortCodes.includes(firstPart);

    const hreflangLinks: { hreflang: string; href: string }[] = [];

    // x-default: points to the URL without language prefix (English default)
    hreflangLinks.push({
      hreflang: "x-default",
      href: `${baseUrl}${currentPath}`,
    });

    // All SEO variants
    allSeoVariants.forEach((variant) => {
      let urlPath: string;

      if (variant.short === "en") {
        // English uses root path — no /en/ prefix
        urlPath = isLangPrefixed && pathParts.length > 1
          ? "/" + pathParts.slice(1).join("/")
          : currentPath;
      } else if (isLangPrefixed && pathParts.length > 0) {
        // Replace existing language prefix
        urlPath = "/" + [variant.short, ...pathParts.slice(1)].join("/");
      } else if (!isLangPrefixed) {
        // Prepend language prefix
        urlPath = "/" + [variant.short, ...pathParts].join("/");
      } else {
        return; // already handled
      }

      hreflangLinks.push({
        hreflang: variant.hreflang,
        href: `${baseUrl}${urlPath}`,
      });
    });

    // Inject each hreflang link into <head>
    hreflangLinks.forEach(({ hreflang, href }) => {
      // Skip if static hreflang already in HTML (to avoid duplicates)
      const existingStatic = document.querySelector(
        `link[rel="alternate"][hreflang="${hreflang}"]:not([data-hreflang-dynamic])`
      );
      if (existingStatic) return;

      // Skip if we already injected this one
      const existing = document.querySelector(
        `link[data-hreflang-dynamic][hreflang="${hreflang}"]`
      );
      if (existing) return;

      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", hreflang);
      link.setAttribute("href", href);
      link.setAttribute("data-hreflang-dynamic", "true");
      document.head.appendChild(link);
    });

    // Update og:locale to match current language
    const currentShort = i18n.language?.split("-")[0] || "en";
    const variant = allSeoVariants.find((v) => v.short === currentShort);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale && variant) {
      ogLocale.setAttribute("content", variant.locale);
    }
  }, [currentPath, i18n.language]);

  // Renders nothing visible — tags go into document.head via useEffect
  return null;
}

// Get the og:locale for a given short language code
export function getOgLocale(shortCode: string): string {
  const variant = allSeoVariants.find((v) => v.short === shortCode);
  return variant?.locale || "en_US";
}

// JSON-LD structured data for multilingual page
export function MultilingualSchema({
  pagePath,
  pageTitle,
  shortCode = "en",
}: {
  pagePath: string;
  pageTitle: string;
  shortCode?: string;
}) {
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "https://twent.xyz";

  const locale = getOgLocale(shortCode);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    url: `${baseUrl}${pagePath}`,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: "Twent AI",
      url: "https://twent.xyz",
    },
    potentialAction: {
      "@type": "SearchAction",
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

// Generate sitemap entries for all language variants of given paths
export function generateSitemapUrls(baseUrls: string[]) {
  const sitemapUrls: {
    loc: string;
    languages: { hreflang: string; href: string }[];
  }[] = [];

  const supportedShortCodes = allSeoVariants.map((v) => v.short);

  allSeoVariants.forEach((variant) => {
    baseUrls.forEach((basePath) => {
      const pathParts = basePath.split("/").filter(Boolean);
      const isLangPrefixed = supportedShortCodes.includes(pathParts[0]);

      let fullParts: string[];
      if (isLangPrefixed && pathParts.length > 0) {
        fullParts = [variant.short, ...pathParts.slice(1)];
      } else {
        fullParts = [variant.short, ...pathParts];
      }

      const fullPath = "/" + fullParts.join("/");

      sitemapUrls.push({
        loc: `https://twent.xyz${fullPath}`,
        languages: [
          {
            hreflang: variant.hreflang,
            href: `https://twent.xyz${fullPath}`,
          },
        ],
      });
    });
  });

  return sitemapUrls;
}

export default HreflangTags;
