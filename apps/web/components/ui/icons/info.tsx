import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function InfoIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="556 409 64 64"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Info icon">
        <path
          id="i"
          d="M584 453V451.898L587.069 451.175V438.194L584 437.849V437.057L589.069 435.783H589.931V451.175L593 451.898V453H584ZM588.379 433.029C587.782 433.029 587.287 432.834 586.897 432.443C586.506 432.053 586.31 431.571 586.31 430.997C586.31 430.4 586.506 429.918 586.897 429.551C587.287 429.184 587.782 429 588.379 429C588.977 429 589.471 429.184 589.862 429.551C590.253 429.918 590.448 430.4 590.448 430.997C590.448 431.571 590.253 432.053 589.862 432.443C589.471 432.834 588.977 433.029 588.379 433.029Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
