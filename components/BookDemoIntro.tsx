import { logos } from "@/components/CustomerLogoMarquee";

const bullets = [
  "Reduce manual document processing by up to 90%",
  "Up to 98% average extraction accuracy",
  "Full platform access after the demo - no credit card required",
];

export function BookDemoIntro() {
  return (
    <div>
      <h1 className="text-[clamp(30px,3.6vw,40px)] font-bold tracking-[-0.022em] text-ink">
        Book a Free Product Demo
      </h1>
      <p className="mt-4 max-w-[46ch] text-[15.5px] leading-[1.62] text-ink-2">
        Schedule 30-minute personalized demo with our experts.
      </p>

      <ul className="mt-3 list-none p-0">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-center gap-3 py-2 text-[15px] text-ink-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-live" />
            {bullet}
          </li>
        ))}
      </ul>

      <div className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-ink-2">
          Trusted by leading startups &amp; enterprises
        </h2>
        <div className="logo-marquee-fade mt-6 overflow-hidden">
          <div className="logo-marquee-track flex w-max items-center gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                aria-hidden={i >= logos.length ? true : undefined}
                className="h-9 w-auto shrink-0 object-contain opacity-70 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
