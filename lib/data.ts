import type { Project, RepresentationColumn, SocialLink } from "@/lib/types";

const placeholder = (seed: string) =>
  `https://picsum.photos/seed/${seed}/800/600`;

const createProject = ({
  imageSeed,
  hoverSeed,
  ...project
}: Omit<Project, "image" | "hoverImage"> & {
  imageSeed: string;
  hoverSeed: string;
}): Project => ({
  ...project,
  image: placeholder(imageSeed),
  hoverImage: placeholder(hoverSeed),
});

export const recentProjects: Project[] = [
  createProject({
    slug: "rivian-borealis-art-basel",
    title: "Rivian Borealis x Art Basel",
    category: "Experiential Brand Activation",
    dateLabel: "December 2025",
    year: 2025,
    summary:
      "Experiential brand activation created for Rivian's Borealis installation at Art Basel.",
    imageSeed: "rivian-borealis-art-basel-primary",
    hoverSeed: "rivian-borealis-art-basel-secondary",
    sections: ["recent"],
  }),
  createProject({
    slug: "future-of-space-galapagos",
    title: "FUTURE of SPACE Galápagos",
    category: "Featured Artist in Residence",
    dateLabel: "October 2025",
    year: 2025,
    summary:
      "Featured artist in residence project exploring immersive digital art and environment design.",
    imageSeed: "future-of-space-galapagos-primary",
    hoverSeed: "future-of-space-galapagos-secondary",
    sections: ["recent"],
  }),
  createProject({
    slug: "the-history-of-bitcoin",
    title: "The History of Bitcoin",
    category: "Digital Art for Collectors Book",
    dateLabel: "November 2025",
    year: 2025,
    summary:
      "Digital art contribution built for a collectors-focused book on the history of Bitcoin.",
    imageSeed: "the-history-of-bitcoin-primary",
    hoverSeed: "the-history-of-bitcoin-secondary",
    sections: ["recent"],
  }),
  createProject({
    slug: "nasa-europa-clipper",
    title: "NASA Europa Clipper",
    category: "Marketing Campaign",
    dateLabel: "October 2024",
    year: 2024,
    summary:
      "Campaign visuals tied to NASA's Europa Clipper launch and mission storytelling.",
    imageSeed: "nasa-europa-clipper-primary",
    hoverSeed: "nasa-europa-clipper-secondary",
    sections: ["recent"],
  }),
  createProject({
    slug: "billie-eilish-2024-world-tour",
    title: "Billie Eilish 2024 World Tour",
    category: "Concert Visuals",
    dateLabel: "September 2024",
    year: 2024,
    summary:
      "Large-scale concert visuals created for Billie Eilish's 2024 world tour.",
    imageSeed: "billie-eilish-2024-world-tour-primary",
    hoverSeed: "billie-eilish-2024-world-tour-secondary",
    sections: ["recent"],
  }),
  createProject({
    slug: "zbyhp-synchronize",
    title: "ZbyHP Synchronize",
    category: "Music Video",
    dateLabel: "February 2024",
    year: 2024,
    summary:
      "Music video for Z by HP blending abstract motion, atmosphere, and machine-made texture.",
    imageSeed: "zbyhp-synchronize-primary",
    hoverSeed: "zbyhp-synchronize-secondary",
    sections: ["recent"],
  }),
  createProject({
    slug: "maestro-dobel-diamante",
    title: "Maestro Dobel Diamante",
    category: "Commercial Campaign",
    dateLabel: "June 2023",
    year: 2023,
    summary:
      "Commercial campaign built around premium lighting, cinematic composition, and brand spectacle.",
    imageSeed: "maestro-dobel-diamante-primary",
    hoverSeed: "maestro-dobel-diamante-secondary",
    sections: ["recent"],
  }),
  createProject({
    slug: "tron-lightcycle-run",
    title: "Tron Lightcycle Run",
    category: "Commercial Campaign",
    dateLabel: "April 2023",
    year: 2023,
    summary:
      "Commercial campaign work inspired by Disney's TRON universe and kinetic light language.",
    imageSeed: "tron-lightcycle-run-primary",
    hoverSeed: "tron-lightcycle-run-secondary",
    sections: ["recent"],
  }),
];

