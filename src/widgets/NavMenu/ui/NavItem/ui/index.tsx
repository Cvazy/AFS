import { Link, useLocation } from "react-router-dom";
import { Button } from "shared/ui";

import styles from "./NavItem.module.scss";

interface INavItemProps {
  title: string;
  href: string;
  icon: string;
}

export const NavItem = ({ title, href, icon }: INavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link to={href}>
      <li className={isActive ? styles.item : ""}>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            padding: "0.75rem",
          }}
          isLight={!isActive}
        >
          <img
            width={16}
            height={16}
            src={`/assets/icons/${icon}${isActive ? "" : "_dark"}.svg`}
            alt={`${title} Icon`}
            loading={"lazy"}
            draggable={false}
          />

          <span className={styles.text}>{title}</span>
        </Button>
      </li>
    </Link>
  );
};
