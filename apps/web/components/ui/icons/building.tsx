import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function BuildingIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="970 276 64 64"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Building icon">
        <g id="Group 1321315800">
          <path
            id="Vector 150"
            d="M1001.69 293.792L988.25 300.819L1001.69 308.153L1015.75 300.819L1001.69 293.792Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 151"
            d="M994.972 304.487L988.25 307.848L1001.69 315.182L1015.75 307.848L1009.03 304.487"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 153"
            d="M1011.78 306.015L998.333 313.042"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 154"
            d="M997.417 306.015L991.306 309.07"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 152"
            d="M1001.08 307.848L988.25 314.875L1001.69 322.209L1015.75 314.875L1009.03 311.514"
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
