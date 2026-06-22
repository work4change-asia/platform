import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function AreaIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1037 671 32 32"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Area icon">
        <g id="Group 638">
          <g id="Group 637">
            <path
              id="Vector 39"
              d="M1058.36 689.423L1050.96 692.903L1050.29 693.634C1048.65 695.401 1045.88 695.471 1044.16 693.788C1042.43 692.101 1042.44 689.319 1044.18 687.644L1044.96 686.895L1048.03 679.715"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <rect
              id="Rectangle 9706"
              x="1047.28"
              y="678.42"
              width="3.46891"
              height="16.6748"
              rx="1.73446"
              transform="rotate(-45 1047.28 678.42)"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              id="Vector 40"
              d="M1045.1 686.895L1054.48 696.516C1055.25 697.308 1054.86 698.639 1053.78 698.884C1053.3 698.991 1052.81 698.848 1052.46 698.504L1049.06 695.1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              id="Vector 41"
              d="M1059.02 679.129L1061.66 676.491"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              id="Vector 42"
              d="M1060.34 681.913H1064.15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              id="Vector 43"
              d="M1056.24 677.81L1056.24 674"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
