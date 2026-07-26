import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { LegalSection } from "@/components/LegalSection";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { siteConfig } from "@/lib/metadata";

const LAST_UPDATED = "July 19, 2026";
const CONTACT_EMAIL = "admin@proofperimeter.com";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects information from visitors, demo requesters, and Bring Your Own Key users at proofperimeter.com.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <section className="py-22">
          <div className="mx-auto max-w-[760px] px-7">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="mt-4.5 text-[clamp(30px,4.4vw,44px)] font-bold tracking-[-0.022em] text-ink">
              Privacy Policy
            </h1>
            <p className="mt-3 font-mono text-xs text-ink-2">Last updated: {LAST_UPDATED}</p>
            <p className="mt-7 text-[15.5px] leading-[1.62] text-ink-2">
              This Privacy Policy explains how {siteConfig.name} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo;) collects, uses, and protects information when you visit{" "}
              <span className="text-ink">proofperimeter.com</span> (the &ldquo;Site&rdquo;), request a demo, or start
              a Bring Your Own Key workspace.
            </p>

            <LegalSection title="1. Overview & Scope">
              <p>
                This Policy applies to information collected through the Site, including when you fill out a contact
                or demo-request form, email us, or simply browse the Site. It does not apply to the documents you
                process through the product itself: under Bring Your Own Key, document processing is governed by
                your chosen model provider&rsquo;s (e.g. OpenAI, Anthropic, or Google) own terms and privacy policy,
                not by us; under an Enterprise deployment, document processing is governed by the separate
                commercial and data-processing agreement entered into with that customer — not by this Site Policy.
              </p>
            </LegalSection>

            <LegalSection title="2. Information We Collect">
              <p>We collect information in the following ways:</p>
              <ul>
                <li>
                  <span className="text-ink">Information you provide directly</span> — such as your name, work email,
                  company, and any message details when you request a demo or Enterprise evaluation, or otherwise
                  contact us.
                </li>
                <li>
                  <span className="text-ink">Information collected automatically</span> — such as IP address,
                  browser and device type, pages visited, referring URL, and approximate location, collected via
                  cookies and similar technologies when you browse the Site.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="3. How We Use Information">
              <p>We use the information described above to:</p>
              <ul>
                <li>Respond to demo, Bring Your Own Key, and Enterprise evaluation requests and other inquiries;</li>
                <li>Operate, maintain, and improve the Site;</li>
                <li>Understand aggregate usage of the Site and which content is useful to visitors;</li>
                <li>Communicate with you about {siteConfig.name}, where you have consented to receive such communications; and</li>
                <li>Comply with legal obligations and enforce our Terms of Service.</li>
              </ul>
            </LegalSection>

            <LegalSection title="4. Cookies & Analytics">
              <p>
                The Site uses cookies and similar technologies from the following third-party tools to understand
                Site usage and manage marketing follow-up:
              </p>
              <ul>
                <li><span className="text-ink">Google Analytics</span> — pageview and usage analytics.</li>
              </ul>
              <p>
                These providers may set cookies and collect data about your browsing activity on the Site in
                accordance with their own privacy policies. You can control cookies through your browser settings;
                disabling cookies may affect parts of the Site&rsquo;s functionality.
              </p>
            </LegalSection>

            <LegalSection title="5. How We Share Information">
              <p>
                We do not sell your personal information. We may share information with: service providers who
                process data on our behalf (such as the analytics and CRM tools listed above), professional advisors,
                and authorities where required by law or to protect our legal rights. Any such sharing is limited to
                what is necessary for the relevant purpose.
              </p>
            </LegalSection>

            <LegalSection title="6. Data Retention">
              <p>
                We retain information collected through the Site for as long as needed to respond to your inquiry,
                maintain a record of our engagement with you, and comply with legal, accounting, or reporting
                requirements, after which it is deleted or anonymized.
              </p>
            </LegalSection>

            <LegalSection title="7. Data Security">
              <p>
                We use reasonable administrative, technical, and organizational measures designed to protect
                information collected through the Site against unauthorized access, loss, or misuse. No method of
                transmission or storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </LegalSection>

            <LegalSection title="8. Your Rights">
              <p>
                Depending on where you are located, you may have rights to access, correct, delete, or restrict our
                use of your personal information, or to object to or withdraw consent for certain processing. This
                includes, among others:
              </p>
              <ul>
                <li><span className="text-ink">EU / UK</span> — rights under the GDPR and UK GDPR;</li>
                <li><span className="text-ink">India</span> — rights under the Digital Personal Data Protection Act (DPDP);</li>
                <li>Equivalent rights available under other applicable regional data protection laws.</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                We will respond in accordance with applicable law.
              </p>
            </LegalSection>

            <LegalSection title="9. International Data Transfers">
              <p>
                Because {siteConfig.name} serves customers across the EU, the Gulf, India, and Singapore, information
                collected through the Site may be transferred to, and processed in, countries other than your own.
                Where required, we rely on appropriate safeguards (such as standard contractual clauses) for such
                transfers.
              </p>
            </LegalSection>

            <LegalSection title="10. Children's Privacy">
              <p>
                The Site is intended for business audiences and is not directed at children. We do not knowingly
                collect personal information from children.
              </p>
            </LegalSection>

            <LegalSection title="11. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Material changes will be reflected by updating
                the &ldquo;Last updated&rdquo; date above.
              </p>
            </LegalSection>

            <LegalSection title="12. Contact Us">
              <p>
                For questions about this Privacy Policy or to exercise your privacy rights, contact us at{" "}
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
