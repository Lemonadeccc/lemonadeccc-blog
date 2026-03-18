export type ProjectSection = "recent" | "featured";

export interface Project {
  slug: string;
  title: string;
  category: string;
  dateLabel: string;
  year: number;
  summary: string;
  image: string;
  hoverImage: string;
  sections: ProjectSection[];
}

export interface RepresentationContact {
  agency: string;
  agencyUrl?: string;
  name: string;
  role: string;
  phone: string;
  email?: string;
}

export interface RepresentationRegion {
  name: string;
  contacts: RepresentationContact[];
}

export interface RepresentationColumn {
  title: string;
  regions: RepresentationRegion[];
}

export interface SocialLink {
  label: string;
  href: string;
}
