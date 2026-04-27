export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: "About", href: "/about" },
  { label: "Schools", href: "/schools" },
  { label: "Curriculum", href: "/curriculum" },
  { label: "Policies", href: "/policies" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation: NavigationItem[] = [
  ...primaryNavigation,
  { label: "Admissions and fees", href: "/admissions" },
];
