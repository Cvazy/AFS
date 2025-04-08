import { ModalWrapper } from "shared/ui/ModalWrapper/ui";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import styles from "app/App.module.scss";
import { Button, Input } from "shared/ui";

interface IEditModalProps {
  defaultValue: string;
  isActive: boolean;
  setFunction: Dispatch<SetStateAction<boolean>>;
  handleChangeCompanyName: (name: string) => void;
}

export const EditModal = ({
  defaultValue,
  isActive,
  setFunction,
  handleChangeCompanyName,
}: IEditModalProps) => {
  const [orgName, setOrgName] = useState<string>(defaultValue);

  const ref = useRef<HTMLDivElement | null>(null);
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

          <Input onChange={setOrgName} value={orgName} />

          <div className={styles.modal__buttons}>
            <Button
              style={{ padding: "10px 12px", fontWeight: "600" }}
              isLight={true}
              onClick={() => setFunction(false)}
            >
              Cancel
            </Button>

            <div
              className={styles.go_btn}
              onClick={() => handleChangeCompanyName(orgName)}
            >
              <Button style={{ padding: "10px 12px", fontWeight: "600" }}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
