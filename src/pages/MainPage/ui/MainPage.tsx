import styles from "./MainPage.module.scss";
import React from "react";
import { CompanyContact, CompanyDetails, CompanyPhotos } from "widgets";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.heading}>
        <h1 className={styles.heading__title}>Eternal Rest Funeral Home</h1>

        <div className={styles.btns_container}>
          <button type={"button"} className={"circle_btn"}>
            <img
              src={"/assets/icons/Edit.svg"}
              alt={"Go back"}
              loading={"lazy"}
              draggable={false}
            />
          </button>

          <button type={"button"} className={"circle_btn"}>
            <img
              src={"/assets/icons/Trash_red.svg"}
              alt={"Go back"}
              loading={"lazy"}
              draggable={false}
            />
          </button>
        </div>
      </section>

      <section className={styles.content}>
        <CompanyDetails />

        <CompanyContact />

        <CompanyPhotos />
      </section>
    </div>
  );
};

export default MainPage;
