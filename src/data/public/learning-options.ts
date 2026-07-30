export type LearningOptionId =
  | "pushkins-school"
  | "volna-online"
  | "gcse-russian";

export type LearningOption = {
  id: LearningOptionId;
  name: string;
  label: string;
  delivery: string;
  summary: string;
  bestFor: string[];
  audience: string;
  relationship: string;
  primaryCta: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryCta?: {
    label: string;
    href: string;
    external?: boolean;
  };
  verificationNote?: string;
};

export const learningOptions: LearningOption[] = [
  {
    id: "pushkins-school",
    name: "Pushkin's School",
    label: "Local weekend classes",
    delivery: "In-person branches where available",
    summary:
      "Weekend Russian school classes for children learning language, literacy, literature, culture, and performance in a structured school setting.",
    bestFor: [
      "Families near a current or future local branch",
      "Children who benefit from classroom rhythm and community",
      "Parents looking for a serious supplementary school",
    ],
    audience: "Children and young people building Russian language, literacy, and culture.",
    relationship:
      "This is the main school offer. Location pages stay visible so families can see where classes have operated and register interest locally.",
    primaryCta: {
      label: "Compare school branches",
      href: "/schools",
    },
    secondaryCta: {
      label: "Ask about joining locally",
      href: "/contact?intent=current-classes#enquiry-form",
    },
  },
  {
    id: "volna-online",
    name: "Volna Online Russian School",
    label: "Fully online lessons",
    delivery: "Online group and private lessons",
    summary:
      "A related online Russian learning option for students of all ages, including children, GCSE students, A Level students, and learners who cannot attend a local branch.",
    bestFor: [
      "Families without a suitable open local branch",
      "Students who need online group or private Russian lessons",
      "GCSE and A Level students who want live online support",
    ],
    audience: "Students of all ages, with group and private lesson options.",
    relationship:
      "A separate online school option, useful when local classes are unavailable or distance is a barrier.",
    primaryCta: {
      label: "Explore online lessons",
      href: "/online-lessons",
    },
    secondaryCta: {
      label: "Visit Volna online",
      href: "https://www.volnaschool.com/",
      external: true,
    },
    verificationNote:
      "Ask for current lesson format, timetable, and pricing before choosing this option.",
  },
  {
    id: "gcse-russian",
    name: "Volna GCSE and A Level Russian",
    label: "Online exam courses",
    delivery: "Online GCSE and A Level Russian lessons",
    summary:
      "A separate Volna route for families who want GCSE or A Level Russian support. Pushkin's School does not teach these exam courses.",
    bestFor: [
      "GCSE Russian students who need structured online teaching",
      "A Level Russian students who need exam-focused support",
      "Learners outside a current local branch",
    ],
    audience: "GCSE and A Level Russian learners and families planning exam preparation.",
    relationship:
      "A Volna pathway, included on Pushkin's School so families understand where exam-focused Russian lessons sit.",
    primaryCta: {
      label: "See GCSE and A Level routes",
      href: "/online-lessons#gcse-a-level",
    },
    verificationNote:
      "Volna keeps its own course pages, timetables, fees, and registration details.",
  },
];

export const learningOptionSummary =
  "Pushkin's School is the local weekend school offer. Volna Online Russian School is the related online route for distance learning, private lessons, GCSE Russian, and A Level Russian.";

export function getLearningOptionById(id: LearningOptionId) {
  return learningOptions.find((option) => option.id === id);
}

export function getLearningOptionsForBranchStatus(status: string) {
  if (status === "closed" || status === "online" || status === "opening-soon") {
    return [
      ...learningOptions.filter((option) => option.id !== "pushkins-school"),
      ...learningOptions.filter((option) => option.id === "pushkins-school"),
    ];
  }

  return learningOptions;
}
