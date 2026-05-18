import type { School } from "@/data/public/schools";

export type MediaAssetCategory =
  | "classroom"
  | "event"
  | "creative-work"
  | "performance"
  | "location"
  | "portrait-safe"
  | "celebration"
  | "community-archive"
  | "brand-legacy"
  | "illustration";

export type MediaAssetCollection = "location" | "archive" | "site";

export type MediaConsentStatus =
  | "approved-for-public-web"
  | "approved-limited-use"
  | "needs-review"
  | "do-not-use";

export type MediaQualityRating = "hero" | "feature" | "archive" | "replace";

export type VisualPlaceholderPage =
  | "home"
  | "about"
  | "curriculum"
  | "admissions"
  | "schools"
  | "gallery";

export type VisualPlaceholderMotif =
  | "language-table"
  | "culture-shelf"
  | "learning-journey"
  | "archive-grid";

export type VisualPlaceholderStatus =
  | "illustration-ready"
  | "photo-pending"
  | "gallery-placeholder";

export type MediaAsset = {
  id: string;
  sourceFilename: string;
  sourceRelativePath?: string;
  sourceCollection: MediaAssetCollection;
  approvedPublicPath: string;
  altText: string;
  caption: string;
  year?: string;
  branchSlug?: School["slug"] | "exeter" | "network" | "online";
  galleryCategorySlug?: string;
  category: MediaAssetCategory;
  consentStatus: MediaConsentStatus;
  qualityRating: MediaQualityRating;
  recommendedUse?: "hero" | "about" | "location-page" | "gallery" | "supporting";
  notes?: string[];
};

export type VisualPlaceholderSlot = {
  id: string;
  page: VisualPlaceholderPage;
  title: string;
  eyebrow: string;
  summary: string;
  motif: VisualPlaceholderMotif;
  status: VisualPlaceholderStatus;
  statusLabel: string;
  futureAssetRole: MediaQualityRating;
  suggestedPrompt: string;
  altTextWhenGenerated: string;
  usageNotes: string[];
};

export type MediaIntakeField = {
  label: string;
  description: string;
  required: boolean;
};

