import styles from "./ActionButton.module.scss";
import { useState } from "react";

interface IActionButtonProps {
  path: string;
  text: string;
}

export const ActionButton = ({ path, text }: IActionButtonProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <button
      type={"button"}
      className={styles.button}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={path}
          stroke={isHovered ? "#6D4AFF" : "#3B3B3B"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className={styles.text}>{text}</span>
    </button>
  );
};
