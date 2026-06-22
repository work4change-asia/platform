import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function ExperienceIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="637 671 32 32"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Experience icon">
        <g id="Group 1321315740">
          <path
            id="Vector_11"
            d="M663 677H643C642.448 677 642 677.448 642 678V698C642 698.552 642.448 699 643 699H663C663.552 699 664 698.552 664 698V678C664 677.448 663.552 677 663 677Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_12"
            d="M659 675V679"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_13"
            d="M647 675V679"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_14"
            d="M642 683H664"
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
