const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://proofperimeter.com";

export const siteConfig = {
  name: "Proof Perimeter",
  tagline: "Frontier AI for regulated document processing",
  description:
    "Proof Perimeter is a document AI platform for regulated, high-risk documents — KYC packets, claims files, letters of credit, loan applications, and policies. Start free with your own model key, or go Enterprise for a fine-tuned Document AI model with zero-egress deployment, SSO, RBAC, and maker-checker controls.",
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image`,
  twitterHandle: "@proofperimeter",
};
