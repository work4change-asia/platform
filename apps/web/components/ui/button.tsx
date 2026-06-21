import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-orange text-white hover:bg-orange/90 focus-visible:outline-orange",
        secondary:
          "bg-teal text-white hover:bg-teal/90 focus-visible:outline-teal",
        outline:
          "border border-teal text-teal bg-transparent hover:bg-teal hover:text-white focus-visible:outline-teal",
        ghost: "text-teal hover:bg-teal/10 focus-visible:outline-teal",
        link: "text-teal-light underline-offset-4 hover:underline focus-visible:outline-teal-light",
      },
      size: {
        sm: "h-8 rounded-pill px-4 text-sm",
        md: "h-11 rounded-pill px-6 text-base",
        lg: "h-13 rounded-pill px-8 text-lg",
        icon: "size-9 rounded-pill",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
