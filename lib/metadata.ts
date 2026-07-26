const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://proofperimeter.com";

export const siteConfig = {
  name: "Proof Perimeter",
  tagline: "Frontier AI for regulated document processing",
  description:
    "Proof Perimeter is a document AI platform for regulated documents — KYC, claims, and lending. Start free with your own model key, or go Enterprise.",
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image`,
  twitterHandle: "@proofperimeter",
};
