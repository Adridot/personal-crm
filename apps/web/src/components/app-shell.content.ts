import { type Dictionary, t } from "intlayer";

const appShellContent = {
  key: "app-shell",
  content: {
    productName: t({
      en: "personal-crm",
      fr: "personal-crm",
    }),
    title: t({
      en: "Relationship workspace",
      fr: "Workspace relationnel",
    }),
    description: t({
      en: "Bootstrap shell for the dashboard and contact workflows.",
      fr: "Shell de base pour le tableau de bord et les flux contacts.",
    }),
    localeSwitcherLabel: t({
      en: "Language",
      fr: "Langue",
    }),
    dashboardLabel: t({
      en: "Dashboard",
      fr: "Tableau de bord",
    }),
    contactsLabel: t({
      en: "Contacts",
      fr: "Contacts",
    }),
  },
} satisfies Dictionary;

export default appShellContent;
