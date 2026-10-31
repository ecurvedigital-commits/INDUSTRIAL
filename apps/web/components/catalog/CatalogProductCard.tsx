import Image from "next/image";
import Link from "next/link";
import { Badge } from "../design-system/Badge";
import { Card } from "../design-system/Card";
import type { CatalogProduct } from "../../data/products";
import styles from "./CatalogProductCard.module.css";

export function CatalogProductCard({
  product,
  isFirstResult = false,
}: {
  product: CatalogProduct;
  isFirstResult?: boolean;
}) {
  const image = product.images[0];

  return (
    <Card className={styles.card}>
      <Link
        aria-label={`View ${product.name}, SKU ${product.sku}`}
        className={styles.link}
        href={`/products/${product.slug}`}
      >
        <div className={styles.imageFrame}>
          {image ? (
            <Image
              alt={image.alt}
              className={styles.image}
              fill
              loading={isFirstResult ? "eager" : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              src={image.src}
            />
          ) : (
            <div aria-hidden="true" className={styles.imageFallback}>
              RAJ INDUSTRIAL
            </div>
          )}
          {product.isPlaceholder && (
            <Badge className={styles.placeholderBadge} variant="warning">
              Placeholder
            </Badge>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.meta}>
            <span>{product.sku}</span>
            <Badge variant="neutral">{product.categoryName}</Badge>
          </div>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.summary}>{product.summary}</p>
          <span aria-hidden="true" className={styles.viewLink}>
            {product.isPlaceholder ? "View placeholder details" : "View product details"}
          </span>
        </div>
      </Link>
    </Card>
  );
}
