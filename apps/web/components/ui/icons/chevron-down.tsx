import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function ChevronDownIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1368 668 12 12"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Arrow Down icon">
        <path
          id="Vector_64"
          d="M1377.92 672.451L1374.66 675.711C1374.27 676.096 1373.65 676.096 1373.26 675.711L1370 672.451"
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
