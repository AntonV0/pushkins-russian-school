export type GalleryArchive = {
  year: string;
  title: string;
  summary: string;
  status: string;
  theme: string;
  tone: string;
  highlights: string[];
  expectedContent: string[];
};

export const galleryReadinessNotes = [
  "Use only approved public images from the final asset workflow.",
  "Do not publish raw source screenshots or private audit material.",
  "Check captions for child privacy, consent, and current publication suitability.",
];

export const galleryArchives: GalleryArchive[] = [
  {
    year: "2019",
    title: "2019 archive",
    theme: "Community events",
    tone: "Performances, celebrations, and school community moments.",
    highlights: ["Assemblies", "Celebrations", "Creative work"],
  },
  {
    year: "2018",
    title: "2018 archive",
    theme: "Learning in action",
    tone: "Classroom work, projects, and language learning activities.",
    highlights: ["Class projects", "Reading", "Group activities"],
  },
  {
    year: "2015",
    title: "2015 archive",
    theme: "School traditions",
    tone: "A historical archive for cultural celebrations and annual events.",
    highlights: ["Traditions", "Literature", "Culture"],
  },
  {
    year: "2014",
    title: "2014 archive",
    theme: "Performing arts",
    tone: "A future home for approved stage, recital, and celebration images.",
    highlights: ["Recitals", "Drama", "Music"],
  },
  {
    year: "2013",
    title: "2013 archive",
    theme: "Early archive",
    tone: "Reviewed legacy images can show the school network's established history.",
    highlights: ["Archive", "Community", "History"],
  },
  {
    year: "2012",
    title: "2012 archive",
    theme: "Foundations",
    tone: "The oldest retained route, ready for carefully reviewed public records.",
    highlights: ["Legacy", "Milestones", "School life"],
  },
].map((archive) => ({
  ...archive,
  summary:
    "This archive is reserved for reviewed, approved public images from the old site and school records.",
  status: "Images pending approved asset selection",
  expectedContent: [
    ...galleryReadinessNotes,
    "Optimise file size, alt text, and image dimensions before publishing.",
  ],
}));

export const galleryThemes = Array.from(
  new Set(galleryArchives.map((archive) => archive.theme)),
);

export function getGalleryArchive(year: string) {
  return galleryArchives.find((archive) => archive.year === year);
}
