export type GalleryArchive = {
  year: string;
  title: string;
  summary: string;
  status: string;
  readinessLabel: string;
  readinessDetail: string;
  theme: string;
  tone: string;
  highlights: string[];
  expectedContent: string[];
};

export type GalleryWorkflowStage = {
  label: string;
  description: string;
};

export const galleryReadinessNotes = [
  "Use only approved public images from the final asset workflow.",
  "Do not publish raw source screenshots or private audit material.",
  "Check captions for child privacy, consent, and current publication suitability.",
];

export const galleryWorkflowStages: GalleryWorkflowStage[] = [
  {
    label: "Local review only",
    description:
      "Old-site exports, screenshots, and candidate photo batches stay out of public assets until reviewed.",
  },
  {
    label: "Approved media registry",
    description:
      "Only optimised images with consent status, alt text, captions, and year metadata are rendered.",
  },
  {
    label: "Public archive route",
    description:
      "Year pages are ready for launch-safe collections without exposing private source material.",
  },
];

export const gallerySupportLinks = [
  {
    label: "Explore schools",
    href: "/schools",
    description:
      "See current branch pages while historic gallery images are being selected.",
  },
  {
    label: "Start an enquiry",
    href: "/contact#enquiry-form",
    description:
      "Ask about classes or future places without relying on unpublished archive material.",
  },
];

export const galleryArchives: GalleryArchive[] = [
  {
    year: "2019",
    title: "2019 archive",
    theme: "Community events",
    tone: "Performances, celebrations, and school community moments that can show the school network's warmth once approved.",
    highlights: ["Assemblies", "Celebrations", "Creative work"],
  },
  {
    year: "2018",
    title: "2018 archive",
    theme: "Learning in action",
    tone: "Classroom work, projects, and language learning activities prepared for a careful privacy review.",
    highlights: ["Class projects", "Reading", "Group activities"],
  },
  {
    year: "2015",
    title: "2015 archive",
    theme: "School traditions",
    tone: "A historical archive for cultural celebrations and annual events once legacy images are checked for current suitability.",
    highlights: ["Traditions", "Literature", "Culture"],
  },
  {
    year: "2014",
    title: "2014 archive",
    theme: "Performing arts",
    tone: "A future home for approved stage, recital, and celebration images with public-safe captions.",
    highlights: ["Recitals", "Drama", "Music"],
  },
  {
    year: "2013",
    title: "2013 archive",
    theme: "Early archive",
    tone: "Reviewed legacy images can show the school network's established history without exposing raw archives.",
    highlights: ["Archive", "Community", "History"],
  },
  {
    year: "2012",
    title: "2012 archive",
    theme: "Foundations",
    tone: "The oldest retained route, ready for carefully reviewed public records and restrained captions.",
    highlights: ["Legacy", "Milestones", "School life"],
  },
].map((archive) => ({
  ...archive,
  summary:
    "This archive is reserved for reviewed, approved public images from the old site and school records. Raw screenshots and unreviewed source files are not published here.",
  status: "Images pending approved asset selection",
  readinessLabel: "Approved images pending",
  readinessDetail:
    "The route, placeholders, metadata expectations, and publication checks are ready for reviewed public media.",
  expectedContent: [
    ...galleryReadinessNotes,
    "Record source filename privately for traceability without exposing raw files.",
    "Optimise file size, alt text, and image dimensions before publishing.",
  ],
}));

export const galleryThemes = Array.from(
  new Set(galleryArchives.map((archive) => archive.theme)),
);

export function getGalleryArchive(year: string) {
  return galleryArchives.find((archive) => archive.year === year);
}
