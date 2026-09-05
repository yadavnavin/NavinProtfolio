export type TopologyLayerId =
  | "interface"
  | "api"
  | "services"
  | "data"
  | "automation";

export type HeroTopologyRoute = {
  id: string;
  d: string;
  tone: "muted" | "strong";
  revealOrder: 0 | 1 | 2 | 3;
};

export type HeroTopologyNode = {
  id: string;
  x: number;
  y: number;
  shape: "circle" | "square" | "diamond" | "cross" | "port";
  revealOrder: HeroTopologyRoute["revealOrder"];
};

export type HeroTopologyPacket = {
  id: string;
  x: number;
  y: number;
  axis: "horizontal" | "vertical";
  routeId: string;
};

export type HeroTopologySignalNode = {
  x: number;
  y: number;
  filled?: boolean;
};

export type HeroTopologyHotspot = {
  id: string;
  x: number;
  y: number;
  label: string;
  layer: TopologyLayerId;
  summary: string;
  routeId: string;
  feedPath: string;
  signalNodes: readonly HeroTopologySignalNode[];
};

export const HERO_TOPOLOGY_VIEWBOX = {
  width: 640,
  height: 640,
} as const;

type RouteSeed = Readonly<{
  id: string;
  tone: HeroTopologyRoute["tone"];
  revealOrder: HeroTopologyRoute["revealOrder"];
  points: readonly (readonly [number, number])[];
}>;

function pointsToPath(points: RouteSeed["points"]) {
  return points
    .map(([x, y], index) => {
      if (index === 0) {
        return `M${x} ${y}`;
      }

      const [previousX, previousY] = points[index - 1];
      if (previousY === y) {
        return `H${x}`;
      }
      if (previousX === x) {
        return `V${y}`;
      }
      return `L${x} ${y}`;
    })
    .join("");
}

/**
 * A full-edge systems field: short and medium orthogonal routes enter from
 * every side, then tighten into a deliberate junction behind the lens.
 */