export const approvedMediaAssets: MediaAsset[] = [
  {
    id: "IMG-0061",
    sourceFilename: "20200202_093324.jpg",
    sourceRelativePath: "Pushkin Images/Chelmsford/20200202_093324.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/chelmsford/chelmsford-school-exterior.webp",
    altText: "Exterior view of a Chelmsford school venue used for Russian classes.",
    caption: "Chelmsford venue exterior.",
    branchSlug: "chelmsford",
    galleryCategorySlug: "locations",
    category: "location",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "location-page",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0062",
    sourceFilename: "20200202_095230.jpg",
    sourceRelativePath: "Pushkin Images/Chelmsford/20200202_095230.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/chelmsford/chelmsford-school-corridor.webp",
    altText: "A corridor and lockers inside a Chelmsford school venue.",
    caption: "Chelmsford school corridor.",
    branchSlug: "chelmsford",
    galleryCategorySlug: "locations",
    category: "location",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "supporting",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0066",
    sourceFilename: "20200202_095342.jpg",
    sourceRelativePath: "Pushkin Images/Chelmsford/20200202_095342.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/chelmsford/chelmsford-classroom-empty.webp",
    altText: "An empty classroom prepared for weekend Russian school lessons.",
    caption: "Classroom prepared for learning.",
    branchSlug: "chelmsford",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "location-page",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0069",
    sourceFilename: "59409854_2354014154662733_4307194715704393728_o.jpg",
    sourceRelativePath:
      "Pushkin Images/Chelmsford/59409854_2354014154662733_4307194715704393728_o.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/chelmsford/chelmsford-creative-work.webp",
    altText: "Children's creative work displayed for a Russian school activity.",
    caption: "Creative work from the school archive.",
    branchSlug: "chelmsford",
    galleryCategorySlug: "creative-work",
    category: "creative-work",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0127",
    sourceFilename: "20200118_104051.jpg",
    sourceRelativePath: "Pushkin Images/Southend/20200118_104051.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/southend-on-sea/southend-school-lockers.webp",
    altText: "Orange lockers inside a Southend-on-Sea school venue.",
    caption: "Southend-on-Sea venue detail.",
    branchSlug: "southend-on-sea",
    galleryCategorySlug: "locations",
    category: "location",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "supporting",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0129",
    sourceFilename: "20200118_104121.jpg",
    sourceRelativePath: "Pushkin Images/Southend/20200118_104121.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/southend-on-sea/southend-school-corridor.webp",
    altText: "A corridor in a Southend-on-Sea school venue.",
    caption: "Southend-on-Sea school corridor.",
    branchSlug: "southend-on-sea",
    galleryCategorySlug: "locations",
    category: "location",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "location-page",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0134",
    sourceFilename: "20200118_105537.jpg",
    sourceRelativePath: "Pushkin Images/Southend/20200118_105537.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/southend-on-sea/southend-classroom-setup.webp",
    altText: "A classroom arranged for a Russian school lesson.",
    caption: "Classroom ready for weekend learning.",
    branchSlug: "southend-on-sea",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "location-page",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0135",
    sourceFilename: "20200118_105555.jpg",
    sourceRelativePath: "Pushkin Images/Southend/20200118_105555.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/southend-on-sea/southend-classroom-table.webp",
    altText: "Classroom tables and a whiteboard set up for Russian school.",
    caption: "Classroom learning space.",
    branchSlug: "southend-on-sea",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "supporting",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0148",
    sourceFilename: "20200201_145556.jpg",
    sourceRelativePath: "Pushkin Images/Southend/20200201_145556.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/southend-on-sea/southend-learning-materials.webp",
    altText: "Learning materials arranged on a Russian school classroom table.",
    caption: "Learning materials in use.",
    branchSlug: "southend-on-sea",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0162",
    sourceFilename: "Maths activity 2.jpg",
    sourceRelativePath: "Pushkin Images/Southend/Maths activity 2.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/southend-on-sea/southend-maths-activity.webp",
    altText: "A hands-on maths activity prepared for a classroom lesson.",
    caption: "Hands-on classroom activity.",
    branchSlug: "southend-on-sea",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: [
      "Batch 1 low-privacy starter asset.",
      "Source filename transliterated in metadata to keep this file ASCII.",
    ],
  },
  {
    id: "IMG-0008",
    sourceFilename: "DSC02688.JPG",
    sourceRelativePath: "Exeter/DSC02688.JPG",
    sourceCollection: "location",
    approvedPublicPath: "/images/locations/exeter/exeter-workbook-detail.webp",
    altText: "A Russian language workbook open on a classroom table.",
    caption: "Workbook detail from the Exeter archive.",
    branchSlug: "exeter",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0035",
    sourceFilename: "DSC02802.JPG",
    sourceRelativePath: "Exeter/DSC02802.JPG",
    sourceCollection: "location",
    approvedPublicPath: "/images/locations/exeter/exeter-cultural-table.webp",
    altText: "Cultural learning materials and crafts arranged on a table.",
    caption: "Cultural materials from the Exeter archive.",
    branchSlug: "exeter",
    galleryCategorySlug: "creative-work",
    category: "creative-work",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0037",
    sourceFilename: "DSC02805.JPG",
    sourceRelativePath: "Exeter/DSC02805.JPG",
    sourceCollection: "location",
    approvedPublicPath: "/images/locations/exeter/exeter-craft-detail.webp",
    altText: "A close-up of a classroom craft activity.",
    caption: "Creative classroom activity.",
    branchSlug: "exeter",
    galleryCategorySlug: "creative-work",
    category: "creative-work",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0207",
    sourceFilename: "IMG_0917.jpg",
    sourceRelativePath: "Pushkin Images/Wycombe/IMG_0917.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/high-wycombe/high-wycombe-learning-materials.webp",
    altText: "Learning materials on a classroom table in High Wycombe.",
    caption: "Learning materials from High Wycombe.",
    branchSlug: "high-wycombe",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: ["Batch 1 low-privacy starter asset."],
  },
  {
    id: "IMG-0208",
    sourceFilename: "IMG_0919.jpg",
    sourceRelativePath: "Pushkin Images/Wycombe/IMG_0919.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/high-wycombe/high-wycombe-classroom-materials.webp",
    altText: "Classroom learning materials from the High Wycombe archive.",
    caption: "Classroom materials from High Wycombe.",
    branchSlug: "high-wycombe",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: [
      "Batch 1 low-privacy starter asset.",
      "Review final gallery balance against IMG-0207 to avoid repetition.",
    ],
  },
  {
    id: "IMG-0006",
    sourceFilename: "DSC02682.JPG",
    sourceRelativePath: "Exeter/DSC02682.JPG",
    sourceCollection: "location",
    approvedPublicPath: "/images/locations/exeter/exeter-classroom-learning.webp",
    altText: "A teacher working with children around a Russian classroom table.",
    caption: "Teacher-led classroom learning.",
    branchSlug: "exeter",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "hero",
    recommendedUse: "gallery",
    notes: [
      "Batch 2 consent-dependent image added after user approval to continue migration.",
      "Use as a warm classroom archive image; avoid isolating individual pupils in tighter crops.",
    ],
  },
  {
    id: "IMG-0014",
    sourceFilename: "DSC02707.JPG",
    sourceRelativePath: "Exeter/DSC02707.JPG",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/exeter/exeter-teacher-alphabet-lesson.webp",
    altText: "A teacher holding a Russian alphabet lesson sheet.",
    caption: "Teacher-led alphabet lesson.",
    branchSlug: "exeter",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: [
      "Batch 2 consent-dependent image added after user approval to continue migration.",
      "Staff approval should remain documented outside the repository.",
    ],
  },
  {
    id: "IMG-0047",
    sourceFilename: "DSC02823.JPG",
    sourceRelativePath: "Exeter/DSC02823.JPG",
    sourceCollection: "location",
    approvedPublicPath: "/images/locations/exeter/exeter-staff-portrait.webp",
    altText: "A staff portrait photographed against a plain white background.",
    caption: "Staff portrait from the Exeter archive.",
    branchSlug: "exeter",
    galleryCategorySlug: "community-archive",
    category: "portrait-safe",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: [
      "Batch 2 consent-dependent image added after user approval to continue migration.",
      "Could be moved to a future staff/team page if that content model is added.",
    ],
  },
  {
    id: "IMG-0052",
    sourceFilename: "IMG_7572-24-06-19-03-47.jpeg",
    sourceRelativePath:
      "Pushkin Images/Bracknell/IMG_7572-24-06-19-03-47.jpeg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/bracknell/bracknell-performance-wide.webp",
    altText: "Children performing in front of families at a school event.",
    caption: "Bracknell school performance.",
    branchSlug: "bracknell",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "location-page",
    notes: [
      "Batch 2 consent-dependent image added after user approval to continue migration.",
      "Wide event crop keeps the school context rather than isolating individual children.",
    ],
  },
  {
    id: "IMG-0054",
    sourceFilename: "IMG_7574-24-06-19-03-47.jpeg",
    sourceRelativePath:
      "Pushkin Images/Bracknell/IMG_7574-24-06-19-03-47.jpeg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/bracknell-performance-archive.webp",
    altText: "A group of children taking part in a school performance.",
    caption: "Performance archive from Bracknell.",
    branchSlug: "bracknell",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Batch 2 consent-dependent image added after user approval to continue migration.",
      "Use mainly in the performances gallery to avoid repeating the Bracknell location lead.",
    ],
  },
  {
    id: "IMG-0114",
    sourceFilename: "43555392_2052275531503265_7892437082860158976_o.jpg",
    sourceRelativePath:
      "Pushkin Images/Hemel/43555392_2052275531503265_7892437082860158976_o.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/hemel-hempstead/hemel-classroom-learning.webp",
    altText: "Children working at tables during a Russian school lesson.",
    caption: "Hemel Hempstead classroom learning.",
    branchSlug: "hemel-hempstead",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "location-page",
    notes: [
      "Batch 2 consent-dependent image added after user approval to continue migration.",
      "Wide classroom crop keeps pupils within learning context.",
    ],
  },
  {
    id: "IMG-0118",
    sourceFilename: "54255307_2280045542059595_7246337198243446784_o_edited.jpg",
    sourceRelativePath:
      "Pushkin Images/Hemel/54255307_2280045542059595_7246337198243446784_o_edited.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/hemel-performance-archive.webp",
    altText: "Children standing in a line during a school performance activity.",
    caption: "Performance archive from Hemel Hempstead.",
    branchSlug: "hemel-hempstead",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Batch 2 consent-dependent image added after user approval to continue migration.",
      "Cropped after export to remove a foreground obstruction.",
    ],
  },
  {
    id: "IMG-0174",
    sourceFilename: "74990929_2746020105462134_1518598537766502400_o.jpg",
    sourceRelativePath:
      "Pushkin Images/Wycombe/74990929_2746020105462134_1518598537766502400_o.jpg",
    sourceCollection: "location",
    approvedPublicPath:
      "/images/locations/high-wycombe/high-wycombe-classroom-wide.webp",
    altText: "Children writing at tables in a High Wycombe classroom.",
    caption: "High Wycombe classroom learning.",
    branchSlug: "high-wycombe",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "location-page",
    notes: [
      "Batch 2 consent-dependent image added after user approval to continue migration.",
      "Wide classroom image keeps pupils in learning context.",
    ],
  },
  {
    id: "IMG-0212",
    sourceFilename: "2012-01-02_13h06m47s_MC_60D_5862_edited-1.jpg",
    sourceRelativePath:
      "uploads/2012/02/2012-01-02_13h06m47s_MC_60D_5862_edited-1.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/celebrations/archive-winter-market-visit.webp",
    altText: "Children visiting a seasonal winter market display.",
    caption: "Seasonal visit from the school archive.",
    year: "2012",
    branchSlug: "network",
    galleryCategorySlug: "celebrations",
    category: "celebration",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Archive gallery only: public outing context and identifiable children make it unsuitable for homepage or promotional hero use.",
    ],
  },
  {
    id: "IMG-0224",
    sourceFilename: "cropped-2011-12-10_13h51m28s_MC_60D_5080-1000x288.jpg",
    sourceRelativePath:
      "uploads/2012/02/cropped-2011-12-10_13h51m28s_MC_60D_5080-1000x288.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/celebrations/archive-new-year-classroom-visit.webp",
    altText: "Children gathered for a New Year classroom celebration.",
    caption: "New Year classroom celebration.",
    year: "2012",
    branchSlug: "network",
    galleryCategorySlug: "celebrations",
    category: "celebration",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Wide legacy banner crop; use at modest display sizes.",
    ],
  },
  {
    id: "IMG-0228",
    sourceFilename: "cropped-2012-02-25_12h53m00s_MC_60D_6602-1000x288.jpg",
    sourceRelativePath:
      "uploads/2012/02/cropped-2012-02-25_12h53m00s_MC_60D_6602-1000x288.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-student-recital-2012.webp",
    altText: "Children standing together during a school recital.",
    caption: "Student recital from the archive.",
    year: "2012",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Wide legacy banner crop; useful in gallery grids but not as a large feature image.",
    ],
  },
  {
    id: "IMG-0243",
    sourceFilename: "2012-03-03_10h44m00s_MC_60D_6771.jpg",
    sourceRelativePath: "uploads/2012/03/2012-03-03_10h44m00s_MC_60D_6771.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/creative-work/archive-drawing-display-2012.webp",
    altText: "Children holding drawings made during a creative classroom activity.",
    caption: "Creative work from the archive.",
    year: "2012",
    branchSlug: "network",
    galleryCategorySlug: "creative-work",
    category: "creative-work",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Archive gallery only because the image includes posed identifiable children.",
    ],
  },
  {
    id: "IMG-0255",
    sourceFilename: "2012-10-13_11h33m39s_MC_60D_3308.jpg",
    sourceRelativePath: "uploads/2012/03/2012-10-13_11h33m39s_MC_60D_3308.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/classroom-learning/archive-letter-e-activity.webp",
    altText: "Children carrying letter props through a school corridor.",
    caption: "Letter activity from the archive.",
    year: "2012",
    branchSlug: "network",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Good archive context; avoid tighter face-focused crops.",
    ],
  },
  {
    id: "IMG-0305",
    sourceFilename: "2014-03-08_12h31m24s_MC_60D_4952_edited-1.jpg",
    sourceRelativePath:
      "uploads/2014/09/2014-03-08_12h31m24s_MC_60D_4952_edited-1.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/celebrations/archive-balloon-classroom-2014.webp",
    altText: "Children holding balloons during a classroom celebration.",
    caption: "Classroom celebration with balloons.",
    year: "2014",
    branchSlug: "network",
    galleryCategorySlug: "celebrations",
    category: "celebration",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Archive event image; keep to gallery use rather than prominent marketing placement.",
    ],
  },
  {
    id: "IMG-0311",
    sourceFilename: "2014-03-08_12h51m07s_MC_60D_4973_edited-1.jpg",
    sourceRelativePath:
      "uploads/2014/09/2014-03-08_12h51m07s_MC_60D_4973_edited-1.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-fabric-performance-2014.webp",
    altText: "Children performing with fabric during a school event.",
    caption: "Performance activity from the archive.",
    year: "2014",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Broad event view works best in the performances gallery.",
    ],
  },
  {
    id: "IMG-0317",
    sourceFilename: "2014-03-08_13h24m37s_MC_60D_5022_edited-1.jpg",
    sourceRelativePath:
      "uploads/2014/09/2014-03-08_13h24m37s_MC_60D_5022_edited-1.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/community-archive/archive-staff-celebration-2014.webp",
    altText: "Staff members holding flowers during a school celebration.",
    caption: "Staff celebration from the archive.",
    year: "2014",
    branchSlug: "network",
    galleryCategorySlug: "community-archive",
    category: "community-archive",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Staff image should stay in archive/community context unless current staff approval is reconfirmed for other pages.",
    ],
  },
  {
    id: "IMG-0376",
    sourceFilename: "2014-07-05_10h41m28s_MC_60D_7215.jpg",
    sourceRelativePath: "uploads/2015/09/2014-07-05_10h41m28s_MC_60D_7215.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/celebrations/archive-summer-balloon-event.webp",
    altText: "Children and families gathered with balloons during a school event.",
    caption: "Summer celebration from the archive.",
    year: "2014",
    branchSlug: "network",
    galleryCategorySlug: "celebrations",
    category: "celebration",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Wide event image with many participants; keep to archive/gallery use.",
    ],
  },
  {
    id: "IMG-0382",
    sourceFilename: "2014-07-05_11h30m19s_MC_60D_7239.jpg",
    sourceRelativePath: "uploads/2015/09/2014-07-05_11h30m19s_MC_60D_7239.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/classroom-learning/archive-floor-writing-activity.webp",
    altText: "Children writing and drawing on the floor during a school activity.",
    caption: "Floor writing activity from the archive.",
    year: "2014",
    branchSlug: "network",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Strong classroom archive context; avoid tighter crops of individual pupils.",
    ],
  },
  {
    id: "IMG-0393",
    sourceFilename: "2015-07-11_11h52m03s_MC_60D_4603.jpg",
    sourceRelativePath: "uploads/2015/09/2015-07-11_11h52m03s_MC_60D_4603.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-costume-group-2015.webp",
    altText: "Children in costume posing after a school performance.",
    caption: "Costume group from the performance archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Archive gallery only: posed child portrait style makes it unsuitable for hero, about, or location-page use.",
    ],
  },
  {
    id: "IMG-0405",
    sourceFilename: "2015-07-11_12h15m55s_MC_60D_4630.jpg",
    sourceRelativePath: "uploads/2015/09/2015-07-11_12h15m55s_MC_60D_4630.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/community-archive/archive-outdoor-school-game.webp",
    altText: "Children playing an outdoor school game on a sunny day.",
    caption: "Outdoor school game from the archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "community-archive",
    category: "community-archive",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Good broad community image; still keep in archive/gallery rather than homepage hero until visual review.",
    ],
  },
  {
    id: "IMG-0468",
    sourceFilename: "IMG_6004.jpg",
    sourceRelativePath: "uploads/2015/09/IMG_6004.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/classroom-learning/archive-group-book-activity.webp",
    altText: "Children taking part in a group book activity.",
    caption: "Group book activity from the archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "classroom-learning",
    category: "classroom",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Archive gallery only because the image has close identifiable pupils.",
    ],
  },
  {
    id: "IMG-0474",
    sourceFilename: "IMG_6010.jpg",
    sourceRelativePath: "uploads/2015/09/IMG_6010.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-costume-stage-seating.webp",
    altText: "Children in costume seated before a school performance.",
    caption: "Performance seating from the archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 1 from historic uploads.",
      "Strong archive performance image; avoid cropping closer around individual children.",
    ],
  },
  {
    id: "IMG-0558",
    sourceFilename: "Pushkin-Background.jpg",
    sourceRelativePath: "uploads/2018/08/Pushkin-Background.jpg",
    sourceCollection: "site",
    approvedPublicPath: "/images/brand/legacy/pushkin-legacy-background.webp",
    altText: "Legacy Pushkin-themed banner with books and portrait artwork.",
    caption: "Legacy Pushkin visual identity artwork.",
    year: "2018",
    branchSlug: "network",
    galleryCategorySlug: "community-archive",
    category: "brand-legacy",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "supporting",
    notes: [
      "Legacy archive batch 3 refreshed this asset from the higher-resolution historic upload source.",
      "Brand-history asset; suitable for archive context or future about-page supporting detail, not as a modern hero without redesign.",
    ],
  },
  {
    id: "IMG-0249",
    sourceFilename: "2012-03-03_12h00m29s_MC_60D_6775.jpg",
    sourceRelativePath: "uploads/2012/03/2012-03-03_12h00m29s_MC_60D_6775.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/creative-work/archive-student-art-showcase-2012.webp",
    altText: "Children holding artwork from a classroom drawing activity.",
    caption: "Student artwork showcase from the archive.",
    year: "2012",
    branchSlug: "network",
    galleryCategorySlug: "creative-work",
    category: "creative-work",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 3 from historic uploads.",
      "Archive gallery only: posed identifiable pupils with artwork.",
    ],
  },
  {
    id: "IMG-0348",
    sourceFilename: "2014-03-08_12h50m56s_MC_60D_4972_edited-1.jpg",
    sourceRelativePath:
      "uploads/2015/06/2014-03-08_12h50m56s_MC_60D_4972_edited-1.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-fabric-performance-wide-2014.webp",
    altText: "Children and families gathered around a fabric performance activity.",
    caption: "Wide fabric performance from the archive.",
    year: "2014",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 3 from historic uploads.",
      "Broad view of an event already represented by a closer image; retain only if gallery ordering needs a wider context image.",
    ],
  },
  {
    id: "IMG-0370",
    sourceFilename: "2014-03-08_12h29m25s_MC_60D_4951_edited-1.jpg",
    sourceRelativePath:
      "uploads/2015/09/2014-03-08_12h29m25s_MC_60D_4951_edited-1.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-striped-recital-group-2014.webp",
    altText: "Children standing together during a recital activity.",
    caption: "Recital group from the archive.",
    year: "2014",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 3 from historic uploads.",
      "Close child performance image; gallery archive only and avoid tighter crops.",
    ],
  },
  {
    id: "IMG-0387",
    sourceFilename: "2015-06-02_11h33m50s_MC_60D_3160_edited-1.jpg",
    sourceRelativePath:
      "uploads/2015/09/2015-06-02_11h33m50s_MC_60D_3160_edited-1.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/community-archive/archive-staff-portrait-red-jumper.webp",
    altText: "A staff portrait from the historic school archive.",
    caption: "Staff portrait from the archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "community-archive",
    category: "portrait-safe",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 3 from historic uploads.",
      "Keep in community archive only; do not use on a team or staff page without current staff approval.",
    ],
  },
  {
    id: "IMG-0267",
    sourceFilename: "2012-10-13_11h39m05s_MC_60D_3311.jpg",
    sourceRelativePath: "uploads/2012/10/2012-10-13_11h39m05s_MC_60D_3311.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-recital-group-2012.webp",
    altText: "Children in costume standing together during a classroom recital.",
    caption: "Classroom recital from the archive.",
    year: "2012",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 2 from historic uploads.",
      "Archive gallery only: identifiable children in a posed recital setting.",
    ],
  },
  {
    id: "IMG-0276",
    sourceFilename: "2012-10-13_11h40m55s_MC_60D_3313-e1350394117370.jpg",
    sourceRelativePath:
      "uploads/2012/10/2012-10-13_11h40m55s_MC_60D_3313-e1350394117370.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-guitar-performance-2012.webp",
    altText: "A child performing with a guitar during a classroom recital.",
    caption: "Guitar performance from the archive.",
    year: "2012",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 2 from historic uploads.",
      "Use in gallery only; avoid tighter crops around the performer or audience.",
    ],
  },
  {
    id: "IMG-0283",
    sourceFilename: "2012-10-13_11h42m52s_MC_60D_3315.jpg",
    sourceRelativePath: "uploads/2012/10/2012-10-13_11h42m52s_MC_60D_3315.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-classroom-recital-wide-2012.webp",
    altText: "A wide classroom view of children watching a recital performance.",
    caption: "Wide classroom recital view.",
    year: "2012",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 2 from historic uploads.",
      "Stronger broad-context archive image; keep as a gallery feature candidate, not a shared-page hero.",
    ],
  },
  {
    id: "IMG-0485",
    sourceFilename: "IMG_6013.jpg",
    sourceRelativePath: "uploads/2015/09/IMG_6013.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/creative-work/archive-face-painting-prep-2015.webp",
    altText: "A teacher helping children prepare face paint and costume details for a performance.",
    caption: "Performance preparation from the archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "creative-work",
    category: "creative-work",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 2 from historic uploads.",
      "Close performance-preparation image; use only in the archive grid and avoid tighter crops.",
    ],
  },
  {
    id: "IMG-0491",
    sourceFilename: "IMG_6016.jpg",
    sourceRelativePath: "uploads/2015/09/IMG_6016.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-umbrella-character-performance.webp",
    altText: "A costumed adult performer holding an umbrella during a school theatre event.",
    caption: "Theatre character from the archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 2 from historic uploads.",
      "Strong archive theatre image; mostly adult subject with children visible from behind.",
    ],
  },
  {
    id: "IMG-0497",
    sourceFilename: "IMG_6018.jpg",
    sourceRelativePath: "uploads/2015/09/IMG_6018.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-kolobok-stage-scene.webp",
    altText: "Children performing a Kolobok stage scene with props.",
    caption: "Kolobok stage scene from the archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 2 from historic uploads.",
      "Archive gallery only: posed child performance image with clear faces.",
    ],
  },
  {
    id: "IMG-0503",
    sourceFilename: "IMG_6020.jpg",
    sourceRelativePath: "uploads/2015/09/IMG_6020.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-kolobok-curtain-call.webp",
    altText: "Children holding hands during a Kolobok performance curtain call.",
    caption: "Kolobok curtain call from the archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 2 from historic uploads.",
      "Archive gallery only; avoid cropping closer around individual pupils.",
    ],
  },
  {
    id: "IMG-0509",
    sourceFilename: "IMG_6022.jpg",
    sourceRelativePath: "uploads/2015/09/IMG_6022.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-comedy-characters-performance.webp",
    altText: "Children in colourful wigs performing as comedy characters.",
    caption: "Comedy characters from the performance archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "archive",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 2 from historic uploads.",
      "Close child performance image; suitable only for gallery archive context.",
    ],
  },
  {
    id: "IMG-0527",
    sourceFilename: "IMG_6026.jpg",
    sourceRelativePath: "uploads/2015/09/IMG_6026.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-character-dialogue-2015.webp",
    altText: "Costumed adult performers acting in a school theatre scene.",
    caption: "Character dialogue from the archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 2 from historic uploads.",
      "Strong theatre image with adult performers; keep in performance archive unless current approval supports broader use.",
    ],
  },
  {
    id: "IMG-0533",
    sourceFilename: "IMG_6027.jpg",
    sourceRelativePath: "uploads/2015/09/IMG_6027.jpg",
    sourceCollection: "archive",
    approvedPublicPath:
      "/images/archive/performances/archive-performance-curtain-call-2015.webp",
    altText: "Adult performers taking a curtain call after a school theatre performance.",
    caption: "Performance curtain call from the archive.",
    year: "2015",
    branchSlug: "network",
    galleryCategorySlug: "performances",
    category: "performance",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "gallery",
    notes: [
      "Legacy archive batch 2 from historic uploads.",
      "Adult performer image; useful as a stronger performance-gallery candidate after page-level visual review.",
    ],
  },
];

