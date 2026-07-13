import { ScreenHeader, Button } from "./ui";

const fields = [
  ["legal_entity_name", "text", "The full registered legal name of the entity"],
  ["registration_number", "text", "Company / commercial registration number"],
  ["jurisdiction", "enum", "ISO country + region of incorporation"],
  ["incorporation_date", "date", "Date the entity was incorporated"],
  ["registered_address", "text", "Full registered office address"],
  ["directors", "table", "Name, role, nationality, appointed date per director"],
  ["beneficial_owners", "table", "Owner and holding % - total must equal 100%"],
];

export function TemplatesScreen() {
  return (
    <section className="mock-screen active">
      <ScreenHeader title="Templates" subtitle="Reusable extraction schemas for your documents" action={<Button variant="primary">+ New template</Button>} />
      <div className="mock-cols">
        <aside className="mock-list-col">
          <div className="mock-list-head">Your templates <span>+</span></div>
          {["Corporate KYC", "Bank statement", "Invoice", "ID & address"].map((name, index) => (
            <div key={name} className={`mock-schema-item ${index === 0 ? "on" : ""}`}><b>{name}<span>v{index + 1}</span></b><div>{index === 0 ? "8 fields - 3 rules" : "6 fields - tables"}</div></div>
          ))}
          <div className="mock-starter">Start from a template</div>
          <div className="mock-schema-item"><b>+ Loan / credit file</b><div>payslips, tax returns</div></div>
          <div className="mock-schema-item"><b>+ Insurance claim</b><div>ACORD, loss docs</div></div>
        </aside>
        <div className="mock-detail-col">
          <div className="mock-card">
            <div className="mock-card-head"><div><h3>Corporate KYC</h3><span>Fields extracted from every corporate onboarding pack</span></div><Button>+ Add field</Button></div>
            <div className="mock-card-body">
              {fields.map((field) => (
                <div className="mock-sfield" key={field[0]}>
                  <span className="mock-drag">::</span>
                  <b>{field[0]}</b>
                  <span className={`mock-type ${field[1] === "table" ? "table" : ""}`}>{field[1]}</span>
                  <span>{field[2]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mock-card learn">
            <div className="mock-card-head"><div><h3>Learnings</h3><span>Corrections teach this template over time</span></div><span className="mock-pill green"><span />14 captured</span></div>
            <div className="mock-card-body">
              <Learning field="jurisdiction" oldValue="England" newValue="GB - England & Wales" count="x6" />
              <Learning field="incorporation_date" oldValue="17/03/17" newValue="2017-03-17" count="x5" />
              <Learning field="registration_number" oldValue="SC 108422" newValue="10842236" count="x3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Learning({ field, oldValue, newValue, count }: { field: string; oldValue: string; newValue: string; count: string }) {
  return <div className="mock-learn-row"><b>{field}</b><span className="old">{oldValue}</span><span>{'->'}</span><span className="new">{newValue}</span><em>{count}</em></div>;
}
