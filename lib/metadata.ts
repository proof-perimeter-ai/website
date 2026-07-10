const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://proofperimeter.com";

export const siteConfig = {
  name: "Proof Perimeter",
  tagline: "On-device document AI that runs where your regulator can see it",
  description:
    "Proof Perimeter runs small, fine-tuned models on your most sensitive financial documents — entirely inside your environment, on commodity CPUs, live in weeks. It proves, document by document, that the inference never left the perimeter.",
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image`,
  twitterHandle: "@proofperimeter",
};
