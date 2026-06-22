import type { IconProps } from "./icon";

export function CaseIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="486 671 33 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <path
            d="M513.5 680H491.5C490.948 680 490.5 680.448 490.5 681V697C490.5 697.552 490.948 698 491.5 698H513.5C514.052 698 514.5 697.552 514.5 697V681C514.5 680.448 514.052 680 513.5 680Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M507.499 680V678C507.499 677.47 507.288 676.961 506.913 676.586C506.538 676.211 506.029 676 505.499 676H499.499C498.969 676 498.46 676.211 498.085 676.586C497.71 676.961 497.499 677.47 497.499 678V680"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M514.5 686.789C510.853 688.899 506.713 690.007 502.499 690C498.286 690.007 494.147 688.9 490.5 686.79"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M500.999 686H503.999"
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
