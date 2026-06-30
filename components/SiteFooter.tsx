import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-2 py-13">
      <div className="mx-auto max-w-[1120px] px-7">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-[34ch] text-[15px] text-ink-2">
            <BrandMark className="mb-3.5" />
            On-device AI for regulated BFSI document processing. The inference never leaves your perimeter.
          </div>
          <div className="font-mono text-[12.5px] leading-[1.9] text-ink-2">
            <strong className="text-ink">Regions served</strong>
            <br />
            United Kingdom · Europe · Middle East (KSA/UAE) · India · Singapore
            <br />
            <br />
            Designed for ISO 42001, SOC 2 and regional supervisory
            <br />
            requirements across UK/EU, the Gulf, India and Singapore.
          </div>
        </div>
        <nav className="mt-8.5 flex flex-wrap gap-6.5 border-t border-line pt-6 text-[14.5px] text-ink-2">
          <Link href="/#how" className="hover:text-ink transition-colors">How it works</Link>
          <Link href="/#cases" className="hover:text-ink transition-colors">Use cases</Link>
          <Link href="/#regulators" className="hover:text-ink transition-colors">Security &amp; compliance</Link>
          <Link href="/book-demo" className="hover:text-ink transition-colors">Book an audit</Link>
          <a href="mailto:hello@proofperimeter.com" className="hover:text-ink transition-colors">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
