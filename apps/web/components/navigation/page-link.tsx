"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { isNavLinkActive } from "./nav-utils";

interface PageLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function PageLink({ href, label, icon, onClick }: PageLinkProps) {
  const pathname = usePathname() ?? "";
  const active = isNavLinkActive(pathname, href);

  return (
    <NextLink
      href={href}
      {...(onClick !== undefined && { onClick })}
      className={`flex items-center gap-2 text-sm font-medium transition-colors ${
        active ? "text-orange" : "text-teal hover:text-orange"
      }`}
    >
      {icon}
      {label}
    </NextLink>
  );
}
