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
  width: 900,
  height: 430,
} as const;

export const heroTopologyRoutes: readonly HeroTopologyRoute[] = [
  {
    id: "route-interface",
    d: "M10 75H105V125H210V92H350V142H452V183H500V230",
    tone: "strong",
  },
  {
    id: "route-api",
    d: "M28 175H155V225H255V193H390V245H500V230",
    tone: "strong",
  },
  {
    id: "route-services",
    d: "M500 230H548V200H660V164H718V210H824",
    tone: "strong",
  },
  { id: "route-data", d: "M425 330H548V356H676V342H802", tone: "strong" },
  {
    id: "route-automation",
    d: "M500 230V285H610V342H738V405H866",
    tone: "strong",
  },
  { id: "route-06", d: "M0 300H118V264H242V322H365V272H486", tone: "muted" },
  { id: "route-07", d: "M56 388H178V321H298V382H425", tone: "muted" },
  { id: "route-08", d: "M548 390H676V342H802V405H880", tone: "muted" },
  { id: "route-09", d: "M105 18V125", tone: "muted" },
  { id: "route-10", d: "M210 40V205", tone: "muted" },
  { id: "route-11", d: "M302 12V190", tone: "muted" },
  { id: "route-12", d: "M406 30V165", tone: "muted" },
  { id: "route-13", d: "M507 22V224", tone: "muted" },
  { id: "route-14", d: "M611 16V185", tone: "muted" },
  { id: "route-15", d: "M718 28V225", tone: "muted" },
  { id: "route-16", d: "M824 20V182", tone: "muted" },
  { id: "route-17", d: "M70 110H140V150H180", tone: "muted" },
  { id: "route-18", d: "M180 160H320V208H382", tone: "muted" },
  { id: "route-19", d: "M382 96H470V130H530", tone: "muted" },
  { id: "route-20", d: "M530 150H600V118H690", tone: "muted" },
  { id: "route-21", d: "M690 196H820V248H885", tone: "muted" },
  { id: "route-22", d: "M32 340H85V300H145", tone: "muted" },
  { id: "route-23", d: "M145 368H252V340H322", tone: "muted" },
  { id: "route-24", d: "M322 238H410V286H465", tone: "muted" },
  { id: "route-25", d: "M465 372H575V322H635", tone: "muted" },
  { id: "route-26", d: "M635 250H705V290H760", tone: "muted" },
  { id: "route-27", d: "M760 390H860V350H900", tone: "muted" },
  { id: "route-28", d: "M130 52H185V18H240", tone: "muted" },
  { id: "route-29", d: "M270 128H330V72H390", tone: "muted" },
  { id: "route-30", d: "M450 212H510V166H580", tone: "muted" },
  { id: "route-31", d: "M580 48H640V98H700", tone: "muted" },
  { id: "route-32", d: "M755 138H830V80H892", tone: "muted" },
  { id: "route-33", d: "M15 228H78V196H132", tone: "muted" },
  { id: "route-34", d: "M232 20V60H260V104H292", tone: "muted" },
  { id: "route-35", d: "M344 398V350H392V306H430", tone: "muted" },
  { id: "route-36", d: "M520 12H560V62H600", tone: "muted" },
  { id: "route-37", d: "M615 410V370H650V330H690", tone: "muted" },
  { id: "route-38", d: "M704 12H752V52H792", tone: "muted" },
  { id: "route-39", d: "M810 270H850V230H898", tone: "muted" },
  { id: "route-40", d: "M40 414H92V384H126", tone: "muted" },
] as const;

