import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function LockIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="392 409 64 64"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Lock icon">
        <g id="Group 1321315717">
          <g id="Frame 1321315706">
            <rect width="22" height="28" transform="translate(413 427)" fill="none" />
            <path
              id="Vector 37"
              d="M417 439V434C417 430.134 420.134 427 424 427C427.866 427 431 430.134 431 434V435.216"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <rect
              id="Rectangle 9705"
              x="413.75"
              y="439.75"
              width="20.5"
              height="14.5"
              rx="2.25"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              id="Vector 38"
              d="M424 445V449"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
