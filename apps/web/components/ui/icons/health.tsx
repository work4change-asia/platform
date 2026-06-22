import type { IconProps } from "./icon";

export function HealthIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="806 276 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <rect
            x="824.241"
            y="300.215"
            width="27.5171"
            height="19.8361"
            rx="3.25"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M832.879 299.465V297.198C832.879 296.094 833.775 295.198 834.879 295.198H841.121C842.225 295.198 843.121 296.094 843.121 297.198V299.465"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g>
            <path
              d="M838 306.292V313.546"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M841.631 309.916L834.377 309.916"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
