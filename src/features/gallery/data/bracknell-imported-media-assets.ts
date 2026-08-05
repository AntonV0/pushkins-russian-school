import type { MediaAsset } from "./media-assets";

type BracknellPhotoDescriptor = Pick<
  MediaAsset,
  | "sourceFilename"
  | "altText"
  | "caption"
  | "galleryCategorySlug"
  | "category"
>;

// Local review candidates imported from bracknelllphotos.zip on 2026-08-03.
// The optimised review copies stay ignored until the owner makes a publication decision.
const bracknellPhotoDescriptors: BracknellPhotoDescriptor[] = [
  { sourceFilename: "DSC02877.JPG", altText: "A member of staff photographed against a plain white background.", caption: "Bracknell staff portrait candidate.", galleryCategorySlug: "community-archive", category: "portrait-safe" },
  { sourceFilename: "DSC02878.JPG", altText: "A member of staff photographed against a plain white background.", caption: "Bracknell staff portrait candidate.", galleryCategorySlug: "community-archive", category: "portrait-safe" },
  { sourceFilename: "DSC02883.JPG", altText: "A member of staff photographed against a plain white background.", caption: "Bracknell staff portrait candidate.", galleryCategorySlug: "community-archive", category: "portrait-safe" },
  { sourceFilename: "DSC02888.JPG", altText: "A smiling member of staff photographed against a plain white background.", caption: "Bracknell staff portrait candidate.", galleryCategorySlug: "community-archive", category: "portrait-safe" },
  { sourceFilename: "DSC02894.JPG", altText: "A member of staff photographed against a plain white background.", caption: "Bracknell staff portrait candidate.", galleryCategorySlug: "community-archive", category: "portrait-safe" },
  { sourceFilename: "DSC02897.JPG", altText: "A smiling member of staff photographed against a plain white background.", caption: "Bracknell staff portrait candidate.", galleryCategorySlug: "community-archive", category: "portrait-safe" },
  { sourceFilename: "DSC03269.JPG", altText: "Children working around a table during a Bracknell classroom activity.", caption: "Bracknell classroom activity candidate.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03270.JPG", altText: "Teachers supporting children around a classroom table in Bracknell.", caption: "Teacher-led learning in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03272.JPG", altText: "A teacher presenting a Russian language worksheet to children in Bracknell.", caption: "Russian language lesson in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03275.JPG", altText: "Teachers helping children with a table activity in a Bracknell classroom.", caption: "Classroom support in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03277.JPG", altText: "A teacher working with children around a classroom table in Bracknell.", caption: "Teacher-led table activity in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03280.JPG", altText: "Teachers guiding children through a classroom worksheet activity in Bracknell.", caption: "Guided classroom learning in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03284.JPG", altText: "Children completing worksheets together around a Bracknell classroom table.", caption: "Bracknell worksheet activity candidate.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03286.JPG", altText: "A teacher presenting illustrated learning materials to children in Bracknell.", caption: "Illustrated classroom lesson in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03290.JPG", altText: "A teacher sharing an illustrated worksheet with a Bracknell class.", caption: "Bracknell classroom presentation candidate.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03294.JPG", altText: "A teacher smiling while presenting illustrated learning materials in Bracknell.", caption: "Bracknell classroom learning candidate.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03295.JPG", altText: "A teacher introducing Russian cultural materials during a Bracknell lesson.", caption: "Russian culture lesson in Bracknell.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03297.JPG", altText: "A teacher sharing an illustrated Russian book with children in Bracknell.", caption: "Illustrated story activity in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03298.JPG", altText: "Children taking part in a Russian cultural craft activity in Bracknell.", caption: "Bracknell cultural craft activity.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03299.JPG", altText: "Teachers sharing Russian cultural objects with children in Bracknell.", caption: "Russian cultural activity in Bracknell.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03303.JPG", altText: "A teacher holding an illustrated Russian storybook in a Bracknell classroom.", caption: "Russian storybook lesson in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03306.JPG", altText: "Teachers presenting Russian cultural craft objects to a Bracknell class.", caption: "Bracknell cultural learning candidate.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03307.JPG", altText: "Teachers demonstrating Russian cultural craft objects in Bracknell.", caption: "Cultural craft demonstration in Bracknell.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03308.JPG", altText: "Teachers holding colourful Russian cultural craft objects in Bracknell.", caption: "Russian craft objects in Bracknell.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03311.JPG", altText: "Children responding to a Russian cultural activity in a Bracknell classroom.", caption: "Bracknell cultural classroom activity.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03313.JPG", altText: "Children working in Russian language workbooks around a Bracknell classroom table.", caption: "Russian workbook lesson in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03315.JPG", altText: "A teacher supporting children with Russian language workbooks in Bracknell.", caption: "Workbook learning in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03316.JPG", altText: "A teacher pointing to a Russian language workbook during a Bracknell lesson.", caption: "Bracknell workbook detail candidate.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03317.JPG", altText: "Russian language workbooks spread across a Bracknell classroom table.", caption: "Russian learning materials in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03318.JPG", altText: "Children using illustrated Russian language workbooks in Bracknell.", caption: "Illustrated workbook activity in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03320.JPG", altText: "A teacher guiding children through Russian language workbooks in Bracknell.", caption: "Guided workbook lesson in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03325.JPG", altText: "A teacher holding open an illustrated Russian storybook in Bracknell.", caption: "Illustrated Russian story in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03327.JPG", altText: "A teacher sharing an open illustrated book with a Bracknell class.", caption: "Bracknell storybook activity candidate.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03332.JPG", altText: "Children exploring Russian cultural objects during a Bracknell lesson.", caption: "Russian cultural learning in Bracknell.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03334.JPG", altText: "A close view of a child handling a wooden cultural craft object.", caption: "Bracknell cultural craft detail.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03335.JPG", altText: "Hands holding a colourful traditional craft toy during a Bracknell activity.", caption: "Traditional craft detail from Bracknell.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03338.JPG", altText: "A child wearing a traditional green headdress during a Bracknell cultural activity.", caption: "Bracknell cultural dress activity.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03340.JPG", altText: "A teacher presenting an illustrated Russian folk tale in Bracknell.", caption: "Russian folk tale lesson in Bracknell.", galleryCategorySlug: "classroom-learning", category: "classroom" },
  { sourceFilename: "DSC03342.JPG", altText: "A child wearing a traditional green headdress during a classroom activity.", caption: "Bracknell cultural dress candidate.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03344.JPG", altText: "A child taking part in a traditional dress activity in Bracknell.", caption: "Traditional dress activity in Bracknell.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03347.JPG", altText: "Children exploring Russian cultural crafts around a Bracknell classroom table.", caption: "Bracknell cultural craft table.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03348.JPG", altText: "A teacher helping children with Russian cultural crafts in Bracknell.", caption: "Guided cultural crafts in Bracknell.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03349.JPG", altText: "Children handling traditional craft objects during a Bracknell lesson.", caption: "Traditional craft activity in Bracknell.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03350.JPG", altText: "A teacher and children exploring Russian craft objects in Bracknell.", caption: "Russian craft exploration in Bracknell.", galleryCategorySlug: "creative-work", category: "creative-work" },
  { sourceFilename: "DSC03351.JPG", altText: "Children gathered around a table for a Russian cultural activity in Bracknell.", caption: "Bracknell cultural activity candidate.", galleryCategorySlug: "creative-work", category: "creative-work" },
];

