import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languages, changeLanguage } from '../i18n';

// Globe icon SVG
const GlobeIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// Chevron icon SVG
const ChevronIcon = ({ up }: { up?: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={{ 
      transform: up ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 200ms ease'
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface LanguageSwitcherProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function LanguageSwitcher({ variant = 'default', className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentLangCode = i18n.language?.split('-')[0] || 'en';
  const currentLang = languages.find(l => l.code === currentLangCode) || languages[0];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);
  
  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };
  
  if (variant === 'minimal') {
    return (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded-md transition-colors ${className}`}
        style={{
          color: 'var(--text-secondary)',
        }}
        aria-label="Change language"
      >
        <GlobeIcon />
        <span>{currentLang.flag}</span>
      </button>
    );
  }
  
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
        style={{
          backgroundColor: 'transparent',
          color: 'inherit',
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <GlobeIcon />
        <span className="hidden sm:inline">{currentLang.nativeName}</span>
        <span>{currentLang.flag}</span>
        <ChevronIcon up={isOpen} />
      </button>
      
      {/* Dropdown */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-64 max-h-96 overflow-y-auto rounded-xl shadow-2xl z-[100]"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
          }}
          role="listbox"
          aria-label="Language options"
        >
          {/* Header */}
          <div 
            className="px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            Select Language
          </div>
          
          {/* Language List */}
          <div className="py-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  lang.code === currentLangCode ? 'bg-blue-500/10' : ''
                }`}
                role="option"
                aria-selected={lang.code === currentLangCode}
                style={{
                  color: 'var(--text)',
                }}
                onMouseEnter={(e) => {
                  if (lang.code !== currentLangCode) {
                    e.currentTarget.style.backgroundColor = 'var(--hover-bg)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (lang.code !== currentLangCode) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-xs opacity-60">{lang.name}</div>
                </div>
                {lang.code === currentLangCode && (
                  <span className="text-blue-500 text-lg">✓</span>
                )}
                {lang.dir === 'rtl' && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-700/50">RTL</span>
                )}
              </button>
            ))}
          </div>
          
          {/* Footer */}
          <div 
            className="px-4 py-2 text-xs border-t"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            Translations help us reach more users worldwide
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile-friendly bottom sheet version
export function LanguageSwitcherBottomSheet() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLangCode = i18n.language?.split('-')[0] || 'en';
  const currentLang = languages.find(l => l.code === currentLangCode) || languages[0];
  
  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };
  
  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-3 text-sm font-medium w-full"
        style={{ color: 'var(--text)' }}
      >
        <GlobeIcon />
        <span>Language</span>
        <span className="ml-auto">{currentLang.flag} {currentLang.nativeName}</span>
      </button>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl"
            style={{ backgroundColor: 'var(--bg)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-lg font-semibold">Select Language</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
              >
                ✕
              </button>
            </div>
            
            {/* Language Grid */}
            <div className="grid grid-cols-2 gap-2 p-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    lang.code === currentLangCode ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text)',
                  }}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="text-left">
                    <div className="font-medium text-sm">{lang.nativeName}</div>
                    <div className="text-xs opacity-60">{lang.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LanguageSwitcher;