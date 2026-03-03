import { registerAs } from "@nestjs/config";

const DEFAULT_API_PORT = 3000;

const parsePort = (value: string | undefined): number => {
  if (!value) {
    return DEFAULT_API_PORT;
  }

  const parsedValue = Number.parseInt(value, 10);

  if (Number.isNaN(parsedValue) || parsedValue <= 0) {
    throw new Error("API_PORT must be a positive integer");
  }

  return parsedValue;
};

export const appConfig = registerAs("app", () => ({
  port: parsePort(process.env.API_PORT),
}));
