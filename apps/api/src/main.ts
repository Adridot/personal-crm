import "reflect-metadata";

import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { isOriginAllowed } from "./config/origins";

const DEFAULT_API_PORT = 3000;
const DEFAULT_API_HOST = "0.0.0.0";
type CorsOriginCallback = (error: Error | null, allow?: boolean) => void;

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.enableShutdownHooks();

  const configService = app.get(ConfigService);
  const allowedOrigins =
    configService.get<string[]>("cors.allowedOrigins") ?? [];

  app.setGlobalPrefix("api");
  app.enableCors({
    credentials: true,
    origin: (
      requestOrigin: string | undefined,
      callback: CorsOriginCallback
    ) => {
      if (!requestOrigin) {
        callback(null, false);
        return;
      }

      const isAllowed = isOriginAllowed(requestOrigin, allowedOrigins);

      callback(null, isAllowed);
    },
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    })
  );

  const port = configService.get<number>("app.port") ?? DEFAULT_API_PORT;

  await app.listen(port, DEFAULT_API_HOST);

  const applicationUrl = await app.getUrl();

  Logger.log(`API listening at ${applicationUrl}/api`, "Bootstrap");
};

bootstrap().catch((error: unknown) => {
  const logger = new Logger("Bootstrap");
  const message =
    error instanceof Error ? error.message : "Unknown bootstrap error";
  const stack = error instanceof Error ? error.stack : undefined;

  logger.error(message, stack);
  process.exit(1);
});