export const visualPlaceholderSlots: VisualPlaceholderSlot[] = [
  {
    id: "about-community-table",
    page: "about",
    title: "Language, culture, and a shared school rhythm",
    eyebrow: "School life",
    summary:
      "A warm, child-safe visual for the everyday materials of Russian language learning.",
    motif: "language-table",
    status: "illustration-ready",
    statusLabel: "Illustration used until a suitable school photo is available",
    futureAssetRole: "feature",
    suggestedPrompt:
      "Warm editorial illustration of a Russian language learning table with open books, notebooks, pencils, and subtle Cyrillic letter cards; no people, no faces, no school logos, no private documents, natural daylight, refined educational website style.",
    altTextWhenGenerated:
      "Illustration of Russian language books, notebooks, pencils, and Cyrillic letter cards on a learning table.",
    usageNotes: [
      "Use as an illustration or approved non-identifying detail photo.",
      "Avoid children, portraits, visible names, school documents, or private archive files.",
      "Keep the visual warm and academic rather than stock-like or promotional.",
    ],
  },
  {
    id: "curriculum-culture-shelf",
    page: "curriculum",
    title: "A curriculum built from reading, speech, and culture",
    eyebrow: "Learning materials",
    summary:
      "Books, writing, cultural work, and study habits sit at the centre of the learning pathway.",
    motif: "culture-shelf",
    status: "illustration-ready",
    statusLabel: "Child-safe study illustration",
    futureAssetRole: "feature",
    suggestedPrompt:
      "Warm editorial illustration of Russian language study materials on shelves and a desk: books, grammar notes, folk-pattern paper details, a pencil, and exam revision cards; no people, no faces, no identifiable school materials, refined modern educational website style.",
    altTextWhenGenerated:
      "Illustration of Russian language books, study notes, folk-pattern paper, and revision cards.",
    usageNotes: [
      "Suitable for a generated illustration or approved close-up of learning materials.",
      "Do not include identifiable pupils, staff, names, or branded school artefacts.",
      "Prefer balanced colour and real classroom warmth over decorative filler.",
    ],
  },
  {
    id: "admissions-learning-journey",
    page: "admissions",
    title: "From first enquiry to the right learning option",
    eyebrow: "Parent journey",
    summary:
      "A calm view of the decisions families make before the first conversation with the school.",
    motif: "learning-journey",
    status: "illustration-ready",
    statusLabel: "Simple, privacy-conscious admissions visual",
    futureAssetRole: "feature",
    suggestedPrompt:
      "Warm editorial illustration of a parent enquiry journey for a Russian language school: simple path markers, calendar card, notebook, pencil, and branch choice cards; no people, no faces, no private forms, no logos, polished educational website style.",
    altTextWhenGenerated:
      "Illustration of an enquiry journey with a calendar card, notebook, pencil, and pathway markers.",
    usageNotes: [
      "Use for admissions and enquiry guidance without implying a confirmed place.",
      "Avoid private forms, bank details, child names, or real parent information.",
      "Keep the tone reassuring, practical, and non-promotional.",
    ],
  },
  {
    id: "gallery-approved-archive",
    page: "gallery",
    title: "A careful archive of school life",
    eyebrow: "Gallery readiness",
    summary:
      "Public gallery collections are prepared for selected school photos, captions, and category context.",
    motif: "archive-grid",
    status: "gallery-placeholder",
    statusLabel: "Photos will appear after consent and caption checks",
    futureAssetRole: "archive",
    suggestedPrompt:
      "Warm abstract editorial illustration of empty gallery frames, archive labels, and an approval checklist for a school photo archive; no people, no faces, no real photos, no private documents, restrained educational website style.",
    altTextWhenGenerated:
      "Illustration of empty gallery frames, archive labels, and an approval checklist.",
    usageNotes: [
      "Keep gallery pages clearly awaiting images until approved media records exist.",
      "Do not use generated images to imitate real school archive photos.",
      "Use only to explain readiness, not as an archive substitute.",
    ],
  },
];

