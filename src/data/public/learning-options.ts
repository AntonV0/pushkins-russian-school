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
      "Weekend Russian school classes for children learning language, literacy, literature, culture, and exam preparation in a structured school setting.",
    bestFor: [
      "Families near a current or future local branch",
      "Children who benefit from classroom rhythm and community",
      "Parents looking for a serious supplementary school",
    ],
    audience: "Children and young people, including GCSE and A Level learners.",
    relationship:
      "This is the main school offer. Location pages stay visible so families can see where classes have operated and register interest locally.",
    primaryCta: {
      label: "Compare school branches",
      href: "/schools",
    },
    secondaryCta: {
      label: "Start a local enquiry",
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
      label: "Visit Volna online",
      href: "https://volnaschool.com",
      external: true,
    },
    secondaryCta: {
      label: "Ask about online lessons",
      href: "/contact?intent=online-learning#enquiry-form",
    },
    verificationNote:
      "Ask for current lesson format, timetable, and pricing before choosing this option.",
  },
  {
    id: "gcse-russian",
    name: "GCSERussian.com",
    label: "GCSE self-study project",
    delivery: "Self-study GCSE Russian support",
    summary:
      "A separate GCSE Russian project for families who want focused self-study support alongside, or instead of, school or online lessons.",
    bestFor: [
      "GCSE Russian students who need structured independent study",
      "Families comparing tutoring, classes, and self-study options",
      "Learners outside a current local branch",
    ],
    audience: "GCSE Russian learners and families planning exam preparation.",
    relationship:
      "A distinct project from Pushkin's School and Volna, included so parents can compare Russian-learning pathways.",
    primaryCta: {
      label: "Ask about GCSE self-study",
      href: "/contact?intent=exam-preparation#enquiry-form",
    },
    verificationNote:
      "Ask through the enquiry form if GCSE self-study is the main goal.",
  },
];

export const learningOptionSummary =
  "Pushkin's School is the local weekend school offer, with Volna Online Russian School and GCSERussian.com presented as separate options for distance learning or exam preparation.";

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
