# Approved Photo and Visual Asset Workflow

This repository is public. Do not commit raw source screenshots, private review
folders, unreviewed photo batches, private business documents, or unpublished
client/staff information.

## Current Status

The first low-privacy location batch, the second selected consent-dependent
batch, and three legacy upload archive batches are registered as the featured
gallery/location set. Separate extended gallery batches now add smaller archive
tiles without changing the featured 52-image set.

Remaining legacy upload material has been triaged. Do not bulk-add the leftover
WordPress derivatives, dated graphics, event invitations, private documents, or
close portraits unless a later visual review identifies a specific gap.

The typed registry lives in `src/data/media-assets.ts`:

- `approvedMediaAssets`: approved images that may be rendered publicly.
- `sourceCollection`: whether an approved image belongs to a location pool, the
  wider archive, or a shared site surface.
- `galleryCategorySlug`: optional public gallery collection such as classroom
  learning, creative work, performances, celebrations, locations, or community
  archive.
- `visualPlaceholderSlots`: generic, non-identifying visual slots used while
  approved school photos are unavailable.
- `mediaIntakeFields`: required metadata for each future image.
- `mediaIngestionSteps`: the publication checklist.
- `mediaReadinessNotes`: public-safe notes used by gallery readiness UI.

The extended archive registry lives in `src/data/extended-gallery-assets.ts`:

- `extendedGalleryMediaAssets`: lower-priority public archive images used only
  as smaller gallery tiles.
- Extended images are exported under `public/images/archive/extended/{category}`
  and should not be used for homepage, about, admissions, curriculum, or
  location lead imagery without a fresh review.
- `approvedMediaAssets` remains the main featured set; do not mix the two tiers
  when choosing cover images or hero imagery.

Shared public pages still use visual slots rather than unreviewed photography:

- About: a warm language-table illustration slot.
- Curriculum: a books, culture, and study-materials slot.
- Admissions: a parent-journey/process slot.
- Gallery: an honest archive-readiness slot plus approved image grids where
  selected images now exist.

Legacy upload images are grouped into content categories rather than public year
routes. Their year metadata is retained only for traceability and future
editorial review.

The homepage and schools page currently use the network status visual rather
than photo placeholders. Keep those surfaces data-driven unless approved public
media is provided.

## Folder Intent

Use these folders only after image review:

- `public/images/locations/bracknell`: approved Bracknell location-page images.
- `public/images/locations/chelmsford`: approved Chelmsford location-page images.
- `public/images/locations/exeter`: approved Exeter location images, even if the
  public route is added later.
- `public/images/locations/hemel-hempstead`: approved Hemel Hempstead
  location-page images.
- `public/images/locations/high-wycombe`: approved High Wycombe location-page
  images.
- `public/images/locations/southend-on-sea`: approved Southend-on-Sea
  location-page images.
- `public/images/archive/classroom-learning`: selected classroom archive images.
- `public/images/archive/creative-work`: selected craft, project, display, and
  workbook images.
- `public/images/archive/performances`: selected plays, recitals, and stage
  images.
- `public/images/archive/celebrations`: selected celebrations and tradition-led
  school images.
- `public/images/archive/locations`: selected venue and room images that are not
  tied to one current location page.
- `public/images/archive/community-archive`: broader legacy upload-folder images
  that are useful for school history.
- `public/images/archive/extended/{category}`: smaller public archive tiles used
  to make gallery categories fuller while keeping lower-quality or repeated
  images separate from the featured set.
- `public/images/site`: approved images for hero, about, admissions, curriculum,
  and other shared page surfaces.
- `public/images/brand/legacy`: reviewed old graphics kept only when useful and
  licensed/suitable.

The older `public/images/original`, `public/images/optimised`, and
`public/images/categorised` folders are retained only as migration placeholders.
New approved school images should use the location/archive/site structure above.

Do not place raw screenshots from `docs/source-screenshots` into `public`.

## Required Metadata

Every public image should have:

