import type {
  DetailGalleryRowItem,
  DetailMediaItem,
} from "@/components/work/detail/ProjectDetailMedia";

const image = (
  seed: string,
  width: number,
  height: number,
  alt: string
): DetailMediaItem & { type: "image" } => ({
  type: "image",
  src: `https://picsum.photos/seed/${seed}/${width}/${height}`,
  alt,
  width,
  height,
});

export const heroMedia: DetailMediaItem[] = [
  image(
    "bitcoin-history-hero-1",
    1600,
    1067,
    "The History of Bitcoin hero artwork 1"
  ),
  image(
    "bitcoin-history-hero-2",
    900,
    1350,
    "The History of Bitcoin hero artwork 2"
  ),
  image(
    "bitcoin-history-hero-3",
    900,
    1350,
    "The History of Bitcoin hero artwork 3"
  ),
];

export const commissionGallery: DetailGalleryRowItem[][] = [
  [
    {
      ...image(
        "bitcoin-history-commission-1",
        1600,
        1067,
        "Bitcoin commission gallery 1"
      ),
      basis: 50,
    },
    {
      ...image(
        "bitcoin-history-commission-2",
        1600,
        1067,
        "Bitcoin commission gallery 2"
      ),
      basis: 50,
    },
  ],
  [
    {
      ...image(
        "bitcoin-history-commission-3",
        900,
        1350,
        "Bitcoin commission gallery 3"
      ),
      basis: 30.766,
    },
    {
      ...image(
        "bitcoin-history-commission-4",
        1600,
        1067,
        "Bitcoin commission gallery 4"
      ),
      basis: 69.233,
    },
  ],
];

export const visualLanguageGallery: DetailGalleryRowItem[][] = [
  [
    {
      ...image(
        "bitcoin-history-language-1",
        1600,
        1067,
        "Bitcoin visual language gallery 1"
      ),
      basis: 50.003,
    },
    {
      ...image(
        "bitcoin-history-language-2",
        1600,
        1067,
        "Bitcoin visual language gallery 2"
      ),
      basis: 49.996,
    },
  ],
  [
    {
      ...image(
        "bitcoin-history-language-3",
        1600,
        1067,
        "Bitcoin visual language gallery 3"
      ),
      basis: 68.471,
    },
    {
      ...image(
        "bitcoin-history-language-4",
        900,
        1350,
        "Bitcoin visual language gallery 4"
      ),
      basis: 31.528,
    },
  ],
];

export const artifactGallery: DetailGalleryRowItem[][] = [
  [
    {
      ...image(
        "bitcoin-history-artifact-1",
        1600,
        1067,
        "Bitcoin artifact gallery 1"
      ),
      basis: 69.233,
    },
    {
      ...image(
        "bitcoin-history-artifact-2",
        900,
        1350,
        "Bitcoin artifact gallery 2"
      ),
      basis: 30.766,
    },
  ],
  [
    {
      ...image(
        "bitcoin-history-artifact-3",
        1600,
        1067,
        "Bitcoin artifact gallery 3"
      ),
      basis: 50,
    },
    {
      ...image(
        "bitcoin-history-artifact-4",
        1600,
        1067,
        "Bitcoin artifact gallery 4"
      ),
      basis: 50,
    },
  ],
];
