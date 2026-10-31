import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "../../../../components/design-system/Badge";
import { Button } from "../../../../components/design-system/Button";
import { Container } from "../../../../components/design-system/Container";
import { placeholderProducts } from "../../../../data/products";
import { getProductFromApi } from "../../../../lib/catalog-api";
import styles from "./page.module.css";

export function generateStaticParams() {
  return placeholderProducts.map((product) => ({ slug: product.slug }));
}

async function getProduct(slug: string) {
  const apiProduct = await getProductFromApi(slug);
  if (apiProduct) {
    return apiProduct;
  }
  return placeholderProducts.find((product) => product.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  return {
    title: product ? `${product.name} | RAJ Industrial` : "Product | RAJ Industrial",
    description: product?.summary ?? "Illustrative product placeholder.",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const quoteQuery = new URLSearchParams({
    product: product.slug,
    sku: product.sku,
  });
  const primaryImage = product.images[0];

  return (
    <div className={styles.page}>
      <Container width="wide">
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/products">Products</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className={styles.detailGrid}>
          <div className={styles.imageFrame}>
            {primaryImage ? (
              <Image
                alt={primaryImage.alt}
                className={styles.image}
                fill
                loading="eager"
                sizes="(max-width: 760px) 100vw, 52vw"
                src={primaryImage.src}
              />
            ) : (
              <div aria-hidden="true" className={styles.imageFallback}>
                PRODUCT IMAGE NOT PROVIDED
              </div>
            )}
            {product.isPlaceholder && (
              <Badge className={styles.placeholderBadge} variant="warning">
                Illustrative placeholder
              </Badge>
            )}
          </div>

          <div className={styles.productContent}>
            <p className={styles.eyebrow}>
              {product.isPlaceholder ? "PRODUCT REFERENCE" : "RAJ INDUSTRIAL PRODUCT"}
            </p>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.sku}>SKU: {product.sku}</p>
            <Badge variant="neutral">{product.categoryName}</Badge>
            {product.supplyType && (
              <p className={styles.supplyType}>
                Supply type: <strong>{product.supplyType}</strong>
              </p>
            )}
            <p className={styles.summary}>{product.summary}</p>
            <p className={styles.description}>{product.description}</p>
            {product.isPlaceholder && (
              <p className={styles.disclaimer}>
                This is illustrative catalog content, not a verified RAJ product or
                inventory listing.
              </p>
            )}
            <Button
              className={styles.quoteButton}
              href={`/contact?${quoteQuery.toString()}#request-a-quote`}
            >
              Request a Quote
            </Button>
          </div>
        </div>

        {product.specifications && product.specifications.length > 0 && (
          <section aria-labelledby="specifications-title" className={styles.detailSection}>
            <h2 className={styles.sectionTitle} id="specifications-title">
              Specifications
            </h2>
            <div className={styles.tableFrame}>
              <table className={styles.specificationTable}>
                <tbody>
                  {product.specifications.map((specification) => (
                    <tr key={specification.name}>
                      <th scope="row">{specification.name}</th>
                      <td>{specification.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {product.documents && product.documents.length > 0 && (
          <section aria-labelledby="documents-title" className={styles.detailSection}>
            <h2 className={styles.sectionTitle} id="documents-title">
              Documents
            </h2>
            <ul className={styles.documentList}>
              {product.documents.map((document) => (
                <li key={document.href}>
                  <a href={document.href} rel="noreferrer" target="_blank">
                    {document.name} <span>({document.type})</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </div>
  );
}
