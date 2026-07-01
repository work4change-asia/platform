import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-orange text-cream hover:bg-rust focus-visible:outline-orange disabled:bg-orange-light disabled:text-cream",
        secondary:
          "bg-teal text-cream hover:bg-black focus-visible:outline-teal disabled:bg-gray-200 disabled:text-cream",
        outline:
          "border-[1.5px] border-teal text-teal bg-transparent hover:bg-gray-200 focus-visible:outline-teal disabled:border-gray-200 disabled:text-gray-200 disabled:bg-transparent",
        ghost: "text-teal hover:bg-teal/10 focus-visible:outline-teal disabled:opacity-50",
        link: "text-teal-light underline-offset-4 hover:text-teal-dark hover:underline focus-visible:outline-teal-light disabled:text-teal-muted disabled:no-underline",
        inverse:
          "border-[1.5px] border-cream text-cream bg-transparent hover:bg-white/20 focus-visible:outline-cream disabled:opacity-50",
      },
      size: {
        sm: "h-11 rounded-pill px-6 text-sm",
        md: "h-12 rounded-pill px-6 text-sm",
        lg: "h-16 rounded-pill px-[38px] text-sm",
        icon: "size-11 rounded-pill",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    rightIcon?: React.ReactNode;
  };

export function Button({ className, variant, size, rightIcon, children, ...props }: ButtonProps) {
  const hasIcon = Boolean(rightIcon);
  const iconPadding =
    hasIcon && size !== "icon" ? (size === "lg" ? "pl-[38px] pr-[28px]" : "pl-6 pr-4") : undefined;

  return (
    <button
      type="button"
      className={twMerge(buttonVariants({ variant, size }), iconPadding, className)}
      {...props}
    >
      {children}
      {rightIcon}
    </button>
  );
}
