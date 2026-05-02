export type CurriculumPillar = {
  title: string;
  body: string;
};

export type PlacementStep = {
  title: string;
  body: string;
};

export type CurriculumProgressionStage = {
  title: string;
  audience: string;
  parentValue: string;
  focusAreas: string[];
};

export type CurriculumRouteRecommendation = {
  title: string;
  bestWhen: string;
  recommendation: string;
  href: string;
  ctaLabel: string;
};

export type CurriculumReviewItem = {
  title: string;
  body: string;
};

export const curriculumPillars: CurriculumPillar[] = [
  {
    title: "Russian language confidence",
    body: "Children build speaking, listening, reading, writing, and grammar through age-aware groups, with space for different home-language backgrounds.",
  },
  {
    title: "Culture and identity",
    body: "Lessons connect Russian with stories, poetry, performance, traditions, and creative work so language feels meaningful, social, and lived-in.",
  },
  {
    title: "Exam-aware progression",
    body: "Older pupils can discuss GCSE or A Level goals early, so the school can confirm whether a local class, online lessons, or focused self-study is the best option.",
  },
];

export const educationPrinciples: CurriculumPillar[] = [
  {
    title: "Balanced bilingualism",
    body: "The school approach develops verbal, written, social, and cultural confidence through practical Russian learning.",
  },
  {
    title: "Shared curriculum",
    body: "Branches follow a common school structure, with class groups and lesson plans that can be updated from central data.",
  },
  {
    title: "Cultural confidence",
    body: "Language learning is supported by literature, performance, traditions, and age-aware creative work.",
  },
];

export const placementSteps: PlacementStep[] = [
  {
    title: "Share the learning context",
    body: "Families share the child's age, school year, spoken Russian exposure, reading and writing confidence, and any GCSE or A Level aims.",
  },
  {
    title: "Discuss the best starting point",
    body: "Teachers use the enquiry details, branch availability, and the child's current confidence to suggest the most sensible starting group or learning option.",
  },
  {
    title: "Review after the first weeks",
    body: "Placement can be reviewed during the introductory period so pupils are challenged without being overwhelmed or placed only by age.",
  },
];

export const placementSignals = [
  "How much Russian the child hears and uses at home",
  "Whether the child is more confident speaking, reading, or writing",
  "Current school year and age group",
  "Previous Russian lessons, if any",
  "Whether the family is aiming for GCSE, A Level, or general confidence",
];

export const curriculumProgressionStages: CurriculumProgressionStage[] = [
  {
    title: "Early confidence",
    audience: "Younger pupils and beginners",
    parentValue:
      "A gentle start that helps children enjoy Russian, follow classroom routines, and build confidence using the language with others.",
    focusAreas: [
      "Listening and speaking confidence",
      "Letters, sounds, early reading, and writing where suitable",
      "Songs, stories, celebrations, and creative cultural work",
    ],
  },
  {
    title: "Growing literacy",
    audience: "Developing bilingual learners",
    parentValue:
      "A more structured pathway for children who already understand or speak some Russian and need stronger literacy, vocabulary, and grammar.",
    focusAreas: [
      "Reading fluency and written accuracy",
      "Vocabulary, grammar, and sentence building",
      "Literature, projects, and cultural context",
    ],
  },
  {
    title: "Exam-focused preparation",
    audience: "GCSE and A Level learners",
    parentValue:
      "A focused discussion for families planning qualifications, including whether local classes, online lessons, or self-study support will fit best.",
    focusAreas: [
      "Exam goals and timescale",
      "Speaking, writing, reading, and listening skills",
      "Choice between local school, Volna online support, and GCSERussian.com",
    ],
  },
];

export const curriculumMaterials = [
  "Class groups follow shared learning aims for Russian language, literature, and cultural knowledge.",
  "Teachers can adapt reading, writing, speaking, and listening tasks to the pupil's current level.",
  "Exam preparation pupils can focus on GCSE or A Level skills where suitable.",
];

export const curriculumRouteRecommendations: CurriculumRouteRecommendation[] = [
  {
    title: "Choose Pushkin's School",
    bestWhen:
      "A family is near a suitable branch and wants weekend classroom rhythm, community, and cultural learning.",
    recommendation:
      "Start with the nearest branch page, then enquire with the child's age, Russian level, and any exam aims.",
    href: "/schools",
    ctaLabel: "Compare branches",
  },
  {
    title: "Ask about Volna Online Russian School",
    bestWhen:
      "A local branch is online-only, too far away, or the child needs live online group or private lessons.",
    recommendation:
      "Use the online-learning enquiry option or visit Volna's own site once the family is ready to compare online support.",
    href: "/contact?intent=online-learning#enquiry-form",
    ctaLabel: "Ask about online learning",
  },
  {
    title: "Ask about GCSERussian.com",
    bestWhen:
      "The main goal is GCSE Russian and the family wants focused self-study support alongside or instead of lessons.",
    recommendation:
      "Use the exam-preparation enquiry option to discuss whether focused GCSE self-study is the right fit.",
    href: "/contact?intent=exam-preparation#enquiry-form",
    ctaLabel: "Ask about GCSE self-study",
  },
];

export const curriculumReviewNotes = [
  "Named textbooks, detailed yearly schemes, and assessment documents can be added once approved for public use.",
  "External partnerships and historic institutional references can be added when current wording is confirmed.",
];

export const curriculumDetailsPendingReview: CurriculumReviewItem[] = [
  {
    title: "Class-by-class schemes",
    body: "Detailed curriculum by Junior, Middle, Senior, Grade Zero, Grades 1-4, GCSE, and A Level groups can be added after headteacher approval.",
  },
  {
    title: "Assessment and outcomes",
    body: "Public wording can expand once assessment language, expected progress, and exam preparation claims are approved.",
  },
  {
    title: "Branch-specific teaching notes",
    body: "Individual school locations may need their own notes later, especially where current status, staffing, or timetable details still need approval.",
  },
];
