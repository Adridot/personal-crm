import { existsSync } from "node:fs";

import { config } from "dotenv";

import { apiEnvFilePaths } from "./env-file-paths";

let envLoaded = false;

export const loadApiEnvironment = (): void => {
  if (envLoaded) {
    return;
  }

  for (const envFilePath of apiEnvFilePaths) {
    if (!existsSync(envFilePath)) {
      continue;
    }

    config({
      override: false,
      path: envFilePath,
      quiet: true,
    });
  }

  envLoaded = true;
};
