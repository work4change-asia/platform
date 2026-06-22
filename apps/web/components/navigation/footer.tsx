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
                className="text-pale-blue transition-colors hover:text-cream"
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
                <NextLink href="/about" className="transition-colors hover:text-cream">
                  About Work4Change
                </NextLink>
              </li>
              <li>
                <NextLink href="#" className="transition-colors hover:text-cream">
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
                <NextLink href="#" className="transition-colors hover:text-cream">
                  Post or Tag a Job Opening
                </NextLink>
              </li>
              <li>
                <NextLink href="/opportunities" className="transition-colors hover:text-cream">
                  Other Opportunities
                </NextLink>
              </li>
              <li>
                <NextLink href="#" className="transition-colors hover:text-cream">
                  Find Jobs by Country
                </NextLink>
              </li>
              <li>
                <NextLink href="#" className="transition-colors hover:text-cream">
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
                <NextLink href="#" className="transition-colors hover:text-cream">
                  Privacy
                </NextLink>
              </li>
              <li>
                <NextLink href="#" className="transition-colors hover:text-cream">
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