export const mediaAssetCategories: {
  value: MediaAssetCategory;
  label: string;
  guidance: string;
}[] = [
  {
    value: "classroom",
    label: "Classroom",
    guidance: "Lessons, reading, writing, small-group work, and teacher-led activities.",
  },
  {
    value: "event",
    label: "Event",
    guidance: "Celebrations, assemblies, award moments, and community gatherings.",
  },
  {
    value: "creative-work",
    label: "Creative work",
    guidance: "Crafts, displays, notebooks, projects, and child-safe detail images.",
  },
  {
    value: "performance",
    label: "Performance",
    guidance: "Stage, music, recitals, drama, and cultural celebration images.",
  },
  {
    value: "location",
    label: "Location",
    guidance: "Venue exteriors, classroom spaces, signage, and branch context.",
  },
  {
    value: "portrait-safe",
    label: "Portrait safe",
    guidance: "Approved, current portraits or group images suitable for prominent use.",
  },
  {
    value: "celebration",
    label: "Celebration",
    guidance: "Seasonal events, community gatherings, and tradition-led archive images.",
  },
  {
    value: "community-archive",
    label: "Community archive",
    guidance: "Legacy school-life images that are useful at modest display sizes.",
  },
  {
    value: "brand-legacy",
    label: "Brand legacy",
    guidance: "Older public graphics, headers, and brand-adjacent material kept for review.",
  },
  {
    value: "illustration",
    label: "Illustration",
    guidance: "Generated or commissioned visuals approved for use when photos are unavailable.",
  },
];

