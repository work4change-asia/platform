import type { IconProps } from "./icon";

export function ArtIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1052 276 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <circle cx="1076" cy="316.25" r="3.75" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="1092" cy="311.25" r="3.75" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M1079.8 304.75L1095.3 300.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1079.8 315.75V299.25L1095.8 295.25V310.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
