import { resolve } from "node:path";

export const apiEnvFilePaths = [
  resolve(process.cwd(), ".env.local"),
  resolve(process.cwd(), "../../.env"),
];