const routeSeeds = [
  {
    id: "route-interface",
    tone: "strong",
    revealOrder: 0,
    points: [
      [306, 330],
      [270, 330],
      [270, 350],
      [218, 350],
      [218, 328],
      [142, 328],
      [142, 300],
      [70, 300],
      [70, 276],
      [8, 276],
    ],
  },
  {
    id: "route-api",
    tone: "strong",
    revealOrder: 0,
    points: [
      [306, 314],
      [306, 258],
      [278, 258],
      [278, 212],
      [250, 212],
      [250, 148],
      [226, 148],
      [226, 82],
      [204, 82],
      [204, 8],
    ],
  },
  {
    id: "route-services",
    tone: "strong",
    revealOrder: 0,
    points: [
      [326, 314],
      [382, 314],
      [382, 284],
      [438, 284],
      [438, 248],
      [504, 248],
      [504, 228],
      [570, 228],
      [570, 252],
      [632, 252],
    ],
  },
  {
    id: "route-data",
    tone: "strong",
    revealOrder: 0,
    points: [
      [324, 344],
      [324, 396],
      [350, 396],
      [350, 452],
      [382, 452],
      [382, 514],
      [414, 514],
      [414, 568],
      [414, 632],
    ],
  },
  {
    id: "route-automation",
    tone: "strong",
    revealOrder: 0,
    points: [
      [334, 340],
      [388, 340],
      [388, 372],
      [450, 372],
      [450, 420],
      [520, 420],
      [520, 472],
      [632, 472],
    ],
  },
  {
    id: "route-06",
    tone: "muted",
    revealOrder: 2,
    points: [
      [154, 156],
      [118, 156],
      [118, 122],
      [82, 122],
      [82, 78],
      [44, 78],
    ],
  },
  {
    id: "route-09",
    tone: "strong",
    revealOrder: 2,
    points: [
      [8, 206],
      [56, 206],
      [56, 234],
      [112, 234],
      [112, 260],
      [170, 260],
    ],
  },
  {
    id: "route-10",
    tone: "muted",
    revealOrder: 2,
    points: [
      [8, 364],
      [72, 364],
      [72, 338],
      [126, 338],
      [126, 316],
      [174, 316],
    ],
  },
  {
    id: "route-11",
    tone: "strong",
    revealOrder: 2,
    points: [
      [8, 444],
      [58, 444],
      [58, 410],
      [108, 410],
      [108, 382],
      [158, 382],
    ],
  },
  {
    id: "route-12",
    tone: "muted",
    revealOrder: 3,
    points: [
      [8, 520],
      [80, 520],
      [80, 486],
      [146, 486],
      [146, 452],
      [190, 452],
    ],
  },
  {
    id: "route-13",
    tone: "strong",
    revealOrder: 3,
    points: [
      [58, 632],
      [58, 586],
      [96, 586],
      [96, 552],
      [150, 552],
    ],
  },
  {
    id: "route-14",
    tone: "muted",
    revealOrder: 3,
    points: [
      [150, 632],
      [150, 574],
      [184, 574],
      [184, 526],
      [226, 526],
    ],
  },
  {
    id: "route-15",
    tone: "strong",
    revealOrder: 2,
    points: [
      [238, 8],
      [238, 56],
      [260, 56],
      [260, 102],
      [300, 102],
    ],
  },
  {
    id: "route-16",
    tone: "muted",
    revealOrder: 2,
    points: [
      [314, 8],
      [314, 82],
      [340, 82],
      [340, 132],
      [384, 132],
    ],
  },
  {
    id: "route-17",
    tone: "strong",
    revealOrder: 2,
    points: [
      [374, 8],
      [374, 62],
      [404, 62],
      [404, 108],
      [450, 108],
    ],
  },
  {
    id: "route-18",
    tone: "strong",
    revealOrder: 3,
    points: [
      [454, 8],
      [454, 74],
      [492, 74],
      [492, 118],
      [548, 118],
      [548, 150],
      [632, 150],
    ],
  },
  {
    id: "route-21",
    tone: "strong",
    revealOrder: 2,
    points: [
      [632, 172],
      [592, 172],
      [592, 196],
      [544, 196],
    ],
  },
  {
    id: "route-22",
    tone: "strong",
    revealOrder: 2,
    points: [
      [632, 300],
      [584, 300],
      [584, 326],
      [528, 326],
    ],
  },
  {
    id: "route-23",
    tone: "muted",
    revealOrder: 2,
    points: [
      [632, 372],
      [590, 372],
      [590, 398],
      [542, 398],
    ],
  },
  {
    id: "route-24",
    tone: "strong",
    revealOrder: 2,
    points: [
      [632, 426],
      [602, 426],
      [602, 448],
      [566, 448],
    ],
  },
  {
    id: "route-25",
    tone: "muted",
    revealOrder: 3,
    points: [
      [632, 536],
      [586, 536],
      [586, 504],
      [536, 504],
    ],
  },
  {
    id: "route-27",
    tone: "muted",
    revealOrder: 3,
    points: [
      [514, 632],
      [514, 576],
      [486, 576],
      [486, 532],
      [452, 532],
    ],
  },
  {
    id: "route-28",
    tone: "strong",
    revealOrder: 3,
    points: [
      [470, 632],
      [470, 590],
      [438, 590],
      [438, 552],
      [400, 552],
    ],
  },
  {
    id: "route-30",
    tone: "strong",
    revealOrder: 3,
    points: [
      [248, 632],
      [248, 570],
      [214, 570],
      [214, 526],
      [176, 526],
    ],
  },
  {
    id: "route-31",
    tone: "muted",
    revealOrder: 1,
    points: [
      [174, 226],
      [220, 226],
      [220, 250],
      [270, 250],
    ],
  },
  {
    id: "route-32",
    tone: "strong",
    revealOrder: 1,
    points: [
      [192, 286],
      [238, 286],
      [238, 306],
      [286, 306],
    ],
  },
  {
    id: "route-33",
    tone: "muted",
    revealOrder: 1,
    points: [
      [178, 398],
      [228, 398],
      [228, 370],
      [282, 370],
    ],
  },
  {
    id: "route-34",
    tone: "strong",
    revealOrder: 1,
    points: [
      [214, 452],
      [258, 452],
      [258, 420],
      [294, 420],
    ],
  },
  {
    id: "route-35",
    tone: "muted",
    revealOrder: 1,
    points: [
      [354, 184],
      [400, 184],
      [400, 210],
      [452, 210],
    ],
  },
  {
    id: "route-36",
    tone: "strong",
    revealOrder: 1,
    points: [
      [368, 244],
      [414, 244],
      [414, 266],
      [460, 266],
    ],
  },
  {
    id: "route-37",
    tone: "muted",
    revealOrder: 1,
    points: [
      [358, 412],
      [406, 412],
      [406, 448],
      [454, 448],
    ],
  },
  {
    id: "route-38",
    tone: "strong",
    revealOrder: 1,
    points: [
      [390, 488],
      [432, 488],
      [432, 514],
      [480, 514],
    ],
  },
  {
    id: "route-39",
    tone: "muted",
    revealOrder: 2,
    points: [
      [474, 178],
      [518, 178],
      [518, 200],
      [560, 200],
    ],
  },
  {
    id: "route-40",
    tone: "muted",
    revealOrder: 1,
    points: [
      [484, 344],
      [528, 344],
      [528, 366],
      [570, 366],
    ],
  },
  {
    id: "route-41",
    tone: "muted",
    revealOrder: 2,
    points: [
      [100, 180],
      [138, 180],
      [138, 204],
      [178, 204],
    ],
  },
  {
    id: "route-44",
    tone: "muted",
    revealOrder: 2,
    points: [
      [82, 248],
      [126, 248],
      [126, 272],
      [188, 272],
    ],
  },
  {
    id: "route-45",
    tone: "muted",
    revealOrder: 1,
    points: [
      [188, 110],
      [188, 170],
      [214, 170],
      [214, 230],
      [246, 230],
      [246, 290],
    ],
  },
  {
    id: "route-46",
    tone: "muted",
    revealOrder: 1,
    points: [
      [390, 118],
      [390, 180],
      [420, 180],
      [420, 250],
      [470, 250],
      [470, 310],
    ],
  },
  {
    id: "route-47",
    tone: "strong",
    revealOrder: 1,
    points: [
      [190, 360],
      [190, 420],
      [230, 420],
      [230, 500],
      [270, 500],
      [270, 590],
    ],
  },
  {
    id: "route-48",
    tone: "muted",
    revealOrder: 1,
    points: [
      [366, 360],
      [366, 430],
      [406, 430],
      [406, 500],
      [456, 500],
      [456, 580],
    ],
  },
] as const satisfies readonly RouteSeed[];

