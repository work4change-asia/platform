# Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the public-facing desktop header, mobile nav drawer, footer, and page stubs so all four site sections are navigable for unauthenticated MVP users.

**Architecture:** `PageLink` is the single active-state primitive shared between the desktop `Header` and mobile `NavDrawer`. `Header` owns drawer open/close state and renders `NavDrawer` as a child (keeping `layout.tsx` a server component). `Footer` is a pure server component. `NAV_LINKS` lives in `nav-links.ts` to avoid a circular import between `header.tsx` and `nav-drawer.tsx`.

**Tech Stack:** Next.js 15 App Router, React, Tailwind CSS v4 (CSS variable tokens via `@theme`), Vitest, TypeScript strict.

## Global Constraints

- No `any`, no type assertions (`as Foo`), no `!` non-null assertions, no `@ts-ignore` — enforced by Oxlint.
- Tailwind color tokens: `text-orange` (active), `text-teal` (inactive), `bg-teal` (footer background), `text-cream` (light text on dark). These are `@theme` CSS vars defined in `apps/web/app/globals.css`.
- Button variants available: `primary` (orange filled), `secondary` (teal filled), `outline` (teal border), `ghost`, `link`, `inverse`. Sizes: `sm`, `md`, `lg`, `icon`.
- `Button` renders a `<button>` element only — no `asChild`. Auth nav links use `NextLink` styled with exported `buttonVariants`.
- Icon imports: `import { MenuIcon } from "@/components/ui/icons"`, `import { CloseIcon } from "@/components/ui/icons"`.
- Test files: co-located, named `*.test.ts`. Vitest picks up `apps/**/*.test.ts`.
- All commits follow Conventional Commits: `feat:`, `fix:`, `chore:`, etc.
- Logo: use a text placeholder (`Work4Change Asia`) with a `{/* TODO: replace with <Logo /> once SVG assets are in the repo */}` comment. Do not leave unflagged blanks.
- Path alias `@/` maps to `apps/web/` (standard Next.js setup).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `apps/web/components/ui/button.tsx` | Modify | Export `buttonVariants` so nav links can be styled as buttons |
| `apps/web/components/navigation/nav-links.ts` | Create | Single source of truth for the four nav link definitions |
| `apps/web/components/navigation/nav-utils.ts` | Create | Pure `isNavLinkActive` helper — no React/Next.js imports, safe to test in Node |
| `apps/web/components/navigation/page-link.tsx` | Create | Active-aware nav item primitive; imports `isNavLinkActive` from `nav-utils.ts` |
| `apps/web/components/navigation/page-link.test.ts` | Create | Unit tests for `isNavLinkActive` (imports from `nav-utils.ts`, not the client component) |
| `apps/web/components/navigation/nav-drawer.tsx` | Create | Mobile slide-in panel (client) |
| `apps/web/components/navigation/header.tsx` | Create | Desktop top bar + hamburger; owns drawer state (client) |
| `apps/web/components/navigation/footer.tsx` | Create | Static 4-column footer (server) |
| `apps/web/app/(frontend)/layout.tsx` | Modify | Wire `<Header />` and `<Footer />` around `{children}` |
| `apps/web/app/(frontend)/about/page.tsx` | Create | Stub page |
| `apps/web/app/(frontend)/resource-links/page.tsx` | Create | Stub page |
| `apps/web/app/(frontend)/job-board/page.tsx` | Create | Stub page |
| `apps/web/app/(frontend)/opportunities/page.tsx` | Create | Stub page |

---

## Task 1: Export `buttonVariants` + NAV_LINKS config + PageLink primitive

**Files:**
- Modify: `apps/web/components/ui/button.tsx` (line 3 — add `export`)
- Create: `apps/web/components/navigation/nav-links.ts`
- Create: `apps/web/components/navigation/page-link.tsx`
- Create: `apps/web/components/navigation/page-link.test.ts`

**Interfaces:**
- Produces:
  - `buttonVariants(opts) → string` — exported CVA function for styling links as buttons
  - `NAV_LINKS: Array<{ href: string; label: string }>` — consumed by Task 2 and Task 3
  - `isNavLinkActive(pathname: string, href: string): boolean` — pure function in `nav-utils.ts`, no React/Next.js deps, safe to import in Node/Vitest
  - `PageLink({ href, label, icon?, onClick? }: PageLinkProps)` — consumed by Tasks 2 and 3

