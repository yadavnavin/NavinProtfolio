export type ContactEmail =
  | {
      status: "verified";
      address: string;
    }
  | {
      status: "pending";
      address: null;
    };

export type ContactLink = {
  label: "GitHub" | "LinkedIn" | "X";
  href: string;
  status: "verified";
};

export type ContactContent = {
  statement: string;
  email: ContactEmail;
  links: readonly ContactLink[];
  pendingMessage: string;
  role: string;
};

export const contact: ContactContent = {
  statement: "Have a system worth thinking through?",
  email: {
    status: "pending",
    address: null,
  },
  links: [],
  pendingMessage: "Contact details pending verification.",
  role: "Software Engineer",
};