const approvedHomepageSelections = {
  DSC03280: {
    approvedPublicPath:
      "/images/site/homepage-hero-bracknell-classroom.webp",
    consentStatus: "approved-for-public-web",
    qualityRating: "hero",
    recommendedUse: "hero",
    notes: [
      "Selected by the school owner for the homepage hero on 2026-08-04.",
      "Promoted from the Bracknell review intake after visual selection.",
    ],
  },
  DSC03332: {
    approvedPublicPath:
      "/images/site/homepage-trust-bracknell-cultural-lesson.webp",
    consentStatus: "approved-for-public-web",
    qualityRating: "feature",
    recommendedUse: "supporting",
    notes: [
      "Selected by the school owner for the homepage trust section on 2026-08-04.",
      "Promoted from the Bracknell review intake after visual selection.",
    ],
  },
} satisfies Record<
  string,
  Pick<
    MediaAsset,
    | "approvedPublicPath"
    | "consentStatus"
    | "qualityRating"
    | "recommendedUse"
    | "notes"
  >
>;

export const bracknellImportedMediaAssets: MediaAsset[] =
  bracknellPhotoDescriptors.map((asset) => {
    const sourceId = asset.sourceFilename.replace(/\.[^.]+$/, "").toUpperCase();
    const publicFilename = `bracknell-review-${sourceId.toLowerCase()}.webp`;
    const homepageSelection =
      approvedHomepageSelections[
        sourceId as keyof typeof approvedHomepageSelections
      ];

    return {
      id: `BRACKNELL-${sourceId}`,
      sourceFilename: asset.sourceFilename,
      sourceRelativePath: `Bracknell intake/bracknelllphotos.zip/${asset.sourceFilename}`,
      sourceCollection: "location",
      approvedPublicPath:
        homepageSelection?.approvedPublicPath ??
        `/images/review/bracknell/${publicFilename}`,
      altText: asset.altText,
      caption: asset.caption,
      branchSlug: "bracknell",
      galleryCategorySlug: asset.galleryCategorySlug,
      category: asset.category,
      consentStatus: homepageSelection?.consentStatus ?? "needs-review",
      qualityRating: homepageSelection?.qualityRating ?? "archive",
      recommendedUse: homepageSelection?.recommendedUse,
      notes: homepageSelection?.notes ?? [
        "Imported from the Bracknell photo intake on 2026-08-03.",
        "Candidate only; no public website use has been selected.",
        "Confirm consent and final public suitability before promotion.",
      ],
    };
  });
