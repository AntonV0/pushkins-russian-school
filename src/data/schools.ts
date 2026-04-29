import { paymentDetails } from "./contact";

export type SchoolStatus = "open" | "closed" | "online" | "opening-soon";

export type LessonPlanItem = {
  time: string;
  activity: string;
};

export type School = {
  slug: string;
  name: string;
  area: string;
  county: string;
  status: SchoolStatus;
  statusLabel: string;
  statusDescription: string;
  lead: string;
  venueName: string;
  address: string[];
  postcode: string;
  schedule: string;
  scheduleNote?: string;
  lessonPlan: LessonPlanItem[];
  classGroups: string[];
  highlights: string[];
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
  "GCSE and A Level Exam Preparation",
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
  "Age-aware class groups from early years to exam preparation",
  "Structured weekend timetable with assembly, lessons, and supervised breaks",
];

const onlineOnlyStatusDescription =
  "This network area is online-only for now while local demand, staffing, and venue options are being confirmed. Families can register interest for future in-person classes.";

const onlineOnlyHighlights = [
  "Online learning route available while local classes are paused",
  "Register-interest route helps the school understand local demand",
  "Future local classes can reopen when enough families and operational capacity align",
];

export const schools: School[] = [
  {
    slug: "high-wycombe",
    name: "High Wycombe",
    area: "High Wycombe",
    county: "Buckinghamshire",
    status: "online",
    statusLabel: "Online only / register interest",
    statusDescription: onlineOnlyStatusDescription,
    lead: "A long-standing network area for families around High Wycombe, currently kept open for online learning and future local interest.",
    venueName: "High Wycombe area",
    address: ["Buckinghamshire"],
    postcode: "",
    schedule: "Online only for now; register interest for future local classes",
    scheduleNote:
      "Local venue and timetable will be confirmed only if in-person classes reopen.",
    lessonPlan: saturdayMorningPlan,
    classGroups,
    highlights: onlineOnlyHighlights,
    enquiryCta: "Register interest in High Wycombe classes",
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
    lead: "A Hertfordshire network area for Russian-learning families, currently online-only with a register-interest route for future local classes.",
    venueName: "Hemel Hempstead area",
    address: ["Hertfordshire"],
    postcode: "",
    schedule: "Online only for now; register interest for future local classes",
    lessonPlan: saturdayAfternoonPlan,
    classGroups,
    highlights: onlineOnlyHighlights,
    enquiryCta: "Register interest in Hemel Hempstead classes",
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
      "Sunday morning classes are presented for local families, with final details confirmed through enquiry.",
    lead: "A Sunday branch for children learning Russian language, culture, reading, writing, and exam skills.",
    venueName: "Saint Joseph's Primary School",
    address: ["Gipsy Lane"],
    postcode: "RG12 9AP",
    schedule: "Sundays, 10:00 to 13:00",
    lessonPlan: sundayPlan,
    classGroups,
    highlights: sharedHighlights,
    enquiryCta: "Enquire about Bracknell places",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Saint%20Joseph%27s%20Primary%20School%20Gipsy%20Lane%20RG12%209AP",
    sourceNotes: [
      "Old source included calendar, pricing, and payment content for this branch.",
      "Current operating status needs final business confirmation.",
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
    lead: "An Essex network area for families around Chelmsford, currently online-only with interest gathered for future local provision.",
    venueName: "Chelmsford area",
    address: ["Essex"],
    postcode: "",
    schedule: "Online only for now; register interest for future local classes",
    scheduleNote:
      "Local venue and timetable will be confirmed only if in-person classes reopen.",
    lessonPlan: sundayPlan,
    classGroups,
    highlights: onlineOnlyHighlights,
    enquiryCta: "Register interest in Chelmsford classes",
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
        "Online group and private lesson options can be discussed after enquiry.",
        "Exam-focused pupils can ask whether online support or GCSE self-study is the better fit.",
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
    lead: "A Southend-on-Sea network area retained for online learning and future local class interest.",
    venueName: "Southend-on-Sea area",
    address: ["Essex"],
    postcode: "",
    schedule: "Online only for now; register interest for future local classes",
    lessonPlan: sundayPlan,
    classGroups,
    highlights: onlineOnlyHighlights,
    enquiryCta: "Register interest in Southend-on-Sea classes",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Southend-on-Sea%20Essex",
    sourceNotes: [
      "Confirm whether local demand is high enough to reopen in-person classes.",
      "Confirm venue, timetable, staffing, and fees before publishing a weekend schedule.",
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
