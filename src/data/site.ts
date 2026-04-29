export const siteConfig = {
  name: "Pushkin's School",
  legalName: "Pushkin's Russian School",
  description:
    "Russian language, culture, and exam preparation across current classes, online options, and register-interest network areas.",
  url: "https://www.pushkinsrussianschool.co.uk",
  locale: "en_GB",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
