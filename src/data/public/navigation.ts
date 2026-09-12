export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "About", href: "/about" },
  { label: "Schools", href: "/schools" },
  { label: "Online", href: "/online-lessons" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Admissions", href: "/admissions" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
];

export const supportNavigation: NavigationItem[] = [
  { label: "Contact", href: "/contact" },
  { label: "Policies", href: "/policies" },
];

export const footerNavigation: NavigationItem[] = [
  { label: "Schools", href: "/schools" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact", href: "/contact" },
  { label: "Online", href: "/online-lessons" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Policies", href: "/policies" },
];

export const legalNavigation: NavigationItem[] = [
  { label: "Privacy & cookies", href: "/policies/privacy-and-cookies" },
  {
    label: "Safeguarding",
    href: "/policies/safeguarding-and-child-protection",
  },
  {
    label: "Terms & complaints",
    href: "/policies/parent-terms-and-complaints",
  },
];
