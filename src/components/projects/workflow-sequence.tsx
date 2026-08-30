import { workflowProject } from "@/data/projects";

export function WorkflowSequence() {
  const project = workflowProject;

  return (
    <section
      id="workflow-form-platform"
      className="workflow-chapter"
      aria-labelledby="workflow-project-title"
    >
      <header className="workflow-heading">
        <div className="workflow-atlas-entry">
          <span className="workflow-atlas-node" aria-hidden="true" />
          <span>{project.atlasBranch}</span>
          <strong>Sequence</strong>
        </div>

        <div className="workflow-title-block">
          <h2 id="workflow-project-title">
            <span>Workflow / Form</span>
            <span>Platform</span>
          </h2>
        </div>

        <div className="workflow-purpose">
          <p>{project.purpose}</p>
          <span>{project.disclosure}</span>
        </div>
      </header>

      <figure className="workflow-sequence-field">
        <figcaption>
          Conceptual process route — from collected input to resulting action.
        </figcaption>

        <svg
          className="workflow-route"
          aria-hidden="true"
          preserveAspectRatio="none"
          viewBox="0 0 1200 420"
        >
          <path d="M 25 260 H 250 V 175 H 485 V 292 H 730 V 120 H 965 V 252 H 1175" />
        </svg>

        <ol aria-label="Workflow sequence">
          {project.stages.map((stage, index) => (
            <li data-workflow-stage={stage.id} key={stage.id}>
              <span className="workflow-stage-node" aria-hidden="true" />
              <div className="workflow-stage-cue">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{stage.phase}</span>
              </div>
              <strong>{stage.label}</strong>
              <p>{stage.responsibility}</p>
            </li>
          ))}
        </ol>
      </figure>

      <div className="workflow-closing">
        <p className="workflow-thesis">{project.thesis}</p>

        <div className="workflow-supporting-system">
          <p>
            Configurable form building connects to submission handling, workflow
            steps, API integrations, and background execution.
          </p>
          <div className="workflow-technologies">
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
