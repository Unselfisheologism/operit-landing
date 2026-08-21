import { useState, useEffect, useCallback, lazy, Suspense, useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "./lib/AuthContext";
import { WiredSpinner } from "./components/ui/wired";
import { ImmersiveLandingPage } from "./components/ImmersiveLandingPage";
import { HreflangTags } from "./components/HreflangTags";
import { MetaUpdater } from "./components/MetaUpdater";

// Route pages — LAZY LOADED for code splitting. Only the home route (and the
// shared shell above) stays in the initial bundle; every other route ships as
// an async chunk fetched on demand. This removed ~60% of the unused JS that
// PageSpeed was flagging on the initial load.
const PricingPage = lazy(() =>
  import("./components/PricingPage").then((m) => ({ default: m.PricingPage })),
);
const SuccessPage = lazy(() =>
  import("./components/SuccessPage").then((m) => ({ default: m.SuccessPage })),
);
const BlogPage = lazy(() =>
  import("./components/BlogPage").then((m) => ({ default: m.BlogPage })),
);
const ChangelogPage = lazy(() =>
  import("./components/ChangelogPage").then((m) => ({ default: m.ChangelogPage })),
);
const TermsOfService = lazy(() =>
  import("./components/TermsOfService").then((m) => ({ default: m.TermsOfService })),
);
const PrivacyPolicy = lazy(() =>
  import("./components/PrivacyPolicy").then((m) => ({ default: m.PrivacyPolicy })),
);
const MarketplaceBlogPost = lazy(() =>
  import("./components/MarketplaceBlogPost").then((m) => ({ default: m.MarketplaceBlogPost })),
);
const BestAiAppsAndroid = lazy(() =>
  import("./components/BestAiAppsAndroid").then((m) => ({ default: m.BestAiAppsAndroid })),
);
const AiAgentForDevelopers = lazy(() =>
  import("./components/AiAgentForDevelopers").then((m) => ({ default: m.AiAgentForDevelopers })),
);
const AndroidAutomationPowerUser = lazy(() =>
  import("./components/AndroidAutomationPowerUser").then((m) => ({ default: m.AndroidAutomationPowerUser })),
);
const PrivacyFirstAiAndroid = lazy(() =>
  import("./components/PrivacyFirstAiAndroid").then((m) => ({ default: m.PrivacyFirstAiAndroid })),
);
const TerminalOnAndroid = lazy(() =>
  import("./components/TerminalOnAndroid").then((m) => ({ default: m.TerminalOnAndroid })),
);
const AiMarketplaceCreators = lazy(() =>
  import("./components/AiMarketplaceCreators").then((m) => ({ default: m.AiMarketplaceCreators })),
);
const EnterpriseAiAgent = lazy(() =>
  import("./components/EnterpriseAiAgent").then((m) => ({ default: m.EnterpriseAiAgent })),
);
const BestAndroidAiPillar = lazy(() =>
  import("./components/BestAndroidAiPillar").then((m) => ({ default: m.BestAndroidAiPillar })),
);
const OsVsBrowserAutomation = lazy(() =>
  import("./components/OsVsBrowserAutomation").then((m) => ({ default: m.OsVsBrowserAutomation })),
);
const DashboardPage = lazy(() =>
  import("./components/DashboardPage").then((m) => ({ default: m.DashboardPage })),
);
const ApkThankYouPage = lazy(() =>
  import("./components/ApkThankYouPage").then((m) => ({ default: m.ApkThankYouPage })),
);
const NotFoundPage = lazy(() =>
  import("./components/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);

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
const OmnaraComparisonPage = lazy(() => import("./pages/vs/omnara"));
const ManusComparisonPage = lazy(() => import("./pages/vs/manus"));
const OnspaceComparisonPage = lazy(() => import("./pages/vs/onspace"));
const PiComparisonPage = lazy(() => import("./pages/vs/pi"));
const SiriBixbyComparisonPage = lazy(() => import("./pages/vs/siri-bixby"));
const GoogleAiTestKitchenComparisonPage = lazy(() => import("./pages/vs/google-ai-test-kitchen"));

import { languages, changeLanguage, getDirection, applyBrowserLanguage } from "./i18n";

// ─── Route-chunk hover prefetch ─────────────────────────────────────────────
// instant.page-style prefetch, adapted for an SPA: instead of prefetching the
// target's HTML (which the client-side router discards), warm the lazy route
// MODULE on hover so a click resolves with zero chunk-download wait. Uses the
// same import specifiers as the lazy() defs above — the bundler dedupes them
// into the same chunks, so this adds no new requests beyond the prefetch.
// Most-specific prefixes first (mirrors the AppRoutes ordering).
const ROUTE_PREFETCHERS: Array<[string, () => Promise<unknown>]> = [
  ["/blog/marketplace", () => import("./components/MarketplaceBlogPost")],
  ["/blog/best-ai-apps-android", () => import("./components/BestAiAppsAndroid")],
  ["/blog/os-vs-browser-automation", () => import("./components/OsVsBrowserAutomation")],
  ["/ai-agent-for-developers", () => import("./components/AiAgentForDevelopers")],
  ["/android-automation-power-user", () => import("./components/AndroidAutomationPowerUser")],
  ["/privacy-first-ai-android", () => import("./components/PrivacyFirstAiAndroid")],
  ["/terminal-on-android", () => import("./components/TerminalOnAndroid")],
  ["/ai-marketplace-creators", () => import("./components/AiMarketplaceCreators")],
  ["/enterprise-ai-agent", () => import("./components/EnterpriseAiAgent")],
  ["/best-android-ai", () => import("./components/BestAndroidAiPillar")],
  ["/pricing", () => import("./components/PricingPage")],
  ["/success", () => import("./components/SuccessPage")],
  ["/blog", () => import("./components/BlogPage")],
  ["/changelog", () => import("./components/ChangelogPage")],
  ["/terms", () => import("./components/TermsOfService")],
  ["/privacy", () => import("./components/PrivacyPolicy")],
  ["/dashboard", () => import("./components/DashboardPage")],
  ["/apk", () => import("./components/ApkThankYouPage")],
  ["/vs/chatgpt", () => import("./pages/vs/chatgpt")],
  ["/vs/nebula", () => import("./pages/vs/nebula")],
  ["/vs/openclaw", () => import("./pages/vs/openclaw")],
  ["/vs/hermes-agent", () => import("./pages/vs/hermes-agent")],
  ["/vs/n8n", () => import("./pages/vs/n8n")],
  ["/vs/anything-llm", () => import("./pages/vs/anything-llm")],
  ["/vs/replika", () => import("./pages/vs/replika")],
  ["/vs/copilot", () => import("./pages/vs/copilot")],
  ["/vs/gemini", () => import("./pages/vs/gemini")],
  ["/vs/claude", () => import("./pages/vs/claude")],
  ["/vs/perplexity", () => import("./pages/vs/perplexity")],
  ["/vs/make", () => import("./pages/vs/make")],
  ["/vs/zapier", () => import("./pages/vs/zapier")],
  ["/vs/qordinate", () => import("./pages/vs/qordinate")],
  ["/vs/omnara", () => import("./pages/vs/omnara")],
  ["/vs/manus", () => import("./pages/vs/manus")],
  ["/vs/onspace", () => import("./pages/vs/onspace")],
  ["/vs/pi", () => import("./pages/vs/pi")],
  ["/vs/siri-bixby", () => import("./pages/vs/siri-bixby")],
  ["/vs/google-ai-test-kitchen", () => import("./pages/vs/google-ai-test-kitchen")],
];

function prefetchRoute(path: string) {
  // Strip a language prefix (e.g. /fr/pricing → /pricing) — same logic as AppRoutes
  const parts = path.split("/").filter(Boolean);
  let routePath = path;
  if (parts.length > 0 && languages.some((l) => l.code === parts[0])) {
    routePath = "/" + parts.slice(1).join("/");
  }
  const match = ROUTE_PREFETCHERS.find(([prefix]) => routePath.startsWith(prefix));
  if (match) {
    match[1]().catch(() => undefined); // best-effort prefetch
  }
}

/**
 * instant.page-style hover prefetch, applied site-wide: after 65 ms of hover
 * (or immediately on touchstart, like instant.page's mobile behavior) the
 * matching lazy route chunk is fetched and cached, so navigation resolves
 * instantly. Delegated listeners mean every link — current and future, in the
 * nav, footer, or body copy — gets it automatically. Respects data-saver.
 */
function useRoutePrefetch() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;

    const HOVER_MS = 65;
    const timers = new Map<Element, number>();
    let current: Element | null = null;

    const isPrefetchable = (a: HTMLAnchorElement): boolean => {
      if (a.target === "_blank") return false;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return false;
      if (/^(mailto:|tel:|javascript:)/i.test(href)) return false;
      // Static files and the static docs site are real navigations, not SPA
      // routes (mirrors the click interceptor in useSpaNavigation).
      if (/\.(txt|xml|json|png|jpe?g|svg|webp|apk|pdf|zip|gz|woff2?|md)$/i.test(href)) return false;
      if (href.startsWith("/docs")) return false;
      try {
        const url = new URL(a.href, window.location.origin);
        return url.origin === window.location.origin;
      } catch {
        return false;
      }
    };

    const schedule = (a: HTMLAnchorElement) => {
      if (timers.has(a)) return;
      const t = window.setTimeout(() => {
        timers.delete(a);
        const href = a.getAttribute("href");
        if (href) prefetchRoute(href);
      }, HOVER_MS);
      timers.set(a, t);
    };

    const cancel = (el: Element | null) => {
      if (!el) return;
      const t = timers.get(el);
      if (t !== undefined) {
        window.clearTimeout(t);
        timers.delete(el);
      }
    };

    const onOver = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      if (a === current) return; // still inside the same link
      cancel(current);
      current = a;
      if (a && isPrefetchable(a as HTMLAnchorElement)) schedule(a as HTMLAnchorElement);
    };

    const onOut = (e: MouseEvent) => {
      const a = (e.target as Element).closest("a");
      if (a === current) {
        cancel(current);
        current = null;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const a = (e.target as Element).closest("a");
      if (a && isPrefetchable(a as HTMLAnchorElement)) {
        const href = a.getAttribute("href");
        if (href) prefetchRoute(href);
      }
    };

    const onClick = (e: MouseEvent) => cancel((e.target as Element).closest("a"));

    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("click", onClick, true);
      timers.forEach((t) => window.clearTimeout(t));
      timers.clear();
    };
  }, []);
}

