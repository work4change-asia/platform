import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function CalendarIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1330 742 16 16"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Calendar tiny icon" clipPath="url(#clip1_1_18642)">
        <path
          id="Vector_82"
          d="M1343 744.5H1333C1332.72 744.5 1332.5 744.724 1332.5 745V755C1332.5 755.276 1332.72 755.5 1333 755.5H1343C1343.28 755.5 1343.5 755.276 1343.5 755V745C1343.5 744.724 1343.28 744.5 1343 744.5Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_83"
          d="M1341 743.5V745.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_84"
          d="M1335 743.5V745.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_85"
          d="M1332.5 747.5H1343.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
