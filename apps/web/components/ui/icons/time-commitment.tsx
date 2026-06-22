import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function TimeCommitmentIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="787 671 32 32"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Time Commitment icon">
        <g id="Group 1321315742">
          <path
            id="Vector_22"
            d="M803 700C809.075 700 814 695.075 814 689C814 682.925 809.075 678 803 678C796.925 678 792 682.925 792 689C792 695.075 796.925 700 803 700Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
          />
          <path
            id="Vector_23"
            d="M803 689L807.95 684.05"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_24"
            d="M800 674H806"
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
