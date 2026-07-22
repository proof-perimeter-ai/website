type Logo = { src: string; alt: string; width: number; height: number };

const logos: Logo[] = [
  { src: "/assets/logos/customer-1.png", alt: "Customer logo", width: 88, height: 40 },
  { src: "/assets/logos/customer-2.png", alt: "Customer logo", width: 76, height: 40 },
  { src: "/assets/logos/customer-3.png", alt: "Customer logo", width: 120, height: 40 },
  { src: "/assets/logos/customer-4.png", alt: "Customer logo", width: 95, height: 40 },
  { src: "/assets/logos/customer-5.webp", alt: "Customer logo", width: 71, height: 40 },
  { src: "/assets/logos/customer-6.png", alt: "Customer logo", width: 76, height: 40 },
];

export function CustomerLogoMarquee() {
  return (
    <section className="border-t border-line py-22">
      <div className="mx-auto max-w-[1120px] px-7">
        <h3 className="text-center font-mono text-xs uppercase tracking-[0.16em] text-ink-2">
          Trusted by leading startups &amp; enterprises
        </h3>

        <div className="logo-marquee-fade mt-10 overflow-hidden">
          <div className="logo-marquee-track flex w-max items-center gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                aria-hidden={i >= logos.length ? true : undefined}
                className="h-10 w-auto shrink-0 object-contain opacity-70 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
