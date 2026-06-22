import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function BorderIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1048 409 64 64"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Border icon">
        <g id="Group 1321315785">
          <circle id="Ellipse 287" cx="1067.58" cy="427.792" r="1.58491" fill="currentColor" />
          <circle id="Ellipse 288" cx="1083.43" cy="443.642" r="1.58491" fill="currentColor" />
          <path
            id="Vector 121"
            d="M1067.58 427.792V439.943"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 123"
            d="M1083.43 443.642V455.793"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 122"
            d="M1068.11 428.321C1068.29 428.673 1069.17 429.272 1071.28 428.849C1072.34 428.638 1073.4 427.792 1075.51 427.792C1077.09 427.792 1077.62 428.145 1078.15 428.321V436.245C1077.8 435.717 1076.46 434.872 1073.92 435.717C1070.75 436.774 1071.28 436.774 1069.7 436.774C1068.43 436.774 1067.76 436.421 1067.58 436.245"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 124"
            d="M1083.96 444.17C1084.14 444.522 1085.02 445.121 1087.13 444.698C1088.19 444.487 1089.25 443.642 1091.36 443.642C1092.94 443.642 1093.47 443.994 1094 444.17V452.094C1093.65 451.566 1092.31 450.721 1089.77 451.566C1086.6 452.623 1087.13 452.623 1085.55 452.623C1084.28 452.623 1083.61 452.271 1083.43 452.094"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 125"
            d="M1088.72 444.17L1088.72 451.566"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 126"
            d="M1067.58 432.019C1068.29 432.371 1070.12 432.97 1071.81 432.547C1073.92 432.019 1075.51 430.962 1078.15 432.019"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector 127"
            d="M1093.47 427.264L1066.53 454.736"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="3 3"
          />
        </g>
      </g>
    </svg>
  );
}
