import type { ComponentPropsWithoutRef } from "react";
import styles from "./primitives.module.css";

export type ContainerWidth = "narrow" | "content" | "standard" | "wide";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  width?: ContainerWidth;
};

const widthClasses: Record<ContainerWidth, string> = {
  narrow: styles.containerNarrow,
  content: styles.containerContent,
  standard: styles.containerStandard,
  wide: styles.containerWide,
};

export function Container({
  children,
  className,
  width = "wide",
  ...props
}: ContainerProps) {
  const classes = [styles.container, widthClasses[width], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
}