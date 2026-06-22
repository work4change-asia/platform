import type { IconProps } from "./icon";

export function FinanceIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="888 276 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <path
            d="M912.519 297.019L933.671 299.086C935.876 299.301 937.486 301.268 937.262 303.472L935.78 318.021C935.556 320.219 933.593 321.819 931.395 321.595L906.752 319.085C905.157 318.922 904.011 317.476 904.218 315.886"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="903.081"
            y="294.75"
            width="30.1968"
            height="21.1406"
            rx="3.25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <g>
            <mask id="path-155-inside-6_1_18642" fill="white">
              <rect x="920.444" y="307.584" width="10.5656" height="6.03749" rx="1" />
            </mask>
            <rect
              x="920.444"
              y="307.584"
              width="10.5656"
              height="6.03749"
              rx="1"
              stroke="currentColor"
              strokeWidth="3"
              mask="url(#path-155-inside-6_1_18642)"
            />
          </g>
          <path
            d="M903.086 301.924H933.273"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M904.595 305.32H909.123"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M904.595 307.584H912.142"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M911.387 305.32L916.67 305.32"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M914.406 307.584L916.67 307.584"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M903.086 297.019H933.273"
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
