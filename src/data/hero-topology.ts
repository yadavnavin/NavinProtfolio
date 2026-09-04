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
};

export type HeroTopologyPacket = {
  id: string;
  x: number;
  y: number;
  axis: "horizontal" | "vertical";
  routeId: string;
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
};

export const HERO_TOPOLOGY_VIEWBOX = {
  width: 640,
  height: 640,
} as const;

export const heroTopologyRoutes: readonly HeroTopologyRoute[] = [
  {
    id: "route-interface",
    d: "M294 320H250V282H210V234H136V198H8",
    tone: "strong",
    revealOrder: 0,
  },
  {
    id: "route-api",
    d: "M312 294V250H270V196H226V126H190V8",
    tone: "strong",
    revealOrder: 0,
  },
  {
    id: "route-services",
    d: "M346 300H392V266H452V222H520V180H632",
    tone: "strong",
    revealOrder: 0,
  },
  {
    id: "route-data",
    d: "M328 346V390H374V450H424V516H466V632",
    tone: "strong",
    revealOrder: 0,
  },
  {
    id: "route-automation",
    d: "M346 336H390V378H448V426H520V488H632",
    tone: "strong",
    revealOrder: 0,
  },
  {
    id: "route-06",
    d: "M170 142H126V104H72V66H8",
    tone: "muted",
    revealOrder: 2,
  },
  { id: "route-07", d: "M158 92H120V58H82V8", tone: "muted", revealOrder: 3 },
  { id: "route-08", d: "M214 104H252V62H286V8", tone: "muted", revealOrder: 2 },
  {
    id: "route-09",
    d: "M150 188H108V168H58V132H8",
    tone: "muted",
    revealOrder: 2,
  },
  { id: "route-10", d: "M166 266H118V236H72", tone: "muted", revealOrder: 1 },
  { id: "route-11", d: "M238 96H214V80H204", tone: "muted", revealOrder: 2 },
  { id: "route-12", d: "M308 174H286V144H244", tone: "muted", revealOrder: 1 },
  {
    id: "route-13",
    d: "M486 132H526V102H574V64H632",
    tone: "muted",
    revealOrder: 2,
  },
  { id: "route-14", d: "M472 100H430V64H394V8", tone: "muted", revealOrder: 2 },
  { id: "route-15", d: "M492 84H514V54H552V8", tone: "muted", revealOrder: 3 },
  { id: "route-16", d: "M548 150H584V122H632", tone: "muted", revealOrder: 2 },
  { id: "route-17", d: "M482 186H440V156H396", tone: "muted", revealOrder: 1 },
  { id: "route-18", d: "M526 292H574V260H632", tone: "muted", revealOrder: 2 },
  { id: "route-19", d: "M486 148H448V120H402", tone: "muted", revealOrder: 1 },
  {
    id: "route-20",
    d: "M162 438H116V404H66V370H8",
    tone: "muted",
    revealOrder: 2,
  },
  { id: "route-21", d: "M98 474H52V444H8", tone: "muted", revealOrder: 3 },
  {
    id: "route-22",
    d: "M164 542H122V578H82V632",
    tone: "muted",
    revealOrder: 2,
  },
  {
    id: "route-23",
    d: "M152 548H184V584H218V632",
    tone: "muted",
    revealOrder: 2,
  },
  { id: "route-24", d: "M168 346H120V314H72", tone: "muted", revealOrder: 1 },
  { id: "route-25", d: "M258 522H220V486H176", tone: "muted", revealOrder: 1 },
  {
    id: "route-26",
    d: "M224 554H250V580H284V632",
    tone: "muted",
    revealOrder: 2,
  },
  { id: "route-27", d: "M542 552H578V526H632", tone: "muted", revealOrder: 2 },
  { id: "route-28", d: "M570 594H594V612H632", tone: "muted", revealOrder: 3 },
  {
    id: "route-29",
    d: "M488 548H520V584H558V632",
    tone: "muted",
    revealOrder: 2,
  },
  {
    id: "route-30",
    d: "M318 548H350V582H382V632",
    tone: "muted",
    revealOrder: 2,
  },
  { id: "route-31", d: "M470 354H506V384H552", tone: "muted", revealOrder: 1 },
  { id: "route-32", d: "M350 476H388V510H410", tone: "muted", revealOrder: 1 },
  { id: "route-33", d: "M548 360H592V330H632", tone: "muted", revealOrder: 2 },
  { id: "route-34", d: "M526 248H566V218H608", tone: "muted", revealOrder: 1 },
] as const;

