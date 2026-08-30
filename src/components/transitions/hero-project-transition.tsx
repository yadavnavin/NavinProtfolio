"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type HeroProjectTransitionProps = {
  hero: ReactNode;
  project: ReactNode;
};

export function HeroProjectTransition({
  hero,
  project,
}: HeroProjectTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add(
        "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
        () => {
          const stage = root.querySelector<HTMLElement>(
            "[data-transition-stage]",
          );
          const destination = root.querySelector<HTMLElement>(
            "[data-project-destination]",
          );
          const heroTitle = root.querySelector<HTMLElement>(
            "[data-transition-headline]",
          );
          const supportingCopy = root.querySelector<HTMLElement>(
            ".hero-supporting-copy",
          );
          const topology = root.querySelector<HTMLElement>(".topology");
          const interfaceStage = root.querySelector<HTMLElement>(
            '[data-topology-stage="interface"]',
          );
          const interfaceLabel =
            interfaceStage?.querySelector<HTMLElement>(".topology-label");
          const interfaceNode =
            interfaceStage?.querySelector<HTMLElement>(".topology-node");
          const quietStages = root.querySelectorAll<HTMLElement>(
            '.topology-stage:not([data-topology-stage="interface"])',
          );
          const branchPath = root.querySelector<SVGPathElement>(
            "[data-transition-branch]",
          );
          const branchEndpoint = root.querySelector<HTMLElement>(
            "[data-transition-endpoint]",
          );
          const relationshipLabel = root.querySelector<HTMLElement>(
            "[data-transition-label]",
          );
          const projectBackbone =
            root.querySelector<HTMLElement>(".project-backbone");
          const projectTitle = root.querySelector<HTMLElement>(
            ".project-heading h2",
          );
          const projectPurpose =
            root.querySelector<HTMLElement>(".project-heading p");
          const imageFrame = root.querySelector<HTMLElement>(
            ".project-image-frame",
          );
          const figureCaption = root.querySelector<HTMLElement>(
            ".project-figure figcaption",
          );
          const annotations = root.querySelectorAll<HTMLElement>(
            ".project-image-annotation",
          );
          const flowItems =
            root.querySelectorAll<HTMLElement>(".project-flow li");

          if (
            !stage ||
            !destination ||
            !heroTitle ||
            !topology ||
            !interfaceLabel ||
            !interfaceNode ||
            !branchPath ||
            !branchEndpoint ||
            !relationshipLabel ||
            !projectBackbone ||
            !projectTitle ||
            !projectPurpose ||
            !imageFrame ||
            !figureCaption
          ) {
            return;
          }

          const releaseOffset = () =>
            Math.max(0, window.innerHeight * 1.3 - stage.offsetHeight);

          const positionBranch = () => {
            const stageBounds = stage.getBoundingClientRect();
            const nodeBounds = interfaceNode.getBoundingClientRect();
            const startX =
              nodeBounds.left - stageBounds.left + nodeBounds.width / 2;
            const startY =
              nodeBounds.top - stageBounds.top + nodeBounds.height / 2;
            const turnX = Math.min(stageBounds.width * 0.54, startX + 190);
            const endX = stageBounds.width * 0.82;
            const endY = Math.min(stageBounds.height * 0.76, startY + 180);

            branchPath.setAttribute(
              "d",
              `M ${startX} ${startY} H ${turnX} V ${endY} H ${endX}`,
            );
            branchEndpoint.style.setProperty("--endpoint-x", `${endX}px`);
            branchEndpoint.style.setProperty("--endpoint-y", `${endY}px`);
            relationshipLabel.style.setProperty("--endpoint-x", `${endX}px`);
            relationshipLabel.style.setProperty("--endpoint-y", `${endY}px`);
          };

          positionBranch();

          gsap.set(root, {
            paddingBottom: releaseOffset,
          });
          gsap.set(destination, { y: 0 });
          gsap.set([projectTitle, projectPurpose, figureCaption], {
            opacity: 0,
          });
          gsap.set(imageFrame, {
            clipPath: "inset(0% 100% 96% 0%)",
          });
          gsap.set(annotations, { opacity: 0, y: -32 });
          gsap.set(flowItems, { opacity: 0, x: -18 });
          gsap.set([relationshipLabel, branchEndpoint], { opacity: 0 });
          gsap.set(branchPath, { strokeDasharray: 1, strokeDashoffset: 1 });
          gsap.set(projectBackbone, { opacity: 0.24 });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: "+=130%",
              pin: stage,
              pinSpacing: false,
              scrub: 0.45,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefreshInit: positionBranch,
            },
          });

          timeline
            .to(destination, { y: releaseOffset, duration: 1 }, 0)
            .to(
              heroTitle,
              {
                xPercent: -4,
                yPercent: -18,
                scale: 0.76,
                transformOrigin: "left top",
                duration: 0.18,
              },
              0,
            )
            .to(supportingCopy, { opacity: 0.5, y: -18, duration: 0.18 }, 0)
            .to(quietStages, { opacity: 0.34, duration: 0.2 }, 0.04)
            .to(interfaceLabel, { color: "#171714", duration: 0.12 }, 0.06)
            .to(
              interfaceNode,
              {
                borderColor: "#f04b23",
                boxShadow: "0 0 0 2px #f3f0e8, 0 0 0 3px #171714",
                duration: 0.12,
              },
              0.06,
            )
            .to(
              [relationshipLabel, branchEndpoint],
              { opacity: 1, duration: 0.1 },
              0.1,
            )
            .to(branchPath, { strokeDashoffset: 0, duration: 0.2 }, 0.18)
            .to(
              imageFrame,
              { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3 },
              0.32,
            )
            .to(
              annotations,
              {
                opacity: 1,
                y: 0,
                duration: 0.24,
                stagger: 0.035,
              },
              0.5,
            )
            .to(
              flowItems,
              { opacity: 1, x: 0, duration: 0.22, stagger: 0.035 },
              0.52,
            )
            .to(projectBackbone, { opacity: 1, duration: 0.2 }, 0.62)
            .fromTo(
              projectTitle,
              { opacity: 0, y: 46 },
              { opacity: 1, y: 0, duration: 0.2 },
              0.72,
            )
            .fromTo(
              projectPurpose,
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, duration: 0.18 },
              0.76,
            )
            .to(figureCaption, { opacity: 1, duration: 0.12 }, 0.8)
            .to(
              [heroTitle, supportingCopy, topology],
              { opacity: 0, duration: 0.16 },
              0.76,
            )
            .to(
              [branchPath, relationshipLabel, branchEndpoint],
              { opacity: 0, duration: 0.08 },
              0.92,
            );

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        },
      );

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="hero-project-transition">
      <div className="hero-transition-stage" data-transition-stage>
        {hero}
        <div className="transition-geometry" aria-hidden="true">
          <svg aria-hidden="true" preserveAspectRatio="none">
            <path data-transition-branch pathLength="1" />
          </svg>
          <span
            className="transition-geometry-endpoint"
            data-transition-endpoint
          />
          <span className="transition-relationship" data-transition-label>
            Interface / SeeMyUI
          </span>
        </div>
      </div>
      {project}
    </div>
  );
}
