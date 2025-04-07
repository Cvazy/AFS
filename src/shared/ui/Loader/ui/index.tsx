import { LoaderTwister } from "shared/ui";
import styles from "shared/ui/ModalWrapper/ui/ModalWrapper.module.scss";

export const Loader = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal__wrapper}>
        <LoaderTwister />
      </div>
    </div>
  );
};
