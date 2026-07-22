import Image from "next/image";
import { BubblePanel } from "@/components/ui/bubble-panel";
import { FeatureCarousel } from "@/components/home/feature-carousel";
import type { TestimonialData } from "@/lib/home-data";

type TestimonialProps = {
  data: TestimonialData;
};

export function Testimonial({ data }: TestimonialProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <BubblePanel
            variant="muted"
            shape="photo"
            className="h-[480px] w-full lg:h-[560px]"
            media={
              <Image
                src="/images/testimonial-photo.png"
                alt="Professional reading at a desk"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover [object-position:center_15%]"
              />
            }
          />

          {/* Text side */}
          <div className="flex flex-col gap-6">
            <p className="text-tiny font-semibold uppercase tracking-widest text-orange">
              What we do
            </p>
            <blockquote className="text-h6 font-medium text-teal">
              &ldquo;{data.quote}&rdquo;
            </blockquote>

            <FeatureCarousel items={data.features} />
          </div>
        </div>
      </div>
    </section>
  );
}
