import "server-only";
import type {
  CategoryRecord,
  ProductListResponse,
  ProductRecord,
} from "@raj/shared";
import type { CatalogProduct, ProductCategory } from "../data/products";

function getApiBaseUrl(): string {
  return process.env.RAJ_API_URL ?? "http://localhost:4000";
}

const PAGE_LIMIT = 100;
const MAX_CATALOG_ITEMS = 200;

async function requestApi<T>(path: string): Promise<T | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const url = new URL(path.replace(/^\//, ""), `${baseUrl.replace(/\/$/, "")}/`);
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(1200),
    });

    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isValidProductRecord(val: unknown): val is ProductRecord {
  if (!isObject(val)) return false;
  if (
    typeof val.id !== "string" ||
    typeof val.name !== "string" ||
    typeof val.slug !== "string" ||
    typeof val.sku !== "string" ||
    typeof val.summary !== "string" ||
    typeof val.description !== "string"
  ) {
    return false;
  }
  if (!isObject(val.category)) return false;
  const cat = val.category;
  if (typeof cat.id !== "string" || typeof cat.name !== "string") {
    return false;
  }
  return true;
}

export function isValidCategoryRecord(val: unknown): val is CategoryRecord {
  if (!isObject(val)) return false;
  return (
    typeof val.id === "string" &&
    typeof val.name === "string" &&
    typeof val.slug === "string"
  );
}

export function mapProductRecord(product: ProductRecord): CatalogProduct {
  const categoryId = product.category?.id ?? "unknown-category";
  const categoryName = product.category?.name ?? "General";

  const specifications = Array.isArray(product.specifications)
    ? product.specifications
        .filter((s) => s && typeof s.name === "string" && typeof s.value === "string")
        .map(({ name, value }) => ({ name, value }))
    : undefined;

  const images = Array.isArray(product.images)
    ? product.images.filter(
        (img) => img && typeof img.src === "string" && typeof img.alt === "string",
      )
    : [];

  const documents = Array.isArray(product.documents)
    ? product.documents.filter(
        (doc) =>
          doc &&
          typeof doc.name === "string" &&
          typeof doc.href === "string" &&
          typeof doc.type === "string",
      )
    : undefined;

  return {
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    supplyType: product.supplyType,
    summary: product.summary,
    description: product.description,
    categoryId,
    categoryName,
    specifications: specifications && specifications.length > 0 ? specifications : undefined,
    images,
    documents: documents && documents.length > 0 ? documents : undefined,
    isPlaceholder: false,
  };
}

function mapCategoryRecord(
  category: Pick<CategoryRecord, "id" | "name" | "slug">,
): ProductCategory {
  return {
    id: category.id,
    name: category.name,
    isPlaceholder: false,
  };
}

export async function getProductFromApi(slug: string): Promise<CatalogProduct | null> {
  try {
    const raw = await requestApi<unknown>(`/products/${encodeURIComponent(slug)}`);
    if (!raw || !isValidProductRecord(raw)) return null;
    return mapProductRecord(raw);
  } catch {
    return null;
  }
}

export async function getLiveCatalog(): Promise<{
  products: CatalogProduct[];
  categories: ProductCategory[];
} | null> {
  try {
    const firstPage = await requestApi<ProductListResponse>(
      `/products?page=1&limit=${PAGE_LIMIT}`,
    );
    if (
      !firstPage ||
      !firstPage.pagination ||
      typeof firstPage.pagination.total !== "number" ||
      typeof firstPage.pagination.totalPages !== "number" ||
      !Array.isArray(firstPage.items)
    ) {
      return null;
    }

    const validFirstItems = firstPage.items.filter(isValidProductRecord);
    if (firstPage.items.length > 0 && validFirstItems.length === 0) {
      return null;
    }

    const maxItems = Math.min(firstPage.pagination.total, MAX_CATALOG_ITEMS);
    const rawProducts = [...validFirstItems];
    const pageCount = Math.min(
      firstPage.pagination.totalPages,
      Math.ceil(MAX_CATALOG_ITEMS / PAGE_LIMIT),
    );

    for (let page = 2; page <= pageCount && rawProducts.length < maxItems; page += 1) {
      const nextPage = await requestApi<ProductListResponse>(
        `/products?page=${page}&limit=${PAGE_LIMIT}`,
      );
      if (nextPage && Array.isArray(nextPage.items)) {
        rawProducts.push(...nextPage.items.filter(isValidProductRecord));
      }
    }

    const categoryRecords = await requestApi<unknown[]>("/categories");
    const validCategoryRecords = Array.isArray(categoryRecords)
      ? categoryRecords.filter(isValidCategoryRecord)
      : [];

    const categories =
      validCategoryRecords.length > 0
        ? validCategoryRecords.map(mapCategoryRecord)
        : Array.from(
            new Map(
              rawProducts.map((product) => [
                product.category.id,
                mapCategoryRecord(product.category),
              ]),
            ).values(),
          );

    return {
      products: rawProducts.slice(0, MAX_CATALOG_ITEMS).map(mapProductRecord),
      categories,
    };
  } catch {
    return null;
  }
}
