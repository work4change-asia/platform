import NextLink from "next/link";
import { BubblePanel } from "@/components/ui/bubble-panel";
import { buttonVariants } from "@/components/ui/button";

export function JoinUsCta() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <BubblePanel
        variant="orange"
        shape="standard"
        className="flex min-h-[280px] items-center px-10 py-10 sm:px-16"
        media={
          <img
            src="/images/worldmap-dots-job-details.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-bottom opacity-40"
          />
        }
      >
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 className="mb-2 text-h4 font-semibold text-teal">Join Us</h2>
            <p className="text-sm text-teal">
              Curious about this content? Join our community and create your profile to explore more
              opportunities!
            </p>
          </div>
          <div className="flex w-full max-w-md gap-3 lg:shrink-0">
            <input
              type="email"
              placeholder="Email Address"
              className="h-12 flex-1 rounded-pill bg-white px-5 text-sm text-charcoal placeholder:text-pale-blue focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
            />
            <NextLink href="#" className={buttonVariants({ variant: "secondary", size: "md" })}>
              Submit
            </NextLink>
          </div>
        </div>
      </BubblePanel>
    </div>
  );
}
