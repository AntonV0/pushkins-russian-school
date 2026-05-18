import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/public/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Pushkin's School",
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#fbfaf7",
    theme_color: "#123f73",
    lang: "en-GB",
    categories: ["education"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
