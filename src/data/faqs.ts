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
        question: "Can I enquire about an online-only location?",
        answer:
          "Yes. Online-only locations stay visible for families, and the site uses register-interest wording where in-person classes are not currently available.",
      },
      {
        question: "Are all listed timetables final?",
        answer:
          "Some branch timetables are shown cautiously where older records conflict or current details still need confirmation. The school confirms current times after enquiry.",
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
      "How the site explains a careful start in the right learning group.",
    items: [
      {
        question: "Do I need to know the exact class group before enquiring?",
        answer:
          "No. The enquiry form is designed to gather context first. Teachers can then use the child's age, language experience, branch availability, and early lessons to guide the most suitable group or recommend another learning option.",
      },
      {
        question: "What Russian level should I choose on the form?",
        answer:
          "Choose the closest option. It is fine to select 'Not sure yet' if the child has mixed experience across speaking, reading, and writing.",
      },
      {
        question: "What information helps with placement?",
        answer:
          "The most useful details are how much Russian the child hears or uses at home, whether they read or write in Russian, their age and school year, any previous lessons, and whether GCSE or A Level preparation is a goal.",
      },
      {
        question: "Is exam preparation included?",
        answer:
          "GCSE and A Level exam preparation is included as a pathway. Families should mention exam goals in the enquiry so the school can confirm whether Pushkin's School, Volna online lessons, or GCSERussian.com is the best fit.",
      },
    ],
  },
  {
    title: "Related learning options",
    summary:
      "How Pushkin's School, Volna Online Russian School, and GCSERussian.com fit together.",
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
        question: "Where does GCSERussian.com fit?",
        answer:
          "GCSERussian.com is treated as a separate GCSE Russian self-study project. It gives exam-focused families another option alongside local weekend classes or online lessons.",
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
          "The admissions page and each school page show fee categories, but current amounts are confirmed directly by the school after enquiry.",
      },
      {
        question: "Are bank details published yet?",
        answer:
          "No. Payment instructions and bank details are provided directly by the school until the final public payment wording is approved.",
      },
      {
        question: "Can families use childcare vouchers?",
        answer:
          "Childcare vouchers are listed as a payment method to confirm. Ask in the enquiry so the school can confirm the current method and any required reference.",
      },
    ],
  },
  {
    title: "Policies, gallery, and documents",
    summary:
      "How the rebuild handles public documents and approved media safely.",
    items: [
      {
        question: "Why are some policy downloads not shown yet?",
        answer:
          "Policy summaries are available first. Public downloads are linked only when the documents are updated, approved, and checked so families see the right public version.",
      },
      {
        question: "Why are some gallery spaces waiting for photos?",
        answer:
          "Raw screenshots are intentionally not used as website assets. Gallery year pages are ready for approved, optimized public images once the asset workflow is complete.",
      },
      {
        question: "Will the website store enquiry form information?",
        answer:
          "The enquiry form validates only the first details needed for a reply. Live storage should be enabled only after privacy wording, retention, staff access, and Supabase row-level security are approved.",
      },
    ],
  },
];

export const faqs = faqGroups.flatMap((group) => group.items);
