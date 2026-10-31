import type { ComponentPropsWithoutRef } from "react";
import styles from "./primitives.module.css";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  tone?: "default" | "subtle";
};

export function Card({
  children,
  className,
  tone = "default",
  ...props
}: CardProps) {
  const toneClass = tone === "subtle" ? styles.cardSubtle : styles.cardDefault;
  const classes = [styles.card, toneClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <article {...props} className={classes}>
      {children}
    </article>
  );
}