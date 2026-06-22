import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-pill px-3 py-1 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        "full-time": "bg-badge-teal-bg text-teal-light",
        "part-time": "bg-badge-yellow-bg text-badge-yellow-text",
        location: "bg-brown/20 text-brown",
        filter: "bg-cream text-brown gap-1",
        active: "bg-orange text-cream",
        inactive: "bg-white text-charcoal border border-gray-100",
        success: "bg-success/10 text-success",
        danger: "bg-danger/10 text-danger",
      },
    },
    defaultVariants: {
      variant: "full-time",
    },
  },
);

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={twMerge(badgeVariants({ variant }), className)} {...props} />;
}
