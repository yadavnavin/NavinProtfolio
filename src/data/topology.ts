export type TopologyStageId =
  | "product"
  | "interface"
  | "api"
  | "services"
  | "data"
  | "automation";

export type ProjectEvidence = {
  project: string;
  relationship: string;
  conceptualFlow: readonly [string, string, string];
};

export type TopologyStage = {
  id: TopologyStageId;
  label: string;
  description: string;
  relatedProjectEvidence?: ProjectEvidence;
};

export const topologyStages: readonly TopologyStage[] = [
  {
    id: "product",
    label: "Product",
    description:
      "Software shaped around real user needs and system constraints.",
  },
  {
    id: "interface",
    label: "Interface",
    description:
      "Interactive products that make complex design decisions visible and testable.",
    relatedProjectEvidence: {
      project: "SeeMyUI",
      relationship:
        "A visual design tool for testing design decisions across realistic interface previews.",
      conceptualFlow: [
        "Design decisions",
        "Theme system",
        "Interface previews",
      ],
    },
  },
  {
    id: "api",
    label: "API",
    description:
      "REST APIs that connect interface intent to application capabilities.",
  },
  {
    id: "services",
    label: "Services",
    description:
      "Application services for database-backed and multi-tenant products.",
  },
  {
    id: "data",
    label: "Data",
    description:
      "PostgreSQL and SQL Server foundations for product and workflow data.",
  },
  {
    id: "automation",
    label: "Automation",
    description:
      "Background processing and workflow systems that carry work forward.",
  },
] as const;
