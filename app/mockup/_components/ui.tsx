import type { ReactNode } from "react";
import { Icon } from "./icons";

export function ScreenHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return (
    <div className="mock-head">
      <div>
        <h1>{title}</h1>
        <div className="mock-sub">{subtitle}</div>
      </div>
      <div className="mock-spacer" />
      {action}
    </div>
  );
}

export function Button({
  children,
  variant = "default",
  onClick,
  disabled,
}: {
  children: ReactNode;
  variant?: "default" | "primary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button type="button" className={`mock-btn${variant === "default" ? "" : ` ${variant}`}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function Pill({ tone, children }: { tone: "green" | "amber" | "rust" | "grey"; children: ReactNode }) {
  return <span className={`mock-pill ${tone}`}><span />{children}</span>;
}

export function DocumentIcon() {
  return <div className="mock-doc-ico"><Icon name="document" /></div>;
}
