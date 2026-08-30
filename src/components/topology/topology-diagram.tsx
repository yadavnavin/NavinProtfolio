"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type CSSProperties, useId, useState } from "react";
import { type TopologyStage, topologyStages } from "@/data/topology";
import { useTopologyNavigation } from "./use-topology-navigation";

const routeTransition = { duration: 0.18, ease: "easeOut" } as const;

type RouteEvidenceProps = {
  stage: TopologyStage;
  detailId: string;
  reducedMotion: boolean;
  showEvidence: boolean;
  mobile?: boolean;
};

function RouteEvidence({
  stage,
  detailId,
  reducedMotion,
  showEvidence,
  mobile = false,
}: RouteEvidenceProps) {
  const evidence = stage.relatedProjectEvidence;

  return (
    <motion.div
      id={detailId}
      className={
        mobile ? "topology-detail topology-detail-mobile" : "topology-detail"
      }
      initial={reducedMotion ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
      transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
    >
      <p className="topology-description">{stage.description}</p>

      {evidence && showEvidence ? (
        <div className="topology-evidence">
          <div className="topology-evidence-heading">
            <span>Related project</span>
            <strong>{evidence.project}</strong>
          </div>
          <p>{evidence.relationship}</p>
          <ol
            className="topology-flow"
            aria-label={`${evidence.project} conceptual public flow`}
          >
            {evidence.conceptualFlow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      ) : null}
    </motion.div>
  );
}

export function TopologyDiagram() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusWithin, setFocusWithin] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const detailId = useId();
  const { focusIndex, handleKeyDown, itemRefs, setFocusIndex } =
    useTopologyNavigation({ itemCount: topologyStages.length });

  const previewIndex =
    activeIndex ?? hoveredIndex ?? (focusWithin ? focusIndex : null);
  const previewStage =
    previewIndex === null ? null : topologyStages[previewIndex];
  const announcement =
    activeIndex === null
      ? "No topology stage selected."
      : `${topologyStages[activeIndex].label} stage selected.`;

  function activate(index: number) {
    setActiveIndex(index);
    setHoveredIndex(null);
  }

  return (
    <fieldset
      className="topology"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocusWithin(false);
        }
      }}
      onFocus={() => setFocusWithin(true)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <legend className="sr-only">Interactive product system topology</legend>
      <p id="topology-instructions" className="sr-only">
        Explore the six-stage system. Use arrow keys to move, Enter or Space to
        select a stage, and Escape to clear the selection.
      </p>

      <ol
        className="topology-list"
        aria-label="Product system topology"
        aria-describedby="topology-instructions"
      >
        {topologyStages.map((stage, index) => {
          const isActive = activeIndex === index;
          const isPreviewed = previewIndex === index;
          const routeIsRelated =
            previewIndex !== null &&
            (previewIndex === index || previewIndex === index + 1);

          return (
            <li
              className="topology-stage"
              data-active={isActive || undefined}
              data-previewed={isPreviewed || undefined}
              data-topology-stage={stage.id}
              key={stage.id}
            >
              <button
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                className="topology-control"
                type="button"
                tabIndex={focusIndex === index ? 0 : -1}
                aria-pressed={isActive}
                onClick={() => activate(index)}
                onFocus={() => setFocusIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setActiveIndex(null);
                    return;
                  }
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    activate(index);
                    return;
                  }
                  handleKeyDown(event, index);
                }}
                onMouseEnter={() => {
                  if (activeIndex === null) setHoveredIndex(index);
                }}
                onPointerUp={() => activate(index)}
              >
                <span className="topology-label">{stage.label}</span>
                <motion.span
                  className="topology-node"
                  aria-hidden="true"
                  animate={{ scale: isPreviewed ? 1.08 : 1 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.16,
                    ease: "easeOut",
                  }}
                >
                  <motion.span
                    className="topology-node-core"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.16 }}
                  />
                </motion.span>
              </button>

              {index < topologyStages.length - 1 ? (
                <motion.span
                  className="topology-path"
                  aria-hidden="true"
                  data-related={routeIsRelated || undefined}
                  animate={{
                    backgroundColor: routeIsRelated ? "#171714" : "#a7b0af",
                    color: routeIsRelated ? "#171714" : "#a7b0af",
                  }}
                  transition={{
                    ...routeTransition,
                    duration: reducedMotion ? 0 : routeTransition.duration,
                  }}
                />
              ) : null}

              <div className="topology-mobile-detail-slot">
                <AnimatePresence initial={false}>
                  {isPreviewed ? (
                    <RouteEvidence
                      key={stage.id}
                      stage={stage}
                      detailId={`${detailId}-mobile`}
                      reducedMotion={reducedMotion}
                      showEvidence={isActive}
                      mobile
                    />
                  ) : null}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>

      <div
        className="topology-desktop-detail-slot"
        style={
          {
            "--detail-offset": `${Math.min((previewIndex ?? 0) * 20, 40)}%`,
          } as CSSProperties
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          {previewStage ? (
            <RouteEvidence
              key={previewStage.id}
              stage={previewStage}
              detailId={detailId}
              reducedMotion={reducedMotion}
              showEvidence={activeIndex === previewIndex}
            />
          ) : null}
        </AnimatePresence>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </fieldset>
  );
}
