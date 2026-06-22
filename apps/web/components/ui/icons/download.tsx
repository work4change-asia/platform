import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function DownloadIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1728 662 24 24"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Download icon white">
        <g id="DownloadSimple">
          <g id="DownloadSimple_2">
            <path
              id="Vector_76"
              d="M1736.06 672.313L1740 676.25L1743.94 672.313"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_77"
              d="M1740 665.75V676.247"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_78"
              d="M1748.25 676.25V681.5C1748.25 681.699 1748.17 681.89 1748.03 682.03C1747.89 682.171 1747.7 682.25 1747.5 682.25H1732.5C1732.3 682.25 1732.11 682.171 1731.97 682.03C1731.83 681.89 1731.75 681.699 1731.75 681.5V676.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
