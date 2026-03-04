import { type Dictionary, t } from "intlayer";

const signUpPageContent = {
  key: "sign-up-page",
  content: {
    title: t({
      en: "Create your account",
      fr: "Créer ton compte",
    }),
    description: t({
      en: "Start your private relationship workspace with a personal account.",
      fr: "Commence ton espace relationnel privé avec un compte personnel.",
    }),
    nameLabel: t({
      en: "Name",
      fr: "Nom",
    }),
    emailLabel: t({
      en: "Email",
      fr: "Email",
    }),
    passwordLabel: t({
      en: "Password",
      fr: "Mot de passe",
    }),
    nameRequiredError: t({
      en: "Name is required.",
      fr: "Le nom est requis.",
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
      en: "Create account",
      fr: "Créer le compte",
    }),
    submitPendingLabel: t({
      en: "Creating account...",
      fr: "Création du compte...",
    }),
    hasAccountPrompt: t({
      en: "Already have an account?",
      fr: "Tu as déjà un compte ?",
    }),
    hasAccountAction: t({
      en: "Sign in",
      fr: "Se connecter",
    }),
    errorFallback: t({
      en: "Unable to create your account right now.",
      fr: "Impossible de créer ton compte pour le moment.",
    }),
  },
} satisfies Dictionary;

export default signUpPageContent;
