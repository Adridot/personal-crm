import "reflect-metadata";

import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

const DEFAULT_API_PORT = 3000;
const DEFAULT_API_HOST = "0.0.0.0";

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix("api");
  app.enableCors({
    credentials: true,
    origin: true,
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
