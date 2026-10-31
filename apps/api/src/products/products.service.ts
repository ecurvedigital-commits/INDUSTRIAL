import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, ProductStatus } from "@prisma/client";
import type {
  ProductDocumentReference,
  ProductImageReference,
  ProductListResponse,
  ProductRecord,
} from "@raj/shared";
import { throwIfDatabaseUnavailable } from "../common/database-error";
import { PrismaService } from "../prisma/prisma.service";
import type { ProductQueryDto } from "./dto/product-query.dto";

const productInclude = {
  category: { select: { id: true, name: true, slug: true } },
  specifications: { orderBy: { sortOrder: "asc" as const } },
};

function isRecord(value: Prisma.JsonValue): value is Prisma.JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function imageReferences(value: Prisma.JsonValue | null): ProductImageReference[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!isRecord(item) || typeof item.src !== "string" || typeof item.alt !== "string") {
      return [];
    }
    return [{ src: item.src, alt: item.alt }];
  });
}

function documentReferences(value: Prisma.JsonValue | null): ProductDocumentReference[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (
      !isRecord(item) ||
      typeof item.name !== "string" ||
      typeof item.href !== "string" ||
      typeof item.type !== "string"
    ) {
      return [];
    }
    return [{ name: item.name, href: item.href, type: item.type }];
  });
}

function toProductRecord(product: Prisma.ProductGetPayload<{ include: typeof productInclude }>): ProductRecord {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    summary: product.summary,
    description: product.description,
    supplyType: product.supplyType,
    status: product.status,
    category: product.category,
    specifications: product.specifications.map((specification) => ({
      id: specification.id,
      name: specification.name,
      value: specification.value,
      sortOrder: specification.sortOrder,
    })),
    images: imageReferences(product.images),
    documents: documentReferences(product.documents),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

@Injectable()
export class ProductsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async findAll(query: ProductQueryDto): Promise<ProductListResponse> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;
    const where: Prisma.ProductWhereInput = {
      status: ProductStatus.PUBLISHED,
    };

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: "insensitive" } },
        { sku: { contains: query.search, mode: "insensitive" } },
      ];
    }
    if (query.sku) where.sku = { contains: query.sku, mode: "insensitive" };
    if (query.category) {
      where.category = { is: { slug: query.category, isActive: true } };
    }

    try {
      const [products, total] = await this.prisma.$transaction([
        this.prisma.product.findMany({
          where,
          include: productInclude,
          orderBy: { name: "asc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        this.prisma.product.count({ where }),
      ]);

      return {
        items: products.map(toProductRecord),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throwIfDatabaseUnavailable(error);
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<ProductRecord> {
    try {
      const product = await this.prisma.product.findFirst({
        where: { slug, status: ProductStatus.PUBLISHED },
        include: productInclude,
      });

      if (!product) throw new NotFoundException("Product not found.");
      return toProductRecord(product);
    } catch (error) {
      throwIfDatabaseUnavailable(error);
      throw error;
    }
  }
}