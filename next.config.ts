import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/register/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
  async redirects() {
    const legacyPolicyRedirects = [
      ["safeguarding-policy", "safeguarding-policy"],
      ["health-and-safety", "health-and-safety-policy"],
      ["health-and-safety-policy", "health-and-safety-policy"],
      ["gdpr-and-data-protection-policy", "gdpr-and-data-protection-policy"],
      [
        "special-educational-needs-sen-polic",
        "special-educational-needs-sen-policy",
      ],
      [
        "special-educational-needs-sen-policy",
        "special-educational-needs-sen-policy",
      ],
      [
        "fire-safety-and-emergency-evacuation",
        "fire-safety-and-emergency-evacuation-policy",
      ],
      [
        "fire-safety-and-emergency-evacuation-policy",
        "fire-safety-and-emergency-evacuation-policy",
      ],
      ["prevent-duty-policy-statement", "prevent-duty-policy-statement"],
      ["allegations-against-staff", "allegations-against-staff-policy"],
      ["allegations-against-staff-policy", "allegations-against-staff-policy"],
      [
        "safer-recruitment-and-selection",
        "safer-recruitment-and-selection-policy",
      ],
      [
        "safer-recruitment-and-selection-policy",
        "safer-recruitment-and-selection-policy",
      ],
      ["pupil-and-parent-code-of-conduct", "pupil-and-parent-code-of-conduct"],
      ["pupil-and-parent-privacy-notice", "pupil-and-parent-privacy-notice"],
      ["complaints-procedure", "complaints-procedure"],
      ["staff-code-of-conduct", "staff-code-of-conduct"],
      ["staff-privacy-notice", "staff-privacy-notice"],
      ["staff-grievance-procedure", "staff-grievance-procedure"],
      ["whistleblowing-policy", "whistleblowing-policy"],
    ].map(([source, destination]) => ({
      source: `/${source}`,
      destination: `/policies/${destination}`,
      permanent: true,
    }));

    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/our-schools",
        destination: "/schools",
        permanent: true,
      },
      {
        source: "/high-wycombe",
        destination: "/schools/high-wycombe",
        permanent: true,
      },
      {
        source: "/hemel-hempstead",
        destination: "/schools/hemel-hempstead",
        permanent: true,
      },
      {
        source: "/bracknell",
        destination: "/schools/bracknell",
        permanent: true,
      },
      {
        source: "/chelmsford",
        destination: "/schools/chelmsford",
        permanent: true,
      },
      {
        source: "/southend-on-sea",
        destination: "/schools/southend-on-sea",
        permanent: true,
      },
      ...legacyPolicyRedirects,
      ...["2019", "2018", "2015", "2014", "2013", "2012"].map((year) => ({
        source: `/${year}`,
        destination: "/gallery",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
