import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { SpecimenHero } from "@/components/specimen/specimen-hero";
import { SystemsWork } from "@/components/specimen/systems-work";
import { aboutExperience } from "@/data/about";
import { capabilities, capabilityProjects } from "@/data/capabilities";
import { portfolioCtas, publicProject } from "@/data/portfolio-specimen";

export default function Home() {
  return (
    <main id="top" className="portfolio-page">
      <header className="site-header">
        <a className="identity" href="#top" aria-label="Navin Kumar Yadav, top">
          <span aria-hidden="true">NK</span>
          <span>
            <strong>Navin Kumar Yadav</strong>
            <small>Software Engineer</small>
          </span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#systems">Systems</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <SpecimenHero />

      <section
        id="work"
        className="public-project"
        aria-labelledby="work-title"
      >
        <header className="public-project-heading">
          <h2 id="work-title">{publicProject.name}</h2>
          <p>{publicProject.purpose}</p>
        </header>

        <div className="project-decision-rail">
          {publicProject.annotations.map((annotation) => (
            <article key={annotation.title}>
              <span aria-hidden="true" />
              <h3>{annotation.title}</h3>
              <p>{annotation.description}</p>
            </article>
          ))}
        </div>

        <figure className="project-artifact">
          <Image
            src={publicProject.image.src}
            alt={publicProject.image.alt}
            width={publicProject.image.width}
            height={publicProject.image.height}
            sizes="(max-width: 768px) 100vw, 92vw"
          />
          <figcaption>
            <span>{publicProject.flow.join(" → ")}</span>
            <span className="unavailable-action" aria-disabled="true">
              Public link pending verification
            </span>
          </figcaption>
        </figure>
      </section>

      <SystemsWork />

      <section className="capability-index" aria-labelledby="capability-title">
        <header>
          <h2 id="capability-title">Capability evidence index.</h2>
          <p>
            What I build, the project evidence behind it, and the technologies
            that support the work.
          </p>
        </header>

        <ul className="capability-table">
          {capabilities.map((capability) => {
            const related = capabilityProjects.filter((project) =>
              capability.relatedProjects.includes(project.id),
            );
            return (
              <li key={capability.id}>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <ul aria-label={`Projects demonstrating ${capability.title}`}>
                  {related.map((project) => (
                    <li key={project.id}>{project.name}</li>
                  ))}
                </ul>
                <span>{capability.technologies.join(" · ")}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        id="about"
        className="about-section"
        aria-labelledby="about-title"
      >
        <div className="about-statement">
          <h2 id="about-title">{aboutExperience.statement}</h2>
          <p>{aboutExperience.positioning}</p>
        </div>
        <div className="about-context">
          {aboutExperience.context.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="about-direction">
            {aboutExperience.direction.description}
          </p>
        </div>
      </section>

      <footer id="contact" className="contact-footer">
        <div className="contact-statement">
          <h2>Have a system worth thinking through?</h2>
          <p>Contact details pending verification.</p>
        </div>

        <ul className="contact-actions" aria-label="Contact and profile links">
          {portfolioCtas.map((cta) => (
            <li key={cta.label}>
              {cta.status === "verified" ? (
                <a href={cta.href}>
                  {cta.label}
                  <ArrowDownRight aria-hidden="true" />
                </a>
              ) : (
                <span aria-disabled="true">
                  <strong>{cta.label}</strong>
                  <small>Unavailable</small>
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="footer-line">
          <p>© 2026 Navin Kumar Yadav</p>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </main>
  );
}
