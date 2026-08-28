const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.twent";

interface PlayStoreCtaProps {
  size?: string;
  className?: string;
  showText?: boolean;
}

/**
 * Renders the Google Play badge — links to the Play Store listing.
 * Small (nav) renders at 66×32; large (hero/final CTA) renders at 88×44.
 */
export function PlayStoreCta({
  size = "h-11",
  className = "",
  showText = false,
}: PlayStoreCtaProps) {
  const big = size !== "h-8";

  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
      className={`${big ? "d-btn-lg" : "d-btn-sm"} ${className}`}
    >
      <img
        src="/GetItOnGooglePlay_Badge_Web_color_English.svg"
        alt="Get it on Google Play"
        className={big ? "h-11" : "h-8"}
        width={big ? 88 : 66}
        height={big ? 44 : 32}
        loading="eager"
      />
    </a>
  );
}

/**
 * Google Play badge — same link as PlayStoreCta.
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
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="d-btn-lg"
        aria-label="Get it on Google Play"
      >
        <img
          src="/GetItOnGooglePlay_Badge_Web_color_English.svg"
          alt="Get it on Google Play"
          className="h-8"
          width={66}
          height={32}
          loading="eager"
        />
      </a>
    </div>
  );
}
