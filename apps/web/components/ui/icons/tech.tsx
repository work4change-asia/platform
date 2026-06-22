import type { IconProps } from "./icon";

export function TechIcon({ size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="478 276 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <g>
        <g>
          <rect
            x="496.224"
            y="297.25"
            width="27.5527"
            height="17.8685"
            rx="1.25"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M514.54 301.645L517.776 304.188C518.285 304.588 518.285 305.36 517.776 305.76L514.54 308.303"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M505.158 308.303L501.922 305.76C501.412 305.36 501.412 304.588 501.922 304.187L505.158 301.645"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M507.579 315.566L506.418 318.081C506.112 318.744 506.596 319.5 507.326 319.5H512.562C513.319 319.5 513.802 318.692 513.443 318.026L512.118 315.566"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M511.513 301.342L508.184 308.303"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}
