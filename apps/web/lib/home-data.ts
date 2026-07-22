export type JobCardData = {
  id: string;
  title: string;
  organization: string;
  location: string;
  workModality?: string;
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
  contractType?: "full-time" | "part-time";
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
    title: "Global Communications & Fundraising Manager",
    organization: "International Vaccine Institute (IVI)",
    location: "Korea",
    postedAt: "2h ago",
    href: "/job-board/1-global-communications-fundraising-manager-ivi",
  },
  {
    id: "2",
    title: "Senior Manager, Board Secretariat",
    organization: "Alliance for Financial Inclusion (AFI)",
    location: "Malaysia",
    workModality: "Remote",
    postedAt: "5h ago",
    href: "/job-board/2-senior-manager-board-secretariat-afi",
  },
  {
    id: "3",
    title: "Programme Officer, Development Cooperation",
    organization: "SAARC Secretariat",
    location: "Nepal",
    postedAt: "1d ago",
    href: "/job-board/3-programme-officer-saarc",
  },
  {
    id: "4",
    title: "Regional Health and WaSH Coordinator, Asia Hub",
    organization: "Terre des hommes",
    location: "Thailand",
    workModality: "Remote",
    postedAt: "1d ago",
    href: "/job-board/4-regional-health-wash-coordinator-tdh",
  },
  {
    id: "5",
    title: "Campaigner, Climate & Energy",
    organization: "Greenpeace East Asia",
    location: "Hong Kong",
    postedAt: "2d ago",
    href: "/job-board/5-campaigner-climate-energy-greenpeace",
  },
  {
    id: "6",
    title: "System Network Administration and Cybersecurity Trainer",
    organization: "Passerelles Numériques",
    location: "Cambodia",
    postedAt: "2d ago",
    href: "/job-board/6-cybersecurity-trainer-passerelles-numeriques",
  },
  {
    id: "7",
    title: "Programme Coordinator, Education",
    organization: "Ashinaga",
    location: "Japan",
    postedAt: "3d ago",
    href: "/job-board/7-programme-coordinator-education-ashinaga",
  },
  {
    id: "8",
    title: "Regional English Programme Manager",
    organization: "British Council",
    location: "Singapore",
    postedAt: "3d ago",
    href: "/job-board/8-regional-english-programme-manager-british-council",
  },
  {
    id: "9",
    title: "Research Fellow, Development Cooperation",
    organization: "National University of Singapore (NUS)",
    location: "Singapore",
    postedAt: "4d ago",
    href: "/job-board/9-research-fellow-nus",
  },
  {
    id: "10",
    title: "Programme Manager, Executive Education",
    organization: "Singapore Management University",
    location: "Singapore",
    postedAt: "4d ago",
    href: "/job-board/10-programme-manager-executive-education-smu",
  },
  {
    id: "11",
    title: "Monitoring & Evaluation Officer",
    organization: "Aga Khan Development Network (AKDN)",
    location: "Pakistan",
    postedAt: "5d ago",
    href: "/job-board/11-monitoring-evaluation-officer-akdn",
  },
  {
    id: "12",
    title: "Management Consultant",
    organization: "Abt Global Australia",
    location: "Australia",
    postedAt: "5d ago",
    href: "/job-board/12-management-consultant-abt-global",
  },
];

export const featuredOpportunities: OpportunityData[] = [
  {
    id: "1",
    title: "Call for Audit Consultants: Grant Compliance Review",
    organization: "SAARC Development Fund",
    excerpt:
      "SAARC Development Fund's Bhutan office is seeking qualified consultants or consultancy firms to conduct an audit of a specific grant under a partnership education initiative funded by SDF and Save the Children Korea.",
    tags: ["Grant"],
    href: "/opportunities/1-audit-consultants-saarc-development-fund",
  },
  {
    id: "2",
    title: "Training & Capacity Strengthening Programme for Public Health Professionals",
    organization: "International Vaccine Institute (IVI)",
    excerpt:
      "IVI's Training & Capacity Strengthening Department is opening applications for public health professionals across Asia to join hands-on training in vaccine research, clinical operations, and programme management.",
    tags: ["Training"],
    contractType: "full-time",
    href: "/opportunities/2-training-capacity-strengthening-ivi",
  },
  {
    id: "3",
    title: "CFIs Call for Proposals: Empowering Civil Society in 2025",
    organization: "Asia Foundation",
    excerpt:
      "The Asia Foundation invites civil society organizations across Asia to submit proposals for capacity-building grants supporting democracy, governance, and social development.",
    tags: ["Grant"],
    href: "/opportunities/3-cfi-proposals-asia-foundation",
  },
];

export const homeTestimonial: TestimonialData = {
  quote:
    "Our platform is freely accessible to all users — whether you are seeking opportunities or recruiting candidates.",
  features: [
    {
      icon: "lock",
      text: "Access curated jobs, training programmes, and career development opportunities across Asia in the nonprofit, international cooperation and development, and impact sectors.",
    },
    {
      icon: "marketing",
      text: "Post job openings and reach thousands of qualified candidates across the Asia-Pacific region.",
    },
    {
      icon: "non-profit",
      text: "Connect with leading NGOs, UN agencies, and social enterprises working across Asia and the Pacific.",
    },
    {
      icon: "member",
      text: "Build your professional profile and get discovered by top impact organisations.",
    },
    {
      icon: "education",
      text: "Access training resources and career development tools tailored for the impact sector.",
    },
    {
      icon: "globe",
      text: "Filter opportunities by location, sector, contract type, and more to find the perfect fit.",
    },
  ],
};

export const homeStats: StatData[] = [
  { value: "200+", label: "new jobs posts every week" },
  { value: "160", label: "active organisations and counting" },
];
