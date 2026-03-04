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
    accountLabel: t({
      en: "Signed in as",
      fr: "Connecté en tant que",
    }),
    loadingAccountLabel: t({
      en: "Loading session...",
      fr: "Chargement de la session...",
    }),
    signOutLabel: t({
      en: "Sign out",
      fr: "Se déconnecter",
    }),
    signOutPendingLabel: t({
      en: "Signing out...",
      fr: "Déconnexion...",
    }),
  },
} satisfies Dictionary;

export default appShellContent;
