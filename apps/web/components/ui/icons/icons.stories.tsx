import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentType, ReactNode } from "react";
import type { IconProps } from "./icon";
import {
  AdIcon,
  AddCvIcon,
  AlarmIcon,
  AnalystIcon,
  AreaIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  ArtIcon,
  BorderIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarIcon,
  CaseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  CvIcon,
  DownloadIcon,
  EditIcon,
  EducationIcon,
  EngineeringIcon,
  ExperienceIcon,
  FinanceIcon,
  GapIcon,
  GlobeIcon,
  GraphIcon,
  HealthIcon,
  HeartFilledIcon,
  HeartIcon,
  InfoIcon,
  JusticeIcon,
  LanguageIcon,
  LocationIcon,
  LockIcon,
  MarketingIcon,
  MemberIcon,
  MenuIcon,
  ModalityIcon,
  NonProfitIcon,
  NotifiIcon,
  NotificationIcon,
  TechIcon,
  TimeCommitmentIcon,
  TipIcon,
  TrashIcon,
  UploadIcon,
  ViewIcon,
  VisibilityIcon,
} from "./index";

type IconEntry = { name: string; Icon: ComponentType<IconProps> };

const openJob: IconEntry[] = [
  { name: "HeartIcon", Icon: HeartIcon },
  { name: "HeartFilledIcon", Icon: HeartFilledIcon },
  { name: "CaseIcon", Icon: CaseIcon },
  { name: "NotifiIcon", Icon: NotifiIcon },
  { name: "LanguageIcon", Icon: LanguageIcon },
  { name: "ExperienceIcon", Icon: ExperienceIcon },
  { name: "LocationIcon", Icon: LocationIcon },
  { name: "BriefcaseIcon", Icon: BriefcaseIcon },
  { name: "TimeCommitmentIcon", Icon: TimeCommitmentIcon },
  { name: "ModalityIcon", Icon: ModalityIcon },
  { name: "NotificationIcon", Icon: NotificationIcon },
  { name: "CvIcon", Icon: CvIcon },
  { name: "AddCvIcon", Icon: AddCvIcon },
  { name: "AreaIcon", Icon: AreaIcon },
  { name: "VisibilityIcon", Icon: VisibilityIcon },
  { name: "TipIcon", Icon: TipIcon },
];

const arrows: IconEntry[] = [
  { name: "CloseIcon", Icon: CloseIcon },
  { name: "ChevronDownIcon", Icon: ChevronDownIcon },
  { name: "ChevronUpIcon", Icon: ChevronUpIcon },
  { name: "ArrowLeftIcon", Icon: ArrowLeftIcon },
  { name: "ArrowRightIcon", Icon: ArrowRightIcon },
  { name: "DownloadIcon", Icon: DownloadIcon },
  { name: "UploadIcon", Icon: UploadIcon },
];

const tiny: IconEntry[] = [
  { name: "ArrowUpRightIcon", Icon: ArrowUpRightIcon },
  { name: "CalendarIcon", Icon: CalendarIcon },
  { name: "ViewIcon", Icon: ViewIcon },
  { name: "MenuIcon", Icon: MenuIcon },
  { name: "AlarmIcon", Icon: AlarmIcon },
  { name: "EditIcon", Icon: EditIcon },
  { name: "GlobeIcon", Icon: GlobeIcon },
  { name: "TrashIcon", Icon: TrashIcon },
];

const category: IconEntry[] = [
  { name: "MarketingIcon", Icon: MarketingIcon },
  { name: "TechIcon", Icon: TechIcon },
  { name: "AnalystIcon", Icon: AnalystIcon },
  { name: "EngineeringIcon", Icon: EngineeringIcon },
  { name: "GapIcon", Icon: GapIcon },
  { name: "HealthIcon", Icon: HealthIcon },
  { name: "FinanceIcon", Icon: FinanceIcon },
  { name: "BuildingIcon", Icon: BuildingIcon },
  { name: "ArtIcon", Icon: ArtIcon },
];

const landing: IconEntry[] = [
  { name: "LockIcon", Icon: LockIcon },
  { name: "AdIcon", Icon: AdIcon },
  { name: "InfoIcon", Icon: InfoIcon },
  { name: "EducationIcon", Icon: EducationIcon },
  { name: "GraphIcon", Icon: GraphIcon },
  { name: "MemberIcon", Icon: MemberIcon },
  { name: "JusticeIcon", Icon: JusticeIcon },
  { name: "BorderIcon", Icon: BorderIcon },
  { name: "NonProfitIcon", Icon: NonProfitIcon },
];

function IconGrid({ entries }: { entries: IconEntry[] }) {
  return (
    <div className="grid grid-cols-3 gap-px overflow-hidden rounded-card bg-gray-100 sm:grid-cols-4 md:grid-cols-6">
      {entries.map(({ name, Icon }) => (
        <div key={name} className="flex flex-col items-center gap-3 bg-white p-6 text-teal">
          <Icon size={32} />
          <span className="text-xs text-gray-text">{name}</span>
        </div>
      ))}
    </div>
  );
}

function CircleIconGrid({ entries }: { entries: IconEntry[] }) {
  return (
    <div className="grid grid-cols-3 gap-px overflow-hidden rounded-card bg-gray-100 sm:grid-cols-4 md:grid-cols-6">
      {entries.map(({ name, Icon }) => (
        <div key={name} className="flex flex-col items-center gap-3 bg-white p-6">
          <div className="flex size-16 items-center justify-center rounded-full bg-orange text-cream">
            <Icon size={64} />
          </div>
          <span className="text-xs text-gray-text">{name}</span>
        </div>
      ))}
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-medium uppercase tracking-widest text-pale-blue">{label}</p>
      {children}
    </div>
  );
}

const meta = {
  title: "UI/Icons",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <Section label="Open Job Icons">
        <IconGrid entries={openJob} />
      </Section>
      <Section label="Arrows & Actions">
        <IconGrid entries={arrows} />
      </Section>
      <Section label="Tiny 16px Icons">
        <IconGrid entries={tiny} />
      </Section>
      <Section label="Popular Category — circular treatment">
        <CircleIconGrid entries={category} />
      </Section>
      <Section label="Landing Page — circular treatment">
        <CircleIconGrid entries={landing} />
      </Section>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8 text-teal">
      {[16, 24, 32, 48, 64].map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <HeartIcon size={size} />
          <span className="text-xs text-gray-text">{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <CaseIcon size={32} className="text-teal" />
      <CaseIcon size={32} className="text-orange" />
      <CaseIcon size={32} className="text-rust" />
      <CaseIcon size={32} className="text-charcoal" />
      <HeartFilledIcon size={32} className="text-danger" />
    </div>
  ),
};

export const CategoryTreatment: Story = {
  name: "Circular category treatment",
  render: () => (
    <div className="flex items-center gap-6">
      {category.slice(0, 5).map(({ name, Icon }) => (
        <div
          key={name}
          className="flex size-16 items-center justify-center rounded-full bg-orange text-cream"
        >
          <Icon size={64} />
        </div>
      ))}
    </div>
  ),
};
