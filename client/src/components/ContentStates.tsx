import { RefreshCw } from "lucide-react";

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {action && <div className="section-heading-action">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = "Loading community content" }: { label?: string }) {
  return <div className="state-panel" role="status"><span className="state-pulse" />{label}</div>;
}

export function ErrorState({ message, retry }: { message: string; retry: () => void }) {
  return (
    <div className="state-panel state-panel-error" role="alert">
      <p>{message}</p>
      <button className="button button-quiet" onClick={retry}><RefreshCw size={15} />Try again</button>
    </div>
  );
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return <div className="empty-state"><h3>{title}</h3><p>{message}</p></div>;
}
