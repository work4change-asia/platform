import type { IconProps } from "./icon";

export function ViewIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1398 742 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <path
            d="M1400 750.364C1400 750.364 1402.18 746 1406 746C1409.82 746 1412 750.364 1412 750.364C1412 750.364 1409.82 754.727 1406 754.727C1402.18 754.727 1400 750.364 1400 750.364Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1406 752C1406.9 752 1407.64 751.268 1407.64 750.364C1407.64 749.46 1406.9 748.728 1406 748.728C1405.1 748.728 1404.36 749.46 1404.36 750.364C1404.36 751.268 1405.1 752 1406 752Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
