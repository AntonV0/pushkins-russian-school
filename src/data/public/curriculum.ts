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
    title: "Balanced bilingualism",
    body: "Children build Russian they can use in real life: speaking, listening, reading, writing, grammar, social confidence, and cultural understanding alongside their life in the UK.",
  },
  {
    title: "Russian literature and culture",
    body: "Lessons connect language with stories, poetry, Pushkin, theatre, traditions, celebrations, and creative work so Russian feels meaningful, social, and lived-in.",
  },
  {
    title: "Older learners and next steps",
    body: "Older pupils continue to strengthen literacy, grammar, literature, and cultural knowledge. Families looking for GCSE or A Level Russian are guided towards Volna Online Russian School.",
  },
];

export const educationPrinciples: CurriculumPillar[] = [
  {
    title: "Balanced bilingualism",
    body: "The main educational goal is balanced bilingualism: confident Russian communication, literacy, and cultural understanding for children growing up in the UK.",
  },
  {
    title: "Moscow-linked curriculum",
    body: "The curriculum is connected to work with RUDN University, the Pushkin State Institute, and the Scientific Methodical Russian Speech Centre in Moscow.",
  },
  {
    title: "Cultural confidence",
    body: "Language learning is supported by literature, performance, traditions, and age-aware creative work, including theatre performances linked to Russian culture.",
  },
];

export const placementSteps: PlacementStep[] = [
  {
    title: "Share the learning context",
    body: "Families share the child's age, school year, spoken Russian exposure, reading and writing confidence, and whether GCSE or A Level support may be needed through Volna.",
  },
  {
    title: "Find the right starting point",
    body: "Teachers use the child's current confidence, literacy, home-language background, and practical branch options to suggest a sensible starting group or learning route.",
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
  "Whether the family wants general confidence or a separate GCSE/A Level route through Volna",
];

export const curriculumProgressionStages: CurriculumProgressionStage[] = [
  {
    title: "Early confidence",
    audience: "Younger pupils and beginners",
    parentValue:
      "A gentle start that helps children enjoy Russian, hear and use the language with others, and feel proud of belonging to a Russian-speaking culture.",
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
      "A more structured pathway for children who already understand or speak some Russian and need stronger literacy, vocabulary, grammar, and cultural knowledge.",
    focusAreas: [
      "Reading fluency and written accuracy",
      "Vocabulary, grammar, and sentence building",
      "Literature, projects, and cultural context",
    ],
  },
  {
    title: "Exam-focused preparation",
    audience: "Older learners and exam-minded families",
    parentValue:
      "A stronger language and literacy base for older pupils, with clear guidance towards Volna Online Russian School if GCSE or A Level Russian is the family's goal.",
    focusAreas: [
      "Language goals and timescale",
      "Speaking, writing, reading, and listening skills",
      "Referral towards Volna online GCSE or A Level support where appropriate",
    ],
  },
];

export const curriculumMaterials = [
  "The curriculum brings together Russian language, literature, communication, and cultural knowledge.",
  "Textbooks used in classes were designed for children brought up in the UK.",
  "Teachers adapt reading, writing, speaking, and listening tasks to the pupil's current level.",
  "Pupils work towards practical Russian, stronger literacy, cultural knowledge, and confidence using the language.",
];

export const curriculumRouteRecommendations: CurriculumRouteRecommendation[] = [
  {
    title: "Choose Pushkin's School",
    bestWhen:
      "A family wants weekend classroom rhythm, community, Russian language, literature, performance, and cultural learning.",
    recommendation:
      "Explore current locations, then tell the school about your child's age, Russian level, and any exam aims.",
    href: "/schools",
    ctaLabel: "See current locations",
  },
  {
    title: "Choose Volna Online Russian School",
    bestWhen:
      "A local branch is online-only, too far away, or the student needs GCSE, A Level, group, or one-to-one online lessons.",
    recommendation:
      "Visit the Pushkin's School online lessons page for a clear handover to Volna's online classes.",
    href: "/online-lessons",
    ctaLabel: "Explore online lessons",
  },
  {
    title: "Use Volna for GCSE and A Level Russian",
    bestWhen:
      "The main goal is GCSE or A Level Russian, which is not taught at Pushkin's School.",
    recommendation:
      "Go to Volna's dedicated GCSE or A Level pages for current courses, tutors, timetable, and registration details.",
    href: "/online-lessons#gcse-a-level",
    ctaLabel: "See exam routes",
  },
];

export const curriculumReviewNotes = [
  "Families can ask about named materials, class expectations, performances, and progression.",
  "Branch teams can give more specific guidance where a child's age, level, and goals make it useful.",
];

export const curriculumDetailsPendingReview: CurriculumReviewItem[] = [
  {
    title: "Class-by-class guidance",
    body: "Junior, Middle, Senior, Grade Zero, Grades 1-4, and older learner groups each have a different emphasis.",
  },
  {
    title: "Assessment and outcomes",
    body: "Teachers can explain expected progress in practical terms once they understand the child's current Russian and learning goals.",
  },
  {
    title: "Branch-specific teaching notes",
    body: "Each branch can confirm the most relevant class, timetable, or learning option once it understands the child's age, level, and goals.",
  },
];
