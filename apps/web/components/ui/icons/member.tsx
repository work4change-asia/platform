import type { IconProps } from "./icon";

export function MemberIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="884 409 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <circle cx="912.896" cy="440.073" r="3.32691" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="922.903" cy="433.402" r="3.32691" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M924.014 444.707V452.675"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M928 448.689L920.031 448.689"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M917.713 445.633C917.157 445.077 915.415 443.965 912.895 443.965C910.159 443.965 906.723 444.944 904.774 449.695C904.283 450.894 905.249 452.119 906.545 452.119H915.489"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M916.787 440.074C918.331 438.344 922.68 435.7 927.72 438.962"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}
