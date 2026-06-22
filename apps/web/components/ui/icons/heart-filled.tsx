import type { IconProps } from "./icon";

export function HeartFilledIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="436 671 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <path
          d="M457.1 676C455.075 676 453.275 676.92 452 678.453C450.725 676.92 448.925 676 446.9 676C443.075 676 440 679.373 440 683.59C440 684.74 440.15 685.813 440.525 686.81C440.525 686.81 440.825 687.73 441.05 688.267C443.975 694.783 452 699 452 699C452 699 460.025 694.783 462.95 688.19C462.95 688.19 463.325 687.347 463.475 686.733C463.775 685.737 464 684.663 464 683.513C464 679.373 460.925 676 457.1 676Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
