import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { twMerge } from "tailwind-merge";

type LinkVariant = "default" | "muted" | "nav";

type LinkProps = NextLinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> & {
    variant?: LinkVariant;
  };

const variantClasses: Record<LinkVariant, string> = {
  default:
    "text-teal-light underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-light",
  muted:
    "text-pale-blue hover:text-charcoal underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pale-blue",
  nav: "text-charcoal font-medium hover:text-teal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
};

export function Link({ className, variant = "default", ...props }: LinkProps) {
  return (
    <NextLink
      className={twMerge(variantClasses[variant], className)}
      {...props}
    />
  );
}
