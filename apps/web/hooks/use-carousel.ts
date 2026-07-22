import { useEffect, useRef, useState } from "react";

export type UseCarouselOptions = {
  count: number;
  cardWidth: (containerWidth: number) => number;
  gapPx: number;
};

export function useCarousel({ count, cardWidth: getCardWidth, gapPx }: UseCarouselOptions) {
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

  const cardWidth = getCardWidth(containerWidth);
  const stepPx = cardWidth + gapPx;
  const trackWidth = count * cardWidth + (count - 1) * gapPx;
  const maxOffset = Math.max(0, trackWidth - containerWidth);
  const centeredOffset = current * stepPx + cardWidth / 2 - containerWidth / 2;
  const offset = Math.max(0, Math.min(maxOffset, centeredOffset));

  const goTo = (index: number) => setCurrent(Math.max(0, Math.min(count - 1, index)));
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  return {
    containerRef,
    containerWidth,
    current,
    cardWidth,
    offset,
    maxOffset,
    isFirst: current === 0,
    isLast: current === count - 1,
    goTo,
    prev,
    next,
  };
}
