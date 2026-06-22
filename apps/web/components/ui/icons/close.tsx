import type { IconProps } from "./icon";

export function CloseIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1330 664 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <path
          d="M1340 684C1345.52 684 1350 679.523 1350 674C1350 668.477 1345.52 664 1340 664C1334.48 664 1330 668.477 1330 674C1330 679.523 1334.48 684 1340 684Z"
          fill="white"
        />
        <g>
          <path
            d="M1343 671L1337 677"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1337 671L1343 677"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
