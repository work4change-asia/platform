import { twMerge } from "tailwind-merge";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";

export type CarouselArrowsProps = {
  onPrev: () => void;
  onNext: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
  className?: string;
};

export function CarouselArrows({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
  className,
}: CarouselArrowsProps) {
  return (
    <div className={twMerge("mb-3 flex justify-end gap-2", className)}>
      <button
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label="Previous"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-teal-light hover:text-teal-light disabled:opacity-30"
      >
        <ArrowLeftIcon size={22} />
      </button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="Next"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-teal-light hover:text-teal-light disabled:opacity-30"
      >
        <ArrowRightIcon size={22} />
      </button>
    </div>
  );
}

export type CarouselDotsProps = {
  count: number;
  current: number;
  onSelect: (index: number) => void;
  className?: string;
};

export function CarouselDots({ count, current, onSelect, className }: CarouselDotsProps) {
  return (
    <div className={twMerge("mt-4 flex justify-center gap-2", className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={twMerge(
            "h-2 w-2 rounded-full transition-colors",
            i === current ? "bg-teal-light" : "bg-gray-200",
          )}
        />
      ))}
    </div>
  );
}

export function CarouselLiveRegion({ current, count }: { current: number; count: number }) {
  return (
    <p aria-live="polite" className="sr-only">
      Slide {current + 1} of {count}
    </p>
  );
}

export type CarouselCardProps = {
  isCurrent: boolean;
  width: number | string;
  className?: string;
  children: React.ReactNode;
};

export function CarouselCard({ isCurrent, width, className, children }: CarouselCardProps) {
  return (
    <div
      className={twMerge(
        "transition-opacity duration-300",
        isCurrent ? "opacity-100" : "opacity-40",
        className,
      )}
      inert={isCurrent ? undefined : true}
      style={{ minWidth: width }}
    >
      {children}
    </div>
  );
}
