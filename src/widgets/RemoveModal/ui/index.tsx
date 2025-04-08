import { ModalWrapper } from "shared/ui/ModalWrapper/ui";
import { Dispatch, SetStateAction, useRef } from "react";
import styles from "app/App.module.scss";
import { Button } from "shared/ui";

interface IRemoveModalProps {
  id: string;
  isActive: boolean;
  setFunction: Dispatch<SetStateAction<boolean>>;
  handleRemoveCompany: () => void;
}

export const RemoveModal = ({
  isActive,
  setFunction,
  handleRemoveCompany,
}: IRemoveModalProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleRemove = () => {
    setFunction(false);
    handleRemoveCompany();
  };

  return (
    <ModalWrapper
      isActive={isActive}
      setFunction={setFunction}
      ref={ref}
      maxWidth={"360px"}
    >
      <div className={styles.modal}>
        <div className={styles.modal__wrapper}>
          <p className={styles.modal__title}>Specify the Organization's name</p>

          <p className={styles.modal__desc}>
            Are you sure you want to remove this Organozation?
          </p>

          <div className={styles.modal__buttons}>
            <Button
              style={{ padding: "10px 12px", fontWeight: "600" }}
              isLight={true}
              onClick={() => setFunction(false)}
            >
              No
            </Button>

            <div
              role={"button"}
              onClick={handleRemove}
              className={styles.go_btn}
            >
              <Button style={{ padding: "10px 12px", fontWeight: "600" }}>
                Yes, remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
