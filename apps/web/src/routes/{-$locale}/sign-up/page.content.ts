import { type Dictionary, t } from "intlayer";

const signUpPageContent = {
  key: "sign-up-page",
  content: {
    title: t({
      en: "Create account",
      fr: "Créer un compte",
    }),
    description: t({
      en: "Create your account to start managing your relationships.",
      fr: "Créez votre compte pour commencer à gérer vos relations.",
    }),
    nameLabel: t({
      en: "Full name",
      fr: "Nom complet",
    }),
    namePlaceholder: t({
      en: "Alex Johnson",
      fr: "Alex Martin",
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
      en: "Create a password",
      fr: "Créez un mot de passe",
    }),
    passwordConfirmationLabel: t({
      en: "Confirm password",
      fr: "Confirmer le mot de passe",
    }),
    passwordConfirmationPlaceholder: t({
      en: "Repeat your password",
      fr: "Répétez votre mot de passe",
    }),
    submitLabel: t({
      en: "Create account",
      fr: "Créer un compte",
    }),
    submittingLabel: t({
      en: "Creating account...",
      fr: "Création du compte...",
    }),
    passwordMismatchMessage: t({
      en: "Passwords do not match.",
      fr: "Les mots de passe ne correspondent pas.",
    }),
    unknownErrorMessage: t({
      en: "Something went wrong while creating your account. Please try again.",
      fr: "Une erreur est survenue pendant la création du compte. Veuillez réessayer.",
    }),
    signInPrompt: t({
      en: "Already have an account?",
      fr: "Vous avez déjà un compte ?",
    }),
    signInLinkLabel: t({
      en: "Sign in",
      fr: "Se connecter",
    }),
  },
} satisfies Dictionary;

export default signUpPageContent;
