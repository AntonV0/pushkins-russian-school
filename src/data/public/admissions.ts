export const admissionsSteps = [
  {
    title: "Tell us about your child",
    body: "Share your child's age, Russian background, confidence with speaking, reading and writing, and what you hope the school will help them keep or build.",
  },
  {
    title: "Find the right class or route",
    body: "The school considers current locations, online options, age, language level, and whether a separate Volna route is better for GCSE or A Level goals.",
  },
  {
    title: "Start with confidence",
    body: "Once the practical details are clear, your child can begin in a group or learning option that supports balanced bilingualism without guessing from age alone.",
  },
];

export const enquiryChecklist = [
  "Parent or carer name and contact email",
  "Child first name or children's first names",
  "Child age or ages",
  "Preferred school location or online learning option",
  "How much Russian the child hears or uses at home",
  "Current Russian language level",
  "Interest in GCSE or A Level Russian through Volna, if relevant",
  "Whether you are asking about current classes, future local classes, or online learning",
];

export const enquiryTypes = [
  {
    value: "current-classes",
    label: "Current weekend classes",
  },
  {
    value: "future-interest",
    label: "Future local classes",
  },
  {
    value: "exam-preparation",
    label: "GCSE or A Level route through Volna",
  },
  {
    value: "online-learning",
    label: "Online learning options",
  },
  {
    value: "general",
    label: "General enquiry",
  },
];

export const russianLevelOptions = [
  "Beginner",
  "Understands some Russian at home",
  "Speaks conversational Russian",
  "Reads and writes in Russian",
  "Preparing for GCSE",
  "Preparing for A Level",
  "Not sure yet",
];

export const childAgeOptions = [
  "Under 5",
  "5-7",
  "8-10",
  "11-13",
  "14-16",
  "17+",
];

export function getSchoolEnquiryIntent(status: string) {
  if (status === "closed" || status === "online" || status === "opening-soon") {
    return "future-interest";
  }

  return "current-classes";
}

export function getSchoolEnquiryHref(school: { slug: string; status: string }) {
  const params = new URLSearchParams({
    school: school.slug,
    intent: getSchoolEnquiryIntent(school.status),
  });

  return `/contact?${params.toString()}#enquiry-form`;
}
