import { paymentDetails } from "./contact";

export type SchoolStatus = "open" | "closed" | "online" | "opening-soon";

export type LessonPlanItem = {
  time: string;
  activity: string;
};

export type SchoolDecisionStep = {
  title: string;
  body: string;
  ctaLabel: string;
  href: string;
};

export type SchoolNearbyAlternativeCta = {
  label: string;
  body: string;
  href: string;
};

export type School = {
  slug: string;
  name: string;
  area: string;
  county: string;
  status: SchoolStatus;
  statusLabel: string;
  statusDescription: string;
  availabilitySummary: string;
  lead: string;
  venueName: string;
  address: string[];
  postcode: string;
  schedule: string;
  scheduleNote?: string;
  lessonPlan: LessonPlanItem[];
  classGroups: string[];
  highlights: string[];
  bestNextSteps: SchoolDecisionStep[];
  nearbyAlternativeCta: SchoolNearbyAlternativeCta;
  enquiryCta: string;
  mapHref: string;
  sourceNotes: string[];
  onlineProgramme?: {
    name: string;
    summary: string;
    details: string[];
    links: { label: string; href: string }[];
  };
};

export const classGroups = [
  "Junior Group",
  "Middle Group",
  "Senior Group",
  "Grade Zero",
  "Grades 1-4",
  "Older Learners",
];

const saturdayMorningPlan: LessonPlanItem[] = [
  { time: "9:00-9:10", activity: "Assembly and warm-up" },
  { time: "9:10-10:00", activity: "Lesson 1" },
  { time: "10:00-10:30", activity: "Lunch break" },
  { time: "10:30-11:10", activity: "Lesson 2" },
  { time: "11:10-11:15", activity: "Break" },
  { time: "11:15-12:00", activity: "Lesson 3" },
];

const saturdayAfternoonPlan: LessonPlanItem[] = [
  { time: "14:00-14:10", activity: "Assembly and warm-up" },
  { time: "14:10-15:10", activity: "Lesson 1" },
  { time: "15:10-15:30", activity: "Lunch break" },
  { time: "15:30-16:10", activity: "Lesson 2" },
  { time: "16:10-16:15", activity: "Break" },
  { time: "16:15-17:00", activity: "Lesson 3" },
];

const sundayPlan: LessonPlanItem[] = [
  { time: "10:00-10:10", activity: "Assembly and warm-up" },
  { time: "10:10-11:10", activity: "Lesson 1" },
  { time: "11:10-11:30", activity: "Lunch break" },
  { time: "11:30-12:10", activity: "Lesson 2" },
  { time: "12:10-12:15", activity: "Break" },
  { time: "12:15-13:00", activity: "Lesson 3" },
];

const sharedHighlights = [
  "Russian language, literature, culture, and creative learning",
  "Balanced bilingualism for children growing up in the UK",
  "Structured weekend timetable with assembly, lessons, and supervised breaks",
  "Performances, cultural confidence, and clear progress in Russian",
];

const onlineOnlyStatusDescription =
  "This school is part of the historic Pushkin's School network. Local in-person classes are not currently listed, but families can register interest and ask about online Russian learning.";

const onlineOnlyHighlights = [
  "Part of the Pushkin's School five-school heritage",
  "Russian language, culture, literature, and balanced bilingualism remain the learning focus",
  "Online learning can help children keep progressing while local provision is not listed",
  "Registering interest helps the school understand future local demand",
];

const exeterCurrentHighlights = [
  "Current in-person Russian classes in Exeter, Devon",
  "Russian language, literature, culture, and balanced bilingualism remain the learning focus",
  "Classes for children at different ages and stages of Russian learning",
  "Venue, timetable, availability, and fees are confirmed directly before joining",
];

function getFutureInterestHref(slug: string) {
  return `/contact?school=${slug}&intent=future-interest#enquiry-form`;
}

function getCurrentClassHref(slug: string) {
  return `/contact?school=${slug}&intent=current-classes#enquiry-form`;
}

function getOnlineLearningHref(slug: string) {
  return `/contact?school=${slug}&intent=online-learning#enquiry-form`;
}

function createOnlineBranchDecisionSteps(areaName: string, slug: string) {
  return [
    {
      title: "Ask about joining from this area",
      body: `Tell the school if your family would use future in-person Russian classes in the ${areaName} area.`,
      ctaLabel: "Ask about joining",
      href: getFutureInterestHref(slug),
    },
    {
      title: "Ask about online lessons",
      body: "Discuss online Russian lessons if your child would benefit from keeping language, literacy, and confidence moving now.",
      ctaLabel: "Ask about online lessons",
      href: getOnlineLearningHref(slug),
    },
    {
      title: "See current locations",
      body: "Check Bracknell and Exeter if you are open to travelling for current in-person classes.",
      ctaLabel: "See current locations",
      href: "/schools#compare-branches",
    },
  ];
}

const currentSchoolsAlternativeCta = {
  label: "Compare current schools",
  body: "Bracknell and Exeter are the current in-person school options for families able to travel.",
  href: "/schools#open-branches",
};