export const heroTopologyRoutes: readonly HeroTopologyRoute[] = routeSeeds.map(
  ({ id, tone, revealOrder, points }) => ({
    id,
    tone,
    revealOrder,
    d: pointsToPath(points),
  }),
);

const nodeShapes = ["circle", "square", "diamond", "cross", "port"] as const;

export const heroTopologyNodes: readonly HeroTopologyNode[] =
  routeSeeds.flatMap((route, routeIndex) =>
    route.points
      .filter(
        (_, pointIndex) =>
          pointIndex === 0 ||
          pointIndex === route.points.length - 1 ||
          ((route.revealOrder <= 1 || route.tone === "strong") &&
            pointIndex === Math.floor(route.points.length / 2)),
      )
      .map(([x, y], pointIndex) => ({
        id: `node-${route.id}-${pointIndex}`,
        x,
        y,
        shape: nodeShapes[(routeIndex + pointIndex) % nodeShapes.length],
        revealOrder: route.revealOrder,
      })),
  );

export const heroTopologyPackets: readonly HeroTopologyPacket[] = [
  {
    id: "packet-01",
    x: 314,
    y: 286,
    axis: "vertical",
    routeId: "route-interface",
  },
  { id: "packet-02", x: 226, y: 164, axis: "vertical", routeId: "route-api" },
  {
    id: "packet-03",
    x: 468,
    y: 248,
    axis: "horizontal",
    routeId: "route-services",
  },
  { id: "packet-04", x: 382, y: 472, axis: "vertical", routeId: "route-data" },
  {
    id: "packet-05",
    x: 474,
    y: 420,
    axis: "horizontal",
    routeId: "route-automation",
  },
  { id: "packet-07", x: 76, y: 234, axis: "horizontal", routeId: "route-09" },
  { id: "packet-08", x: 80, y: 410, axis: "horizontal", routeId: "route-11" },
  { id: "packet-10", x: 404, y: 78, axis: "vertical", routeId: "route-17" },
  { id: "packet-11", x: 510, y: 118, axis: "horizontal", routeId: "route-18" },
  { id: "packet-12", x: 606, y: 196, axis: "horizontal", routeId: "route-21" },
  { id: "packet-14", x: 606, y: 448, axis: "horizontal", routeId: "route-24" },
  { id: "packet-15", x: 486, y: 548, axis: "vertical", routeId: "route-27" },
] as const;

