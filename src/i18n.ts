// i18n configuration for Twent Landing Page
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import { en } from './locales/en';
import { zh } from './locales/zh';
import { hi } from './locales/hi';
import { es } from './locales/es';
import { pt } from './locales/pt';
import { fr } from './locales/fr';
import { ja } from './locales/ja';
import { ko } from './locales/ko';
import { de } from './locales/de';
import { it } from './locales/it';
import { tr } from './locales/tr';
import { id } from './locales/id';
import { vi } from './locales/vi';
import { ar } from './locales/ar';
import { ru } from './locales/ru';
import { pl } from './locales/pl';
import { nl } from './locales/nl';

// Language configurations with native names and flags
// Regional variants inherit from base locale translations
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English', dir: 'ltr' },
  { code: 'zh', name: 'Chinese (Simplified)', flag: '🇨🇳', nativeName: '中文', dir: 'ltr' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', flag: '🇹🇼', nativeName: '繁體中文', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी', dir: 'ltr' },
  { code: 'es', name: 'Spanish (Spain)', flag: '🇪🇸', nativeName: 'Español', dir: 'ltr' },
  { code: 'es-419', name: 'Spanish (Mexico)', flag: '🇲🇽', nativeName: 'Español (MX)', dir: 'ltr' },
  { code: 'es-AR', name: 'Spanish (Argentina)', flag: '🇦🇷', nativeName: 'Español (AR)', dir: 'ltr' },
  { code: 'es-CO', name: 'Spanish (Colombia)', flag: '🇨🇴', nativeName: 'Español (CO)', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese (Portugal)', flag: '🇵🇹', nativeName: 'Português', dir: 'ltr' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', flag: '🇧🇷', nativeName: 'Português (BR)', dir: 'ltr' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français', dir: 'ltr' },
  { code: 'fr-CA', name: 'French (Canada)', flag: '🇨🇦', nativeName: 'Français (CA)', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語', dir: 'ltr' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어', dir: 'ltr' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'de-AT', name: 'German (Austria)', flag: '🇦🇹', nativeName: 'Deutsch (AT)', dir: 'ltr' },
  { code: 'de-CH', name: 'German (Swiss)', flag: '🇨🇭', nativeName: 'Deutsch (CH)', dir: 'ltr' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano', dir: 'ltr' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe', dir: 'ltr' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', nativeName: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt', dir: 'ltr' },
  { code: 'ar', name: 'Arabic (Saudi)', flag: '🇸🇦', nativeName: 'العربية', dir: 'rtl' },
  { code: 'ar-AE', name: 'Arabic (UAE)', flag: '🇦🇪', nativeName: 'العربية (الإمارات)', dir: 'rtl' },
  { code: 'ar-EG', name: 'Arabic (Egypt)', flag: '🇪🇬', nativeName: 'العربية (مصر)', dir: 'rtl' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский', dir: 'ltr' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱', nativeName: 'Polski', dir: 'ltr' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', nativeName: 'Nederlands', dir: 'ltr' },
  { code: 'nl-BE', name: 'Dutch (Belgium)', flag: '🇧🇪', nativeName: 'Nederlands (BE)', dir: 'ltr' },
];

// SEO Language codes with region (for hreflang tags)
// Country-specific targeting for local SEO
export const seoLanguages = [
  { code: 'en-US', hreflang: 'en', name: 'English (US)', country: 'US' },
  { code: 'zh-CN', hreflang: 'zh-CN', name: 'Chinese Simplified', country: 'CN' },
  { code: 'zh-TW', hreflang: 'zh-TW', name: 'Chinese Traditional', country: 'TW' },
  { code: 'hi-IN', hreflang: 'hi-IN', name: 'Hindi', country: 'IN' },
  { code: 'es-ES', hreflang: 'es-ES', name: 'Spanish (Spain)', country: 'ES' },
  { code: 'es-MX', hreflang: 'es-419', name: 'Spanish (Latin America)', country: 'MX' },
  { code: 'es-AR', hreflang: 'es-AR', name: 'Spanish (Argentina)', country: 'AR' },
  { code: 'es-CO', hreflang: 'es-CO', name: 'Spanish (Colombia)', country: 'CO' },
  { code: 'pt-BR', hreflang: 'pt-BR', name: 'Portuguese (Brazil)', country: 'BR' },
  { code: 'pt-PT', hreflang: 'pt-PT', name: 'Portuguese (Portugal)', country: 'PT' },
  { code: 'fr-FR', hreflang: 'fr-FR', name: 'French', country: 'FR' },
  { code: 'fr-CA', hreflang: 'fr-CA', name: 'French (Canada)', country: 'CA' },
  { code: 'ja-JP', hreflang: 'ja-JP', name: 'Japanese', country: 'JP' },
  { code: 'ko-KR', hreflang: 'ko-KR', name: 'Korean', country: 'KR' },
  { code: 'de-DE', hreflang: 'de-DE', name: 'German', country: 'DE' },
  { code: 'de-AT', hreflang: 'de-AT', name: 'German (Austria)', country: 'AT' },
  { code: 'de-CH', hreflang: 'de-CH', name: 'German (Switzerland)', country: 'CH' },
  { code: 'it-IT', hreflang: 'it-IT', name: 'Italian', country: 'IT' },
  { code: 'tr-TR', hreflang: 'tr-TR', name: 'Turkish', country: 'TR' },
  { code: 'id-ID', hreflang: 'id-ID', name: 'Indonesian', country: 'ID' },
  { code: 'vi-VN', hreflang: 'vi-VN', name: 'Vietnamese', country: 'VN' },
  { code: 'ar-SA', hreflang: 'ar-SA', name: 'Arabic (Saudi)', country: 'SA' },
  { code: 'ar-AE', hreflang: 'ar-AE', name: 'Arabic (UAE)', country: 'AE' },
  { code: 'ar-EG', hreflang: 'ar-EG', name: 'Arabic (Egypt)', country: 'EG' },
  { code: 'ru-RU', hreflang: 'ru-RU', name: 'Russian', country: 'RU' },
  { code: 'pl-PL', hreflang: 'pl-PL', name: 'Polish', country: 'PL' },
  { code: 'nl-NL', hreflang: 'nl-NL', name: 'Dutch', country: 'NL' },
  { code: 'nl-BE', hreflang: 'nl-BE', name: 'Dutch (Belgium)', country: 'BE' },
];

// Detect browser language and check if supported
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const browserLang = navigator.language.split('-')[0];
    const supported = languages.map(l => l.code);
    
    // Check exact match first
    if (supported.includes(browserLang)) {
      return browserLang;
    }
    
    // Check language with region (e.g., pt-BR -> pt)
    const browserLangWithRegion = navigator.language;
    const langCode = browserLangWithRegion.split('-')[0];
    if (supported.includes(langCode)) {
      return langCode;
    }
  }
  return 'en';
};

