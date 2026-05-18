export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "About", href: "/about" },
  { label: "Schools", href: "/schools" },
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
  ...primaryNavigation,
  ...supportNavigation,
];
