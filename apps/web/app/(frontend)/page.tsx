import { Hero } from "@/components/home/hero";
import { PartnerLogos } from "@/components/home/partner-logos";
import { FreshFromTheField } from "@/components/home/fresh-from-the-field";
import { OpportunitiesPreview } from "@/components/home/opportunities-preview";
import { Testimonial } from "@/components/home/testimonial";
import { Stats } from "@/components/home/stats";
import { featuredJobs, featuredOpportunities, homeTestimonial, homeStats } from "@/lib/home-data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerLogos />
      <FreshFromTheField jobs={featuredJobs} />
      <OpportunitiesPreview opportunities={featuredOpportunities} />
      <Testimonial data={homeTestimonial} />
      <Stats stats={homeStats} />
    </>
  );
}
