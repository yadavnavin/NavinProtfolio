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
