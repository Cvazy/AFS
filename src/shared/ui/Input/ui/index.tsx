import styles from "./Input.module.scss";
import { ChangeEvent, InputHTMLAttributes } from "react";

interface IInputProps
  extends Partial<Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">> {
  onChange: (value: string) => void;
}

export const Input = ({ onChange, ...rest }: IInputProps) => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    onChange(target.value);
  };

  return <input className={styles.input} {...rest} onChange={handleChange} />;
};
