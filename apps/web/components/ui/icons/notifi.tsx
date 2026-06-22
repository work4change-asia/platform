import { twMerge } from "tailwind-merge";
import type { IconProps } from "./icon";

export function NotifiIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="537 671 32 32"
      fill="none"
      aria-hidden="true"
      className={twMerge(className)}
      {...props}
    >
      <g id="Notifi icon">
        <g id="Group 1321315707">
          <path
            id="Vector_7"
            d="M544.487 685.155C544.484 684.065 544.696 682.985 545.111 681.978C545.526 680.97 546.136 680.054 546.905 679.282C547.675 678.511 548.589 677.898 549.596 677.48C550.602 677.063 551.681 676.848 552.771 676.848C553.861 676.848 554.94 677.063 555.947 677.48C556.953 677.898 557.868 678.511 558.637 679.282C559.407 680.054 560.017 680.97 560.431 681.978C560.846 682.985 561.058 684.065 561.055 685.155V685.155C561.055 689.287 561.92 691.685 562.681 692.996C562.763 693.136 562.807 693.295 562.808 693.457C562.809 693.62 562.767 693.779 562.686 693.92C562.606 694.061 562.49 694.178 562.349 694.26C562.209 694.342 562.05 694.385 561.887 694.385H543.654C543.492 694.385 543.332 694.342 543.192 694.26C543.052 694.178 542.935 694.061 542.855 693.92C542.774 693.779 542.733 693.62 542.733 693.457C542.734 693.295 542.778 693.136 542.86 692.996C543.622 691.685 544.487 689.287 544.487 685.155H544.487Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_8"
            d="M549.078 694.385V695.308C549.078 696.287 549.467 697.226 550.16 697.918C550.852 698.611 551.791 699 552.77 699C553.75 699 554.689 698.611 555.381 697.918C556.074 697.226 556.463 696.287 556.463 695.308V694.385"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_9"
            d="M559.166 675C561.044 676.186 562.558 677.867 563.541 679.859"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Vector_10"
            d="M542 679.859C542.982 677.867 544.497 676.186 546.375 675"
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
