import { notFound } from "next/navigation";
import { jobDetailsBySlug } from "@/lib/job-detail-data";
import { BubblePanel } from "@/components/ui/bubble-panel";
import { Link } from "@/components/ui/link";
import { CompanyHeader } from "@/components/job-detail/company-header";
import { JobDescription } from "@/components/job-detail/job-description";
import { JobOverviewCard } from "@/components/job-detail/job-overview-card";
import { CompanyInfoCard } from "@/components/job-detail/company-info-card";

type Props = { params: Promise<{ slug: string }> };

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = jobDetailsBySlug[slug];
  if (!job) notFound();

  const orgInitial = job.organization[0] ?? "O";

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BubblePanel
          variant="teal"
          shape="standard"
          className="flex h-[366px] items-center justify-center"
        >
          <h1 className="text-h3 font-semibold text-cream">Job Details</h1>
        </BubblePanel>
      </div>

      <div className="bg-cream">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 py-5 text-sm sm:px-6 lg:px-8"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" variant="muted">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-pale-blue">
              /
            </li>
            <li>
              <Link href="/job-board" variant="muted">
                Find Job
              </Link>
            </li>
            <li aria-hidden className="text-pale-blue">
              /
            </li>
            <li className="font-medium text-gray-text">Job Details</li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CompanyHeader orgName={job.organization} orgInitial={orgInitial} jobTitle={job.title} />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]">
          <JobDescription
            descriptionBody={job.descriptionBody}
            responsibilities={job.responsibilities}
          />
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <JobOverviewCard
              location={job.location}
              workMode={job.workMode}
              experience={job.experience}
              language={job.language}
              contractLabel={job.contractLabel}
              timeCommitment={job.timeCommitment}
              sector={job.sector}
              isInternationalContract={job.isInternationalContract}
            />
            <CompanyInfoCard
              orgName={job.organization}
              orgInitial={orgInitial}
              orgTagline={job.orgTagline}
              founded={job.founded}
              orgType={job.orgType}
              companySize={job.companySize}
              website={job.website}
            />
          </div>
        </div>
      </div>
    </>
  );
}
