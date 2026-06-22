import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function CvIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="937 671 32 32"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="CV icon">
        <path
          id="Vector_30"
          d="M962 699H943.999C943.734 699 943.479 698.895 943.292 698.707C943.104 698.52 942.999 698.265 942.999 698V676C942.999 675.735 943.104 675.48 943.292 675.293C943.479 675.105 943.734 675 943.999 675H956L963 682V698C963 698.131 962.974 698.261 962.924 698.383C962.874 698.504 962.8 698.614 962.707 698.707C962.614 698.8 962.504 698.874 962.383 698.924C962.261 698.974 962.131 699 962 699Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_31"
          d="M956 675V682H963.001"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_32"
          d="M949 688H957"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_33"
          d="M949 692H957"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
