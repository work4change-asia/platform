import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function TrashIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1636 742 16 16"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Trash icon">
        <path
          id="Vector_99"
          d="M1649.5 745.5L1638.5 745.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_100"
          d="M1642.5 748.5V752.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_101"
          d="M1645.5 748.5V752.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_102"
          d="M1648.5 745.5V755C1648.5 755.133 1648.45 755.26 1648.35 755.354C1648.26 755.447 1648.13 755.5 1648 755.5H1640C1639.87 755.5 1639.74 755.447 1639.65 755.354C1639.55 755.26 1639.5 755.133 1639.5 755V745.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_103"
          d="M1646.5 745.5V744.5C1646.5 744.235 1646.39 743.98 1646.21 743.793C1646.02 743.605 1645.77 743.5 1645.5 743.5H1642.5C1642.23 743.5 1641.98 743.605 1641.79 743.793C1641.61 743.98 1641.5 744.235 1641.5 744.5V745.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
