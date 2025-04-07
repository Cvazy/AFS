import React, { Suspense } from "react";
import AppRouter from "app/providers/Routers/ui/AppRouter";
import { Loader } from "shared";
import styles from "./App.module.scss";
import { MainMenu, Sidebar } from "widgets";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.container}>
        <div className={styles.container__wrapper}>
          <div className={styles.side_menu}>
            <MainMenu />

            <Sidebar />
          </div>

          <main className={styles.main}>
            <div className={styles.main__wrapper}>
              <button
                type={"button"}
                className={"circle_btn"}
                onClick={handleGoBack}
              >
                <img
                  src={"/assets/icons/Chevron_dark.svg"}
                  alt={"Go back"}
                  loading={"lazy"}
                  draggable={false}
                />
              </button>

              <div className={styles.main__content}>
                <AppRouter />
              </div>
            </div>
          </main>

          {/*Footer*/}
        </div>
      </div>
    </Suspense>
  );
}

export default App;
