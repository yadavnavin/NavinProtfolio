"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Code2, Database, PanelTop, Settings } from "lucide-react";
import { useRef, useState } from "react";
import { topologyLayers } from "@/data/portfolio-specimen";

gsap.registerPlugin(ScrollTrigger);

const layerDetails = {
  interface: {
    icon: PanelTop,
    summary: "Component library, tokens, and interactions.",
    code: ["ui/button/primary", "state=default"],
  },
  api: {
    icon: Code2,
    summary: "Typed contract powering the interaction.",
    code: ["POST /v1/projects", "201 Created"],
  },
  services: {
    icon: Box,
    summary: "Application service orchestrates the workflow.",
    code: ["ProjectService.create()", "Audit · Notify"],
  },
  data: {
    icon: Database,
    summary: "Persistent storage and read models.",
    code: ["projects (id, name…)", "events (type, …)"],
  },
  automation: {
    icon: Settings,
    summary: "CI/CD, tests, and deployments keep it reliable.",
    code: ["tests → build → deploy", "monitor → alert"],
  },
} as const;

const topologyNodes = [
  [40, 100, "circle"],
  [105, 68, "cross"],
  [155, 153, "circle"],
  [210, 114, "diamond"],
  [255, 193, "square"],
  [302, 82, "circle"],
  [350, 142, "cross"],
  [406, 57, "diamond"],
  [452, 183, "circle"],
  [507, 107, "square"],
  [556, 224, "diamond"],
  [611, 78, "circle"],
  [660, 164, "square"],
  [718, 118, "circle"],
  [772, 210, "cross"],
  [824, 90, "diamond"],
  [870, 160, "circle"],
  [118, 264, "circle"],
  [178, 321, "square"],
  [242, 244, "cross"],
  [298, 347, "diamond"],
  [365, 272, "circle"],
  [425, 330, "square"],
  [486, 260, "cross"],
  [548, 356, "circle"],
  [610, 285, "diamond"],
  [676, 342, "square"],
  [738, 276, "circle"],
  [802, 365, "cross"],
  [866, 300, "square"],
] as const;

