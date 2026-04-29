import { contactDetails } from "./contact";
import { primaryNavigation } from "./navigation";
import { schools } from "./schools";
import { absoluteUrl, siteConfig } from "./site";

export const seoKeywords = [
  "Russian school",
  "Russian language classes",
  "weekend Russian school",
  "Russian school UK",
  "GCSE Russian",
  "A Level Russian",
  "Russian culture lessons",
  "Pushkin's School",
];

export const publicRoutePriority: Record<string, number> = {
  "/": 1,
  "/schools": 0.9,
  "/contact": 0.9,
  "/admissions": 0.85,
  "/curriculum": 0.82,
  "/about": 0.78,
  "/faq": 0.72,
  "/policies": 0.68,
  "/gallery": 0.62,
};

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    email: contactDetails.email,
    description: siteConfig.description,
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    knowsAbout: [
      "Russian language",
      "Russian literature",
      "Russian culture",
      "GCSE Russian preparation",
      "A Level Russian preparation",
    ],
    department: schools.map((school) => ({
      "@type": "EducationalOrganization",
      name: `${siteConfig.name} ${school.name}`,
      url: absoluteUrl(`/schools/${school.slug}`),
      areaServed: {
        "@type": "AdministrativeArea",
        name: `${school.area}, ${school.county}`,
      },
      ...(school.status === "open"
        ? {
            address: {
              "@type": "PostalAddress",
              streetAddress: school.address.join(", "),
              addressLocality: school.area,
              addressRegion: school.county,
              postalCode: school.postcode,
              addressCountry: "GB",
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              description: school.schedule,
            },
          }
        : {}),
    })),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
    inLanguage: "en-GB",
    potentialAction: {
      "@type": "ContactAction",
      target: absoluteUrl("/contact#enquiry-form"),
      name: "Submit an initial enquiry",
    },
  };
}

export function buildSiteNavigationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl("/#site-navigation"),
    itemListElement: primaryNavigation.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.label,
      url: absoluteUrl(item.href),
    })),
  };
}
