import type { ComponentPropsWithoutRef } from "react";
import styles from "./primitives.module.css";

export type BadgeVariant = "neutral" | "success" | "warning" | "info";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  neutral: styles.badgeNeutral,
  success: styles.badgeSuccess,
  warning: styles.badgeWarning,
  info: styles.badgeInfo,
};

export function Badge({
  children,
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  const classes = [styles.badge, variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span {...props} className={classes}>
      {children}
    </span>
  );
}