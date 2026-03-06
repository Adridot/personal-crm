import { type Dictionary, t } from "intlayer";

const contactsPageContent = {
  key: "contacts-page",
  content: {
    title: t({
      en: "Contacts",
      fr: "Carnet de contacts",
    }),
    description: t({
      en: "The contact list route is ready for the upcoming query layer, filters, and CRUD flows.",
      fr: "La route des contacts est prête pour la couche de requêtes, les filtres et les flux CRUD à venir.",
    }),
    primaryAction: t({
      en: "Add contact",
      fr: "Ajouter un contact",
    }),
    placeholders: [
      {
        name: "Alex Johnson",
        meta: t({
          en: "Close friends · Last contact 12 days ago",
          fr: "Amis proches · Dernier contact il y a 12 jours",
        }),
        note: t({
          en: "Sample placeholder card for the future list query state.",
          fr: "Carte exemple pour le futur état de requête de la liste.",
        }),
      },
      {
        name: "Camille Martin",
        meta: t({
          en: "Family · Birthday reminder pending",
          fr: "Famille · Rappel d’anniversaire en attente",
        }),
        note: t({
          en: "This will later map to the real contact row layout.",
          fr: "Cela correspondra plus tard à la vraie ligne de contact.",
        }),
      },
      {
        name: "Noah Kim",
        meta: t({
          en: "Professional · Imported from Google",
          fr: "Professionnel · Importé depuis Google",
        }),
        note: t({
          en: "Useful target for upcoming tags, groups, and timeline wiring.",
          fr: "Bon support pour les futurs tags, groupes et la timeline.",
        }),
      },
    ],
  },
} satisfies Dictionary;

export default contactsPageContent;