export function SpecimenHero() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeLayer, setActiveLayer] = useState("interface");

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 64rem) and (prefers-reduced-motion: no-preference)",
        () => {
          const items = gsap.utils.toArray<HTMLElement>("[data-layer]");
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom 72%",
              scrub: 0.8,
              onUpdate: (self) => {
                const index = Math.min(
                  items.length - 1,
                  Math.floor(self.progress * items.length),
                );
                const id = items[index]?.dataset.layer;
                if (id) setActiveLayer(id);
              },
            },
          });

          timeline
            .to("[data-probe]", {
              xPercent: 56,
              yPercent: 42,
              scale: 0.86,
              ease: "power3.inOut",
            })
            .to("[data-probe-route]", { scaleY: 1, ease: "none" }, 0)
            .to(
              "[data-layer-route]",
              { scaleX: 1, stagger: 0.08, ease: "none" },
              0.12,
            );

          return () => timeline.kill();
        },
      );

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      className="specimen-experience"
      aria-labelledby="hero-title"
    >
      <div className="hero-composition">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span>Products on the surface.</span>
            <span>Systems underneath.</span>
          </h1>
          <p>
            I build production-ready products, systems, and developer tools.
            Polished interfaces connected to real APIs, services, data, and
            automation.
          </p>
          <ul className="hero-proof-list">
            <li>Design systems that ship</li>
            <li>APIs and services that power them</li>
            <li>Data flows that inform decisions</li>
            <li>Automation that keeps work reliable</li>
          </ul>
        </div>

        <div className="hero-note">
          <p>One product surface. Five connected layers underneath it.</p>
          <span aria-hidden="true" />
        </div>
      </div>

      <div className="specimen-field">
        <svg
          className="system-map"
          viewBox="0 0 900 430"
          role="img"
          aria-label="Abstract system topology connecting interface, API, services, data, and automation."
        >
          <g className="system-map-muted">
            <path d="M10 75H105V125H210V92H350V142H507V70H660V118H890" />
            <path d="M28 175H155V225H255V193H390V245H548V200H718V248H885" />
            <path d="M0 300H118V264H242V322H365V272H486V330H610V285H738V342H900" />
            <path d="M56 388H178V321H298V382H425V330H548V390H676V342H802V405H880" />
            <path d="M105 18V125M210 40V205M302 12V190M406 30V165M507 22V224M611 16V185M718 28V225M824 20V182" />
            <path d="M70 110H140M180 160H320M382 96H470M530 150H600M690 196H820" />
            <path d="M32 340H85M145 368H252M322 238H410M465 372H575M635 250H705M760 390H860" />
            <path d="M130 52H185V18M270 128H330V72M450 212H510V166M580 48H640V98M755 138H830V80" />
          </g>
          <g className="system-map-strong">
            <path d="M18 214H118V264H178V321H298" />
            <path d="M242 244H365V272H486V260H610" />
            <path d="M548 224H660V164H718V210H824" />
            <path d="M425 330H548V356H676V342H802" />
            <path d="M302 82V142H452V183H556V224" />
          </g>
          <g className="system-map-nodes">
            {topologyNodes.map(([x, y, shape]) => {
              if (shape === "circle") {
                return <circle key={`${x}-${y}`} cx={x} cy={y} r="3.2" />;
              }
              if (shape === "diamond") {
                return (
                  <rect
                    key={`${x}-${y}`}
                    x={x - 3}
                    y={y - 3}
                    width="6"
                    height="6"
                    transform={`rotate(45 ${x} ${y})`}
                  />
                );
              }
              if (shape === "cross") {
                return (
                  <path
                    key={`${x}-${y}`}
                    d={`M${x - 3} ${y - 3}L${x + 3} ${y + 3}M${x + 3} ${y - 3}L${x - 3} ${y + 3}`}
                  />
                );
              }
              return (
                <rect
                  key={`${x}-${y}`}
                  x={x - 3}
                  y={y - 3}
                  width="6"
                  height="6"
                />
              );
            })}
          </g>
          <g className="system-map-packets">
            <path d="M270 52h5m8 0h5m8 0h5" />
            <path d="M465 120h5m8 0h5m8 0h5" />
            <path d="M760 248h5m8 0h5m8 0h5" />
            <path d="M92 350h5m8 0h5m8 0h5" />
            <path d="M575 405h5m8 0h5m8 0h5" />
          </g>
        </svg>

        <div className="inspection-probe" data-probe aria-hidden="true">
          <span className="inspection-probe-grid" />
          <span className="inspection-probe-code inspection-probe-code-left">
            {"</>"}
          </span>
          <span className="inspection-probe-code inspection-probe-code-right">
            {"{ }"}
          </span>
          <span className="inspection-probe-dots">•••</span>
          <span className="inspection-probe-ring" />
        </div>
        <span className="probe-route" data-probe-route aria-hidden="true" />
      </div>

      <div className="topology-field">
        <p className="topology-introduction">
          Follow one visible decision through the layers that support it.
        </p>
        <svg
          className="topology-bus"
          viewBox="0 0 1000 118"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M560 0V34H100V103M560 34H300V103M560 34H500V103M560 34H700V103M560 34H900V103" />
          <circle cx="100" cy="106" r="8" />
          <circle cx="300" cy="106" r="8" />
          <circle cx="500" cy="106" r="8" />
          <circle cx="700" cy="106" r="8" />
          <circle cx="900" cy="106" r="8" />
        </svg>
        <ol aria-label="Product system layers">
          {topologyLayers.map((layer, index) => {
            const detail = layerDetails[layer.id as keyof typeof layerDetails];
            const Icon = detail.icon;

            return (
              <li
                key={layer.id}
                data-layer={layer.id}
                data-active={activeLayer === layer.id ? "" : undefined}
              >
                <button
                  type="button"
                  onClick={() => setActiveLayer(layer.id)}
                  aria-pressed={activeLayer === layer.id}
                >
                  <span className="topology-heading">
                    <Icon aria-hidden="true" />
                    <strong>{layer.label}</strong>
                  </span>
                  <span>{detail.summary}</span>
                  <span className="topology-code" aria-hidden="true">
                    {detail.code.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                  <span className="sr-only">
                    Layer {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
                {index < topologyLayers.length - 1 ? (
                  <span
                    className="layer-route"
                    data-layer-route
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
        <p className="sr-only" aria-live="polite">
          Selected system layer: {activeLayer}.
        </p>
      </div>
    </section>
  );
}
