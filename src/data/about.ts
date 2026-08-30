export type AboutExperienceContent = {
  positioning: string;
  statement: string;
  context: readonly [string, string];
  atlasLayers: readonly ["Interface", "API", "Services", "Data", "Automation"];
  direction: {
    label: string;
    description: string;
  };
  experience: {
    role: string;
    status: "Current role";
    summary: string;
    responsibilities: readonly string[];
  };
};

export const aboutExperience: AboutExperienceContent = {
  positioning:
    "Software Engineer building products, systems, and developer tools.",
  statement:
    "Most of my work lives between product behavior and system behavior.",
  context: [
    "I work across frontend and backend systems, primarily with React and TypeScript on the interface and ASP.NET Core behind it.",
    "That work has included multi-tenant business applications, workflow and form systems, browser-based document editors, developer tools, and AI-assisted product functionality.",
  ],
  atlasLayers: ["Interface", "API", "Services", "Data", "Automation"],
  direction: {
    label: "Current direction",
    description:
      "Product engineering that connects interactive interfaces, developer tooling, and AI/API capabilities to the systems behind them.",
  },
  experience: {
    role: "Software Engineer",
    status: "Current role",
    summary:
      "Full-stack product development across React frontends, ASP.NET Core APIs, relational data, and background work.",
    responsibilities: [
      "Connect interface behavior with APIs, business logic, and persistence.",
      "Work across multi-tenant systems, workflow automation, and real-time or background features.",
      "Build editor-style products and AI-assisted functionality.",
    ],
  },
};
