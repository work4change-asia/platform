import type { IconProps } from "./icon";

export function EditIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1500 742 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <path
            d="M1505.72 756H1502.53C1502.39 756 1502.26 755.944 1502.16 755.844C1502.06 755.745 1502 755.61 1502 755.469V752.501C1502 752.431 1502.01 752.362 1502.04 752.298C1502.07 752.233 1502.11 752.175 1502.16 752.125L1510.13 744.156C1510.22 744.056 1510.36 744 1510.5 744C1510.64 744 1510.78 744.056 1510.88 744.156L1513.84 747.123C1513.94 747.223 1514 747.358 1514 747.499C1514 747.64 1513.94 747.775 1513.84 747.875L1505.72 756Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1508.38 745.905L1512.09 749.624"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1513.69 756H1505.72L1502.03 752.314"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
