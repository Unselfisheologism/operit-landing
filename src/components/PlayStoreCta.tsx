const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.twent";

interface PlayStoreCtaProps {
  size?: string;
  className?: string;
  showText?: boolean;
}

/**
 * Renders the Google Play badge — links to the Play Store listing.
 * The badge uses the official GetItOnGooglePlay_Badge_Web_color_English.svg.
 * SVG scales naturally (preserves its ~3.37:1 aspect ratio); height is
 * capped at the CSS h- value (h-8 = 32px, h-11 = 44px) which both exceed
 * the Google Play minimum of 28px.
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
      className={`inline-flex items-center justify-center ${className}`}
    >
      <img
        src="/GetItOnGooglePlay_Badge_Web_color_English.svg"
        alt="Get it on Google Play"
        className={big ? "h-11" : "h-8"}
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
        aria-label="Get it on Google Play"
      >
        <img
          src="/GetItOnGooglePlay_Badge_Web_color_English.svg"
          alt="Get it on Google Play"
          className="h-8"
          loading="eager"
        />
      </a>
    </div>
  );
}
