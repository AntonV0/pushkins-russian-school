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

export const schools: School[] = [
  {
    slug: "high-wycombe",
    name: "High Wycombe",
    area: "High Wycombe",
    county: "Buckinghamshire",
    status: "open",
    statusLabel: "Weekend school",
    statusDescription:
      "Local weekend classes are available for families around High Wycombe; session times should be confirmed before attending.",
    lead: "A long-standing Saturday school for families around High Wycombe, with grouped Russian language and culture lessons.",
    venueName: "Hughenden Primary School",
    address: ["Spring Valley Drive"],
    postcode: "HP14 4LR",
    schedule: "Saturdays, 9:00 to 12:00",
    scheduleNote:
      "Final timing to confirm: older source material also listed 9:30 to 12:30.",
    lessonPlan: saturdayMorningPlan,
    classGroups,
    highlights: sharedHighlights,
    enquiryCta: "Enquire about High Wycombe places",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Hughenden%20Primary%20School%20Spring%20Valley%20Drive%20HP14%204LR",
    sourceNotes: [
      "Venue and address copied from old public site source material.",
      "Saturday start and finish times conflict across old pages and need confirmation.",
    ],
  },
  {
    slug: "hemel-hempstead",
    name: "Hemel Hempstead",
    area: "Hemel Hempstead",
    county: "Hertfordshire",
    status: "open",
    statusLabel: "Weekend school",
    statusDescription:
      "Saturday afternoon classes are presented for local families, with final details confirmed through enquiry.",
    lead: "A Saturday afternoon branch supporting Russian language learning for families in and around Hemel Hempstead.",
    venueName: "South Hill Primary School",
    address: ["Heath Lane"],
    postcode: "HP1 1TT",
    schedule: "Saturdays, 14:00 to 17:00",
    lessonPlan: saturdayAfternoonPlan,
    classGroups,
    highlights: sharedHighlights,
    enquiryCta: "Enquire about Hemel Hempstead places",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=South%20Hill%20Primary%20School%20Heath%20Lane%20HP1%201TT",
    sourceNotes: [
      "Old source included calendar, pricing, and payment content for this branch.",
      "Current operating status needs final business confirmation.",
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
    statusLabel: "Online / status to confirm",
    statusDescription:
      "Legacy copy says this branch moved online during the Covid period. Register interest for future local classes.",
    lead: "A Chelmsford school page retained for the network, with transparent wording while in-person provision is confirmed.",
    venueName: "Hylands School",
    address: ["Chelmsford Road", "Writtle"],
    postcode: "CM1 3ET",
    schedule: "Sundays, 10:00 to 13:00 when in-person classes are available",
    scheduleNote:
      "Final route to confirm: older source material also described the branch as online only.",
    lessonPlan: sundayPlan,
    classGroups,
    highlights: [
      ...sharedHighlights,
      "Online provision information retained while the current Chelmsford route is confirmed",
    ],
    enquiryCta: "Register interest in Chelmsford classes",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Hylands%20School%20Chelmsford%20Road%20Writtle%20CM1%203ET",
    sourceNotes: [
      "Old source says Sundays 10:00 to 13:00 and also says online only.",
      "Volna Online Russian School copy is retained as source reference, not final current operating copy.",
    ],
    onlineProgramme: {
      name: "Volna Online Russian School",
      summary:
        "The old Chelmsford page referred families to an online school launched on 7 September 2020.",
      details: [
        "Same class groups, lesson plans, and curriculum were described in the source copy.",
        "Two one-hour lessons weekly.",
        "Pricing and introductory-trial wording appeared in old copy and should be confirmed before publication.",
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
    status: "closed",
    statusLabel: "Currently closed for in-person classes",
    statusDescription:
      "This branch remains part of the Pushkin's School network. Families can register interest for future local classes.",
    lead: "A Southend-on-Sea school page retained for families and future planning, with clear current status wording.",
    venueName: "Westcliff High School for Girls",
    address: ["Kenilworth Gardens"],
    postcode: "SS0 0BS",
    schedule: "Register interest for future local classes",
    lessonPlan: sundayPlan,
    classGroups,
    highlights: [
      "Part of the wider Pushkin's School network",
      "Future local classes can follow the same weekend lesson structure",
      "Interest can be registered while in-person classes are closed",
    ],
    enquiryCta: "Register interest in Southend-on-Sea classes",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Westcliff%20High%20School%20for%20Girls%20Kenilworth%20Gardens%20SS0%200BS",
    sourceNotes: [
      "Old overview described this branch as online only with a planned opening from January 2021.",
      "Current status should be confirmed before launch.",
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
