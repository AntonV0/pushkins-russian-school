import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
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
      ...["2019", "2018", "2015", "2014", "2013", "2012"].map((year) => ({
        source: `/${year}`,
        destination: `/gallery/${year}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