const initialSignalNodes = [
  { x: 281, y: 8, filled: true },
  { x: 281, y: 84 },
  { x: 281, y: 174, filled: true },
  { x: 314, y: 250 },
  { x: 314, y: 330, filled: true },
  { x: 314, y: 398 },
  { x: 342, y: 500, filled: true },
  { x: 342, y: 590 },
  { x: 342, y: 632, filled: true },
] as const;

const interfaceSignalNodes = [
  { x: 8, y: 276, filled: true },
  { x: 142, y: 300 },
  { x: 218, y: 328, filled: true },
  { x: 306, y: 330 },
] as const;

const apiSignalNodes = [
  { x: 204, y: 8, filled: true },
  { x: 226, y: 148 },
  { x: 278, y: 258, filled: true },
  { x: 306, y: 314 },
] as const;

const servicesSignalNodes = [
  { x: 632, y: 252, filled: true },
  { x: 570, y: 252 },
  { x: 504, y: 228, filled: true },
  { x: 438, y: 248 },
  { x: 326, y: 314, filled: true },
] as const;

const dataSignalNodes = [
  { x: 414, y: 632, filled: true },
  { x: 414, y: 568 },
  { x: 382, y: 452, filled: true },
  { x: 350, y: 396 },
  { x: 324, y: 344, filled: true },
] as const;

const automationSignalNodes = [
  { x: 632, y: 472, filled: true },
  { x: 520, y: 472 },
  { x: 450, y: 420, filled: true },
  { x: 388, y: 372 },
  { x: 334, y: 340, filled: true },
] as const;

