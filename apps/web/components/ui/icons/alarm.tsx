import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function AlarmIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1466 742 16 16"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Alarm tiny icon">
        <g id="Group 1321315716">
          <g id="Alarm tiny icon_2">
            <g id="Group 1321315660_2">
              <circle id="Ellipse 47" cx="1474" cy="750" r="5.5" stroke="currentColor" />
              <path
                id="Vector 16"
                d="M1474 747V750.5L1477 752.5"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
