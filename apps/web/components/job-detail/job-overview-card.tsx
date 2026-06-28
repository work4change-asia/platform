import {
  LocationIcon,
  GlobeIcon,
  ExperienceIcon,
  LanguageIcon,
  BriefcaseIcon,
  TimeCommitmentIcon,
  AreaIcon,
  BuildingIcon,
} from "@/components/ui/icons";

export type JobOverviewCardProps = {
  location: string;
  workMode: string;
  experience: string;
  language: string;
  contractLabel: string;
  timeCommitment: string;
  sector: string;
  isInternationalContract: boolean;
};

type CellProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function Cell({ icon, label, value }: CellProps) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-teal">{icon}</span>
      <span className="text-xs text-pale-blue">{label}</span>
      <span className="text-sm font-medium text-gray-text">{value}</span>
    </div>
  );
}

export function JobOverviewCard({
  location,
  workMode,
  experience,
  language,
  contractLabel,
  timeCommitment,
  sector,
  isInternationalContract,
}: JobOverviewCardProps) {
  return (
    <div className="rounded-card bg-white p-6 shadow-card">
      <h3 className="mb-6 text-base font-semibold text-gray-text">Job Overview</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <Cell icon={<LocationIcon size={20} />} label="Location" value={location} />
        <Cell icon={<GlobeIcon size={20} />} label="Work Mode" value={workMode} />
        <Cell icon={<ExperienceIcon size={20} />} label="Experience" value={experience} />
        <Cell icon={<LanguageIcon size={20} />} label="Language" value={language} />
        <Cell icon={<BriefcaseIcon size={20} />} label="Contract Type" value={contractLabel} />
        <Cell icon={<TimeCommitmentIcon size={20} />} label="Time Commitment" value={timeCommitment} />
        <Cell icon={<AreaIcon size={20} />} label="Sector" value={sector} />
        <Cell
          icon={<BuildingIcon size={20} />}
          label="International Contract"
          value={isInternationalContract ? "Yes" : "No"}
        />
      </div>
    </div>
  );
}
