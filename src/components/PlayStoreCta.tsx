import { PlayStoreBadge } from "./PlayStoreBadge";

const APK_URL = "https://assets.twent.xyz/app-release.apk";
const PLAY_STORE_URL = "https://play.google.com/apps/testing/com.twent";

interface PlayStoreCtaProps {
  size?: string;
  className?: string;
  showText?: boolean;
}

/**
 * Renders a Play Store badge + an adjacent APK download link.
 * Replaces the old <a><PlayStoreBadge /></a> pattern, adding the APK link
 * "besides" the badge as requested.
 */
export function PlayStoreCta({
  size = "h-11",
  className = "",
  showText = false,
}: PlayStoreCtaProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Twent from Play Store"
        className="inline-block hover:opacity-80 transition-opacity"
      >
        <PlayStoreBadge className={size} />
      </a>
      <a
        href={APK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download Twent APK"
        className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="hidden sm:inline">APK</span>
      </a>
    </div>
  );
}

/**
 * Full button variant: Play Store badge button + APK text button side by side.
 * Used on comparison pages and blog posts where there's a labeled button.
 */
export function PlayStoreCtaGroup({
  size = "h-8",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 justify-center ${className}`}>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white hover:bg-zinc-800 transition"
      >
        <PlayStoreBadge className={size} />
        <span className="font-medium">Get it from Play Store</span>
      </a>
      <a
        href={APK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-900 dark:text-zinc-100 font-medium transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="font-medium">Download APK</span>
      </a>
    </div>
  );
}
