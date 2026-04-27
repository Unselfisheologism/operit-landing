import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Nav } from "./components/Nav";
import { HeroSection } from "./components/HeroSection";
import { Part1What, Part2ForDevs, Part3ForEveryone } from "./components/StoryParts123";
import {
  Part4UnderTheHood,
  Part5UIAutomation,
  Part6DX,
  Part7EndUser,
  Part8Marketplace,
} from "./components/StoryParts4to8";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { FinalCTA } from "./components/FinalCTA";
import { Footer } from "./components/Footer";
import { DocsPage } from "./components/DocsPage";
import { PricingPage } from "./components/PricingPage";
import { BlogPage } from "./components/BlogPage";
import { ChangelogPage } from "./components/ChangelogPage";
import { TermsOfService } from "./components/TermsOfService";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { MarketplaceBlogPost } from "./components/MarketplaceBlogPost";
import { AiAgentForDevelopers } from "./components/AiAgentForDevelopers";
import { AndroidAutomationPowerUser } from "./components/AndroidAutomationPowerUser";
import { PrivacyFirstAiAndroid } from "./components/PrivacyFirstAiAndroid";
import { TerminalOnAndroid } from "./components/TerminalOnAndroid";
import { AiMarketplaceCreators } from "./components/AiMarketplaceCreators";
import { EnterpriseAiAgent } from "./components/EnterpriseAiAgent";
import { SimplifiedLandingPage } from "./components/SimplifiedLandingPage";
import { ImmersiveLandingPage } from "./components/ImmersiveLandingPage";
import { HreflangTags } from "./components/HreflangTags";
import { MetaUpdater } from "./components/MetaUpdater";

// Competitor comparison pages
import ChatgptComparisonPage from "./pages/vs/chatgpt";
import NebulaComparisonPage from "./pages/vs/nebula";
import OpenclawComparisonPage from "./pages/vs/openclaw";
import HermesAgentComparisonPage from "./pages/vs/hermes-agent";
import N8nComparisonPage from "./pages/vs/n8n";
import AnythingLlmComparisonPage from "./pages/vs/anything-llm";
import ReplikaComparisonPage from "./pages/vs/replika";
import CopilotComparisonPage from "./pages/vs/copilot";
import GeminiComparisonPage from "./pages/vs/gemini";
import ClaudeComparisonPage from "./pages/vs/claude";
import PerplexityComparisonPage from "./pages/vs/perplexity";
import MakeComparisonPage from "./pages/vs/make";
import ZapierComparisonPage from "./pages/vs/zapier";
import QordinateComparisonPage from "./pages/vs/qordinate";
import OmnaraComparisonPage from "./pages/vs/omnara";
import ManusComparisonPage from "./pages/vs/manus";
import OnspaceComparisonPage from "./pages/vs/onspace";
import SoundhoundComparisonPage from "./pages/vs/soundhound";
import { NotFoundPage } from "./components/NotFoundPage";

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

function LandingPage({ dark, toggle }: { dark: boolean; toggle: () => void }) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased">
      <Nav dark={dark} onToggle={toggle} />
      <main>
        <HeroSection />
        <div className="section-divider max-w-6xl mx-auto" />
        <Part1What />
        <div className="section-divider max-w-6xl mx-auto" />
        <Part2ForDevs />
        <div className="section-divider max-w-6xl mx-auto" />
        <Part3ForEveryone />
        <div className="section-divider max-w-6xl mx-auto" />
        <Part4UnderTheHood />
        <Part5UIAutomation />
        <div className="section-divider max-w-6xl mx-auto" />
        <Part6DX />
        <div className="section-divider max-w-6xl mx-auto" />
        <Part7EndUser />
        <div className="section-divider max-w-6xl mx-auto" />
        <Part8Marketplace />
        <div className="section-divider max-w-6xl mx-auto" />
        <Testimonials />
        <div className="section-divider max-w-6xl mx-auto" />
        <Pricing />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
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
        <DocsPage dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath.startsWith("/ai-agent-for-developers")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <AiAgentForDevelopers dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath.startsWith("/android-automation-power-user")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <AndroidAutomationPowerUser dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath.startsWith("/privacy-first-ai-android")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <PrivacyFirstAiAndroid dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath.startsWith("/terminal-on-android")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <TerminalOnAndroid dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath.startsWith("/ai-marketplace-creators")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <AiMarketplaceCreators dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath.startsWith("/enterprise-ai-agent")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <EnterpriseAiAgent dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath.startsWith("/blog/marketplace")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <MarketplaceBlogPost dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath.startsWith("/blog")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <BlogPage dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath.startsWith("/changelog")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ChangelogPage dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath === "/terms") {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <TermsOfService dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath === "/privacy") {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <PrivacyPolicy dark={dark} onToggle={toggle} />
      </>
    );
  }

  if (routePath.startsWith("/pricing")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <PricingPage />
      </>
    );
  }

  // Competitor comparison pages
  if (routePath.startsWith("/vs/chatgpt")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ChatgptComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/nebula")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <NebulaComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/openclaw")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <OpenclawComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/hermes-agent")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <HermesAgentComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/n8n")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <N8nComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/anything-llm")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <AnythingLlmComparisonPage />
      </>
    );
  }

  // Competitor comparison pages - /vs/ route (canonical)
  if (routePath.startsWith("/vs/replika")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ReplikaComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/copilot")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <CopilotComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/gemini")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <GeminiComparisonPage />
      </>
    );
  }

  // Additional competitor comparison pages
  if (routePath.startsWith("/vs/claude")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ClaudeComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/perplexity")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <PerplexityComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/make")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <MakeComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/zapier")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ZapierComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/qordinate")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <QordinateComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/omnara")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <OmnaraComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/manus")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ManusComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/onspace")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <OnspaceComparisonPage />
      </>
    );
  }
  if (routePath.startsWith("/vs/soundhound")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <SoundhoundComparisonPage />
      </>
    );
  }

  // Detailed landing page (old version with all features)
  if (routePath.startsWith("/details")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <LandingPage dark={dark} toggle={toggle} />
      </>
    );
  }

  // Simple landing page
  if (routePath.startsWith("/simple")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <SimplifiedLandingPage dark={dark} toggle={toggle} />
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
