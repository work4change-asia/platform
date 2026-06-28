import Image from "next/image";
import NextLink from "next/link";
import { BubblePanel } from "@/components/ui/bubble-panel";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  return (
    // Percentage horizontal padding keeps the BubblePanel at ~79% viewport width
    // at any desktop size, matching the Figma proportions.
    <section className="px-4 py-8 sm:px-6 lg:px-[10.5%]">
      <BubblePanel
        variant="teal"
        shape="large"
        className="min-h-[520px] px-6 py-12 sm:min-h-0 sm:px-14 sm:py-16 lg:px-16 lg:py-20"
        media={
          <Image
            src="/images/worldmap.svg"
            alt=""
            aria-hidden="true"
            fill
            priority
            className="object-contain object-top sm:object-right opacity-90"
          />
        }
      >
        <div className="max-w-xl pt-52 sm:pt-0">
          <h1 className="text-h5 font-semibold text-cream sm:text-h2">
            Your gateway to{" "}
            <span className="text-orange">purpose-driven careers</span>{" "}
            across Asia
          </h1>
          <div className="mt-5 flex flex-wrap gap-3">
            <NextLink
              href="/job-board"
              className={buttonVariants({ variant: "primary", size: "sm" })}
            >
              Jobs
            </NextLink>
            <NextLink
              href="/opportunities"
              className={buttonVariants({ variant: "inverse", size: "sm" })}
            >
              Opportunities
            </NextLink>
          </div>
        </div>
      </BubblePanel>
    </section>
  );
}