export const mediaIntakeFields: MediaIntakeField[] = [
  {
    label: "Source filename",
    description:
      "Original local file name used for traceability. Do not publish raw source files directly.",
    required: true,
  },
  {
    label: "Source relative path",
    description:
      "Ignored local source path used to trace the image back to its location folder or legacy archive folder.",
    required: true,
  },
  {
    label: "Source collection",
    description:
      "Whether the approved image belongs to a school-location pool, the wider archive, or a shared site surface.",
    required: true,
  },
  {
    label: "Approved public path",
    description:
      "Public URL path under /images/locations, /images/archive, or /images/site after approval, cropping, and compression.",
    required: true,
  },
  {
    label: "Alt text",
    description:
      "Plain description of the visible scene for accessibility; avoid naming children.",
    required: true,
  },
  {
    label: "Caption",
    description:
      "Short public caption that gives context without exposing private child or family information.",
    required: true,
  },
  {
    label: "Year",
    description:
      "Optional source year or approximate school year when useful for internal identification; not required for public grouping.",
    required: false,
  },
  {
    label: "Branch",
    description:
      "School branch slug, Exeter label, network-wide label, or online label for future filtering.",
    required: false,
  },
  {
    label: "Gallery category",
    description:
      "Category collection used by the public gallery, such as classroom-learning, creative-work, performances, celebrations, locations, or community-archive.",
    required: false,
  },
  {
    label: "Category",
    description:
      "Editorial category used to balance the gallery and avoid repetitive image types.",
    required: true,
  },
  {
    label: "Consent status",
    description:
      "Publication decision after checking parent consent, child privacy, and current suitability.",
    required: true,
  },
  {
    label: "Quality rating",
    description:
      "Hero, feature, archive, or replace rating to guide where the image may appear.",
    required: true,
  },
];

