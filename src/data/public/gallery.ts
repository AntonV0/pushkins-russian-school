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
  "School-life images are chosen for warmth, relevance, and family privacy.",
  "Captions explain the school moment without naming children unnecessarily.",
  "Collections balance classroom learning, performances, celebrations, locations, and creative work.",
];

export const galleryWorkflowStages: GalleryWorkflowStage[] = [
  {
    label: "School-life selection",
    description:
      "Photos are grouped around real school moments: lessons, performances, celebrations, creative work, and community history.",
  },
  {
    label: "Respectful captions",
    description:
      "Captions give families useful context while keeping children and families private.",
  },
  {
    label: "Public gallery collection",
    description:
      "Gallery collections become visual records of Russian learning, culture, performances, and school community.",
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
    label: "Tell us about your child",
    href: "/contact#enquiry-form",
    description:
      "Ask about classes, future places, online learning, or the right route for your child.",
  },
];

export const galleryCollections: GalleryCollection[] = [
  {
    slug: "classroom-learning",
    title: "Classroom learning",
    theme: "Lessons and learning",
    tone: "Classroom images show reading, writing, conversation, teacher-led learning, and the steady work behind bilingual confidence.",
    highlights: ["Lessons", "Reading", "Writing"],
  },
  {
    slug: "creative-work",
    title: "Creative work",
    theme: "Projects and making",
    tone: "Crafts, displays, notebooks, and hands-on activities show how children meet Russian culture creatively.",
    highlights: ["Crafts", "Projects", "Displays"],
  },
  {
    slug: "performances",
    title: "Performances",
    theme: "Stage and recital",
    tone: "Plays, recitals, assemblies, and cultural stage moments show speech, pronunciation, confidence, and creativity.",
    highlights: ["Drama", "Music", "Recitals"],
  },
  {
    slug: "celebrations",
    title: "Celebrations",
    theme: "Community and traditions",
    tone: "Celebrations, seasonal events, and shared traditions show Russian culture as something children can experience together.",
    highlights: ["Traditions", "Community", "Culture"],
  },
  {
    slug: "locations",
    title: "School locations",
    theme: "Places and rooms",
    tone: "Venue exteriors, classrooms, corridors, displays, and setting images help families picture the school environment.",
    highlights: ["Venues", "Classrooms", "Displays"],
  },
  {
    slug: "community-archive",
    title: "Community archive",
    theme: "School history",
    tone: "Archive images show the longer school story and the community that has grown around Russian language and culture.",
    highlights: ["Archive", "Milestones", "School life"],
  },
].map((archive) => ({
  ...archive,
  summary:
    "This gallery collection shows school-life images from Pushkin's School.",
  status: "School-life images",
  readinessLabel: "School-life collection",
  readinessDetail:
    "This collection brings together school photos, captions, and school-life context.",
  expectedContent: [
    ...galleryReadinessNotes,
    "Images should be accessible, well-captioned, and useful for the category where they appear.",
    "Lower-resolution archive images can be shown modestly when they add meaningful school-history context.",
    "Balance current location images with archive material where suitable images are available.",
  ],
}));

export const galleryThemes = Array.from(
  new Set(galleryCollections.map((archive) => archive.theme)),
);

export function getGalleryCollection(slug: string) {
  return galleryCollections.find((archive) => archive.slug === slug);
}
