import {
  documentProject,
  multiTenantProject,
  seeMyUiProject,
  workflowProject,
} from "@/data/projects";

export type SystemLayer =
  | "Interface"
  | "API"
  | "Services"
  | "Data"
  | "Automation";

export type PortfolioCta =
  | {
      label: string;
      status: "verified";
      href: string;
    }
  | {
      label: string;
      status: "unavailable";
      href: null;
    };

export type SystemsChapter = {
  id: "multi-tenant" | "workflow" | "document";
  title: string;
  purpose: string;
  decision: string;
  disclosure: string;
  layers: readonly SystemLayer[];
  evidence: readonly string[];
  technologies: readonly string[];
  diagram: "isolation" | "sequence" | "fanout";
  steps: readonly string[];
};

export const topologyLayers: readonly {
  id: Lowercase<SystemLayer>;
  label: SystemLayer;
  description: string;
}[] = [
  {
    id: "interface",
    label: "Interface",
    description: "Product behavior, editor state, and accessible interactions.",
  },
  {
    id: "api",
    label: "API",
    description: "Typed contracts connecting visible actions to system work.",
  },
  {
    id: "services",
    label: "Services",
    description: "Application logic, access rules, and coordinated processing.",
  },
  {
    id: "data",
    label: "Data",
    description: "Relational persistence shaped around product workflows.",
  },
  {
    id: "automation",
    label: "Automation",
    description: "Background work, triggers, notifications, and integrations.",
  },
] as const;

export const publicProject = seeMyUiProject;

export const systemsChapters: readonly SystemsChapter[] = [
  {
    id: "multi-tenant",
    title: multiTenantProject.name,
    purpose: multiTenantProject.purpose,
    decision: multiTenantProject.thesis,
    disclosure: multiTenantProject.disclosure,
    layers: ["API", "Services", "Data"],
    evidence: multiTenantProject.responsibilities.map(
      (responsibility) => responsibility.title,
    ),
    technologies: multiTenantProject.technologies,
    diagram: "isolation",
    steps: ["Shared platform", "Access / identity", "Tenant context"],
  },
  {
    id: "workflow",
    title: workflowProject.name,
    purpose: workflowProject.purpose,
    decision: workflowProject.thesis,
    disclosure: workflowProject.disclosure,
    layers: ["Interface", "Services", "Automation"],
    evidence: workflowProject.stages.map((stage) => stage.responsibility),
    technologies: workflowProject.technologies,
    diagram: "sequence",
    steps: workflowProject.stages.map((stage) => stage.label),
  },
  {
    id: "document",
    title: documentProject.name,
    purpose: documentProject.purpose,
    decision: documentProject.thesis,
    disclosure: documentProject.disclosure,
    layers: ["Interface", "Services", "Automation"],
    evidence: documentProject.experience,
    technologies: documentProject.technologies,
    diagram: "fanout",
    steps: [
      "Editing plane",
      ...documentProject.modes.map((mode) => mode.label),
    ],
  },
] as const;

export const portfolioCtas: readonly PortfolioCta[] = [
  { label: "Contact", status: "unavailable", href: null },
  { label: "Resume", status: "unavailable", href: null },
  { label: "GitHub", status: "unavailable", href: null },
  { label: "LinkedIn", status: "unavailable", href: null },
] as const;
