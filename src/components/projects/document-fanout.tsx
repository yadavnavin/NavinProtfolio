import { documentProject } from "@/data/projects";

const gridCellIds = [
  "a1",
  "a2",
  "a3",
  "a4",
  "b1",
  "b2",
  "b3",
  "b4",
  "c1",
  "c2",
  "c3",
  "c4",
] as const;

function DocumentSpecimen({ mode }: { mode: string }) {
  if (mode === "pdf") {
    return (
      <span
        className="document-specimen document-specimen-pdf"
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
      </span>
    );
  }

  if (mode === "presentation") {
    return (
      <span
        className="document-specimen document-specimen-presentation"
        aria-hidden="true"
      >
        <i />
        <i />
      </span>
    );
  }

  if (mode === "spreadsheet") {
    return (
      <span
        className="document-specimen document-specimen-spreadsheet"
        aria-hidden="true"
      >
        {gridCellIds.map((cellId) => (
          <i key={cellId} />
        ))}
      </span>
    );
  }

  return (
    <span
      className="document-specimen document-specimen-output"
      aria-hidden="true"
    >
      <i />
      <i />
    </span>
  );
}

export function DocumentFanout() {
  const project = documentProject;

  return (
    <section
      id="browser-document-platform"
      className="document-chapter"
      aria-labelledby="document-project-title"
    >
      <header className="document-heading">
        <div className="document-atlas-entry">
          <span className="document-atlas-node" aria-hidden="true" />
          <span>{project.atlasBranches.join(" + ")}</span>
          <strong>Fan-out</strong>
        </div>

        <div className="document-title-block">
          <h2 id="document-project-title">
            <span>Browser Document</span>
            <span>Platform</span>
          </h2>
        </div>

        <div className="document-purpose">
          <p>{project.purpose}</p>
          <span>{project.disclosure}</span>
        </div>
      </header>

      <figure className="document-fanout-field">
        <figcaption>
          Conceptual product view — one browser surface branching into distinct
          document work.
        </figcaption>

        <div className="document-entry-rail" aria-hidden="true">
          {project.atlasBranches.map((branch) => (
            <span key={branch}>{branch}</span>
          ))}
        </div>

        <div className="document-editing-plane">
          <div className="document-plane-label">
            <span>Shared environment</span>
            <strong>Editing surface</strong>
          </div>

          <div className="document-canvas" aria-hidden="true">
            <span className="document-page-boundary" />
            <span className="document-selection-region">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="document-text-rule document-text-rule-one" />
            <span className="document-text-rule document-text-rule-two" />
            <span className="document-grid-fragment">
              {gridCellIds.map((cellId) => (
                <i key={cellId} />
              ))}
            </span>
          </div>
        </div>

        <svg
          className="document-fanout-routes"
          aria-hidden="true"
          preserveAspectRatio="none"
          viewBox="0 0 1200 760"
        >
          <path className="document-entry-route" d="M 0 372 H 158" />
          <path
            className="document-route-active"
            d="M 586 250 H 716 V 112 H 850"
          />
          <path d="M 586 320 H 790 V 300 H 945" />
          <path d="M 586 410 H 700 V 560 H 828" />
          <path d="M 586 480 H 765 V 680 H 960" />
        </svg>

        <ol className="document-destinations" aria-label="Document workflows">
          {project.modes.map((mode) => (
            <li data-document-mode={mode.id} key={mode.id}>
              <span className="document-destination-node" aria-hidden="true" />
              <div className="document-mode-copy">
                <span>{mode.direction}</span>
                <strong>{mode.label}</strong>
                <p>{mode.description}</p>
              </div>
              <DocumentSpecimen mode={mode.id} />
            </li>
          ))}
        </ol>
      </figure>

      <div className="document-closing">
        <p className="document-thesis">{project.thesis}</p>

        <div className="document-experience">
          <ul>
            {project.experience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="document-technologies">
            <span>Supporting technologies</span>
            <ul>
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
