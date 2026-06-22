import type { IconProps } from "./icon";

export function LockIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="392 409 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <g>
            <rect width="22" height="28" transform="translate(413 427)" fill="none" />
            <path
              d="M417 439V434C417 430.134 420.134 427 424 427C427.866 427 431 430.134 431 434V435.216"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <rect
              x="413.75"
              y="439.75"
              width="20.5"
              height="14.5"
              rx="2.25"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M424 445V449" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
  );
}
