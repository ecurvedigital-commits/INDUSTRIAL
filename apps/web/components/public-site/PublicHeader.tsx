"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { Button } from "../design-system/Button";
import { Container } from "../design-system/Container";
import styles from "./PublicHeader.module.css";

const productLinks = [
  { label: "All product categories", href: "/products" },
  { label: "Category placeholder 01", href: "/products?category=category-01" },
  { label: "Category placeholder 02", href: "/products?category=category-02" },
  { label: "Category placeholder 03", href: "/products?category=category-03" },
];

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "How to Buy", href: "/how-to-buy" },
  { label: "Contact", href: "/contact" },
];

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const productsButtonRef = useRef<HTMLButtonElement>(null);

  function closeNavigation() {
    setMobileOpen(false);
    setProductsOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Escape" || (!mobileOpen && !productsOpen)) return;

    event.preventDefault();
    const returnFocus = mobileOpen
      ? menuButtonRef.current
      : productsButtonRef.current;
    closeNavigation();
    returnFocus?.focus();
  }

  return (
    <header className={styles.header} onKeyDown={handleKeyDown}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <Container className={styles.headerInner} width="wide">
        <Link
          aria-label="RAJ Industrial home"
          className={styles.brand}
          href="/"
          onClick={closeNavigation}
        >
          <span aria-hidden="true" className={styles.brandMark}>
            R
          </span>
          <span className={styles.brandName}>
            RAJ <strong>INDUSTRIAL</strong>
          </span>
        </Link>

        <button
          aria-controls="primary-navigation"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          className={styles.menuToggle}
          onClick={() => {
            setMobileOpen((open) => !open);
            setProductsOpen(false);
          }}
          ref={menuButtonRef}
          type="button"
        >
          <span aria-hidden="true" className={styles.menuIcon}>
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          aria-label="Primary navigation"
          className={styles.navigation}
          data-open={mobileOpen}
          id="primary-navigation"
        >
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link className={styles.navLink} href="/" onClick={closeNavigation}>
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                className={styles.navLink}
                href="/about"
                onClick={closeNavigation}
              >
                About
              </Link>
            </li>
            <li className={styles.productsItem}>
              <button
                aria-controls="products-navigation"
                aria-expanded={productsOpen}
                className={styles.productsToggle}
                onClick={() => setProductsOpen((open) => !open)}
                ref={productsButtonRef}
                type="button"
              >
                Products
                <span aria-hidden="true" className={styles.chevron} />
              </button>
              <ul
                className={styles.productsMenu}
                hidden={!productsOpen}
                id="products-navigation"
              >
                {productLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      className={styles.productLink}
                      href={item.href}
                      onClick={closeNavigation}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {primaryLinks.slice(2).map((item) => (
              <li className={styles.navItem} key={item.href}>
                <Link
                  className={styles.navLink}
                  href={item.href}
                  onClick={closeNavigation}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={styles.quoteItem}>
              <Button
                className={styles.quoteButton}
                href="/contact#request-a-quote"
                onClick={closeNavigation}
              >
                Request a Quote
              </Button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}