export const heroTopologyHotspots = [
  {
    id: "interface-request",
    x: 312,
    y: 330,
    label: "Interface request",
    layer: "interface",
    summary: "A visible product action enters the system as a typed request.",
    routeId: "route-interface",
    feedPath: "M281 8V174H314V398H342V632",
    signalNodes: initialSignalNodes,
  },
  {
    id: "accessible-state",
    x: 142,
    y: 300,
    label: "Accessible state",
    layer: "interface",
    summary: "Component state keeps interaction behavior clear and operable.",
    routeId: "route-interface",
    feedPath: "M8 276H70V300H142V328H218V350H270V330H306",
    signalNodes: interfaceSignalNodes,
  },
  {
    id: "editor-command",
    x: 218,
    y: 328,
    label: "Editor command",
    layer: "interface",
    summary: "Interface intent is separated from the work that fulfills it.",
    routeId: "route-interface",
    feedPath: "M8 276H70V300H142V328H218V350H270V330H306",
    signalNodes: interfaceSignalNodes,
  },
  {
    id: "typed-contract",
    x: 278,
    y: 258,
    label: "Typed contract",
    layer: "api",
    summary: "The request crosses a typed boundary before system work begins.",
    routeId: "route-api",
    feedPath: "M204 8V82H226V148H250V212H278V258H306V314",
    signalNodes: apiSignalNodes,
  },
  {
    id: "request-boundary",
    x: 250,
    y: 212,
    label: "Request boundary",
    layer: "api",
    summary: "Validation and access checks protect the application boundary.",
    routeId: "route-api",
    feedPath: "M204 8V82H226V148H250V212H278V258H306V314",
    signalNodes: apiSignalNodes,
  },
  {
    id: "workflow-service",
    x: 438,
    y: 248,
    label: "Workflow service",
    layer: "services",
    summary: "Application logic coordinates the next dependable action.",
    routeId: "route-services",
    feedPath: "M632 252H570V228H504V248H438V284H382V314H326",
    signalNodes: servicesSignalNodes,
  },
  {
    id: "access-policy",
    x: 504,
    y: 228,
    label: "Access policy",
    layer: "services",
    summary: "Service rules keep workflow and tenant context aligned.",
    routeId: "route-services",
    feedPath: "M632 252H570V228H504V248H438V284H382V314H326",
    signalNodes: servicesSignalNodes,
  },
  {
    id: "persistence-write",
    x: 382,
    y: 452,
    label: "Persistence write",
    layer: "data",
    summary: "Relational data records the durable result of the workflow.",
    routeId: "route-data",
    feedPath: "M414 632V568V514H382V452H350V396H324V344",
    signalNodes: dataSignalNodes,
  },
  {
    id: "read-model",
    x: 350,
    y: 396,
    label: "Read model",
    layer: "data",
    summary: "Stored state is shaped for the product surface that reads it.",
    routeId: "route-data",
    feedPath: "M414 632V568V514H382V452H350V396H324V344",
    signalNodes: dataSignalNodes,
  },
  {
    id: "background-trigger",
    x: 520,
    y: 472,
    label: "Background trigger",
    layer: "automation",
    summary: "A background trigger continues work beyond the request cycle.",
    routeId: "route-automation",
    feedPath: "M632 472H520V420H450V372H388V340H334",
    signalNodes: automationSignalNodes,
  },
  {
    id: "release-pipeline",
    x: 450,
    y: 420,
    label: "Release pipeline",
    layer: "automation",
    summary: "Tests, build checks, and deployment keep delivery reliable.",
    routeId: "route-automation",
    feedPath: "M632 472H520V420H450V372H388V340H334",
    signalNodes: automationSignalNodes,
  },
  {
    id: "observability-signal",
    x: 632,
    y: 472,
    label: "Observability signal",
    layer: "automation",
    summary: "Monitoring makes operational state visible after release.",
    routeId: "route-automation",
    feedPath: "M632 472H520V420H450V372H388V340H334",
    signalNodes: automationSignalNodes,
  },
] as const satisfies readonly HeroTopologyHotspot[];

export type HeroTopologyHotspotId = (typeof heroTopologyHotspots)[number]["id"];

export type HeroTopologyJourneyStep = Readonly<{
  layer: TopologyLayerId;
  hotspotId: HeroTopologyHotspotId;
}>;

export const heroTopologyJourney = [
  { layer: "interface", hotspotId: "interface-request" },
  { layer: "api", hotspotId: "typed-contract" },
  { layer: "services", hotspotId: "workflow-service" },
  { layer: "data", hotspotId: "persistence-write" },
  { layer: "automation", hotspotId: "background-trigger" },
] as const satisfies readonly HeroTopologyJourneyStep[];