export const mediaIngestionSteps = [
  "Place unapproved photo batches outside Git or in ignored local review folders only.",
  "Select candidate images for public use and exclude raw screenshots, private documents, and duplicates; do not reject legacy images solely because they need smaller display sizes.",
  "Confirm consent status, remove names or private context from captions, and avoid prominent use of sensitive images.",
  "Optimise approved location images into /public/images/locations/{location} and wider archive images into /public/images/archive/{category}.",
  "Add metadata records to src/data/media-assets.ts with source path, public path, alt text, caption, branch, gallery category, consent status, and quality rating.",
  "Use hero-rated images sparingly on public landing pages and archive-rated images mainly in gallery category pages.",
];

export const mediaReadinessNotes = [
  "Selected public photos will appear after consent and caption checks.",
  "Gallery spaces stay simple until real school images are suitable for publication.",
  "Illustrations support general pages, while gallery archives remain reserved for real school moments.",
];

const galleryCategoryCoverAssetIds: Record<string, string> = {
  "classroom-learning": "IMG-0006",
  "creative-work": "IMG-0035",
  performances: "IMG-0491",
  celebrations: "IMG-0376",
  locations: "IMG-0061",
  "community-archive": "IMG-0405",
};

const galleryCategoryPriorityAssetIds: Record<string, readonly string[]> = {
  "classroom-learning": [
    "IMG-0006",
    "IMG-0114",
    "IMG-0174",
    "IMG-0134",
    "IMG-0008",
    "IMG-0382",
    "IMG-0468",
    "IMG-0255",
  ],
  "creative-work": [
    "IMG-0035",
    "IMG-0037",
    "IMG-0069",
    "IMG-0162",
    "IMG-0249",
    "IMG-0485",
  ],
  performances: [
    "IMG-0491",
    "IMG-0283",
    "IMG-0527",
    "IMG-0533",
    "IMG-0311",
    "IMG-0474",
    "IMG-0052",
    "IMG-0118",
    "IMG-0228",
    "IMG-0276",
  ],
  celebrations: ["IMG-0376", "IMG-0224", "IMG-0305", "IMG-0212"],
  locations: ["IMG-0061", "IMG-0129", "IMG-0062", "IMG-0127"],
  "community-archive": ["IMG-0405", "IMG-0558", "IMG-0317", "IMG-0047", "IMG-0387"],
};

