export const schoolStory = {
  foundedYear: "2009",
  ageRange: "3-18",
  networkLabel: "five supplementary Russian schools in England",
  shortMission:
    "Pushkin's School helps children growing up in the UK keep Russian language, literature, culture, and identity alive.",
  philosophy:
    "The main educational goal is balanced bilingualism: confident Russian for family life, study, culture, and communication, alongside a child's life in the UK.",
  history:
    "Founded in 2009, Pushkin's School of Russian Language and Literature has grown as a network of weekend supplementary Russian schools for children aged 3-18.",
  curriculum:
    "The curriculum was developed through cooperation with RUDN University, the Pushkin State Institute, and the Scientific Methodical Russian Speech Centre in Moscow.",
  materials:
    "The textbooks used in lessons were created for children brought up in the UK, so pupils can build practical Russian while moving towards literature, culture, and confident literacy.",
  pushkin:
    "The school is named after Alexander Sergeyevich Pushkin, the founder of modern Russian literature. The long-term ambition is for pupils to read and understand Russian works, including Pushkin, in the original.",
  culturalLife:
    "Pupils take part in theatrical performances linked to Russian culture three times a year, giving families a visible celebration of speech, pronunciation, confidence, and creativity.",
  progression:
    "Class feedback, teacher encouragement, performances, and visible class progress help pupils feel proud of their Russian and ready for the next stage.",
} as const;

export const parentValueProps = [
  {
    title: "Russian that stays alive at home and beyond it",
    body: "Children practise speaking, listening, reading, writing, grammar, and vocabulary in a setting that treats Russian as a living language.",
  },
  {
    title: "Balanced bilingualism for UK-raised children",
    body: "The school supports children who hear Russian at home, speak it confidently, understand it passively, or are beginning to read and write.",
  },
  {
    title: "Culture, literature, and identity",
    body: "Lessons connect language with stories, poetry, performances, celebrations, and the wider Russian cultural tradition.",
  },
  {
    title: "A route for older learners",
    body: "Pushkin's School builds language and cultural foundations. Families looking for GCSE or A Level Russian are guided towards Volna Online Russian School.",
  },
] as const;

export const schoolProofPoints = [
  {
    value: "Teaching since 2009",
    label:
      "Pushkin's School helps children aged 3-18 speak, read, write, and grow confident in Russian.",
  },
  {
    value: "A network of local schools",
    label:
      "Our schools have welcomed children in High Wycombe, Hemel Hempstead, Bracknell, Chelmsford, Southend-on-Sea, and Exeter.",
    links: [
      { label: "High Wycombe", href: "/schools/high-wycombe" },
      { label: "Hemel Hempstead", href: "/schools/hemel-hempstead" },
      { label: "Bracknell", href: "/schools/bracknell" },
      { label: "Chelmsford", href: "/schools/chelmsford" },
      { label: "Southend-on-Sea", href: "/schools/southend-on-sea" },
      { label: "Exeter", href: "/schools/exeter" },
    ],
  },
  {
    value: "Hundreds of pupils",
    label:
      "Across generations, children have strengthened their Russian and gained skills they can continue to build on.",
  },
  {
    value: "Expert-developed curriculum",
    label: "Developed with RUDN University, the Pushkin State Institute, and the Scientific Methodical Russian Speech Centre.",
    links: [
      {
        label: "RUDN University",
        href: "https://eng.rudn.ru/",
        external: true,
      },
      {
        label: "the Pushkin State Institute",
        href: "https://www.pushkin.institute/",
        external: true,
      },
      {
        label: "the Scientific Methodical Russian Speech Centre",
        href: "https://specped.ru/",
        external: true,
      },
    ],
  },
] as const;

export const schoolLifeHighlights = [
  "Specialised classes for children with different levels of Russian knowledge and confidence.",
  "Grammar, writing, speaking, reading, literature, culture, and creative work taught as one connected pathway.",
  "Textbooks and materials designed for children growing up in the UK.",
  "Russian cultural theatre performances three times a year.",
  "Class progress, performances, and teacher encouragement that help children feel proud of their Russian.",
] as const;
