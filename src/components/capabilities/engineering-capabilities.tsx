import {
  type CapabilityProjectId,
  capabilities,
  capabilityProjects,
} from "@/data/capabilities";

const projectById = new Map(
  capabilityProjects.map((project) => [project.id, project]),
);

function getProject(projectId: CapabilityProjectId) {
  const project = projectById.get(projectId);

  if (!project) {
    throw new Error(`Unknown capability project: ${projectId}`);
  }

  return project;
}

export function EngineeringCapabilities() {
  return (
    <section
      id="engineering-capabilities"
      className="capabilities-section"
      aria-labelledby="capabilities-title"
    >
      <header className="capabilities-heading">
        <div className="capabilities-atlas-entry">
          <span className="capabilities-atlas-node" aria-hidden="true" />
          <span>Project evidence</span>
          <strong>Convergence</strong>
        </div>

        <div className="capabilities-title-block">
          <h2 id="capabilities-title">
            <span>Different products.</span>
            <span>Repeated engineering problems.</span>
          </h2>
        </div>

        <p className="capabilities-introduction">
          The completed work reconnects here: recurring product and system
          problems, grounded in project evidence and supported by a focused
          technical toolkit.
        </p>
      </header>

      <div className="capability-field">
        <aside className="capability-evidence-rail">
          <div className="capability-evidence-heading">
            <span>Completed work</span>
            <strong>Evidence entering the field</strong>
          </div>

          <ol>
            {capabilityProjects.map((project) => (
              <li key={project.id}>
                <span
                  className="capability-evidence-terminal"
                  aria-hidden="true"
                />
                <strong>{project.name}</strong>
                <span>{project.transformation}</span>
              </li>
            ))}
          </ol>
        </aside>

        <div className="capability-convergence-route" aria-hidden="true">
          <span />
        </div>

        <ol className="capability-list">
          {capabilities.map((capability) => (
            <li data-capability={capability.id} key={capability.id}>
              <span className="capability-junction" aria-hidden="true" />

              <div className="capability-core">
                <span>{capability.atlasRelationship}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>

              <div className="capability-project-links">
                <span>Demonstrated in</span>
                <ul>
                  {capability.relatedProjects.map((projectId) => {
                    const project = getProject(projectId);

                    return (
                      <li key={project.id}>
                        <span>{project.transformation}</span>
                        <strong>{project.name}</strong>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="capability-technologies">
                <span>Supporting technology</span>
                <ul>
                  {capability.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
