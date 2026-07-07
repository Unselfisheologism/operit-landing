import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PlayStoreBadge } from "./PlayStoreBadge";
import { LoginModal } from "./LoginModal";
import { useAuth } from "../lib/AuthContext";

interface NavProps {
  dark: boolean;
  onToggle: () => void;
}

const NAV_LINKS = [
  { label: "Features", href: "#features", external: false },
  { label: "Marketplace", href: "/blog/marketplace", external: false },
  { label: "Pricing", href: "/pricing", external: false },
  { label: "Docs", href: "/docs", external: false },
  { label: "Blog", href: "/blog", external: false },
];

function DownloadButton({
  className = "",
  iconOnly = false,
}: {
  className?: string;
  iconOnly?: boolean;
}) {
  return (
    <a
      href="https://play.google.com/apps/testing/com.twent"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Twent from Play Store"
      className={`inline-flex items-center justify-center bg-black text-white hover:bg-zinc-800 transition-colors ${iconOnly ? "w-9 h-9" : "gap-2 px-4 py-2 text-sm font-secondary uppercase tracking-wider"} ${className}`}
    >
      <PlayStoreBadge iconClassName="w-[18px] h-[18px]" />
      {!iconOnly && <span>Play Store</span>}
    </a>
  );
}

function HamburgerIcon({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative w-10 h-10 flex items-center justify-center shrink-0"
      aria-label="Menu"
    >
      <div className="w-5 flex flex-col gap-[5px]">
        <span
          className={`block h-[2px] bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 origin-center ${
            open ? "rotate-45 translate-y-[7px]" : ""
          }`}
        />
        <span
          className={`block h-[2px] bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 ${
            open ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block h-[2px] bg-zinc-900 dark:bg-zinc-100 transition-all duration-300 origin-center ${
            open ? "-rotate-45 -translate-y-[7px]" : ""
          }`}
        />
      </div>
    </button>
  );
}

