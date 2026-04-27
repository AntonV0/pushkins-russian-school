export type GalleryArchive = {
  year: string;
  title: string;
  summary: string;
  status: string;
  expectedContent: string[];
};

export const galleryArchives: GalleryArchive[] = [
  "2019",
  "2018",
  "2015",
  "2014",
  "2013",
  "2012",
].map((year) => ({
  year,
  title: `${year} archive`,
  summary:
    "This archive is reserved for reviewed, approved public images from the old site and school records.",
  status: "Images pending approved asset selection",
  expectedContent: [
    "Optimised public images only",
    "No raw source screenshots",
    "Captions checked for privacy and consent",
  ],
}));

export function getGalleryArchive(year: string) {
  return galleryArchives.find((archive) => archive.year === year);
}
