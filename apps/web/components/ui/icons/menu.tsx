import type { IconProps } from "./icon";

export function MenuIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="1432 742 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <g>
            <circle cx="1435.48" cy="750.2" r="1.47539" fill="currentColor" />
            <circle cx="1440" cy="750.2" r="1.47539" fill="currentColor" />
            <circle cx="1444.52" cy="750.2" r="1.47539" fill="currentColor" />
          </g>
        </g>
      </g>
    </svg>
  );
}
