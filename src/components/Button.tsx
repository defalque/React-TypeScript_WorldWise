import type { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.css";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variation: "primary" | "back" | "position";
};

function Button({ children, onClick, variation, ...props }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[variation]}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
