import { type Dictionary, t } from "intlayer";

const signInPageContent = {
  key: "sign-in-page",
  content: {
    title: t({
      en: "Sign in",
      fr: "Se connecter",
    }),
    description: t({
      en: "Access your relationship workspace and continue where you left off.",
      fr: "Accède à ton espace relationnel et reprends là où tu t’étais arrêté.",
    }),
    emailLabel: t({
      en: "Email",
      fr: "Email",
    }),
    passwordLabel: t({
      en: "Password",
      fr: "Mot de passe",
    }),
    emailRequiredError: t({
      en: "Email is required.",
      fr: "L’email est requis.",
    }),
    emailInvalidError: t({
      en: "Enter a valid email address.",
      fr: "Saisis une adresse email valide.",
    }),
    passwordRequiredError: t({
      en: "Password is required.",
      fr: "Le mot de passe est requis.",
    }),
    submitLabel: t({
      en: "Sign in",
      fr: "Se connecter",
    }),
    submitPendingLabel: t({
      en: "Signing in...",
      fr: "Connexion...",
    }),
    noAccountPrompt: t({
      en: "Need an account?",
      fr: "Besoin d’un compte ?",
    }),
    noAccountAction: t({
      en: "Create one",
      fr: "En créer un",
    }),
    errorFallback: t({
      en: "Unable to sign in with those credentials.",
      fr: "Impossible de se connecter avec ces identifiants.",
    }),
  },
} satisfies Dictionary;

export default signInPageContent;
