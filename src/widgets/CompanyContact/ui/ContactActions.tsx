import styles from "pages/MainPage/ui/MainPage.module.scss";
import { ActionButton, Input } from "shared/ui";
import { useCallback, useEffect, useState } from "react";
import { IContact } from "entities/Contact";
import { useStore } from "app/providers/StoreProvider";

export const ContactActions = ({ contact }: { contact: IContact }) => {
  const { contactStore } = useStore();

  const [onEditMode, setOnEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<IContact>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const { id, firstname, lastname, phone, email } = contact;

  useEffect(() => {
    if (onEditMode) {
      setFormData({
        firstname,
        lastname,
        phone,
        email,
      });
    }
  }, [onEditMode, firstname, lastname, phone, email]);

  useEffect(() => {
    const checkChanges = () => {
      const isChanged =
        formData.firstname !== firstname ||
        formData.lastname !== lastname ||
        formData.phone !== phone ||
        formData.email !== email;

      setHasChanges(isChanged);
    };

    if (onEditMode) checkChanges();
  }, [formData, onEditMode, firstname, lastname, phone, email]);

  const handleSave = useCallback(async () => {
    if (!hasChanges) {
      setOnEditMode(false);
      return;
    }

    try {
      const updateData: IContact = formData as IContact;

      if (formData.firstname !== firstname) {
        updateData.firstname = formData.firstname || "";
      }

      if (formData.lastname !== lastname) {
        updateData.lastname = formData.lastname || "";
      }

      if (formData.phone !== phone) {
        updateData.phone = formData.phone || "";
      }

      if (formData.email !== email) {
        updateData.email = formData.email || "";
      }

      if (Object.keys(updateData).length > 0) {
        await contactStore.updateContact(id, updateData);
      }

      setOnEditMode(false);
    } catch (error) {
      console.error("Ошибка обновления данных:", error);
    }
  }, [
    id,
    formData,
    hasChanges,
    contactStore,
    firstname,
    lastname,
    phone,
    email,
  ]);

  const handleFullNameChange = (value: string) => {
    const [first, ...rest] = value.trim().split(" ");
    const last = rest.join(" ");

    setFormData((prev) => ({
      ...prev,
      firstname: first,
      lastname: last,
    }));
  };
  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleEmailChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      email: value,
    }));
  };

  return (
    <div className={styles.content__item}>
      <div className={styles.head}>
        <h3 className={styles.title}>Contacts</h3>

        <ActionButton
          text={onEditMode ? "Save" : "Edit"}
          onClick={onEditMode ? handleSave : () => setOnEditMode(!onEditMode)}
          path={
            onEditMode
              ? "M16.875 5.62537L8.125 14.375L3.75 10.0004"
              : "M7.24112 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.692C3.19085 16.5748 3.125 16.4158 3.125 16.25V12.7589C3.125 12.6768 3.14117 12.5956 3.17258 12.5197C3.20398 12.4439 3.25002 12.375 3.30806 12.317L12.6831 2.94197C12.8003 2.82476 12.9592 2.75891 13.125 2.75891C13.2908 2.75891 13.4497 2.82476 13.5669 2.94197L17.0581 6.43309C17.1753 6.5503 17.2411 6.70927 17.2411 6.87503C17.2411 7.04079 17.1753 7.19976 17.0581 7.31697L7.68306 16.692C7.62502 16.75 7.55612 16.796 7.48029 16.8275C7.40447 16.8589 7.32319 16.875 7.24112 16.875M10.625 5L15 9.375M7.46011 16.8351L3.16479 12.5398"
          }
          disabled={onEditMode && contactStore.isLoading}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.data_row}>
          <p className={styles.data_row__article}>Responsible person:</p>

          <div className={styles.data_row__value}>
            <Input
              value={
                onEditMode
                  ? `${formData.firstname || ""} ${formData.lastname || ""}`
                  : `${firstname} ${lastname}`
              }
              disabled={!onEditMode}
              onChange={handleFullNameChange}
            />
          </div>
        </div>

        <div className={styles.data_row}>
          <p className={styles.data_row__article}>Phone number:</p>

          <div className={styles.data_row__value}>
            <Input
              value={onEditMode ? formData.phone || "" : phone}
              disabled={!onEditMode}
              onChange={handlePhoneChange}
            />
          </div>
        </div>

        <div className={styles.data_row}>
          <p className={styles.data_row__article}>E-mail:</p>

          <div className={styles.data_row__value}>
            <Input
              value={onEditMode ? formData.email || "" : email}
              disabled={!onEditMode}
              onChange={handleEmailChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
