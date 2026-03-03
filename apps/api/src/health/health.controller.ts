import { Controller, Get } from "@nestjs/common";
// biome-ignore lint/style/useImportType: Nest dependency injection needs runtime class references for design:paramtypes metadata.
import {
  HealthCheck,
  type HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
} from "@nestjs/terminus";

const MEMORY_HEAP_LIMIT_BYTES = 256 * 1024 * 1024;

@Controller("health")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      async () => this.memory.checkHeap("memory_heap", MEMORY_HEAP_LIMIT_BYTES),
    ]);
  }
}
