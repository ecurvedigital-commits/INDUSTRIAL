import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import styles from "./primitives.module.css";

export type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonCommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonElementProps = ButtonCommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className"> & {
    href?: never;
    loading?: boolean;
  };

type ButtonLinkProps = ButtonCommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "children" | "className" | "href"> & {
    href: string;
    loading?: never;
  };

type ButtonProps = ButtonElementProps | ButtonLinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary: styles.buttonPrimary,
  secondary: styles.buttonSecondary,
  outline: styles.buttonOutline,
};

function getButtonClasses(variant: ButtonVariant, className?: string) {
  return [styles.button, variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");
}

function isLinkButton(props: ButtonProps): props is ButtonLinkProps {
  return "href" in props && typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  if (isLinkButton(props)) {
    const {
      children,
      className,
      href,
      variant = "primary",
      ...linkProps
    } = props;

    return (
      <Link
        {...linkProps}
        className={getButtonClasses(variant, className)}
        href={href}
      >
        {children}
      </Link>
    );
  }

  const {
    children,
    className,
    disabled,
    loading = false,
    type = "button",
    variant = "primary",
    ...buttonProps
  } = props as ButtonElementProps;

  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={getButtonClasses(variant, className)}
      disabled={disabled || loading}
      type={type}
    >
      <span className={styles.buttonContent}>
        {loading && <span aria-hidden="true" className={styles.spinner} />}
        {children}
      </span>
      {loading && <span className={styles.visuallyHidden}>Loading</span>}
    </button>
  );
}