import { ServiceUnavailableException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

const CONNECTION_ERROR_CODES = new Set(["P1000", "P1001", "P1002", "P1017", "P2024"]);

export function throwIfDatabaseUnavailable(error: unknown): void {
  if (
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError ||
    (error instanceof Prisma.PrismaClientKnownRequestError &&
      CONNECTION_ERROR_CODES.has(error.code))
  ) {
    throw new ServiceUnavailableException("Database service is unavailable.");
  }
}