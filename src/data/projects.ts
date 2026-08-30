export type ProjectFlow = readonly [string, string, string];

export type ProjectAnnotation = {
  title: string;
  description: string;
  target: "controls" | "canvas" | "viewport";
};

export type ProjectDestination = {
  name: string;
  purpose: string;
  branch: "Interface";
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  flow: ProjectFlow;
  annotations: readonly ProjectAnnotation[];
};

export type ProjectResponsibility = {
  title: string;
  description: string;
};

export type ConfidentialProjectChapter = {
  name: string;
  disclosure: string;
  purpose: string;
  thesis: string;
  atlasBranches: readonly ["Services", "Data"];
  sharedLayers: readonly [string, string];
  laneLabel: string;
  boundaryLabel: string;
  responsibilities: readonly ProjectResponsibility[];
  technologies: readonly string[];
};

export type WorkflowStage = {
  id: "form" | "submission" | "trigger" | "workflow" | "action";
  label: string;
  phase: "Input" | "Event" | "Decision" | "Execution" | "Outcome";
  responsibility: string;
};

export type WorkflowProjectChapter = {
  name: string;
  disclosure: string;
  purpose: string;
  thesis: string;
  atlasBranch: "Automation";
  stages: readonly [
    WorkflowStage,
    WorkflowStage,
    WorkflowStage,
    WorkflowStage,
    WorkflowStage,
  ];
  technologies: readonly string[];
};

export const seeMyUiProject: ProjectDestination = {
  name: "SeeMyUI",
  purpose:
    "A visual branding and design-system tool for testing design decisions across realistic interfaces before implementation.",
  branch: "Interface",
  image: {
    src: "/projects/seemyui/studio.png",
    alt: "SeeMyUI studio with visual-system controls beside a live landing-page preview.",
    width: 1901,
    height: 907,
  },
  flow: ["Design decisions", "Theme system", "Interface previews"],
  annotations: [
    {
      title: "Theme controls",
      description:
        "Brand, color, and typography decisions remain visible together.",
      target: "controls",
    },
    {
      title: "Live canvas",
      description: "The selected system is applied to a realistic interface.",
      target: "canvas",
    },
    {
      title: "Viewport preview",
      description: "Device and scale controls keep the interface in context.",
      target: "viewport",
    },
  ],
};

export const multiTenantProject: ConfidentialProjectChapter = {
  name: "Multi-tenant Business Platform",
  disclosure: "Employer-owned work presented anonymously.",
  purpose:
    "Experience building a business application where multiple organizations share one product while identity, permissions, and data remain separated by tenant context.",
  thesis: "One product can be shared. Its operating boundaries cannot.",
  atlasBranches: ["Services", "Data"],
  sharedLayers: ["Shared platform", "Access / identity"],
  laneLabel: "Tenant context",
  boundaryLabel: "Boundary retained",
  responsibilities: [
    {
      title: "Tenant-aware behavior",
      description:
        "Application behavior shaped by the active organization context.",
    },
    {
      title: "Identity and permissions",
      description:
        "Authentication, authorization, and role-based access working together.",
    },
    {
      title: "Data-backed workflows",
      description:
        "REST APIs and relational data supporting business processes.",
    },
    {
      title: "Work beyond the request",
      description:
        "Real-time features, notifications, and background processing.",
    },
  ],
  technologies: ["ASP.NET Core", "React", "SQL Server"],
};

export const workflowProject: WorkflowProjectChapter = {
  name: "Workflow / Form Platform",
  disclosure: "Employer-owned work presented anonymously.",
  purpose:
    "Experience building configurable forms whose submissions can initiate workflow logic, ordered work, and resulting actions.",
  thesis:
    "A form submission is only the beginning. The system becomes useful in what it coordinates next.",
  atlasBranch: "Automation",
  stages: [
    {
      id: "form",
      label: "Form",
      phase: "Input",
      responsibility: "Configure fields and collect structured input.",
    },
    {
      id: "submission",
      label: "Submission",
      phase: "Event",
      responsibility:
        "Turn completed input into an event the system can handle.",
    },
    {
      id: "trigger",
      label: "Trigger",
      phase: "Decision",
      responsibility: "Determine when the next process should begin.",
    },
    {
      id: "workflow",
      label: "Workflow",
      phase: "Execution",
      responsibility: "Coordinate ordered steps and asynchronous work.",
    },
    {
      id: "action",
      label: "Action",
      phase: "Outcome",
      responsibility: "Carry out the resulting operation or integration.",
    },
  ],
  technologies: ["React", "ASP.NET Core"],
};
