"use client";

import { JobCard } from "./job-card";
import {
  CarouselArrows,
  CarouselCard,
  CarouselDots,
  CarouselLiveRegion,
} from "./carousel-primitives";
import { useCarousel } from "@/hooks/use-carousel";
import type { JobCardData } from "@/lib/home-data";

const GAP_PX = 20;
const MAX_CARD_WIDTH_PX = 288; // matches JobCard's max-w-72

export type JobCarouselProps = {
  jobs: JobCardData[];
  featured?: boolean;
  /** Tailwind gradient-from class matching the carousel's background, e.g. "from-cream" */
  edgeFadeFrom: string;
};

export function JobCarousel({ jobs, featured = false, edgeFadeFrom }: JobCarouselProps) {
  const { containerRef, containerWidth, current, cardWidth, offset, maxOffset, goTo, prev, next } =
    useCarousel({
      count: jobs.length,
      cardWidth: (containerWidth) => Math.min(containerWidth, MAX_CARD_WIDTH_PX),
      gapPx: GAP_PX,
    });

  return (
    <div>
      <CarouselArrows
        onPrev={prev}
        onNext={next}
        prevDisabled={current === 0}
        nextDisabled={current === jobs.length - 1}
      />

      <div ref={containerRef} className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${offset}px)`, gap: GAP_PX }}
        >
          {jobs.map((job, index) => (
            <CarouselCard
              key={job.id}
              isCurrent={index === current}
              width={containerWidth > 0 ? cardWidth : "calc(100% - 32px)"}
            >
              <JobCard {...job} featured={featured} />
            </CarouselCard>
          ))}
        </div>

        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r ${edgeFadeFrom} to-transparent transition-opacity duration-300 sm:w-10 ${offset === 0 ? "opacity-0" : "opacity-60"}`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l ${edgeFadeFrom} to-transparent transition-opacity duration-300 sm:w-10 ${offset >= maxOffset ? "opacity-0" : "opacity-60"}`}
        />
      </div>

      <CarouselDots count={jobs.length} current={current} onSelect={goTo} />
      <CarouselLiveRegion current={current} count={jobs.length} />
    </div>
  );
}
