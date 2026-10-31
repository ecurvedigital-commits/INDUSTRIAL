import type { ComponentPropsWithoutRef } from "react";
import styles from "./primitives.module.css";

type FormFieldProps = Omit<ComponentPropsWithoutRef<"input">, "id"> & {
  error?: string;
  hint?: string;
  id: string;
  label: string;
};

export function FormField({
  "aria-describedby": ariaDescribedBy,
  className,
  error,
  hint,
  id,
  label,
  required,
  ...inputProps
}: FormFieldProps) {
  const descriptionIds = [
    ariaDescribedBy,
    hint ? `${id}-hint` : undefined,
    error ? `${id}-error` : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    styles.input,
    error && styles.inputInvalid,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden="true" className={styles.requiredMark}>
            *
          </span>
        )}
      </label>
      <input
        {...inputProps}
        aria-describedby={descriptionIds || undefined}
        aria-invalid={error ? true : inputProps["aria-invalid"]}
        className={inputClasses}
        id={id}
        required={required}
      />
      {hint && (
        <p className={styles.fieldHint} id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className={styles.fieldError} id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}