import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { LegalSection } from "@/components/LegalSection";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { siteConfig } from "@/lib/metadata";

const LAST_UPDATED = "July 19, 2026";
const CONTACT_EMAIL = "admin@proofperimeter.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The Terms of Service governing use of the ${siteConfig.name} website, demo requests, and Bring Your Own Key or Enterprise evaluation engagements.`,
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfService() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="py-22">
          <div className="mx-auto max-w-[760px] px-7">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-4.5 text-[clamp(30px,4.4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              Terms of Service
            </h1>
            <p className="mt-3 font-mono text-xs text-ink-2">Last updated: {LAST_UPDATED}</p>
            <p className="mt-7 text-[15.5px] leading-[1.62] text-ink-2">
              These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the {siteConfig.name} website at{" "}
              <span className="text-ink">proofperimeter.com</span> (the &ldquo;Site&rdquo;) and any related demo, trial, or
              Enterprise evaluation engagements described on it (together, the &ldquo;Services&rdquo;). By accessing the Site or
              requesting a demo or evaluation, you agree to these Terms. If you do not agree, do not use the Site.
            </p>

            <LegalSection title="1. Acceptance of Terms">
              <p>
                By using the Site, you confirm that you have the authority to bind yourself or the organization you
                represent to these Terms. If you are using the Site on behalf of a company or other legal entity, you
                represent that you have the authority to do so.
              </p>
            </LegalSection>

            <LegalSection title="2. Description of Service">
              <p>
                {siteConfig.name} is a marketing site describing a document AI platform for processing regulated,
                high-risk documents — KYC packets, insurance claims files, letters of credit, loan applications, and
                policies — for BFSI institutions. The Site describes two paths to use the platform: a free Bring
                Your Own Key workspace, and a paid Enterprise license featuring {siteConfig.name}&rsquo;s proprietary
                Document AI model. Enterprise engagements, including deployment, fine-tuning, and integration work,
                are scoped and agreed separately with each prospective customer and are not automatically granted by
                use of the Site itself.
              </p>
            </LegalSection>

            <LegalSection title="3. Eligibility & Account Use">
              <p>
                The Site is intended for business and professional use by individuals acting on behalf of an
                organization evaluating {siteConfig.name}. You agree to provide accurate information when requesting
                a demo or Enterprise evaluation, and to keep any credentials or access we provide to you
                confidential.
              </p>
            </LegalSection>

            <LegalSection title="4. Intellectual Property">
              <p>
                All content on the Site — including text, graphics, illustrations, the {siteConfig.name} name and
                marks, and underlying code — is owned by or licensed to {siteConfig.name} and is protected by
                applicable intellectual property laws. You may view and print Site content for your own internal,
                non-commercial evaluation purposes only. No other use, including reproduction, distribution, or
                creation of derivative works, is permitted without our prior written consent.
              </p>
            </LegalSection>

            <LegalSection title="5. Acceptable Use">
              <p>You agree not to:</p>
              <ul>
                <li>Use the Site in any way that violates applicable law or regulation;</li>
                <li>Attempt to gain unauthorized access to the Site, our systems, or any related infrastructure;</li>
                <li>Interfere with or disrupt the integrity or performance of the Site;</li>
                <li>Use automated means to scrape or extract content from the Site, other than standard search-engine and AI-crawler indexing as permitted by our <span className="text-ink">robots.txt</span>; or</li>
                <li>Misrepresent your identity or affiliation when requesting a demo or Enterprise evaluation.</li>
              </ul>
            </LegalSection>

            <LegalSection title="6. Confidentiality">
              <p>
                If you share documents, data, or other materials with us as part of a demo, Bring Your Own Key
                trial, or Enterprise evaluation (for example, sample documents used to evaluate field-level
                accuracy), we will treat those materials as confidential and use them solely to perform the
                requested evaluation, unless a separate written agreement between us states otherwise. We recommend
                that any sensitive or regulated documents shared for evaluation be de-identified or anonymized
                where practicable, and that a mutual non-disclosure agreement be executed before sharing production
                data.
              </p>
            </LegalSection>

            <LegalSection title="7. Third-Party Links & Services">
              <p>
                The Site may reference or link to third-party services (for example, analytics or scheduling tools).
                We are not responsible for the content, accuracy, or practices of third-party services, and your use
                of them is governed by their own terms.
              </p>
            </LegalSection>

            <LegalSection title="8. Disclaimers">
              <p>
                The Site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
                warranties of any kind, whether express or implied, including warranties of merchantability, fitness
                for a particular purpose, or non-infringement. Statistics, benchmarks, and figures referenced on the
                Site (such as accuracy or token-consumption comparisons) are illustrative, drawn from internal
                benchmarking unless stated otherwise, and are not a guarantee of results for any specific
                organization.
              </p>
            </LegalSection>

            <LegalSection title="9. Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, {siteConfig.name} and its officers, employees, and
                agents will not be liable for any indirect, incidental, special, consequential, or punitive damages
                arising out of or relating to your use of the Site, even if advised of the possibility of such
                damages.
              </p>
            </LegalSection>

            <LegalSection title="10. Governing Law">
              <p>
                These Terms are governed by the laws of the jurisdiction in which {siteConfig.name} is established,
                without regard to conflict-of-laws principles, except where applicable local law requires otherwise.
                Any dispute arising from these Terms will be subject to the exclusive jurisdiction of the competent
                courts of that jurisdiction.
              </p>
            </LegalSection>

            <LegalSection title="11. Changes to These Terms">
              <p>
                We may update these Terms from time to time. Material changes will be reflected by updating the
                &ldquo;Last updated&rdquo; date above. Continued use of the Site after changes take effect constitutes
                acceptance of the revised Terms.
              </p>
            </LegalSection>

            <LegalSection title="12. Contact Us">
              <p>
                Questions about these Terms can be sent to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            </LegalSection>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
