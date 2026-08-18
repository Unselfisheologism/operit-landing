const APK_THANKYOU_URL = "/apk";

interface PlayStoreCtaProps {
  size?: string;
  className?: string;
  showText?: boolean;
}

/**
 * Renders the APK download link only.
 */
export function PlayStoreCta({
  size = "h-11",
  className = "",
  showText = false,
}: PlayStoreCtaProps) {
  return (
    <a
      href={APK_THANKYOU_URL}
      target="_self"
      rel=""
      aria-label="Download Twent APK"
      className={`flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors ${className}`}
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
  );
}

/**
 * APK-only button variant.
 */
export function PlayStoreCtaGroup({
  size = "h-8",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <a
        href={APK_THANKYOU_URL}
        target="_self"
        rel=""
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
