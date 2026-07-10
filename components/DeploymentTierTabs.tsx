"use client";

import { useState } from "react";

type Tier = {
  label: string;
  model: string;
  inference: string;
  title: string;
  body: string;
};

const TIERS: Tier[] = [
  {
    label: "Your key",
    model: "gpt-4o-mini (2026-05-13)",
    inference: "openai · eu-west-1 · customer key ····4f2a",
    title: "Your own key, hosted",
    body: "The provider, the region, your key. We hold nothing after the run.",
  },
  {
    label: "Enterprise",
    model: "proof-perimeter-extract-3b (v3.1.0)",
    inference: "proof perimeter enterprise · eu-central-1 · pinned model",
    title: "Proof Perimeter Enterprise, hosted",
    body: "Our proprietary models, our region — named, versioned, pinned, with published accuracy.",
  },
  {
    label: "On-prem",
    model: "proof-perimeter-extract-3b · fine-tuned (v3.1.0-ft)",
    inference: "kyc-node-04.internal · no egress · never left premises",
    title: "Proof Perimeter Enterprise, on-prem",
    body: "The hostname of the machine in your building. The document never left.",
  },
];

export function DeploymentTierTabs() {
  const [active, setActive] = useState(0);
  const tier = TIERS[active];

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : TIERS.length - 1)) % TIERS.length;
    setActive(next);
    (e.currentTarget.parentElement?.children[next] as HTMLButtonElement | undefined)?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Deployment tier"
        className="flex overflow-hidden rounded-[5px] border border-white/20"
      >
        {TIERS.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`flex-1 border-l border-white/20 px-1.5 py-2.75 font-mono text-[11px] tracking-[0.09em] uppercase transition-colors first:border-l-0 ${
              i === active ? "bg-white font-semibold text-signal-deep" : "bg-transparent text-[#9DC3EC] hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-md border border-white/20 bg-white/8">
        <div className="border-b border-white/20 px-4.5 py-3 font-mono text-[10.5px] tracking-[0.15em] text-[#9DC3EC] uppercase">
          Signed provenance record
        </div>
        <div className="p-4.5 font-mono text-[12.5px] leading-[1.9]" role="tabpanel" aria-live="polite">
          {[
            ["document", "doc_8fa2c91"],
            ["template", "kyc_individual_v3"],
            ["field", "date_of_birth"],
            ["model", tier.model, true],
            ["inference", tier.inference, true],
            ["confidence", "0.982"],
            ["reviewed_by", "—"],
            ["timestamp", "2026-07-10T09:14:22Z"],
            ["integrity", "sha256:1f3c9b7e…"],
          ].map(([k, v, hl]) => (
            <div key={k as string} className="grid grid-cols-[100px_1fr] gap-3">
              <span className="text-[#9DC3EC]">{k}</span>
              <span className={hl ? "font-semibold text-white" : "text-[#EAF2FA]"}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 min-h-[80px]">
        <h3 className="text-[17px] font-semibold text-white">{tier.title}</h3>
        <p className="mt-2 text-[14.5px] text-[#D2E2F2]">{tier.body}</p>
      </div>
    </div>
  );
}
