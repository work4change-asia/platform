"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { JobCard } from "@/components/ui/job-card";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import type { JobCardData } from "@/lib/home-data";

const PEEK_PX = 32;
const GAP_PX = 20;
const MAX_CARD_WIDTH_PX = 288; // matches JobCard's max-w-72

type FeaturedJobsProps = {
  jobs: JobCardData[];
};

export function FeaturedJobs({ jobs }: FeaturedJobsProps) {
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
    <section className="bg-cream py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-tiny font-semibold uppercase tracking-widest text-orange">
            Start Here, Find Purpose
          </p>
          <h2 className="text-h4 font-semibold text-teal">Fresh from the Field</h2>
        </div>

        {/* Carousel arrows — mobile only */}
        <div className="mb-3 flex justify-end gap-2 sm:hidden">
          <button
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-teal-light hover:text-teal-light disabled:opacity-30"
          >
            <ArrowLeftIcon size={22} />
          </button>
          <button
            onClick={next}
            disabled={current === jobs.length - 1}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-teal-light hover:text-teal-light disabled:opacity-30"
          >
            <ArrowRightIcon size={22} />
          </button>
        </div>

        {/* Mobile carousel */}
        <div ref={containerRef} className="overflow-hidden sm:hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * stepPx}px)`, gap: GAP_PX }}
          >
            {jobs.map((job) => (
              <div
                key={job.id}
                style={{ minWidth: containerWidth > 0 ? cardWidth : "calc(100% - 32px)" }}
              >
                <JobCard {...job} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop grid — fixed card-width columns so cards never stretch past their square size */}
        <div className="hidden sm:grid sm:grid-cols-[repeat(auto-fill,18rem)] sm:justify-center sm:gap-5">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <NextLink
            href="/job-board"
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            See All Jobs
          </NextLink>
          <NextLink href="#" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Share An Opening
          </NextLink>
        </div>
      </div>
    </section>
  );
}
