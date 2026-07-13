import { Icon } from "./icons";
import { Button, ScreenHeader } from "./ui";

const nodes = [
  ["Document Processing", "OCR & Data Extraction", "document", "green"],
  ["Business Verification", "Verify Company & Registry", "globe", "green"],
  ["Compliance & Risk Screening", "Sanctions, PEP, Adverse Media", "shield", "orange"],
  ["Tax Validation", "VAT & Tax ID Validation", "bank", "purple"],
  ["Trigger Manual Review", "If Risk Score > Threshold", "user", "amber"],
  ["Fire Webhook", "Send Results to Downstream", "webhook", "blue"],
] as const;

export function WorkflowsScreen() {
  return (
    <section className="mock-screen active">
      <ScreenHeader title="Workflows" subtitle="How documents move from arrival to export" action={<Button> <Icon name="plus" /> Create New Workflow</Button>} />
      <div className="mock-body">
        <div className="wf-app">
          <div className="wf-toolbar">
            <b>Vendor KYC workflow</b>
            <button><Icon name="edit" /></button>
            <button><Icon name="plus" />Add node</button>
            
            <span />
            {/* <button className="danger"><Icon name="trash" />Delete</button> */}
            <button className="primary"><Icon name="play" />Run</button>
            <button><Icon name="save" /></button>
            <button><Icon name="gear" /></button>
          </div>
          <div className="wf-workspace">
            <aside className="wf-palette">
              <div>Add Node</div>
              {[
                ["Document", "document"],
                ["Verification", "globe"],
                ["HTTP API", "api"],
                ["Risk check", "shield"],
                ["Tax rule", "bank"],
                ["Review", "user"],
                ["Webhook", "webhook"],
              ].map(([label, icon]) => <button key={label}><Icon name={icon} />{label}</button>)}
            </aside>
            <div className="wf-canvas">
              <div className="wf-zoom"><button>-</button><button>100</button><button>+</button></div>
              <div className="wf-flow">
                {nodes.map((node, index) => (
                  <div className="wf-step" key={node[0]}>
                    <div className={`wf-node ${node[3]} ${index === 1 ? "selected" : ""}`}>
                      <div className="wf-icon"><Icon name={node[2]} /></div>
                      <div><b>{node[0]}</b><span>{node[1]}</span></div>
                      <button className="wf-node-edit" title="Edit node"><Icon name="edit" /></button>
                    </div>
                    {index < nodes.length - 1 ? <button className="wf-add" title="Add node here"><Icon name="plus" /></button> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