const rawNodes = [
  [294, 320, "diamond"],
  [250, 282, "square"],
  [210, 234, "port"],
  [136, 198, "square"],
  [8, 198, "circle"],
  [312, 294, "diamond"],
  [270, 196, "port"],
  [226, 126, "square"],
  [190, 8, "circle"],
  [346, 300, "diamond"],
  [392, 266, "square"],
  [452, 222, "port"],
  [520, 180, "square"],
  [632, 180, "circle"],
  [328, 346, "diamond"],
  [374, 390, "square"],
  [424, 450, "port"],
  [466, 632, "circle"],
  [346, 336, "diamond"],
  [390, 378, "square"],
  [448, 426, "port"],
  [520, 488, "square"],
  [632, 488, "circle"],
  [170, 142, "cross"],
  [72, 66, "square"],
  [8, 66, "port"],
  [158, 92, "diamond"],
  [82, 8, "square"],
  [214, 104, "cross"],
  [252, 62, "square"],
  [286, 8, "port"],
  [150, 188, "port"],
  [58, 132, "diamond"],
  [8, 132, "circle"],
  [166, 266, "cross"],
  [118, 236, "square"],
  [72, 236, "circle"],
  [238, 96, "port"],
  [204, 80, "circle"],
  [308, 174, "cross"],
  [244, 144, "circle"],
  [486, 132, "port"],
  [574, 64, "circle"],
  [632, 64, "diamond"],
  [472, 100, "cross"],
  [430, 64, "square"],
  [394, 8, "port"],
  [492, 84, "diamond"],
  [552, 8, "square"],
  [548, 150, "port"],
  [632, 122, "circle"],
  [482, 186, "cross"],
  [396, 156, "circle"],
  [526, 292, "port"],
  [632, 260, "diamond"],
  [486, 148, "cross"],
  [402, 120, "circle"],
  [162, 438, "port"],
  [66, 370, "circle"],
  [8, 370, "diamond"],
  [98, 474, "cross"],
  [8, 444, "circle"],
  [164, 542, "port"],
  [82, 632, "circle"],
  [152, 548, "diamond"],
  [218, 632, "port"],
  [168, 346, "cross"],
  [72, 314, "circle"],
  [258, 522, "port"],
  [176, 486, "circle"],
  [224, 554, "cross"],
  [284, 632, "diamond"],
  [542, 552, "port"],
  [632, 526, "circle"],
  [570, 594, "cross"],
  [632, 612, "diamond"],
  [488, 548, "port"],
  [558, 632, "circle"],
  [318, 548, "diamond"],
  [382, 632, "port"],
  [470, 354, "circle"],
  [552, 384, "cross"],
  [350, 476, "circle"],
  [410, 510, "port"],
  [548, 360, "diamond"],
  [632, 330, "port"],
  [526, 248, "circle"],
  [608, 218, "cross"],
] as const;

export const heroTopologyNodes: readonly HeroTopologyNode[] = rawNodes.map(
  ([x, y, shape], index) => ({
    id: `node-${String(index + 1).padStart(2, "0")}`,
    x,
    y,
    shape: shape as HeroTopologyNode["shape"],
  }),
);

