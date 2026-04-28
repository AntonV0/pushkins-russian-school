# Approved Photo and Visual Asset Workflow

This repository is public. Do not commit raw source screenshots, private review
folders, unreviewed photo batches, private business documents, or unpublished
client/staff information.

## Current Status

No approved public photos are registered in the site data yet. The gallery and
image slots should stay as placeholders until reviewed, optimised images are
available.

The typed registry lives in `src/data/media-assets.ts`. It is intentionally empty
for now:

- `approvedMediaAssets`: approved images that may be rendered publicly.
- `mediaIntakeFields`: required metadata for each future image.
- `mediaIngestionSteps`: the publication checklist.
- `mediaReadinessNotes`: public-safe notes used by gallery readiness UI.

## Folder Intent

Use these folders only after image review:

- `public/images/original`: optional reviewed originals if they are approved for
  public repository storage. Keep unreviewed originals outside Git.
- `public/images/optimised`: web-ready images used by the website.
- `public/images/categorised`: optional curated subsets for future editorial
  workflows.

Do not place raw screenshots from `docs/source-screenshots` into `public`.

## Required Metadata

Every public image should have:

- Source filename for traceability.
- Approved public path under `/images/...`.
- Alt text.
- Public caption.
- Year, when known.
- Branch, network, or online label, when relevant.
- Category.
- Consent status.
- Quality rating.
- Optional notes for review context.

Example shape for a future approved image:

```ts
{
  id: "2019-community-event-01",
  sourceFilename: "reviewed-original-filename.jpg",
  approvedPublicPath: "/images/optimised/2019-community-event-01.webp",
  altText: "Children showing Russian language craft work at a school event",
  caption: "Creative work from a Pushkin's School community celebration.",
  year: "2019",
  branchSlug: "network",
  category: "event",
  consentStatus: "approved-for-public-web",
  qualityRating: "feature",
}
```

Avoid names of children, families, staff, or private venues in captions unless
explicitly approved for publication.

## Review Process

1. Keep new photo batches outside Git or in ignored local review folders.
2. Remove duplicates, blurred images, screenshots, private documents, and images
   that feel dated or unsuitable for the redesigned site.
3. Confirm consent and current suitability for web publication.
4. Prefer a small, strong set of images over a large archive.
5. Crop and optimise approved images for web use.
6. Add records to `src/data/media-assets.ts`.
7. Use hero-rated images sparingly on high-value pages.
8. Use archive-rated images mainly on year gallery pages.

## Gallery Publication Gate

The public gallery routes may exist before photos are approved. In that state,
keep the year pages as intentional placeholders with clear readiness notes.
Do not use old-site screenshots as substitutes for real gallery images, and do
not add empty image records just to make a route look populated.

Before an archive year is populated, confirm that each image has:

- an approved optimised file under `public/images/optimised`,
- a matching typed record in `src/data/media-assets.ts`,
- consent and current suitability checked,
- public-safe alt text and caption,
- no names of children, families, staff, or private venues unless explicitly
  approved for publication.

## Generated Visuals

Generated illustrations may be useful later for warmer, less text-heavy pages,
especially when approved photos are unavailable. Treat them as a separate
editorial decision and do not add generated imagery unless explicitly requested.

## Coordinator Notes

Before asking a worker to populate the gallery, provide either:

- reviewed public images already approved for repository storage, or
- an ignored local folder of candidate images with instructions to select and
  optimise them without committing unreviewed originals.

The next worker should preserve the current design language and keep child
privacy, consent, and public suitability as the first review criteria.
