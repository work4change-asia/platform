import type { JobCardData } from "@/lib/home-data";

export type JobDetail = JobCardData & {
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
  companySize: string;
  website: string;
};

const jobDetails: JobDetail[] = [
  {
    id: "1",
    title: "Product Designer",
    organization: "Google Inc",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Seoul, South Korea",
    description:
      "Join our team as a Product Designer and help shape the future of digital experiences for millions of users across Asia.",
    postedAt: "2h ago",
    href: "/job-board/1-product-designer-google",
    descriptionBody:
      "We are looking for a Senior UX Designer to join our growing team. In this role you will work closely with product managers and engineers to define, design, and ship experiences used by millions.\n\nYou will conduct user research, create wireframes and prototypes, and iterate based on feedback. You will champion the user throughout the product development process and help establish design standards across the organisation.",
    responsibilities: [
      "Quisque semper gravida est et consectetur.",
      "Curabitur blandit lorem velit, vitae pretium leo placerat eget.",
      "Morbi mattis in ipsum ac tempus.",
      "Vestibulum sed purus ullamcorper, lobortis lectus nec.",
      "Vulputate turpis. Quisque ante odio, iaculis a porttitor sit amet.",
      "Lobortis vel lectus. Nulla at risus ut diam.",
      "Commodo feugiat. Nullam laoreet, diam placerat dapibus tincidunt.",
      "Odio metus posuere libero, id condimentum erat velit nec neque.",
      "Ut sodales ut. Curabitur tempus augue.",
    ],
    workMode: "Remote (global)",
    experience: "3-5 Years",
    language: "English",
    timeCommitment: "Full-time",
    sector: "Digital Communications",
    isInternationalContract: true,
    orgTagline: "Social networking service",
    founded: "March 21, 2006",
    orgType: "International Organisation",
    companySize: "120-300 Employers",
    website: "https://google.com",
  },
  {
    id: "9",
    title: "Programme Officer",
    organization: "UNDP Asia",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Bangkok, Thailand",
    description:
      "Support sustainable development programmes across Asia, working with governments and civil society to advance the SDGs.",
    postedAt: "4d ago",
    href: "/job-board/9-programme-officer-undp",
    descriptionBody:
      "The Programme Officer will support the design, implementation, and monitoring of development programmes across the Asia-Pacific region. The role involves coordinating with government counterparts, civil society, and donor partners to ensure effective delivery of results.\n\nThe ideal candidate has experience in international development, strong analytical skills, and the ability to work in a multicultural environment.",
    responsibilities: [
      "Coordinate programme planning and implementation activities.",
      "Prepare reports, briefs, and communications for donors and stakeholders.",
      "Monitor programme budgets and expenditures.",
      "Facilitate workshops and training sessions with partners.",
      "Conduct field visits to programme sites across the region.",
    ],
    workMode: "On-site",
    experience: "5+ Years",
    language: "English, Thai (preferred)",
    timeCommitment: "Full-time",
    sector: "International Development",
    isInternationalContract: true,
    orgTagline: "United Nations Development Programme",
    founded: "January 1, 1966",
    orgType: "United Nations Agency",
    companySize: "8,000+ Staff",
    website: "https://asia.undp.org",
  },
];

export const jobDetailsBySlug: Record<string, JobDetail> = Object.fromEntries(
  jobDetails.map((job) => {
    const slug = job.href.replace("/job-board/", "");
    return [slug, job];
  }),
);
