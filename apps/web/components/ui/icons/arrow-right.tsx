import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function ArrowRightIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1530 662 24 24"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Arrow Go">
        <g id="Arrow Go icon_2">
          <path
            id="Vector_69"
            d="M1540.45 670.08L1543.71 673.34C1544.1 673.725 1544.1 674.355 1543.71 674.74L1540.45 678"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
