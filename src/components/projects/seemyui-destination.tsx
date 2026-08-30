import Image from "next/image";
import { seeMyUiProject } from "@/data/projects";
import { topologyStages } from "@/data/topology";

export function SeeMyUiDestination() {
  const project = seeMyUiProject;

  return (
    <section
      id="work"
      className="project-destination"
      aria-labelledby="seemyui-title"
    >
      <div className="project-backbone">
        <ol aria-label="System topology context">
          {topologyStages.map((stage) => (
            <li
              key={stage.id}
              data-project-branch={
                stage.label === project.branch ? true : undefined
              }
            >
              <span className="project-backbone-node" aria-hidden="true" />
              <span>{stage.label}</span>
            </li>
          ))}
        </ol>
        <div className="project-branch-route" aria-hidden="true">
          <span />
        </div>
      </div>

      <div className="project-composition">
        <header className="project-heading">
          <h2 id="seemyui-title">{project.name}</h2>
          <p>{project.purpose}</p>
        </header>

        <div className="project-figure-wrap">
          <div className="project-image-annotations" aria-hidden="true">
            {project.annotations.map((annotation) => (
              <span
                className="project-image-annotation"
                data-target={annotation.target}
                key={annotation.target}
              >
                {annotation.title}
              </span>
            ))}
          </div>

          <figure className="project-figure">
            <div className="project-image-frame">
              <span className="project-corner project-corner-nw" />
              <span className="project-corner project-corner-ne" />
              <span className="project-corner project-corner-sw" />
              <span className="project-corner project-corner-se" />
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(max-width: 767px) calc(100vw - 4.5rem), (max-width: 1280px) 76vw, 76rem"
              />
            </div>
            <figcaption>
              SeeMyUI studio — theme controls and interface preview in one
              working field.
            </figcaption>
          </figure>
        </div>

        <ol className="project-flow" aria-label="SeeMyUI conceptual flow">
          {project.flow.map((step) => (
            <li key={step}>
              <span className="project-flow-node" aria-hidden="true" />
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <dl className="project-annotation-notes">
          {project.annotations.map((annotation) => (
            <div key={annotation.target}>
              <dt>{annotation.title}</dt>
              <dd>{annotation.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
