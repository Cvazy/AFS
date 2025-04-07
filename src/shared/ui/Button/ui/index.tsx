import { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import styles from "./Button.module.scss";

interface IButtonProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  isLight?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

export const Button = ({
  isLight = false,
  children,
  style,
  ...rest
}: IButtonProps) => {
  return (
    <button
      type={rest.type || "button"}
      {...rest}
      style={style}
      className={`${styles.button} ${isLight ? styles.light : styles.dark}`}
    >
      {children}
    </button>
  );
};
