import { type Dictionary, t } from "intlayer";

const dashboardPageContent = {
  key: "dashboard-page",
  content: {
    kicker: t({
      en: "MVP shell",
      fr: "Shell MVP",
    }),
    title: t({
      en: "Stay oriented before the real data arrives.",
      fr: "Reste orienté avant l’arrivée des vraies données.",
    }),
    description: t({
      en: "This route shell gives the frontend a stable structure for dashboard widgets, reminders, and relationship activity once the first endpoints are wired.",
      fr: "Ce shell de route donne au frontend une structure stable pour les widgets du dashboard, les rappels et l’activité relationnelle dès que les premiers endpoints seront branchés.",
    }),
    cards: [
      {
        title: t({
          en: "Due today",
          fr: "À traiter aujourd’hui",
        }),
        description: t({
          en: "Upcoming reminder widgets will mount here.",
          fr: "Les prochains widgets de rappels apparaîtront ici.",
        }),
        value: "0",
      },
      {
        title: t({
          en: "Needs attention",
          fr: "À relancer",
        }),
        description: t({
          en: "Inactive contacts and stale relationships.",
          fr: "Contacts inactifs et relations qui refroidissent.",
        }),
        value: "0",
      },
      {
        title: t({
          en: "Import jobs",
          fr: "Imports",
        }),
        description: t({
          en: "Google import status and recent sync runs.",
          fr: "Statut de l’import Google et synchronisations récentes.",
        }),
        value: "0",
      },
    ],
  },
} satisfies Dictionary;

export default dashboardPageContent;
