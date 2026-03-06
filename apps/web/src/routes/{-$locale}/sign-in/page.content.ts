import { type Dictionary, t } from "intlayer";

const signInPageContent = {
  key: "sign-in-page",
  content: {
    title: t({
      en: "Sign in",
      fr: "Se connecter",
    }),
    description: t({
      en: "Access your workspace and continue where you left off.",
      fr: "Accédez à votre espace et reprenez là où vous vous étiez arrêté.",
    }),
    emailLabel: t({
      en: "Email",
      fr: "Adresse e-mail",
    }),
    emailPlaceholder: t({
      en: "name@example.com",
      fr: "nom@exemple.com",
    }),
    passwordLabel: t({
      en: "Password",
      fr: "Mot de passe",
    }),
    passwordPlaceholder: t({
      en: "Enter your password",
      fr: "Saisissez votre mot de passe",
    }),
    submitLabel: t({
      en: "Sign in",
      fr: "Se connecter",
    }),
    submittingLabel: t({
      en: "Signing in...",
      fr: "Connexion...",
    }),
    invalidCredentialsMessage: t({
      en: "Your credentials are invalid. Please verify your email and password.",
      fr: "Vos identifiants sont invalides. Vérifiez votre e-mail et votre mot de passe.",
    }),
    unknownErrorMessage: t({
      en: "Something went wrong while signing in. Please try again.",
      fr: "Une erreur est survenue pendant la connexion. Veuillez réessayer.",
    }),
    signUpPrompt: t({
      en: "Need an account?",
      fr: "Besoin d’un compte ?",
    }),
    signUpLinkLabel: t({
      en: "Create one",
      fr: "Créer un compte",
    }),
  },
} satisfies Dictionary;

export default signInPageContent;
