import type { IconProps } from "./icon";

export function EducationIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="720 409 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <path
            d="M750.445 431.133L738.243 435.895C738.159 435.928 738.157 436.045 738.24 436.08L750.745 441.439C750.77 441.45 750.798 441.45 750.823 441.44L763.62 436.083C763.704 436.048 763.702 435.928 763.616 435.896L750.515 431.133C750.492 431.124 750.467 431.124 750.445 431.133Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M743.182 438.72V446.907C743.182 446.921 743.185 446.935 743.191 446.948C743.813 448.271 746.184 450.881 750.782 450.881C755.381 450.881 757.752 448.271 758.374 446.948C758.38 446.935 758.383 446.921 758.383 446.907V438.72"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M763.552 435.984V441.76"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="763.553" cy="444.192" r="1.68212" stroke="currentColor" strokeWidth="1.5" />
        </g>
      </g>
    </svg>
  );
}
