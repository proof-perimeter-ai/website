import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-2 py-13">
      <div className="mx-auto max-w-[1120px] px-7">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-[34ch] text-[15px] text-ink-2">
            <BrandMark className="mb-3.5" /> <br></br>
             Frontier AI platform for regulated document processing.
          </div>
          <div className="font-mono text-[12.5px] leading-[1.9] text-ink-2">
            <strong className="text-ink">Regions served</strong>
            <br />
            United Kingdom · Europe · Middle East (KSA/UAE) · India · Singapore
            <br />
            
          </div>
        </div>
        <nav className="mt-8.5 flex flex-wrap gap-6.5 border-t border-line pt-6 text-[14.5px] text-ink-2">
          <Link href="/#regulators" className="hover:text-ink transition-colors">Security &amp; compliance</Link>
          <Link href="/glossary" className="hover:text-ink transition-colors">Glossary</Link>
          <a href="mailto:gaurav@proofperimeter.com" className="hover:text-ink transition-colors">Contact</a>
          <Link href="/terms-of-service" className="hover:text-ink transition-colors">Terms of Service</Link>
          <Link href="/privacy-policy" className="hover:text-ink transition-colors">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
