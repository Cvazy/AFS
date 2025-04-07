import styles from "./MainMenu.module.scss";
import { Link } from "react-router-dom";
import { Button } from "shared/ui";

export const MainMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__wrapper}>
        <div className={styles.container__item}>
          <Link to={"/"} className={styles.logo}>
            <img
              src={"/assets/logo.svg"}
              alt={"logo"}
              loading={"lazy"}
              draggable={false}
            />
          </Link>

          <Link to={"/"}>
            <Button style={{ padding: "0.5rem" }}>
              <img
                src={"/assets/icons/Company.svg"}
                alt={"Company Icon"}
                loading={"lazy"}
                draggable={false}
              />
            </Button>
          </Link>

          <Button style={{ padding: "0.5rem" }}>
            <img
              src={"/assets/icons/Search.svg"}
              alt={"Search Icon"}
              loading={"lazy"}
              draggable={false}
            />
          </Button>
        </div>

        <div className={styles.container__item}>
          <div className={styles.line}></div>

          <Link to={"/"}>
            <Button style={{ padding: "0.5rem" }}>
              <img
                src={"/assets/icons/Settings.svg"}
                alt={"Settings Icon"}
                loading={"lazy"}
                draggable={false}
              />
            </Button>
          </Link>

          <Button style={{ padding: "0.5rem" }}>
            <img
              src={"/assets/icons/SignOut.svg"}
              alt={"Sign out Icon"}
              loading={"lazy"}
              draggable={false}
              className={styles.rotate180}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
