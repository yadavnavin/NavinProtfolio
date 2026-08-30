import { MultiTenantIsolation } from "@/components/projects/multi-tenant-isolation";
import { SeeMyUiDestination } from "@/components/projects/seemyui-destination";
import { WorkflowSequence } from "@/components/projects/workflow-sequence";
import { TopologyDiagram } from "@/components/topology/topology-diagram";
import { HeroProjectTransition } from "@/components/transitions/hero-project-transition";

export default function Home() {
  return (
    <main id="top" className="atlas-page">
      <div className="atlas-frame">
        <header className="site-header">
          <a className="site-name" href="#top">
            Navin Kumar Yadav
          </a>

          <nav aria-label="Primary navigation">
            <ul className="site-navigation">
              <li>
                <a href="#work">Work</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </header>

        <HeroProjectTransition
          hero={
            <section className="hero" aria-labelledby="hero-title">
              <div className="hero-copy">
                <h1
                  id="hero-title"
                  className="hero-title"
                  data-transition-headline
                >
                  <span>Products on the surface.</span>
                  <span>Systems underneath.</span>
                </h1>
                <p className="hero-supporting-copy">
                  Software engineer building products, systems, and developer
                  tools.
                </p>
              </div>

              <TopologyDiagram />
            </section>
          }
          project={<SeeMyUiDestination />}
        />
        <MultiTenantIsolation />
        <WorkflowSequence />
      </div>
    </main>
  );
}
