"use client";

import { useEffect, useRef, useState } from "react";
import { JobCard } from "./job-card";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import type { JobCardData } from "@/lib/home-data";

const PEEK_PX = 32;
const GAP_PX = 20;
const MAX_CARD_WIDTH_PX = 288; // matches JobCard's max-w-72

export type JobCarouselProps = {
  jobs: JobCardData[];
  featured?: boolean;
};

export function JobCarousel({ jobs, featured = false }: JobCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const size = entries[0]?.borderBoxSize[0]?.inlineSize;
      if (size) setContainerWidth(Math.round(size));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardWidth = Math.min(containerWidth - PEEK_PX, MAX_CARD_WIDTH_PX);
  const stepPx = cardWidth + GAP_PX;

  const prev = () => setCurrent((i) => Math.max(0, i - 1));
  const next = () => setCurrent((i) => Math.min(jobs.length - 1, i + 1));

  return (
    <div>
      <div className="mb-3 flex justify-end gap-2">
        <button
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-950 text-gray-950 transition-colors hover:border-teal-light hover:text-teal-light disabled:opacity-30"
        >
          <ArrowLeftIcon size={22} />
        </button>
        <button
          onClick={next}
          disabled={current === jobs.length - 1}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-950 text-gray-950 transition-colors hover:border-teal-light hover:text-teal-light disabled:opacity-30"
        >
          <ArrowRightIcon size={22} />
        </button>
      </div>

      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${current * stepPx}px)`, gap: GAP_PX }}
        >
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{ minWidth: containerWidth > 0 ? cardWidth : "calc(100% - 32px)" }}
            >
              <JobCard {...job} featured={featured} />
            </div>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        Slide {current + 1} of {jobs.length}
      </p>
    </div>
  );
}
