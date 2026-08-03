export type WixImportedVideoAsset = {
  id: string;
  sourceFilename: string;
  sourceRelativePath: string;
  approvedPublicPath: string;
  sourceCollection: "archive" | "site";
  category: "archive-video" | "general-video";
  recommendedUse: "gallery" | "review-for-page-video";
  bytes: number;
  duplicateCount: number;
  notes: string[];
};

// Videos recovered from the Wix export. Thumbnails/frame picks should be reviewed
// before embedding these in page heroes or location-page media blocks.
export const wixImportedVideoAssets = [
  {
    id: "WIX-VIDEO-0015",
    sourceFilename: "Pushkin1.mp4",
    sourceRelativePath: "Wix export/loose-files/Pushkin1.mp4",
    approvedPublicPath: "/videos/archive/wix-import/pushkin1.mp4",
    sourceCollection: "site",
    category: "general-video",
    recommendedUse: "review-for-page-video",
    bytes: 48799053,
    duplicateCount: 2,
    notes: [
      "Recovered from the Wix export media audit on 2026-05-21.",
      "Video content still needs thumbnail/frame review before being embedded prominently."
    ]
  },
  {
    id: "WIX-VIDEO-0016",
    sourceFilename: "video-24-06-19-03-52-1.mov",
    sourceRelativePath: "Wix export/loose-files/video-24-06-19-03-52-1.mov",
    approvedPublicPath: "/videos/archive/wix-import/video-24-06-19-03-52-1.mov",
    sourceCollection: "site",
    category: "general-video",
    recommendedUse: "review-for-page-video",
    bytes: 17476495,
    duplicateCount: 1,
    notes: [
      "Recovered from the Wix export media audit on 2026-05-21.",
      "Video content still needs thumbnail/frame review before being embedded prominently."
    ]
  },
  {
    id: "WIX-VIDEO-0017",
    sourceFilename: "video-24-06-19-03-52.mov",
    sourceRelativePath: "Wix export/loose-files/video-24-06-19-03-52.mov",
    approvedPublicPath: "/videos/archive/wix-import/video-24-06-19-03-52.mov",
    sourceCollection: "site",
    category: "general-video",
    recommendedUse: "review-for-page-video",
    bytes: 19064047,
    duplicateCount: 1,
    notes: [
      "Recovered from the Wix export media audit on 2026-05-21.",
      "Video content still needs thumbnail/frame review before being embedded prominently."
    ]
  },
  {
    id: "WIX-VIDEO-0288",
    sourceFilename: "121 - Intro Video.mp4",
    sourceRelativePath: "Wix export/Past Photos in Gallery.zip/121 - Intro Video.mp4",
    approvedPublicPath: "/videos/archive/wix-import/past-gallery-intro-video.mp4",
    sourceCollection: "archive",
    category: "archive-video",
    recommendedUse: "gallery",
    bytes: 33985066,
    duplicateCount: 1,
    notes: [
      "Recovered from the Wix export media audit on 2026-05-21.",
      "Video content still needs thumbnail/frame review before being embedded prominently."
    ]
  }
] satisfies WixImportedVideoAsset[];
