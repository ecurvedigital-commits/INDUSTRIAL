import { Inject, Injectable } from "@nestjs/common";
import type { CategoryRecord } from "@raj/shared";
import { throwIfDatabaseUnavailable } from "../common/database-error";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoriesService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findAll(): Promise<CategoryRecord[]> {
    try {
      return await this.prisma.category.findMany({
        where: { isActive: true },
        select: { id: true, name: true, slug: true, description: true },
        orderBy: { name: "asc" },
      });
    } catch (error) {
      throwIfDatabaseUnavailable(error);
      throw error;
    }
  }
}