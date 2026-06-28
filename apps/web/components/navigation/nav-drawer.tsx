"use client";

import { useEffect } from "react";
import NextLink from "next/link";
import { CloseIcon } from "@/components/ui/icons";
import { AuthButtons } from "./auth-buttons";
import { NAV_LINKS } from "./nav-links";
import { PageLink } from "./page-link";

interface NavDrawerProps {
  onClose: () => void;
}

export function NavDrawer({ onClose }: NavDrawerProps) {
  useEffect(() => {
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prior;
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} aria-hidden="true" />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl animate-[slide-in-left_200ms_ease_forwards]">
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <NextLink href="/" onClick={onClose} className="font-bold text-teal">
            {/* TODO: replace with <Logo /> once SVG assets are in the repo */}
            Work4Change Asia
          </NextLink>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-teal"
            aria-label="Close navigation menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col gap-1 px-4 py-6" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <PageLink key={link.href} href={link.href} label={link.label} onClick={onClose} />
          ))}
        </nav>

        {/* Auth buttons */}
        <div className="flex flex-col gap-3 border-t border-gray-200 p-4">
          <AuthButtons size="md" onClick={onClose} />
        </div>
      </div>
    </>
  );
}
