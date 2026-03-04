import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "static",
  },
  routing: {
    mode: "prefix-no-default",
    storage: ["cookie", "localStorage"],
  },
  content: {
    contentDir: ["src"],
    codeDir: ["src"],
    formatCommand: 'pnpm exec biome format --write "{{file}}"',
  },
  editor: {
    enabled: false,
  },
};

export default config;
