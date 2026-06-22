import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function UploadIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1770 662 24 24"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Upload icon white">
        <g id="Upload icon">
          <path
            id="Vector_79"
            d="M1786.19 669.937L1782.25 666L1778.31 669.937"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_80"
            d="M1782.25 676.5L1782.25 666.003"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_81"
            d="M1790.5 676.5V681.75C1790.5 681.949 1790.42 682.14 1790.28 682.28C1790.14 682.421 1789.95 682.5 1789.75 682.5H1774.75C1774.55 682.5 1774.36 682.421 1774.22 682.28C1774.08 682.14 1774 681.949 1774 681.75V676.5"
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
