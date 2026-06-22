import NextLink from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface AuthButtonsProps {
  size: "sm" | "md";
  onClick?: () => void;
}

export function AuthButtons({ size, onClick }: AuthButtonsProps) {
  return (
    <>
      <NextLink
        href="#"
        {...(onClick !== undefined && { onClick })}
        className={buttonVariants({ variant: "outline", size })}
      >
        Login
      </NextLink>
      <NextLink
        href="#"
        {...(onClick !== undefined && { onClick })}
        className={buttonVariants({ variant: "primary", size })}
      >
        Sign Up
      </NextLink>
    </>
  );
}
