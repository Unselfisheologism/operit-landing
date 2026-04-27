// SEO Language Hook - Detects language from URL path
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { languages, changeLanguage, seoLanguages } from '../i18n';

export function useLanguageFromUrl() {
  const { i18n } = useTranslation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname;
    const pathParts = path.split('/').filter(Boolean);
    
    // Check if first path segment is a language code
    if (pathParts.length > 0) {
      const potentialLang = pathParts[0];
      const matchedLang = languages.find(l => l.code === potentialLang);
      
      if (matchedLang && matchedLang.code !== i18n.language) {
        changeLanguage(matchedLang.code);
      }
    }
    
    setIsInitialized(true);
  }, [i18n.language]);

  return { isInitialized };
}

// Generate hreflang tags for SEO
export function getHreflangTags(currentPath: string): { hreflang: string; href: string }[] {
  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : 'https://twent.ai';
  
  const tags: { hreflang: string; href: string }[] = [];
  
  // Add x-default
  tags.push({
    hreflang: 'x-default',
    href: `${baseUrl}${currentPath}`,
  });
  
  // Add all language versions
  seoLanguages.forEach(lang => {
    const langCode = lang.hreflang;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Replace or add language prefix
    const isLangPrefixed = languages.some(l => l.code === pathParts[0]);
    
    if (isLangPrefixed) {
      pathParts[0] = langCode;
    } else {
      pathParts.unshift(langCode);
    }
    
    tags.push({
      hreflang: langCode,
      href: `${baseUrl}/${pathParts.join('/')}`,
    });
  });
  
  return tags;
}

// Update document metadata for SEO
export function updateSEOMetadata(langCode: string, _pageTitle: string, pageDescription: string) {
  if (typeof document === 'undefined') return;
  
  // Update lang attribute
  document.documentElement.lang = langCode;
  
  // Update direction for RTL languages
  const lang = languages.find(l => l.code === langCode);
  document.documentElement.dir = lang?.dir || 'ltr';
  
  // Update meta tags
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', pageDescription);
  }
  
  // Update og:locale
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) {
    ogLocale.setAttribute('content', langCode);
  }
  
  // Update canonical and alternate links
  // This would be handled by the Hreflang component
}

export default useLanguageFromUrl;