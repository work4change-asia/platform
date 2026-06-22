import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function BriefcaseIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="737 671 32 32"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Briefcase icon">
        <g id="Group 1321315743">
          <path
            id="Vector_18"
            d="M764 680H742C741.448 680 741 680.448 741 681V697C741 697.552 741.448 698 742 698H764C764.552 698 765 697.552 765 697V681C765 680.448 764.552 680 764 680Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_19"
            d="M757.999 680V678C757.999 677.47 757.788 676.961 757.413 676.586C757.038 676.211 756.529 676 755.999 676H749.999C749.469 676 748.96 676.211 748.585 676.586C748.21 676.961 747.999 677.47 747.999 678V680"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_20"
            d="M765 686.789C761.353 688.899 757.213 690.007 752.999 690C748.786 690.007 744.647 688.9 741 686.79"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_21"
            d="M751.499 686H754.499"
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
