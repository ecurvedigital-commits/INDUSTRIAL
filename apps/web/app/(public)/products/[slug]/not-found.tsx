import { Button } from "../../../../components/design-system/Button";
import { Container } from "../../../../components/design-system/Container";
import styles from "./not-found.module.css";

export default function ProductNotFound() {
  return (
    <section className={styles.page}>
      <Container className={styles.content} width="content">
        <p className={styles.eyebrow}>PRODUCT NOT FOUND</p>
        <h1 className={styles.title}>This product reference is unavailable.</h1>
        <p className={styles.description}>
          It may have been removed or the link may be incorrect. Return to the
          illustrative catalog to continue browsing.
        </p>
        <Button href="/products">Browse products</Button>
      </Container>
    </section>
  );
}