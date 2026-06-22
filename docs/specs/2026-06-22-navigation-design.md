# Navigation Design: Header, Footer, NavDrawer, PageLink

**Date:** 2026-06-22
**Status:** Approved

---

## Approach

Option B: full responsive navigation in one spec. Desktop uses a sticky horizontal top bar; mobile collapses to a logo + hamburger that opens a slide-in drawer. A shared `PageLink` primitive drives active state in both surfaces. A static `Footer` closes every page.

---

## Scope

**Included:**

- `PageLink` — nav item primitive with active/inactive states
- `Header` — desktop horizontal top bar (client component)
- `NavDrawer` — mobile slide-in panel (client component)
- `Footer` — 4-column desktop / stacked mobile (server component)
- Wiring into `app/(frontend)/layout.tsx`
- Stub pages for `/about` and `/resource-links`

**Excluded:**

- Authenticated nav state (avatar, notifications, user menu) — V3
- Auth functionality behind Login / Sign Up buttons — V2/V3; buttons render as designed but point to `#` for MVP
- Focus trap / full WCAG keyboard navigation in the drawer — post-MVP
- Skip-to-content link — post-MVP
- Search bar in the top nav — post-MVP
- Body scroll-lock layout shift fix (scrollbar-width compensation) — post-MVP

---

## Section 1: Components

### PageLink

Shared primitive for a single nav item. Used in both `Header` and `NavDrawer`.

- Props: `href: string`, `label: string`, `icon?: React.ReactNode`
- Uses `usePathname()` to derive active state
- Active match: `pathname === href` for `/`, `pathname === href || pathname.startsWith(href + "/")` for all other routes (so `/job-board/123-slug` keeps "Job Board" active without false-matching `/about-us` for `/about`)
- Active style: orange text (`text-brand-orange` or equivalent token)
- Inactive style: dark teal text
- Client component (`"use client"`)

### Header

Sticky horizontal top bar. Client component (needs pathname + drawer open state). **`NavDrawer` is rendered as a child inside `Header`'s JSX** — not as a sibling in `layout.tsx`. This keeps `layout.tsx` a server component.

**Desktop (`md`+):**
- Logo left
- `PageLink` row center-right: About | Job Board | Opportunities | Resource Links
- Auth buttons right: Login (outline) + Sign Up (orange filled)
- Nav links and auth buttons hidden below `md`

**Mobile (below `md`):**
- Logo left
- Hamburger button right (uses existing `menu.tsx` icon)
- Nav links and auth buttons hidden

`NAV_LINKS` is defined once at the top of `header.tsx` and imported by `NavDrawer` from there, so both surfaces share a single source of truth:

```ts
export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/job-board", label: "Job Board" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/resource-links", label: "Resource Links" },
]
```

### NavDrawer

Mobile slide-in panel rendered inside `Header`. Receives `isOpen: boolean` and `onClose: () => void` as props. **Conditionally mounted** (not CSS-hidden) so the scroll-lock `useEffect` does not run on desktop:

```tsx
{isOpen && <NavDrawer isOpen={isOpen} onClose={onClose} />}
```

- Slides in from the left: `transform: translateX(-100%)` → `translateX(0)`, 200ms ease
- Semi-transparent backdrop behind the drawer; click closes it
- Close button (✕) in the top-right corner of the drawer
- Content: logo at top, `PageLink` stack in the middle (uses `NAV_LINKS` from `header.tsx`), Login + Sign Up buttons at the bottom
- `aria-hidden` is not needed since the drawer is unmounted when closed
- Body scroll lock when open: `document.body.style.overflow = "hidden"` via `useEffect`, cleaned up on close

### Footer

Server component. No interactivity.

**Desktop (4 columns):**
1. Logo + social links (LinkedIn, etc.)
2. About (About Work4Change, FAQs)
3. Explore All Jobs (Post or Tag a Job Opening, Other Opportunities, Find Jobs by Country, Create an Account)
4. Information (Privacy, Terms of Use)

**Mobile:** columns stack vertically, full width.

---

## Section 2: Layout wiring

`app/(frontend)/layout.tsx` wraps all public pages:

```tsx
<html lang="en" className={manrope.variable}>
  <body className="font-sans">
    <Header />
    <main>{children}</main>
    <Footer />
  </body>
</html>
```

File locations:

```
apps/web/components/
  navigation/
    header.tsx        ← Header (client)
    nav-drawer.tsx    ← NavDrawer (client)
    footer.tsx        ← Footer (server)
    page-link.tsx     ← PageLink primitive (client)
```

---

## Section 3: Stub routes

Both return a bare `<main>` with a heading. Enough to confirm routing and active nav state work.

- `app/(frontend)/about/page.tsx`
- `app/(frontend)/resource-links/page.tsx`

`/job-board` and `/opportunities` stubs are added here if not yet created.

---

## Section 4: Responsive breakpoints

Breakpoint: `md` (768px).

| Surface    | Below `md`                          | `md`+                              |
| ---------- | ----------------------------------- | ---------------------------------- |
| Header     | Logo + hamburger only               | Full bar: logo, links, auth        |
| NavDrawer  | Opens on hamburger tap              | Not mounted (conditionally rendered in Header) |
| Footer     | Columns stacked vertically          | 4-column grid                      |

---

## Definition of Done

- [ ] `PageLink` shows orange on the active route, teal otherwise, across desktop and mobile
- [ ] Desktop header is sticky and renders all four nav links + auth buttons at `md`+
- [ ] Hamburger appears below `md`; tapping it opens the drawer
- [ ] Drawer closes on backdrop click, close button, or nav link tap
- [ ] Body scroll is locked while drawer is open and restored on close
- [ ] Footer renders correctly at both breakpoints
- [ ] `/about` and `/resource-links` routes resolve without 404
- [ ] `pnpm typecheck` passes with zero errors
- [ ] `pnpm lint` passes with zero errors
- [ ] `pnpm test` passes (no new tests required for pure UI, but suite must not regress)
