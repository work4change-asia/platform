"use client";

import {
  CarouselArrows,
  CarouselCard,
  CarouselDots,
  CarouselLiveRegion,
} from "@/components/ui/carousel-primitives";
import {
  EducationIcon,
  GlobeIcon,
  LockIcon,
  MarketingIcon,
  MemberIcon,
  NonProfitIcon,
} from "@/components/ui/icons";
import { useCarousel } from "@/hooks/use-carousel";
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
  const { containerRef, containerWidth, current, cardWidth, offset, goTo, prev, next } =
    useCarousel({
      count: items.length,
      cardWidth: (containerWidth) => containerWidth - PEEK_PX,
      gapPx: GAP_PX,
    });

  return (
    <div>
      <CarouselArrows
        onPrev={prev}
        onNext={next}
        prevDisabled={current === 0}
        nextDisabled={current === items.length - 1}
      />

      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${offset}px)`, gap: GAP_PX }}
        >
          {items.map((item, i) => (
            <CarouselCard
              key={i}
              isCurrent={i === current}
              width={containerWidth > 0 ? cardWidth : "calc(100% - 56px)"}
              className="flex items-start gap-4 rounded-2xl bg-cream p-5"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange text-cream">
                {ICON_MAP[item.icon]}
              </div>
              <p className="text-sm leading-relaxed text-gray-text">{item.text}</p>
            </CarouselCard>
          ))}
        </div>
      </div>

      <CarouselDots count={items.length} current={current} onSelect={goTo} />
      <CarouselLiveRegion current={current} count={items.length} />
    </div>
  );
}
