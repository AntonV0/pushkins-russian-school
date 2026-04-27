export type PolicyGroup = {
  title: string;
  policies: string[];
};

export const policyGroups: PolicyGroup[] = [
  {
    title: "Child Safety and Well-Being",
    policies: [
      "Safeguarding Policy",
      "Health and Safety Policy",
      "GDPR and Data Protection Policy",
      "Special Educational Needs (SEN) Policy",
      "Fire Safety and Emergency Evacuation Policy",
      "Prevent Duty Policy Statement",
      "Allegations Against Staff Policy",
      "Safer Recruitment and Selection Policy",
    ],
  },
  {
    title: "Parent and Carer",
    policies: [
      "Pupil and Parent Code of Conduct",
      "Pupil and Parent Privacy Notice",
      "Complaints Procedure",
    ],
  },
  {
    title: "Staff",
    policies: [
      "Staff Code of Conduct",
      "Staff Privacy Notice",
      "Staff Grievance Procedure",
      "Whistleblowing Policy",
    ],
  },
  {
    title: "Useful Guidance",
    policies: [
      "Keeping Children Safe in Education",
      "EYFS Statutory Framework",
      "Teachers' Standards",
    ],
  },
];
