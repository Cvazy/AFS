import styles from "./Sidebar.module.scss";
import { NavMenu } from "widgets/NavMenu";

export const Sidebar = () => {
  return (
    <aside className={styles.container} aria-label={"Sidebar"}>
      <div className={styles.container__wrapper}>
        <section>
          <h2 className={styles.title}>Oak Tree Cemetery</h2>

          <p className={styles.subtitle}>Process Manager</p>
        </section>

        <section>
          <NavMenu />
        </section>
      </div>
    </aside>
  );
};
