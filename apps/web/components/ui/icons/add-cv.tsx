import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function AddCvIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="987 671 32 32"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Add CV icon">
        <path
          id="Vector_34"
          d="M1003 699C1009.63 699 1015 693.627 1015 687C1015 680.373 1009.63 675 1003 675C996.373 675 991 680.373 991 687C991 693.627 996.373 699 1003 699Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          id="Vector_35"
          d="M998 687H1008"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_36"
          d="M1003 682V692"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
