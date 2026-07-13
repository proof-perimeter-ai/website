"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { ScreenHeader } from "./ui";

const providers = [
  ["anthropic", "Anthropic", "Claude - key connected", true],
  ["openai", "OpenAI", "GPT - key connected", true],
  ["google", "Google", "Gemini - not connected", false],
  ["amazon", "Amazon Bedrock", "not connected", false],
  ["on-premise", "On-premise hosted model", "Self-hosted open source models", false],
  ["model", "Our fine-tuned Model", "Pro", false],
] as const;

const listAiModels = [
  { value: "gpt-5.6", label: "gpt-5.6" },
  { value: "gpt-5.6-sol", label: "gpt-5.6-sol" },
  { value: "gpt-5.6-terra", label: "gpt-5.6-terra" },
  { value: "gpt-5.6-luna", label: "gpt-5.6-luna" },
  { value: "gpt-5.5", label: "gpt-5.5" },
  { value: "gpt-5.5-pro", label: "gpt-5.5-pro" },
  { value: "gpt-5.4", label: "gpt-5.4" },
  { value: "gpt-5.4-pro", label: "gpt-5.4-pro" },
  { value: "gpt-5.4-mini", label: "gpt-5.4-mini" },
  { value: "gpt-5.4-nano", label: "gpt-5.4-nano" },
  { value: "claude-fable-5", label: "claude-fable-5" },
  { value: "claude-opus-4-8", label: "claude-opus-4-8" },
  { value: "claude-sonnet-5", label: "claude-sonnet-5" },
  { value: "claude-haiku-4-5", label: "claude-haiku-4-5" },
] as const;


export function ModelsScreen() {
  const [assignments, setAssignments] = useState({
    extraction: "claude-sonnet-5",
    classification: "gpt-5.6",
    validation: "claude-opus-4-8",
  });

  return (
    <section className="mock-screen active">
      <ScreenHeader title="Models" subtitle="Configure your model settings" />
      <div className="mock-body">
        <div className="mock-section-label">Connected providers</div>
        <div className="mock-provgrid">
          {providers.map((provider) => (
            <div key={provider[1]} className={`mock-prov ${provider[3] ? "" : "off"}`}>
              <div className={`mock-logo ${provider[0]}`}>
                <Icon name={provider[0]} />
              </div>
              <div><b>{provider[1]}</b><span>{provider[2]}</span></div>
              <em>{provider[3] ? "Manage" : "Connect"}</em>
            </div>
          ))}
        </div>
        <div className="mock-section-label">Model per task</div>
        <div className="mock-assign">
          <ModelAssign
            label="Extraction"
            value={assignments.extraction}
            onChange={(value) => setAssignments((current) => ({ ...current, extraction: value }))}
            options={listAiModels}
            groupLabel="AI Models"
          />
          <ModelAssign
            label="Classification"
            value={assignments.classification}
            onChange={(value) => setAssignments((current) => ({ ...current, classification: value }))}
            options={listAiModels}
            groupLabel="AI Models"
          />
          <ModelAssign
            label="Validation"
            value={assignments.validation}
            onChange={(value) => setAssignments((current) => ({ ...current, validation: value }))}
            options={listAiModels}
            groupLabel="AI Models"
          />
        </div>
      </div>
    </section>
  );
}

function ModelAssign({
  label,
  value,
  onChange,
  options,
  groupLabel,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  groupLabel: string;
}) {
  return (
    <label className="mock-assign-item">
      <span>{label}</span>
      <select className="mock-select" value={value} onChange={(event) => onChange(event.target.value)}>
        <optgroup label={groupLabel}>
          {options.map((option) => (
            <option key={`${label}-${option.value}-${option.label}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </optgroup>
      </select>
    </label>
  );
}
