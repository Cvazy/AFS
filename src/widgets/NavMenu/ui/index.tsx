import styles from "./NavMenu.module.scss";
import { NavItem } from "./NavItem";

export const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <NavItem />
      </ul>
    </nav>
  );
};
