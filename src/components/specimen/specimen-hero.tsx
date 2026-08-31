"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Code2, Database, PanelTop, Settings } from "lucide-react";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SystemInspectionMap } from "@/components/specimen/system-inspection-map";
import {
  HERO_TOPOLOGY_VIEWBOX,
  type HeroTopologyHotspot,
  heroTopologyHotspots,
  type TopologyLayerId,
} from "@/data/hero-topology";
import { topologyLayers } from "@/data/portfolio-specimen";

gsap.registerPlugin(ScrollTrigger);

const MAGNIFICATION = 1.72;
const SNAP_DISTANCE = 54;

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

const initialHotspot = heroTopologyHotspots[0];

function isTopologyLayerId(
  value: string | undefined,
): value is TopologyLayerId {
  return (
    value === "interface" ||
    value === "api" ||
    value === "services" ||
    value === "data" ||
    value === "automation"
  );
}

export function SpecimenHero() {
  const rootRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensMapRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLElement>(null);
  const dragRef = useRef(false);
  const scrollLockedRef = useRef(false);
  const snappedHotspotRef = useRef<HeroTopologyHotspot | null>(initialHotspot);
  const lastHotspotRef = useRef<HeroTopologyHotspot>(initialHotspot);
  const mapPositionRef = useRef({ x: initialHotspot.x, y: initialHotspot.y });
  const activeLayerIndexRef = useRef(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(
    initialHotspot.id,
  );
  const [activeLayer, setActiveLayer] = useState(initialHotspot.layer);

  const visibleHotspot =
    heroTopologyHotspots.find((hotspot) => hotspot.id === activeHotspotId) ??
    lastHotspotRef.current;

  const positionReadout = useCallback((x: number, y: number) => {
    const field = fieldRef.current;
    const lens = lensRef.current;
    const readout = readoutRef.current;
    if (!field || !lens || !readout) return;

    if (window.matchMedia("(max-width: 63.999rem)").matches) {
      gsap.set(readout, { clearProps: "transform,left,top" });
      return;
    }

    const lensRadius = lens.offsetWidth / 2;
    const readoutWidth = Math.min(232, field.clientWidth * 0.3);
    const placeRight = field.clientWidth - x > lensRadius + readoutWidth + 34;
    const readoutX = placeRight
      ? x + lensRadius + 22
      : x - lensRadius - readoutWidth - 22;
    const readoutY = Math.max(
      12,
      Math.min(field.clientHeight - readout.offsetHeight - 12, y - 42),
    );

    readout.dataset.side = placeRight ? "right" : "left";
    gsap.set(readout, { left: 0, top: 0 });
    gsap.set(readout, { x: readoutX, y: readoutY });
  }, []);

  const positionLens = useCallback(
    (x: number, y: number, animate: boolean) => {
      const field = fieldRef.current;
      const lens = lensRef.current;
      const lensMap = lensMapRef.current;
      if (!field || !lens || !lensMap) return;

      const radius = lens.offsetWidth / 2;
      const clampedX = Math.max(
        radius,
        Math.min(field.clientWidth - radius, x),
      );
      const clampedY = Math.max(
        radius,
        Math.min(field.clientHeight - radius, y),
      );
      const lensMapX = radius - clampedX * MAGNIFICATION;
      const lensMapY = radius - clampedY * MAGNIFICATION;
      const duration = animate ? 0.34 : 0;

      mapPositionRef.current = {
        x: (clampedX / field.clientWidth) * HERO_TOPOLOGY_VIEWBOX.width,
        y: (clampedY / field.clientHeight) * HERO_TOPOLOGY_VIEWBOX.height,
      };

      gsap.killTweensOf([lens, lensMap]);
      gsap.set(lens, { left: 0, top: 0 });
      gsap.to(lens, {
        x: clampedX,
        y: clampedY,
        duration,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(lensMap, {
        x: lensMapX,
        y: lensMapY,
        width: field.clientWidth * MAGNIFICATION,
        height: field.clientHeight * MAGNIFICATION,
        duration,
        ease: "power3.out",
        overwrite: true,
      });

      positionReadout(clampedX, clampedY);
    },
    [positionReadout],
  );

  const positionLensAtHotspot = useCallback(
    (hotspot: HeroTopologyHotspot, animate = true) => {
      const field = fieldRef.current;
      if (!field) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      positionLens(
        (hotspot.x / HERO_TOPOLOGY_VIEWBOX.width) * field.clientWidth,
        (hotspot.y / HERO_TOPOLOGY_VIEWBOX.height) * field.clientHeight,
        animate && !reduceMotion,
      );
    },
    [positionLens],
  );

  const selectHotspot = useCallback(
    (hotspot: HeroTopologyHotspot, animate = true) => {
      snappedHotspotRef.current = hotspot;
      lastHotspotRef.current = hotspot;
      setActiveHotspotId(hotspot.id);
      setActiveLayer(hotspot.layer);
      positionLensAtHotspot(hotspot, animate);
    },
    [positionLensAtHotspot],
  );

  const findNearestHotspot = useCallback((x: number, y: number) => {
    const field = fieldRef.current;
    if (!field) return null;

    let nearest: HeroTopologyHotspot | null = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (const hotspot of heroTopologyHotspots) {
      const hotspotX =
        (hotspot.x / HERO_TOPOLOGY_VIEWBOX.width) * field.clientWidth;
      const hotspotY =
        (hotspot.y / HERO_TOPOLOGY_VIEWBOX.height) * field.clientHeight;
      const distance = Math.hypot(x - hotspotX, y - hotspotY);

      if (distance < nearestDistance) {
        nearest = hotspot;
        nearestDistance = distance;
      }
    }

    return nearestDistance <= SNAP_DISTANCE ? nearest : null;
  }, []);

  const updateDragPosition = useCallback(
    (clientX: number, clientY: number) => {
      const field = fieldRef.current;
      if (!field) return;

      const bounds = field.getBoundingClientRect();
      let x = clientX - bounds.left;
      let y = clientY - bounds.top;
      const nearest = findNearestHotspot(x, y);

      if (nearest) {
        const hotspotX =
          (nearest.x / HERO_TOPOLOGY_VIEWBOX.width) * field.clientWidth;
        const hotspotY =
          (nearest.y / HERO_TOPOLOGY_VIEWBOX.height) * field.clientHeight;
        x = x * 0.72 + hotspotX * 0.28;
        y = y * 0.72 + hotspotY * 0.28;

        if (snappedHotspotRef.current?.id !== nearest.id) {
          snappedHotspotRef.current = nearest;
          lastHotspotRef.current = nearest;
          setActiveHotspotId(nearest.id);
          setActiveLayer(nearest.layer);
        }
      } else if (snappedHotspotRef.current) {
        snappedHotspotRef.current = null;
        setActiveHotspotId(null);
      }

      positionLens(x, y, false);
    },
    [findNearestHotspot, positionLens],
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const canDrag = window.matchMedia(
        "(min-width: 64rem) and (pointer: fine)",
      ).matches;
      if (!canDrag || scrollLockedRef.current) return;

      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.dataset.dragging = "";
      dragRef.current = true;
      updateDragPosition(event.clientX, event.clientY);
    },
    [updateDragPosition],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragRef.current || scrollLockedRef.current) return;
      updateDragPosition(event.clientX, event.clientY);
    },
    [updateDragPosition],
  );

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragRef.current) return;
      dragRef.current = false;
      event.currentTarget.removeAttribute("data-dragging");
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      if (snappedHotspotRef.current) {
        positionLensAtHotspot(snappedHotspotRef.current, true);
      }
    },
    [positionLensAtHotspot],
  );

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const restoreLensPosition = () => {
      const position = mapPositionRef.current;
      positionLens(
        (position.x / HERO_TOPOLOGY_VIEWBOX.width) * field.clientWidth,
        (position.y / HERO_TOPOLOGY_VIEWBOX.height) * field.clientHeight,
        false,
      );
    };

    restoreLensPosition();
    const observer = new ResizeObserver(restoreLensPosition);
    observer.observe(field);
    return () => observer.disconnect();
  }, [positionLens]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 64rem) and (prefers-reduced-motion: no-preference)",
        () => {
          const stage =
            rootRef.current?.querySelector<HTMLElement>("[data-hero-stage]");
          const layerItems = gsap.utils.toArray<HTMLElement>("[data-layer]");
          const flowBranches =
            gsap.utils.toArray<SVGPathElement>("[data-flow-branch]");
          const flowNodes =
            gsap.utils.toArray<SVGCircleElement>("[data-flow-node]");
          if (!stage) return;

          gsap.set("[data-current-map]", { strokeDashoffset: 1 });
          gsap.set("[data-flow-trunk], [data-flow-bus], [data-flow-branch]", {
            strokeDashoffset: 1,
          });
          gsap.set(flowNodes, { scale: 0, transformOrigin: "center" });

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top+=76",
              end: "+=140%",
              pin: stage,
              pinSpacing: true,
              scrub: 0.72,
              anticipatePin: 1,
              onUpdate: (self) => {
                const locked = self.progress > 0.015;
                scrollLockedRef.current = locked;

                if (locked && !snappedHotspotRef.current) {
                  const fallback = lastHotspotRef.current;
                  snappedHotspotRef.current = fallback;
                  setActiveHotspotId(fallback.id);
                  positionLensAtHotspot(fallback, true);
                }

                const normalized = Math.max(
                  0,
                  Math.min(0.999, (self.progress - 0.2) / 0.68),
                );
                const index = Math.min(4, Math.floor(normalized * 5));
                if (index !== activeLayerIndexRef.current) {
                  activeLayerIndexRef.current = index;
                  const id = layerItems[index]?.dataset.layer;
                  if (isTopologyLayerId(id)) setActiveLayer(id);
                }
              },
              onLeaveBack: () => {
                scrollLockedRef.current = false;
                activeLayerIndexRef.current = 0;
                setActiveLayer(lastHotspotRef.current.layer);
              },
            },
          });

          timeline
            .to(
              "[data-packet]",
              { opacity: 0.82, duration: 0.1, stagger: 0.004 },
              0,
            )
            .to(
              "[data-current-map]",
              { strokeDashoffset: 0, duration: 0.16 },
              0.02,
            )
            .to(
              "[data-flow-trunk]",
              { strokeDashoffset: 0, duration: 0.1 },
              0.15,
            )
            .to(
              "[data-flow-bus]",
              { strokeDashoffset: 0, duration: 0.11 },
              0.22,
            );

          flowBranches.forEach((branch, index) => {
            const at = 0.31 + index * 0.12;
            timeline
              .to(branch, { strokeDashoffset: 0, duration: 0.1 }, at)
              .to(flowNodes[index], { scale: 1, duration: 0.07 }, at + 0.06);
          });

          return () => {
            scrollLockedRef.current = false;
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        },
      );

      media.add(
        "(max-width: 63.999rem) and (prefers-reduced-motion: no-preference)",
        () => {
          const layerItems = gsap.utils.toArray<HTMLElement>("[data-layer]");
          const triggers = layerItems.map((item, index) => {
            const route = item.querySelector<HTMLElement>(
              "[data-mobile-layer-route]",
            );
            if (route) gsap.set(route, { scaleY: 0 });

            return ScrollTrigger.create({
              trigger: item,
              start: "top 72%",
              end: "bottom 48%",
              onEnter: () => {
                const id = item.dataset.layer;
                if (isTopologyLayerId(id)) setActiveLayer(id);
                if (route) {
                  gsap.to(route, {
                    scaleY: 1,
                    duration: 0.38,
                    ease: "power3.out",
                  });
                }
              },
              onEnterBack: () => {
                const id = item.dataset.layer;
                if (isTopologyLayerId(id)) setActiveLayer(id);
              },
              onLeaveBack: () => {
                if (route && index > 0) {
                  gsap.to(route, { scaleY: 0, duration: 0.22 });
                }
              },
            });
          });

          return () => {
            triggers.forEach((trigger) => {
              trigger.kill();
            });
          };
        },
      );

      return () => media.revert();
    },
    { scope: rootRef, dependencies: [positionLensAtHotspot] },
  );

  return (
    <section
      ref={rootRef}
      className="specimen-experience"
      aria-labelledby="hero-title"
    >
      <div className="specimen-stage" data-hero-stage="">
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
        </div>

        <div ref={fieldRef} className="specimen-field">
          <SystemInspectionMap
            activeRouteId={visibleHotspot.routeId}
            feedPath={visibleHotspot.feedPath}
          />

          <p className="inspection-instruction">
            <span className="inspection-instruction-desktop">
              Drag the lens to inspect the system.
            </span>
            <span className="inspection-instruction-mobile">
              Tap a node to inspect the system.
            </span>
          </p>

          <div className="topology-hotspots">
            {heroTopologyHotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                type="button"
                className="topology-hotspot"
                style={{
                  left: `${(hotspot.x / HERO_TOPOLOGY_VIEWBOX.width) * 100}%`,
                  top: `${(hotspot.y / HERO_TOPOLOGY_VIEWBOX.height) * 100}%`,
                }}
                aria-label={`Inspect ${hotspot.label}`}
                aria-pressed={activeHotspotId === hotspot.id}
                onClick={() => selectHotspot(hotspot)}
                onFocus={() => selectHotspot(hotspot)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>

          <div
            ref={lensRef}
            className="inspection-probe"
            data-probe=""
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            aria-hidden="true"
          >
            <div ref={lensMapRef} className="inspection-probe-map">
              <SystemInspectionMap
                activeRouteId={visibleHotspot.routeId}
                feedPath={visibleHotspot.feedPath}
                magnified
              />
            </div>
            <span className="inspection-probe-glare" />
            <span className="inspection-probe-ring" />
          </div>

          <aside
            ref={readoutRef}
            className="inspection-readout"
            data-visible={activeHotspotId ? "" : undefined}
            aria-live="polite"
          >
            <span>{visibleHotspot.layer}</span>
            <strong>{visibleHotspot.label}</strong>
            <p>{visibleHotspot.summary}</p>
          </aside>

          <span
            className="probe-route"
            data-probe-route=""
            aria-hidden="true"
          />
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
            <g className="topology-bus-base">
              <path d="M634 0V34" />
              <path d="M100 34H900" />
              {[100, 300, 500, 700, 900].map((x) => (
                <path key={x} d={`M${x} 34V103`} />
              ))}
            </g>
            <g className="topology-bus-flow">
              <path data-flow-trunk="" pathLength="1" d="M634 0V34" />
              <path
                data-flow-bus=""
                pathLength="1"
                d="M634 34H100M634 34H900"
              />
              {[100, 300, 500, 700, 900].map((x) => (
                <path
                  key={x}
                  data-flow-branch=""
                  pathLength="1"
                  d={`M${x} 34V103`}
                />
              ))}
              {[100, 300, 500, 700, 900].map((x) => (
                <circle key={x} data-flow-node="" cx={x} cy="106" r="8" />
              ))}
            </g>
          </svg>
          <ol aria-label="Product system layers">
            {topologyLayers.map((layer) => {
              const detail = layerDetails[layer.id];
              const Icon = detail.icon;

              return (
                <li
                  key={layer.id}
                  data-layer={layer.id}
                  data-active={activeLayer === layer.id ? "" : undefined}
                >
                  <span
                    className="layer-route"
                    data-mobile-layer-route=""
                    aria-hidden="true"
                  />
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
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="sr-only" aria-live="polite">
            Selected system layer: {activeLayer}.
          </p>
        </div>
      </div>
    </section>
  );
}
