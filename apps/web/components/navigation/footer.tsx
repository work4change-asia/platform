import Image from "next/image";
import NextLink from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">

          {/* Left: logo + social */}
          <div className="flex flex-col gap-10">
            <Image
              src="/logos/dark/Dark logo vector.svg"
              alt="Work4Change Asia"
              width={120}
              height={60}
              className="h-10 w-auto"
            />

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <NextLink
                href="#"
                aria-label="Buy Me a Coffee"
                className="flex h-8 w-8 items-center justify-center rounded text-gray-400 transition-colors hover:text-white"
              >
                ☕
              </NextLink>
              <NextLink
                href="#"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded border border-gray-600 text-sm font-bold text-gray-400 transition-colors hover:border-white hover:text-white"
              >
                in
              </NextLink>
            </div>
          </div>

          {/* Right: nav columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-16">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">About</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <NextLink href="/about" className="transition-colors hover:text-white">
                    More about Work4Change Asia
                  </NextLink>
                </li>
                <li>
                  <NextLink href="#" className="transition-colors hover:text-white">
                    FAQs
                  </NextLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">Explore All jobs</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <NextLink href="#" className="transition-colors hover:text-white">
                    Post or flag a job opening
                  </NextLink>
                </li>
                <li>
                  <NextLink href="/opportunities" className="transition-colors hover:text-white">
                    Other opportunities
                  </NextLink>
                </li>
                <li>
                  <NextLink href="#" className="transition-colors hover:text-white">
                    Create an account
                  </NextLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">Information</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <NextLink href="#" className="transition-colors hover:text-white">
                    Privacy
                  </NextLink>
                </li>
                <li>
                  <NextLink href="#" className="transition-colors hover:text-white">
                    Terms of Use
                  </NextLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="py-4 text-center text-xs text-gray-500">
        ©Work4Change Asia. 2026
      </div>
    </footer>
  );
}
