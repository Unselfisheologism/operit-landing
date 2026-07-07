export function PlayStoreBadge({
  className = "h-11",
}: {
  className?: string;
}) {
  return (
    <img
      src="/GetItOnGooglePlay_Badge_Web_color_English.svg"
      alt="Get it on Google Play"
      className={className}
      aria-hidden="true"
    />
  );
}
