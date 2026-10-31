import { Container } from "../../../../components/design-system/Container";
import styles from "./loading.module.css";

export default function ProductDetailLoading() {
  return (
    <Container aria-label="Loading product details" className={styles.loading} width="wide">
      <div aria-hidden="true" className={styles.image} />
      <div aria-hidden="true" className={styles.copy}>
        <span />
        <span />
        <span />
      </div>
    </Container>
  );
}