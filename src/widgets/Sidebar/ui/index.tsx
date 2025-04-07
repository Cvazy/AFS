import styles from "./Sidebar.module.scss";
import { NavMenu } from "widgets/NavMenu";
import { Button } from "shared/ui";
import { useState } from "react";

export const Sidebar = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <aside
      className={styles.container}
      aria-label={"Sidebar"}
      style={{
        maxHeight: isMenuOpen ? "500px" : "80px",
      }}
    >
      <div className={styles.container__wrapper}>
        <section className={styles.top}>
          <div>
            <h2 className={styles.title}>Oak Tree Cemetery</h2>

            <p className={styles.subtitle}>Process Manager</p>
          </div>

          <div className={styles.button}>
            <Button
              style={{ padding: "0.5rem" }}
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              <img
                src={"/assets/icons/Chevron.svg"}
                alt={"Company Icon"}
                loading={"lazy"}
                draggable={false}
                style={{ rotate: `${isMenuOpen ? "" : "-"}90deg` }}
              />
            </Button>
          </div>
        </section>

        <div className={styles.line}></div>

        <section className={styles.bottom}>
          <NavMenu />

          <p className={styles.waterText}>All Funeral Services © 2015-2025</p>
        </section>
      </div>
    </aside>
  );
};
