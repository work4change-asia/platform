import type { IconProps } from "./icon";

export function VisibilityIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1087 671 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <path
            d="M1092 687C1092 687 1096 679 1103 679C1110 679 1114 687 1114 687C1114 687 1110 695 1103 695C1096 695 1092 687 1092 687Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1103 690.001C1104.66 690.001 1106 688.657 1106 687.001C1106 685.344 1104.66 684 1103 684C1101.34 684 1100 685.344 1100 687.001C1100 688.657 1101.34 690.001 1103 690.001Z"
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
