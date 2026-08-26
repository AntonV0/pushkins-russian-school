export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqGroup = {
  title: string;
  summary: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    title: "Choosing a branch",
    summary:
      "How families can compare current, online, and register-interest locations.",
    items: [
      {
        question: "Can I ask about an online-only location?",
        answer:
          "Yes. Online-only locations stay visible so families can register local interest, ask about online lessons, or compare the current in-person schools.",
      },
      {
        question: "Are all listed timetables final?",
        answer:
          "No. Branch pages distinguish current in-person provision from future local interest. The school confirms times, availability, and practical joining details before a family joins.",
      },
      {
        question: "What should I send if I am not sure which branch fits?",
        answer:
          "Share your preferred area, child's age, current Russian level, whether you want current classes or future local classes, and any exam goals.",
      },
    ],
  },
  {
    title: "Class placement",
    summary:
      "How children can start in the right learning group.",
    items: [
      {
        question: "Does my child need to already speak Russian?",
        answer:
          "No. The school welcomes children from Russian-speaking homes and children discovering Russian for the first time. Age and current language experience help guide placement.",
      },
      {
        question: "Do I need to know the exact class group before contacting the school?",
        answer:
          "No. The form is designed to gather context first. Teachers can then use the child's age, language experience, branch availability, and early lessons to guide the most suitable group or recommend another learning option.",
      },
      {
        question: "What Russian level should I choose on the form?",
        answer:
          "Choose the closest option. It is fine to select 'Not sure yet' if the child has mixed experience across speaking, reading, and writing.",
      },
      {
        question: "What information helps with placement?",
        answer:
          "The most useful details are how much Russian the child hears or uses at home, whether they read or write in Russian, their age and school year, any previous lessons, and whether GCSE or A Level Russian through Volna is a goal.",
      },
      {
        question: "Does Pushkin's School teach GCSE or A Level Russian?",
        answer:
          "No. Pushkin's School focuses on weekend Russian language, literature, culture, and bilingual confidence. GCSE and A Level Russian are handled through Volna Online Russian School, which has dedicated online courses for exam students.",
      },
    ],
  },
  {
    title: "Related learning options",
    summary:
      "How Pushkin's School and Volna Online Russian School fit together.",
    items: [
      {
        question: "What if there is no open Pushkin's School branch near us?",
        answer:
          "Families can still register interest for future local classes and can also ask about Volna Online Russian School as a fully online option with group and private lessons.",
      },
      {
        question: "Is Volna Online Russian School the same as Pushkin's School?",
        answer:
          "No. It is presented as a related but distinct online Russian-learning option, useful for families who need fully online lessons or live support outside a local branch.",
      },
      {
        question: "Where do GCSE and A Level Russian fit?",
        answer:
          "GCSE and A Level Russian sit with Volna Online Russian School, not Pushkin's School. The Pushkin's School website points exam-focused families to the Volna pages so parents can compare the right route.",
      },
    ],
  },
  {
    title: "Fees and payment",
    summary:
      "How families should treat fee and payment information before joining.",
    items: [
      {
        question: "Where can I confirm current fees?",
        answer:
          "The admissions page and each school page show fee categories, but current amounts are confirmed directly by the school before a family joins.",
      },
      {
        question: "Are bank details published yet?",
        answer:
          "No. Payment instructions and bank details are provided directly by the school until the final public payment wording is ready.",
      },
      {
        question: "Can families use childcare vouchers?",
        answer:
          "Childcare vouchers are listed as a payment method to confirm. Ask the school so it can confirm the current method and any required reference.",
      },
    ],
  },
  {
    title: "Policies, gallery, and documents",
    summary:
      "How public documents, gallery images, and first-contact details are handled carefully.",
    items: [
      {
        question: "Why are some policy downloads not shown yet?",
        answer:
          "Policy summaries are available first. Public downloads are linked only when documents are ready for families to use.",
      },
      {
        question: "Why are some gallery spaces waiting for photos?",
        answer:
          "Gallery collections are reserved for selected school images with suitable captions and privacy checks.",
      },
      {
        question: "Will the website store contact form information?",
        answer:
          "The contact form asks only for the first details needed for a reply. Full registration, consent, emergency contact, and health information are requested later if a family joins.",
      },
    ],
  },
];

export const faqs = faqGroups.flatMap((group) => group.items);
