import { ImageResponse } from "next/og";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";
import { brandColors } from "@/lib/colors";

export const alt = "Proof Perimeter Case Study";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug)!;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: brandColors.paper,
          backgroundImage: `radial-gradient(circle, ${brandColors.lineMuted} 2px, transparent 2px)`,
          backgroundSize: "40px 40px",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: brandColors.signal,
          }}
        >
          {caseStudy.company.industry}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            color: brandColors.ink,
            maxWidth: 980,
          }}
        >
          {caseStudy.title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: brandColors.inkMuted,
          }}
        >
          {caseStudy.company.name} · Proof Perimeter
        </div>
      </div>
    ),
    { ...size }
  );
}
