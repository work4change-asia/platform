import Image from "next/image";
import NextLink from "next/link";
import { BubblePanel } from "@/components/ui/bubble-panel";
import { buttonVariants } from "@/components/ui/button";
import { StatItem } from "@/components/ui/stat-item";
import type { StatData } from "@/lib/home-data";

type StatsProps = {
  stats: StatData[];
};

export function Stats({ stats }: StatsProps) {
  return (
    <section className="relative bg-gray-950 py-16 lg:py-20">
      <Image
        src="/images/singapore.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        loading="eager"
        className="object-cover opacity-20"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* CTA card */}
          <BubblePanel variant="orange" shape="large" className="px-8 py-10">
            <h2 className="mb-8 text-h5 font-semibold text-teal">
              Join our community of opportunity seekers &amp; providers!
            </h2>
            <NextLink
              href="/job-board"
              className={buttonVariants({ variant: "secondary", size: "md" })}
            >
              Create An Account
            </NextLink>
          </BubblePanel>

          {/* Stats grid */}
          <div className="flex flex-wrap gap-x-10 gap-y-8">
            {stats.map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
