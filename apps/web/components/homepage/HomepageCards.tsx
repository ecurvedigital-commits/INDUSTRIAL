import Image from "next/image";
import Link from "next/link";
import { Badge } from "../design-system/Badge";
import { Button } from "../design-system/Button";
import { Card } from "../design-system/Card";
import styles from "./HomepageCards.module.css";

type Category = {
  number: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
};

type Service = {
  number: string;
  title: string;
  description: string;
};

type Product = {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Card className={styles.categoryCard}>
      <Link className={styles.categoryLink} href={category.href}>
        <div className={styles.categoryImage}>
          <Image
            alt={category.imageAlt}
            className={styles.image}
            fill
            sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw"
            src={category.image}
          />
        </div>
        <div className={styles.categoryBody}>
          <span className={styles.cardIndex}>CATEGORY / {category.number}</span>
          <h3 className={styles.cardTitle}>{category.title}</h3>
          <p className={styles.cardDescription}>{category.description}</p>
          <span aria-hidden="true" className={styles.textLink}>
            View placeholder
          </span>
        </div>
      </Link>
    </Card>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className={styles.serviceCard} tone="subtle">
      <span className={styles.serviceNumber}>{service.number}</span>
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardDescription}>{service.description}</p>
    </Card>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className={styles.productCard}>
      <div className={styles.productImage}>
        <Image
          alt={product.imageAlt}
          className={styles.image}
          fill
          sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw"
          src={product.image}
        />
        <Badge className={styles.productBadge} variant="warning">
          Placeholder
        </Badge>
      </div>
      <div className={styles.productBody}>
        <span className={styles.cardIndex}>REFERENCE / {product.number}</span>
        <h3 className={styles.cardTitle}>{product.title}</h3>
        <p className={styles.cardDescription}>{product.description}</p>
        <Button className={styles.productButton} href={product.href} variant="outline">
          Explore placeholder
        </Button>
      </div>
    </Card>
  );
}