export const heroTopologyPackets: readonly HeroTopologyPacket[] = [
  {
    id: "packet-01",
    x: 164,
    y: 234,
    axis: "horizontal",
    routeId: "route-interface",
  },
  { id: "packet-02", x: 226, y: 150, axis: "vertical", routeId: "route-api" },
  {
    id: "packet-03",
    x: 474,
    y: 222,
    axis: "horizontal",
    routeId: "route-services",
  },
  { id: "packet-04", x: 424, y: 474, axis: "vertical", routeId: "route-data" },
  {
    id: "packet-05",
    x: 470,
    y: 426,
    axis: "horizontal",
    routeId: "route-automation",
  },
  { id: "packet-06", x: 94, y: 104, axis: "horizontal", routeId: "route-06" },
  { id: "packet-07", x: 430, y: 78, axis: "vertical", routeId: "route-14" },
  { id: "packet-08", x: 92, y: 404, axis: "horizontal", routeId: "route-20" },
  { id: "packet-09", x: 122, y: 594, axis: "vertical", routeId: "route-22" },
  { id: "packet-10", x: 578, y: 538, axis: "vertical", routeId: "route-27" },
  { id: "packet-11", x: 350, y: 600, axis: "vertical", routeId: "route-30" },
  { id: "packet-12", x: 592, y: 342, axis: "vertical", routeId: "route-33" },
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
  },
  {
    id: "accessible-state",
    x: 136,
    y: 198,
    label: "Accessible state",
    layer: "interface",
    summary: "Component state keeps interaction behavior clear and operable.",
    routeId: "route-interface",
    feedPath: "M8 198H136V234H210V282H250V320H294",
  },
  {
    id: "editor-command",
    x: 250,
    y: 282,
    label: "Editor command",
    layer: "interface",
    summary: "Interface intent is separated from the work that fulfills it.",
    routeId: "route-interface",
    feedPath: "M8 198H136V234H210V282H250V320H294",
  },
  {
    id: "typed-contract",
    x: 270,
    y: 196,
    label: "Typed contract",
    layer: "api",
    summary: "The request crosses a typed boundary before system work begins.",
    routeId: "route-api",
    feedPath: "M190 8V126H226V196H270V250H312V294",
  },
  {
    id: "request-boundary",
    x: 226,
    y: 126,
    label: "Request boundary",
    layer: "api",
    summary: "Validation and access checks protect the application boundary.",
    routeId: "route-api",
    feedPath: "M190 8V126H226V196H270V250H312V294",
  },
  {
    id: "workflow-service",
    x: 452,
    y: 222,
    label: "Workflow service",
    layer: "services",
    summary: "Application logic coordinates the next dependable action.",
    routeId: "route-services",
    feedPath: "M632 180H520V222H452V266H392V300H346",
  },
  {
    id: "access-policy",
    x: 520,
    y: 180,
    label: "Access policy",
    layer: "services",
    summary: "Service rules keep workflow and tenant context aligned.",
    routeId: "route-services",
    feedPath: "M632 180H520V222H452V266H392V300H346",
  },
  {
    id: "persistence-write",
    x: 424,
    y: 450,
    label: "Persistence write",
    layer: "data",
    summary: "Relational data records the durable result of the workflow.",
    routeId: "route-data",
    feedPath: "M466 632V516H424V450H374V390H328V346",
  },
  {
    id: "read-model",
    x: 374,
    y: 390,
    label: "Read model",
    layer: "data",
    summary: "Stored state is shaped for the product surface that reads it.",
    routeId: "route-data",
    feedPath: "M466 632V516H424V450H374V390H328V346",
  },
  {
    id: "background-trigger",
    x: 520,
    y: 488,
    label: "Background trigger",
    layer: "automation",
    summary: "A background trigger continues work beyond the request cycle.",
    routeId: "route-automation",
    feedPath: "M632 488H520V426H448V378H390V336H346",
  },
  {
    id: "release-pipeline",
    x: 448,
    y: 426,
    label: "Release pipeline",
    layer: "automation",
    summary: "Tests, build checks, and deployment keep delivery reliable.",
    routeId: "route-automation",
    feedPath: "M632 488H520V426H448V378H390V336H346",
  },
  {
    id: "observability-signal",
    x: 632,
    y: 488,
    label: "Observability signal",
    layer: "automation",
    summary: "Monitoring makes operational state visible after release.",
    routeId: "route-automation",
    feedPath: "M632 488H520V426H448V378H390V336H346",
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
