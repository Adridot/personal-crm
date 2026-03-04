import { Injectable, type OnApplicationShutdown } from "@nestjs/common";

import { pool } from "./client";

@Injectable()
export class DatabaseLifecycleService implements OnApplicationShutdown {
  private shutdownPromise: Promise<void> | null = null;

  async onApplicationShutdown(): Promise<void> {
    if (this.shutdownPromise) {
      await this.shutdownPromise;
      return;
    }

    this.shutdownPromise = pool.end();
    await this.shutdownPromise;
  }
}
