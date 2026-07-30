export const siteConfig = {
  name: "Pushkin's School",
  fullName: "Pushkin's School of Russian Language and Literature",
  legalName: "Pushkin's School of Russian Language and Literature",
  description:
    "Russian language, literature, and culture school for children aged 3-18, helping UK families build balanced bilingualism, confidence, and cultural connection.",
  url: "https://www.pushkinsrussianschool.co.uk",
  locale: "en_GB",
};

export const siteSocialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/PushkinsSchool/",
    description: "School updates, community photos, and announcements",
  },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
