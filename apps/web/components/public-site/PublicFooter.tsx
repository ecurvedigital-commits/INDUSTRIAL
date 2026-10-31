import Link from "next/link";
import { Container } from "../design-system/Container";
import styles from "./PublicFooter.module.css";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "How to Buy", href: "/how-to-buy" },
  { label: "Contact", href: "/contact" },
];

const productLinks = [
  { label: "All categories", href: "/products" },
  { label: "Category placeholder 01", href: "/products?category=category-01" },
  { label: "Category placeholder 02", href: "/products?category=category-02" },
  { label: "Category placeholder 03", href: "/products?category=category-03" },
];

export function PublicFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.footerMain} width="wide">
        <div className={styles.introduction}>
          <Link className={styles.brand} href="/">
            <span aria-hidden="true" className={styles.brandMark}>
              R
            </span>
            <span>RAJ INDUSTRIAL</span>
          </Link>
          <p>
            Industrial manufacturing and hardware supply for business customers.
            Company introduction will be expanded with approved details.
          </p>
        </div>

        <nav aria-label="Footer navigation" className={styles.footerColumn}>
          <h2 className={styles.columnTitle}>Explore</h2>
          <ul className={styles.linkList}>
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link className={styles.footerLink} href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product and service links" className={styles.footerColumn}>
          <h2 className={styles.columnTitle}>Products &amp; Services</h2>
          <ul className={styles.linkList}>
            {productLinks.map((item) => (
              <li key={item.href}>
                <Link className={styles.footerLink} href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className={styles.footerLink} href="/services">
                Services
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.footerColumn}>
          <h2 className={styles.columnTitle}>Contact</h2>
          <p className={styles.contactPlaceholder}>
            Contact details will be published here.
          </p>
          <Link className={styles.footerLink} href="/contact">
            Contact RAJ Industrial
          </Link>
        </div>
      </Container>
      <div className={styles.footerBottom}>
        <Container className={styles.footerBottomInner} width="wide">
          <span>RAJ INDUSTRIAL</span>
          <span>Company details to be confirmed.</span>
        </Container>
      </div>
    </footer>
  );
}