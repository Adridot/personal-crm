import { loadApiEnvironment } from "./load-env";

export const getRequiredEnv = (name: string): string => {
  loadApiEnvironment();

  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};