const galleryRecommendedUseRank: Record<
  NonNullable<MediaAsset["recommendedUse"]>,
  number
> = {
  "location-page": 0,
  gallery: 1,
  supporting: 2,
  about: 3,
  hero: 4,
};

const galleryQualityRank: Record<MediaQualityRating, number> = {
  feature: 0,
  hero: 1,
  archive: 2,
  replace: 3,
};

function sortGalleryMedia(
  galleryCategorySlug: string,
  assets: MediaAsset[],
) {
  const priorityIds = galleryCategoryPriorityAssetIds[galleryCategorySlug] ?? [];

  return [...assets].sort((first, second) => {
    const firstPriority = priorityIds.indexOf(first.id);
    const secondPriority = priorityIds.indexOf(second.id);

    if (firstPriority !== secondPriority) {
      if (firstPriority === -1) {
        return 1;
      }

      if (secondPriority === -1) {
        return -1;
      }

      return firstPriority - secondPriority;
    }

    const firstQuality = galleryQualityRank[first.qualityRating] ?? 5;
    const secondQuality = galleryQualityRank[second.qualityRating] ?? 5;

    if (firstQuality !== secondQuality) {
      return firstQuality - secondQuality;
    }

    const firstUse =
      galleryRecommendedUseRank[first.recommendedUse ?? "gallery"] ?? 5;
    const secondUse =
      galleryRecommendedUseRank[second.recommendedUse ?? "gallery"] ?? 5;

    if (firstUse !== secondUse) {
      return firstUse - secondUse;
    }

    return first.id.localeCompare(second.id);
  });
}

