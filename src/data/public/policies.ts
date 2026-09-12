export type PolicyLink = {
  label: string;
  href: string;
  description?: string;
};

export type PolicyContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "subheading";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "links";
      items: PolicyLink[];
    };

export type PolicySection = {
  id: string;
  title: string;
  emphasis?: boolean;
  blocks: PolicyContentBlock[];
};

export type PublicPolicy = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  summary: string;
  owner: string;
  version: string;
  lastUpdated: string;
  lastUpdatedIso: string;
  nextReview: string;
  sections: PolicySection[];
};

const schoolEmail = "elena@pushkinsschool.co.uk";
const schoolPhone = "07881 764892";
const businessAddress = "90 Telford Way, High Wycombe, HP13 5EA";

export const policies: PublicPolicy[] = [
  {
    slug: "privacy-and-cookies",
    title: "Privacy and Cookies Notice",
    shortTitle: "Privacy & cookies",
    description:
      "How the school collects, uses, shares and protects information about children, families and website visitors.",
    summary:
      "This notice explains what information Pushkin's School needs to run lessons and respond to families, why it is used, how long it is kept and the choices available to you.",
    owner: "Elena Vlasenko, Data Controller",
    version: "1.0",
    lastUpdated: "2 September 2026",
    lastUpdatedIso: "2026-09-02",
    nextReview: "September 2027, or sooner if our services or systems change",
    sections: [
      {
        id: "about-this-notice",
        title: "1. About this notice",
        blocks: [
          {
            type: "paragraph",
            text: "The data controller is Elena Vlasenko, a sole trader trading as Pushkin's School of Russian Language and Literature (\"Pushkin's School\", \"we\", \"us\" or \"our\"). This notice applies when you visit our website, contact us, register a child, attend lessons or events, make a payment, or otherwise communicate with the school.",
          },
          {
            type: "paragraph",
            text: `For privacy questions or our correspondence address, email ${schoolEmail}.`,
          },
        ],
      },
      {
        id: "children-summary",
        title: "A short privacy summary for pupils",
        emphasis: true,
        blocks: [
          {
            type: "paragraph",
            text: "Parents and carers can read this section with younger children.",
          },
          {
            type: "paragraph",
            text: "We need some information about you so that we can place you in a suitable class, help you learn, record attendance and keep you safe. This can include your first name, age, class, attendance and schoolwork.",
          },
          {
            type: "paragraph",
            text: "We share information only with people who need it to teach you, run the school or protect you. A parent or another trusted adult can ask us what information we have about you or help you raise a question.",
          },
        ],
      },
      {
        id: "information-we-collect",
        title: "2. Information we collect",
        blocks: [
          {
            type: "paragraph",
            text: "An initial website enquiry may include a parent or carer's name, email address, optional telephone number, preferred school or learning route, a child's first name and age, their current Russian level, the type of enquiry and an optional message.",
          },
          {
            type: "paragraph",
            text: "If a family proceeds, the school uses a more detailed paper admission form. Required information may include the child's full name and date of birth, home address, parent or carer and emergency-contact details, authorised collection arrangements, relevant medical or allergy information, essential medication, disability or learning-support needs, consent choices and a signed declaration.",
          },
          {
            type: "paragraph",
            text: "Optional information may include languages spoken at home, the child's weekday school, a second parent or carer, siblings, how the family heard about the school and other information the parent chooses to provide. We do not require a child's nationality or a parent's business telephone number.",
          },
          {
            type: "paragraph",
            text: "Information about a child is normally supplied by their parent or carer. An older pupil may also provide information directly, for example when asking a question, discussing their learning or exercising a privacy right.",
          },
          {
            type: "paragraph",
            text: "Contact information is needed if a family wants us to respond to an enquiry. If a child joins, the required identity, emergency-contact, collection, health and support information forms part of the enrolment and safety arrangements. If necessary information is not provided, the school may be unable to offer a place or continue attendance safely. Optional information and promotional permission are not conditions of enrolment.",
          },
          {
            type: "paragraph",
            text: "We may also hold children's work, progress notes and photographs or recordings where the school has an appropriate reason and, for optional promotional use, the required permission.",
          },
          {
            type: "paragraph",
            text: "When the website is used, our hosting and security systems may process technical information such as an IP address, browser information, request time and pages requested. If rate limiting is enabled, limited request information is converted into a temporary security identifier to help prevent repeated automated submissions.",
          },
        ],
      },
      {
        id: "how-we-use-information",
        title: "3. How and why we use information",
        blocks: [
          {
            type: "paragraph",
            text: "We use personal information to answer enquiries; discuss an appropriate school or class; register pupils; provide lessons and school activities; record attendance; contact parents and authorised adults; manage fees and records; make reasonable adjustments; respond to complaints; keep children safe; and comply with tax, accounting and other legal obligations.",
          },
          {
            type: "paragraph",
            text: "For adults arranging paid lessons, we normally rely on taking steps before entering into a contract and performing that contract. We generally use limited information about a child on the basis of our legitimate interests in providing the service requested by their parent or authorised adult, while taking particular care with the child's rights and best interests.",
          },
          {
            type: "paragraph",
            text: "We rely on legal obligation where records must be kept or information must be shared by law. We rely on consent for optional promotional photographs, videos or testimonials and for any non-essential website technology that requires consent.",
          },
          {
            type: "paragraph",
            text: "The school asks for separate yes-or-no choices before using an identifiable child's photograph, video, work or testimonial: one choice covers the school website and ordinary posts on the school's public social-media pages, and another covers paid advertising or wider promotional campaigns. Any materially different use, including a new form of printed promotion, is explained before permission is requested. Refusing permission does not affect enrolment. Permission can be withdrawn for future use at any time by contacting the school.",
          },
        ],
      },
      {
        id: "sensitive-information",
        title: "4. Health, additional needs and safeguarding information",
        blocks: [
          {
            type: "paragraph",
            text: "Health, disability and other special-category information receives additional protection. We ask families to provide only information that is relevant to safe participation, support or a requested adjustment. For routine medical, allergy, disability and learning-support information, the school records a separate statement of explicit consent on the detailed admission form, alongside the ordinary lawful basis used to provide the requested service. Depending on the pupil's age and understanding, that permission is obtained from the pupil or a person with parental responsibility.",
          },
          {
            type: "paragraph",
            text: "Where information must be used or shared to protect a child or another person, the school may instead rely on a condition permitted by law, including safeguarding children and individuals at risk, legal claims or vital interests in a genuine emergency. The applicable lawful basis and special-category condition are documented before the information is used. We do not ask families to put medical or safeguarding details into the initial website enquiry form.",
          },
        ],
      },
      {
        id: "sharing-information",
        title: "5. Who we share information with",
        blocks: [
          {
            type: "paragraph",
            text: "Information is available only to people who reasonably need it for their role. Elena Vlasenko and authorised administrative staff manage school records. The main teacher at each school holds the relevant printed admission forms. Other self-employed teachers receive only the emergency-contact and medical information needed to look after the children they teach.",
          },
          {
            type: "paragraph",
            text: "The short website registration or enquiry may be stored in Supabase when that service is enabled. The detailed admission form is completed on paper and brought to the school. We also use a school Gmail account and may communicate individually by email, telephone, SMS, WhatsApp or private messages from the school's Facebook Page. We do not use parent or pupil WhatsApp groups.",
          },
          {
            type: "paragraph",
            text: "We may also use website hosting, secure storage, accounting and professional-service providers. Those providers receive only the information needed for their role and process it under their own terms or our instructions, as applicable.",
          },
          {
            type: "paragraph",
            text: "We may share information with a local authority, safeguarding partner, police, emergency service, insurer, accountant, professional adviser, regulator or other authority where this is necessary to protect someone, handle a claim or comply with the law.",
          },
          {
            type: "paragraph",
            text: `Some providers may process information outside the United Kingdom. Where data-protection law restricts a transfer, we use an applicable adequacy regulation, contractual safeguard or other lawful transfer mechanism. Contact us at ${schoolEmail} to ask which safeguard applies or to request further information or a copy where available.`,
          },
        ],
      },
      {
        id: "retention-and-security",
        title: "6. Retention and security",
        blocks: [
          {
            type: "paragraph",
            text: "Unsuccessful enquiries and incomplete registrations are normally kept for no more than 12 months after the last contact. Pupil, parent, attendance and course-administration records are normally kept while the pupil attends and for up to two years after their final lesson.",
          },
          {
            type: "paragraph",
            text: "Invoices and payment records are normally kept for six years after the end of the relevant tax year. Consent records may be kept for as long as we rely on the consent and for up to two years afterwards. A record may be retained longer where required for safeguarding, a complaint, a dispute, fraud prevention, a legal claim or another legal obligation.",
          },
          {
            type: "paragraph",
            text: "Unpublished or unused photographs and recordings are normally kept for no more than two years. Material already published with valid permission may remain available while it is lawfully in use. If permission is withdrawn, we stop new use and, where reasonably practical, remove the child from website pages and social-media posts that the school controls.",
          },
          {
            type: "paragraph",
            text: "Because the school has operated since 2009, some older records may pre-date the retention periods above. We review historical material and securely destroy information that is no longer needed, while retaining records required for financial, safeguarding, dispute or specifically approved historical purposes.",
          },
          {
            type: "paragraph",
            text: "Paper admission forms are kept locked. Electronic records are limited to authorised accounts and school-controlled storage. We use proportionate organisational and technical measures intended to protect information from unauthorised access, loss, alteration or disclosure, although no system can be guaranteed to be completely secure.",
          },
        ],
      },
      {
        id: "cookies",
        title: "7. Cookies and website technology",
        blocks: [
          {
            type: "paragraph",
            text: "The current website does not intentionally use optional analytics or advertising cookies. Essential hosting, security or form technology may process limited technical information where this is necessary to deliver and protect the website.",
          },
          {
            type: "paragraph",
            text: "The school expects to introduce Google Analytics and may use Google Ads conversion measurement in future. These services will not be activated until suitable consent controls are in place. Analytics and advertising will be offered as separate choices, optional tags will not load before the relevant consent, and no choice will be preselected. Google Signals will remain off initially, and family registration details will not be used for Customer Match or enhanced conversions.",
          },
          {
            type: "paragraph",
            text: "The school does not use the Meta Pixel. If another optional analytics, advertising or non-essential technology is introduced, this notice and the consent controls will be updated before it is activated. Following a link to Facebook or another external website means that organisation processes information under its own privacy terms.",
          },
          {
            type: "paragraph",
            text: "When optional website technology is introduced, this section and the consent controls will identify the relevant provider, purpose and duration of each cookie or similar technology. The school will review the live website before activating those services and whenever the technology changes.",
          },
        ],
      },
      {
        id: "rights-and-complaints",
        title: "8. Your rights and complaints",
        blocks: [
          {
            type: "paragraph",
            text: "Depending on the purpose and circumstances, you may have rights to be informed, obtain access, correct inaccurate information, request erasure or restriction, receive certain information in a portable form and withdraw consent. These rights are not absolute in every case.",
          },
          {
            type: "paragraph",
            text: "You have the right to object where we rely on legitimate interests to use personal information. If you object, we will stop that use unless we can demonstrate compelling legitimate grounds to continue or the information is needed for legal claims.",
          },
          {
            type: "paragraph",
            text: `To exercise a right or raise a privacy concern, email ${schoolEmail}. We may ask for information needed to confirm your identity or authority and will normally respond within one calendar month, subject to any lawful extension or exemption.`,
          },
          {
            type: "links",
            items: [
              {
                label: "Make a complaint to the Information Commissioner's Office",
                href: "https://ico.org.uk/make-a-complaint/",
                description:
                  "You can contact the ICO directly, although we would appreciate the opportunity to address your concern first.",
              },
            ],
          },
        ],
      },
      {
        id: "changes",
        title: "9. Changes to this notice",
        blocks: [
          {
            type: "paragraph",
            text: "We review this notice when our services, systems, providers or legal responsibilities change. The current version and its last-updated date will remain available on this page.",
          },
        ],
      },
    ],
  },
  {
    slug: "safeguarding-and-child-protection",
    title: "Safeguarding and Child Protection Policy",
    shortTitle: "Safeguarding",
    description:
      "How the school protects children, maintains professional boundaries and responds to concerns in its weekend schools.",
    summary:
      "This policy explains the safeguarding arrangements used across the Bracknell and Exeter schools, including supervision, staff suitability, reporting and external escalation.",
    owner: "Elena Vlasenko, Headteacher and Designated Safeguarding Lead",
    version: "1.0",
    lastUpdated: "2 September 2026",
    lastUpdatedIso: "2026-09-02",
    nextReview: "September 2027, and after any material incident or guidance change",
    sections: [
      {
        id: "purpose-and-scope",
        title: "1. Purpose and scope",
        blocks: [
          {
            type: "paragraph",
            text: "Pushkin's School is committed to providing an environment in which children are treated with respect, listened to and protected from harm. The child's welfare is the first consideration in every safeguarding decision.",
          },
          {
            type: "paragraph",
            text: "This policy applies to Elena Vlasenko, teachers, contractors, volunteers and anyone acting on behalf of the school during its in-person lessons, communications, celebrations and other school-organised activity in Bracknell and Exeter. Pushkin's School does not provide online lessons.",
          },
        ],
      },
      {
        id: "report-a-concern",
        title: "2. If you are worried about a child",
        emphasis: true,
        blocks: [
          {
            type: "paragraph",
            text: `The school's designated safeguarding lead is Elena Vlasenko. Call ${schoolPhone} or email ${schoolEmail} using the subject line \"Private safeguarding concern\". Do not include more sensitive information than is necessary in an ordinary email. Elena is contactable throughout Bracknell and Exeter sessions.`,
          },
          {
            type: "paragraph",
            text: "If a child is in immediate danger or a crime is taking place, call 999. You do not need the school's permission to contact the police, children's social care or another safeguarding authority.",
          },
          {
            type: "paragraph",
            text: "A concern involving Elena Vlasenko should be reported directly to the appropriate local authority, Local Authority Designated Officer or police rather than being sent to the school email address.",
          },
          {
            type: "paragraph",
            text: "Because lessons take place at weekends, an urgent concern that cannot safely wait until the next working day should be reported to the appropriate out-of-hours service: Bracknell Forest Emergency Duty Service on 01344 351999 or Devon Emergency Duty Service on 0345 600 0388. Call 999 where a child is in immediate danger.",
          },
          {
            type: "links",
            items: [
              {
                label: "Bracknell Forest MASH",
                href: "https://www.bracknell-forest.gov.uk/health-and-social-care/keeping-adults-and-children-safe/protecting-children/report-child-abuse-or-concern-mash",
                description: "Children's safeguarding concerns in Bracknell Forest: 01344 352005.",
              },
              {
                label: "Devon MASH",
                href: "https://www.devon.gov.uk/support-schools-settings/safeguarding/concerned-about-a-child/",
                description: "Children's safeguarding concerns in Devon: 0345 155 1071.",
              },
              {
                label: "Bracknell Forest LADO",
                href: "https://www.bracknell-forest.gov.uk/health-and-social-care/keeping-adults-and-children-safe/protecting-children/allegations-against-staff-carers-and-volunteers",
                description: "Concerns about an adult working with children in Bracknell Forest: 01344 351572.",
              },
              {
                label: "Devon LADO",
                href: "https://www.devon.gov.uk/children-families-education/childrens-social-care/child-protection/managing-allegations-against-adults-working-with-children/",
                description: "The official route for concerns about an adult working with children in Devon.",
              },
            ],
          },
        ],
      },
      {
        id: "responsibilities",
        title: "3. Safeguarding responsibilities",
        blocks: [
          {
            type: "paragraph",
            text: "Elena Vlasenko is the designated safeguarding lead for both schools. The main teacher at each location acts as the on-site safeguarding contact and reports every concern to Elena. If waiting would place a child at risk or Elena cannot be reached, the on-site contact may seek advice or make a referral directly.",
          },
          {
            type: "paragraph",
            text: "Anton Vlasenko provides limited administrative support for safeguarding records under Elena's direction. He does not make safeguarding decisions or act as a deputy designated safeguarding lead.",
          },
          {
            type: "list",
            items: [
              "All adults working with children must act in the child's best interests and report concerns without unnecessary delay.",
              "Safeguarding concerns must be recorded factually, dated and stored securely.",
              "No adult should promise a child that safeguarding information will remain secret.",
              "A safeguarding concern must not be delayed while an ordinary complaint is being considered.",
              "Every adult may contact children's social care or the police directly where urgent action is needed.",
            ],
          },
        ],
      },
      {
        id: "suitable-people",
        title: "4. Safer recruitment and suitable people",
        blocks: [
          {
            type: "paragraph",
            text: "Before an adult is permitted to work with children, the school checks identity, right to work, references, relevant qualifications or experience, suitability, an Enhanced DBS certificate and the Children's Barred List where the role is eligible. An overseas criminal-record check is sought where relevant. A DBS check is not used as the only assessment of suitability.",
          },
          {
            type: "paragraph",
            text: "Teachers complete appropriate safeguarding and child-protection training before working unsupervised and refresh it annually. Training dates and evidence are recorded. Elena undertakes training specific to the designated safeguarding lead role. Suitability and DBS status are kept under review, and the school obtains an updated check where appropriate rather than relying on one certificate indefinitely.",
          },
          {
            type: "paragraph",
            text: "All teachers currently work as self-employed contractors. This does not reduce the conduct, reporting, training or suitability requirements that apply while they work on behalf of the school. The school follows the legal referral duties that apply to regulated activity.",
          },
        ],
      },
      {
        id: "conduct-and-boundaries",
        title: "5. Conduct and professional boundaries",
        blocks: [
          {
            type: "paragraph",
            text: "Teachers, contractors and volunteers must communicate respectfully, use school-approved arrangements, protect confidential information and avoid favouritism, humiliating language, threats, harassment, discrimination and inappropriate physical or emotional relationships.",
          },
          {
            type: "list",
            items: [
              "Private social-media contact with a child is not permitted.",
              "Private phone, text or messaging contact with a child is not permitted; routine communication is directed through their parent or carer.",
              "Teachers must not arrange to meet pupils outside school activity or connect through personal social-media accounts.",
              "Teachers must not work alone with a child in a closed room. Individual support must remain observable, with doors open and other adults nearby.",
              "Teachers must not use personal devices to photograph or record pupils except for the single designated-device arrangement described below.",
              "Adults must report accidental boundary breaches, low-level concerns and concerns about another adult.",
              "No adult should investigate a safeguarding allegation themselves or ask a child leading or repeated questions.",
            ],
          },
        ],
      },
      {
        id: "attendance-and-collection",
        title: "6. Attendance, supervision and collection",
        blocks: [
          {
            type: "paragraph",
            text: "The school keeps an attendance register and uses agreed arrival, absence and collection arrangements. Parents and carers must provide accurate contact details, notify absence and arrange collection by a named authorised adult. A different collector may be authorised by telephone or message on the day after the school verifies the instruction.",
          },
          {
            type: "paragraph",
            text: "A pupil in Year 7 or above may leave independently only where the school has received written parental permission and agrees that the arrangement is appropriate for the pupil and journey. Younger pupils must be collected by an authorised adult.",
          },
          {
            type: "paragraph",
            text: "Children remain supervised during school-led activity. If a child is uncollected, the school contacts the parent or carer promptly, tries the emergency contacts after 30 minutes and seeks advice from children's social care or the police if nobody can be reached and the child remains uncollected after one hour. The child is never left alone; two adults remain where reasonably possible. Repeated lateness is recorded and discussed with the parent.",
          },
          {
            type: "paragraph",
            text: "If a child is missing, staff immediately alert the designated safeguarding lead or main teacher, check inside and outside the venue without leaving other children unsupervised, and contact the parent or carer. If the missing child is aged five or under, staff contact the police immediately. For an older child, staff contact the police immediately whenever the child's vulnerability or the circumstances indicate a risk of harm; otherwise they follow the school's missing-child procedure and agree the next action with the parent or carer without unnecessary delay.",
          },
          {
            type: "paragraph",
            text: "Bullying, harmful behaviour and serious disruption are addressed promptly. A pupil temporarily removed from class remains supervised by another teacher, and Elena contacts the parent where a situation requires further resolution.",
          },
        ],
      },
      {
        id: "health-and-access",
        title: "7. Health, first aid and additional needs",
        blocks: [
          {
            type: "paragraph",
            text: "Parents should tell the school, through the approved registration route, about relevant allergies, medical needs, disabilities, learning-support needs or other information needed for safe participation. The school will discuss reasonable adjustments and whether the setting can meet the child's needs safely.",
          },
          {
            type: "paragraph",
            text: "The school accepts children from age three. Children aged five and under receive appropriately close supervision. Each session must have a named, suitably trained first aider with a current certificate, and both the school and venue provide access to first-aid equipment. Elena is the named first aider in Exeter; the teacher holding first-aid responsibility in Bracknell is named in the branch's internal arrangements before each session.",
          },
          {
            type: "paragraph",
            text: "Medication is administered only under written parental instructions by an agreed adult with appropriate training. Emergency medication such as an inhaler or adrenaline auto-injector remains readily accessible under the agreed arrangement. First aid and medical incidents are recorded and communicated to the parent or carer.",
          },
          {
            type: "paragraph",
            text: "Routine toileting support is limited to verbal prompting. If a child requires physical assistance, the school discusses their needs with the parent and agrees an individual personal-care arrangement before providing it.",
          },
          {
            type: "paragraph",
            text: "The school maintains accident, emergency and venue-specific safety arrangements. In an emergency, staff may contact emergency services before the parent, carer or emergency contact. Internal risk assessments and evacuation procedures are working documents and are available on request rather than published on the website.",
          },
        ],
      },
      {
        id: "images-and-communication",
        title: "8. Photography, recordings and online communication",
        blocks: [
          {
            type: "paragraph",
            text: "The school obtains a separate choice before using an identifiable child's photograph, video, work or testimonial for the public website, social media or other promotion. Refusing promotional permission does not prevent a child from attending lessons.",
          },
          {
            type: "paragraph",
            text: "Only a designated teacher's device may be used for approved school photography. Images are transferred promptly to school-controlled storage and deleted from the device immediately after transfer. Parents, pupils and visitors must not publish identifiable images or recordings of other children without appropriate permission.",
          },
          {
            type: "paragraph",
            text: "If the school or a venue makes internet-connected devices or connectivity available to pupils, access is subject to appropriate supervision, acceptable-use rules, filtering and monitoring arrangements. The school will not introduce pupil access without those arrangements. Staff remain alert to harmful online content, contact, conduct and commercial exploitation even though Pushkin's School does not provide online lessons.",
          },
        ],
      },
      {
        id: "recognising-concerns",
        title: "9. Recognising and reporting concerns",
        blocks: [
          {
            type: "paragraph",
            text: "A concern may arise from something a child says, an injury or change in behaviour, neglect, bullying or child-on-child abuse, sexualised behaviour, exploitation, domestic abuse, self-harm, extremism, harmful online contact or concern about an adult working with children.",
          },
          {
            type: "paragraph",
            text: "A person receiving a disclosure should listen calmly, take the child seriously, avoid leading questions, explain that information may need to be shared, record the child's words as accurately as possible and report the matter promptly. They must not confront the person alleged to be responsible or conduct their own investigation.",
          },
        ],
      },
      {
        id: "information-sharing",
        title: "10. Confidentiality, records and information sharing",
        blocks: [
          {
            type: "paragraph",
            text: "Safeguarding information is confidential but cannot always remain private. It is shared only with people or authorities who need it to protect a child, assess a concern, investigate an allegation or comply with the law.",
          },
          {
            type: "paragraph",
            text: "Where it is safe and appropriate, the school will normally explain to a parent what will be shared. Information may be shared without consent where seeking consent could increase risk, prejudice an investigation or cause harmful delay.",
          },
          {
            type: "paragraph",
            text: "Safeguarding records are kept separately from ordinary pupil records with access restricted to Elena Vlasenko and, for secure administration under her direction, Anton Vlasenko. Information is shared with a main teacher or external authority only where needed to protect a child or manage a concern.",
          },
        ],
      },
      {
        id: "concerns-about-adults",
        title: "11. Concerns or allegations about an adult",
        blocks: [
          {
            type: "paragraph",
            text: "A concern that an adult working with the school has harmed or may have harmed a child, committed a relevant offence, behaved in a way that indicates a risk of harm, or behaved in a way that may make them unsuitable to work with children must be reported immediately.",
          },
          {
            type: "paragraph",
            text: "The school may restrict the adult's access to children and information while advice is obtained. Where appropriate, the matter will be referred to the relevant Local Authority Designated Officer, children's social care, police or Disclosure and Barring Service. The school will not begin an internal investigation where doing so could interfere with an external process.",
          },
          {
            type: "paragraph",
            text: "Low-level concerns about an adult must also be reported to Elena and recorded. If a concern involves Elena, it should be taken directly to the relevant LADO, children's social care or police using the contacts above.",
          },
          {
            type: "paragraph",
            text: "A teacher, contractor or other adult who believes that a safeguarding concern is not being handled appropriately, or who feels unable to raise it within the school, may contact the NSPCC Whistleblowing Advice Line on 0800 028 0285, the relevant LADO, children's social care or the police. This route does not delay immediate action where a child may be at risk.",
          },
          {
            type: "links",
            items: [
              {
                label: "NSPCC Whistleblowing Advice Line",
                href: "https://www.nspcc.org.uk/keeping-children-safe/reporting-abuse/dedicated-helplines/whistleblowing-advice-line/",
                description:
                  "Independent advice for people concerned about how child-protection issues are being handled in an organisation.",
              },
            ],
          },
        ],
      },
      {
        id: "complaints-and-review",
        title: "12. Complaints, concerns and review",
        blocks: [
          {
            type: "paragraph",
            text: `A parent or pupil may raise a safeguarding concern using ${schoolEmail}. A safeguarding matter is assessed promptly and is not subject to the ordinary complaints timetable. Anyone may contact an external safeguarding authority directly.`,
          },
          {
            type: "paragraph",
            text: "This policy is reviewed at least annually and sooner after a material incident, a change in the school or venue arrangements, or a change in relevant law or guidance.",
          },
          {
            type: "links",
            items: [
              {
                label: "DfE safeguarding guidance for out-of-school settings",
                href: "https://www.gov.uk/government/publications/keeping-children-safe-in-out-of-school-settings-code-of-practice",
                description:
                  "The national guidance used as the main reference for supplementary schools, tuition and other out-of-school settings in England.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "parent-terms-and-complaints",
    title: "Parent Terms, Fees, Cancellations and Complaints",
    shortTitle: "Terms & complaints",
    description:
      "The practical agreement for joining, paying for and attending lessons, including cancellations, refunds and complaints.",
    summary:
      "These terms explain the shared responsibilities of the school and the adult arranging lessons for a child. Branch-specific fees and dates are confirmed in writing before payment.",
    owner: "Elena Vlasenko, Proprietor",
    version: "1.0",
    lastUpdated: "2 September 2026",
    lastUpdatedIso: "2026-09-02",
    nextReview: "September 2027, or sooner if fees or enrolment arrangements change",
    sections: [
      {
        id: "about-these-terms",
        title: "1. About us and these terms",
        blocks: [
          {
            type: "paragraph",
            text: "Pushkin's School of Russian Language and Literature is operated by Elena Vlasenko as a sole trader. These terms apply to weekend lessons and related school activities provided through the Bracknell and Exeter schools.",
          },
          {
            type: "paragraph",
            text: `The adult who registers a child or agrees to pay for lessons is the customer. Contact Elena Vlasenko at ${schoolEmail} or ${schoolPhone}. The business and correspondence address is ${businessAddress}.`,
          },
          {
            type: "paragraph",
            text: "These terms form part of the agreement between the school and the customer, together with the branch, timetable, fee and payment information supplied in writing before enrolment. Nothing in these terms limits a consumer's statutory rights.",
          },
          {
            type: "paragraph",
            text: "Before a parent becomes bound or pays, the school supplies its identity and contact details, the agreed branch and lesson arrangements, the total price and payment terms, the contract duration, cancellation information and complaints route by email, paper copy or another format the parent can keep for future reference.",
          },
        ],
      },
      {
        id: "enquiries-and-registration",
        title: "2. Enquiries, introductory lessons and registration",
        blocks: [
          {
            type: "paragraph",
            text: "An initial enquiry does not reserve a place. The school will discuss the child's age, current Russian experience, preferred location and any information needed to consider an appropriate class.",
          },
          {
            type: "paragraph",
            text: "New pupils normally begin with three introductory weekend sessions, paid before the first session. For the 2026–2027 academic year, the introductory payment is £105 in Bracknell and £90 in Exeter. The dates and price are confirmed in writing before payment.",
          },
          {
            type: "paragraph",
            text: "A place is contractually confirmed only when the school has accepted the registration, the parent has confirmed acceptance of the supplied information and the required payment has been received. The school then sends written confirmation that the parent can retain before the first session. The school may decline or defer a place where a suitable class is unavailable or, after considering reasonable adjustments, the child's needs cannot safely be met in the proposed arrangement.",
          },
          {
            type: "paragraph",
            text: "After the introductory sessions, the pupil will normally retain their place and continue for the remainder of the term. The school confirms the remaining dates, tuition fee and book fee in writing. The parent becomes committed to the remainder of the term only when they accept that information and make the required payment.",
          },
        ],
      },
      {
        id: "fees-and-payment",
        title: "3. Fees and payment",
        blocks: [
          {
            type: "paragraph",
            text: "Fees are paid termly unless the school agrees another arrangement in writing. For the 2026–2027 academic year, Bracknell sessions are £35 for one child and £33 for each additional sibling. Exeter sessions are £30 for one child and £27 for each additional sibling. A pupil joining after a term has begun pays only for the remaining scheduled sessions from the agreed start date.",
          },
          {
            type: "paragraph",
            text: "The school confirms the applicable dates, number of sessions, tuition total, sibling rate, payment deadline and any class-specific book fee in writing before payment. Tuition is due before the first lesson of the term or, where the term has already started, before the pupil's next scheduled lesson.",
          },
          {
            type: "paragraph",
            text: "Books are charged separately, normally once per academic year, and the price depends on the pupil's class. The amount is confirmed before the parent commits to it. A replacement or additional book may be charged separately only after the parent has been told the price.",
          },
          {
            type: "paragraph",
            text: "Payment is accepted by bank transfer or cash. Families should use only the payment instructions supplied directly by the school; bank details are not published on this website. Payments are recorded by the school, and a cash payment is acknowledged in writing or by email. A pupil's place may be released if an amount remains unpaid after reasonable notice, unless another arrangement has been agreed.",
          },
        ],
      },
      {
        id: "cancellation-rights",
        title: "4. Statutory cancellation rights",
        blocks: [
          {
            type: "paragraph",
            text: "Where a consumer enters into a contract at a distance, for example by email, telephone or online, a statutory cancellation right may apply. If it applies, the usual cancellation period ends 14 calendar days after the contract is made. The school supplies the applicable cancellation information with the enrolment confirmation.",
          },
          {
            type: "paragraph",
            text: `To cancel, the customer must make a clear statement by emailing ${schoolEmail}. The model form below may be used but is not compulsory. Where a parent wants introductory lessons to begin during an applicable cancellation period, the school asks them to expressly request the early start and records that request before the first session. If the parent then cancels within that period, the school may charge only the proportionate price of sessions already provided and refunds the unused balance without undue delay, and no later than 14 days after the school is informed of the decision to cancel. The refund is made using the original payment method unless the parent expressly agrees otherwise, without a refund fee.`,
          },
          {
            type: "paragraph",
            text: "Some contracts or services can be subject to exceptions. These terms do not replace or restrict any statutory right that applies to the particular booking.",
          },
          {
            type: "subheading",
            text: "Model cancellation form",
          },
          {
            type: "paragraph",
            text: `Copy and send the information below to ${schoolEmail}, or send another clear statement that you wish to cancel.`,
          },
          {
            type: "list",
            items: [
              `To: Elena Vlasenko, Pushkin's School of Russian Language and Literature, ${businessAddress}, ${schoolEmail}.`,
              "I/We hereby give notice that I/we cancel my/our contract for the provision of the following lessons or service:",
              "Child's name and school branch:",
              "Date the contract was entered into:",
              "Name and address of customer:",
              "Date of cancellation:",
              "Signature of customer, only if this form is sent on paper:",
            ],
          },
        ],
      },
      {
        id: "family-absence",
        title: "5. Absence and missed lessons",
        blocks: [
          {
            type: "paragraph",
            text: "Parents should notify the school as soon as possible when a child will be absent. Unless the written fee information for the relevant term says otherwise, a missed group lesson is not refunded or transferred because the place, teacher and venue have already been reserved.",
          },
          {
            type: "paragraph",
            text: "The school may consider exceptional circumstances individually, but this does not create an automatic entitlement to a credit, replacement lesson or refund. A pupil must not attend when doing so would create an unreasonable health or safety risk to others.",
          },
        ],
      },
      {
        id: "school-cancellation",
        title: "6. Cancellation or change by the school",
        blocks: [
          {
            type: "paragraph",
            text: "The school may need to change a teacher, room or reasonable part of the timetable. Because the schools hire their venues at fixed weekly times, a cancelled session cannot normally be rearranged. Its value is credited against the next invoice or refunded if the pupil is not continuing or no further invoice will be issued.",
          },
          {
            type: "paragraph",
            text: "Severe weather, venue closure and other events outside the school's reasonable control are handled in the same way: the school communicates as soon as reasonably possible and credits the cancelled session, or refunds it where no further invoice will be issued.",
          },
        ],
      },
      {
        id: "withdrawal",
        title: "7. Leaving the school",
        blocks: [
          {
            type: "paragraph",
            text: `A parent wishing to leave should notify the school in writing at ${schoolEmail}. After any applicable statutory cancellation period, the school may retain payment for lessons already provided and a reasonable amount reflecting genuine, unavoidable loss caused by the cancellation. It takes account of costs saved and whether the place can reasonably be offered to another pupil.`,
          },
          {
            type: "paragraph",
            text: "Long-term illness, bereavement, an unavoidable family move and other exceptional circumstances are considered individually. Any calculation is explained to the parent and does not limit their statutory rights. Fees for future lessons that the school will not provide are refunded.",
          },
        ],
      },
      {
        id: "attendance-and-conduct",
        title: "8. Attendance, collection and conduct",
        blocks: [
          {
            type: "paragraph",
            text: "Parents are responsible for bringing and collecting children at the agreed times, keeping contact and authorised-collection details current, notifying absence and providing relevant information needed for safe participation.",
          },
          {
            type: "paragraph",
            text: "Pupils, parents and visitors must treat others respectfully, follow reasonable safety and venue instructions, protect other families' privacy and avoid behaviour that disrupts learning or places another person at risk.",
          },
          {
            type: "paragraph",
            text: "The school will normally discuss a concern and seek a proportionate solution. It may suspend or end attendance where this is reasonably necessary for safety, welfare, serious or repeated misconduct, or where agreed arrangements are persistently not followed. If the school ends attendance, fees for all undelivered future lessons are refunded, less only any reasonable loss the school can lawfully justify.",
          },
        ],
      },
      {
        id: "health-and-adjustments",
        title: "9. Health information and reasonable adjustments",
        blocks: [
          {
            type: "paragraph",
            text: "Parents should use the approved registration process to tell the school about relevant allergies, medical needs, disabilities or learning-support needs. The school will consider reasonable adjustments and discuss what can be provided safely in the relevant venue and class.",
          },
          {
            type: "paragraph",
            text: "The school provides education rather than medical care. Parents remain responsible for supplying accurate information, agreed medication and any specialist support that the school has not expressly agreed to provide.",
          },
        ],
      },
      {
        id: "privacy-and-images",
        title: "10. Privacy, photographs and school material",
        blocks: [
          {
            type: "paragraph",
            text: "Personal information is handled under the Privacy and Cookies Notice. Promotional photography and recording require separate choices for the uses described there; refusing those choices does not prevent a child from attending lessons.",
          },
          {
            type: "paragraph",
            text: "Families must not publish identifiable photographs or recordings of other children without appropriate permission. School learning materials may be used by the pupil for their own learning but must not be copied, sold or republished where copyright or another person's privacy would be affected.",
          },
          {
            type: "links",
            items: [
              {
                label: "Read the Privacy and Cookies Notice",
                href: "/policies/privacy-and-cookies",
              },
              {
                label: "Read the Safeguarding and Child Protection Policy",
                href: "/policies/safeguarding-and-child-protection",
              },
            ],
          },
        ],
      },
      {
        id: "complaints",
        title: "11. Complaints",
        blocks: [
          {
            type: "paragraph",
            text: `A parent, authorised adult or pupil may raise a concern in their own words by emailing ${schoolEmail} or calling ${schoolPhone}. Please explain what happened, when it happened, who was involved and what outcome you would like the school to consider. A child may ask a trusted adult to help them but does not have to use formal language.`,
          },
          {
            type: "paragraph",
            text: "We will acknowledge an ordinary complaint within five working days and aim to provide a substantive response within 14 calendar days. If more time is reasonably needed, we will explain why and provide an updated timescale.",
          },
          {
            type: "paragraph",
            text: "Elena provides the school's final response because the school has no governing body or separate internal appeal stage and is not a member of an alternative dispute-resolution scheme. If a consumer complaint remains unresolved, the final response will state that the school has been unable to settle it, identify a competent alternative dispute-resolution provider and say whether the school is required or prepared to use that provider. This does not prevent a customer from seeking independent consumer advice or using any external legal remedy available to them.",
          },
          {
            type: "paragraph",
            text: "A safeguarding concern is assessed promptly and is not delayed by this complaints timetable. A complaint involving Elena Vlasenko may be raised directly with an appropriate external authority where relevant, including the local authority safeguarding service, police or Information Commissioner's Office depending on the subject.",
          },
        ],
      },
      {
        id: "changes-and-law",
        title: "12. Changes and applicable law",
        blocks: [
          {
            type: "paragraph",
            text: "We may update these terms for a future term where fees, services, venues, procedures or legal requirements change. A change will not retrospectively remove rights that have already arisen. Material changes affecting an existing booking will be communicated directly.",
          },
          {
            type: "paragraph",
            text: "These terms are governed by the law of England and Wales. A consumer retains any right to bring a claim in another part of the United Kingdom where consumer law permits it.",
          },
        ],
      },
    ],
  },
];

export function getPolicyBySlug(slug: string) {
  return policies.find((policy) => policy.slug === slug);
}
