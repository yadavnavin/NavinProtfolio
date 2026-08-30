import { multiTenantProject } from "@/data/projects";

const tenantLanes = ["context-one", "context-two", "context-three"] as const;

export function MultiTenantIsolation() {
  const project = multiTenantProject;

  return (
    <section
      id="multi-tenant-platform"
      className="tenant-chapter"
      aria-labelledby="tenant-project-title"
    >
      <header className="tenant-heading">
        <div className="tenant-atlas-entry">
          <span className="tenant-atlas-node" aria-hidden="true" />
          <span>{project.atlasBranches.join(" + ")}</span>
          <strong>Isolation</strong>
        </div>

        <div className="tenant-title-block">
          <h2 id="tenant-project-title">{project.name}</h2>
          <p>{project.purpose}</p>
        </div>
      </header>

      <div className="tenant-editorial-grid">
        <aside className="tenant-narrative">
          <p className="tenant-thesis">{project.thesis}</p>
          <p className="tenant-disclosure">{project.disclosure}</p>

          <dl className="tenant-responsibilities">
            {project.responsibilities.map((responsibility) => (
              <div key={responsibility.title}>
                <dt>{responsibility.title}</dt>
                <dd>{responsibility.description}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <figure className="isolation-diagram">
          <figcaption>
            Conceptual system view — shared product, controlled tenant
            boundaries.
          </figcaption>

          <div className="isolation-shared">
            <span className="isolation-terminal" aria-hidden="true" />
            <strong>{project.sharedLayers[0]}</strong>
            <span>Common product surface</span>
          </div>

          <div className="isolation-access">
            <span className="isolation-access-line" aria-hidden="true" />
            <strong>{project.sharedLayers[1]}</strong>
            <span>Controlled entry</span>
          </div>

          <div className="isolation-distributor" aria-hidden="true">
            <span />
          </div>

          <ol
            className="isolation-lanes"
            aria-label="Separated tenant contexts"
          >
            {tenantLanes.map((lane, index) => (
              <li key={lane}>
                <span className="isolation-lane-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="isolation-lane-node" aria-hidden="true" />
                <strong>{project.laneLabel}</strong>
                <span className="isolation-boundary-label">
                  {project.boundaryLabel}
                </span>
              </li>
            ))}
          </ol>
        </figure>
      </div>

      <div className="tenant-technology-line">
        <span>Supporting technologies</span>
        <ul>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
