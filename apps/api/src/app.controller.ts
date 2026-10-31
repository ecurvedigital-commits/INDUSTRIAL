import { Controller, Get } from "@nestjs/common";
import type { HealthResponse } from "@raj/shared";

@Controller()
export class AppController {
  @Get("health")
  getHealth(): HealthResponse {
    return { status: "ok" };
  }
}