export const featuredProjects: Project[] = [
  createProject({
    slug: "sudden-rush",
    title: "Sudden Rush",
    category: "Live-Action Montage",
    dateLabel: "March 2024",
    year: 2024,
    summary: "A live-action montage reel cut from more than a decade of GMUNK work.",
    imageSeed: "sudden-rush-primary",
    hoverSeed: "sudden-rush-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "synapse-code",
    title: "Synapse Code",
    category: "Experiential Film",
    dateLabel: "February 2024",
    year: 2024,
    summary:
      "Experiential film about machine perception, emotional data, and the beauty of nature.",
    imageSeed: "synapse-code-primary",
    hoverSeed: "synapse-code-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "bali-moon",
    title: "Bali Moon",
    category: "Digital Art Single Edition",
    dateLabel: "December 2023",
    year: 2023,
    summary: "Single-edition digital artwork from the InfraMunk is Breathing body of work.",
    imageSeed: "bali-moon-primary",
    hoverSeed: "bali-moon-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "the-totem",
    title: "The Totem",
    category: "Illuminated Sculpture",
    dateLabel: "September 2022",
    year: 2022,
    summary:
      "Illuminated sculpture created for a large-scale psychedelic experiential exhibition.",
    imageSeed: "the-totem-primary",
    hoverSeed: "the-totem-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "decima-x-offf2022",
    title: "DECIMA x OFFF2022",
    category: "Title Sequence",
    dateLabel: "May 2022",
    year: 2022,
    summary: "A title sequence about ritual, rebirth, mortality, and robotic mysticism.",
    imageSeed: "decima-x-offf2022-primary",
    hoverSeed: "decima-x-offf2022-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "inframunk-vol1",
    title: "InfraMunk vol1",
    category: "Digital Art Collection",
    dateLabel: "April 2021",
    year: 2021,
    summary:
      "Digital art collection built from full-spectrum landscape photography and time-based studies.",
    imageSeed: "inframunk-vol1-primary",
    hoverSeed: "inframunk-vol1-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "symbiocene-mythologica",
    title: "Symbiocene Mythologica",
    category: "Digital Art Collection",
    dateLabel: "January 2021",
    year: 2021,
    summary:
      "Genesis digital art collection inspired by elemental titans and mythic archetypes.",
    imageSeed: "symbiocene-mythologica-primary",
    hoverSeed: "symbiocene-mythologica-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "telestron",
    title: "Telestron",
    category: "Robotic Light Installation",
    dateLabel: "December 2017",
    year: 2017,
    summary:
      "Robotic light installation built for Day for Night as an immersive ritual experience.",
    imageSeed: "telestron-primary",
    hoverSeed: "telestron-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "the-munky-king",
    title: "The Munky King",
    category: "Photography Series",
    dateLabel: "December 2017",
    year: 2017,
    summary:
      "Photography series exploring a surreal beast-and-beauty narrative in a studio setting.",
    imageSeed: "the-munky-king-primary",
    hoverSeed: "the-munky-king-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "audi-pure-imagination",
    title: "Audi Pure Imagination",
    category: "Commercial Campaign",
    dateLabel: "December 2016",
    year: 2016,
    summary:
      "Commercial campaign imagining what an artificial intelligence dream could look like.",
    imageSeed: "audi-pure-imagination-primary",
    hoverSeed: "audi-pure-imagination-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "windows-10-desktop",
    title: "Windows 10 Desktop",
    category: "Global Branding Campaign",
    dateLabel: "July 2015",
    year: 2015,
    summary:
      "Global branding campaign that produced the iconic Windows 10 desktop wallpaper.",
    imageSeed: "windows-10-desktop-primary",
    hoverSeed: "windows-10-desktop-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "box",
    title: "BOX",
    category: "Robotic Projection Mapping",
    dateLabel: "September 2013",
    year: 2013,
    summary: "Robotic projection mapping short film created with Bot & Dolly.",
    imageSeed: "box-primary",
    hoverSeed: "box-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "oblivion",
    title: "Oblivion",
    category: "Feature Film Interface Design",
    dateLabel: "April 2013",
    year: 2013,
    summary:
      "Feature film interface design developed for Joseph Kosinski's science-fiction world.",
    imageSeed: "oblivion-primary",
    hoverSeed: "oblivion-secondary",
    sections: ["featured"],
  }),
  createProject({
    slug: "tron-legacy",
    title: "Tron: Legacy",
    category: "Feature Film Hologram Design",
    dateLabel: "December 2010",
    year: 2010,
    summary: "Feature film hologram design created during GMUNK's Digital Domain period.",
    imageSeed: "tron-legacy-primary",
    hoverSeed: "tron-legacy-secondary",
    sections: ["featured"],
  }),
];

