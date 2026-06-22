import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function ArrowUpRightIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1568 742 16 16"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Arrow-up-right 16">
        <g id="Group 1321315751">
          <path
            id="Vector_96"
            d="M1573 753.667L1579.67 747"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_97"
            d="M1573 747H1579.67V753.667"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
