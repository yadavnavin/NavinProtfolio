import { aboutExperience } from "@/data/about";

export function AboutExperience() {
  const content = aboutExperience;

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="about-atlas-resolution">
        <span className="about-atlas-label">Across the layers</span>
        <ol aria-label="Engineering layers">
          {content.atlasLayers.map((layer) => (
            <li key={layer}>{layer}</li>
          ))}
        </ol>
        <span className="about-atlas-terminal" aria-hidden="true" />
      </div>

      <div className="about-composition">
        <article className="about-copy">
          <header>
            <span>About</span>
            <p>{content.positioning}</p>
          </header>

          <h2 id="about-title">{content.statement}</h2>

          <div className="about-context">
            {content.context.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="about-direction">
            <span>{content.direction.label}</span>
            <p>{content.direction.description}</p>
          </div>
        </article>

        <aside className="experience-block" aria-labelledby="experience-title">
          <header>
            <span>Experience</span>
            <span>{content.experience.status}</span>
          </header>

          <h3 id="experience-title">{content.experience.role}</h3>
          <p>{content.experience.summary}</p>

          <ul>
            {content.experience.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