export const schools: School[] = [
  {
    slug: "high-wycombe",
    name: "High Wycombe",
    area: "High Wycombe",
    county: "Buckinghamshire",
    status: "online",
    statusLabel: "Online only / register interest",
    statusDescription: onlineOnlyStatusDescription,
    availabilitySummary:
      "High Wycombe is part of the school's five-location heritage. Families can ask about future local classes, online Russian lessons, or current in-person options.",
    lead: "A long-standing Pushkin's School location for families around High Wycombe, with the same focus on Russian language, literature, culture, and balanced bilingualism.",
    venueName: "High Wycombe area",
    address: ["Buckinghamshire"],
    postcode: "",
    schedule: "Currently online-only; register interest for future local classes",
    scheduleNote:
      "Local venue and timetable will be confirmed only if in-person classes reopen.",
    lessonPlan: saturdayMorningPlan,
    classGroups,
    highlights: onlineOnlyHighlights,
    bestNextSteps: createOnlineBranchDecisionSteps("High Wycombe", "high-wycombe"),
    nearbyAlternativeCta: currentSchoolsAlternativeCta,
    enquiryCta: "Ask about High Wycombe",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=High%20Wycombe%20Buckinghamshire",
    sourceNotes: [
      "Confirm whether local demand is high enough to reopen in-person classes.",
      "Confirm venue, timetable, staffing, and fees before publishing a weekend schedule.",
    ],
  },
  {
    slug: "hemel-hempstead",
    name: "Hemel Hempstead",
    area: "Hemel Hempstead",
    county: "Hertfordshire",
    status: "online",
    statusLabel: "Online only / register interest",
    statusDescription: onlineOnlyStatusDescription,
    availabilitySummary:
      "Hemel Hempstead is part of the school's five-location heritage. Families can ask about future local classes, online Russian lessons, or current in-person options.",
    lead: "A Hertfordshire Pushkin's School location for families who want children to keep Russian language, culture, and literacy alive.",
    venueName: "Hemel Hempstead area",
    address: ["Hertfordshire"],
    postcode: "",
    schedule: "Currently online-only; register interest for future local classes",
    lessonPlan: saturdayAfternoonPlan,
    classGroups,
    highlights: onlineOnlyHighlights,
    bestNextSteps: createOnlineBranchDecisionSteps("Hemel Hempstead", "hemel-hempstead"),
    nearbyAlternativeCta: currentSchoolsAlternativeCta,
    enquiryCta: "Ask about Hemel Hempstead",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Hemel%20Hempstead%20Hertfordshire",
    sourceNotes: [
      "Confirm whether local demand is high enough to reopen in-person classes.",
      "Confirm venue, timetable, staffing, and fees before publishing a weekend schedule.",
    ],
  },
  {
    slug: "bracknell",
    name: "Bracknell",
    area: "Bracknell",
    county: "Berkshire",
    status: "open",
    statusLabel: "Weekend school",
    statusDescription:
      "Sunday morning classes for children learning Russian language, literature, culture, and confidence.",
    availabilitySummary:
      "Bracknell is one of the current in-person weekend schools. Families can ask about spaces, class fit, start dates, and whether Volna is better for GCSE or A Level goals.",
    lead: "A Sunday Russian school community for children learning language, literature, culture, reading, writing, and performance.",
    venueName: "Saint Joseph's Primary School",
    address: ["Gipsy Lane"],
    postcode: "RG12 9AP",
    schedule: "Sundays, 10:00 to 13:00",
    lessonPlan: sundayPlan,
    classGroups,
    highlights: sharedHighlights,
    bestNextSteps: [
      {
        title: "Ask about current spaces",
        body: "Check whether the current Sunday branch has a suitable class for your child.",
        ctaLabel: "Ask about current places",
        href: getCurrentClassHref("bracknell"),
      },
      {
        title: "Discuss class fit",
        body: "Share age, Russian confidence, reading and writing level, and whether exam-focused online lessons may be needed through Volna.",
        ctaLabel: "Ask about placement",
        href: getCurrentClassHref("bracknell"),
      },
      {
        title: "Confirm start date",
        body: "Confirm timing, fees, payment instructions, and the next practical step before joining.",
        ctaLabel: "Tell us about your child",
        href: getCurrentClassHref("bracknell"),
      },
    ],
    nearbyAlternativeCta: {
      label: "Compare all branches",
      body: "See current and register-interest locations across the school network.",
      href: "/schools#compare-branches",
    },
    enquiryCta: "Ask about Bracknell",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Saint%20Joseph%27s%20Primary%20School%20Gipsy%20Lane%20RG12%209AP",
    sourceNotes: [
      "Old source included calendar, pricing, and payment content for this branch.",
      "Keep venue, timetable, fees, and payment wording checked before future publication updates.",
    ],
  },
  {
    slug: "chelmsford",
    name: "Chelmsford",
    area: "Chelmsford",
    county: "Essex",
    status: "online",
    statusLabel: "Online only / register interest",
    statusDescription: onlineOnlyStatusDescription,
    availabilitySummary:
      "Chelmsford is part of the school's five-location heritage. Families can ask about future local classes, online Russian lessons, or current in-person options.",
    lead: "An Essex Pushkin's School location for families who want Russian language, literature, culture, and identity to remain part of childhood.",
    venueName: "Chelmsford area",
    address: ["Essex"],
    postcode: "",
    schedule: "Currently online-only; register interest for future local classes",
    scheduleNote:
      "Local venue and timetable will be confirmed only if in-person classes reopen.",
    lessonPlan: sundayPlan,
    classGroups,
    highlights: onlineOnlyHighlights,
    bestNextSteps: createOnlineBranchDecisionSteps("Chelmsford", "chelmsford"),
    nearbyAlternativeCta: currentSchoolsAlternativeCta,
    enquiryCta: "Ask about Chelmsford",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Chelmsford%20Essex",
    sourceNotes: [
      "Confirm whether local demand is high enough to reopen in-person classes.",
      "Confirm venue, timetable, staffing, and fees before publishing a weekend schedule.",
    ],
    onlineProgramme: {
      name: "Volna Online Russian School",
      summary:
        "Chelmsford families can ask about Volna Online Russian School while local in-person classes are not available.",
      details: [
        "Online group and private lesson options can be discussed before joining.",
        "Exam-focused pupils can compare Volna's GCSE and A Level online courses.",
        "Specific timetable, pricing, and trial details should be confirmed directly before joining.",
      ],
      links: [
        { label: "volnaschool.com", href: "https://volnaschool.com" },
        {
          label: "Volna School on Facebook",
          href: "https://www.facebook.com/volnaschool",
        },
      ],
    },
  },
  {
    slug: "southend-on-sea",
    name: "Southend-on-Sea",
    area: "Southend-on-Sea",
    county: "Essex",
    status: "online",
    statusLabel: "Online only / register interest",
    statusDescription: onlineOnlyStatusDescription,
    availabilitySummary:
      "Southend-on-Sea is part of the school's five-location heritage. Families can ask about future local classes, online Russian lessons, or current in-person options.",
    lead: "A Southend-on-Sea Pushkin's School location for families who want children to keep Russian language, culture, and literacy strong.",
    venueName: "Southend-on-Sea area",
    address: ["Essex"],
    postcode: "",
    schedule: "Currently online-only; register interest for future local classes",
    lessonPlan: sundayPlan,
    classGroups,
    highlights: onlineOnlyHighlights,
    bestNextSteps: createOnlineBranchDecisionSteps("Southend-on-Sea", "southend-on-sea"),
    nearbyAlternativeCta: currentSchoolsAlternativeCta,
    enquiryCta: "Ask about Southend-on-Sea",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Southend-on-Sea%20Essex",
    sourceNotes: [
      "Confirm whether local demand is high enough to reopen in-person classes.",
      "Confirm venue, timetable, staffing, and fees before publishing a weekend schedule.",
    ],
  },
  {
    slug: "exeter",
    name: "Exeter",
    area: "Exeter",
    county: "Devon",
    status: "open",
    statusLabel: "Weekend school",
    statusDescription:
      "Current in-person Russian classes for children in Exeter, with timetable and venue details confirmed directly by the school.",
    availabilitySummary:
      "Exeter is a current in-person school in Devon. Families can ask about spaces, class fit, venue details, and the current timetable.",
    lead: "An Exeter Russian school community for children developing language, literature, culture, and balanced bilingualism.",
    venueName: "Exeter area",
    address: ["Devon"],
    postcode: "",
    schedule: "Contact the school for the current Exeter timetable",
    scheduleNote:
      "Current venue, timetable, class availability, and fees are confirmed directly before joining.",
    lessonPlan: [],
    classGroups,
    highlights: exeterCurrentHighlights,
    bestNextSteps: [
      {
        title: "Ask about current spaces",
        body: "Check whether the Exeter school has a suitable current class for your child.",
        ctaLabel: "Ask about current places",
        href: getCurrentClassHref("exeter"),
      },
      {
        title: "Discuss class fit",
        body: "Share your child's age, Russian confidence, reading and writing level, and previous learning experience.",
        ctaLabel: "Ask about placement",
        href: getCurrentClassHref("exeter"),
      },
      {
        title: "Confirm the practical details",
        body: "Confirm the current venue, timetable, fees, availability, and start date directly with the school.",
        ctaLabel: "Tell us about your child",
        href: getCurrentClassHref("exeter"),
      },
    ],
    nearbyAlternativeCta: {
      label: "See current locations",
      body: "Compare current in-person schools, other register-interest areas, and online routes.",
      href: "/schools#compare-branches",
    },
    enquiryCta: "Ask about Exeter",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Exeter%20Devon",
    sourceNotes: [
      "Current in-person status confirmed by the site owner.",
      "Confirm venue, timetable, staffing, class groups, and fees before publishing those practical details.",
    ],
  },
];

export const networkSummary = {
  locations: schools.length,
  counties: Array.from(new Set(schools.map((school) => school.county))).length,
  classGroupCount: classGroups.length,
  paymentSummary: paymentDetails.termFees,
};

export function getSchoolBySlug(slug: string) {
  return schools.find((school) => school.slug === slug);
}
