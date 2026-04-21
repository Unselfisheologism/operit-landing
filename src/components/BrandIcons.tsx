interface IconProps {
  size?: number;
  className?: string;
}

/** Claude logo - stylized "A" sunburst */
export function ClaudeIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="4" fill="#191919" />
      <path
        d="M12 4.5L14.5 9.5H17L14 13L15.5 18L12 15L8.5 18L10 13L7 9.5H9.5L12 4.5Z"
        fill="#D4A574"
      />
    </svg>
  );
}

/** OpenAI Codex logo - hexagonal shape */
export function CodexIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect width="24" height="24" rx="4" fill="#10A37F" />
      <path
        d="M7 8L12 6L17 8V16L12 18L7 16V8Z"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="12" r="2" fill="white" />
    </svg>
  );
}

/** OpenCode logo - terminal/code style */
export function OpenCodeIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 40 24" fill="none" className={className}>
      <rect width="40" height="24" rx="3" fill="#1a1a2e" stroke="#3b82f6" strokeWidth="1" />
      <text
        x="20"
        y="16"
        textAnchor="middle"
        fill="#60a5fa"
        fontFamily="monospace"
        fontSize="10"
        fontWeight="bold"
      >
        {"</>"}
      </text>
    </svg>
  );
}
