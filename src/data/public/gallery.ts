export type GalleryCollection = {
  slug: string;
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
      "Each public image needs suitable consent, alt text, captioning, and useful category context.",
  },
  {
    label: "Public gallery collection",
    description:
      "Gallery collections become visual records of school life when selected images are ready.",
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

export const galleryCollections: GalleryCollection[] = [
  {
    slug: "classroom-learning",
    title: "Classroom learning",
    theme: "Lessons and learning",
    tone: "Selected classroom images can show reading, writing, conversation, and teacher-led learning without relying on a specific upload year.",
    highlights: ["Lessons", "Reading", "Writing"],
  },
  {
    slug: "creative-work",
    title: "Creative work",
    theme: "Projects and making",
    tone: "Crafts, displays, notebooks, and hands-on activities can give the archive warmth even when older source images need modest sizing.",
    highlights: ["Crafts", "Projects", "Displays"],
  },
  {
    slug: "performances",
    title: "Performances",
    theme: "Stage and recital",
    tone: "The performance collection can hold plays, recitals, assemblies, and cultural stage moments from both current school folders and legacy uploads.",
    highlights: ["Drama", "Music", "Recitals"],
  },
  {
    slug: "celebrations",
    title: "Celebrations",
    theme: "Community and traditions",
    tone: "Celebrations, seasonal events, and shared school traditions can sit together as a public archive collection after consent checks.",
    highlights: ["Traditions", "Community", "Culture"],
  },
  {
    slug: "locations",
    title: "School locations",
    theme: "Places and rooms",
    tone: "Venue exteriors, classrooms, corridors, displays, and low-privacy setting images can support the gallery and individual location pages.",
    highlights: ["Venues", "Classrooms", "Displays"],
  },
  {
    slug: "community-archive",
    title: "Community archive",
    theme: "School history",
    tone: "Legacy upload-folder images can become a broader school-history showcase when they are resized appropriately and captioned carefully.",
    highlights: ["Archive", "Milestones", "School life"],
  },
].map((archive) => ({
  ...archive,
  summary:
    "This gallery collection is reserved for selected public images from school records.",
  status: "Images being selected for public use",
  readinessLabel: "Gallery images in preparation",
  readinessDetail:
    "This collection is reserved for selected public photos, captions, and school-life context.",
  expectedContent: [
    ...galleryReadinessNotes,
    "Images should be accessible, well-captioned, and suitable for the category where they appear.",
    "Resize lower-quality legacy images for modest display rather than rejecting them solely for resolution.",
    "Balance current location images with archive material where suitable images are available.",
  ],
}));

export const galleryThemes = Array.from(
  new Set(galleryCollections.map((archive) => archive.theme)),
);

export function getGalleryCollection(slug: string) {
  return galleryCollections.find((archive) => archive.slug === slug);
}
