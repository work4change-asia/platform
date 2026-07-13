import { Link } from "@/components/ui/link";

export type OrganizationInfoCardProps = {
  orgName: string;
  orgInitial: string;
  orgTagline: string;
  founded: string;
  orgType: string;
  orgSize: string;
  website: string;
};

type InfoRowProps = { label: string; value: React.ReactNode };

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1 text-base">
      <span className="font-normal text-gray-600">{label}:</span>
      <span className="text-right font-medium text-charcoal">{value}</span>
    </div>
  );
}

export function OrganizationInfoCard({
  orgName,
  orgInitial,
  orgTagline,
  founded,
  orgType,
  orgSize,
  website,
}: OrganizationInfoCardProps) {
  return (
    <div className="rounded-card border border-pale-blue bg-white p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-muted text-base font-bold text-teal">
          {orgInitial}
        </div>
        <div>
          <p className="font-semibold text-gray-text">{orgName}</p>
          <p className="text-xs text-pale-blue">{orgTagline}</p>
        </div>
      </div>

      <div>
        <InfoRow label="Founded in" value={founded} />
        <InfoRow label="Organisation type" value={orgType} />
        <InfoRow label="Organisation size" value={orgSize} />
        <InfoRow
          label="Website"
          value={
            <Link href={website} variant="default" target="_blank" rel="noopener noreferrer">
              {website.replace(/^https?:\/\//, "")}
            </Link>
          }
        />
      </div>

      <div className="mt-4">
        <Link href="/job-board" variant="default" className="text-sm">
          Other job openings &rarr;
        </Link>
      </div>
    </div>
  );
}
