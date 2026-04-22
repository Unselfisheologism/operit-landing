import { useState, useEffect, useCallback } from "react";
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
import { MarketplaceBlogPost } from "./components/MarketplaceBlogPost";
import { AiAgentForDevelopers } from "./components/AiAgentForDevelopers";
import { AndroidAutomationPowerUser } from "./components/AndroidAutomationPowerUser";
import { PrivacyFirstAiAndroid } from "./components/PrivacyFirstAiAndroid";
import { TerminalOnAndroid } from "./components/TerminalOnAndroid";
import { AiMarketplaceCreators } from "./components/AiMarketplaceCreators";
import { EnterpriseAiAgent } from "./components/EnterpriseAiAgent";
import { SimplifiedLandingPage } from "./components/SimplifiedLandingPage";
import { ImmersiveLandingPage } from "./components/ImmersiveLandingPage";

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
function useSpaNavigation() {
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

  const navigate = useCallback((to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
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
  }, [navigate]);

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
    // This should not happen because static files are served directly by Vite
    // But if it does, let the browser handle it
    return null;
  }

  if (path.startsWith("/docs")) {
    return <DocsPage dark={dark} onToggle={toggle} />;
  }

  if (path.startsWith("/ai-agent-for-developers")) {
    return <AiAgentForDevelopers dark={dark} onToggle={toggle} />;
  }

  if (path.startsWith("/android-automation-power-user")) {
    return <AndroidAutomationPowerUser dark={dark} onToggle={toggle} />;
  }

  if (path.startsWith("/privacy-first-ai-android")) {
    return <PrivacyFirstAiAndroid dark={dark} onToggle={toggle} />;
  }

  if (path.startsWith("/terminal-on-android")) {
    return <TerminalOnAndroid dark={dark} onToggle={toggle} />;
  }

  if (path.startsWith("/ai-marketplace-creators")) {
    return <AiMarketplaceCreators dark={dark} onToggle={toggle} />;
  }

  if (path.startsWith("/enterprise-ai-agent")) {
    return <EnterpriseAiAgent dark={dark} onToggle={toggle} />;
  }

  if (path.startsWith("/blog/marketplace")) {
    return <MarketplaceBlogPost dark={dark} onToggle={toggle} />;
  }

  if (path.startsWith("/blog")) {
    return <BlogPage dark={dark} onToggle={toggle} />;
  }

  if (path.startsWith("/changelog")) {
    return <ChangelogPage dark={dark} onToggle={toggle} />;
  }

  if (path.startsWith("/pricing")) {
    return <PricingPage />;
  }

  // Detailed landing page (old version with all features)
  if (path.startsWith("/details")) {
    return <LandingPage dark={dark} toggle={toggle} />;
  }

  // Simple landing page
  if (path.startsWith("/simple")) {
    return <SimplifiedLandingPage dark={dark} toggle={toggle} />;
  }

  // Main immersive landing page
  return <ImmersiveLandingPage dark={dark} toggle={toggle} />;
}
