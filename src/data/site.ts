export const siteConfig = {
  name: "Pushkin's School",
  legalName: "Pushkin's Russian School",
  description:
    "Russian language, culture, and exam preparation across a parent-facing weekend school network.",
  url: "https://www.pushkinsrussianschool.co.uk",
  locale: "en_GB",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
