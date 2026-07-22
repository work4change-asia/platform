import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "@/components/ui/badge";
import type { JobCardData } from "@/lib/home-data";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export type JobDetail = JobCardData & {
  contractType: BadgeVariant;
  contractLabel: string;
  description: string;
  descriptionBody: string;
  responsibilities: string[];
  workMode: string;
  experience: string;
  language: string;
  timeCommitment: string;
  sector: string;
  isInternationalContract: boolean;
  orgTagline: string;
  founded: string;
  orgType: string;
  orgSize: string;
  website: string;
};

const jobDetails: JobDetail[] = [
  {
    id: "1",
    title: "Global Communications & Fundraising Manager",
    organization: "International Vaccine Institute (IVI)",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Korea",
    description:
      "Lead global communications and donor fundraising for an international organisation advancing vaccine research and delivery across the developing world.",
    postedAt: "2h ago",
    href: "/job-board/1-global-communications-fundraising-manager-ivi",
    descriptionBody:
      "We are looking for a Global Communications & Fundraising Manager to join the Global Affairs and Communications Unit. In this role you will shape IVI's public voice and build relationships with institutional and philanthropic donors supporting our vaccine research programmes.\n\nYou will work closely with the Science, Clinical Development, and Training & Capacity Strengthening departments to translate research impact into donor reports, press materials, and public health diplomacy initiatives.",
    responsibilities: [
      "Develop and execute a global communications strategy across digital, media, and donor channels.",
      "Lead fundraising campaigns and cultivate relationships with institutional and philanthropic donors.",
      "Coordinate with the Global Affairs and Communications Unit on public health diplomacy initiatives.",
      "Produce donor reports, impact stories, and press materials for vaccine research programmes.",
      "Represent IVI at international conferences and donor briefings.",
    ],
    workMode: "On-site",
    experience: "5+ Years",
    language: "English",
    timeCommitment: "Full-time",
    sector: "Public Health",
    isInternationalContract: true,
    orgTagline: "International organisation dedicated to vaccine research and delivery for global health",
    founded: "1997",
    orgType: "International Organisation",
    orgSize: "300+ Staff",
    website: "https://www.ivi.int",
  },
  {
    id: "9",
    title: "Research Fellow, Development Cooperation",
    organization: "National University of Singapore (NUS)",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Singapore",
    description:
      "Conduct research on development cooperation and regional policy at Singapore's flagship university, contributing to publications and policy briefs.",
    postedAt: "4d ago",
    href: "/job-board/9-research-fellow-nus",
    descriptionBody:
      "The Research Fellow will conduct independent and collaborative research on development cooperation and regional policy within NUS's Academic & Research Positions track. The role involves producing peer-reviewed publications, contributing to policy briefs, and supporting grant proposal development.\n\nThe ideal candidate has a strong research background in international development, excellent academic writing skills, and experience mentoring graduate students.",
    responsibilities: [
      "Conduct independent and collaborative research on development cooperation and regional policy.",
      "Publish findings in peer-reviewed journals and contribute to policy briefs.",
      "Support grant proposal development and manage research funding applications.",
      "Mentor graduate students and contribute to curriculum development.",
      "Present research at academic conferences and stakeholder workshops.",
    ],
    workMode: "On-site",
    experience: "3-5 Years",
    language: "English",
    timeCommitment: "Full-time",
    sector: "Education; Development Cooperation",
    isInternationalContract: false,
    orgTagline: "Singapore's flagship university, a leading global university centred in Asia",
    founded: "1905",
    orgType: "Academic/Research Institution",
    orgSize: "10,000+ Staff",
    website: "https://www.nus.edu.sg",
  },
];

export const jobDetailsBySlug: Record<string, JobDetail> = Object.fromEntries(
  jobDetails.map((job) => {
    const slug = job.href.replace("/job-board/", "");
    return [slug, job];
  }),
);
