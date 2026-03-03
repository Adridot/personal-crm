import { resolve } from "node:path";

const apiPackageRoot = resolve(__dirname, "..", "..");
const repositoryRoot = resolve(apiPackageRoot, "..", "..");

export const apiEnvFilePaths = [
  resolve(apiPackageRoot, ".env.local"),
  resolve(repositoryRoot, ".env"),
];