export function useTheme() {
  // OS color-scheme preference, read via useSyncExternalStore:
  // - The server snapshot is `true` (dark) so build-time prerendered HTML and
  //   the client's first render always agree (no hydration mismatch).
  // - After hydration the real OS preference is applied by the store, and
  //   live changes are followed via the matchMedia change event.
  const dark = useSyncExternalStore(
    subscribeToColorScheme,
    getColorSchemeSnapshot,
    () => true,
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [dark]);

  return { dark };
}

function subscribeToColorScheme(onStoreChange: () => void) {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
}

function getColorSchemeSnapshot() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
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
        return;
      }
    }
    // No language prefix in URL — apply browser-language detection after
    // hydration (i18n's initial language is pinned to 'en' to match the
    // build-time prerender).
    applyBrowserLanguage();
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

      // Don't intercept /docs links — served as static files from public/docs/
      if (href === "/docs" || href.startsWith("/docs/") || href.startsWith("/docs?")) {
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

// Top-level Suspense: any lazy-loaded route chunk suspends to a spinner while
// it downloads, so the initial bundle stays small (only the home route is
// eager). Falls back to the prerendered home HTML on hydration until the
// target route's chunk arrives.
export default function App() {
  // Site-wide route prefetching: hovering a link warms its lazy chunk so
  // navigation is instant. Mounted once here — applies to every page and
  // every link (delegated listeners).
  useRoutePrefetch();
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AppRoutes />
    </Suspense>
  );
}