- [ ] **Step 1: Write the failing test**

  Create `apps/web/components/navigation/page-link.test.ts`:

  ```ts
  import { describe, expect, it } from "vitest";
  import { isNavLinkActive } from "./nav-utils";

  describe("isNavLinkActive", () => {
    it("matches root exactly", () => {
      expect(isNavLinkActive("/", "/")).toBe(true);
    });

    it("does not activate root for sub-paths", () => {
      expect(isNavLinkActive("/about", "/")).toBe(false);
    });

    it("matches exact non-root path", () => {
      expect(isNavLinkActive("/about", "/about")).toBe(true);
    });

    it("matches a nested path via prefix", () => {
      expect(isNavLinkActive("/job-board/123-product-designer", "/job-board")).toBe(true);
    });

    it("does not match a partial segment (no false prefix)", () => {
      expect(isNavLinkActive("/about-us", "/about")).toBe(false);
    });

    it("does not activate the wrong link", () => {
      expect(isNavLinkActive("/opportunities", "/job-board")).toBe(false);
    });
  });
  ```

- [ ] **Step 2: Run test to confirm it fails**

  ```bash
  pnpm test --reporter=verbose
  ```

  Expected: 6 failures — `nav-utils` does not exist yet.

- [ ] **Step 3: Export `buttonVariants` from `button.tsx`**

  In `apps/web/components/ui/button.tsx`, line 3, change:

  ```ts
  const buttonVariants = cva(
  ```

  to:

  ```ts
  export const buttonVariants = cva(
  ```

- [ ] **Step 4: Create `nav-utils.ts`**

  Create `apps/web/components/navigation/nav-utils.ts`:

  ```ts
  export function isNavLinkActive(pathname: string, href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }
  ```

- [ ] **Step 5: Create `nav-links.ts`**

  Create `apps/web/components/navigation/nav-links.ts`:

  ```ts
  export const NAV_LINKS = [
    { href: "/about", label: "About" },
    { href: "/job-board", label: "Job Board" },
    { href: "/opportunities", label: "Opportunities" },
    { href: "/resource-links", label: "Resource Links" },
  ] as const;
  ```

