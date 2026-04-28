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
        question: "Can I enquire about a branch that is currently closed?",
        answer:
          "Yes. Closed and online-only branches remain part of the school network, and the site uses register-interest wording where in-person classes are not currently confirmed.",
      },
      {
        question: "Are all listed timetables final?",
        answer:
          "Some branch timetables come from legacy source material and are marked with verification notes where old pages conflict or need current confirmation.",
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
      "How the site explains a careful route into the right learning group.",
    items: [
      {
        question: "Do I need to know the exact class group before enquiring?",
        answer:
          "No. The enquiry route is designed to gather context first. Teachers can then use the child's age, language experience, and early lessons to guide the most suitable group.",
      },
      {
        question: "What Russian level should I choose on the form?",
        answer:
          "Choose the closest option. It is fine to select 'Not sure yet' if the child has mixed experience across speaking, reading, and writing.",
      },
      {
        question: "Is exam preparation included?",
        answer:
          "The data model includes GCSE and A Level exam preparation as a class pathway. Families should mention exam goals in the enquiry so the school can confirm suitability.",
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
          "GCSERussian.com is treated as a separate GCSE Russian self-study project. It gives exam-focused families another route alongside local weekend classes or online lessons.",
      },
    ],
  },
  {
    title: "Fees and payment",
    summary:
      "What can be shown now, and what still needs final payment verification.",
    items: [
      {
        question: "Where are the fees listed?",
        answer:
          "The admissions page and each school page show the legacy fee summary from centralized payment data so it can be updated in one place.",
      },
      {
        question: "Are bank details published yet?",
        answer:
          "No exact account values are guessed. Bank details are approved for future inclusion, but the account information remains a verification placeholder until final values are confirmed.",
      },
      {
        question: "Can families use childcare vouchers?",
        answer:
          "The legacy payment source lists childcare vouchers as an accepted method, alongside bank transfer. This remains centralized for final confirmation.",
      },
    ],
  },
  {
    title: "Policies, gallery, and documents",
    summary:
      "How the rebuild handles public documents and approved media safely.",
    items: [
      {
        question: "Why do policy pages say downloads are pending?",
        answer:
          "Policy titles and shells are ready, but public downloads should only be linked after the documents are reviewed, updated, and checked for personal or unpublished operational details.",
      },
      {
        question: "Why are there gallery placeholders instead of photos?",
        answer:
          "Raw screenshots are intentionally not used as website assets. Gallery routes are ready for approved, optimized public images once the asset workflow is complete.",
      },
      {
        question: "Will the website store enquiry form information?",
        answer:
          "Not yet. The current enquiry form prepares a structured email draft and does not store or submit information through the website backend.",
      },
    ],
  },
];

export const faqs = faqGroups.flatMap((group) => group.items);