const rawNodes = [
  [40, 100, "circle"],
  [78, 196, "port"],
  [105, 68, "cross"],
  [105, 125, "square"],
  [132, 228, "circle"],
  [155, 153, "circle"],
  [178, 321, "square"],
  [185, 52, "port"],
  [210, 92, "diamond"],
  [210, 160, "circle"],
  [240, 18, "cross"],
  [242, 244, "cross"],
  [255, 193, "square"],
  [270, 128, "circle"],
  [292, 104, "port"],
  [298, 347, "diamond"],
  [302, 82, "circle"],
  [322, 238, "square"],
  [330, 72, "diamond"],
  [350, 142, "cross"],
  [365, 272, "circle"],
  [382, 96, "port"],
  [390, 245, "circle"],
  [406, 57, "diamond"],
  [425, 330, "square"],
  [430, 306, "cross"],
  [452, 183, "circle"],
  [465, 372, "port"],
  [486, 260, "cross"],
  [500, 230, "diamond"],
  [507, 107, "square"],
  [510, 166, "circle"],
  [520, 12, "cross"],
  [548, 200, "diamond"],
  [548, 356, "circle"],
  [560, 62, "port"],
  [575, 322, "square"],
  [580, 48, "circle"],
  [600, 150, "cross"],
  [610, 285, "diamond"],
  [611, 78, "circle"],
  [615, 370, "port"],
  [640, 98, "square"],
  [650, 330, "cross"],
  [660, 164, "square"],
  [676, 342, "circle"],
  [690, 196, "diamond"],
  [700, 52, "cross"],
  [705, 250, "port"],
  [718, 118, "circle"],
  [738, 276, "circle"],
  [752, 52, "square"],
  [755, 138, "diamond"],
  [760, 390, "port"],
  [772, 210, "cross"],
  [792, 52, "circle"],
  [802, 365, "cross"],
  [824, 90, "diamond"],
  [830, 138, "square"],
  [850, 270, "circle"],
  [866, 300, "square"],
  [880, 405, "port"],
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
  { id: "packet-01", x: 268, y: 52, axis: "horizontal", routeId: "route-28" },
  {
    id: "packet-02",
    x: 465,
    y: 120,
    axis: "horizontal",
    routeId: "route-interface",
  },
  { id: "packet-03", x: 760, y: 248, axis: "horizontal", routeId: "route-21" },
  { id: "packet-04", x: 92, y: 350, axis: "horizontal", routeId: "route-22" },
  { id: "packet-05", x: 575, y: 405, axis: "horizontal", routeId: "route-37" },
  { id: "packet-06", x: 318, y: 208, axis: "horizontal", routeId: "route-18" },
  { id: "packet-07", x: 690, y: 118, axis: "horizontal", routeId: "route-20" },
  { id: "packet-08", x: 850, y: 230, axis: "horizontal", routeId: "route-39" },
  { id: "packet-09", x: 232, y: 48, axis: "vertical", routeId: "route-34" },
  { id: "packet-10", x: 344, y: 372, axis: "vertical", routeId: "route-35" },
  { id: "packet-11", x: 507, y: 48, axis: "vertical", routeId: "route-13" },
  { id: "packet-12", x: 611, y: 142, axis: "vertical", routeId: "route-14" },
  { id: "packet-13", x: 718, y: 70, axis: "vertical", routeId: "route-15" },
  { id: "packet-14", x: 824, y: 154, axis: "vertical", routeId: "route-16" },
  { id: "packet-15", x: 178, y: 286, axis: "vertical", routeId: "route-07" },
] as const;

export const heroTopologyHotspots: readonly HeroTopologyHotspot[] = [
  {
    id: "interface-request",
    x: 452,
    y: 183,
    label: "Interface request",
    layer: "interface",
    summary: "A visible product action enters the system as a typed request.",
    routeId: "route-interface",
    feedPath: "M452 183H500V230",
  },
  {
    id: "accessible-state",
    x: 210,
    y: 92,
    label: "Accessible state",
    layer: "interface",
    summary: "Component state keeps interaction behavior clear and operable.",
    routeId: "route-interface",
    feedPath: "M210 92H500V230",
  },
  {
    id: "editor-command",
    x: 350,
    y: 142,
    label: "Editor command",
    layer: "interface",
    summary: "Interface intent is separated from the work that fulfills it.",
    routeId: "route-interface",
    feedPath: "M350 142H500V230",
  },
  {
    id: "typed-contract",
    x: 390,
    y: 245,
    label: "Typed contract",
    layer: "api",
    summary: "The request crosses a typed boundary before system work begins.",
    routeId: "route-api",
    feedPath: "M390 245H500V230",
  },
  {
    id: "request-boundary",
    x: 507,
    y: 107,
    label: "Request boundary",
    layer: "api",
    summary: "Validation and access checks protect the application boundary.",
    routeId: "route-api",
    feedPath: "M507 107V230H500",
  },
  {
    id: "workflow-service",
    x: 548,
    y: 200,
    label: "Workflow service",
    layer: "services",
    summary: "Application logic coordinates the next dependable action.",
    routeId: "route-services",
    feedPath: "M548 200H500V230",
  },
  {
    id: "access-policy",
    x: 660,
    y: 164,
    label: "Access policy",
    layer: "services",
    summary: "Service rules keep workflow and tenant context aligned.",
    routeId: "route-services",
    feedPath: "M660 164H500V230",
  },
  {
    id: "persistence-write",
    x: 676,
    y: 342,
    label: "Persistence write",
    layer: "data",
    summary: "Relational data records the durable result of the workflow.",
    routeId: "route-data",
    feedPath: "M676 342H500V230",
  },
  {
    id: "read-model",
    x: 738,
    y: 276,
    label: "Read model",
    layer: "data",
    summary: "Stored state is shaped for the product surface that reads it.",
    routeId: "route-data",
    feedPath: "M738 276H500V230",
  },
  {
    id: "background-trigger",
    x: 802,
    y: 365,
    label: "Background trigger",
    layer: "automation",
    summary: "A background trigger continues work beyond the request cycle.",
    routeId: "route-automation",
    feedPath: "M802 365H500V230",
  },
  {
    id: "release-pipeline",
    x: 824,
    y: 182,
    label: "Release pipeline",
    layer: "automation",
    summary: "Tests, build checks, and deployment keep delivery reliable.",
    routeId: "route-automation",
    feedPath: "M824 182H500V230",
  },
  {
    id: "observability-signal",
    x: 866,
    y: 300,
    label: "Observability signal",
    layer: "automation",
    summary: "Monitoring makes operational state visible after release.",
    routeId: "route-automation",
    feedPath: "M866 300H500V230",
  },
] as const;