export function getApprovedMediaByYear(year: string) {
  return approvedMediaAssets.filter(
    (asset) =>
      asset.year === year && asset.consentStatus === "approved-for-public-web",
  );
}

export function getApprovedMediaByBranch(branchSlug: MediaAsset["branchSlug"]) {
  return approvedMediaAssets.filter(
    (asset) =>
      asset.branchSlug === branchSlug &&
      asset.consentStatus === "approved-for-public-web",
  );
}

export function getLocationPageMediaByBranch(
  branchSlug: MediaAsset["branchSlug"],
) {
  const recommendationRank: Record<
    NonNullable<MediaAsset["recommendedUse"]>,
    number
  > = {
    "location-page": 0,
    supporting: 1,
    gallery: 2,
    about: 3,
    hero: 4,
  };

  return [...getApprovedMediaByBranch(branchSlug)].sort((first, second) => {
    const firstRank =
      recommendationRank[first.recommendedUse ?? "gallery"] ?? 5;
    const secondRank =
      recommendationRank[second.recommendedUse ?? "gallery"] ?? 5;

    if (firstRank !== secondRank) {
      return firstRank - secondRank;
    }

    return first.id.localeCompare(second.id);
  });
}

export function getApprovedMediaByGalleryCategory(galleryCategorySlug: string) {
  return sortGalleryMedia(
    galleryCategorySlug,
    approvedMediaAssets.filter(
      (asset) =>
        asset.galleryCategorySlug === galleryCategorySlug &&
        asset.consentStatus === "approved-for-public-web",
    ),
  );
}

export function getGalleryCategoryCoverAsset(galleryCategorySlug: string) {
  const approvedAssets = getApprovedMediaByGalleryCategory(galleryCategorySlug);
  const preferredCoverId = galleryCategoryCoverAssetIds[galleryCategorySlug];

  return (
    approvedAssets.find((asset) => asset.id === preferredCoverId) ??
    approvedAssets.find(
      (asset) =>
        asset.recommendedUse === "location-page" ||
        asset.recommendedUse === "gallery" ||
        asset.qualityRating === "feature",
    )
  );
}

export function getGalleryCategoryAssetCount(galleryCategorySlug: string) {
  return getApprovedMediaByGalleryCategory(galleryCategorySlug).length;
}

export function getApprovedMediaBySourceCollection(
  sourceCollection: MediaAssetCollection,
) {
  return approvedMediaAssets.filter(
    (asset) =>
      asset.sourceCollection === sourceCollection &&
      asset.consentStatus === "approved-for-public-web",
  );
}

export function getHeroReadyMedia() {
  return approvedMediaAssets.filter(
    (asset) =>
      asset.qualityRating === "hero" &&
      asset.consentStatus === "approved-for-public-web",
  );
}

export function getVisualPlaceholderSlot(id: string) {
  return visualPlaceholderSlots.find((slot) => slot.id === id);
}