function MobileOverlay({
  open,
  onClose,
  onSignIn,
  user,
  onSignOut,
}: {
  open: boolean;
  onClose: () => void;
  onSignIn: () => void;
  user: { email?: string } | null;
  onSignOut: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-[70] transition-all duration-500 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-l border-zinc-200 dark:border-zinc-800 transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          {/* Nav links */}
          <div className="space-y-1 mb-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={onClose}
                className="block px-4 py-3 text-sm font-secondary uppercase tracking-wider text-black dark:text-white hover:text-black/70 dark:hover:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="section-divider mb-6" />

          {/* Language Switcher - Mobile */}
          <div className="mb-6">
            <LanguageSwitcher />
          </div>

          <div className="section-divider mb-6" />

          {/* Auth in mobile overlay */}
          <div className="mb-6">
            {user ? (
              <button
                onClick={() => { onSignOut(); onClose(); }}
                className="block w-full px-4 py-3 text-sm font-secondary uppercase tracking-wider text-black dark:text-white hover:text-black/70 dark:hover:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
              >
                Sign Out ({user.email?.split("@")[0]})
              </button>
            ) : (
              <button
                onClick={() => { onSignIn(); onClose(); }}
                className="block w-full px-4 py-3 text-sm font-secondary uppercase tracking-wider text-black dark:text-white hover:text-black/70 dark:hover:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="section-divider mb-6" />

          {/* Download inside overlay */}
          <DownloadButton className="w-full justify-center" />
        </div>
      </div>
    </div>
  );
}

// === DESKTOP FLOATING PILL HEADER ===
// Single pill that starts narrow (nav links only) and expands on scroll
// to include icon logo on left and download+toggle on right.
// Always centered, never full-width.
function DesktopHeader({
  dark,
  scrolled,
  onToggle: _onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
  scrolled: boolean;
}) {
  return (
    <div
      className="nav-pill hidden md:flex fixed top-4 z-50 left-1/2 -translate-x-1/2 items-center transition-all duration-500 ease-out"
      style={{
        ...(scrolled
          ? {
              background: dark ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: dark
                ? "1px solid rgba(255,255,255,0.15)"
                : "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              padding: "6px 8px",
              gap: "4px",
              maxWidth: "960px",
            }
          : {
              background: dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: dark
                ? "1px solid rgba(255,255,255,0.15)"
                : "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              padding: "8px 16px",
              gap: "0px",
              maxWidth: "fit-content",
            }),
      }}
    >
      {/* LEFT: Icon logo — fades in when scrolled */}
      <a
        href="#"
        className={`flex items-center justify-center transition-all duration-500 overflow-hidden ${
          scrolled
            ? "w-11 h-11 opacity-100 ml-1 mr-2"
            : "w-0 h-0 opacity-0 ml-0 mr-0"
        }`}
      >
        <img
          src="/twent-logo-48.webp"
          srcSet="/twent-logo-48.webp 48w, /twent-logo-96.webp 96w"
          sizes="56px"
          alt="Twent logo - Personal AI agent for Android"
          className="w-14 h-14 object-contain"
          width="56"
          height="56"
          loading="eager"
          fetchPriority="high"
        />
      </a>

      {/* CENTER: Navigation links */}
      <div className="flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`whitespace-nowrap transition-all duration-300 ${
              scrolled
                ? "text-[11px] font-secondary uppercase tracking-wider text-black dark:text-white hover:text-black/70 dark:hover:text-white/70 px-2.5 py-1.5"
                : "text-xs font-secondary uppercase tracking-wider text-black dark:text-white hover:text-black/70 dark:hover:text-white/70 px-2 py-1"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* RIGHT: Download + Auth — fades in when scrolled */}
      <div
        className={`flex items-center transition-all duration-500 overflow-hidden ${
          scrolled
            ? "opacity-100 w-auto ml-2 mr-1 gap-2"
            : "opacity-0 w-0 ml-0 mr-0 gap-0"
        }`}
      >
        <span className="w-px h-5 bg-zinc-200 dark:bg-zinc-700" />
        {user ? (
          <button
            onClick={() => signOut()}
            className="text-[11px] font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white px-2 py-1.5 transition-colors whitespace-nowrap"
            title="Sign out"
          >
            {user.email?.split("@")[0]}
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="text-[11px] font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white px-2 py-1.5 transition-colors whitespace-nowrap"
          >
            Sign In
          </button>
        )}
        <DownloadButton iconOnly className="!w-8 !h-8" />
      </div>
    </div>
  );
}

// === MOBILE HEADER ===
// Completely different from desktop. Always translucent glassmorphism.
// Left: icon logo + "Twent" text. Right: toggle + hamburger.
// Hamburger opens overlay with all nav links + download button.
function MobileHeader({
  dark,
  menuOpen,
  setMenuOpen,
  onToggle: _onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  return (
    <div
      className="nav-pill md:hidden fixed top-3 left-3 right-3 z-50 flex items-center justify-between px-4 py-3 backdrop-blur-xl shadow-lg shadow-black/5"
      style={{
        background: dark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.85)",
        border: dark
          ? "1px solid rgba(255,255,255,0.15)"
          : "1px solid rgba(0,0,0,0.1)",
      }}
    >
      {/* Left: icon + text logo */}
      <a href="#" className="flex items-center gap-2">
        <img
          src="/twent-logo-48.webp"
          srcSet="/twent-logo-48.webp 48w, /twent-logo-96.webp 96w"
          sizes="48px"
          alt="Twent logo - Personal AI agent for Android"
          className="w-12 h-12 object-contain"
          width="48"
          height="48"
          loading="eager"
          fetchPriority="high"
        />
        <span className="font-display text-base text-black dark:text-white">
          Twent
        </span>
      </a>

      {/* Right: download icon + hamburger */}
      <div className="flex items-center gap-1">
        <DownloadButton iconOnly className="!w-8 !h-8" />
        <HamburgerIcon open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
      </div>
    </div>
  );
}

// === MAIN NAV EXPORT ===
export function Nav({ dark, onToggle }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (scrolled && menuOpen) setMenuOpen(false);
  }, [scrolled]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* === DESKTOP (≥768px) — Three-Element Top Bar === */}

      {/* Top-left: text logo OUTSIDE the header. Disappears on scroll. */}
      <a
        href="#"
        className={`hidden md:flex fixed top-5 left-6 z-40 items-center gap-2 transition-all duration-500 ${
          scrolled
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <span className="font-display text-xl text-black dark:text-white">
          Twent
        </span>
      </a>

      {/* Top-right: auth + download OUTSIDE the header. Disappears on scroll. */}
      <div
        className={`hidden md:flex fixed top-5 right-6 z-40 items-center gap-3 transition-all duration-500 ${
          scrolled
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        {user ? (
          <button
            onClick={() => signOut()}
            className="text-xs font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            title="Sign out"
          >
            {user.email?.split("@")[0]}
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="text-xs font-secondary uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Sign In
          </button>
        )}
        <DownloadButton iconOnly />
      </div>

      {/* Top-center: floating pill header (the main nav) */}
      <DesktopHeader dark={dark} onToggle={onToggle} scrolled={scrolled} />

      {/* === MOBILE (<768px) — Completely Different Header === */}
      <MobileHeader
        dark={dark}
        onToggle={onToggle}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Mobile overlay menu (contains all links + download) */}
      <MobileOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSignIn={() => setShowLogin(true)}
        user={user}
        onSignOut={signOut}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={() => setShowLogin(false)}
      />
    </>
  );
}