function AppRoutes() {
  const { dark } = useTheme();
  const { path } = useSpaNavigation();
  const { user, loading: authLoading } = useAuth();

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

  // Docs — static Blume site served from public/docs/
  if (routePath.startsWith("/docs")) {
    // Redirect to the static docs site
    if (typeof window !== "undefined") {
      window.location.replace("/docs/");
    }
    return null;
  }

  if (routePath.startsWith("/ai-agent-for-developers")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <AiAgentForDevelopers dark={dark} />
      </>
    );
  }

  if (routePath.startsWith("/android-automation-power-user")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <AndroidAutomationPowerUser dark={dark} />
      </>
    );
  }

  if (routePath.startsWith("/privacy-first-ai-android")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <PrivacyFirstAiAndroid dark={dark} />
      </>
    );
  }

  if (routePath.startsWith("/terminal-on-android")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <TerminalOnAndroid dark={dark} />
      </>
    );
  }

  if (routePath.startsWith("/ai-marketplace-creators")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <AiMarketplaceCreators dark={dark} />
      </>
    );
  }

  if (routePath.startsWith("/enterprise-ai-agent")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <EnterpriseAiAgent dark={dark} />
      </>
    );
  }

  if (routePath.startsWith("/best-android-ai")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <BestAndroidAiPillar dark={dark} />
      </>
    );
  }

  if (routePath.startsWith("/blog/marketplace")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <MarketplaceBlogPost dark={dark} />
      </>
    );
  }

  if (routePath.startsWith("/blog/best-ai-apps-android")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <BestAiAppsAndroid dark={dark} />
      </>
    );
  }

  if (routePath.startsWith("/blog/os-vs-browser-automation")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <OsVsBrowserAutomation dark={dark} />
      </>
    );
  }

  if (routePath.startsWith("/blog")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <BlogPage dark={dark} />
      </>
    );
  }

  if (routePath.startsWith("/changelog")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ChangelogPage dark={dark} />
      </>
    );
  }

  if (routePath === "/terms") {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <TermsOfService dark={dark} />
      </>
    );
  }

  if (routePath === "/privacy") {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <PrivacyPolicy dark={dark} />
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

  if (routePath.startsWith("/success")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <SuccessPage />
      </>
    );
  }

  if (routePath.startsWith("/apk")) {
    return (
      <>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <ApkThankYouPage />
      </>
    );
  }

  // Dashboard — requires auth, shows billing/subscription
  if (routePath.startsWith("/dashboard")) {
    if (authLoading) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
            <WiredSpinner />
          </div>
        );
      }
    if (!user) {
      // Not logged in — redirect to home
      if (typeof window !== "undefined") window.history.replaceState({}, "", "/");
      return <ImmersiveLandingPage dark={dark} />;
    }
    return (
      <>
        <MetaUpdater currentPath={routePath} />
        <DashboardPage dark={dark} />
      </>
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

  if (routePath.startsWith("/vs/pi")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <PiComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/siri-bixby")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <SiriBixbyComparisonPage />
      </Suspense>
    );
  }
  if (routePath.startsWith("/vs/google-ai-test-kitchen")) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HreflangTags currentPath={routePath} />
        <MetaUpdater currentPath={routePath} />
        <GoogleAiTestKitchenComparisonPage />
      </Suspense>
    );
  }

  // Detailed landing page — canonicalized to / to prevent duplicate content
  if (routePath.startsWith("/details")) {
    return (
      <>
        <HreflangTags currentPath="/" />
        <MetaUpdater currentPath="/" canonicalPath="/" />
        <ImmersiveLandingPage dark={dark} />
      </>
    );
  }

  // Simple landing page — canonicalized to / to prevent duplicate content
  if (routePath.startsWith("/simple")) {
    return (
      <>
        <HreflangTags currentPath="/" />
        <MetaUpdater currentPath="/" canonicalPath="/" />
        <ImmersiveLandingPage dark={dark} />
      </>
    );
  }

  // Main immersive landing page — redirect to dashboard if logged in
  if (routePath === "/" || routePath === "" || routePath === "/index.html") {
    if (!authLoading && user) {
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", "/dashboard");
      }
      return (
        <>
          <MetaUpdater currentPath="/dashboard" />
          <DashboardPage dark={dark} />
        </>
      );
    }
    return (
      <>
        <HreflangTags currentPath={routePath || '/'} />
        <MetaUpdater currentPath={routePath || '/'} />
        <ImmersiveLandingPage dark={dark} />
      </>
    );
  }

  // Catch-all 404 page for any other path
  return (
    <>
      <HreflangTags currentPath={routePath} />
      <MetaUpdater currentPath={routePath} />
      <NotFoundPage dark={dark} />
    </>
  );
}

// Minimal loading spinner for lazy-loaded chunks — prevents CLS during route transitions
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
      <WiredSpinner />
    </div>
  );
}
