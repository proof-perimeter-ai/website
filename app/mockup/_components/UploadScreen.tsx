"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ScreenHeader } from "./ui";
import { Icon } from "./icons";

type Stage = "select" | "extracting" | "classifying" | "validating" | "completed";

const STEPS: { stage: Stage; label: string; caption: string }[] = [
  { stage: "extracting", label: "Extracting the data", caption: "Reading layout, text and tables" },
  { stage: "classifying", label: "Classifying the document", caption: "Matching against known templates" },
  { stage: "validating", label: "Validating data fields", caption: "Cross-checking extracted values" },
];

const STORAGE_KEY = "pp-mockup-uploaded-docs";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadScreen() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("select");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timeouts.current;
    return () => {
      pending.forEach(clearTimeout);
    };
  }, []);

  function startProcessing() {
    setStage("extracting");
    timeouts.current.push(setTimeout(() => setStage("classifying"), 1400));
    timeouts.current.push(setTimeout(() => setStage("validating"), 2800));
    timeouts.current.push(setTimeout(() => setStage("completed"), 4200));
  }

  function goToDocuments() {
    router.push("/mockup/home");
  }

  function finishUpload() {
    if (file) {
      const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]");
      stored.unshift({ name: file.name, size: file.size, uploadedAt: Date.now() });
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    }
    goToDocuments();
  }

  const stepIndex = STEPS.findIndex((step) => step.stage === stage);
  const percent = stage === "select" ? 0 : stage === "completed" ? 100 : Math.round(((stepIndex + 1) / STEPS.length) * 100);
  const circumference = 2 * Math.PI * 54;

  return (
    <section className="mock-screen active">
      <ScreenHeader title="Upload document" subtitle="AI-powered extraction, classification & validation" />
      <div className="mock-body mock-upload-center">
        {stage === "select" && (
          <div className="mock-upload-panel mock-fade-in">
            <div
              className={`mock-upload-drop${dragActive ? " drag-active" : ""}${file ? " has-file" : ""}`}
              role="button"
              tabIndex={0}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
              }}
              onDragEnter={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragActive(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragActive(false);
                const dropped = event.dataTransfer.files?.[0];
                if (dropped) setFile(dropped);
              }}
            >
              {!file && (
                <>
                  <div className="mock-upload-drop-icon">
                    <Icon name="upload" />
                  </div>
                  <b>Drag & drop your document here</b>
                  <span>or click to browse - PDF, PNG, TIFF, JPG</span>
                </>
              )}
              {file && (
                <div className="mock-upload-chip">
                  <div className="mock-doc-ico"><Icon name="document" /></div>
                  <div>
                    <b>{file.name}</b>
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                  <button
                    type="button"
                    className="mock-upload-chip-remove"
                    onClick={(event) => {
                      event.stopPropagation();
                      setFile(null);
                    }}
                    aria-label="Remove file"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              className="mock-upload-input"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            />
            <div className="mock-upload-actions">
              <button className="mock-btn" onClick={goToDocuments}>Cancel</button>
              <Button variant="primary" disabled={!file} onClick={startProcessing}>Upload</Button>
            </div>
          </div>
        )}

        {stage !== "select" && stage !== "completed" && (
          <div className="mock-upload-panel mock-upload-card mock-fade-in">
            <div className="mock-upload-ring">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle className="mock-upload-ring-track" cx="60" cy="60" r="54" />
                <circle
                  className="mock-upload-ring-progress"
                  cx="60"
                  cy="60"
                  r="54"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: circumference - (circumference * percent) / 100,
                  }}
                />
              </svg>
              <div className="mock-upload-ring-value">{percent}%</div>
            </div>
            <div className="mock-upload-filename">{file?.name}</div>
            <div className="mock-upload-steps">
              {STEPS.map((step, index) => (
                <div
                  key={step.stage}
                  className={`mock-upload-step ${index < stepIndex ? "done" : index === stepIndex ? "active" : "pending"}`}
                >
                  <div className="mock-upload-step-dot">
                    {index < stepIndex && (
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    )}
                    {index === stepIndex && <div className="mock-spinner" />}
                    {index > stepIndex && <span>{index + 1}</span>}
                  </div>
                  <div className="mock-upload-step-text">
                    <b>{step.label}</b>
                    <span>{index < stepIndex ? "Done" : index === stepIndex ? step.caption : "Queued"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {stage === "completed" && (
          <div className="mock-upload-panel mock-upload-card mock-upload-done-body mock-fade-in">
            <div className="mock-upload-check">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path className="mock-upload-check-path" pathLength="1" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <b>Document processed</b>
            <span>{file?.name}</span>
            <Button variant="primary" onClick={finishUpload}>Done</Button>
          </div>
        )}
      </div>
    </section>
  );
}
