import { resolve } from "node:path";

const currentDirectory = __dirname;
const apiPackageRoot = resolve(currentDirectory, "..", "..");
const repositoryRoot = resolve(apiPackageRoot, "..", "..");

export const apiEnvFilePaths = [
  resolve(apiPackageRoot, ".env.local"),
  resolve(repositoryRoot, ".env"),
];
