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
  "Use only images selected for public school use.",
  "Show only school images that are suitable for families to view publicly.",
  "Check captions for child privacy, consent, and current publication suitability.",
];

export const galleryWorkflowStages: GalleryWorkflowStage[] = [
  {
    label: "Careful selection",
    description:
      "Archive photos are selected carefully before they are shown to prospective families.",
  },
  {
    label: "Caption and consent check",
    description:
      "Each public image needs suitable consent, alt text, captioning, and year context.",
  },
  {
    label: "Public archive page",
    description:
      "Year pages become visual records of school life when selected images are ready.",
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
      "Ask about classes or future places while archive images are being selected.",
  },
];

export const galleryArchives: GalleryArchive[] = [
  {
    year: "2019",
    title: "2019 archive",
    theme: "Community events",
    tone: "Performances, celebrations, and school community moments that can show the warmth of school life once suitable images are selected.",
    highlights: ["Assemblies", "Celebrations", "Creative work"],
  },
  {
    year: "2018",
    title: "2018 archive",
    theme: "Learning in action",
    tone: "Classroom work, projects, and language learning activities that can show school life once suitable images are selected.",
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
    tone: "A future home for selected stage, recital, and celebration images with public-safe captions.",
    highlights: ["Recitals", "Drama", "Music"],
  },
  {
    year: "2013",
    title: "2013 archive",
    theme: "Early archive",
    tone: "Selected legacy images can show the school's established history in a careful public format.",
    highlights: ["Archive", "Community", "History"],
  },
  {
    year: "2012",
    title: "2012 archive",
    theme: "Foundations",
    tone: "The oldest retained archive year, ready for carefully selected public records and restrained captions.",
    highlights: ["Legacy", "Milestones", "School life"],
  },
].map((archive) => ({
  ...archive,
  summary:
    "This archive is reserved for selected public images from school records.",
  status: "Images being selected for public use",
  readinessLabel: "Archive images in preparation",
  readinessDetail:
    "This year page is reserved for selected public photos, captions, and school-life context.",
  expectedContent: [
    ...galleryReadinessNotes,
    "Images should be accessible, well-captioned, and suitable for the archive year.",
    "Balance classroom, creative, performance, and community moments where suitable images are available.",
  ],
}));

export const galleryThemes = Array.from(
  new Set(galleryArchives.map((archive) => archive.theme)),
);

export function getGalleryArchive(year: string) {
  return galleryArchives.find((archive) => archive.year === year);
}
