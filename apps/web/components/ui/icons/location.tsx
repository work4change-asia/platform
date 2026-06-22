import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function LocationIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="687 671 32 32"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Location icon">
        <g id="Group 1321315741">
          <path
            id="Vector_15"
            d="M694 700H712"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_16"
            d="M703 688C705.209 688 707 686.209 707 684C707 681.791 705.209 680 703 680C700.791 680 699 681.791 699 684C699 686.209 700.791 688 703 688Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_17"
            d="M713 684C713 693 703 700 703 700C703 700 693 693 693 684C693 681.348 694.054 678.804 695.929 676.929C697.804 675.054 700.348 674 703 674C705.652 674 708.196 675.054 710.071 676.929C711.946 678.804 713 681.348 713 684V684Z"
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
