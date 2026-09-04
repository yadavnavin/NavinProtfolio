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
  heroTopologyJourney,
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

const initialHotspot: HeroTopologyHotspot = heroTopologyHotspots[0];
const journeyHotspots = heroTopologyJourney.map((step) => {
  const hotspot = heroTopologyHotspots.find(
    (candidate) => candidate.id === step.hotspotId,
  );

  if (!hotspot) {
    throw new Error(`Missing hero journey hotspot: ${step.hotspotId}`);
  }

  return hotspot;
});

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
  const probeRouteRef = useRef<HTMLSpanElement>(null);
  const topologyBusRef = useRef<SVGSVGElement>(null);
  const topologyBaseTrunkRef = useRef<SVGPathElement>(null);
  const topologyFlowTrunkRef = useRef<SVGPathElement>(null);
  const topologyFlowBusRef = useRef<SVGPathElement>(null);
  const readoutRef = useRef<HTMLElement>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const introCompleteRef = useRef(false);
  const dragRef = useRef(false);
  const scrollLockedRef = useRef(false);
  const snappedHotspotRef = useRef<HeroTopologyHotspot | null>(initialHotspot);
  const lastHotspotRef = useRef<HeroTopologyHotspot>(initialHotspot);
  const mapPositionRef = useRef({ x: initialHotspot.x, y: initialHotspot.y });
  const activeLayerIndexRef = useRef(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(
    initialHotspot.id,
  );
  const [activeLayer, setActiveLayer] = useState<TopologyLayerId>(
    initialHotspot.layer,
  );

  const visibleHotspot =
    heroTopologyHotspots.find((hotspot) => hotspot.id === activeHotspotId) ??
    lastHotspotRef.current;
  const LensIcon = layerDetails[visibleHotspot.layer].icon;

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
      const probeRoute = probeRouteRef.current;
      if (!field || !lens || !lensMap || !probeRoute) return;

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

      gsap.killTweensOf([lens, lensMap, probeRoute]);
      gsap.set(lens, { left: 0, top: 0 });
      gsap.set(probeRoute, { left: 0 });
      gsap.to(lens, {
        x: clampedX,
        y: clampedY,
        duration,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(probeRoute, {
        x: clampedX,
        duration,
        ease: "power3.out",
        overwrite: true,
      });

      const topologyBus = topologyBusRef.current;
      const baseTrunk = topologyBaseTrunkRef.current;
      const flowTrunk = topologyFlowTrunkRef.current;
      const flowBus = topologyFlowBusRef.current;
      if (topologyBus && baseTrunk && flowTrunk && flowBus) {
        const fieldBounds = field.getBoundingClientRect();
        const busBounds = topologyBus.getBoundingClientRect();
        const lensViewportX = fieldBounds.left + clampedX;
        const busOrigin = Math.max(
          0,
          Math.min(
            1060,
            ((lensViewportX - busBounds.left) / busBounds.width) * 1000,
          ),
        );
        const trunkPath = `M${busOrigin} 0V34`;
        const busPath = `M${busOrigin} 34H100M${busOrigin} 34H900`;

        baseTrunk.setAttribute("d", trunkPath);
        flowTrunk.setAttribute("d", trunkPath);
        flowBus.setAttribute("d", busPath);
      }
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
      const journeyIndex = heroTopologyJourney.findIndex(
        (step) => step.layer === hotspot.layer,
      );
      if (journeyIndex >= 0) activeLayerIndexRef.current = journeyIndex;
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
      if (!introCompleteRef.current) return;

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
      const root = rootRef.current;
      const field = fieldRef.current;
      const lens = lensRef.current;
      const lensMap = lensMapRef.current;
      const probeRoute = probeRouteRef.current;
      if (!root || !field || !lens || !lensMap || !probeRoute) return;

      positionLensAtHotspot(initialHotspot, false);

      const backgroundMap = root.querySelector<SVGSVGElement>(
        '[data-map-surface="background"]',
      );
      const lensSurface = root.querySelector<SVGSVGElement>(
        '[data-map-surface="lens"]',
      );
      const currentPath =
        backgroundMap?.querySelector<SVGPathElement>("[data-current-map]");
      const heroHeading = root.querySelector<HTMLElement>(".hero-copy h1");
      const heroBody = root.querySelector<HTMLElement>(".hero-copy > p");
      const proofList = root.querySelector<HTMLElement>(".hero-proof-list");
      const instruction = root.querySelector<HTMLElement>(
        ".inspection-instruction",
      );
      const layerItems = gsap.utils.toArray<HTMLElement>(
        ".topology-field [data-layer]",
      );
      const routes = Array.from(
        backgroundMap?.querySelectorAll<SVGPathElement>("[data-map-route]") ??
          [],
      ).sort(
        (first, second) =>
          Number(first.dataset.revealOrder) -
          Number(second.dataset.revealOrder),
      );
      const energyRoutes = Array.from(
        backgroundMap?.querySelectorAll<SVGPathElement>("[data-map-energy]") ??
          [],
      ).sort(
        (first, second) =>
          Number(first.dataset.revealOrder) -
          Number(second.dataset.revealOrder),
      );
      const nodes = Array.from(
        backgroundMap?.querySelectorAll<SVGGraphicsElement>(
          "[data-map-node]",
        ) ?? [],
      ).sort((first, second) => {
        const distance = (node: SVGGraphicsElement) =>
          Math.hypot(
            Number(node.dataset.nodeX) - HERO_TOPOLOGY_VIEWBOX.width / 2,
            Number(node.dataset.nodeY) - HERO_TOPOLOGY_VIEWBOX.height / 2,
          );

        return distance(first) - distance(second);
      });
      const packets = Array.from(
        backgroundMap?.querySelectorAll<SVGGElement>("[data-map-packet]") ?? [],
      );
      const baseBusPaths = gsap.utils.toArray<SVGPathElement>(
        ".topology-bus-base path",
      );
      const flowBusPaths = gsap.utils.toArray<SVGPathElement>(
        "[data-flow-trunk], [data-flow-bus], [data-flow-branch]",
      );
      const flowNodes =
        gsap.utils.toArray<SVGCircleElement>("[data-flow-node]");
      const lensIcon = lens.querySelector<HTMLElement>(
        ".inspection-probe-icon",
      );

      if (
        !backgroundMap ||
        !lensSurface ||
        !currentPath ||
        !heroHeading ||
        !heroBody ||
        !proofList ||
        !instruction ||
        !lensIcon ||
        routes.length === 0
      ) {
        introCompleteRef.current = true;
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const finalLensY = Number(gsap.getProperty(lens, "y"));
      const dropStartY = -Math.max(lens.offsetHeight * 0.72, 132);
      let visibilityTrigger: ScrollTrigger | null = null;
      let listening = false;
      let started = false;
      let copyStarted = false;
      let copyTimeline: gsap.core.Timeline | null = null;

      const removeInterruptListeners = () => {
        if (!listening) return;
        listening = false;
        window.removeEventListener("wheel", finishIntro);
        window.removeEventListener("touchstart", finishIntro);
        window.removeEventListener("pointerdown", finishIntro, true);
        window.removeEventListener("keydown", handleInterruptKey);
      };

      const restoreFinalState = () => {
        gsap.set(routes, {
          clearProps: "stroke,strokeDasharray,strokeDashoffset,opacity",
        });
        gsap.set(energyRoutes, {
          clearProps: "strokeDasharray,strokeDashoffset,opacity",
        });
        gsap.set(nodes, {
          clearProps: "stroke,opacity,transform,transformOrigin",
        });
        gsap.set(packets, { clearProps: "opacity" });
        gsap.set(currentPath, { clearProps: "strokeDashoffset,opacity" });
        gsap.set([...baseBusPaths, ...flowBusPaths], {
          clearProps: "strokeDashoffset,opacity",
        });
        gsap.set(flowNodes, { clearProps: "opacity" });
        gsap.set(lens, { y: finalLensY, opacity: 1, scale: 1 });
        gsap.set(lensMap, { opacity: 1 });
        gsap.set(lensIcon, { opacity: 1, scale: 1 });
        gsap.set(probeRoute, { opacity: 1, scaleY: 1 });
        gsap.set([heroHeading, heroBody, proofList, instruction], {
          clearProps: "opacity,transform,clipPath,filter",
        });
        gsap.set(layerItems, { clearProps: "opacity,transform" });
      };

      const settleNetwork = () => {
        gsap.set(routes, {
          clearProps: "stroke,strokeDasharray,strokeDashoffset,opacity",
        });
        gsap.set(nodes, {
          clearProps: "stroke,opacity,transform,transformOrigin",
        });
        gsap.set(packets, { clearProps: "opacity" });
        gsap.set(energyRoutes, { opacity: 0 });
      };

      const completeIntro = () => {
        if (introCompleteRef.current) return;
        introCompleteRef.current = true;
        root.dataset.introState = "complete";
        restoreFinalState();
        removeInterruptListeners();
        visibilityTrigger?.kill();
        visibilityTrigger = null;
      };

      function finishIntro() {
        if (introCompleteRef.current) return;
        copyTimeline?.progress(1);
        introTimelineRef.current?.progress(1);
        completeIntro();
      }

      function handleInterruptKey(event: KeyboardEvent) {
        if (
          event.key === "ArrowDown" ||
          event.key === "ArrowUp" ||
          event.key === "PageDown" ||
          event.key === "PageUp" ||
          event.key === "Home" ||
          event.key === "End" ||
          event.key === " "
        ) {
          finishIntro();
        }
      }

      const addInterruptListeners = () => {
        if (listening) return;
        listening = true;
        window.addEventListener("wheel", finishIntro, { passive: true });
        window.addEventListener("touchstart", finishIntro, { passive: true });
        window.addEventListener("pointerdown", finishIntro, true);
        window.addEventListener("keydown", handleInterruptKey);
      };

      copyTimeline = gsap.timeline({
        paused: true,
        defaults: { overwrite: "auto" },
      });
      const timeline = gsap.timeline({
        paused: true,
        defaults: { overwrite: "auto" },
        onComplete: completeIntro,
      });
      introTimelineRef.current = timeline;

      gsap.set(heroHeading, {
        clipPath: "inset(0 0 100% 0)",
        filter: "blur(3px)",
        opacity: 0,
        y: 28,
      });
      gsap.set(heroBody, { opacity: 0, y: 18 });
      gsap.set(proofList, { opacity: 0, y: 16 });
      gsap.set(instruction, { opacity: 0, y: -6 });
      gsap.set(layerItems, { opacity: 0, y: 12 });
      gsap.set(routes, {
        stroke: "var(--rule-strong)",
        strokeDasharray: 1,
        strokeDashoffset: 1,
        opacity: 0.12,
      });
      gsap.set(energyRoutes, {
        strokeDasharray: "0.12 0.88",
        strokeDashoffset: 0.12,
        opacity: 0,
      });
      gsap.set(nodes, {
        opacity: 0,
        scale: 0.45,
        transformOrigin: "center",
      });
      gsap.set(packets, { opacity: 0 });
      gsap.set(currentPath, { strokeDashoffset: 1, opacity: 0 });
      gsap.set([...baseBusPaths, ...flowBusPaths], { opacity: 0 });
      gsap.set(flowBusPaths, { strokeDashoffset: 1 });
      gsap.set(flowNodes, { opacity: 0 });
      gsap.set(lens, { y: dropStartY, opacity: 0, scale: 0.96 });
      gsap.set(lensMap, { opacity: 0 });
      gsap.set(lensIcon, { opacity: 0, scale: 0.84 });
      gsap.set(probeRoute, { opacity: 0, scaleY: 0 });

      copyTimeline
        .to(
          heroHeading,
          {
            clipPath: "inset(0 0 0% 0)",
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            duration: 0.68,
            ease: "expo.out",
          },
          0,
        )
        .to(
          heroBody,
          { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" },
          0.14,
        )
        .to(
          proofList,
          { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" },
          0.28,
        )
        .to(
          instruction,
          { opacity: 1, y: 0, duration: 0.34, ease: "power2.out" },
          0.5,
        );

      [0, 1, 2, 3].forEach((order) => {
        const group = routes.filter(
          (route) => Number(route.dataset.revealOrder) === order,
        );
        timeline.to(
          group,
          {
            strokeDashoffset: 0,
            opacity: order === 0 ? 0.92 : 0.68,
            duration: 0.62,
            stagger: 0.014,
            ease: "power2.out",
          },
          0.04 + order * 0.08,
        );
      });

      const energyIndexes = new Map<number, number>();
      energyRoutes.forEach((route) => {
        const order = Number(route.dataset.revealOrder);
        const peerIndex = energyIndexes.get(order) ?? 0;
        energyIndexes.set(order, peerIndex + 1);
        const at = 0.18 + order * 0.11 + peerIndex * 0.012;

        timeline
          .to(route, { opacity: 0.82, duration: 0.08, ease: "power1.out" }, at)
          .to(
            route,
            { strokeDashoffset: -0.88, duration: 0.72, ease: "none" },
            at,
          )
          .to(
            route,
            { opacity: 0, duration: 0.2, ease: "power2.out" },
            at + 0.54,
          );
      });

      timeline
        .to(
          nodes,
          {
            opacity: 1,
            scale: 1,
            duration: 0.28,
            stagger: 0.006,
            ease: "expo.out",
          },
          0.25,
        )
        .to(packets, { opacity: 0.72, duration: 0.22, stagger: 0.012 }, 0.48)
        .to(
          currentPath,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.36,
            ease: "power2.out",
          },
          0.84,
        )
        .to(baseBusPaths, { opacity: 1, duration: 0.2, stagger: 0.012 }, 0.96)
        .to(
          flowBusPaths,
          {
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.28,
            stagger: 0.018,
            ease: "power2.out",
          },
          1.04,
        )
        .to(
          layerItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.055,
            ease: "expo.out",
          },
          1.02,
        )
        .to(flowNodes, { opacity: 1, duration: 0.18, stagger: 0.018 }, 1.14)
        .call(settleNetwork, [], 1.3)
        .to(
          lens,
          {
            y: finalLensY + 6,
            opacity: 1,
            scale: 1,
            duration: 0.62,
            ease: "power3.in",
          },
          1.32,
        )
        .to(lensMap, { opacity: 1, duration: 0.24, ease: "power2.out" }, 1.62)
        .to(
          lensIcon,
          { opacity: 1, scale: 1, duration: 0.25, ease: "expo.out" },
          1.74,
        )
        .to(lens, { y: finalLensY, duration: 0.18, ease: "power3.out" }, 1.94)
        .to(
          probeRoute,
          { opacity: 1, scaleY: 1, duration: 0.22, ease: "power2.out" },
          1.96,
        );

      const playCopy = () => {
        if (copyStarted) return;
        copyStarted = true;
        copyTimeline?.play(0);
      };

      const playIntro = () => {
        if (started || introCompleteRef.current) return;
        started = true;
        root.dataset.introState = "running";
        addInterruptListeners();
        playCopy();
        timeline.play(0);
      };

      introCompleteRef.current = false;
      if (reduceMotion || window.scrollY > 8) {
        finishIntro();
      } else if (window.matchMedia("(min-width: 64rem)").matches) {
        playIntro();
      } else {
        playCopy();
        visibilityTrigger = ScrollTrigger.create({
          trigger: field,
          start: "top 88%",
          once: true,
          onEnter: playIntro,
        });
      }

      return () => {
        removeInterruptListeners();
        visibilityTrigger?.kill();
        copyTimeline?.kill();
        timeline.kill();
        introTimelineRef.current = null;
        introCompleteRef.current = true;
        restoreFinalState();
        delete root.dataset.introState;
      };
    },
    { scope: rootRef, dependencies: [positionLensAtHotspot] },
  );

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 64rem) and (prefers-reduced-motion: no-preference)",
        () => {
          const stage =
            rootRef.current?.querySelector<HTMLElement>("[data-hero-stage]");
          if (!stage) return;

          const scrollTrigger = ScrollTrigger.create({
            trigger: rootRef.current,
            start: "top top+=76",
            end: "+=180%",
            pin: stage,
            pinSpacing: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const locked = self.isActive && self.progress > 0.015;
              scrollLockedRef.current = locked;

              if (locked && !snappedHotspotRef.current) {
                const fallback = lastHotspotRef.current;
                snappedHotspotRef.current = fallback;
                setActiveHotspotId(fallback.id);
                positionLensAtHotspot(fallback, true);
              }

              const normalized = Math.max(
                0,
                Math.min(0.999, (self.progress - 0.12) / 0.76),
              );
              const index = Math.min(
                journeyHotspots.length - 1,
                Math.floor(normalized * journeyHotspots.length),
              );
              if (index !== activeLayerIndexRef.current) {
                activeLayerIndexRef.current = index;
                selectHotspot(journeyHotspots[index], true);
              }
            },
            onLeave: () => {
              scrollLockedRef.current = false;
            },
            onLeaveBack: () => {
              scrollLockedRef.current = false;
              activeLayerIndexRef.current = 0;
              selectHotspot(journeyHotspots[0], true);
            },
          });

          return () => {
            scrollLockedRef.current = false;
            scrollTrigger.kill();
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
    {
      scope: rootRef,
      dependencies: [positionLensAtHotspot, selectHotspot],
    },
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
              Scroll to trace the system ·
              <br />
              Drag to inspect.
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
            <span
              key={visibleHotspot.layer}
              className="inspection-probe-icon"
              data-visible={activeHotspotId ? "" : undefined}
            >
              <LensIcon aria-hidden="true" />
            </span>
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
            ref={probeRouteRef}
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
            ref={topologyBusRef}
            className="topology-bus"
            viewBox="0 0 1000 118"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g className="topology-bus-base">
              <path ref={topologyBaseTrunkRef} d="M520 0V34" />
              <path d="M100 34H900" />
              {[100, 300, 500, 700, 900].map((x) => (
                <path key={x} d={`M${x} 34V103`} />
              ))}
            </g>
            <g className="topology-bus-flow">
              <path
                ref={topologyFlowTrunkRef}
                data-flow-trunk=""
                pathLength="1"
                d="M520 0V34"
              />
              <path
                ref={topologyFlowBusRef}
                data-flow-bus=""
                pathLength="1"
                d="M520 34H100M520 34H900"
              />
              {topologyLayers.map((layer, index) => (
                <path
                  key={layer.id}
                  data-flow-branch=""
                  data-flow-layer={layer.id}
                  data-active={activeLayer === layer.id ? "" : undefined}
                  pathLength="1"
                  d={`M${100 + index * 200} 34V103`}
                />
              ))}
              {topologyLayers.map((layer, index) => (
                <circle
                  key={layer.id}
                  data-flow-node=""
                  data-flow-layer={layer.id}
                  data-active={activeLayer === layer.id ? "" : undefined}
                  cx={100 + index * 200}
                  cy="106"
                  r="8"
                />
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
                    onClick={() => {
                      const journeyIndex = heroTopologyJourney.findIndex(
                        (step) => step.layer === layer.id,
                      );
                      const hotspot = journeyHotspots[journeyIndex];
                      if (hotspot) selectHotspot(hotspot);
                    }}
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
