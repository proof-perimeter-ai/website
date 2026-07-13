"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { DocumentIcon, Pill, ScreenHeader, Button } from "./ui";
import { Icon } from "./icons";

const STORAGE_KEY = "pp-mockup-uploaded-docs";

type UploadedDoc = { name: string; size: number; uploadedAt: number };

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function subscribeToUploadedDocs() {
  return () => {};
}

function getUploadedDocsSnapshot() {
  return sessionStorage.getItem(STORAGE_KEY) ?? "[]";
}

function getUploadedDocsServerSnapshot() {
  return "[]";
}

const docs = [
  ["Meridian Holdings - KYC pack", "meridian_kyc_0417.pdf - 16 pages", "Corporate KYC", "Rule failed", "rust", "64%", "2m ago"],
  ["Aster Capital Ltd - onboarding", "aster_onboarding.pdf - 14 pages", "Corporate KYC", "To review", "amber", "88%", "14m ago"],
  ["Norvik Trading - statements", "norvik_stmt_q1.pdf - 122 pages", "Bank statement", "Confirmed", "green", "97%", "1h ago"],
  ["Halden & Co - invoice", "halden_inv_8821.pdf - 1 page", "Invoice", "Exported", "green", "99%", "2h ago"],
  ["Petra Ivanova - proof of address", "ivanova_poa.jpg - 1 page", "ID & address", "Extracting", "grey", "-", "just now"],
  ["Kestrel Partners - invoice", "kestrel_inv_1190.pdf - 2 pages", "Invoice", "Exported", "green", "98%", "3h ago"],
] as const;

export function HomeScreen() {
  const router = useRouter();
  const [reviewOpen, setReviewOpen] = useState(false);
  const uploadedDocsJson = useSyncExternalStore(
    subscribeToUploadedDocs,
    getUploadedDocsSnapshot,
    getUploadedDocsServerSnapshot,
  );
  const uploadedDocs: UploadedDoc[] = JSON.parse(uploadedDocsJson);

  function goToUpload() {
    router.push("/mockup/documents/new");
  }

  if (reviewOpen) {
    return (
      <section className="mock-screen active">
        <div className="mock-review-head">
          <button className="mock-btn" onClick={() => setReviewOpen(false)}>Documents</button>
          <span>/</span>
          <b>Meridian Holdings - KYC pack</b>
          <Pill tone="rust">Rule failed</Pill>
        </div>
        <div className="mock-review">
          <div className="mock-page">
            <div className="mock-page-title">Meridian Holdings Ltd</div>
            <div className="mock-page-line" />
            <div className="mock-page-row"><span>Registration number</span><b>SC 108422</b></div>
            <div className="mock-page-row"><span>Jurisdiction</span><b>England</b></div>
            <div className="mock-page-row"><span>Incorporation date</span><b>17/03/17</b></div>
            <div className="mock-bbox one">legal_entity_name</div>
            <div className="mock-bbox two">incorporation_date</div>
          </div>
          <div className="mock-extract">
            <div className="mock-extract-top">
              <b>Corporate KYC</b>
              <span>6 of 8 confirmed</span>
            </div>
            {["legal_entity_name", "registration_number", "jurisdiction", "incorporation_date", "beneficial_owners"].map((field, index) => (
              <div key={field} className={`mock-field ${index === 4 ? "violation" : "confirmed"}`}>
                <div className="mock-tick" />
                <div>
                  <div className="mock-field-key">{field}</div>
                  <div className="mock-field-value">{index === 4 ? "Holding totals 96%" : index === 3 ? "2017-03-17" : "Confirmed value"}</div>
                </div>
              </div>
            ))}
            <div className="mock-extract-foot">
              <Button variant="primary">Confirm selected</Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mock-screen active">
      <ScreenHeader
        title="Documents"
        subtitle="6 documents - 2 waiting on you"
        action={<Button variant="primary" onClick={goToUpload}><Icon name="upload" />Upload documents</Button>}
      />
      <div className="mock-body">
        <div className="mock-metrics">
          <Metric label="Processed today" value="128" detail="across 4 templates" />
          <Metric label="Straight-through" value="71%" detail="auto-confirmed, no review" accent />
          <Metric label="In review" value="2" detail="avg 41s per document" />
          <Metric label="Exceptions" value="1" detail="rule failed - needs a human" />
        </div>
        <div className="mock-ingest" role="button" tabIndex={0} onClick={goToUpload}>
          <Icon name="upload" />
          <div><b>Drop files or click to upload</b><span>PDF, PNG, TIFF, JPG - single or batch</span></div>
        </div>
        <div className="mock-tablewrap">
          <div className="mock-tabtools">
            <div className="mock-search"><Icon name="search" /><span>Search documents, entities, values...</span></div>
            <div className="mock-seg"><button className="on">All</button><button>To review</button><button>Confirmed</button><button>Exported</button></div>
          </div>
          <table className="mock-table">
            <thead><tr><th>Document</th><th>Template</th><th>Status</th><th>Confidence</th><th>Received</th><th /></tr></thead>
            <tbody>
              {uploadedDocs.map((doc) => (
                <tr key={doc.uploadedAt} className="static">
                  <td><div className="mock-doc-name"><DocumentIcon /><div><b>{doc.name}</b><div>{formatFileSize(doc.size)} - uploaded just now</div></div></div></td>
                  <td>Unclassified</td>
                  <td><Pill tone="grey">Processed</Pill></td>
                  <td><div className="mock-conf"><div><span style={{ width: "0" }} /></div><b>-</b></div></td>
                  <td className="mock-mono muted">just now</td>
                  <td />
                </tr>
              ))}
              {docs.map((doc, index) => (
                <tr key={doc[0]} onClick={() => index < 2 && setReviewOpen(true)}>
                  <td><div className="mock-doc-name"><DocumentIcon /><div><b>{doc[0]}</b><div>{doc[1]}</div></div></div></td>
                  <td>{doc[2]}</td>
                  <td><Pill tone={doc[4]}>{doc[3]}</Pill></td>
                  <td><div className="mock-conf"><div><span style={{ width: doc[5] === "-" ? "0" : doc[5] }} /></div><b>{doc[5]}</b></div></td>
                  <td className="mock-mono muted">{doc[6]}</td>
                  <td>{index < 2 ? <span className="mock-link-btn">Review</span> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, detail, accent }: { label: string; value: string; detail: string; accent?: boolean }) {
  return <div className={`mock-metric ${accent ? "accent" : ""}`}><div>{label}</div><b>{value}</b><span>{detail}</span></div>;
}
