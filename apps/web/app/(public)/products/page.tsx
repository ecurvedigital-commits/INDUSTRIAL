import type { Metadata } from "next";
import { ProductCatalog } from "../../../components/catalog/ProductCatalog";
import { Container } from "../../../components/design-system/Container";
import { SectionHeading } from "../../../components/design-system/SectionHeading";
import { placeholderProducts, productCategories } from "../../../data/products";
import { getLiveCatalog } from "../../../lib/catalog-api";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "RAJ Industrial",
  description: "Browse illustrative product and category placeholders for RAJ Industrial.",
};

type ProductsPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  const initialCategoryId = Array.isArray(category) ? category[0] : category;

  const liveCatalog = await getLiveCatalog();
  const isFallback = !liveCatalog || liveCatalog.products.length === 0;

  const products = isFallback ? placeholderProducts : liveCatalog.products;
  const categories = isFallback ? productCategories : liveCatalog.categories;

  return (
    <div className={styles.page}>
      <section aria-labelledby="products-title" className={styles.intro}>
        <Container width="wide">
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Products</span>
          </nav>
          <SectionHeading
            description={
              isFallback
                ? "Browse the provisional catalog framework. Product names, categories, and images below are illustrative and are not verified RAJ inventory."
                : "Browse verified RAJ Industrial equipment, components, and manufactured solutions."
            }
            eyebrow={isFallback ? "RAJ INDUSTRIAL / CATALOG" : "RAJ INDUSTRIAL / VERIFIED CATALOG"}
            id="products-title"
            title="Products"
          />
          {isFallback && (
            <p className={styles.notice}>
              <span aria-hidden="true" className={styles.noticeMark} />
              Illustrative placeholders only. The real product taxonomy and inventory
              are pending confirmation.
            </p>
          )}
        </Container>
      </section>

      <section aria-label="Product catalog" className={styles.resultsSection}>
        <Container width="wide">
          <ProductCatalog
            categories={categories}
            initialCategoryId={initialCategoryId}
            products={products}
          />
        </Container>
      </section>
    </div>
  );
}
