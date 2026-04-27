export const admissionsSteps = [
  {
    title: "Choose a preferred branch",
    body: "Review the branch status, venue, schedule, class groups, and any verification notes before enquiring.",
  },
  {
    title: "Share the child's learning context",
    body: "Include age, Russian language experience, reading and writing confidence, and any exam goals.",
  },
  {
    title: "Confirm availability and fit",
    body: "The school can confirm current places, future local interest, introductory options, and the most suitable group.",
  },
];

export const enquiryChecklist = [
  "Child's age and school year",
  "Preferred school location",
  "Current Russian language level",
  "Interest in GCSE or A Level preparation, if relevant",
  "Whether the enquiry is for current classes or future local classes",
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
    label: "GCSE or A Level preparation",
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
