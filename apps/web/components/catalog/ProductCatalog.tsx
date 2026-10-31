"use client";

import { useDeferredValue, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../design-system/Button";
import { CatalogProductCard } from "./CatalogProductCard";
import type { CatalogProduct, ProductCategory } from "../../data/products";
import styles from "./ProductCatalog.module.css";

const PAGE_SIZE = 12;

type ProductCatalogProps = {
  products: CatalogProduct[];
  categories: ProductCategory[];
  initialCategoryId?: string;
};

export function ProductCatalog({
  products,
  categories,
  initialCategoryId = "",
}: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());

  useEffect(() => {
    setCategoryId(initialCategoryId);
    setPage(1);
  }, [initialCategoryId]);

  const selectedCategory = categories.find((category) => category.id === categoryId);
  const isUnknownCategory = Boolean(categoryId) && !selectedCategory;
  const hasPlaceholders = products.some((p) => p.isPlaceholder);

  const filteredProducts = isUnknownCategory
    ? []
    : products.filter((product) => {
        const matchesCategory = !categoryId || product.categoryId === categoryId;
        const matchesSearch =
          !deferredQuery ||
          product.name.toLocaleLowerCase().includes(deferredQuery) ||
          product.sku.toLocaleLowerCase().includes(deferredQuery);

        return matchesCategory && matchesSearch;
      });

  const pageCount = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const visibleProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  function updateCategory(nextCategoryId: string) {
    setCategoryId(nextCategoryId);
    setPage(1);
    const params = new URLSearchParams();
    if (nextCategoryId) params.set("category", nextCategoryId);
    const search = params.toString();
    startTransition(() => router.replace(search ? `${pathname}?${search}` : pathname));
  }

  function resetFilters() {
    setQuery("");
    updateCategory("");
  }

  function goToPage(nextPage: number) {
    setPage(nextPage);
    document.getElementById("product-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className={styles.catalog}>
      <div aria-label="Product filters" className={styles.filters}>
        <div className={styles.searchField}>
          <label className={styles.label} htmlFor="product-search">
            Search products
          </label>
          <input
            autoComplete="off"
            className={styles.input}
            id="product-search"
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search by product name or SKU"
            type="search"
            value={query}
          />
        </div>
        <div className={styles.categoryField}>
          <label className={styles.label} htmlFor="product-category">
            Category
          </label>
          <select
            className={styles.input}
            id="product-category"
            onChange={(event) => updateCategory(event.target.value)}
            value={categoryId}
          >
            <option value="">All categories</option>
            {isUnknownCategory && (
              <option value={categoryId}>Unknown category</option>
            )}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
                {category.isPlaceholder ? " (provisional)" : ""}
              </option>
            ))}
          </select>
        </div>
        <p aria-live="polite" className={styles.resultCount}>
          {filteredProducts.length}{" "}
          {hasPlaceholders
            ? "illustrative placeholders"
            : filteredProducts.length === 1
              ? "product"
              : "products"}
        </p>
      </div>

      {isUnknownCategory ? (
        <div className={styles.emptyState} role="status">
          <p className={styles.emptyEyebrow}>CATEGORY NOT RECOGNIZED</p>
          <h2 className={styles.emptyTitle}>This category is not available.</h2>
          <p className={styles.emptyDescription}>
            The requested category may have changed. Browse all{" "}
            {hasPlaceholders ? "provisional categories" : "categories"} instead.
          </p>
          <Button onClick={resetFilters} variant="outline">
            Show all categories
          </Button>
        </div>
      ) : visibleProducts.length ? (
        <>
          <div
            aria-busy={isPending}
            aria-label={hasPlaceholders ? "Illustrative product results" : "Product results"}
            className={styles.productGrid}
            id="product-results"
          >
            {visibleProducts.map((product, index) => (
              <CatalogProductCard
                isFirstResult={index === 0}
                key={product.slug}
                product={product}
              />
            ))}
          </div>
          {pageCount > 1 && (
            <nav aria-label="Product result pages" className={styles.pagination}>
              <Button
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                variant="outline"
              >
                Previous
              </Button>
              <ol className={styles.pageList}>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        aria-current={pageNumber === page ? "page" : undefined}
                        aria-label={`Page ${pageNumber}`}
                        className={styles.pageButton}
                        onClick={() => goToPage(pageNumber)}
                        type="button"
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ),
                )}
              </ol>
              <Button
                disabled={page === pageCount}
                onClick={() => goToPage(page + 1)}
                variant="outline"
              >
                Next
              </Button>
            </nav>
          )}
        </>
      ) : (
        <div className={styles.emptyState} role="status">
          <p className={styles.emptyEyebrow}>NO MATCHES</p>
          <h2 className={styles.emptyTitle}>
            {hasPlaceholders
              ? "No placeholders match this search."
              : "No products match this search."}
          </h2>
          <p className={styles.emptyDescription}>
            Try a different product name or SKU, or reset the selected filters.
          </p>
          <Button onClick={resetFilters} variant="outline">
            Clear search and filters
          </Button>
        </div>
      )}
    </div>
  );
}
