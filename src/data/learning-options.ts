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
      "Weekend Russian school locations for children learning language, literacy, culture, and exam preparation in a structured school setting.",
    bestFor: [
      "Families near a current or future local branch",
      "Children who benefit from classroom rhythm and community",
      "Parents looking for a school network with branch-specific pages",
    ],
    audience: "Children and young people, including GCSE and A Level learners.",
    relationship:
      "This is the core school network. Online-only network areas keep full pages so families can register interest locally.",
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
      "A related online Russian learning route for students of all ages, including children, GCSE students, A Level students, and learners who cannot attend a local branch.",
    bestFor: [
      "Families without a suitable open local branch",
      "Students who need online group or private Russian lessons",
      "GCSE and A Level students who want live online support",
    ],
    audience: "Students of all ages, with group and private lesson options.",
    relationship:
      "A separate online school option connected to the wider Russian-learning network, useful when local classes are unavailable or distance is a barrier.",
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
      "Confirm current Volna offer details before relying on specific pricing, lesson format, or availability.",
  },
  {
    id: "gcse-russian",
    name: "GCSERussian.com",
    label: "GCSE self-study project",
    delivery: "Self-study GCSE Russian support",
    summary:
      "A separate GCSE Russian project for families who want a focused self-study route alongside, or instead of, school or online lessons.",
    bestFor: [
      "GCSE Russian students who need structured independent study",
      "Families comparing tutoring, classes, and self-study options",
      "Learners outside the current branch network",
    ],
    audience: "GCSE Russian learners and families planning exam preparation.",
    relationship:
      "A distinct project from Pushkin's School and Volna, included so parents can see the wider set of Russian-learning pathways.",
    primaryCta: {
      label: "Ask about GCSE self-study",
      href: "/contact?intent=exam-preparation#enquiry-form",
    },
    verificationNote:
      "Confirm the public GCSERussian.com URL before adding an external button.",
  },
];

export const learningOptionSummary =
  "Pushkin's School, Volna Online Russian School, and GCSERussian.com are presented as connected Russian-learning options while remaining distinct projects.";

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
