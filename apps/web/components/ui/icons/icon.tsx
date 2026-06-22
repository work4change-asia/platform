import type { SVGProps } from "react";

/**
 * Shared props for every icon in the design system.
 *
 * Icons render at `currentColor`, so color comes from Tailwind `text-*` tokens.
 * `size` sets both width and height; the source `viewBox` handles scaling.
 */
export type IconProps = Omit<SVGProps<SVGSVGElement>, "width" | "height"> & {
  size?: number | string;
};
