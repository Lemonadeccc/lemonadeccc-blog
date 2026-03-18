import type {
  DetailWallImage,
  DetailWallImageOrientation,
} from "@/components/work/detail/ProjectDetailMedia";

const placeholder = (
  seed: string,
  orientation: DetailWallImageOrientation
): DetailWallImage => {
  const sizes = {
    landscape: { width: 1200, height: 800 },
    portrait: { width: 900, height: 1350 },
    wide: { width: 1600, height: 900 },
  }[orientation];

  return {
    src: `https://picsum.photos/seed/${seed}/${sizes.width}/${sizes.height}`,
    alt: seed.replaceAll("-", " "),
    orientation,
  };
};

const gallery = (
  slug: string,
  specs: DetailWallImageOrientation[]
): DetailWallImage[] =>
  specs.map((orientation, index) =>
    placeholder(`${slug}-detail-${index + 1}`, orientation)
  );

export const leadGalleryA = gallery("future-intro-a", [
  "portrait",
  "portrait",
  "portrait",
]);

export const leadGalleryB = gallery("future-intro-b", [
  "landscape",
  "landscape",
]);

export const studyGallery = gallery("future-study", [
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
  "portrait",
]);

export const experienceGallery = gallery("future-experience", [
  "landscape",
  "landscape",
  "landscape",
  "landscape",
  "landscape",
  "landscape",
  "landscape",
  "landscape",
  "landscape",
  "landscape",
]);
