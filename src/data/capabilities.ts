export type CapabilityProjectId =
  | "seemyui"
  | "multi-tenant"
  | "workflow"
  | "document";

export type CapabilityProjectEvidence = {
  id: CapabilityProjectId;
  name: string;
  transformation: "Propagation" | "Isolation" | "Sequence" | "Fan-out";
};

export type Capability = {
  id:
    | "product-interfaces"
    | "backend-systems"
    | "data"
    | "background-work"
    | "workflow-automation"
    | "developer-tools-ai";
  atlasRelationship: string;
  title: string;
  description: string;
  relatedProjects: readonly CapabilityProjectId[];
  technologies: readonly string[];
};

export const capabilityProjects: readonly CapabilityProjectEvidence[] = [
  {
    id: "seemyui",
    name: "SeeMyUI",
    transformation: "Propagation",
  },
  {
    id: "multi-tenant",
    name: "Multi-tenant Platform",
    transformation: "Isolation",
  },
  {
    id: "workflow",
    name: "Workflow / Form Platform",
    transformation: "Sequence",
  },
  {
    id: "document",
    name: "Browser Document Platform",
    transformation: "Fan-out",
  },
] as const;

export const capabilities: readonly Capability[] = [
  {
    id: "product-interfaces",
    atlasRelationship: "Product + Interface",
    title: "Product Interfaces",
    description:
      "Interactive, responsive products where editor state and complex behavior remain understandable on the surface.",
    relatedProjects: ["seemyui", "workflow", "document"],
    technologies: ["React", "TypeScript", "Next.js"],
  },
  {
    id: "backend-systems",
    atlasRelationship: "API + Services",
    title: "Backend Systems",
    description:
      "APIs, application services, business logic, and access control behind database-backed products.",
    relatedProjects: ["multi-tenant", "workflow", "document"],
    technologies: ["C#", "ASP.NET Core"],
  },
  {
    id: "data",
    atlasRelationship: "Data",
    title: "Data",
    description:
      "Relational persistence and application state shaped around product and business workflows.",
    relatedProjects: ["multi-tenant"],
    technologies: ["SQL Server", "PostgreSQL"],
  },
  {
    id: "background-work",
    atlasRelationship: "Services + Automation",
    title: "Real-time / Background Work",
    description:
      "Notifications, asynchronous jobs, and scheduled processing that continue beyond a request.",
    relatedProjects: ["multi-tenant"],
    technologies: ["SignalR", "Hangfire"],
  },
  {
    id: "workflow-automation",
    atlasRelationship: "Automation",
    title: "Workflow / Automation",
    description:
      "Triggers, ordered steps, integrations, and resulting actions coordinated across longer-running work.",
    relatedProjects: ["workflow", "document"],
    technologies: ["React", "ASP.NET Core"],
  },
  {
    id: "developer-tools-ai",
    atlasRelationship: "Product + Automation",
    title: "Developer Tools / AI-assisted Products",
    description:
      "Product systems that make developer workflows and broad AI/API capabilities useful through clear interfaces.",
    relatedProjects: ["seemyui", "document"],
    technologies: ["TypeScript", "Next.js", "ASP.NET Core"],
  },
] as const;