- Source filename for traceability.
- Source relative path in the ignored intake folder.
- Source collection: `location`, `archive`, or `site`.
- Approved public path under `/images/...`.
- Alt text.
- Public caption.
- Year, when useful for traceability; do not use upload year as the main public
  grouping.
- Branch, network, or online label, when relevant.
- Gallery category, when the image belongs in the public gallery.
- Category.
- Consent status.
- Quality rating.
- Recommended use: hero, about, location page, gallery, or supporting.
- Optional notes for review context.

Example shape for a future approved image:

```ts
{
  id: "bracknell-performance-2019-01",
  sourceFilename: "IMG_7572-24-06-19-03-47.jpeg",
  sourceRelativePath: "Pushkin Images/Bracknell/IMG_7572-24-06-19-03-47.jpeg",
  sourceCollection: "location",
  approvedPublicPath: "/images/locations/bracknell/bracknell-performance-2019-01.webp",
  altText: "Children performing at a Pushkin's School event.",
  caption: "A school performance from the Bracknell community.",
  year: "2019",
  branchSlug: "bracknell",
  galleryCategorySlug: "performances",
  category: "performance",
  consentStatus: "approved-for-public-web",
  qualityRating: "archive",
  recommendedUse: "gallery",
}
```

Avoid names of children, families, staff, or private venues in captions unless
explicitly approved for publication.

## Review Process

1. Keep new photo batches outside Git or in ignored local review folders.
2. Remove exact duplicates, screenshots, private documents, and images that are
   unsuitable for the redesigned site.
3. Confirm consent and current suitability for web publication.
4. Use location images for location pages, and use broader archive images for
   the gallery collections.
5. Resize lower-quality legacy images to appropriate modest display sizes rather
   than rejecting them solely for resolution.
6. Crop and optimise approved images for web use.
7. Add records to `src/data/media-assets.ts`.
8. Use hero-rated images sparingly on high-value pages.
9. Use archive-rated images mainly on gallery category pages.
10. Use the extended archive tier for useful smaller images that add depth but
    should not become cover, hero, about, or location-page lead assets.

Gallery category order is curated in `src/data/media-assets.ts`. When adding
new batches, update the category priority lists only when a new image genuinely
improves the first screen, cover image, or early gallery rhythm. Do not let a
large performance batch automatically dominate the visible order.

## Gallery Publication Gate

The public gallery routes may exist before photos are approved. In that state,
keep the category pages as intentional placeholders with clear readiness notes.
Do not use old-site screenshots as substitutes for real gallery images, and do
not add empty image records just to make a route look populated.

Before a gallery collection is populated, confirm that each image has:

- an approved optimised file under `public/images/locations`,
  `public/images/archive`, or `public/images/site`,
- a matching typed record in `src/data/media-assets.ts`,
- consent and current suitability checked,
- public-safe alt text and caption,
- no names of children, families, staff, or private venues unless explicitly
  approved for publication.

## Generated Visuals

Generated illustrations can make public pages warmer while approved school
photos are unavailable, but they must stay generic and non-identifying. The
prepared prompts in `visualPlaceholderSlots` are intentionally limited to
academic materials, books, notebooks, Cyrillic letter cards, culture details,
route markers, and archive frames.

Generated visuals must not include:

- identifiable people, children, faces, portraits, or staff likenesses,
- school logos or implied official badges unless approved,
- private documents, forms, bank details, names, or real pupil work,
- old-site screenshots or imitation archive photos,
- stock-looking classroom filler that suggests a real photographed lesson.

When a generated visual is approved for use:

1. Save only the final approved image under `public/images/site` or another
   folder from the current location/archive/site structure.
2. Add an approved media record if the image should be managed as a site asset.
3. Use the `altTextWhenGenerated` field as a starting point for accessible alt
   text.
4. Keep gallery archives honest: generated visuals may explain the workflow, but
   they must not stand in for historical school photos.

## Coordinator Notes

Before asking a worker to populate the gallery, provide either:

- reviewed public images already approved for repository storage, or
- an ignored local folder of candidate images with instructions to select and
  optimise them without committing unreviewed originals.

The next worker should preserve the current design language and keep child
privacy, consent, and public suitability as the first review criteria.
