import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-orange text-cream hover:bg-rust focus-visible:outline-orange",
        secondary:
          "bg-teal text-cream hover:bg-black focus-visible:outline-teal",
        outline:
          "border-[1.5px] border-teal text-teal bg-transparent hover:bg-gray-100 focus-visible:outline-teal",
        ghost: "text-teal hover:bg-teal/10 focus-visible:outline-teal",
        link: "text-teal-light underline-offset-4 hover:underline focus-visible:outline-teal-light",
        inverse:
          "border-[1.5px] border-cream text-cream bg-transparent hover:bg-white/20 focus-visible:outline-cream",
      },
      size: {
        sm: "h-11 rounded-pill px-6 text-base",
        md: "h-12 rounded-pill px-6 text-base",
        lg: "h-16 rounded-pill px-[38px] text-base",
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
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
