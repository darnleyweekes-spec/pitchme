export type WorkStyle = "remote" | "hybrid" | "onsite";

export type PitchStatus = "pending" | "interested" | "maybe" | "passed";

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  url: string;
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  workStyle: WorkStyle[];
  yearsExperience: number;
  headline: string;
  bio: string;
  skills: string[];
  preferredRoles: string[];
  compMin: number;
  compMax: number;
  compPeriod: "year" | "hour";
  availability: string;
  openToOffers: boolean;
  experience: ExperienceEntry[];
  portfolio: PortfolioItem[];
  links: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
  accent: string;
  pitchCount: number;
}

export interface Pitch {
  id: string;
  candidateId: string;
  companyName: string;
  companyBlurb: string;
  jobTitle: string;
  compMin: number;
  compMax: number;
  compPeriod: "year" | "hour";
  workStyle: WorkStyle;
  responsibilities: string[];
  whySelected: string;
  whyJoin: string;
  interviewStages: string[];
  aiInterviews: boolean;
  hiringTimeline: string;
  benefits: string[];
  equity?: string;
  status: PitchStatus;
  sentAt: string;
}
