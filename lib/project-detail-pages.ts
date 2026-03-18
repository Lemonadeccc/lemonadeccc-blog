import type { Project } from "@/lib/types";

export type DetailImageOrientation = "landscape" | "portrait" | "wide";

export interface DetailImage {
  src: string;
  alt: string;
  orientation: DetailImageOrientation;
}

export interface NarrativeSection {
  title: string;
  index: string;
  paragraphs: string[];
  quote?: string;
  gallery: DetailImage[];
}

export interface ChapteredSection {
  heading: string;
  paragraphs: string[];
  gallery: DetailImage[];
}

export interface DetailCredits {
  roleTitle: string;
  roleLines: string[];
  items: { label: string; value: string }[];
}

export interface NarrativeProjectDetail {
  layout: "narrative";
  displayTitle?: string;
  introParagraphs: string[];
  heroMedia: DetailImage[];
  leadQuote: string;
  sections: NarrativeSection[];
  credits: DetailCredits;
}

export interface ChapteredProjectDetail {
  layout: "chaptered";
  displayTitle?: string;
  introParagraphs: string[];
  leadGalleries: DetailImage[][];
  sections: ChapteredSection[];
  credits: DetailCredits;
}

export type ProjectDetailTemplate = NarrativeProjectDetail | ChapteredProjectDetail;

const projectDetailTemplates: Record<string, ProjectDetailTemplate> = {};

export const getProjectDetailTemplate = (
  project: Project
): ProjectDetailTemplate | undefined => projectDetailTemplates[project.slug];
