type IconProps = {
  className?: string;
};

export function Icon({ name, className }: IconProps & { name: string }) {
  const common = { className, viewBox: "0 0 24 24", "aria-hidden": true } as const;

  switch (name) {
    case "anthropic":
      return <img className={className} src="https://img.icons8.com/fluent/1200/claude.jpg" alt="" aria-hidden="true" />;
    case "openai":
      return <img className={className} src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/openai-wx0xqojo8lrv572wcvlcb.png/openai-twkvg10vdyltj9fklcgusg.png" alt="" aria-hidden="true" />;
    case "google":
      return <img className={className} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/960px-Google_Gemini_icon_2025.svg.png" alt="" aria-hidden="true" />;
    case "amazon":
      return <img className={className} src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/aws-bedrock-icon.png" alt="" aria-hidden="true" />;
    case "on-premise":
      return (
        <svg {...common}>
          <path d="M2 10.5 11 4M13 4 22 10.5" />
          <path d="M15 4V1h4v8" />
          <rect x="3" y="12" width="18" height="5.5" rx="2.2" />
          <rect x="3" y="18" width="18" height="5.5" rx="2.2" />
          <path d="M6.5 14.75h7M6.5 20.75h7" />
          <circle cx="16" cy="14.75" r="1" />
          <circle cx="18.5" cy="14.75" r="1" />
          <circle cx="16" cy="20.75" r="1" />
          <circle cx="18.5" cy="20.75" r="1" />
        </svg>
      );
    case "document":
      return <svg {...common}><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v5h5" /></svg>;
    case "template":
      return <svg {...common}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M9 9v11" /></svg>;
    case "workflow":
      return <svg {...common}><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="18" r="2.4" /><path d="M8 6h6a4 4 0 0 1 4 4v6" /></svg>;
    case "model":
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" /></svg>;
    case "upload":
      return <svg {...common}><path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 20h16" /></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>;
    case "edit":
      return <svg {...common}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
    case "gear":
      return <svg {...common}><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" /><path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.65V21a2 2 0 0 1-4 0v-.09A1.8 1.8 0 0 0 8.8 19.3a1.8 1.8 0 0 0-1.98.36l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.8 1.8 0 0 0 4.35 15a1.8 1.8 0 0 0-1.65-1.1H2.6a2 2 0 0 1 0-4h.09A1.8 1.8 0 0 0 4.35 8.8a1.8 1.8 0 0 0-.36-1.98l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.8 1.8 0 0 0 1.98.36A1.8 1.8 0 0 0 9.9 2.7V2.6a2 2 0 0 1 4 0v.09a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 1.98-.36l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.8 1.8 0 0 0-.36 1.98 1.8 1.8 0 0 0 1.65 1.1h.1a2 2 0 0 1 0 4h-.09A1.8 1.8 0 0 0 19.4 15z" /></svg>;
    case "trash":
      return <svg {...common}><path d="M4 7h16M10 11v6M14 11v6" /><path d="M6 7l1 14h10l1-14" /><path d="M9 7V4h6v3" /></svg>;
    case "save":
      return <svg {...common}><path d="M5 3h12l2 2v16H5z" /><path d="M8 3v6h8" /><path d="M8 17h8" /></svg>;
    case "play":
      return <svg {...common}><path d="M8 5v14l11-7z" /></svg>;
    case "globe":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18" /><path d="M12 3a14 14 0 0 0 0 18" /></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7z" /><path d="M12 7v10" /></svg>;
    case "bank":
      return <svg {...common}><path d="M4 10h16" /><path d="M6 10v8M10 10v8M14 10v8M18 10v8" /><path d="M4 18h16M3 21h18" /><path d="M12 3l8 5H4z" /></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></svg>;
    case "webhook":
      return <svg {...common}><circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><circle cx="12" cy="6" r="3" /><path d="M10.6 8.6 7.4 14.4M13.4 8.6l3.2 5.8M9 17h6" /></svg>;
    case "api":
      return <svg {...common}><path d="M7 8h10M7 12h6M7 16h10" /><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18" /></svg>;
    default:
      return null;
  }
}
