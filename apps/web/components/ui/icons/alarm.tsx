import type { IconProps } from "./icon";

export function AlarmIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1466 742 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <g>
            <g>
              <circle cx="1474" cy="750" r="5.5" stroke="currentColor" />
              <path d="M1474 747V750.5L1477 752.5" stroke="currentColor" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
