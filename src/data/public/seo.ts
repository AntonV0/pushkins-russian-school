import { contactDetails } from "./contact";
import { primaryNavigation } from "./navigation";
import { schools } from "./schools";
import { absoluteUrl, siteConfig, siteSocialLinks } from "./site";

export const seoKeywords = [
  "Russian school",
  "Russian language classes",
  "Russian language classes for children",
  "weekend Russian school",
  "Russian school UK",
  "Russian school near me",
  "Russian culture lessons",
  "balanced bilingualism",
  "Russian literature for children",
  "Russian heritage school",
  "online Russian lessons",
  "Volna Online Russian School",
  "GCSE Russian through Volna",
  "A Level Russian through Volna",
  "Pushkin's School",
];

export const publicRoutePriority: Record<string, number> = {
  "/": 1,
  "/schools": 0.9,
  "/online-lessons": 0.88,
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
    sameAs: siteSocialLinks.map((link) => link.href),
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    knowsAbout: [
      "Russian language",
      "Russian literature",
      "Russian culture",
      "GCSE Russian route guidance",
      "A Level Russian route guidance",
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
      name: "Tell the school about your child",
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