export const allProjects: Project[] = [...recentProjects, ...featuredProjects];

const projectsBySlug = new Map(allProjects.map((p) => [p.slug, p]));

export const getProjectBySlug = (slug: string): Project | undefined =>
  projectsBySlug.get(slug);

export const representation: RepresentationColumn[] = [
  {
    title: "Live-Action",
    regions: [
      {
        name: "North America",
        contacts: [
          {
            agency: "Tool",
            agencyUrl: "https://toolofna.com",
            name: "Michelle Towse",
            role: "Managing Director",
            phone: "+1 (516) 652-7402",
          },
        ],
      },
      {
        name: "Europe",
        contacts: [
          {
            agency: "Partizan",
            agencyUrl: "https://www.partizan.com",
            name: "Duncan Gaman",
            role: "EP London",
            phone: "+44 (0) 788 697 2305",
          },
        ],
      },
    ],
  },
  {
    title: "Digital Art",
    regions: [
      {
        name: "North America + Europe",
        contacts: [
          {
            agency: "ATRBUTE",
            agencyUrl: "https://www.atrbute.com",
            name: "Ronnie K. Pirovino",
            role: "Chief Curator",
            phone: "+1 (310) 251-8831",
          },
        ],
      },
      {
        name: "Asia + Middle East + Africa",
        contacts: [
          {
            agency: "Triple X",
            name: "Tung Yuk Li",
            role: "Chief Curator",
            phone: "+1 (917) 319-9085",
          },
        ],
      },
    ],
  },
  {
    title: "Experiential",
    regions: [
      {
        name: "Global",
        contacts: [
          {
            agency: "Tool",
            agencyUrl: "https://toolofna.com",
            name: "Dustin Callif",
            role: "Managing Director",
            phone: "+1 (310) 453-9244",
          },
        ],
      },
    ],
  },
  {
    title: "Entertainment",
    regions: [
      {
        name: "Global",
        contacts: [
          {
            agency: "RW Media",
            agencyUrl: "https://rwmedia.tv",
            name: "Randi Wilens",
            role: "Managing Director",
            phone: "+1 (310) 466-7508",
          },
        ],
      },
    ],
  },
];

export const studioEmail = "gmunkowitz@gmail.com";

export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/gmunk/" },
  { label: "Twitter", href: "https://twitter.com/gmunk" },
  { label: "Behance", href: "https://www.behance.net/gmunk" },
  { label: "Vimeo", href: "https://vimeo.com/gmunk" },
  { label: "Spotify", href: "https://open.spotify.com/user/munkowitz" },
  { label: "Pinterest", href: "https://www.pinterest.com/gmunk/" },
  { label: "Facebook", href: "https://www.facebook.com/gmunkowitz" },
  { label: "Collect", href: "/collect" },
];
