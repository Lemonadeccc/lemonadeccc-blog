// Unified work items: projects + blog articles + collected resources
export type WorkItemType = "project" | "blog" | "resource";
export type WorkCategory =
  | "everything"
  | "direction"
  | "digital-art"
  | "commissions"
  | "experiential"
  | "classics"
  | "writing"
  | "resources";

export interface WorkItem {
  id: string;
  type: WorkItemType;
  categories: WorkCategory[];
  title: string;
  dateLabel: string;
  slug: string;
  image: string;
  /** 1 = single column, 2 = double column */
  span: 1 | 2;
  /** For resource items – external URL */
  resourceUrl?: string;
  resourceType?: "video" | "article" | "tool";
  excerpt?: string;
}

const ph = (seed: string) => `https://picsum.photos/seed/${seed}/1200/800`;

export const workItems: WorkItem[] = [
  // ── Projects (direction / commissions / experiential / classics) ───────────
  {
    id: "rivian-borealis",
    type: "project",
    categories: ["everything", "experiential", "commissions"],
    title: "Rivian – Borealis x Art Basel",
    dateLabel: "December 2025 —",
    slug: "/work/rivian-borealis-art-basel",
    image: ph("rivian-borealis-art-basel-primary"),
    span: 1,
  },
  {
    id: "future-space",
    type: "project",
    categories: ["everything", "digital-art"],
    title: "FUTURE of SPACE – Galápagos",
    dateLabel: "October 2025 —",
    slug: "/work/future-of-space-galapagos",
    image: ph("future-of-space-galapagos-primary"),
    span: 1,
  },
  {
    id: "bitcoin-history",
    type: "project",
    categories: ["everything", "digital-art", "commissions"],
    title: "The History of Bitcoin",
    dateLabel: "September 2025 —",
    slug: "/work/the-history-of-bitcoin",
    image: ph("the-history-of-bitcoin-primary"),
    span: 1,
  },
  {
    id: "nasa-europa",
    type: "project",
    categories: ["everything", "direction", "commissions"],
    title: "NASA – Europa Clipper",
    dateLabel: "October 2024 —",
    slug: "/work/nasa-europa-clipper",
    image: ph("nasa-europa-clipper-primary"),
    span: 1,
  },
  {
    id: "billie-eilish",
    type: "project",
    categories: ["everything", "direction"],
    title: "Billie Eilish – 2024 World Tour",
    dateLabel: "September 2024 —",
    slug: "/work/billie-eilish-2024-world-tour",
    image: ph("billie-eilish-2024-world-tour-primary"),
    span: 1,
  },
  {
    id: "sudden-rush",
    type: "project",
    categories: ["everything", "direction"],
    title: "Sudden Rush",
    dateLabel: "March 2024 —",
    slug: "/work/sudden-rush",
    image: ph("sudden-rush-primary"),
    span: 1,
  },
  // ── Blog Article (wide card) ──────────────────────────────────────────────
  {
    id: "blog-language-of-light",
    type: "blog",
    categories: ["everything", "writing"],
    title: "On the Language of Light",
    dateLabel: "February 2025 —",
    slug: "/work/blog/language-of-light",
    image: ph("blog-light-language"),
    span: 2,
    excerpt:
      "Light is not decoration. It is grammar — the syntax through which form speaks. After two decades of chasing luminance across film sets and render farms, here is what the photon has taught me.",
  },
  {
    id: "zbyhp",
    type: "project",
    categories: ["everything", "direction", "commissions"],
    title: "ZbyHP – Synchronize",
    dateLabel: "February 2024 —",
    slug: "/work/zbyhp-synchronize",
    image: ph("zbyhp-synchronize-primary"),
    span: 1,
  },
  {
    id: "synapse-code",
    type: "project",
    categories: ["everything", "direction", "digital-art"],
    title: "Synapse Code",
    dateLabel: "February 2024 —",
    slug: "/work/synapse-code",
    image: ph("synapse-code-primary"),
    span: 1,
  },
  // ── Resource (video) ─────────────────────────────────────────────────────
  {
    id: "res-film-in-a-box",
    type: "resource",
    categories: ["everything", "resources"],
    title: "Film in a Box – Robotic Cinematography Reel",
    dateLabel: "Collected 2024 —",
    slug: "/work/resource/film-in-a-box",
    image: ph("resource-film-box"),
    span: 1,
    resourceUrl: "https://vimeo.com/gmunk",
    resourceType: "video",
    excerpt: "Collected reference: Bot & Dolly robotic arm cinematography showcase.",
  },
  {
    id: "maestro-dobel",
    type: "project",
    categories: ["everything", "direction", "commissions"],
    title: "Maestro Dobel Diamante",
    dateLabel: "June 2023 —",
    slug: "/work/maestro-dobel-diamante",
    image: ph("maestro-dobel-diamante-primary"),
    span: 1,
  },
  {
    id: "bali-moon",
    type: "project",
    categories: ["everything", "digital-art"],
    title: "Bali Moon",
    dateLabel: "December 2023 —",
    slug: "/work/bali-moon",
    image: ph("bali-moon-primary"),
    span: 1,
  },
  // ── Blog Article ─────────────────────────────────────────────────────────
  {
    id: "blog-ritual-of-making",
    type: "blog",
    categories: ["everything", "writing"],
    title: "The Ritual of Making",
    dateLabel: "August 2023 —",
    slug: "/work/blog/ritual-of-making",
    image: ph("blog-ritual-making"),
    span: 1,
    excerpt:
      "The studio at 2am. The render progress bar. The feedback loop between eye and machine. Some thoughts on process as spiritual practice.",
  },
  {
    id: "tron-lightcycle",
    type: "project",
    categories: ["everything", "direction", "commissions"],
    title: "Tron Lightcycle Run",
    dateLabel: "April 2023 —",
    slug: "/work/tron-lightcycle-run",
    image: ph("tron-lightcycle-run-primary"),
    span: 1,
  },
  // ── Resource (article) ───────────────────────────────────────────────────
  {
    id: "res-sphere-render",
    type: "resource",
    categories: ["everything", "resources"],
    title: "Real-Time Ray Tracing in Production – SIGGRAPH Notes",
    dateLabel: "Collected 2023 —",
    slug: "/work/resource/siggraph-raytracing",
    image: ph("resource-siggraph-rt"),
    span: 2,
    resourceUrl: "https://www.siggraph.org",
    resourceType: "article",
    excerpt:
      "Collected reference: Comprehensive breakdown of real-time ray tracing pipelines from SIGGRAPH 2023. Essential reading for anyone working at the intersection of game engines and cinematic rendering.",
  },
  {
    id: "totem",
    type: "project",
    categories: ["everything", "experiential"],
    title: "The Totem",
    dateLabel: "September 2022 —",
    slug: "/work/the-totem",
    image: ph("the-totem-primary"),
    span: 1,
  },
  {
    id: "decima-offf",
    type: "project",
    categories: ["everything", "direction"],
    title: "DECIMA x OFFF 2022",
    dateLabel: "May 2022 —",
    slug: "/work/decima-x-offf2022",
    image: ph("decima-x-offf2022-primary"),
    span: 1,
  },
  {
    id: "inframunk",
    type: "project",
    categories: ["everything", "digital-art"],
    title: "InfraMunk vol.1",
    dateLabel: "April 2021 —",
    slug: "/work/inframunk-vol1",
    image: ph("inframunk-vol1-primary"),
    span: 1,
  },
  // ── Blog Article (wide) ──────────────────────────────────────────────────
  {
    id: "blog-notes-from-grid",
    type: "blog",
    categories: ["everything", "writing"],
    title: "Notes from the Grid",
    dateLabel: "January 2024 —",
    slug: "/work/blog/notes-from-grid",
    image: ph("blog-notes-grid"),
    span: 2,
    excerpt:
      "The portfolio as autobiography. Why I believe the work you keep is a moral choice, and what pruning the archive reveals about creative identity.",
  },
  {
    id: "symbiocene",
    type: "project",
    categories: ["everything", "digital-art"],
    title: "Symbiocene Mythologica",
    dateLabel: "January 2021 —",
    slug: "/work/symbiocene-mythologica",
    image: ph("symbiocene-mythologica-primary"),
    span: 1,
  },
  {
    id: "telestron",
    type: "project",
    categories: ["everything", "experiential", "classics"],
    title: "Telestron",
    dateLabel: "December 2017 —",
    slug: "/work/telestron",
    image: ph("telestron-primary"),
    span: 1,
  },
  // ── Resource (video) ─────────────────────────────────────────────────────
  {
    id: "res-analog-soul",
    type: "resource",
    categories: ["everything", "resources"],
    title: "Analog Soul – Scanner Photography in Motion",
    dateLabel: "Collected 2022 —",
    slug: "/work/resource/analog-soul",
    image: ph("resource-analog-soul"),
    span: 1,
    resourceUrl: "https://vimeo.com",
    resourceType: "video",
    excerpt: "Collected reference: Flatbed scanner as camera — experimental analog process film.",
  },
  {
    id: "audi-imagination",
    type: "project",
    categories: ["everything", "direction", "commissions", "classics"],
    title: "Audi Pure Imagination",
    dateLabel: "December 2016 —",
    slug: "/work/audi-pure-imagination",
    image: ph("audi-pure-imagination-primary"),
    span: 1,
  },
  {
    id: "windows10",
    type: "project",
    categories: ["everything", "direction", "commissions", "classics"],
    title: "Windows 10 Desktop",
    dateLabel: "July 2015 —",
    slug: "/work/windows-10-desktop",
    image: ph("windows-10-desktop-primary"),
    span: 1,
  },
  {
    id: "box",
    type: "project",
    categories: ["everything", "direction", "classics"],
    title: "BOX",
    dateLabel: "September 2013 —",
    slug: "/work/box",
    image: ph("box-primary"),
    span: 1,
  },
  {
    id: "oblivion",
    type: "project",
    categories: ["everything", "direction", "classics"],
    title: "Oblivion",
    dateLabel: "April 2013 —",
    slug: "/work/oblivion",
    image: ph("oblivion-primary"),
    span: 1,
  },
  {
    id: "tron-legacy",
    type: "project",
    categories: ["everything", "direction", "classics"],
    title: "Tron: Legacy",
    dateLabel: "December 2010 —",
    slug: "/work/tron-legacy",
    image: ph("tron-legacy-primary"),
    span: 2,
  },
];

export const FILTER_TABS: { key: WorkCategory; label: string }[] = [
  { key: "everything", label: "Everything." },
  { key: "direction", label: "Direction." },
  { key: "digital-art", label: "Digital Art." },
  { key: "commissions", label: "Commissions." },
  { key: "experiential", label: "Experiential." },
  { key: "classics", label: "Classics." },
  { key: "writing", label: "Writing." },
  { key: "resources", label: "Resources." },
];
