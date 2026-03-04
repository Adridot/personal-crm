import { Module } from "@nestjs/common";

import { DatabaseLifecycleService } from "./database-lifecycle.service";

@Module({
  providers: [DatabaseLifecycleService],
})
export class DatabaseModule {}
