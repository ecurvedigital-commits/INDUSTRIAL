import { createElement, type ReactNode } from "react";
import styles from "./primitives.module.css";

type SectionHeadingProps = {
  align?: "left" | "center";
  description?: ReactNode;
  eyebrow?: string;
  id?: string;
  title: string;
  titleAs?: "h2" | "h3";
};

export function SectionHeading({
  align = "left",
  description,
  eyebrow,
  id,
  title,
  titleAs = "h2",
}: SectionHeadingProps) {
  const classes = [styles.sectionHeading, styles[`sectionHeading${align === "center" ? "Center" : "Left"}`]]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      {eyebrow && <p className={styles.sectionEyebrow}>{eyebrow}</p>}
      {createElement(titleAs, { className: styles.sectionTitle, id }, title)}
      {description && <p className={styles.sectionDescription}>{description}</p>}
    </header>
  );
}