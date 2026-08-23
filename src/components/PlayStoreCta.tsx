import { DLink } from "./ui/drawably";

const APK_THANKYOU_URL = "/apk";

interface PlayStoreCtaProps {
  size?: string;
  className?: string;
  showText?: boolean;
}

/**
 * Renders the APK download link only — as a hand-drawn control.
 * Small (nav) renders a grey outline; large (hero/final CTA) renders a
 * solid blue primary button.
 */
export function PlayStoreCta({
  size = "h-11",
  className = "",
  showText = false,
}: PlayStoreCtaProps) {
  const big = size !== "h-8";
  return (
    <DLink
      href={APK_THANKYOU_URL}
      target="_self"
      rel=""
      aria-label="Download Twent APK"
      variant={big ? "solid" : "outline"}
      color={big ? "blue" : "grey"}
      className={`${big ? "d-btn-lg" : "d-btn-sm"} ${className}`}
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
      <span>APK</span>
    </DLink>
  );
}

/**
 * APK-only button variant — big solid primary CTA.
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
      <DLink
        href={APK_THANKYOU_URL}
        target="_self"
        rel=""
        variant="solid"
        className="d-btn-lg"
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
      </DLink>
    </div>
  );
}
