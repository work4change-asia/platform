"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EducationIcon,
  GlobeIcon,
  LockIcon,
  MarketingIcon,
  MemberIcon,
  NonProfitIcon,
} from "@/components/ui/icons";
import type { FeatureItem } from "@/lib/home-data";

const ICON_MAP: Record<string, React.ReactNode> = {
  lock: <LockIcon size={90} className="shrink-0" />,
  marketing: <MarketingIcon size={90} className="shrink-0" />,
  "non-profit": <NonProfitIcon size={90} className="shrink-0" />,
  member: <MemberIcon size={90} className="shrink-0" />,
  education: <EducationIcon size={90} className="shrink-0" />,
  globe: <GlobeIcon size={90} className="shrink-0" />,
};

const PEEK_PX = 56;
const GAP_PX = 16;

export function FeatureCarousel({ items }: { items: FeatureItem[] }) {
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

  const cardWidth = containerWidth - PEEK_PX;
  const stepPx = cardWidth + GAP_PX;

  const prev = () => setCurrent((i) => Math.max(0, i - 1));
  const next = () => setCurrent((i) => Math.min(items.length - 1, i + 1));

  return (
    <div>
      {/* Nav arrows */}
      <div className="mb-3 flex justify-end gap-2">
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
          disabled={current === items.length - 1}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-teal-light hover:text-teal-light disabled:opacity-30"
        >
          <ArrowRightIcon size={22} />
        </button>
      </div>

      {/* Cards track */}
      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * stepPx}px)`, gap: GAP_PX }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{ minWidth: containerWidth > 0 ? cardWidth : "calc(100% - 56px)" }}
              className="flex items-start gap-4 rounded-2xl bg-cream p-5"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange text-cream">
                {ICON_MAP[item.icon]}
              </div>
              <p className="text-sm leading-relaxed text-gray-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={twMerge(
              "h-2 w-2 rounded-full transition-colors",
              i === current ? "bg-teal-light" : "bg-gray-200",
            )}
          />
        ))}
      </div>
    </div>
  );
}
