import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "@/components/ui/badge";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export type JobCardData = {
  id: string;
  title: string;
  organization: string;
  contractType: BadgeVariant;
  contractLabel: string;
  location: string;
  description: string;
  postedAt: string;
  href: string;
};

export type OpportunityType =
  | "Event"
  | "Grant"
  | "News"
  | "Mobility"
  | "Publication"
  | "Research & Academia"
  | "Networking & Exchanges"
  | "Training";

export type OpportunityData = {
  id: string;
  title: string;
  organization: string;
  excerpt: string;
  tags: OpportunityType[];
  href: string;
};

export type FeatureItem = {
  icon: string;
  text: string;
};

export type TestimonialData = {
  quote: string;
  features: FeatureItem[];
};

export type StatData = {
  value: string;
  label: string;
};

export const featuredJobs: JobCardData[] = [
  {
    id: "1",
    title: "Product Designer",
    organization: "Google Inc",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Singapore",
    description: "Join our team as a Product Designer and help shape the future of digital experiences for millions of users across Asia.",
    postedAt: "2h ago",
    href: "/job-board/1-product-designer-google",
  },
  {
    id: "2",
    title: "Email Marketing Specialist",
    organization: "Spotify",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Remote",
    description: "Join our team as an Email Marketing Specialist and lead our digital outreach efforts to engage music lovers worldwide.",
    postedAt: "5h ago",
    href: "/job-board/2-email-marketing-specialist-spotify",
  },
  {
    id: "3",
    title: "Full-stack Developer",
    organization: "GitHub",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Japan",
    description: "Build and maintain scalable web applications that power the world's leading developer platform.",
    postedAt: "1d ago",
    href: "/job-board/3-fullstack-developer-github",
  },
  {
    id: "4",
    title: "Content Writer",
    organization: "WordPress",
    contractType: "part-time",
    contractLabel: "Part Time",
    location: "Remote",
    description: "Create compelling content that helps millions of website owners get the most out of the world's most popular CMS.",
    postedAt: "1d ago",
    href: "/job-board/4-content-writer-wordpress",
  },
  {
    id: "5",
    title: "Front-end Developer",
    organization: "Pinterest",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Philippines",
    description: "Craft beautiful, performant user interfaces that inspire people to discover and save ideas they love.",
    postedAt: "2d ago",
    href: "/job-board/5-frontend-developer-pinterest",
  },
  {
    id: "6",
    title: "Cloud Solutions Architect",
    organization: "Amazon",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Malaysia",
    description: "Design and implement cloud architectures that help businesses across Southeast Asia scale with confidence.",
    postedAt: "2d ago",
    href: "/job-board/6-cloud-architect-amazon",
  },
  {
    id: "7",
    title: "Data Analyst",
    organization: "Grab",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Indonesia",
    description: "Turn data into insights that drive product decisions for Southeast Asia's leading superapp.",
    postedAt: "3d ago",
    href: "/job-board/7-data-analyst-grab",
  },
  {
    id: "8",
    title: "Digital Marketing Manager",
    organization: "Airbnb",
    contractType: "part-time",
    contractLabel: "Part Time",
    location: "Thailand",
    description: "Lead digital marketing campaigns that connect travellers with unique stays and experiences across Asia.",
    postedAt: "3d ago",
    href: "/job-board/8-digital-marketing-airbnb",
  },
  {
    id: "9",
    title: "Programme Officer",
    organization: "UNDP Asia",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Thailand",
    description: "Support sustainable development programmes across Asia, working with governments and civil society to advance the SDGs.",
    postedAt: "4d ago",
    href: "/job-board/9-programme-officer-undp",
  },
  {
    id: "10",
    title: "Communications Officer",
    organization: "Oxfam",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Cambodia",
    description: "Tell the stories of communities overcoming poverty and injustice through compelling communications and advocacy.",
    postedAt: "4d ago",
    href: "/job-board/10-communications-officer-oxfam",
  },
  {
    id: "11",
    title: "Research Fellow",
    organization: "Asia Foundation",
    contractType: "part-time",
    contractLabel: "Fellowship",
    location: "Philippines",
    description: "Conduct policy research on governance, development, and civil society across the Asia-Pacific region.",
    postedAt: "5d ago",
    href: "/job-board/11-research-fellow-asia-foundation",
  },
  {
    id: "12",
    title: "Fundraising Manager",
    organization: "Save the Children",
    contractType: "full-time",
    contractLabel: "Full Time",
    location: "Vietnam",
    description: "Lead fundraising strategy and donor engagement to support life-changing programmes for children across Vietnam.",
    postedAt: "5d ago",
    href: "/job-board/12-fundraising-manager-save-the-children",
  },
];

export const featuredOpportunities: OpportunityData[] = [
  {
    id: "1",
    title: "Digital Marketer",
    organization: "Instagram",
    excerpt: "We are looking for a digital marketer to join our team and lead our digital outreach efforts. Apply today.",
    tags: ["Mobility"],
    href: "/opportunities/1-digital-marketer-instagram",
  },
  {
    id: "2",
    title: "Digital Marketer",
    organization: "Slack",
    excerpt: "We are seeking a Digital Marketing Specialist to lead our internal outreach efforts and grow our brand presence across Asia.",
    tags: ["Training"],
    href: "/opportunities/2-digital-marketer-slack",
  },
  {
    id: "3",
    title: "CFIs Call for Proposals: Empowering Civil Society in 2025",
    organization: "Asia Foundation",
    excerpt: "The Asia Foundation invites civil society organizations across Asia to submit proposals for capacity-building grants supporting democracy, governance, and social development.",
    tags: ["Grant"],
    href: "/opportunities/3-cfi-proposals-asia-foundation",
  },
];

export const homeTestimonial: TestimonialData = {
  quote:
    "Our platform is freely accessible to all users — whether you are seeking opportunities or recruiting candidates.",
  features: [
    { icon: "lock", text: "Access curated jobs, training programmes, and career development opportunities across Asia in the nonprofit, international cooperation and development, and impact sectors." },
    { icon: "marketing", text: "Post job openings and reach thousands of qualified candidates across the Asia-Pacific region." },
    { icon: "non-profit", text: "Connect with leading NGOs, UN agencies, and social enterprises working across Asia and the Pacific." },
    { icon: "member", text: "Build your professional profile and get discovered by top impact organisations." },
    { icon: "education", text: "Access training resources and career development tools tailored for the impact sector." },
    { icon: "globe", text: "Filter opportunities by location, sector, contract type, and more to find the perfect fit." },
  ],
};

export const homeStats: StatData[] = [
  { value: "200+", label: "new jobs posts every week" },
  { value: "160", label: "active companies and counting" }
];
