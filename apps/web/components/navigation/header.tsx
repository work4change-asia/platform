"use client";

import { useState } from "react";
import NextLink from "next/link";
import { MenuIcon } from "@/components/ui/icons";
import { AuthButtons } from "./auth-buttons";
import { NAV_LINKS } from "./nav-links";
import { NavDrawer } from "./nav-drawer";
import { PageLink } from "./page-link";

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <NextLink href="/" className="flex-shrink-0 font-bold text-teal">
            {/* TODO: replace with <Logo /> once SVG assets are in the repo */}
            Work4Change Asia
          </NextLink>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <PageLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <AuthButtons size="sm" />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 text-teal"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {drawerOpen && <NavDrawer onClose={() => setDrawerOpen(false)} />}
    </>
  );
}