// Get text direction for a language
export const getDirection = (langCode: string) => {
  const lang = languages.find(l => l.code === langCode);
  return lang?.dir || 'ltr';
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      hi: { translation: hi },
      es: { translation: es },
      pt: { translation: pt },
      fr: { translation: fr },
      ja: { translation: ja },
      ko: { translation: ko },
      de: { translation: de },
      it: { translation: it },
      tr: { translation: tr },
      id: { translation: id },
      vi: { translation: vi },
      ar: { translation: ar },
      ru: { translation: ru },
      pl: { translation: pl },
      nl: { translation: nl },
    },
    fallbackLng: 'en',
    lng: getInitialLanguage(),
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
      lookupLocalStorage: 'twent-language',
      lookupFromPathIndex: 0,
    },
    react: {
      useSuspense: false,
    },
  });

// Helper to change language and update URL
export const changeLanguage = (langCode: string, navigate?: (path: string) => void) => {
  // Save to localStorage
  localStorage.setItem('twent-language', langCode);
  
  // Update i18n
  i18n.changeLanguage(langCode);
  
  // Update document direction for RTL languages
  if (typeof document !== 'undefined') {
    document.documentElement.dir = getDirection(langCode);
    document.documentElement.lang = langCode;
  }
  
  // Update URL with language prefix
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Check if first part is a language code
    const isLangPrefixed = languages.some(l => l.code === pathParts[0]);
    
    if (navigate) {
      // Use provided navigate function
      if (isLangPrefixed) {
        pathParts[0] = langCode;
      } else {
        pathParts.unshift(langCode);
      }
      const newPath = '/' + pathParts.join('/');
      navigate(newPath);
    } else {
      // Auto-update URL via history API when no navigate provided
      if (isLangPrefixed) {
        pathParts[0] = langCode;
      } else {
        pathParts.unshift(langCode);
      }
      const newPath = '/' + pathParts.join('/');
      window.history.pushState({}, '', newPath);
    }
  }
};

// Get current language object
export const getCurrentLanguage = () => {
  const code = i18n.language?.split('-')[0] || 'en';
  return languages.find(l => l.code === code) || languages[0];
};

export default i18n;