import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function MarketingIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="396 276 64 64"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Marketing">
        <g id="Group 1321315781">
          <g id="Group 638_3">
            <g id="Group 637_3">
              <path
                id="Vector 39_3"
                d="M434.538 311.27L426.179 315.201L425.414 316.027C423.566 318.023 420.436 318.102 418.49 316.201C416.538 314.295 416.549 311.153 418.514 309.261L419.393 308.415L422.869 300.304"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <rect
                id="Rectangle 9706_3"
                x="421.883"
                y="298.841"
                width="4.11277"
                height="19.0298"
                rx="2.05638"
                transform="rotate(-45 421.883 298.841)"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                id="Vector 40_3"
                d="M419.558 308.414L430.147 319.282C431.019 320.176 430.574 321.68 429.357 321.957C428.821 322.078 428.26 321.917 427.872 321.528L424.027 317.683"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                id="Vector 41_3"
                d="M435.283 299.642L438.262 296.663"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                id="Vector 42_3"
                d="M436.772 302.787H441.076"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                id="Vector 43_3"
                d="M432.138 298.152L432.138 293.848"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
