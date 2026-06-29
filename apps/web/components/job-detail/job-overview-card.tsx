import {
  LocationIcon,
  ModalityIcon,
  ExperienceIcon,
  LanguageIcon,
  CvIcon,
  TimeCommitmentIcon,
  AdIcon,
  NotificationIcon,
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
    <div className="flex flex-col items-start gap-1">
      <span className="text-orange">{icon}</span>
      <span className="text-xs text-pale-blue">{label}</span>
      <span className="text-sm font-medium text-gray-600">{value}</span>
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
    <div className="rounded-card border border-gray-200 bg-white p-6">
      <h3 className="mb-6 text-base font-semibold text-gray-text">Job Overview</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <Cell icon={<LocationIcon size={32} />} label="Location" value={location} />
        <Cell icon={<ModalityIcon size={32} />} label="Work Modality" value={workMode} />
        <Cell icon={<ExperienceIcon size={32} />} label="Experience" value={experience} />
        <Cell icon={<LanguageIcon size={32} />} label="Language" value={language} />
        <Cell icon={<CvIcon size={32} />} label="Type of Contract" value={contractLabel} />
        <Cell icon={<TimeCommitmentIcon size={32} />} label="Time Commitment" value={timeCommitment} />
        <Cell icon={<AdIcon size={32} />} label="Area of Work" value={sector} />
        <Cell
          icon={<NotificationIcon size={32} />}
          label="Eligibility"
          value={isInternationalContract ? "International Contract" : "Local Contract"}
        />
      </div>
    </div>
  );
}
