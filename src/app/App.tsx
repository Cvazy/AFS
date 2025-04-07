import React, { Suspense } from "react";
import AppRouter from "app/providers/Routers/ui/AppRouter";
import { Loader } from "shared";
import styles from "./App.module.scss";
import { MainMenu, Sidebar } from "widgets";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.container}>
        <div className={styles.container__wrapper}>
          <div className={styles.side_menu}>
            <MainMenu />

            <Sidebar />
          </div>

          <main className={styles.main}>
            <AppRouter />
          </main>

          {/*Footer*/}
        </div>
      </div>
    </Suspense>
  );
}

export default App;