- [ ] **Step 6: Create `page-link.tsx`**

  Create `apps/web/components/navigation/page-link.tsx`:

  ```tsx
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
    const pathname = usePathname();
    const active = isNavLinkActive(pathname, href);

    return (
      <NextLink
        href={href}
        onClick={onClick}
        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
          active ? "text-orange" : "text-teal hover:text-orange"
        }`}
      >
        {icon}
        {label}
      </NextLink>
    );
  }
  ```

- [ ] **Step 7: Run tests — expect all 6 to pass**

  ```bash
  pnpm test --reporter=verbose
  ```

  Expected: 6 passing tests in `page-link.test.ts`.

- [ ] **Step 8: Type-check**

  ```bash
  pnpm typecheck
  ```

  Expected: zero errors.

- [ ] **Step 9: Commit**

  ```bash
  git add apps/web/components/ui/button.tsx apps/web/components/navigation/nav-utils.ts apps/web/components/navigation/nav-links.ts apps/web/components/navigation/page-link.tsx apps/web/components/navigation/page-link.test.ts
  git commit -m "feat: PageLink primitive + NAV_LINKS config + export buttonVariants"
  ```

---

## Task 2: Header

**Files:**
- Create: `apps/web/components/navigation/header.tsx`

**Interfaces:**
- Consumes: `PageLink` from `./page-link`, `NAV_LINKS` from `./nav-links`, `NavDrawer` from `./nav-drawer`, `MenuIcon` from `@/components/ui/icons`, `buttonVariants` from `@/components/ui/button`
- Produces: `Header()` — default export consumed by layout in Task 5

**Note:** `NavDrawer` (Task 3) must be created before this task compiles. Complete Tasks 2 and 3 before running `typecheck`.

- [ ] **Step 1: Create `header.tsx`**

  Create `apps/web/components/navigation/header.tsx`:

  ```tsx
  "use client";

  import { useState } from "react";
  import NextLink from "next/link";
  import { buttonVariants } from "@/components/ui/button";
  import { MenuIcon } from "@/components/ui/icons";
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
              <NextLink href="#" className={buttonVariants({ variant: "outline", size: "sm" })}>
                Login
              </NextLink>
              <NextLink href="#" className={buttonVariants({ variant: "primary", size: "sm" })}>
                Sign Up
              </NextLink>
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

        {drawerOpen && (
          <NavDrawer onClose={() => setDrawerOpen(false)} />
        )}
      </>
    );
  }
  ```

- [ ] **Step 2: Move to Task 3 immediately — do not typecheck yet**

  `NavDrawer` is imported above but not yet created. Continue to Task 3 before running any checks.

---

## Task 3: NavDrawer

**Files:**
- Create: `apps/web/components/navigation/nav-drawer.tsx`

**Interfaces:**
- Consumes: `PageLink` from `./page-link`, `NAV_LINKS` from `./nav-links`, `CloseIcon` from `@/components/ui/icons`, `buttonVariants` from `@/components/ui/button`
- Produces: `NavDrawer({ onClose }: NavDrawerProps)` — consumed by `Header`

- [ ] **Step 1: Add slide-in keyframe to `globals.css`**

  In `apps/web/app/globals.css`, append at the end of the file:

  ```css
  @keyframes slide-in-left {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  ```

- [ ] **Step 2: Create `nav-drawer.tsx`**

  Create `apps/web/components/navigation/nav-drawer.tsx`:

  ```tsx
  "use client";

  import { useEffect } from "react";
  import NextLink from "next/link";
  import { buttonVariants } from "@/components/ui/button";
  import { CloseIcon } from "@/components/ui/icons";
  import { NAV_LINKS } from "./nav-links";
  import { PageLink } from "./page-link";

  interface NavDrawerProps {
    onClose: () => void;
  }

  export function NavDrawer({ onClose }: NavDrawerProps) {
    useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }, []);

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl animate-[slide-in-left_200ms_ease_forwards]">
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
            <NextLink
              href="/"
              onClick={onClose}
              className="font-bold text-teal"
            >
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
              <PageLink
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={onClose}
              />
            ))}
          </nav>

          {/* Auth buttons */}
          <div className="flex flex-col gap-3 border-t border-gray-200 p-4">
            <NextLink
              href="#"
              onClick={onClose}
              className={buttonVariants({ variant: "outline", size: "md" })}
            >
              Login
            </NextLink>
            <NextLink
              href="#"
              onClick={onClose}
              className={buttonVariants({ variant: "primary", size: "md" })}
            >
              Sign Up
            </NextLink>
          </div>
        </div>
      </>
    );
  }
  ```

- [ ] **Step 3: Type-check both Tasks 2 and 3 together**

  ```bash
  pnpm typecheck
  ```

  Expected: zero errors.

- [ ] **Step 4: Lint**

  ```bash
  pnpm lint
  ```

  Expected: zero errors.

- [ ] **Step 5: Commit**

  ```bash
  git add apps/web/app/globals.css apps/web/components/navigation/header.tsx apps/web/components/navigation/nav-drawer.tsx
  git commit -m "feat: Header and NavDrawer components"
  ```

---

## Task 4: Footer

**Files:**
- Create: `apps/web/components/navigation/footer.tsx`

**Interfaces:**
- Consumes: `Link` from `next/link` (no icon dependencies)
- Produces: `Footer()` — consumed by layout in Task 5

- [ ] **Step 1: Create `footer.tsx`**

  Create `apps/web/components/navigation/footer.tsx`:

  ```tsx
  import NextLink from "next/link";

  export function Footer() {
    return (
      <footer className="bg-teal text-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Col 1: Logo + social */}
            <div>
              {/* TODO: replace with <Logo variant="light" /> once SVG assets are in the repo */}
              <p className="font-bold text-cream">Work4Change Asia</p>
              <div className="mt-4 flex gap-3">
                <NextLink
                  href="#"
                  aria-label="LinkedIn"
                  className="text-pale-blue hover:text-cream transition-colors"
                >
                  in
                </NextLink>
              </div>
            </div>

            {/* Col 2: About */}
            <div>
              <h3 className="mb-3 font-semibold text-cream">About</h3>
              <ul className="space-y-2 text-sm text-pale-blue">
                <li>
                  <NextLink href="/about" className="hover:text-cream transition-colors">
                    About Work4Change
                  </NextLink>
                </li>
                <li>
                  <NextLink href="#" className="hover:text-cream transition-colors">
                    FAQs
                  </NextLink>
                </li>
              </ul>
            </div>

            {/* Col 3: Explore All Jobs */}
            <div>
              <h3 className="mb-3 font-semibold text-cream">Explore All Jobs</h3>
              <ul className="space-y-2 text-sm text-pale-blue">
                <li>
                  <NextLink href="#" className="hover:text-cream transition-colors">
                    Post or Tag a Job Opening
                  </NextLink>
                </li>
                <li>
                  <NextLink href="/opportunities" className="hover:text-cream transition-colors">
                    Other Opportunities
                  </NextLink>
                </li>
                <li>
                  <NextLink href="#" className="hover:text-cream transition-colors">
                    Find Jobs by Country
                  </NextLink>
                </li>
                <li>
                  <NextLink href="#" className="hover:text-cream transition-colors">
                    Create an Account
                  </NextLink>
                </li>
              </ul>
            </div>

            {/* Col 4: Information */}
            <div>
              <h3 className="mb-3 font-semibold text-cream">Information</h3>
              <ul className="space-y-2 text-sm text-pale-blue">
                <li>
                  <NextLink href="#" className="hover:text-cream transition-colors">
                    Privacy
                  </NextLink>
                </li>
                <li>
                  <NextLink href="#" className="hover:text-cream transition-colors">
                    Terms of Use
                  </NextLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  ```

- [ ] **Step 2: Type-check**

  ```bash
  pnpm typecheck
  ```

  Expected: zero errors.

- [ ] **Step 3: Commit**

  ```bash
  git add apps/web/components/navigation/footer.tsx
  git commit -m "feat: Footer component"
  ```

---

## Task 5: Layout wiring + stub pages

**Files:**
- Modify: `apps/web/app/(frontend)/layout.tsx`
- Create: `apps/web/app/(frontend)/about/page.tsx`
- Create: `apps/web/app/(frontend)/resource-links/page.tsx`
- Create: `apps/web/app/(frontend)/job-board/page.tsx`
- Create: `apps/web/app/(frontend)/opportunities/page.tsx`

**Interfaces:**
- Consumes: `Header` from `@/components/navigation/header`, `Footer` from `@/components/navigation/footer`

- [ ] **Step 1: Update `layout.tsx`**

  Replace the full contents of `apps/web/app/(frontend)/layout.tsx`:

  ```tsx
  import type { Metadata } from "next";
  import { Manrope } from "next/font/google";
  import { Footer } from "@/components/navigation/footer";
  import { Header } from "@/components/navigation/header";
  import "../globals.css";

  const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
  });

  export const metadata: Metadata = {
    title: "Work4Change",
    description:
      "Career platform for the non-profit and impact sectors across Asia and Pacific.",
  };

  export default function FrontendLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en" className={manrope.variable}>
        <body className="font-sans">
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    );
  }
  ```

- [ ] **Step 2: Create stub pages**

  The layout already wraps `{children}` in `<main>`, so stub pages use `<section>` to avoid invalid nested `<main>` elements.

  Create `apps/web/app/(frontend)/about/page.tsx`:

  ```tsx
  export default function AboutPage() {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal">About</h1>
      </section>
    );
  }
  ```

  Create `apps/web/app/(frontend)/resource-links/page.tsx`:

  ```tsx
  export default function ResourceLinksPage() {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal">Resource Links</h1>
      </section>
    );
  }
  ```

  Create `apps/web/app/(frontend)/job-board/page.tsx`:

  ```tsx
  export default function JobBoardPage() {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal">Job Board</h1>
      </section>
    );
  }
  ```

  Create `apps/web/app/(frontend)/opportunities/page.tsx`:

  ```tsx
  export default function OpportunitiesPage() {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal">Opportunities</h1>
      </section>
    );
  }
  ```

- [ ] **Step 3: Type-check**

  ```bash
  pnpm typecheck
  ```

  Expected: zero errors.

- [ ] **Step 4: Lint**

  ```bash
  pnpm lint
  ```

  Expected: zero errors.

- [ ] **Step 5: Run tests**

  ```bash
  pnpm test
  ```

  Expected: all tests pass (including the 6 `isNavLinkActive` tests from Task 1).

- [ ] **Step 6: Start dev server and verify manually**

  ```bash
  pnpm dev
  ```

  Open `http://localhost:3000` and check:

  - [ ] Desktop (≥768px): sticky header shows logo, 4 nav links, Login + Sign Up buttons. No hamburger visible.
  - [ ] Mobile (<768px): sticky header shows logo and hamburger only. Tap hamburger → drawer slides in from left. Backdrop present. Close button (✕) closes drawer. Tapping a nav link closes drawer and navigates.
  - [ ] "Job Board" link is orange at `/job-board`. "Opportunities" is orange at `/opportunities`. `/about` activates "About". `/resource-links` activates "Resource Links".
  - [ ] `/job-board/anything` keeps "Job Board" orange (prefix match).
  - [ ] Footer is teal background on all pages, stacks to single column on mobile.
  - [ ] `/about` and `/resource-links` resolve (no 404). `/job-board` and `/opportunities` resolve.
  - [ ] Login and Sign Up buttons are inert (point to `#`).

- [ ] **Step 7: Commit**

  ```bash
  git add apps/web/app/\(frontend\)/layout.tsx apps/web/app/\(frontend\)/about/page.tsx apps/web/app/\(frontend\)/resource-links/page.tsx apps/web/app/\(frontend\)/job-board/page.tsx apps/web/app/\(frontend\)/opportunities/page.tsx
  git commit -m "feat: wire navigation into frontend layout + add stub pages"
  ```
