import {
  Braces,
  Building2,
  Check,
  Database,
  FileOutput,
  FileText,
  Play,
  Presentation,
  Sheet,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import type { SystemsChapter } from "@/data/portfolio-specimen";
import { systemsChapters } from "@/data/portfolio-specimen";

function IsolationDiagram({ chapter }: { chapter: SystemsChapter }) {
  return (
    <div
      className="isolation-specimen"
      role="img"
      aria-label="Conceptual tenant isolation"
    >
      <div className="isolation-platform">
        <Building2 aria-hidden="true" />
        <strong>{chapter.steps[0]}</strong>
      </div>
      <div className="isolation-gate">
        <ShieldCheck aria-hidden="true" />
        <strong>{chapter.steps[1]}</strong>
      </div>
      <ul>
        {["Tenant A", "Tenant B", "Tenant C"].map((tenant) => (
          <li key={tenant}>
            <span />
            <strong>{tenant}</strong>
            <small>{chapter.steps[2]}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SequenceDiagram({ chapter }: { chapter: SystemsChapter }) {
  const icons = [FileText, Check, Zap, Workflow, Play];

  return (
    <ol className="sequence-specimen" aria-label="Workflow sequence">
      {chapter.steps.map((step, index) => {
        const Icon = icons[index] ?? Braces;
        return (
          <li key={step}>
            <Icon aria-hidden="true" />
            <strong>{step}</strong>
            {index < chapter.steps.length - 1 ? (
              <span aria-hidden="true">→</span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function FanoutDiagram({ chapter }: { chapter: SystemsChapter }) {
  const icons = [Braces, FileOutput, Presentation, Sheet, Sparkles];

  return (
    <div
      className="fanout-specimen"
      role="img"
      aria-label="Document workflow fan-out"
    >
      {chapter.steps.map((step, index) => {
        const Icon = icons[index] ?? Database;
        return (
          <div key={step} data-origin={index === 0 ? "" : undefined}>
            <Icon aria-hidden="true" />
            <strong>{step}</strong>
          </div>
        );
      })}
    </div>
  );
}

export function SystemsWork() {
  return (
    <section
      id="systems"
      className="systems-work"
      aria-labelledby="systems-title"
    >
      <header className="systems-heading">
        <h2 id="systems-title">Systems work.</h2>
        <p>
          Three product systems, presented through the engineering decision that
          shaped each one.
        </p>
        <p className="systems-disclosure">
          Employer-owned work presented anonymously.
        </p>
      </header>

      <div className="systems-chapters">
        {systemsChapters.map((chapter) => (
          <article key={chapter.id} className={`system-chapter ${chapter.id}`}>
            <div className="system-copy">
              <h3>{chapter.title}</h3>
              <p>{chapter.purpose}</p>
              <blockquote>{chapter.decision}</blockquote>
            </div>

            <div className="system-diagram">
              {chapter.diagram === "isolation" ? (
                <IsolationDiagram chapter={chapter} />
              ) : null}
              {chapter.diagram === "sequence" ? (
                <SequenceDiagram chapter={chapter} />
              ) : null}
              {chapter.diagram === "fanout" ? (
                <FanoutDiagram chapter={chapter} />
              ) : null}
            </div>

            <div className="system-evidence">
              <ul>
                {chapter.evidence.slice(0, 4).map((item) => (
                  <li key={item}>
                    <Check aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p>{chapter.technologies.join(" · ")}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
