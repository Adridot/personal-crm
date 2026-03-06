import { type Dictionary, t } from "intlayer";

const routerFallbacksContent = {
  key: "router-fallbacks",
  content: {
    errorDescription: t({
      en: "The current page crashed before it could finish loading.",
      fr: "La page en cours a échoué avant de terminer son chargement.",
    }),
    errorTitle: t({
      en: "Route error",
      fr: "Erreur de route",
    }),
    goHomeLabel: t({
      en: "Go to home",
      fr: "Retour à l’accueil",
    }),
    loadingDescription: t({
      en: "The page is preparing the next screen and data.",
      fr: "La page prépare l’écran suivant et ses données.",
    }),
    loadingTitle: t({
      en: "Loading route...",
      fr: "Chargement de la route...",
    }),
    notFoundDescription: t({
      en: "The route does not exist, or it was moved to a different path.",
      fr: "La route n’existe pas, ou elle a été déplacée vers une autre URL.",
    }),
    notFoundTitle: t({
      en: "Page not found",
      fr: "Page introuvable",
    }),
    retryLabel: t({
      en: "Retry",
      fr: "Réessayer",
    }),
    unexpectedErrorMessage: t({
      en: "An unexpected error happened while rendering this route.",
      fr: "Une erreur inattendue est survenue pendant le rendu de cette route.",
    }),
  },
} satisfies Dictionary;

export default routerFallbacksContent;
