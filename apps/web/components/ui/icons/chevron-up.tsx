import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function ChevronUpIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1398 668 12 12"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Arrow Up icon">
        <path
          id="Vector_65"
          d="M1400.08 675.549L1403.34 672.289C1403.73 671.904 1404.35 671.904 1404.74 672.289L1408 675.549"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
