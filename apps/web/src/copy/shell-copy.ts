export const shellCopy = {
  appShell: {
    productName: "personal-crm",
    title: "Relationship workspace",
    description: "Bootstrap shell for the dashboard and contact workflows.",
    navigation: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/contacts", label: "Contacts" },
    ],
  },
  dashboard: {
    kicker: "MVP shell",
    title: "Stay oriented before the real data arrives.",
    description:
      "This route shell gives the frontend a stable structure for dashboard widgets, reminders, and relationship activity once the first endpoints are wired.",
    cards: [
      {
        title: "Due today",
        description: "Upcoming reminder widgets will mount here.",
        value: "0",
      },
      {
        title: "Needs attention",
        description: "Inactive contacts and stale relationships.",
        value: "0",
      },
      {
        title: "Import jobs",
        description: "Google import status and recent sync runs.",
        value: "0",
      },
    ],
  },
  contacts: {
    title: "Contacts",
    description:
      "The contact list route is ready for the upcoming query layer, filters, and CRUD flows.",
    primaryAction: "Add contact",
    placeholders: [
      {
        name: "Alex Johnson",
        meta: "Close friends · Last contact 12 days ago",
        note: "Sample placeholder card for the future list query state.",
      },
      {
        name: "Camille Martin",
        meta: "Family · Birthday reminder pending",
        note: "This will later map to the real contact row layout.",
      },
      {
        name: "Noah Kim",
        meta: "Professional · Imported from Google",
        note: "Useful target for upcoming tags, groups, and timeline wiring.",
      },
    ],
  },
} as const;
