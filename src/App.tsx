import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ImmersiveLandingPage } from "./components/ImmersiveLandingPage";
import { HreflangTags } from "./components/HreflangTags";
import { MetaUpdater } from "./components/MetaUpdater";

// Competitor comparison pages — LAZY LOADED for code splitting
// This reduces main bundle size by ~40%, dramatically improving FCP/TTFB
import { lazy, Suspense } from "react";
import { NotFoundPage } from "./components/NotFoundPage";

const ChatgptComparisonPage = lazy(() => import("./pages/vs/chatgpt"));
const NebulaComparisonPage = lazy(() => import("./pages/vs/nebula"));
const OpenclawComparisonPage = lazy(() => import("./pages/vs/openclaw"));
const HermesAgentComparisonPage = lazy(() => import("./pages/vs/hermes-agent"));
const N8nComparisonPage = lazy(() => import("./pages/vs/n8n"));
const AnythingLlmComparisonPage = lazy(() => import("./pages/vs/anything-llm"));
const ReplikaComparisonPage = lazy(() => import("./pages/vs/replika"));
const CopilotComparisonPage = lazy(() => import("./pages/vs/copilot"));
const GeminiComparisonPage = lazy(() => import("./pages/vs/gemini"));
const ClaudeComparisonPage = lazy(() => import("./pages/vs/claude"));
const PerplexityComparisonPage = lazy(() => import("./pages/vs/perplexity"));
const MakeComparisonPage = lazy(() => import("./pages/vs/make"));
const ZapierComparisonPage = lazy(() => import("./pages/vs/zapier"));
const QordinateComparisonPage = lazy(() => import("./pages/vs/qordinate"));
const PageLoader = () => (
  <div className="min-h-screen bg-white dark:bg-[#09090b] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-zinc-200 dark:border-zinc-800 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-zinc-500 text-sm font-mono">Loading...</p>
    </div>
  </div>
);
const DocsPage = lazy(() => import(/* @vite-ignore */ "./components/DocsPage").then(m => ({ default: m.DocsPage })));
const PricingPage = lazy(() => import(/* @vite-ignore */ "./components/PricingPage").then(m => ({ default: m.PricingPage })));
const BlogPage = lazy(() => import(/* @vite-ignore */ "./components/BlogPage").then(m => ({ default: m.BlogPage })));
const ChangelogPage = lazy(() => import(/* @vite-ignore */ "./components/ChangelogPage").then(m => ({ default: m.ChangelogPage })));
const TermsOfService = lazy(() => import(/* @vite-ignore */ "./components/TermsOfService").then(m => ({ default: m.TermsOfService })));
const PrivacyPolicy = lazy(() => import(/* @vite-ignore */ "./components/PrivacyPolicy").then(m => ({ default: m.PrivacyPolicy })));
const MarketplaceBlogPost = lazy(() => import(/* @vite-ignore */ "./components/MarketplaceBlogPost").then(m => ({ default: m.MarketplaceBlogPost })));
const BestAiAppsAndroid = lazy(() => import(/* @vite-ignore */ "./components/BestAiAppsAndroid").then(m => ({ default: m.BestAiAppsAndroid })));
const AiAgentForDevelopers = lazy(() => import(/* @vite-ignore */ "./components/AiAgentForDevelopers").then(m => ({ default: m.AiAgentForDevelopers })));
const AndroidAutomationPowerUser = lazy(() => import(/* @vite-ignore */ "./components/AndroidAutomationPowerUser").then(m => ({ default: m.AndroidAutomationPowerUser })));
const PrivacyFirstAiAndroid = lazy(() => import(/* @vite-ignore */ "./components/PrivacyFirstAiAndroid").then(m => ({ default: m.PrivacyFirstAiAndroid })));
const TerminalOnAndroid = lazy(() => import(/* @vite-ignore */ "./components/TerminalOnAndroid").then(m => ({ default: m.TerminalOnAndroid })));
const AiMarketplaceCreators = lazy(() => import(/* @vite-ignore */ "./components/AiMarketplaceCreators").then(m => ({ default: m.AiMarketplaceCreators })));
const EnterpriseAiAgent = lazy(() => import(/* @vite-ignore */ "./components/EnterpriseAiAgent").then(m => ({ default: m.EnterpriseAiAgent })));
const OmnaraComparisonPage = lazy(() => import("./pages/vs/omnara"));
const ManusComparisonPage = lazy(() => import("./pages/vs/manus"));
const OnspaceComparisonPage = lazy(() => import("./pages/vs/onspace"));

