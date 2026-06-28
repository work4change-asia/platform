import { Link } from "@/components/ui/link";

export type CompanyInfoCardProps = {
  orgName: string;
  orgInitial: string;
  orgTagline: string;
  founded: string;
  orgType: string;
  companySize: string;
  website: string;
};

type InfoRowProps = { label: string; value: React.ReactNode };

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 text-sm">
      <span className="text-pale-blue">{label}</span>
      <span className="text-right font-medium text-gray-text">{value}</span>
    </div>
  );
}

export function CompanyInfoCard({
  orgName,
  orgInitial,
  orgTagline,
  founded,
  orgType,
  companySize,
  website,
}: CompanyInfoCardProps) {
  return (
    <div className="rounded-card bg-white p-6 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-muted text-base font-bold text-teal">
          {orgInitial}
        </div>
        <div>
          <p className="font-semibold text-gray-text">{orgName}</p>
          <p className="text-xs text-pale-blue">{orgTagline}</p>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        <InfoRow label="Founded in" value={founded} />
        <InfoRow label="Organisation type" value={orgType} />
        <InfoRow label="Company size" value={companySize} />
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
        <span className="cursor-default text-sm text-pale-blue">
          Other job openings &rarr;
        </span>
      </div>
    </div>
  );
}
