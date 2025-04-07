import styles from "./NavMenu.module.scss";
import { NavItem } from "./NavItem";

export const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <NavItem title={"Organizations"} href={"/"} icon={"Company"} />

        <NavItem
          title={"Contractors"}
          href={"/contractors"}
          icon={"Contractor"}
        />
        <NavItem title={"Clients"} href={"/clients"} icon={"Account"} />
      </ul>
    </nav>
  );
};
