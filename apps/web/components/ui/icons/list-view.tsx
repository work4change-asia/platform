import type { IconProps } from "./icon";

export function ListViewIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="1" y="2" width="14" height="5" rx="1" fill="currentColor" />
      <rect x="1" y="9" width="14" height="5" rx="1" fill="currentColor" />
    </svg>
  );
}