import { languages, changeLanguage, getDirection } from "./i18n";

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("twent-theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("twent-theme", dark ? "dark" : "light");
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

// SPA navigation: intercept internal <a> clicks and use pushState
// Also handles language prefix in URL
function useSpaNavigation() {
  const { i18n } = useTranslation();
  const [path, setPath] = useState(() => {
    if (typeof window === "undefined") return "/";
    // Handle GitHub Pages 404.html redirect: ?path=%2Fdocs
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get("path");
    if (redirectPath) {
      // Clean the URL — remove ?path= param and restore the real path
      const clean = redirectPath + window.location.hash;
      window.history.replaceState({}, "", clean);
      return clean;
    }
    return window.location.pathname;
  });

  // Detect language from URL on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0) {
      const potentialLang = pathParts[0];
      const matchedLang = languages.find(l => l.code === potentialLang);
      
      if (matchedLang && matchedLang.code !== i18n.language) {
        changeLanguage(matchedLang.code);
      }
    }
  }, []);

  const navigate = useCallback((to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  // Update direction based on current language
  useEffect(() => {
    if (typeof document === "undefined") return;
    const dir = getDirection(i18n.language);
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const onPopState = () => {
      const newPath = window.location.pathname;
      setPath(newPath);
      
      // Check if language changed
      const pathParts = newPath.split('/').filter(Boolean);
      if (pathParts.length > 0) {
        const potentialLang = pathParts[0];
        const matchedLang = languages.find(l => l.code === potentialLang);
        if (matchedLang && matchedLang.code !== i18n.language) {
          changeLanguage(matchedLang.code);
        }
      }
    };
    window.addEventListener("popstate", onPopState);

    // Global click handler: intercept internal <a> links
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || a.target === "_blank") return;
      
      // Don't intercept static file links
      if (href.endsWith(".txt") || href.endsWith(".xml") || 
          href.endsWith(".json") || href.endsWith(".png") || 
          href.endsWith(".jpg") || href.endsWith(".svg")) {
        return;
      }

      // Don't intercept hash links — let the browser handle them natively
      if (href.startsWith("#")) {
        return;
      }
      
      // Internal link
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("click", onClick);
    };
  }, [navigate, i18n.language]);

  return { path, navigate };
}

export default function App() {
  const { dark, toggle } = useTheme();
  const { path } = useSpaNavigation();

  // Handle docs SEO files - let Vite serve static files from public/docs directory
  // Static files are served directly by Vite, so we don't need to handle them here
  if (path.startsWith("/docs") && 
      (path.endsWith(".txt") || path.endsWith(".xml") || 
       path.endsWith(".json") || path.endsWith(".png") || 
       path.endsWith(".jpg") || path.endsWith(".svg"))) {
    return null;
  }

  // Remove language prefix from path for routing
  const routePath = (() => {
    const parts = path.split('/').filter(Boolean);
    const firstPart = parts[0];
    const isLangPrefix = languages.some(l => l.code === firstPart);
    if (isLangPrefix) {
      return '/' + parts.slice(1).join('/');
    }
    return path;
  })();

  // Route based on routePath (without language prefix)
  if (routePath.startsWith("/docs")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><DocsPage dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath.startsWith("/ai-agent-for-developers")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><AiAgentForDevelopers dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath.startsWith("/android-automation-power-user")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><AndroidAutomationPowerUser dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath.startsWith("/privacy-first-ai-android")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><PrivacyFirstAiAndroid dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath.startsWith("/terminal-on-android")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><TerminalOnAndroid dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath.startsWith("/ai-marketplace-creators")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><AiMarketplaceCreators dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath.startsWith("/enterprise-ai-agent")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><EnterpriseAiAgent dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath.startsWith("/blog/marketplace")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><MarketplaceBlogPost dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath.startsWith("/blog/best-ai-apps-android")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><BestAiAppsAndroid dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath.startsWith("/blog")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><BlogPage dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath.startsWith("/changelog")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><ChangelogPage dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath === "/terms") {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><TermsOfService dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath === "/privacy") {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <Suspense fallback={<PageLoader />}><PrivacyPolicy dark={dark} onToggle={toggle} /></Suspense>
      </>
    );
  }

  if (routePath.startsWith("/pricing")) {
    return (
      <Suspense fallback={<PageLoader />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <PricingPage />
      </Suspense>
    );
  }

  // Competitor comparison pages
  if (routePath.startsWith("/vs/chatgpt")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ChatgptComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/nebula")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <NebulaComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/openclaw")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <OpenclawComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/hermes-agent")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <HermesAgentComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/n8n")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <N8nComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/anything-llm")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <AnythingLlmComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/replika")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ReplikaComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/copilot")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <CopilotComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/gemini")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <GeminiComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/claude")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ClaudeComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/perplexity")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <PerplexityComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/make")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <MakeComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/zapier")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ZapierComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/qordinate")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <QordinateComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/omnara")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <OmnaraComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/manus")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ManusComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/onspace")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <OnspaceComparisonPage />
      </Suspense>
    );
  }

  // Detailed landing page — canonicalized to / to prevent duplicate content
  if (routePath.startsWith("/details")) {
    return (
      <>
        <HreflangTags currentPath="/" />
        <MetaUpdater currentPath="/" canonicalPath="/" />
        <ImmersiveLandingPage dark={dark} toggle={toggle} />
      </>
    );
  }

  // Simple landing page — canonicalized to / to prevent duplicate content
  if (routePath.startsWith("/simple")) {
    return (
      <>
        <HreflangTags currentPath="/" />
        <MetaUpdater currentPath="/" canonicalPath="/" />
        <ImmersiveLandingPage dark={dark} toggle={toggle} />
      </>
    );
  }

  // Main immersive landing page
  if (routePath === "/" || routePath === "" || routePath === "/index.html") {
    return (
      <>
        <HreflangTags currentPath={routePath || '/'} />
        <MetaUpdater currentPath={routePath || '/'} />
        <ImmersiveLandingPage dark={dark} toggle={toggle} />
      </>
    );
  }

  // Catch-all 404 page for any other path
  return (
    <>
      <HreflangTags currentPath={routePath} />
      <MetaUpdater currentPath={routePath} />
      <NotFoundPage dark={dark} toggle={toggle} />
    </>
  );
}

// Minimal loading spinner for lazy-loaded chunks — prevents CLS during route transitions
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="w-8 h-8 border-2 border-zinc-300 dark:border-zinc-700 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}
