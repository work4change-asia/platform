import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function AdIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="474 409 64 64"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Ad icon">
        <g id="Group 638_2">
          <g id="Group 637_2">
            <path
              id="Vector 39_2"
              d="M512.538 444.269L504.179 448.2L503.414 449.027C501.566 451.023 498.436 451.101 496.49 449.2C494.538 447.294 494.55 444.152 496.514 442.26L497.393 441.414L500.869 433.304"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <rect
              id="Rectangle 9706_2"
              x="499.883"
              y="431.841"
              width="4.11277"
              height="19.0298"
              rx="2.05638"
              transform="rotate(-45 499.883 431.841)"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              id="Vector 40_2"
              d="M497.558 441.414L508.148 452.282C509.019 453.176 508.575 454.679 507.357 454.956C506.821 455.078 506.261 454.916 505.872 454.528L502.027 450.683"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              id="Vector 41_2"
              d="M513.283 432.641L516.263 429.662"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              id="Vector 42_2"
              d="M514.773 435.787H519.076"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              id="Vector 43_2"
              d="M510.138 431.151L510.138 426.848"
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
