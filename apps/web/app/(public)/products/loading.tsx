import { Container } from "../../../components/design-system/Container";
import styles from "./loading.module.css";

export default function ProductsLoading() {
  return (
    <Container aria-label="Loading product catalog" className={styles.loading} width="wide">
      <div aria-hidden="true" className={styles.grid}>
        {Array.from({ length: 6 }, (_, index) => (
          <div className={styles.card} key={index}>
            <span />
            <span />
            <span />
          </div>
        ))}
      </div>
    </Container>
  );
}